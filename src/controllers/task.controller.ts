import HttpInterface from "./post.interface";
import prisma from "../db/prisma.instance";
import { Request, Response } from "express";


class TaskHttpController extends HttpInterface {

    async get(req:Request, res:Response): Promise<void>{
        const allTasks = await prisma.task.findMany()
        res.status(200).json({id: allTasks})
    } 

    async getGroupTask(req:Request, res:Response): Promise<void>{
        const getGroupTask = await prisma.task.findMany({
            include:{
                task_type: true
            },
            where:{
                group_id: parseInt(req.params.id)
            }
        })
        res.status(200).json(getGroupTask)
    }

    async post(req:Request, res:Response): Promise<any>{
        const newtask = await prisma.task.create({
            data: req.body
        })
        res.status(200).json({id: newtask})
    }

    async put(req:Request, res:Response): Promise<void>{
        const updatetask = await prisma.task.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        })
        res.status(201).json({id: updatetask})
    }

    async delete(req:Request, res:Response): Promise<void>{
        const deletetask = await prisma.task.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json({id: deletetask})

    }
}

export default TaskHttpController;