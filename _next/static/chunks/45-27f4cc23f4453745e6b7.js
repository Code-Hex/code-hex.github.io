(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[45],{7375:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}n.d(t,{Z:function(){return r}})},3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return f},kt:function(){return d}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"===typeof e?e(t):a(a({},t),e)),n},f=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,f=u(e,["components","mdxType","originalType","parentName"]),h=c(n),d=i,p=h["".concat(s,".").concat(d)]||h[d]||l[d]||o;return n?r.createElement(p,a(a({ref:t},f),{},{components:n})):r.createElement(p,a({ref:t},f))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"===typeof e||i){var o=n.length,a=new Array(o);a[0]=h;var u={};for(var s in t)hasOwnProperty.call(t,s)&&(u[s]=t[s]);u.originalType=e,u.mdxType="string"===typeof e?e:i,a[1]=u;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},7484:function(e){e.exports=function(){"use strict";var e=1e3,t=6e4,n=36e5,r="millisecond",i="second",o="minute",a="hour",u="day",s="week",c="month",f="quarter",l="year",h="date",d="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,g={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},y=function(e,t,n){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(n)+e},m={s:y,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),r=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+y(r,2,"0")+":"+y(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var r=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(r,c),o=n-i<0,a=t.clone().add(r+(o?-1:1),c);return+(-(r+(n-i)/(o?i-a:a-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:l,w:s,d:u,D:h,h:a,m:o,s:i,ms:r,Q:f}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},b="en",$={};$[b]=g;var w=function(e){return e instanceof C},O=function(e,t,n){var r;if(!e)return b;if("string"==typeof e)$[e]&&(r=e),t&&($[e]=t,r=e);else{var i=e.name;$[i]=e,r=i}return!n&&r&&(b=r),r||!n&&b},M=function(e,t){if(w(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new C(n)},D=m;D.l=O,D.i=w,D.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var C=function(){function g(e){this.$L=O(e.locale,null,!0),this.parse(e)}var y=g.prototype;return y.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(D.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(p);if(r){var i=r[2]-1||0,o=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},y.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},y.$utils=function(){return D},y.isValid=function(){return!(this.$d.toString()===d)},y.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},y.isAfter=function(e,t){return M(e)<this.startOf(t)},y.isBefore=function(e,t){return this.endOf(t)<M(e)},y.$g=function(e,t,n){return D.u(e)?this[t]:this.set(n,e)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(e,t){var n=this,r=!!D.u(t)||t,f=D.p(e),d=function(e,t){var i=D.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return r?i:i.endOf(u)},p=function(e,t){return D.w(n.toDate()[e].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,g=this.$M,y=this.$D,m="set"+(this.$u?"UTC":"");switch(f){case l:return r?d(1,0):d(31,11);case c:return r?d(1,g):d(0,g+1);case s:var b=this.$locale().weekStart||0,$=(v<b?v+7:v)-b;return d(r?y-$:y+(6-$),g);case u:case h:return p(m+"Hours",0);case a:return p(m+"Minutes",1);case o:return p(m+"Seconds",2);case i:return p(m+"Milliseconds",3);default:return this.clone()}},y.endOf=function(e){return this.startOf(e,!1)},y.$set=function(e,t){var n,s=D.p(e),f="set"+(this.$u?"UTC":""),d=(n={},n[u]=f+"Date",n[h]=f+"Date",n[c]=f+"Month",n[l]=f+"FullYear",n[a]=f+"Hours",n[o]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[s],p=s===u?this.$D+(t-this.$W):t;if(s===c||s===l){var v=this.clone().set(h,1);v.$d[d](p),v.init(),this.$d=v.set(h,Math.min(this.$D,v.daysInMonth())).$d}else d&&this.$d[d](p);return this.init(),this},y.set=function(e,t){return this.clone().$set(e,t)},y.get=function(e){return this[D.p(e)]()},y.add=function(r,f){var h,d=this;r=Number(r);var p=D.p(f),v=function(e){var t=M(d);return D.w(t.date(t.date()+Math.round(e*r)),d)};if(p===c)return this.set(c,this.$M+r);if(p===l)return this.set(l,this.$y+r);if(p===u)return v(1);if(p===s)return v(7);var g=(h={},h[o]=t,h[a]=n,h[i]=e,h)[p]||1,y=this.$d.getTime()+r*g;return D.w(y,this)},y.subtract=function(e,t){return this.add(-1*e,t)},y.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var r=e||"YYYY-MM-DDTHH:mm:ssZ",i=D.z(this),o=this.$H,a=this.$m,u=this.$M,s=n.weekdays,c=n.months,f=function(e,n,i,o){return e&&(e[n]||e(t,r))||i[n].substr(0,o)},l=function(e){return D.s(o%12||12,e,"0")},h=n.meridiem||function(e,t,n){var r=e<12?"AM":"PM";return n?r.toLowerCase():r},p={YY:String(this.$y).slice(-2),YYYY:this.$y,M:u+1,MM:D.s(u+1,2,"0"),MMM:f(n.monthsShort,u,c,3),MMMM:f(c,u),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:f(n.weekdaysMin,this.$W,s,2),ddd:f(n.weekdaysShort,this.$W,s,3),dddd:s[this.$W],H:String(o),HH:D.s(o,2,"0"),h:l(1),hh:l(2),a:h(o,a,!0),A:h(o,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:i};return r.replace(v,(function(e,t){return t||p[e]||i.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(r,h,d){var p,v=D.p(h),g=M(r),y=(g.utcOffset()-this.utcOffset())*t,m=this-g,b=D.m(this,g);return b=(p={},p[l]=b/12,p[c]=b,p[f]=b/3,p[s]=(m-y)/6048e5,p[u]=(m-y)/864e5,p[a]=m/n,p[o]=m/t,p[i]=m/e,p)[v]||m,d?b:D.a(b)},y.daysInMonth=function(){return this.endOf(c).$D},y.$locale=function(){return $[this.$L]},y.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),r=O(e,t,!0);return r&&(n.$L=r),n},y.clone=function(){return D.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},g}(),T=C.prototype;return M.prototype=T,[["$ms",r],["$s",i],["$m",o],["$H",a],["$W",u],["$M",c],["$y",l],["$D",h]].forEach((function(e){T[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,C,M),e.$i=!0),M},M.locale=O,M.isDayjs=w,M.unix=function(e){return M(1e3*e)},M.en=$[b],M.Ls=$,M.p={},M}()},2167:function(e,t,n){"use strict";var r=n(3038),i=n(862);t.default=void 0;var o=i(n(7294)),a=n(9414),u=n(4651),s=n(7426),c={};function f(e,t,n,r){if(e&&(0,a.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var i=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;c[t+"%"+n+(i?"%"+i:"")]=!0}}var l=function(e){var t,n=!1!==e.prefetch,i=(0,u.useRouter)(),l=o.default.useMemo((function(){var t=(0,a.resolveHref)(i,e.href,!0),n=r(t,2),o=n[0],u=n[1];return{href:o,as:e.as?(0,a.resolveHref)(i,e.as):u||o}}),[i,e.href,e.as]),h=l.href,d=l.as,p=e.children,v=e.replace,g=e.shallow,y=e.scroll,m=e.locale;"string"===typeof p&&(p=o.default.createElement("a",null,p));var b=(t=o.Children.only(p))&&"object"===typeof t&&t.ref,$=(0,s.useIntersection)({rootMargin:"200px"}),w=r($,2),O=w[0],M=w[1],D=o.default.useCallback((function(e){O(e),b&&("function"===typeof b?b(e):"object"===typeof b&&(b.current=e))}),[b,O]);(0,o.useEffect)((function(){var e=M&&n&&(0,a.isLocalURL)(h),t="undefined"!==typeof m?m:i&&i.locale,r=c[h+"%"+d+(t?"%"+t:"")];e&&!r&&f(i,h,d,{locale:t})}),[d,h,M,m,n,i]);var C={ref:D,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,i,o,u,s){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,a.isLocalURL)(n))&&(e.preventDefault(),null==u&&r.indexOf("#")>=0&&(u=!1),t[i?"replace":"push"](n,r,{shallow:o,locale:s,scroll:u}))}(e,i,h,d,v,g,y,m)},onMouseEnter:function(e){(0,a.isLocalURL)(h)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),f(i,h,d,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var T="undefined"!==typeof m?m:i&&i.locale,S=i&&i.isLocaleDomain&&(0,a.getDomainLocale)(d,T,i&&i.locales,i&&i.domainLocales);C.href=S||(0,a.addBasePath)((0,a.addLocale)(d,T,i&&i.defaultLocale))}return o.default.cloneElement(t,C)};t.default=l},7426:function(e,t,n){"use strict";var r=n(3038);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!a,s=(0,i.useRef)(),c=(0,i.useState)(!1),f=r(c,2),l=f[0],h=f[1],d=(0,i.useCallback)((function(e){s.current&&(s.current(),s.current=void 0),n||l||e&&e.tagName&&(s.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=u.get(t);if(n)return n;var r=new Map,i=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return u.set(t,n={id:t,observer:i,elements:r}),n}(n),i=r.id,o=r.observer,a=r.elements;return a.set(e,t),o.observe(e),function(){a.delete(e),o.unobserve(e),0===a.size&&(o.disconnect(),u.delete(i))}}(e,(function(e){return e&&h(e)}),{rootMargin:t}))}),[n,t,l]);return(0,i.useEffect)((function(){if(!a&&!l){var e=(0,o.requestIdleCallback)((function(){return h(!0)}));return function(){return(0,o.cancelIdleCallback)(e)}}}),[l]),[d,l]};var i=n(7294),o=n(3447),a="undefined"!==typeof IntersectionObserver;var u=new Map},212:function(){},1664:function(e,t,n){e.exports=n(2167)},6470:function(e,t,n){"use strict";var r=n(4155);function i(e){if("string"!==typeof e)throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}function o(e,t){for(var n,r="",i=0,o=-1,a=0,u=0;u<=e.length;++u){if(u<e.length)n=e.charCodeAt(u);else{if(47===n)break;n=47}if(47===n){if(o===u-1||1===a);else if(o!==u-1&&2===a){if(r.length<2||2!==i||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2))if(r.length>2){var s=r.lastIndexOf("/");if(s!==r.length-1){-1===s?(r="",i=0):i=(r=r.slice(0,s)).length-1-r.lastIndexOf("/"),o=u,a=0;continue}}else if(2===r.length||1===r.length){r="",i=0,o=u,a=0;continue}t&&(r.length>0?r+="/..":r="..",i=2)}else r.length>0?r+="/"+e.slice(o+1,u):r=e.slice(o+1,u),i=u-o-1;o=u,a=0}else 46===n&&-1!==a?++a:a=-1}return r}var a={resolve:function(){for(var e,t="",n=!1,a=arguments.length-1;a>=-1&&!n;a--){var u;a>=0?u=arguments[a]:(void 0===e&&(e=r.cwd()),u=e),i(u),0!==u.length&&(t=u+"/"+t,n=47===u.charCodeAt(0))}return t=o(t,!n),n?t.length>0?"/"+t:"/":t.length>0?t:"."},normalize:function(e){if(i(e),0===e.length)return".";var t=47===e.charCodeAt(0),n=47===e.charCodeAt(e.length-1);return 0!==(e=o(e,!t)).length||t||(e="."),e.length>0&&n&&(e+="/"),t?"/"+e:e},isAbsolute:function(e){return i(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var e,t=0;t<arguments.length;++t){var n=arguments[t];i(n),n.length>0&&(void 0===e?e=n:e+="/"+n)}return void 0===e?".":a.normalize(e)},relative:function(e,t){if(i(e),i(t),e===t)return"";if((e=a.resolve(e))===(t=a.resolve(t)))return"";for(var n=1;n<e.length&&47===e.charCodeAt(n);++n);for(var r=e.length,o=r-n,u=1;u<t.length&&47===t.charCodeAt(u);++u);for(var s=t.length-u,c=o<s?o:s,f=-1,l=0;l<=c;++l){if(l===c){if(s>c){if(47===t.charCodeAt(u+l))return t.slice(u+l+1);if(0===l)return t.slice(u+l)}else o>c&&(47===e.charCodeAt(n+l)?f=l:0===l&&(f=0));break}var h=e.charCodeAt(n+l);if(h!==t.charCodeAt(u+l))break;47===h&&(f=l)}var d="";for(l=n+f+1;l<=r;++l)l!==r&&47!==e.charCodeAt(l)||(0===d.length?d+="..":d+="/..");return d.length>0?d+t.slice(u+f):(u+=f,47===t.charCodeAt(u)&&++u,t.slice(u))},_makeLong:function(e){return e},dirname:function(e){if(i(e),0===e.length)return".";for(var t=e.charCodeAt(0),n=47===t,r=-1,o=!0,a=e.length-1;a>=1;--a)if(47===(t=e.charCodeAt(a))){if(!o){r=a;break}}else o=!1;return-1===r?n?"/":".":n&&1===r?"//":e.slice(0,r)},basename:function(e,t){if(void 0!==t&&"string"!==typeof t)throw new TypeError('"ext" argument must be a string');i(e);var n,r=0,o=-1,a=!0;if(void 0!==t&&t.length>0&&t.length<=e.length){if(t.length===e.length&&t===e)return"";var u=t.length-1,s=-1;for(n=e.length-1;n>=0;--n){var c=e.charCodeAt(n);if(47===c){if(!a){r=n+1;break}}else-1===s&&(a=!1,s=n+1),u>=0&&(c===t.charCodeAt(u)?-1===--u&&(o=n):(u=-1,o=s))}return r===o?o=s:-1===o&&(o=e.length),e.slice(r,o)}for(n=e.length-1;n>=0;--n)if(47===e.charCodeAt(n)){if(!a){r=n+1;break}}else-1===o&&(a=!1,o=n+1);return-1===o?"":e.slice(r,o)},extname:function(e){i(e);for(var t=-1,n=0,r=-1,o=!0,a=0,u=e.length-1;u>=0;--u){var s=e.charCodeAt(u);if(47!==s)-1===r&&(o=!1,r=u+1),46===s?-1===t?t=u:1!==a&&(a=1):-1!==t&&(a=-1);else if(!o){n=u+1;break}}return-1===t||-1===r||0===a||1===a&&t===r-1&&t===n+1?"":e.slice(t,r)},format:function(e){if(null===e||"object"!==typeof e)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return function(e,t){var n=t.dir||t.root,r=t.base||(t.name||"")+(t.ext||"");return n?n===t.root?n+r:n+e+r:r}("/",e)},parse:function(e){i(e);var t={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return t;var n,r=e.charCodeAt(0),o=47===r;o?(t.root="/",n=1):n=0;for(var a=-1,u=0,s=-1,c=!0,f=e.length-1,l=0;f>=n;--f)if(47!==(r=e.charCodeAt(f)))-1===s&&(c=!1,s=f+1),46===r?-1===a?a=f:1!==l&&(l=1):-1!==a&&(l=-1);else if(!c){u=f+1;break}return-1===a||-1===s||0===l||1===l&&a===s-1&&a===u+1?-1!==s&&(t.base=t.name=0===u&&o?e.slice(1,s):e.slice(u,s)):(0===u&&o?(t.name=e.slice(1,a),t.base=e.slice(1,s)):(t.name=e.slice(u,a),t.base=e.slice(u,s)),t.ext=e.slice(a,s)),u>0?t.dir=e.slice(0,u-1):o&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,e.exports=a},4155:function(e){var t,n,r=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"===typeof setTimeout?setTimeout:i}catch(e){t=i}try{n="function"===typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var u,s=[],c=!1,f=-1;function l(){c&&u&&(c=!1,u.length?s=u.concat(s):f=-1,s.length&&h())}function h(){if(!c){var e=a(l);c=!0;for(var t=s.length;t;){for(u=s,s=[];++f<t;)u&&u[f].run();f=-1,t=s.length}u=null,c=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function d(e,t){this.fun=e,this.array=t}function p(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];s.push(new d(e,t)),1!==s.length||c||a(h)},d.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=p,r.addListener=p,r.once=p,r.off=p,r.removeListener=p,r.removeAllListeners=p,r.emit=p,r.prependListener=p,r.prependOnceListener=p,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}}}]);