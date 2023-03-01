const {Client, Collection} = require("discord.js"),
    {Sequelize} = require("sequelize"),
    fs = require("fs")

class _Client extends Client {
    constructor() {
        super({intents: 33283});
        this.config = require("../config");
        this.database = new Sequelize({
            storage: "database.sqlite",
            dialect: "sqlite",
            define: {
                freezeTableName: true,
                timestamps: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            },
            logging: false,
        })
        this.util = new (require("./util"))(this)

        this.slashcommands = new Collection();
        this.commands = new Collection();

        this.init();
    }
    init(){
        this.initCommands();
        this.initEvents();
        this.initDatabase();
        this.login(this.config.token);
    }
    initCommands(){
        for(const dir of fs.readdirSync("./slashcommands")){
            for(const fileName of fs.readdirSync(`./slashcommands/${dir}`)){
                const file = require(`../slashcommands/${dir}/${fileName}`);
                this.slashcommands.set(file.name, file);
                delete require.cache[require.resolve(`../slashcommands/${dir}/${fileName}`)]
            }
        }
        for(const dir of fs.readdirSync("./commands")){
            for(const fileName of fs.readdirSync(`./commands/${dir}`)){
                const file = require(`../commands/${dir}/${fileName}`);
                this.commands.set(file.name, file);
                delete require.cache[require.resolve(`../commands/${dir}/${fileName}`)]
            }
        }
    }
    initEvents(){
        for(const dir of fs.readdirSync("./events")){
            for(const fileName of fs.readdirSync(`./events/${dir}`)){
                const file = require(`../events/${dir}/${fileName}`);
                this.on(file.name, (...args) => file.run(this, ...args))
            }
        }
    }
    initDatabase(){
        this.database.authenticate().then(() => {
            console.log(`Database synced!`);
            this.managers = new (require("./database"))(this);
        }).catch((e) => {
            console.log(`Could not connect to database`)
            console.error(e);
        })
    }

}

module.exports = _Client;