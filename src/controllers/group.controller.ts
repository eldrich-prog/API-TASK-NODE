import HttpInterface from "./post.interface";
import prisma from "../db/prisma.instance";
import { Request, Response } from "express";


class GroupHttpController extends HttpInterface {

    async get(req:Request, res:Response): Promise<void>{
        const AllGroups = await prisma.group.findMany()
        res.status(200).json({id: AllGroups})
    } 
    async getGroup(req:Request, res:Response): Promise<void>{
        const getGroup = await prisma.group.findMany({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json({id: getGroup})
    }
    
    async post(req:Request, res:Response): Promise<any>{
        try{
            const newGroup = await prisma.group.create({
                data: req.body
            })
            res.status(200).json({id: newGroup})
        }catch(err){
            res.status(400).json({error: err})
        }
    }
    


    async put(req:Request, res:Response): Promise<void>{
        const updateGroup = await prisma.group.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        })
        res.status(201).json({id: updateGroup})
    }

    async delete(req:Request, res:Response): Promise<void>{
        const deleteGroup = await prisma.group.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json({id: deleteGroup})

    }
}

export default GroupHttpController;