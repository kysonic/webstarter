define(['tags/web-input/web-input','tags/web-spinner/web-spinner'],webInput,webSpinner)
function cb(opts) {
    // Attributes
    this.closeTo = opts.closeto || false;
    this.refSlide = null;
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
    });
    //
    this.open = ()=>{
        this.slide.open();
        this.refSlide.close();
    }
    this.close = ()=>{
        this.slide.close();
        this.refSlide.open();
    }
    this.valueUpdate = ()=>{
        this.amount.innerHTML = this.spinner.value;
    }
}





