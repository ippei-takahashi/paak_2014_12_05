var
	configRoutes,
	mongodb = require("mongodb"),
	mongoServer = new mongodb.Server("localhost", mongodb.Connection.DEFAULT_PORT),
	dbHandle = new mongodb.Db("msgboard", mongoServer, {
		safe: true
	}),
	makeMongoId = mongodb.ObjectID;

dbHandle.open(function() {});

configRoutes = function(app, server) {
	app.get("/", function(request, response) {
		response.redirect("/index.html");
	});
};

module.exports = {
	configRoutes: configRoutes
};