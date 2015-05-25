define(['tags/web-select/web-select'],webSelect);
function cb(opts) {
    // Attributes
    this.limit = opts.limit || 3;
    this.named = opts.named || '';
    // Basics
    this.tagNames = [];
    this.showTags = true;
    // Ready
    this.on('mount',()=>{
        // Init select
        opts.named = '';
        this.select = this.tags['web-select'];
        this.select.input.init(opts);
        this.select.input.setIcons(this.root);
        this.select.dropdown.init(opts);
        this.select.data =  this.select.dropdown.startData;
        // Override methods
        this.select.dropdown.selectItem = this.selectItem;
        // Perform methods
        var oEdit = this.select.input.edit;
        this.select.input.edit = (e)=>{oEdit(e);this.edit(e);}
        this.select.input.blur = this.blur;
        var oFocusIn = this.select.input.focusIn;
        this.select.input.focusIn = (e)=>{oFocusIn(e);this.focusIn(e)};
        // TODO: Blur
        this.update();
    });
    /**
     * Select Item
     * @param e
     */
    this.selectItem = (e)=>{
        // Add new element to tags
        if(this.tagNames.indexOf(e.target.dataset.value)==-1 &&  this.limit >= this.tagNames.length + 1)this.tagNames.push(e.target.dataset.value);
        // Show Tags
        this.showTags = true;
        this.select.dropdown.close();
        this.select.input.input.value = '';
        this.update();
        this.select.input.update({focus:true})
    }
    /**
     * When we type something in input, tags is hide
     * @param e
     */
    this.edit = (e)=>{
        this.update({showTags:false});
        this.select.input.update({focus:true});
    }
    /**
     * Blur logic, don't down placeholder if we have some tags
     * @param e
     */
    this.blur=(e)=>{
        this.select.input.input.focused = false;
        this.select.input.update({focus:false})
        this.select.input.trigger('changeFocus',this.tagNames.length!=0 || this.select.input.input.value!='');
        this.update({showTags: this.select.input.input.value==''})
    }
    /**
     * Focus logic
     * @param e
     */
    this.focusIn = (e)=>{
        this.select.input.trigger('changeFocus',true);
    }
    /**
     * Remove tags from collection
     * @param e
     */
    this.remove = (e)=>{
        this.tagNames.splice(e.item.key,1);
        this.update();
        this.blur();
    }
}





