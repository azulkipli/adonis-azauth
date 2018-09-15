"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use("Factory");
const User = use("App/Models/User");

class UserSeeder {
  async run() {
    const user1 = new User();

    user1.user_name = "user1";
    user1.full_name = "User Satu";
    user1.mobile_phone = "0812345678";
    user1.email = "user1@email.com";
    user1.password = "pass-user1";

    await user1.save();
  }
}

module.exports = UserSeeder;
