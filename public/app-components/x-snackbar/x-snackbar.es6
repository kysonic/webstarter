define(['TweenMax'],TweenMax);
function cb(opts) {
    // Attributes
    this.time = opts.time || 5000;
    // Vars
    this.opened = false;
    this.isError = false;
    this.msg = '';
    this.timer = null;
    /**
     * Ready
     */
    this.on('mount',()=>{
        this.setPosition();
    });
    /**
     * Open
     */
    this.open = ()=>{
        this.update({opened:true});
        this.inProcess = true;
        TweenMax.fromTo(this.root,0.3,{transform:'translateY(-100px)',opacity:0},{transform:'translateY(0px)',opacity:1});
        setTimeout(()=>{this.setPosition();});
        clearInterval(this.timer);
        this.timer = setTimeout(()=>{this.close();},this.time);
    }
    this.close = ()=>{
        TweenMax.to(this.root,0.3,{transform:'translateY(-100px)',opacity:0,ease: Power4.EaseOut,onComplete:()=>{this.update({opened:false});}});
    }
    this.setPosition = ()=>{
        if(opts.right!=undefined) {this.root.style.marginLeft = - this.wrapper.getBoundingClientRect().width - 20 +'px'}
    }
}





