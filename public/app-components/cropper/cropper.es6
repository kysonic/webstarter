define(['cropper'],cropper);
function cb(opts) {
    // Ready
    this.on('mount',()=>{
        this.User = this.tags['user'];
    });
    // Set cropper when image was loaded.
    this.on('loadImage',()=>{
        this.update();
        $(this.image).cropper({
            aspectRatio: 1 / 1,
            minContainerWidth: 640,
            minContainerHeight: 640,
            minCropBoxWidth: 100,
            minCropBoxHeight: 100,
            responsive: true,
            crop: (data)=>{
                this.cropData = data;
            }
        });
    })
    // Crop image on server
    this.cropOnServer = (e)=>{
        this.User.xRest.custom('POST', {crop:this.cropData,pth:'./public/uploads/users/soooyc@gmail.com/avatars/ava.jpg'},'crop-avatar').then((data)=>{
            console.log(data)
        },(err)=>console.log(err));
    }
}





