"use strict";

const Link = use("App/Models/Link");
const { validate, validateAll } = use("Validator");

// mode modules
const randomstring = require("randomstring");
const chance = require("chance");

class LinkController {
  // list link paginate & eager load
  async list({ request, response, auth }) {
    const links = await Link.all();
    response.status(200).send(links);
  }

  // bulk add new link
  async bulk_add({ request, response, auth }) {
    return "still planning";
  }
  // add new link
  async add({ request, response, auth }) {
    const { long_url, is_custom, short_url } = request.only(["long_url", "is_custom", "short_url"]);
    // Validate request
    const rules = {
      long_url: "required",
      short_url: "unique:links,short_url"
    };
    const error_messages = {
      required: "is required.",
      "short_url.unique": "value already used."
    };
    const validation = await validateAll(request.all(), rules, error_messages);

    if (validation.fails()) {
      // const error_msg = validation.messages();
      const messages = validation.messages();
      let error_msg = [];
      if (messages.length > 0) {
        error_msg = messages.map(item => {
          if (item.field === "email") return item.message;
          else return item.field + " " + item.message;
        });
      }
      response.status(400).send({
        error_msg: error_msg
      });
    } else {
      const ip = request.ip();
      const isCustom = is_custom === "1" ? 1 : 0;
      const chance_pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const shortUrl = short_url ? short_url : chance.string({ pool: chance_pool, length: 6 });
      let link = {
        long_url: long_url,
        short_url: shortUrl,
        is_custom: isCustom,
        ip: ip
      };

      const token = auth.getAuthHeader();
      if (token) {
        const user = await auth.getUser();
        Object.assign(link, { creator: user.id });
      }

      try {
        const create_link = await Link.create(link);
        response.status(200).send({ success_msg: "Purek long URL success.", link: create_link });
      } catch (error) {
        response.status(400).send({
          error_msg: error.toString()
        });
      }
    }
  }
}

module.exports = LinkController;
