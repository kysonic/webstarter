define(['tags/web-input/web-input','tags/web-xhr/web-xhr'],webUserSearch,webXhr);
function cb(opts) {
    // Attributes
    this.resultCount = parseInt(opts.result) || false;
    // Basics
    this.users = [];
    this.requestInterval = 300;
    this.currentKeysCount = 0;
    this.minKeysCountToRequest = 2;
    this.inAction = false;
    // Ready
    this.on('mount',()=>{
        //Nested tags
        this.webInput = this.tags['web-input'];
        this.xhr = this.tags['web-xhr'];
        // Override
        var oEdit = this.webInput.edit;
        this.webInput.edit = (e)=>{oEdit(e);this.edit(e);}
    });
    /**
     * When key up on web input
     * @param e
     */
    this.edit = (e)=>{
        var value = e.target.value;
        this.currentKeysCount++;
        if(!this.inAction &&  this.currentKeysCount>=this.minKeysCountToRequest){
            this.inAction = true;
            this.currentKeysCount = 0;
            setTimeout(()=>{
                this.inAction = false;
                this.xhr.post('/user/search',{query:value}).then((response)=>{
                    this.update({users: response.users.slice(0,this.resultCount )});
                },(err)=>{
                    console.log(response)
                });
            },this.requestInterval);
        }
        if(value.length==0) {
            this.update({users: []});
        }
    }
    /**
     * Select user function is for a override
     * @param e
     */
    this.selectUser = (e)=>{}
}





