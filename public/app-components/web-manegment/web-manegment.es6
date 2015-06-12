define(['tags/web-access/web-access'],webAccess);
function cb(opts) {
    //Basic
    this.location = '';
    // Ready
    this.on('mount',()=>{
        // Nested
        this.accessSlide = this.tags['accessSlide'];
        this.webAccess = this.tags['access'];
        // Bind slides together
        this.webAccess.refSlide = this.accessSlide;
    });
}





