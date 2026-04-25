import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js';

import {createServer} from "http";  
import {Server} from "socket.io";
import { Socket } from 'dgram';

dotenv.config();
const PORT = process.env.PORT || 8000;

connectDB()
.then(()=>{
    app.on("error", (error)=>{
        console.log("Error", error)
        throw error;
    })
    
    const httpServer = createServer(app);
    const io  = new Server(httpServer, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            credentials: true
        }
    })

    io.on("connection", (soket)=>{
        console.log("websocket connection established with id: ", soket.id);

        soket.on("disconnect", ()=>{
            console.log("Websocket disconnected with id: ", soket.id);
        });
    });

    httpServer.listen(PORT , ()=>{
        console.log(`Server is running on Port: ${PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed", error);
    
})
