//Dependencies
const express = require ("express");
const path = require("path");
const fs = require("fs");
const { join } = require("path");

//Sets up express app and handles data parsing
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

let data = fs.readFileSync(path.join(__dirname, "db/db.json"),"utf-8");
data = JSON.parse(data);

//Basic route, site intro
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

//Interface for viewing and displaying notes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("/api/notes", function(req, res) {
    res.json(data);
})

app.post("/api/notes", function(req, res){
    const newNote = req.body;

    const maxID = data.reduce(function(acc,currVal) {
        if( currVal.id > acc) return currVal.id;
        else return acc.id;
    },0)
    newNote.id = maxID + 1;

    data.push(newNote);
    fs.writeFileSync(path.join(__dirname, "db/db.json"),JSON.stringify(data))

    res.json(newNote);
})

app.delete('/api/notes/:id', function (req, res) {
    // res.send('DELETED')
    const id = req.params.id;

    data = data.filter(element => element.id !== parseInt(req.params.id));
    fs.writeFileSync(path.join(__dirname, "db/db.json"),JSON.stringify(data))
    res.send("DELETED");

  })

//Starts the server listening
app.listen(PORT, function() {
    console.log("Listening on port " + PORT);
});