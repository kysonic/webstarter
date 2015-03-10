function cb(opts) {
    this.items = opts.items

    this.edit = (e)=>{
        this.text = e.target.value
    }
    this.add = (e)=>{
        e.preventDefault();
        if (this.text) {
            this.items.push({ title: this.text })
            this.text = this.input.value = ''
        }
    }
    this.filter = (item) => {
        return !item.hidden
    }
    this.toggle = (e) => {
        var item = e.item
        item.done = !item.done
        return true
    }
}





