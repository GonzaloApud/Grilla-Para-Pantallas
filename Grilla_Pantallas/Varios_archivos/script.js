const screensData = [];
const outputArea = document.getElementById('output-area');
const zoomSlider = document.getElementById('zoom-slider');
const zoomValueText = document.getElementById('zoom-value');

// Inicializar con la primera pantalla
addScreenFromInputs();

// Controles
document.getElementById('add-btn').addEventListener('click', addScreenFromInputs);
document.getElementById('clear-btn').addEventListener('click', () => {
    screensData.length = 0;
    renderAllScreens();
});

// Exportación
document.getElementById('export-jpg-btn').addEventListener('click', exportToJPG);
document.getElementById('export-pdf-btn').addEventListener('click', exportToPDF);

zoomSlider.addEventListener('input', (e) => {
    zoomValueText.innerText = `${e.target.value}px/m`;
    renderAllScreens();
});

function addScreenFromInputs() {
    const title = document.getElementById('input-title').value;
    const w = parseFloat(document.getElementById('input-screen-w').value);
    const h = parseFloat(document.getElementById('input-screen-h').value);
    const pitch = parseFloat(document.getElementById('input-pitch').value);
    const modW = parseFloat(document.getElementById('input-module-w').value);
    const modH = parseFloat(document.getElementById('input-module-h').value);

    if(!title || !w || !h || !pitch || !modW || !modH) return;

    screensData.push({ title, w, h, pitch, modW, modH });
    
    document.getElementById('input-title').value = "PANTALLA " + (screensData.length + 1);
    
    renderAllScreens();
}

function renderAllScreens() {
    outputArea.innerHTML = ''; 
    const pxPerMeter = parseInt(zoomSlider.value); 

    screensData.forEach(screen => {
        const screenW_mm = screen.w * 1000;
        const screenH_mm = screen.h * 1000;
        const moduleW_m = screen.modW / 100;
        const moduleH_m = screen.modH / 100;
        const cols = Math.ceil(screen.w / moduleW_m);
        const rows = Math.ceil(screen.h / moduleH_m);
        const h_px = Math.round((screen.modW * 10) / screen.pitch) * cols;
        const v_px = Math.round((screen.modH * 10) / screen.pitch) * rows;

        // Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'screen-wrapper';

        const titleEl = document.createElement('div');
        titleEl.className = 'screen-title';
        titleEl.innerText = screen.title;
        wrapper.appendChild(titleEl);

        // SVG 
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.classList.add('screen-svg');
        
        svg.style.width = `${screen.w * pxPerMeter}px`;
        svg.style.height = `${screen.h * pxPerMeter}px`;
        
        const scale = 100; 
        svg.setAttribute('viewBox', `0 0 ${screen.w * scale} ${screen.h * scale}`);

        // Grilla Vertical
        for (let i = 1; i < cols; i++) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const x = i * moduleW_m * scale;
            line.setAttribute('x1', x); line.setAttribute('y1', 0);
            line.setAttribute('x2', x); line.setAttribute('y2', screen.h * scale);
            svg.appendChild(line);
        }

        // Grilla Horizontal
        for (let j = 1; j < rows; j++) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const y = j * moduleH_m * scale;
            line.setAttribute('x1', 0); line.setAttribute('y1', y);
            line.setAttribute('x2', screen.w * scale); line.setAttribute('y2', y);
            svg.appendChild(line);
        }

        // Diagonales
        const diag1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        diag1.setAttribute('x1', 0); diag1.setAttribute('y1', 0);
        diag1.setAttribute('x2', screen.w * scale); diag1.setAttribute('y2', screen.h * scale);
        diag1.setAttribute('class', 'crosshair');
        svg.appendChild(diag1);

        const diag2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        diag2.setAttribute('x1', screen.w * scale); diag2.setAttribute('y1', 0);
        diag2.setAttribute('x2', 0); diag2.setAttribute('y2', screen.h * scale);
        diag2.setAttribute('class', 'crosshair');
        svg.appendChild(diag2);

        // Círculo Central y Texto
        const centerX = (screen.w * scale) / 2;
        const centerY = (screen.h * scale) / 2;
        const minDimension = Math.min(screen.w * scale, screen.h * scale);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('cx', centerX); circle.setAttribute('cy', centerY);
        circle.setAttribute('r', minDimension * 0.15);
        circle.setAttribute('class', 'center-circle');
        svg.appendChild(circle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', centerX); text.setAttribute('y', centerY + (minDimension * 0.04));
        text.setAttribute('fill', '#fff'); text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', minDimension * 0.12);
        text.setAttribute('font-weight', 'bold');
        text.textContent = `${h_px}x${v_px}`;
        svg.appendChild(text);

        wrapper.appendChild(svg);

        // Panel de Datos
        const dataPanel = document.createElement('div');
        dataPanel.className = 'data-panel';
        dataPanel.innerHTML = `
            <div class="data-line"><span class="data-label">Medidas:</span><span class="data-value">${screen.w.toFixed(1)} x ${screen.h.toFixed(1)} m</span></div>
            <div class="data-line"><span class="data-label">Pitch:</span><span class="data-value">${screen.pitch.toFixed(1)} mm</span></div>
            <div class="data-line"><span class="data-label">Resolución:</span><span class="data-value">${h_px} x ${v_px} px</span></div>
            <div class="data-line"><span class="data-label">Módulos:</span><span class="data-value">${cols} x ${rows} (${screen.modW}x${screen.modH}cm)</span></div>
        `;
        wrapper.appendChild(dataPanel);

        outputArea.appendChild(wrapper);
    });
}

// EXPORTACIÓN

async function exportToJPG() {
    if (screensData.length === 0) return alert("Añade al menos una pantalla antes de exportar.");
    
    // Convertimos a lienzo
    const canvas = await html2canvas(outputArea, { 
        scale: 2, 
        backgroundColor: '#000000',
        useCORS: true 
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // Descarga
    const link = document.createElement('a');
    link.download = 'Esquema_Pantallas.jpg';
    link.href = imgData;
    link.click();
}

async function exportToPDF() {
    if (screensData.length === 0) return alert("Añade al menos una pantalla antes de exportar.");

    // Convertimos a lienzo
    const canvas = await html2canvas(outputArea, { 
        scale: 2, 
        backgroundColor: '#000000',
        useCORS: true 
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const { jsPDF } = window.jspdf;
    
    // Config del PDF
    const orientation = canvas.width > canvas.height ? 'landscape' : 'portrait';
    const pdf = new jsPDF({
        orientation: orientation,
        unit: 'px',
        format: [canvas.width, canvas.height] 
    });
    
    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save('Esquema_Pantallas.pdf');
}