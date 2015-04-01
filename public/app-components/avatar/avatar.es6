define(['uploader','tags/cropper/cropper'],uploader,cropper);
function cb(opts) {
    this.errors = [];
    this.currentFile = '';
    this.full = opts.full;
    this.src = opts.cropped!='undefined' ? opts.cropped : null;
    // Ready'
    this.on('mount',()=>{
        this.overGround = this.tags['over-ground'];
        this.cropper = this.tags['cropper'];
        if(this.full!='undefined') {
            this.cropper.pth = this.full;
            this.cropper.trigger('loadImage');
            this.update();

        }
    });
    this.uploadFile = (e)=>{
            $(e.target).ajaxSubmit({
                error: (xhr)=>{
                    console.log(xhr)
                },
                success: (data)=>{
                    // Handle errors
                    if(data.errors) {
                        this.errors = data.errors;
                        this.update();
                        return false;
                    }
                    this.errors = [];
                    this.update();
                    this.cropper.pth = data.file.path;
                    this.cropper.trigger('loadImage');
                    setTimeout(()=>{
                        this.overGround.opened = true;
                        this.overGround.trigger('openedChanged');
                    },100);
                    this.file.value = '';
                }
            });
    }
    this.openCropDialog = (e)=>{
        this.overGround.opened = true;
        this.overGround.trigger('openedChanged');
    }
    this.changeFile = (e)=> {}
    this.resetFile = (e)=> {
        this.file.value = '';
        console.log(this.file.value)
        this.update();
    }
    this.basename = function(value){
        var delimiter = value.match(/(\/|\\)/)[0];
        return value.split(delimiter)[value.split(delimiter).length-1];
    }
}





