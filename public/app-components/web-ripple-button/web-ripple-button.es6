define(['tags/web-ripple/web-ripple'],ripple);
function cb(opts) {
    this.title = opts.title;
    this.ripple = this.tags['web-ripple'];
    this.ripple.opts = opts;
    /**
     * Ready
     */
    this.on('mount',()=>{

    });
    this.rippleIn = (e)=>{
        this.ripple.trigger('ripple-in',e);
    }
    this.rippleOut = (e)=>{
        this.ripple.trigger('ripple-out',e);
    }
}





