var lib = require('./lib');
function Config(type) {
    this.type = type;
}
Config.prototype.getType = function () {
    return this.type;
};
module.exports = Config;
//# sourceMappingURL=config.js.map