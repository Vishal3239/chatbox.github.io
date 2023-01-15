const socket=io()

let name;
let textarea=document.querySelector('#messageInp')
let messageArea=document.querySelector('.container')
do{
    name = prompt('Please enter your name: ')
}while(!name)

textarea.addEventListener('keyup',(e) => {
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})
 
function sendMessage(message){
    let msg={
        user: name,
        messgage: message
    }
    // append
    appendMessage(msg,'right')
    scrollToBottom()
    textarea.value=''
    //send to server
    socket.emit('message',msg)
    
}
function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'massage')
    let markup=`
    <h4>${msg.user}</h4>
    <div>${msg.messgage}</div>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}
// recieve msg
socket.on('message',(msg)=>{
    appendMessage(msg,'left')
    scrollToBottom()
})
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}

