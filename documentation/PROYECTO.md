# Tributo a María Oliva Correa - Especificaciones Técnicas

Este proyecto es una página de homenaje (tributo) de alto rendimiento, diseñada con una estética premium y un enfoque en la carga instantánea de recursos.

## 🚀 Optimizaciones de Rendimiento y Carga

Para garantizar una experiencia fluida desde el primer segundo, se implementaron las siguientes estrategias:

1.  **Carga Perezosa de Imágenes (Custom Lazy Loading)**:
    -   El sistema ya no carga todas las imágenes al inicio. En su lugar, baraja la lista completa pero solo inicializa y descarga la **primera imagen** de cada galería visible.
    -   Las imágenes siguientes se crean y cargan en el DOM bajo demanda, justo antes de que les toque aparecer en el carrusel.
    -   Uso de `loading="lazy"` nativo para optimización de segundo nivel.

2.  **Inicialización Adaptativa**:
    -   **Móvil**: Solo se inicializa la galería principal (1 imagen inicial).
    -   **Desktop**: Se inicializan las 3 galerías (3 imágenes iniciales).
    -   Esto reduce drásticamente el uso de ancho de banda y memoria en dispositivos móviles.

3.  **Gestión de Memoria Eficiente**:
    -   En lugar de tener 150+ elementos `<img>` pesados en el DOM desde el principio, el sitio mantiene un número mínimo de nodos, creándolos secuencialmente.

## ✨ Sutilidades Estéticas y Personalidad

La presentación se apoya en detalles visuales que crean una atmósfera acogedora y profesional:

1.  **Efecto Ken Burns Reajustado**:
    -   Cada imagen presenta un zoom-in sutil y constante mediante animaciones CSS `@keyframes`. Este efecto se reinicia con cada cambio de imagen, dando vida y dinamismo a la presentación sin ser intrusivo.
2.  **Sistema de Layout "No-Overlap"**:
    -   El encabezado (header) utiliza un posicionamiento relativo que respeta el espacio de la galería, asegurando que nunca se superponga a las fotos.
3.  **Paleta de Colores Dinámica**:
    -   El fondo transiciona suavemente entre tonos pasteles (cremas, lavandas, mentas), creando un entorno visual armónico que cambia mientras el usuario observa las fotos.
4.  **Micro-interacciones**:
    -   Corazones flotantes animados en el fondo y confeti sutil al transicionar imágenes para reforzar el tono emocional del tributo.
5.  **Tipografía Curada**:
    -   Uso de `Dancing Script` para el nombre, aportando una caligrafía elegante y personal.

## 🛠 Especificaciones Técnicas

-   **Tecnologías**: HTML5, CSS3 (Vanilla), JavaScript (ES6+).
-   **Bibliotecas**: Canvas Confetti.
-   **Arquitectura**: Mobile-first y responsive total.
-   **Formato de Archivos**: Uso de `.webp` para todas las imágenes para maximizar la calidad con el mínimo peso.
