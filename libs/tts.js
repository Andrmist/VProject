// https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ru&ttsspeed=3&q=
import {error} from "./log.js";

export default words => {
    let msg = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();
    msg.voice = voices[15];
    msg.text = words;
    msg.lang = 'ru-RU';

    speechSynthesis.speak(msg);
};

