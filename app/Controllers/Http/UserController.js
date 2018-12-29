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
    const users = await User.query().fetch();

    return users;
  }

  async myprofile({ response, auth }) {
    try {
      let user = await auth.user;
      let userWithListToken = Object.assign(user, {refresh_tokens:[]});
      const tokens = await auth.listTokens();
      if(tokens.length>0){
        const refreshTokens = tokens.map(item => {
          return {
            token: item.token,
            type: item.type,
            created_at: item.created_at,
            updated_at: item.updated_at
          };
        });
        userWithListToken = Object.assign(user, { refresh_tokens: refreshTokens });
      // const userWithListToken = {user,token}
        console.log("userWithListToken", userWithListToken);
        return userWithListToken;
      }
      return userWithListToken;

    } catch (error) {
      // console.log("error", error);
      response.status(401).send({ error: "Invalid authorization" });
    }
  }
}

module.exports = UserController;
