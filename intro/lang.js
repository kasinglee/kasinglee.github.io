const contentMapping = [
    { selector: 'a[href="index.html"]', EN: 'Intro', CH: '简介' },
    { selector: 'a[href="photograph.html"]', EN: 'Photo', CH: '摄影' },
    { selector: 'a[href="astro.html"]', EN: 'Astro', CH: '天文' },
    { selector: 'a[href="programming.html"]', EN: 'Code', CH: '编程' },
    { selector: '.name', EN: 'Jason_xdd', CH: 'Jason_xdd' },
    { selector: '.bio1', EN: 'A little Geek, always tinkering with tech.', CH: '一个小Geek，没事就鼓捣技术。' },
    { selector: '.bio2', EN: 'Passionate about photography and long-distance running!', CH: '平常热爱摄影、中长跑！' },
    { selector: '.bio3', EN: 'Interested in engineering and loves CS.', CH: '爱好工程，喜欢CS。' },
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