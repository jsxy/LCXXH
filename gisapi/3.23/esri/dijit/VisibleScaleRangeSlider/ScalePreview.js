// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/VisibleScaleRangeSlider/templates/ScalePreview.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"${css.header}"\x3e${labels.preview}\x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"dap_scalePreviewThumbnail" class\x3d"${css.thumbnail}"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/VisibleScaleRangeSlider/ScalePreview","../../kernel dijit/_TemplatedMixin dijit/_WidgetBase dojo/_base/declare dojo/_base/lang dojo/dom-style dojo/has dojo/i18n!../../nls/jsapi dojo/text!./templates/ScalePreview.html".split(" "),function(d,b,e,f,g,c,h,k,l){b=f([e,b],{declaredClass:"esri.dijit.VisibleScaleRangeSlider.ScalePreview",baseClass:"esriScalePreview",templateString:l,labels:k.widgets.visibleScaleRangeSlider,css:{header:"esriHeader",thumbnail:"esriThumbnail"},source:null,
_setSourceAttr:function(a){this.source!==a&&(this._set("source",a),c.set(this.dap_scalePreviewThumbnail,"backgroundImage",a))},backgroundPosition:null,_setBackgroundPositionAttr:function(a){this.backgroundPosition!==a&&(this._set("backgroundPosition",a),c.set(this.dap_scalePreviewThumbnail,"backgroundPosition",a))}});h("extend-esri")&&g.setObject("dijit.ScalePreview",b,d);return b});