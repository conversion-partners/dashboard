var lib = require('./lib');

function Config(type : String)  : string {
    this.type = type;
}

Config.prototype.getType = function() {
    return this.type;
};



module.exports = Config;
