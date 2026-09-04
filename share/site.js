(() => {
    function selectBackground() {
        const width = window.innerWidth;
        let directory = 'backgroundIMG/mobile/';

        if (width >= 3500) {
            directory = 'backgroundIMG/4K/';
        } else if (width > 768) {
            directory = 'backgroundIMG/1080p/';
        }

        return directory + 'image1.jpg';
    }

    function setBackground() {
        const imageUrl = selectBackground();
        const image = new Image();

        image.addEventListener('load', () => {
            document.body.classList.add('background-loaded');
        }, { once: true });
        image.src = imageUrl;
        document.body.style.backgroundImage = `url("${imageUrl}")`;
    }

    document.addEventListener('DOMContentLoaded', setBackground, { once: true });
})();
