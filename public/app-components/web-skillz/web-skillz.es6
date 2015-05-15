define(['TweenMax'],TweenMax);
function cb(opts) {
    // Attributes
    this.named = opts.named || '';
    this.value = opts.value || '';
    // Basics
    try{this.value = JSON.parse(this.value)}catch (e){};
    this.showRate = false;
    this.skills = this.value || [];
    this.letterCounts = 10;
    this.rates = ['basic','advanced','high'];
    /**
     * Ready
     */
    this.on('mount',()=>{
        this.select = this.tags['web-select'];
        this.chooser = this.tags['web-chooser'];
        // Icons to web-input
        this.icon = this.root.querySelector('#icon');
        this.select.input.setIcons(this.root);
        // Override
        var oEdit = this.select.input.edit;
        this.select.input.edit = (e)=>{oEdit(e);this.edit(e)};
        var oSelectItem = this.select.dropdown.selectItem;
        this.select.dropdown.selectItem= (e)=>{oSelectItem(e);this.selectItem(e)};
        var oChoose = this.chooser.choose;
        this.chooser.choose = (e)=>{oChoose(e);this.choose(e)};
        // Reboot input
        this.select.input.input.value='';
        this.select.input.blur();
    });
    /**
     * Edit skill (input edit override)
     * @param e
     */
    this.edit = (e)=>{
        this.update({showRate:e.target.value!=''});
        if(e.which==13 && this.select.input.errors.length==0 && this.select.input.input.value!='') {
            var skill = {title:this.select.input.input.value,rate:'basic'};
            if(!this.haveSkill(skill)) {
                this.skills.push(skill);
                this.select.input.input.value = '';
                this.select.dropdown.selected = '';
                this.select.dropdown.update();
                this.select.update();
                this.select.input.input.blur();
                this.showRate = false;
                this.update();
            }
        }
    }
    /**
     * Select item
     * @param e
     */
    this.selectItem = (e)=>this.update({showRate:true});
    /**
     * Choose skill rate
     * @param e
     */
    this.choose = (e)=>{
        if(this.select.input.errors.length==0) {
            var value = parents(e.target,'web-ripple-button').dataset.value;
            var skill = {title:this.select.input.input.value,rate:value};
            if(!this.haveSkill(skill)) {
                this.skills.push(skill);
                this.select.input.input.value = '';
                this.select.dropdown.selected = '';
                this.select.dropdown.update();
                this.select.update();
                this.select.input.input.blur();
                this.showRate = false;
                this.update();
            }else {
                this.select.input.tooltip.error = false;
                this.select.input.tooltip.msg = 'AlreadyHaveIt';
                this.select.input.tooltip.trigger('onSetMsg');
            }
        }else {
            this.select.input.showErrors();
        }
    }
    /**
     * Checkout current skill to belong to skills array.
     * @param skill
     * @returns {boolean}
     */
    this.haveSkill = (skill)=>{
        var haveSkill = false;
        this.skills.forEach((sk)=>{if(skill.title.toLowerCase() == sk.title.toLowerCase()) haveSkill=true;});
        return haveSkill;
    }
    /*this.showFullSkill = (e)=>{
        e.item.skill.menu = false;
        if(e.item.skill.title.length>this.letterCounts) {
            var skill = parents(e.target,'skill');
            skill.opened = !skill.opened;
            var delta = e.item.skill.title.length>6 ? e.item.skill.title.length - 6 : 0;
            if(skill.opened) {
                skill.clone = document.importNode(skill, true);
                skill.clone.style.position = 'absolute';
                skill.currentBound = skill.getBoundingClientRect();
                skill.clone.classList.remove('nth');
                skill.clone.classList.add('overview');
                skill.clone.style.left = skill.offsetLeft-6+'px';
                skill.clone.style.top = skill.offsetTop+'px';
                skill.clone.querySelector('.remove').style.display = 'none';
                skill.clone.querySelector('.change').style.display = 'none';
                skill.clone.querySelector('.rate').style.display = 'none';
                skill.clone.querySelector('.button').style.display = 'block';
                skill.clone.style.zIndex = 10;
                this.skillsWrapper.appendChild(skill.clone);
                TweenMax.to(skill.clone,0.2,{width:'+='+10*delta});
                skill.clone.querySelector('.title').innerHTML = e.item.skill.title;
                skill.clone.addEventListener('click',(e)=>{
                    skill.opened = false;
                    TweenMax.to(skill.clone,0.2,{width:skill.currentBound.width,onComplete:(e)=> this.skillsWrapper.removeChild(skill.clone)});
                });
            }
        }
        *//*if(skill.opened) {
            TweenMax.to(skill,0.2,{width:'+='+10*delta});
            skill.style.position = 'absolute';
            skill.querySelector('.title').innerHTML = e.item.skill.title;
        }else {
            skill.style.position = 'inherit';
            TweenMax.to(skill,0.2,{width:skill.startWidth});
            skill.querySelector('.title').innerHTML = e.item.skill.title.length>6 ?  e.item.skill.title.substr(0,6)+'...' :  e.item.skill.title;
        }*//*
    }*/
    /**
     * Additional substring funciton.
     * @param str
     */
    this.substr = (str) => str.length>this.letterCounts ? str.substr(0,this.letterCounts)+'...' : str;

   /* this.openMenu = (e)=>{
        e.item.skill.menu = true;
      *//*  var currentRateKey = this.rates.indexOf(e.item.skill.rate);
        var nextRateKey = currentRateKey + 1 < this.rates.length ? currentRateKey + 1 : 0;
        e.item.skill.nextRate = this.rates[nextRateKey];*//*
    }*/
    this.remove = (e)=>{
        this.skills.splice(e.item.key,1);
        e.item.skill.menu = false;
        this.update();
    }
    /*this.changeRate = (e)=>{
        var currentRateKey = this.rates.indexOf(e.item.skill.rate);
        var nextRateKey = currentRateKey + 1 < this.rates.length ? currentRateKey + 1 : 0;
        e.item.skill.rate = this.rates[nextRateKey];
        e.item.skill.menu = false;
        this.update();
    }*/
    /**
     * Additional function. Set first char of word in uppercase.
     * @param str
     */
    this.up = (str) => str[0].toUpperCase() + str.substring(1,str.length);
    /**
     * Additional function. It search parent of current node with needed creteria.
     * @param element - current element
     * @param criteria - criteria tagName or className
     * @returns {*}
     */
    function parents(element, criteria) {
        if (element.className.split(' ').indexOf(criteria)>=0 || element.tagName.toLowerCase()==criteria.toLowerCase() ) return element;
        return element.parentNode && parents(element.parentNode, criteria);
    }
}





