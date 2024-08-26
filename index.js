import express from "express";
import router from "./routes/Routes.js";
import bodyParser from "body-parser";
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT
const app = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use("/", router)

app.listen(3000, () => {
    console.log("server berjalan di http://localhost:" + PORT )
})