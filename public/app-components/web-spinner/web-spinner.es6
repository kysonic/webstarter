function cb(opts) {
    // Attributes
    this.min = parseInt(opts.min) || 0;
    this.max = parseInt(opts.max) || 100;
    // Basics
    this.isDrag = false;
    this.buttonWidth = 25;
    this.value =  this.min;
    this.x = 0;
    // Ready
    this.on('mount',()=>{
        document.body.addEventListener('mousemove',this.move);
        document.body.addEventListener('mouseup',this.release);
        // Update on mount
        this.init();
    });
    /**
     * Initialize function
     */
    this.init = ()=>{
        this.bound = this.wrapper.getBoundingClientRect();
        this.leftBorder = 0;
        this.rightBorder = Math.round(this.bound.width-this.buttonWidth);
        this.step = (this.rightBorder/(this.max-this.min)).toFixed(2);
        this.button.style.left = '0px';
        this.trigger('valueUpdate');
    }
    /**
     * When LMB was pressed.
     * @param e
     */
    this.press = (e)=>{
        this.isDrag = true;
    }
    /**
     * Move mouse when LMB is pressed.
     * @param e
     */
    this.move = (e)=>{
        // Checkout drag state
        if(this.isDrag) {
            // Calculate delta on X - axis
            this.previousClientX = !this.previousClientX ? e.clientX : this.previousClientX;
            var delta = e.clientX - this.previousClientX;
            var notUpdate = false;
            this.x += delta;
            // Checkout border collision
            if(this.x >this.leftBorder && this.x <this.rightBorder)
                this.x = this.x;
            else if(this.x < this.leftBorder) {
                this.x = this.leftBorder;
                notUpdate = true;
            }
            else if(this.x > this.rightBorder) {
                this.x = this.rightBorder;
                notUpdate = true;
            }
            if(!notUpdate) this.previousClientX = e.clientX;
            this.button.style.left = this.x +'px';
            this.value = Math.round(this.x/this.step) + this.min;
            this.trigger('valueUpdate');
        }
    }
    /**s
     * When LMB is released.
     * @param e
     */
    this.release = (e)=>{
        this.isDrag = false;
    }
    /**
     * Click on a spinner body.
     * @param e
     */
    this.spinnerClick = (e)=>{
        if(!this.isDrag) {
            this.setValue(Math.round(e.layerX/this.step)+this.min);
        }
    }
    /**
     * Set value method. After the value set change button position.
     * @param value
     */
    this.setValue = (value)=>{
        value= value>this.max ? this.max : value;
        value= value<this.min ? this.min : value;
        this.value = value;
        this.x = (this.value-this.min)*this.step;
        this.button.style.left = this.x +'px';
        this.previousClientX = this.button.getBoundingClientRect().left;
        this.trigger('valueUpdate');
    }
}





