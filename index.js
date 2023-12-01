import express from 'express';
import morgan from 'morgan';
import cors from 'cors';


const PORT = 3301;
const app = express();
app.use(cors());


app.use(express.json());
app.use(morgan('tiny'));
// app.use(logger);


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
    },
    {
        id: 4,
        content: 'sample',
        important: false,
    }
];

// function logger(req, res, next){
//     console.log(`Method: ${req.method}`);
//     console.log(`Path: ${req.path}`);
//     console.log(`Body: ${JSON.stringify(req.body)}`);
//     console.log("--------");
//     next();
// }

function unknownEndPoint(req, res) {
    return res.status(404).send({ error: "error:Unknown End-Point" });
}

app.get('/notes/info', (req,res) => {
    let count = 0;
    for (const note of notes) {
        count++;
      }
    res.send(`<h1>I have ${count} notes </h1>`)
});


app.get('/', (request, response) => {
    response.send('<h1>Hello</h1>')
});

app.get('/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find((note) =>note.id === id);

    response.json(note);
});

app.get('/notes', (request, response) => {
    response.json(notes);
});

app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !==id);

    response.status(204).end();
});

app.post('/notes', (request, response) => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)):0;
    const note = request.body;
    note.id = maxId + 1;

    notes = notes.concat(note);

    response.json(note);
    
});


 app.use(unknownEndPoint)

app.listen(PORT, () => {
    console.log(`Server is now running on ${PORT}`);
});

