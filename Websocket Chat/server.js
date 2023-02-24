const express = require("express");
const app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let messages = [];

app.listen(3000, function()
{
    console.log("Server gestartet");
});

app.use(express.static("./"));
app.get("/messages", function(req, res)
{
    res.redirect("index.html");
});

io.on("connection", function(socket)
{
    for(let i in messages)
    {
        io.sockets.emit("display message", messages[i]); //Sende jede verfasste Nachricht an jede neue Verbindung
    }
    socket.on("send message", function(data)
    {
        messages.push(data);
        io.sockets.emit("display messages", data); //
    });
});
//bei falscher Adresse:
app.get("*", function(req, res)
{
    res.status(404).send("<h1>Not Found<h1>"); //Errorcode
});

