// https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ru&ttsspeed=3&q=

async function say(words) {
    let audio = await new Audio('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ru&ttsspeed=3&q=' + words);
    await audio.play().then(r => audio.pause()).catch(r => error('tts', 'audio failed: ' + r));
}

// export default say;