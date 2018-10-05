// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/reportContainers/containerUtils/QueryUtil",["esri/dijit/geoenrichment/utils/ArrayUtil"],function(g){var e={getReportElements:function(b,d){for(var a=[],c=0;c<b.stackContainer.children.length;c++){var e=b.stackContainer.children[c];b.getElementParams(e,"isReportElement")&&a.push(e)}return d?a.filter(function(a){return(a=b.getElementSection(a))&&!!a[d]}):a},collectFieldInfos:function(b,d){var a=[];e.getReportElements(b,"collectFieldInfos").some(function(c){(c=
b.getElementSection(c).collectFieldInfos(d))&&(a=a.concat(c))});return a},findLastContentElementBeforeFooter:function(b){var d;e.getReportElements(b).forEach(function(a){var c=b.getElementSection(a);!c||c.isEmpty()||c.isPageFooter()||(d=a)});return d},getSectionPositionInfo:function(b,d){var a=0,c;e.getReportElements(b).some(function(e){if(b.getElementSection(e)===d)return c=e,!0;a++});return{reportElement:c,index:c&&a}},getElementIndex:function(b,d){return e.getReportElements(b).indexOf(d)},getReportElementBySectionIndex:function(b,
d){return e.getReportElements(b)[d]},getSectionsByType:function(b,d){var a=[];e.getReportElements(b,"getSectionType").forEach(function(c){(c=b.getElementSection(c))&&c.getSectionType()===d&&a.push(c)});return a},getSectionsByTypes:function(b,d){var a=[];d.forEach(function(c){a=a.concat(e.getSectionsByType(b,c))});return g.removeDuplicates(a)},getReportElementTable:function(b,d){var a=b.getElementSection(d);return a&&a.getLastTable&&a.getLastTable()},getReportElementByTable:function(b,d){var a;e.getReportElements(b).some(function(c){if(e.getReportElementTable(b,
c)===d)return a=c,!0});return a},getTableAbove:function(b,d){var a,c;e.getReportElements(b).some(function(f){if(e.getReportElementTable(b,f)===d)return c=e.getReportElementTable(b,a),!0;a=f});return c}};return e});