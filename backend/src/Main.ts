import Koa from "koa";
import cors from '@koa/cors';

import bodyParser from "koa-bodyparser";
import UserRoutes from "./user/UserRoutes";

const app = new Koa();
const port = 3001;

app
  .use(cors()) // allows frontend to make requests
  .use(bodyParser())
  .use(UserRoutes);

app.listen(port);

console.log(`Listening on http://localhost:${port}/`);
