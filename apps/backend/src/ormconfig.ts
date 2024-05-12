import { join } from "path";
import * as entities from '../src/database/entities-index';
export default 
{
    type: 'postgres',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    entities: Object.values(entities),
    synchronize: true,
}
