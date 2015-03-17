define(['tags/inner-html/inner-html'],innerHTML);
function cb(opts) {
    this.opened = false;
    // Changed
    this.on('openedChanged',(e)=>{
        this.update({opened:this.opened});
    });
}





