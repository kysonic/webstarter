define(['cropper'],cropper);
function cb(opts) {
    // Ready
    this.on('mount',()=>{
        this.User = this.tags['user'];
    });
    this.inProcess = false;
    // Set cropper when image was loaded.
    this.on('loadImage',()=>{
        this.update();
        // Destroy old crop canvas
        if(this.cropperInstance) {$(this.cropperInstance).cropper('destroy');}
        //Create new cropper
        this.cropperInstance = $(this.image).cropper({
            aspectRatio: 1 / 1,
            minContainerWidth: 640,
            minContainerHeight: 640,
            minCropBoxWidth: 100,
            minCropBoxHeight: 100,
            responsive: true,
            crop: (data)=>{this.cropData = data;}
        });
        // When image is load in cropper
        $(this.image).on('built.cropper',()=>{
            $(this.image).cropper('zoom',-0.2);
        });
    })
    // Crop image on server
    this.cropOnServer = (e)=>{
        this.inProcess = true;
        this.update();
        this.User.xRest.custom('POST', {crop:this.cropData,pth:this.pth},'crop-avatar').then((data)=>{
            this.parent.src = data.src;
            this.parent.showBackdrop = false;
            this.parent.file.value = '';
            this.parent.errors= [];
            this.parent.update();
            this.parent.overGround.opened = false;
            this.parent.overGround.trigger('openedChanged');
            this.inProcess = false;
            this.update();
        },(err)=>{
            console.log(err);
            this.inProcess = false;
            this.update();
        });
    }
}





