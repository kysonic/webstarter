function cb(opts) {
    // Options
    this.color = opts.color || '#fff';
    this.scale = opts.scale || 20;
    // Basics
    this.ripples = [];
    this.presed = false;
    /**
     * Ripple in event
     */
    this.on('ripple-in',(e)=>{
        this.presed = true;
        var ripple = {node:document.createElement('div'),isEnd:false};
        ripple.node.classList.add('ripple');
        this.ripples.push(ripple);
        // Styles
        ripple.node.style.left = e.layerX + 'px';
        ripple.node.style.top = e.layerY + 'px';
        ripple.node.style.backgroundColor = this.color;
        ripple.node.style.borderRadius = '50%';
        //Animation
        ripple.node.style.transform = `scale(20)`;
        ripple.node.style.opacity = 0.2;
        ripple.node.style.webkitAnimation = `ripple-in cubic-bezier(1, 0.6, 0.175, 0.3) 0.2s`;
        ripple.node.style.animation = `ripple-in cubic-bezier(1, 0.6, 0.175, 0.3) 0.2s`;
        // Add ripple in wrapper
        this.root.appendChild(ripple.node);
        // isEnd?
        setTimeout(()=>{
            ripple.isEnd = true;
            if(!this.presed) {
                this.rippleOut(ripple.node,this.ripples.length-1);
            }
        },this.time);
    });
    /**
     * Set options
     * @param opts
     */
    this.setOptions = (opts)=>{
        this.color = opts.color || '#fff';
        this.scale = opts.scale || 20;
    }
    /**
     * Ripple out event
     */
    this.on('ripple-out',(e)=>{
        this.presed = false;
        this.ripples.forEach((ripple,key)=>{
            if(ripple.isEnd) {
                this.rippleOut(ripple.node,key);
            }
        });
    });
    /**
     * Out ripple
     * @param ripple
     */
    this.rippleOut=(ripple,key)=>{
        this.ripples.splice(key,1);
        ripple.style.transform = `scale(110)`;
        ripple.style.opacity = 0;
        ripple.style.webkitAnimation = `ripple-out cubic-bezier(0.5, 0.5, 0.5, 0.5) 0.5s`;
        ripple.style.animation = `ripple-out cubic-bezier(0.5, 0.5, 0.5, 0.5) 0.5s`;
        setTimeout(()=>{
            if(ripple.parentNode) this.root.removeChild(ripple);
        },500);
    }
    /**
     * Convert time out from milisseconds to css-time
     * @param time
     * @returns {string}
     */
    function getTime(time){
        return (time/1000)+'s';
    }
}





