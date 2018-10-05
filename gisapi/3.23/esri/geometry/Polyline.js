// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/geometry/Polyline","dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/has ../kernel ../lang ../SpatialReference ./Geometry ./Point ./Extent ../srUtils".split(" "),function(d,l,c,A,z,B,E,C,h,y,D){var k={type:"polyline",paths:null};d=d(C,{declaredClass:"esri.geometry.Polyline",constructor:function(a){c.mixin(this,k);this.paths=[];this._path=0;a&&(c.isArray(a)?this.paths=c.isArray(a[0][0])?a:[a]:a.paths?c.mixin(this,a):this.spatialReference=a,this.spatialReference&&(this.spatialReference=
D.createSpatialReference(this.spatialReference)));this.verifySR()},addPath:function(a){this.clearCache();this._path=this.paths.length;this.paths[this._path]=[];c.isArray(a[0])?l.forEach(a,this._addPointArr,this):l.forEach(a,this._addPoint,this);return this},_addPointArr:function(a){this.paths[this._path].push(a)},_addPoint:function(a){this.paths[this._path].push([a.x,a.y])},_insertPoints:function(a,b){this.clearCache();this._path=b;this.paths[this._path]||(this.paths[this._path]=[]);l.forEach(a,this._addPoint,
this)},_validateInputs:function(a,b){return null!==a&&void 0!==a&&(0>a||a>=this.paths.length)||null!==b&&void 0!==a&&(0>b||b>=this.paths[a].length)?!1:!0},getPoint:function(a,b){if(this._validateInputs(a,b))return new h(this.paths[a][b],this.spatialReference)},setPoint:function(a,b,e){if(this._validateInputs(a,b))return this.clearCache(),this.paths[a][b]=[e.x,e.y],this},insertPoint:function(a,b,e){if(this._validateInputs(a)&&B.isDefined(b)&&0<=b&&b<=this.paths[a].length)return this.clearCache(),this.paths[a].splice(b,
0,[e.x,e.y]),this},removePath:function(a){if(this._validateInputs(a,null)){this.clearCache();a=this.paths.splice(a,1)[0];var b,e=a.length,f=this.spatialReference;for(b=0;b<e;b++)a[b]=new h(a[b],f);return a}},removePoint:function(a,b){if(this._validateInputs(a,b))return this.clearCache(),new h(this.paths[a].splice(b,1)[0],this.spatialReference)},getExtent:function(){var a;a=this.getCacheValue("_extent");var b=this.getCacheValue("_partwise");if(a)return a=new y(a),a._partwise=b,a;a=this.paths;var e=
a.length;if(e&&a[0].length){var f,g,c,d,m,n,p,l,h=d=a[0][0][0],k=m=a[0][0][1],q=Math.min,r=Math.max,t=this.spatialReference,b=[],u,v,w,x;for(n=0;n<e;n++){f=a[n];u=v=f[0]&&f[0][0];w=x=f[0]&&f[0][1];l=f.length;for(p=0;p<l;p++)g=f[p],c=g[0],g=g[1],h=q(h,c),k=q(k,g),d=r(d,c),m=r(m,g),u=q(u,c),w=q(w,g),v=r(v,c),x=r(x,g);b.push(new y({xmin:u,ymin:w,xmax:v,ymax:x,spatialReference:t?t.toJson():null}))}a={xmin:h,ymin:k,xmax:d,ymax:m,spatialReference:t?t.toJson():null};b=1<b.length?b:null;this.setCacheValue("_extent",
a);this.setCacheValue("_partwise",b);a=new y(a);a._partwise=b;return a}},toJson:function(){var a={paths:c.clone(this.paths)},b=this.spatialReference;b&&(a.spatialReference=b.toJson());return a}});d.defaultProps=k;A("extend-esri")&&(c.setObject("geometry.Polyline",d,z),z.geometry.defaultPolyline=k);return d});