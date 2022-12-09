import fs from 'fs';
import path from "path";

import {open as lmdbOpen} from 'lmdb';
import * as dotenv from 'dotenv';

dotenv.config();

const connectPath = path.resolve(process.cwd(), process.env.LMDB_STORE_PATH);

// Make sure store path exists, if there is an error accessing it
//  attempt to create it
(async () =>
    fs.promises.access(connectPath)
      .catch(() => fs.promises.mkdir(connectPath))
      .catch(() => null) // Ignore subsequent "attempting to create dir.." errors
)();

console.log(`LMDB connecting to "${connectPath}"`);

export const storage = lmdbOpen({path: connectPath});
