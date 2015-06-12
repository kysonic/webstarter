define(['tags/web-image/web-image','tags/web-datepicker/web-datepicker'],webImage)
function cb(opts) {
    // Basic
    this.refSlide = null;
    this.mockups = [];
    this.fields = ['webImage','aboutMockup'];
    this.isEdit = false;
    // Ready
    this.on('mount',()=>{
        // Nested tags
        this.mockUpForm = this.tags['mockUpForm'];
        this.webImage = this.tags['web-image'];
        this.add = this.tags['add'];
        this.back = this.tags['back'];
        this.aboutMockup = this.tags['aboutMockup'];
        this.overGround = this.tags['overGround'];
        // Overrides
        this.add.onClickHandler = this.addMockup;
        this.back.onClickHandler = this.closeMockupForm;
    });
    /**
     * Open Mockup Form
     */
    this.openMockUpForm = (e)=>{
        if(!e.item) {
            this.isEdit = false;
            this.clearForm();
            this.add.update({title:'Add Mockup'});
        }
        else {
            this.isEdit = true;
            this.setFormValue(e.item.mockup);
            this.add.update({title:'Edit Mockup'});
        }
        this.refSlide.close();
        this.mockUpForm.open();
    }
    /**
     * Add \ edit mockup
     */
    this.addMockup = ()=>{
        if(this.check()) return false;
        var mockup = {
            imgSrc: this.webImage.src,
            fullImgSrc: this.webImage.cropper.pth,
            name: this.webImage.basename(this.webImage.cropper.pth),
            desc: this.aboutMockup.input.value || 'There is no description.'
        };
        // Edit\Add Choosing
        if(!this.isEdit) {this.mockups.push(mockup);
        }else {for(var key in mockup) {this.currentMockup[key] = mockup[key];}}

        this.update({mockups:this.mockups});
        this.mockUpForm.close();
        this.refSlide.open();
    }
    /**
     * Close mockup form
     */
    this.closeMockupForm = ()=>{
        this.mockUpForm.close();
        this.refSlide.open();
    }
    /**
     *  Clear form
     */
    this.clearForm = ()=>{
        this.fields.forEach((field)=>{
            if(this[field].input) this[field].input.value='';
            if(this[field].input && this[field].input.input) this[field].input.input.value='';
            if(this[field].input && this[field].input.blur) this[field].input.blur();
            if(this[field].input && this[field].input.isValid!=undefined) this[field].input.update({isValid:true});
            if(this[field].textarea) this[field].textarea.value='';
            if(this[field].blur) this[field].blur();
            if(this[field].isValid!=undefined) this[field].update({isValid:true});
            if(this[field].cropper) this[field].cropper.update({pth:''});
            if(this[field].src) this[field].update({src:''});
            if(this[field].tagNames) {this[field].update({tagNames:[]});this[field].select.input.input.value='';this[field].blur();}
        });
    }
    /**
     * Set Form Values for Edit case
     * @param mockup
     */
    this.setFormValue = (mockup)=>{
        this.currentMockup = mockup;
        // Desc
        this.aboutMockup.input.value = mockup.desc;
        this.aboutMockup.blur();
        this.aboutMockup.checkValidation(mockup.desc);
        // Image
        this.webImage.update({src:mockup.imgSrc});
        this.webImage.cropper.pth = mockup.fullImgSrc;
        this.webImage.cropper.trigger('loadImage');
    }
    /**
     * Checkout form errors
     * @returns {boolean}
     */
    this.check = ()=>{
        var haveError = false;
        this.fields.forEach((field)=>{
            if(this[field].errors && !haveError) {haveError = this[field].errors.length!=0;}
            if(this[field].input && this[field].input.errors && !haveError) {haveError = this[field].input.errors.length!=0;}
            if(this[field].showErrors) this[field].showErrors();
            if(this[field].input && this[field].input.showErrors) this[field].input.showErrors();
        });
        return haveError;
    }
    /**
     * Open full image to view
     * @param e
     */
    this.openFullImage = (e)=>{
        this.currentImg.src = e.item.mockup.fullImgSrc;
        this.overGround.open();
        this.overGround.trigger('updateScroll');
    }
}





