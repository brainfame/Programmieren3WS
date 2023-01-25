const express = require("express");
const app = express();
let httpServer = require("http").Server(app);
let {Server} = require("socket.io");
const io  = new Server(httpServer);

let messages = [];

app.use(express.static("./"));

app.get("/", function(res, req)
{
    res.redirect("index.html");
});

httpServer.listen(3000, function()
{
    console.log("Server gestartet");
});

io.on("connection", function(socket)
{
    console.log("Websocket connection established", );

    for(let i = 0; i < messages.length; i++)
    {
        socket.emit("display message", messages[i]);
    }
    socket.on("send message", function(data)
    {
        messages.push(data);
        io.emit("display message", data);

    });
});

