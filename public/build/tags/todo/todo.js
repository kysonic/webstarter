loadCss("./build/tags/todo/todo.css");
define(['riot'],function(riot){
   return riot.tag('todo', '<h4>{ opts.title }</h4><ul><li each="{ items.filter(filter) }"><label class="{ completed: done }"><input type="checkbox" __checked="{ done }" onclick="{ parent.toggle }"/> { title }</label></li></ul><form onsubmit="{ add }"><input name="input" onkeyup="{ edit }"/><button __disabled="{ !text }" class="todo">Add</button></form>', function cb(opts) {
    var _this = this;
    this.items = opts.items;

    this.edit = function (e) {
        _this.text = e.target.value;
    };
    this.add = function (e) {
        e.preventDefault();
        if (_this.text) {
            _this.items.push({ title: _this.text });
            _this.text = _this.input.value = "";
        }
    };
    this.filter = function (item) {
        return !item.hidden;
    };
    this.toggle = function (e) {
        var item = e.item;
        item.done = !item.done;
        return true;
    };
});
});