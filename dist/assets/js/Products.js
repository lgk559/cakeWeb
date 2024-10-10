import{K as H,r as u,o as N,d as n,a as d,c as r,b as e,n as w,J as $,F as P,k as j,t as p,j as F,u as J,m as K,g as q,h as V,w as A,i as G,E as c,H as f,f as E,L as I,l as k}from"./index.js";import{_ as Q}from"./Navbar.js";import{e as v}from"./EventBus.js";import{M as D}from"./bootstrap.esm.js";import{$ as W}from"./jquery.js";const X={key:0,"aria-label":"Page navigation",class:"rol"},Y={class:"pagination"},Z=e("span",{"aria-hidden":"true"},"«",-1),ee=[Z],te=["onClick"],oe=e("a",{class:"page-link",href:"#","aria-label":"Next"},[e("span",{"aria-hidden":"true"},"»")],-1),le=[oe],ae={__name:"Pagination",setup(B){H();let s=u(null);function _(m){v.emit("pagination:chage",m),console.log(m)}return N(()=>{v.on("pagination:init",m=>{s.value=m})}),(m,g)=>n(s)&&n(s).total_pages>0?(d(),r("nav",X,[e("ul",Y,[e("li",{class:w(["page-item",{disabled:!n(s).has_pre}])},[e("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:g[0]||(g[0]=$(l=>_(n(s).current_page-1),["prevent"]))},ee)],2),(d(!0),r(P,null,j(n(s).total_pages,l=>(d(),r("li",{class:w(["page-item",{active:n(s).current_page===l}])},[e("a",{class:"page-link",href:"#",onClick:$(U=>_(l),["prevent"])},p(l),9,te)],2))),256)),e("li",{class:w(["page-item",{disabled:!n(s).has_next}]),onClick:g[1]||(g[1]=$(l=>_(n(s).current_page+1),["prevent"]))},le,2)])])):F("",!0)}},se={class:"nav-item"},ie={class:"p-3 pt-0"},ne={class:"table table-striped"},de=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"分類"),e("th",{scope:"col"},"商品名"),e("th",{scope:"col"},"庫存"),e("th",{scope:"col"},"單位"),e("th",{scope:"col"},"原價"),e("th",{scope:"col"},"活動價"),e("th",{scope:"col"},"狀態"),e("th",{scope:"col"},"管理")])],-1),re={scope:"row"},ce={key:0},ue={key:1},pe=["onClick"],_e={class:"modal-dialog modal-lg",role:"document"},me={class:"modal-content border-0"},he={class:"modal-header bg-dark text-white"},fe={class:"modal-title",id:"exampleModalLabel"},ve=e("button",{type:"button",class:"btn-close text-light","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),ge={class:"modal-body"},be={class:"row"},ye={class:"col-sm-4"},xe={class:"form-group"},ke=e("label",{for:"image"},"輸入圖片網址",-1),$e={class:"form-group"},Ue={for:"customFile"},Me={key:0,class:"fas fa-spinner fa-spin"},Ce={key:1,class:"fa-solid fa-triangle-exclamation"},we=["src"],Ve={class:"col-sm-8"},Ee={class:"form-group"},Pe=e("label",{for:"title"},"標題",-1),Fe={class:"form-row"},Le={class:"form-group col-md-6"},ze=e("label",{for:"category"},"分類",-1),De={class:"form-group col-md-6"},Ne=e("label",{for:"price"},"單位",-1),je={class:"form-row"},Be={class:"form-group col-md-6"},Oe=e("label",{for:"origin_price"},"原價",-1),Re={class:"form-group col-md-6"},Se=e("label",{for:"price"},"售價",-1),Te=e("hr",null,null,-1),He={class:"form-group"},Je=e("label",{for:"description"},"產品描述",-1),Ke={class:"form-group"},qe=e("label",{for:"content"},"說明內容",-1),Ae={class:"form-group"},Ge={class:"form-check"},Ie=e("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),Qe=e("button",{type:"button",class:"btn btn-danger me-auto","data-bs-toggle":"modal","data-bs-target":"#delProductModal"}," 刪除 ",-1),We=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"},"取消",-1),Xe={class:"modal-dialog",role:"document"},Ye={class:"modal-content border-0"},Ze=e("div",{class:"modal-header bg-danger text-white"},[e("h5",{class:"modal-title",id:"exampleModalLabel"},[e("span",null,"刪除產品")]),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),et={class:"modal-body"},tt={class:"text-danger"},ot=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"},"取消",-1),rt={__name:"Products",setup(B){window.$=W;const s=J(),_=u(!1),m=u([]),g=u(),l=u({}),U=u(null),L=u(null);let x=null,M=null,b=u(!1),h=u({fileUploading:!1,fileUploadError:!1});function y(a=1){b.value=!0;const t=`https://vue-course-api.hexschool.io/api/ozeu/products?page=${a}`;k.get(t).then(i=>{i.data.success?(b.value=!1,m.value=i.data.products,g.value=i.data.pagination,v.emit("pagination:init",g.value)):(v.emit("messagepush",["需登入","danger"]),s.replace("/"))})}function O(){let a="https://vue-course-api.hexschool.io/api/ozeu/admin/product",t="post";_.value||(a=`https://vue-course-api.hexschool.io/api/ozeu/admin/product/${l.value.id}`,t="put"),k[t](a,{data:l.value}).then(i=>{i.data.success?(x.hide(),y()):(x.hide(),y(),v.emit("messagepush",["新增產品失敗","danger"]))})}function z(a,t){h.value.fileUploadError&&(h.value.fileUploadError=!1),a?(l.value={},_.value=!0):(l.value=Object.assign({},t),_.value=!1),x.show()}function R(){let a=`https://vue-course-api.hexschool.io/api/ozeu/admin/product/${l.value.id}`;k["delete"](a).then(i=>{i.data.success?(M.hide(),y()):(M.hide(),y(),v.emit("messagepush",["刪除產品失敗","danger"]))})}function S(a){const t=a.target,i=t.files[0];if(t&&t.files){h.value.fileUploading=!0;const o=new FormData;o.append("file-to-upload",i),k["post"]("https://vue-course-api.hexschool.io/api/ozeu/admin/upload",o,{headers:{"Content-Type":"multipart/form-data"}}).then(C=>{C.data.success?(h.value.fileUploading=!1,l.value.imageUrl=C.data.imageUrl):(h.value.fileUploading=!1,h.value.fileUploadError=!0,v.emit("message:push",[C.data.message,"danger"]))})}}return N(()=>{x=new D(U.value),M=new D(L.value)}),K(()=>{y(),v.on("pagination:chage",a=>{y(a)})}),(a,t)=>{const i=q("loading");return d(),r(P,null,[V(Q,null,{default:A(()=>[e("li",se,[e("a",{class:"nav-link text-success",href:"#",onClick:t[0]||(t[0]=$(o=>z(!0),["prevent"]))}," 建立新產品 ")])]),_:1}),V(i,{active:n(b),"onUpdate:active":t[1]||(t[1]=o=>G(b)?b.value=o:b=o)},null,8,["active"]),e("div",ie,[e("table",ne,[de,e("tbody",null,[(d(!0),r(P,null,j(m.value,o=>(d(),r("tr",{key:o.id},[e("th",re,p(o.category),1),e("td",null,p(o.title),1),e("td",null,p(o.num),1),e("td",null,p(o.unit),1),e("td",null,p(a.$currency.currencyUSD(o.origin_price)),1),e("td",null,p(a.$currency.currencyUSD(o.price)),1),e("td",null,[o.is_enabled?(d(),r("span",ce,"啟用")):(d(),r("span",ue,"未啟用"))]),e("td",null,[e("button",{onClick:T=>z(!1,o)},"修改或刪除",8,pe)])]))),128))])]),V(ae),e("div",{ref_key:"modalEle_product",ref:U,class:"modal fade",id:"productModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},[e("div",_e,[e("div",me,[e("div",he,[e("h5",fe,[e("span",null,p(_.value?"新增產品":"編輯產品"),1)]),ve]),e("div",ge,[e("div",be,[e("div",ye,[e("div",xe,[ke,c(e("input",{type:"text",class:"form-control",id:"image","onUpdate:modelValue":t[2]||(t[2]=o=>l.value.imageUrl=o),placeholder:"請輸入圖片連結"},null,512),[[f,l.value.imageUrl]])]),e("div",$e,[e("label",Ue,[E("或 上傳圖片 "),n(h).fileUploading?(d(),r("i",Me)):F("",!0),n(h).fileUploadError?(d(),r("i",Ce)):F("",!0)]),e("input",{type:"file",id:"customFile",class:"form-control",onChange:t[3]||(t[3]=o=>S(o))},null,32)]),e("img",{src:l.value.imageUrl,class:"img-fluid",alt:""},null,8,we)]),e("div",Ve,[e("div",Ee,[Pe,c(e("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":t[4]||(t[4]=o=>l.value.title=o),placeholder:"請輸入標題"},null,512),[[f,l.value.title]])]),e("div",Fe,[e("div",Le,[ze,c(e("input",{type:"text",class:"form-control",id:"category","onUpdate:modelValue":t[5]||(t[5]=o=>l.value.category=o),placeholder:"請輸入分類"},null,512),[[f,l.value.category]])]),e("div",De,[Ne,c(e("input",{type:"unit",class:"form-control",id:"unit","onUpdate:modelValue":t[6]||(t[6]=o=>l.value.unit=o),placeholder:"請輸入單位"},null,512),[[f,l.value.unit]])])]),e("div",je,[e("div",Be,[Oe,c(e("input",{type:"number",class:"form-control",id:"origin_price","onUpdate:modelValue":t[7]||(t[7]=o=>l.value.origin_price=o),placeholder:"請輸入原價"},null,512),[[f,l.value.origin_price]])]),e("div",Re,[Se,c(e("input",{type:"number",class:"form-control",id:"price","onUpdate:modelValue":t[8]||(t[8]=o=>l.value.price=o),placeholder:"請輸入售價"},null,512),[[f,l.value.price]])])]),Te,e("div",He,[Je,c(e("textarea",{type:"text",class:"form-control",id:"description","onUpdate:modelValue":t[9]||(t[9]=o=>l.value.description=o),placeholder:"請輸入產品描述"},null,512),[[f,l.value.description]])]),e("div",Ke,[qe,c(e("textarea",{type:"text",class:"form-control",id:"content","onUpdate:modelValue":t[10]||(t[10]=o=>l.value.content=o),placeholder:"請輸入產品說明內容"},null,512),[[f,l.value.content]])]),e("div",Ae,[e("div",Ge,[c(e("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[11]||(t[11]=o=>l.value.is_enabled=o),"true-value":1,"false-value":0,id:"is_enabled"},null,512),[[I,l.value.is_enabled]]),Ie])])])])]),e("div",{class:"modal-footer"},[Qe,We,e("button",{id:"productModal_btn",type:"button",class:"btn btn-primary",onClick:O},"確認")])])])],512),e("div",{ref_key:"modalEle_del",ref:L,class:"modal fade",id:"delProductModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},[e("div",Xe,[e("div",Ye,[Ze,e("div",et,[E(" 是否刪除 "),e("strong",tt,p(l.value.title),1),E(" 商品(刪除後將無法恢復)。 ")]),e("div",{class:"modal-footer"},[ot,e("button",{type:"button",class:"btn btn-danger",onClick:R},"確認刪除")])])])],512)])],64)}}};export{rt as default};
