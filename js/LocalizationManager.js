/**
 * Clase responsable de gestionar la internacionalización (i18n) del sitio.
 * Sigue el patrón Singleton implícito al instanciarse una sola vez al cargar.
 */
class LocalizationManager {
    
    constructor() {
        // 1. Definición del Diccionario de Traducciones (Propiedad de la instancia)
        this.translations = {
            es: {
                'site.title': 'Página web personal',
                'nav.home': 'Inicio',
                'nav.about': 'Sobre mí',
                'nav.hobbies': 'Aficiones',
                'nav.interests': 'Temas de Interés',
                'nav.contact': 'Contacto',
                'welcome.title': '¿Qué es esta página?',
                'welcome.text': 'Bienvenido a mi sitio web personal donde comparto quién soy, qué me interesa y mucho más.',
                'hobbies.music': 'Música',
                'hobbies.music.text': 'Escuchar música de todo tipo. Una de mis bandas favoritas es Imagine Dragons.',
                'hobbies.photography': 'Fotografía',
                'hobbies.photography.text': 'Me gusta sacar fotos siempre que puedo. Aquí una pequeña muestra de mis fotos favoritas.',
                'hobbies.cars': 'Coches',
                'hobbies.cars.text': 'Me apasionan los coches y todo lo relacionado con el automovilismo. Aquí un vídeo de uno de mis coches favoritos.',
                'hobbies.video-games': 'Videojuegos',
                'hobbies.video-games.text': 'También disfruto jugar videojuegos, especialmente los de supervivencia. Aquí muestro el trailer de uno de mis favoritos.',
                'help.title': 'Ayuda de navegación',
                'help.intro': 'Este sitio web ha sido diseñado priorizando la accesibilidad y la sencillez. A continuación se describen las características disponibles para facilitar su uso.',
                'help.structure': 'Estructura del sitio',
                'help.structure.text': 'El sitio se compone de cinco secciones principales accesibles desde el menú superior. Para conocer la estructura completa, puede consultar el <a href=\'mapa-sitio.html\'f>Mapa del Sitio</a>.',
                'help.shortcuts': 'Atajos de teclado y accesibilidad',
                'help.shortcuts.skip': '<strong>Navegación por teclado:</strong> Todos los elementos son accesibles mediante el tabulador. El foco visual se resalta claramente con un borde de color.',
                'help.shortcuts.text-size': '<strong>Tamaño de texto:</strong> El sitio utiliza unidades relativas. Puede aumentar el tamaño del texto usando las funciones de zoom de su navegador (<code>"Ctrl"</code> + <code>"+"</code>).',
                'contact.title': 'Vías de contacto',
                'contact.intro': 'Estaré encantado de atenderte a través de cualquiera de los siguientes canales directos:',
                'contact.email.label': 'Correo Electrónico:',
                'contact.linkedin.label': 'LinkedIn (Perfil Profesional):',
                'contact.github.label': 'GitHub (Repositorio de Código):',
                'contact.study.label': 'Actual lugar de estudio:',
                'contact.study.text': '<strong data-i18n="contact.study.label">Actual lugar de estudio:</strong><br>Escuela de Ingeniería Informática, Universidad de Oviedo.',
                'about.biography': 'Biografía',
                'about.biography.text': 'Me llamo Iker Álvarez Fernández, estudio el Máster en Ingeniería Web yme apasiona la informática, el desarrollo web y la ciberseguridad.',
                'about.education': 'Formación académica',
                'about.education.time': '2025 - En curso',
                'about.education.degree': 'Máster en Ingeniería Web - Universidad de Oviedo',
                'about.education.time.1': '2021 - 2025',
                'about.education.degree.1': 'Grado en Ingeniería del Software - Universidad de Oviedo',
                'about.experience': 'Experiencia profesional',
                'about.experience.time': '1/2/2025 - 31/3/2025',
                'about.experience.position': 'Becario en el área de arquitectura cloud en NTTData',
                'about.skills': 'Habilidades',
                'about.skills.list.1': 'HTML5, CSS3, JavaScript, TypeScript',
                'about.skills.list.2': 'Frameworks: Spring-Boot y WPF',
                'about.skills.list.3': 'Programación en Java, C#, C++ y Python',
                'about.skills.list.4': 'Diseño accesible y responsive',
                'about.projects': 'Proyectos destacados',
                'about.projects.list.1.title': 'Proyecto 1: Sitio personal',
                'about.projects.list.1.description': 'Desarrollo de una página web personal utilizando HTML, CSS y JavaScript para mostrar mi portafolio y habilidades.',
                'about.projects.list.2.title': 'Proyecto 2: Editor X3D',
                'about.projects.list.2.description': 'Creación de una herramienta web para visualizar y manejar figuras 3D en formato X3D a partir de formularios web.',
                'about.projects.list.3.title': 'Proyecto 3: Aplicación Portapapeles Avanzado',
                'about.projects.list.3.description': 'Desarrollo de una aplicación de escritorio en C# para gestionar múltiples entradas del portapapeles con funcionalidades avanzadas. Presentada como proyecto final de carrera.',
                'about.gallery': 'Galería',
                'about.gallery.caption.1': 'Foto personal',
                'about.gallery.caption.2': 'Proyecto reciente',
                'interests.technology-web': 'Tecnología y Web',
                'interests.technology-web.text': 'Me interesa el desarrollo web, la inteligencia artificial y cómo la tecnología transforma la vida cotidiana.',
                'interests.cinema': 'Cine',
                'interests.cinema.text': 'El cine me apasiona como medio de contar historias. Me interesa especialmente el cine de ciencia ficción y los documentales.',
                'map.text': 'Listado completo de las páginas disponibles en este sitio web:',
                'footer.updated': 'Actualizado:',
                'footer.map': 'Mapa del sitio',
                'footer.help': 'Ayuda',
                'footer.contact': 'Contacto',
                'skip.content': 'Saltar al contenido principal',
                'myhobbies': 'Mis Aficiones',
                'langage-select-label': 'Idioma:'
            },
            en: {
                'site.title': 'Personal website',
                'nav.home': 'Home',
                'nav.about': 'About me',
                'nav.hobbies': 'Hobbies',
                'nav.interests': 'Interests',
                'nav.contact': 'Contact',
                'welcome.title': 'What is this page?',
                'welcome.text': 'Welcome to my personal website where I share who I am, what interests me, and much more.',
                'hobbies.music': 'Music',
                'hobbies.music.text': 'Listening to all kinds of music. One of my favourite bands is Imagine Dragons.',
                'hobbies.photography': 'Photography',
                'hobbies.photography.text': 'I like taking photos whenever I can. Here is a small sample of my favourite pictures.',
                'hobbies.cars': 'Cars',
                'hobbies.cars.text': 'I am passionate about cars and everything related to motorsport. Here is a video of one of my favourite cars.',
                'hobbies.video-games': 'Video games',
                'hobbies.video-games.text': 'I also enjoy playing video games, especially survival games. Here I show the trailer of one of my favourites.',
                'help.title': 'Navigation help',
                'help.intro': 'This website has been designed prioritising accessibility and simplicity. Below you can find the available features that make it easier to use.',
                'help.structure': 'Site structure',
                'help.structure.text': 'The site is made up of five main sections accessible from the top menu. To see the full structure, you can check the <a href=\'mapa-sitio.html\'f>Site map</a>.',
                'help.shortcuts': 'Keyboard shortcuts and accessibility',
                'help.shortcuts.skip': '<strong>Keyboard navigation:</strong> All elements are accessible using the Tab key. The visual focus is clearly highlighted with a coloured border.',
                'help.shortcuts.text-size': '<strong>Text size:</strong> The site uses relative units. You can increase the text size using your browser\'s zoom features (<code>"Ctrl"</code> + <code>"+"</code>).',
                'contact.title': 'Contact methods',
                'contact.intro': 'I will be happy to hear from you through any of the following direct channels:',
                'contact.email.label': 'Email:',
                'contact.linkedin.label': 'LinkedIn (Professional profile):',
                'contact.github.label': 'GitHub (Code repository):',
                'contact.study.label': 'Current place of study:',
                'contact.study.text': '<strong data-i18n="contact.study.label">Current place of study:</strong><br>School of Computer Engineering, University of Oviedo.',
                'about.biography': 'Biography',
                'about.biography.text': 'My name is Iker Álvarez Fernández, I am studying the Master in Web Engineering and I am passionate about computing, web development and cybersecurity.',
                'about.education': 'Academic background',
                'about.education.time': '2025 - Present',
                'about.education.degree': 'Master in Web Engineering - University of Oviedo',
                'about.education.time.1': '2021 - 2025',
                'about.education.degree.1': 'Bachelor\'s Degree in Software Engineering - University of Oviedo',
                'about.experience': 'Professional experience',
                'about.experience.time': '1/2/2025 - 31/3/2025',
                'about.experience.position': 'Intern in the cloud architecture area at NTTData',
                'about.skills': 'Skills',
                'about.skills.list.1': 'HTML5, CSS3, JavaScript, TypeScript',
                'about.skills.list.2': 'Frameworks: Spring Boot and WPF',
                'about.skills.list.3': 'Programming in Java, C#, C++ and Python',
                'about.skills.list.4': 'Accessible and responsive design',
                'about.projects': 'Highlighted projects',
                'about.projects.list.1.title': 'Project 1: Personal site',
                'about.projects.list.1.description': 'Development of a personal website using HTML, CSS and JavaScript to showcase my portfolio and skills.',
                'about.projects.list.2.title': 'Project 2: X3D Editor',
                'about.projects.list.2.description': 'Creation of a web tool to visualise and manage 3D figures in X3D format from web forms.',
                'about.projects.list.3.title': 'Project 3: Advanced Clipboard Application',
                'about.projects.list.3.description': 'Development of a desktop application in C# to manage multiple clipboard entries with advanced features. Presented as final degree project.',
                'about.gallery': 'Gallery',
                'about.gallery.caption.1': 'Personal photo',
                'about.gallery.caption.2': 'Recent project',
                'interests.technology-web': 'Technology and Web',
                'interests.technology-web.text': 'I am interested in web development, artificial intelligence and how technology transforms everyday life.',
                'interests.cinema': 'Cinema',
                'interests.cinema.text': 'I am passionate about cinema as a way of telling stories. I am especially interested in science fiction films and documentaries.',
                'map.text': 'Complete list of the pages available on this website:',
                'footer.updated': 'Last updated:',
                'footer.map': 'Site map',
                'footer.help': 'Help',
                'footer.contact': 'Contact',
                'skip.content': 'Skip to main content',
                'myhobbies': 'My hobbies',
                'langage-select-label': 'Language:'
            }
        };

        // 2. Determinar idioma inicial (Preferencia guardada o por defecto 'es')
        this.currentLang = localStorage.getItem('preferredLang') || 'es';

        // 3. Inicializar el sistema
        this.init();
    }

