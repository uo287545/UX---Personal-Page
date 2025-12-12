/**
 * Motor de Búsqueda Semántico (Client-Side).
 * Implementa normalización de texto, indexación en memoria y
 * ranking de relevancia simple.
 * * @class SearchEngine
 */
class SearchEngine {
    
    /**
     * Inicializa el motor de búsqueda, captura referencias al DOM
     * y configura el estado inicial.
     */
    constructor() {
        // Referencias a elementos del DOM
        this.container = document.querySelector('header > div');
        
        // Validación de seguridad: si no existe el contenedor, detenemos la ejecución
        if (!this.container) return;

        this.input = this.container.querySelector('header input');
        this.listContainer = this.container.querySelector('output');
        
        // Detección inicial del idioma del documento
        this.currentLang = document.documentElement.lang || 'es';
        this.index = [];
        this.observer = null;

        this.init();
    }

    /**
     * Configuración inicial: construcción del índice y asignación de eventos.
     */
    init() {
        // Construimos el índice de datos basado en el idioma actual
        this.buildIndex(this.currentLang);

        // Accesibilidad: Vinculación ARIA inicial
        this.input.setAttribute('aria-expanded', 'false');
        this.input.setAttribute('aria-controls', 'search-results');

        // Evento principal: búsqueda en tiempo real al escribir
        this.input.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Prevenir el envío estándar del formulario (evita recarga de página)
        const form = this.container.querySelector('form');
        if (form) form.addEventListener('submit', (e) => e.preventDefault());

        // UX: Cerrar resultados al hacer clic fuera del componente
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.closeResults();
            }
        });

        // I18n: Observador de mutaciones para detectar cambios de idioma en <html lang="...">
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                    this.updateLanguage();
                }
            });
        });

        this.observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang']
        });
    }

    /**
     * Gestiona el cambio dinámico de idioma regenerando el índice.
     */
    updateLanguage() {
        this.currentLang = document.documentElement.lang || 'es';
        this.buildIndex(this.currentLang);

        // Si hay una búsqueda activa, refrescamos los resultados con el nuevo idioma
        const currentQuery = this.input.value;
        if (currentQuery.trim().length >= 2) {
            this.handleSearch(currentQuery);
        }
    }

    /**
     * Construye el índice de contenidos en memoria.
     * @param {string} lang - Código del idioma ('es' o 'en').
     */
    buildIndex(lang) {
        // Estructura de datos: t=título, d=descripción, u=url, k=palabras clave
const data = {
            es: [
                // --- PÁGINAS PRINCIPALES ---
                { t: "Inicio", d: "Página principal y bienvenida.", u: "index.html", k: "home principal web raiz" },
                { t: "Sobre mí", d: "Información personal y profesional.", u: "sobre-mi.html", k: "curriculum perfil autor" },
                { t: "Aficiones", d: "Mis pasatiempos y hobbies.", u: "aficiones.html", k: "gustos ocio tiempo libre" },
                { t: "Temas de interés", d: "Artículos y noticias.", u: "temas-interes.html", k: "blog posts actualidad" },
                { t: "Contacto", d: "Formas de contactar conmigo.", u: "contacto.html", k: "email redes mensaje" },
                { t: "Ayuda", d: "Información de navegación y accesibilidad.", u: "ayuda.html", k: "help soporte instrucciones" },
                { t: "Mapa del sitio", d: "Índice jerárquico de la web.", u: "mapa-sitio.html", k: "estructura lista enlaces" },

                // --- SECCIONES INTERNAS ---
                
                // Index
                { t: "Bienvenida (Inicio)", d: "Introducción al portafolio.", u: "index.html#welcome", k: "hola presentacion objetivo" },

                // Sobre Mí
                { t: "Biografía (Sobre mí)", d: "Quién soy y qué estudio.", u: "sobre-mi.html#biography", k: "iker historia personal estudiante" },
                { t: "Formación (Sobre mí)", d: "Estudios, grado y máster.", u: "sobre-mi.html#education", k: "universidad titulo escuela ingenieria" },
                { t: "Experiencia (Sobre mí)", d: "Trayectoria laboral y becas.", u: "sobre-mi.html#experience", k: "trabajo empresa practicas nttdata" },
                { t: "Habilidades (Sobre mí)", d: "Tecnologías: Java, HTML, C#...", u: "sobre-mi.html#skills", k: "programacion lenguajes css js python" },
                { t: "Proyectos (Sobre mí)", d: "Portafolio de trabajos realizados.", u: "sobre-mi.html#projects", k: "desarrollos web apps x3d portapapeles" },
                { t: "Galería (Sobre mí)", d: "Fotos personales y capturas.", u: "sobre-mi.html#gallery", k: "imagenes fotos perfil" },

                // Aficiones
                { t: "Música (Aficiones)", d: "Mis gustos musicales.", u: "aficiones.html#music", k: "canciones grupos imagine dragons" },
                { t: "Fotografía (Aficiones)", d: "Galería de fotos.", u: "aficiones.html#photography", k: "camara paisajes imagenes" },
                { t: "Coches (Aficiones)", d: "El mundo del motor.", u: "aficiones.html#cars", k: "vehiculos automovilismo conducir" },
                { t: "Videojuegos (Aficiones)", d: "Gaming y entretenimiento.", u: "aficiones.html#video-games", k: "jugar consola pc survival" },

                // Temas de Interés
                { t: "Tecnología (Intereses)", d: "IA, Desarrollo Web e innovación.", u: "temas-interes.html#technology-web", k: "informatica internet futuro" },
                { t: "Cine (Intereses)", d: "Películas y ciencia ficción.", u: "temas-interes.html#cinema", k: "peliculas series documentales" },

                // Contacto y Ayuda
                { t: "Datos de contacto", d: "Email, LinkedIn y GitHub.", u: "contacto.html#contact", k: "escribir correo direccion red social" },
                { t: "Ayuda de navegación", d: "Atajos de teclado y compatibilidad.", u: "ayuda.html#help", k: "teclas accesibilidad zoom uso" }
            ],
            en: [
                // --- MAIN PAGES ---
                { t: "Home", d: "Main page and welcome.", u: "index.html", k: "home main start root" },
                { t: "About Me", d: "Personal and professional info.", u: "sobre-mi.html", k: "resume profile author" },
                { t: "Hobbies", d: "My pastimes and interests.", u: "aficiones.html", k: "leisure free time" },
                { t: "Interests", d: "Articles and news.", u: "temas-interes.html", k: "blog posts news" },
                { t: "Contact", d: "Ways to contact me.", u: "contacto.html", k: "email network message" },
                { t: "Help", d: "Navigation and accessibility info.", u: "ayuda.html", k: "support instructions" },
                { t: "Site Map", d: "Hierarchical index.", u: "mapa-sitio.html", k: "structure list links" },

                // --- INTERNAL SECTIONS ---

                // Index
                { t: "Welcome (Home)", d: "Portfolio introduction.", u: "index.html#welcome", k: "hello presentation goal" },

                // About Me
                { t: "Biography (About Me)", d: "Who I am and what I study.", u: "sobre-mi.html#biography", k: "iker history personal student" },
                { t: "Education (About Me)", d: "Studies, degrees and master.", u: "sobre-mi.html#education", k: "university degree school engineering" },
                { t: "Experience (About Me)", d: "Work history and internships.", u: "sobre-mi.html#experience", k: "job work company internship nttdata" },
                { t: "Skills (About Me)", d: "Tech stack: Java, HTML, C#...", u: "sobre-mi.html#skills", k: "programming languages css js python" },
                { t: "Projects (About Me)", d: "Portfolio of my work.", u: "sobre-mi.html#projects", k: "development web apps x3d clipboard" },
                { t: "Gallery (About Me)", d: "Personal photos and screenshots.", u: "sobre-mi.html#gallery", k: "images photos profile" },

                // Hobbies
                { t: "Music (Hobbies)", d: "My musical tastes.", u: "aficiones.html#music", k: "songs bands imagine dragons" },
                { t: "Photography (Hobbies)", d: "Photo gallery.", u: "aficiones.html#photography", k: "camera landscapes images" },
                { t: "Cars (Hobbies)", d: "Motorsports world.", u: "aficiones.html#cars", k: "vehicles driving racing" },
                { t: "Video Games (Hobbies)", d: "Gaming and entertainment.", u: "aficiones.html#video-games", k: "play console pc survival" },

                // Interests
                { t: "Technology (Interests)", d: "AI, Web Dev and innovation.", u: "temas-interes.html#technology-web", k: "IT internet future" },
                { t: "Cinema (Interests)", d: "Movies and Sci-Fi.", u: "temas-interes.html#cinema", k: "films series documentaries" },

                // Contact & Help
                { t: "Contact Data", d: "Email, LinkedIn and GitHub.", u: "contacto.html#contact", k: "write mail address social network" },
                { t: "Navigation Help", d: "Keyboard shortcuts and compatibility.", u: "ayuda.html#help", k: "keys accessibility zoom usage" }
            ]
        };
        
        // Fallback a español si el idioma no existe
        this.index = data[lang] || data['es'];
    }

    /**
     * Lógica principal de búsqueda y ranking.
     * @param {string} query - Texto introducido por el usuario.
     */
    handleSearch(query) {
        // 1. Normalización del texto de entrada
        const rawQuery = this.normalizeText(query.trim());

        // UX: No buscar si hay menos de 2 caracteres
        if (rawQuery.length < 2) {
            this.closeResults();
            return;
        }

        // 2. Tokenización: dividir frase en palabras
        const terms = rawQuery.split(/\s+/);

        // 3. Algoritmo de Búsqueda y Puntuación
        const results = this.index.map(item => {
            let score = 0;
            // Normalizamos los campos del índice para comparar
            const title = this.normalizeText(item.t);
            const desc = this.normalizeText(item.d);
            const keys = this.normalizeText(item.k || "");

            // Lógica AND: El resultado debe contener TODOS los términos buscados
            const allTermsMatch = terms.every(term => {
                let termFound = false;
                
                // Sistema de pesos para relevancia
                if (title.includes(term)) {
                    score += 10; // Mayor peso si está en el título
                    termFound = true;
                }
                else if (desc.includes(term)) {
                    score += 5;  // Peso medio en descripción
                    termFound = true;
                }
                else if (keys.includes(term)) {
                    score += 2;  // Peso bajo en palabras clave
                    termFound = true;
                }

                return termFound;
            });

            return allTermsMatch ? { ...item, score } : null;
        })
        .filter(item => item !== null) // Eliminar no coincidentes
        .sort((a, b) => b.score - a.score); // Ordenar por relevancia descendente

        this.render(results);
    }

    /**
     * Utilidad para normalizar texto: elimina acentos y convierte a minúsculas.
     * Ejemplo: "Música" -> "musica"
     */
    normalizeText(text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    /**
     * Renderiza los resultados en el DOM y gestiona atributos ARIA.
     * @param {Array} items - Lista de objetos resultado.
     */
    render(items) {
        // Creación dinámica de la lista de resultados
        this.listContainer.innerHTML = '';
        this.resultsList = document.createElement('ul');
        this.listContainer.appendChild(this.resultsList);

        this.resultsList.innerHTML = '';
        const hasResults = items.length > 0;

        // Accesibilidad: Informar que el menú se ha desplegado
        this.input.setAttribute('aria-expanded', 'true');

        if (!hasResults) {
            const li = document.createElement('li');
            li.textContent = this.currentLang === 'es' ? 'Sin resultados' : 'No results';
            li.setAttribute('role', 'status'); 
            this.resultsList.appendChild(li);
        } else {
            items.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = item.u;
                // Inserción segura de contenido
                a.innerHTML = `
                    <strong>${item.t}</strong>
                    <small>${item.d}</small>
                `;
                li.appendChild(a);
                this.resultsList.appendChild(li);
            });
        }
    }

    /**
     * Cierra el panel de resultados y actualiza estado ARIA.
     */
    closeResults() {
        this.input.setAttribute('aria-expanded', 'false');
        this.listContainer.innerHTML = '';
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => new SearchEngine());