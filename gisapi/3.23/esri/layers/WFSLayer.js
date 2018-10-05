// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/WFSLayer","dojo/_base/declare dojo/_base/kernel dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/has dojo/on ../request ../kernel ../graphic ../renderers/jsonUtils ../symbols/jsonUtils ../Color ../symbols/SimpleMarkerSymbol ../symbols/SimpleLineSymbol ../symbols/SimpleFillSymbol ../SpatialReference ../geometry/webMercatorUtils ../geometry/Extent ../geometry/Point ../geometry/Multipoint ../geometry/Polyline ../geometry/Polygon ./LabelClass ./GraphicsLayer".split(" "),function(u,
O,n,q,F,G,P,v,H,r,Q,w,t,y,p,A,x,z,I,E,J,K,L,M,N){u=u([N],{declaredClass:"esri.layers.WFSLayer",constructor:function(a){this.geometryType=this.describeFeatureTypeUrl=this.getFeatureUrl=this.layerNamespace="";this.fields=[];this.spatialReferences=[];this.fullExtent=null;this.visible=!0;this.renderer=null;this.id="WFSLayer";this._url="";this._version="1.1.0";this._layerName="";this._nsLayerNames={};this._layerDefinedGeometryType="esriGeometryComplex";this._wkid=3857;this._mode="snapshot";this._maxFeatures=
100;this._inverseResponse=this._inverseFilter=!1;this._nsGeometryFieldName=this._getFeatureRequest=this._nsFields="";this._graphicArray=[];this._gmlNS="http://www.opengis.net/gml";this._layerEventHandlers=[];this.customParameters=this._describeFeatureTypeCallback=this._getCapabilitiesCallback=null;this.showLabels=!0;this.labelingInfo=null;a&&(a.id&&(this.id=a.id),this.showLabels=null!==a.showLabels?a.showLabels:!0);this.onError=n.hitch(this,this.onError);this._errorSupport=n.hitch(this,this._errorSupport);
this._parseGml=n.hitch(this,this._parseGml);this._getCapabilities=n.hitch(this,this._getCapabilities);this._getCapabilitiesResponse=n.hitch(this,this._getCapabilitiesResponse);this._describeFeatureTypeResponse=n.hitch(this,this._describeFeatureTypeResponse);this._pointSymbol=new y(y.STYLE_CIRCLE,6,new p(p.STYLE_SOLID,new t([0,255,0]),1),new t([255,0,0]));this._lineSymbol=new p(p.STYLE_SOLID,new t([0,255,0]),3);this._polygonSymbol=new A(A.STYLE_SOLID,new p(p.STYLE_SOLID,new t([255,0,0]),2),new t([255,
255,0,.25]));this.loaded=!1;this._isProjectedOk=!0},initialize:function(a,d){a.id&&(this.id=a.id);a.url&&(this._url=a.url);a.version&&(this._version=a.version);this.customParameters=a.customParameters;this._getCapabilities(d)},selectLayer:function(a,d){this._layerName=a.layerName;this._wkid=a.wkid;this._mode=a.mode;this._maxFeatures=a.maxFeatures;this._inverseResponse=a.swapXY;this._inverseFilter=a.swapXYFilter;this.geometryType=a.geometryType;this._describeFeatureType(d);this.loaded=!0},toJson:function(){var a=
{};a.id=this.id;a.url=this._url;a.version=this._version;a.mode="snapshot"===this._mode?0:1;a.name=this._layerName;a.geometryType=this.geometryType;a.wkid=this._wkid;a.maxFeatures=this._maxFeatures;a.swapXY=this._inverseResponse;a.swapXYFilter=this._inverseFilter;a.pointSymbol=this._pointSymbol.toJson();a.lineSymbol=this._lineSymbol.toJson();a.polygonSymbol=this._polygonSymbol.toJson();a.showLabels=this.showLabels;this.labelingInfo&&(a.labelingInfo=q.map(this.labelingInfo,function(a){return a.toJson()}));
this.customParameters&&(a.customParameters=this.customParameters);return a},fromJson:function(a,d){a.id&&(this.id=a.id);a.url&&(this._url=a.url);a.version&&(this._version=a.version);a.mode&&(this._mode=0===a.mode?"snapshot":"onDemand");a.name&&(this._layerName=a.name);a.geometryType&&(this.geometryType=a.geometryType);a.wkid&&(this._wkid=a.wkid);a.maxFeatures&&(this._maxFeatures=a.maxFeatures);a.swapXY&&(this._inverseResponse=a.swapXY);a.swapXYFilter&&(this._inverseFilter=a.swapXYFilter);a.pointSymbol&&
(this._pointSymbol=w.fromJson(a.pointSymbol));a.lineSymbol&&(this._lineSymbol=w.fromJson(a.lineSymbol));a.polygonSymbol&&(this._polygonSymbol=w.fromJson(a.polygonSymbol));this.showLabels=null!=a.showLabels?a.showLabels:!0;a.labelingInfo&&(this.labelingInfo=q.map(a.labelingInfo,function(a){return new M(a)}));this.customParameters=a.customParameters;this._getCapabilities(d);this.loaded=!0},setPointSymbol:function(a){this._pointSymbol=a},setLineSymbol:function(a){this._lineSymbol=a},setPolygonSymbol:function(a){this._polygonSymbol=
a},_setMap:function(a){this._map=a;var d=this.inherited(arguments);this._map&&(this._layerEventHandlers.push(this._map.on("extent-change",n.hitch(this,"refresh"))),this._layerEventHandlers.push(this.on("visibility-change",n.hitch(this,"_visibilityChange"))));this._getFeature();this.refresh();return d},_unsetMap:function(){for(var a=0;a<this._layerEventHandlers.length;a++)F.disconnect(this._layerEventHandlers[a]);this.refresh();this.inherited(arguments)},refresh:function(a){this.clear();this.redraw();
"ondemand"===this._mode.toLowerCase()&&this._fireUpdateStart()},redraw:function(){if(this.visible)for(var a=0;a<this._graphicArray.length;a++){var d=this._graphicArray[a],e=d.geometry,b=null;"point"===e.type?b=this.renderer?this.renderer.getSymbol(d):this._pointSymbol:"multipoint"===e.type?b=this.renderer?this.renderer.getSymbol(d):this._pointSymbol:"polyline"===e.type?b=this.renderer?this.renderer.getSymbol(d):this._lineSymbol:"polygon"===e.type&&(b=this.renderer?this.renderer.getSymbol(d):this._polygonSymbol);
d.setSymbol(b);this.add(d)}},_visibilityChange:function(a){this.visible=a.visible;this.redraw()},onUpdateStart:function(){this._getFeature()},onUpdateEnd:function(){this.clear();this.redraw()},setLabelingInfo:function(a){a?(this.labelingInfo=a,this._fixLabelExpr()):delete this.labelingInfo;this.onLabelingInfoChange()},onLabelingInfoChange:function(){},_fixLabelExpr:function(){var a=/\[([^\[\]]+)\]/ig,d,e=this,b=function(a,b){var c=e._getField(b,!0);return"["+(c&&c.name||b)+"]"};q.forEach(this.labelingInfo,
function(c){if(d=c.labelExpression)c.labelExpression=d.replace(a,b)})},_getField:function(a,d){var e=this.fields;if(!e||0===e.length)return null;var b;d&&(a=a.toLowerCase());q.some(e,function(c){var e=!1;(e=d?c&&c.name.toLowerCase()===a?!0:!1:c&&c.name===a?!0:!1)&&(b=c);return e});return b},setCustomParameters:function(a){this.customParameters=a;this._getFeature();this.refresh()},_getCapabilities:function(a){this._getCapabilitiesCallback=a;a=n.trim(this._url);if(""===a)this.onError("WFSLayer: url is invalid");
else if("1.0.0"!==this._version&&"1.1.0"!==this._version&&"2.0.0"!==this._version)this.onError("WFSLayer: version is invalid");else if(""!==a){var d=a.indexOf("?");a=a+(-1===d?"?":"\x26")+"service\x3dWFS\x26request\x3dGetCapabilities\x26version\x3d"+this._version;a=this._appendCustomParameters(a);v({url:a,handleAs:"text",headers:{"Content-Type":null}},{usePost:!1}).then(this._getCapabilitiesResponse,this._errorSupport)}},_errorSupport:function(a){this.onError(a)},_getCapabilitiesResponse:function(a){var d,
e,b,c,f,g=new DOMParser;try{var h=g.parseFromString(a,"text/xml"),k=this._readExceptionReport(h,a);if(k)this.onError("WFSLayer: getCapabilities - returns exception: "+k);else{var l=h.documentElement.attributes.getNamedItem("version");if(l){this._version=l.value;var m="2.0.0"===this._version?"http://www.opengis.net/wfs/2.0":"http://www.opengis.net/wfs";if("2.0.0"===this._version)for(d=h.getElementsByTagNameNS("http://www.opengis.net/ows/1.1","Operation"),e=0;e<d.length;e++)(c=d[e].attributes.getNamedItem("name"))&&
"DescribeFeatureType"===c.value&&(getList=d[e].getElementsByTagNameNS("http://www.opengis.net/ows/1.1","Get"),this.describeFeatureTypeUrl=getList[0].attributes.getNamedItem("xlink:href").value),c&&"GetFeature"===c.value&&(f=d[e].getElementsByTagNameNS("http://www.opengis.net/ows/1.1","Post"),this.getFeatureUrl=f[0].attributes.getNamedItem("xlink:href").value);else if("1.1.0"===this._version)for(d=h.getElementsByTagNameNS("http://www.opengis.net/ows","Operation"),e=0;e<d.length;e++)(c=d[e].attributes.getNamedItem("name"))&&
"DescribeFeatureType"===c.value&&(getList=d[e].getElementsByTagNameNS("http://www.opengis.net/ows","Get"),this.describeFeatureTypeUrl=getList[0].attributes.getNamedItem("xlink:href").value),c&&"GetFeature"===c.value&&(f=d[e].getElementsByTagNameNS("http://www.opengis.net/ows","Post"))&&f.length&&(this.getFeatureUrl=f[0].attributes.getNamedItem("xlink:href").value);else if("1.0.0"===this._version){var n=h.getElementsByTagNameNS(m,"DescribeFeatureType");if(!n||!n.length){this.onError("WFSLayer: getCapabilities - no describeFeatureType info");
return}getList=n[0].getElementsByTagNameNS(m,"Get");this.describeFeatureTypeUrl=getList[0].attributes.getNamedItem("onlineResource").value;var p=h.getElementsByTagNameNS(m,"GetFeature");if(!p||!p.length){this.onError("WFSLayer: getCapabilities - no GetFeature info");return}(f=p[0].getElementsByTagNameNS(m,"Post"))&&f.length&&(this.getFeatureUrl=f[0].attributes.getNamedItem("onlineResource").value)}this._nsLayerNames={};a=[];var t=h.getElementsByTagNameNS(m,"FeatureTypeList");for(e=0;e<t.length;e++){var u=
t[e].getElementsByTagNameNS(m,"FeatureType");for(b=0;b<u.length;b++){var q=u[b],r=q.getElementsByTagNameNS(m,"Name")[0],v=r.textContent,w=v.indexOf(":"),x=v.substring(0,w),B=v.substring(w+1),C=r.lookupNamespaceURI(x);null===C&&(C=r.lookupNamespaceURI(null));this._nsLayerNames[B]={prefix:x,namespace:C};var y=q.getElementsByTagNameNS(m,"Title"),D=0<y.length?y[0].textContent:"";""===D&&(D=B);this.spatialReferences=this._readFactoryCodes(this._version,q);var A=this._readDefaultBBOX(this._version,q);a.push({name:B,
title:D,spatialReferences:this.spatialReferences,extent:A})}}this._describeFeatureType();var z=this._getCapabilitiesCallback;z&&z(a)}else this.onError("WFSLayer: getCapabilities - document not recognized.")}}catch(R){this.onError("WFSLayer: getCapabilities - parsing error")}},_readFactoryCodes:function(a,d){var e,b,c=[];if("2.0.0"===a||"1.1.0"===a){e=d.getElementsByTagNameNS("*","DefaultSRS");this._addCodeList(c,e[0]);e=d.getElementsByTagNameNS("*","DefaultCRS");this._addCodeList(c,e[0]);e=d.getElementsByTagNameNS("*",
"OtherSRS");for(b=0;b<e.length;b++)this._addCodeList(c,e[b]);e=d.getElementsByTagNameNS("*","OtherCRS");for(b=0;b<e.length;b++)this._addCodeList(c,e[b])}else"1.0.0"===a&&(e=d.getElementsByTagNameNS("*","SRS"),this._addCodeList(c,e[0]));for(e=!1;0<c.length;){4326===c[0]&&(e=!0);break}e||c.push(4326);return c},_addCodeList:function(a,d){if(d){var e=d.textContent.match(/\d+/g);0<e.length&&(e=parseInt(e[e.length-1],10),84===e&&(e=4326),a.push(e))}},_readDefaultBBOX:function(a,d){var e,b,c,f;if("2.0.0"===
a||"1.1.0"===a){e=d.getElementsByTagNameNS("*","WGS84BoundingBox");if(!e[0]||!e[0].attributes)return[];b=e[0].getElementsByTagNameNS("*","LowerCorner");f=e[0].getElementsByTagNameNS("*","UpperCorner");if(0>=b.length||0>=f.length)return[];c=b[0].textContent;e=c.indexOf(" ");b=c.substring(0,e);c=c.substring(e+1);e=f[0].textContent;var g=e.indexOf(" ");f=e.substring(0,g);e=e.substring(g+1)}else if("1.0.0"===a){e=d.getElementsByTagNameNS("*","LatLongBoundingBox");if(!e[0]||!e[0].attributes)return[];b=
e[0].attributes.getNamedItem("minx").value;c=e[0].attributes.getNamedItem("miny").value;f=e[0].attributes.getNamedItem("maxx").value;e=e[0].attributes.getNamedItem("maxy").value}b=parseFloat(b,10);c=parseFloat(c,10);f=parseFloat(f,10);e=parseFloat(e,10);return[b,c,f,e]},_describeFeatureType:function(a){if(""!==this._layerName)if(""===this.describeFeatureTypeUrl)this.onError("WFSLayer: invalid describeFeatureType url");else if(""===this._wkid)this.onError("WFSLayer: invalid wkid");else if("snapshot"!==
this._mode&&"onDemand"!==this._mode)this.onError("WFSLayer: invalid mode");else if(""===this._maxFeatures||0>this._maxFeatures||1E6<this._maxFeatures)this.onError("WFSLayer: invalid maxFeatures");else{this._describeFeatureTypeCallback=a;var d=n.trim(this.describeFeatureTypeUrl);if(""!==d){var e=-1===d.indexOf("?")?"?":"\x26",b=this._nsLayerNames[this._layerName];if(void 0===b)this.onError("WFSLayer: invalid layerName");else a=b.prefix,b=b.namespace,d=d+e+"service\x3dWFS\x26request\x3dDescribeFeatureType\x26version\x3d"+
this._version,d+="\x26typeName\x3d",""!==a&&(d+=a+":"),d+=this._layerName,""!==a&&(d+="\x26namespace\x3dxmlns("+a+"\x3d"+b+")"),d=this._appendCustomParameters(d),v({url:d,handleAs:"text",headers:{"Content-Type":null}},{usePost:!1}).then(this._describeFeatureTypeResponse,this._errorSupport)}}},_describeFeatureTypeResponse:function(a){var d;d=(new DOMParser).parseFromString(a,"text/xml");if(a=this._readExceptionReport(d,a))this.onError("WFSLayer: DescribeFeatureType - returns exception: "+a);else{this.fields=
[];a=d.getElementsByTagNameNS("http://www.w3.org/2001/XMLSchema","schema");for(d=0;d<a.length;d++){var e=this._readAllFields(a[d]);null!==e&&(this._layerDefinedGeometryType=e[0],this.fields=e[1])}this.geometryType&&""!==this.geometryType||(this.geometryType=this._layerDefinedGeometryType);for(d=0;d<this.fields.length;d++)a=this.fields[d],"esriFieldTypeGeometry"===a.type&&(this._nsGeometryFieldName=a.name);this.layerNamespace=this._nsLayerNames[this._layerName].namespace;if(0===this.fields.length)this.onError("WFSLayer: DescribeFeatureType - can't get fields");
else this._getFeature(),(d=this._describeFeatureTypeCallback)&&d(this.fields)}},_readAllFields:function(a){for(var d=a.childNodes,e=0;e<d.length;e++){var b=d[e];if("element"===b.localName){var c=b.attributes;if(c.name.value===this._layerName)return(d=c.type)?(b=d.value,d=b.indexOf(":"),b=b.substring(d+1),this._readFieldsFromGlobalComplextType(a,b)):this._readFieldsFromLocalComplextType(b)}}return null},_readFieldsFromGlobalComplextType:function(a,d){for(var e=a.childNodes,b=0;b<e.length;b++){var c=
e[b];if("complexType"===c.localName&&c.attributes.name.value===d)return this._readFieldsFromLocalComplextType(c)}return null},_readFieldsFromLocalComplextType:function(a){var d=[],e="esriGeometryComplex";a=a.getElementsByTagNameNS("http://www.w3.org/2001/XMLSchema","element");for(var b=0;b<a.length;b++){var c=a[b],f="",g=c.attributes.getNamedItem("name");g&&(f=g.value);if(""!==f){var h=g="",c=c.attributes.getNamedItem("type"),g="unknown";if(null!==c){var h=c.value,k=h.indexOf(":"),g=h.substring(0,
k),h=h.substring(k+1),g=c.lookupNamespaceURI(g);null===g&&(g=c.lookupNamespaceURI(null))}c="Unknown";switch(h){case "integer":case "nonPositiveInteger":case "negativeInteger":case "long":case "int":case "short":case "byte":case "nonNegativeInteger":case "unsignedLong":case "unsignedInt":case "unsignedShort":case "unsignedByte":case "positiveInteger":c="esriFieldTypeInteger";d.push({name:f,alias:f,type:c,wfsNamespace:g});break;case "float":case "double":case "decimal":c="esriFieldTypeDouble";d.push({name:f,
alias:f,type:c,wfsNamespace:g});break;case "boolean":case "string":case "gYearMonth":case "gYear":case "gMonthDay":case "gDay":case "gMonth":case "anyURI":case "QName":case "NOTATION":case "normalizedString":case "token":case "language":case "IDREFS":case "ENTITIES":case "NMTOKEN":case "NMTOKENS":case "Name":case "NCName":case "ID":case "IDREF":case "ENTITY":c="esriFieldTypeString";d.push({name:f,alias:f,type:c,wfsNamespace:g});break;case "duration":case "dateTime":case "time":case "date":c="esriFieldTypeDate";
d.push({name:f,alias:f,type:c,wfsNamespace:g});break;case "PointPropertyType":case "MultiPointPropertyType":c="esriFieldTypeGeometry";e="esriGeometryPoint";d.push({name:f,alias:f,type:c,wfsNamespace:g});break;case "MultiCurvePropertyType":case "MultiLineStringPropertyType":c="esriFieldTypeGeometry";e="esriGeometryPolyline";d.push({name:f,alias:f,type:c,wfsNamespace:g});break;case "MultiSurfacePropertyType":case "MultiPolygonPropertyType":c="esriFieldTypeGeometry";e="esriGeometryPolygon";d.push({name:f,
alias:f,type:c,wfsNamespace:g});break;case "GeometryPropertyType":case "MultiGeometryPropertyType":c="esriFieldTypeGeometry",e="esriGeometryComplex",d.push({name:f,alias:f,type:c,wfsNamespace:g})}}}return[e,d]},_getFeature:function(){var a;a="\x3c?xml version\x3d'1.0' encoding\x3d'utf-8'?\x3e\n\x3cGetFeature \n xmlns:xsi\x3d'http://www.w3.org/2001/XMLSchema-instance'\n xmlns:gml\x3d'http://www.opengis.net/gml'\n xmlns:ogc\x3d'http://www.opengis.net/ogc'\n xmlns:wfs\x3d'http://www.opengis.net/wfs'\n";
a="2.0.0"===this._version?a+" xmlns\x3d'http://www.opengis.net/wfs/2.0'\n":a+" xmlns\x3d'http://www.opengis.net/wfs'\n";var d=this._nsLayerNames[this._layerName];if(void 0===d)this.onError("WFSLayer: invalid layerName");else{var e=d.prefix,d=d.namespace;if("ondemand"===this._mode.toLowerCase()&&""===this._nsGeometryFieldName)this.onError("WFSLayer: GetFeature - can't use 'onDemand' mode as geometryFieldName is unknown.");else if(a+=" xmlns:"+e+"\x3d'"+d+"'\n",a="2.0.0"===this._version?a+(" version\x3d'"+
this._version+"' service\x3d'WFS' count\x3d'"+this._maxFeatures+"'\x3e\n"):a+(" version\x3d'"+this._version+"' service\x3d'WFS' maxFeatures\x3d'"+this._maxFeatures+"'\x3e\n"),a="2.0.0"===this._version?a+(" \x3cQuery typeNames\x3d'"+e+":"+this._layerName+"' srsName\x3d'EPSG:"+this._wkid+"'\x3e\n"):a+(" \x3cwfs:Query typeName\x3d'"+e+":"+this._layerName+"' srsName\x3d'EPSG:"+this._wkid+"'\x3e\n"),"ondemand"===this._mode.toLowerCase()&&(a=a+"  \x3cogc:Filter xmlns:ogc\x3d'http://www.opengis.net/ogc'\x3e\n   \x3cogc:BBOX\x3e\n"+
("    \x3cogc:PropertyName\x3e"+e+":"+this._nsGeometryFieldName+"\x3c/ogc:PropertyName\x3e\n"),a+="    \x3cgml:Box srsName\x3d'EPSG:"+this._wkid+"'\x3e\n",a=this._inverseFilter?a+"      \x3cgml:coordinates\x3e{ymin},{xmin} {ymax},{xmax}\x3c/gml:coordinates\x3e\n":a+"      \x3cgml:coordinates\x3e{xmin},{ymin} {xmax},{ymax}\x3c/gml:coordinates\x3e\n",a+="    \x3c/gml:Box\x3e\n   \x3c/ogc:BBOX\x3e\n  \x3c/ogc:Filter\x3e\n"),a="2.0.0"===this._version?a+" \x3c/Query\x3e\n":a+" \x3c/wfs:Query\x3e\n",this._getFeatureRequest=
a+"\x3c/GetFeature\x3e\n",""===this.getFeatureUrl)this.onError("WFSLayer: getFeature - server doesn't support POST method.");else if(""!==this._getFeatureRequest&&this._map&&null!==this._map.spatialReference.wkid){a=this._getFeatureRequest;if("ondemand"===this._mode.toLowerCase()){a=this._map.extent.xmin;var e=this._map.extent.ymin,d=this._map.extent.xmax,b=this._map.extent.ymax,c={},f=this._map.spatialReference,g=new x(this._wkid);this._projectFromSRToSR(f,g,a,e,c)&&(a=c.x,e=c.y);this._projectFromSRToSR(f,
g,d,b,c)&&(d=c.x,b=c.y);a=this._getFeatureRequest.replace(/{xmin}/,a).replace(/{ymin}/,e).replace(/{xmax}/,d).replace(/{ymax}/,b)}e=this._appendCustomParameters(this.getFeatureUrl);v({url:e,handleAs:"text",headers:{"Content-Type":"text/xml"},postData:a},{usePost:!0}).then(this._parseGml,this._errorSupport)}}},_parseGml:function(a){if(this._map&&this._map.spatialReference&&this._map.spatialReference.wkid){var d=(new DOMParser).parseFromString(a,"text/xml");if(a=this._readExceptionReport(d,a))this.onError("WFSLayer: GetFeature - returns exception: "+
a);else this._gmlNS="2.0.0"===this._version?"http://www.opengis.net/gml/3.2":"http://www.opengis.net/gml",""===this._wkid&&(this._wkid=this._map.spatialReference.wkid),this._graphicArray=this._readFeatureMembers(d,this._wkid,2,this._nsLayerNames[this._layerName].namespace,this._layerName),this.fullExtent=this._createFullExtent(this._graphicArray),this.onLabelingInfoChange(),"ondemand"===this._mode.toLowerCase()?this._fireUpdateEnd():this.refresh()}},_limit4326:function(a){for(var d=0;d<a.length;d++){var e=
a[d].geometry;4326===e.spatialReference.wkid&&(e.x=this._limit4326X(e.x),e.y=this._limit4326Y(e.y))}},_limit4326X:function(a){180<=a&&(a=179.99);-180>=a&&(a=-179.99);return a},_limit4326Y:function(a){90<=a&&(a=89.99);-90>=a&&(a=-89.99);return a},_createFullExtent:function(a){for(var d=null,e=0;e<a.length;e++){var b=a[e].geometry,c=null;(c="point"===b.geometryType?new I(b.x,b.y,b.x,b.y,b.spatialReference):b.getExtent())&&(d=null===d?c:d.union(c))}return d},_readExceptionReport:function(a,d){return 0<
a.getElementsByTagNameNS("*","ExceptionReport").length||0<a.getElementsByTagNameNS("*","ServiceExceptionReport").length?d:""},_readFeatureMembers:function(a,d,e,b,c){var f,g,h,k;g=this._readWkidFromNode(a);-1!=g&&(d=g);g=this._readSrsDimension(a);0!==g&&(e=g);var l=[];h=a.getElementsByTagNameNS("*","featureMembers");for(g=0;g<h.length;g++)for(f=h[g],k=f.getElementsByTagNameNS(b,c),0===k.length&&(k=f.getElementsByTagNameNS(null,c)),0===k.length&&(k=f.getElementsByTagNameNS("*",c)),f=0;f<k.length;f++)this._readLayer(l,
k[f],d,e);h=a.getElementsByTagNameNS("*","featureMember");for(g=0;g<h.length;g++)for(f=h[g],k=f.getElementsByTagNameNS(b,c),0===k.length&&(k=f.getElementsByTagNameNS(null,c)),0===k.length&&(k=f.getElementsByTagNameNS("*",c)),f=0;f<k.length;f++)this._readLayer(l,k[f],d,e);h=a.getElementsByTagNameNS("*","member");for(g=0;g<h.length;g++)for(f=h[g],k=f.getElementsByTagNameNS(b,c),0===k.length&&(k=f.getElementsByTagNameNS(null,c)),0===k.length&&(k=f.getElementsByTagNameNS("*",c)),f=0;f<k.length;f++)this._readLayer(l,
k[f],d,e);return l},_readLayer:function(a,d,e,b){var c,f;f=this._readSrsDimension(d);0!==f&&(b=f);var g=d.childNodes,h="",k=null;for(d=0;d<g.length;d++)if(c=g[d],1==c.nodeType&&(f=c.localName,"boundedBy"!==f)){c=this._readGeometry(c,e,b);if(!this._isProjectedOk){this._isProjectedOk=!0;console.error("WFSLayer: could not project geometry.");break}if(null!==c){k=c;h=f;break}}if(k){e={};for(d=0;d<g.length;d++)if(c=g[d],f=c.localName,b=c.textContent,f!==h)for(c=0;c<this.fields.length;c++){var l=this.fields[c];
l.name==f&&(e[f]="esriFieldTypeDouble"===l.type?parseFloat(b,10):"esriFieldTypeInteger"===l.type?parseInt(b,10):b.trim())}this._convertWFSGeometryToGraphicObjects(a,k,e)}},_convertWFSGeometryToGraphicObjects:function(a,d,e){var b;if("point"===d.geometryType&&("esriGeometryPoint"===this.geometryType||"esriGeometryComplex"===this.geometryType))b=new r,d=new E(d),b.setGeometry(d),b.setAttributes(e),a.push(b);else if("multipoint"===d.geometryType&&("esriGeometryPoint"===this.geometryType||"esriGeometryComplex"===
this.geometryType))b=new r,d=new J(d),b.setGeometry(d),b.setAttributes(e),a.push(b);else if("polyline"===d.geometryType&&("esriGeometryPolyline"===this.geometryType||"esriGeometryComplex"===this.geometryType))b=new r,d=new K(d),b.setGeometry(d),b.setAttributes(e),a.push(b);else if("polygon"===d.geometryType&&("esriGeometryPolygon"===this.geometryType||"esriGeometryComplex"===this.geometryType))b=new r,d=new L(d),b.setGeometry(d),b.setAttributes(e),a.push(b);else if("multigeometry"===d.geometryType)for(b=
0;b<d.length;b++)this._convertWFSGeometryToGraphicObjects(a,d[b],e)},_readGeometry:function(a,d,e){var b,c;b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);c=a.getElementsByTagNameNS(this._gmlNS,"MultiSurface");if(1<=c.length)for(b=0;b<c.length;)return this._readMultiSurface(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"MultiCurve");if(1<=c.length){var f=[];for(b=0;b<c.length;b++){var g=this._readMultiCurve(c[b],d,e);for(a=0;a<g.length;a++)f.push(g[a])}return{geometryType:"polyline",
paths:f,spatialReference:{wkid:this._map.spatialReference.wkid}}}c=a.getElementsByTagNameNS(this._gmlNS,"MultiGeometry");for(b=0;b<c.length;)return this._readMultiGeometry(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"Geometry");for(b=0;b<c.length;)return this._readGeometry(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"GeometryCollection");for(b=0;b<c.length;)return this._readGeometryCollection(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"Surface");for(b=0;b<c.length;)return this._readSurface(c[b],
d,e);c=a.getElementsByTagNameNS(this._gmlNS,"Curve");for(b=0;b<c.length;)return this._readCurve(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"MultiPolygon");for(b=0;b<c.length;)return this._readMultiPolygon(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"Polygon");for(b=0;b<c.length;)return this._readPolygon(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"MultiLineString");for(b=0;b<c.length;)return this._readMultiLineString(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"LineString");for(b=
0;b<c.length;){d=this._readLineString(c[b],d,e);e={geometryType:"polyline",paths:[],spatialReference:{wkid:this._map.spatialReference.wkid}};b=[];for(a=0;a<d.length;a++)b.push(d[a]);e.paths.push(b);return e}c=a.getElementsByTagNameNS(this._gmlNS,"LinearRing");for(b=0;b<c.length;)return this._readLinearRing(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"Box");if(1<=c.length)for(b=0;b<c.length;)return this._readBox(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"Envelope");for(b=0;b<c.length;)return this._readEnvelope(c[b],
d,e);c=a.getElementsByTagNameNS(this._gmlNS,"MultiPoint");if(1<=c.length)for(b=0;b<c.length;)return this._readMultiPoint(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"Point");for(b=0;b<c.length;)return this._readPoint(c[b],d,e);return null},_readGeometryCollection:function(a,d,e){var b,c=this._readWkidFromNode(a);-1!=c&&(d=c);c=this._readSrsDimension(a);0!==c&&(e=c);c=[];c.geometryType="multigeometry";c.spatialReference={wkid:this._map.spatialReference.wkid};b=a.getElementsByTagNameNS(this._gmlNS,
"geometryMember");for(a=0;a<b.length;a++){var f=this._readGeometryMember(b[a],d,e);c.push(f)}return c},_readMultiGeometry:function(a,d,e){var b,c=this._readWkidFromNode(a);-1!=c&&(d=c);c=this._readSrsDimension(a);0!==c&&(e=c);c=[];c.geometryType="multigeometry";c.spatialReference={wkid:this._map.spatialReference.wkid};b=a.getElementsByTagNameNS(this._gmlNS,"geometryMember");for(a=0;a<b.length;a++){var f=this._readGeometryMember(b[a],d,e);c.push(f)}return c},_readSurface:function(a,d,e){var b,c;b=
this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);var f=[];f.geometryType="multigeometry";f.spatialReference={wkid:this._map.spatialReference.wkid};c=a.getElementsByTagNameNS(this._gmlNS,"Point");for(b=0;b<c.length;b++)f.push(this._readPoint(c[b],d,e));c=a.getElementsByTagNameNS(this._gmlNS,"patches");for(b=0;b<c.length;b++){a=this._readPatches(c[b],d,e);for(var g=0;g<a.length;g++)f.push(a[g])}return f},_readMultiSurface:function(a,d,e){var b,c,f;b=this._readWkidFromNode(a);
-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);var g=[];g.geometryType="multigeometry";g.spatialReference={wkid:this._map.spatialReference.wkid};f=a.getElementsByTagNameNS(this._gmlNS,"surfaceMember");for(b=0;b<f.length;b++){var h=this._readSurfaceMember(f[b],d,e);for(c=0;c<h.length;c++)g.push(h[c])}f=a.getElementsByTagNameNS(this._gmlNS,"surfaceMembers");for(b=0;b<f.length;b++)for(a=this._readSurfaceMembers(f[b],d,e),c=0;c<a.length;c++)g.push(a[c]);return g},_readCurve:function(a,d,e){var b,
c=this._readWkidFromNode(a);-1!=c&&(d=c);c=this._readSrsDimension(a);0!==c&&(e=c);c={geometryType:"polyline",paths:[],spatialReference:{wkid:this._map.spatialReference.wkid}};b=a.getElementsByTagNameNS(this._gmlNS,"segments");for(a=0;a<b.length;a++)for(var f=this._readSegments(b[a],d,e),g=0;g<f.length;g++)c.paths.push(f[g]);return c},_readSegments:function(a,d,e){var b,c=this._readWkidFromNode(a);-1!=c&&(d=c);c=this._readSrsDimension(a);0!==c&&(e=c);c=[];c.geometryType="multigeometry";c.spatialReference=
{wkid:this._map.spatialReference.wkid};b=a.getElementsByTagNameNS(this._gmlNS,"LineStringSegment");for(a=0;a<b.length;a++){var f=this._readLineStringSegment(b[a],d,e);c.push(f)}return c},_readLineStringSegment:function(a,d,e){var b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);for(a=a.getElementsByTagNameNS(this._gmlNS,"posList");0<a.length;)return this._readPosList(a[0],d,e)},_readMultiCurve:function(a,d,e){var b,c,f,g;b=this._readWkidFromNode(a);-1!=b&&(d=b);b=
this._readSrsDimension(a);0!==b&&(e=b);var h=[];h.spatialReference={wkid:this._map.spatialReference.wkid};f=a.getElementsByTagNameNS(this._gmlNS,"curveMember");for(b=0;b<f.length;b++)for(g=this._readCurveMember(f[b],d,e),c=0;c<g.length;c++)h.push(g[c]);f=a.getElementsByTagNameNS(this._gmlNS,"curveMembers");for(b=0;b<f.length;b++)for(g=this._readCurveMembers(f[b],d,e),c=0;c<g.length;c++)h.push(g[c]);return h},_readGeometryMember:function(a,d,e){var b,c;b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);
0!==b&&(e=b);c=a.getElementsByTagNameNS(this._gmlNS,"Point");for(b=0;b<c.length;)return this._readPoint(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"LineString");for(b=0;b<c.length;){d=this._readLineString(c[b],d,e);e={geometryType:"polyline",paths:[],spatialReference:{wkid:this._map.spatialReference.wkid}};b=[];for(a=0;a<d.length;a++)b.push(d[a]);e.paths.push(b);return e}c=a.getElementsByTagNameNS(this._gmlNS,"Polygon");for(b=0;b<c.length;)return this._readPolygon(c[b],d,e);return null},_readSurfaceMember:function(a,
d,e){var b,c=this._readWkidFromNode(a);-1!=c&&(d=c);c=this._readSrsDimension(a);0!==c&&(e=c);c=[];c.geometryType="multigeometry";c.spatialReference={wkid:this._map.spatialReference.wkid};b=a.getElementsByTagNameNS(this._gmlNS,"Polygon");for(a=0;a<b.length;a++){var f=this._readPolygon(b[a],d,e);c.push(f)}return c},_readSurfaceMembers:function(a,d,e){var b,c=this._readWkidFromNode(a);-1!=c&&(d=c);c=this._readSrsDimension(a);0!==c&&(e=c);c=[];c.geometryType="multigeometry";c.spatialReference={wkid:this._map.spatialReference.wkid};
b=a.getElementsByTagNameNS(this._gmlNS,"Polygon");for(a=0;a<b.length;a++){var f=this._readPolygon(b[a],d,e);c.push(f)}return c},_readCurveMember:function(a,d,e){var b,c=this._readWkidFromNode(a);-1!=c&&(d=c);c=this._readSrsDimension(a);0!==c&&(e=c);c=[];c.geometryType="multigeometry";c.spatialReference={wkid:this._map.spatialReference.wkid};b=a.getElementsByTagNameNS(this._gmlNS,"LineString");for(a=0;a<b.length;a++){var f=this._readLineString(b[a],d,e);c.push(f)}return c},_readCurveMembers:function(a,
d,e){var b,c=this._readWkidFromNode(a);-1!=c&&(d=c);c=this._readSrsDimension(a);0!==c&&(e=c);c=[];c.geometryType="multigeometry";c.spatialReference={wkid:this._map.spatialReference.wkid};b=a.getElementsByTagNameNS(this._gmlNS,"LineString");for(a=0;a<b.length;a++){var f=this._readLineString(b[a],d,e);c.push(f)}return c},_readBox:function(a,d,e){var b,c,f,g,h,k,l,m=this._readWkidFromNode(a);-1!=m&&(d=m);m=this._readSrsDimension(a);0!==m&&(e=m);m={geometryType:"polygon",rings:[],spatialReference:{wkid:this._map.spatialReference.wkid}};
c=a.getElementsByTagNameNS(this._gmlNS,"coordinates");for(b=0;b<c.length;b++)if(f=this._readCoordinates(c[b],d,e))return 1<=f.length&&(g=k=f[0][0],h=l=f[0][1]),1<=f.length&&(k=f[1][0],l=f[1][1]),m.rings.push([[g,h],[g,l],[k,l],[k,h],[g,h]]),m;c=a.getElementsByTagNameNS(this._gmlNS,"coord");return 2<=c.length?((a=this._readCoord(c[0],d,e))&&1<=a.length&&(g=k=a[0][0],h=l=a[0][1]),(d=this._readCoord(c[1],d,e))&&1<=d.length&&(k=d[0][0],l=d[0][1]),m.rings.push([[g,h],[g,l],[k,l],[k,h],[g,h]]),m):null},
_readEnvelope:function(a,d,e){var b,c,f,g;b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);c=a.getElementsByTagNameNS(this._gmlNS,"lowerCorner");for(b=0;b<c.length;b++){var h=this._readCoordinates(c[b],d,e);h&&(f=h[0])}c=a.getElementsByTagNameNS(this._gmlNS,"upperCorner");for(b=0;b<c.length;b++)(a=this._readCoordinates(c[b],d,e))&&(g=a[0]);return f&&g?{geometryType:"polygon",rings:[[[f[0],f[1]],[f[0],g[1]],[g[0],g[1]],[g[0],f[1]],[f[0],f[1]]]],spatialReference:{wkid:this._map.spatialReference.wkid}}:
null},_readPolygon:function(a,d,e){var b,c,f;b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);var g={geometryType:"polygon",rings:[],spatialReference:{wkid:this._map.spatialReference.wkid}};c=a.getElementsByTagNameNS(this._gmlNS,"outerBoundaryIs");for(b=0;b<c.length;b++)f=this._readOuterBoundaryIs(c[b],d,e),g.rings.push(f);c=a.getElementsByTagNameNS(this._gmlNS,"innerBoundaryIs");for(b=0;b<c.length;b++)f=this._readInnerBoundaryIs(c[b],d,e),g.rings.push(f);c=a.getElementsByTagNameNS(this._gmlNS,
"exterior");for(b=0;b<c.length;b++)f=this._readExterior(c[b],d,e),g.rings.push(f);c=a.getElementsByTagNameNS(this._gmlNS,"interior");for(b=0;b<c.length;b++)f=this._readInterior(c[b],d,e),g.rings.push(f);return g},_readPolygonMember:function(a,d,e){var b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);for(a=a.getElementsByTagNameNS(this._gmlNS,"Polygon");0<a.length;)return this._readPolygon(a[0],d,e);return null},_readMultiPolygon:function(a,d,e){var b,c=this._readWkidFromNode(a);
-1!=c&&(d=c);c=this._readSrsDimension(a);0!==c&&(e=c);c=[];c.geometryType="multigeometry";c.spatialReference={wkid:this._map.spatialReference.wkid};b=a.getElementsByTagNameNS(this._gmlNS,"polygonMember");for(a=0;a<b.length;a++){var f=this._readPolygonMember(b[a],d,e);c.push(f)}return c},_readOuterBoundaryIs:function(a,d,e){var b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);for(a=a.getElementsByTagNameNS(this._gmlNS,"LinearRing");0<a.length;)return this._readLinearRing(a[0],
d,e);return null},_readInnerBoundaryIs:function(a,d,e){var b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);for(a=a.getElementsByTagNameNS(this._gmlNS,"LinearRing");0<a.length;)return this._readLinearRing(a[0],d,e);return null},_readExterior:function(a,d,e){var b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);for(a=a.getElementsByTagNameNS(this._gmlNS,"LinearRing");0<a.length;)return this._readLinearRing(a[0],d,e);return null},_readInterior:function(a,
d,e){var b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);for(a=a.getElementsByTagNameNS(this._gmlNS,"LinearRing");0<a.length;)return this._readLinearRing(a[0],d,e);return null},_readPatches:function(a,d,e){var b,c=this._readWkidFromNode(a);-1!=c&&(d=c);c=this._readSrsDimension(a);0!==c&&(e=c);c=[];c.spatialReference={wkid:this._map.spatialReference.wkid};b=a.getElementsByTagNameNS(this._gmlNS,"PolygonPatch");for(a=0;a<b.length;a++)c.push(this._readPolygon(b[a],d,
e));return c},_readLineString:function(a,d,e){var b,c,f,g,h;b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);var k=[];k.spatialReference={wkid:this._map.spatialReference.wkid};f=a.getElementsByTagNameNS(this._gmlNS,"coordinates");for(b=0;b<f.length;b++)if(g=this._readCoordinates(f[b],d,e))for(c=0;c<g.length;c++)h=g[c],k.push(h);f=a.getElementsByTagNameNS(this._gmlNS,"coord");for(b=0;b<f.length;b++)if(g=this._readCoord(f[b],d,e))for(c=0;c<g.length;c++)h=g[c],k.push(h);
f=a.getElementsByTagNameNS(this._gmlNS,"posList");for(b=0;b<f.length;b++)if(g=this._readPosList(f[b],d,e))for(c=0;c<g.length;c++)h=g[c],k.push(h);return k},_readLineStringMember:function(a,d,e){var b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);for(a=a.getElementsByTagNameNS(this._gmlNS,"LineString");0<a.length;)return this._readLineString(a[0],d,e);return null},_readMultiLineString:function(a,d,e){var b,c=this._readWkidFromNode(a);-1!=c&&(d=c);c=this._readSrsDimension(a);
0!==c&&(e=c);c={geometryType:"polyline",paths:[],spatialReference:{wkid:this._map.spatialReference.wkid}};b=a.getElementsByTagNameNS(this._gmlNS,"lineStringMember");for(a=0;a<b.length;a++){var f=this._readLineStringMember(b[a],d,e);f&&c.paths.push(f)}return 1<=c.paths.length?c:null},_readPoint:function(a,d,e){var b,c,f;b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);c=a.getElementsByTagNameNS(this._gmlNS,"coordinates");for(b=0;b<c.length;b++)if(f=this._readCoordinates(c[b],
d,e))return{geometryType:"point",x:f[0][0],y:f[0][1],spatialReference:{wkid:this._map.spatialReference.wkid}};c=a.getElementsByTagNameNS(this._gmlNS,"pos");for(b=0;b<c.length;b++)if((f=this._readPos(c[b],d,e))&&0<f.length)return{geometryType:"point",x:f[0][0],y:f[0][1],spatialReference:{wkid:this._map.spatialReference.wkid}};c=a.getElementsByTagNameNS(this._gmlNS,"coord");for(b=0;b<c.length;b++)if(a=this._readCoord(c[b],d,e))return{geometryType:"point",x:a[0][0],y:a[0][1],spatialReference:{wkid:this._map.spatialReference.wkid}};
return null},_readPointMember:function(a,d,e){var b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);for(a=a.getElementsByTagNameNS(this._gmlNS,"Point");0<a.length;)return this._readPoint(a[0],d,e);return null},_readMultiPoint:function(a,d,e){var b,c=this._readWkidFromNode(a);-1!=c&&(d=c);c=this._readSrsDimension(a);0!==c&&(e=c);c={geometryType:"multipoint",points:[],spatialReference:{wkid:this._map.spatialReference.wkid}};b=a.getElementsByTagNameNS(this._gmlNS,"pointMember");
for(a=0;a<b.length;a++){var f=this._readPointMember(b[a],d,e);f&&c.points.push([f.x,f.y])}return 1<=c.points.length?c:null},_readLinearRing:function(a,d,e){var b,c;b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);c=a.getElementsByTagNameNS(this._gmlNS,"coordinates");for(b=0;b<c.length;)return this._readCoordinates(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,"posList");for(b=0;b<c.length;)return this._readCoordinates(c[b],d,e);c=a.getElementsByTagNameNS(this._gmlNS,
"pos");for(b=0;b<c.length;)return this._readPos(c[b],d,e)},_readCoordinatesBody:function(a,d,e){var b,c=new x(a);d=d.trim();var f,g,h=[];h.spatialReference={wkid:this._map.spatialReference.wkid};a=this._isReverse(a,this.version);if(d)if(2===e){if((d=d.match(/[0123456789.\-\+eE]+/g))&&2<=d.length)for(e=0;e<d.length;e+=2)f=parseFloat(d[e]),g=parseFloat(d[e+1]),a&&(b=g,g=f,f=b),b={},this._projectFromSRToSR(c,this._map.spatialReference,f,g,b)&&(f=b.x,g=b.y),h.push([f,g])}else if(3===e&&(d=d.match(/[0123456789.\-\+eE]+/g))&&
3<=d.length)for(e=0;e<d.length;e+=3)f=parseFloat(d[e]),g=parseFloat(d[e+1]),a&&(b=g,g=f,f=b),b={},this._projectFromSRToSR(c,this._map.spatialReference,f,g,b)&&(f=b.x,g=b.y),h.push([f,g]);return h},_readCoord:function(a,d,e){var b,c,f,g,h=this._readWkidFromNode(a);-1!=h&&(d=h);h=new x(d);f=this._readSrsDimension(a);0!==f&&(e=f);var k=this._isReverse(d,this.version),l=[];l.spatialReference={wkid:this._map.spatialReference.wkid};f=0;c=a.getElementsByTagNameNS(this._gmlNS,"X");for(b=0;b<c.length;){f=
this._readFloat(c[b],d,e);break}g=0;c=a.getElementsByTagNameNS(this._gmlNS,"Y");for(b=0;b<c.length;){g=this._readFloat(c[b],d,e);break}k&&(a=g,g=f,f=a);a={};this._projectFromSRToSR(h,this._map.spatialReference,f,g,a)&&(f=a.x,g=a.y);l.push(k?[g,f]:[f,g]);return l},_readCoordinates:function(a,d,e){var b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);return this._readCoordinatesBody(d,a.textContent,e)},_readPos:function(a,d,e){var b=this._readWkidFromNode(a);-1!=b&&(d=
b);b=this._readSrsDimension(a);0!==b&&(e=b);return this._readCoordinatesBody(d,a.textContent,e)},_readPosList:function(a,d,e){var b=this._readWkidFromNode(a);-1!=b&&(d=b);b=this._readSrsDimension(a);0!==b&&(e=b);return this._readCoordinatesBody(d,a.textContent,e)},_projectFromSRToSR:function(a,d,e,b,c){if(z.canProject(a,d))return a=new E(e,b,a),d=z.project(a,d),c.x=d.x,c.y=d.y,!0;c.x=e;c.y=b;return this._isProjectedOk=!1},_readFloat:function(a){return(a=a.textContent)?parseFloat(a):0},_readSrsDimension:function(a){return a.attributes&&
(a=a.attributes.getNamedItem("srsDimension"))?parseInt(a.value,10):0},_readWkidFromNode:function(a){return a.attributes&&(a=a.attributes.getNamedItem("srsName"))&&(a=a.value.match(/\d+/g))&&0<a.length?(a=parseInt(a[a.length-1],10),84===a&&(a=4326),parseInt(a,10)):-1},_isReverse:function(a,d){return this._inverseResponse},_appendCustomParameters:function(a){if(this.customParameters)for(var d in this.customParameters)a+=(-1===a.indexOf("?")?"?":"\x26")+d+"\x3d"+encodeURIComponent(this.customParameters[d]);
return a}});G("extend-esri")&&n.setObject("layers.WFSLayer",u,H);return u});