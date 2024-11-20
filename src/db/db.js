import Redis from "ioredis";

import dotenv from "dotenv" ;
dotenv.config()


const redis = new Redis({
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT, 
    password: process.env.REDIS_PASSWORD, 
    maxRetriesPerRequest: null,  
    tls: {},
    reconnectOnError: (err) => {
        console.error("Reconnect on error:", err);
        return true; // Auto-reconnect on error
    }
});
// const redis = new Redis({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//     password: process.env.REDIS_PASSWORD 
// });



export default redis ;