/**
 * Configuración de la página de Homenaje
 */

// Configuración de audio
const audioFile = 'audio/musica.mp3';
const audio = new Audio(audioFile);
audio.loop = true;

// Lista estática de Imágenes (28 fotos encontradas)
const imageFolder = 'images/';
const images = [
    't (1).webp', 't (2).webp', 't (3).webp', 't (4).webp',
    't (5).webp', 't (6).webp', 't (7).webp', 't (8).webp',
    't (9).webp', 't (10).webp', 't (11).webp', 't (12).webp',
    't (13).webp', 't (14).webp', 't (15).webp', 't (16).webp',
    't (17).webp', 't (18).webp', 't (19).webp', 't (20).webp',
    't (21).webp', 't (22).webp', 't (23).webp', 't (24).webp',
    't (25).webp', 't (26).webp', 't (27).webp', 't (28).webp',
    't (29).webp', 't (30).webp', 't (31).webp',
    't (33).webp', 't (34).webp', 't (35).webp', 't (36).webp',
    't (37).webp', 't (38).webp', 't (39).webp', 't (40).webp',
    't (41).webp', 't (42).webp', 't (43).webp', 't (44).webp',
    't (45).webp', 't (46).webp', 't (47).webp', 't (48).webp',
    't (49).webp', 't (50).webp', 't (51).webp', 't (52).webp',
    't (53).webp', 't (54).webp', 't (55).webp', 't (56).webp',
    't (57).webp', 't (58).webp', 't (59).webp', 't (60).webp',
    't (61).webp', 't (62).webp', 't (63).webp', 't (64).webp',
    't (65).webp', 't (66).webp', 't (67).webp', 't (68).webp',
    't (69).webp', 't (70).webp', 't (71).webp', 't (72).webp',
    't (73).webp', 't (74).webp', 't (75).webp', 't (76).webp',
    't (77).webp', 't (78).webp', 't (79).webp', 't (80).webp',
    't (81).webp', 't (82).webp', 't (83).webp', 't (84).webp',
    't (85).webp', 't (86).webp', 't (87).webp', 't (88).webp',
    't (89).webp', 't (90).webp', 't (91).webp', 't (92).webp',
    't (93).webp', 't (94).webp', 't (95).webp', 't (96).webp',
    't (97).webp', 't (98).webp', 't (99).webp', 't (100).webp',
    't (101).webp', 't (102).webp', 't (103).webp', 't (104).webp',
    't (105).webp', 't (106).webp', 't (107).webp', 't (108).webp',
    't (109).webp', 't (110).webp', 't (111).webp', 't (112).webp',
    't (113).webp', 't (114).webp', 't (115).webp', 't (116).webp',
    't (117).webp', 't (118).webp', 't (119).webp', 't (120).webp',
    't (121).webp', 't (122).webp', 't (123).webp', 't (124).webp',
    't (125).webp', 't (126).webp', 't (127).webp', 't (128).webp',
    't (129).webp', 't (130).webp',
    'ol.webp', 'ol2.webp', 'ol3.webp', 'ol4.webp',
    'ol5.webp', 'ol6.webp', 'ol7.webp', 'ol8.webp',
    'ol10.webp', 'ol11.webp', 'ol12.webp',
    'ol13.webp', 'ol14.webp', 'ol16.webp',
    'o (1).webp', 'o (2).webp', 'o (3).webp', 'o (4).webp',
    'o (5).webp', 'o (6).webp', 'o (7).webp', 'o (8).webp',
    'oi (1).webp', 'oi (2).webp', 'oi (3).webp', 'oi (4).webp',
    'María Oliva (1).webp', 'María Oliva (2).webp', 'María Oliva (3).webp', 'María Oliva (4).webp',
    'María Oliva (5).webp', 'María Oliva (6).webp', 'María Oliva (7).webp', 'María Oliva (8).webp',
    'María Oliva (9).webp', 'María Oliva (10).webp', 'María Oliva (11).webp', 'María Oliva (12).webp',
    'María Oliva (13).webp', 'María Oliva (14).webp', 'María Oliva (15).webp', 'María Oliva (16).webp',
    'María Oliva (17).webp', 'María Oliva (18).webp', 'María Oliva (19).webp', 'María Oliva (20).webp',
    'María Oliva (21).webp', 'María Oliva (22).webp', 'María Oliva (23).webp', 'María Oliva (24).webp',
    'María Oliva (25).webp', 'María Oliva (26).webp', 'María Oliva (27).webp', 'María Oliva (28).webp'
];

// Referencias al DOM
const heartsContainer = document.getElementById('hearts-container');
const audioBtn = document.getElementById('audio-toggle');
const body = document.body;

let isPlaying = false;

/**
 * Función para barajar un array (Fisher-Yates)
 */
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * Inicializa una galería individual de forma perezosa (Lazy Loading)
 */
