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

	app.get("/msgboard", function(request, response) {
		response.redirect("/msgboard.html");
	});

	app.post("/sendmsg", function(request, response) {
		dbHandle.collection(
			"msgboard", // msgboardテーブルにデータを追加する
			function(outerError, collection) {
				var
					objMap = request.body,
					// ここに，formの内容がオブジェクトとして格納される
					optionsMap = {};

				collection.insert(
					objMap,
					optionsMap,
					function(innerError, mapList) {
						response.redirect("/msgboard.html");
					});
			});
	});

	app.get("/fetchmsg", function(request, response) { //sendmsgにGETされたときの処理
		dbHandle.collection(
			"msgboard",
			//msgboardテーブルからデータを取得
			function(outerError, collection) {
				var
					findMap = {},
					optionsMap = {};

				collection.find(
					findMap,
					optionsMap
				).toArray(
					function(innerError, mapList) {
						response.send(mapList); // DBから取得したデータを全て返す
					});
			});
	});

};

module.exports = {
	configRoutes: configRoutes
};