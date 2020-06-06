const Koa = require('koa');
const Router = require('koa-router');
const IO = require('koa-socket-2');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();
const fs = require('fs');

io = new IO();
io.attach(app);

io.on('listModules', (ctx, data) => {
    fs.readdir('modules', (err, files) => {
        ctx.socket.emit('list', files);
    });
});

router.get('/', async ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('index.html');
});

router.get('/config', async ctx => {
    ctx.type = 'json';
    ctx.body = fs.createReadStream('config.json');
});


app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve('./modules'))
    .use(serve('./libs'))
    .use(serve('./img'))
    .use(serve('./styles'))
    .use(serve('./scripts'));

app.listen(3000);
console.log('Listening: http://localhost:3000');
