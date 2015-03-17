define(['tags/inner-html/inner-html'],innerHTML);
function cb(opts) {
    // Ready
    this.isAuth = opts.isauth=='true';
    // isAuth Changed event listener
    this.on('isAuthChanged',()=>{
        this.update({isAuth: this.isAuth});
    });
}





