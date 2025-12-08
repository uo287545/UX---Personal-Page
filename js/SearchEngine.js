/**
 * Motor de búsqueda semántico AVANZADO.
 * Incluye normalización (tildes), búsqueda por términos y ranking de relevancia.
 */
class SearchEngine {
    
    constructor() {
        // Selectores por atributo (Mantenemos tu restricción Zero-Class/ID)
        this.container = document.querySelector('header > div');
        
        if (!this.container) return;

        this.input = this.container.querySelector('header input');
        this.resultsList = this.container.querySelector('ul');
        
        this.currentLang = document.documentElement.lang || 'es';
        this.index = [];

        this.init();
    }

    init() {
        this.buildIndex(this.currentLang);

        this.input.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Prevenir submit estándar
        const form = this.container.querySelector('form');
        if (form) form.addEventListener('submit', (e) => e.preventDefault());

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.resultsList.hidden = true;
            }
        });
    }

    /**
     * Construye el índice.
     * He ampliado las 'keywords' (k) para mejorar la puntería.
     */
    buildIndex(lang) {
        const data = {
            es: [
                { t: "Inicio", d: "Bienvenida, presentación y objetivos del portafolio.", u: "index.html", k: "home principal" },
                { t: "Sobre mí", d: "Formación académica, ingeniería web y experiencia laboral.", u: "sobre-mi.html", k: "curriculum estudios" },
                { t: "Aficiones", d: "Tiempo libre, deportes, lectura y otros hobbies.", u: "aficiones.html", k: "gustos ocio" },
                { t: "Temas de interés", d: "Artículos, noticias de tecnología y actualidad.", u: "temas-interes.html", k: "blog posts" },
                { t: "Contacto", d: "Email, LinkedIn, GitHub y redes sociales.", u: "contacto.html", k: "conectar mensaje" },
                { t: "Mapa del sitio", d: "Índice jerárquico de todas las páginas.", u: "mapa-sitio.html", k: "estructura" }
            ],
            en: [
                { t: "Home", d: "Welcome, personal presentation and portfolio goals.", u: "index.html", k: "main" },
                { t: "About Me", d: "Academic background, web engineering and work experience.", u: "sobre-mi.html", k: "resume studies" },
                { t: "Hobbies", d: "Free time, sports, reading and other interests.", u: "aficiones.html", k: "leisure" },
                { t: "Interests", d: "Tech news, articles and current events.", u: "temas-interes.html", k: "blog posts" },
                { t: "Contact", d: "Email, LinkedIn, GitHub and social networks.", u: "contacto.html", k: "connect message" },
                { t: "Site Map", d: "Hierarchical index of all pages.", u: "mapa-sitio.html", k: "structure" }
            ]
        };
        
        this.index = data[lang] || data['es'];
    }

    /**
     * Lógica de búsqueda mejorada:
     * 1. Normaliza (quita tildes).
     * 2. Separa por palabras.
     * 3. Calcula relevancia.
     */
    handleSearch(query) {
        const rawQuery = this.normalizeText(query.trim());

        if (rawQuery.length < 2) {
            this.resultsList.hidden = true;
            return;
        }

        // Dividimos la búsqueda en palabras individuales (tokens)
        // Ejemplo: "web oviedo" -> ["web", "oviedo"]
        const terms = rawQuery.split(/\s+/);

        // Filtramos y puntuamos
        const results = this.index.map(item => {
            let score = 0;
            
            // Preparamos los textos del item
            const title = this.normalizeText(item.t);
            const desc = this.normalizeText(item.d);
            const keys = this.normalizeText(item.k || "");

            // Verificamos CADA término de búsqueda
            const allTermsMatch = terms.every(term => {
                let termFound = false;

                // Si está en el Título: +10 puntos (Muy relevante)
                if (title.includes(term)) {
                    score += 10;
                    termFound = true;
                }
                // Si está en la Descripción: +1 punto
                else if (desc.includes(term)) {
                    score += 1;
                    termFound = true;
                }
                // Si está en palabras clave ocultas: +1 punto
                else if (keys.includes(term)) {
                    score += 1;
                    termFound = true;
                }

                return termFound;
            });

            // Retornamos el item con su puntuación si cumple todos los términos
            return allTermsMatch ? { ...item, score } : null;
        })
        .filter(item => item !== null) // Quitamos los nulos (no coincidencias)
        .sort((a, b) => b.score - a.score); // Ordenamos: mayor puntuación primero

        this.render(results);
    }

    /**
     * Utilidad para quitar tildes y pasar a minúsculas.
     * Ejemplo: "Canción" -> "cancion"
     */
    normalizeText(text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    render(items) {
        this.resultsList.innerHTML = '';

        if (items.length === 0) {
            const li = document.createElement('li');
            li.textContent = this.currentLang === 'es' ? 'Sin resultados' : 'No results';
            // Estilos inline mínimos para mantener restricción no-CSS
            li.style.padding = '0.8rem';
            li.style.color = '#666';
            li.style.fontStyle = 'italic';
            this.resultsList.appendChild(li);
        } else {
            items.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = item.u;
                
                // Resaltamos el título y ponemos la descripción pequeña
                a.innerHTML = `
                    <div style="font-weight: bold; color: var(--color-primary);">${item.t}</div>
                    <div style="font-size: 0.85em; color: #555;">${item.d}</div>
                `;
                
                // Estilos estructurales para el enlace
                a.style.display = 'block';
                a.style.textDecoration = 'none';
                a.style.padding = '0.8rem 1rem';
                
                li.appendChild(a);
                this.resultsList.appendChild(li);
            });
        }

        this.resultsList.hidden = false;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => new SearchEngine());