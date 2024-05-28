import {z} from 'zod';

const tempSchema = z.object({
    temperature: z.number()
});

export default tempSchema;
