// importScripts(['https://code.jquery.com/jquery-3.4.1.js']);
// importScripts(['config.js']);
import {sendVoice} from './output.js'

function init() {

}

function answer (source) {
    // let hours = new Date().getHours();
    // let minutes = new Date().getHours();
    return sendVoice({
        'ru': "Текущее время " + [new Date().getHours().toString(), new Date().getMinutes().toString()].join(' '),
        'en': "Current time " + [new Date().getHours().toString(), new Date().getMinutes().toString()].join(' ')
    });
}

export {init, answer}