define(['tags/inner-html/inner-html','TweenMax','webstarter','perfectScrollbar'],innerHtml,TweenMax,Webstarter,perfectScrollbar);
function cb(opts) {
    // Attributes
    this.apperance = opts.apperance || 'left';
    this.mode = opts.mode || 'relative';
    this.closeTo = opts.closeto || false;
    this.opened = opts.opened=='true' || false;
    this.timeIn = opts.timein || 800;
    this.timeOut= opts.timeout || 800;
    this.canScroll = opts.canscroll || false;
    this.outDistance = parseInt(opts.outdistance) || 150;
    this.staggerTime = eval(opts.staggertime) || 0.1;
    this.smartDirection = opts.smartdirection=='true' || false;
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
        this.setCloseTo();

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
            // Scroll
            if(this.canScroll) {
                $(this.inner).perfectScrollbar({suppressScrollX:true,scrollYMarginOffset: 0});
                this.trigger('updateScroll');
            }
            // Tween
            Tweens[this.apperance+(this.opened ? '-in' : '-out')](0);
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
    this.on('openedChanged',(opened,direction)=>{
        if(opened!=undefined) this.opened = opened;
        var appearance = direction ? this.apperance.replace(/(left|right)/g,direction) : this.apperance;
        Tweens[appearance+(this.opened ? '-in' : '-out')](this.opened ? this.timeIn/1000 : this.timeOut/1000);
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
        var direction = false;
        if(this.smartDirection && this.hash.previousHash!=hash) {
            if(this.opened!=(hash=='#'+currentRoute)) {
                if(this.hash.possibleRoutes.indexOf('#'+currentRoute)==this.hash.possibleRoutes.indexOf(hash)) {
                    direction = this.hash.possibleRoutes.indexOf('#'+currentRoute) > this.hash.possibleRoutes.indexOf(this.hash.previousHash) ? 'left' : 'right';
                    this.setStartPosition(direction);
                }else {
                    direction = this.hash.possibleRoutes.indexOf('#'+currentRoute) > this.hash.possibleRoutes.indexOf(hash) ? 'left' : 'right';
                }
                setTimeout(()=>this.trigger('openedChanged',hash=='#'+currentRoute,direction),0);
            }

        }else {
            this.trigger('openedChanged',hash=='#'+currentRoute,direction);
        }

    }
    this.setStartPosition = (direction)=>{
        var wrapperBound = this.inner.getBoundingClientRect();
        TweenMax.to(this.inner,0,{transform:direction=='left' ? `translateX(-${wrapperBound.width+this.outDistance}px)` : `translateX(${wrapperBound.width+this.outDistance}px)`,ease: this.eases[this.ease].easeOut});
    }
    /**
     * Tweens
     */
    var Tweens = {
        'left-in': (time)=>{
            this.root.style.zIndex = 60;
           /* var wrapperBound = this.inner.getBoundingClientRect();
            this.inner.style.transform = `translateX(-${wrapperBound.width+this.outDistance}px)`;*/
            TweenMax.to(this.inner, time,{transform:`translateX(0px)`,ease: this.eases[this.ease].easeIn,onComplete:()=>this.trigger('inEnd')});
        },
        'left-out': (time)=>{
            this.root.style.zIndex = 0;
            var wrapperBound = this.inner.getBoundingClientRect();
            TweenMax.to(this.inner,time,{transform:`translateX(-${wrapperBound.width+this.outDistance}px)`,ease: this.eases[this.ease].easeOut,onComplete:()=>this.trigger('outEnd')});
        },
        'right-in': (time)=>{
            this.root.style.zIndex = 60;
            /*var wrapperBound = this.inner.getBoundingClientRect();
            this.inner.style.transform = `translateX(${wrapperBound.width+this.outDistance}px)`;*/
            TweenMax.to(this.inner, time,{transform:`translateX(0px)`,ease: this.eases[this.ease].easeIn,onComplete:()=>this.trigger('inEnd')});
        },
        'right-out': (time)=>{
            this.root.style.zIndex = 0;
            var wrapperBound = this.inner.getBoundingClientRect();
            TweenMax.to(this.inner,time,{transform:`translateX(${wrapperBound.width+this.outDistance}px)`,ease: this.eases[this.ease].easeOut,onComplete:()=>this.trigger('outEnd')});
        },
        'left-queue-in': (time)=>{
            this.root.style.zIndex = 60;
            TweenMax.to(this.inner, 0,{transform:`translateX(0px)`,ease: this.eases[this.ease].easeIn,onComplete:()=>this.trigger('inEnd')});
            TweenMax.staggerTo(this.inner.querySelectorAll('.queue'), time,{transform:`translateX(0px)`,ease: this.eases[this.ease].easeIn,onComplete:()=>this.trigger('inEnd')},this.staggerTime);
        },
        'left-queue-out': (time)=>{
            this.root.style.zIndex = 0;
            var wrapperBound = this.inner.getBoundingClientRect();
            TweenMax.to(this.inner,0,{transform:`translateX(-${wrapperBound.width+this.outDistance}px)`,delay:time+time,ease: this.eases[this.ease].easeOut,onComplete:()=>this.trigger('outEnd')});
            TweenMax.staggerTo(this.inner.querySelectorAll('.queue'), time,{transform:`translateX(-${wrapperBound.width+this.outDistance}px)`,ease: this.eases[this.ease].easeIn,onComplete:()=>this.trigger('outEnd')},this.staggerTime);
        },
        'right-queue-in': (time)=>{
            this.root.style.zIndex = 60;
            TweenMax.to(this.inner, 0,{transform:`translateX(0px)`,ease: this.eases[this.ease].easeIn,onComplete:()=>this.trigger('inEnd')});
            TweenMax.staggerTo(this.inner.querySelectorAll('.queue'), time,{transform:`translateX(0px)`,ease: this.eases[this.ease].easeIn,onComplete:()=>this.trigger('inEnd')},this.staggerTime);
        },
        'right-queue-out': (time)=>{
            this.root.style.zIndex = 0;
            var wrapperBound = this.inner.getBoundingClientRect();
            TweenMax.to(this.inner,0,{transform:`translateX(${wrapperBound.width+this.outDistance}px)`,delay:time+time,ease: this.eases[this.ease].easeOut,onComplete:()=>this.trigger('outEnd')});
            TweenMax.staggerTo(this.inner.querySelectorAll('.queue'), time,{transform:`translateX(${wrapperBound.width+this.outDistance}px)`,ease: this.eases[this.ease].easeIn,onComplete:()=>this.trigger('outEnd')},this.staggerTime);
        }
    }
    /**
     * Update Scroll
     */
    this.on('updateScroll',()=>{
        $(this.inner).perfectScrollbar('update');
    });

    this.setCloseTo= ()=>{
        var closeNode = document.querySelector(this.closeTo);
        if(this.closeTo && closeNode) {
            var parent = closeNode.parentNode;
            if(parent) document.querySelector(this.closeTo).parentNode.appendChild(this.root);
        }
    }
}





