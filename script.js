document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0';
            header.style.background = 'rgba(15, 15, 19, 0.85)';
        } else {
            header.style.padding = '0';
            header.style.background = 'rgba(26, 26, 32, 0.6)';
        }
    });

    // Carousel Implementation
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    let currentIndex = 0;
    const slideCount = slides.length;

    // Create indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('indicator');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(dot);
    });

    const indicators = Array.from(indicatorsContainer.children);

    function updateCarousel() {
        // Move track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoplay();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
        resetAutoplay();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
        resetAutoplay();
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Autoplay functionality
    let autoplayInterval;
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds per slide
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Initial start
    startAutoplay();

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carouselContainer.addEventListener('mouseleave', startAutoplay);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
});
