import { db } from './db.js';
import jsonServer from 'json-server';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(db());
const port = 3001;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`JSON Server is running on port ${port}`);
});
