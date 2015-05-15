define(['quill','jquery','tags/over-ground/over-ground','tags/web-image/web-image','tags/web-editor/web-editor','tags/web-xhr/web-xhr'],Quill,jquery,overGround,webImage)
function cb(opts) {
    // Attributes
    this.placeholder = opts.placeholder || '';
    this.named = opts.named || '';
    // Basics
    this.mode = 'edit';
    // Placeholder focus
    this.focus = false;
    // Clone border focus
    this.realFocus = false;
    this.text = '';
    this.previousHeight = 0;
    this.activity = {
        size: {
            '32px':false,
            '16px':false
        },
        align: {
            left: false,
            right: false,
            center: false,
            justify: false
        },
        bold: {
            "true":false
        },
        italic: {
            "true":false
        },
        underline: {
            "true":false
        },
        bullet: {
            "true": false
        },
        image: {
            "true":false
        }
    }
    /**
     * Ready
     */
    this.on('mount',()=>{
        // Init Quill
        this.editor = new Quill(this.editorWrapper,{styles:{
            '.ql-editor': {
                'font-size': "16px"
            }
        }});
        this.editor.addModule('toolbar', { container: this.toolbar});
        // Get nested tags
        this.overGround = this.tags['dialog'];
        this.image = this.tags['web-image'];
        this.link = this.tags['link'];
        this.insert = this.tags['insert'];
        // Basic editor handlers
        this.editor.on('text-change',this.onTextChange);
        this.editor.on('selection-change',this.onSelectionChange);
        document.body.addEventListener('click',this.blur.bind(this));
        // Basic clone border position
        setTimeout(()=>{
            this.cloneBorderBlurStyle();
        });
        // Override
        var oCropOnServer = this.image.cropper.cropOnServer;
        this.image.cropper.cropOnServer = ()=>{oCropOnServer();this.cropOnServer.call(this)};
        this.insert.onClickHandler = this.addLink;
        //Styles
        this.link.tooltip.root.style.zIndex = 200;
    });
    /**
     * When text in editor has changed, change params of the component
     * @param delta
     * @param source
     */
    this.onTextChange = (delta,source)=>{
        this.update({text:this.editor.getLength()!=1 ? this.editor.getHTML() : '',realFocus:true});
        if(this.previousHeight!=this.editorWrapper.getBoundingClientRect().height) {
            this.cloneBorder.style.height = this.editorWrapper.getBoundingClientRect().height - 1 + 'px';
            this.previousHeight = this.editorWrapper.getBoundingClientRect().height;
        }
        var atts = this.getAttributes(delta);
        this.setActivity(atts);
    }
    /**
     * When selection is change,
     * @param range
     */
    this.onSelectionChange = (range)=>{
        if(range) {
            var atts = this.getAttributes(this.editor.getContents(range.start,range.end));
            this.setActivity(atts);
        }
    }
    /**
     * Set toolbar button activity
     * @param atts
     */
    this.setActivity = (atts)=>{
        for(var key in this.activity) {
            var group = this.activity[key];
            for(var k in group) {
                k = k=='true' ? true : k;
                group[k] = atts[key] ? atts[key].indexOf(k)!=-1 : false;
            }
        }
        this.update({activity:this.activity});
    }
    /**
     * Get attributes from delta
     * @param delta - Combine object with information about editor changes.
     * @returns {{}} - object of attributes
     */
    this.getAttributes = (delta)=>{
        var attributes = {};
        delta.ops.forEach((o)=>{
            if(o.attributes) {
                for(var key in o.attributes) {
                    attributes[key] = attributes[key] || [];
                    attributes[key].push(o.attributes[key]);
                }
            }
        });
        return attributes;
    }
    /**
     * On focus.
     * @param e
     */
    this.focusIn = (e)=>{
        this.realFocus = true;
        this.trigger('changeFocus',true);
        // Clone border styles
        this.cloneBorderFocusStyle();
    }
    /**
     * Set Border Focus Styles
     */
    this.cloneBorderFocusStyle = ()=>{
        this.cloneBorder.style.top = 0 + 'px';
        this.cloneBorder.style.left = -1 + 'px';
        this.cloneBorder.style.transform = "scaleX(1)";
        this.cloneBorder.style.height = this.editorWrapper.getBoundingClientRect().height - 1 + 'px';
    }
    /**
     * Set Border Blur Styles
     */
    this.cloneBorderBlurStyle= ()=>{
        this.cloneBorder.style.top = this.editorWrapper.getBoundingClientRect().height - 4 + 'px';
        this.cloneBorder.style.left = 0;
        this.cloneBorder.style.transform = "scaleX(0)";
        this.cloneBorder.style.height = 3 + 'px';
    }
    /**
     * Blur
     * @param e
     */
    this.blur = (e)=>{
        if(!$(e.target).parents('web-editor')[0]) {
            this.trigger('changeFocus',!this.text == '');
            // Clone border styles
            this.cloneBorderBlurStyle();
        }
        this.realFocus = false;
    }
    /**
     * Set arbitary format in editor
     * @param e
     */
    this.setFormat = (e)=>{
        this.editor.focus();
        this.update({focus:true,realFocus:true});
        var dataset = $(e.target).parents('.button')[0].dataset;
        //next tick
        setTimeout(()=>{
            var selection = this.editor.getSelection();
            var atts = this.getAttributes(this.editor.getContents(selection.start,selection.end));
            var value = atts[dataset.type] && atts[dataset.type]==dataset.value.toString() ? false : dataset.value.toString();
            if(selection.start!=selection.end && dataset.type!='align') this.editor.formatText(selection.start,selection.end,dataset.type,value);
            else if(dataset.type=='align') {
                var selection = this.editor.getSelection();
                this.editor.setSelection(selection.end,selection.end);
                this.editor.prepareFormat(dataset.type,value);
            }else this.editor.prepareFormat(dataset.type,value);
            // Set activity
            this.activity[dataset.type][dataset.value.toString()] = !this.activity[dataset.type][dataset.value.toString()];
            this.update({activity:this.activity});
            // Defence of stunned cursor
            this.editor.setSelection(selection.end,selection.end);
        });
    }
    /**
     * Drop cursor, it's need for defence of stunned cursor.
     */
    this.dropCursor = ()=>{
        this.editor.focus();
        // next tick
        setTimeout(()=>{
            var selection = this.editor.getSelection();
            this.editor.setSelection(selection.end,selection.end);
        })
    }
    /**
     * Change focus event
     */
    this.on('changeFocus',(newFocus)=>{
        this.focus = newFocus;
        this.update();
    });
    /**
     * Open web image popup
     */
    this.openImageDialog = ()=>{
        // Show/Hide
        this.webEditorPopup.querySelector('#image').style.display="block";
        this.webEditorPopup.querySelector('#link').style.display="none";
        this.webEditorPopup.querySelector('#insert').style.display="none";
        // Focus
        this.update({focus:true,realFocus:true});
        // Update Image
        this.image.update({src:''});
        this.image.cropper.update({pth:''});
        this.image.cropper.trigger('loadImage',true);
        this.overGround.open();
    }
    this.openLinkDialog = ()=>{
        // Show/Hide
        this.webEditorPopup.querySelector('#image').style.display="none";
        this.webEditorPopup.querySelector('#link').style.display="block";
        this.webEditorPopup.querySelector('#insert').style.display="block";
        // Update focus
        this.update({focus:true,realFocus:true});
        this.overGround.open();
    }
    /**
     * After crop
     */
    this.cropOnServer = ()=>{
        this.overGround.close();
        this.editor.focus();
        //nextTick
        setTimeout(()=>{
            var selection = this.editor.getSelection();
            if(selection) {
                // Async, we wait image
                setTimeout(()=>this.editor.insertEmbed(selection.end,'image',this.image.src),200);
            }
        })
    }
    /**
     * Add link
     */
    this.addLink = ()=>{
        if(this.link.errors.length==0) {
            this.editor.focus();
            //nextTick
            setTimeout(()=>{
                var selection = this.editor.getSelection();
                if(selection) {
                    // Async, we wait image
                    setTimeout(()=>{
                        this.editor.formatText(selection.start,selection.end,'link',this.link.input.value)
                    },0);
                }
            });
            this.overGround.close();
        }
    }
}





