const express = require('express');
const app = express();
app.use(express.json());

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "phone": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "phone": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "phone": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "phone": "39-23-6423122"
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    console.log(person);
    if(person) {
        response.json(person);
    }
    else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    if(persons.some(person => person.id === id)) {
        persons = persons.filter(person => person.id !== id);
        response.status(204).end();
    }
    else {
        response.status(404).end();
    }
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if(!body.name || !body.phone) {
        return response.status(400).json({
            error: 'name or phone missing'
        });
    }
    else if(persons.some(person => person.name === body.name)) {
        return response.status(409).json({
            error: `${body.name} already exists in the phonebook`
        });
    }

    const person = {
        id: (Math.floor(Math.random()*10000000000)),
        name: body.name,
        phone: body.phone
    };

    persons = persons.concat(person);

    response.json(person);
});

app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date().toString()}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});