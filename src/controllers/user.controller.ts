import HttpInterface from "./post.interface";
import prisma from "../db/prisma.instance";
import { Request, Response } from "express";


class UserHttpController extends HttpInterface {

    async get(req:Request, res:Response): Promise<void>{
        const getAllUsers = await prisma.user.findMany()
        res.status(200).json({message: 'all users', data: getAllUsers})
    } 

    async post(req:Request, res:Response): Promise<any>{
        const newUser = await prisma.user.create({
            data: req.body
        })
        res.status(200).json({message: 'user create', data: newUser})
    }

    async put(req:Request, res:Response): Promise<void>{
        const updateUser = await prisma.user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        })
        res.status(201).json({message: 'user update', data: updateUser})
    }

    async delete(req:Request, res:Response): Promise<void>{

    }

}

export default UserHttpController;