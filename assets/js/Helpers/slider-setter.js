const sliders = document.getElementsByName('slider');
const root = document.documentElement;

//If the browser is Firefox, the slider logic works differently,
//so we need to reset for other browsers
const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

for (var i = 0; i < sliders.length; i++) {
    if (!isFirefox) {
        root.style.setProperty('--fill-value', sliders[i].value + "%");
        sliders[i].value = 100;
    }
    else {
        root.style.setProperty('--fill-value', sliders[i].value + "%");
    }
}