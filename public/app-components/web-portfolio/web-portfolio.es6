define(['webstarter','perfectScrollbar'],Webstarter,perfectScrollbar);
function cb(opts) {
    //Attributes
    //Basics
    this.named = opts.named || '';
    this.fields = ['workName','datepicker','description','webImage','tagg'];
    // Value
    this.value = opts.value || '';
    try{this.value = JSON.parse(this.value)}catch (e){};
    // ---
    this.works = this.value ? this.value : [];
    this.isEdit = false;
    this.letterCounts = 50;
    /**
     * Ready
     */
    this.on('mount',()=>{
        this.slide = this.tags['web-slide'];
        this.tagg = this.tags['web-tags'];
        this.datepicker = this.tags['date'];
        this.webImage = this.tags['web-image'];
        this.workName = this.tags['workName'];
        this.description = this.tags['description'];
        this.addWorkButton = this.tags['addWork'];
        this.backButton = this.tags['back'];
        this.addWorkButton.onClickHandler = this.addWork;
        this.backButton.onClickHandler = this.back;
        // Get Tags outside component
        setTimeout(()=>{this.psCenter = Webstarter.tags.findTagByName('psCenter');this.updateHTML();this.datepicker.column = this.slide;});
        this.update();
    });
    this.openAddWorkSlide = (e)=>{
        this.addWorkButton.update({title:'Add Work'});
        this.isEdit = false;
        this.clearForm();
        this.slide.open();
        this.psCenter.close();
    }
    /**
     * Add new work
     * @returns {boolean}
     */
    this.addWork = ()=>{
        if(this.check()) return false;
        var date = new Date();
        var currDate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
        var work = {
            imgSrc: this.webImage.src,
            fullImgSrc: this.webImage.cropper.pth,
            name: this.workName.input.value,
            date: this.datepicker.input.input.value || currDate,
            desc: this.description.textarea.value || 'There is no description.',
            tags: this.tagg.tagNames
        };
        if(!this.isEdit) {
            this.works.push(work);
        }else {
            for(var key in work) {this.currentWork[key] = work[key];}
        }
        this.slide.close();
        this.psCenter.open();
        this.update();
        this.updateHTML();
    }
    /**
     * Edit work
     * @param e
     */
    this.editWork = (e)=>{
        // Update Button Title
        this.addWorkButton.update({title:'Edit Work'});
        // Set params
        this.isEdit = true;
        this.currentWork = e.item.work;
        // Set data
        this.workName.input.value = e.item.work.name;
        this.workName.blur();
        this.workName.checkValidation(e.item.work.name);
        this.datepicker.input.value = e.item.work.date;
        this.datepicker.input.blur();
        this.description.textarea.value =  e.item.work.desc;
        this.description.blur();
        this.datepicker.input.blur();
        this.datepicker.input.input.focus();
        this.datepicker.input.input.blur();
        this.tagg.update({tagNames:e.item.work.tags || []});
        // Reboot all of components
        if(this.tagg.tagNames.length==0) {
            this.tagg.select.input.input.value='';
            this.tagg.blur();
            this.tagg.update();
        }
        // Reboot Datepicker data
        this.datepicker.reboot();
        // Web image
        this.webImage.src = e.item.work.imgSrc;
        this.webImage.update();
        this.webImage.cropper.pth = e.item.work.fullImgSrc;
        this.webImage.cropper.trigger('loadImage');
        // Open slide
        this.slide.open();
        this.psCenter.close();
    }
    /**
     * Go to the common slide.
     */
    this.back = ()=>{
        this.slide.close();
        this.psCenter.open();
    }
    /**
     * Update images and scrollbars
     */
    this.updateHTML = ()=>{
        // Images
        [].forEach.call(this['works-wrapper'].querySelectorAll('.work-image img'),(img)=>{
            var width = Math.round(img.getBoundingClientRect().width/2) - Math.round(img.parentNode.getBoundingClientRect().width/2);
            img.style.marginLeft = -width + 'px';
        });
        // Scrollers
        this.psCenter.trigger('updateScroll');
    }
    /**
     * Checkout on errors
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
     * Clear form fields. Clear inputs, textareas, images.
     * Blur all of them, and set valid on true.
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
     * Format date when we displays current education item.
     * @param f - from date
     * @returns {string} - result of formatting
     */
    this.dateFormat = (f)=>{
        var from =f.split('-');
        return this.datepicker.calendar.months[parseInt(from[1])].substr(0,3).toUpperCase()+' '+from[2]+' '+from[0];
    }
    /**
     * Additionals substring.
     * @param str
     */
    this.sub = (str)=>str.length>this.letterCounts ? str.substr(0,this.letterCounts)+'...' : str;
    var trim = (str)=>str.replace(/^s+|s+$/,'');
}
