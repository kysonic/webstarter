define(['reflux','flux/todo/actions','jquery'],function(Reflux,actions,$){
    var localStorageKey = 'todo';
    return Reflux.createStore({
        listenables: [actions],
        init: function(){
            this.list = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },
        onInitTodo: function(list){
            this.list = this.list.length ? this.list : list;
            this.updateList();
        },
        onItemAdd: function(item) {
            this.list.push({
                done: false,
                title: item.title
            });
            this.updateList();
        },
        onItemToggle: function(item) {
            this.list[$.inArray( item, this.list )] = item;
            this.updateList();
        },
        onItemRemove: function(item) {
            this.list.splice(this.list.indexOf(item),1);
            this.updateList();
        },
        updateList: function(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.list));
            this.trigger(this.list);
        }
    });
});
