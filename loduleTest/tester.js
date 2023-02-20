const express = require("Express"); // Implementiert die express-Bib
const DoubleCounter = require("./square.js");
const app = express(); //erstellt ein Objekt
app.use(express.static("../GameofLife"));

app.listen(3000, function() //Falls der 3000. Port bedient wird, soll folgende Funktion aufgerufen werden
{
    console.log("Server läuft auf Port 3000");
});
app.get("/name:name", function(req, res)
{
    let name = req.params.name;
    res.send("Hallo " + name + ", nice to meet you!");
});

app.get("/games", function(req, res)
{
    res.redirect("/index.html");
});

app.get("/doubler:num", function(req, res)
{
    let doubleObj = new DoubleCounter(req.params.num);
    let show = doubleObj.double();
    res.send("This Website doubles the value given in its URL: "+ show);
});


app.get("/", function(req, res) //Objekt reagiert, wenn erster Parameter aufgerufen wird
{
    res.send("hello world"); //falls auf diese Seite zugegriffen wird, soll folgender Befehl aufgerufen werden
});
