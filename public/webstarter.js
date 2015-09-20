import riot from "riot";
class  Webstarter {
    constructor(){
        // Global mounted tags.
        this.tags = [];
        this.checkOutInterval = 10;
        this.timeOutTime = 500;
    }
    /**
     * Checkout document, it is loaded already?!
     * @returns {Promise}
     */
        domLoaded(){
        return new Promise((resolve,reject)=>{
            if(document.readyState=='complete' || document.readyState=='loaded') {
                resolve();
            }
            document.addEventListener('DOMContentLoaded',()=>resolve());
        });
    }

    /**
     * StartUp Webstarter!
     */
    startUp(){
        this.tags = riot.mount('*');
        this.rebuild();
        this.domLoaded().then(()=>{
            this.appearance();
        });
    }
    onMount() {
        return new Promise((resolve,reject)=>{
            this.i = setInterval(()=>{
                if(this.tags) {
                    clearInterval(this.i);
                    resolve();
                }
            },this.checkOutInterval);
            setTimeout(()=>{
                clearInterval(this.i);
                reject();
            },this.timeOutTime)
        });
    }
    /**
     * Method execute recompiling tags in object
     * which has keys like tag name.
     */
        rebuild(){
        let tmp = {};
        this.tags.forEach((tag)=>{
            var name = (tag.name || tag.root.tagName || tag.root.id).toLowerCase().replace(/(-(.{1}))/ig,(all,$1,$2)=>$2.toUpperCase());
            tmp[name] = tag;
        });
        this.tags = tmp;
    }
    /**
     * Appearance of custom tags.
     * XXX Maybe it will not be need soon, because of server-side riot rendering.
     */
        appearance(){
        document.body.style.opacity = 1;
        document.body.style.webkitAnimation = 'apperance cubic-bezier(1, 0.4, 0.175, 0.2) .2s 1';
        document.body.style.animation = 'apperance cubic-bezier(1, 0.4, 0.175, 0.2) .2s 1';
    }
}
export default new Webstarter();