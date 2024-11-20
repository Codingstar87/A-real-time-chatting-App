import express, { json, text } from "express" ;
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import redis  from "./db/db.js";
import { fileURLToPath } from 'url';
import path from "node:path";

import dotenv from "dotenv" ;
dotenv.config()

const app = express()
const server = createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('A new user connected');

    
    // recive the data from client to server
    socket.on("chat-message-client", (msg) => {
      const messageData = {
        text : msg ,
        timeStamp : Date.now()
      }
      console.log(messageData)
      
      // redis.rpush used to push data from right in a list or a json
      redis.rpush("messages", JSON.stringify(messageData),() => {
        
      } )
      
      //Send the data from server to client 
      io.emit("chat-massage-server" , messageData)
    })
    
    
    
    // redis.lrange used to read or display the data 
    redis.lrange("messages", 0, -1, (error, messages) => {
      if(messages){
        messages = messages.map(msg => JSON.parse(msg)) ;
        socket.emit("load messages",messages)
      }
    })
    




    socket.on("disconnect", ()=> {
    console.log("client disconnected")
  })

});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
  
});

server.listen(process.env.PORT || 3000 ,() => {
    console.log(`Server is listening on ${process.env.PORT}`)
})