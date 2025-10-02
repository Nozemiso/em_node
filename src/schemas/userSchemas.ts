import z from "zod";
import { UserRole } from "../models/user";

/**
 * @typedef {object} CreateUserSchema
 * @property {string} name
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {object} UserObject
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {boolean} isActive
 */

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