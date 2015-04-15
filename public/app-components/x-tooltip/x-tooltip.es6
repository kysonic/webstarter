define(['tags/inner-html/inner-html'],innerHTML);
function cb(opts) {
    this.msg = opts.msg;
    this.opened = false;
    this.fadeOutDelay = 15000;
    this.timer = null;
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
            this.trigger('open');
            var bcr = this.related.getBoundingClientRect();
            var wrapperBcr = this.wrapper.getBoundingClientRect();
            this.root.style.top = bcr.top - (wrapperBcr.height) - 5+ 'px';
            this.root.style.left = bcr.left + (bcr.width/2) - (wrapperBcr.width/2)  + 'px';
        });
        this.timer = setTimeout(()=>{
            this.trigger('close');
        },this.fadeOutDelay)
    });
    /**
     * On Close
     */
    this.on('close',()=>{
        clearInterval(this.timer);
        this.opened = false;
        this.update();
    });
    this.on('open',()=>{
        setTimeout(()=>{
            this.root.style.webkitAnimation = `tooltip-in cubic-bezier(1, 0.6, 0.175, 0.3) 0.4s 1`;
            this.root.style.animation = `tooltip-in cubic-bezier(1, 0.6, 0.175, 0.3) 0.4s 1`;
        })
        this.opened = true;
        this.update();
    });
    /**
     * Click on body to close tooltip.
     * @param e
     */
    this.bodyClick = (e)=>{
        this.root.style.webkitAnimation = `none`;
        this.root.style.animation = `none`;
        if(!$(e.target).parents('x-tooltip')[0]) {
            this.trigger('close');
        }
    }
}





