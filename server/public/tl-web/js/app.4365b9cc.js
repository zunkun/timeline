(function(e){function t(t){for(var a,i,o=t[0],c=t[1],l=t[2],u=0,m=[];u<o.length;u++)i=o[u],r[i]&&m.push(r[i][0]),r[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);d&&d(t);while(m.length)m.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,i=1;i<n.length;i++){var o=n[i];0!==r[o]&&(a=!1)}a&&(s.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},i={app:0},r={app:0},s=[];function o(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-0afa699a":"59c3226d","chunk-2d0e4a6e":"b2f376dc"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-0afa699a":1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=new Promise(function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-0afa699a":"3b2fe180","chunk-2d0e4a6e":"31d6cfe0"}[e]+".css",r=c.p+a,s=document.getElementsByTagName("link"),o=0;o<s.length;o++){var l=s[o],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===a||u===r))return t()}var m=document.getElementsByTagName("style");for(o=0;o<m.length;o++){l=m[o],u=l.getAttribute("data-href");if(u===a||u===r)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||r,s=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");s.request=a,delete i[e],d.parentNode.removeChild(d),n(s)},d.href=r;var h=document.getElementsByTagName("head")[0];h.appendChild(d)}).then(function(){i[e]=0}));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var s=new Promise(function(t,n){a=r[e]=[t,n]});t.push(a[2]=s);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=o(e),l=function(t){u.onerror=u.onload=null,clearTimeout(m);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,s=new Error("Loading chunk "+e+" failed.\n("+a+": "+i+")");s.type=a,s.request=i,n[1](s)}r[e]=void 0}};var m=setTimeout(function(){l({type:"timeout",target:u})},12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/tl-web/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var m=0;m<l.length;m++)t(l[m]);var d=u;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("64a9"),i=n.n(a);i.a},"0a59":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("el-container",[n("el-container",[n("el-aside",{attrs:{width:"160px"}},[n("el-menu",{attrs:{"default-active":"2-2",collapse:!1,"active-text-color":"#FF9900",router:!0}},[n("el-menu-item",{attrs:{index:"1",route:{name:"home"}}},[n("i",{staticClass:"el-icon-tl-home"}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v("主页")])]),n("el-submenu",{attrs:{index:"2"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-tl-family"}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v("人员")])]),n("el-menu-item-group",[e._l(e.$store.state.relations,function(t){return n("el-menu-item",{key:t.id,class:[["女儿"===t.relation||"妻子"===t.relation||"F"===t.gender?"el-icon-tl-girl":""],["儿子"===t.relation||"M"===t.gender?"el-icon-tl-boy":""],["父母"===t.relation||"朋友"===t.relation||"MF"===t.gender?"el-icon-tl-family":""]],style:{color:t.color},attrs:{index:"2-"+t.id,route:{name:"personal",params:{name:t.name}}}},[e._v("\n                "+e._s(t.name)+"\n              ")])}),n("el-menu-item",{staticClass:"el-icon-tl-family",attrs:{index:"noface",route:{name:"personal",params:{name:"无法识别"}}}},[e._v("\n                未知\n              ")])],2)],2),n("el-menu-item",{attrs:{index:"4",route:{name:"settings"}}},[n("i",{staticClass:"el-icon-setting"}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v("设置")])])],1)],1),n("el-container",[n("el-main",{attrs:{id:"main"}},[n("router-view")],1)],1)],1)],1)],1)},r=[],s={data:function(){return{relations:[],isActive:!0,error:null}},methods:{getRelations:function(){var e=this;fetch("/tl-web/api/relations/").then(function(e){return e.json()}).then(function(t){e.relations=t||[],e.$store.commit("setRelations",t)})}},created:function(){this.getRelations()},computed:{}},o=s,c=(n("034f"),n("2877")),l=Object(c["a"])(o,i,r,!1,null,null,null),u=l.exports,m=n("5c96"),d=n.n(m),h=(n("0fae"),n("ed2c"),n("8c4f")),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"home"}},[n("div",{staticClass:"header"},[n("div",{attrs:{id:"img-h"}},[n("span",{staticStyle:{"margin-right":"10px"}},[e._v("分配人员")]),e._l(e.$store.state.relations,function(t){return n("el-button",{key:t.id,style:{color:t.color,"border-color":t.color},attrs:{size:"small",plain:""},on:{click:function(n){return e.assign(t)}}},[e._v(e._s(t.name))])}),1===e.checkedImages.length?n("el-button",{attrs:{size:"small",plain:"",type:"warning"},on:{click:e.openExplore}},[e._v("本地浏览")]):e._e()],2)]),n("ImageListView",{on:{getcheckedimages:e.checkImages}})],1)},g=[],p=(n("96cf"),n("3b8d")),v=n("f499"),y=n.n(v),w=(n("7f7f"),n("7af0")),k={name:"home",components:{ImageListView:w["a"]},data:function(){return{checkedImages:[]}},methods:{checkImages:function(e){this.checkedImages=e},assign:function(e){var t=this;if(!this.checkedImages.length)return this.notify("danger","分配照片","请给".concat(e.name,"选择需要分配的照片"));fetch("/tl-web/api/tags/",{method:"POST",body:y()({images:this.checkedImages,tag:e.name}),headers:{"content-type":"application/json"}}).then(function(n){return n.ok?t.notify("success","分配照片","照片分配到".concat(e.name,"成功")):t.notify("error","分配照片","照片分配到".concat(e.name,"失败")),n}).catch(function(){t.notify("error","分配照片","照片分配到".concat(e.name,"失败"))})},openExplore:function(){if(1!==this.checkedImages.length)return this.notify("danger","分配照片","必须选择一张照片");fetch("/tl-web/api/images/explore",{method:"POST",body:y()({fullpath:this.checkedImages[0].fullpath}),headers:{"content-type":"application/json"}})},notify:function(e,t,n){var a=this.$createElement;this.$notify({title:t,message:a("i",{style:"success"===e?"color: teal":"color: red"},n)})}},created:function(){var e=Object(p["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}()},b=k,I=(n("cccb"),Object(c["a"])(b,f,g,!1,null,null,null)),_=I.exports;a["default"].use(h["a"]);var x=new h["a"]({base:"/tl-web/",routes:[{path:"/",name:"home",component:_},{path:"/personal/:name",name:"personal",component:function(){return n.e("chunk-2d0e4a6e").then(n.bind(null,"90ab"))}},{path:"/settings",name:"settings",component:function(){return n.e("chunk-0afa699a").then(n.bind(null,"26d3"))}}]}),T=n("2f62");a["default"].use(T["a"]);var E=new T["a"].Store({state:{relations:[]},mutations:{setRelations:function(e,t){e.relations=t}},actions:{setRelations:function(e,t){e.commit("setRelations",t)}}}),j={imageBase:"http://127.0.0.1:6789"};a["default"].use(d.a),a["default"].prototype.GLOBAL=j,a["default"].config.productionTip=!1,new a["default"]({router:x,store:E,render:function(e){return e(u)}}).$mount("#app")},"64a9":function(e,t,n){},"7af0":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"imagelistview"}},[n("div",{attrs:{id:"imagelist"}},e._l(e.imageLists,function(t,a){return n("el-row",{key:"imageList"+t.id,staticClass:"image-group",attrs:{gutter:10}},[n("el-col",{attrs:{span:2}},[n("div",{staticClass:"date-str"},[n("div",{staticClass:"date-day"},[e._v(e._s(t.day))]),n("div",{staticClass:"date-month"},[e._v(e._s(t.year)+"年"+e._s(t.month)+"月")])])]),n("el-col",{attrs:{span:22}},[n("el-row",e._l(t.Image,function(t,i){return n("el-col",{key:"image"+t.id,staticClass:"image-outer",attrs:{span:4}},[n("div",{staticClass:"image-inner"},[n("img",{staticClass:"image-item",attrs:{src:t.link,alt:t.name},on:{click:function(n){return e.viewImage(t,i,a)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.checked,expression:"image.checked"}],staticClass:"check-item",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.checked)?e._i(t.checked,null)>-1:t.checked},on:{click:function(n){return e.checkImage(t,n,i,a)},change:function(n){var a=t.checked,i=n.target,r=!!i.checked;if(Array.isArray(a)){var s=null,o=e._i(a,s);i.checked?o<0&&e.$set(t,"checked",a.concat([s])):o>-1&&e.$set(t,"checked",a.slice(0,o).concat(a.slice(o+1)))}else e.$set(t,"checked",r)}}})])])}),1)],1)],1)}),1),e.showImage?void 0:e._e(),n("el-dialog",{attrs:{title:e.currentImage.name,visible:e.showImageView,fullscreen:!0,modal:"","close-on-click-modal":"","custom-class":"dialog"},on:{"update:visible":function(t){e.showImageView=t}}},[n("el-carousel",{ref:"carousel",attrs:{autoplay:!1,arrow:"always","indicator-position":"none","initial-index":e.initialIndex},on:{change:e.changeView}},e._l(e.images,function(e){return n("el-carousel-item",{key:e.id,attrs:{label:e.name}},[n("img",{attrs:{src:e.link}})])}),1)],1)],2)},i=[],r=(n("20d6"),n("0a0d")),s=n.n(r),o=(n("b54a"),n("5d73")),c=n.n(o),l={name:"ImageListView",props:["tags"],data:function(){return{showImage:!1,showImageView:!1,currentImage:{name:""},images:[],imageLists:[],initialIndex:0,timeout:null,startTime:null,page:1,limit:5,checked:!1,checkedImages:[]}},methods:{setDefault:function(){this.page=1,this.images=[],this.imageLists=[],this.checkedImages=[]},loadImages:function(){var e=this;fetch("/tl-web/api/images?page=".concat(this.page++,"&limit=").concat(this.limit,"&tags=").concat(this.tags||"")).then(function(e){return e.json()}).then(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=!0,a=!1,i=void 0;try{for(var r,s=c()(t);!(n=(r=s.next()).done);n=!0){var o=r.value;e.imageLists.push(o);var l=!0,u=!1,m=void 0;try{for(var d,h=c()(o.Image);!(l=(d=h.next()).done);l=!0){var f=d.value;f.link=e.GLOBAL.imageBase+f.link,e.images.push(f)}}catch(g){u=!0,m=g}finally{try{l||null==h.return||h.return()}finally{if(u)throw m}}}}catch(g){a=!0,i=g}finally{try{n||null==s.return||s.return()}finally{if(a)throw i}}})},changeTags:function(){this.setDefault(),this.loadImages()},viewImage:function(e,t,n){for(var a=0,i=0;i<n;i++)a+=this.imageLists[i].Image.length;a+=t,this.initialIndex=a,this.showImage=!0,this.$refs.carousel&&this.$refs.carousel.setActiveItem(this.initialIndex),this.currentImage=e,this.showImageView=!0},changeView:function(e){this.currentImage=this.images[e]},lowEnough:function(){var e=document.getElementById("main"),t=Math.max(e.scrollHeight,document.body.offsetHeight),n=window.innerHeight||document.documentElement.clientHeight||e.clientHeight||0,a=window.pageYOffset||document.documentElement.scrollTop||e.scrollTop||0;return t-n-a<40},watchScroll:function(e,t){var n=this;this.startTime||(this.startTime=s()());var a=s()();return function(){a-this.startTime>=t?(this.startTime=a,clearTimeout(this.timeout),n.lowEnough()&&n.loadImages()):(clearTimeout(this.timeout),this.timeout=setTimeout(function(){this.startTime=s()(),n.lowEnough()&&n.loadImages()},e))}},checkImage:function(e,t){if(t.target.checked)this.checkedImages.push(e);else{var n=this.checkedImages.findIndex(function(t){return t.id===e.id});n>-1&&this.checkedImages.splice(n,1)}this.$emit("getcheckedimages",this.checkedImages)}},created:function(){this.loadImages(this.tags),window.addEventListener("scroll",this.watchScroll(1e3,3e3),!0)},watch:{tags:function(e){this.tags=e,this.changeTags()}}},u=l,m=(n("9ddc"),n("2877")),d=Object(m["a"])(u,a,i,!1,null,null,null);t["a"]=d.exports},"9ddc":function(e,t,n){"use strict";var a=n("0a59"),i=n.n(a);i.a},cccb:function(e,t,n){"use strict";var a=n("d563"),i=n.n(a);i.a},d563:function(e,t,n){},ed2c:function(e,t,n){}});
//# sourceMappingURL=app.4365b9cc.js.map