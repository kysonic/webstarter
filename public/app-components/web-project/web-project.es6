define(['tags/web-input/web-input',
    'tags/web-ripple-button/web-ripple-button',
    'tags/web-image/web-image',
    'tags/web-textarea/web-textarea',
    'tags/web-editor/web-editor',
    'tags/web-tags/web-tags','tags/web-spinner-input/web-spinner-input'],WebInput,WebRipple)
function cb(opts) {
    console.log(opts)
    this.projectName = 'Project Name'
    this.author = opts.author || '';
    // Ready
    this.on('mount',()=>{
        this.basicSet = this.tags['basicSet'];
        this.for = this.tags['for'];
        this.for.refSlide = this.basicSet;
    });
}





