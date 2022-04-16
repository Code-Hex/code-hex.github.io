(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[795],{9152:function(a,b,c){"use strict";c.r(b),c.d(b,{"__N_SSG":function(){return p}});var d=c(4730),e=c(16835),f=c(14653),g=c(9008),h=c(67294),i=c(74221),j=c(85893),k=["permissions"],l=function(){return(0,j.jsxs)("svg",{className:"animate-spin h-10 w-10 text-indigo-500 mx-auto",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,j.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,j.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})},m={English:"en",日本語:"ja"},n="Predifined Roles Finder - codehex.dev",o="You can look for Predefined Roles in GCP. Search in any language you enter - Predifined Roles Finder - codehex.dev",p=!0;b.default=function(a){var b=a.jsonPayload,c=(0,h.useState)("en"),d=c[0],f=c[1],k=(0,h.useMemo)(function(){return Object.values(b)},[b]),l=(0,h.useMemo)(function(){return{keys:["permissions","en.roleTitle","en.roleName","ja.roleTitle","ja.roleName"],threshold:.2}},[]),m=function(a,b){var c=arguments.length>2&& void 0!==arguments[2]?arguments[2]:1e3,d=(0,h.useState)(!1),e=d[0],f=d[1],g=(0,h.useState)(a),j=g[0],k=g[1],l=(0,h.useState)(""),m=l[0],n=l[1],o=(0,h.useMemo)(function(){return new i.Z(a,b)},[a,b]);return(0,h.useEffect)(function(){if(""===m){f(!1),k(a);return}f(!0);var b=setTimeout(function(){var a=o.search(m);f(!1),k(a.map(function(a){return a.item}))},c);return function(){return clearTimeout(b)}},[m,o,f,k]),[j,e,n]}(k,l),p=(0,e.Z)(m,3),r=p[0],s=p[1],u=p[2];return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(g.default,{children:[(0,j.jsx)("meta",{charSet:"utf-8"}),(0,j.jsx)("link",{rel:"dns-prefetch",href:"https://cloud.google.com"}),(0,j.jsx)("title",{children:n}),(0,j.jsx)("meta",{name:"description",content:o}),(0,j.jsx)("meta",{property:"og:site_name",content:"codehex.dev"}),(0,j.jsx)("meta",{property:"og:type",content:"website"}),(0,j.jsx)("meta",{property:"og:title",content:n}),(0,j.jsx)("meta",{property:"og:url",content:"https://codehex.dev/gcp_predefined_roles/"}),(0,j.jsx)("meta",{property:"og:description",content:o})]}),(0,j.jsx)("div",{className:"w-full h-full bg-gray-300",children:(0,j.jsxs)("div",{className:"pb-4",children:[(0,j.jsx)(q,{setQuery:u,currentLocale:d,setCurrentLocale:f,resultNum:r.length}),(0,j.jsx)("div",{className:"py-4",children:(0,j.jsx)("div",{className:"w-full bg-white overflow-x-scroll h-screen",children:(0,j.jsx)(t,{result:r,loading:s,locale:d})})})]})})]})};var q=function(a){var b=a.setQuery,c=a.currentLocale,d=a.setCurrentLocale,e=a.resultNum;return(0,j.jsxs)("div",{className:"w-full bg-white flex flex-col sm:flex-row",children:[(0,j.jsxs)("div",{className:"flex flex-row items-center",children:[(0,j.jsx)(r,{}),(0,j.jsx)(s,{currentLocale:c,setCurrentLocale:d})]}),(0,j.jsxs)("div",{className:"w-full flex flex-row items-center",children:[(0,j.jsx)("input",{className:"w-full py-4 px-4 leading-tight focus:outline-none",id:"search",type:"text",placeholder:"Search",role:"search",onChange:function(a){return b(a.target.value)}}),(0,j.jsxs)("div",{className:"px-2 whitespace-nowrap flex flex-row space-x-2",children:[(0,j.jsx)("span",{className:"text-pink-600",children:e}),(0,j.jsx)("span",{className:"text-gray-600",children:"results"})]})]})]})},r=function(){return(0,j.jsx)("a",{className:"pl-4 py-4 hover:underline col-span-3 sm:col-span-1",href:"https://cloud.google.com/iam/docs/understanding-roles#predefined_roles",children:(0,j.jsxs)("span",{className:"flex flex-row space-x-2 items-center",children:[(0,j.jsx)("img",{alt:"GCP Logo",className:"h-6",src:"https://lh3.googleusercontent.com/VEnnK2SyklusfxZ3dIYjlQH3xSwK2BFSJ69TFQ9g8HjM6m3CouRlTia5FW3z3GS0x83WC9TylZCaA9Jf_2kmr7mXxI9_HYLZTFy_bg"}),(0,j.jsx)("h1",{className:"flex-shrink-0 text-blue-600 font-bold w-60",children:"Predifined Roles Finder"})]})})},s=function(a){var b=a.currentLocale,c=a.setCurrentLocale;return(0,j.jsxs)("div",{className:"relative bg-transparent text-gray-700",children:[(0,j.jsx)("select",{className:"appearance-none pl-4 pr-8 block focus:outline-none",onChange:function(a){return c(a.currentTarget.value)},defaultValue:b,children:Object.keys(m).map(function(a,b){return(0,j.jsx)("option",{value:m[a],children:a},b)})}),(0,j.jsx)(f.Ta4,{className:"w-5 h-5 text-gray-400 absolute top-1/2 right-0 -mt-2.5 pointer-events-none"})]})},t=function(a){var b=a.result,c=a.loading,d=a.locale;return c?(0,j.jsx)("div",{className:"py-8",children:(0,j.jsx)(l,{})}):(0,j.jsxs)("table",{className:"w-full table-auto",children:[(0,j.jsx)("thead",{className:"bg-gray-100 sticky top-0 z-10",children:(0,j.jsxs)("tr",{className:"text-left text-gray-500",children:[(0,j.jsx)("th",{className:"px-4 py-4",children:"Role"}),(0,j.jsx)("th",{className:"px-4 py-4",children:"Permissions"})]})}),(0,j.jsx)("tbody",{children:b.map(function(a,b){return(0,j.jsx)(u,{role:a,locale:d},b)})})]})},u=(0,h.memo)(function(a){var b=a.role,c=a.locale,e=b.permissions,f=(0,d.Z)(b,k)[c];return f?(0,j.jsxs)("tr",{className:"border-b border-gray-300",children:[(0,j.jsx)("td",{className:"px-4 align-top",children:(0,j.jsxs)("div",{className:"sticky top-14 py-4",children:[(0,j.jsx)("p",{className:"font-bold",children:f.roleTitle}),(0,j.jsx)("p",{className:"text-pink-600 font-mono",children:f.roleName}),(0,j.jsx)("p",{className:"py-2",children:f.roleDescription})]})}),(0,j.jsx)("td",{className:"px-4 py-4",children:(0,j.jsx)(v,{permissions:e})})]}):(0,j.jsx)(j.Fragment,{})}),v=(0,h.memo)(function(a){var b=a.permissions;return(0,j.jsx)("ul",{children:b.map(function(a,b){return(0,j.jsx)("li",{children:a},b)})})})},15805:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/gcp_predefined_roles",function(){return c(9152)}])}},function(a){a.O(0,[478,574,774,888,179],function(){return a(a.s=15805)}),_N_E=a.O()}])