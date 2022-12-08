import {open as lmdbOpen} from 'lmdb';
import path from "path";
import * as dotenv from 'dotenv';

dotenv.config();

const connectPath =  path.resolve(process.cwd(), process.env.LMDB_STORE_PATH);

console.log(`LMDB connecting to "${connectPath}"`);

export const storage =  lmdbOpen({path: connectPath});

