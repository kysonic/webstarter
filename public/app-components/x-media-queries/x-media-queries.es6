var riot = require('riot');
var xMediaQuery = require('tags/x-media-query/x-media-query');
function cb(opts) {
    var self = this;
    // Basic
    this.currentMedia = null;
    this.possibleMedias = ['xs','sm','md','lg'];
    /**
     * Ready
     */
    this.on('mount',()=>{
        // Get all of the nested core-media-query and fire!
        this.possibleMedias.forEach((mediaCode)=>{
            var tag = this.tags[mediaCode];
            this.matchesChangeHandler.call(tag);
            tag.on('matchesChanged',this.matchesChangeHandler.bind(tag));
        });
    });
    /**
     * Common media handler
     */
    this.matchesChangeHandler = function(){
        self.currentMedia = this.matches ? this.root.id : this.currentMedia;
        if(this.matches) self.trigger('currentMediaChanged');
    }
}





