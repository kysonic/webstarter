define(['tags/web-input/web-input',
    'tags/web-ripple-button/web-ripple-button',
    'tags/web-image/web-image',
    'tags/web-textarea/web-textarea',
    'tags/web-editor/web-editor',
    'tags/web-tags/web-tags',
    'tags/web-select/web-select',
    'tags/web-spinner-input/web-spinner-input'],WebInput,WebRipple)
function cb(opts) {
    // Attributes
    this.author = opts.author || '';
    // Basics
    this.projectName = 'Project Name';
    this.location = 'Location';
    this.country = 'Country';
    this.tg = [];
    // Ready
    this.on('mount',()=>{
        this.basicSet = this.tags['basicSet'];
        this.for = this.tags['for'];
        this.for.refSlide = this.basicSet;
        this.projectNameInput = this.tags['projectName'];
        this.projectCountrySelect = this.tags['projectCountry'];
        this.projectLocationInput = this.tags['projectLocation'];
        this.projectTags = this.tags['projectTags'];
        // Extend methods
        var oEdit = this.projectNameInput.edit;
        this.projectNameInput.edit = (e)=>{oEdit(e);this.projectNameEdit(e);};

        oEdit = this.projectCountrySelect.input.edit;
        this.projectCountrySelect.input.edit = (e)=>{oEdit(e);this.projectCountryEdit(e);};

        var oSelect = this.projectCountrySelect.selectItem;
        this.projectCountrySelect.dropdown.selectItem = (e)=>{oSelect(e);this.projectCountryEdit(e);}

        oEdit = this.projectLocationInput.edit;
        this.projectLocationInput.edit = (e)=>{oEdit(e);this.projectLocationEdit(e);};

        var oSelectItem = this.projectTags.select.dropdown.selectItem;
        this.projectTags.select.dropdown.selectItem = (e)=>{oSelectItem(e);this.projectTagsSelect(e);}

        var remove = this.projectTags.remove;
        this.projectTags.remove = (e)=>{remove(e);this.projectTagsSelect(e);}
    });

    this.projectNameEdit = (e)=>{
        this.update({projectName:this.projectNameInput.input.value})
    }
    this.projectCountryEdit = (e)=>{
        this.update({country:this.projectCountrySelect.input.input.value});
    }
    this.projectLocationEdit = (e)=>{
        this.update({location:this.projectLocationInput.input.value});
    }
    this.projectTagsSelect = (e)=>{
        this.update({tg:this.projectTags.tagNames});
    }
}





