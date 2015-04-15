define(['jquery'],$);
function cb(opts) {
    // Attributes
    this.placeholder = opts.placeholder;
    this.named = opts.named || 'textarea';
    this.placeholder = opts.required == 'true' ? this.placeholder + '*' : this.placeholder;
    this.value = opts.value || '';
    this.mode = opts.mode || 'edit';
    // Basic vars
    this.focus = !!opts.value;
    this.hardcoreFocus = false;
    /**
     * Ready
     */
    this.on('mount',(e)=>{
        require(['scroller'],function(){
            $(this.textarea).scrollbar();
        });
        this.icon = this.root.querySelector('#icon');
        if(this.icon && this.mode == 'view') this.icons.appendChild(this.icon);
        else this.root.removeChild(this.root.querySelector('#icon'));
    });
    /**
     * Focus in
     * @param e
     */
    this.focusIn = (e)=>{
        this.hardcoreFocus = true;
        this.trigger('changeFocus',(this.textarea.value == '' && !this.focus) || (this.textarea.value != '' && this.focus));
    }
    /**
     * Blur
     * @param e
     */
    this.blur = (e)=>{
        this.hardcoreFocus = false;
        this.trigger('changeFocus',!this.textarea.value == '');
    }
    /**
     * Change focus event
     */
    this.on('changeFocus',(newFocus)=>{
        this.focus = newFocus;
        this.update();
    });
}





