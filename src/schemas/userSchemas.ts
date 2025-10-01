import z from "zod";
import { UserRole } from "../models/user";

export const userSchema = z.object({
    id: z.uuid().optional(),
    name: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.enum(UserRole).optional(),
    isActive: z.boolean().optional()
})

export const userIdSchema = z.object({
    id: z.uuid()
})