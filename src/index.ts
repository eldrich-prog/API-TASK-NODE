import express, { Express, json } from "express";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import tempRoutes from "./routes/temp.routes";
import dataRoutes from "./routes/data.routes";
import evaluationRoutes from "./routes/evaluation.routes";
import groupRoutes from "./routes/group.routes";
import matriculationRoutes from "./routes/matriculation.routes";
import taskRoutes from "./routes/task.routes";

import cors from "cors"

// const 
const PORT:number = 3000;
const app:Express = express();

// JSON
app.use(express.json());
app.use(cors());

// ROUTES

app.use('/api', evaluationRoutes);
app.use('/api', groupRoutes);
app.use('/api', matriculationRoutes);
app.use('/api', taskRoutes);

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

export default app;
