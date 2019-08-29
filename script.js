
let start = ()=>{
    console.log('Starting chat...');

    receiveMessageFromWS =  (message) => addMassageToList (message, 'servermessage');
    let sendMessageOnServer = (message)=> sentMessageByWS(JSON.stringify(message));

    let addMassageToList = (message, liclass = 'clientmessage')=>{
        let li = document.createElement('li');
        li.innerHTML = message;
        li.classList.add(liclass);
        messageslist.appendChild(li);
    };

    chatform.onsubmit = ()=> {
        let message = chatinput.value;
        if (!message.length) return false;
        chatinput.value = '';
        addMassageToList(message, 'clientmessage')
        sendMessageOnServer(message)
        return false;
    };

}

window.onload = start;














