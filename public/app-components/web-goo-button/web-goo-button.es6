function cb(opts) {
    this.title = opts.title;
    this.goo = [1,2,3,4,5];
    this.startOn = opts.starton!=undefined;
    // Ready
    this.on('mount',()=>{
        if(this.startOn) this.trigger('start');
    });
    this.on('out',()=>{
        this.root.classList.remove('finish');
        this.root.classList.add('out');
    });
    this.on('start',()=>{
        this.root.classList.add('start');
        setTimeout(()=>{
            this.root.classList.remove('start');
            this.root.classList.add('finish');
        },930);
    });
    this.out = ()=>{
        this.trigger('out');
    }
}





