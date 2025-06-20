import express, { Application, NextFunction, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/book.controller";

const app: Application = express();
app.use(express.json())

app.use('/api/books', booksRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome from note app')
})


export default app;