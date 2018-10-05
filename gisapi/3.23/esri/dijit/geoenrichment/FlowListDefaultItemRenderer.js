// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/FlowListDefaultItemRenderer","dojo/_base/declare dojo/_base/lang dojo/dom-class dojo/dom-construct ./utils/DomUtil ./utils/TooltipUtil".split(" "),function(f,g,d,e,h,k){return f(null,{itemClass:"",itemClassSelected:"",labelClass:"",createLabelNode:!1,createImageAfterLabel:!1,constructor:function(a){g.mixin(this,a)},createPresentation:function(a,b,c,l,f){if(a.isSeparator)return e.create("div",{"class":"flowList_listSeparator"},c);c=e.create("div",{"class":"listItem "+
this.itemClass},c);a.isLink&&d.add(c,"esriGELink");!1===a.enabled&&d.add(c,"disabled");a.tooltip&&k.setTooltipToNode(c,a.tooltip);this._createParts(a,c,l);this.selectPresentation(c,b);a.hidden&&h.hide(c);return c},_createParts:function(a,b,c){var d;this.createImageAfterLabel&&(this._createLabel(a,b,c),d=!0);this._createImage(a,b,c);!d&&this._createLabel(a,b,c)},_createImage:function(a,b,c){if(b=this._createImageNode(a,b,c))a.imageClass&&d.add(b,a.imageClass),a.imageUrl&&(b.style="background-image: url("+
a.imageUrl+");")},_createImageNode:function(a,b,c){return b},_createLabel:function(a,b,c){if(this.createLabelNode)return b=e.create("div",{innerHTML:a[c.labelProperty],"class":"dijitInline TrimWithEllipses listItemLabel"},b),a.labelClass&&d.add(b,a.labelClass),this.labelClass&&d.add(b,this.labelClass),b;a[c.labelProperty]&&(b.innerHTML=a[c.labelProperty])},selectPresentation:function(a,b){d[b?"add":"remove"](a,"listItemSelected "+this.itemClassSelected)}})});