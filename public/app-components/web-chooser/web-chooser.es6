define(['tags/web-ripple/web-ripple'],ripple);
function cb(opts) {
    this.named = opts.named || '';
    try{var buttons = eval(opts.buttons);}catch(e){};
    this.buttons = buttons || [];
    this.value = opts.value || '';
    this.mode = opts.mode || 'edit';
    // Ready
    this.on('mount',()=>{
        this.buttonNodes = this.wrapper.querySelectorAll('web-ripple-button');
        [].forEach.call(this.buttonNodes,(node)=>{
            node.style.width = (100/this.buttonNodes.length).toFixed(2) + '%';
        });
        this.icon = this.root.querySelector('#icon');
        if(this.icon && this.mode == 'view') this.icons.appendChild(this.icon);
        else if(this.root.querySelector('#icon')) this.root.removeChild(this.root.querySelector('#icon'));
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





