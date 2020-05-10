let config;
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.mjs';
let selectedText;

if (Cookies.get('lang') === undefined) {
    Swal.fire({
        title: "Первый запуск",
        html: "Выберите язык:<br>" +
            "<select id='lang'>" +
            "<option>ru</option>" +
            "<option>en</option>" +
            "</select>",
        allowOutsideClick: false,
    }).then(() => {
        let t = document.getElementById("lang");
        selectedText = t.options[t.selectedIndex].text;
        Cookies.set('lang', selectedText);
    });
}
config = new function () {
    $.getJSON('/config', data => {
        this.conf = data;
        this.lang = selectedText?selectedText:Cookies.get('lang');
        this.confL = data[this.lang];
    });
};

export default config;
