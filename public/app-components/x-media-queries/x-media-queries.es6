function cb(opts) {
    var self = this;
    this.currentMedia = null;
    // Ready
    this.on('mount',()=>{
        // Get all of the nested core-media-query and fire!
        this.tags['core-media-query'].forEach(function(tag){
            tag.on('matchesChanged',this.matchesChangeHandler.bind(tag));
        }.bind(this));
    });
    this.matchesChangeHandler = function(){
        self.currentMedia = this.matches ? this.root.id : self.currentMedia;
        if(this.matches) self.trigger('currentMediaChanged');
    }
    /**
     * Starting fire!
     */
    this.startup = function(){
        this.tags['core-media-query'].forEach(function(tag){
            this.matchesChangeHandler.call(tag);
        }.bind(this));
    }
}





