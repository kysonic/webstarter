define(['tags/user/user'],user)
function cb(opts) {
    this.logoText = opts.logotext;
    this.media = null;
    this.currentMedia = null;
    this.on('mount',function(){
        // Async
        setTimeout(function(){
            // Get additional global tags
            this.media = window.Webstarter.tags.findTagByName('x-media-queries');
            this.l18n  = window.Webstarter.tags.findTagByName('x-l18n');
            this.User = this.tags['user'];
            if(!this.media || !this.l18n) console.error('Sorry man... But you do not have needed components...');
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
    this.testRest = (e)=>{
        this.User.xRest.query({name:'Anton'}).then((data)=>console.log(data),(err)=>console.log(err));
    }
}





