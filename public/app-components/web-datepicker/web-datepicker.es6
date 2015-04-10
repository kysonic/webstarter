define(['tags/web-input/web-input','tags/over-ground/over-ground','tags/web-calendar/web-calendar'],webInput,overGround,webCalendar);
function cb(opts) {
    // Ready
    this.on('mount',()=>{
        // Nested Tags
        this.input = this.tags['web-input'];
        this.overGround = this.tags['over-ground'];
        this.calendar = this.tags['web-calendar'];
        // Set options to nested tags
        this.input.setOptions(opts);
        // Icons to web-input
        this.icon = this.root.querySelector('#icon');
        //this.icon.addEventListener('click',this.openDatepicker);
        this.input.root.addEventListener('click',this.openDatepicker);
        if(this.icon && this.icon!=null) this.input.icons.appendChild(this.icon);
        // Update
        this.update();
    });
    this.openDatepicker = (e)=>{
        this.input.input.blur();
        this.overGround.open();
    }
    this.ok = (e)=>{
        this.input.value = this.calendar.year +'-'+this.addNull(parseInt(this.calendar.monthKey)+1)+'-'+this.calendar.day;
        this.input.input.focus();
        this.overGround.close();
    }
    this.addNull = (str)=> parseInt(str) && parseInt(str)<10 ? '0'+str : str;
}





