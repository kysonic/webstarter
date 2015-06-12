/**
 * Webstarter 2.0 main javascript file. Implemented by kysonic!
 * Use ES6 import module style to best performance and compatibility in the Future.
 */
import riot from "riot";
import xHash from "tags/x-hash/x-hash"
class  Webstarter {
    constructor(){
        // Global mounted tags.
        this.tags = [];
    }

    /**
     * Checkout document, it is loaded already?!
     * @returns {Promise}
     */
    domLoaded(){
        return new Promise((resolve,reject)=>{
            resolve();
            //document.addEventListener('DOMContentLoaded',()=>{console.log(123)})
        });
    }
    startUp(){
        this.domLoaded().then(()=>{
            this.tags = riot.mount('*');
            console.log(        this.tags)
        });
    }
}

var WS = new Webstarter();
WS.startUp();



export default {};
