"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[799],{799:(pt,O,b)=>{b.r(O),b.d(O,{scopeCss:()=>at});const m="-shadowcsshost",y="-shadowcssslotted",B="-shadowcsscontext",H=")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)",j=new RegExp("("+m+H,"gim"),v=new RegExp("("+B+H,"gim"),N=new RegExp("("+y+H,"gim"),f=m+"-no-combinator",x=/-shadowcsshost-no-combinator([^\s]*)/,M=[/::shadow/g,/::content/g],_=/-shadowcsshost/gim,I=/:host/gim,K=/::slotted/gim,U=/:host-context/gim,Y=/\/\*\s*[\s\S]*?\*\//g,z=/\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g,G=/(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g,J=/([{}])/g,C="%BLOCK%",$=(t,e)=>{const o=X(t);let s=0;return o.escapedString.replace(G,(...c)=>{const n=c[2];let a="",r=c[4],l="";r&&r.startsWith("{"+C)&&(a=o.blocks[s++],r=r.substring(C.length+1),l="{");const p=e({selector:n,content:a});return`${c[1]}${p.selector}${c[3]}${l}${p.content}${r}`})},X=t=>{const e=t.split(J),o=[],s=[];let c=0,n=[];for(let r=0;r<e.length;r++){const l=e[r];"}"===l&&c--,c>0?n.push(l):(n.length>0&&(s.push(n.join("")),o.push(C),n=[]),o.push(l)),"{"===l&&c++}return n.length>0&&(s.push(n.join("")),o.push(C)),{escapedString:o.join(""),blocks:s}},E=(t,e,o)=>t.replace(e,(...s)=>{if(s[2]){const c=s[2].split(","),n=[];for(let a=0;a<c.length;a++){const r=c[a].trim();if(!r)break;n.push(o(f,r,s[3]))}return n.join(",")}return f+s[3]}),W=(t,e,o)=>t+e.replace(m,"")+o,T=(t,e,o)=>e.indexOf(m)>-1?W(t,e,o):t+e+o+", "+e+" "+t+o,w=(t,e,o,s,c)=>$(t,n=>{let a=n.selector,r=n.content;return"@"!==n.selector[0]?a=((t,e,o,s)=>t.split(",").map(c=>s&&c.indexOf("."+s)>-1?c.trim():((t,e)=>!(t=>(t=t.replace(/\[/g,"\\[").replace(/\]/g,"\\]"),new RegExp("^("+t+")([>\\s~+[.,{:][\\s\\S]*)?$","m")))(e).test(t))(c,e)?((t,e,o)=>{const c="."+(e=e.replace(/\[is=([^\]]*)\]/g,(g,...h)=>h[0])),n=g=>{let h=g.trim();if(!h)return"";if(g.indexOf(f)>-1)h=((t,e,o)=>{if(_.lastIndex=0,_.test(t)){const s=`.${o}`;return t.replace(x,(c,n)=>n.replace(/([^:]*)(:*)(.*)/,(a,r,l,i)=>r+s+l+i)).replace(_,s+" ")}return e+" "+t})(g,e,o);else{const R=g.replace(_,"");if(R.length>0){const S=R.match(/([^:]*)(:*)(.*)/);S&&(h=S[1]+c+S[2]+S[3])}}return h},a=(t=>{const e=[];let s,o=0;return s=(t=t.replace(/(\[[^\]]*\])/g,(n,a)=>{const r=`__ph-${o}__`;return e.push(a),o++,r})).replace(/(:nth-[-\w]+)(\([^)]+\))/g,(n,a,r)=>{const l=`__ph-${o}__`;return e.push(r),o++,a+l}),{content:s,placeholders:e}})(t);let i,r="",l=0;const p=/( |>|\+|~(?!=))\s*/g;let u=!((t=a.content).indexOf(f)>-1);for(;null!==(i=p.exec(t));){const g=i[1],h=t.slice(l,i.index).trim();u=u||h.indexOf(f)>-1,r+=`${u?n(h):h} ${g} `,l=p.lastIndex}const k=t.substring(l);return u=u||k.indexOf(f)>-1,r+=u?n(k):k,((t,e)=>e.replace(/__ph-(\d+)__/g,(o,s)=>t[+s]))(a.placeholders,r)})(c,e,o).trim():c.trim()).join(", "))(n.selector,e,o,s):(n.selector.startsWith("@media")||n.selector.startsWith("@supports")||n.selector.startsWith("@page")||n.selector.startsWith("@document"))&&(r=w(n.content,e,o,s)),{selector:a.replace(/\s{2,}/g," ").trim(),content:r}}),at=(t,e,o)=>{const s=e+"-h",c=e+"-s",n=(t=>t.match(z)||[])(t);t=(t=>t.replace(Y,""))(t);const a=[];if(o){const l=i=>{const p=`/*!@___${a.length}___*/`;return a.push({placeholder:p,comment:`/*!@${i.selector}*/`}),i.selector=p+i.selector,i};t=$(t,i=>"@"!==i.selector[0]?l(i):((i.selector.startsWith("@media")||i.selector.startsWith("@supports")||i.selector.startsWith("@page")||i.selector.startsWith("@document"))&&(i.content=$(i.content,l)),i))}const r=((t,e,o,s,c)=>{const n=((t,e)=>{const o="."+e+" > ",s=[];return t=t.replace(N,(...c)=>{if(c[2]){const n=c[2].trim(),r=o+n+c[3];let l="";for(let d=c[4]-1;d>=0;d--){const u=c[5][d];if("}"===u||","===u)break;l=u+l}const i=l+r,p=`${l.trimRight()}${r.trim()}`;return i.trim()!==p.trim()&&s.push({orgSelector:i,updatedSelector:`${p}, ${i}`}),r}return f+c[3]}),{selectors:s,cssText:t}})(t=(t=>E(t,v,T))(t=(t=>E(t,j,W))(t=(t=>t.replace(U,B).replace(I,m).replace(K,y))(t))),s);return t=(t=>M.reduce((e,o)=>e.replace(o," "),t))(t=n.cssText),e&&(t=w(t,e,o,s)),{cssText:(t=(t=t.replace(/-shadowcsshost-no-combinator/g,`.${o}`)).replace(/>\s*\*\s+([^{, ]+)/gm," $1 ")).trim(),slottedSelectors:n.selectors}})(t,e,s,c);return t=[r.cssText,...n].join("\n"),o&&a.forEach(({placeholder:l,comment:i})=>{t=t.replace(l,i)}),r.slottedSelectors.forEach(l=>{t=t.replace(l.orgSelector,l.updatedSelector)}),t}}}]);