define(['tags/web-ripple-button/web-ripple-button','webstarter'],webRipple,Webstarter);
function cb(opts) {
    // Attributes
    this.tabs = opts.tabs || [];
    if((typeof this.tabs).toLowerCase()=='string') this.tabs = eval(this.tabs);
    this.cls = opts.cls || 'tabs';
    this.rippleColor = opts.ripplecolor || "#fff";
    this.rippleScale = opts.ripplescale || 20;
    this.isHashed = opts.ishashed || false;
    try{this.tabs = JSON.parse(this.tabs)}catch (e) {};
    this.named = opts.named || '';
    //Basics
    this.selected = 0;
    /**
     * Ready
     */
    this.on('mount',()=>{
        this.update();
        // Async
        setTimeout(()=>{
            this.setWidth();
            // If hashed mode on set event listener
            if(this.isHashed) {
                this.hash = Webstarter.tags.findTagByName('x-hash');
                this.hash.observerTags.push(this);
                this.on('hashchange',this.hashChanged);
            }
        });
    });
    /**
     * Set Width
     * @param e
     */
    this.setWidth = (e)=>  {
        [].forEach.call(this.root.querySelectorAll('web-ripple-button'),(node)=>{
            node.style.width = this.line.style.width = (100/this.tabs.length).toFixed(2) +'%';
        });
    }
    /**
     * Change tab
     * @param e
     */
    this.changeTab = (e)=>{
        var dataSet = parents(e.target,'web-ripple-button').dataset;
        var id = dataSet.id;
        if(this.isHashed) location.hash = dataSet.link;
        this.update({selected:id});
        this.line.style.left = this.line.getBoundingClientRect().width * (id) + 'px';
    }
    /**
     * Hash Change.
     * @param e
     */
    this.hashChanged = (hash)=>{
        var selected = 0;
        this.tabs.forEach((tab,key)=>{
            if(tab.link==hash) selected = key;
        });
        this.update({selected:selected});
        this.line.style.left = this.line.getBoundingClientRect().width * (selected) + 'px';
    }
    /**
     * Additional function. It search parent of current node with needed creteria.
     * @param element - current element
     * @param criteria - criteria tagName or className
     * @returns {*}
     */
    function parents(element, criteria) {
        if (element.className.split(' ').indexOf(criteria)>=0 || element.tagName.toLowerCase()==criteria.toLowerCase() ) return element;
        return element.parentNode && parents(element.parentNode, criteria);
    }
}





