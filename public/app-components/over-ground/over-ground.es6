define(['riot','tags/inner-html/inner-html','jquery','perfectScrollbar'],riot,innerHTML,jquery,perfectScrollbar);
function cb(opts) {
    //Attributes
    this.autoClose = opts.autoclose;
    this.blur = opts.blur || null;
    this.bodyScale = opts.bodyscale || true;
    this.noPadding = opts.nopadding || null;
    this.noShadow = opts.noshadow || null;
    this.canScroll = opts.canscroll=='true' || false;
    // Basic vars
    this.opened = false;
    this.go = true;
    this.content = 'CONT';
    /**
     * Ready
     */
    this.on('mount',()=>{
        if(opts.layred) document.documentElement.appendChild(this.root);
        if(/MSIE (9)/.test(navigator.userAgent)) this.backdrop.style.background = 'rgba(0,0,0,0.2);';
        if(this.noPadding) this.wrapper.style.padding = 0;
        if(this.noShadow) this.wrapper.style.boxShadow = 'none';
        // Scroll
        if(this.canScroll) {
            $(this.inner).perfectScrollbar({suppressScrollX:true,scrollYMarginOffset: 0});
            this.trigger('updateScroll');
        }
    });
    /**
     * Watch open
     */
    this.on('openedChanged',(opened)=>{
        this.update({opened:this.opened});
        this.setPosition();
        if(this.bodyScale!='false') this.scaleBody();
        if(this.blur=='true') this.blurHandler();
        setTimeout(()=>{
            this.go = !this.opened;
            this.update({go:this.go});
        },0);
    });
    /**
     * Set Popup Position after rendering
     */
    this.setPosition = ()=>{
        var boundRect = this.wrapper.getBoundingClientRect();
        var width = parseInt(getComputedStyle(this.wrapper).width);
        var height = parseInt(getComputedStyle(this.wrapper).height);
        if(opts.center) {
            this.wrapper.style.marginLeft = -Math.round(width/2) +'px';
            this.wrapper.style.marginTop = -Math.round(height/2) +'px';
        }
    }
    /**
     * Close
     */
    this.close = ()=>{
        this.opened = false;
        this.trigger('openedChanged');
    }
    /**
     * Open
     */
    this.open = ()=>{
        this.opened = true;
        this.trigger('openedChanged');
    }
    /**
     * Scale body to over ground effects
     */
    this.scaleBody = ()=>{
        document.body.classList.toggle('over-ground');
        document.documentElement.classList.toggle('over-ground');
    }
    /**
     * Handle blur version
     */
    this.blurHandler = ()=>{
        document.body.classList.toggle('over-blur');
    }
    /**
     * Update scroll handler
     */
    this.on('updateScroll',()=>{
        $(this.inner).perfectScrollbar('update');
    });
}





