const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    
    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note has been added!');
    } else {
        res.error('Unable to add note');
    }
});

// notes.delete('/:id', (req, res) => {
//     const id = req.params.id;
// })

module.exports = notes;