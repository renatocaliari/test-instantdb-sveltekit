import{B as l,x as m}from"./runtime.CfraIdZC.js";function _(e,n,s){if(e==null)return n(void 0),s&&s(void 0),l;const r=e.subscribe(n,s);return r.unsubscribe?()=>r.unsubscribe():r}const f=[];function q(e,n){return{subscribe:z(e,n).subscribe}}function x(e,n){return e!=e?n==n:e!==n||e&&typeof e=="object"||typeof e=="function"}function z(e,n=l){let s=null;const r=new Set;function i(u){if(x(e,u)&&(e=u,s)){const o=!f.length;for(const t of r)t[1](),f.push(t,e);if(o){for(let t=0;t<f.length;t+=2)f[t][0](f[t+1]);f.length=0}}}function b(u){i(u(e))}function a(u,o=l){const t=[u,o];return r.add(t),r.size===1&&(s=n(i,b)||l),u(e),()=>{r.delete(t),r.size===0&&s&&(s(),s=null)}}return{set:i,update:b,subscribe:a}}function B(e,n,s){const r=!Array.isArray(e),i=r?[e]:e;if(!i.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const b=n.length<2;return q(s,(a,u)=>{let o=!1;const t=[];let p=0,d=l;const y=()=>{if(p)return;d();const c=n(r?t[0]:t,a,u);b?a(c):d=typeof c=="function"?c:l},h=i.map((c,g)=>_(c,w=>{t[g]=w,p&=~(1<<g),o&&y()},()=>{p|=1<<g}));return o=!0,y(),function(){m(h),d(),o=!1}})}function j(e){let n;return _(e,s=>n=s)(),n}export{B as d,j as g,q as r,_ as s,z as w};
