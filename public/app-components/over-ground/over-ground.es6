define(['tags/inner-html/inner-html','riot'],innerHTML,riot);
function cb(opts) {
    this.opened = false;
    this.autoClose = opts.autoclose;
    this.go = true;
    this.content = 'CONT';
    /**
     * Ready
     */
    this.on('mount',()=>{
        if(opts.layred) document.documentElement.appendChild(this.root);
        //console.log(this.tags['inner-html'].update())
        // How to bind tag inner html?
        /*riot.tag('temp-tag',this.tags['inner-html'].root.innerHTML,function(){});
        this.tags['inner-html'].root.innerHTML = '';
        this.tags['inner-html'].root.appendChild(document.createElement('temp-tag'));
        var tag = riot.mount('temp-tag');
        console.log(tag)*/
    });
    /**
     * Watch opened
     */
    this.on('openedChanged',(e)=>{
        this.update({opened:this.opened});
        this.setPosition();
        this.scaleBody();
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
        if(opts.center) {
            this.wrapper.style.marginLeft = -Math.round(boundRect.width/2) +'px';
            this.wrapper.style.marginTop = -Math.round(boundRect.height/2) +'px';
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
     * Scale body to over ground effects
     */
    this.scaleBody = ()=>{
        document.body.classList.toggle('over-ground');
        document.documentElement.classList.toggle('over-ground');
    }
}





