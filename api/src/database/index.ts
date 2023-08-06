import pg from 'pg';
import config from "../config/database";

const {Pool} = pg;
/**
 * Initialize Database Connection
 */
const pool = new Pool({
    user: config.user,
    database: config.database,
    password: config.password,
    host: config.host,
    port: config.port
});


pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
})

export default pool;
