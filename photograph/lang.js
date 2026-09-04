const contentMapping = [
    { selector: 'a[href="index.html"]', EN: 'Intro', CH: '简介' },
    { selector: 'a[href="photograph.html"]', EN: 'Photo', CH: '摄影' },
    { selector: 'a[href="astro.html"]', EN: 'Astro', CH: '天文' },
    { selector: 'a[href="programming.html"]', EN: 'Code', CH: '编程' },
];

// switch lang
function switchLanguage(isEnglish) {
    var lang = isEnglish ? 'EN' : 'CH';

    contentMapping.forEach(item => {
        if (item.element) {
            item.element.textContent = item[lang];
        }
    });

    localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const languageSwitch = document.getElementById('languageSwitch');

    // switch event
    if (languageSwitch) {
        languageSwitch.addEventListener('change', () => {
            switchLanguage(languageSwitch.checked);
        });
    }

    // initialize content mapping & elements list
    contentMapping.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            item.element = element;
        }
    });

    // save lang preference
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        switchLanguage(savedLang === 'EN');
        if (languageSwitch) {
            languageSwitch.checked = savedLang === 'EN';
        }
    }
});