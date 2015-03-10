loadCss("./build/tags/header/header.css");
define(['riot'],function(riot){
   return riot.tag('header', '<div id="logo">{logoText}</div>', function cb(opts) {
    this.logoText = opts.logoText;
});
});