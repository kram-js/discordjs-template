const Client = require("../../structure/Client"),
    {CommandInteraction} = require("discord.js")
module.exports = {
    name: "interactionCreate",
    /**
     * @param client {Client}
     * @param interaction {CommandInteraction}
     */
    async run(client, interaction){
        if(!interaction.isCommand()) return;
        const slashcommand = client.slashcommands.get(interaction.commandName);
        const guildData = client.managers.guilds.getOrCreate(interaction.guildId);
        slashcommand?.run(client, interaction, guildData)
    }
}