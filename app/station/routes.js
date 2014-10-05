module.exports = function(app){   

	app.use("/", require("../../app/routes/")(app));
 	app.use("/error", require("../../app/routes/error")(app));
 }
