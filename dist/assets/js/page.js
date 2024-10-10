import{e as b}from"./EventBus.js";import{u as L,r as v,o as B,a as r,c as u,b as t,d,n as D,e as R,f as c,g as T,h as n,i as U,t as f,j as V,F as q,k as A,w as _,l as w,m as E}from"./index.js";import{M as F}from"./bootstrap.esm.js";import{$ as M}from"./jquery.js";import{_ as I}from"./AlertMessage2.js";const O={id:"header",class:"fixed-top navbar navbar-dark navbar-expand-lg bg-brown text-gold"},H={class:"container-fluid justify-content-lg-center justify-content-md-between"},P=t("a",{class:"navbar-brand text-gold",href:"#"},[t("i",{class:"fa-solid fa-cake-candles"}),c(" Cake ")],-1),W=["aria-expanded"],X=t("span",{class:"navbar-toggler-icon"},null,-1),G=[X],J={class:"navbar-nav me-auto ps-3 mb-2 mb-lg-0"},K={__name:"Navbar_customer",setup(C){L();let o=v(!1);function i(){document.querySelector("#pageTopNav").classList.remove("show")}return B(()=>{b.on("nav:close",()=>{i()})}),(p,a)=>(r(),u("nav",O,[t("div",H,[P,t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#pageTopNav","aria-controls":"pageTopNav","aria-expanded":d(o),"aria-label":"Toggle navigation"},G,8,W),t("div",{class:D(["collapse navbar-collapse flex-grow-0",{show:d(o)}]),id:"pageTopNav"},[t("ul",J,[R(p.$slots,"default")])],2)])]))}},Q={key:0,class:"d-flex text-gold position-fixed",id:"cart"},Y={type:"button",class:"nav-iteme"},Z=t("i",{class:"fa-solid fa-cart-shopping"},null,-1),tt={class:"position-absolute start-100 translate-middle badge rounded-pill bg-danger"},ot=t("span",{class:"visually-hidden"},"unread messages",-1),et={class:"modal-dialog w-md-auto w-100 mx-sm-auto mx-0",role:"document"},st={class:"modal-content border-0"},at=t("div",{class:"modal-header bg-custom text-brown"},[t("h5",{class:"modal-title",id:"exampleModalLabel"},[t("span",null,"您目前的購物車品項")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),nt={class:"modal-body"},lt={class:"table table-striped"},ct=t("thead",null,[t("tr",null,[t("td",{class:"col text-nowrap"},"管理"),t("td",{class:"col"},"品名"),t("td",{class:"col"},"數量"),t("td",{class:"col d-md-table-cell d-none"},"單價"),t("td",{class:"col d-md-table-cell d-none"},"小計")])],-1),dt={key:"item.id"},it={class:"col"},rt=["onClick"],ut={key:0,class:"fas fa-spinner fa-spin"},_t={key:1,class:"p"},pt={class:"col"},ht={class:"p omit-1"},mt={class:"col d-flex"},bt=["disabled","onClick"],ft=["value","onChange"],vt=["onClick"],gt={class:"col d-md-table-cell d-none"},kt={class:"col d-md-table-cell d-none"},yt=t("hr",null,null,-1),Ct={class:"row justify-content-end pe-3"},$t={class:"col-auto"},xt={class:"modal-footer"},wt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"},"繼續購買",-1),Tt={__name:"cart",setup(C){L(),window.$=M;let o=v({});const i=v(null);let p=null,a=v(!1),y=v({productLoading:"",productChangeToCart:""});function $(){w.get("https://vue-course-api.hexschool.io/api/ozeu/cart").then(l=>{l.data.success&&(o.value=l.data.data,y.value.productChangeToCart="",j())})}function z(){p.show()}function S(){p.hide()}function x(s,l,h){let g=h||s.target.value;const e="https://vue-course-api.hexschool.io/api/ozeu/cart";let m=o.value.carts;a.value=!0,m.filter(k=>{console.log(k.product.id,l),k.product.id==l&&(N(k.id),s||(g=parseInt(k.qty)+parseInt(g)))}),w.post(e,{data:{product_id:l,qty:g}}).then(k=>{k.data.success&&$(),s||b.emit("cart:success",!0),a.value=!1})}function N(s){const l=`https://vue-course-api.hexschool.io/api/ozeu/cart/${s}`;w.delete(l).then(h=>{h.data.success&&$()})}function j(){b.emit("cart:returndata",o.value)}return B(()=>{p=new F(i.value),b.on("cart:change",s=>{const[l,h]=s;x(null,l,h)}),b.on("cart:delete",s=>{N(s)}),b.on("cart:init",(s=!1)=>{s?$():Object.keys(o.value).length!=0&&j()}),$()}),(s,l)=>{const h=T("loading"),g=T("router-link");return r(),u(q,null,[n(h,{active:d(a),"onUpdate:active":l[0]||(l[0]=e=>U(a)?a.value=e:a=e)},null,8,["active"]),d(o).carts?(r(),u("div",Q,[t("div",Y,[t("div",{class:"nav-link",onClick:z},[Z,t("span",tt,[c(f(d(o).carts.length)+" ",1),ot])])])])):V("",!0),t("div",{ref_key:"modalEle_cart",ref:i,class:"modal fade",id:"delProductModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},[t("div",et,[t("div",st,[at,t("div",nt,[t("table",lt,[ct,t("tbody",null,[(r(!0),u(q,null,A(d(o).carts,e=>(r(),u("tr",dt,[t("td",it,[t("button",{type:"button",class:"btn btn-brown btn-sm me-md-3 me-0",onClick:m=>(N(e.id),d(y).productChangeToCart=e.product.id)},[d(y).productChangeToCart==e.product.id?(r(),u("i",ut)):(r(),u("div",_t,"X"))],8,rt)]),t("td",pt,[t("div",ht,[n(g,{class:"nav-link",to:`/page/${e.product.id}`,onClick:S},{default:_(()=>[c(f(e.product.title),1)]),_:2},1032,["to"])])]),t("td",mt,[t("button",{type:"button",class:"btn btn-brown rounded-0 rounded-start",disabled:e.qty<=1,onClick:m=>x(m,e.product.id,e.qty-1)},"-",8,bt),t("input",{type:"txt",class:"form-control rounded-0 addCartNum text-center",value:e.qty,onChange:m=>x(m,e.product.id)},null,40,ft),t("button",{type:"button",class:"btn btn-brown rounded-0 rounded-end",onClick:m=>x(m,e.product.id,e.qty+1)},"+",8,vt)]),t("td",gt,f(s.$currency.currencyUSD(e.product.price)),1),t("td",kt,f(s.$currency.currencyUSD(e.total)),1)]))),128))])]),yt,t("div",Ct,[t("div",$t," 總計："+f(s.$currency.currencyUSD(d(o).final_total)),1)])]),t("div",xt,[wt,n(g,{to:"/check/order_cart",type:"button",class:"btn btn-brown",onClick:S},{default:_(()=>[c("前往結帳")]),_:1})])])])],512)],64)}}},Nt={class:"secCont footer"},qt=t("p",{class:"p-0 m-0"},"非官方網站僅作練習使用，無任何商業用途",-1),Mt={class:"p-0 m-0"},Lt=t("br",null,null,-1),St={__name:"footer",setup(C){let o=v(2024),i=v("HellWorld.io");return(p,a)=>(r(),u("footer",Nt,[qt,t("p",Mt,[c("建議使用edge或Chrome瀏覽器，以達最佳瀏覽效果。"),Lt,c(" Copyright © "+f(d(o))+" "+f(d(i))+" All Rights Reserved.",1)])]))}},jt=""+new URL("../images/gotopBtn.png",import.meta.url).href,Bt=t("img",{src:jt,alt:""},null,-1),zt=[Bt],Dt={__name:"goTop",setup(C){window.$=M;function o(){M("html, body").animate({scrollTop:0},600)}return(i,p)=>(r(),u("div",{class:"goTopBtn",onClick:o},zt))}},Rt={class:"main"},Ut={class:"nav-item mx-2"},Vt={class:"nav-item mx-2"},At={class:"nav-item mx-2"},Et={class:"nav-item mx-2"},Ft={class:"nav-item mx-2"},It={class:"nav-item mx-2"},Gt={__name:"page",setup(C){L();function o(){b.emit("nav:close")}return E(()=>{var i=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");w.defaults.headers.common.Authorization=i}),(i,p)=>{const a=T("router-link"),y=T("router-view");return r(),u(q,null,[t("div",Rt,[n(I),n(K,null,{default:_(()=>[t("li",Ut,[n(a,{class:"nav-link text-gold",to:"/shopping",onClick:o},{default:_(()=>[c(" 商品資訊 ")]),_:1})]),t("li",Vt,[n(a,{class:"nav-link text-gold",to:"/brand",onClick:o},{default:_(()=>[c(" 品牌介紹 ")]),_:1})]),t("li",At,[n(a,{class:"nav-link text-gold",to:"/qa",onClick:o},{default:_(()=>[c(" 購物需知 ")]),_:1})]),t("li",Et,[n(a,{class:"nav-link text-gold",to:"/store",onClick:o},{default:_(()=>[c(" 門市據點 ")]),_:1})]),t("li",Ft,[n(a,{class:"nav-link text-gold",to:"/purchase",onClick:o},{default:_(()=>[c(" 訂單查詢 ")]),_:1})]),t("li",It,[n(a,{class:"nav-link text-gold",to:"/login",onClick:o},{default:_(()=>[c(" 後台登入 ")]),_:1})])]),_:1}),n(Tt),n(y)]),n(St),n(Dt)],64)}}};export{Gt as default};
