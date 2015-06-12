define(['webstarter'],Webstarter);
function cb(opts) {
    // Basics
    this.formElements = ['x-hash'];
    this.possibleRoutes = ['#infoScreen','#manegmentScreen'];
    this.defaultRoute = '#infoScreen';
    // Ready
    this.on('mount',()=>{
        setTimeout(()=>{
            this.formElements.forEach((element)=>{this[element] = Webstarter.tags.findTagByName(element);});
            this['x-hash'].possibleRoutes = this.possibleRoutes;
            this['x-hash'].defaultRoute = this.defaultRoute;
            this['x-hash'].hashChanged();
        })
    });
}





