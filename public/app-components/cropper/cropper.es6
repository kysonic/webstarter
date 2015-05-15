define(['cropper','tags/web-ripple-button/web-ripple-button'],cropper,ripple);
function cb(opts) {
    // Attributes
    this.width =  opts.width || 640;
    this.height =  opts.height || 640;
    this.aspectRatio = eval(opts.aspectratio) || NaN;
    this.cropAction = opts.cropaction || '';
    this.named = opts.named || '';
    // Ready
    this.pth = '';
    this.on('mount',()=>{
        this.xhr = this.tags['web-xhr'];
        // set Width and Height
        this.wrapper.style.width = this.width + 'px';
        this.wrapper.style.height = this.height + 'px';
    });
    this.inProcess = false;
    // Set cropper when image was loaded.
    this.on('loadImage',(dontOpen)=>{
        this.update();
        // Destroy old crop canvas
        if(this.cropperInstance) {$(this.cropperInstance).cropper('destroy');}
        //Create new cropper
        this.cropperInstance = $(this.image).cropper({
            aspectRatio: this.aspectRatio,
            minContainerWidth: this.width,
            minContainerHeight: this.height,
            minCropBoxHeight: 100,
            minCropBoxWidth: 100,
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
        if(this.cropAction) {
            this.xhr.post(this.cropAction,{crop:this.cropData,pth:this.pth}).then((data)=>{
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
                this.inProcess = false;
                this.update();
            });
        }else {
            console.error('You don\'t have crop action');
        }

    }
}





