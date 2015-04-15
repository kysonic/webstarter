define(['tags/web-input/web-input','tags/web-dropdown/web-dropdown'],webInput);
function cb(opts) {
    // Ready
    this.on('mount',()=>{
        // Define base nested tags
        this.input = this.tags['web-input'];
        this.dropdown = this.tags['web-dropdown'];
        // Set options
        this.input.setOptions(opts);
        this.dropdown.setOptions(opts);
        this.data = this.dropdown.startData;
        //this.dropdown.data = this.dropdown.data.splice(0,this.dropdown.limit);
        // Icons
        this.input.setIcons(this.root);
        // Override methods
        this.dropdown.selectItem = this.selectItem;
        this.input.blur = this.blur;
        this.input.oldFocus = this.input.focusIn;
        this.input.focusIn = (e)=>{this.input.oldFocus(e); this.openDropdown(e);};
        this.input.oldEdit = this.input.edit;
        this.input.edit = (e)=>{this.input.oldEdit(e); this.edit(e);}
        // Update
        this.update();
    });
    this.openDropdown = (e)=>{
        this.dropdown.open();
    }
    this.selectItem = (e)=>{
        this.dropdown.selected = e.target.dataset.value;
        this.input.value = e.target.dataset.value;
        this.input.input.focus();
        this.dropdown.close();
    }
    this.blur = ()=>{
        setTimeout(()=>{
            this.input.trigger('changeFocus',!this.input.input.value == '');
            this.dropdown.close();
        },200);
    }
    this.edit = (e)=>{
        this.dropdown.data = this.findInArray(e.target.value,this.data).slice(0,this.dropdown.limit);
        this.update();
    }
    this.findInArray = (value,array)=>{
        var find = [];
        var regexp = /.*/i;
        try{var regexp = new RegExp("^"+value,'i')}catch(e){};
        array.forEach((item)=>{
            if(regexp.test(item)) find.push(item);
        });
        return find;
    }
}





