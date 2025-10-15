// 2025-10-14
// Directivas ordenadas alfabéticamente
// El nombre del módulo usa notacion camel: LoadHeader
/**
 * @fileoverview Módulo para cargar la estructura del encabezado (Header)
 * en modo móvil o desktop, inyectando los ítems de navegación.
 */

// export function LoadHeader(navItemsHTML) { ... }
///<summary>Construye y retorna el HTML del &lt;header&gt; adaptado al tamaño de la pantalla.</summary>
export function LoadHeader(navItemsHTML) {
    // _breakpoint: Es la variable de alcance de clase (aunque sea módulo), 
    //            por eso usa underscore y notación camel.
    // _variableDeClase: Breakpoint para alternar entre móvil y desktop
    const _breakpoint = 768; 
    
    // variable: variable de alcance local
    let headerHtml = '';

    // Función interna para la estructura móvil
    ///<summary>Construye la estructura HTML del encabezado para móvil.</summary>
    const _buildMobileHeader = (navHtml) => {
        // En los bloques, las llaves van siempre será sin iniciar nueva líena (estilo Java)
        return `
            <header class="header-mobile">
                <div class="header-title-mobile">
                    <h1>Diccionario de la IA</h1>
                </div>

                <div class="header-icons-mobile">
                    <button class="dark-mode-toggle-mobile" aria-label="Toggle Dark Mode">🌙</button>

                    <div class="language-toggle-mobile popup-trigger">
                        <button class="language-button" aria-label="Select Language">🌎</button>
                        <div class="popup-list language-popup-list languages">
                            <ul class="languages-list">
                                <li><button data-lang="en">English</button></li>
                                <li><button data-lang="es">Español</button></li>
                            </ul>
                        </div>
                    </div>

                    <button class="hamburger-menu-icon" aria-label="Open Navigation Menu">☰</button>
                </div>

                <nav class="nav-items-mobile popup-list nav-popup-list">
                    ${navHtml} </nav>
            </header>
        `;
    }

    // Función interna para la estructura desktop
    ///<summary>Construye la estructura HTML del encabezado para desktop.</summary>
    const _buildDesktopHeader = (navHtml) => {
        return `
            <header class="header-desktop">
                <div class="header-title-desktop">
                    <h1>Diccionario de la IA</h1>
                </div>
                
                <nav class="nav-items-regular">
                    ${navHtml} </nav>

                <div class="header-desktop-icons">
                    <div class="language-toggle-desktop popup-trigger">
                        <button class="language-button" aria-label="Select Language">🌎</button>
                        <div class="popup-list language-popup-list languages">
                            <ul class="languages-list">
                                <li><button data-lang="en">English</button></li>
                                <li><button data-lang="es">Español</button></li>
                            </ul>
                        </div>
                    </div>
                    
                    <button class="dark-mode-toggle-desktop" aria-label="Toggle Dark Mode">🌙</button>
                </div>
            </header>
        `;
    }
    
    // Funciones Externas (No hay, solo la exportada)
    // El sumario va todo en la misma línea
    // if: condición para determinar la estructura.
    if (window.innerWidth <= _breakpoint) {
        headerHtml = _buildMobileHeader(navItemsHTML);
    } else {
        headerHtml = _buildDesktopHeader(navItemsHTML);
    }

    return headerHtml;
}