function cb(opts) {
    if(opts.title!='NaN') this.title = opts.title.length > 30 ? opts.title.substring(0,20)+'...' : opts.title;
    // XXX: There will be additional menu-header functions.
    this.substr = (value)=> {
        return  value.length > 20 ? value.substring(0,20)+'...' : value;
    }
}




