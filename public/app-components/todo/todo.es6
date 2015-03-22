define(['jquery','flux/todo/stores','flux/todo/actions','tags/x-local-storage/x-local-storage'],$,TodoStore,TodoActions);
function cb(opts) {

    //TodoActions.InitTodo(JSON.parse(opts.items));
    this.lc = this.tags['x-local-storage'];
    this.on('mount',()=>{
        this.lc.localStorage = this.lc.localStorage || JSON.parse(opts.items);
        this.items = this.lc.localStorage;
        this.update();
    });
    this.items = [];
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
            this.lc.trigger('localStorageChanged');
            this.text = this.input.value = ''
        }
        return false;
    }
    this.filter = (item) => {
        return !item.hidden
    }
    this.toggle = (e) => {
        e.item.done = ! e.item.done;
        this.lc.trigger('localStorageChanged');
        //TodoActions.ItemToggle(e.item);
        return true
    }
    this.remove = (e)=>{
        this.items.splice(this.items.indexOf(e.item),1);
        this.lc.trigger('localStorageChanged');
    }
    /*TodoStore.listen(function(data){
        this.update({items:data});
    }.bind(this));*/
}





