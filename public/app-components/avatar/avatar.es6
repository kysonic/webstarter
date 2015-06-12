define(['uploader','tags/cropper/cropper','tags/x-tooltip/x-tooltip'],uploader,cropper,xTooltip);
function cb(opts) {
    this.errors = [];
    this.currentFile = '';
    this.full = opts.full!='undefined' ? opts.full : null;
    this.src = opts.cropped!='undefined' ? opts.cropped : null;
    this.isUpdate = opts.isupdate || false;
    this.inProcess = false;
    this.showBackdrop = false;
    this.isAuth = opts.isauth!='undefined' || false;
    // Ready'
    this.on('mount',()=>{

        this.overGround = this.tags['over-ground'];
        console.log(this.tags)
        this.cropper = this.tags['cropper'];
        console.log(    this.cropper)
        this.xTooltip = this.tags['x-tooltip'];
        this.xhr = this.tags['web-xhr'];
        // Have a image for cropping?
        if(this.full) {
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
                if(/MSIE (8|9)/.test(navigator.userAgent)) window.location.href = '/user';
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
            },
            timeout: 5000
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
        if(value.match(/(\/|\\)/)){
            var delimiter = value.match(/(\/|\\)/)[0];
            return value.split(delimiter)[value.split(delimiter).length-1];
        }
        return value;
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
        if(!(this.file.value || this.inProcess || this.overGround.opened)) {
            this.showBackdrop = false;
        }
    }
}





