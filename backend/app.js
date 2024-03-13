import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dbConnection from "./server/dbconfig/index.js";

import taskRoutes from "./server/routes/task.js"


dotenv.config();

const app = express();

const PORT = process.env.PORT || 10000;

dbConnection()

app.use(helmet());
app.use(cors());
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Dev Server running on port: ${PORT}`)
})
