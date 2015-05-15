define(['tags/web-input/web-input','tags/over-ground/over-ground','tags/web-calendar/web-calendar','webstarter'],webInput,overGround,webCalendar,Webstarter);
function cb(opts) {
    //Attributes
    this.mode = opts.mode || 'edit';
    this.container = opts.container || 'popup';
    this.closeTo = opts.closeto;
    this.type = opts.type || 'simple';
    // Ready
    this.on('mount',()=>{
        // Nested Tags
        // Container  = Popup
        if(this.container=='popup') this.overGround = this.tags['over-ground'];
        // Container  = Slide
        if(this.container=='slide') this.slide = this.tags['web-slide'];
        // Type = Simple
        if(this.type=='simple') this.input = this.tags['date'];
        // Type = FromTo
        if(this.type=='fromto') {this.from = this.tags['from'];this.to = this.tags['to'];}
        // Calendar
        this.calendar = this.tags['web-calendar'];
        // Set calendar in needed container
        if(this.container=='popup') this.overGround.inner.appendChild(this.calendar.root);
        if(this.container=='slide') this.slide.inner.appendChild(this.calendar.root);
        // Set options to nested tags
        var date = new Date();
        if(opts.value) {var date = new Date(opts.value);opts.value = date.getFullYear()+'-'+this.addNull(date.getMonth()+1)+'-'+this.addNull(date.getDate());}
        if(this.type=="simple") this.input.init(opts);
        // Fromto options set
        if(this.type=="fromto") {
            this.from.init(opts);
            this.to.init(opts);
            this.from.placeholder = opts.fromplace || "From";
            this.to.placeholder = opts.toplace || "To";

        }
        // Calendar
        this.calendar.year = date.getFullYear();
        this.calendar.month = this.calendar.months[date.getMonth()];
        this.calendar.day = date.getDate();
        this.calendar.fromto = this.fromto;
        this.calendar.update();
        //Set icons
        if(this.type=="simple") this.input.setIcons(this.root);
        // Override
        if(this.type=="simple") {
            this.input.inputClick = this.openDatepicker;
            this.input.iconClick = this.openDatepicker;
        }
        if(this.type=="fromto") {
            this.from.inputClick = this.openDatepicker;
            this.from.iconClick = this.openDatepicker;
            this.to.inputClick = this.openDatepicker;
            this.to.iconClick = this.openDatepicker;
        }
        this.calendar.ok = this.ok;
        this.calendar.cancel = this.cancel;
        // Get global mounted tags (Work with web-slide)
        setTimeout(()=>{this.column = Webstarter.tags.findTagByName(this.closeTo.replace('#',''));});
        // Update
        this.update();
    });
    /**
     * Open datepicker
     * @param e-event
     */
    this.openDatepicker = (e)=>{
        if(this.mode=='edit') {
            if(this.container=='popup') {
                this.input.input.blur();
                this.overGround.open();
            }
            if(this.container=='slide') {
                this.column.close();
                this.slide.open();
            }
            if(this.type=='fromto') {
                var direction = parents(e.target,'web-input');
                this.calendar.changeFromTo({target:direction})
            }
        }
    }
    /**
     * Click on calendar ok button
     * @param e
     */
    this.ok = (e)=>{
        e.preventDefault();
        //Checkout date fromto validation
        var from = new Date(this.calendar.fromYear,this.calendar.fromMonthKey,this.calendar.fromDay);
        var to = new Date(this.calendar.toYear,this.calendar.toMonthKey,this.calendar.toDay);
        if(to.getTime()<from.getTime()) {
            this.calendar.error = 'FromeToError';
            return false;
        }
        this.calendar.error = '';
        if(this.type=='simple') {
            this.input.value = this.calendar.year +'-'+this.addNull(parseInt(this.calendar.monthKey)+1)+'-'+this.addNull(this.calendar.day);
            this.input.input.focus();
            this.input.checkValidation(this.input.value);
        }
        if(this.type=='fromto') {
            // From
            this.from.value = this.calendar.fromYear +'-'+this.addNull(parseInt(this.calendar.fromMonthKey)+1)+'-'+this.addNull(this.calendar.fromDay);
            this.from.input.focus();
            this.from.checkValidation(this.from.value);
            // To
            this.to.value = this.calendar.toYear +'-'+this.addNull(parseInt(this.calendar.toMonthKey)+1)+'-'+this.addNull(this.calendar.toDay);
            this.to.input.focus();
            this.to.checkValidation(this.to.value);
        }
        if(this.container=='popup') {
            this.overGround.close();
        }
        // Work with web-slide (exclusive for webstarter)
        if(this.container=='slide') {
            this.column.open();
            this.slide.close();
        }
    }
    /**
     * Click on calendar cancel button
     * @param e
     */
    this.cancel = (e)=>{
        if(this.container=='popup') {
            this.overGround.close();
        }
        // Work with web-slide (exclusive for webstarter)
        if(this.container=='slide') {
            this.column.open();
            this.slide.close();
        }
    }
    /**
     * Additional function. Add null if number less than 10. For example 9 = 09
     * @param str
     */
    this.addNull = (str)=> parseInt(str) && parseInt(str)<10 ? '0'+str : str;

    this.reboot = ()=>{
        if(this.type=="simple") {
            var date = this.input.input.value.split('-');
            this.calendar.year = parseInt(date[0]);
            this.calendar.monthKey = parseInt(date[1]);
            this.calendar.month = this.calendar.months[parseInt(date[1])];
            this.calendar.day = parseInt(date[2]);
        }
        if(this.type=="fromto") {
            //From
            var from = this.from.input.value.split('-');
            this.calendar.fromYear = from[0];
            this.calendar.fromMonthKey = from[1];
            this.calendar.fromMonth = this.calendar.months[parseInt(from[1])];
            this.calendar.fromDay = from[2];
            // To
            var to = this.to.input.value.split('-');
            this.calendar.toYear = to[0];
            this.calendar.toMonthKey = to[1];
            this.calendar.toMonth = this.calendar.months[parseInt(to[1])];
            this.calendar.toDay = to[2];
            // Global
            this.calendar.year = this.calendar[this.calendar.fts+'Year'];
            this.calendar.monthKey = this.calendar[this.calendar.fts+'MonthKey'];
            this.calendar.month = this.calendar[this.calendar.fts+'Month'];
            this.calendar.day =this.calendar[this.calendar.fts+'Day'];
        }
        // Update
        this.calendar.update();
    }
    /**
     * Additional function. It search parent of current node with needed creteria.
     * @param element - current element
     * @param criteria - criteria tagName or className
     * @returns {*}
     */
    function parents(element, criteria) {
        if ((element.className.split && element.className.split(' ').indexOf(criteria)>=0) || (element.tagName && element.tagName.toLowerCase()==criteria.toLowerCase()) ) return element;
        return element.parentNode && parents(element.parentNode, criteria);
    }
}





