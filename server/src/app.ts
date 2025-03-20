import express, { json } from "express";
import env from "dotenv"
import { connectDB } from "./db/index";
import todoRoute from "./routes/todo";
import cors from "cors";

env.config({
    path : ".env"
});


const app = express();

app.use(cors({
    origin : process.env.CLIENT_URL,
}))


app.use(json());

app.use(todoRoute);

const PORT = process.env.PORT || "4000";

app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on Port ${PORT}`);
    
})

