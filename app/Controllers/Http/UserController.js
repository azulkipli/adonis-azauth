"use strict";

const Logger = use("Logger");
const Hash = use("Hash");
const { validate } = use("Validator");
const Encryption = use("Encryption");
const User = use("App/Models/User");
const Token = use("App/Models/Token");

const { validateAll } = use("Validator");

class UserController {
  async login({ request, auth, response }) {
    const rules = {
      email: "required|email",
      password: "required"
    };

    const { email, password } = request.only(["email", "password"]);
    const validation = await validate({ email, password }, rules);

    if (!validation.fails()) {
      try {
        const token = await auth.withRefreshToken().attempt(email, password);
        console.log("token", token);
        let user = await User.query()
          .where("email", email)
          .select("id", "user_name", "email")
          .first();
        console.log("user", user);
        return Object.assign(user, token);
      } catch (err) {
        console.log("err", err);
        response.status(401).send({ error: "Invalid email or password" });
      }
    } else {
      response.status(401).send(validation.messages());
    }
  }

  async logout({ auth }) {
    await auth.logout();
    return { message: "You are logged out" };
  }

  async list() {
    // const users = await User.all();
    const users = await User.query()
      .select("id", "user_name", "full_name", "email", "mobile_phone")
      .where("id", ">", 0)
      .fetch();

    return users;
  }

  async register({ request, response }) {
    const { user_name, full_name, mobile_phone, email, password } = request.all();
    const error_messages = {
      required: "is required",
      "email.email": "email format is not valid",
      "email.unique": "email already registered",
      unique: "already registered",
      "repeat_password.equals": "typed is not equal"
    };
    const rules = {
      email: "required|email|unique:users,email",
      password: "required",
      repeat_password: "required|equals:" + password,
      user_name: "required|unique:users,user_name",
      full_name: "required",
      mobile_phone: "required|unique:users,mobile_phone"
    };
    const validation = await validateAll(request.all(), rules, error_messages);

    console.log("validation", validation);

    if (validation.fails()) {
      const messages = validation.messages();
      let error_msg = [];
      if (messages.length > 0) {
        error_msg = messages.map(item => {
          if (item.field === "email") return item.message;
          else return item.field + " " + item.message;
        });
      }
      const resp = {
        error_msg: error_msg
      };
      return response.status(422).json(resp);
    }

    const create_user = await User.create({ user_name, full_name, mobile_phone, email, password });
    console.log("create_user", create_user);
    const resp = {
      success_msg: "Register success",
      data: this.login(...arguments)
    };
    return resp;
  }
}

module.exports = UserController;
