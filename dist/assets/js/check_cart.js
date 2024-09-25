import{I as q,r as p,o as B,g as $,a as n,c as a,h,d as l,i as z,b as t,F as T,k as R,t as _,w as x,B as j,C as D,J as V,l as E,j as M,n as U,f as g}from"./index.js";import{e as m}from"./EventBus.js";import{M as I}from"./bootstrap.esm.js";import{$ as F}from"./jquery.js";const J={key:0,class:"check_cart"},O=t("li",{class:"border-0"},[t("div",{class:"check_cart-header py-2 border-bottom bg-brown text-gold"}," 訂單名細 ")],-1),P={key:"item.id",class:"d-flex align-items-center flex-wrap p-md-3 p-2"},X=["onClick"],A={class:"col-auto img"},G=["src"],H={class:"col-12 p omit-1 w-100 px-md-5 px-3 py-md-3 py-2"},K={class:"info d-flex align-items-center flex-wrap px-md-5 px-md-0 px-2"},W={class:"col-md-auto col-6"},Y={class:"col d-flex"},Z=["disabled","onClick"],Q=["value","onChange"],tt=["onClick"],et={class:"col-md-auto col-6 ps-md-3 ps-0"},ot={class:"col-md-auto col-6 ms-md-0 ms-auto ps-md-3 ps-0"},st=["onClick"],lt={key:0,class:"fas fa-spinner fa-spin"},nt={key:1,class:"p py-1 px-2"},at={id:"coupon",class:"d-flex flex-wrap justify-content-center p-2 bg-brown text-gold"},dt={class:"col-md-7 col-12 d-flex align-items-center"},ct=t("span",{class:"col-auto me-3"},"優惠券",-1),it={class:"col-md-7 col-12 d-flex py-2"},rt={class:"col-6 d-flex flex-wrap"},ut={class:"col-md-6 col-12"},pt={class:"col-md-6 col-12"},_t={class:"col-md-auto col-6 flex-grow-1"},mt={key:1,class:"row justify-content-center align-items-center text-center p-5"},vt=t("h1",null,"空",-1),ft=t("p",null,"您的購物車內尚無商品哦！",-1),ht={class:"modal-dialog w-md-auto w-100 mx-sm-auto mx-0",role:"document"},bt={class:"modal-content border-0"},xt=t("div",{class:"modal-header"},[t("h5",{class:"m-0 modal-title",id:"exampleModalLabel"}," 選擇優惠券或輸入優惠代碼 "),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),gt={class:"modal-body"},yt=t("div",{class:"input-group mb-3"},[t("input",{type:"text",class:"form-control",placeholder:"請輸入優惠代碼","aria-label":"Recipient's username","aria-describedby":"button-addon2"}),t("button",{class:"btn btn-brown",type:"button",id:"button-addon2"},"送出")],-1),Ct=t("hr",null,null,-1),wt=t("p",{class:"fw-bold"},"選擇優惠券",-1),kt={class:"mb-0 me-auto"},$t={class:"d-flex mb-3"},Tt={class:"col-1 d-flex justify-content-center align-item-center"},jt=V('<div class="col-11 d-flex border"><div class="col-2 d-flex align-items-center justify-content-center bg-brown text-gold text-center h5 p-1 h-100 me-2"> 15% off </div><div class="col-10 d-flex flex-wrap align-item-center p-2"><p class="col-12 m-0">年終感恩祭</p><div class="col-8 p"> 使用期限：<span>10/01~2/28</span></div><div class="col-4 p"> 使用規則 </div></div></div>',1),Dt={class:"d-flex mb-3"},Mt={class:"col-1 d-flex justify-content-center align-item-center"},Ut=V('<div class="col-11 d-flex border"><div class="col-2 d-flex align-items-center justify-content-center bg-brown text-gold text-center h5 p-1 h-100 me-2"> 10% off </div><div class="col-10 d-flex flex-wrap align-item-center p-2"><p class="col-12 m-0">金牌會員</p><div class="col-8 p"> 使用期限：<span>永久</span></div><div class="col-4 p"> 使用規則 </div></div></div>',1),Bt={__name:"check_cart",setup(Vt){q(),window.$=F;const v=p({});let y=p(0);const C=p(null);let w=null,i=p(!1),d=p({productLoading:"",productChangeToCart:""}),c=p({code:null,title:""});function k(o=!1){m.emit("cart:init",o)}function b(o,s,f){let r;typeof f!="number"?r=f.target.value-s:r=f,m.emit("cart:change",[o,r])}function L(o){m.emit("cart:delete",o)}function N(){w.show()}function S(){i.value=!0,E.post("https://vue-course-api.hexschool.io/api/ozeu/coupon",{data:{code:c.value.code}}).then(s=>{s.data.success?(k(!0),i.value=!1):(i.value=!1,m.emit("message:push",s.data.message,"warning"))})}return B(()=>{w=new I(C.value),m.on("cart:change",o=>{o[0],o[1]}),m.on("cart:returndata",o=>{v.value=o,y.value=o.carts.length}),k()}),(o,s)=>{const f=$("loading"),r=$("router-link");return n(),a(T,null,[h(f,{active:l(i),"onUpdate:active":s[0]||(s[0]=e=>z(i)?i.value=e:i=e)},null,8,["active"]),l(y)!=0?(n(),a("div",J,[t("ul",null,[O,(n(!0),a(T,null,R(v.value.carts,e=>(n(),a("li",P,[l(d).productChangeToCart!=e.id?(n(),a("div",{key:0,style:{"z-index":"1"},class:"position-absolute top-0 end-0 d-md-none d-block text-secondary border-0 py-2 px-3",onClick:u=>l(d).productChangeToCart=e.id}," 管理 ",8,X)):M("",!0),l(d).productChangeToCart==e.id?(n(),a("div",{key:1,style:{"z-index":"1"},class:"position-absolute top-0 end-0 d-md-none d-block text-secondary border-0 py-2 px-3",onClick:s[1]||(s[1]=u=>l(d).productChangeToCart="")}," 取消 ")):M("",!0),t("div",A,[t("img",{class:"img-fluid",src:e.product.imageUrl,alt:""},null,8,G)]),t("div",{class:U(["col d-flex flex-wrap side-right",{active:e.id==l(d).productChangeToCart}])},[t("div",H,[h(r,{class:"text-brown",to:`/page/${e.product.id}`},{default:x(()=>[g(_(e.product.title),1)]),_:2},1032,["to"])]),t("ul",K,[t("li",W,[t("div",Y,[t("button",{type:"button",class:"btn btn-brown rounded-0 rounded-start py-1 px-2",disabled:e.qty<=1,onClick:u=>b(e.product.id,e.qty,parseInt(-1))},"-",8,Z),t("input",{type:"txt",class:"form-control rounded-0 addCartNum text-center p-1",value:e.qty,onChange:u=>b(e.product.id,e.qty,u)},null,40,Q),t("button",{type:"button",class:"btn btn-brown rounded-0 rounded-end py-1 px-2",onClick:u=>b(e.product.id,e.qty,parseInt(1))},"+",8,tt)])]),t("li",et," 單價："+_(o.$currency.currencyUSD(e.product.price)),1),t("li",ot," 小計："+_(o.$currency.currencyUSD(e.total)),1)])],2),t("div",{class:U(["control",{active:e.id==l(d).productChangeToCart}])},[t("div",{class:"h-100 me-md-3 me-0 d-flex align-items-center justify-content-center",onClick:u=>(L(e.id),l(d).productChangeToCart=e.product.id)},[l(d).productChangeToCart==e.product.id?(n(),a("i",lt)):(n(),a("div",nt,"X"))],8,st)],2)]))),128))]),t("div",at,[t("div",dt,[ct,t("div",{class:"openDiscountBtn",onClick:N},_(l(c).title||"選擇優惠券或輸入優惠代碼"),1)]),t("div",it,[t("div",rt,[t("div",ut," 折扣：- "+_(o.$currency.currencyUSD(v.value.total-v.value.final_total)),1),t("div",pt," 需付金額： "+_(o.$currency.currencyUSD(v.value.final_total)),1)]),t("div",_t,[h(r,{to:"/check/order_check",type:"button",class:"btn btn-gold btn-sm ml-auto w-100"},{default:x(()=>[g(" 結帳 ")]),_:1})])])])])):(n(),a("div",mt,[vt,ft,h(r,{to:"/shopping",class:"btn btn-outline-brown w-auto"},{default:x(()=>[g("去逛逛")]),_:1})])),t("div",{ref_key:"modalEle_discount",ref:C,class:"modal fade",id:"delProductModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},[t("div",ht,[t("div",bt,[xt,t("div",gt,[yt,Ct,wt,t("ul",kt,[t("li",$t,[t("div",Tt,[j(t("input",{type:"radio",name:"",id:"",value:"520","onUpdate:modelValue":s[2]||(s[2]=e=>l(c).code=e),onClick:s[3]||(s[3]=e=>l(c).title="年終感恩祭")},null,512),[[D,l(c).code]])]),jt]),t("li",Dt,[t("div",Mt,[j(t("input",{type:"radio",name:"",id:"",value:"999","onUpdate:modelValue":s[4]||(s[4]=e=>l(c).code=e),onClick:s[5]||(s[5]=e=>l(c).title="金牌會員")},null,512),[[D,l(c).code]])]),Ut])])]),t("div",{class:"modal-footer"},[t("button",{type:"button",class:"btn btn-brown w-100","data-bs-dismiss":"modal",onClick:S},"確認選取")])])])],512)],64)}}};export{Bt as default};
