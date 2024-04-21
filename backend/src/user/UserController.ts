import { UserService } from "./UserService";
import { createUserValidationSchema } from "./UserValidationSchema";
import { throwIfInvalidObject } from "../utils/validationUtils";
import Koa from "koa";

export class UserController {
  constructor(private userService = new UserService()) {}

  public async createUser(ctx: Koa.Context) {
    const { username, password, email } = ctx.request.body as {
      username?: string;
      password?: string;
      email?: string;
    };

    throwIfInvalidObject(
      { username, password, email },
      createUserValidationSchema,
    );

    try {
      await this.userService.createUser(username!, password!, email!);
      ctx.response.status = 201;
    } catch (err) {
      console.log(err, ctx);
      ctx.throw(500);
    }
  }

  public async getUser(ctx: Koa.Context) {
    const { username } = ctx.params;

    try {
      const user = await this.userService.getUser({ username });
      ctx.status = 200;
      ctx.body = user;
    } catch (err) {
      console.log(err, ctx);
      ctx.throw(500);
    }
  }
}
