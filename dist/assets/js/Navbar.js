import{u as l,m as c,a as n,c as r,b as s,e as i,J as u,l as p}from"./index.js";const h={class:"navbar sticky-top navbar-expand-lg navbar-light bg-light"},d={class:"container-fluid"},_=s("form",{class:"d-flex"},[s("input",{class:"form-control me-2",type:"search",placeholder:"Search","aria-label":"Search"}),s("button",{class:"btn btn-outline-success",type:"submit"},"Search")],-1),b={class:"collapse navbar-collapse position-absolute end-0",id:"navbarScroll"},v={class:"navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll",style:{"--bs-scroll-height":"100px"}},m={class:"nav-item"},k={__name:"Navbar",setup(g){const e=l();c(()=>{});function t(){console.log("click"),p.post("https://vue-course-api.hexschool.io/logout").then(a=>{a.data.success&&(e.push({path:"/login",replace:!0}),console.log(a.data),console.log("登出成功"))})}return(o,a)=>(n(),r("nav",h,[s("div",d,[_,s("div",b,[s("ul",v,[i(o.$slots,"default"),s("li",m,[s("a",{class:"nav-link",onClick:u(t,["prevent"])},"登出")])])])])]))}};export{k as _};
