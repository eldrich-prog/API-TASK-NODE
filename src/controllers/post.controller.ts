import { Request, Response } from "express";
import prisma from "../db/prisma.instance";

export const createPost = 
    async (req:Request, res:Response) => {
        const newPost = await prisma.post.create({
            data: req.body
        })
        res.status(201).json({ message: 'Post created', id: newPost.id})
};

