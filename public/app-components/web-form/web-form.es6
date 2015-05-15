define(['webstarter','tags/inner-html/inner-html','uploader','jquery'],Webstarter)
function cb(opts) {
    // Attributes
    this.action = opts.action;
    this.method = opts.method;
    this.fields = opts.fields || [];
    try{this.fields = eval(this.fields)}catch(e){};
    // Ready
    this.on('mount',()=>{
        setTimeout(()=>{
            // Get all nested fields
            this.fields.forEach((element)=>{this[element] = Webstarter.tags.findTagByName(element);});
            this.snackbar =  Webstarter.tags.findTagByName('x-snackbar');
            // Bind events
            this.submit = this.root.querySelector('#submit');
            if(this.submit) this.submit.addEventListener('click',this.onSubmit);
        },0);
    });
    this.onSubmit = (e)=>{
        e.preventDefault();
        if(!this.check()){
            $(this.form).ajaxSubmit({
                error:()=>{
                    this.snackbar.msg = 'FormError';
                    this.snackbar.isError = true;
                    this.snackbar.open();
                },
                success: ()=>{
                    this.snackbar.msg = 'FormSuccess';
                    this.snackbar.isError = false;
                    this.snackbar.open();
                }
            });
        }
        else {
            this.snackbar.msg = 'FormError';
            this.snackbar.isError = true;
            this.snackbar.open();
        }
    }
    this.check = ()=>{
        var haveError = false;
        this.fields.forEach((field)=>{
            if(this[field].errors && !haveError) {haveError = this[field].errors.length!=0;}
            if(this[field].showErrors) this[field].showErrors();
            if(this[field].input && this[field].input.showErrors) this[field].input.showErrors();
        });
        return haveError;
    }
}





