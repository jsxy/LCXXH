// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/Tags","dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/dom dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/dom-style dojo/has dojo/html dojo/keys dojo/on dojo/query dojo/string dojo/store/Memory dijit/focus dijit/form/TextBox dijit/registry dijit/Tooltip dijit/_OnDijitClickMixin dijit/_TemplatedMixin dijit/_WidgetBase dgrid/OnDemandGrid dgrid/Selection dgrid/Keyboard ../kernel ../lang dojo/i18n!../nls/jsapi dojo/NodeList-traverse dojo/NodeList-manipulate dojo/_base/sniff".split(" "),
function(d,w,e,g,x,k,f,m,t,y,n,E,h,u,z,q,A,B,C,v,F,G,H,I,J,K,D,L){v=w([G,v,F],{declaredClass:"esri.dijit.Tags",templateString:'\x3cdiv class\x3d"${baseClass}"\x3e\x3c/div\x3e',baseClass:"esriTags",_attachmentNode:"",_autocompleteList:"",_grid:"",_store:"",_matchParam:"",_idProperty:"",_gridId:"",_filterId:"",_placeHolder:"",_noDataMsg:"",_maxWidth:"",_minWidth:"",_inputTextBox:"",_gridHasFocus:!1,_metaKeyPressed:!1,_shiftKeyPressed:!1,_CSS_STYLES:{CLASS_SELECTOR:".",ALL_SELECTOR:"\x3e",MULTI:"select2-container select2-container-multi",
CHOICES:"select2-choices",CHOICE:"select2-search-choice",SEARCH_CHOICE_FOCUS:"select2-search-choice-focus",SEARCH_FIELD:"select2-search-field",CLOSE_ICON:"select2-search-choice-close"},values:[],_selRows:[],_CHOICE_SELECTOR:"",_CHOICE_FOCUS:"",_CHOICE_FOCUS_ALL:"",tooltipPosition:[],constructor:function(a){this._idProperty=a.idProperty||"tag";this._maxWidth=a.maxWidth||"auto";this._minWidth=a.minWidth||"auto";this._matchParam=a.matchParam||"first";this.values=[];this._selRows=[];this._CHOICE_ALL_SELECTOR=
this._CSS_STYLES.CLASS_SELECTOR+this._CSS_STYLES.CHOICE+this._CSS_STYLES.ALL_SELECTOR;this._CHOICE_FOCUS=this._CSS_STYLES.CLASS_SELECTOR+this._CSS_STYLES.SEARCH_CHOICE_FOCUS;this._CHOICE_FOCUS_ALL=this._CHOICE_FOCUS+this._CSS_STYLES.ALL_SELECTOR},postMixInProperties:function(){this.inherited(arguments);var a=(new Date).getTime();this._tagsId="userTags-"+a;this._gridId="grid-"+a;this._filterId="filter-"+a;this._isIE8=9>t("ie");this.i18n={};e.mixin(this.i18n,L.widgets.tags)},postCreate:function(){if(this._isIE8)this._textTags=
new A({trim:!0,placeHolder:this.i18n.addTags,style:{minWidth:this.minWidth,maxWidth:this.maxWidth}},f.create("div",{id:this._tagsId},this.domNode)),this._textTags.startup(),k.add(this._textTags.domNode,"ie8Style");else{this._attachmentNode=f.create("div",{id:this._tagsId,className:"grid_1"},this.domNode);this._createContainerNode();this._createTagList();this._createDropDownList();this._createInput();var a=e.hitch(this,function(a,b,c){b=this._inputTextBox?this._inputTextBox.get("value")+"":"";if(1>
b.length)return!0;if(!a.tag)return!1;a=(a.tag+"").toLowerCase().match(new RegExp("^"+b.toLowerCase()));return null!==a&&0<a.length?!0:!1}),b=e.hitch(this,function(a,b,c){b=this._inputTextBox?this._inputTextBox.get("value")+"":"";return 1>b.length?!0:a.tag?(a.tag+"").toLowerCase().indexOf(b.toLowerCase())?!0:!1:!1}),c=[{field:this._idProperty}],p=[{attribute:this._idProperty,ascending:!0}];this._store=new z({idProperty:this._idProperty,data:[]});this._grid=new (w([H,I,J]))({store:this._store,showHeader:!1,
noDataMessage:this.i18n.noTagsFound,selectionMode:"extended",allowSelectAll:!0,cellNavigation:!1,columns:c,sort:p,renderRow:this._renderItem},this._dropDownList);this._grid.startup();k.add(this._grid.domNode,"gridHeightLimiter");this._grid.query="first"===this._matchParam?a:b;var l;this.own(this._inputTextBox.watch("value",e.hitch(this,function(a,b,c){l&&(clearTimeout(l),l=null);this._grid.refresh()})));this.own(this._grid.on(".dgrid-row:click",e.hitch(this,function(a){var b="";this._shiftKeyPressed||
this._metaKeyPressed?a.shiftKey||a.metaKey||a.ctrlKey||(b=this._selRows[0],this._createTags(b),this._store.remove(b),this._grid.refresh(),this._resetInputTextBox()):(b=this._grid.row(a).data.tag,this._createTags(b),this._store.remove(b),this._grid.refresh(),this._resetInputTextBox())})));this.own(this._grid.on("dgrid-deselect",e.hitch(this,function(a){this._selRows=[];for(var b in this._grid.selection)this._grid.selection.hasOwnProperty(b)&&this._selRows.push(b)})));this.own(this._grid.on("dgrid-select",
e.hitch(this,function(a){this._selRows=[];for(var b in this._grid.selection)this._grid.selection.hasOwnProperty(b)&&this._selRows.push(b)})));this.own(this.connect(this.domNode,"keydown","_keydownHandler"));window.onkeydown=e.hitch(this,function(a){if(a.shiftKey||a.ctrlKey||224===a.keyCode)this._metaKeyPressed=!0});this.own(this.connect(document,"onkeydown",e.hitch(this,function(a){this._metaKeyPressed=this._shiftKeyPressed=!0})))}},_keydownHandler:function(a){this._clearMessage();var b;void 0!==
q.curNode.value&&(b=q.curNode.value.length);var c=h(this._CHOICE_FOCUS,g.byId(this.id)),p=h(this._CSS_STYLES.CLASS_SELECTOR+this._CSS_STYLES.CHOICE,g.byId(this.id)).last(),l;switch(a.keyCode){case n.RIGHT_ARROW:this._navigate(c,b,p,"right");this._hideGrid();break;case n.LEFT_ARROW:this._navigate(c,b,p,"left");this._hideGrid();break;case n.DOWN_ARROW:a.preventDefault();this._unhighlightTag(c);"none"===m.get(this._gridId,"display")&&this._showGrid();this._gridHasFocus||(this._grid.focus(this._setFocusOnFirstRow(this._grid,
0)),this._gridHasFocus=!0);break;case n.UP_ARROW:break;case n.BACKSPACE:var r;if(0===b&&0===h(this._CHOICE_FOCUS_ALL).length&&void 0!==h(this._CHOICE_ALL_SELECTOR)[h(this._CHOICE_ALL_SELECTOR).length-1]&&(r=h(this._CHOICE_ALL_SELECTOR)[h(this._CHOICE_ALL_SELECTOR).length-1].title,0<h("li",this._attachmentNode).length&&(f.destroy(p[0]),void 0!==r)))try{this._store.add({tag:r})}catch(M){}if(0<h(this._CHOICE_FOCUS_ALL).length&&(r=h(this._CHOICE_FOCUS_ALL).text(),f.destroy(c[0]),void 0!==r))try{this._store.add({tag:r})}catch(M){}this._grid.refresh();
0===b&&this._hideGrid();this._removeTag(r);this._emitRemoved(r);this._emitChanged();this.validate();break;case n.CTRL:this._metaKeyPressed=!0;break;case n.META:this._metaKeyPressed=!0;break;case n.SHIFT:this._shiftKeyPressed=!0;break;case n.ENTER:if(0<b)b=this._stripHTML(q.curNode.value),b=b.split(","),l=[],d.forEach(b,function(a,b){-1===d.indexOf(l,a)&&l.push(u.trim(a))}),d.forEach(l,e.hitch(this,function(a,b){this._isEmpty(a)||this._contains(this.values,a)||this._createTags(a)}));else{for(b=0;b<
this._selRows.length;b++)this._createTags(this._selRows[b]),this._store.remove(this._selRows[b]);this._metaKeyPressed=this._shiftKeyPressed=!1}this._resetInputTextBox();a.preventDefault();q.focus(g.byId(this._filterId));break;case n.TAB:if(q.curNode.id!==this._filterId||0!==b){if(0<b)b=this._stripHTML(q.curNode.value),b=b.split(","),l=[],d.forEach(b,function(a,b){-1===d.indexOf(l,a)&&l.push(u.trim(a))}),d.forEach(l,e.hitch(this,function(a,b){this._isEmpty(a)||this._contains(this.values,a)||this._createTags(a)}));
else{for(b=0;b<this._selRows.length;b++)this._createTags(this._selRows[b]),this._store.remove(this._selRows[b]);this._metaKeyPressed=this._shiftKeyPressed=!1}this._resetInputTextBox();a.preventDefault();q.focus(g.byId(this._filterId))}break;case n.ESCAPE:this._hideGrid();break;default:-1<b&&("none"===m.get(g.byId(this._gridId),"display")&&this._showGrid(),this._unhighlightTag(c)),this._metaKeyPressed=!1}},_blurHandler:function(a,b,c){if(!this.focused){a=this._stripHTML(this._inputTextBox.value);if(0<
a.length){var p=[];a=a.split(",");d.forEach(a,function(a,b){-1===d.indexOf(p,a)&&p.push(u.trim(a))});d.forEach(p,e.hitch(this,function(a,b){this._isEmpty(a)||this._contains(this.values,a)||this._createTags(a)}));this._resetInputTextBox()}this._hideGrid()}this.validate()},isValid:function(){var a=this.get("value");return this.required?D.isDefined(a)&&0<a.length:!0},validate:function(){this._created&&!this.isValid()?(x.set(this.domNode,"aria-invalid","true"),this._displayMessage(this.i18n.required)):
(x.set(this.domNode,"aria-invalid","false"),this._displayMessage(null))},_clearMessage:function(){this._displayMessage(null)},_displayMessage:function(a){var b=this._isIE8?this._textTags.domNode:g.byId(this._tagsId);a&&this.focused?C.show(a,b):C.hide(b)},_resetInputTextBox:function(){B.byId(this._filterId).set("value","")},_isEmpty:function(a){a=a.replace(/^\s+|\s+$/,"");return 0===a.length?!0:!1},_navigate:function(a,b,c,p){0<a.length&&1>b?("right"===p?this._hightlightTag(a.next()):this._hightlightTag(a.prev()),
this._unhighlightTag(a)):1>b&&this._hightlightTag(c)},_contains:function(a,b){return 0<=d.indexOf(a,b)},_hightlightTag:function(a){a.addClass(this._CSS_STYLES.SEARCH_CHOICE_FOCUS)},_unhighlightTag:function(a){a.removeClass(this._CSS_STYLES.SEARCH_CHOICE_FOCUS)},_removeTag:function(a){a&&-1!==d.indexOf(this.values,a)&&this.values.splice(d.indexOf(this.values,a),1)},_hideGrid:function(){g.byId(this._gridId)&&m.set(g.byId(this._gridId),"display","none");this._gridHasFocus=!1},_showGrid:function(){m.set(g.byId(this._gridId),
"display","block");var a=m.get(g.byId(this._attachmentNode),"width");m.set(g.byId(this._gridId),"width",a+"px")},_setFocusOnFirstRow:function(a,b){return h(".dgrid-content .dgrid-cell",this._grid.domNode)[b]||h(".dgrid-content .dgrid-row",this._grid.domNode)[b]},_createTags:function(a){h(this._CHOICE_FOCUS,g.byId(this.id)).removeClass("select2-search-choice-focus");var b=f.create("li",null,this._autocompleteList);k.add(b,this._CSS_STYLES.CHOICE);b=f.create("div",{title:a},b);y.set(b,this._htmlEncode(a));
b=f.create("a",{href:"#"},b);k.add(b,this._CSS_STYLES.CLOSE_ICON);E(b,"click",e.hitch(this,function(a){var b=u.trim(a.target.parentElement.innerText||a.target.parentElement.textContent);try{this._store.add({tag:b})}catch(l){}this._grid.refresh();this._removeTag(b);this._emitRemoved(b);this._emitChanged();f.destroy(a.target.parentNode.parentNode);a.preventDefault()}));b=B.byId(this._filterId);f.place(b.domNode,this._autocompleteList,"last");this._hideGrid();this.values.push(a);this._emitAdded(a);this._emitChanged()},
_emitAdded:function(a){this.emit("tags-add",{tag:a})},_emitRemoved:function(a){this.emit("tags-remove",{tag:a})},_emitChanged:function(){this.emit("tags-change",{tags:this.get("tags")})},_renderItem:function(a){return f.create("div",{innerHTML:a.tag})},_createContainerNode:function(){this._containerNode=f.create("div",null,this._attachmentNode);k.add(this._containerNode,this._CSS_STYLES.MULTI);m.set(this._containerNode,"maxWidth",this._maxWidth);m.set(this._containerNode,"minWidth",this._minWidth)},
_createTagList:function(){this._autocompleteList=f.create("ul",null,this._containerNode);k.add(this._autocompleteList,this._CSS_STYLES.CHOICES)},_createInput:function(){var a=f.create("li",null,this._autocompleteList,"last");k.add(a,this._CSS_STYLES.SEARCH_FIELD);this._inputTextBox=new A({id:this._filterId,placeHolder:this.i18n.addTags,intermediateChanges:!0,trim:!0,style:{border:"none"}},a);k.add(this._inputTextBox,"inputTextBox");m.set(this._inputTextBox,"width",this._minWidth);(8<t("ie")||4<t("trident"))&&
k.add(this._inputTextBox.domNode,"ieStyle");this.own(q.watch("curNode",e.hitch(this,this._blurHandler)))},_createDropDownList:function(){this._dropDownList=f.create("div",{id:this._gridId},this._containerNode);k.add(this._dropDownList,"dropDownList");m.set(this._dropDownList,"width",this._minWidth)},focus:function(){q.focus(this.domNode);this._isIE8?this._textTags.focus():this._inputTextBox.focus()},reset:function(){this.clearTags()},prepopulate:function(a){d.forEach(a,e.hitch(this,function(a,c){this._createTags(a);
this._store.remove(a)}))},clearTags:function(){var a=h(this._CSS_STYLES.CLASS_SELECTOR+this._CSS_STYLES.CHOICE,g.byId(this.id)),b=!1,c;0<a.length&&(b=!0,d.forEach(a,e.hitch(this,function(a,b){try{c=h(this._CHOICE_ALL_SELECTOR,g.byId(this.id))[0].title,this._store.add({tag:c})}catch(r){}f.destroy(a);this._emitRemoved(c)})),this.values=[],b&&this._emitChanged())},addStyledTags:function(a,b){k.add(g.byId(b),this._CSS_STYLES.MULTI);var c=f.create("ul",null,g.byId(b));k.add(c,this._CSS_STYLES.CHOICES);
m.set(c,"border","none");d.forEach(a,function(a,b){var d=f.create("li",null,c);m.set(d,"padding","3px 5px 3px 5px");k.add(d,"select2-search-resultSet");d=f.create("div",{title:a},d);y.set(d,a)})},_getUniqueTags:function(a){var b=[],c;d.forEach(a,e.hitch(this,function(a){c=this._stripHTML(a);D.isDefined(c)&&0<c.length&&b.push(c)}));return d.filter(b,e.hitch(this,function(a,c){return d.indexOf(b,a)===c}))},_setValueAttr:function(a){this._setTagsAttr(a)},_getValueAttr:function(){return this._getTagsAttr()},
_setTagsAttr:function(a){!a||a instanceof Array||(a=a.split(","));this._isIE8?this._textTags&&this._textTags.set("value",this._getUniqueTags(a).join(",")):(this.clearTags(),this.prepopulate(a?this._getUniqueTags(a):[]))},_getTagsAttr:function(){return this._isIE8?this._textTags?this._textTags.get("value"):"":this.values?this.values.join(","):""},_setRequiredAttr:function(a){this.required=a},_getRequiredAttr:function(){return this.required},_setMinWidthAttr:function(a){this.minWidth=a},_setMaxWidthAttr:function(a){this.maxWidth=
a},_setKnownTagsAttr:function(a){if(!this._isIE8){var b=[],c;for(c=0;c<a.length;c++)0>d.indexOf(this.values,a[c])&&b.push(a[c]);this._store=new z({idProperty:this._idProperty,data:b});this._grid.set("store",this._store);this._grid.refresh()}},_stripHTML:function(a){return a&&a.replace(/<(?:.|\s)*?>/g,"")},_htmlEncode:function(a){return a?a.replace(/&/g,"\x26amp;").replace(/>/g,"\x26gt;").replace(/</g,"\x26lt;").replace(/"/g,"\x26quot;"):a}});t("extend-esri")&&e.setObject("dijit.Tags",v,K);return v});