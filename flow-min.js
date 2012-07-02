/* Flow v0.3.6 + Panzer v0.3.0 + genData v2.0.1 | github.com/bemson | (c) 2012, MIT */
;((typeof exports!="undefined"?exports:window).genData=function a(b){function p(a,b){this.name=a,this.value=b}if(this instanceof a)return this;var c,d,e,f=[["",b]],g,h,i,j={},k,l,m=[].slice.call(arguments).slice(1).filter(function(a){return typeof a=="function"}),n=m.length,o=[];p.prototype=(typeof this=="function"?this:a).prototype;while(f.length){i=f.shift(),d=new p(i[0],i[1]),c=0,k={omit:0,scan:1,exit:0,parent:null},l=[i[0],i[1],i[2],o,k,j];while(c<n&&!k.exit)m[c++].apply(d,l);k.omit?d._OMIT=!0:o.push(d);if(k.exit)f=[];else{h=[],g=k.parent!==null?k.parent:d.value;if(k.scan&&typeof g=="object"){for(e in g)g.hasOwnProperty(e)&&h.push([e,g[e],d]);f=h.concat(f)}}}return o}).spawn=function b(){function d(b){return this instanceof d?this:a.apply(typeof this=="function"?this:d,[b].concat(c,[].slice.call(arguments).slice(1)))}var a=this,c=[].slice.call(arguments).filter(function(a){return typeof a=="function"});return d.prototype=new a,d.spawn=b,d};
!function(a,b,c,d,e,f){function o(a,b,c,f){var g=this;g.panzer=i=a,g.y=[{},{},function(b,c){return b===a?c?(g.pkgs[a.i[c]]||{}).inst||!1:g:j}],a.d.forEach(function(a){var b=a.def.attributeKey,c=a.def.invalidKey;a.c={af:typeof b=="function"?b:0,ar:b&&b instanceof d?b:0,nf:typeof c=="function"?c:0,nr:c&&c instanceof d?c:0}}),a.d&&a.d.forEach(function(a){var b;typeof a.def.prepTree=="function"&&typeof (b=a.def.prepTree.call(e,c))!="undefined"&&(c=b)}),g.nodes=l(c),i=0,g.nodes[0].parentIndex=g.nodes[0].childIndex=0,g.nodes.unshift(l()[0]),g.nodes[0].children.push(1),g.nodes[0].name="PNULL",g.nodes[0].index=0,g.nodes[0].depth=0,g.nodes[0].path="..//",g.nodes[0].ctx=1,g.nodes[0].firstChildIndex=g.nodes[0].lastChildIndex=1,g.tank={id:a.c++,currentIndex:0,targetIndex:-1,go:function(a){var b=g.nodes[a];return b&&(g.target=b,g.tank.targetIndex=b.index),g.stop=0,g.go()},stop:function(){return g.stop=1,!!g.loop},post:function(a){switch(typeof a){case"function":return g.posts.push(a)-1;case"number":if(g.posts[a])return g.posts[a]=0,!0}return!1}},g.posts=[],g.current=g.nodes[0],g.target=g.loop=0,g.pkgs=a.d.map(function(a){function c(){}var b={name:a.name,inst:new a.def};return c.prototype=a.proxy.prototype,g.y[0][a.name]=b.proxy=new c,g.y[1][a.name]=b.inst,b.inst.pkgs=g.y[1],b.inst.nodes=m.call(a.node,g.nodes),b.inst.tank=g.tank,typeof a.def.init=="function"&&a.def.init.call(b.inst,f),b}),g.pkgs.forEach(function(a,c,d){a.proxy.pkgs=g.y[0],a.proxy.toString=g.y[2],a.inst.proxy=b}),b.pkgs=g.y[0],b.toString=g.y[2],this.ret=1}function p(a,b){return typeof b=="string"&&a&&this.d[a-1].proxy.prototype[b]||!1}function q(a){var b=this;if(arguments.length){if(typeof a=="string"&&/\w/.test(a)){if(!b.i.hasOwnProperty(a)){function c(c){if(!(this instanceof arguments.callee))return c instanceof b.d[0].proxy&&c.toString(b,a)}c.getSuper=function(a){return p.call(b,this.index,a)},c.init=c.attributeKey=c.invalidKey=c.onBegin=c.onEnd=c.onTraverse=c.prepTree=c.prepNode=0;function d(){}d.prototype=new b.Y,b.P.prototype=c.proxy=d.prototype,b.Y=d;function e(){}c.node=e.prototype,c.index=b.i[a]=b.d.push({name:a,def:c,proxy:d,node:e})-1}return b.d[b.i[a]].def}return!1}return b.d.map(function(a){return a.name})}if(!a&&e.Panzer)return;var g=a?exports:e,h=(a?require("genData"):e).genData,i,j={}.toString(),k=function(a,b,c){var d=a+"f",f=a+"r";return i.d.some(function(a){if(a.c[d])return a.c[d].call(e,b,c);if(a.c[f])return a.c[f].test(b)})},l=h.spawn(function(a,b,c,d,g,h){var j=this,l=c&&k("n",a,b),m=c&&!l&&k("a",a,b);l||m?(g.omit=1,g.scan=0,m&&!l&&(c.attributes[a]=b)):(j.ctx=j.parentIndex=j.previousIndex=j.nextIndex=j.firstChildIndex=j.lastChildIndex=j.childIndex=f,j.index=d.length+1,j.depth=c?c.depth+1:1,j.name=c?a:"PROOT",j.attributes={},j.path=c?c.path+a+"/":"//",j.children=[],c&&(j.parentIndex=c.index,c.children.length||(c.firstChildIndex=j.index),j.childIndex=c.children.push(j.index)-1,c.lastChildIndex=j.index,j.childIndex&&(j.previousIndex=c.children[j.childIndex-1],d[j.previousIndex-1].nextIndex=j.index)),c&&i.d&&i.d.reverse().some(function(a){var c=a.def,f;if(typeof c.prepNode=="function"&&typeof (f=c.prepNode.call(e,b,d[0].value))!="undefined")return g.parent=f,!0}))}),m=h.spawn(function(a,b,c,d,e){if(!c)e.omit=1;else{e.scan=0;for(var f in b)b.hasOwnProperty(f)&&f!=="ctx"&&(this[f]=b[f])}}),n=b.prototype;o.prototype={go:function(){var a=this,b=a.nodes,c=a.tank,d,e=0,f=a.current,g=0,h=0,i;if(a.loop)return!!a.target;a.posts=[],a.loop=1,a.fire("Begin");while(a.loop)a.target&&!a.stop?(i=0,d=a.target.index-f.index,d?d>0&&f.index<2||!a.target.path.indexOf(f.path)?f.ctx?(g=0,h=f.firstChildIndex):(g=1,h=1,f.ctx=1):f.ctx?(g=1,h=2,f.ctx=0):(a.target.path.indexOf(b[f.parentIndex].path)&&(d=-1),h=d<0?4:3,f.lastEvent===2||f.lastEvent===h||f.lastEvent+h===7?(g=0,h=d>0?f.nextIndex:f.previousIndex||f.parentIndex):g=1):(g=1,h=f.ctx?0:1,f.ctx&&(a.target=0,c.targetIndex=-1),f.ctx=1),g?(f.lastEvent=h,e++,a.fire("Traverse",[h])):(f.lastEvent=0,f=a.current=b[h],c.currentIndex=h)):!i&&(a.stop||!a.target)?(i=1,a.fire("End")):a.loop=0;return a.posts.forEach(function(a){a&&a()}),e},fire:function(a,b){var c=this.panzer;if(!this.ret)return;b=b||[],b.unshift(a.toLowerCase()),this.pkgs.forEach(function(d){var e=c.d[c.i[d.name]].def["on"+a];typeof e=="function"&&e.apply(d.inst,b)})}},g.Panzer={version:"0.3.0",create:function(){function b(b,c){if(!(this instanceof arguments.callee))throw new Error("Missing new operator.");new o(a,this,b,typeof c=="object"?c:{})}var a={c:0,d:[],i:{},Y:function(){},P:b};return b.pkg=function(b){return q.apply(a,arguments)},b}}}(typeof require!="undefined",Array,Object,RegExp,this);
!function(a,b,c,d){function l(b){return a?require(b):c}function m(a){return a!=null&&/\w/.test(a)}function n(a,b,c){switch(c||typeof b){case"string":a[~b.indexOf("/")?"paths":"states"].push(b);break;case"number":a.limit=Math.abs(~~b);break;case"object":a.prgms.push(b);break;case"boolean":a.capture=b}}if(!a&&c.Flow)return;var e=l("Panzer").Panzer.create(),f=l("genData").genData,g=e.pkg("core"),h=f.spawn(function(a,c,e,f,g,h){var i=this,j=1,k={name:i.name,value:i.value,use:1};g.omit=1,i.O=typeof c=="object",i.A=c instanceof b,e?e.A?i.O&&(j=0):g.scan=0:(h.keys||(h.keys={}),i.O&&(j=0));if(j){if(!e||e.A)k.name=c,k.value=d,k.use=0;m(k.name)&&(k.name+="",h.keys.hasOwnProperty(k.name)&&f.splice(h.keys[k.name],1),h.keys[k.name]=f.push(k)-1)}}),i=f.spawn(function(a,b,c,d,e){var f=this,g="/";f.set=0,f.parent=c,f.done=0,typeof b=="string"&&(~b.indexOf(g)?f.value=b.split(g):b.charAt(0)==="["&&(f.value=b.slice(1,-1).split("|"),f.set=1)),typeof f.value=="string"?(c&&c.set&&(f.set=1,c.last=f),f.first=!d.length):e.omit=1}),j=[],k=/^\/\/(?:\w+\/)+/;e.version="0.3.6",g.actives=[],g.events=["on","in","out","over","bover"],g.attributeKey=/^_/,g.invalidKey=/^\W+$|^toString$|^[@\[]|[\/\|]/,g.prepNode=function(a,b){var c=b,e=typeof a=="string"?a:typeof a=="object"&&typeof a._extends=="string"?a._extends:"";if(k.test(e))return e.slice(2,-1).split("/").every(function(a){return c=c.hasOwnProperty(a)&&c[a]}),typeof c=="function"&&(e={},e["_"+g.events[0]]=c,c=e),c||d},g.init=function(a){var c=this,d=j[0],e,f=Math.random();c.args=[],c.calls=[],c.route=[],c.defs={},c.delay={},c.stores=[],c.cache={indexOf:{}},c.trust=0,c.locked=0,c.nodeIds={},c.pending=0,c.pendees=[],c.targets=[],c.defStack=[[]],c.phase=0,c.ownUp=0,c.nodes[0].name="_flow",c.nodes[1].name="_program",c.storeStrs=[[],[]],c.nodes.forEach(function(a,f){var i=c.nodes[a.parentIndex],j=a.attributes,l;if(k.test(typeof a.value=="string"?a.value:typeof a.value=="object"?a.value._extends:"")){a.extends=a.extended=1;if(a.value&&typeof a.value=="object")for(l in j)a.value.hasOwnProperty(l)&&(j[l]=a.value[l])}else a.extends=0,a.extended=i?i.extended:0;c.nodeIds[a.path]=f,c.storeStrs[0][f]=a.path,c.storeStrs[1][f]=a.state,a.pkg=c,a.pendable=i&&!i.pendable?0:j.hasOwnProperty("_pendable")?!!a.attributes._pendable:1,a.root=f<2?1:j._root&&a.index||i.root,a.restrict=j.hasOwnProperty("_restrict")?j._restrict&&a.index||-1:i&&i.restrict||-1,a.lock=!!j._lock,a.upOwn=a.upGate=0;if(d)if(j.hasOwnProperty("_owner")){if(typeof j._owner=="string"||typeof j._owner=="number")e=1,a.upOwn=a.upGate=1,a.upPath=j._owner}else i&&i.hasOwnProperty("upPath")&&(a.upOwn=1,a.upPath=i.upPath);j.hasOwnProperty("_store")?(a.store={prgms:[],paths:[],states:[],limit:0,capture:0,filter:1,scope:1},typeof j._store=="object"?j._store instanceof b?j._store.forEach(function(b){n(a.store,b)}):(l=0,j._store.hasOwnProperty("programs")&&(l++,a.store.prgms=[].concat(j._store.programs)),j._store.hasOwnProperty("states")&&(l++,a.store.states=[].concat(j._store.states)),j._store.hasOwnProperty("paths")&&(l++,a.store.paths=[].concat(j._store.paths)),j._store.hasOwnProperty("limit")&&typeof j._store.limit=="number"&&(l++,n(a.store,j._store.limit,"number")),j._store.hasOwnProperty("capture")&&(l++,a.store.capture=!!j._store.capture),j._store.hasOwnProperty("scope")&&(l++,a.store.scope=!!j._store.scope),l||n(a.store,!0)):n(a.store,j._store),a.firstStore=1,a.store.capture!==0&&(a.store.filter=0),!a.store.capture&&!a.store.filter&&(a.store.scope=1),i.firstStore||(a.store.capture=a.store.scope=1)):(a.store=0,a.firstStore=i?i.firstStore:0),a.plock=i?i.lock:0,a.map=function(){var a=[].slice.call(arguments);return a.unshift(f),c.proxy.target.apply(c.proxy,a)},a.map.toString=function(){return a.path},a.defs=h(j._def),a.index&&(i.map[a.name]=a.map),a.fncs=g.events.map(function(a){return a="_"+a,typeof j[a]=="function"?j[a]:0}),!a.fncs[0]&&typeof a.value=="function"&&(a.fncs[0]=a.value)}),c.storeStrs[0]=c.storeStrs[0].join(f),c.storeStrs[1]=c.storeStrs[1].join(f),c.owner=0,d&&(e&&(c.owner=d),d.stores.length&&d.stores[0].active[0]&&d.store(c)),a.hasOwnProperty("hostKey")&&(c.hostKey=a.hostKey),a.cedeHosts instanceof b&&(c.allowed=function(){return c.trust||j.length&&~a.cedeHosts.indexOf(j[0].hostKey)})},g.prototype={store:function(a){var b=this,c=b.stores[0];(!c.prgms.length||c.prgms.some(function(b){return a.nodes[0].value===b}))&&(!c.paths.length||c.paths.some(function(b){return~a.storeStrs[0].indexOf(b)}))&&(!c.states.length||c.states.some(function(b){return~a.storeStrs[1].indexOf(b)}))&&(c.items.push(a),c.limits[0]&&c.limits[0]<c.items.length&&c.items.shift(),c.cache=0)},addStore:function(a){this.stores.unshift({prgms:a.prgms.concat(),paths:a.paths.concat(),states:a.states.concat(),limits:[a.limit],items:[],filters:[],active:[a.capture],cache:0})},indexOf:function(a,b){var c=this,d=c.nodes,e=c.nodeIds,f,g,h,j,k,l=-1;b=b||c.nodes[c.tank.currentIndex];switch(typeof a){case"object":a!==null&&(a=a.index);case"number":d[a]&&(l=a);break;case"function":a+="";case"string":if(a=="")break;if(a==="..//"||a==="//")l=a==="//"?1:0;else{j=a.match(/^(?:(?:\.{1,2}|[@\[][^\/]+)\/?)+/);if(j){if(!c.cache.indexOf.hasOwnProperty(a+b.index)&&!c.cache.indexOf.hasOwnProperty(a)){f=a.substr(j[0].length),h=0,j=i(j[0]),l=b.index;while((g=d[l])&&j.length){k=j.shift();if(!k.set||!k.parent.done){switch(k.value){case"@firstchild":l=g.firstChildIndex;break;case"@lastchild":l=g.lastChildIndex;break;case"@next":l=g.nextIndex;break;case"@parent":case"..":l=g.parentIndex;break;case"@previous":l=g.previousIndex;break;case"@root":l=g.root;break;case"@program":case"@flow":k.first&&(h=1),l=~k.value.indexOf("f")?0:1;break;case"@oldest":case"@youngest":l=d[g.parentIndex]?d[g.parentIndex][(~k.value.indexOf("y")?"firstChild":"lastChild")+"Index"]:-1;break;case"@self":case".":l=g.index;break;default:k.value&&(l=-1)}k.set&&(l>-1?k.parent.done=1:k.parent.last!==k&&(l=g.index))}}l=g&&(!f||(g=d[e[g.path+f.replace(/([^\/])$/,"$1/")]]))?g.index:-1,c.cache.indexOf[a+(h?"":b.index)]=l}l=c.cache.indexOf.hasOwnProperty(a+b.index)?c.cache.indexOf[a+b.index]:c.cache.indexOf[a]}else a.charAt(0)!=="/"?a=b.path+a:a.charAt(1)!=="/"&&(a=d[b.root].path+a.substr(1)),a.slice(-1)!=="/"&&(a+="/"),l=e.hasOwnProperty(a)?e[a]:-1}}return l},vetIndexOf:function(a,b){var c=this,d=c.indexOf(a,b);return b=b||c.nodes[c.tank.currentIndex],~d&&(c.allowed()||b.canTgt(c.nodes[d]))?d:-1},getDef:function(a,b){var c=this;return m(a)&&(c.defs.hasOwnProperty(a)?c.defs[a]:c.defs[a]={name:a,values:arguments.length>1?[b]:[]})},go:function(){var a=this;return a.pause=0,a.delTimer(),a.pending?0:a.tank.go(a.targets[0])},delTimer:function(){var a=this;a.delay.timer&&(clearTimeout(a.delay.timer),a.delay.timer=0)},allowed:function(){return this.trust},upOwner:function(a){var b=this;return b.owner&&b.owner.proxy.target(a,b.proxy,b.proxy.status())}},g.onBegin=function(a){var b=this,c=b.delay.callback,d;j.unshift(b),g.actives.unshift(b.proxy),b.delTimer(),b.delay.callback=0;if(c){b.trust=1,c.call(b.proxy),b.trust=0;if(b.pause||b.pending)return}!b.ownUp&&(b.phase==1||b.phase==2)&&(d=b.nodes[b.tank.currentIndex]).upGate&&b.upOwner(d.upPath)},g.onTraverse=function(a,b){var c=this,e=c.tank,f=c.nodes[e.currentIndex];c.outNode&&(f.defs.length&&c.outNode.scopeDefs(1),c.outNode.store&&c.outNode.setStore(1),c.outNode=0);switch(b){case 1:f.lock&&(c.locked=1),f.defs.length&&f.scopeDefs(),f.store&&f.setStore();break;case 2:f.lock&&!f.plock&&(c.locked=0),c.outNode=f}c.phase=b,c.result=d,c.ownUp=0,f.index!==c.route.slice(-1)[0]&&c.route.push(f.index),~e.targetIndex||c.targets.shift(),f.fncs[b]&&(c.trust=1,c.calls.push(f.index+"."+b),c.result=f.fncs[b].apply(c.proxy,c.targets.length?[]:c.args),c.trust=0),c.pending&&e.stop(),f.upGate&&(b==1||b==2)&&!c.pause&&!c.pending&&(c.upOwner(f.upPath),c.ownUp=1)},g.onEnd=function(a){var b=this,c=b.tank,d=j[1],e=b.pause||b.pending||b.phase,f=b.nodes[c.currentIndex];if(!e&&b.targets.length)c.go(b.targets[0]);else{if(e)b.pending||(b.pause=1),d&&d.nodes[d.tank.currentIndex].pendable&&f.pendable&&!b.pendees[d.tank.id]&&(d.pending++,b.pendees[d.tank.id]=d,d.tank.stop());else{if(f.upOwn&&!b.ownUp){b.upOwner(f.upPath),b.ownUp=!b.owner.trust;if(b.targets.length)return}b.args=[],b.calls=[],b.route=[],b.pendees.length&&(b.pendees.forEach(function(a){a.pending--}),c.post(function(){b.pendees.splice(0).forEach(function(a){!a.pending&&!a.pause&&a.go()})}))}j.shift(),g.actives.shift()}},g.node.canTgt=function(a){var b=this.pkg.nodes[this.restrict];return!b||a.within(b)},g.node.scopeDefs=function(a){var b=this,c=b.pkg;b.defs.length&&(a?c.defStack.shift():c.defStack.unshift(b.defs),b.defs.forEach(function(b){var d=c.getDef(b.name);a?(d.values.shift(),d.values.length||delete c.defs[b.name]):d.values.unshift(b.use?b.value:d.values[0])}))},g.node.setStore=function(a){var b=this,c=b.store,d=b.pkg,e=d.stores[0],f=[];a?(c.capture?c.scope?d.stores.shift():(e.programs.length-=c.programs.length,e.paths.length-=c.paths.length,e.states.length-=c.states.length,c.limit&&e.limits.shift()):c.filter?e.filters.pop():c.scope?d.stores.shift():e.active.shift(),d.stores[0]&&(d.stores[0].cache=0)):c.capture?c.scope?d.addStore(c):(e.prgms=e.prgms.concat(c.prgms),e.paths=e.paths.concat(c.paths),e.states=e.states.concat(c.states),e.limits.unshift(c.limit)):c.filter?e.filters.push(c):c.scope?d.addStore({prgms:f,paths:f,states:f,limit:0,capture:0}):e.active.unshift(0),d.stores.length&&d.stores[0].limits[0]&&d.stores[0].limits[0]<d.stores[0].items.length&&(d.stores[0].items=d.stores[0].items.slice(-d.stores[0].limits[0]))},g.node.within=function(a){var b=arguments.length?typeof a=="object"?a:this.pkg.nodes[a]:this.pkg.nodes[this.pkg.tank.currentIndex];return b?b!==this&&(!b.index||!this.path.indexOf(b.path)):!1},g.proxy.map=function(a){var b=g(this),c=b.nodes;return a?c[b.tank.currentIndex].map:c[1].map},g.proxy.query=function(a){var b=g(this),c=arguments,d=[];return c.length&&[].slice.call(arguments).every(function(a){var c=b.vetIndexOf(a),e=0;return~c&&(d.push(b.nodes[c].path),e=1),e})?d.length>1?d:d[0]:!1},g.proxy.lock=function(a){var b=g(this);return arguments.length?b.allowed()?(b.locked=!!a,!0):!1:!!b.locked},g.proxy.bless=function(a){var b=g(this);return b.allowed()&&typeof a=="function"?function(){var c=b.trust,d;return b.trust=1,d=a.apply(this,arguments),b.trust=c,d}:!1},g.proxy.def=function(a,b){var c=g(this),d=arguments.length,e,f=!1;if(d)switch(typeof a){case"string":m(a)&&(e=c.getDef(a),d>1?(e.values[0]=b,f=!0):f=e.values[0]);break;case"boolean":a&&d==1&&(f=c.defStack[0].map(function(a){return a.name}));break;case"object":a&&(e=Object.keys(a),e.every(function(a){return m(a)})&&(e.forEach(function(b){c.proxy.def(b,a[b])}),f=!0))}else f=Object.keys(c.defs),f.sort();return f},g.proxy.args=function(a,c){var e=g(this),f=e.args,h=arguments.length,i=typeof a;if(h===1||h&&(e.allowed()||!e.locked)){if(a instanceof b)return e.args=[].concat(a),!0;if(i==="number"&&!isNaN(a)&&a>=0)return h>1?(c===d&&a===f.length-1?f.pop():f[a]=c,!0):f[a]}else if(!h)return[].concat(f);return!1},g.proxy.target=function(a){var b=g(this),c=b.allowed()||!b.locked?b.vetIndexOf(a):-1;return~c?(b.args=[].slice.call(arguments).slice(1),b.targets=[c],b.go(),b.allowed()?!b.pending:b.phase||b.pause?!1:b.result===d||b.result):!1},g.proxy.go=function(a){var b=g(this),c=b.pause,d=[],e=0;return(b.allowed()||!b.locked)&&[].slice.call(arguments).every(function(a){var c=b.vetIndexOf(a);return d.push(c),~c})&&(d.length&&(d.slice(-1)[0]===b.targets[0]&&d.pop(),b.targets=d.concat(b.targets)),e=b.go()||c),!!e},g.proxy.wait=function(){var a=g(this),b=arguments,c=b.length,d=c<2,e=d?0:b[0],f=typeof e=="function",h=a.indexOf(e),i=b[c-1],j=0;return a.allowed()&&(!c||i>=0&&typeof i=="number"&&(d||~h||f))&&(a.pause=1,a.tank.stop(),a.delTimer(),a.delay.timer=c?setTimeout(function(){!d&&~h?a.proxy.pkgs.core.target(h):(f&&(a.delay.callback=e),a.go())},~~i):1,j=1),!!j},g.proxy.owner=function(){var a=g(this);return a.owner&&(a.allowed()?a.owner.proxy:!0)||!1},g.proxy.store=function(){var a=[].slice.call(arguments),b=g(this),c=0,d=b.stores[0],f=[],h;return a.length?(b.allowed()&&(a.slice(-1)[0]===!1&&(a.pop(),c=1),!a.every(function(a){return a instanceof e})),!1):(d&&(d.cache&&d.cache[0].some(function(a,b){return a.tank.currentIndex!=d.cache[1][b]})&&(d.cache=0),d.cache||(h=[],d.cache=[d.items.filter(function(a){var b=a.nodes[a.tank.currentIndex],c=a.nodes[0].value,e=b.path,f=b.name;return d.filters.every(function(a){return!(a.prgms.length+a.paths.length+a.states.length)||a.prgms.some(function(a){return c===a})||a.paths.some(function(a){return~e.indexOf(a)})||a.states.some(function(a){return~f.indexOf(a)})})&&h.push(b.index)}).slice(-d.limits[0]),h.slice(-d.limits[0])],d.cache[2]=d.cache[0].map(function(a){return a.proxy})),f=d.cache[2].concat()),f)},g.proxy.status=function(){function c(b){return a.nodes[b].path}var a=g(this),b=a.nodes[a.tank.currentIndex];return{trust:!!a.trust,permit:!!a.allowed(),loops:Math.max((a.calls.join().match(new RegExp("\\b"+b.index+"."+a.phase,"g"))||[]).length-1,0),depth:b.depth,paused:!!a.pause,pending:!!a.pending,pendable:!!b.pendable,targets:a.targets.map(c),route:a.route.map(c),path:b.path,index:b.index,phase:g.events[a.phase],state:b.name}},(a?exports:c).Flow=e}(typeof require!="undefined",Array,this);