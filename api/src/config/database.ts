interface Database{
    host: string,
    user: string,
    password: string,
    database: string,
    port: number
}

export default {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432
} as Database;
