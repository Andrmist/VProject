function log(str) {
    console.log('[LOG]: ' + str);
}
function logFile(file, text) {
    console.log(`[${file}]: ${text}`);
}
function error(thing, text) {
    console.error(`${thing ? thing + ' ' : ''}failed: ${text}`);
}
// export {log, logFile, error}
// export default {log, logFile, error}