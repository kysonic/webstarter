define(['tags/inner-html/inner-html'],innerHTML);
function cb(opts) {
    this.msg = opts.msg;
    this.opened = false;
    this.fadeOutDelay = 15000;
    // Ready
    this.on('mount',()=>{
        this.related = this.root.nextSibling;
        document.body.addEventListener('click',this.bodyClick);
        document.documentElement.appendChild(this.root);
    });
    /**
     * Set Msg event
     */
    this.on('onSetMsg',()=>{
        // Get position of related element in next tick.
        setTimeout(()=>{
            var bcr = this.related.getBoundingClientRect();
            var wrapperBcr = this.wrapper.getBoundingClientRect();
            this.root.style.top = bcr.top - (wrapperBcr.height) - 5+ 'px';
            this.root.style.left = bcr.left + (bcr.width/2) - (wrapperBcr.width/2)  + 'px';
        });
        this.opened = true;
        this.update();
        setTimeout(()=>{
            this.trigger('close');
        },this.fadeOutDelay)
    });
    /**
     * On Close
     */
    this.on('close',()=>{
        this.opened = false;
        this.update();
    });
    /**
     * Click on body to close tooltip.
     * @param e
     */
    this.bodyClick = (e)=>{
        if(!$(e.target).parents('x-tooltip')[0]) {
            this.trigger('close');
        }
    }
}





