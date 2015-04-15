define(['TweenMax'],TweenMax);
function cb(opts) {
    this.opened = false;
    this.selected = '';
    this.setOptions = (opts)=>{
        try{var data = eval(opts.data)}catch(e){var data=[]};
        this.limit = opts.limit || 4;
        this.startData = data || [];
        this.data = this.startData.slice(0,this.limit) || [];
        this.update();
    }
    this.setOptions(opts);
    this.open = ()=>{
        this.trigger('openedChanged',true);
        //TweenMax.from(this.items.querySelectorAll('.item:first-child'),0.2 ,{transform:"rotateX(30deg)"});
        TweenMax.staggerFrom(this.items.querySelectorAll('.item'),0.3 ,{transform:"rotateX(20deg)"},0.1);
        //this.animateItems();
    }
    this.animateItems = ()=>{
        this.items = this.items.querySelectorAll('.item');
        this.itemCount = this.items.length;
        [].forEach.call(this.items,(item,key)=>{
            if(key!=0) TweenMax.from(item,0.3,{y:-30*key,delay:0.1})
        });
    }
    this.close = ()=>{
        this.trigger('openedChanged',false);
    }
    this.on('openedChanged',(opened)=>{
        if(opened!=undefined) this.opened = opened;
        this.update();
    });
    this.selectItem = (e)=>{
        console.log('selectItem')
    }
}





