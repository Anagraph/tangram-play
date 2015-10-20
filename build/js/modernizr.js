/*! modernizr 3.1.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-fullscreen-webgl-prefixed-cssclassprefix:mod- !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,s,l;for(var a in y){if(e=[],n=y[a],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],l=s.split("."),1===l.length?Modernizr[l[0]]=o:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=o),g.push((o?"":"no-")+l.join("-"))}}function i(e,n){return!!~(""+e).indexOf(n)}function s(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):S?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(){var e=n.body;return e||(e=s(S?"svg":"body"),e.fake=!0),e}function a(e,t,r,o){var i,a,f,u,p="modernizr",d=s("div"),c=l();if(parseInt(r,10))for(;r--;)f=s("div"),f.id=o?o[r]:p+(r+1),d.appendChild(f);return i=s("style"),i.type="text/css",i.id="s"+p,(c.fake?c:d).appendChild(i),c.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),d.id=p,c.fake&&(c.style.background="",c.style.overflow="hidden",u=w.style.overflow,w.style.overflow="hidden",w.appendChild(c)),a=t(d,e),c.fake?(c.parentNode.removeChild(c),w.style.overflow=u,w.offsetHeight):d.parentNode.removeChild(d),!!a}function f(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function u(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(f(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+f(n[o])+":"+r+")");return i=i.join(" or "),a("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function p(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function d(e,n,o,l){function a(){d&&(delete b.style,delete b.modElem)}if(l=r(l,"undefined")?!1:l,!r(o,"undefined")){var f=u(e,o);if(!r(f,"undefined"))return f}for(var d,c,m,v,y,h=["modernizr","tspan"];!b.style;)d=!0,b.modElem=s(h.shift()),b.style=b.modElem.style;for(m=e.length,c=0;m>c;c++)if(v=e[c],y=b.style[v],i(v,"-")&&(v=p(v)),b.style[v]!==t){if(l||r(o,"undefined"))return a(),"pfx"==n?v:!0;try{b.style[v]=o}catch(g){}if(b.style[v]!=y)return a(),"pfx"==n?v:!0}return a(),!1}function c(e,n){return function(){return e.apply(n,arguments)}}function m(e,n,t){var o;for(var i in e)if(e[i]in n)return t===!1?e[i]:(o=n[e[i]],r(o,"function")?c(o,t||n):o);return!1}function v(e,n,t,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),l=(e+" "+x.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?d(l,n,o,i):(l=(e+" "+E.join(s+" ")+s).split(" "),m(l,n,t))}var y=[],h={_version:"3.1.0",_config:{classPrefix:"mod-",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){y.push({name:e,fn:n,options:t})},addAsyncTest:function(e){y.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=h,Modernizr=new Modernizr;var g=[],C="Moz O ms Webkit",x=h._config.usePrefixes?C.split(" "):[];h._cssomPrefixes=x;var w=n.documentElement,S="svg"===w.nodeName.toLowerCase(),_={elem:s("modernizr")};Modernizr._q.push(function(){delete _.elem});var b={style:_.elem.style};Modernizr._q.unshift(function(){delete b.style});var E=h._config.usePrefixes?C.toLowerCase().split(" "):[];h._domPrefixes=E,h.testAllProps=v;var z=function(n){var r,o=prefixes.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var s=0;o>s;s++){var l=prefixes[s],a=l.toUpperCase()+"_"+r;if(a in i)return"@-"+l.toLowerCase()+"-"+n}return!1};h.atRule=z;var T=h.prefixed=function(e,n,t){return 0===e.indexOf("@")?z(e):(-1!=e.indexOf("-")&&(e=p(e)),n?v(e,n,t):v(e,"pfx"))};Modernizr.addTest("fullscreen",!(!T("exitFullscreen",n,!1)&&!T("cancelFullScreen",n,!1))),Modernizr.addTest("webgl",function(){var n=s("canvas"),t="probablySupportsContext"in n?"probablySupportsContext":"supportsContext";return t in n?n[t]("webgl")||n[t]("experimental-webgl"):"WebGLRenderingContext"in e}),o(),delete h.addTest,delete h.addAsyncTest;for(var L=0;L<Modernizr._q.length;L++)Modernizr._q[L]();e.Modernizr=Modernizr}(window,document);