    /**
     * Método inicializador: aplica el idioma y configura los eventos.
     */
    init() {
        this.applyLanguage(this.currentLang);
        this.attachEventListeners();
    }

    /**
     * Configura los oyentes de eventos para los botones de idioma.
     * Elimina la necesidad de 'onclick' en el HTML (Separación de intereses).
     */
    attachEventListeners() {
        const buttons = document.querySelectorAll('footer > form');
        buttons.forEach(btn => {
            btn.addEventListener('change', (event) => {
                const selectedLang = event.target.value;
                this.changeLanguage(selectedLang);
            });
        });
    }

    /**
     * Método público para cambiar el idioma.
     * @param {string} lang - El código del idioma ('es' o 'en').
     */
    changeLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            this.applyLanguage(lang);
            this.savePreference(lang);
        }
    }

    /**
     * Aplica los cambios visuales y de contenido en el DOM.
     * @param {string} lang 
     */
    applyLanguage(lang) {
        // A. Actualizar atributo lang (Accesibilidad)
        document.documentElement.lang = lang;

        // B. Actualizar textos (Data binding simple)
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translations[lang][key];

            if (translation) {
                if (element.tagName === 'IMG') {
                    element.alt = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
        
        // C. Actualizar valor del select de idioma si existe
        const langSelect = document.getElementById('language-select');
        if (langSelect) {
            langSelect.value = lang;
        }

        // D. Actualizar estado visual de los botones
        this.updateButtonState(lang);
    }

    /**
     * Actualiza la apariencia de los botones de selección de idioma.
     */
    updateButtonState(lang) {
        document.querySelectorAll('[data-lang-btn]').forEach(btn => {
            const isCurrent = btn.getAttribute('data-lang-btn') === lang;
            
            // Atributo de accesibilidad
            if (isCurrent) {
                btn.setAttribute('aria-current', 'true');
            } else {
                btn.removeAttribute('aria-current');
            }
        });
    }

    /**
     * Persistencia de datos en el navegador.
     */
    savePreference(lang) {
        localStorage.setItem('preferredLang', lang);
    }
}

// Instanciación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    new LocalizationManager();
});