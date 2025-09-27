const config = {
    port: process.env.PORT || 3000,
    jwt_secret: process.env.JWT_SECRET || '1232112321',
    db_url: process.env.DATABASE_URL || 'postgresql://postgres:admin@localhost:5432/'
}

export default config;