define(['webstarter'],Webstarter);
function cb(opts) {
    /**
     * On Form submit
     * @param e
     */
    this.checker = false;
    this.sign = (e)=>{
        e.preventDefault();
        this.parent.User.xRest.custom('POST',{email:this.email.value,password:this.password.value},this.signup.checked ? 'register' :'auth').then((data)=>{
            if(data.success) {
                this.parent.content.isAuth = true;
                this.parent.content.trigger('isAuthChanged');
                this.parent.toggleOverGround();
                Webstarter.tags.findTagByName('header').update();
            }else {
                throw Error(data.message);
            }
        },(err)=>console.error(err));
    },
    this.check = (e)=>{
        this.checker = this.signup.checked =  !this.checker;
        this.update({checker:this.checker});
    }
}





