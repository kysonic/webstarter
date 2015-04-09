define(['tags/web-ripple/web-ripple'],ripple);
function cb(opts) {
    this.title = opts.title;
    this.ripple = this.tags['web-ripple'];
    this.ripple.opts = opts;
    this.event = opts.event;
    /**
     * Ready
     */
    this.on('mount',()=>{
        if(this.event!=undefined) {
           var evnt = this.event.split('#');
           var func = this.parent[evnt[0]] || this.parent.parent[evnt[0]];
           this.root.addEventListener(evnt[1] || 'click',func.bind(this.parent));
        }
    });
    this.rippleIn = (e)=>{
        this.ripple.trigger('ripple-in',e);
    }
    this.rippleOut = (e)=>{
        this.ripple.trigger('ripple-out',e);
    }
}





