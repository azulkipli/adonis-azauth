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
    user1.mobile_phone = "08123456001";
    user1.email = "user1@email.com";
    user1.password = "pass-user1";

    await user1.save();

    const user2 = new User();

    user2.user_name = "user2";
    user2.full_name = "User Dua";
    user2.mobile_phone = "08123456002";
    user2.email = "user2@email.com";
    user2.password = "pass-user2";

    await user2.save();
  }
}

module.exports = UserSeeder;
