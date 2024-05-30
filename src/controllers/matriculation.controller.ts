import HttpInterface from "./post.interface";
import prisma from "../db/prisma.instance";
import { Request, Response } from "express";


class MatriculationHttpController extends HttpInterface {

    async get(req:Request, res:Response): Promise<void>{
        const getAllMatriculations = await prisma.matriculation.findMany()
        res.status(200).json({id: getAllMatriculations})
    } 

    async getGroupMatriculation(req:Request, res:Response): Promise<void>{
        const getGroupMatriculation = await prisma.matriculation.findMany({
            where:{
                group_id: parseInt(req.params.id)
            }
        })
        const users = await prisma.user.findMany({
            where:{
                id: { in: getGroupMatriculation.map(matriculation => matriculation.mat_user_id)}
            }
        })
        res.status(200).json({id: users})
    }


    async post(req:Request, res:Response): Promise<any>{
        const newMatriculation = await prisma.matriculation.createMany({
            data: req.body
        })
        res.status(200).json({message: 'matriculation create', data: newMatriculation})
    }

    async put(req:Request, res:Response): Promise<void>{
        const updateMatriculation = await prisma.matriculation.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        })
        res.status(201).json({message: 'matriculation update', data: updateMatriculation})
    }

    async delete(req:Request, res:Response): Promise<void>{
        const deleteMatriculation = await prisma.matriculation.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json({ message: 'matriculation deleted', id: deleteMatriculation})

    }

}

export default MatriculationHttpController;