LED Screen Schema Generator
A specialized web tool designed to quickly calculate and visualize LED screen configurations.

Key Features
Resolution Calculation: Automatically determines total horizontal and vertical pixels based on physical size and Pixel Pitch (mm).

Module Management: Calculates the exact number of cabinets/modules required based on user-defined module dimensions (cm).

Dynamic Visualization: Generates a scaled SVG representation of each screen, featuring a module grid, crosshair guides, and center point markers.

Zoom Control: Adjustable workspace scaling to manage multiple screens within a single view.

Exporting: Export your technical schemas directly to JPG or PDF formats for documentation.

Responsive Design: Fully optimized for desktop, not recommended for screens over 10m width on phones but does work for smaller screens.

Repository Structure
This repository provides two ways to implement or host the tool:

Multi-File Version (/src): The standard development structure with separated .html, .css, and .js files. If you plan to modify or extend the code.

Single-File Version (index.html): A portable, standalone version where all logic, styles, and structure are contained in a single file. For offline use or quick deployment as a desktop shortcut.

Specifications

External Libraries: * html2canvas: For rendering the workspace into image data.

jsPDF: For generating technical PDF documents.

Usage Instructions
Open the desired version of the tool in any modern web browser.

Enter the screen title, physical dimensions (m), pixel pitch (mm) and the individual module size (cm).

Click "Add Screen" to render the configuration to the workspace and adjust zoom if necessary to fit your view.

Use the Export buttons to save your schema locally.
