const express = require('express');

const app = express();
const port = 4000;

app.get('/', function test(req, res) {
    res.send('Hello World');
});

app.listen({ port }, () => 
    console.log(`server listening on port ${ port }`)
 );
