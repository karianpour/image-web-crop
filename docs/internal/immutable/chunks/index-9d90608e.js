function v(){}function I(t,n){for(const e in n)t[e]=n[e];return t}function q(t){return t()}function P(){return Object.create(null)}function p(t){t.forEach(q)}function B(t){return typeof t=="function"}function st(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let g;function ot(t,n){return g||(g=document.createElement("a")),g.href=n,t===g.href}function G(t){return Object.keys(t).length===0}function J(t,...n){if(t==null)return v;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function at(t,n,e){t.$$.on_destroy.push(J(n,e))}function ft(t,n,e,i){if(t){const r=L(t,n,e,i);return t[0](r)}}function L(t,n,e,i){return t[1]&&i?I(e.ctx.slice(),t[1](i(n))):e.ctx}function dt(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(n.dirty.length,r.length);for(let s=0;s<c;s+=1)o[s]=n.dirty[s]|r[s];return o}return n.dirty|r}return n.dirty}function _t(t,n,e,i,r,o){if(r){const c=L(n,e,i,o);t.p(c,r)}}function ht(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let E=!1;function K(){E=!0}function Q(){E=!1}function R(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function U(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const u=[];for(let l=0;l<n.length;l++){const f=n[l];f.claim_order!==void 0&&u.push(f)}n=u}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let u=0;u<n.length;u++){const l=n[u].claim_order,f=(r>0&&n[e[r]].claim_order<=l?r+1:R(1,r,y=>n[e[y]].claim_order,l))-1;i[u]=e[f]+1;const a=f+1;e[a]=u,r=Math.max(a,r)}const o=[],c=[];let s=n.length-1;for(let u=e[r]+1;u!=0;u=i[u-1]){for(o.push(n[u-1]);s>=u;s--)c.push(n[s]);s--}for(;s>=0;s--)c.push(n[s]);o.reverse(),c.sort((u,l)=>u.claim_order-l.claim_order);for(let u=0,l=0;u<c.length;u++){for(;l<o.length&&c[u].claim_order>=o[l].claim_order;)l++;const f=l<o.length?o[l]:null;t.insertBefore(c[u],f)}}function V(t,n){if(E){for(U(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function mt(t,n,e){E&&!e?V(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function W(t){t.parentNode&&t.parentNode.removeChild(t)}function pt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function X(t){return document.createElement(t)}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function j(t){return document.createTextNode(t)}function yt(){return j(" ")}function gt(){return j("")}function bt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function xt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function $t(t){return t===""?null:+t}function Z(t){return Array.from(t.childNodes)}function tt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function O(t,n,e,i,r=!1){tt(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(n(s)){const u=e(s);return u===void 0?t.splice(c,1):t[c]=u,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(n(s)){const u=e(s);return u===void 0?t.splice(c,1):t[c]=u,r?u===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function D(t,n,e,i){return O(t,r=>r.nodeName===n,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];e[s.name]||o.push(s.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(n))}function vt(t,n,e){return D(t,n,e,X)}function Et(t,n,e){return D(t,n,e,Y)}function nt(t,n){return O(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>j(n),!0)}function wt(t){return nt(t," ")}function Nt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function St(t,n){t.value=n??""}function At(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function et(t,n,{bubbles:e=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,i,n),r}function jt(t,n){return new t(n)}let m;function h(t){m=t}function k(){if(!m)throw new Error("Function called outside component initialization");return m}function kt(t){k().$$.on_mount.push(t)}function Ct(t){k().$$.after_update.push(t)}function Mt(){const t=k();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const o=et(n,e,{cancelable:i});return r.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}function Pt(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const _=[],T=[],x=[],N=[],z=Promise.resolve();let S=!1;function F(){S||(S=!0,z.then(H))}function Tt(){return F(),z}function A(t){x.push(t)}function qt(t){N.push(t)}const w=new Set;let b=0;function H(){const t=m;do{for(;b<_.length;){const n=_[b];b++,h(n),it(n.$$)}for(h(null),_.length=0,b=0;T.length;)T.pop()();for(let n=0;n<x.length;n+=1){const e=x[n];w.has(e)||(w.add(e),e())}x.length=0}while(_.length);for(;N.length;)N.pop()();S=!1,w.clear(),h(t)}function it(t){if(t.fragment!==null){t.update(),p(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(A)}}const $=new Set;let d;function Bt(){d={r:0,c:[],p:d}}function Lt(){d.r||p(d.c),d=d.p}function rt(t,n){t&&t.i&&($.delete(t),t.i(n))}function Ot(t,n,e,i){if(t&&t.o){if($.has(t))return;$.add(t),d.c.push(()=>{$.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function Dt(t,n,e,i){const r=t.$$.props[n];r!==void 0&&(t.$$.bound[r]=e,i===void 0&&e(t.$$.ctx[r]))}function zt(t){t&&t.c()}function Ft(t,n){t&&t.l(n)}function ct(t,n,e,i){const{fragment:r,after_update:o}=t.$$;r&&r.m(n,e),i||A(()=>{const c=t.$$.on_mount.map(q).filter(B);t.$$.on_destroy?t.$$.on_destroy.push(...c):p(c),t.$$.on_mount=[]}),o.forEach(A)}function ut(t,n){const e=t.$$;e.fragment!==null&&(p(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function lt(t,n){t.$$.dirty[0]===-1&&(_.push(t),F(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Ht(t,n,e,i,r,o,c,s=[-1]){const u=m;h(t);const l=t.$$={fragment:null,ctx:[],props:o,update:v,not_equal:r,bound:P(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(u?u.$$.context:[])),callbacks:P(),dirty:s,skip_bound:!1,root:n.target||u.$$.root};c&&c(l.root);let f=!1;if(l.ctx=e?e(t,n.props||{},(a,y,...C)=>{const M=C.length?C[0]:y;return l.ctx&&r(l.ctx[a],l.ctx[a]=M)&&(!l.skip_bound&&l.bound[a]&&l.bound[a](M),f&&lt(t,a)),y}):[],l.update(),f=!0,p(l.before_update),l.fragment=i?i(l.ctx):!1,n.target){if(n.hydrate){K();const a=Z(n.target);l.fragment&&l.fragment.l(a),a.forEach(W)}else l.fragment&&l.fragment.c();n.intro&&rt(t.$$.fragment),ct(t,n.target,n.anchor,n.customElement),Q(),H()}h(u)}class It{$destroy(){ut(this,1),this.$destroy=v}$on(n,e){if(!B(e))return v;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!G(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{Tt as A,v as B,ft as C,_t as D,ht as E,dt as F,V as G,at as H,ot as I,bt as J,p as K,Pt as L,St as M,$t as N,T as O,Dt as P,qt as Q,pt as R,It as S,Y as T,Et as U,Mt as V,yt as a,mt as b,wt as c,Lt as d,gt as e,rt as f,Bt as g,W as h,Ht as i,Ct as j,X as k,vt as l,Z as m,xt as n,kt as o,At as p,j as q,nt as r,st as s,Ot as t,Nt as u,jt as v,zt as w,Ft as x,ct as y,ut as z};
