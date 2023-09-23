import express from "express"
import {json, urlencoded } from "body-parser"
import db from "mongoose"
import todoRoutes from "./routes/todos";


const app = express()


app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/todos", todoRoutes);


app.use(
    (
        err:Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.status(500).json({
            message: err.message
        })
    }
)


const main = async  () => {
    try {
    await db.connect("mongodb:localhost:27017/todos")
    app.listen(3000, () => {
        console.log("server is listening in port 3000")
    })
    console.log("Database Connected")
    } catch (error) {
        throw new Error("SERVER ERROR")
    }
}


