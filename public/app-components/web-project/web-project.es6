define(['tags/web-input/web-input',
    'tags/web-ripple-button/web-ripple-button',
    'tags/web-image/web-image',
    'tags/web-textarea/web-textarea',
    'tags/web-editor/web-editor',
    'tags/web-tags/web-tags',
    'tags/web-doc/web-doc',
    'tags/web-mockups/web-mockups',
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
        this.tabs = this.tags['tabs'];
        this.basicI = this.tags['basicInformation'];
        this.advancedI = this.tags['advancedInformation'];
        this.mockups = this.tags['web-mockups'];
        this.mockups.refSlide = this.advancedI;
        this.mockups.mockUpForm.setCloseTo();
        // Extend methods async
        var oEdit = this.projectNameInput.edit;
        this.projectNameInput.edit = (e)=>{oEdit(e); this.projectNameEdit(e);};

        var oEdit = this.projectCountrySelect.input.edit;
        this.projectCountrySelect.input.edit = (e)=>{oEdit(e);this.projectCountryEdit(e);};

        var oSelect = this.projectCountrySelect.selectItem;
        this.projectCountrySelect.dropdown.selectItem = (e)=>{oSelect(e);this.projectCountryEdit(e);}

        var oEdit = this.projectLocationInput.edit;
        this.projectLocationInput.edit = (e)=>{oEdit(e);this.projectLocationEdit(e);};

        var oSelectItem = this.projectTags.select.dropdown.selectItem;
        this.projectTags.select.dropdown.selectItem = (e)=>{oSelectItem(e);this.projectTagsSelect(e);}

        var remove = this.projectTags.remove;
        this.projectTags.remove = (e)=>{remove(e);this.projectTagsSelect(e);}

        this.tabs.whenTabChanged = this.changeTab;
    });

    this.projectNameEdit = (e)=>{
        this.update({projectName:this.projectNameInput.input.value});
        this.projectNameInput.checkValidation(this.projectNameInput.input.value);
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
    this.changeTab = (dataSet)=>{
        if(dataSet.id==1) {
            this.basicI.close();
            this.advancedI.open();
        }else {
            this.basicI.open();
            this.advancedI.close();
        }
    }
}





