define(['TweenMax'],TweenMax);
function cb(opts) {
    this.init = (opts)=>{
        //Attributes
        try{var data = eval(opts.data)}catch(e){var data=[]};
        this.limit = opts.limit || 4;
        // Basics
        this.opened = false;
        this.selected = '';
        this.startData = data || [];
        this.data = this.startData.slice(0,this.limit) || [];
        // Update
        this.update();
    }
    this.init(opts);
    /**
     * Open dropdown
     */
    this.open = ()=>{
        this.trigger('openedChanged',true);
        TweenMax.staggerFrom(this.items.querySelectorAll('.item'),0.3 ,{transform:"rotateX(20deg)"},0.1);
    }
    /**
     * Close dropdown
     */
    this.close = ()=>{
        this.trigger('openedChanged',false);
    }
    /**
     *  Change dropdown state
     */
    this.on('openedChanged',(opened)=>{
        if(opened!=undefined) this.opened = opened;
        this.update();
    });
    /**
     * Select dropdown item
     * @param e
     */
    this.selectItem = (e)=>{}

}





