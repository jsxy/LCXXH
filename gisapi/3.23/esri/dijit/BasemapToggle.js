// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/templates/BasemapToggle.html":'\x3cdiv class\x3d"${theme}" role\x3d"presentation" style\x3d"display:none;"\x3e\r\n    \x3cdiv class\x3d"${_css.container}"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"_toggleNode" title\x3d"${_i18n.widgets.basemapToggle.toggle}" role\x3d"button" class\x3d"${_css.toggleButton}" tabindex\x3d"0"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e',"*noref":1}});
define("esri/dijit/BasemapToggle","require dojo/Evented dojo/_base/declare dojo/_base/lang dojo/has ../kernel dijit/_WidgetBase dijit/a11yclick dijit/_TemplatedMixin dojo/on dojo/text!./templates/BasemapToggle.html dojo/i18n!../nls/jsapi dojo/dom-class dojo/dom-style dojo/dom-construct ../basemaps".split(" "),function(f,l,m,d,n,p,q,r,t,g,u,v,e,h,k,w){f=m("esri.dijit.BasemapToggle",[q,t,l],{templateString:u,options:{theme:"BasemapToggle",map:null,visible:!0,basemap:"hybrid",defaultBasemap:"streets",
basemaps:w},constructor:function(a,c){var b=d.mixin({},this.options,a);this.domNode=c;this._i18n=v;this.set("map",b.map);this.set("theme",b.theme);this.set("visible",b.visible);this.set("basemaps",b.basemaps);this.set("basemap",b.basemap);this.set("defaultBasemap",b.defaultBasemap);this.watch("theme",this._updateThemeWatch);this.watch("visible",this._visible);this._css={container:"basemapContainer",toggleButton:"toggleButton",basemapImage:"basemapImage",basemapImageContainer:"basemapImageContainer",
basemapImageBG:"basemapBG",basemapTitle:"basemapTitle"}},postCreate:function(){this.inherited(arguments);this.own(g(this._toggleNode,r,d.hitch(this,this.toggle)))},startup:function(){this.inherited(arguments);this.map||(this.destroy(),console.log("BasemapToggle::map required"));if(this.map.loaded)this._init();else g.once(this.map,"load",d.hitch(this,function(){this._init()}))},destroy:function(){this.inherited(arguments)},show:function(){this.set("visible",!0)},hide:function(){this.set("visible",
!1)},toggle:function(){var a=this.map.getBasemap();a&&this.set("defaultBasemap",a);var a=this.get("defaultBasemap"),c=this.get("basemap"),b={previousBasemap:a,currentBasemap:c};a!==c?(this.map.setBasemap(c),this.set("basemap",a),this._basemapChange()):b.error=Error("BasemapToggle::Current basemap is same as new basemap");this.emit("toggle",b)},_init:function(){this._visible();this._basemapChange();this.own(g(this.map,"basemap-change",d.hitch(this,function(){this._basemapChange()})));this.set("loaded",
!0);this.emit("load",{})},_getBasemapInfo:function(a){var c=this.get("basemaps");if(c&&c.hasOwnProperty(a))return c[a]},_updateImage:function(){var a=this.get("basemap"),a=this._getBasemapInfo(a),c=a.thumbnailUrl,b;b=""+('\x3cdiv class\x3d"'+this._css.basemapImageContainer+'"\x3e');b+='\x3cdiv class\x3d"'+this._css.basemapImage+'"\x3e\x3cdiv class\x3d"'+this._css.basemapImageBG+'" style\x3d"background-image:url('+c+')" title\x3d"'+a.title+'"\x3e\x3c/div\x3e\x3c/div\x3e';b+='\x3cdiv title\x3d"'+a.title+
'" class\x3d"'+this._css.basemapTitle+'"\x3e'+a.title+"\x3c/div\x3e";b+="\x3cdiv\x3e";k.empty(this._toggleNode);k.place(b,this._toggleNode,"only")},_basemapChange:function(){var a=this.map.getBasemap();a&&this.set("defaultBasemap",a);var a=this.get("defaultBasemap"),c=this.get("basemap");this._updateImage();e.remove(this._toggleNode,a);e.add(this._toggleNode,c)},_updateThemeWatch:function(a,c,b){this.get("loaded")&&(e.remove(this.domNode,c),e.add(this.domNode,b))},_visible:function(){this.get("visible")?
h.set(this.domNode,"display","block"):h.set(this.domNode,"display","none")}});n("extend-esri")&&d.setObject("dijit.BasemapToggle",f,p);return f});