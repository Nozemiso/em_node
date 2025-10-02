import dotenv from 'dotenv'
import { Options } from 'express-jsdoc-swagger';
dotenv.config()

export const config = {
    port: process.env.PORT || 3000,
    host: process.env.HOSTNAME || "localhost",
    jwt_secret: process.env.JWT_SECRET,
    db_url: process.env.DATABASE_URL,
    db_schema: process.env.DATABASE_SCHEMA,
    db_password: process.env.DATABASE_PASSWORD
}

export const swaggerConfig: Options = {
    info: {
        version: "1.0.0",
        title: "EM node api"
    },
    baseDir: __dirname,
    filesPattern: './**/*.ts',
    swaggerUIPath: '/docs',
    security: {
        BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        },
    }
};

export const validateConfig = () => {
    if (!config.jwt_secret) throw("Missing JWT_SECRET variable")
    if (!config.db_url) throw("Missing DATABASE_URL variable")
}