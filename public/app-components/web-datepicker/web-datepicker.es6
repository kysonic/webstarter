define(['tags/web-input/web-input','tags/over-ground/over-ground','tags/web-calendar/web-calendar'],webInput,overGround,webCalendar);
function cb(opts) {
    // Ready
    this.on('mount',()=>{
        // Nested Tags
        this.input = this.tags['web-input'];
        this.overGround = this.tags['over-ground'];
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
}





