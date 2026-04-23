# LED Screen Schema Generator

A web tool designed to quickly calculate and visualize LED screen configurations.

---

## Key Features

* **Resolution Calculation**: Automatically determines total horizontal and vertical pixels based on physical size and Pixel Pitch (mm).
* **Module Management**: Calculates the exact number of cabinets/modules required based on user-defined module dimensions (cm).
* **Dynamic Visualization**: Generates a scaled SVG representation of each screen, featuring a module grid, crosshair guides, and center point markers.
* **Zoom Control**: Adjustable workspace scaling to manage multiple screens within a single view.
* **Exporting**: Export your schemas directly to JPG or PDF formats for documentation.
* **Responsive Design**: Fully optimized for desktop. While it works on mobile for smaller screens, it is not recommended for screens over 10m in width.

---

## Repository Structure

This repository provides two ways to implement or host the tool:

### Multi-File Version (/src)
The standard development structure with separated .html, .css, and .js files. This is the preferred version if you plan to modify or extend the code.

### Single-File Version (index.html)
A portable, standalone version where all logic, styles, and structure are contained in a single file. This is ideal for offline use or quick deployment as a desktop shortcut.

---

## Specifications

### External Libraries
* **html2canvas**: Used for rendering the HTML/SVG workspace into image data.
* **jsPDF**: Used for generating the PDF documents.

---

## Usage Instructions

1. Open the desired version of the tool in any modern web browser.
2. Enter the **Screen Title**, **Physical Dimensions (m)**, **Pixel Pitch (mm)**, and the **Individual Module Size (cm)**.
3. Click **Add Screen** to render the configuration to the workspace.
4. Adjust the **Global Zoom** slider if necessary to fit the visualization to your view.
5. Use the **Export** buttons to save your schema locally.

---
---

# Generador de Esquemas para Pantallas LED

Una herramienta web diseñada para calcular y visualizar rápidamente configuraciones de pantallas LED.

---

## Características Principales

* **Cálculo de Resolución**: Determina automáticamente los píxeles totales horizontales y verticales según el tamaño físico y el Pixel Pitch (mm).
* **Gestión de Módulos**: Calcula el número exacto de gabinetes/módulos necesarios según las dimensiones del módulo definidas (cm).
* **Visualización Dinámica**: Genera una representación SVG a escala de cada pantalla, con una cuadrícula de módulos, guías y marcador de punto central.
* **Control de Zoom**: Ajuste de escala global para gestionar varias pantallas en una sola vista.
* **Exportación**: Exporta tus esquemas directamente a formatos JPG o PDF.
* **Diseño Responsivo**: Optimizado para escritorio. Aunque funciona en móviles para pantallas pequeñas, no se recomienda para pantallas de más de 10m de ancho.

---

## Estructura del Repositorio

Este repositorio ofrece dos formas de utilizar la herramienta:

### Versión Multi-Archivo (/src)
La estructura estándar con archivos .html, .css y .js separados. Es la versión preferida si planeas modificar o ampliar el código.

### Versión de Archivo Único (index.html)
Una versión portátil y autónoma donde toda la lógica, estilos y estructura están en un solo archivo. Ideal para uso offline o como acceso directo en el escritorio.

---

## Especificaciones

### Librerías Externas
* **html2canvas**: Utilizada para convertir el espacio de trabajo HTML/SVG en datos de imagen.
* **jsPDF**: Utilizada para generar los documentos PDF.

---

## Instrucciones de Uso

1. Abre la versión deseada de la herramienta en cualquier navegador web.
2. Ingresa el **Título de la Pantalla**, **Dimensiones Físicas (m)**, **Pixel Pitch (mm)** y el **Tamaño del Módulo (cm)**.
3. Haz clic en **Añadir Pantalla** para renderizar la configuración.
4. Ajusta el control de **Zoom Global** si es necesario para ajustar la vista.
5. Usa los botones de **Exportar** para guardar tu esquema localmente.
