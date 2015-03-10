var mongoose = require('../../libs/mongoose/index');

var schema = new mongoose.Schema({
    dev: {
        type: String,
        unique: true,
        required: true
    },
    created:{
        type:Date,
        default: Date.now
    }
});

schema.methods.getDev = function(){
    return this.dev;
}
schema.virtual('devionica').set(function(devionica){
    this._devionica = devionica
}).get(function(){
    return this._devionica;
});

exports.Rest = mongoose.model('Rest',schema);

