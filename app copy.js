const http = require('http');
const url = require('url')
const queryString = require('query-string');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    
    const params = queryString.parse(url.parse(req.url, true).search);
    let resposta;

    if(params.teste == 'melhor-jogo'){
        resposta = 'GTA 5';
    } else if(params.teste == 'segundo-melhor-jogo'){
        resposta = 'farcry 4';
    } else if(params.teste == 'bebe-mais-lindo-do-mundo'){
        resposta = 'Otto';
    } else {
        resposta = 'Não sei';
    }

    console.log(params);
    res.statusCode = 200;
    res.setHeader('content-type', 'text/plain');
    res.end(resposta);
});

server.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
});