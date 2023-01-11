const express = require("express");
const app = express();

app.listen(3000, function()
{
    console.log("Mein Server ist jetzt gestartet");
});

app.get("/", function(req, res)
{
    res.send("hello world");
});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Hello " + name +"</h1>");
 });