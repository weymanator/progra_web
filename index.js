const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function requestListener(req, res) {
    const { url } = req;

    if (/^\/public\//.test(url)) {
        console.log(path.join(__dirname, url));
        const stream = fs.createReadStream(path.join(__dirname, url));
        stream.pipe(res);
        return;
    }

    if (url === '/' || url === '/home') {
        const stream = fs.createReadStream('./public/index.html');
        stream.pipe(res);
        return;
    }

    if (url === '/curri') {
        const stream = fs.createReadStream('./public/curri.html');
        stream.pipe(res);
        return;
    }

    if (url === '/claudio') {
        const stream = fs.createReadStream('./public/claudio_curri.html');
        stream.pipe(res);
        return;
    }

    res.writeHead(404);
    res.end();
});

server.listen(7000);
