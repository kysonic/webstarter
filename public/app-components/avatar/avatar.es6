define(['uploader','tags/cropper/cropper','tags/x-tooltip/x-tooltip'],uploader,cropper,xTooltip);
function cb(opts) {
    this.errors = [];
    this.currentFile = '';
    this.full = opts.full;
    this.src = opts.cropped!='undefined' ? opts.cropped : null;
    this.inProcess = false;
    this.showBackdrop = false;
    // Ready'
    this.on('mount',()=>{
        this.overGround = this.tags['over-ground'];
        this.cropper = this.tags['cropper'];
        this.xTooltip = this.tags['x-tooltip'];
        // Have a image for cropping?
        if(this.full!='undefined') {
            this.cropper.pth = this.full;
            this.cropper.trigger('loadImage');
            this.update();
        }
    });
    /**
     * Upload image. Used jquery Form.
     * @param e - onsubmit event.
     */
    this.uploadFile = (e)=>{
        this.inProcess = true;
        this.update();
        $(e.target).ajaxSubmit({
            error: (xhr)=>{
                console.log(xhr);
                this.inProcess = false;
                this.update();
            },
            success: (data)=>{
                // Handle errors
                if(data.errors) {
                    this.errors = data.errors;
                    this.inProcess = false;
                    this.xTooltip.msg = data.errors.join('\n');
                    this.xTooltip.error = true;
                    this.xTooltip.trigger('onSetMsg');
                    this.update();
                    return false;
                }
                this.errors = [];
                this.cropper.pth = data.file.path;
                this.cropper.trigger('loadImage');
                setTimeout(()=>{
                    this.overGround.opened = true;
                    this.overGround.trigger('openedChanged');
                },100);
                this.file.value = '';
                this.inProcess = false;
                this.update();
            }
        });
    }
    /**
     * Open Crop Popup\Dialog
     * @param e
     */
    this.openCropDialog = (e)=>{
        this.overGround.opened = true;
        this.overGround.trigger('openedChanged');
    }
    /**
     * Additional function. Without it don't work {{file.value}} (riot... did you feel normal?)
     * @param e
     */
    this.changeFile = (e)=> {}
    this.resetFile = (e)=> {
        this.errors = [];
        this.file.value = '';
    }
    /**
     * Basename. fs.basename analog
     * @param value - path
     * @returns {string} - basename
     */
    this.basename = (value)=>{
        var delimiter = value.match(/(\/|\\)/)[0];
        return value.split(delimiter)[value.split(delimiter).length-1];
    }
    /**
     * Crop string
     * @param str - String
     * @param count - The number of letter, which must be cropped.
     * @returns {string}
     */
    this.cropString = (str,count)=>{
        return str.length > count ? str.substr(0,count) + '...' : str;
    }
    this.showBack = (e) => {this.showBackdrop = true;}
    this.hideBack = (e) => {
        if(!(file.value || this.inProcess || this.overGround.opened)) {
            this.showBackdrop = false;
        }
    }
}





