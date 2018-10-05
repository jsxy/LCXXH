// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/arcgis/distribution/templates/OrderingProcessElements.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n    \r\n  \x3c!-- fees --\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n    data-dojo-props\x3d"target:\'resFees\',minOccurs:0,label:\'${i18nArcGIS.distInfo.distorOrdPrc.resFees}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputText"\x3e\x3c/div\x3e\r\n    \x3cdiv style\x3d"margin-top:8px;"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Attribute"\r\n      data-dojo-props\x3d"target:\'units\',minOccurs:0,label:\'${i18nArcGIS.codelist.MonetaryUnits}\'"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputSelectCode"\r\n        data-dojo-props\x3d"codelistType:\'MonetaryUnits\',emptyLabel:\'${i18nArcGIS.codelist.MonetaryUnits_empty}\'"\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e      \r\n  \x3c/div\x3e\r\n  \r\n  \x3c!-- available date --\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n    data-dojo-props\x3d"target:\'planAvDtTm\',minOccurs:0,label:\'${i18nArcGIS.distInfo.distorOrdPrc.planAvDtTm}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputDate" data-dojo-props\x3d"allowTime:true"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \r\n  \x3c!-- available date period--\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n    data-dojo-props\x3d"target:\'planAvTmPd\',minOccurs:0,label:\'${i18nArcGIS.distInfo.distorOrdPrc.planAvTmPd.caption}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'tmBegin\',minOccurs:0,label:\'${i18nArcGIS.distInfo.distorOrdPrc.planAvTmPd.tmBegin}\'"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputDate" data-dojo-props\x3d"allowTime:true"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n      data-dojo-props\x3d"target:\'tmEnd\',minOccurs:0,label:\'${i18nArcGIS.distInfo.distorOrdPrc.planAvTmPd.tmEnd}\'"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputDate" data-dojo-props\x3d"allowTime:true"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \r\n  \x3c!-- instructions --\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n    data-dojo-props\x3d"target:\'ordInstr\',minOccurs:0,label:\'${i18nArcGIS.distInfo.distorOrdPrc.ordInstr}\'"\x3e\r\n  \x3c/div\x3e\r\n  \r\n  \x3c!--  turnaround --\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n    data-dojo-props\x3d"target:\'ordTurn\',minOccurs:0,label:\'${i18nArcGIS.distInfo.distorOrdPrc.ordTurn}\'"\x3e\r\n  \x3c/div\x3e\r\n        \r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/arcgis/distribution/OrderingProcessElements","dojo/_base/declare dojo/_base/lang dojo/has ../../../../../kernel ../../../base/Descriptor dojo/text!./templates/OrderingProcessElements.html".split(" "),function(a,b,c,d,e,f){a=a(e,{templateString:f});c("extend-esri")&&b.setObject("dijit.metadata.types.arcgis.distribution.OrderingProcessElements",a,d);return a});