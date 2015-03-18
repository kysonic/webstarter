define(['webstarter','tags/user/user','tags/over-ground/over-ground','tags/auth-form/auth-form'],Webstarter,user);
function cb(opts) {
    this.logoText = opts.logotext;
    this.media = null;
    this.currentMedia = null;
    /**
     * Ready
     */
    this.on('mount',function(){
        // Async
        setTimeout(function(){
            // Get additional global tags
            this.media = Webstarter.tags.findTagByName('x-media-queries');
            this.l18n  = Webstarter.tags.findTagByName('x-l18n');
            this.User = this.tags.user;
            this.overGround = this.tags['over-ground'];
            this.content = Webstarter.tags.findTagByName('content');
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
    // Open over ground popup
    this.toggleOverGround = (e)=>{
        this.overGround.opened = !this.overGround.opened;
        this.overGround.trigger('openedChanged');
    }
    /**
     * Log out event.
     * @param e
     */
    this.logOut = (e)=>{
        this.User.xRest.custom('GET',{},'log/out').then((data)=>{
            if(data.success) {
                this.content.isAuth = false ;
                this.content.trigger('isAuthChanged');
            }
        },(err)=>console.log(err));
    }
}





