const express = require('express')
const path = require('path')
const http = require("http");
const socket = require("socket.io");
const formatMessages = require('./app/utils/messages');
const bodyParser = require("body-parser");
const { log } = require('console');
const fs = require('fs');



const app = express()
const server = http.createServer(app)
const io = socket(server);
const usersFilePath = path.join(__dirname, 'public/users.json')

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/sign_up", (req, res) => {
  const username = req.body.username
  const password = req.body.password
  console.log(username);
  console.log(password);
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    return res.status(500).json({
      message: `Internal server error:Error
  reasing users file${err}`
    })


    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing users file:", parseError);
        return res.status(500).json({ message: "Internal server error" });
      }
      const existingUser = users.find((user) => user.username ===
        username);

      if (existingUser) {

        return res.status(400).json({
          message: "Username already exists"
        });

      }
    }
    const newUser = { username:username, password:username };
    users.push(newUser);


  })

})

io.on("connection", (socket) => {
  socket.emit('message', formatMessages("BOT", "welcome!"))
  socket.broadcast.emit('message', formatMessages("BOT", 'A user just connected!'))

  socket.on('chatMsg', (m) => {
    io.emit('message', formatMessages("User", m))

  })

  socket.on("disconnect", () => {
    io.emit('message', formatMessages("BOT", "A user has just left!"))
  })
})
server.listen(3000, () => {
  console.log("Server listens to port 3000");
});
