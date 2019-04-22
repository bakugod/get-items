const express = require('express');
const WebSocket = require('ws');
 
const ws = new WebSocket.Server({
  port: 8081
});
 


ws.on('connection', (ws) => {
  let id = setInterval(() => {
    ws.send(
    	JSON.stringify({memory: process.memoryUsage(), 
    	string: Math.random().toString(36).substring(2)}
    	), () => {
      ;
    });
  }, 100);
  console.log('started client interval');
  ws.on('close', () => {
    console.log('stopping client interval');
    clearInterval(id);
  });
  ws.on('error', (er) => {
    console.log(' something go wrong ' + er);
    clearInterval(id);
  });
});


const app = express();

app.use("/src", express.static(__dirname + "/src"));
app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

	app.listen(8080);


      //Math.random().toString(36).substring(2)
      //JSON.stringify(process.memoryUsage()