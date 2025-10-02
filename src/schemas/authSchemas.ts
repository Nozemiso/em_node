import z from "zod";


/**
 * @typedef {object} SigninSchema
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef {object} TokenSchema
 * @property {string} token
 */
export const signinSchema = z.object({
    email: z.email(),
    password: z.string()
})

export const headerSchema = z.jwt()