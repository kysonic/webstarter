function cb(opts) {
    // Basics
    this.isDrag = false;
    this.buttonWidth = 25;
    this.value = 0;
    // Ready
    this.on('mount',()=>{
        document.body.addEventListener('mousemove',this.move);
        document.body.addEventListener('mouseup',this.release);
        // Metrics
        setTimeout(()=>{
            this.bound = this.wrapper.getBoundingClientRect();
            this.leftBorder = Math.round(this.buttonWidth);
            this.rightBorder = Math.round(this.bound.width);
            this.trigger('valueUpdate');
        });
    });
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
            var x = Math.round(e.pageX-this.bound.right);
            var y = e.layerY;
            // Checkout border collision
            if(x>this.leftBorder && x<this.rightBorder)
                this.button.style.left = x - this.buttonWidth  + 'px';
            else if(x<this.leftBorder)
                this.button.style.left = this.leftBorder - this.buttonWidth  + 'px';
            else if(x>this.rightBorder)
                this.button.style.left = this.rightBorder - this.buttonWidth  + 'px';
            // Set value
            this.value = Math.round(parseInt(this.button.style.left)/(this.bound.width - this.buttonWidth)*100);
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
            this.setValue(e.layerX);
        }
    }
    /**
     * Set value method. After the value set change button position.
     * @param value
     */
    this.setValue = (value)=>{
        this.value = Math.round(value/(this.bound.width - this.buttonWidth)*100);
        this.value = this.value > 100 ? 100 : this.value;
        this.value = this.value < 0 ? 0 : this.value;
        this.button.style.left = (value> this.rightBorder - (this.buttonWidth) ? this.rightBorder - this.buttonWidth :  value - Math.round(this.buttonWidth/2)+2) + 'px';
        this.trigger('valueUpdate');
    }
}





