# LED Screen Schema Generator

A web tool designed to quickly calculate, organize, and visualize LED screen configurations for events and installations.

---

## Key Features

* **Project & Slide Management**: Organize your screens into distinct slides or sheets (e.g., Day 1, Day 2) under a single master project.
* **Resolution Calculation**: Automatically determines total horizontal and vertical pixels based on physical size and Pixel Pitch (mm).
* **Module Management**: Calculates the exact number of cabinets/modules required based on user-defined module dimensions (cm).
* **Technical Summary Sheet**: Automatically generates a final overview slide detailing total modules, square meters, and a specific breakdown grouped by pitch and module dimensions.
* **Dynamic Visualization**: Generates a scaled SVG representation of each screen, featuring a module grid, crosshair guides, and center point markers.
* **Independent Zoom Control**: Adjustable workspace scaling *per slide*, allowing you to zoom out on extra-wide screens without affecting the layout of other sheets.
* **Exporting**: Export your schemas directly to individual JPG images (one per slide) or compile them into a multi-page PDF document.
* **Responsive Design**: Fully optimized for desktop. While it works on mobile for smaller screens, it is not recommended for screens over 10 meters in width, and on a laptop up to approximately 60 meters.

---

## Repository Structure

This repository provides two ways to implement or host the tool:

### Multi-File Version (Root)

The standard development structure designed for easy maintenance, expansion, and hosting on platforms like GitHub Pages.

* `index.html`: Main entry point.
* `App.js`: Core logic and project management.
* `styles.css`: Visual styling.
* `components/`: Contains separated logical classes (`pantalla.js` and `diapositiva.js`).
* `images/`: Stores assets like the browser tab favicon.

### Single-File Version (`single_file/index.html`)

A portable, standalone version where all logic, styles, and structure are contained in a single HTML file. This is ideal for offline use or quick deployment as a desktop shortcut.

---

## Specifications

### External Libraries

* **html2canvas**: Used for rendering the HTML/SVG workspace into image data.
* **jsPDF**: Used for generating the PDF documents.

---

## Usage Instructions

1. Open the tool in any modern web browser.
2. Enter the **General Project Name**.
3. Create a **New Slide** (e.g., "Main Stage" or "Day 1") or select an active one.
4. Enter the **Screen Title**, **Physical Dimensions (m)**, **Pixel Pitch (mm)**, and the **Individual Module Size (cm)**.
5. Click **Add Screen** to render the configuration to the active slide.
6. Adjust the **Zoom** slider on the specific slide to fit the visualization to your view. Hover over items to reveal delete buttons if you need to make corrections.
7. Use the **Export** buttons to save your completed schema and technical summary locally.

---
---

# Generador de Esquemas para Pantallas LED

Una herramienta web diseñada para calcular, organizar y visualizar rápidamente configuraciones de pantallas LED para eventos e instalaciones.

---

## Características Principales

* **Gestión de Proyectos y Hojas**: Organiza tus pantallas en diferentes diapositivas o secciones (ej. Día 1, Día 2) dentro de un mismo proyecto general.
* **Cálculo de Resolución**: Determina automáticamente los píxeles totales horizontales y verticales según el tamaño físico y el Pixel Pitch (milímetros).
* **Gestión de Módulos**: Calcula el número exacto de gabinetes/módulos necesarios según las dimensiones del módulo definidas (centímetros).
* **Hoja de Resumen Técnico**: Genera automáticamente una diapositiva final con el detalle de la cantidad total de módulos, metros cuadrados totales y un desglose agrupado por pitch y dimensiones de módulo.
* **Visualización Dinámica**: Genera una representación SVG a escala de cada pantalla, con una cuadrícula de módulos, guías y marcador de punto central.
* **Control de Zoom Independiente**: Ajuste de escala individual por cada diapositiva, lo que permite visualizar correctamente pantallas extra anchas en una hoja sin desconfigurar el tamaño de los elementos en las demás.
* **Exportación**: Exporta tus esquemas directamente a imágenes JPG (una por diapositiva) o compilados en un documento PDF multipágina.
* **Diseño Responsivo**: Optimizado para escritorio. Aunque funciona en móviles para pantallas pequeñas, no se recomienda para pantallas de más de 10 metros de ancho, y en un laptop hasta aproximadamente 60 metros.

---

## Estructura del Repositorio

Este repositorio ofrece dos formas de utilizar la herramienta:

### Versión Multi-Archivo (Raíz)

La estructura estándar de desarrollo, diseñada para facilitar el mantenimiento, la expansión y el alojamiento en plataformas como GitHub Pages.

* `index.html`: Archivo principal.
* `App.js`: Lógica central y gestión del proyecto.
* `styles.css`: Estilos visuales.
* `components/`: Contiene las clases lógicas separadas (`pantalla.js` y `diapositiva.js`).
* `images/`: Almacena recursos visuales como el icono de la pestaña.

### Versión de Archivo Único (`single_file/index.html`)

Una versión portátil y autónoma donde toda la lógica, estilos y estructura están en un solo archivo HTML. Ideal para uso sin conexión a internet o como acceso directo en el escritorio.

---

## Especificaciones

### Librerías Externas

* **html2canvas**: Utilizada para convertir el espacio de trabajo HTML/SVG en datos de imagen.
* **jsPDF**: Utilizada para generar los documentos PDF.

---

## Instrucciones de Uso

1. Abre la herramienta en cualquier navegador web moderno.
2. Ingresa el **Nombre General del Proyecto**.
3. Crea una **Nueva Diapositiva** (ej. "Escenario Principal" o "Día 1") o selecciona una activa.
4. Ingresa el **Título de la Pantalla**, **Dimensiones Físicas (metros)**, **Pixel Pitch (milímetros)** y el **Tamaño del Módulo (centímetros)**.
5. Haz clic en **Añadir Pantalla** para renderizar la configuración en la hoja activa.
6. Ajusta el control de **Zoom** en la diapositiva específica para acomodar la vista. Pasa el cursor sobre los elementos para revelar los botones de eliminación si necesitas hacer correcciones.
7. Usa los botones de **Exportar** para guardar tu esquema completo y el resumen técnico localmente.
