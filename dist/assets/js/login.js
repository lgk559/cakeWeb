import{u as R,r as l,m as B,o as E,a as c,c as u,b as e,E as p,H as I,n as _,j as v,M as b,I as C,l as D}from"./index.js";const $={id:"login",class:"loginBox"},z={class:"login"},L=e("h1",{class:"t-center"},"廠商登入",-1),M={class:"main t-center"},F={class:"item_account"},V=e("span",{class:"input_title"},"帳號",-1),A={key:0,class:"failureInfo"},T={class:"item_password"},j=e("span",{class:"input_title"},"密碼",-1),G=["type"],K=["src"],N={key:0,class:"failureInfo"},O={__name:"login",emits:["change"],setup(U,{emit:m}){const f=m,g=R();l(!1);const s=l({username:"",password:""}),n=l({account:!0,password:!0}),i=l(!0),r=l({password:"/assets/images/visibility_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg",txt:"/assets/images/visibility_off_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"});function h(){if(s.value.account=="")return!0;{let o=new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);n.value.account=!!o.test(s.value.username)}}function w(){let o=new RegExp(/^([a-zA-Z0-9]{6,15}|0\d+)$/);n.value.password=!!o.test(s.value.password)}function d(){const o="https://vue-course-api.hexschool.io/admin/signin",t={...s.value};D.post(o,t).then(a=>{const y=a.data.token,k=a.data.expired;document.cookie=`hexToken=${y}; expires=${new Date(k)}`,g.push("/admin/products")})}function x(){f("change",!1)}return B(()=>{}),E(o=>{}),(o,t)=>(c(),u("div",$,[e("div",z,[L,e("div",M,[e("div",F,[V,p(e("input",{id:"account",type:"text",class:_(["form-control",{failure:!n.value.account}]),placeholder:"請輸入電子信箱","onUpdate:modelValue":t[0]||(t[0]=a=>s.value.username=a),onBlur:h},null,34),[[I,s.value.username]]),n.value.account?v("",!0):(c(),u("span",A,"請輸入正確"))]),e("div",T,[j,p(e("input",{id:"password",class:_(["form-control",{failure:!n.value.password}]),placeholder:"請輸入6~15英數組成的密碼",size:"33",maxlength:"15",type:i.value?"password":"text","onUpdate:modelValue":t[1]||(t[1]=a=>s.value.password=a),onBlur:w,onKeyup:C(d,["enter"])},null,42,G),[[b,s.value.password]]),e("span",{class:"eye",onClick:t[2]||(t[2]=a=>i.value=!i.value)},[e("img",{src:i.value?r.value.password:r.value.txt,alt:""},null,8,K)]),n.value.password?v("",!0):(c(),u("span",N,"不可包含符號、長度需6字元以上"))])]),e("button",{class:"p-r-center",onClick:d},"登入"),e("button",{class:"close",onClick:x}," X ")])]))}};export{O as default};
