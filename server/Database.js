const mongoose = require('mongoose');
const Note = require('./schames/note');
class Database {

    constructor() {
        this.Url = "mongodb://localhost:27017/notaty";

    }

    connect() {
        mongoose.connect(this.Url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then(() => {
                console.log('database connected');
            }).catch((err) => {
                console.log("err connecting db ", err);
            });

    }
    addNote(note) {
        return new Promise((resolve, reject) => {
            note["createdDate"] = new Date();
            note["updatedDate"] = new Date();

            let newNote = new Note(note);
            newNote.save().then(doc => {
                resolve(doc);
            }).catch(err => {
                reject(err);
            });
        })

    }

    //get one Note
    getNoteById(id){
      return new Promise((resolve ,reject)=>{
    Note.findById(id)
    .then(data=>{
        resolve(data);
    })
    .catch(err =>{
        reject(err);
    });
});
    }


    getNotes(){
        return new Promise((resolve,reject)=>{
            Note.find({})
            .then(data =>{
                resolve(data);
            })
            .catch(err =>{
                reject(err);
            });
        });
    }

}

module.exports = Database;