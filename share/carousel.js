function initializeCarousel(carousel) {
    const images = Array.from(carousel.querySelectorAll('.carousel-image'));
    const totalImages = images.length;
    let currentIndex = 0;

    if (!totalImages || carousel.dataset.initialized) {
        return;
    }

    carousel.dataset.initialized = 'true';
    const isAstroCarousel = Boolean(carousel.closest('#planet, #deepsky, #starField'));

    function loadImage(index, callback) {
        const image = images[index];

        if (image.src) {
            callback();
            return;
        }

        const finish = () => callback();
        image.addEventListener('load', () => {
            if (isAstroCarousel) {
                carousel.style.paddingBottom = image.naturalWidth > image.naturalHeight ? '66.67%' : '150%';
            }
            finish();
        }, { once: true });
        image.addEventListener('error', finish, { once: true });
        image.decoding = 'async';
        image.src = image.dataset.src;
    }

    function showImage(index) {
        images.forEach((image, imageIndex) => {
            image.style.opacity = imageIndex === index ? '1' : '0';
            image.style.transform = imageIndex === index
                ? 'translateX(0)'
                : imageIndex === (index + 1) % totalImages
                    ? 'translateX(100%)'
                    : 'translateX(-100%)';
        });
    }

    function move(direction) {
        const nextIndex = (currentIndex + direction + totalImages) % totalImages;

        loadImage(nextIndex, () => {
            currentIndex = nextIndex;
            showImage(currentIndex);
        });
    }

    loadImage(0, () => showImage(0));
    carousel.querySelector('.prev-button')?.addEventListener('click', () => move(-1));
    carousel.querySelector('.next-button')?.addEventListener('click', () => move(1));
}

const carousels = document.querySelectorAll('.photo-carousel');
if ('IntersectionObserver' in window) {
    const carouselObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeCarousel(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '300px 0px' });

    carousels.forEach(carousel => carouselObserver.observe(carousel));
} else {
    carousels.forEach(initializeCarousel);
}
