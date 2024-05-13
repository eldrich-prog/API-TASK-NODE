import { Router, Request, Response } from "express";
import router from "./router.instance";
import prisma from "../db/prisma.instance";




router.get('/user', async (req: Request, res: Response) => {
    const products = await prisma.user.findMany()
    res.json(products)
});

router.post('/user', async (req: Request, res: Response) => {
    const newClient = await prisma.user.create({
        data: req.body
    });
    res.status(201).json({ message: 'User created', newClient });
});

router.put('/user', (req: Request, res: Response) => {
    res.send('Put request');
});

export default router;