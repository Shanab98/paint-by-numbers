import Koa from "koa";
import Router from "@koa/router";
import { UserController } from "./UserController";

const userController = new UserController();

const router = new Router();

router.get("/v1/userId/:userId", async (ctx: Koa.Context) => {
  userController.getUser(ctx);
});

export default router.routes();
