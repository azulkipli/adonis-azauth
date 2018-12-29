"use strict";

const Env = use("Env");
const isDebug = parseInt(Env.get("APP_DEBUG")) || false;
const Logger = use("Logger");
const { test, trait } = use("Test/Suite")("TestUser");
const User = use("App/Models/User");

const prfx = "api/v1/";

trait("Test/ApiClient");

test("get_list_users", async ({ client }) => {
  const response = await client.get(prfx + "users").end();
  if (isDebug) Logger.info("TestUser > get_list_users response %j", response);
  response.assertStatus(200);
  response.assertJSONSubset([
    {
      user_name: "usr_test_1",
      mobile_phone: "0812345678",
      email: "usr_test_1@mail.com"
    }
  ]);
});
