// get elements
const carousels = document.querySelectorAll('.photo-carousel');

carousels.forEach(carousel => {
    let currentIndex = 0;
    const images = carousel.querySelectorAll('.carousel-image');
    const totalImages = images.length;
    const intervalTime = 3000; // time of slide switching in ms
    let slideInterval;

    // image dimensions (vertical/horizontal)
    images.forEach(img => {
        img.addEventListener('load', () => {
            if (img.naturalWidth > img.naturalHeight) {
                img.style.objectFit = 'cover';
            } else {
                img.style.objectFit = 'contain';
            }
        });
    });

    // display and hide img
    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.style.opacity = '1';
                img.style.transform = 'translateX(0)';
            } else if (i === (index + 1) % totalImages) {
                img.style.opacity = '0';
                img.style.transform = 'translateX(100%)';
            } else {
                img.style.opacity = '0';
                img.style.transform = 'translateX(-100%)';
            }
        });
    }

    function nextImage() {
        images[currentIndex].style.transform = 'translateX(-100%)';
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function prevImage() {
        images[currentIndex].style.transform = 'translateX(100%)';
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextImage, intervalTime);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // initilize
    showImage(currentIndex);
    startSlideShow();

    // Get button
    const prevButton = carousel.querySelector('.prev-button');
    const nextButton = carousel.querySelector('.next-button');

    // click event listener prev
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopSlideShow();
            prevImage();
            startSlideShow();
        });
    }

    // click event listener next
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopSlideShow();
            nextImage();
            startSlideShow();
        });
    }

    carousel.addEventListener('mouseenter', stopSlideShow);
    carousel.addEventListener('mouseleave', startSlideShow);
});
