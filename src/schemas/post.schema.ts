import { z } from 'zod';

const postSchema = z.object({
    published: z.boolean(),
    title: z.string().min(5, { message: "Must be 5 or more characters long" }),
    authorId: z.number()
    });

export default postSchema;