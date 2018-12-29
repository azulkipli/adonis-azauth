"use strict";

const Schema = use("Schema");

class LinksSchema extends Schema {
  up() {
    this.create("links", table => {
      table.increments();
      table.string("short_url");
      table.longText("long_url");
      table.string("ip");
      table.string("creator");
      table.integer("clicks").default(0);
      table.boolean("is_disabled").default(0);
      table.boolean("is_custom").default(0);
      table.index("ip");
      table.index("creator");
      table.index("clicks");
      table.timestamps();
    });
  }

  down() {
    this.drop("links");
  }
}

module.exports = LinksSchema;
