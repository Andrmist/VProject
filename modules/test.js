// importScripts('tts.js');
// console.log('test');
import {sendVoice} from "./output.js";

function init() {

}

function answer(data) {
    return sendVoice({
        "ru": "Все хорошо",
        "en": "All is good"
    })
}

export {answer, init}