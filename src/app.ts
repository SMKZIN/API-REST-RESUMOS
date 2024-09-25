import dotenv from 'dotenv'
import express, { Application } from "express";
import routes from "./routes";

dotenv.config()
const app: Application = express();

app.use(express.json());

app.use(routes)

export default app;
