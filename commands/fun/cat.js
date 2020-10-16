require("dotenv").config();
const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const querystring = require("query-string");
const r2 = require("r2");
const CAT_API_URL = "https://api.thecatapi.com/";
const CAT_API_KEY = process.env.CAT_API_KEY;

module.exports = class CatCommand extends Command {
  constructor(client) {
    super(client, {
      name: "cat",
      group: "fun",
      memberName: "cat",
      description: "Meow.",
    });
  }

  async run(message) {
    try {
      const images = await this.loadImage(message.author.username);
      const image = images[0];
      const embed = new MessageEmbed()
        .setTitle("A picture of a cute kitty cat!")
        .setImage(`${image.url}`)
        .setColor("GREEN");
      message.channel.send(embed);
    } catch (error) {
      console.log(error);
    }
  }

  async loadImage(sub_id) {
    const headers = {
      "X-API-KEY": CAT_API_KEY,
    };
    const query_params = {
      // 'has_breeds':true,
      mime_types: "jpg,png",
      size: "med",
      sub_id: sub_id,
      limit: 1,
    };

    const queryString = querystring.stringify(query_params);

    try {
      const _url = CAT_API_URL + `v1/images/search?${queryString}`;
      return await r2.get(_url, { headers }).json;
    } catch (e) {
      console.log(e);
    }
  }
};
