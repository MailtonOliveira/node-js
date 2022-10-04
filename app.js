const http = require('http');
const url = require('url')
const queryString = require('query-string');
const fs = require('fs');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    let resposta;
    const urlparse = url.parse(req.url, true);
    const params = queryString.parse(urlparse.search);

if (urlparse.pathname == '/criar') { 
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err){
        if (err) throw err;
        console.log('Ta Salvo!');

        resposta = 'Ta salvo!';

        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');
        res.end(resposta);
    });

     
} else if(urlparse.pathname == '/selecionar') {
    fs.readFile('users/' + params.id + '.txt', function(err, data) {
        resposta = data

        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.end(resposta);
      });
     
} else if(urlparse.pathname == '/delete') {
    fs.unlink('users/' + params.id + '.txt', function (err) {
    console.log('File deleted!');

    resposta = err ? "Usuario nao encontrado." : "Deletado"

    res.statusCode = 200;
    res.setHeader('content-type', 'text/plain');
    res.end(resposta);
});
     
}

});

server.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
});