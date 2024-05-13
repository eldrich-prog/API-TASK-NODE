import { z, AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validateSchema=
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            const answer = schema.safeParse(req.body)
            if (answer.success) {
                next();
            } else {
                res.status(400).json(answer.error.errors);
            }
        };

export default validateSchema;