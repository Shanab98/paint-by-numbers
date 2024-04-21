import Koa from "koa";
import Router from "@koa/router";
import { UserController } from "./UserController";

const userController = new UserController();

const router = new Router();

router.put("/v1/user", async (ctx: Koa.Context) =>
  userController.createUser(ctx),
);

router.get("/v1/user/:username", async (ctx: Koa.Context) =>
  userController.getUser(ctx),
);

export default router.routes();
