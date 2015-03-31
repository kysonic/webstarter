var multiparty = require('multiparty');
var fs = require('fs');
var path = require('path');
var Promise = require('promise');
var gm = require('gm');
var config = {
    name: 'ava',
    resizeName: 'ava320x320',
    maxSize: 2 * 1024 * 1024,
    supportMimeTypes: ['image/jpg', 'image/jpeg', 'image/png']
}
exports.upload = function Upload(req) {
    return new Promise(function(resolve,reject){
        var form = new multiparty.Form();
        var uploadFile = {path: '', type: '', size: 0};
        var errors = [];
        // On entry
        form.on('part', function(part) {
            // Basic data
            uploadFile.size = part.byteCount;
            uploadFile.type = part.headers['content-type'];
            uploadFile.path = './public/uploads/users/'+req.session.user.email+'/avatars/'+config.name+path.extname(part.filename);
            // Check restrictions
            if(uploadFile.size > config.maxSize) {
                errors.push('File size is ' + uploadFile.size + '. Limit is' + (config.maxSize / 1024 / 1024) + 'MB.');
            }
            if(-1 === config.supportMimeTypes.indexOf(uploadFile.type)) {
                errors.push('Unsupported mimetype ' + uploadFile.type);
            }
            // If errors is empty write file
            if(errors.length === 0) {
                part.pipe(fs.createWriteStream(uploadFile.path));
            }
            else {
                part.resume();
            }
        });

        // If file already exists we must unlink it.
        form.on('error', function(err){
            if(fs.existsSync(uploadFile.path)) {
                fs.unlinkSync(uploadFile.path);
            }
            reject(err);
        });
        // On close stream.
        form.on('close',function(){
            if(errors.length) reject(errors);
            uploadFile.path = uploadFile.path.replace('./public','');
            resolve({file:uploadFile});
        }.bind(this));

        form.parse(req);
    }.bind(this));
}

exports.crop = function (pth,crop){
    var resizeFile = path.dirname(pth) + '/'+config.resizeName+path.extname(pth);
    return new Promise(function(resolve,reject){
        gm(pth)
            .crop(crop.width, crop.height, crop.x, crop.y)
            .resize(320,320)
            .options({imageMagick: true})
            .write(resizeFile, function (err) {
                console.log(err)
                if (!err) console.log('done');
            });
    });
};