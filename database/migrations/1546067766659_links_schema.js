"use strict";

const Schema = use("Schema");

class LinksSchema extends Schema {
  up() {
    this.create("links", table => {
      table.increments();
      table
        .string("short_url", 6)
        .notNullable()
        .unique();
      table.longText("long_url").notNullable();
      table.string("ip").index("ip");
      table
        .integer("clicks")
        .index("clicks")
        .default(0);
      table.boolean("is_disabled").default(0);
      table.boolean("is_custom").default(0);
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("set null");
      table.timestamps();
    });
  }

  down() {
    this.drop("links");
  }
}

module.exports = LinksSchema;
