define(['tags/web-input/web-input','tags/web-spinner/web-spinner'],webInput,webSpinner);
function cb(opts) {
    // Attributes
    this.closeTo = opts.closeto || false;
    this.refSlide = null;
    this.min = parseInt(opts.min) || 0;
    this.max = parseInt(opts.max) || 100;
    this.textValue = opts.text || '';
    this.queueCount = 0;
    // Ready
    this.on('mount',()=>{
        // Nested tags
        this.webInput = this.tags['webInput'];
        this.slide = this.tags['slide'];
        this.spinner = this.tags['spinner'];
        // Initialize web-input
        this.webInput.init(opts);
        this.webInput.setIcons(this.root);
        // overrides
        this.webInput.inputClick = this.webInput.iconClick = this.webInput.placeholderClick = this.open;
        // Fires
        this.spinner.on('valueUpdate',this.valueUpdate);
        this.text.innerHTML = this.textValue;
        this.slide.on('inEnd',this.inEnd);
        //async close to agreement
        setTimeout(()=>{this.slide.setCloseTo();this.spinner.init();});
        // Methods outside the component
        this.more.addEventListener('click',this.increase);
        this.less.addEventListener('click',this.reduce);
        this.setButton.addEventListener('click',this.close);
    });
    /**
     * Open Spinner
     */
    this.open = ()=>{
        this.slide.open();
        this.refSlide.close();
    }
    this.inEnd = ()=>{
        this.queueCount++;
        if( this.queueCount==7) {
            this.queueCount = 0;
            this.spinner.setValue(parseInt(this.webInput.input.value.replace(/[^0-9]/,'')) || 0);
        }
    }
    /**
     * Close spinner
     */
    this.close = ()=>{
        this.webInput.input.value = this.spinner.value;
        this.webInput.checkValidation(this.spinner.value);
        this.slide.close();
        this.refSlide.open();
        this.webInput.focusIn();
        this.webInput.input.focus();
        this.webInput.update({focus:true});
    }
    /**
     * When spinner value is update
     */
    this.valueUpdate = ()=>{
        this.amount.innerHTML = this.spinner.value;
    }
    this.increase = ()=>{
        if(this.spinner.value + 1 <= this.spinner.max+this.min) {
            this.spinner.setValue(this.spinner.value+1)
        }
    }
    this.reduce = ()=>{
        if(this.spinner.value - 1 >= this.spinner.min ) {
            this.spinner.setValue(this.spinner.value-1)
        }
    }
}





