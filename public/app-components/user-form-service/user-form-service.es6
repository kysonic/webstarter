define(['webstarter'],Webstarter)
function cb(opts) {
    // Basics
    this.mode = 'edit';
    this.formElements = ['firstName','lastName','birthDate','website','motto','location','country','gender','about','submit','edit','freelancerButton','userbutton'];
    // Ready
    this.on('mount',()=>{
        setTimeout(()=>{
            // Get form elements
            this.formElements.forEach((element)=>{this[element] = Webstarter.tags.findTagByName(element);});
            // Global tags
            this.userScreen = Webstarter.tags.findTagByName('userScreen');
            this.freeScreen = Webstarter.tags.findTagByName('freelancerScreen');
            // Related tags
            this.menuHeader =  Webstarter.tags.findTagByName('menu-header');
            this.currentFirstName = this.menuHeader.title.split(' ')[0];
            this.currentLastName = this.menuHeader.title.split(' ')[1];
            // First Name
            this.firstName.oEdit = this.firstName.edit;
            this.firstName.edit = (e)=>{this.firstName.oEdit(e);this.editFirstName(e)};
            // Last Name
            this.lastName.oEdit = this.lastName.edit;
            this.lastName.edit = (e)=>{this.lastName.oEdit(e);this.editLastName(e)};
            console.log(this.freelancer)
            this.freelancerButton.onClickHandler = this.freelancerScreen;
            this.userbutton.onClickHandler = this.userScreenView;
            // Edit
           // this.edit.onClickHandler = this.onEditClick;
           // this.close.onClickHandler = this.onCloseClick;
            this.trigger('modeChanged');
        },0);
    });
    /**
     * Edit First Name
     * @param e - on iput event
     */
    this.editFirstName = (e)=>{
        this.currentFirstName = e.target.value;
        this.menuHeader.title = e.target.value +' '+ this.currentLastName;
        this.menuHeader.update();
    }
    /**
     * Edit Last Name
     * @param e - on iput event
     */
    this.editLastName = (e)=>{
        this.currentLastName = e.target.value;
        this.menuHeader.title =  this.currentFirstName+' '+ e.target.value;
        this.menuHeader.update();
    }
    this.onEditClick = (e)=>{
        this.trigger('modeChanged','edit');
    }
    this.onCloseClick = (e)=>{
        this.trigger('modeChanged','view');
    }
    this.freelancerScreen = (e)=>{
        console.log(e)
        e.preventDefault();
        this.userScreen.close();
        this.freeScreen.open();
    }
    this.userScreenView = (e)=>{
        e.preventDefault();
        this.userScreen.open();
        this.freeScreen.close();
    }
    this.on('modeChanged',(mode)=>{
       if(mode) this.mode = mode;
       this.submit.root.style.display = this.mode=='edit' ? 'block' : 'none';
      // this.close.root.style.display = this.mode=='edit' ? 'block' : 'none';
       this.edit.root.style.display = this.mode=='view' ? 'block' : 'none';
       this.formElements.forEach((element)=>{
           this[element].mode = this.mode;
           this[element].update();
           // Update nested web input
           if(this[element].tags['web-input']) {
               this[element].input.mode = this.mode;
               this[element].input.update();
           }
       });
    });
}





