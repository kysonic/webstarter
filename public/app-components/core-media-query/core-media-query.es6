function cb(opts) {
    this.query = opts.query;
    this.mq = null;
    this.matches = null;
    // Ready
    this.on('mount', ()=>{
        this.mq = window.matchMedia(this.query);
        this.mq.addListener(this.mqHandler.bind(this));
        this.mqHandler();
    });
    // On change matches
    this.on('matchesChanged', ()=>{
        console.log(this.root.id,this.matches);
    });
    // Change matches handler
    this.mqHandler = ()=>{
        this.matches = this.mq.matches;
        this.trigger('matchesChanged');
    }
}





