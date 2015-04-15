define(['tags/web-input/web-input','tags/over-ground/over-ground','tags/web-calendar/web-calendar','webstarter'],webInput,overGround,webCalendar,Webstarter);
function cb(opts) {
    //Attributes
    this.mode = opts.mode || 'view';
    this.apperance = opts.apperance || 'popup';
    // Ready
    this.on('mount',()=>{
        // Nested Tags
        this.input = this.tags['web-input'];
        this.overGround = this.tags['over-ground'];
        this.slide = this.tags['web-slide'];
        this.calendar = this.tags['web-calendar'];
        if(this.apperance=='popup') this.overGround.inner.appendChild(this.calendar.root);
        if(this.apperance=='slide') this.slide.inner.appendChild(this.calendar.root);
        // Set options to nested tags
        var date = new Date();
        if(opts.value) {
            var date = new Date(opts.value);
            opts.value = date.getFullYear()+'-'+this.addNull(date.getMonth()+1)+'-'+this.addNull(date.getDate());
        }
        this.input.setOptions(opts);
        this.calendar.year = date.getFullYear();
        this.calendar.month = this.calendar.months[date.getMonth()];
        this.calendar.day = date.getDate();
        this.calendar.update();
        // Icons to web-input
        this.icon = this.root.querySelector('#icon');
        this.icon.addEventListener('click',this.openDatepicker);
        this.input.input.addEventListener('click',this.openDatepicker);
        this.input.setIcons(this.root);
        // Ovveride
        this.calendar.ok = this.ok;
        this.calendar.cancel = this.cancel;
        // Get global mounted tags
        setTimeout(()=>{this.leftSlide = Webstarter.tags.findTagByName('leftSlide');});
        // Update
        this.update();
    });
    this.openDatepicker = (e)=>{
        if(this.mode=='edit') {
            if(this.apperance=='popup') {
                this.input.input.blur();
                this.overGround.open();
            }
            if(this.apperance=='slide') {
                this.leftSlide.close();
                this.slide.open();
            }
        }
    }
    this.ok = (e)=>{
        e.preventDefault();
        this.input.value = this.calendar.year +'-'+this.addNull(parseInt(this.calendar.monthKey)+1)+'-'+this.addNull(this.calendar.day);
        this.input.input.focus();
        this.input.checkValidation(this.input.value);
        if(this.apperance=='popup') {
            this.overGround.close();
        }
        if(this.apperance=='slide') {
            this.leftSlide.open();
            this.slide.close();
        }
    }
    this.cancel = (e)=>{
        if(this.apperance=='popup') {
            this.overGround.close();
        }
        if(this.apperance=='slide') {
            this.leftSlide.open();
            this.slide.close();
        }
    }
    this.addNull = (str)=> parseInt(str) && parseInt(str)<10 ? '0'+str : str;
}





