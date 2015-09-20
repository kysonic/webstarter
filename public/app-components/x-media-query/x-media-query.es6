var riot = require('riot');
function cb(opts) {
    this.query = opts.query;
    this.mq = null;
    this.matches = null;
    /**
     * Ready
     */
    this.on('mount', ()=>{
        this.mq = window.matchMedia(this.query);
        if(this.mq.addListener) this.mq.addListener(this.mqHandler.bind(this));
        this.mqHandler();
    });
    /**
     * When matches is change
     */
    this.mqHandler = ()=>{
        this.matches = this.mq.matches;
        this.trigger('matchesChanged');
    }
}





