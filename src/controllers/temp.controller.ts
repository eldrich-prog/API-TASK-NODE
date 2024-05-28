import { Request, Response } from "express";
import prisma from "../db/prisma.instance";
import HttpInterface from "./post.interface";
import { string } from "zod";
class PostHttpController extends HttpInterface {

    async post(req:Request, res:Response): Promise<void> {
        req.body.temperature = parseFloat(req.params.temp);

        const newPost = await prisma.temperature.createMany({
            data: req.body
        })
        res.status(201).json({ message: 'Post created', id: newPost})
    }

    async get(req:Request, res:Response) {
        const allPosts = await prisma.temperature.findMany()
        res.status(200).json(allPosts);
    }

    async put(req:Request, res:Response) {
        const updatedPost = await prisma.temperature.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:req.body
        });
        res.status(200).json({ message: 'Post updated', id: updatedPost.id})
    }

    async delete(req:Request, res:Response) {
        const deletePost = await prisma.temperature.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json({ message: 'Post deleted', id: deletePost})
    }

}


export default PostHttpController;