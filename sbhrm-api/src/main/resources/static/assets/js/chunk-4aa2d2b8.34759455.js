(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4aa2d2b8"],{"0aaf":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" All Statistics Brief ")])},r=[],i={name:"StaAll"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"55004ed5",null);t["default"]=o.exports},1937:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" Payroll Query ")])},r=[],i={name:"SalSearch"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"375dc52c",null);t["default"]=o.exports},"1a97":function(e,t,n){},"1fe7":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" System Config ")])},r=[],i={name:"SysCfg"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"3fcb6cf7",null);t["default"]=o.exports},"2bc5":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" Payroll Account Sets ")])},r=[],i={name:"SalSob"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"affad77c",null);t["default"]=o.exports},"2e62":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" Personnel Transfer ")])},r=[],i={name:"HrTrans"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"2ed45800",null);t["default"]=o.exports},"418a":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" Authorization ")])},r=[],i={name:"SysHr"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"001a84f6",null);t["default"]=o.exports},"4b24":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{attrs:{data:e.hrs,"empty-text":e.tableEmptyText}},[n("el-table-column",{attrs:{width:"100"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("img",{staticClass:"avatar-img",attrs:{src:e.row.avatar,alt:e.row.name}})]}}])}),n("el-table-column",{attrs:{prop:"name",label:"Name",width:"120"}}),n("el-table-column",{attrs:{prop:"phone",label:"Phone",width:"140"}}),n("el-table-column",{attrs:{prop:"address",label:"Address"}})],1)],1)},r=[],i={name:"HrList",data:function(){return{hrs:[],tableEmptyText:"No Data"}},mounted:function(){this.initAllHrs()},methods:{initAllHrs:function(){var e=this;this.tableEmptyText="Fetching Data...",this.axios.get("/admin/hr").then((function(t){t&&(e.hrs=t),e.tableEmptyText="No Data"}))}}},l=i,s=(n("da7e"),n("2877")),o=Object(s["a"])(l,a,r,!1,null,"1c3943a2",null);t["default"]=o.exports},"601c":function(e,t,n){"use strict";n("1a97")},6988:function(e,t,n){},"6ac9":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" Staff Payroll Management ")])},r=[],i={name:"SalSobCfg"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"13305263",null);t["default"]=o.exports},"79d7":function(e,t,n){var a={"./views/Home.vue":"bb51","./views/Login.vue":"a55b","./views/UserInfo.vue":"ee96","./views/hr/HrList.vue":"4b24","./views/hr/HrMng.vue":"f01e","./views/hr/HrSalary.vue":"99a3","./views/hr/HrTrans.vue":"2e62","./views/sal/SalSearch.vue":"1937","./views/sal/SalSob.vue":"2bc5","./views/sal/SalSobCfg.vue":"6ac9","./views/sta/StaAll.vue":"0aaf","./views/sta/StaPers.vue":"b419","./views/sta/StaRecord.vue":"a49a","./views/sta/StaScore.vue":"c1d3","./views/sys/SysBasic.vue":"8d67","./views/sys/SysCfg.vue":"1fe7","./views/sys/SysData.vue":"d1e3","./views/sys/SysHr.vue":"418a","./views/sys/SysInit.vue":"8608","./views/sys/SysLog.vue":"864e"};function r(e){var t=i(e);return n(t)}function i(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=i,e.exports=r,r.id="79d7"},8608:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" DB Initialization ")])},r=[],i={name:"SysInit"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"527e2c7c",null);t["default"]=o.exports},"864e":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" Log ")])},r=[],i={name:"SysLog"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"55c32606",null);t["default"]=o.exports},"8d67":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" Basic Setting ")])},r=[],i={name:"SysBasic"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"9ee0be68",null);t["default"]=o.exports},"99a3":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" Salary Adjustment ")])},r=[],i={name:"HrSalary"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"9e644774",null);t["default"]=o.exports},a49a:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" HR Records Statistics ")])},r=[],i={name:"StaRecord"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"4d25f2dc",null);t["default"]=o.exports},b419:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" HR Info Statistics ")])},r=[],i={name:"StaPers"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"956fc134",null);t["default"]=o.exports},c1d3:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" HR Points Statistics ")])},r=[],i={name:"StaScore"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"c9be57f6",null);t["default"]=o.exports},d1e3:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" DB Backup&Recovery ")])},r=[],i={name:"SysData"},l=i,s=n("2877"),o=Object(s["a"])(l,a,r,!1,null,"c0ce996a",null);t["default"]=o.exports},da7e:function(e,t,n){"use strict";n("6988")},f01e:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{attrs:{data:e.hrs,"empty-text":e.tableEmptyText}},[n("el-table-column",{attrs:{width:"100"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("img",{staticClass:"avatar-img",attrs:{src:e.row.avatar,alt:e.row.name}})]}}])}),n("el-table-column",{attrs:{prop:"name",label:"Name",width:"120"}}),n("el-table-column",{attrs:{prop:"phone",label:"Phone",width:"140"}}),n("el-table-column",{attrs:{prop:"address",label:"Address"}}),n("el-table-column",{attrs:{label:"Operation"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){e.loadHrInfoForm(t.row),e.updateInfoDialogVisible=!0}}},[e._v("Update info")]),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDelete(t.row)}}},[e._v("Delete")])]}}])})],1),n("el-dialog",{attrs:{title:"Update user info",visible:e.updateInfoDialogVisible,width:"30%"},on:{"update:visible":function(t){e.updateInfoDialogVisible=t}}},[e.infoForm?n("el-form",{ref:"infoForm",attrs:{model:e.infoForm,"status-icon":"","label-position":"right","label-width":"5rem"}},[n("el-form-item",{attrs:{label:"Name"}},[n("el-input",{model:{value:e.infoForm.name,callback:function(t){e.$set(e.infoForm,"name",t)},expression:"infoForm.name"}})],1),n("el-form-item",{attrs:{label:"Phone"}},[n("el-input",{attrs:{type:"tel"},model:{value:e.infoForm.phone,callback:function(t){e.$set(e.infoForm,"phone",t)},expression:"infoForm.phone"}})],1),n("el-form-item",{attrs:{label:"Phone2"}},[n("el-input",{attrs:{type:"tel"},model:{value:e.infoForm.telephone,callback:function(t){e.$set(e.infoForm,"telephone",t)},expression:"infoForm.telephone"}})],1),n("el-form-item",{attrs:{label:"Address"}},[n("el-input",{attrs:{type:"textarea"},model:{value:e.infoForm.address,callback:function(t){e.$set(e.infoForm,"address",t)},expression:"infoForm.address"}})],1),n("el-form-item",{attrs:{label:"Avatar url"}},[n("el-input",{attrs:{type:"url"},model:{value:e.infoForm.avatar,callback:function(t){e.$set(e.infoForm,"avatar",t)},expression:"infoForm.avatar"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.updateHrInfo}},[e._v("Update Info")]),n("el-button",{on:{click:e.reloadHrInfoForm}},[e._v("Reload")])],1)],1):e._e()],1)],1)},r=[],i=(n("b0c0"),{name:"HrMng",data:function(){return{hrs:[],tableEmptyText:"No Data",infoForm:{originalHr:null},updateInfoDialogVisible:!1}},mounted:function(){this.initAllHrs()},methods:{initAllHrs:function(){var e=this;this.tableEmptyText="Fetching Data...",this.axios.get("/admin/hr").then((function(t){t&&(e.hrs=t),e.tableEmptyText="No Data"}))},handleDelete:function(e){var t=this;this.$confirm("Deleting **"+e.name+"** permanently","Warning",{confirmButtonText:"Delete",cancelButtonText:"Cancel",type:"warning"}).then((function(){t.axios.delete("/admin/hr/"+e.id).then((function(e){e&&t.initAllHrs()}))})).catch((function(){t.$message({type:"info",message:"Deleting cancelled"})}))},loadHrInfoForm:function(e){e!==this.infoForm.originalHr&&(this.infoForm=Object.assign({},e),this.infoForm.originalHr=e)},reloadHrInfoForm:function(){Object.assign(this.infoForm,this.infoForm.originalHr),console.log(this.infoForm)},updateHrInfo:function(){var e=this;this.axios.put("/admin/hr/".concat(this.infoForm.id),this.infoForm).then((function(t){t&&(e.updateInfoDialogVisible=!1,e.initAllHrs())}))}}}),l=i,s=(n("601c"),n("2877")),o=Object(s["a"])(l,a,r,!1,null,"1884db88",null);t["default"]=o.exports}}]);
//# sourceMappingURL=chunk-4aa2d2b8.34759455.js.map