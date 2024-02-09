import { UserService } from "./UserService";
import Koa from "koa";
export class UserController {
  constructor(private userService = new UserService()) {}

  public async getUser(ctx: Koa.Context) {
    const { userId } = ctx.params;

    try {
      ctx.body = await this.userService.getUser(userId);
      ctx.status = 200;
    } catch (err) {
      console.log(err, ctx);
      ctx.throw(500);
    }
  }
}
