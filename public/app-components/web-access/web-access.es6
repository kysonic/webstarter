define(['tags/web-usersearch/web-usersearch'],webUserSeacrh)
function cb(opts) {
    // Basics
    this.users = [];
    this.refSlide = null;
    // Ready
    this.on('mount',()=>{
        this.slide = this.tags['userSeacrh'];
        this.webSearch = this.tags['webSearch'];
        this.goBack = this.tags['goBack'];
        // Next Tick
        setTimeout(()=>{
            this.slide.setCloseTo();
        },100);
        // Override methods
        this.webSearch.selectUser = this.selectUser;
        this.goBack.onClickHandler = this.back;
    });
    /**
     * Open user search form and
     * comonent with same name
     */
    this.openUserSearch = ()=>{
        this.refSlide.close();
        this.slide.open();
    }
    /**
     * When you click on user card this function
     * will reflect
     * @param e
     */
    this.selectUser = (e)=>{
        var user = e.item.user;
        this.users.push(user);
        this.update();
        setTimeout(()=>{
            this.refSlide.open();
            this.slide.close();
            var cards = this.root.querySelectorAll('.userCard');
            var lastIdx = cards.length-1;
            var last = cards[lastIdx];
            last.style.transform = `translateX(${(4-lastIdx)*240}px)`;
        },0);
    }
    /**
     * Close slide
     */
    this.back = ()=>{
        this.refSlide.open();
        this.slide.close();
    }
    /**
     * Open change role backdrop
     * @param e
     */
    this.changeRole = (e)=>{
        var user = e.item.user;
        user.opened = true;
    }
    /**
     * Set Role to the User
     * @param e
     */
    this.setRole = (e)=>{
        var user = e.item.user;
        var button = parents(e.target,'web-ripple-button');
        user.role = button.dataset.role;
        user.opened = false;
    }
    /**
     * Additional traversing function.
     * @param element
     * @param criteria
     * @returns {*}
     */
    function parents(element, criteria) {
        if (element.className.split(' ').indexOf(criteria)>=0 || element.tagName.toLowerCase()==criteria.toLowerCase() ) return element;
        return element.parentNode && parents(element.parentNode, criteria);
    }
}





