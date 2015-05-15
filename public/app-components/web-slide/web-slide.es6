define(['tags/inner-html/inner-html','TweenMax','webstarter','perfectScrollbar'],innerHtml,TweenMax,Webstarter,perfectScrollbar);
function cb(opts) {
    // Attributes
    this.apperance = opts.apperance || 'left';
    this.mode = opts.mode || 'relative';
    this.closeTo = opts.closeto;
    this.opened = opts.opened=='true' || false;
    this.timeIn = opts.timein || 800;
    this.timeOut= opts.timeout || 800;
    this.canScroll = opts.canscroll || false;
    this.outDistance = parseInt(opts.outdistance) || 150;
    this.staggerTime = eval(opts.staggertime) || 0.1;
    // View window
    this.viewWindowHeight = opts.vwh || '100%';
    this.viewWindowWidth = opts.vww || '100%';
    // Animation type
    this.ease = opts.ease || 'Power0';
    // Hashes
    this.isHashed = opts.ishashed || false;
    this.orderByHash = opts.orderbyhash || false;
    // Screen? Change with hash?
    this.possibleRoutes = opts.possibleroutes && opts.possibleroutes.split && opts.possibleroutes.split('#') || false;
    this.defaultRoute = opts.defaultroute || false;
    //Basic vars
    this.eases = {Power0: Power0, Power1: Power1, Power2: Power2,Power3: Power3,Power4: Power4,Expo:Expo,Elastic:Elastic,Bounce:Bounce,Sine:Sine};
    /**
     * Ready
     */
    this.on('mount',()=>{
        // On Resize
        window.addEventListener('resize', this.resize.bind(this), true);
        // View Window
        this.setViewWindow();
        // Mode
        this.root.classList.add(this.mode);
        // CloseTo
        var closeNode = document.querySelector(this.closeTo);
        if(this.closeTo && closeNode) {
            var parent = closeNode.parentNode;
            if(parent) document.querySelector(this.closeTo).parentNode.appendChild(this.root);
        }
        Tweens[this.apperance+(this.opened ? '-in' : '-out')](0);
        // Async
        setTimeout(()=>{
            // On Hash changed
            if(this.isHashed) {
                this.hash = Webstarter.tags.findTagByName('x-hash');
                this.hash.observerTags.push(this);
                this.on('hashchange',this.hashChanged);
                // Set Screen instantly
                this.timeIn = this.timeOut = 0;
                this.hashChanged(location.hash || this.hash.defaultRoute);
                // Set basic time
                this.timeIn  = opts.timein;
                this.timeOut  = opts.timeout;
            }
            if(this.canScroll) {
                $(this.inner).perfectScrollbar({suppressScrollX:true,scrollYMarginOffset: 0});
                this.trigger('updateScroll');
            }
        });
    });
    /**
     * Set view Window.
     */
    this.setViewWindow = ()=>{
        this.wrapper.style.width =  this.viewWindowWidth;
        this.wrapper.style.height =  this.viewWindowHeight;
        this.wrapper.style.right = ((parseInt(this.viewWindowWidth) - 100)/2) + '%';
        this.wrapper.style.bottom = ((parseInt(this.viewWindowHeight) - 100)/2) + '%';
        this.inner.style.width = 100 - ((parseInt(this.viewWindowWidth)-100)) + '%';
        this.inner.style.height = 100 - ((parseInt(this.viewWindowHeight)-100)) + '%';
    }
    /**
     * Open
     */
    this.open = ()=>{this.trigger('openedChanged',true);}
    /**
     * Close
     */
    this.close = ()=>{this.trigger('openedChanged',false);}
    /**
     * Opened/Close Event
     */
    this.on('openedChanged',(opened)=>{
        if(opened!=undefined) this.opened = opened;
        Tweens[this.apperance+(this.opened ? '-in' : '-out')](this.opened ? this.timeIn/1000 : this.timeOut/1000);
        this.update({opened:this.opened});
    });
    /**
     * On Resize event
     */
    this.resize = ()=>{
        Tweens[this.apperance+(this.opened ? '-in' : '-out')](0);
        this.update({opened:this.opened});
    }
    /**
     * On hash changed.
     * @param e
     */
    this.hashChanged = (hash)=>{
        var currentRoute = this.root.id;
        this.trigger('openedChanged',hash=='#'+currentRoute);
    }
    /**
     * Tweens
     */
    var Tweens = {
        'left-in': (time)=>{
            this.root.style.zIndex = 60;
            TweenMax.to(this.inner, time,{transform:`translateX(0px)`,ease: this.eases[this.ease].easeIn});
        },
        'left-out': (time)=>{
            this.root.style.zIndex = 0;
            var wrapperBound = this.inner.getBoundingClientRect();
            TweenMax.to(this.inner,time,{transform:`translateX(-${wrapperBound.width+this.outDistance}px)`,ease: this.eases[this.ease].easeOut});
        },
        'right-in': (time)=>{
            this.root.style.zIndex = 60;
            TweenMax.to(this.inner, time,{transform:`translateX(0px)`,ease: this.eases[this.ease].easeIn});
        },
        'right-out': (time)=>{
            this.root.style.zIndex = 0;
            var wrapperBound = this.inner.getBoundingClientRect();
            TweenMax.to(this.inner,time,{transform:`translateX(${wrapperBound.width+this.outDistance}px)`,ease: this.eases[this.ease].easeOut});
        },
        'left-queue-in': (time)=>{
            this.root.style.zIndex = 60;
            TweenMax.staggerTo(this.inner.querySelectorAll('.queue'), time,{transform:`translateX(0px)`,ease: this.eases[this.ease].easeIn},this.staggerTime);
        },
        'left-queue-out': (time)=>{
            this.root.style.zIndex = 0;
            var wrapperBound = this.inner.getBoundingClientRect();
            TweenMax.staggerTo(this.inner.querySelectorAll('.queue'), time,{transform:`translateX(-${wrapperBound.width+this.outDistance}px)`,ease: this.eases[this.ease].easeIn},this.staggerTime);
        }
    }
    /**
     * Update Scroll
     */
    this.on('updateScroll',()=>{
        $(this.inner).perfectScrollbar('update');
    });
}





