var riot = require('riot');
var xXhr = require('tags/x-xhr/x-xhr');
function cb(opts) {
    // Attributes
    this.path = opts.path || './i18n.json';
    this.preferedLang = opts.preferedlang;
    // Basics
    this.i18n = null;
    var navigatorLanguage = navigator.language || navigator.userLanguage;
    this.lang = this.preferedLang || navigatorLanguage;
    /**
     * On ready
     */
    this.on('mount',()=>{
        this.tags.xXhr.get(this.path).then((data)=>{
            this.i18n = data;
        },(error)=>{
            // XXX Here must be your own realization displaying of errors.
            console.error(error.response)
        });
    });
    /**
     * Give a translate
     * @param value - translate code
     */
    this.translate = function(value) {
        return this.i18n[this.lang][value];
    }
}





