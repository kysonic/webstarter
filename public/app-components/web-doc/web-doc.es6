define(['tags/web-ripple-button/web-ripple-button','uploader','tags/x-tooltip/x-tooltip'],webRipple);
function cb(opts) {
    // Attributes
    this.action = opts.action || '/';
    this.filePath = '';
    // Ready
    this.on('mount',()=>{
        this.button = this.tags['button'];
        this.xTooltip = this.tags['x-tooltip'];
        //Overrides
        this.button.changeFile = this.changeFile;
    });

    this.changeFile = (e)=>{
        $(this.form).ajaxSubmit({
            error: (error)=>{

            },
            success: (data)=>{
                if(data.errors) {
                    this.errors = data.errors;
                    this.xTooltip.msg = data.errors.join('\n');
                    this.xTooltip.error = true;
                    this.xTooltip.trigger('onSetMsg');
                    this.update();
                    return false;
                }
                this.update({filePath:data.filePath});
                this.button.update({title:'Change Document'});
            },
            timeout: 5000
        });
        //this.form.submit();
    }
    this.downloadFile = (e)=>{
        window.open(this.filePath);
    }
    this.basename = (value)=>{
        if(value.match(/(\/|\\)/)){
            var delimiter = value.match(/(\/|\\)/)[0];
            return value.split(delimiter)[value.split(delimiter).length-1];
        }
        return value;
    }
}





