// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/libs/gl-matrix/vec2",["./common"],function(e){var d={create:function(){var a=new e.ARRAY_TYPE(2);a[0]=0;a[1]=0;return a},clone:function(a){var b=new e.ARRAY_TYPE(2);b[0]=a[0];b[1]=a[1];return b},fromValues:function(a,b){var c=new e.ARRAY_TYPE(2);c[0]=a;c[1]=b;return c},copy:function(a,b){a[0]=b[0];a[1]=b[1];return a},set:function(a,b,c){a[0]=b;a[1]=c;return a},add:function(a,b,c){a[0]=b[0]+c[0];a[1]=b[1]+c[1];return a},subtract:function(a,b,c){a[0]=b[0]-c[0];a[1]=
b[1]-c[1];return a}};d.sub=d.subtract;d.multiply=function(a,b,c){a[0]=b[0]*c[0];a[1]=b[1]*c[1];return a};d.mul=d.multiply;d.divide=function(a,b,c){a[0]=b[0]/c[0];a[1]=b[1]/c[1];return a};d.div=d.divide;d.ceil=function(a,b){a[0]=Math.ceil(b[0]);a[1]=Math.ceil(b[1]);return a};d.floor=function(a,b){a[0]=Math.floor(b[0]);a[1]=Math.floor(b[1]);return a};d.min=function(a,b,c){a[0]=Math.min(b[0],c[0]);a[1]=Math.min(b[1],c[1]);return a};d.max=function(a,b,c){a[0]=Math.max(b[0],c[0]);a[1]=Math.max(b[1],c[1]);
return a};d.round=function(a,b){a[0]=Math.round(b[0]);a[1]=Math.round(b[1]);return a};d.scale=function(a,b,c){a[0]=b[0]*c;a[1]=b[1]*c;return a};d.scaleAndAdd=function(a,b,c,d){a[0]=b[0]+c[0]*d;a[1]=b[1]+c[1]*d;return a};d.distance=function(a,b){var c=b[0]-a[0],d=b[1]-a[1];return Math.sqrt(c*c+d*d)};d.dist=d.distance;d.squaredDistance=function(a,b){var c=b[0]-a[0],d=b[1]-a[1];return c*c+d*d};d.sqrDist=d.squaredDistance;d.length=function(a){var b=a[0];a=a[1];return Math.sqrt(b*b+a*a)};d.len=d.length;
d.squaredLength=function(a){var b=a[0];a=a[1];return b*b+a*a};d.sqrLen=d.squaredLength;d.negate=function(a,b){a[0]=-b[0];a[1]=-b[1];return a};d.inverse=function(a,b){a[0]=1/b[0];a[1]=1/b[1];return a};d.normalize=function(a,b){var c=b[0],d=b[1],c=c*c+d*d;0<c&&(c=1/Math.sqrt(c),a[0]=b[0]*c,a[1]=b[1]*c);return a};d.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]};d.cross=function(a,b,c){b=b[0]*c[1]-b[1]*c[0];a[0]=a[1]=0;a[2]=b;return a};d.lerp=function(a,b,c,d){var g=b[0];b=b[1];a[0]=g+d*(c[0]-g);a[1]=
b+d*(c[1]-b);return a};d.random=function(a,b){b=b||1;var c=2*e.RANDOM()*Math.PI;a[0]=Math.cos(c)*b;a[1]=Math.sin(c)*b;return a};d.transformMat2=function(a,b,c){var d=b[0];b=b[1];a[0]=c[0]*d+c[2]*b;a[1]=c[1]*d+c[3]*b;return a};d.transformMat2d=function(a,b,c){var d=b[0];b=b[1];a[0]=c[0]*d+c[2]*b+c[4];a[1]=c[1]*d+c[3]*b+c[5];return a};d.transformMat3=function(a,b,c){var d=b[0];b=b[1];a[0]=c[0]*d+c[3]*b+c[6];a[1]=c[1]*d+c[4]*b+c[7];return a};d.transformMat4=function(a,b,c){var d=b[0];b=b[1];a[0]=c[0]*
d+c[4]*b+c[12];a[1]=c[1]*d+c[5]*b+c[13];return a};d.forEach=function(){var a=d.create();return function(b,c,d,f,e,k){c||(c=2);d||(d=0);for(f=f?Math.min(f*c+d,b.length):b.length;d<f;d+=c)a[0]=b[d],a[1]=b[d+1],e(a,a,k),b[d]=a[0],b[d+1]=a[1];return b}}();d.str=function(a){return"vec2("+a[0]+", "+a[1]+")"};d.exactEquals=function(a,b){return a[0]===b[0]&&a[1]===b[1]};d.equals=function(a,b){var c=a[0],d=a[1],f=b[0],h=b[1];return Math.abs(c-f)<=e.EPSILON*Math.max(1,Math.abs(c),Math.abs(f))&&Math.abs(d-h)<=
e.EPSILON*Math.max(1,Math.abs(d),Math.abs(h))};return d});