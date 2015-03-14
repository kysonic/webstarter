module.exports = function(app){   
    app.use('/', require('../../app/routes')(app));
 	app.use("/user", require("../../app/routes/user")(app));
 }
