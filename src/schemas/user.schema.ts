import { z } from 'zod';
enum Role {
    ADMIN = "ADMIN" ,
    USER = "USER",
    GUEST = "GUEST"
}

const userSchema = z.object({
    email: z.string().email().min(5, { message: "Must be 5 or more characters long" }), 
    name: z.string().min(5, { message: "Must be 5 or more characters long" }),
    role: z.nativeEnum(Role).default(Role.USER)
}).strict();


export default userSchema;