(()=>{var K={358:b=>{var w=Object.prototype.toString,M=typeof Buffer<"u"&&typeof Buffer.alloc=="function"&&typeof Buffer.allocUnsafe=="function"&&typeof Buffer.from=="function";function A(S){return w.call(S).slice(8,-1)==="ArrayBuffer"}function u(S,l,i){l>>>=0;var f=S.byteLength-l;if(f<0)throw new RangeError("'offset' is out of bounds");if(i===void 0)i=f;else if(i>>>=0,i>f)throw new RangeError("'length' is out of bounds");return M?Buffer.from(S.slice(l,l+i)):new Buffer(new Uint8Array(S.slice(l,l+i)))}function p(S,l){if((typeof l!="string"||l==="")&&(l="utf8"),!Buffer.isEncoding(l))throw new TypeError('"encoding" must be a valid string encoding');return M?Buffer.from(S,l):new Buffer(S,l)}function L(S,l,i){if(typeof S=="number")throw new TypeError('"value" argument must not be a number');return A(S)?u(S,l,i):typeof S=="string"?p(S,l):M?Buffer.from(S):new Buffer(S)}b.exports=L},49:(b,w,M)=>{M(685).install()},685:(b,w,M)=>{b=M.nmd(b);var A=M(461).SourceMapConsumer,u=M(17),p;try{p=M(147),(!p.existsSync||!p.readFileSync)&&(p=null)}catch{}var L=M(358);function S(h,m){return h.require(m)}var l=!1,i=!1,f=!1,d="auto",t={},s={},n=/^data:application\/json[^,]+base64,/,a=[],o=[];function c(){return d==="browser"?!0:d==="node"?!1:typeof window<"u"&&typeof XMLHttpRequest=="function"&&!(window.require&&window.module&&window.process&&window.process.type==="renderer")}function v(){return typeof process=="object"&&process!==null&&typeof process.on=="function"}function _(){return typeof process=="object"&&process!==null?process.version:""}function C(){if(typeof process=="object"&&process!==null)return process.stderr}function e(h){if(typeof process=="object"&&process!==null&&typeof process.exit=="function")return process.exit(h)}function r(h){return function(m){for(var E=0;E<h.length;E++){var R=h[E](m);if(R)return R}return null}}var g=r(a);a.push(function(h){if(h=h.trim(),/^file:/.test(h)&&(h=h.replace(/file:\/\/\/(\w:)?/,function(R,N){return N?"":"/"})),h in t)return t[h];var m="";try{if(p)p.existsSync(h)&&(m=p.readFileSync(h,"utf8"));else{var E=new XMLHttpRequest;E.open("GET",h,!1),E.send(null),E.readyState===4&&E.status===200&&(m=E.responseText)}}catch{}return t[h]=m});function y(h,m){if(!h)return m;var E=u.dirname(h),R=/^\w+:\/\/[^\/]*/.exec(E),N=R?R[0]:"",O=E.slice(N.length);return N&&/^\/\w\:/.test(O)?(N+="/",N+u.resolve(E.slice(N.length),m).replace(/\\/g,"/")):N+u.resolve(E.slice(N.length),m)}function T(h){var m;if(c())try{var E=new XMLHttpRequest;E.open("GET",h,!1),E.send(null),m=E.readyState===4?E.responseText:null;var R=E.getResponseHeader("SourceMap")||E.getResponseHeader("X-SourceMap");if(R)return R}catch{}m=g(h);for(var N=/(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/mg,O,I;I=N.exec(m);)O=I;return O?O[1]:null}var G=r(o);o.push(function(h){var m=T(h);if(!m)return null;var E;if(n.test(m)){var R=m.slice(m.indexOf(",")+1);E=L(R,"base64").toString(),m=h}else m=y(h,m),E=g(m);return E?{url:m,map:E}:null});function F(h){var m=s[h.source];if(!m){var E=G(h.source);E?(m=s[h.source]={url:E.url,map:new A(E.map)},m.map.sourcesContent&&m.map.sources.forEach(function(N,O){var I=m.map.sourcesContent[O];if(I){var B=y(m.url,N);t[B]=I}})):m=s[h.source]={url:null,map:null}}if(m&&m.map&&typeof m.map.originalPositionFor=="function"){var R=m.map.originalPositionFor(h);if(R.source!==null)return R.source=y(m.url,R.source),R}return h}function P(h){var m=/^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(h);if(m){var E=F({source:m[2],line:+m[3],column:m[4]-1});return"eval at "+m[1]+" ("+E.source+":"+E.line+":"+(E.column+1)+")"}return m=/^eval at ([^(]+) \((.+)\)$/.exec(h),m?"eval at "+m[1]+" ("+P(m[2])+")":h}function q(){var h,m="";if(this.isNative())m="native";else{h=this.getScriptNameOrSourceURL(),!h&&this.isEval()&&(m=this.getEvalOrigin(),m+=", "),h?m+=h:m+="<anonymous>";var E=this.getLineNumber();if(E!=null){m+=":"+E;var R=this.getColumnNumber();R&&(m+=":"+R)}}var N="",O=this.getFunctionName(),I=!0,B=this.isConstructor(),z=!(this.isToplevel()||B);if(z){var D=this.getTypeName();D==="[object Object]"&&(D="null");var k=this.getMethodName();O?(D&&O.indexOf(D)!=0&&(N+=D+"."),N+=O,k&&O.indexOf("."+k)!=O.length-k.length-1&&(N+=" [as "+k+"]")):N+=D+"."+(k||"<anonymous>")}else B?N+="new "+(O||"<anonymous>"):O?N+=O:(N+=m,I=!1);return I&&(N+=" ("+m+")"),N}function x(h){var m={};return Object.getOwnPropertyNames(Object.getPrototypeOf(h)).forEach(function(E){m[E]=/^(?:is|get)/.test(E)?function(){return h[E].call(h)}:h[E]}),m.toString=q,m}function U(h,m){if(m===void 0&&(m={nextPosition:null,curPosition:null}),h.isNative())return m.curPosition=null,h;var E=h.getFileName()||h.getScriptNameOrSourceURL();if(E){var R=h.getLineNumber(),N=h.getColumnNumber()-1,O=/^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/,I=O.test(_())?0:62;R===1&&N>I&&!c()&&!h.isEval()&&(N-=I);var B=F({source:E,line:R,column:N});m.curPosition=B,h=x(h);var z=h.getFunctionName;return h.getFunctionName=function(){return m.nextPosition==null?z():m.nextPosition.name||z()},h.getFileName=function(){return B.source},h.getLineNumber=function(){return B.line},h.getColumnNumber=function(){return B.column+1},h.getScriptNameOrSourceURL=function(){return B.source},h}var D=h.isEval()&&h.getEvalOrigin();return D&&(D=P(D),h=x(h),h.getEvalOrigin=function(){return D}),h}function V(h,m){f&&(t={},s={});for(var E=h.name||"Error",R=h.message||"",N=E+": "+R,O={nextPosition:null,curPosition:null},I=[],B=m.length-1;B>=0;B--)I.push(`
    at `+U(m[B],O)),O.nextPosition=O.curPosition;return O.curPosition=O.nextPosition=null,N+I.reverse().join("")}function X(h){var m=/\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(h.stack);if(m){var E=m[1],R=+m[2],N=+m[3],O=t[E];if(!O&&p&&p.existsSync(E))try{O=p.readFileSync(E,"utf8")}catch{O=""}if(O){var I=O.split(/(?:\r\n|\r|\n)/)[R-1];if(I)return E+":"+R+`
`+I+`
`+new Array(N).join(" ")+"^"}}return null}function Z(h){var m=X(h),E=C();E&&E._handle&&E._handle.setBlocking&&E._handle.setBlocking(!0),m&&(console.error(),console.error(m)),console.error(h.stack),e(1)}function H(){var h=process.emit;process.emit=function(m){if(m==="uncaughtException"){var E=arguments[1]&&arguments[1].stack,R=this.listeners(m).length>0;if(E&&!R)return Z(arguments[1])}return h.apply(this,arguments)}}var Y=a.slice(0),ee=o.slice(0);w.wrapCallSite=U,w.getErrorSource=X,w.mapSourcePosition=F,w.retrieveSourceMap=G,w.install=function(h){if(h=h||{},h.environment&&(d=h.environment,["node","browser","auto"].indexOf(d)===-1))throw new Error("environment "+d+" was unknown. Available options are {auto, browser, node}");if(h.retrieveFile&&(h.overrideRetrieveFile&&(a.length=0),a.unshift(h.retrieveFile)),h.retrieveSourceMap&&(h.overrideRetrieveSourceMap&&(o.length=0),o.unshift(h.retrieveSourceMap)),h.hookRequire&&!c()){var m=S(b,"module"),E=m.prototype._compile;E.__sourceMapSupport||(m.prototype._compile=function(O,I){return t[I]=O,s[I]=void 0,E.call(this,O,I)},m.prototype._compile.__sourceMapSupport=!0)}if(f||(f="emptyCacheBetweenOperations"in h?h.emptyCacheBetweenOperations:!1),l||(l=!0,Error.prepareStackTrace=V),!i){var R="handleUncaughtExceptions"in h?h.handleUncaughtExceptions:!0;try{var N=S(b,"worker_threads");N.isMainThread===!1&&(R=!1)}catch{}R&&v()&&(i=!0,H())}},w.resetRetrieveHandlers=function(){a.length=0,o.length=0,a=Y.slice(0),o=ee.slice(0),G=r(o),g=r(a)}},668:(b,w,M)=>{var A=M(930),u=Object.prototype.hasOwnProperty,p=typeof Map<"u";function L(){this._array=[],this._set=p?new Map:Object.create(null)}L.fromArray=function(l,i){for(var f=new L,d=0,t=l.length;d<t;d++)f.add(l[d],i);return f},L.prototype.size=function(){return p?this._set.size:Object.getOwnPropertyNames(this._set).length},L.prototype.add=function(l,i){var f=p?l:A.toSetString(l),d=p?this.has(l):u.call(this._set,f),t=this._array.length;(!d||i)&&this._array.push(l),d||(p?this._set.set(l,t):this._set[f]=t)},L.prototype.has=function(l){if(p)return this._set.has(l);var i=A.toSetString(l);return u.call(this._set,i)},L.prototype.indexOf=function(l){if(p){var i=this._set.get(l);if(i>=0)return i}else{var f=A.toSetString(l);if(u.call(this._set,f))return this._set[f]}throw new Error('"'+l+'" is not in the set.')},L.prototype.at=function(l){if(l>=0&&l<this._array.length)return this._array[l];throw new Error("No element indexed by "+l)},L.prototype.toArray=function(){return this._array.slice()},w.I=L},158:(b,w,M)=>{var A=M(977),u=5,p=1<<u,L=p-1,S=p;function l(f){return f<0?(-f<<1)+1:(f<<1)+0}function i(f){var d=(f&1)===1,t=f>>1;return d?-t:t}w.encode=function(d){var t="",s,n=l(d);do s=n&L,n>>>=u,n>0&&(s|=S),t+=A.encode(s);while(n>0);return t},w.decode=function(d,t,s){var n=d.length,a=0,o=0,c,v;do{if(t>=n)throw new Error("Expected more digits in base 64 VLQ value.");if(v=A.decode(d.charCodeAt(t++)),v===-1)throw new Error("Invalid base64 digit: "+d.charAt(t-1));c=!!(v&S),v&=L,a=a+(v<<o),o+=u}while(c);s.value=i(a),s.rest=t}},977:(b,w)=>{var M="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");w.encode=function(A){if(0<=A&&A<M.length)return M[A];throw new TypeError("Must be between 0 and 63: "+A)},w.decode=function(A){var u=65,p=90,L=97,S=122,l=48,i=57,f=43,d=47,t=26,s=52;return u<=A&&A<=p?A-u:L<=A&&A<=S?A-L+t:l<=A&&A<=i?A-l+s:A==f?62:A==d?63:-1}},63:(b,w)=>{w.GREATEST_LOWER_BOUND=1,w.LEAST_UPPER_BOUND=2;function M(A,u,p,L,S,l){var i=Math.floor((u-A)/2)+A,f=S(p,L[i],!0);return f===0?i:f>0?u-i>1?M(i,u,p,L,S,l):l==w.LEAST_UPPER_BOUND?u<L.length?u:-1:i:i-A>1?M(A,i,p,L,S,l):l==w.LEAST_UPPER_BOUND?i:A<0?-1:A}w.search=function(u,p,L,S){if(p.length===0)return-1;var l=M(-1,p.length,u,p,L,S||w.GREATEST_LOWER_BOUND);if(l<0)return-1;for(;l-1>=0&&L(p[l],p[l-1],!0)===0;)--l;return l}},923:(b,w,M)=>{var A=M(930);function u(L,S){var l=L.generatedLine,i=S.generatedLine,f=L.generatedColumn,d=S.generatedColumn;return i>l||i==l&&d>=f||A.compareByGeneratedPositionsInflated(L,S)<=0}function p(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}p.prototype.unsortedForEach=function(S,l){this._array.forEach(S,l)},p.prototype.add=function(S){u(this._last,S)?(this._last=S,this._array.push(S)):(this._sorted=!1,this._array.push(S))},p.prototype.toArray=function(){return this._sorted||(this._array.sort(A.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},w.H=p},645:(b,w)=>{function M(p,L,S){var l=p[L];p[L]=p[S],p[S]=l}function A(p,L){return Math.round(p+Math.random()*(L-p))}function u(p,L,S,l){if(S<l){var i=A(S,l),f=S-1;M(p,i,l);for(var d=p[l],t=S;t<l;t++)L(p[t],d)<=0&&(f+=1,M(p,f,t));M(p,f+1,t);var s=f+1;u(p,L,S,s-1),u(p,L,s+1,l)}}w.U=function(p,L){u(p,L,0,p.length-1)}},94:(b,w,M)=>{var A,u=M(930),p=M(63),L=M(668).I,S=M(158),l=M(645).U;function i(s,n){var a=s;return typeof s=="string"&&(a=u.parseSourceMapInput(s)),a.sections!=null?new t(a,n):new f(a,n)}i.fromSourceMap=function(s,n){return f.fromSourceMap(s,n)},i.prototype._version=3,i.prototype.__generatedMappings=null,Object.defineProperty(i.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),i.prototype.__originalMappings=null,Object.defineProperty(i.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),i.prototype._charIsMappingSeparator=function(n,a){var o=n.charAt(a);return o===";"||o===","},i.prototype._parseMappings=function(n,a){throw new Error("Subclasses must implement _parseMappings")},i.GENERATED_ORDER=1,i.ORIGINAL_ORDER=2,i.GREATEST_LOWER_BOUND=1,i.LEAST_UPPER_BOUND=2,i.prototype.eachMapping=function(n,a,o){var c=a||null,v=o||i.GENERATED_ORDER,_;switch(v){case i.GENERATED_ORDER:_=this._generatedMappings;break;case i.ORIGINAL_ORDER:_=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var C=this.sourceRoot;_.map(function(e){var r=e.source===null?null:this._sources.at(e.source);return r=u.computeSourceURL(C,r,this._sourceMapURL),{source:r,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:e.name===null?null:this._names.at(e.name)}},this).forEach(n,c)},i.prototype.allGeneratedPositionsFor=function(n){var a=u.getArg(n,"line"),o={source:u.getArg(n,"source"),originalLine:a,originalColumn:u.getArg(n,"column",0)};if(o.source=this._findSourceIndex(o.source),o.source<0)return[];var c=[],v=this._findMapping(o,this._originalMappings,"originalLine","originalColumn",u.compareByOriginalPositions,p.LEAST_UPPER_BOUND);if(v>=0){var _=this._originalMappings[v];if(n.column===void 0)for(var C=_.originalLine;_&&_.originalLine===C;)c.push({line:u.getArg(_,"generatedLine",null),column:u.getArg(_,"generatedColumn",null),lastColumn:u.getArg(_,"lastGeneratedColumn",null)}),_=this._originalMappings[++v];else for(var e=_.originalColumn;_&&_.originalLine===a&&_.originalColumn==e;)c.push({line:u.getArg(_,"generatedLine",null),column:u.getArg(_,"generatedColumn",null),lastColumn:u.getArg(_,"lastGeneratedColumn",null)}),_=this._originalMappings[++v]}return c},w.SourceMapConsumer=i;function f(s,n){var a=s;typeof s=="string"&&(a=u.parseSourceMapInput(s));var o=u.getArg(a,"version"),c=u.getArg(a,"sources"),v=u.getArg(a,"names",[]),_=u.getArg(a,"sourceRoot",null),C=u.getArg(a,"sourcesContent",null),e=u.getArg(a,"mappings"),r=u.getArg(a,"file",null);if(o!=this._version)throw new Error("Unsupported version: "+o);_&&(_=u.normalize(_)),c=c.map(String).map(u.normalize).map(function(g){return _&&u.isAbsolute(_)&&u.isAbsolute(g)?u.relative(_,g):g}),this._names=L.fromArray(v.map(String),!0),this._sources=L.fromArray(c,!0),this._absoluteSources=this._sources.toArray().map(function(g){return u.computeSourceURL(_,g,n)}),this.sourceRoot=_,this.sourcesContent=C,this._mappings=e,this._sourceMapURL=n,this.file=r}f.prototype=Object.create(i.prototype),f.prototype.consumer=i,f.prototype._findSourceIndex=function(s){var n=s;if(this.sourceRoot!=null&&(n=u.relative(this.sourceRoot,n)),this._sources.has(n))return this._sources.indexOf(n);var a;for(a=0;a<this._absoluteSources.length;++a)if(this._absoluteSources[a]==s)return a;return-1},f.fromSourceMap=function(n,a){var o=Object.create(f.prototype),c=o._names=L.fromArray(n._names.toArray(),!0),v=o._sources=L.fromArray(n._sources.toArray(),!0);o.sourceRoot=n._sourceRoot,o.sourcesContent=n._generateSourcesContent(o._sources.toArray(),o.sourceRoot),o.file=n._file,o._sourceMapURL=a,o._absoluteSources=o._sources.toArray().map(function(G){return u.computeSourceURL(o.sourceRoot,G,a)});for(var _=n._mappings.toArray().slice(),C=o.__generatedMappings=[],e=o.__originalMappings=[],r=0,g=_.length;r<g;r++){var y=_[r],T=new d;T.generatedLine=y.generatedLine,T.generatedColumn=y.generatedColumn,y.source&&(T.source=v.indexOf(y.source),T.originalLine=y.originalLine,T.originalColumn=y.originalColumn,y.name&&(T.name=c.indexOf(y.name)),e.push(T)),C.push(T)}return l(o.__originalMappings,u.compareByOriginalPositions),o},f.prototype._version=3,Object.defineProperty(f.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function d(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}f.prototype._parseMappings=function(n,a){for(var o=1,c=0,v=0,_=0,C=0,e=0,r=n.length,g=0,y={},T={},G=[],F=[],P,q,x,U,V;g<r;)if(n.charAt(g)===";")o++,g++,c=0;else if(n.charAt(g)===",")g++;else{for(P=new d,P.generatedLine=o,U=g;U<r&&!this._charIsMappingSeparator(n,U);U++);if(q=n.slice(g,U),x=y[q],x)g+=q.length;else{for(x=[];g<U;)S.decode(n,g,T),V=T.value,g=T.rest,x.push(V);if(x.length===2)throw new Error("Found a source, but no line and column");if(x.length===3)throw new Error("Found a source and line, but no column");y[q]=x}P.generatedColumn=c+x[0],c=P.generatedColumn,x.length>1&&(P.source=C+x[1],C+=x[1],P.originalLine=v+x[2],v=P.originalLine,P.originalLine+=1,P.originalColumn=_+x[3],_=P.originalColumn,x.length>4&&(P.name=e+x[4],e+=x[4])),F.push(P),typeof P.originalLine=="number"&&G.push(P)}l(F,u.compareByGeneratedPositionsDeflated),this.__generatedMappings=F,l(G,u.compareByOriginalPositions),this.__originalMappings=G},f.prototype._findMapping=function(n,a,o,c,v,_){if(n[o]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+n[o]);if(n[c]<0)throw new TypeError("Column must be greater than or equal to 0, got "+n[c]);return p.search(n,a,v,_)},f.prototype.computeColumnSpans=function(){for(var n=0;n<this._generatedMappings.length;++n){var a=this._generatedMappings[n];if(n+1<this._generatedMappings.length){var o=this._generatedMappings[n+1];if(a.generatedLine===o.generatedLine){a.lastGeneratedColumn=o.generatedColumn-1;continue}}a.lastGeneratedColumn=1/0}},f.prototype.originalPositionFor=function(n){var a={generatedLine:u.getArg(n,"line"),generatedColumn:u.getArg(n,"column")},o=this._findMapping(a,this._generatedMappings,"generatedLine","generatedColumn",u.compareByGeneratedPositionsDeflated,u.getArg(n,"bias",i.GREATEST_LOWER_BOUND));if(o>=0){var c=this._generatedMappings[o];if(c.generatedLine===a.generatedLine){var v=u.getArg(c,"source",null);v!==null&&(v=this._sources.at(v),v=u.computeSourceURL(this.sourceRoot,v,this._sourceMapURL));var _=u.getArg(c,"name",null);return _!==null&&(_=this._names.at(_)),{source:v,line:u.getArg(c,"originalLine",null),column:u.getArg(c,"originalColumn",null),name:_}}}return{source:null,line:null,column:null,name:null}},f.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(n){return n==null}):!1},f.prototype.sourceContentFor=function(n,a){if(!this.sourcesContent)return null;var o=this._findSourceIndex(n);if(o>=0)return this.sourcesContent[o];var c=n;this.sourceRoot!=null&&(c=u.relative(this.sourceRoot,c));var v;if(this.sourceRoot!=null&&(v=u.urlParse(this.sourceRoot))){var _=c.replace(/^file:\/\//,"");if(v.scheme=="file"&&this._sources.has(_))return this.sourcesContent[this._sources.indexOf(_)];if((!v.path||v.path=="/")&&this._sources.has("/"+c))return this.sourcesContent[this._sources.indexOf("/"+c)]}if(a)return null;throw new Error('"'+c+'" is not in the SourceMap.')},f.prototype.generatedPositionFor=function(n){var a=u.getArg(n,"source");if(a=this._findSourceIndex(a),a<0)return{line:null,column:null,lastColumn:null};var o={source:a,originalLine:u.getArg(n,"line"),originalColumn:u.getArg(n,"column")},c=this._findMapping(o,this._originalMappings,"originalLine","originalColumn",u.compareByOriginalPositions,u.getArg(n,"bias",i.GREATEST_LOWER_BOUND));if(c>=0){var v=this._originalMappings[c];if(v.source===o.source)return{line:u.getArg(v,"generatedLine",null),column:u.getArg(v,"generatedColumn",null),lastColumn:u.getArg(v,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},A=f;function t(s,n){var a=s;typeof s=="string"&&(a=u.parseSourceMapInput(s));var o=u.getArg(a,"version"),c=u.getArg(a,"sections");if(o!=this._version)throw new Error("Unsupported version: "+o);this._sources=new L,this._names=new L;var v={line:-1,column:0};this._sections=c.map(function(_){if(_.url)throw new Error("Support for url field in sections not implemented.");var C=u.getArg(_,"offset"),e=u.getArg(C,"line"),r=u.getArg(C,"column");if(e<v.line||e===v.line&&r<v.column)throw new Error("Section offsets must be ordered and non-overlapping.");return v=C,{generatedOffset:{generatedLine:e+1,generatedColumn:r+1},consumer:new i(u.getArg(_,"map"),n)}})}t.prototype=Object.create(i.prototype),t.prototype.constructor=i,t.prototype._version=3,Object.defineProperty(t.prototype,"sources",{get:function(){for(var s=[],n=0;n<this._sections.length;n++)for(var a=0;a<this._sections[n].consumer.sources.length;a++)s.push(this._sections[n].consumer.sources[a]);return s}}),t.prototype.originalPositionFor=function(n){var a={generatedLine:u.getArg(n,"line"),generatedColumn:u.getArg(n,"column")},o=p.search(a,this._sections,function(v,_){var C=v.generatedLine-_.generatedOffset.generatedLine;return C||v.generatedColumn-_.generatedOffset.generatedColumn}),c=this._sections[o];return c?c.consumer.originalPositionFor({line:a.generatedLine-(c.generatedOffset.generatedLine-1),column:a.generatedColumn-(c.generatedOffset.generatedLine===a.generatedLine?c.generatedOffset.generatedColumn-1:0),bias:n.bias}):{source:null,line:null,column:null,name:null}},t.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(n){return n.consumer.hasContentsOfAllSources()})},t.prototype.sourceContentFor=function(n,a){for(var o=0;o<this._sections.length;o++){var c=this._sections[o],v=c.consumer.sourceContentFor(n,!0);if(v)return v}if(a)return null;throw new Error('"'+n+'" is not in the SourceMap.')},t.prototype.generatedPositionFor=function(n){for(var a=0;a<this._sections.length;a++){var o=this._sections[a];if(o.consumer._findSourceIndex(u.getArg(n,"source"))!==-1){var c=o.consumer.generatedPositionFor(n);if(c){var v={line:c.line+(o.generatedOffset.generatedLine-1),column:c.column+(o.generatedOffset.generatedLine===c.line?o.generatedOffset.generatedColumn-1:0)};return v}}}return{line:null,column:null}},t.prototype._parseMappings=function(n,a){this.__generatedMappings=[],this.__originalMappings=[];for(var o=0;o<this._sections.length;o++)for(var c=this._sections[o],v=c.consumer._generatedMappings,_=0;_<v.length;_++){var C=v[_],e=c.consumer._sources.at(C.source);e=u.computeSourceURL(c.consumer.sourceRoot,e,this._sourceMapURL),this._sources.add(e),e=this._sources.indexOf(e);var r=null;C.name&&(r=c.consumer._names.at(C.name),this._names.add(r),r=this._names.indexOf(r));var g={source:e,generatedLine:C.generatedLine+(c.generatedOffset.generatedLine-1),generatedColumn:C.generatedColumn+(c.generatedOffset.generatedLine===C.generatedLine?c.generatedOffset.generatedColumn-1:0),originalLine:C.originalLine,originalColumn:C.originalColumn,name:r};this.__generatedMappings.push(g),typeof g.originalLine=="number"&&this.__originalMappings.push(g)}l(this.__generatedMappings,u.compareByGeneratedPositionsDeflated),l(this.__originalMappings,u.compareByOriginalPositions)},A=t},458:(b,w,M)=>{var A=M(158),u=M(930),p=M(668).I,L=M(923).H;function S(l){l||(l={}),this._file=u.getArg(l,"file",null),this._sourceRoot=u.getArg(l,"sourceRoot",null),this._skipValidation=u.getArg(l,"skipValidation",!1),this._sources=new p,this._names=new p,this._mappings=new L,this._sourcesContents=null}S.prototype._version=3,S.fromSourceMap=function(i){var f=i.sourceRoot,d=new S({file:i.file,sourceRoot:f});return i.eachMapping(function(t){var s={generated:{line:t.generatedLine,column:t.generatedColumn}};t.source!=null&&(s.source=t.source,f!=null&&(s.source=u.relative(f,s.source)),s.original={line:t.originalLine,column:t.originalColumn},t.name!=null&&(s.name=t.name)),d.addMapping(s)}),i.sources.forEach(function(t){var s=t;f!==null&&(s=u.relative(f,t)),d._sources.has(s)||d._sources.add(s);var n=i.sourceContentFor(t);n!=null&&d.setSourceContent(t,n)}),d},S.prototype.addMapping=function(i){var f=u.getArg(i,"generated"),d=u.getArg(i,"original",null),t=u.getArg(i,"source",null),s=u.getArg(i,"name",null);this._skipValidation||this._validateMapping(f,d,t,s),t!=null&&(t=String(t),this._sources.has(t)||this._sources.add(t)),s!=null&&(s=String(s),this._names.has(s)||this._names.add(s)),this._mappings.add({generatedLine:f.line,generatedColumn:f.column,originalLine:d!=null&&d.line,originalColumn:d!=null&&d.column,source:t,name:s})},S.prototype.setSourceContent=function(i,f){var d=i;this._sourceRoot!=null&&(d=u.relative(this._sourceRoot,d)),f!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[u.toSetString(d)]=f):this._sourcesContents&&(delete this._sourcesContents[u.toSetString(d)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))},S.prototype.applySourceMap=function(i,f,d){var t=f;if(f==null){if(i.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);t=i.file}var s=this._sourceRoot;s!=null&&(t=u.relative(s,t));var n=new p,a=new p;this._mappings.unsortedForEach(function(o){if(o.source===t&&o.originalLine!=null){var c=i.originalPositionFor({line:o.originalLine,column:o.originalColumn});c.source!=null&&(o.source=c.source,d!=null&&(o.source=u.join(d,o.source)),s!=null&&(o.source=u.relative(s,o.source)),o.originalLine=c.line,o.originalColumn=c.column,c.name!=null&&(o.name=c.name))}var v=o.source;v!=null&&!n.has(v)&&n.add(v);var _=o.name;_!=null&&!a.has(_)&&a.add(_)},this),this._sources=n,this._names=a,i.sources.forEach(function(o){var c=i.sourceContentFor(o);c!=null&&(d!=null&&(o=u.join(d,o)),s!=null&&(o=u.relative(s,o)),this.setSourceContent(o,c))},this)},S.prototype._validateMapping=function(i,f,d,t){if(f&&typeof f.line!="number"&&typeof f.column!="number")throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");if(!(i&&"line"in i&&"column"in i&&i.line>0&&i.column>=0&&!f&&!d&&!t)){if(i&&"line"in i&&"column"in i&&f&&"line"in f&&"column"in f&&i.line>0&&i.column>=0&&f.line>0&&f.column>=0&&d)return;throw new Error("Invalid mapping: "+JSON.stringify({generated:i,source:d,original:f,name:t}))}},S.prototype._serializeMappings=function(){for(var i=0,f=1,d=0,t=0,s=0,n=0,a="",o,c,v,_,C=this._mappings.toArray(),e=0,r=C.length;e<r;e++){if(c=C[e],o="",c.generatedLine!==f)for(i=0;c.generatedLine!==f;)o+=";",f++;else if(e>0){if(!u.compareByGeneratedPositionsInflated(c,C[e-1]))continue;o+=","}o+=A.encode(c.generatedColumn-i),i=c.generatedColumn,c.source!=null&&(_=this._sources.indexOf(c.source),o+=A.encode(_-n),n=_,o+=A.encode(c.originalLine-1-t),t=c.originalLine-1,o+=A.encode(c.originalColumn-d),d=c.originalColumn,c.name!=null&&(v=this._names.indexOf(c.name),o+=A.encode(v-s),s=v)),a+=o}return a},S.prototype._generateSourcesContent=function(i,f){return i.map(function(d){if(!this._sourcesContents)return null;f!=null&&(d=u.relative(f,d));var t=u.toSetString(d);return Object.prototype.hasOwnProperty.call(this._sourcesContents,t)?this._sourcesContents[t]:null},this)},S.prototype.toJSON=function(){var i={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(i.file=this._file),this._sourceRoot!=null&&(i.sourceRoot=this._sourceRoot),this._sourcesContents&&(i.sourcesContent=this._generateSourcesContent(i.sources,i.sourceRoot)),i},S.prototype.toString=function(){return JSON.stringify(this.toJSON())},w.h=S},771:(b,w,M)=>{var A,u=M(458).h,p=M(930),L=/(\r?\n)/,S=10,l="$$$isSourceNode$$$";function i(f,d,t,s,n){this.children=[],this.sourceContents={},this.line=f??null,this.column=d??null,this.source=t??null,this.name=n??null,this[l]=!0,s!=null&&this.add(s)}i.fromStringWithSourceMap=function(d,t,s){var n=new i,a=d.split(L),o=0,c=function(){var r=y(),g=y()||"";return r+g;function y(){return o<a.length?a[o++]:void 0}},v=1,_=0,C=null;return t.eachMapping(function(r){if(C!==null)if(v<r.generatedLine)e(C,c()),v++,_=0;else{var g=a[o]||"",y=g.substr(0,r.generatedColumn-_);a[o]=g.substr(r.generatedColumn-_),_=r.generatedColumn,e(C,y),C=r;return}for(;v<r.generatedLine;)n.add(c()),v++;if(_<r.generatedColumn){var g=a[o]||"";n.add(g.substr(0,r.generatedColumn)),a[o]=g.substr(r.generatedColumn),_=r.generatedColumn}C=r},this),o<a.length&&(C&&e(C,c()),n.add(a.splice(o).join(""))),t.sources.forEach(function(r){var g=t.sourceContentFor(r);g!=null&&(s!=null&&(r=p.join(s,r)),n.setSourceContent(r,g))}),n;function e(r,g){if(r===null||r.source===void 0)n.add(g);else{var y=s?p.join(s,r.source):r.source;n.add(new i(r.originalLine,r.originalColumn,y,g,r.name))}}},i.prototype.add=function(d){if(Array.isArray(d))d.forEach(function(t){this.add(t)},this);else if(d[l]||typeof d=="string")d&&this.children.push(d);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+d);return this},i.prototype.prepend=function(d){if(Array.isArray(d))for(var t=d.length-1;t>=0;t--)this.prepend(d[t]);else if(d[l]||typeof d=="string")this.children.unshift(d);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+d);return this},i.prototype.walk=function(d){for(var t,s=0,n=this.children.length;s<n;s++)t=this.children[s],t[l]?t.walk(d):t!==""&&d(t,{source:this.source,line:this.line,column:this.column,name:this.name})},i.prototype.join=function(d){var t,s,n=this.children.length;if(n>0){for(t=[],s=0;s<n-1;s++)t.push(this.children[s]),t.push(d);t.push(this.children[s]),this.children=t}return this},i.prototype.replaceRight=function(d,t){var s=this.children[this.children.length-1];return s[l]?s.replaceRight(d,t):typeof s=="string"?this.children[this.children.length-1]=s.replace(d,t):this.children.push("".replace(d,t)),this},i.prototype.setSourceContent=function(d,t){this.sourceContents[p.toSetString(d)]=t},i.prototype.walkSourceContents=function(d){for(var t=0,s=this.children.length;t<s;t++)this.children[t][l]&&this.children[t].walkSourceContents(d);for(var n=Object.keys(this.sourceContents),t=0,s=n.length;t<s;t++)d(p.fromSetString(n[t]),this.sourceContents[n[t]])},i.prototype.toString=function(){var d="";return this.walk(function(t){d+=t}),d},i.prototype.toStringWithSourceMap=function(d){var t={code:"",line:1,column:0},s=new u(d),n=!1,a=null,o=null,c=null,v=null;return this.walk(function(_,C){t.code+=_,C.source!==null&&C.line!==null&&C.column!==null?((a!==C.source||o!==C.line||c!==C.column||v!==C.name)&&s.addMapping({source:C.source,original:{line:C.line,column:C.column},generated:{line:t.line,column:t.column},name:C.name}),a=C.source,o=C.line,c=C.column,v=C.name,n=!0):n&&(s.addMapping({generated:{line:t.line,column:t.column}}),a=null,n=!1);for(var e=0,r=_.length;e<r;e++)_.charCodeAt(e)===S?(t.line++,t.column=0,e+1===r?(a=null,n=!1):n&&s.addMapping({source:C.source,original:{line:C.line,column:C.column},generated:{line:t.line,column:t.column},name:C.name})):t.column++}),this.walkSourceContents(function(_,C){s.setSourceContent(_,C)}),{code:t.code,map:s}},A=i},930:(b,w)=>{function M(e,r,g){if(r in e)return e[r];if(arguments.length===3)return g;throw new Error('"'+r+'" is a required argument.')}w.getArg=M;var A=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,u=/^data:.+\,.+$/;function p(e){var r=e.match(A);return r?{scheme:r[1],auth:r[2],host:r[3],port:r[4],path:r[5]}:null}w.urlParse=p;function L(e){var r="";return e.scheme&&(r+=e.scheme+":"),r+="//",e.auth&&(r+=e.auth+"@"),e.host&&(r+=e.host),e.port&&(r+=":"+e.port),e.path&&(r+=e.path),r}w.urlGenerate=L;function S(e){var r=e,g=p(e);if(g){if(!g.path)return e;r=g.path}for(var y=w.isAbsolute(r),T=r.split(/\/+/),G,F=0,P=T.length-1;P>=0;P--)G=T[P],G==="."?T.splice(P,1):G===".."?F++:F>0&&(G===""?(T.splice(P+1,F),F=0):(T.splice(P,2),F--));return r=T.join("/"),r===""&&(r=y?"/":"."),g?(g.path=r,L(g)):r}w.normalize=S;function l(e,r){e===""&&(e="."),r===""&&(r=".");var g=p(r),y=p(e);if(y&&(e=y.path||"/"),g&&!g.scheme)return y&&(g.scheme=y.scheme),L(g);if(g||r.match(u))return r;if(y&&!y.host&&!y.path)return y.host=r,L(y);var T=r.charAt(0)==="/"?r:S(e.replace(/\/+$/,"")+"/"+r);return y?(y.path=T,L(y)):T}w.join=l,w.isAbsolute=function(e){return e.charAt(0)==="/"||A.test(e)};function i(e,r){e===""&&(e="."),e=e.replace(/\/$/,"");for(var g=0;r.indexOf(e+"/")!==0;){var y=e.lastIndexOf("/");if(y<0||(e=e.slice(0,y),e.match(/^([^\/]+:\/)?\/*$/)))return r;++g}return Array(g+1).join("../")+r.substr(e.length+1)}w.relative=i;var f=function(){var e=Object.create(null);return!("__proto__"in e)}();function d(e){return e}function t(e){return n(e)?"$"+e:e}w.toSetString=f?d:t;function s(e){return n(e)?e.slice(1):e}w.fromSetString=f?d:s;function n(e){if(!e)return!1;var r=e.length;if(r<9||e.charCodeAt(r-1)!==95||e.charCodeAt(r-2)!==95||e.charCodeAt(r-3)!==111||e.charCodeAt(r-4)!==116||e.charCodeAt(r-5)!==111||e.charCodeAt(r-6)!==114||e.charCodeAt(r-7)!==112||e.charCodeAt(r-8)!==95||e.charCodeAt(r-9)!==95)return!1;for(var g=r-10;g>=0;g--)if(e.charCodeAt(g)!==36)return!1;return!0}function a(e,r,g){var y=c(e.source,r.source);return y!==0||(y=e.originalLine-r.originalLine,y!==0)||(y=e.originalColumn-r.originalColumn,y!==0||g)||(y=e.generatedColumn-r.generatedColumn,y!==0)||(y=e.generatedLine-r.generatedLine,y!==0)?y:c(e.name,r.name)}w.compareByOriginalPositions=a;function o(e,r,g){var y=e.generatedLine-r.generatedLine;return y!==0||(y=e.generatedColumn-r.generatedColumn,y!==0||g)||(y=c(e.source,r.source),y!==0)||(y=e.originalLine-r.originalLine,y!==0)||(y=e.originalColumn-r.originalColumn,y!==0)?y:c(e.name,r.name)}w.compareByGeneratedPositionsDeflated=o;function c(e,r){return e===r?0:e===null?1:r===null?-1:e>r?1:-1}function v(e,r){var g=e.generatedLine-r.generatedLine;return g!==0||(g=e.generatedColumn-r.generatedColumn,g!==0)||(g=c(e.source,r.source),g!==0)||(g=e.originalLine-r.originalLine,g!==0)||(g=e.originalColumn-r.originalColumn,g!==0)?g:c(e.name,r.name)}w.compareByGeneratedPositionsInflated=v;function _(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))}w.parseSourceMapInput=_;function C(e,r,g){if(r=r||"",e&&(e[e.length-1]!=="/"&&r[0]!=="/"&&(e+="/"),r=e+r),g){var y=p(g);if(!y)throw new Error("sourceMapURL could not be parsed");if(y.path){var T=y.path.lastIndexOf("/");T>=0&&(y.path=y.path.substring(0,T+1))}r=l(L(y),r)}return S(r)}w.computeSourceURL=C},461:(b,w,M)=>{M(458).h,w.SourceMapConsumer=M(94).SourceMapConsumer,M(771)},147:b=>{"use strict";b.exports=require("fs")},17:b=>{"use strict";b.exports=require("path")}},Q={};function j(b){var w=Q[b];if(w!==void 0)return w.exports;var M=Q[b]={id:b,loaded:!1,exports:{}};return K[b](M,M.exports,j),M.loaded=!0,M.exports}j.n=b=>{var w=b&&b.__esModule?()=>b.default:()=>b;return j.d(w,{a:w}),w},j.d=(b,w)=>{for(var M in w)j.o(w,M)&&!j.o(b,M)&&Object.defineProperty(b,M,{enumerable:!0,get:w[M]})},j.o=(b,w)=>Object.prototype.hasOwnProperty.call(b,w),j.r=b=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(b,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(b,"__esModule",{value:!0})},j.nmd=b=>(b.paths=[],b.children||(b.children=[]),b);var $={};(()=>{"use strict";j.r($),j.d($,{get_translators:()=>L,handler:()=>S});var b=j(49);function w(l,i){return{statusCode:l,body:JSON.stringify(i)}}const M=w,A=require("aws-sdk");var u=j.n(A);const p=new(u()).DynamoDB.DocumentClient;async function L(l,i){var f,d,t,s;if((f=l.queryStringParameters)!==null&&f!==void 0&&f.sort){const{sort:n}=l.queryStringParameters,{search:a=""}=l.queryStringParameters,o=a.toLowerCase();let c,v;const _="translatorStatus";n=="approved"?(c="approved = :yes",v={":yes":"true"}):n=="unapproved"&&(c="approved = :no",v={":no":"false"});const C={TableName:process.env.TRANSLATORS_TABLE,IndexName:_,KeyConditionExpression:c,ExpressionAttributeValues:v},r=(await p.query(C).promise()).Items.filter(g=>(g==null?void 0:g.profile.firstname.toLowerCase().includes(o))||(g==null?void 0:g.profile.lastname.toLowerCase().includes(o)));return M(200,{message:r})}else if((d=l.queryStringParameters)!==null&&d!==void 0&&d.pairs){const{pairs:n}=l.queryStringParameters,a=n.toLowerCase(),c=(await p.scan({TableName:process.env.TRANSLATORS_TABLE}).promise()).Items.filter(v=>v==null?void 0:v._details.language_pairs.some(_=>_.from.toLowerCase().includes(a)||_.to.toLowerCase().includes(a)));return M(200,{message:c})}else if((t=l.queryStringParameters)!==null&&t!==void 0&&t.search){const{search:n}=l.queryStringParameters,a=n.toLowerCase(),c=(await p.scan({TableName:process.env.TRANSLATORS_TABLE}).promise()).Items.filter(v=>(v==null?void 0:v.profile.firstname.toLowerCase().includes(a))||(v==null?void 0:v.profile.lastname.toLowerCase().includes(a)));return M(200,{message:c})}else if((s=l.queryStringParameters)!==null&&s!==void 0&&s.count){const n=await p.scan({TableName:process.env.TRANSLATORS_TABLE}).promise(),a=n.Items.flatMap(e=>e._details.language_pairs),o=[...new Set(a.map(e=>JSON.stringify(e)))].map(e=>JSON.parse(e)),c={TableName:process.env.TRANSLATORS_TABLE,IndexName:"translatorStatus",KeyConditionExpression:"approved = :yes",ExpressionAttributeValues:{":yes":"true"}},v={TableName:process.env.TRANSLATORS_TABLE,IndexName:"translatorStatus",KeyConditionExpression:"approved = :no",ExpressionAttributeValues:{":no":"false"}},_=await p.query(v).promise(),C=await p.query(c).promise();return M(200,{unapproved:_.Count,approved:C.Count,language_pairs:o.length,uniqueObjects:o,all:n.Count})}else{const n=await p.scan({TableName:process.env.TRANSLATORS_TABLE}).promise();return M(200,{message:n.Items})}}const S=L})();var W=exports;for(var J in $)W[J]=$[J];$.__esModule&&Object.defineProperty(W,"__esModule",{value:!0})})();

//# sourceMappingURL=getTranslators.js.map