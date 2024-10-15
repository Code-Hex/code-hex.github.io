(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[144],{9943:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tools/base64",function(){return t(9138)}])},2407:function(e,r,t){"use strict";t.d(r,{Mp:function(){return s},NV:function(){return a},fr:function(){return o},oF:function(){return c}});var n,o=function(e){var r;return a(e.replace(/_|-/g,(function(e){return null!==(r={_:"/","-":"+"}[e])&&void 0!==r?r:e})))},s=function(e){return c(e).replace(/\/|\+/g,(function(e){return null!==(n={"/":"_","+":"-"}[e])&&void 0!==n?n:e}))},c=function(e){for(var r="",t=new Uint8Array(e),n=0;n<t.byteLength;n++)r+=String.fromCharCode(t[n]);return btoa(r)},a=function(e){for(var r=atob(e),t=new Uint8Array(new ArrayBuffer(r.length)),n=r.length/2,o=0,s=r.length-1;o<=n;o++,s--)t[o]=r.charCodeAt(o),t[s]=r.charCodeAt(s);return t}},9138:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return w}});var n=t(2670),o=t(1799),s=t(9396),c=t(5893),a=t(7294),i=t(2407),l=new TextEncoder,u=new TextDecoder,d=t(4653),f=t(5162),x=t(6175),h=[{id:"encode",title:"Base64 encode",description:"Encode a UTF-8 text to Base64 as you type or paste",run:function(e){if((0,n.Z)(e,ArrayBuffer))return(0,i.oF)(e);var r=l.encode(e);return(0,i.oF)(r)}},{id:"decode",title:"Base64 decode",description:"Decode a Base64 to UTF-8 text as you type or paste",run:function(e){if((0,n.Z)(e,ArrayBuffer))throw new Error("unexpected array buffer in decode");var r=(0,i.NV)(e);return u.decode(r)}},{id:"url_encode",title:"Base64 URL encode",description:"Encode a UTF-8 text to Base64 URL as you type or paste",run:function(e){if((0,n.Z)(e,ArrayBuffer))return(0,i.Mp)(e);var r=l.encode(e);return(0,i.Mp)(r)}},{id:"url_decode",title:"Base64 URL decode",description:"Decode a Base64 URL to UTF-8 text as you type or paste",run:function(e){if((0,n.Z)(e,ArrayBuffer))throw new Error("unexpected array buffer in decode");var r=(0,i.fr)(e);return u.decode(r)}}],p=function(e){var r=e.selected,t=e.setSelected;return(0,c.jsx)(x.Vy,{list:h,selected:r,setSelected:t})},g=function(e){var r=e.selected,t=e.setSource;return(0,c.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,c.jsx)(x.hh,{label:r.description}),(0,c.jsx)(x.oA,{placeholder:"Type (or paste) here...",onChange:function(e){return t(e.target.value)}})]})},j=[{id:"text",title:"UTF-8 Text",Content:g},{id:"file",title:"File Upload",Content:function(e){var r=e.setSource,t=(0,a.useCallback)((function(e){if(0===e.length)throw new Error("accept only PNG, JPG or GIF images.");e[0].arrayBuffer().then((function(e){return r(e)}))}),[]),n=(0,f.uI)({onDrop:t,accept:{"image/*":[".png",".gif",".jpeg",".jpg"]},onError:function(e){return alert(e)}}),i=n.getRootProps,l=n.getInputProps,u=n.isDragActive;return(0,c.jsx)("div",(0,s.Z)((0,o.Z)({},i()),{className:"flex justify-center items-center w-full",children:(0,c.jsxs)("label",{className:"flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600",children:[(0,c.jsxs)("div",{className:"flex flex-col justify-center items-center pt-5 pb-6",children:[(0,c.jsx)(d.s68,{className:"w-10 h-10"}),(0,c.jsx)("p",{className:"mb-2 text-sm",children:(0,c.jsx)("span",{className:"font-semibold",children:u?"Drop the files here ...":"Click to upload or drag and drop"})}),(0,c.jsx)("p",{className:"text-xs",children:"PNG, JPG or GIF"})]}),(0,c.jsx)("input",(0,o.Z)({},l()))]})}))}}],y=function(e){var r=e.selected,t=e.setSource;return(0,c.jsx)(x.Gq,{categories:j,children:function(e){return(0,c.jsx)(e.Content,{selected:r,setSource:t})}})},v=function(e){return function(r){var t=r.source;return(0,c.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,c.jsx)("label",{htmlFor:"message",className:"text-md font-semibold",children:"Result"}),(0,c.jsx)("div",{children:(0,c.jsx)("img",{alt:"result is displayed as date uri",src:"data:".concat(e,";base64,").concat(t)})})]})}},b=[{id:"text",title:"UTF-8",Content:function(e){var r=e.source,t=e.run;return(0,c.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,c.jsx)(x.hh,{label:"Result"}),(0,c.jsx)(x.oA,{placeholder:"Result goes here",value:t(r),readOnly:!0})]})}},{id:"jpg",title:"JPG",Content:v("image/jpeg")},{id:"png",title:"PNG",Content:v("image/png")},{id:"gif",title:"GIF",Content:v("image/gif")}],m=function(e){var r=e.source,t=e.run;return(0,c.jsx)(x.Gq,{categories:b,children:function(e){return(0,c.jsx)(e.Content,{source:r,run:t})}})},N=function(e){var r=e.selected,t=e.run,n=(0,a.useState)(""),o=n[0],s=n[1],i=r.id.includes("encode");return(0,c.jsxs)(c.Fragment,{children:[i?(0,c.jsx)(y,{selected:r,setSource:s}):(0,c.jsx)(g,{selected:r,setSource:s}),i?(0,c.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,c.jsx)(x.hh,{label:"Result"}),(0,c.jsx)(x.oA,{placeholder:"Result goes here",value:t(o),readOnly:!0})]}):(0,c.jsx)(m,{source:o,run:t})]})},w=function(){var e=(0,a.useState)(h[0]),r=e[0],t=e[1],n=(0,a.useCallback)((function(e){try{return r.run(e)}catch(t){return"error has caught: ".concat(t)}}),[r]);return(0,c.jsx)(x.ZB,{title:"Base64 encoder & decoder",subTitle:"A tool for encoding text or binary data like images to base64 and vice versa",children:(0,c.jsx)(x.Dk,{children:(0,c.jsxs)("div",{className:"flex flex-col space-y-4",children:[(0,c.jsx)("div",{className:"flex justify-end",children:(0,c.jsx)(p,{selected:r,setSelected:t})}),(0,c.jsx)(N,{selected:r,run:n},r.id)]})})})}}},function(e){e.O(0,[635,186,571,926,175,774,888,179],(function(){return r=9943,e(e.s=r);var r}));var r=e.O();_N_E=r}]);