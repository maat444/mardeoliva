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
 * Inicializa una galería individual
 */
function initGallery(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Barajar imágenes para esta galería específica
    const shuffledImages = shuffle(images);
    let currentIndex = 0;

    container.innerHTML = '';
    shuffledImages.forEach((src, index) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        if (index === 0) item.classList.add('active');

        const img = document.createElement('img');
        img.src = imageFolder + src;
        img.alt = `Momento ${index + 1}`;
        img.onerror = () => {
            img.src = `https://picsum.photos/seed/${index + (containerId === 'gallery-1' ? 42 : 100)}/800/1400`;
        };

        item.appendChild(img);
        container.appendChild(item);
    });

    // Función interna para cambiar imagen en este contenedor
    function nextImage() {
        const items = container.querySelectorAll('.gallery-item');
        if (items.length === 0) return;

        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');

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
    // Inicializar las 3 galerías
    initGallery('gallery-1');
    initGallery('gallery-2');
    initGallery('gallery-3');

    createHearts();
    body.classList.add('animate-bg');
    setTimeout(launchConfetti, 1000);
});
