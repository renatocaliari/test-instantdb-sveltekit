import{e as R,h as S,b as k,d as C,g as D,i as g,j as O,k as N}from"./disclose-version.DTTpPWK9.js";import{C as P,D as B,e as M,f as V,b as W,H as q,E as A,F as T,G as Y,I as $,J as j,P as L,a as F,n as G,q as J,w as z}from"./runtime.CfraIdZC.js";function K(n,e,r,s){function t(a){if(s.capture||b(e,a),!a.cancelBubble)return r.call(this,a)}return n.startsWith("pointer")||n==="wheel"?B(()=>{e.addEventListener(n,t,s)}):e.addEventListener(n,t,s),t}function x(n,e,r,s,t){var a={capture:s,passive:t},c=K(n,e,r,a);(e===document.body||e===window||e===document)&&P(()=>{e.removeEventListener(n,c,a)})}function ee(n){for(var e=0;e<n.length;e++)H.add(n[e]);for(var r of w)r(n)}function b(n,e){var E;var r=n.ownerDocument,s=e.type,t=((E=e.composedPath)==null?void 0:E.call(e))||[],a=t[0]||e.target,c=0,l=e.__root;if(l){var h=t.indexOf(l);if(h!==-1&&(n===document||n===window)){e.__root=n;return}var y=t.indexOf(n);if(y===-1)return;h<=y&&(c=h+1)}a=t[c]||e.target,M(e,"currentTarget",{configurable:!0,get(){return a||r}});try{for(var u,f=[];a!==null;){var _=a.parentNode||a.host||null;try{var i=a["__"+s];if(i!==void 0&&!a.disabled)if(V(i)){var[p,...d]=i;p.apply(a,[e,...d])}else i.call(a,e)}catch(v){u?f.push(v):u=v}if(e.cancelBubble||_===n||_===null||a===n)break;a=_}if(u){for(let v of f)queueMicrotask(()=>{throw v});throw u}}finally{e.__root=n,a=n}}let o;function Q(){o=void 0}function ne(n){let e=null,r=S;var s;if(S){for(e=D,o===void 0&&(o=document.head.firstChild);o.nodeType!==8||o.data!==q;)o=o.nextSibling;o=k(o),o=o.nextSibling}else s=document.head.appendChild(R());try{W(()=>n(s))}finally{r&&C(e)}}const H=new Set,w=new Set;function ae(n,e){(n.__t??(n.__t=n.nodeValue))!==e&&(n.nodeValue=n.__t=e)}function te(n,e,r,s){e===void 0?s!==null&&s(n):e(n,r)}function U(n,e){const r=e.anchor??e.target.appendChild(R());return A(()=>I(n,{...e,anchor:r}),!1)}function re(n,e){const r=e.target,s=D;try{return A(()=>{g(!0);for(var t=r.firstChild;t&&(t.nodeType!==8||t.data!==q);)t=t.nextSibling;if(!t)throw T;const a=k(t),c=I(n,{...e,anchor:a});return g(!1),c},!1)}catch(t){if(t===T)return e.recover===!1&&Y(),O(),N(r),g(!1),U(n,e);throw t}finally{g(!!s),C(s),Q()}}function I(n,{target:e,anchor:r,props:s={},events:t,context:a,intro:c=!1}){O();const l=new Set,h=b.bind(null,e),y=b.bind(null,document),u=i=>{for(let p=0;p<i.length;p++){const d=i[p];l.has(d)||(l.add(d),e.addEventListener(d,h,L.includes(d)?{passive:!0}:void 0),document.addEventListener(d,y,L.includes(d)?{passive:!0}:void 0))}};u($(H)),w.add(u);let f;const _=j(()=>(F(()=>{if(a){G({});var i=z;i.c=a}t&&(s.$$events=t),f=n(r,s)||{},a&&J()}),()=>{for(const i of l)e.removeEventListener(i,h);w.delete(u),m.delete(f)}));return m.set(f,_),f}let m=new WeakMap;function se(n){const e=m.get(n);e==null||e()}export{te as a,ne as b,K as c,ee as d,x as e,re as h,U as m,ae as s,se as u};
