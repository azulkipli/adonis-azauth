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

Route.get("/", () => {
  return { app: "AdonisJS auth" };
});

Route.group(() => {
    Route.get("users", "UserController.list");
    Route.post("user/register", "UserController.register");
    Route.post("user/login", "UserController.login");
}).prefix("api/v1");
