define(['webstarter'],Webstarter);
function cb(opts) {
    //Attributes

    //Basics
    this.named = opts.named || '';
    this.value = opts.value || '';
    try{this.value = JSON.parse(this.value)}catch (e){};
    this.educations = this.value || [];
    this.letterCounts = 20;
    this.isEdit = false;
    this.fields = ['universityName','universityLocation','degree','from','to'];
    this.currentEducation = null;
    /**
     * Ready
     */
    this.on('mount',()=>{
        //Nested tags
        this.add = this.tags['add'];
        this.push = this.tags['push'];
        this.back = this.tags['back'];
        this.slide = this.tags['web-slide'];
        this.datepicker = this.tags['web-datepicker'];
        this.description = this.tags['description'];
        this.universityName = this.tags['universityName'];
        this.universityLocation = this.tags['universityLocation'];
        this.degree = this.tags['degree'];
        //FromTo
        this.from = this.datepicker.from;
        this.to = this.datepicker.to;
        // Overrides
        this.add.onClickHandler = this.addEducation;
        this.push.onClickHandler = this.pushEducation;
        this.back.onClickHandler = this.goBack;

        // Global tags
        setTimeout(()=>{
            this.fsLeft = Webstarter.tags.findTagByName('fsLeft');
            this.datepicker.column = this.slide;
        });
        this.update();
    });
    /**
     * Add education. Push on add education button.
     * @param e
     */
    this.addEducation = (e)=>{
        this.update({isEdit:false});
        this.push.title = 'Add Education';
        this.push.update({title:this.push.title});
        this.clearFields();
        this.slide.open();
        this.fsLeft.close();
    }
    /**
     * Push education in educations array.
     * @param e
     * @returns {boolean}
     */
    this.pushEducation = (e)=>{
        if(this.check()) return false;
        var education = {
            universityName: this.universityName.input.value,
            universityLocation: this.universityLocation.input.value,
            dateFrom: this.datepicker.from.input.value,
            dateTo: this.datepicker.to.input.value,
            degree: this.degree.input.value
        };
        if(!this.isEdit) {
            this.educations.push(education);
        }else {
            for(var key in education) {this.currentEducation[key] = education[key];}
        }
        // Clear fields
        this.clearFields();
        // Date blur only
        this.datepicker.to.blur();
        this.datepicker.from.blur();
        // Update
        this.update({educations:this.educations});
        //Close slide
        this.slide.close();
        this.fsLeft.open();
    }
    /**
     * Back button click handler.
     */
    this.goBack = ()=>{
        this.slide.close();
        this.fsLeft.open();
    }
    /**
     * Format date when we displays current education item.
     * @param f - from date
     * @param t - to date
     * @returns {string} - result of formatting
     */
    this.dateFormat = (f,t)=>{
        var from =f.split('-');
        var to =t.split('-');
        return this.datepicker.calendar.months[parseInt(from[1])].substr(0,3).toUpperCase()+' '+from[2]+' '+from[0]+
               " -  "+this.datepicker.calendar.months[parseInt(to[1])].substr(0,3).toUpperCase()+' '+to[2]+' '+to[0];
    }
    /**
     * Checkout errors in fields.
     * @returns {boolean}
     */
    this.check = ()=>{
        var haveError = false;
        this.fields.forEach((field)=>{
            if(this[field].errors && !haveError) {haveError = this[field].errors.length!=0;}
            if(this[field].showErrors) this[field].showErrors();
            if(this[field].input && this[field].input.showErrors) this[field].input.showErrors();
        });
        return haveError;
    }
    /**
     * Additionals substring.
     * @param str
     */
    this.sub = (str)=>str.length>this.letterCounts ? str.substr(0,this.letterCounts)+'...' : str;
    /**
     * Edit mode
     * @param e
     */
    this.edit = (e)=>{
        this.update({isEdit:true});
        this.push.title = 'Edit Education';
        this.push.update();
        this.currentEducation = e.item.education;
        // Set data
        this.universityName.input.value = e.item.education.universityName;
        this.universityName.update({isValid:true});
        this.universityName.blur();
        this.universityLocation.input.value = e.item.education.universityLocation;
        this.universityLocation.blur();
        this.degree.input.value=e.item.education.degree;
        this.degree.blur();
        this.datepicker.from.input.value = e.item.education.dateFrom;
        this.datepicker.from.blur();
        this.datepicker.to.input.value = e.item.education.dateTo;
        this.datepicker.to.blur();
        // Reboot Datepicker data
        this.datepicker.reboot();
        // Open slide
        this.slide.open();
        this.fsLeft.close();
    }

    this.clearFields = ()=>{
        this.universityName.input.value = '';
        this.universityName.blur();
        this.universityLocation.input.value = '';
        this.universityLocation.blur();
        this.degree.input.value='';
        this.degree.blur();
        this.datepicker.from.input.value = '';
        this.datepicker.from.blur();
        this.datepicker.to.input.value = '';
        this.datepicker.to.blur();
    }
    var trim = (str)=>str.replace(/^s+|s+$/,'');
}





