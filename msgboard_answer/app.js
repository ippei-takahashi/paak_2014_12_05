var http = require("http"),
	express = require("express"),
	routes = require("./routes"),
	app = express(),
	server = http.createServer(app);

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + "/public"));
	app.use(app.router);
});

routes.configRoutes(app, server);

server.listen(3000);