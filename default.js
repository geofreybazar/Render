import http from "http";


let notes = [
    {
        id: 1,
        content: 'Html is Easy',
        important: true,
    },
    {
        id: 2,
        content: 'Browser can excute only JS',
        important: false,
    },
    {
        id: 3,
        content: 'GET and POST are the mose',
        important: true,
    }
];





const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify(notes));
});

const port = 3001;

app.listen(port);
console.log(`Server is now running on port ${port}`);