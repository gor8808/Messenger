var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [];
var fs = require('fs');


function addZero(i) {// adding zero to date
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function getDate() {
    var date = new Date();
    var y = date.getFullYear()
    var day = date.getDate()
    var month = date.getMonth();
    var months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct"," Nov","Dec"];
    var currentMonth = months[month];;
    var h = addZero(date.getHours());
    var m = addZero(date.getMinutes());
    var s = addZero(date.getSeconds());
    var date = y + " " + currentMonth + ' ' + day+ "  " + h + ":" + m + ":" + s;
    return date;
}


app.use(express.static("."));
app.get('/', function (req, res) 
{
    res.redirect('index.html');
});
server.listen(3000);

io.on('connection', function (socket) 
{
    for (var i in messages) 
    {
        io.sockets.emit("display message", messages[i]);
    }
    socket.on("send message", function (data) 
    {
        messages.push(data);
        io.sockets.emit("display message", data);


        // save messages to the messages.json
        var myJSON = JSON.stringify(messages);
        fs.writeFile('messages.json','{\n\n "'+ getDate() + '":'+myJSON + "\n\n }",function(err){console.log(err)});
        







    });
    socket.on("want to delete", function () 
    {
        messages = [];
        io.sockets.emit("remove");
    });
    
});
