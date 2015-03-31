define(['webstarter','tags/user/user','tags/over-ground/over-ground','tags/auth-form/auth-form'],Webstarter,user);
function cb(opts) {
    this.media = null;
    this.currentMedia = null;
    // Basic menu is static now. XXX: Maybe make json config with menu items?
    this.basicMenu = [
        {link:'/user',title:'My profile'},
        {link:'#',title:'Notice'},
        {link:'#',title:'Projects'},
        {link:'#',title:'Teams'}
    ];
    // Set active item
    if(opts && opts.submenu!='undefined') this.basicMenu[opts.active].active = true;
    // Set sub menu
    if(opts && opts.submenu!='undefined') this.subMenu = typeof opts.submenu.toLowerCase() === 'string' ? JSON.parse(opts.submenu) : opts.submenu;
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
        this.User.xRest.custom('GET',{},'logout').then((data)=>{
            if(data.success) {
                this.content.isAuth = false ;
                this.content.trigger('isAuthChanged');
                this.update();
            }
        },(err)=>console.log(err));
    }
}





