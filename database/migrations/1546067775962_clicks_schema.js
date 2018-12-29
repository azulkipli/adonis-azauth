"use strict";

const Schema = use("Schema");

class ClicksSchema extends Schema {
  up() {
    this.create("clicks", table => {
      table.increments();
      table.string("ip");
      table.string("country").nullable();
      table.string("referer").nullable();
      table.string("referer_host").nullable();
      table.text("user_agent").nullable();
      table.integer("link_id").unsigned();
      table
        .foreign("link_id")
        .references("id")
        .on("links")
        .onDelete("cascade");
      table.index(["ip", "referer_host", "referer_host", "link_id"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("clicks");
  }
}

module.exports = ClicksSchema;
