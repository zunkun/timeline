(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-105ad180"],{"25d8":function(e,t,s){},"4a33":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"signin"}},[s("el-row",[s("el-col",{attrs:{sm:10,xs:24}},[s("h3",{staticClass:"sign-title"},[e._v("账户登录")]),s("el-form",{ref:"signData",attrs:{model:e.signData,"label-width":"80px",rules:e.rules}},[s("el-form-item",{attrs:{label:"账号",prop:"username"}},[s("el-input",{model:{value:e.signData.username,callback:function(t){e.$set(e.signData,"username",t)},expression:"signData.username"}})],1),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{attrs:{"show-password":""},model:{value:e.signData.password,callback:function(t){e.$set(e.signData,"password",t)},expression:"signData.password"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"warning",size:"small",plain:""}},[e._v("取消")]),s("el-button",{attrs:{type:"success",size:"small",plain:""},on:{click:e.signin}},[e._v("登录")])],1)],1)],1)],1)],1)},a=[],r=s("0a0d"),i=s.n(r),o=s("f499"),l=s.n(o),u={name:"signin",data:function(){return{signData:{username:"",password:""},rules:{username:[{required:!0,message:"请输入账户",trigger:"blur"},{min:3,message:"最少需要输入3位字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,message:"请至少输入6位密码",trigger:"blur"}]}}},methods:{signin:function(){var e=this,t=this;this.$refs["signData"].validate(function(s){s?fetch("/api/auth/signin",{method:"POST",body:l()(e.signData),headers:{"content-type":"application/json"}}).then(function(e){return e.json()}).then(function(s){s.id&&(e.notify("success","账户登录","账户登录成功"),localStorage.setItem("expire",i()()+858e5),localStorage.setItem("user",s),t.$store.commit("setSignin",!0),t.$store.commit("setUser",s),e.$router.push(e.$route.query.redirect||"/"))}).catch(function(){e.notify("error","账户登录","用户名或密码不正确")}):e.notify("error","账户登录","请确认登录信息是否正确")})},notify:function(e,t,s){var n=this.$createElement;this.$notify({title:t,message:n("i",{style:"success"===e?"color: teal":"color: red"},s)})}}},c=u,m=(s("7a9b"),s("2877")),g=Object(m["a"])(c,n,a,!1,null,null,null);t["default"]=g.exports},"7a9b":function(e,t,s){"use strict";var n=s("25d8"),a=s.n(n);a.a}}]);
//# sourceMappingURL=chunk-105ad180.57b664f0.js.map