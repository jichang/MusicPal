!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t,n,r,a,o,i,u={};function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e,t,n){return(c=!/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}()?function(e,t,n){var r=[null];r.push.apply(r,t);var a=new(Function.bind.apply(e,r));return n&&l(a,n.prototype),a}:Reflect.construct).apply(null,arguments)}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var o=[],i=!0,u=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(u)throw r}}return o}}(e,t)||p(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e){return function(e){if(Array.isArray(e))return f(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||p(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}e(u,"TickType",function(){return i}),e(u,"startTask",function(){return P}),e(u,"stopTask",function(){return N});var y=Symbol("Comlink.proxy"),m=Symbol("Comlink.endpoint"),h=Symbol("Comlink.releaseProxy"),g=Symbol("Comlink.finalizer"),b=Symbol("Comlink.thrown"),I=function(e){return"object"==typeof e&&null!==e||"function"==typeof e},S=new Map([["proxy",{canHandle:function(e){return I(e)&&e[y]},serialize:function(e){var t=new MessageChannel,n=t.port1,r=t.port2;return E(e,n),[r,[r]]},deserialize:function(e){return e.start(),function e(t){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},o=!1,i=new Proxy(a,{get:function(n,a){if(k(o),a===h)return function(){w&&w.unregister(i),A(t),o=!0};if("then"===a){if(0===r.length)return{then:function(){return i}};var u=C(t,{type:"GET",path:r.map(function(e){return e.toString()})}).then(j);return u.then.bind(u)}return e(t,v(r).concat([a]))},set:function(e,n,a){k(o);var i=d(R(a),2),u=i[0],l=i[1];return C(t,{type:"SET",path:v(r).concat([n]).map(function(e){return e.toString()}),value:u},l).then(j)},apply:function(n,a,i){k(o);var u=r[r.length-1];if(u===m)return C(t,{type:"ENDPOINT"}).then(j);if("bind"===u)return e(t,r.slice(0,-1));var l=d(x(i),2),c=l[0],s=l[1];return C(t,{type:"APPLY",path:r.map(function(e){return e.toString()}),argumentList:c},s).then(j)},construct:function(e,n){k(o);var a=d(x(n),2),i=a[0],u=a[1];return C(t,{type:"CONSTRUCT",path:r.map(function(e){return e.toString()}),argumentList:i},u).then(j)}});return n=(O.get(t)||0)+1,O.set(t,n),w&&w.register(i,t,i),i}(e,[],void 0)}}],["throw",{canHandle:function(e){return I(e)&&b in e},serialize:function(e){var t=e.value;return[t instanceof Error?{isError:!0,value:{message:t.message,name:t.name,stack:t.stack}}:{isError:!1,value:t},[]]},deserialize:function(e){if(e.isError)throw Object.assign(Error(e.value.message),e.value);throw e.value}}]]);function E(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:globalThis,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:["*"];t.addEventListener("message",function r(a){if(a&&a.data){if(!function(e,t){var n=!0,r=!1,a=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var u=o.value;if(t===u||"*"===u||u instanceof RegExp&&u.test(t))return!0}}catch(e){r=!0,a=e}finally{try{n||null==i.return||i.return()}finally{if(r)throw a}}return!1}(n,a.origin)){console.warn("Invalid origin '".concat(a.origin,"' for comlink proxy"));return}var o,i=Object.assign({path:[]},a.data),u=i.id,l=i.type,f=i.path,p=(a.data.argumentList||[]).map(j);try{var m=f.slice(0,-1).reduce(function(e,t){return e[t]},e),h=f.reduce(function(e,t){return e[t]},e);switch(l){case"GET":o=h;break;case"SET":m[f.slice(-1)[0]]=j(a.data.value),o=!0;break;case"APPLY":o=h.apply(m,p);break;case"CONSTRUCT":I=c(h,v(p)),o=Object.assign(I,s({},y,!0));break;case"ENDPOINT":var I,S,k=new MessageChannel,A=k.port1,O=k.port2;E(e,O),S=[A],L.set(A,S),o=A;break;case"RELEASE":o=void 0;break;default:return}}catch(e){o=s({value:e},b,0)}Promise.resolve(o).catch(function(e){return s({value:e},b,0)}).then(function(n){var a=d(R(n),2),o=a[0],i=a[1];t.postMessage(Object.assign(Object.assign({},o),{id:u}),i),"RELEASE"===l&&(t.removeEventListener("message",r),T(t),g in e&&"function"==typeof e[g]&&e[g]())}).catch(function(e){var n=d(R(s({value:TypeError("Unserializable return value")},b,0)),2),r=n[0],a=n[1];t.postMessage(Object.assign(Object.assign({},r),{id:u}),a)})}}),t.start&&t.start()}function T(e){"MessagePort"===e.constructor.name&&e.close()}function k(e){if(e)throw Error("Proxy has been released and is not useable")}function A(e){return C(e,{type:"RELEASE"}).then(function(){T(e)})}var O=new WeakMap,w="FinalizationRegistry"in globalThis&&new FinalizationRegistry(function(e){var t=(O.get(e)||0)-1;O.set(e,t),0===t&&A(e)});function x(e){var t,n=e.map(R);return[n.map(function(e){return e[0]}),(t=n.map(function(e){return e[1]}),Array.prototype.concat.apply([],t))]}var L=new WeakMap;function R(e){var t=!0,n=!1,r=void 0;try{for(var a,o=S[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){var i=d(a.value,2),u=i[0],l=i[1];if(l.canHandle(e)){var c=d(l.serialize(e),2),s=c[0],f=c[1];return[{type:"HANDLER",name:u,value:s},f]}}}catch(e){n=!0,r=e}finally{try{t||null==o.return||o.return()}finally{if(n)throw r}}return[{type:"RAW",value:e},L.get(e)||[]]}function j(e){switch(e.type){case"HANDLER":return S.get(e.name).deserialize(e.value);case"RAW":return e.value}}function C(e,t,n){return new Promise(function(r){var a=[,,,,].fill(0).map(function(){return Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)}).join("-");e.addEventListener("message",function t(n){n.data&&n.data.id&&n.data.id===a&&(e.removeEventListener("message",t),r(n.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:a},t),n)})}(t=a||(a={}))[t.None=0]="None",t[t.Light=1]="Light",t[t.Accent=2]="Accent",t[t.Invalid=3]="Invalid",(n=o||(o={}))[n.C=0]="C",n[n.CSharp=1]="CSharp",n[n.D=2]="D",n[n.DSharp=3]="DSharp",n[n.E=4]="E",n[n.F=5]="F",n[n.FSharp=6]="FSharp",n[n.G=7]="G",n[n.GSharp=8]="GSharp",n[n.A=9]="A",n[n.ASharp=10]="ASharp",n[n.B=11]="B",o.A,a.Accent,o.A,a.Light,o.A,a.None;var M=new Map;function P(e,t){var n=e.id,r=e.rhythm,a=e.preparatoryTime,o=e.beginTime,i=e.tempo,u=e.ticksCount,l=e.ticksPerBeat,c=-1,s=function(){var n=function(e,t,n){for(var r=0,a=0,o=0,i=0,u=0,l=0,c=0,s=0;s<e.measures.length;s++)for(var f=e.measures[s],p=0;p<f.repeat;p++)for(var d=0;d<f.beats.length;d++){var v=f.beats[d],y=c+t;if(y-1<n){c=y,i+=1,l+=v.notes.length;continue}return r=s,a=p,o=d,l+=u=Math.floor(n%t/(t/v.notes.length)),{measureOffset:a,measureIndex:r,beatIndex:o,beatOffset:i,noteIndex:u,noteOffset:l}}return{measureOffset:a,measureIndex:r,beatIndex:o,beatOffset:i,noteIndex:u,noteOffset:l}}(r,l,++c),a=n.measureIndex;if(t({type:"tick",tick:{measureOffset:n.measureOffset,measureIndex:a,beatIndex:n.beatIndex,beatOffset:n.beatOffset,noteIndex:n.noteIndex,noteOffset:n.noteOffset,tickIndex:c}},e),c>=u-1){var o=M.get(e.id);(null==o?void 0:o.tickIntervalId)&&(self.clearInterval(null==o?void 0:o.tickIntervalId),o.tickIntervalId=null)}},f=6e4/(l*i.speed),p=self.setTimeout(function(){t({type:"preparatory"},e)},a),d=self.setTimeout(function(){var t=M.get(e.id);t&&(t.tickIntervalId=self.setInterval(s,f))},o-f);M.set(n,{beginTimeoutId:d,preparatoryTimeoutId:p,tickIntervalId:null})}function N(e){var t=M.get(e.id);(null==t?void 0:t.preparatoryTimeoutId)&&self.clearTimeout(t.preparatoryTimeoutId),(null==t?void 0:t.beginTimeoutId)&&self.clearTimeout(t.beginTimeoutId),(null==t?void 0:t.tickIntervalId)&&self.clearInterval(t.tickIntervalId)}(r=i||(i={}))[r.First=0]="First",r[r.Middle=1]="Middle",r[r.Last=2]="Last",E({startTask:P,stopTask:N})}();
//# sourceMappingURL=ticker.7b56a5df.js.map