define(['webstarter'],Webstarter);
function cb(opts) {
    //Attributes

    //Basics
    this.named = opts.named || '';
    this.value = opts.value || '';
    try{this.value = JSON.parse(this.value)}catch (e){};
    this.employments = this.value || [];
    this.letterCounts = 20;
    this.isEdit = false;
    this.fields = ['companyName','companyLocation','position','from','to'];
    this.currentemployment = null;
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
        this.companyName = this.tags['companyName'];
        this.companyLocation = this.tags['companyLocation'];
        this.position = this.tags['position'];
        //FromTo
        this.from = this.datepicker.from;
        this.to = this.datepicker.to;
        // Overrides
        this.add.onClickHandler = this.addEmployment;
        this.push.onClickHandler = this.pushEmployment;
        this.back.onClickHandler = this.goBack;

        // Global tags
        setTimeout(()=>{
            this.fsLeft = Webstarter.tags.findTagByName('fsRight');
            this.datepicker.column = this.slide;
        });
        this.update();
    });
    /**
     * Add employment. Push on add employment button.
     * @param e
     */
    this.addEmployment = (e)=>{
        this.update({isEdit:false});
        this.push.title = 'Add Eployment';
        this.push.update({title:this.push.title});
        this.clearFields();
        this.slide.open();
        this.fsLeft.close();
    }
    /**
     * Push employment in employments array.
     * @param e
     * @returns {boolean}
     */
    this.pushEmployment = (e)=>{
        if(this.check()) return false;
        var employment = {
            companyName: this.companyName.input.value,
            companyLocation: this.companyLocation.input.value,
            dateFrom: this.datepicker.from.input.value,
            dateTo: this.datepicker.to.input.value,
            position: this.position.input.value
        };
        if(!this.isEdit) {
            this.employments.push(employment);
        }else {
            for(var key in employment) {this.currentemployment[key] = employment[key];}
        }
        // Clear fields
        this.clearFields();
        // Date blur only
        this.datepicker.to.blur();
        this.datepicker.from.blur();
        // Update
        this.update({employments:this.employments});
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
     * Format date when we displays current employment item.
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
    this.editEmployment = (e)=>{
        this.update({isEdit:true});
        this.push.title = 'Edit Employment';
        this.push.update();
        this.currentemployment = e.item.employment;
        // Set data
        this.companyName.input.value = e.item.employment.companyName;
        this.companyName.update({isValid:true});
        this.companyName.blur();
        this.companyLocation.input.value = e.item.employment.companyLocation;
        this.companyLocation.blur();
        this.position.input.value=e.item.employment.position;
        this.position.blur();
        this.datepicker.from.input.value = e.item.employment.dateFrom;
        this.datepicker.from.blur();
        this.datepicker.to.input.value = e.item.employment.dateTo;
        this.datepicker.to.blur();
        // Reboot Datepicker data
        this.datepicker.reboot();
        // Open slide
        this.slide.open();
        this.fsLeft.close();
    }

    this.clearFields = ()=>{
        this.companyName.input.value = '';
        this.companyName.blur();
        this.companyLocation.input.value = '';
        this.companyLocation.blur();
        this.position.input.value='';
        this.position.blur();
        this.datepicker.from.input.value = '';
        this.datepicker.from.blur();
        this.datepicker.to.input.value = '';
        this.datepicker.to.blur();
    }
    var trim = (str)=>str.replace(/^s+|s+$/,'');
}





