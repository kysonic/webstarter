define(['tags/web-ripple-button/web-ripple-button'],webRippleButton);
function cb(opts) {
    //Attributes
    this.minYear = opts.minyear || 1900;
    this.maxYear = opts.maxyear || 2500;
    // Basic vars
    this.selected = 1;
    // Months
    this.monthKey = 3;
    this.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    this.month = this.months[this.monthKey];
    // Years
    this.year = 2015;
    // Days
    this.day = 10;
    this.daysName = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    /**
     * Ready
     */
    this.on('mount',(e)=>{
        this.line.style.left = 0+'px';
        this.tabConveyor.style.left = 0 + 'px';
    });
    /**
     * Change Tab. Set lines. Select Tab content.
     * @param e
     */
    this.changeTab = (e)=>{
        var id = e.target.dataset.id;
        this.selected = id;
        this.line.style.left = this.line.getBoundingClientRect().width * (id-1) + 'px';
        this.tabConveyor.style.left = -300*(this.selected-1) + 'px';
    }
    /**
     * Additional substr function.
     * @param str - string
     * @param count - symbols count
     */
    this.sub = (str,count)=> str.substr(0,count);
    /**
     * Additional function, which add null if this needed
     * @param str
     */
    this.addNull = (str)=> parseInt(str) && parseInt(str)<10 ? '0'+str : str;
    /**
     * Additional function to be return style, beacuse riot parse ':'
     * @param style
     * @param value
     */
    this.getStyle = (style,value) => style+':'+value;
    /**
     * Set month into date
     * @param e
     */
    this.setMonth = (e)=>{
        this.month = e.target.dataset.month;
        this.monthKey = e.target.dataset.monthNumber;
        this.setDays();
        var node = childrens(e.target,'text');
        node.style.transform = 'scale(0)';
        node.style.transition = 'background .2s,color .2s';
        setTimeout(()=>{
            node.style.transform = 'scale(1)';
            node.style.transition = 'background .2s,color .2s,transform .3s';
        },0);
    }
    /**
     * Days
     */
    this.setDays = ()=>{
        this.update({days:[]})
        var monthDays = Array.from({ length: new Date(this.year,this.monthKey+1,0).getDate() }, (v, k) => k+1);
        var missDays = Array.from({length:new Date(this.year,this.monthKey,1).getDay()-1},(v,k)=>"");
        setTimeout(()=>{
            this.days = missDays.concat(monthDays);
        },100);
    }
    this.setDays();
    /**
     * Set selected day
     */
    this.setDay = (e)=>{
        this.day = e.target.dataset.day;
        var node = childrens(e.target,'text');
        node.style.transform = 'scale(0)';
        node.style.transition = 'background .2s,color .2s';
        setTimeout(()=>{
            node.style.transform = 'scale(1)';
            node.style.transition = 'background .2s,color .2s,transform .3s';
        },0);
    }
    /**
     * Set Years.
     */
    this.setYears = ()=>{
        setTimeout(()=>{
            this.yaers = Array.from({ length: 15 }, (v, k) => (this.year-15) + k +1);
            this.update({years:this.yaers});
        },100);
    }
    this.setYears();
    /**
     * Select current year.
     * @param e - moise event.
     */
    this.setYear = (e)=>{
        this.year = e.target.dataset.year;
        this.setDays();
        var node = childrens(e.target,'text');
        node.style.transform = 'scale(0)';
        node.style.transition = 'background .2s,color .2s';
        setTimeout(()=>{
            node.style.transform = 'scale(1)';
            node.style.transition = 'background .2s,color .2s,transform .3s';
        },0);
    }
    /**
     * Previous years set
     * @param e
     */
    this.prevYears = (e)=>{
        if(parseInt(this.year) - 15>this.minYear) {
            this.year = parseInt(this.year) - 15;
        }else {
            this.year = parseInt(this.minYear) + 15;
        }
        this.setYears();
    }
    /**
     * Next years set
     * @param e
     */
    this.nextYears = (e)=>{
        if(parseInt(this.year) +15<this.maxYear) {
            this.year =  parseInt(this.year) + 15;
        }
        else {
            this.year = this.maxYear;
        }
        this.setYears();
    }
    /**
     * Get Child node by tagName or className
     * @param element
     * @param criteria
     * @returns {*}
     */
    function childrens(element, criteria) {
        if ((element.className.split(' ').indexOf(criteria)>=0) || (element.tagName.toLowerCase()==criteria.toLowerCase() )) return element;
        for(var key in element.childNodes) {
            var elnt = element.childNodes[key];
            return childrens(elnt,criteria);
        }
    }
}





