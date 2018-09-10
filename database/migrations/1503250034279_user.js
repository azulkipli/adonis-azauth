"use strict";

const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table
        .string("user_name", 80)
        .notNullable()
        .unique();
      table
        .string("full_name", 128)
        .notNullable()
        .unique();
      table
        .string("mobile_phone", 18)
        .notNullable()
        .unique();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
