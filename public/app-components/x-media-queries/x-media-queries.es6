function cb(opts) {
    this.currentMedia = null;
    this.on('mount',()=>{
        this.tags['core-media-query'].forEach(function(tag){
            var self = this;
            tag.on('matchesChanged',function(){
                self.currentMedia = this.root.id;
                self.trigger('currentMediaChanged');
            }.bind(tag));
        }.bind(this));
    });
    this.on('currentMediaChanged',function(){
        console.log(this.currentMedia)
    }.bind(this));
}





