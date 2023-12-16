import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();


// used to set the security frontend url for incoming requests
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
// set how much size of cookie can be requested to server
app.use(express.json({ limit: "16kb" }));
// to encode the urls and limit the query size after request
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"))
app.use(cookieParser());

// routes import
import userRouter from './routes/user.routes.js'


// routes declarations
app.use('/api/v1/users',userRouter)

export { app }