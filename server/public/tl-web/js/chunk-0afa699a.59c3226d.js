(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0afa699a"],{"02f4":function(e,t,a){var n=a("4588"),r=a("be13");e.exports=function(e){return function(t,a){var i,l,o=String(r(t)),s=n(a),c=o.length;return s<0||s>=c?e?"":void 0:(i=o.charCodeAt(s),i<55296||i>56319||s+1===c||(l=o.charCodeAt(s+1))<56320||l>57343?e?o.charAt(s):i:e?o.slice(s,s+2):l-56320+(i-55296<<10)+65536)}}},"0390":function(e,t,a){"use strict";var n=a("02f4")(!0);e.exports=function(e,t,a){return t+(a?n(e,t).length:1)}},"0bfb":function(e,t,a){"use strict";var n=a("cb7c");e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"214f":function(e,t,a){"use strict";a("b0c5");var n=a("2aba"),r=a("32e9"),i=a("79e5"),l=a("be13"),o=a("2b4c"),s=a("520a"),c=o("species"),u=!i(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),p=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var a="ab".split(e);return 2===a.length&&"a"===a[0]&&"b"===a[1]}();e.exports=function(e,t,a){var d=o(e),f=!i(function(){var t={};return t[d]=function(){return 7},7!=""[e](t)}),b=f?!i(function(){var t=!1,a=/a/;return a.exec=function(){return t=!0,null},"split"===e&&(a.constructor={},a.constructor[c]=function(){return a}),a[d](""),!t}):void 0;if(!f||!b||"replace"===e&&!u||"split"===e&&!p){var h=/./[d],g=a(l,d,""[e],function(e,t,a,n,r){return t.exec===s?f&&!r?{done:!0,value:h.call(t,a,n)}:{done:!0,value:e.call(a,t,n)}:{done:!1}}),m=g[0],v=g[1];n(String.prototype,e,m),r(RegExp.prototype,d,2==t?function(e,t){return v.call(e,this,t)}:function(e){return v.call(e,this)})}}},"26d3":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"settings"}},[a("el-tabs",{model:{value:e.showTab,callback:function(t){e.showTab=t},expression:"showTab"}},[a("el-tab-pane",{attrs:{label:"照片目录",name:"disk"}},[a("DirectoryList")],1),a("el-tab-pane",{attrs:{label:"家人管理",name:"relations"}},[a("Relationlist")],1),a("el-tab-pane",{attrs:{label:"标签设置",name:"imagetags"}},[a("ImageTags")],1),a("el-tab-pane",{attrs:{label:"任务设置",name:"tasks"}},[e._v("任务设置")])],1)],1)},r=[],i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"directory"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-row",[a("span",[e._v("目录列表")]),a("div",{staticClass:"m-r"},[a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:e.addNodes}},[e._v("人员")]),a("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:e.addNodes}},[e._v("场景")]),a("el-button",{attrs:{size:"mini",type:"success",plain:""},on:{click:e.addNodes}},[e._v("新增目录")])],1)]),a("el-tree",{ref:"folderlist",attrs:{props:e.folderlist,load:e.loadNode,lazy:"","show-checkbox":""}})],1),a("el-col",{attrs:{span:12}},[a("el-table",{attrs:{data:e.directories,border:""}},[a("el-table-column",{attrs:{type:"index",width:"50"}}),a("el-table-column",{attrs:{prop:"dir",label:"图片目录"}}),a("el-table-column",{attrs:{label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",plain:"",type:"danger"},on:{click:function(a){return e.delDir(t.row)}}},[e._v("删除")])]}}])})],1)],1)],1)],1)},l=[],o=a("f499"),s=a.n(o),c=(a("7f7f"),a("ac6a"),a("96cf"),a("3b8d")),u={data:function(){return{directories:[],disks:["C"],folderlist:{label:"name",isLeaf:"isLeaf",children:"children"}}},methods:{listDirs:function(){var e=this;fetch("/tl-web/api/disks/dirs").then(function(e){return e.json()}).then(function(t){e.directories=t||[]})},listDisks:function(){var e=this;return fetch("/tl-web/api/disks/").then(function(e){return e.json()}).then(function(t){return e.disks=t||[],e.disks}).catch(function(){e.disks.length=0})},loadNode:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(t,a){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=[],e.next=3,this.listDisks();case 3:if(r=e.sent,0!==t.level){e.next=7;break}return r.forEach(function(e){n.push({id:e,name:e,idLeaf:!1,children:[]})}),e.abrupt("return",a(n));case 7:fetch("/tl-web/api/disks/path?folderPath=".concat(t.data.id)).then(function(e){return e.json()}).then(function(e){a(e)}).catch(function(){a([])});case 8:case"end":return e.stop()}},e,this)}));function t(t,a){return e.apply(this,arguments)}return t}(),addNodes:function(){var e=this.$refs.folderlist.getCheckedNodes(),t=[];e.forEach(function(e){t.push({id:e.id,isLeaf:!!e.isLeaf,name:e.name})}),fetch("/tl-web/api/disks",{method:"POST",body:s()(t),headers:{"content-type":"application/json"}}),this.listDirs()}},created:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.listDirs();case 1:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},p=u,d=(a("a2c1"),a("2877")),f=Object(d["a"])(p,i,l,!1,null,null,null),b=f.exports,h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"relationlist"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{row:24}},[a("el-table",{attrs:{data:e.$store.state.relations,border:""}},[a("el-table-column",{attrs:{prop:"sequelence",width:"60",label:"排序"}}),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"146"}}),a("el-table-column",{attrs:{label:"性别",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return["M"===t.row.gender?a("span",[e._v("男")]):e._e(),"F"===t.row.gender?a("span",[e._v("女")]):e._e(),"MF"===t.row.gender?a("span",[e._v("未知")]):e._e()]}}])}),a("el-table-column",{attrs:{prop:"relation",label:"关系",width:"80"}}),a("el-table-column",{attrs:{label:"颜色",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"color-d",style:{background:t.row.color},on:{click:function(a){return e.editRelation(t.row,t.$index)}}})]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",plain:"",type:"primary"},on:{click:function(a){return e.editRelation(t,t.row,t.$index)}}},[e._v("详情")]),t.row.avatars?a("el-button",{attrs:{size:"mini",plain:"",type:"success"},on:{click:function(a){return e.faces(t.row,t.$index)}}},[e._v("识别\n            ")]):e._e(),a("el-button",{attrs:{size:"mini",plain:"",type:"danger"},on:{click:function(a){return e.delRelation(t.row)}}},[e._v("删除")])]}}])})],1)],1)],1),a("el-row",{staticClass:"r-edit"},[a("el-col",{attrs:{row:24}},[a("el-form",{ref:"relationform",attrs:{model:e.relation,rules:e.rules,"label-width":"80px","label-position":"right",id:"relationform"}},[a("el-form-item",{attrs:{label:"姓名",prop:"name"}},[a("el-input",{model:{value:e.relation.name,callback:function(t){e.$set(e.relation,"name",t)},expression:"relation.name"}})],1),a("el-form-item",{attrs:{label:"性别",prop:"gender"}},[a("el-select",{attrs:{placeholder:"选择性别"},model:{value:e.relation.gender,callback:function(t){e.$set(e.relation,"gender",t)},expression:"relation.gender"}},[a("el-option",{attrs:{label:"男",value:"M"}}),a("el-option",{attrs:{label:"女",value:"F"}}),a("el-option",{attrs:{label:"未知",value:"MF"}})],1)],1),a("el-form-item",{attrs:{label:"关系",prop:"relation"}},[a("el-select",{attrs:{placeholder:"选择关系"},model:{value:e.relation.relation,callback:function(t){e.$set(e.relation,"relation",t)},expression:"relation.relation"}},[a("el-option",{attrs:{label:"妻子",value:"妻子"}}),a("el-option",{attrs:{label:"女儿",value:"女儿"}}),a("el-option",{attrs:{label:"儿子",value:"儿子"}}),a("el-option",{attrs:{label:"父母",value:"父母"}}),a("el-option",{attrs:{label:"朋友",value:"朋友"}}),a("el-option",{attrs:{label:"我",value:"我"}})],1)],1),a("el-form-item",{attrs:{label:"排序",prop:"sequelence"}},[a("el-input",{model:{value:e.relation.sequelence,callback:function(t){e.$set(e.relation,"sequelence",e._n(t))},expression:"relation.sequelence"}})],1),a("el-form-item",{attrs:{label:"颜色",prop:"color"}},[a("el-input",{staticClass:"color-i",attrs:{placeholder:"输入颜色"},model:{value:e.relation.color,callback:function(t){e.$set(e.relation,"color",t)},expression:"relation.color"}},[a("template",{slot:"append"},[a("el-color-picker",{staticClass:"color-p",model:{value:e.relation.color,callback:function(t){e.$set(e.relation,"color",t)},expression:"relation.color"}})],1)],2)],1),e.relation.id?a("el-form-item",{attrs:{label:"照片"}},[a("el-upload",{ref:"upload",attrs:{action:"/tl/api/relations/avatars","list-type":"picture-card",disabled:!e.relation.id,accept:".jpg",limit:e.limit,data:e.avatarData,"file-list":e.fileList,"before-upload":e.beforeUpload,"on-preview":e.preview,"on-remove":e.removeAvatar,"on-success":e.uploadSuccess}},[a("i",{staticClass:"el-icon-plus"})]),a("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1):e._e(),a("el-form-item",[a("el-button",{attrs:{type:"warning",size:"small",plain:""},on:{click:function(t){e.relation={gender:"M"}}}},[e._v("取消")]),a("el-button",{attrs:{type:"success",size:"small",plain:""},on:{click:e.submitRelation}},[e._v("保存")])],1)],1)],1)],1)],1)},g=[],m=(a("28a5"),{name:"RelationList",data:function(){return{relations:[],relation:{name:"",gender:"M",relation:"",sequelence:10,color:"#cf9236"},relationIndex:0,rules:{name:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],relation:[{required:!0,message:"请选择关系",trigger:"blur"}],gender:[{required:!0,message:"请选择性别",trigger:"blur"}],sequelence:[{required:!0,message:"请输入排序整数",trigger:"blur"},{type:"integer",message:"必须输入整数",trigger:"blur"}],color:[{required:!0,message:"输入颜色",trigger:"blur"},{type:"string",pattern:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,message:"请输入正确的hex颜色值",trigger:"blur"}]},imageUrl:"",avatarData:{},dialogImageUrl:"",limit:20,fileList:[],dialogVisible:!1}},methods:{submitRelation:function(){var e=this,t=this;this.$refs.relationform.validate(function(a){if(a){var n=t.relation.id?"PUT":"POST",r="/tl-web/api/relations/",i=t.relation.id?"".concat(r).concat(t.relation.id):r;fetch(i,{method:n,body:s()(t.relation),headers:{"content-type":"application/json"}}).then(function(){e.getRelations()})}})},editRelation:function(e,t){this.relation=e,this.relationIndex=t||0,this.setFileList()},delRelation:function(e){var t=this;fetch("/tl-web/api/relations/".concat(e.id),{method:"DELETE",headers:{"content-type":"application/json"}}).then(function(){t.getRelations()})},getRelations:function(){var e=this;return fetch("/tl-web/api/relations/").then(function(e){return e.json()}).then(function(t){e.relations=t||[],e.$store.commit("setRelations",t)})},beforeUpload:function(e){var t="image/jpeg"===e.type,a=e.size/1024/1024<10;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),a||this.$message.error("上传头像图片大小不能超过 10MB!"),this.avatarData.relation=this.relation.id,t&&a},uploadSuccess:function(){var e=this;this.getRelations().then(function(){e.relation=e.$store.state.relations[e.relationIndex||0],e.editRelation(e.$store.state.relations[e.relationIndex||0],e.relationIndex||0)})},faces:function(e,t){this.relation=e,this.relationIndex=t||0,fetch("/tl-web/api/faces/",{method:"POST",body:s()(e),headers:{"content-type":"application/json"}})},removeAvatar:function(e){e.url&&fetch("/tl-web/api/relations/avatars",{method:"DELETE",body:s()({avatar:e.url.slice(e.url.indexOf("images")-1),id:this.relation.id}),headers:{"content-type":"application/json"}})},preview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},setFileList:function(){var e=this;this.fileList=[];var t=this.relation.avatars||"";t?t.split("|").map(function(t){t&&e.fileList.push({url:"".concat(t)})}):this.fileList=[]}},created:function(){this.$store.state.relations.length&&(this.relation=this.$store.state.relations[0],this.relationIndex=0,this.setFileList())}}),v=m,x=(a("8ae2"),Object(d["a"])(v,h,g,!1,null,null,null)),w=x.exports,y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"imagetags"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-form",{ref:"tagBox",attrs:{model:e.tagBox,"label-width":"80px","label-position":"right",id:"relationform"}},[a("el-form-item",{attrs:{label:"分类",prop:"tagclass"}},[a("el-select",{attrs:{placeholder:"选择分类"},model:{value:e.tagBox.tagclass,callback:function(t){e.$set(e.tagBox,"tagclass",t)},expression:"tagBox.tagclass"}},[a("el-option",{attrs:{label:"人物",value:"human"}}),a("el-option",{attrs:{label:"场景",value:"sceneries"}}),a("el-option",{attrs:{label:"情绪",value:"emotions"}}),a("el-option",{attrs:{label:"动物",value:"animals"}}),a("el-option",{attrs:{label:"植物",value:"plants"}}),a("el-option",{attrs:{label:"城市",value:"cities"}})],1)],1),a("el-form-item",{attrs:{label:"颜色",prop:"color"}},[a("el-input",{staticClass:"color-i",attrs:{placeholder:"输入颜色"},model:{value:e.tagBox.color,callback:function(t){e.$set(e.tagBox,"color",t)},expression:"tagBox.color"}},[a("template",{slot:"append"},[a("el-color-picker",{staticClass:"color-p",model:{value:e.tagBox.color,callback:function(t){e.$set(e.tagBox,"color",t)},expression:"tagBox.color"}})],1)],2)],1),a("el-form-item",{attrs:{label:"小类",prop:"tags"}},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入分类,以逗号分隔"},model:{value:e.tagBox.tags,callback:function(t){e.$set(e.tagBox,"tags",t)},expression:"tagBox.tags"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"warning",size:"small",plain:""},on:{click:function(t){e.relation={gender:"M"}}}},[e._v("取消")]),a("el-button",{attrs:{type:"success",size:"small",plain:""}},[e._v("保存")])],1)],1)],1),a("el-col")],1)],1)},k=[],L={name:"imagetags",data:function(){return{tagBox:{color:"#aeddcd"}}}},R=L,S=Object(d["a"])(R,y,k,!1,null,null,null),_=S.exports,$={components:{DirectoryList:b,Relationlist:w,ImageTags:_},data:function(){return{showTab:"relations"}}},E=$,T=(a("3e4b"),Object(d["a"])(E,n,r,!1,null,null,null));t["default"]=T.exports},"28a5":function(e,t,a){"use strict";var n=a("aae3"),r=a("cb7c"),i=a("ebd6"),l=a("0390"),o=a("9def"),s=a("5f1b"),c=a("520a"),u=a("79e5"),p=Math.min,d=[].push,f="split",b="length",h="lastIndex",g=4294967295,m=!u(function(){RegExp(g,"y")});a("214f")("split",2,function(e,t,a,u){var v;return v="c"=="abbc"[f](/(b)*/)[1]||4!="test"[f](/(?:)/,-1)[b]||2!="ab"[f](/(?:ab)*/)[b]||4!="."[f](/(.?)(.?)/)[b]||"."[f](/()()/)[b]>1||""[f](/.?/)[b]?function(e,t){var r=String(this);if(void 0===e&&0===t)return[];if(!n(e))return a.call(r,e,t);var i,l,o,s=[],u=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),p=0,f=void 0===t?g:t>>>0,m=new RegExp(e.source,u+"g");while(i=c.call(m,r)){if(l=m[h],l>p&&(s.push(r.slice(p,i.index)),i[b]>1&&i.index<r[b]&&d.apply(s,i.slice(1)),o=i[0][b],p=l,s[b]>=f))break;m[h]===i.index&&m[h]++}return p===r[b]?!o&&m.test("")||s.push(""):s.push(r.slice(p)),s[b]>f?s.slice(0,f):s}:"0"[f](void 0,0)[b]?function(e,t){return void 0===e&&0===t?[]:a.call(this,e,t)}:a,[function(a,n){var r=e(this),i=void 0==a?void 0:a[t];return void 0!==i?i.call(a,r,n):v.call(String(r),a,n)},function(e,t){var n=u(v,e,this,t,v!==a);if(n.done)return n.value;var c=r(e),d=String(this),f=i(c,RegExp),b=c.unicode,h=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(m?"y":"g"),x=new f(m?c:"^(?:"+c.source+")",h),w=void 0===t?g:t>>>0;if(0===w)return[];if(0===d.length)return null===s(x,d)?[d]:[];var y=0,k=0,L=[];while(k<d.length){x.lastIndex=m?k:0;var R,S=s(x,m?d:d.slice(k));if(null===S||(R=p(o(x.lastIndex+(m?0:k)),d.length))===y)k=l(d,k,b);else{if(L.push(d.slice(y,k)),L.length===w)return L;for(var _=1;_<=S.length-1;_++)if(L.push(S[_]),L.length===w)return L;k=y=R}}return L.push(d.slice(y)),L}]})},"3e4b":function(e,t,a){"use strict";var n=a("bbfb"),r=a.n(n);r.a},"520a":function(e,t,a){"use strict";var n=a("0bfb"),r=RegExp.prototype.exec,i=String.prototype.replace,l=r,o="lastIndex",s=function(){var e=/a/,t=/b*/g;return r.call(e,"a"),r.call(t,"a"),0!==e[o]||0!==t[o]}(),c=void 0!==/()??/.exec("")[1],u=s||c;u&&(l=function(e){var t,a,l,u,p=this;return c&&(a=new RegExp("^"+p.source+"$(?!\\s)",n.call(p))),s&&(t=p[o]),l=r.call(p,e),s&&l&&(p[o]=p.global?l.index+l[0].length:t),c&&l&&l.length>1&&i.call(l[0],a,function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(l[u]=void 0)}),l}),e.exports=l},"5f1b":function(e,t,a){"use strict";var n=a("23c6"),r=RegExp.prototype.exec;e.exports=function(e,t){var a=e.exec;if("function"===typeof a){var i=a.call(e,t);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(e))throw new TypeError("RegExp#exec called on incompatible receiver");return r.call(e,t)}},"8ae2":function(e,t,a){"use strict";var n=a("a4fb"),r=a.n(n);r.a},a2c1:function(e,t,a){"use strict";var n=a("e110"),r=a.n(n);r.a},a4fb:function(e,t,a){},aae3:function(e,t,a){var n=a("d3f4"),r=a("2d95"),i=a("2b4c")("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==r(e))}},ac6a:function(e,t,a){for(var n=a("cadf"),r=a("0d58"),i=a("2aba"),l=a("7726"),o=a("32e9"),s=a("84f2"),c=a("2b4c"),u=c("iterator"),p=c("toStringTag"),d=s.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},b=r(f),h=0;h<b.length;h++){var g,m=b[h],v=f[m],x=l[m],w=x&&x.prototype;if(w&&(w[u]||o(w,u,d),w[p]||o(w,p,m),s[m]=d,v))for(g in n)w[g]||i(w,g,n[g],!0)}},b0c5:function(e,t,a){"use strict";var n=a("520a");a("5ca1")({target:"RegExp",proto:!0,forced:n!==/./.exec},{exec:n})},bbfb:function(e,t,a){},e110:function(e,t,a){}}]);
//# sourceMappingURL=chunk-0afa699a.59c3226d.js.map