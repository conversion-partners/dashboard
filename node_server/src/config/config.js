var lib = require('./lib');

function Data(nr) {
	this._nr = nr;
}

Data.prototype.getAll = function() {
	if (isInt(this._nr)) {
		return SmallProducts.createSmallProducts(this._nr);
	}
	return 0;
};

Data.prototype.createSmallProducts = function(nr) {

};

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}


module.exports = Data;
