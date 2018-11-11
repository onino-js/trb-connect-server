import { Database } from 'sqlite3';
import * as fs from 'fs';

function boostrapMockDB() {
  const db_path: string = 'dist/db.sqlite';
  const exists = fs.existsSync(db_path);
  if (exists) {
    fs.unlinkSync(db_path);
  }
  console.log('Creating DB ...');
  new Database(db_path);
}

boostrapMockDB();
