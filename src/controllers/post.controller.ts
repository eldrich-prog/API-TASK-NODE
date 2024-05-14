import { Request, Response } from "express";
import prisma from "../db/prisma.instance";
import HttpInterface from "./post.interface";
import { string } from "zod";
class PostHttpController extends HttpInterface {

    async post(req:Request, res:Response): Promise<void> {
        const newPost = await prisma.post.create({
            data: req.body
        })
        res.status(201).json({ message: 'Post created', id: newPost.id})
    }

    async get(req:Request, res:Response) {
        const allPosts = await prisma.post.findMany()
        res.status(200).json(allPosts);
    }

    async put(req:Request, res:Response) {
        const updatedPost = await prisma.post.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:req.body
        });
        res.status(200).json({ message: 'Post updated', id: updatedPost.id})
    }

    async delete(req:Request, res:Response) {
        const deletePost = await prisma.post.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json({ message: 'Post deleted', id: deletePost})
    }

}


export default PostHttpController;