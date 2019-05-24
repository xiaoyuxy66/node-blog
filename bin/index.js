const http=require('http');
const httpHandle=require('../app');

const PORT=8000;
const server = http.createServer(httpHandle);
server.listen(PORT);
console.log('ok');