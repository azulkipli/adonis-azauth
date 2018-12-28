"use strict";

const User = use("App/Models/User");
const Database = use('Database')

const { validateAll } = use("Validator");

class UserController {
  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    const user = await User.query()
      .where("email", email)
      .fetch();
    return Object.assign(user, token);
  }

  async list() {
    const users = await User.query().fetch();
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
