define(['flux/todo/stores','flux/todo/actions'],TodoStore,TodoActions);
function cb(opts) {
    TodoActions.InitTodo(JSON.parse(opts.items));
    this.edit = (e)=>{
        this.text = e.target.value
    }
    this.add = (e)=>{
        if (this.text) {
            TodoActions.ItemAdd({
                title: this.text.trim()
            });
            this.text = this.input.value = ''
        }
        return false;
    }
    this.filter = (item) => {
        return !item.hidden
    }
    this.toggle = (e) => {
        e.item.done = ! e.item.done;
        TodoActions.ItemToggle(e.item);
        return true
    }
    this.remove = (e)=>{
        TodoActions.ItemRemove(e.item);
    }
    TodoStore.listen(function(data){
        this.update({items:data});
    }.bind(this));
}





