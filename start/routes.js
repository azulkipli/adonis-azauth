"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use("Route");

const prfx = "api/v1";

Route.get("/", () => {
  return { app: "AdonisJS auth" };
});

Route.group(() => {
  Route.get("users", "UserController.list");
}).prefix(prfx);

// route for authorized user
Route.group(() => {
  Route.get("my_profile", "UserController.my_profile");
  Route.post("logout", "AuthController.revokeToken");
  Route.post("revoke_token", "AuthController.revokeToken");
})
  .prefix(prfx)
  .middleware("auth");

// route for anonymous user
Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.post("refresh_token", "AuthController.refreshToken");
  Route.post("token_user", "AuthController.tokenUser");
})
  .prefix(prfx)
  .middleware("throttle:1,1");
