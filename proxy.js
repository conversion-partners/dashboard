var proxy = require('redbird')({port: 9090});

proxy.register("localhost:9090/dashboard", "http://127.0.0.1:3000/dashboard");
proxy.register("localhost:9090", "http://127.0.0.1:9999");
