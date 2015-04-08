function cb(opts) {
    this.placeholder = opts.placeholder;
    this.name = opts.name;
    this.placeholder = opts.required == 'true' ? this.placeholder + '*' : this.placeholder;
    this.focus = false;
    // Icon
    this.icon = this.root.querySelector('#icon');
    if(this.icon && this.icon!=null) this.icons.appendChild(icon);
    this.focusIn = (e)=>{
        this.trigger('changeFocus',(this.input.value == '' && !this.focus) || (this.input.value != '' && this.focus));
    }
    this.blur = (e)=>{
        this.trigger('changeFocus',!this.input.value == '');
    }
    this.on('changeFocus',(newFocus)=>{
        this.focus = newFocus;
        this.update();
    });
}





