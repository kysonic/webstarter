var mongoose = require('../libs/mongoose');

var projectSchema = new mongoose.Schema({
    "name": {"type": "String"},
    "fullImage": {"type": "String"},
    "croppedImage": {"type": "String"},
    "description": {"type": "String"},
    "about":String,
    "location": String,
    "tags": Array,
    "owner": String,
    "created": {"type": "Date", "default": Date.now}
});

exports.Project = mongoose.model('Project', projectSchema);

