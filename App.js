class DatosProyecto {
    constructor() {
        this.nombre = "PROYECTO 1";
        this.diapositivas = [];
        this.contadorPantallas = 0;
        this.contadorDiapositivas = 0;
    }

    agregarDiapositiva(titulo) {
        this.contadorDiapositivas++;
        const nuevaDiapositiva = new DatosDiapositiva(`diapositiva-${this.contadorDiapositivas}`, titulo);
        this.diapositivas.push(nuevaDiapositiva);
        return nuevaDiapositiva;
    }

    eliminarDiapositiva(idDiapositiva) {
        this.diapositivas = this.diapositivas.filter(d => d.identificador !== idDiapositiva);
    }

    obtenerDiapositiva(idDiapositiva) {
        return this.diapositivas.find(d => d.identificador === idDiapositiva);
    }
}

// VARIABLES GLOBALES

const proyectoVirtual = new DatosProyecto();
const areaSalida = document.getElementById('area-salida');
const selectorDiapositiva = document.getElementById('selector-diapositiva');
const entradaNombreProyecto = document.getElementById('entrada-nombre-proyecto');

// inicializacion
function iniciarAplicacion() {
    proyectoVirtual.agregarDiapositiva("Día 1");
    actualizarSelectorDiapositivas();
    
    // Ajuste para que el siguiente título por defecto sea Día 2 al cargar
    document.getElementById('entrada-titulo-diapositiva').value = "Día 2";
    
    renderizarTodo();
}

// funciones de actualizacion de interfaz
function actualizarSelectorDiapositivas() {
    const valorActual = selectorDiapositiva.value;
    selectorDiapositiva.innerHTML = '';
    
    proyectoVirtual.diapositivas.forEach(diapositiva => {
        const opcion = document.createElement('option');
        opcion.value = diapositiva.identificador;
        opcion.textContent = diapositiva.titulo;
        selectorDiapositiva.appendChild(opcion);
    });

    if (valorActual && proyectoVirtual.obtenerDiapositiva(valorActual)) {
        selectorDiapositiva.value = valorActual;
    } else if (proyectoVirtual.diapositivas.length > 0) {
        selectorDiapositiva.value = proyectoVirtual.diapositivas[0].identificador;
    }
}

function renderizarTodo() {
    areaSalida.innerHTML = '';
    const nombreProyecto = entradaNombreProyecto.value || "PROYECTO SIN TÍTULO";

    // renderizar todas las diapositivas
    proyectoVirtual.diapositivas.forEach(diapositiva => {
        const elementoDiapositiva = ComponenteDiapositiva.renderizar(
            diapositiva, 
            nombreProyecto,
            manejarEliminarPantalla,
            manejarEliminarDiapositiva,
            manejarCambioZoom
        );
        areaSalida.appendChild(elementoDiapositiva);
    });

    // renderizar la diapositiva final de resumen
    const elementoResumen = generarDiapositivaResumen(proyectoVirtual, nombreProyecto);
    if (elementoResumen) {
        areaSalida.appendChild(elementoResumen);
    }
}

