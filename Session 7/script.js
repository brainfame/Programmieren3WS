function main()
{
    const socket = io();
    console.log("lets chat...");

    let button = document.getElementById("send_btn");
    let input = document.getElementById("input_message");
    let chat = document.getElementById("chat");

    function handleSubmit()
    {
        console.log("button clicked");
        let message = input.value;
        if(message != "")
        {
            socket.emit("send message", message);
        }
    }
    
    socket.on("display message", function(msg)
    {
        console.log("test");
        let p = document.createElement("p")
        p.innerText = msg;
        chat.appendChild(p);
    });
    button.onclick = handleSubmit();
}

window.onload = main;