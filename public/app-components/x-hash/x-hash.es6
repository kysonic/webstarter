function cb(opts) {
    // Basics
    this.possibleRoutes = [];
    this.defaultRoute = null;
    this.observerTags =[];
    this.previousHash = location.hash;
    // When Hash changed fire tags hash change event
    this.hashChanged=(e)=>this.observerTags.forEach((tag)=>{
        this.previousHash = e ? '#'+e.oldURL.split('#')[1] :  this.previousHash;
        if(this.possibleRoutes.indexOf(location.hash)!==-1)
            tag.trigger('hashchange',location.hash)
        else location.hash = this.defaultRoute;
    });
    // Bind hash change handler
    window.addEventListener('hashchange', this.hashChanged.bind(this),true);
}





