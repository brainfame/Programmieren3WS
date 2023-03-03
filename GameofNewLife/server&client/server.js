//Code for Serverside in game of new Life

//Deklaration
const express = require("express");
const app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
const GoL = require("../GoL");



server.listen(8080, function() //Anfangsfunction bei Aktivierung des Servers Siehe Terminal
{
    console.log("Server started");
});

<<<<<<< HEAD
//app.use(express.static("../"));
app.get("/GOL", function()
{
    res.redirect("indexSC.html");   
=======
app.use(express.static("./"));
app.get("/GOL", function()
{
    res.redirect("indexSC.html");
>>>>>>> b39a8e263d080b46c7162939842cdf362d74dabf
});

io.on("connection", function(socket)
{
    console.log(io);
    console.log(socket);
    //GoL.main();
});



app.get("*", function(req, res) //bei falscher Adresse:
{
    res.status(404).send("<h1>Not Found<h1>"); //Errorcode
});