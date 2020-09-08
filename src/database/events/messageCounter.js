const mongo = require('../../config/databaseConnect.js');
const messageCounterSchema = require('../Schemas/messageCounter.js');

module.exports = (bot) => {

bot.on('message', async (message) => {

const memerBotChannel = message.guild.channels.cache.get('715171228046065775');

if(message.channel === memerBotChannel) return;
if(message.author.bot) return;

const { author } = message;
const { id } = author
const { username } = author
const displayName = message.member.displayName;


await mongo().then( async(mongoose) => {
    try {
        await messageCounterSchema.findOneAndUpdate({
            _id: id
        }, {
            name: displayName,
            currentUsername: username,
            $addToSet: {
                usernameHistory: username,
                nameHistory: displayName,
                userRoles: message.member.roles.cache.keyArray()
            },
            $inc: {
                "messageCount": 1
            }
        }, {
            upsert: true
        })
    } finally {
        mongoose.connection.close();
    }
});
});

};