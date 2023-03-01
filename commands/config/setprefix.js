const Client = require("../../structure/Client"),
    {Message} = require("discord.js")

module.exports = {
    name: "setprefix",
    description: "Set the prefix of the bot",
    permissions: ["Administrator"],
    aliases: ["prefix"],
    /**
     * @param client {Client}
     * @param message {Message}
     * @param args {[String]}
     */
    async run(client, message, args, guildData){
        const oldPrefix = guildData.get("prefix") || client.config.prefix;
        const newPrefix = args[0]?.toLowerCase();
        if(!newPrefix) return message.channel.send(`:x: | You need to specify a new prefix`);
        if(newPrefix.length > 3) return message.channel.send(`:x: | The new prefix cannot exceed 3 chars`);
        //do not forget save when you set/push/unpush data !
        guildData.set("prefix", newPrefix).save().then(() => {
            message.channel.send(`Prefix: \`${oldPrefix}\` --> \`${newPrefix}\``)
        }).catch((e) => {
            message.channel.send(`:x: | An error has occured`)
            console.log(e);
        })
    }
}