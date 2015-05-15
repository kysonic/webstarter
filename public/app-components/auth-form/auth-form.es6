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
                this.parent.content.update({isAuth:true});
                this.parent.menuContent.update({isAuth:true});
                this.parent.menuHeader.update({isAuth:true});
                this.parent.menuHeader.getUserData();
                this.parent.toggleOverGround();
                Webstarter.tags.findTagByName('header').update();
                Webstarter.tags.findTagByName('avatar').getUserData();
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





