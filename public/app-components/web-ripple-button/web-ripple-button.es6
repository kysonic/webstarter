define(['tags/web-ripple/web-ripple'],ripple);
function cb(opts) {
    //Attributes
    this.title = opts.title;
    this.ripple = this.tags['web-ripple'];
    this.isFile = opts.isfile=='true' || false;
    this.on('mount',()=>this.ripple.setOptions(opts));
    /**
     * When ripple is come
     * @param e
     */
    this.rippleIn = (e)=>{
        this.ripple.trigger('ripple-in',e);
    }
    /**
     * When ripple is out
     * @param e
     */
    this.rippleOut = (e)=>{
        this.ripple.trigger('ripple-out',e);
    }
    /**
     * Change file
     * @param e
     */
    this.changeFile = (e)=>{}
}





