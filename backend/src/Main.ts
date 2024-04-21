import Koa from "koa";
import bodyParser from "koa-bodyparser";
import UserRoutes from "./user/UserRoutes";

const app = new Koa();
const port = 3000;

app.use(bodyParser()).use(UserRoutes);

app.listen(port);

console.log(`Listening on http://localhost:${port}/`);
