import{V as S,c as w,_ as x,a as F,b as E}from"./vue-draggable-next.esm-bundler.84fb2661.js";/* empty css                *//* empty css              *//* empty css              */import{i as L,r as C,j as V,f as $,g as _,a as t,w as o,k as B,o as l,b as N,F as T,l as v,c,t as O,T as U,d as h,S as q,m as M,n as j,p as A,q as G,s as I,u as K}from"./entry.4bcf074a.js";/* empty css               */const z=L({components:{draggable:S},setup(){const n=w(),a=C(null),s=C([]),m=!1,p=[{tableName:"bangTest",value:[{fieldDescription:"S\u1ED1 th\u1EE9 t\u1EF1",fieldName:"SoTT",fieldType:"Number",fieldLength:5},{fieldDescription:"Ti\xEAu \u0111\u1EC1",fieldName:"TieuDe",fieldType:"String",fieldLength:100},{fieldDescription:"Ng\xE0y t\u1EA1o",fieldName:"NgayTao",fieldType:"DateTime"},{fieldDescription:"L\xE0 admin",fieldName:"LaAdmin",fieldType:"Bool"},{fieldDescription:"Nh\xF3m",fieldName:"Nhom",fieldType:"Number"}]}],r=(d,f)=>{if(d){const i=p.find(g=>g.tableName===d);i&&(n.setComponent(i.value),s.value=i.value)}else n.setComponent([]),s.value=[]},u=V(()=>n.$state.componentData);return{listModule:p,selectedTable:a,handleChange:r,componentStores:n,listField:u,dragOption:s,onEnd:()=>{n.setComponent(s.value)},drag:m}}});function H(n,a){const s=q,m=M,p=j,r=x,u=F,y=A("draggable"),d=G,f=I,i=K,g=E,D=B;return l(),_("div",null,[t(D,null,{default:o(()=>[t(f,{span:12},{default:o(()=>[N(" Thi\u1EBFt l\u1EADp form "),t(d,{"label-col":{span:8},"wrapper-col":{span:16}},{default:o(()=>[t(p,{label:"Ch\u1ECDn b\u1EA3ng",name:"selectedTable"},{default:o(()=>[t(m,{ref:"select",value:n.selectedTable,"onUpdate:value":a[0]||(a[0]=e=>n.selectedTable=e),style:{width:"220px"},onChange:n.handleChange,allowClear:""},{default:o(()=>[(l(!0),_(T,null,v(n.listModule,e=>(l(),c(s,{key:e.tableName,value:e.tableName},{default:o(()=>[N(O(e.tableName),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value","onChange"])]),_:1}),t(y,{list:n.dragOption,onChange:n.onEnd,onStart:a[1]||(a[1]=e=>n.drag=!0),onEnd:a[2]||(a[2]=e=>n.drag=!1)},{default:o(()=>[t(U,{type:"transition",name:"flip-list"},{default:o(()=>[(l(!0),_(T,null,v(n.listField,(e,b)=>(l(),c(p,{key:e.fieldName,label:e.fieldDescription},{default:o(()=>[t(r,{fieldType:e.fieldType,value:e.selectedComponent,"onUpdate:value":k=>e.selectedComponent=k},null,8,["fieldType","value","onUpdate:value"]),e.selectedComponent?(l(),c(u,{key:0,componentName:e.selectedComponent,index:b},null,8,["componentName","index"])):h("",!0)]),_:2},1032,["label"]))),128))]),_:1})]),_:1},8,["list","onChange"])]),_:1})]),_:1}),t(i,{type:"vertical",class:"full-height"}),t(f,{span:11},{default:o(()=>[N(" K\u1EBFt qu\u1EA3 "),t(d,{"label-col":{span:8},"wrapper-col":{span:12}},{default:o(()=>[(l(!0),_(T,null,v(n.listField,(e,b)=>(l(),c(p,{key:e.fieldName,label:e.fieldDescription},{default:o(()=>[e.selectedComponent?(l(),c(g,{key:0,componentName:e.selectedComponent,index:b},null,8,["componentName","index"])):h("",!0)]),_:2},1032,["label"]))),128))]),_:1})]),_:1})]),_:1})])}const Y=$(z,[["render",H],["__scopeId","data-v-c176467b"]]);export{Y as default};
