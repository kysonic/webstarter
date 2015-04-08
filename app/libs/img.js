var multiparty = require('multiparty');
var fs = require('fs');
var path = require('path');
var Promise = require('promise');
var gm = require('gm');
var config = {
    name: 'full',
    croppedName: 'cropped',
    maxSize: 2 * 1024 * 1024,
    supportMimeTypes: ['image/jpg', 'image/jpeg', 'image/png']
}
/**
 * Upload image
 * @param req - express request object
 * @returns {Promise} - A+
 * @constructor
 */
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
            uploadFile.path = './public/uploads/users/'+req.session.user.email+'/avatars/'+config.name+getCurrentDate()+path.extname(part.filename);
            // Check restrictions
            /*if(uploadFile.size > config.maxSize) {
                errors.push('File size is ' + uploadFile.size + '. Limit is ' + (config.maxSize / 1024 / 1024) + 'MB.');
            }
            if(-1 === config.supportMimeTypes.indexOf(uploadFile.type)) {
                errors.push('Unsupported mimetype ' + uploadFile.type);
            }*/
            // If errors is empty write file
            if(errors.length === 0) {
                deleteFileByRegexp(path.dirname(uploadFile.path),new RegExp(config.name));
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
/**
 * Crop images
 * @param pth - path to image
 * @param crop - crop object (width,height,x,y,rotate)
 * @param resize - crop object (width,height)
 * @returns {Promise} - A+
 */
exports.crop = function (pth,crop,resize){
    var pth = './public'+pth;
    var resizeFile = path.dirname(pth) + '/'+config.croppedName+getCurrentDate()+path.extname(pth);
    // Delete previous cropped avatars
    deleteFileByRegexp(path.dirname(pth),new RegExp(config.croppedName));
    return new Promise(function(resolve,reject){
        gm(pth)
            .crop(crop.width, crop.height, crop.x, crop.y)
            .resize(resize.w,resize.h)
            .options({imageMagick: true})
            .write(resizeFile, function (err) {
                if(err) reject(err);
                resolve(resizeFile.replace('./public',''));
            });
    });
};
/**
 * Get Current Date String
 * @returns {string}
 */
function getCurrentDate(){
    var date = new Date();
    return date.toJSON().slice(0,10).replace(/\-/g,'') + date.toJSON().slice(11,19).replace(/\:/g,'') + date.getMilliseconds();
}

function deleteFileByRegexp(folder,regexp) {
    fs.readdir(folder,function(err,files){
        if(err) throw err;
        files.forEach(function(file){
            if(regexp.test(file)) fs.unlink(folder+'/'+file);
        });
    })
}