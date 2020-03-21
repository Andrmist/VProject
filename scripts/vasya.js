// import {log, logFile, error} from './log.js'
// import say from './tts.js'
function start() {
    let startElement = $('.start');
    startElement.fadeTo('fast', 0.0)

    startVasyaEngine();
}
function startVasyaEngine() {

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    let config;
    $.getJSON('/config', data => {
        config = new function () {
            this.conf = data;
            this.lang = data['Options']['lang'];
            this.confL = data[this.lang];
        };
    });

    let userMsg = document.createElement('p');
    userMsg.align = 'right';
    // let $ = document.querySelector.bind(document);
    const socket = io.connect();
    let modules = {};
    async function loadModules() {
        socket.emit('listModules');
        await socket.on('list', files => {
            files.forEach(file => {
                let fileName = file.slice(0, file.length - 3);
                modules[fileName] = new Worker(file);
            })
        });
        console.log(modules)
    }
    function parseCmd(cmd) {
        cmd = cmd.toLowerCase();

        for (let i of config.confL['alias']) {
            cmd.replace(i, '');
        }
        for (let i of config.confL['tbr']) {
            cmd.replace(i, '');
        }
        return cmd
    }

    function recognizeCmd(cmd) {
        let RC = {source: cmd, cmd: "", percent: 0};
        for (let [key, value] of Object.entries(config.confL['cmds'])) {
            for (let i of value) {
                //log('Checking ' + cmd + ' and ' + i);
                let vrt = fuzzball.ratio(cmd, i);
                if (vrt > RC.percent) {
                    RC.cmd = key;
                    RC.percent = vrt;
                }
            }
        }
        console.log(RC);
        return RC;
    }

    async function executeCmd(cmd, source) {
        for (let key of Object.keys(modules)) {
            let value = modules[key];
            log(`${key}: ${value}`);
            if (cmd === key) {
                logFile(key, 'executing');
                value.postMessage(source);
                log('waiting info from ' + key);
                value.onmessage = output => {
                    logFile(key, 'returned output:');
                    console.log(output);
                    switch (output.data.type) {
                        case 'log':
                            logFile(key, output.data.value);
                        case 'voice':
                            let vasyaMsg = document.createElement('p');
                            // userMsg.align = 'right';
                            vasyaMsg.textContent = output.data.value;
                            words.append(vasyaMsg);
                            logFile(key, 'saying words: ' + output.data.value);
                            say(output.data.value);
                            break;

                    }
                }
            }

        }

    }

    loadModules();

    // new XMLHttpRequest().setRequestHeader('Access-Control-Allow-Origin', '*')

    // socket.on('connect', () => {
    //     console.log('connected!')
    // })


    let words = $('.words');


    words.append(userMsg);

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.addEventListener('result', ev => {
        let transcript = Array.from(ev.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        userMsg.align = 'right';
        userMsg.textContent = transcript;

        if (ev.results[0].isFinal) {
            // socket.emit('message', transcript)
            transcript = transcript.toLowerCase();
            /*
            console.log('config');
            console.log(config.confL['alias']);
            console.log('transcript');
            console.log(transcript.startsWith(config.confL['alias']));
            */
            for (let alias of config.confL['alias']) {
                // userMsg = document.createElement('p');
                // // userMsg.align = 'left';
                words.append(userMsg);
                if (transcript.startsWith(alias)) {

                    let RC = recognizeCmd(parseCmd(transcript));
                    executeCmd(RC.cmd, RC.source);
                }
            }
        }

        // console.log(transcript)
    });
    // words.appendChild(document.createElement('userMsg'))
    recognition.addEventListener('end', () => {
        userMsg = document.createElement('p');
        words.append(userMsg);
        recognition.start()
    });


    recognition.start();

}