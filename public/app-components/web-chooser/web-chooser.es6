define(['tags/web-ripple/web-ripple'],ripple);
function cb(opts) {
    this.named = opts.named || 'undefined';
    try{var buttons = eval(opts.buttons);}catch(e){};
    this.buttons = buttons || [];
    this.value = '';
    // Ready
    this.on('mount',()=>{
        this.buttonNodes = this.wrapper.querySelectorAll('web-ripple-button');
        [].forEach.call(this.buttonNodes,(node)=>{
            node.style.width = Math.round(100/this.buttonNodes.length) + '%';
        })
    });
    this.choose = (e)=>{
        e.preventDefault();
        this.value = parents(e.target,'web-ripple-button').dataset.value;
        this.update();
    }
    function parents(element, criteria) {
        if (element.className.split(' ').indexOf(criteria)>=0 || element.tagName.toLowerCase()==criteria.toLowerCase() ) return element;
        return element.parentNode && parents(element.parentNode, criteria);
    }
}





