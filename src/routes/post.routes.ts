import { Request, Response } from "express";
import router from "./router.instance";
import prisma from "../db/prisma.instance";
import validateSchema from "../middlewares/safeParse.validator";
import postSchema from "../schemas/post.schema";
import { createPost } from "../controllers/post.controller";

router.post('/post', validateSchema(postSchema), createPost);

router.get('/post', async (req:Request, res:Response) => {
    const allPosts = await prisma.post.findMany()
    res.status(200).json(allPosts);
});

router.put('/post', (req:Request, res:Response) => {
    res.send('Put request');
});

router.delete('/post', (req:Request, res:Response) => {
    res.send('Delete request');
});


export default router;