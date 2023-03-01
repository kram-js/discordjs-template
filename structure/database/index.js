class Database {
    constructor(client) {
        this.guilds = new (require("./guild"))(client).initTables();
    }
}

module.exports = Database;