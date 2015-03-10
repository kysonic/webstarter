module.exports = function(app){  
    app.use('/', require('../../app/routes')(app));
 }
