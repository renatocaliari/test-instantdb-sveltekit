const __vite__fileDeps=["../nodes/0.Cp-GmJOS.js","../chunks/disclose-version.DTTpPWK9.js","../chunks/runtime.CfraIdZC.js","../chunks/render.BP0jDXmL.js","../chunks/Toaster.svelte_svelte_type_style_lang.uU7NaSSl.js","../chunks/index.BEm27HZL.js","../assets/Toaster.Dljj2rV8.css","../chunks/index-client.DvlKtU3d.js","../chunks/store.CIThoH2P.js","../chunks/svelte-component.CArpQ2qY.js","../assets/0.aKLDtYo1.css","../nodes/1.2Z7drO_Y.js","../chunks/entry.Cg2AAheh.js","../nodes/2.CUXSz9rQ.js","../chunks/proxy.CF3LCN3L.js","../assets/2.BaImA6Go.css","../nodes/3.Dxh_TRrA.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
var V=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)};var a=(r,t,e)=>(V(r,t,"read from private field"),e?e.call(r):t.get(r)),x=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},P=(r,t,e,s)=>(V(r,t,"write to private field"),s?s.call(r,e):t.set(r,e),e);import{p as D}from"../chunks/proxy.CF3LCN3L.js";import{e as z,n as F,r as G,v as H,j as b,g as R,a3 as J,q as K,s as L,t as Q}from"../chunks/runtime.CfraIdZC.js";import{h as X,m as Y,u as Z,s as N}from"../chunks/render.BP0jDXmL.js";import{l as O,a as g,t as B,f as E,s as j,c as M,m as $}from"../chunks/disclose-version.DTTpPWK9.js";import{p as A,o as tt,i as C,b as S}from"../chunks/index-client.DvlKtU3d.js";import{c as T}from"../chunks/svelte-component.CArpQ2qY.js";function et(r){return class extends rt{constructor(t){super({component:r,...t})}}}var h,l;class rt{constructor(t){x(this,h,void 0);x(this,l,void 0);const e=D({...t.props||{},$$events:{}},!1);P(this,l,(t.hydrate?X:Y)(t.component,{target:t.target,props:e,context:t.context,intro:t.intro,recover:t.recover})),P(this,h,e.$$events);for(const s of Object.keys(a(this,l)))s==="$set"||s==="$destroy"||s==="$on"||z(this,s,{get(){return a(this,l)[s]},set(u){a(this,l)[s]=u},enumerable:!0});a(this,l).$set=s=>{Object.assign(e,s)},a(this,l).$destroy=()=>{Z(a(this,l))}}$set(t){a(this,l).$set(t)}$on(t,e){a(this,h)[t]=a(this,h)[t]||[];const s=(...u)=>e.call(this,...u);return a(this,h)[t].push(s),()=>{a(this,h)[t]=a(this,h)[t].filter(u=>u!==s)}}$destroy(){a(this,l).$destroy()}}h=new WeakMap,l=new WeakMap;const st="modulepreload",ot=function(r,t){return new URL(r,t).href},q={},k=function(t,e,s){let u=Promise.resolve();if(e&&e.length>0){const f=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),y=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));u=Promise.all(e.map(c=>{if(c=ot(c,s),c in q)return;q[c]=!0;const _=c.endsWith(".css"),w=_?'[rel="stylesheet"]':"";if(!!s)for(let m=f.length-1;m>=0;m--){const d=f[m];if(d.href===c&&(!_||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${w}`))return;const o=document.createElement("link");if(o.rel=_?"stylesheet":st,_||(o.as="script",o.crossOrigin=""),o.href=c,y&&o.setAttribute("nonce",y),document.head.appendChild(o),_)return new Promise((m,d)=>{o.addEventListener("load",m),o.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${c}`)))})}))}return u.then(()=>t()).catch(f=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=f,window.dispatchEvent(i),!i.defaultPrevented)throw f})},vt={};var nt=B('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),at=B("<!> <!>",1);function it(r,t){F(t,!0);let e=A(t,"components",11,()=>D([])),s=A(t,"data_0",3,null),u=A(t,"data_1",3,null);G(()=>t.stores.page.set(t.page)),H(()=>{t.stores,t.page,t.constructors,e(),t.form,s(),u(),t.stores.page.notify()});let f=L(!1),i=L(!1),y=L(null);tt(()=>{const v=t.stores.page.subscribe(()=>{b(f)&&(R(i,!0),J().then(()=>{R(y,D(document.title||"untitled page"))}))});return R(f,!0),v});var c=at(),_=E(c);C(_,()=>t.constructors[1],v=>{var o=O(),m=E(o);T(()=>t.constructors[0],d=>{S(d(m,{get data(){return s()},children:(n,ct)=>{var I=O(),U=E(I);T(()=>t.constructors[1],W=>{S(W(U,{get data(){return u()},get form(){return t.form}}),p=>e()[1]=p,()=>{var p;return(p=e())==null?void 0:p[1]})}),g(n,I)},$$slots:{default:!0}}),n=>e()[0]=n,()=>{var n;return(n=e())==null?void 0:n[0]})}),g(v,o)},v=>{var o=O(),m=E(o);T(()=>t.constructors[0],d=>{S(d(m,{get data(){return s()},get form(){return t.form}}),n=>e()[0]=n,()=>{var n;return(n=e())==null?void 0:n[0]})}),g(v,o)});var w=j(j(_,!0));C(w,()=>b(f),v=>{var o=nt(),m=M(o);C(m,()=>b(i),d=>{var n=$(d);Q(()=>N(n,b(y))),g(d,n)}),g(v,o)}),g(r,c),K()}const gt=et(it),yt=[()=>k(()=>import("../nodes/0.Cp-GmJOS.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]),import.meta.url),()=>k(()=>import("../nodes/1.2Z7drO_Y.js"),__vite__mapDeps([11,1,2,3,8,5,12]),import.meta.url),()=>k(()=>import("../nodes/2.CUXSz9rQ.js"),__vite__mapDeps([13,1,2,3,14,7,4,5,6,8,15]),import.meta.url),()=>k(()=>import("../nodes/3.Dxh_TRrA.js"),__vite__mapDeps([16,1,2]),import.meta.url)],pt=[],bt={"/":[2],"/about":[3]},Et={handleError:({error:r})=>{console.error(r)},reroute:()=>{}};export{bt as dictionary,Et as hooks,vt as matchers,yt as nodes,gt as root,pt as server_loads};
