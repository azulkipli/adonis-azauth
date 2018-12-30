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

    Factory.blueprint("App/Models/User", faker => {
      const fname = faker.first();
      return {
        user_name: fname.toLowerCase(),
        full_name: fname + " " + faker.last(),
        mobile_phone: faker.phone({ mobile: true }),
        email: faker.email(),
        password: faker.ip()
      };
    });

    await Factory.model("App/Models/User").createMany(9);
  }
}

module.exports = UserSeeder;
