(function(t){function e(e){for(var s,o,n=e[0],r=e[1],c=e[2],d=0,p=[];d<n.length;d++)o=n[d],i[o]&&p.push(i[o][0]),i[o]=0;for(s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s]);u&&u(e);while(p.length)p.shift()();return l.push.apply(l,c||[]),a()}function a(){for(var t,e=0;e<l.length;e++){for(var a=l[e],s=!0,n=1;n<a.length;n++){var r=a[n];0!==i[r]&&(s=!1)}s&&(l.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},i={app:0},l=[];function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],r=n.push.bind(n);n.push=e,n=n.slice();for(var c=0;c<n.length;c++)e(n[c]);var u=r;l.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0cfb":function(t,e,a){},"207c":function(t,e,a){"use strict";var s=a("38bc"),i=a.n(s);i.a},3516:function(t,e,a){},3654:function(t,e,a){"use strict";var s=a("e9c7"),i=a.n(s);i.a},"38bc":function(t,e,a){},"3b20":function(t,e,a){},5125:function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);var s=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("home")],1)},l=[],o=(a("3b20"),a("74d7"),a("8a03")),n=a.n(o),r=a("7bb1"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"home"}},[a("navigation",{ref:"navigation",attrs:{setups:t.setups,activeSetup:t.activeSetup},on:{showSetup:t.showSetupHandler,editSetup:t.editSetupHandler,duplicateSetup:t.duplicateSetupHandler,deleteSetup:t.deleteSetupHandler,addSetup:t.addSetupHandler,about:t.aboutHandler}}),a("draggable",{attrs:{options:{handle:"div.drag"}},on:{start:function(e){t.drag=!0},end:function(e){t.drag=!1}},model:{value:t.activeTools,callback:function(e){t.activeTools=e},expression:"activeTools"}},t._l(t.activeTools,function(e,s){return a("tool",{key:s,attrs:{tool:e,toolNum:s+1},on:{deleteTool:function(e){t.deleteToolHandler(s)},editTool:function(e){t.editToolHandler(s)}}})})),a("b-modal",{ref:"calc",attrs:{active:t.showCalc,canCancel:[0,0,0],"has-modal-card":""},on:{"update:active":function(e){t.showCalc=e}}},[a("calc",{attrs:{material:t.activeMaterial,activeMaxSpeed:t.activeMaxSpeed,activeToolNum:t.activeToolIndex+1,activeTool:t.activeTool},on:{saveTool:t.saveToolHandler}})],1),a("b-modal",{attrs:{active:t.showSetup,canCancel:[0,0,0],"has-modal-card":""},on:{"update:active":function(e){t.showSetup=e}}},[a("setup",{attrs:{activeSetup:t.activeSetup,activeSetupIndex:t.activeSetupIndex},on:{saveSetup:t.saveSetupHandler}})],1),a("b-modal",{attrs:{active:t.showConfirm,canCancel:[0,0,0],"has-modal-card":""},on:{"update:active":function(e){t.showConfirm=e}}},[a("confirm",{attrs:{name:t.targetName,index:t.targetIndex},on:{confirm:t.confirmDeleteHandler}})],1),a("b-modal",{attrs:{active:t.showAbout,"has-modal-card":""},on:{"update:active":function(e){t.showAbout=e}}},[a("about")],1),a("div",{ref:"addTool",staticClass:"bottom hidden"},[t.activeSetup?a("a",{staticClass:"button circle is-rounded",on:{click:t.addToolHandler}},[t._v("Add Tool")]):t._e()])],1)},u=[],d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{on:{submit:function(e){return e.preventDefault(),t.validateBeforeSubmit(e)}}},[a("div",{staticClass:"modal-card"},[a("header",{staticClass:"modal-card-head"},[a("p",{staticClass:"modal-card-title"},[t._v("Tool "+t._s(t.activeToolNum))]),a("a",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:t.exitHandler}})]),a("section",{staticClass:"modal-card-body"},[a("b-field",{ref:"type",attrs:{label:"Type",type:{"is-danger":t.errors.has("type")},message:t.errors.first("type")}},[a("b-select",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0},expression:"{ required: true }"}],attrs:{name:"type",expanded:""},model:{value:t.tool.type,callback:function(e){t.$set(t.tool,"type",e)},expression:"tool.type"}},t._l(t.toolOptions,function(e){return a("option",{domProps:{value:e.value}},[t._v(t._s(e.text))])}))],1),"end_mill"===t.tool.type||"ball_end_mill"===t.tool.type?a("b-field",{attrs:{label:"Tool Material"}},[a("b-select",{attrs:{expanded:""},model:{value:t.tool.toolMat,callback:function(e){t.$set(t.tool,"toolMat",e)},expression:"tool.toolMat"}},t._l(t.toolMatOptions,function(e){return a("option",{domProps:{value:e.value}},[t._v(t._s(e.text))])}))],1):t._e(),a("b-field",{ref:"diameter",attrs:{label:"Diameter",type:{"is-danger":t.errors.has("diameter")},message:t.errors.first("diameter")}},[a("b-input",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0,min_value:0,max_value:10},expression:"{ required: true, min_value: 0, max_value: 10}"}],attrs:{name:"diameter",min:"0",step:"0.001",type:"number"},model:{value:t.tool.diameter,callback:function(e){t.$set(t.tool,"diameter",e)},expression:"tool.diameter"}})],1),a("b-field",{attrs:{label:"Number of Flutes",type:{"is-danger":t.errors.has("number of flutes")},message:t.errors.first("number of flutes")}},[a("b-input",{directives:[{name:"validate",rawName:"v-validate",value:{min_value:0,max_value:6},expression:"{ min_value: 0, max_value: 6}"}],attrs:{name:"number of flutes",step:"1",type:"number"},model:{value:t.tool.numFlutes,callback:function(e){t.$set(t.tool,"numFlutes",e)},expression:"tool.numFlutes"}})],1),a("b-field",{staticClass:"space-above"},[a("h6",{staticClass:"is-size-6 left-text has-text-weight-semibold"},[t._v("Automatic Calculation ")]),a("b-switch",{model:{value:t.autoCalc,callback:function(e){t.autoCalc=e},expression:"autoCalc"}})],1),a("hr"),"end_mill"===t.tool.type?a("b-field",{attrs:{label:"Max Stepover",type:{"is-danger":t.errors.has("max stepover")},message:t.errors.first("max stepover")}},[a("div",{staticClass:"control has-icons-right"},[a("b-input",{directives:[{name:"validate",rawName:"v-validate",value:{min_value:0,max_value:10},expression:"{ min_value: 0, max_value: 10 }"}],attrs:{name:"max stepover",step:"0.001",type:"number"},model:{value:t.tool.maxStepover,callback:function(e){t.$set(t.tool,"maxStepover",e)},expression:"tool.maxStepover"}}),a("span",{staticClass:"icon is-right"},[a("a",{on:{click:t.calculateMaxStepover}},[a("i",{staticClass:"fas fa-calculator clickable"})])])],1)]):t._e(),"end_mill"===t.tool.type?a("b-field",{attrs:{label:"Max Stepdown",type:{"is-danger":t.errors.has("max stepdown")},message:t.errors.first("max stepdown")}},[a("div",{staticClass:"control has-icons-right"},[a("b-input",{directives:[{name:"validate",rawName:"v-validate",value:{min_value:0,max_value:1},expression:"{ min_value: 0, max_value: 1 }"}],attrs:{name:"max stepdown",step:"0.001",type:"number"},model:{value:t.tool.maxStepdown,callback:function(e){t.$set(t.tool,"maxStepdown",e)},expression:"tool.maxStepdown"}}),a("span",{staticClass:"icon is-right"},[a("a",{on:{click:t.calculateMaxStepdown}},[a("i",{staticClass:"fas fa-calculator clickable"})])])],1)]):t._e(),a("b-field",{attrs:{label:"Chip Load",type:{"is-danger":t.errors.has("chip load")},message:t.errors.first("chip load")}},[a("div",{staticClass:"control has-icons-right"},[a("b-input",{directives:[{name:"validate",rawName:"v-validate",value:{min_value:0,max_value:1},expression:"{ min_value: 0, max_value: 1 }"}],attrs:{name:"chip load",step:"0.0001",type:"number"},model:{value:t.tool.chipLoad,callback:function(e){t.$set(t.tool,"chipLoad",e)},expression:"tool.chipLoad"}}),a("span",{staticClass:"icon is-right"},[a("a",{on:{click:t.calculateChipLoad}},[a("i",{staticClass:"fas fa-calculator clickable"})])])],1)]),a("b-field",{ref:"speed",attrs:{label:"Spindle Speed (rpm)",type:{"is-danger":t.errors.has("speed")},message:t.errors.first("speed")}},[a("div",{staticClass:"control has-icons-right"},[a("b-input",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0,min_value:0,max_value:t.maxSpeed},expression:"{ required: true, min_value: 0, max_value: maxSpeed}"}],attrs:{name:"speed",step:"1",type:"number"},model:{value:t.tool.speed,callback:function(e){t.$set(t.tool,"speed",e)},expression:"tool.speed"}}),a("span",{staticClass:"icon is-right"},[a("a",{on:{click:t.calculateSpeed}},[a("i",{staticClass:"fas fa-calculator clickable"})])])],1)]),a("b-field",{ref:"feed",attrs:{label:"Feed Rate (in/min)",type:{"is-danger":t.errors.has("feed")},message:t.errors.first("feed")}},[a("div",{staticClass:"control has-icons-right"},[a("b-input",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0,min_value:0,max_value:100},expression:"{ required: true, min_value: 0, max_value: 100}"}],attrs:{name:"feed",step:"1",type:"number"},model:{value:t.tool.feed,callback:function(e){t.$set(t.tool,"feed",e)},expression:"tool.feed"}}),a("span",{staticClass:"icon is-right"},[a("a",{on:{click:t.calculateFeed}},[a("i",{staticClass:"fas fa-calculator clickable"})])])],1)])],1),a("footer",{staticClass:"modal-card-foot"},[a("div",{staticClass:"buttons columns"},[a("a",{staticClass:"button column is-fullwidth",on:{click:t.init}},[t._m(0)]),a("button",{staticClass:"button column is-fullwidth is-flex submit",attrs:{type:"submit"}},[a("b-icon",{attrs:{pack:"fas",size:"is-small",icon:"check"}})],1)])])])])},p=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon is-small"},[a("i",{staticClass:"fas fa-eraser"})])}],m={sfm:{mill:{hss:{plastic:300,aluminum:600,brass:175,mild_steel:70,stainless_steel:80},carbide:{plastic:500,aluminum:800,brass:175,mild_steel:350,stainless_steel:300}},drill:{plastic:240,aluminum:300,brass:120,mild_steel:90,stainless_steel:50},countersink:{plastic:160,aluminum:200,brass:90,mild_steel:60,stainless_steel:35},reamer:{plastic:120,aluminum:150,brass:66,mild_steel:45,stainless_steel:25},tap:{plastic:100,aluminum:100,brass:100,mild_steel:35,stainless_steel:35},face_mill:{plastic:800,aluminum:1200,brass:800,mild_steel:600,stainless_steel:400}},chipLoad:{plastic:[.001,.003,.006,.008,.009],aluminum:[.002,.002,.005,.006,.007],brass:[.001,.002,.002,.004,.005],mild_steel:[5e-4,5e-4,.001,.002,.003],stainless_steel:[.005,.001,.002,.003,.004]}},h={props:["material","activeMaxSpeed","activeToolNum","activeTool"],data(){return{toolOptions:[{text:"End Mill",value:"end_mill"},{text:"Ball End Mill",value:"ball_end_mill"},{text:"Drill",value:"drill"},{text:"Center Drill",value:"center_drill"},{text:"Face Mill",value:"face_mill"},{text:"Countersink",value:"countersink"},{text:"Reamer",value:"reamer"},{text:"Tap",value:"tap"}],toolMatOptions:[{text:"HSS",value:"hss"},{text:"Carbide",value:"carbide"}],tool:{type:"",toolMat:"",diameter:"",numFlutes:"",maxStepover:"",maxStepdown:"",chipLoad:"",speed:"",feed:""},values:m,autoCalc:!0}},computed:{maxSpeed(){return this.activeMaxSpeed?this.activeMaxSpeed:1e5}},watch:{"tool.type":function(){this.autoCalc&&this.calculate()},"tool.toolMat":function(){this.autoCalc&&this.calculate()},"tool.diameter":function(){this.autoCalc&&this.calculate()},"tool.numFlutes":function(){this.autoCalc&&this.calculate()}},mounted(){Object.keys(this.activeTool).length?this.tool=Object.assign({},this.tool,this.activeTool):this.init()},methods:{calculate(){this.calculateChipLoad(),this.calculateSpeed(),this.calculateMaxStepover(),this.calculateMaxStepdown(),this.$nextTick(()=>{this.calculateFeed()})},calculateMaxStepover(){"end_mill"===this.tool.type&&this.tool.diameter&&(this.tool.maxStepover=this.tool.diameter/2)},calculateMaxStepdown(){"end_mill"===this.tool.type&&this.tool.diameter&&(this.tool.maxStepdown=this.tool.diameter/10)},calculateChipLoad(){if(this.tool.type&&this.tool.diameter){const t=this.tool.diameter;t<.125?this.$set(this.tool,"chipLoad",this.values.chipLoad[this.material][0]):t<.25?this.$set(this.tool,"chipLoad",this.values.chipLoad[this.material][1]):t<.5?this.$set(this.tool,"chipLoad",this.values.chipLoad[this.material][2]):t<1?this.$set(this.tool,"chipLoad",this.values.chipLoad[this.material][3]):this.$set(this.tool,"chipLoad",this.values.chipLoad[this.material][4])}},calculateSpeed(){if(this.tool.type&&this.tool.diameter){let t=0;switch(this.tool.type){case"end_mill":case"ball_end_mill":if(!this.tool.toolMat)return;t=this.values.sfm.mill[this.tool.toolMat][this.material];break;case"center_drill":t=this.values.sfm.drill[this.material];break;default:t=this.values.sfm[this.tool.type][this.material]}this.tool.speed=Math.round(12*t/(this.tool.diameter*Math.PI))}},calculateFeed(){this.tool.chipLoad&&this.tool.numFlutes&&this.tool.speed&&(this.tool.feed=Math.round(this.tool.chipLoad*this.tool.numFlutes*this.tool.speed))},exitHandler(){this.$parent.close()},validateBeforeSubmit(){this.$validator.validateAll().then(t=>{t&&(this.$emit("saveTool",this.tool),this.$parent.close())})},init(){this.tool.type="",this.tool.toolMat="",this.tool.diameter="",this.tool.numFlutes="",this.tool.chipLoad="",this.tool.speed="",this.tool.feed=""}}},v=h,f=(a("c7ff"),a("2877")),b=Object(f["a"])(v,d,p,!1,null,null,null);b.options.__file="CalcComponent.vue";var x=b.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{on:{submit:function(e){return e.preventDefault(),t.validateBeforeSubmit(e)}}},[a("div",{staticClass:"modal-card"},[a("header",{staticClass:"modal-card-head"},[a("p",{staticClass:"modal-card-title"},[a("b-field",{ref:"name",attrs:{type:{"is-danger":t.errors.has("name")}}},[a("b-input",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0,max:25},expression:"{ required: true, max: 25 }"}],staticClass:"title",attrs:{size:"is-large",name:"name"},on:{focus:t.focusHandler,blur:t.blurHandler},model:{value:t.setup.name,callback:function(e){t.$set(t.setup,"name",e)},expression:"setup.name"}})],1)],1),a("a",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:t.exitHandler}})]),a("section",{staticClass:"modal-card-body"},[a("b-field",{ref:"material",attrs:{label:"Material",type:{"is-danger":t.errors.has("material")}}},[a("b-select",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0},expression:"{ required: true }"}],attrs:{name:"material",expanded:""},model:{value:t.setup.material,callback:function(e){t.$set(t.setup,"material",e)},expression:"setup.material"}},t._l(t.matOptions,function(e){return a("option",{domProps:{value:e.value}},[t._v(t._s(e.text))])}))],1),a("b-field",{attrs:{label:"Max Spindle Speed",type:{"is-danger":t.errors.has("maxSpeed")}}},[a("b-input",{directives:[{name:"validate",rawName:"v-validate",value:{min_value:0},expression:"{ min_value: 0 }"}],attrs:{name:"maxSpeed",step:"1",type:"number"},model:{value:t.setup.maxSpeed,callback:function(e){t.$set(t.setup,"maxSpeed",e)},expression:"setup.maxSpeed"}})],1)],1),a("footer",{staticClass:"modal-card-foot"},[a("div",{staticClass:"buttons columns"},[a("a",{staticClass:"button column is-fullwidth",on:{click:t.init}},[t._m(0)]),a("button",{staticClass:"button column is-fullwidth is-flex submit",attrs:{type:"submit"}},[a("b-icon",{attrs:{pack:"fas",size:"is-small",icon:"check"}})],1)])])])])},g=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon is-small"},[a("i",{staticClass:"fas fa-eraser"})])}],S={props:["activeSetup","activeSetupIndex"],data(){return{matOptions:[{text:"Aluminum",value:"aluminum"},{text:"Plastic",value:"plastic"},{text:"Brass",value:"brass"},{text:"Mild Steel",value:"mild_steel"},{text:"Stainless Steel",value:"stainless_steel"}],setup:{name:"",material:"",maxSpeed:"",tools:[]}}},mounted(){Object.keys(this.activeSetup).length?this.setup=Object.assign({},this.setup,this.activeSetup):this.setup.name=`Job ${this.activeSetupIndex+1}`},methods:{focusHandler(t){t.target.classList.toggle("hidden-input")},blurHandler(t){t.target.classList.toggle("hidden-input")},exitHandler(){Object.keys(this.activeSetup).length?this.$parent.close():(this.activeSetup.name||(this.$refs.name.type="is-danger"),this.activeSetup.material||(this.$refs.material.type="is-danger"))},clearHandler(){this.setup.name="",this.setup.material="",this.setup.maxSpeed=""},validateBeforeSubmit(){this.$validator.validateAll().then(t=>{t&&(this.$emit("saveSetup",this.setup),this.$parent.close())})},init(){this.setup.name="",this.setup.material="",this.setup.maxSpeed=""}}},C=S,y=(a("947f"),Object(f["a"])(C,_,g,!1,null,null,null));y.options.__file="SetupComponent.vue";var w=y.exports,k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card"},[a("div",{staticClass:"card-content"},[t._m(0),a("div",{staticClass:"tool"},[a("h4",{staticClass:"title is-4"},[t._v(t._s(t.title))])]),a("div",{staticClass:"speed"},[a("h6",{staticClass:"subtitle is-6"},[t._v("Speed: "+t._s(t.tool.speed)+" rpm")])]),a("div",{staticClass:"feed"},[a("h6",{staticClass:"subtitle is-6"},[t._v("Feed: "+t._s(t.tool.feed)+" in/min")])]),a("div",{staticClass:"trash"},[a("a",{on:{click:t.deleteHandler}},[t._m(1)])]),a("div",{staticClass:"edit"},[a("a",{on:{click:t.editHandler}},[t._m(2)])])])])},$=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"drag"},[a("span",{staticClass:"icon has-text-grey-light"},[a("i",{staticClass:"fas fa-grip-vertical"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon has-text-grey-light"},[a("i",{staticClass:"fas fa-trash-alt clickable"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon has-text-grey-light"},[a("i",{staticClass:"fas fa-pencil-alt clickable"})])}],H={props:["toolNum","tool"],computed:{name(){return this.tool.type?this.tool.type.toLowerCase().split("_").map(t=>t[0].toUpperCase()+t.substr(1)).join(" "):""},title(){return`T${this.toolNum} | ${this.tool.diameter}" ${this.name}`}},methods:{editHandler(){this.$emit("editTool",this.toolNum)},deleteHandler(){this.$emit("deleteTool",this.toolNum)}}},T=H,M=(a("b6bb"),Object(f["a"])(T,k,$,!1,null,null,null));M.options.__file="ToolComponent.vue";var L=M.exports,O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar is-fixed-top",attrs:{role:"navigation","aria-label":"main navigation"}},[a("div",{staticClass:"navbar-brand"},[a("p",{staticClass:"navbar-item"},[t._v("PRLCNC")]),t.activeSetup.name?a("a",{staticClass:"navbar-item",on:{click:t.editHandler}},[t._v(t._s(t.activeSetup.name))]):t._e(),a("a",{ref:"burger",staticClass:"navbar-burger burger",attrs:{role:"button","aria-label":"menu","aria-expanded":"false","data-target":"setupList"},on:{click:t.burgerHandler}},[a("span",{attrs:{"aria-hidden":"true"}}),a("span",{attrs:{"aria-hidden":"true"}}),a("span",{attrs:{"aria-hidden":"true"}})])]),a("div",{ref:"menu",staticClass:"navbar-menu",attrs:{id:"setupList"}},[a("div",{staticClass:"navbar-start"}),a("div",{staticClass:"navbar-end"},[a("div",{staticClass:"navbar-item has-dropdown is-boxed is-hoverable"},[a("a",{staticClass:"navbar-link"},[t._v("Setups")]),a("div",{staticClass:"navbar-dropdown is-right"},[t._l(t.setups,function(e,s){return a("div",{staticClass:"navbar-item is-flex"},[a("a",{staticClass:"has-text-grey-darker setup",on:{click:function(e){t.showHandler(s)}}},[a("div",[t._v(t._s(e.name))])]),a("a",{staticClass:"is-pulled-right icon-margin",on:{click:function(e){t.duplicateHandler(s)}}},[t._m(0,!0)]),a("a",{staticClass:"is-pulled-right",on:{click:function(e){t.deleteHandler(s)}}},[t._m(1,!0)])])}),a("hr",{staticClass:"navbar-divider"}),a("a",{staticClass:"navbar-item has-text-grey-darker",on:{click:t.addHandler}},[t._v("Add Setup")])],2)]),a("a",{staticClass:"navbar-item",on:{click:t.aboutHandler}},[t._v("About")])])])])},N=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon has-text-grey-light"},[a("i",{staticClass:"fas fa-copy clickable"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon has-text-grey-light"},[a("i",{staticClass:"fas fa-trash-alt clickable"})])}],I={props:["setups","activeSetup"],methods:{burgerHandler(){this.$refs.burger.classList.toggle("is-active"),this.$refs.menu.classList.toggle("is-active")},showHandler(t){this.$emit("showSetup",t)},editHandler(){this.$emit("editSetup")},addHandler(){this.$emit("addSetup")},duplicateHandler(t){this.$emit("duplicateSetup",t)},deleteHandler(t){this.$emit("deleteSetup",t)},aboutHandler(){this.$emit("about"),this.burgerHandler()}}},j=I,E=(a("207c"),Object(f["a"])(j,O,N,!1,null,null,null));E.options.__file="NavComponent.vue";var A=E.exports,F=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-card"},[a("header",{staticClass:"modal-card-head has-text-centered"},[a("p",{staticClass:"modal-card-title"},[t._v("Confirm")]),a("a",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:t.exitHandler}})]),a("section",{staticClass:"modal-card-body has-text-centered"},[a("p",[t._v("Delete "+t._s(t.name)+"?")])]),a("footer",{staticClass:"modal-card-foot"},[a("div",{staticClass:"buttons columns"},[a("button",{staticClass:"button column is-fullwidth",on:{click:t.exitHandler}},[a("b-icon",{attrs:{pack:"fas",size:"is-small",icon:"times"}})],1),a("button",{staticClass:"button column is-fullwidth",on:{click:t.confirmHandler}},[a("b-icon",{attrs:{pack:"fas",size:"is-small",icon:"check"}})],1)])])])},q=[],P={props:["name","index"],methods:{confirmHandler(){this.$emit("confirm",this.index),this.$parent.close()},exitHandler(){this.$parent.close()}}},B=P,D=(a("79fd"),Object(f["a"])(B,F,q,!1,null,null,null));D.options.__file="ConfirmComponent.vue";var J=D.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-card"},[a("header",{staticClass:"modal-card-head has-text-centered"},[a("p",{staticClass:"modal-card-title"},[t._v("   About")]),a("a",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:t.exitHandler}})]),t._m(0)])},R=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"modal-card-body"},[a("p",[t._v("PRLCNC is intended to help in two areas  of CNC work. The calculator gives rough estimates of parameters to be set up in the CAM. The tool list provides a handy reference when the setup needs to be checked off.")]),a("br"),a("p",{staticClass:"has-text-centered"},[t._v("Created by "),a("a",{attrs:{href:"http://winstonliao.com",target:"_blank"}},[t._v("Winston Liao")])]),a("p",{staticClass:"has-text-centered"},[t._v("Built with "),a("a",{attrs:{href:"https://vuejs.org/",target:"_blank"}},[t._v("Vue.js")]),a("span",[t._v(" and ")]),a("a",{attrs:{href:"https://buefy.github.io/",target:"_blank"}},[t._v("Buefy")])]),a("p",{staticClass:"has-text-centered"},[a("a",{attrs:{href:"data.xlsx",target:"_blank"}},[t._v("Source Data")])])])}],U={methods:{exitHandler(){this.$parent.close()}}},V=U,W=(a("668e"),Object(f["a"])(V,z,R,!1,null,null,null));W.options.__file="AboutComponent.vue";var G=W.exports,K=a("1516"),Q=a.n(K),X={components:{calc:x,setup:w,tool:L,draggable:Q.a,navigation:A,confirm:J,about:G},data(){return{showCalc:!1,showSetup:!1,showConfirm:!1,showAbout:!1,setups:[],activeSetupIndex:0,activeToolIndex:0,targetIndex:0,targetName:""}},computed:{activeSetup(){return this.setups.length&&this.activeSetupIndex<this.setups.length?this.setups[this.activeSetupIndex]:{}},activeMaterial(){return Object.keys(this.activeSetup).length?this.activeSetup.material:""},activeMaxSpeed(){return Object.keys(this.activeSetup).length?this.activeSetup.maxSpeed:""},activeTools:{get(){return Object.keys(this.activeSetup).length?this.activeSetup.tools:[]},set(t){this.activeSetup.tools=t}},activeTool(){return Object.keys(this.activeTools).length&&this.activeToolIndex<this.totalNumTools?this.activeTools[this.activeToolIndex]:{}},totalNumTools(){return Object.keys(this.activeSetup).length?this.activeTools.length:0}},watch:{activeSetup(){Object.keys(this.activeSetup).length?this.$refs.addTool.classList.remove("hidden"):this.$refs.addTool.classList.add("hidden")}},mounted(){"undefined"!==typeof Storage&&(window.localStorage.getItem("setups")?this.setups=JSON.parse(window.localStorage.getItem("setups")):window.localStorage.setItem("setups",JSON.stringify([]))),this.init()},methods:{addToolHandler(){this.activeToolIndex=this.totalNumTools,this.showCalc=!0},editToolHandler(t){this.activeToolIndex=t,this.showCalc=!0},saveToolHandler(t){this.$set(this.setups[this.activeSetupIndex].tools,this.activeToolIndex,t),this.updateLocalStorage()},deleteToolHandler(t){this.setups[this.activeSetupIndex].tools.splice(t,1),this.updateLocalStorage()},showSetupHandler(t){this.activeSetupIndex=t,this.$refs.navigation.burgerHandler()},editSetupHandler(){this.showSetup=!0},duplicateSetupHandler(t){this.setups.splice(t+1,0,JSON.parse(JSON.stringify(this.setups[t]))),this.activeSetupIndex=t+1,this.updateLocalStorage()},deleteSetupHandler(t){this.targetIndex=t,this.targetName=this.setups[t].name,this.showConfirm=!0},confirmDeleteHandler(t){this.setups.splice(t,1),t===this.activeSetupIndex&&(this.activeSetupIndex=0),this.updateLocalStorage()},addSetupHandler(){this.activeSetupIndex=this.setups.length,this.showSetup=!0},saveSetupHandler(t){this.activeSetupIndex<=this.setups.length?this.$set(this.setups,this.activeSetupIndex,t):this.$set(this.setups,this.activeSetupIndex+1,t),this.updateLocalStorage()},aboutHandler(){this.showAbout=!0},updateLocalStorage(){window.localStorage.setItem("setups",JSON.stringify(this.setups))},init(){this.showCalc=!1,this.setups.length||(this.activeSetupIndex=0,this.showSetup=!0)}}},Y=X,Z=(a("3654"),Object(f["a"])(Y,c,u,!1,null,null,null));Z.options.__file="Home.vue";var tt=Z.exports;s["default"].use(n.a),s["default"].use(r["a"]);var et={name:"app",components:{home:tt}},at=et,st=(a("cf25"),Object(f["a"])(at,i,l,!1,null,null,null));st.options.__file="App.vue";var it=st.exports,lt=a("9483");Object(lt["a"])("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached(){console.log("Content has been cached for offline use.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}}),s["default"].config.productionTip=!1,new s["default"]({render(t){return t(it)}}).$mount("#app")},"668e":function(t,e,a){"use strict";var s=a("c200"),i=a.n(s);i.a},"74d7":function(t,e,a){},"79fd":function(t,e,a){"use strict";var s=a("5125"),i=a.n(s);i.a},"947f":function(t,e,a){"use strict";var s=a("3516"),i=a.n(s);i.a},adb5:function(t,e,a){},b6bb:function(t,e,a){"use strict";var s=a("adb5"),i=a.n(s);i.a},bbbd:function(t,e,a){},c200:function(t,e,a){},c7ff:function(t,e,a){"use strict";var s=a("bbbd"),i=a.n(s);i.a},cf25:function(t,e,a){"use strict";var s=a("0cfb"),i=a.n(s);i.a},e9c7:function(t,e,a){}});
//# sourceMappingURL=app.b90c8931.js.map