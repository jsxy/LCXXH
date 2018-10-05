// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/Feature",["require","exports","../2d/engine/webgl/Geometry"],function(m,n,k){return function(){function l(a,c){this.values={};for(var g=c.keys,b=c.values;a.next();)switch(a.tag()){case 1:this.id=a.getUInt64();break;case 2:for(var h=a.getMessage(),f=this.values;!h.empty();){var d=h.getUInt32(),e=h.getUInt32();f[g[d]]=b[e]}break;case 3:this.type=a.getUInt32();break;case 4:this._pbfGeometry=a.getMessage();break;default:a.skip()}}l.prototype.getGeometry=
function(a){if(void 0!==this._geometry)return this._geometry;var c=this._pbfGeometry,g,b;a?a.reset(this.type):g=[];for(var h=1,f=0,d=0,e=0;!c.empty();)switch(0===f&&(f=c.getUInt32(),h=f&7,f>>=3),f--,h){case 1:d+=c.getSInt32();e+=c.getSInt32();a?a.moveTo(d,e):(b&&g.push(b),b=[],b.push(new k.Point(d,e)));break;case 2:d+=c.getSInt32();e+=c.getSInt32();a?a.lineTo(d,e):b.push(new k.Point(d,e));break;case 7:a?a.close():b&&!b[0].equals(d,e)&&b.push(b[0].clone());break;default:throw Error("Invalid path operation");
}a?a=a.result():(b&&g.push(b),a=g);return this._geometry=a};return l}()});