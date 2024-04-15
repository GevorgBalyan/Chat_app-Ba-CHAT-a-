const socket = io();

const chatForm = document.getElementById('chat-form')
const messagesContainer = document.querySelector(".chat-messages");

chatForm.addEventListener('submit', (e)=>{
e.preventDefault()
const msg = e.target.elements.msg.value
e.target.elements.msg.value=''
e.target.elements.msg.focus()
socket.emit('chatMsg', msg)

})
function outputMsg (obj){
const div = document.createElement('div')
const container = document.querySelector(".chat-messages");
div.classList.add('message')
div.innerHTML = `<p class='meta'>${obj.username}
<span>${obj.time}</span></p><p class='text'>${obj.message}</p>`;
container.appendChild(div)
}

socket.on('message', (data)=>{
outputMsg (data)
messagesContainer.scrollTop=messagesContainer.scrollHeight
})