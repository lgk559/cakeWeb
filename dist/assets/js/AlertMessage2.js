import{e as m}from"./EventBus.js";import{d as p,m as _,a as o,c as n,F as d,k as g,A as f,h,t as v,b as l,g as b}from"./index.js";const k={class:"message-alert"},M=["onClick"],B=l("span",{"aria-hidden":"true"},null,-1),C=[B],A={__name:"AlertMessage2",setup(x){let a=p([]);function i(e,t){const s=Math.floor(new Date/1e3);a.value.push({message:e,status:t,timestamp:s}),u(s)}function c(e){a.value.splice(e,1)}function u(e){setTimeout(()=>{a.value.forEach((t,s)=>{t.timestamp===e&&a.value.splice(s,1)})},5e3)}return _(()=>{m.on("message:push",(e,t="warning")=>{i(e,t)})}),(e,t)=>(o(),n("div",k,[(o(!0),n(d,null,g(b(a),(s,r)=>(o(),n("div",{class:f(["alert alert-dismissible","alert-"+s.status]),role:"alert",key:r},[h(v(s.message)+" ",1),l("button",{type:"button",class:"btn-close",onClick:y=>c(r),"aria-label":"Close"},C,8,M)],2))),128))]))}};export{A as _};
