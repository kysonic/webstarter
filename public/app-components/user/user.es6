define(['tags/x-rest/x-rest'],rest);
function cb(opts) {
    // Ready
    this.on('mount',()=>{
        // Get rest component
        this.xRest = this.tags['x-rest'];
    });
}





