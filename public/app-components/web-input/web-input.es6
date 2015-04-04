function cb(opts) {
    this.placeholder = opts.placeholder;
    this.placeholder = opts.required == 'true' ? this.placeholder + '*' : this.placeholder;
    this.focus = false;
    this.focusIn = (e)=>{
        this.trigger('changeFocus',(this.input.value == '' && !this.out) || (this.input.value != '' && this.out));
    }
    this.blur = (e)=>{
        this.trigger('changeFocus',!this.input.value == '');
    }
    this.on('changeFocus',(newFocus)=>{
        this.focus = newFocus;
        this.update();
    });
}





