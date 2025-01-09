// index.js or your entry point
import express from 'express';
import connectDb from './config/dbConnection.js'; 
import dotenv from 'dotenv';;
import cors from 'cors';
import itemRouter from './routes/itemRouter.js'; 


connectDb();


const app =express();


app.use(cors());


const port =  5000;
app.use(express.json());
app.use("/api/shop", itemRouter);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);

})
