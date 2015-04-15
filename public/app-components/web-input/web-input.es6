function cb(opts) {
    /**
     * Set options. Use it if web-input will be nested in other tag.
     * @param opts
     */
    this.setOptions = (opts)=>{
        // Attributes
        this.named = opts.named || 'input';
        this.placeholder = opts.placeholder || '';
        this.required = opts.required == 'true';
        this.placeholder = this.required  ? this.placeholder + '*' : this.placeholder;
        this.value = opts.value;
        this.mode = opts.mode || 'edit';
        // Set focus if we have value
        if(this.value && this.focusIn) this.focusIn();
        // Basic vars
        this.maxLength = opts.maxlength || null;
        this.chartersLeft = this.maxLength;
        this.onIconClick = opts.oniconclick;
        //Validation  features
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
    /**
     * Ready
     */
    this.on('mount',(e)=>{
        //Tooltip
        this.tooltip = this.tags['x-tooltip'];
        this.tooltip.error = true;
        // Focus on if we have value
        if(this.value) {
            this.focus = true;
            this.focusIn();
        }
        //Required
        this.isRequired(this.input.value);
        //Max length
        if(this.maxLength) this.input.addEventListener('blur',()=>{this.input.value = this.input.value.substr(0,this.maxLength); this.cahrtersLeft = 0; this.update();});
        // Icon
        this.setIcons(this.root);
        this.update();
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
     * Set icon
     * @param root - root of current element
     */
    this.setIcons = (root)=>{
        this.icon = root.querySelector('#icon');
        if(this.icon) this.icons.appendChild(this.icon);
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
        this.update();
    }
    /**
     * Check out length of word if we have maxlength attribute.
     * @param value - value for checking
     */
    this.checkLength = (value,e)=>{
        if(this.cahrtersLeft<=0) e.target.value = value.substr(0,value.length-1);
        this.cahrtersLeft = this.maxLength - value.length;
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
    /**
     * Trim string
     * @param value
     */
    this.trim = (value)=>value ? value.replace(/^\s+|\s+$/i,'') : '';
}





