(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2acfc9d8"],{"07bd":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"project"}},[s("Header",[s("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{name:"projects"}}},[t._v("项目")]),s("el-breadcrumb-item",{attrs:{to:{name:"project",params:{id:t.project.id}}}},[t._v(t._s(t.project.name))]),s("el-breadcrumb-item",[t._v("模块")])],1)],1),s("div",{staticClass:"progress-wrapper"},[s("draggable",{attrs:{group:"progresses"},on:{change:t.change},model:{value:t.project.progresses,callback:function(e){t.$set(t.project,"progresses",e)},expression:"project.progresses"}},t._l(t.project.progresses,function(e){return s("el-card",{key:e.id,staticClass:"progress-lists progress-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("div",{staticClass:"p-name"},[t._v(t._s(e.name))]),s("div",{staticClass:"p-menu"},[s("i",{staticClass:"el-icon-plus",on:{click:function(s){return t.newTask(e)}}}),s("el-dropdown",[s("span",{staticClass:"el-dropdown-link"},[s("i",{staticClass:"el-icon-more",staticStyle:{color:"#67C23A"}})]),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{staticStyle:{color:"#E6A23C"},nativeOn:{click:function(s){return t.editProgress(e)}}},[t._v("编辑")]),s("el-dropdown-item",{staticStyle:{color:"#F56C6C"},nativeOn:{click:function(s){return t.deleteProgress(e)}}},[t._v("删除")])],1)],1)],1)]),s("draggable",{staticClass:"task-lists-zone",attrs:{group:"tasks"},on:{change:function(s){return t.changeTask(e.id,e.tasks)}},model:{value:e.tasks,callback:function(s){t.$set(e,"tasks",s)},expression:"progress.tasks"}},t._l(e.tasks,function(r){return s("div",{key:"task-"+r.id,staticClass:"task-lists"},[s("div",{staticClass:"task-lists-title"},[s("div",{staticClass:"title-left"},[t._v("\n                "+t._s(r.title)+" "+t._s(r.id)+"\n              ")]),s("div",{staticClass:"title-right"},[s("el-dropdown",[s("span",{staticClass:"el-dropdown-link"},[s("i",{staticClass:"el-icon-more"})]),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{nativeOn:{click:function(s){return t.editTask(e,r)}}},[t._v("编辑")]),s("el-dropdown-item",{nativeOn:{click:function(e){return t.deleteTask(r)}}},[t._v("删除")])],1)],1)],1)]),s("div",{staticClass:"task-lists-des"},[t._v("\n              "+t._s(r.description)+"\n            ")])])}),0)],1)}),1),s("el-card",{staticClass:"progress-lists progress-add",nativeOn:{click:function(e){return t.newProgress(e)}}},[s("div",{staticClass:"p-add"},[s("i",{staticClass:"el-icon-plus"}),t._v("新增模块")])])],1),s("el-dialog",{attrs:{title:"项目过程编辑",visible:t.progressShow,width:"50%"},on:{"update:visible":function(e){t.progressShow=e}}},[s("el-form",{ref:"progressForm",attrs:{model:t.progress,rules:t.progressRules,"label-width":"80px","label-position":"right"}},[s("el-form-item",{attrs:{label:"过程",prop:"name"}},[s("el-input",{model:{value:t.progress.name,callback:function(e){t.$set(t.progress,"name",e)},expression:"progress.name"}})],1),s("el-form-item",{attrs:{label:"说明"}},[s("el-input",{attrs:{type:"textarea",rows:3},model:{value:t.progress.description,callback:function(e){t.$set(t.progress,"description",e)},expression:"progress.description"}})],1),s("el-form-item",{attrs:{label:"颜色",prop:"color"}},[s("el-input",{staticClass:"color-i",attrs:{placeholder:"输入颜色"},model:{value:t.progress.color,callback:function(e){t.$set(t.progress,"color",e)},expression:"progress.color"}},[s("template",{slot:"append"},[s("el-color-picker",{staticClass:"color-p",model:{value:t.progress.color,callback:function(e){t.$set(t.progress,"color",e)},expression:"progress.color"}})],1)],2)],1)],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{plain:"",size:"small"},on:{click:function(e){t.progressShow=!1}}},[t._v("取 消")]),s("el-button",{attrs:{type:"success",plain:"",size:"small"},on:{click:t.saveProgress}},[t._v("确 定")])],1)],1),s("el-dialog",{attrs:{title:t.task.progressName+"|"+(t.task.title||"任务编辑"),visible:t.taskShow,width:"50%"},on:{"update:visible":function(e){t.taskShow=e}}},[s("el-form",{ref:"taskForm",attrs:{model:t.task,rules:t.taskRules,"label-width":"80px","label-position":"right"}},[s("el-form-item",{attrs:{label:"主题",prop:"title"}},[s("el-input",{model:{value:t.task.title,callback:function(e){t.$set(t.task,"title",e)},expression:"task.title"}})],1),s("el-form-item",{attrs:{label:"说明"}},[s("el-input",{attrs:{type:"textarea",rows:3},model:{value:t.task.description,callback:function(e){t.$set(t.task,"description",e)},expression:"task.description"}})],1),s("el-form-item",{attrs:{label:"颜色",prop:"color"}},[s("el-input",{staticClass:"color-i",attrs:{placeholder:"输入颜色"},model:{value:t.task.color,callback:function(e){t.$set(t.task,"color",e)},expression:"task.color"}},[s("template",{slot:"append"},[s("el-color-picker",{staticClass:"color-p",model:{value:t.task.color,callback:function(e){t.$set(t.task,"color",e)},expression:"task.color"}})],1)],2)],1)],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{plain:"",size:"small"},on:{click:function(e){t.taskShow=!1}}},[t._v("取 消")]),s("el-button",{attrs:{type:"success",plain:"",size:"small"},on:{click:t.saveTask}},[t._v("确 定")])],1)],1)],1)},o=[],a=s("5d73"),n=s.n(a),c=(s("7f7f"),s("f499")),i=s.n(c),l=(s("96cf"),s("3b8d")),p=s("0418"),d=s("1980"),u=s.n(d),g={name:"Project",components:{Header:p["a"],draggable:u.a},data:function(){return{baseUrl:"/tasks/api/projects",projectId:"",project:{color:"#67C23A"},task:{title:"",description:"",color:"#67C23A",sequence:"",projectId:""},progress:{color:"#67C23A"},progressShow:!1,progressRules:{name:[{required:!0,message:"请输入项目过程名称",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],color:[{required:!0,message:"输入颜色",trigger:"blur"},{type:"string",pattern:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,message:"请输入正确的hex颜色值",trigger:"blur"}]},taskShow:!1,taskRules:{title:[{required:!0,message:"请输入任务主题",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],color:[{required:!0,message:"输入颜色",trigger:"blur"},{type:"string",pattern:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,message:"请输入正确的hex颜色值",trigger:"blur"}]}}},methods:{getProject:function(){var t=Object(l["a"])(regeneratorRuntime.mark(function t(){var e,s=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e="".concat(this.baseUrl,"/").concat(this.projectId),fetch(e).then(function(){var t=Object(l["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e.ok){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.json();case 4:s.project=t.sent;case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),changeProgress:function(){var t=this.project.progresses;if(t&&t.length)for(var e in t){var s=t[e];fetch("".concat(this.baseUrl,"/").concat(this.projectId,"/progress/").concat(s.id,"/moved"),{method:"POST",body:i()({progressId:s.id,sequence:e}),headers:{"content-type":"application/json"}})}},change:function(t){var e="".concat(this.baseUrl,"/").concat(this.projectId,"/progress");if(t.moved)for(var s=t.moved,r=s.oldIndex,o=s.newIndex,a=r>o?r:o,n=r>o?o:r,c=n;c<=a;c++){var l=this.project.progresses[c];fetch("".concat(e,"/").concat(l.id),{method:"PUT",body:i()({sequence:c}),headers:{"content-type":"application/json"}}),this.project.progresses[c].sequence=c}},editProgress:function(t){this.progress=t,this.progressShow=!0},deleteProgress:function(t){var e=this,s="".concat(this.baseUrl,"/").concat(this.project.id,"/progress/").concat(t.id);fetch(s,{method:"DELETE",headers:{"content-type":"application/json"}}).then(function(t){t.ok&&e.getProject(),e.progressShow=!1})},newProgress:function(){this.progress={color:"#67C23A"},this.progressShow=!0},saveProgress:function(){var t=this;this.$refs.progressForm.validate(function(e){if(e){var s="POST",r="".concat(t.baseUrl,"/").concat(t.project.id,"/progress/");t.progress.id&&(r="".concat(r).concat(t.progress.id),s="PUT"),fetch(r,{method:s,body:i()(t.progress),headers:{"content-type":"application/json"}}).then(function(e){e.ok&&t.getProject(),t.progressShow=!1})}})},newTask:function(t){this.task={progressId:t.id,progressName:t.name,color:"#cf9236",title:"",description:""},this.taskShow=!0},editTask:function(t,e){e.progressName=t.name,this.task=e,this.taskShow=!0},deleteTask:function(t){var e=this,s="".concat(this.baseUrl,"/").concat(this.project.id,"/progress/").concat(t.progressId,"/tasks/").concat(t.id);fetch(s,{method:"DELETE"}).then(function(t){t.ok&&e.getProject()})},saveTask:function(){var t=this;this.$refs.taskForm.validate(function(e){if(e){var s="POST",r="".concat(t.baseUrl,"/").concat(t.project.id,"/progress/").concat(t.task.progressId,"/tasks/");t.task.id&&(r="".concat(r).concat(t.task.id),s="PUT"),fetch(r,{method:s,body:i()(t.task),headers:{"content-type":"application/json"}}).then(function(e){e.ok&&t.getProject(),t.taskShow=!1})}})},changeTask:function(t,e){for(var s in e){var r=e[s];fetch("".concat(this.baseUrl,"/").concat(this.projectId,"/progress/").concat(t,"/tasks/").concat(r.id,"/moved"),{method:"POST",body:i()({progressId:t,sequence:s}),headers:{"content-type":"application/json"}})}},moveTask:function(t){var e=t.oldIndex,s=t.newIndex,r=e>s?e:s,o=e>s?s:e,a=t.element,c=[],l=!0,p=!1,d=void 0;try{for(var u,g=n()(this.project.progresses);!(l=(u=g.next()).done);l=!0){var f=u.value;if(f.id===a.progressId){c=f.tasks;break}}}catch(k){p=!0,d=k}finally{try{l||null==g.return||g.return()}finally{if(p)throw d}}if(c.length)for(var h=o;h<=r;h++){var m=c[h];fetch("".concat(this.baseUrl,"/").concat(this.projectId,"/progress/").concat(a.progressId,"/tasks/").concat(m.id,"/moved"),{method:"POST",body:i()({sequence:h}),headers:{"content-type":"application/json"}})}}},created:function(){var t=Object(l["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.projectId=this.$route.params.id,t.next=3,this.getProject();case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},f=g,h=(s("10cd"),s("2877")),m=Object(h["a"])(f,r,o,!1,null,null,null);e["default"]=m.exports},"10cd":function(t,e,s){"use strict";var r=s("2cd3"),o=s.n(r);o.a},"2cd3":function(t,e,s){},"469f":function(t,e,s){s("6c1c"),s("1654"),t.exports=s("7d7b")},"5d73":function(t,e,s){t.exports=s("469f")},"7d7b":function(t,e,s){var r=s("e4ae"),o=s("7cd6");t.exports=s("584a").getIterator=function(t){var e=o(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return r(e.call(t))}},"7f7f":function(t,e,s){var r=s("86cc").f,o=Function.prototype,a=/^\s*function ([^ (]*)/,n="name";n in o||s("9e1e")&&r(o,n,{configurable:!0,get:function(){try{return(""+this).match(a)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=chunk-2acfc9d8.93965767.js.map