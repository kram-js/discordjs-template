const Client = require("../../structure/Client")

module.exports = {
    name: "ready",

    /**
     * @param client {Client}
     */
    async run(client){
        console.log(`Template created by kram#1234\nConnected as ${client.user.username}`);
        client.util.commitSlashcommands()
    }
}