import Koa from "koa";
import UserRoutes from "./user/UserRoutes";

const app = new Koa();
const port = 3000;

app.use(UserRoutes).listen(port);

console.log(`Listening on http://localhost:${port}/`);
