
let WS = require('ws');
let http = require('http');
let fs = require('fs');
let path = require('path');


let files = {};

let readDir = (()=>{
    let dir = fs.readdirSync('./');
    dir.forEach(file=>{
        files[file] = fs.readFileSync( path.normalize('./'+file) ).toString('utf-8');
    })
})();


let server = new http.createServer((req, res)=>{

    if(req.method !== 'GET') return res.end('Not allowed!');
    if(req.url === '/') return res.end(files['index.html']);

    let filename = req.url.substring(1);
    if(files[filename]) return res.end(files[filename]);

    res.end('Not found!')
});
server.listen(8080, ()=>console.log('Server listening on port 8080'));


let wsserver = new WS.Server({port: 8081}, ()=> console.log('Web socket server listening...'));
let clients = [];

let handleMessage = (message, id)=>{
    clients.forEach((client, num) => {
        if(num != id) client.send(`${message} from user ${id}`);
    })
};

wsserver.on('connection', (ws)=>{
    let id = clients.length;
    clients[id] = ws;
    ws.send('Hello in chat!');
    ws.on('message', (message)=> handleMessage(message, id));
});


process.on('uncaughtException', err => console.log(err))








































