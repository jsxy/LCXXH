// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/htmlToSvg/supportClasses/SVGBuilder",["./VisualsCollector","./EncodeUtil"],function(k,g){return{buildSVG:function(e,l,b){(function(){var a=k.getNodeVisuals(l),d=[],c=b.fitParams.w||a.box.w,f=b.fitParams.h||a.box.h,g=("left"===b.fitParams.hAlign?"xMin":"right"===b.fitParams.hAlign?"xMax":"xMid")+("top"===b.fitParams.vAlign?"YMin":"bottom"===b.fitParams.vAlign?"YMax":"YMid")+" meet";if(b.autoTrimHeight&&"top"===b.fitParams.vAlign){var h=a.box.h/Math.max(a.box.w/
c,a.box.h/f);h<f&&(f=h)}d.push('\x3csvg version\x3d"1.1" xmlns\x3d"http://www.w3.org/2000/svg" xmlns:xlink\x3d"http://www.w3.org/1999/xlink" x\x3d"'+Math.round(100*a.box.x)/100+'px" y\x3d"'+Math.round(100*a.box.y)/100+'px" width\x3d"'+Math.round(100*c)/100+'px" height\x3d"'+Math.round(100*f)/100+'px" viewBox\x3d"0 0 '+a.box.w+" "+a.box.h+'" xml:space\x3d"preserve" preserveAspectRatio\x3d"'+g+'"\x3e');b&&b.definitions&&b.definitions.length&&(d.push("\x3cdefs\x3e"),b.definitions.forEach(function(a){d.push(a)}),
d.push("\x3c/defs\x3e"));e=d.concat(e)})();e.push("\x3c/svg\x3e");var c="";e.forEach(function(a){c="string"===typeof a?c+a:c+a.text});return g.encodeXML(c)}}});