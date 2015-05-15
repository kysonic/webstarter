define(['webstarter','tags/user/user','tags/over-ground/over-ground','tags/auth-form/auth-form','tags/web-tabs/web-tabs'],Webstarter);
function cb(opts) {
    this.media = null;
    this.currentMedia = null;
    // Basic menu is static now. XXX: Maybe make json config with menu items?
    this.basicMenu = [
        {link:'/user',title:'Profile'},
        {link:'#',title:'Projects'},
        {link:'#',title:'Teams'},
        {link:'/project',title:'Create Idea'}
    ];
    // Set active item
    if(opts && opts.submenu!='undefined' && this.basicMenu[opts.active]) this.basicMenu[opts.active].active = true;
    // Set sub menu
    if(opts && opts.submenu!='undefined' && opts.submenu!=undefined) this.subMenu = typeof opts.submenu.toLowerCase() === 'string' ? JSON.parse(opts.submenu) : opts.submenu;
    if(!this.subMenu) this.subMenu = {length:0};
    /**
     * Ready
     */
    this.on('mount',()=>{
        // Async
        setTimeout(()=>{
            // Get additional global tags
            this.media = Webstarter.tags.findTagByName('x-media-queries');
            this.l18n  = Webstarter.tags.findTagByName('x-l18n');
            this.User = this.tags.user;
            this.overGround = this.tags['over-ground'];
            this.content = Webstarter.tags.findTagByName('content');
            this.menuContent = Webstarter.tags.findTagByName('menu-content');
            this.menuHeader = Webstarter.tags.findTagByName('menu-header');
            if(!this.media || !this.l18n) console.error('Sorry man... But you don\'t have needed components...');
            // Async startup
            setTimeout(()=>{
                this.media.startup();
            },0);
            //Watch changes of current media state and update the view
            this.media.on('currentMediaChanged',()=>{
                this.currentMedia = this.media.currentMedia;
                this.update();
            });
        },0);
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
                this.content.update({isAuth:false});
                this.menuContent.update({isAuth:false});
                this.menuHeader.update({isAuth:false});
                this.update();
            }
        },(err)=>console.log(err));
    }
}





