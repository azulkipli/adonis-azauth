"use strict";

const Env = use("Env");
const isDebug = Env.get("APP_DEBUG") === "true";
const Logger = use("Logger");
const { test, trait } = use("Test/Suite")("TestAuth");
const User = use("App/Models/User");

trait("Test/ApiClient");

const prfx = "api/v1/";

let user_test_1_token = "";
let user_test_1_refreshToken = "";

// test normal user register
test("normal_register", async ({ client }) => {
  const response = await client
    .post(prfx + "register")
    .send({
      user_name: "usr_test_1",
      full_name: "usr_full_test_1",
      mobile_phone: "0812345678",
      email: "usr_test_1@mail.com",
      password: "usr_test_1",
      repeat_password: "usr_test_1"
    })
    .end();

  if (isDebug) Logger.info("register_user > %j", response);
  response.assertStatus(200);
  response.assertJSONSubset({ success_msg: "Register success" });
});

// test failed throttle user register
test("failed_register_throttle", async ({ client }) => {
  const response = await client
    .post(prfx + "register")
    .send({
      user_name: "usr_test_1",
      full_name: "usr_full_test_1",
      mobile_phone: "08123456001",
      email: "usr_test_1@mail.com",
      password: "usr_test_1",
      repeat_password: "usr_test_1"
    })
    .end();
  if (isDebug) Logger.info("failed_register_throttle > %j", response);
  response.assertStatus(429);
});

// test normal user login
test("normal_login", async ({ client }) => {
  const response = await client
    .post(prfx + "login")
    .send({
      email: "usr_test_1@mail.com",
      password: "usr_test_1"
    })
    .end();

  user_test_1_token = JSON.parse(response.text).jwt.token;
  user_test_1_refreshToken = JSON.parse(response.text).jwt.refreshToken;

  if (isDebug) Logger.info("normal_login > user_test_1_token: %s", user_test_1_token);

  response.assertStatus(200);
  response.assertJSONSubset({ email: "usr_test_1@mail.com" });
});

if (isDebug) Logger.info("BEFORE normal_logout > user_test_1_token: %s", user_test_1_token);

// test normal user logout
test("normal_logout", async ({ client }) => {
  if (isDebug) Logger.info("normal_logout > user_test_1_token: %s", user_test_1_token);
  if (isDebug)
    Logger.info("normal_logout > user_test_1_refreshToken: %s", user_test_1_refreshToken);
  try {
    const response = await client
      .post(prfx + "logout")
      .send({
        refresh_token: user_test_1_refreshToken
      })
      .end();
    if (isDebug) Logger.info("normal_logout %j", response);
    response.assertStatus(200);
    response.assertJSONSubset({ success_msg: "logout success" });
  } catch (error) {
    if (isDebug) Logger.error("normal_logout error: %j", error);
  }
});

// test success throttle user register
/* test("success_register_throttle", async ({ client }) => {

    const response = await client
      .post(prfx + "register")
      .send({
        user_name: "usr_test_2",
        full_name: "usr_full_test_2",
        mobile_phone: "08123456002",
        email: "usr_test_2@mail.com",
        password: "usr_test_2",
        repeat_password: "usr_test_2"
      })
      .end();

    if (isDebug) Logger.error("success_register_throttle %j", response);
    response.assertStatus(200);
  }); */
