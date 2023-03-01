function main()
{
    const socket = io();
    const chatDiv = document.getElementById("chat"); // um HandleMessage anzulegen
    const input = document.getElementById("input_message");//nimmt Wert daraus, um es weiterzuleiten
    const button = document.getElementById("send_btn");//um handleSubmit anzusteuern
    
    function handleSubmit(evt)
    {
        let val = input.value;
        if(val != "")
        {
            socket.emit("send message", val);
            button.style.background='#43A047';
        }
        else
        {
            button.style.background='#FF0000';
        }
    }
    
    function handleMessage(msg)
    {
        
        if(msg == "")
        {
            console.log("No Sting input");
        }
        else
        {
            console.log("penis");
            let p = document.createElement("p"); //erstellt DOM Feld in der Index.html
            p.innerText = msg; //msg ist entweder "data" oder einzelne messages aus der server.js
            p.classList.add("chat_p"); //fügt es der ClassList chat_p in CSS hinzu
            chatDiv.appendChild(p); //fügt das DOM Feld p in das übergeordnete DOM ein
            input.value = ""; //leert den Input; Sowohl in der Index als auch in der Const
        }

    }

    button.addEventListener("click", handleSubmit);
    socket.on("display messages", handleMessage);
}
window.addEventListener("onload", main());

