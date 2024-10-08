import{u as H,r as i,o as I,m as A,g as $,a as r,c as u,b as e,h as _,d as h,i as G,F as w,k as U,t as a,j as y,E as T,H as j,w as J,f as v,N as K,l as f,D as Q}from"./index.js";import{e as L}from"./EventBus.js";import{M as W}from"./bootstrap.esm.js";import{$ as X}from"./jquery.js";import{_ as Y}from"./Pagination.js";const Z={class:"row m-4"},ee={class:"card border-1 shadow-sm"},te={class:"card-body"},oe={class:"badge badge-secondary float-right ml-2"},se={class:"card-title"},ae={href:"#",class:"text-dark"},le={class:"card-text"},ne={class:"d-flex justify-content-between align-items-baseline"},de={class:"h6"},ce={class:"h5"},ie={class:"card-footer d-flex"},re=["onClick","disabled"],ue={key:0,class:"fas fa-spinner fa-spin"},_e=["disabled","onClick"],pe={key:0,class:"fas fa-spinner fa-spin"},he={class:"row"},me={class:"col-12"},ve={class:"table table-striped"},fe=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"管理"),e("th",{scope:"col"},"#"),e("th",{scope:"col flex-grow-1"},"品名"),e("th",{scope:"col"},"數量"),e("th",{scope:"col"},"單價"),e("th",{scope:"col"},"小計")])],-1),be=["id"],ge={scope:"col"},xe=["onClick"],ye={key:0,class:"fas fa-spinner fa-spin"},Ce={scope:"col"},ke={scope:"col flex-grow-1"},$e={scope:"col"},we={scope:"col"},Ve={scope:"col"},Me=e("td",{colspan:"4",class:"text-right"},null,-1),Ue=e("td",{class:"text-left"},"總計",-1),Te={class:"text-left"},Le={key:0},ze=e("td",{colspan:"4",class:"text-right"},null,-1),Ee=e("td",{class:"text-left text-success"},"折扣價",-1),De={class:"text-left text-success"},Se={class:"row"},qe={class:"col-8 m-auto d-flex mb-3"},Fe=e("span",{class:"input-group-text rounded-0 rounded-start",id:"basic-addon3"},"使用優換券",-1),je={class:"my-5 row justify-content-center"},Ne={class:"form-group"},Oe=e("label",{for:"useremail"},"Email",-1),Be={class:"form-group"},Pe=e("label",{for:"username"},"收件人姓名",-1),Re={class:"form-group"},He=e("label",{for:"usertel"},"收件人電話",-1),Ie={class:"form-group"},Ae=e("label",{for:"useraddress"},"收件人地址",-1),Ge={class:"form-group"},Je=e("label",{for:"comment"},"留言",-1),Ke=e("div",{class:"text-right"},[e("button",{class:"btn btn-danger"},"送出訂單")],-1),Qe={class:"modal-dialog modal-lg",role:"document"},We={class:"modal-content border-0"},Xe={class:"modal-header bg-dark text-white"},Ye={class:"modal-title fs-5",id:"exampleModalLabel"},Ze=e("button",{type:"button",class:"btn-close btn-close-white","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),et={class:"modal-body"},tt={class:"row"},ot={class:"col-12 mb-3"},st=["src"],at={class:"col-12 mb-3 text-break"},lt=e("p",null,"商品描述：",-1),nt=e("hr",null,null,-1),dt={class:"col-12 mb-3 text-break"},ct=e("p",null,"商品內容：",-1),it=e("hr",null,null,-1),rt={class:"col-6 mb-3 text-decoration-line-through text-secondary"},ut=e("span",null,"原價：",-1),_t={class:"text-decoration-line-through"},pt={class:"col-6 mb-3 text-danger"},ht=e("span",null,"特價：",-1),mt={class:"fs-5"},vt={class:"col-12 mb-3"},ft={class:"form-row"},bt={class:"form-group col-12"},gt=e("label",{for:"select-num",class:"form-label mb-1"},"購買數量：",-1),xt=e("option",{value:"0",selected:"",disabled:""},"請選擇",-1),yt=["value"],Ct={class:"modal-footer d-flex justify-content-between"},kt=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"},"取消",-1),$t={class:"col-auto d-flex align-items-center text-break"},wt={class:"me-3"},Vt=e("span",null,"小計：",-1),Mt={key:0,class:"fas fa-spinner fa-spin"},qt={__name:"CustomerOrder",setup(Ut){window.$=X,H();const z=i([]),n=i({}),E=i(),b=i([]),C=i(0),g=i(""),d=i({user:{name:"",email:"",tel:"",address:""},message:""});let p=i(!1),l=i({productLoading:"",productChangeToCart:""}),D=i(null),V=null,S=i(null);function q(){const s="https://vue-course-api.hexschool.io/api/ozeu/products";p.value=!0,f.get(s).then(o=>{o.data.success&&(p.value=!1,z.value=o.data.products,E.value=o.data.pagination,L.emit("pagination:init",E.value))})}function N(s){const o=`https://vue-course-api.hexschool.io/api/ozeu/product/${s}`;l.value.productLoading=s,f.get(o).then(c=>{c.data.success&&(n.value=c.data.product,V.show(),l.value.productLoading="")})}function F(s,o=1){const c="https://vue-course-api.hexschool.io/api/ozeu/cart";l.value.productChangeToCart=s,console.log(s,o),f.post(c,{data:{product_id:s,qty:o}}).then(m=>{console.log(m.data),m.data.success&&(l.value.productChangeToCart="",V.hide(),x())})}function x(){f.get("https://vue-course-api.hexschool.io/api/ozeu/cart").then(o=>{o.data.success&&(b.value=o.data.data)})}function O(){p.value=!0,f.post("https://vue-course-api.hexschool.io/api/ozeu/coupon",{data:{code:g.value}}).then(o=>{o.data.success?(x(),p.value=!1,g.value=""):(p.value=!1,g.value="",L.emit("message:push",o.data.message,"warning"))})}function B(s){n.value=s;const o=`https://vue-course-api.hexschool.io/api/ozeu/cart/${s.id}`;l.value.productChangeToCart=s.id,f.delete(o).then(c=>{console.log(c.data),c.data.success&&(l.value.productChangeToCart="",x())})}function P(s){s?f.post("https://vue-course-api.hexschool.io/api/ozeu/order",{data:d.value}).then(c=>{console.log(c.data),c.data.success&&(x(),d.value={})}):console.log("this field is required")}return I(()=>{V=new W(D.value),console.log(S.value.validate)}),A(()=>{q(),x(),L.on("pagination:chage",s=>{q()})}),(s,o)=>{const c=$("loading"),m=$("VField"),k=$("ErrorMessage"),R=$("VForm");return r(),u(w,null,[e("div",null,[_(c,{active:h(p),"onUpdate:active":o[0]||(o[0]=t=>G(p)?p.value=t:p=t)},null,8,["active"]),e("div",Z,[(r(!0),u(w,null,U(z.value,t=>(r(),u("div",{class:"col-md-4 mb-4",key:t.id},[e("div",ee,[e("div",{class:"rounded-top",style:Q([{height:"150px","background-size":"cover","background-position":"center"},{"background-image":`url(${t.imageUrl})`}])},null,4),e("div",te,[e("span",oe,a(t.category),1),e("h5",se,[e("a",ae,a(t.title),1)]),e("p",le,a(t.content),1),e("div",ne,[e("del",de,"原價 "+a(t.origin_price)+" 元",1),e("div",ce,"現在只要 "+a(t.price)+" 元",1)])]),e("div",ie,[e("button",{type:"button",class:"btn btn-outline-secondary btn-sm me-3",onClick:M=>N(t.id),disabled:h(l).productChangeToCart||h(l).productLoading==t.id},[h(l).productLoading==t.id?(r(),u("i",ue)):y("",!0),v(" 查看更多 ")],8,re),e("button",{type:"button",class:"btn btn-outline-danger btn-sm ml-auto",disabled:h(l).productChangeToCart||h(l).productLoading==t.id,onClick:M=>F(t.id)},[h(l).productChangeToCart==t.id?(r(),u("i",pe)):y("",!0),v(" 加到購物車 ")],8,_e)])])]))),128)),_(Y),e("div",he,[e("div",me,[e("table",ve,[fe,e("tbody",null,[(r(!0),u(w,null,U(b.value.carts,(t,M)=>(r(),u("tr",{key:t.id,id:t.id},[e("th",ge,[e("button",{type:"button",class:"btn btn-danger btn-sm me-3",onClick:Tt=>B(t)},[h(l).productChangeToCart==t.id?(r(),u("i",ye)):y("",!0),v(" 刪除 ")],8,xe)]),e("th",Ce,a(M+1),1),e("th",ke,a(t.product.title),1),e("th",$e,a(t.qty),1),e("th",we,a(t.product.price),1),e("th",Ve,a(t.total),1)],8,be))),128))]),e("tfoot",null,[e("tr",null,[Me,Ue,e("td",Te,a(b.value.total),1)]),b.value.total!==b.value.final_total?(r(),u("tr",Le,[ze,Ee,e("td",De,a(b.value.final_total),1)])):y("",!0)])])])]),e("div",Se,[e("div",qe,[Fe,T(e("input",{type:"text",class:"form-control rounded-0",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":o[1]||(o[1]=t=>g.value=t)},null,512),[[j,g.value]]),e("button",{type:"button",class:"btn btn-success rounded-0 rounded-end text-nowrap",onClick:O},"送出")])]),e("div",je,[_(R,{ref_key:"form_payOrder",ref:S,class:"col-md-6",onSubmit:P},{default:J(()=>[e("div",Ne,[Oe,_(m,{type:"email",class:"form-control",name:"email",id:"useremail",modelValue:d.value.user.email,"onUpdate:modelValue":o[2]||(o[2]=t=>d.value.user.email=t),placeholder:"請輸入 Email",rules:"required|email"},null,8,["modelValue"]),_(k,{name:"email",class:"text-danger"})]),e("div",Be,[Pe,_(m,{type:"text",class:"form-control",name:"姓名",id:"username",modelValue:d.value.user.name,"onUpdate:modelValue":o[3]||(o[3]=t=>d.value.user.name=t),placeholder:"輸入姓名",rules:"required"},null,8,["modelValue"]),_(k,{name:"姓名",class:"text-danger"})]),e("div",Re,[He,_(m,{type:"tel",class:"form-control",name:"電話",id:"usertel",modelValue:d.value.user.tel,"onUpdate:modelValue":o[4]||(o[4]=t=>d.value.user.tel=t),placeholder:"請輸入電話",rules:{regex:/^[0-9]+$/,required:!0,min:10}},null,8,["modelValue"]),_(k,{name:"電話",class:"text-danger"})]),e("div",Ie,[Ae,_(m,{type:"text",class:"form-control",name:"地址",id:"useraddress",modelValue:d.value.user.address,"onUpdate:modelValue":o[5]||(o[5]=t=>d.value.user.address=t),placeholder:"請輸入地址",rules:"required"},null,8,["modelValue"]),_(k,{name:"地址",class:"text-danger"})]),e("div",Ge,[Je,T(e("textarea",{name:"",id:"comment",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":o[6]||(o[6]=t=>d.value.message=t)},null,512),[[j,d.value.message]])]),Ke]),_:1},512)])])]),e("div",{ref_key:"modalEle_product",ref:D,class:"modal fade",id:"productModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},[e("div",Qe,[e("div",We,[e("div",Xe,[e("h5",Ye,[e("span",null,a(n.value.title),1)]),Ze]),e("div",et,[e("div",tt,[e("div",ot,[e("img",{src:n.value.imageUrl,class:"img-fluid",alt:""},null,8,st)]),e("div",at,[lt,v(" "+a(n.value.description),1)]),nt,e("div",dt,[ct,v(" "+a(n.value.content),1)]),it,e("div",rt,[ut,e("span",_t,a(s.$currency.currencyUSD(n.value.origin_price)),1)]),e("div",pt,[ht,e("span",mt,a(s.$currency.currencyUSD(n.value.price)),1)]),e("div",vt,[e("div",ft,[e("div",bt,[gt,T(e("select",{id:"select-num",class:"form-select","aria-label":"Default select example","onUpdate:modelValue":o[7]||(o[7]=t=>C.value=t)},[xt,(r(),u(w,null,U(10,t=>e("option",{value:t,key:t},a(t)+" "+a(n.value.unit),9,yt)),64))],512),[[K,C.value,void 0,{number:!0}]])])])]),e("div",Ct,[kt,e("div",$t,[e("div",wt,[Vt,v(" "+a(s.$currency.currencyUSD(n.value.price*C.value)),1)]),e("button",{id:"productModal_btn",type:"button",class:"btn btn-primary",onClick:o[8]||(o[8]=t=>F(n.value.id,C.value))},[h(l).productChangeToCart==n.value.id?(r(),u("i",Mt)):y("",!0),v(" 加到購物車 ")])])])])])])])],512)],64)}}};export{qt as default};
