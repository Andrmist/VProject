// importScripts('tts.js');
console.log('test');

onmessage = source => {
    console.log('test number 2');
    // say('Все хорошо');
    postMessage({type: 'voice', value: 'Все хорошо'});

};