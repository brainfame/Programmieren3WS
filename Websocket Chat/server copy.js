const express = require("express");
const app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

let messages = [];

app.use(express.static("./"));

app.get("/messanger", function(req, res)
{
  res.redirect("index.html");
});


app.listen(3000, function()
{
  console.log("Working");
});
