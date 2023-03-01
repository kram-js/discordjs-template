const {DataTypes} = require("sequelize")
class Cache extends Map {
    constructor(client) {
        super();
        this.client = client;
    }
    createGuild(guildId, data = {}){
        return this.set(guildId, new Manager(this, data, guildId)).get(guildId)
    }
    getOrCreate(guildId){
        return this.has(guildId) ? this.get(guildId) : this.createGuild(guildId)
    }

    initTables(){
        this.client.database.define("guild", {
            guildId: {
                type: DataTypes.STRING(255),
                primaryKey: true,
                allowNull: false
            },
            prefix: {
                type: DataTypes.STRING(3),
                allowNull: true,
            }
        })
        this.client.util.initTables(this, {
            modelName: "guild",
            key: "guildId",
            create: "createGuild"
        })
        return this;
    }
}

class Manager {
    constructor(cache, data, key) {
        this.cache = cache;
        this.data = data;
        this.key = key;
    }
     save(){
        return new Promise((res, rej) => {
            this.cache.client.database.models["guild"].findOne({where: {guildId: this.key}}).then((item) => {
                if(item){
                    item.update(this.data).then(() => res({created: false})).catch((e) => rej(e))
                }else {
                    this.cache.client.database.models["guild"].create({...this.data, guildId: this.key}, {where: {guildId: this.key}})
                        .then(() => res({created: true})).catch((e) => {rej(e)})
                }
            })
        })
    }

    get(key){
        return this.data[key];
    }
    set(key, value){
        this.data[key] = value
        return this;
    }
    push(key, value){
        this.data[key].push(value);
        return this;
    }
    unpush(key, value){
        this.data[key] = this.data[key].filter(v => v !== value);
        return this;
    }
}

module.exports = Cache;