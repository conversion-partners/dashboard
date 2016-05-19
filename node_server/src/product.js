"use strict";
var Product = (function () {
    function Product() {
    }
    Product.prototype.isAcceptable = function (s) {
        return s;
    };
    Product.prototype.getPrice = function () { };
    Product.prototype.getImage = function () { };
    Product.prototype.getGtin = function () { };
    Product.prototype.getCategory = function () { };
    return Product;
}());
exports.Product = Product;
exports.mainProduct = Product;
//# sourceMappingURL=product.js.map