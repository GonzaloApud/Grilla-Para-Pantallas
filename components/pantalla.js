class DatosPantalla {
    constructor(id, titulo, ancho, alto, pitch, anchoModulo, altoModulo) {
        this.identificador = id;
        this.titulo = titulo;
        this.ancho = parseFloat(ancho);
        this.alto = parseFloat(alto);
        this.pitch = parseFloat(pitch);
        this.anchoModulo = parseFloat(anchoModulo);
        this.altoModulo = parseFloat(altoModulo);
    }

    calcularMetricas() {
        const anchoModuloMetros = this.anchoModulo / 100;
        const altoModuloMetros = this.altoModulo / 100;
        
        const columnas = Math.ceil(this.ancho / anchoModuloMetros);
        const filas = Math.ceil(this.alto / altoModuloMetros);
        const totalModulos = columnas * filas;
        
        const pixelesHorizontales = Math.round((this.anchoModulo * 10) / this.pitch) * columnas;
        const pixelesVerticales = Math.round((this.altoModulo * 10) / this.pitch) * filas;
        
        const metrosCuadrados = this.ancho * this.alto;

        return { columnas, filas, totalModulos, pixelesHorizontales, pixelesVerticales, metrosCuadrados };
    }
}

class ComponentePantalla {
    static renderizar(pantalla, pixelesPorMetro, funcionEliminar) {
        const metricas = pantalla.calcularMetricas();
        const anchoModuloMetros = pantalla.anchoModulo / 100;
        const altoModuloMetros = pantalla.altoModulo / 100;

        const contenedor = document.createElement('div');
        contenedor.className = 'envoltura-pantalla';
        contenedor.id = pantalla.identificador;

        // Boton Eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'boton-eliminar ocultar-exportacion';
        botonEliminar.innerHTML = 'X';
        botonEliminar.title = 'Eliminar Pantalla';
        botonEliminar.onclick = () => funcionEliminar(pantalla.identificador);
        contenedor.appendChild(botonEliminar);

        const tituloElemento = document.createElement('div');
        tituloElemento.className = 'titulo-pantalla';
        tituloElemento.innerText = pantalla.titulo;
        contenedor.appendChild(tituloElemento);

        // Construccion del SVG
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.classList.add('svg-pantalla');
        
        svg.style.width = `${pantalla.ancho * pixelesPorMetro}px`;
        svg.style.height = `${pantalla.alto * pixelesPorMetro}px`;
        
        const escalaSVG = 100; 
        svg.setAttribute('viewBox', `0 0 ${pantalla.ancho * escalaSVG} ${pantalla.alto * escalaSVG}`);

        // Grilla Vertical
        for (let i = 1; i < metricas.columnas; i++) {
            const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const posicionX = i * anchoModuloMetros * escalaSVG;
            linea.setAttribute('x1', posicionX); linea.setAttribute('y1', 0);
            linea.setAttribute('x2', posicionX); linea.setAttribute('y2', pantalla.alto * escalaSVG);
            svg.appendChild(linea);
        }

        // Grilla Horizontal
        for (let j = 1; j < metricas.filas; j++) {
            const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const posicionY = j * altoModuloMetros * escalaSVG;
            linea.setAttribute('x1', 0); linea.setAttribute('y1', posicionY);
            linea.setAttribute('x2', pantalla.ancho * escalaSVG); linea.setAttribute('y2', posicionY);
            svg.appendChild(linea);
        }

        // Diagonales
        const diagonal1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        diagonal1.setAttribute('x1', 0); diagonal1.setAttribute('y1', 0);
        diagonal1.setAttribute('x2', pantalla.ancho * escalaSVG); diagonal1.setAttribute('y2', pantalla.alto * escalaSVG);
        diagonal1.setAttribute('class', 'mira');
        svg.appendChild(diagonal1);

        const diagonal2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        diagonal2.setAttribute('x1', pantalla.ancho * escalaSVG); diagonal2.setAttribute('y1', 0);
        diagonal2.setAttribute('x2', 0); diagonal2.setAttribute('y2', pantalla.alto * escalaSVG);
        diagonal2.setAttribute('class', 'mira');
        svg.appendChild(diagonal2);

        // circulo central y texto de resolucion
        const centroX = (pantalla.ancho * escalaSVG) / 2;
        const centroY = (pantalla.alto * escalaSVG) / 2;
        const dimensionMinima = Math.min(pantalla.ancho * escalaSVG, pantalla.alto * escalaSVG);

        const circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circulo.setAttribute('cx', centroX); circulo.setAttribute('cy', centroY);
        circulo.setAttribute('r', dimensionMinima * 0.15);
        circulo.setAttribute('class', 'circulo-central');
        svg.appendChild(circulo);

        const textoResolucion = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textoResolucion.setAttribute('x', centroX); 
        textoResolucion.setAttribute('y', centroY + (dimensionMinima * 0.04));
        textoResolucion.setAttribute('fill', '#fff'); 
        textoResolucion.setAttribute('text-anchor', 'middle');
        textoResolucion.setAttribute('font-size', dimensionMinima * 0.12);
        textoResolucion.setAttribute('font-weight', 'bold');
        textoResolucion.textContent = `${metricas.pixelesHorizontales}x${metricas.pixelesVerticales}`;
        svg.appendChild(textoResolucion);

        // marca de agua
        const marcaAgua = document.createElementNS("http://www.w3.org/2000/svg", "text");
        marcaAgua.setAttribute('x', (pantalla.ancho * escalaSVG) - (dimensionMinima * 0.05));
        marcaAgua.setAttribute('y', (pantalla.alto * escalaSVG) - (dimensionMinima * 0.05));
        marcaAgua.setAttribute('fill', 'rgba(255, 255, 255, 0.3)');
        marcaAgua.setAttribute('text-anchor', 'end');
        marcaAgua.setAttribute('font-size', dimensionMinima * 0.05);
        marcaAgua.setAttribute('font-family', 'Arial');
        marcaAgua.textContent = "By Gonzalo Apud";
        svg.appendChild(marcaAgua);

        contenedor.appendChild(svg);

        // panel de datos inferior
        const panelDatos = document.createElement('div');
        panelDatos.className = 'panel-datos';
        panelDatos.innerHTML = `
        <div class="linea-datos"><span class="etiqueta-datos">Medidas:</span><span class="valor-datos">${pantalla.ancho.toFixed(1)} x ${pantalla.alto.toFixed(1)} m²</span></div>
            <div class="linea-datos"><span class="etiqueta-datos">Pitch:</span><span class="valor-datos">${pantalla.pitch.toFixed(1)} mm</span></div>
            <div class="linea-datos"><span class="etiqueta-datos">Resolución:</span><span class="valor-datos">${metricas.pixelesHorizontales} x ${metricas.pixelesVerticales} px</span></div>
            <div class="linea-datos"><span class="etiqueta-datos">Módulos:</span><span class="valor-datos">${metricas.columnas} x ${metricas.filas} (${pantalla.anchoModulo}x${pantalla.altoModulo} cm)</span></div>
            <div class="linea-datos"><span class="etiqueta-datos">Total Módulos:</span><span class="valor-datos">${metricas.totalModulos}</span></div>
        `;
        contenedor.appendChild(panelDatos);

        return contenedor;
    }
}