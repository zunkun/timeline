(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b01c1fac"],{3703:function(t,e,n){},"469f":function(t,e,n){n("6c1c"),n("1654"),t.exports=n("7d7b")},"4a2b":function(t,e,n){"use strict";var o=n("75c0"),a=n.n(o);a.a},"5d73":function(t,e,n){t.exports=n("469f")},"75c0":function(t,e,n){},"75cf":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"todos"}},[n("Header",[n("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[n("el-breadcrumb-item",{attrs:{to:{name:"todos"}}},[t._v("事项")]),n("el-breadcrumb-item",[t._v(t._s(t.typeMap[t.showTab]))])],1)],1),n("div",{staticClass:"tab-lists"},[n("el-tabs",{model:{value:t.showTab,callback:function(e){t.showTab=e},expression:"showTab"}},[n("el-tab-pane",{attrs:{label:"事项列表",name:"summary"}},[n("TodoListsSummary")],1),t._l(t.todoTypes,function(e){return n("el-tab-pane",{key:e.type,attrs:{label:e.name,name:e.type,lazy:!0}},[n("TodoLists",{attrs:{"todo-type":e,type:t.showTab}})],1)})],2)],1)],1)},a=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",t._l(t.todoTypes,function(e){return n("el-col",{key:e.type,staticClass:"todo-p",attrs:{span:12}},[n("div",{staticClass:"todo-title"},[n("span",{staticClass:"title-c"},[t._v(t._s(e.name))])]),n("TodoInputLists",{attrs:{todolists:t.todos[e.type],type:e.type}})],1)}),1)],1)},s=[],i=n("5d73"),c=n.n(i),u=(n("96cf"),n("3b8d")),p=n("4378"),d={name:"TodoListsSummary",components:{TodoInputLists:p["a"]},data:function(){return{baseUrl:"/tasks/api/todos",types:[{type:"important",name:"重要事项"},{type:"common",name:"普通事项"}],todoTypes:[{type:"important",name:"重要事项"},{type:"common",name:"普通事项"}],todos:{important:[],common:[]},drag:!1}},methods:{getTodos:function(t){var e=this,n="".concat(this.baseUrl,"/?type=").concat(t);fetch(n).then(function(t){if(t.ok)return t.json();throw"获取ToDo 列表失败"}).then(function(n){n&&(e.todos[t]=n.rows||[])})},initTodos:function(){var t=Object(u["a"])(regeneratorRuntime.mark(function t(){var e,n,o,a,r,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:for(e=!0,n=!1,o=void 0,t.prev=3,a=c()(this.todoTypes);!(e=(r=a.next()).done);e=!0)s=r.value,this.getTodos(s.type);t.next=11;break;case 7:t.prev=7,t.t0=t["catch"](3),n=!0,o=t.t0;case 11:t.prev=11,t.prev=12,e||null==a.return||a.return();case 14:if(t.prev=14,!n){t.next=17;break}throw o;case 17:return t.finish(14);case 18:return t.finish(11);case 19:case"end":return t.stop()}},t,this,[[3,7,11,19],[12,,14,18]])}));function e(){return t.apply(this,arguments)}return e}()},created:function(){var t=Object(u["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.initTodos();case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},l=d,m=n("2877"),h=Object(m["a"])(l,r,s,!1,null,null,null),f=h.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"todolists"}},[n("div",[t._v("\n    "+t._s(t.todoType.name)+"\n  ")]),n("TodoInputLists",{attrs:{todolists:t.todos,type:t.showType}}),t.count>t.limit?n("el-pagination",{staticClass:"pagination-z",attrs:{background:"",layout:"prev, pager, next","page-size":t.limit,total:t.count},on:{"current-change":t.changeData}}):t._e()],1)},b=[],T={name:"TodoLists",props:["todoType","type"],components:{TodoInputLists:p["a"]},data:function(){return{baseUrl:"/tasks/api/todos",todos:[],page:1,limit:10,count:0,showType:this.type}},methods:{getTodos:function(){var t=Object(u["a"])(regeneratorRuntime.mark(function t(e){var n,o=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="".concat(this.baseUrl,"/?limit=").concat(this.limit,"&page=").concat(this.page),e&&(n="".concat(n,"&type=").concat(e)),t.abrupt("return",fetch(n).then(function(t){if(t.ok)return t.json();throw"获取ToDo 列表失败"}).then(function(t){if(t)return o.count=t.count||0,o.todos=t.rows||[],o.todos}));case 3:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),changeData:function(t){this.page=t,this.getTodos(this.todoType.type)}},created:function(){var t=Object(u["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.getTodos(this.todoType.type);case 1:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),watch:{type:function(t,e){t!==e&&this.getTodos(t)}}},v=T,w=(n("ede3"),Object(m["a"])(v,y,b,!1,null,null,null)),g=w.exports,k=n("0418"),x={name:"Todos",components:{Header:k["a"],TodoListsSummary:f,TodoLists:g},data:function(){return{baseUrl:"/tasks/api/todos",showTab:"summary",typeMap:{summary:"事项列表",important:"重要事项",common:"普通事项"},todoTypes:[{type:"important",name:"重要事项"},{type:"common",name:"普通事项"}]}}},_=x,L=(n("4a2b"),Object(m["a"])(_,o,a,!1,null,null,null));e["default"]=L.exports},"7d7b":function(t,e,n){var o=n("e4ae"),a=n("7cd6");t.exports=n("584a").getIterator=function(t){var e=a(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return o(e.call(t))}},ede3:function(t,e,n){"use strict";var o=n("3703"),a=n.n(o);a.a}}]);
//# sourceMappingURL=chunk-b01c1fac.4b8f978c.js.map