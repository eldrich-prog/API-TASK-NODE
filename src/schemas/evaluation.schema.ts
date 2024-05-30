import { z } from 'zod';

const evaluationSchema = z.object({
    note: z.number().int().min(0).max(20),
    
});

export default evaluationSchema;