(function(t){function e(e){for(var r,o,s=e[0],i=e[1],l=e[2],u=0,d=[];u<s.length;u++)o=s[u],a[o]&&d.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);p&&p(e);while(d.length)d.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(c.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={app:0},a={app:0},c=[];function s(t){return i.p+"js/"+({}[t]||t)+"."+{"chunk-041dcf18":"96166b75","chunk-105ad180":"f37dc044","chunk-2acfc9d8":"fb12563b","chunk-b01c1fac":"783efb68","chunk-b14c8966":"1cfdc466"}[t]+".js"}function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n={"chunk-041dcf18":1,"chunk-105ad180":1,"chunk-2acfc9d8":1,"chunk-b01c1fac":1,"chunk-b14c8966":1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=new Promise(function(e,n){for(var r="css/"+({}[t]||t)+"."+{"chunk-041dcf18":"127f29d0","chunk-105ad180":"d30513ca","chunk-2acfc9d8":"ee17cd91","chunk-b01c1fac":"9ec7468c","chunk-b14c8966":"a16876a1"}[t]+".css",a=i.p+r,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var l=c[s],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===r||u===a))return e()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){l=d[s],u=l.getAttribute("data-href");if(u===r||u===a)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var r=e&&e.target&&e.target.src||a,c=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[t],p.parentNode.removeChild(p),n(c)},p.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(p)}).then(function(){o[t]=0}));var r=a[t];if(0!==r)if(r)e.push(r[2]);else{var c=new Promise(function(e,n){r=a[t]=[e,n]});e.push(r[2]=c);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=s(t),l=function(e){u.onerror=u.onload=null,clearTimeout(d);var n=a[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src,c=new Error("Loading chunk "+t+" failed.\n("+r+": "+o+")");c.type=r,c.request=o,n[1](c)}a[t]=void 0}};var d=setTimeout(function(){l({type:"timeout",target:u})},12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(e)},i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/tasks/",i.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var p=u;c.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0294":function(t,e,n){"use strict";var r=n("5331"),o=n.n(r);o.a},"034f":function(t,e,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"0418":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"header"}},[n("el-header",[n("el-row",{staticClass:"header-wrapper"},[n("el-col",{attrs:{span:22}},[t._t("default")],2),n("el-col",{attrs:{span:2}},[n("div",{staticClass:"profile-wrapper"},[n("el-dropdown",{on:{command:t.handleUser}},[n("span",{staticClass:"el-dropdown-link profile-title"},[t._v("\n              管理\n              "),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("router-link",{attrs:{to:{name:"todos"}}},[n("el-dropdown-item",{attrs:{command:"todos"}},[t._v("事项")])],1),n("el-dropdown-item",{attrs:{command:"signout"}},[t._v("退出")])],1)],1)],1)])],1)],1)],1)},o=[],a={name:"Header",methods:{handleUser:function(t){"signout"===t&&(this.$store.commit("setSignin",!1),this.$store.commit("setUser",null),localStorage.setItem("expire",0),this.$router.push({name:"signin"}))}}},c=a,s=(n("8baf"),n("2877")),i=Object(s["a"])(c,r,o,!1,null,null,null);e["a"]=i.exports},4378:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"todoinputlists"}},[n("el-row",[n("el-col",{attrs:{span:24}},[n("draggable",{attrs:{group:"todos",move:t.moveTodo,"ghost-class":"ghost"},on:{start:function(e){t.drag=!0},end:function(e){t.drag=!1},change:t.changeTodo},model:{value:t.todos,callback:function(e){t.todos=e},expression:"todos"}},t._l(t.todos,function(e,r){return n("div",{key:t.type+"-"+r,staticClass:"todo-f"},[n("div",{staticClass:"todo-item1"},[n("el-checkbox",{staticClass:"t-check",staticStyle:{float:"left"},attrs:{disabled:!e.id||!e.text},on:{change:function(n){return t.checkTodo(e)}},model:{value:e.checked,callback:function(n){t.$set(e,"checked",n)},expression:"todo.checked"}})],1),n("div",{staticClass:"todo-item2"},[n("el-input",{class:{"todo-input":!0,"text-checked":e.checked},attrs:{placeholder:"输入事项"},on:{blur:function(n){return t.saveTodo(e,r)}},nativeOn:{keyup:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.saveTodo(e,r)}},model:{value:e.text,callback:function(n){t.$set(e,"text",n)},expression:"todo.text"}})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.id,expression:"todo.id"}],staticClass:"icon-parent todo-item3"},[n("el-tooltip",{attrs:{effect:"light",content:"important"==e.type?"调整该项为普通项目":"调整该项为重要项目",placement:"top-end"}},[n("i",{staticClass:"el-icon-tl-exchange i-son",on:{click:function(n){return t.changeType(e,r)}}})]),n("el-tooltip",{attrs:{effect:"light",content:"删除该事项",placement:"top-end"}},[n("i",{staticClass:"el-icon-delete i-son",on:{click:function(n){return t.deleteTodo(e,r)}}})])],1),n("div",{staticClass:"clear"})])}),0)],1)],1)],1)},o=[],a=n("a4bb"),c=n.n(a),s=n("f499"),i=n.n(s),l=n("1980"),u=n.n(l),d={name:"TodoLists",props:["todolists","type"],components:{draggable:u.a},data:function(){return{baseUrl:"/tasks/api/todos",todos:[]}},methods:{getTodos:function(t){var e=this,n="".concat(this.baseUrl,"/?type=").concat(t);fetch(n).then(function(t){if(t.ok)return t.json();throw"获取ToDo 列表失败"}).then(function(t){t&&(e.todos=t||[])})},saveTodo:function(t,e){var n=this,r="POST";if(!t.text||!t.text.trim()){if(!t.id)return;return this.deleteTodo(t,e)}var o="".concat(this.baseUrl,"/");t.id&&(o="".concat(o).concat(t.id),r="PUT"),fetch(o,{method:r,body:i()(t),headers:{"content-type":"application/json"}}).then(function(t){return t.json()}).then(function(t){t.id&&(n.todos[e]=t,n.newTodo(t.type))})},deleteTodo:function(t,e){var n=this,r="".concat(this.baseUrl,"/").concat(t.id);fetch(r,{method:"DELETE",headers:{"content-type":"application/json"}}).then(function(t){t.ok&&n.todos.splice(e,1)})},newTodo:function(){var t=[{checked:!1,text:"",type:this.type,sequence:0}];this.todos=t.concat(this.todos)},updateTodoInfo:function(t,e){var n="/tasks/api/todos/".concat(e);fetch(n,{method:"PUT",body:i()(t),headers:{"content-type":"application/json"}})},moveTodo:function(t){var e=t.draggedContext;if(!e.element||!e.element.id)return!1},changeTodo:function(t){var e=c()(t)[0],n=t[e].element;if(!n.id)return!1;if("added"===e){var r="important"===n.type?"common":"important";return this.updateTodoInfo({type:r},n.id)}},checkTodo:function(t){this.updateTodoInfo({checked:t.checked},t.id)},changeType:function(t,e){this.updateTodoInfo({type:"important"===t.type?"common":"important"},t.id),this.todos.splice(e,1)},init:function(){this.todos=this.todolists,this.newTodo()}},created:function(){this.init()},watch:{todolists:function(t){this.todos=t||[],this.newTodo(this.type)}}},p=d,f=(n("0294"),n("2877")),h=Object(f["a"])(p,r,o,!1,null,null,null);e["a"]=h.exports},5331:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("el-container",[n("el-container",[n("el-aside",{attrs:{width:"160px"}},[n("el-menu",{attrs:{"default-active":"2-2",collapse:!1,"active-text-color":"#FF9900",router:!0}},[n("el-menu-item",{attrs:{index:"1",route:{name:"home"}}},[n("i",{staticClass:"el-icon-tl-home"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("主页")])]),n("el-menu-item",{attrs:{index:"2",route:{name:"projects"}}},[n("i",{staticClass:"el-icon-tl-kanban"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("项目")])]),n("el-menu-item",{attrs:{index:"3",route:{name:"todos"}}},[n("i",{staticClass:"el-icon-tickets"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("事项")])]),n("el-menu-item",{attrs:{index:"4",route:{name:"calendar"}}},[n("i",{staticClass:"el-icon-date"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("日历")])])],1)],1),n("el-container",[n("el-main",{attrs:{id:"main"}},[n("router-view")],1)],1)],1)],1)],1)},a=[],c={data:function(){return{}}},s=c,i=(n("034f"),n("2877")),l=Object(i["a"])(s,o,a,!1,null,null,null),u=l.exports,d=n("5c96"),p=n.n(d),f=(n("0fae"),n("ed2c"),n("0a0d")),h=n.n(f),m=(n("c5f6"),n("8c4f")),v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"home"}},[n("Header",[n("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[n("el-breadcrumb-item",[t._v("主页")]),n("el-breadcrumb-item",[t._v("项目")])],1)],1),n("el-row",{staticClass:"home-dashbord",attrs:{gutter:10}},[n("el-col",{staticClass:"left-top",attrs:{span:10}},[n("div",{staticClass:"left"},[n("TodoInputLists",{attrs:{todolists:t.todos,type:"important"}})],1)]),n("el-col",{attrs:{span:14}},[n("div",{staticClass:"right"},t._l(t.projects,function(e,r){return n("el-col",{key:e.id,staticClass:"project-z",attrs:{span:8}},[n("el-card",{style:{"border-color":e.color},attrs:{shadow:"hover"}},[n("div",{staticClass:"project-title"},[n("router-link",{attrs:{to:{name:"project",params:{id:e.id}}}},[n("span",{staticClass:"project-n"},[t._v(t._s(e.name))])]),e.enable?n("span",{staticClass:"project-status"},[n("el-tag",{attrs:{size:"mini",type:"success"}},[t._v("使用")])],1):n("span",{staticClass:"project-status"},[n("el-tag",{attrs:{size:"mini",type:"danger"}},[t._v("归档")])],1),n("span",{staticClass:"project-button",on:{click:function(n){return t.edit(e,r)}}},[t._v("编辑")])],1),n("p",[n("span",{staticClass:"project-d"},[t._v(t._s(e.description))])])])],1)}),1)])],1),n("el-dialog",{attrs:{title:t.currentProject.title||"项目编辑",visible:t.visible,width:"50%"},on:{"update:visible":function(e){t.visible=e}}},[n("el-form",{ref:"projectform",attrs:{model:t.currentProject,rules:t.rules,"label-width":"80px","label-position":"right",id:"projectform"}},[n("el-form-item",{attrs:{label:"名称",prop:"name"}},[n("el-input",{model:{value:t.currentProject.name,callback:function(e){t.$set(t.currentProject,"name",e)},expression:"currentProject.name"}})],1),n("el-form-item",{attrs:{label:"类别",prop:"type"}},[n("el-select",{attrs:{placeholder:"选择类别"},model:{value:t.currentProject.type,callback:function(e){t.$set(t.currentProject,"type",e)},expression:"currentProject.type"}},t._l(this.projectTypes,function(t){return n("el-option",{key:t.type,attrs:{label:t.name,value:t.type}})}),1)],1),n("el-form-item",{attrs:{label:"颜色",prop:"color"}},[n("el-input",{staticClass:"color-i",attrs:{placeholder:"输入颜色"},model:{value:t.currentProject.color,callback:function(e){t.$set(t.currentProject,"color",e)},expression:"currentProject.color"}},[n("template",{slot:"append"},[n("el-color-picker",{staticClass:"color-p",model:{value:t.currentProject.color,callback:function(e){t.$set(t.currentProject,"color",e)},expression:"currentProject.color"}})],1)],2)],1),n("el-form-item",{attrs:{label:"说明",prop:"description"}},[n("el-input",{attrs:{type:"textarea",rows:3},model:{value:t.currentProject.description,callback:function(e){t.$set(t.currentProject,"description",e)},expression:"currentProject.description"}})],1),n("el-form-item",{attrs:{label:"启用"}},[n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.currentProject.enable,callback:function(e){t.$set(t.currentProject,"enable",e)},expression:"currentProject.enable"}})],1)],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.currentProject.id?n("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:t.deleteProject}},[t._v("删 除")]):t._e(),n("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(e){t.visible=!1}}},[t._v("取 消")]),n("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:t.saveProject}},[t._v("确 定")])],1)],1)],1)},b=[],g=n("f499"),j=n.n(g),y=n("795b"),k=n.n(y),w=(n("96cf"),n("3b8d")),x=n("0418"),P=n("4378"),T={name:"home",components:{Header:x["a"],TodoInputLists:P["a"]},data:function(){return{baseUrl:"/tasks/api/projects",todos:[],visible:!1,projectTypes:[{type:"project",name:"项目"},{type:"work",name:"工作"},{type:"family",name:"家庭"},{type:"life",name:"生活"},{type:"skills",name:"技能"}],rules:{name:[{required:!0,message:"请输入项目名称",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],type:[{required:!0,message:"请选择类型",trigger:"blur"}],color:[{required:!0,message:"输入颜色",trigger:"blur"},{type:"string",pattern:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,message:"请输入正确的hex颜色值",trigger:"blur"}],description:[{required:!0,message:"请输入项目说明",trigger:"blur"},{min:2,message:"至少个字符",trigger:"blur"}]},currentProject:{color:"#cf9236",type:"project",enable:!0},currentIndex:0,projects:[]}},methods:{notify:function(t,e,n){var r=this.$createElement;this.$notify({title:e,message:r("i",{style:"success"===t?"color: teal":"color: red"},n)})},newProject:function(){this.currentProject={color:"#cf9236",type:"project",enable:!0},this.visible=!1,this.currentIndex=0},getTodos:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(e){var n,r=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/tasks/api/todos/?limit=10&page=1",e&&(n="".concat(n,"&type=").concat(e)),t.abrupt("return",fetch(n).then(function(t){if(t.ok)return t.json();throw"获取ToDo 列表失败"}).then(function(t){if(t)return r.count=t.count||0,r.todos=t.rows||[],r.todos}));case 3:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),getProjects:function(t){var e=this,n="/tasks/api/projects/?limit=12&page=1&enable=true";fetch(n).then(function(t){if(t.ok)return t.json();throw"获取项目列表失败"}).then(function(t){t&&(e.count=t.count||0,e.projects=t.rows||[])})},saveProject:function(){var t=this;this.$refs.projectform.validate(function(){var e=Object(w["a"])(regeneratorRuntime.mark(function e(n){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return",k.a.resolve());case 2:if(!t.currentProject.id){e.next=7;break}return e.next=5,t.updateProject(t.currentProject);case 5:e.next=10;break;case 7:return e.next=9,t.createProject(t.currentProject);case 9:t.getProjects();case 10:t.newProject();case 11:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())},updateProject:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="".concat(this.baseUrl,"/").concat(e.id),t.abrupt("return",fetch(n,{method:"PUT",body:j()(e),headers:{"content-type":"application/json"}}));case 2:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),createProject:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(e){var n,r=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="".concat(this.baseUrl,"/"),t.abrupt("return",fetch(n,{method:"POST",body:j()(e),headers:{"content-type":"application/json"}}).then(function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(e){var n,o;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!e.ok){t.next=6;break}return t.next=3,e.json();case 3:n=t.sent,o=[n],r.projects=o.concat(r.projects);case 6:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()));case 2:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),deleteProject:function(){var t=this;if(this.currentProject.id){var e="".concat(this.baseUrl,"/").concat(this.currentProject.id);fetch(e,{method:"DELETE"}).then(function(){var e=Object(w["a"])(regeneratorRuntime.mark(function e(n){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n.ok&&(t.projects.splice(t.currentIndex,1),t.newProject());case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())}},edit:function(t,e){this.projectIndex=e||0,this.currentProject=t,this.visible=!0}},created:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.getTodos(),this.getProjects();case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},_=T,C=(n("cccb"),Object(i["a"])(_,v,b,!1,null,null,null)),S=C.exports,O=n("2f62");r["default"].use(O["a"]);var E=new O["a"].Store({state:{isSignin:"true"===window.localStorage.getItem("isSignin"),user:JSON.parse(window.localStorage.getItem("user"))},mutations:{setSignin:function(t,e){t.isSignin=e,window.localStorage.setItem("isSignin",e)},setUser:function(t,e){t.user=e,window.localStorage.setItem("user",j()(e))}}});r["default"].use(m["a"]);var $=new m["a"]({base:"/tasks/",routes:[{path:"/",name:"home",component:S,meta:{isAuth:!0}},{path:"/projects",name:"projects",component:function(){return n.e("chunk-041dcf18").then(n.bind(null,"acca"))},meta:{isAuth:!0}},{path:"/projects/:id",name:"project",component:function(){return n.e("chunk-2acfc9d8").then(n.bind(null,"07bd"))},meta:{isAuth:!0}},{path:"/todos",name:"todos",component:function(){return n.e("chunk-b01c1fac").then(n.bind(null,"75cf"))},meta:{isAuth:!0}},{path:"/calendar",name:"calendar",component:function(){return n.e("chunk-b14c8966").then(n.bind(null,"ac0f"))},meta:{isAuth:!0}},{path:"/signin",name:"signin",component:function(){return n.e("chunk-105ad180").then(n.bind(null,"4a33"))}}]});$.beforeEach(function(t,e,n){if(t.matched.some(function(t){return t.meta.isAuth})){var r=Number(localStorage.getItem("expire"))||0,o=!1,a=localStorage.getItem("user");a&&r>h()()&&(o=!0),o?n():(E.commit("setSignin",!1),E.commit("setUser",null),n({path:"/signin",query:{redirect:t.fullPath}}))}else n()});var I=$;r["default"].use(p.a),r["default"].config.productionTip=!1,new r["default"]({router:I,store:E,render:function(t){return t(u)}}).$mount("#app")},"64a9":function(t,e,n){},"782e":function(t,e,n){},"8baf":function(t,e,n){"use strict";var r=n("782e"),o=n.n(r);o.a},cccb:function(t,e,n){"use strict";var r=n("d563"),o=n.n(r);o.a},d563:function(t,e,n){},ed2c:function(t,e,n){}});
//# sourceMappingURL=app.2e885bd1.js.map