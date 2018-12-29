"use strict";
// import module
const Logger = use("Logger");
const Encryption = use("Encryption");
const { validate, validateAll } = use("Validator");

const Env = use("Env");
const isDebug = Env.get("APP_DEBUG") === "true";

// import model
const User = use("App/Models/User");
const Token = use("App/Models/Token");

class AuthController {
  async login({ request, auth, response }) {
    // take arguments from request
    const { email, password } = request.only(["email", "password"]);
    //  validate arguments
    const rules = {
      email: "required|email",
      password: "required"
    };
    const validation = await validate({ email, password }, rules);

    if (!validation.fails()) {
      try {
        const token = await auth.withRefreshToken().attempt(email, password);
        // get current user
        let user = await User.query()
          .where("email", email)
          .select("id", "user_name", "email", "mobile_phone")
          .first();
        // return current user & token
        const userWithToken = Object.assign(user, token);
        if (isDebug) Logger.info("user_login %j", userWithToken);
        return userWithToken;
      } catch (err) {
        if (isDebug) Logger.error("login error %j", err);
        response.status(401).send({ error: "Invalid email or password" });
      }
    } else {
      response.status(401).send(validation.messages());
    }
  }

  async refreshToken({ request, response, auth }) {
    // take refresh_token arguments from request
    const { refresh_token } = request.only(["refresh_token"]);
    // validation rules
    const rules = {
      refresh_token: "required"
    };
    const validation = await validate({ refresh_token }, rules);
    // check validation
    if (!validation.fails()) {
      try {
        return await auth.newRefreshToken().generateForRefreshToken(refresh_token);
      } catch (err) {
        response.status(401).send({ error: "Invalid refresh token" });
      }
    } else {
      response.status(401).send(validation.messages());
    }
  }

  async logout({ request, response, auth }) {
    // take refresh_token arguments from request
    const { refresh_token } = request.only(["refresh_token"]);
    const rules = {
      refresh_token: "required"
    };
    const validation = await validate({ refresh_token }, rules);
    const decrypted = Encryption.decrypt(refresh_token);

    if (!validation.fails()) {
      try {
        const refreshToken = await Token.findBy("token", decrypted);
        if (refreshToken) {
          const delRefreshToken = await refreshToken.delete();
          Logger.info("/logout delRefreshToken: %s", delRefreshToken);
          if (delRefreshToken) {
            response.status(200).send({ success_msg: "logout success" });
          } else {
            response.status(401).send({ error_msg: "delete refresh token failed" });
          }
        } else {
          response.status(401).send({ error_msg: "Invalid refresh token" });
        }
      } catch (err) {
        response.status(401).send({ error_msg: "something went wrong" });
      }
    } else {
      response.status(401).send(validation.messages());
    }
  }

  async register({ request, response }) {
    // take some arguments from request
    const { user_name, full_name, mobile_phone, email, password } = request.all();
    // customize validation rules & error messages
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

    // build error message
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
    if (isDebug) Logger.info("/register > create_user: %j", create_user);

    const resp = {
      success_msg: "Register success",
      data: this.login(...arguments)
    };
    return resp;
  }
}

module.exports = AuthController;
