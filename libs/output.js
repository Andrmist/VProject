// importScripts('https://code.jquery.com/jquery-3.4.1.js');
// let config;
// $.getJSON('/config', data => {
//     config = new function () {
//         this.conf = data;
//         this.lang = data['Options']['lang'];
//         this.confL = data[this.lang];
//     };
// });
import config from './config.js'

console.log("From output.js: ");
console.log(config);
function sendVoice(texts) {
    if (Object.keys(texts).includes(config.lang)) {
        return {type: 'voice', value: texts[config.lang]};
    } else if (Object.keys(texts).includes('en')) {
        return {type: 'voice', value: texts['en']};
    } else {
        return {type: 'error', value: config.confL['errors']['localization not found'], detailed: {expected: config.lang, received: Object.keys(texts)}};
    }
}
export {sendVoice};