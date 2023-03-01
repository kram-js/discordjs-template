const Client = require("../../structure/Client"),
    {Message} = require("discord.js")

module.exports = {
    name: "messageCreate",
    /**
     * @param client {Client}
     * @param message {Message}
     */

    async run(client, message){
        const guildData = client.managers.guilds.getOrCreate(message.guildId);
        const prefix = guildData.get("prefix") || client.config.prefix;
        if(!message.content.toLowerCase().trim().startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandstr = args[0]?.toLowerCase()
        args.shift();
        const command = client.commands.get(commandstr) || client.commands.find((cmd) => cmd.aliases.includes(commandstr));
        if(command?.permissions && !message.member.permissions.has(command.permissions)) {
            const reply = await message.reply(`:x: | You don't have permissions to use this command, permissions required: ${command.permissions.map((p) => `\`p\``).join(", ")}`)
            return setTimeout(() => {
                reply.delete().catch((e) => {});
                message.delete().catch((e) => {});
            }, 5000)
        }
        command?.run(client, message, args, guildData)
    }
}