function main() {  
    var socket = io();
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
    var removeButton = document.getElementById('rem');
    

    function handleSubmit(evt) 
    {
        var val = input.value;
        if (val != "") 
        {
            socket.emit("send message", val);
        }

    }
    button.onclick = handleSubmit;

    function deleteMes(evt) 
    {
        socket.emit("want to delete");

    }
    removeButton.onclick = deleteMes;

    function handleMessage(msg) 
    {
        var p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = "";
        
    }

    function deleteMessages(msg)
    {
        var pElement = document.getElementsByTagName("p"), index;

        for (index = pElement.length - 1; index >= 0; index--) 
        {
            pElement[index].parentNode.removeChild(pElement[index]);
        }
    }

    socket.on('display message', handleMessage);
    socket.on("remove", deleteMessages);

    //use enter forsending messages
    input.addEventListener("keyup", function(event) 
    {
        event.preventDefault();
        if (event.keyCode === 13) {
            button.click();
    }
    });
} // main closing bracket

window.onload = main;