define(['jquery'],$);
function cb(opts) {
    this.placeholder = opts.placeholder;
    this.named = opts.named || 'textarea';
    this.placeholder = opts.required == 'true' ? this.placeholder + '*' : this.placeholder;
    this.focus = false;
    this.hardcoreFocus = false;
    this.on('mount',(e)=>{
        require(['scroller'],function(){
            $(this.textarea).scrollbar();
        });
    });
    // Icon
    this.icon = this.root.querySelector('#icon');
    if(this.icon) this.icons.appendChild(icon);
    this.focusIn = (e)=>{
        this.hardcoreFocus = true;
        this.trigger('changeFocus',(this.textarea.value == '' && !this.focus) || (this.textarea.value != '' && this.focus));
    }
    this.blur = (e)=>{
        this.hardcoreFocus = false;
        this.trigger('changeFocus',!this.textarea.value == '');
    }
    this.on('changeFocus',(newFocus)=>{
        this.focus = newFocus;
        this.update();
    });
}





