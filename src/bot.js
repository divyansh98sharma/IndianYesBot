const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ["MESSAGE", "REACTION", "CHANNEL"] });
const betabot = new Discord.Client({ partials: ["MESSAGE", "REACTION", "CHANNEL"] });

require("dotenv").config();
const mongo = require("./database/databaseConnect.js");

const message = require("./events/messages.js");
const guildMemberAdd = require('./events/guildMemberAdd');
const guildMemberRemove = require('./events/guildMemberRemove');
const messageReactionAdd = require('./events/messageReactionAdd');
const messageUpdate = require('./events/messageUpdate');
const messageDelete = require('./events/messageDelete');
const presenceUpdate = require('./events/presenceUpdate');

bot.on("ready", async () => {
    console.log("IndianYesBot is online.");
    await mongo().then(() => console.log('DAtabase connected.'))
    const botOnNotificationChannel = bot.channels.cache.get("746764608890470470");

    if (!botOnNotificationChannel) return;
    botOnNotificationChannel.send("restart_success");
});

message(bot);
guildMemberAdd(bot);
guildMemberRemove(bot);
messageReactionAdd(bot);
messageUpdate(bot);
messageDelete(bot);
presenceUpdate(bot);

bot.login(process.env.mainBot);
betabot.login(process.env.secondaryBot);  