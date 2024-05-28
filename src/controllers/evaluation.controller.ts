import HttpInterface from "./post.interface";
import prisma from "../db/prisma.instance";
import { Request, Response } from "express";
import { NotFoundError } from "@prisma/client/runtime/library";


class EvaluationHttpController extends HttpInterface {

    async get(req:Request, res:Response): Promise<void>{
        const getAllEvaluations = await prisma.evaluation.findMany()
        res.status(200).json({id: getAllEvaluations})
    }

    async getGroupEvaluation(req:Request, res:Response): Promise<void>{
        console.log( req.query)
        const { group_id, user_id } = req.query;
        const getGroupEvaluation = await prisma.matriculation.findFirstOrThrow({
            where:{
                group_id: parseInt(group_id as string),
                mat_user_id: parseInt(user_id as string)
            }
        })

        const evaluation = await prisma.evaluation.findMany({
            include:{
                rubric: true,
                task: true,
                state: true,
            },
            
            where:{
                matriculation_id: getGroupEvaluation.id
            }
        })

        const rubric = await prisma.rubric.findMany({
            select:{
                name: true,
                porcentage: true
            },
            where:{
                id: {in: evaluation.map(evaluation => evaluation.rubric_id)}
            }
        })
        const task = await prisma.task_Type.findMany({
            select:{
                name: true
            },
            where:{
                id: {in: evaluation.map(evaluation => evaluation.task_id)}
            }
        })


        console.log(evaluation)
        res.status(200).json(evaluation.map((evaluation, index) => {
            return {
                id: evaluation.id,
                rubric: rubric[index].name,
                porcentage: rubric[index].porcentage,
                note: evaluation.note
            }
        }))
    }

    async post(req:Request, res:Response): Promise<any>{
        const newEvaluation = await prisma.evaluation.create({
            data: req.body
        })
        res.status(200).json({message: 'evaluation create', data: newEvaluation})
    }

    async put(req:Request, res:Response): Promise<void>{
        const updateEvaluation = await prisma.evaluation.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        })
        res.status(201).json({message: 'evaluation update', data: updateEvaluation})
    }

    async delete(req:Request, res:Response): Promise<void>{
        const deleteEvaluation = await prisma.evaluation.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json({ message: 'evaluation deleted', id: deleteEvaluation})

    }

}

export default EvaluationHttpController;