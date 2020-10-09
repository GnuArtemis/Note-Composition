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

//Basic route, site intro
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

//Interface for viewing and displaying notes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("/api/notes", function(req, res) {
    let data = fs.readFileSync(path.join(__dirname, "db/db.json"),"utf-8");
    data = JSON.parse(data);
    res.json(data);
})

app.post("/api/notes", function(req, res){
    let data = fs.readFileSync(path.join(__dirname, "db/db.json"),"utf-8");
    data = JSON.parse(data);
    console.log(data);
    const newNote = req.body;
    data.push(newNote);
    fs.writeFileSync(path.join(__dirname, "db/db.json"),JSON.stringify(data))

    res.json(newNote);
})

//Starts the server listening
app.listen(PORT, function() {
    console.log("Listening on port " + PORT);
});