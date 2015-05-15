define(['tags/web-input/web-input','tags/web-dropdown/web-dropdown'],webInput);
function cb(opts) {
    // Ready
    this.on('mount',()=>{
        // Define base nested tags
        this.input = this.tags['web-input'];
        this.dropdown = this.tags['web-dropdown'];
        // Set options
        this.input.init(opts);
        this.dropdown.init(opts);
        this.data = this.dropdown.startData;
        //this.dropdown.data = this.dropdown.data.splice(0,this.dropdown.limit);
        // Icons
        this.input.setIcons(this.root);
        this.root.querySelector('#icon');
        this.icon.addEventListener('click',this.openDropdown)
        // Override methods
        this.dropdown.selectItem = this.selectItem;
        //this.input.oldFocus = this.input.focusIn;
        //this.input.focusIn = (e)=>{this.input.oldFocus(e); this.openDropdown(e);};
        var oEdit = this.input.edit;
        this.input.edit = (e)=>{oEdit(e); this.edit(e);}
        this.input.inputClick = this.openDropdown;
        this.input.iconClick = this.openDropdown;
        // Set on start
        this.dropdown.data = this.findInArray(opts.value,this.data).slice(0,this.dropdown.limit);
        document.body.addEventListener('click',this.bodyClick);
        // Update
        this.update();
    });
    /**
     * Open Dropdown
     */
    this.openDropdown = (e)=>{
        this.dropdown.open();
    }
    /**
     * Close dropdown if body is clicked
     * @param e
     */
    this.bodyClick = (e)=>{
        if(!$(e.target).parents('web-dropdown')[0] && !$(e.target).parents('web-select')[0]) {
            this.dropdown.close();
        }
    }
    /**
     * Select item (override of web-dropdown)
     */
    this.selectItem = (e)=>{
        this.dropdown.selected = e.target.dataset.value;
        this.input.value = e.target.dataset.value;
        this.input.input.focus();
        this.input.checkValidation(this.input.input.value);
        this.dropdown.close();
    }
    /**
     * Blur (override of web-input)
     */
    this.blur = ()=>{
        setTimeout(()=>{
            this.input.trigger('changeFocus',!this.input.input.value == '');
            this.dropdown.close();
        },200);
    }
    /**
     *  Edit (web-input override)
     */
    this.edit = (e)=>{
        this.dropdown.data = this.findInArray(e.target.value,this.data).slice(0,this.dropdown.limit);
        this.dropdown.trigger('openedChanged',!this.input.input.value == '');
        this.update();
    }
    /**
     * Filter
     */
    this.findInArray = (value,array)=>{
        var find = [];
        array.forEach((item)=>{
            if(item.indexOf(value)!==-1) find.push(item);
        });
        return find;
    }
}





