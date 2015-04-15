define(['tags/inner-html/inner-html','TweenMax'],innerHtml,TweenMax);
function cb(opts) {
    // Attributes
    this.apperance = opts.apperance || 'left';
    this.mode = opts.mode || 'relative';
    this.closeTo = opts.closeto;
    this.opened = opts.opened=='true' || false;
    this.timeIn = opts.timein || 800;
    this.timeOut= opts.timeout || 800;
    //Basic vars
    /**
     * Ready
     */
    this.on('mount',()=>{
        this.root.classList.add(this.mode);
        if(this.mode=='absolute' && this.closeTo) {document.querySelector(this.closeTo).parentNode.appendChild(this.root);}
        Tweens[this.apperance+(this.opened ? '-in' : '-out')](0);
        this.update({opened:this.opened});
    });
    this.open = ()=>{
        this.trigger('openedChanged',true);
    }
    this.close = ()=>{
        this.trigger('openedChanged',false);
    }
    this.on('openedChanged',(opened)=>{
        if(opened!=undefined) this.opened = opened;
        Tweens[this.apperance+(this.opened ? '-in' : '-out')](this.opened ? this.timeIn/1000 : this.timeOut/1000);
        this.update({opened:this.opened});
    });
    /**
     * Tweens
     */
    var Tweens = {
        'left-in': (time)=>{
            this.root.style.zIndex = 60;
            TweenMax.to(this.wrapper, time,{transform:`translateX(0px)`,ease: Power3.easeIn});
        },
        'left-out': (time)=>{
            this.root.style.zIndex = 0;
            var wrapperBound = this.wrapper.getBoundingClientRect();
            TweenMax.to(this.wrapper,time,{transform:`translateX(-${wrapperBound.width+40}px)`,ease: Power3.easeOut});
        },
        'right-in': (time)=>{
            this.root.style.zIndex = 60;
            TweenMax.to(this.wrapper, time,{transform:`translateX(0px)`,ease: Power3.easeIn});
        },
        'right-out': (time)=>{
            this.root.style.zIndex = 0;
            var wrapperBound = this.wrapper.getBoundingClientRect();
            TweenMax.to(this.wrapper,time,{transform:`translateX(${wrapperBound.width+40}px)`,ease: Power3.easeOut});
        }
    }
}





