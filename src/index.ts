import express, { Express, json } from "express";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";



// const 
const PORT:number = 3000;
const app:Express = express();

// JSON
app.use(express.json());

// ROUTES
app.use('/api', userRoutes);
app.use('/api', postRoutes);


app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

export default app;
