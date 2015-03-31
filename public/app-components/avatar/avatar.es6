define(['uploader','tags/cropper/cropper'],uploader,cropper);
function cb(opts) {
    // Ready
    this.on('mount',()=>{
        this.overGround = this.tags['over-ground'];
        this.cropper = this.tags['cropper'];
    });
    this.uploadFile = (e)=>{
        $(e.target).ajaxSubmit({
            error: (xhr)=>{
                console.log(xhr)
            },
            success: (data)=>{
                console.log(data.file)
                this.cropper.pth = data.file.path;
                this.cropper.trigger('loadImage');
            }
        });
    }
    this.openCropDialog = (e)=>{
        this.overGround.opened = true;
        this.overGround.trigger('openedChanged');
    }
}





