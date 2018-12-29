"use strict";

const Logger = use("Logger");
const Hash = use("Hash");
const { validate } = use("Validator");
// const Encryption = use("Encryption");
const User = use("App/Models/User");
// const Token = use("App/Models/Token");

// const { validateAll } = use("Validator");

class UserController {
  async list() {
    // const users = await User.all();
    const users = await User.query()
      .select("id", "user_name", "full_name", "email", "mobile_phone")
      .where("id", ">", 0)
      .fetch();

    return users;
  }

  async profile({ request, response, auth }) {
    // console.log("request", request);
    try {
      return await auth.getUser();
    } catch (error) {
      // console.log("error", error);
      response.status(401).send({ error: "Invalid authorization" });
    }
  }
}

module.exports = UserController;