function generarDiapositivaResumen(proyecto, nombreProyecto) {
    const todasLasPantallas = proyecto.diapositivas.flatMap(d => d.pantallas);
    if (todasLasPantallas.length === 0 && proyecto.diapositivas.length === 0) return null;

    const contenedor = document.createElement('div');
    contenedor.className = 'contenedor-diapositiva diapositiva-resumen';

    // Agrupar pantallas por nombre de diapositiva
    const pantallasPorDiapositiva = {};
    proyecto.diapositivas.forEach(diapositiva => {
        const nombreHoja = diapositiva.titulo;
        if (!pantallasPorDiapositiva[nombreHoja]) {
            pantallasPorDiapositiva[nombreHoja] = [];
        }
        pantallasPorDiapositiva[nombreHoja].push(...diapositiva.pantallas);
    });

    let totalModulos = 0;
    let totalMetrosCuadrados = 0;
    const gruposDesglose = {};

    todasLasPantallas.forEach(pantalla => {
        const metricas = pantalla.calcularMetricas();
        totalModulos += metricas.totalModulos;
        totalMetrosCuadrados += metricas.metrosCuadrados;
        const claveGrupo = `Pitch ${pantalla.pitch.toFixed(1)} | Módulo ${pantalla.anchoModulo}x${pantalla.altoModulo}`;
        
        if(!gruposDesglose[claveGrupo]) {
            gruposDesglose[claveGrupo] = { modulos: 0, metros: 0 };
        }
        gruposDesglose[claveGrupo].modulos += metricas.totalModulos;
        gruposDesglose[claveGrupo].metros += metricas.metrosCuadrados;
    });

    const html = `
        <div class="encabezado-diapositiva">
            <h1>${nombreProyecto}</h1>
            <h2>RESUMEN</h2>
        </div>
        <div style="color: #ffffff; font-size: 1.1rem; width: 100%; max-width: 900px; margin: 0 auto; line-height: 1.8; padding-bottom: 20px;">
            
            <h3 style="color: var(--accent-color); border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">Pantallas</h3>
            <ul style="list-style-type: none; padding-left: 0; margin-bottom: 25px;">
                ${Object.keys(pantallasPorDiapositiva).length > 0 ? 
                    Object.entries(pantallasPorDiapositiva).map(([nombreHoja, pantallas]) => `
                        <li style="margin-bottom: 15px;">
                            <strong style="color: #fff; font-size: 1.2rem;">${nombreHoja}</strong>
                            <ul style="list-style-type: square; margin-top: 5px; padding-left: 40px; color: #ccc;">
                                ${pantallas.length > 0 
                                    ? pantallas.map(p => `<li><strong>${p.titulo}:</strong> ${p.ancho.toFixed(1)}x${p.alto.toFixed(1)} m</li>`).join('') 
                                    : '<li><em>Sin pantallas asignadas.</em></li>'}
                            </ul>
                        </li>
                    `).join('') 
                : '<li>No hay hojas creadas.</li>'}
            </ul>

            <h3 style="color: var(--accent-color); border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">Totales de Módulos y Metros</h3>
            <p><strong>Suma Total de Módulos:</strong> ${totalModulos}</p>
            <p><strong>Suma Total de Superficie:</strong> ${totalMetrosCuadrados.toFixed(1)} m²</p>
            
            ${Object.keys(gruposDesglose).length > 0 ? `
            <div style="background-color: #222; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid var(--accent-color);">
                <h4 style="margin-top: 0; color: #ccc;">Desglose por Tipo de Módulo:</h4>
                <ul style="margin-bottom: 0;">
                    ${Object.entries(gruposDesglose).map(([clave, valores]) => `
                        <li style="margin-bottom: 10px;">
                            <span style="color: var(--accent-color); font-weight: bold;">${clave}</span><br>
                            Suma: ${valores.modulos} Módulos | Superficie: ${valores.metros.toFixed(1)} m²
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
    `;
    
    contenedor.innerHTML = html;
    return contenedor;
}

// manejadores de eventos
document.getElementById('boton-agregar-diapositiva').addEventListener('click', () => {
    const titulo = document.getElementById('entrada-titulo-diapositiva').value;
    if (!titulo) return alert("Ingrese un título para la diapositiva.");
    
    const nuevaDiapositiva = proyectoVirtual.agregarDiapositiva(titulo);
    actualizarSelectorDiapositivas();
    selectorDiapositiva.value = nuevaDiapositiva.identificador;
    
    document.getElementById('entrada-titulo-diapositiva').value = "Día " + (proyectoVirtual.diapositivas.length + 1);
    renderizarTodo();
});

document.getElementById('boton-agregar-pantalla').addEventListener('click', () => {
    const idDiapositivaActiva = selectorDiapositiva.value;
    if (!idDiapositivaActiva) return alert("No hay ninguna diapositiva seleccionada.");

    const diapositivaActiva = proyectoVirtual.obtenerDiapositiva(idDiapositivaActiva);

    const titulo = document.getElementById('entrada-titulo-pantalla').value;
    const ancho = document.getElementById('entrada-ancho-pantalla').value;
    const alto = document.getElementById('entrada-alto-pantalla').value;
    const pitch = document.getElementById('entrada-pitch').value;
    const anchoModulo = document.getElementById('entrada-ancho-modulo').value;
    const altoModulo = document.getElementById('entrada-alto-modulo').value;

    if(!titulo || !ancho || !alto || !pitch || !anchoModulo || !altoModulo) return;

    proyectoVirtual.contadorPantallas++;
    const nuevaPantalla = new DatosPantalla(
        `pantalla-${proyectoVirtual.contadorPantallas}`,
        titulo, ancho, alto, pitch, anchoModulo, altoModulo
    );

    diapositivaActiva.agregarPantalla(nuevaPantalla);
    document.getElementById('entrada-titulo-pantalla').value = "PANTALLA " + (diapositivaActiva.pantallas.length + 1);
    renderizarTodo();
});

entradaNombreProyecto.addEventListener('input', renderizarTodo);

function manejarEliminarPantalla(idDiapositiva, idPantalla) {
    const diapositiva = proyectoVirtual.obtenerDiapositiva(idDiapositiva);
    if(diapositiva) {
        diapositiva.eliminarPantalla(idPantalla);
        renderizarTodo();
    }
}

function manejarEliminarDiapositiva(idDiapositiva) {
    if(confirm("¿Estás seguro de que deseas eliminar esta hoja y todas sus pantallas?")) {
        proyectoVirtual.eliminarDiapositiva(idDiapositiva);
        actualizarSelectorDiapositivas();
        
        // ajustar el contador de la próxima diapo
        document.getElementById('entrada-titulo-diapositiva').value = "Día " + (proyectoVirtual.diapositivas.length + 1);
        
        renderizarTodo();
    }
}

function manejarCambioZoom(idDiapositiva, nuevoZoom) {
    const diapositiva = proyectoVirtual.obtenerDiapositiva(idDiapositiva);
    if(diapositiva) {
        diapositiva.escalaZoom = parseInt(nuevoZoom);
        renderizarTodo();
    }
}

// FUNCIONES DE EXPORTACION

async function exportarA_JPG() {
    const diapositivas = document.querySelectorAll('.contenedor-diapositiva');
    if (diapositivas.length === 0) return alert("Añade al menos una hoja antes de exportar.");

    document.body.classList.add('modo-exportacion');

    for (let indice = 0; indice < diapositivas.length; indice++) {
        const elementoDiapositiva = diapositivas[indice];
        const lienzo = await html2canvas(elementoDiapositiva, { 
            scale: 2, 
            backgroundColor: '#000000',
            useCORS: true 
        });
        
        const datosImagen = lienzo.toDataURL('image/jpeg', 1.0);
        const enlace = document.createElement('a');
        
        let nombreArchivo = `Proyecto_Hoja_${indice + 1}.jpg`;
        if (elementoDiapositiva.classList.contains('diapositiva-resumen')) {
            nombreArchivo = `Proyecto_Hoja_Resumen.jpg`;
        }

        enlace.download = nombreArchivo;
        enlace.href = datosImagen;
        enlace.click();

        await new Promise(resolver => setTimeout(resolver, 500));
    }

    document.body.classList.remove('modo-exportacion');
}

async function exportarA_PDF() {
    const diapositivas = document.querySelectorAll('.contenedor-diapositiva');
    if (diapositivas.length === 0) return alert("Añade al menos una hoja antes de exportar.");

    document.body.classList.add('modo-exportacion');
    const { jsPDF } = window.jspdf;
    let documentoPDF = null;

    for (let indice = 0; indice < diapositivas.length; indice++) {
        const elementoDiapositiva = diapositivas[indice];
        const lienzo = await html2canvas(elementoDiapositiva, { 
            scale: 2, 
            backgroundColor: '#000000',
            useCORS: true 
        });
        
        const datosImagen = lienzo.toDataURL('image/jpeg', 1.0);
        const orientacion = lienzo.width > lienzo.height ? 'landscape' : 'portrait';
        
        if (indice === 0) {
            documentoPDF = new jsPDF({
                orientation: orientacion,
                unit: 'px',
                format: [lienzo.width, lienzo.height]
            });
        } else {
            documentoPDF.addPage([lienzo.width, lienzo.height], orientacion);
        }
        
        documentoPDF.addImage(datosImagen, 'JPEG', 0, 0, lienzo.width, lienzo.height);
    }

    documentoPDF.save('Esquema_Proyecto_Completo.pdf');
    document.body.classList.remove('modo-exportacion');
}

document.getElementById('boton-exportar-jpg').addEventListener('click', exportarA_JPG);
document.getElementById('boton-exportar-pdf').addEventListener('click', exportarA_PDF);
iniciarAplicacion();