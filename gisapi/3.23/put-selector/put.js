//>>built
(function(b){var d,c=/[-+,> ]/;b("put-selector/put",[],d=function(k,b){function q(v){function x(){a&&f&&a!=f&&(f==v&&(w||(w=c.test(g)&&k.createDocumentFragment()))?w:f).insertBefore(a,r||null)}for(var w,b,r,f,a,p=arguments,d=p[0],m=0;m<p.length;m++){var g=p[m];if("object"==typeof g){b=!1;if(g instanceof Array){a=k.createDocumentFragment();for(var n=0;n<g.length;n++)a.appendChild(q(g[n]));g=a}if(g.nodeType)a=g,x(),f=g,r=0;else for(n in g)a[n]=g[n]}else if(b)b=!1,a.appendChild(k.createTextNode(g));
else{1>m&&(v=null);b=!0;if(d=g.replace(z,function(e,h,b,d,l,c){h&&(x(),"-"==h||"+"==h?(f=(r=a||f).parentNode,a=null,"+"==h&&(r=r.nextSibling)):("\x3c"==h?f=a=(a||f).parentNode:(","==h?f=v:a&&(f=a),a=null),r=0),a&&(f=a));if((e=!b&&d)||!a&&(b||l))"$"==e?(e=p[++m],f.appendChild(k.createTextNode(e))):(e=e||q.defaultTag,(h=y&&p[m+1]&&p[m+1].name)&&(e="\x3c"+e+' name\x3d"'+h+'"\x3e'),a=t&&~(u=e.indexOf("|"))?k.createElementNS(t[e.slice(0,u)],e.slice(u+1)):k.createElement(e));if(b)if("$"==d&&(d=p[++m]),
"#"==b)a.id=d;else if(h=(e=a.className)&&(" "+e+" ").replace(" "+d+" "," "),"."==b)a.className=e?(h+d).substring(1):d;else if("!"==g){var n;y?q("div",a,"\x3c").innerHTML="":(n=a.parentNode)&&n.removeChild(a)}else h=h.substring(1,h.length-1),h!=e&&(a.className=h);l&&("$"==c&&(c=p[++m]),"style"==l?a.style.cssText=c:(b="!"==l.charAt(0)?(l=l.substring(1))&&"removeAttribute":"setAttribute",c=""===c?l:c,t&&~(u=l.indexOf("|"))?a[b+"NS"](t[l.slice(0,u)],l.slice(u+1),c):a[b](l,c)));return""}))throw new SyntaxError("Unexpected char "+
d+" in "+g);x();f=d=a||f}}v&&w&&v.appendChild(w);return d}c=b||c;var z=/(?:\s*([-+ ,<>]))?\s*(\.|!\.?|#)?([-\w\u00A0-\uFFFF%$|]+)?(?:\[([^\]=]+)=?['"]?([^\]'"]*)['"]?\])?/g,u,t=!1;k=k||document;var y="object"==typeof k.createElement;q.addNamespace=function(b,c){k.createElementNS?(t||(t={}))[b]=c:k.namespaces.add(b,c)};q.defaultTag="div";q.forDocument=d;return q})})(function(b,d,c){c=c||d;"function"===typeof define?define([],function(){return c()}):"undefined"==typeof window?require("./node-html")(module,
c):put=c()});