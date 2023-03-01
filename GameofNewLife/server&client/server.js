//Code for Serverside in game of new Life

//Deklaration
const express = require("express");
const app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

server.listen(8080, function() //Anfangsfunction bei Aktivierung des Servers Siehe Terminal
{
    console.log("Server started");
});

app.use(express.static("./"));
app.get("/GOL", function()
{
    res.redirect("indexSC.html");
});

io.on("new connect", function(socket)
{
    blavblabal;
});



app.get("*", function(req, res) //bei falscher Adresse:
{
    res.status(404).send("<h1>Not Found<h1>"); //Errorcode
});