const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const Database = require('./Database');
const db = new Database();



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//create post api

app.post('/notes', (req, res) => {
    const body = req.body;
    console.log("body : ", body);
    db.addNote(body).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/notes', (req, res) => {
    db.getNotes().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//get one note
app.get('/note/:id', (req, res) => {
    const { id } = req.params;
    db.getNoteById(id)
    .then(data=>{
        if(!data){
            res.status(404).send('error: not find'+id);
        }else{
            res.send(data);
        }
    })
    .catch(err =>{
        res.status(500).send(err);
    })
});
const port = 3000;
app.listen(port, () => {
    console.log(`server had been started with port ${port}...`);
    db.connect();
});