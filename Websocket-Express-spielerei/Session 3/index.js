const express = require("express"); //fügt das express modul hinzu
const app = express();

app.listen(3000, function() //Ausgabe aus dem terminal
{
    console.log("Mein Server ist jetzt gestartet");
});

app.get("/", function(req, res) //Falls nichts nach dem localhost kommt
{
    res.send("hello world");
});

app.get("/name/:name", function(req, res){ //Doppelpunkt lässt source als variable nutzen
    let name = req.params.name; //Speicherweg für source Variablen
    res.send("<h1>Hello " + name +"</h1>");
});

app.get("/google/:search", function(req, res) //Goolge funktion, welche dich suchen lässt
{
    let urlsearch = req.params.search; //Speichert Suchwort in Variable
    res.redirect("https://www.google.com/search?q=" + urlsearch) //Google Abfrage
});

app.use(express.static("../GameofLife"));

app.get("/GoL", function(req, res) //Lässt das Game of Life auf dem Server laufen
{
    console.log("der Code funktionert");
    res.redirect("index.html"); //Gol HTML Pfad
0});

app.get("/*", function(req, res) //Restpfad für alle anderen Abfragen
{
    res.status(404).send("<h1>Not Found<h1>"); //Errorcode
});
