function cb(opts) {
    this.logoText = opts.logotext;
    this.media = null;
    this.currentMedia = null;
    //Ready
    this.on('mount',function(){
        // Async
        setTimeout(function(){
            // Get x-media-queries
            this.media = window.tags.findTagByName('x-media-queries');
            if(!this.media) console.error('Sorry man... But you do not have a x-media-queries comp');
            // Async startup
            setTimeout(function(){
                this.media.startup();
            }.bind(this),0);
            //Watch changes of current media state and update the view
            this.media.on('currentMediaChanged',function(){
                this.currentMedia = this.media.currentMedia;
                this.update();
            }.bind(this));
        }.bind(this),0);
    });

}





