const Client = require("../../structure/Client"),
    {CommandInteraction} = require("discord.js")

module.exports = {
    name: "ping",
    description: "Show the ping",
    /**
     * @param client {Client}
     * @param interaction {CommandInteraction}
     */
    async run(client, interaction, guildData){
        interaction.reply({content: `Ping: \`${client.ws.ping}\``, ephemeral: true})
    }
}