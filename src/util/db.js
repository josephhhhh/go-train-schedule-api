// load local json data into in-memory db
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

const db = new LowSync(new JSONFileSync('src/data/timetable.json'), {});
db.read();
console.log('db connected');

export default db;