function initGallery(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Barajar TODAS las imágenes para esta galería, pero no cargarlas aún
    const shuffledImages = shuffle(images);
    let currentIndex = 0;

    container.innerHTML = '';

    // Crear solo la PRIMERA imagen inmediatamente
    function createGalleryItem(index) {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        if (index === 0) item.classList.add('active');

        const img = document.createElement('img');
        img.src = imageFolder + shuffledImages[index];
        img.alt = `Momento ${index + 1}`;
        // Lazy loading nativo para las que no son la primera
        if (index > 0) img.loading = "lazy";
        
        img.onerror = () => {
            img.src = `https://picsum.photos/seed/${index + (containerId === 'gallery-1' ? 42 : 100)}/800/1400`;
        };

        item.appendChild(img);
        container.appendChild(item);
        return item;
    }

    // Inicializar con la primera imagen
    const firstItem = createGalleryItem(0);
    // Ya está 'active' por la lógica de createGalleryItem, pero asegurémonos
    firstItem.classList.add('active');

    // Pre-cargar la SEGUNDA imagen inmediatamente
    if (shuffledImages.length > 1) {
        createGalleryItem(1);
    }

    // Función interna para cambiar imagen en este contenedor
    function nextImage() {
        const items = container.querySelectorAll('.gallery-item');
        if (shuffledImages.length === 0) return;

        const currentActive = container.querySelector('.gallery-item.active');
        const nextIndex = (currentIndex + 1) % shuffledImages.length;
        let nextItem = items[nextIndex];

        // Si por alguna razón no existe el siguiente (no debería pasar por el preload), lo creamos
        if (!nextItem) {
            nextItem = createGalleryItem(nextIndex);
        }

        // Antes de activar la siguiente, nos aseguramos que la actual se marque como 'previous'
        // Esto la mantiene debajo con opacidad 1 mientras la nueva hace su fade-in arriba.
        if (currentActive) {
            // Limpiar clases 'previous' anteriores (si quedara alguna)
            container.querySelectorAll('.gallery-item.previous').forEach(el => el.classList.remove('previous'));
            
            // Marcar actual como previous
            currentActive.classList.remove('active');
            currentActive.classList.add('previous');
        }

        // Activar la nueva imagen (comienza su fade-in arriba gracias al z-index en CSS)
        nextItem.classList.add('active');
        currentIndex = nextIndex;

        // Limpiar el estado 'previous' después de que la transición haya terminado
        // El CSS tiene 2s, usamos un pequeño margen extra
        setTimeout(() => {
            if (currentActive) {
                currentActive.classList.remove('previous');
            }
        }, 2100);

        // Pre-cargar la SIGUIENTE (la que vendrá después de esta que acabamos de mostrar)
        const preloadIndex = (currentIndex + 1) % shuffledImages.length;
        if (!container.querySelectorAll('.gallery-item')[preloadIndex]) {
            createGalleryItem(preloadIndex);
        }

        // Solo lanzamos confeti desde la galería principal para no saturar
        if (containerId === 'gallery-1') {
            launchConfetti();
        }
    }

    // Intervalos ligeramente diferentes para que no cambien al mismo tiempo
    const delay = containerId === 'gallery-1' ? 8000 : (containerId === 'gallery-2' ? 8500 : 9000);
    setInterval(nextImage, delay);
}

/**
 * Lanza una explosión de confeti (detrás de la tarjeta)
 */
function launchConfetti() {
    const duration = 1.5 * 1000;
    const end = Date.now() + duration;

    const bgCanvas = document.getElementById('bg-confetti-canvas');
    if (!bgCanvas) return;

    const myConfetti = confetti.create(bgCanvas, {
        resize: true,
        useWorker: true
    });

    (function frame() {
        if (Math.random() > 0.7) {
            myConfetti({
                particleCount: 1,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.5 },
                colors: ['#FFC9C9', '#B2F2BB', '#A5D8FF', '#FFF9DB']
            });
            myConfetti({
                particleCount: 1,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.5 },
                colors: ['#D0BFFF', '#B2F2BB', '#A5D8FF', '#FFD1DC']
            });
        }

        if (Math.random() > 0.95) {
            confetti({
                particleCount: 1,
                angle: 90,
                spread: 100,
                origin: { x: 0.5, y: 1.1 },
                colors: ['#ffffff', '#FFD1DC'],
                scalar: 0.7
            });
        }

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

/**
 * Genera corazones flotantes aleatorios
 */
function createHearts() {
    const heartColors = ['#ffb6c1', '#ff69b4', '#ff1493', '#ffa07a', '#ffc0cb'];

    setInterval(() => {
        const heart = document.createElement('span');
        heart.classList.add('heart');
        heart.innerHTML = '❤';

        const randomLeft = Math.random() * 100;
        const randomSize = Math.random() * (30 - 15) + 15;
        const randomDuration = Math.random() * (12 - 6) + 6;
        const randomColor = heartColors[Math.floor(Math.random() * heartColors.length)];

        heart.style.left = `${randomLeft}vw`;
        heart.style.fontSize = `${randomSize}px`;
        heart.style.animationDuration = `${randomDuration}s`;
        heart.style.color = randomColor;

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, randomDuration * 1000);
    }, 600);
}

/**
 * Manejo del Audio
 */
audioBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        audioBtn.classList.remove('playing');
        audioBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
        `;
    } else {
        audio.play().catch(e => console.log("Audio play blocked"));
        audioBtn.classList.add('playing');
        audioBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        `;
    }
    isPlaying = !isPlaying;
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la galería principal siempre
    initGallery('gallery-1');

    // Función para verificar e inicializar galerías laterales si es necesario
    const checkLateralGalleries = () => {
        if (window.innerWidth > 768) {
            const g2 = document.getElementById('gallery-2');
            const g3 = document.getElementById('gallery-3');
            
            // Solo inicializamos si están vacíos para evitar duplicados
            if (g2 && g2.children.length === 0) {
                initGallery('gallery-2');
            }
            if (g3 && g3.children.length === 0) {
                initGallery('gallery-3');
            }
        }
    };

    // Ejecutar al cargar
    checkLateralGalleries();

    // Y ejecutar al redimensionar la ventana (para casos de DevTools)
    window.addEventListener('resize', checkLateralGalleries);

    createHearts();
    body.classList.add('animate-bg');
    setTimeout(launchConfetti, 1000);
});
