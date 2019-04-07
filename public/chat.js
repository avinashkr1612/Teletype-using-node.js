var socket = io.connect('http://localhost:8080/')

var message = document.getElementById('message');
var handle =  document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var update = document.getElementById('update');
var code = document.getElementById('code')

var docCode = document.getElementById('documentCode')
var docUpdate = document.getElementById('documentUpdate')


btn.addEventListener('click',() => {
    console.log('button clicked');
    socket.emit('chat',{
        message:message.value,
        handle: handle.value
    })
})

docCode.addEventListener("keyup", (data) => {
  docUpdate.click();
})


code.addEventListener("keyup", (data) =>{
  console.log('update execute')
  console.log(code.value);
  socket.emit('code', {
      message: code.value
  })
})


socket.on('code',(data) => {
    console.log(data);
    code.value = data.message;
})

message.addEventListener('keypress', () =>{
    socket.emit('typing'+handle.value)
})

socket.on('chat',(data) =>{
    feedback.innerHTML = ''
    output.innerHTML += '<p><strong>'+data.handle + ': </strong>'+ data.message +'</p>';
})

socket.on('typing', (data) =>{
    feedback.innerHTML = '<p><em>'+ data +'is typing.. </em></p>';
})
