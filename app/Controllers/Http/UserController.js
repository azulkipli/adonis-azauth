"use strict";

const User = use("App/Models/User");

class UserController {
  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

  async register({ request }) {
    const { user_name, full_name, mobile_phone, email, password } = request.all();
    await User.create({
      user_name,
      full_name,
      mobile_phone,
      email,
      password
    });
    return this.login(...arguments);
  }
}

module.exports = UserController;
