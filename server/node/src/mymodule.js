var MyNamespace;
(function (MyNamespace) {
    var MyClass = (function () {
        function MyClass() {
        }
        return MyClass;
    }());
    MyNamespace.MyClass = MyClass;
})(MyNamespace || (MyNamespace = {}));
//# sourceMappingURL=mymodule.js.map