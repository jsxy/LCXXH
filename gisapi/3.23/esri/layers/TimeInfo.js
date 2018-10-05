// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/TimeInfo","dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../TimeExtent ./TimeReference ./LayerTimeOptions".split(" "),function(b,c,d,e,f,g,h){b=b(null,{declaredClass:"esri.layers.TimeInfo",constructor:function(a){null!==a&&(c.mixin(this,a),a.exportOptions&&(this.exportOptions=new h(a.exportOptions)),this.timeExtent=null,a.timeExtent&&2===a.timeExtent.length&&(this.timeExtent=new f(a.timeExtent)),this.timeReference=new g(a.timeReference))}});c.mixin(b,{UNIT_CENTURIES:"esriTimeUnitsCenturies",
UNIT_DAYS:"esriTimeUnitsDays",UNIT_DECADES:"esriTimeUnitsDecades",UNIT_HOURS:"esriTimeUnitsHours",UNIT_MILLISECONDS:"esriTimeUnitsMilliseconds",UNIT_MINUTES:"esriTimeUnitsMinutes",UNIT_MONTHS:"esriTimeUnitsMonths",UNIT_SECONDS:"esriTimeUnitsSeconds",UNIT_UNKNOWN:"esriTimeUnitsUnknown",UNIT_WEEKS:"esriTimeUnitsWeeks",UNIT_YEARS:"esriTimeUnitsYears"});d("extend-esri")&&c.setObject("layers.TimeInfo",b,e);return b});