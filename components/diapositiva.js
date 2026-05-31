class DatosDiapositiva {
    constructor(id, titulo) {
        this.identificador = id;
        this.titulo = titulo;
        this.pantallas = [];
        this.escalaZoom = 120;
    }

    agregarPantalla(pantalla) {
        this.pantallas.push(pantalla);
    }

    eliminarPantalla(idPantalla) {
        this.pantallas = this.pantallas.filter(p => p.identificador !== idPantalla);
    }

    calcularTotales() {
        let totalModulos = 0;
        let totalMetrosCuadrados = 0;

        this.pantallas.forEach(pantalla => {
            const metricas = pantalla.calcularMetricas();
            totalModulos += metricas.totalModulos;
            totalMetrosCuadrados += metricas.metrosCuadrados;
        });

        return { totalModulos, totalMetrosCuadrados };
    }
}

class ComponenteDiapositiva {
    static renderizar(diapositiva, nombreProyecto, funcionEliminarPantalla, funcionEliminarDiapositiva, funcionCambiarZoom) {
        const contenedor = document.createElement('div');
        contenedor.className = 'contenedor-diapositiva';
        contenedor.id = diapositiva.identificador;

        // controles de edicion de diapositiva
        const controlesEdicion = document.createElement('div');
        controlesEdicion.className = 'controles-diapositiva-edicion ocultar-exportacion';
        
        const etiquetaZoom = document.createElement('label');
        etiquetaZoom.style.color = "white";
        etiquetaZoom.style.fontSize = "0.8rem";
        etiquetaZoom.innerText = `Zoom: ${diapositiva.escalaZoom} Px/M`;
        
        const controlZoom = document.createElement('input');
        controlZoom.type = 'range';
        controlZoom.min = '30';
        controlZoom.max = '300';
        controlZoom.value = diapositiva.escalaZoom;
        controlZoom.oninput = (evento) => {
            const nuevoValor = evento.target.value;
            etiquetaZoom.innerText = `Zoom: ${nuevoValor} Px/M`;
            funcionCambiarZoom(diapositiva.identificador, nuevoValor);
        };

        const botonEliminarDiapositiva = document.createElement('button');
        botonEliminarDiapositiva.className = 'peligro';
        botonEliminarDiapositiva.style.padding = '5px 10px';
        botonEliminarDiapositiva.style.minWidth = 'auto';
        botonEliminarDiapositiva.innerText = 'Eliminar Hoja';
        botonEliminarDiapositiva.onclick = () => funcionEliminarDiapositiva(diapositiva.identificador);

        controlesEdicion.appendChild(etiquetaZoom);
        controlesEdicion.appendChild(controlZoom);
        controlesEdicion.appendChild(botonEliminarDiapositiva);
        contenedor.appendChild(controlesEdicion);

        // encabezado
        const encabezado = document.createElement('div');
        encabezado.className = 'encabezado-diapositiva';
        encabezado.innerHTML = `
            <h1>${nombreProyecto}</h1>
            <h2>${diapositiva.titulo}</h2>
        `;
        contenedor.appendChild(encabezado);

        // area de pantallas
        const areaPantallas = document.createElement('div');
        areaPantallas.className = 'area-pantallas';
        
        if (diapositiva.pantallas.length === 0) {
            areaPantallas.innerHTML = '<p style="color:#666; font-style:italic;">No hay pantallas en esta hoja. Añade una desde el panel.</p>';
        } else {
            diapositiva.pantallas.forEach(pantalla => {
                const elementoPantalla = ComponentePantalla.renderizar(
                    pantalla, 
                    diapositiva.escalaZoom, 
                    (idPantalla) => funcionEliminarPantalla(diapositiva.identificador, idPantalla)
                );
                areaPantallas.appendChild(elementoPantalla);
            });
        }
        contenedor.appendChild(areaPantallas);

        // banner inferior de diapo
        const totales = diapositiva.calcularTotales();
        const banner = document.createElement('div');
        banner.className = 'banner-informacion';
        banner.innerHTML = `
            <span>Total Módulos: ${totales.totalModulos}</span>
            <span>Total Superficie: ${totales.totalMetrosCuadrados.toFixed(2)} m²</span>
        `;
        contenedor.appendChild(banner);

        return contenedor;
    }
}
