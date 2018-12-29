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
  Route.get("user/profile", "UserController.profile").middleware("auth");
  Route.post("logout", "AuthController.logout");
}).prefix(prfx);

Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
})
  .prefix(prfx)
  .middleware("throttle:1,1");
