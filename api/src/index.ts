import express from "express"
import dotenv from 'dotenv'
dotenv.config()
import appRouter from './routes/gateway.ts'
const app = express()
const PORT = 5000;
import cors from 'cors'
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))
app.use("/api/v1", appRouter)

app.listen(PORT, ()=>{
  console.log("SERVER IS RUNNING")
})
