define(['jquery','flux/todo/stores','flux/todo/actions','tags/x-local-storage/x-local-storage'],$,TodoStore,TodoActions);
function cb(opts) {
    //TodoActions.InitTodo(JSON.parse(opts.items));
    this.on('mount',function(){
        this.tags['x-local-storage'].localStorage = this.tags['x-local-storage'].localStorage || JSON.parse(opts.items);
        this.items = this.tags['x-local-storage'].localStorage
        this.update();
    }.bind(this));
    this.edit = (e)=>{
        this.text = e.target.value
    }
    this.add = (e)=>{
        e.preventDefault();
        if (this.text) {
            /*TodoActions.ItemAdd({
                title: this.text.trim()
            });*/
            this.items.push({title:this.text,done:false});
            this.tags['x-local-storage'].trigger('localStorageChanged');
            this.text = this.input.value = ''
        }
        return false;
    }
    this.filter = (item) => {
        return !item.hidden
    }
    this.toggle = (e) => {
        e.item.done = ! e.item.done;
        this.tags['x-local-storage'].trigger('localStorageChanged');
        //TodoActions.ItemToggle(e.item);
        return true
    }
    this.remove = (e)=>{
        this.items.splice($.inArray( e.item, this.list ),1);
        this.tags['x-local-storage'].trigger('localStorageChanged');
    }
    /*TodoStore.listen(function(data){
        this.update({items:data});
    }.bind(this));*/
}





