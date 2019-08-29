
let receiveMessageFromWS;

let ws = new WebSocket('ws://localhost:8081');

ws.onmessage = (event)=> receiveMessageFromWS(event.data);

let sentMessageByWS = (message) => ws.send(message);

receiveMessageFromWS =  (message) => ws.send(message);






























