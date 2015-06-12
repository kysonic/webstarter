define(['webstarter','tags/user/user'],Webstarter)
function cb(opts) {
    this.title = opts.title || '';
    this.isAuth = opts.isauth!='undefined' || false;
    this.letterCount = 20;
    this.on('mount',()=>{
        // Get Global Tags
        setTimeout(()=>{this.snackbar = Webstarter.tags['x-snackbar'];});
    });
    // XXX: There will be additional menu-header functions.
    this.substr = (value)=> value.length >  this.letterCount ? value.substring(0, this.letterCount)+'...' : value;
}




