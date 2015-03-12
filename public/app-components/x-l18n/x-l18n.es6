function cb(opts) {
    this.l18n = null;
    this.lang = 'ru';
    //Ready
    this.on('mount',function(){
        // Get l18n data
        $.get('l18n.json',function(data){
            this.l18n = data;
        }.bind(this));
    }.bind(this));
    /**
     * Give a translate
     * @param value - translate code
     */
    this.translator = function(value) {
        return this.l18n[this.lang][value];
    }
}





