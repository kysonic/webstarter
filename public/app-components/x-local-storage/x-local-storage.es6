function cb(opts) {
    this.localStorageKey = opts.key;
    this.localStorage = {};
    //Ready
    this.on('mount',function(){
        this.localStorage = JSON.parse(localStorage.getItem(this.localStorageKey));
    }.bind(this));
    /**
     * Watch localStorage changes...
     */
    this.on('localStorageChanged',function(){
       localStorage.setItem(this.localStorageKey,JSON.stringify(this.localStorage));
    });
}





