import { Request, Response } from "express";
import router from "./router.instance";
import prisma from "../db/prisma.instance";
import validateSchema from "../middlewares/safeParse.validator";
import postSchema from "../schemas/post.schema";

import PostHttpController from "../controllers/post.controller";

const HttpController = new PostHttpController();


router.post('/post', validateSchema(postSchema), HttpController.post);
router.get('/post', HttpController.get);
router.put('/post/:id',validateSchema(postSchema), HttpController.put);
router.delete('/post/:id', HttpController.delete);



export default router;