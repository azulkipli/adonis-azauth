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
const Link = use("App/Models/Link");

class LinkSeeder {
  async run() {
    const link1 = new Link();

    link1.long_url =
      "https://www.google.com/search?q=mysql+error+1064&oq=mysql+error+1064&aqs=chrome..69i57j0l5.4320j1j7";
    link1.short_url = "poNdoK";
    link1.is_custom = 0;
    link1.ip = "127.0.0.1";

    await link1.save();

    Factory.blueprint("App/Models/Link", faker => {
      return {
        long_url: faker.avatar(),
        short_url: faker.string({ pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", length: 6 }),
        is_custom: faker.bool(),
        user_id: faker.integer({ min: 1, max: 8 }),
        ip: faker.ip()
      };
    });

    await Factory.model("App/Models/Link").createMany(550);
  }
}

module.exports = LinkSeeder;
