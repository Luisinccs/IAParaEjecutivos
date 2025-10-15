// 2025-10-14
// Directivas ordenadas alfabéticamente
// El nombre del módulo usa notacion camel: InitializePageLayout
/**
 * @fileoverview Módulo de inicialización para orquestar el layout de la página,
 * incluyendo la carga asíncrona de componentes y la inyección en el DOM.
 */

// import { LoadHeader } from './header.js';
import { LoadHeader } from './header.js';

// async function fetchHtmlContent(url) { ... }
///<summary>Carga el contenido HTML de una URL de forma asíncrona.</summary>
async function fetchHtmlContent(url) {
    // try: manejo de errores para la operación de fetch
    try {
        // variable: variable de alcance local
        const response = await fetch(url);
        // if: condición para verificar el éxito de la respuesta
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} from ${url}`);
        }
        return await response.text();
    } catch (error) {
        console.error("Could not fetch HTML content:", error);
        return ''; // Retorna cadena vacía en caso de error
    }
}

// async function InitializePageLayout() { ... }
///<summary>Inicializa el layout de la página, cargando el header y el footer.</summary>
async function InitializePageLayout() {
    // 1. Carga Asíncrona del Contenido de Navegación
    // variable: variable de alcance local
    const navItemsHTML = await fetchHtmlContent('/elements/nav-items.html');
    
    // 2. Construcción del Header Adaptativo
    const headerHTML = LoadHeader(navItemsHTML);

    // 3. Creación de la estructura del layout
    if (document.body) {
        
        // --- INYECCIÓN DEL HEADER ---
        // Creamos un div temporal para el HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = headerHTML;
        const headerElement = tempDiv.firstElementChild; // Obtenemos el <header>

        // Lo insertamos como el primer hijo del <body>
        if (headerElement && headerElement.tagName === 'HEADER') {
             document.body.prepend(headerElement);
        } else {
            console.error('Header element not found in generated HTML.');
        }

        // --- ENVOLVER EL CONTENIDO EXISTENTE EN <main> ---
        // Esto asume que el contenido de la página ya está en el <body> antes de la inicialización.
        // Si el body está vacío, crea un placeholder.
        const mainElement = document.createElement('main');
        mainElement.id = 'page-content-wrapper'; // ID para el selector CSS

        // Mover el contenido existente del body (que no sea el header) al <main>
        Array.from(document.body.childNodes).forEach(node => {
            if (node !== headerElement && node.nodeType === 1) { // Node.ELEMENT_NODE
                mainElement.appendChild(node);
            }
        });
        
        // Si el body estaba vacío o solo tenía el header, agregamos un contenido mínimo.
        if (mainElement.children.length === 0) {
            mainElement.innerHTML = '<h2>Contenido Principal de la Página</h2><p>Este es un ejemplo de contenido.</p>';
        }
        
        document.body.appendChild(mainElement);

        // --- INYECCIÓN DEL FOOTER ---
        const footerElement = document.createElement('footer');
        footerElement.textContent = "Footer Pendiente. Todos los derechos reservados.";
        footerElement.id = 'page-footer'; // ID para el selector CSS
        
        // Lo insertamos como el último hijo del <body>
        document.body.appendChild(footerElement);
    }
}

// 4. Orquestación Final: Ejecutar InitializePageLayout cuando el DOM esté cargado.
// Agregando el event listener con la función InitializePageLayout.
document.addEventListener('DOMContentLoaded', InitializePageLayout);