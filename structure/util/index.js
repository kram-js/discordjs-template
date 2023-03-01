const Client = require("../Client")
class Util {
    /**
     * @param client {Client}
     */
    constructor(client) {
        this.client = client;
    }
    commitSlashcommands(){
        this.client.rest.put(`/applications/${this.client.user.id}/commands`, {body: this.client.slashcommands.toJSON()})
    }
    async initTables(cache, data){
        await this.client.database.models[data.modelName].sync();
        for(const value of (await this.client.database.models[data.modelName].findAll())){
            cache[data.create](value[data.key], value.get())
        }
    }
}

module.exports = Util;