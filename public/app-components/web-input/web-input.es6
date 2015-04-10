function cb(opts) {
    // Attributes
    this.setOptions = (opts)=>{
        this.named = opts.named || 'input';
        this.placeholder = opts.placeholder || '';
        this.required = opts.required == 'true';
        this.placeholder = this.required  ? this.placeholder + '*' : this.placeholder;
        this.maxLength = opts.maxlength || null;
        this.chartersLeft = this.maxLength;
        this.onIconClick = opts.oniconclick;
        //Regular features
        try{this.validation = eval(opts.validation); }catch (e){}
        // Because riot.js escape "\" charter, i created system of "\" replacing. Just set u005C (unicode) on place "\".
        if(this.validation) {
            this.validation.forEach((rule,key)=>{
                if((typeof rule.regexp).toLowerCase()=='string') try{rule.regexp = eval(rule.regexp.replace(/u005C/ig,'\\'))}catch(e){console.log(e)};
                if((typeof rule.regexp).toLowerCase()=='string')  console.log(rule.regexp.replace(/u005C/ig,'\\'))
            });
        }
    }
    this.setOptions(opts);
    // Basic vars
    this.focus = false;
    this.isValid = true;
    this.errors = [];
    // Icon
    this.icon = this.root.querySelector('#icon');
    if(this.onIconClick) this.icon.addEventListener('click',this.parent[this.onIconClick]);
    if(this.icon && this.icon!=null) this.icons.appendChild(this.icon);
    /**
     * Ready
     */
    this.on('mount',(e)=>{
        this.tooltip = this.tags['x-tooltip'];
        this.tooltip.error = true;
        this.isRequired(this.input.value);
    });
    /**
     * On focus function
     * @param e
     */
    this.focusIn = (e)=>{
        setTimeout(()=>{this.showErrors();},200);
        this.trigger('changeFocus',(this.input.value == '' && !this.focus) || (this.input.value != '' && this.focus));
    }
    /**
     * When user click on placeholder focus is set.
     * @param e
     */
    this.clickOnPlaceholder = (e)=>{
        this.input.focus();
    }
    /**
     * Key up handler
     * @param e
     */
    this.edit = (e)=>{
        if(this.validation) this.checkValidation(e.target.value);
        if(this.maxLength) this.checkLength(e.target.value,e);
    }
    /**
     * Focus out
     * @param e
     */
    this.blur=(e)=>{
        this.trigger('changeFocus',!this.input.value == '');
    }
    /**
     * Check validation. Rules takes on attributes of web-input
     * @param value - value for checking
     */
    this.checkValidation = (value)=>{
        this.errors = [];
        this.validation.forEach((rule)=>{
            this.isValid = rule.regexp.test(value);
            if(!this.isValid) this.errors.push(rule.msg || 'message');
        });
        this.isRequired(value);
        this.showErrors();
    }
    /**
     * Check out length of word if we have maxlength attribute.
     * @param value - value for checking
     */
    this.checkLength = (value,e)=>{
        this.cahrtersLeft = this.maxLength - value.length;
        if(this.cahrtersLeft<=0) e.target.value = value.substr(0,value.length-1);
        this.update();
    }
    /**
     * Required validation
     * @param value - value for checking
     */
    this.isRequired = (value)=>{
        if(this.required && value=='') {
            this.isValid = false;
            this.errors.push('required');
        }
    }
    /**
     * Show errors if we have it.
     */
    this.showErrors = ()=>{
        if(this.errors.length!==0) {
            this.tooltip.msg = this.errors.join('\n');
            this.tooltip.trigger('onSetMsg');
        }else {
            this.tooltip.trigger('close');
        }
    }
    /**
     * Change focus handler. Mutual focus action fucntion.
     */
    this.on('changeFocus',(newFocus)=>{
        this.focus = newFocus;
        this.update();
    });
}





