(function(){"use strict";const Ae=Symbol(),ue=function(e){try{return e(...[].slice.call(arguments,1))}catch(t){return setTimeout(()=>{throw t}),t instanceof Error?t:t=new Error(t)}};function F(e,t){if(e)throw new Error(`Reatom error: ${t}`)}const K=e=>e?.__reatom!==void 0,W=e=>e.subs.size+e.listeners.size>0;function de(e){F(typeof e!="function",`invalid "${typeof e}", function expected`)}const we=e=>e.cause===null?e:we(e.cause);let G;const We=({callLateEffect:e=ue,callNearEffect:t=ue}={})=>{let o=new WeakMap,n=g=>o.get(g),s=new Set,c=[],a=[],r=!1,u=null,i=[],l=[],y=[],d=0,A=0,C=!1,m=()=>{for(let g of c)t(g,V);c=[]},_=()=>{if(!C){C=!0,m();for(let g of a)e(g,V),c.length>0&&m();a=[],C=!1}},w=({state:g,proto:p,pubs:E,subs:f,listeners:h},v)=>(p.actual=!1,y.push(p.patch={state:g,proto:p,cause:v,pubs:E,subs:f,listeners:h}),p.patch),j=g=>{for(let p of g.subs){let E=p.patch??n(p);p.patch&&!p.actual||w(E,g).listeners.size===0&&j(E)}},b=(g,p)=>{if(p.subs.delete(g)&&(l.push(()=>p.subs.add(g)),!W(p))){p.proto.disconnectHooks!==null&&c.push(...p.proto.disconnectHooks);for(let E of p.pubs)b(p.proto,E)}},R=(g,p)=>{if(!p.subs.has(g)){let E=W(p);if(p.subs.add(g),l.push(()=>p.subs.delete(g)),!E){p.proto.connectHooks!==null&&c.push(...p.proto.connectHooks);for(let f of p.pubs)R(p.proto,f)}}},$=(g,p,E)=>{let{patch:f,actual:h}=p,v=E!==void 0;if(!v&&h&&(f.pubs.length===0||W(f)))return f;let P=f??n(p),Ne=!P,Ie=v?g.cause:n(fe);if(Ne)P={state:p.initState(g),proto:p,cause:Ie,pubs:[],subs:new Set,listeners:new Set};else if(p.computer===null&&!v)return P;f&&!h||(f=w(P,Ie));let{state:Tt}=f,D={get:g.get,spy:void 0,schedule:g.schedule,subscribe:g.subscribe,cause:f};try{p.computer&&((I,N)=>{let{proto:Oe,pubs:O}=N,ze=!1;if(O.length===0||O.some(({proto:z,state:L})=>!Object.is(L,(N.cause=$(I,z)).state))){let z=[];if(I.spy=({__reatom:L},M)=>{if(N.pubs===O){let ie=$(I,L),ae=z.push(ie)<=O.length?O[z.length-1]:void 0,le=ae?.proto!==ie.proto;ze||=le;let ce=L.isAction&&!le?ie.state.slice(ae.state.length):ie.state;if(!M||!le&&Object.is(ce,ae.state))return ce;if(L.isAction)for(const Lt of ce)M(Lt);else M(ce,le?void 0:ae?.state)}else F(!0,"async spy")},N.state=N.proto.computer(I,N.state),N.pubs=z,(ze||O.length>z.length)&&W(N)){for(let{proto:L}of O)z.every(M=>M.proto!==L)&&b(Oe,L.patch??n(L));for(let{proto:L}of z)O.every(M=>M.proto!==L)&&R(Oe,L.patch??n(L))}}})(D,f),v&&(f.cause=g.cause,E(D,f)),p.actual=!0}catch(I){throw f.error=I}if(!Object.is(Tt,f.state)&&(f.subs.size>0&&(v||f.listeners.size>0)&&j(f),p.updateHooks)){let I={get:D.get,spy:void 0,schedule:D.schedule,subscribe:D.subscribe,cause:D.cause};p.updateHooks.forEach(N=>i.push(()=>N(I,f)))}return f},V={get(g){if(F(G&&we(G.cause)!==n(fe),"cause collision"),K(g)){let f=g.__reatom;if(r)return $(this,f).state;let h=n(f);return h===void 0||f.computer!==null&&!W(h)?this.get(()=>$(this,f).state):h.state}if(F(u!==null,"tr failed"),r)return g(n,$);r=!0,d=c.length,A=a.length;let p=G===void 0;p&&(G=this);try{var E=g(n,$);for(let f=0;f<y.length;f++){let{listeners:h,proto:v}=y[f];if(h.size>0&&$(this,v),i.length>0)for(let P of i.splice(0))P(this)}if(y.length)for(let f of s)f(y);for(let f of y){let{proto:h,state:v}=f;if(h.isAction&&(f.state=[]),f===h.patch)if(h.patch=null,h.actual=!1,o.set(h,f),h.isAction){if(v.length===0)continue;for(let P of f.listeners)c.push(()=>P(v))}else for(let P of f.listeners)a.push(()=>P(n(h).state))}}catch(f){u=f=f instanceof Error?f:new Error(String(f));for(let h of s)h(y,f);for(let h of l)ue(h,f);for(let{proto:h}of y)h.patch=null,h.actual=!1;throw c.length=d,a.length=A,f}finally{r=!1,u=null,i=[],l=[],y=[],d=0,A=0,p&&(G=void 0)}return _(),E},spy:void 0,schedule(g,p=1){return de(g),F(!this,"missed context"),new Promise((E,f)=>{p===-1?r&&l.push(g):p===0?r&&i.push(()=>g(this)):((p===1?c:a).push(()=>{try{let h=g(this);return h instanceof Promise?h.then(E,f):E(h),h}catch(h){throw f(h),h}}),r||_())})},subscribe(g,p=g){if(de(p),g===p)return s.add(p),()=>s.delete(p);let{__reatom:E}=g,f=Ae,h=P=>Object.is(f,P)||p(f=P),v=n(E);return v!==void 0&&W(v)?v.listeners.add(h):this.get(()=>{v=$(this,E,(P,Ne)=>{}),v.listeners.add(h),l.push(()=>E.patch.listeners.delete(h)),E.connectHooks!==null&&c.push(...E.connectHooks);for(let P of v.pubs)R(E,P)}),f===Ae&&h((E.patch??n(E)).state),()=>{if(v.listeners.delete(h)&&!W(v)){E.disconnectHooks&&c.push(...E.disconnectHooks);for(let P of v.pubs)b(E,P);r||(l.length=0,_())}}},cause:void 0};return(V.cause=V.get(()=>$(V,fe))).cause=null,V};let Me=0,Y=e=>`${e}#${++Me}`;function qe(){return[].slice.call(arguments).reduce((e,t)=>t(e),this)}function Be(e){const t=(o,n)=>e(o,n.state);return(this.__reatom.updateHooks??=new Set).add(t),()=>this.__reatom.updateHooks.delete(t)}function Ve(e){return this.onChange((t,o)=>{const{params:n,payload:s}=o[o.length-1];e(t,s,n)})}function k(e,t=Y("_atom")){let o=(s,c)=>s.get((a,r)=>r(s,o.__reatom,(u,i)=>{i.state=typeof c=="function"?c(i.state,u):c}).state),n=null;return typeof e=="function"&&(o={},n=e,e=void 0),o.__reatom={name:t,isAction:!1,patch:null,initState:()=>e,computer:n,connectHooks:null,disconnectHooks:null,updateHooks:null,actual:!1},o.pipe=qe,o.onChange=Be,Ce.length===0?o:o.pipe(...Ce)}const T=(e,t)=>{e!==void 0&&typeof e!="string"||(t=e,e=(n,s)=>s),de(e);let o=k([],t??Y("_action"));return o.__reatom.isAction=!0,o.__reatom.unstable_fn=e,Object.assign(function(){var n=[].slice.call(arguments);let s=o(n[0],(c,a)=>(n[0]=a,[...c,{params:n.slice(1),payload:a.cause.proto.unstable_fn(...n)}]));return s[s.length-1].payload},o,{onCall:Ve})},Ce=[],fe=k(void 0,"root").__reatom,H=()=>{},J=e=>typeof e=="object"&&e!==null,De=e=>{if(!J(e))return!1;const t=Reflect.getPrototypeOf(e);return!t||!Reflect.getPrototypeOf(t)},Ge=(e,t,o=Object.is)=>{if(Object.is(e,t))return!0;if(!J(e)||!J(t)||e.__proto__!==t.__proto__||e instanceof Error)return!1;if(Symbol.iterator in e){let n=e instanceof Map?(a,r)=>o(a[0],r[0])&&o(a[1],r[1]):o,s=e[Symbol.iterator](),c=t[Symbol.iterator]();for(;;){let a=s.next(),r=c.next();if(a.done||r.done||!n(a.value,r.value))return a.done&&r.done}}if(e instanceof Date)return e.getTime()===t.getTime();if(e instanceof RegExp)return String(e)===String(t);for(let n in e)if(n in t==0||!o(e[n],t[n]))return!1;return Object.keys(e).length===Object.keys(t).length},Q=Object.assign,x=function(){return Object.assign({},...[].slice.call(arguments))},Je=(e=0,t=Number.MAX_SAFE_INTEGER-1)=>Math.floor(Math.random()*(t-e+1))+e,{toString:Xe}=Object.prototype,q=e=>{if(e instanceof Error==0||e.name!=="AbortError"){if(e instanceof Error){var t={cause:e};e=e.message}else e=J(e)?Xe.call(e):String(e);typeof DOMException>"u"?(e=new Error(e,t)).name="AbortError":e=Q(new DOMException(e,"AbortError"),t)}return e},pe=e=>{if(e?.signal.aborted)throw q(e.signal.reason)},me=e=>e instanceof Error&&e.name==="AbortError",ve=e=>t=>Q(t,e(t,t.__reatom.name)),Ue=Symbol("Reatom linked list next"),Ze=e=>e?.__reatomLinkedList===!0;let X=new WeakMap,he=(e,t)=>{Promise.resolve().then(()=>{if(e.isConnected)for(;e.parentElement&&!X.get(e)?.push(()=>e.isConnected||t());)e=e.parentElement;else t()})};const Ke=(e,t=globalThis.window)=>{let o,n={},s="",c=(r,u,i)=>{if(u.startsWith("on:"))u=u.slice(3),i=T(i,`${s}.${r.nodeName.toLowerCase()}._${u}`),r.addEventListener(u,l=>i(e,l));else if(u.startsWith("css:"))u="--"+u.slice(4),i==null?r.style.removeProperty(u):r.style.setProperty(u,String(i));else if(u==="css"){o??=t.document.getElementById("reatom-jsx-styles"),o||(o=t.document.createElement("style"),o.id="reatom-jsx-styles",t.document.head.appendChild(o));let l=n[i];l||(l=n[i]="reatom-"+Je(),o.innerText+="."+l+"{"+i+`}
`),r.classList.add(l)}else if(u==="style"&&typeof i=="object")for(const l in i)i[l]==null?r.style.removeProperty(l):r.style.setProperty(l,i[l]);else u.startsWith("prop:")?r[u.slice(5)]=i:(u.startsWith("attr:")&&(u=u.slice(5)),i==null?r.removeAttribute(u):r.setAttribute(u,String(i)))},a=()=>{};return{h:function(r,u){var i=[].slice.call(arguments,2);if(r===a)return i;if(typeof r=="function"){(u??={}).children=i;let d=r.name;try{return s=r.name,r(u)}finally{s=d}}let l=r.startsWith("svg:")?t.document.createElementNS("http://www.w3.org/2000/svg",r.slice(4)):t.document.createElement(r);for(let d in u){let A=u[d];if(K(A)&&!A.__reatom.isAction){if(d.startsWith("model:")){let m=d=d.slice(6);c(l,"on:input",(_,w)=>{A(_,m==="valueAsNumber"?+w.target.value:w.target[m])}),d==="valueAsNumber"&&(d="value"),d="prop:"+d}let C;C=e.subscribe(A,m=>!C||l.isConnected?d==="$spread"?Object.entries(m).forEach(([_,w])=>c(l,_,w)):c(l,d,m):C()),he(l,C)}else c(l,d,A)}let y=d=>{if(Array.isArray(d))for(let C=0;C<d.length;C++)y(d[C]);else if(Ze(d))((C,m,_)=>{let w=-1;he(m,C.subscribe(_,j=>{if(j.version-1>w){m.innerHTML="";for(let{head:b}=j;b;b=b[Ue])m.append(b)}else for(const b of j.changes){if(b.kind==="create"&&m.append(b.node),b.kind==="remove"&&m.removeChild(b.node),b.kind==="swap"){let[R,$]=[b.a.nextSibling,b.b.nextSibling];$?m.insertBefore(b.a,$):m.append(b.a),R?m.insertBefore(b.b,R):m.append(b.b)}b.kind==="move"&&(b.after?b.after.insertAdjacentElement("afterend",b.node):m.append(b.node)),b.kind==="clear"&&(m.innerHTML="")}w=j.version}))})(e,l,d);else if(K(d)){let C,m=t.document.createTextNode("");var A=e.subscribe(d,_=>{try{if(A&&!m.isConnected&&m instanceof t.DocumentFragment==0)A();else if(F(Array.isArray(_)&&i.length>1,"array children with other children are not supported"),_ instanceof t.HTMLElement){let w=X.get(_);w||X.set(_,w=[]),A&&l.replaceChild(_,m),m=_}else if(Array.isArray(_))if(A)l.replaceChildren(..._);else{const w=new t.DocumentFragment;_.forEach(j=>w.append(j)),m=w}else m.textContent=String(_)}catch(w){C=w}});if(C)throw C;he(l,A),l.appendChild(m)}else l.appendChild(J(d)&&"nodeType"in d?d:t.document.createTextNode(String(d)))};return i.forEach(y),l},hf:a,mount:(r,u)=>{r.append(...[u].flat(1/0)),new t.MutationObserver(i=>{for(let l of i)for(let y of l.removedNodes){let d=X.get(y);d&&(d.forEach(A=>A()),X.delete(y))}}).observe(r,{childList:!0,subtree:!0})}}},Ye=We(),{h:S,hf:Qe,mount:xe}=Ke(Ye);function et(e,t){try{var o=e()}catch(n){return t(n)}return o&&o.then?o.then(void 0,t):o}class ke extends WeakMap{has(t){return super.has(t)||t.cause!==null&&this.has(t.cause)}get(t){for(;!super.has(t)&&t.cause;)t=t.cause;return super.get(t)}}const ee=new ke,Pe=e=>ee.get(e)??null,ge=(e,t)=>{const o=Pe(e.cause);if(o){const n=()=>t(q(o.signal.reason)),s=()=>o.signal.removeEventListener("abort",n);if(!o.signal.aborted)return o.signal.addEventListener("abort",n),e.schedule(()=>o.signal.removeEventListener("abort",n),-1),s;n()}},be=new WeakMap,te=(e,t,o,n)=>{let s=be.get(t);if(!s){const c=t.then(a=>(e.get((r,u)=>s.then.forEach(i=>i(a,r,u))),a),a=>{throw e.get((r,u)=>s.catch.forEach(i=>i(a,r,u))),me(a)&&c.catch(H),a});be.set(t,s={promise:c,then:[],catch:[]}),be.set(c,s)}return o&&s.then.push(o),n&&s.catch.push(n),s.promise},je=e=>{const{schedule:t}=e;return x(e,{schedule(o,n){const s=this;if(n===-1)return t.call(this,o,n);let c,a;const r=new Promise((i,l)=>{c=i,a=l}),u=ge(this,i=>{r.catch(H),a(i)});return t.call(this,function(i){try{let l=function(){u?.()};const y=Pe(s.cause),d=et(function(){return pe(y),Promise.resolve(o(i)).then(function(A){pe(y),c(A)})},function(A){a(A)});return Promise.resolve(d&&d.then?d.then(l):l())}catch(l){return Promise.reject(l)}},n),r}})},oe=e=>e.cause===null?e:oe(e.cause),tt=(e,t)=>oe(e.cause)===oe(t.cause),ot=(e,t)=>(e.__reatom.connectHooks??=new Set).add(t),nt=(e,t)=>(e.__reatom.disconnectHooks??=new Set).add(t),st=e=>t=>{const{initState:o,isAction:n}=t.__reatom;return F(n,"action state is not manageable"),t.__reatom.initState=s=>e(s,o),t},ne=(e,t)=>{const o=s=>{const c=x(s.get(l=>l(e.__reatom)),{cause:oe(s.cause)}),a=new AbortController;ee.set(c,a);const r=t(x(s,{cause:c,controller:a,isConnected:()=>rt(s,e)}));r instanceof Promise&&r.catch(H);const u=l=>{tt(s,l)&&i.delete(u)&&n.has(o)&&(a.abort(q(`${e.__reatom.name} disconnect`)),typeof r=="function"&&r())},i=nt(e,u)},n=ot(e,o);return()=>n.delete(o)},rt=(e,{__reatom:t})=>e.get(o=>{const n=t.patch??o(t);return!!n&&n.subs.size+n.listeners.size>0}),it=k(null,"initializations");it.__reatom.initState=()=>new WeakMap;const at=(e,t,{shouldPending:o=!0,shouldFulfill:n=!0,shouldReject:s=!0,effect:c=e.__reatom.unstable_fn}={})=>{const a=e.pendingAtom,[r]=t;o&&a(r,i=>++i);const u=r.schedule(()=>new Promise((i,l)=>{pe(r.controller),c(...t).then(i,l),r.controller.signal.addEventListener("abort",()=>l(q(r.controller.signal.reason)))}));return Q(te(r,u,i=>{n&&e.onFulfill(r,i),o&&a(r,l=>--l)},i=>{s&&!me(i)&&e.onReject(r,i),o&&a(r,l=>--l)}),{controller:r.controller})},_e=e=>t=>{const o=e(t);return Ge(t,o)?t:o},Te={isPending:!1,isFulfilled:!1,isRejected:!1,isSettled:!1,isFirstPending:!1,isEverPending:!1,isEverSettled:!1},lt=()=>e=>{if(!e.statusesAtom){const t=k(new WeakSet,`${e.__reatom.name}.statusesAtom._relatedPromisesAtom`),o=k(Te,`${e.__reatom.name}.statusesAtom`);o.__reatom.computer=(n,s)=>(n.spy(e,({payload:c})=>{n.get(t).add(c);const a=n.get(e.pendingAtom);s=_e(r=>({isPending:a>0,isFulfilled:!1,isRejected:!1,isSettled:!1,isFirstPending:!r.isEverPending,isEverPending:!0,isEverSettled:r.isEverSettled}))(s)}),s),e.statusesAtom=Object.assign(o,{reset:T(n=>(t(n,new Set),o(n,Te)))}),e.onCall((n,s)=>{n.get(o),te(n,s,()=>{n.get(t).has(s)&&o(n,_e(()=>{const c=n.get(e.pendingAtom)>0;return{isPending:c,isFulfilled:!c,isRejected:!1,isSettled:!c,isFirstPending:!1,isEverPending:!0,isEverSettled:!0}}))},c=>{if(n.get(t).has(s)){const a=n.get(e.pendingAtom)>0;o(n,_e(r=>me(c)&&!r.isEverSettled?{isPending:a,isFulfilled:!1,isRejected:!1,isSettled:!1,isFirstPending:!1,isEverPending:!0,isEverSettled:!1}:{isPending:a,isFulfilled:!1,isRejected:!a,isSettled:!a,isFirstPending:!1,isEverPending:!0,isEverSettled:!0}))}})})}return e},Ee=new WeakSet,ct=(e,t=Y("asyncAtom"))=>{const o=new ke,n=Se(a=>{const r=o.get(a.cause);return F(!r,"reaction manual call"),r},t),s=k((a,r)=>{if(r&&!a.cause.pubs.length)return r;const u=[],i=x(a,{spy(j,b){F(b,"spy reactions are unsupported in AsyncReaction");const R=a.spy(j);return u.push(R),R}}),l=new AbortController,y=ge(i,j=>l.abort(j));y&&l.signal.addEventListener("abort",y),ee.set(i.cause,i.controller=l);const d=e(je(i));d.catch(H),o.set(i.cause,d);const A=i.get(n.pendingAtom),C=i.get(n.onFulfill);let m=n(i,...u);m.controller.signal.addEventListener("abort",()=>{c.cacheAtom?.options.ignoreAbort||l.abort(m.controller.signal.reason)});const _=A===i.get(n.pendingAtom),w=i.get(n.onFulfill);return _&&l.abort(q("cached")),_&&C!==w&&(m=Object.assign(Promise.resolve(w[w.length-1].payload),{controller:l})),te(i,m,()=>Ee.add(m),()=>Ee.add(m)).catch(H),r?.controller.abort(q("concurrent")),m},`${t}._promiseAtom`);ne(n,a=>a.subscribe(s,H)),ne(s,a=>()=>{const r=a.get(s);r.controller.abort(a.controller.signal.reason),Ee.has(r)||Le(a,s.__reatom)});const c=Object.assign(a=>a.get((r,u)=>{Le(a,s.__reatom),u(a,s.__reatom,H);const i=a.get(n),l=i[i.length-1]?.payload;return F(!l,"unexpectedly failed invalidation. Please, report the issue"),l}),n,{promiseAtom:s,init:a=>a.subscribe(s,H)});return Object.defineProperty(n,"_handleCache",{get:()=>c._handleCache}),c},Le=(e,t)=>e.get((o,n)=>{n(e,t,(s,c)=>{c.pubs=[],c.state=void 0})}),Se=(e,t={})=>{const{name:o=Y("async"),onEffect:n,onFulfill:s,onReject:c,onSettle:a}=typeof t=="string"?{name:t}:t,r=k(0,`${o}.pendingAtom`),u=Object.assign(function(){var d=[].slice.call(arguments);return d[0].get((A,C)=>{const{state:m}=C(d[0],u.__reatom,(_,w)=>{ee.set(_.cause,_.controller=new AbortController);const j=ge(d[0],R=>{b?.catch(H),_.controller.abort(R)});j&&_.controller.signal.addEventListener("abort",j),d[0]=je(_);var b=u._handleCache?u._handleCache(...d):at(u,d);te(_,b,void 0,()=>{l.__reatom.updateHooks.size>1&&b.catch(H)}),w.state=[...w.state,{params:d.slice(1),payload:b}]});return m[m.length-1].payload})},T(e,o)),i=T(`${o}.onFulfill`),l=T(`${o}.onReject`),y=T(`${o}._onSettle`);return i.onCall(d=>y(d)),l.onCall(d=>y(d)),n&&u.onCall((d,A,C)=>n(d,C,A)),s&&i.onCall(s),c&&l.onCall(c),a&&y.onCall(a),ne(r,d=>d.subscribe(u,H)),Q(u,{onFulfill:i,onReject:l,onSettle:y,pendingAtom:r})};Se.from=(e,t={})=>(e.name.length>2&&(typeof t=="object"?t.name??=e.name:t??=e.name),Se(function(o){return e(...[].slice.call(arguments,1))},t));const ut=(e,t)=>o=>{if(!o.dataAtom){const n=o.dataAtom=Object.assign(k(e,`${o.__reatom.name}.dataAtom`),{reset:T(s=>{n(s,e)},`${o.__reatom.name}.dataAtom.reset`),mapFulfill:t});n.__reatom.computer=(s,c)=>(s.spy(o.onFulfill,({payload:a})=>{c=a}),c),o.onFulfill.onCall(s=>{s.get(n)}),ne(n,s=>s.subscribe(o,H))}return o},U=(e,t)=>{for(;K(t);)t=e.spy?e.spy(t):e.get(t);if(typeof t!="object"||t===null)return t;if(De(t)){const o={};for(const n in t)o[n]=U(e,t[n]);return o}if(Array.isArray(t)){const o=[];for(const n of t)o.push(U(e,n));return o}if(t instanceof Map){const o=new Map;for(const[n,s]of t)o.set(n,U(e,s));return o}if(t instanceof Set){const o=new Set;for(const n of t)o.add(U(e,n));return o}return t},dt=k(null);dt.__reatom.initState=()=>new WeakMap;const ft=()=>e=>Object.assign(e,{reset:T(t=>t.get((o,n)=>n(t,e.__reatom,(s,c)=>c.state=c.proto.initState(t)).state),`${e.__reatom.name}._reset`)}),Z=k(16,"fontSizeAtom").pipe(ve((e,t)=>({increment:T(o=>e(o,n=>n+1),`${t}.increment`),decrement:T(o=>e(o,n=>n-1),`${t}.decrement`)})),ft()),pt=k(e=>e.spy(Z)+"px","fontSizeVariableAtom");function mt(){return S("div",null,S("h1",{css:"font-size: var(--size)","css:size":pt},"Font size: ",Z),S("button",{"on:click":Z.increment},"Increment"),S("button",{"on:click":Z.decrement},"Decrement"),S("button",{"on:click":Z.reset},"Reset"))}const ht=["get","post","put","patch","delete","head","options"];class gt extends Error{response;data;constructor({message:t,response:o,data:n}){super(t),this.name="FetchError",this.response=o,this.data=n}}function bt(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function _t(...e){const t={};for(const o of e){const n=new Headers(o);for(const[s,c]of n.entries())t[s]=c}return new Headers(t)}class ye{#t;#e;get;post;put;patch;delete;head;options;constructor(t,o={}){this.#t=t,this.#e=o;for(const n of ht)this[n]=(s,c)=>this.request(s,{...c,method:n})}extends(t,o){const n=this.fetcherParameters(t,o);return new ye(...n)}async request(t,o){o?.params&&(t=this.pathParams(t,o.params),delete o.params);const n=this.fetcherParameters(t,o);return await Et(...n)}fetcherParameters(t,o){const n=bt(this.#t,t),s=_t(this.#e.headers,o?.headers),c={...this.#e,...o,headers:s};return[n,c]}pathParams(t,o){for(const[n,s]of Object.entries(o))t=t.replace(`:${n}`,`${s}`);return t}}async function Et(...e){const t=await fetch(...e),o=await t.json();if(!t.ok)throw new gt({message:t.statusText,response:t,data:o});return o}const St=new ye("https://jsonplaceholder.typicode.com").extends("posts"),se=k(1,"todoPageAtom").pipe(ve((e,t)=>({nextTodo:T(o=>e(o,n=>n+1),`${t}.nextTodo`),prevTodo:T(o=>e(o,n=>Math.max(1,n-1)),`${t}.prevTodo`)}))),He=ct(e=>{const t=e.spy(se);return e.schedule(()=>St.get(`${t}`,e.controller))},"todoResource").pipe(ut(null),lt()),yt=k(e=>e.spy(He.dataAtom)?.title,"todoAtom"),At=k(e=>e.spy(He.statusesAtom).isPending,"todoIsLoadingAtom");function wt(){return S("div",null,S("button",{"on:click":se.prevTodo},"Prev"),S("button",{"on:click":se.nextTodo},"Next"),S("h1",null,"Page: ",se),k(e=>S("b",{style:{display:"block",height:"1rem"}},e.spy(At)?"Loading...":S("pre",null,yt))))}const re=k("","inputAtom"),$e="todos";function Ct(){const e=localStorage.getItem($e);return e?JSON.parse(e).map(o=>Fe(o.title,o.completed)):[]}const Re=T(e=>{const t=JSON.stringify(U(e,B));localStorage.setItem($e,t)},"toLocalStorage"),B=k([],"todosAtom").pipe(st(Ct));B.onChange(Re);function Fe(e,t){const o=k(t,`completed#${e}`);return o.onChange(Re),{title:e,completed:o}}const vt=T((e,t)=>{t.preventDefault();const o=e.get(re);if(!o){alert("Title is required");return}if(e.get(B).find(s=>s.title===o)){alert("Todo already exists");return}B(e,s=>[...s,Fe(o,!1)]),re(e,"")},"addTodo"),kt=T(e=>{B(e,[]),re(e,"")},"clearTodos");function Pt(){return S("div",null,S("h1",null,"Todo list"),S("form",{"on:submit":vt},S("input",{required:!0,autofocus:!0,"model:value":re}),S("button",null,"Add"),S("button",{type:"button","on:click":kt},"Clear")),k(e=>S("ul",null,e.spy(B).map(t=>S("li",null,S("span",null,t.title),S("input",{type:"checkbox","model:checked":t.completed}))))))}function jt(){return S(Qe,null,S(mt,null),S(wt,null),S(Pt,null))}xe(document.body,S(jt,null))})();
