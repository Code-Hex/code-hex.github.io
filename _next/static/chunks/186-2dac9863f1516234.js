(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[186],{4058:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var r=n(7294),o=n(9008),a=n.n(o);function u(){return u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u.apply(this,arguments)}function l(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t.indexOf(n=a[r])>=0||(o[n]=e[n]);return o}var c=["key"],i=["key"],f=(0,r.memo)((function(e){var t,n=e.title,o=e.description,f=e.canonical,s=e.robots,p=e.maxDescriptionCharacters,d=void 0===p?150:p,v=e.twitter,y=void 0===v?{}:v,m=e.og,g=void 0===m?{}:m,h=e.customMetaTags,b=void 0===h?[]:h,k=e.customLinkTags,_=void 0===k?[]:k,E=[];return n&&E.push(r.createElement("title",{key:"title"},n)),s&&E.push(r.createElement("meta",{key:"robots",name:"robots",content:s})),o&&E.push(r.createElement("meta",{key:"description",name:"description",content:o.substr(0,d)})),f&&E.push(r.createElement("link",{key:"canonical",rel:"canonical",href:f})),y.card&&E.push(r.createElement("meta",{key:"twitter:card",name:"twitter:card",content:y.card})),y.site&&E.push(r.createElement("meta",{key:"twitter:site",name:"twitter:site",content:y.site})),(g.url||f)&&E.push(r.createElement("meta",{key:"og:url",property:"og:url",content:g.url||f})),(g.title||n)&&E.push(r.createElement("meta",{key:"og:title",property:"og:title",content:g.title||n})),g.image&&E.push(r.createElement("meta",{key:"og:image",property:"og:image",content:g.image})),(g.description||o)&&E.push(r.createElement("meta",{key:"og:description",property:"og:description",content:null==(t=g.description||o)?void 0:t.substr(0,d)})),g.type&&E.push(r.createElement("meta",{key:"og:type",property:"og:type",content:g.type})),g.siteName&&E.push(r.createElement("meta",{key:"og:site_name",property:"og:site_name",content:g.siteName})),b.length>0&&E.push(b.map((function(e,t){var n=e.key,o=l(e,c);return r.createElement("meta",u({key:"meta-"+(n||t)},o))}))),_.length>0&&E.push(_.map((function(e,t){var n=e.key,o=l(e,i);return r.createElement("link",u({key:"link-"+(n||t)},o))}))),r.createElement(a(),null,E)}))},1210:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1};("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8418:function(e,t,n){"use strict";var r=n(4941).Z;n(5753).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,a=(o=n(7294))&&o.__esModule?o:{default:o},u=n(6273),l=n(2725),c=n(3462),i=n(1018),f=n(7190),s=n(1210),p=n(8684);var d="undefined"!==typeof a.default.useTransition,v={};function y(e,t,n,r){if(e&&u.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;v[t+"%"+n+(o?"%"+o:"")]=!0}}var m=a.default.forwardRef((function(e,t){var n,o=e.href,m=e.as,g=e.children,h=e.prefetch,b=e.passHref,k=e.replace,_=e.shallow,E=e.scroll,C=e.locale,M=e.onClick,x=e.onMouseEnter,j=e.legacyBehavior,O=void 0===j?!0!==Boolean(!1):j,w=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","legacyBehavior"]);n=g,!O||"string"!==typeof n&&"number"!==typeof n||(n=a.default.createElement("a",null,n));var L=!1!==h,R=r(d?a.default.useTransition():[],2)[1],P=a.default.useContext(c.RouterContext),T=a.default.useContext(i.AppRouterContext);T&&(P=T);var A,I=a.default.useMemo((function(){var e=r(u.resolveHref(P,o,!0),2),t=e[0],n=e[1];return{href:t,as:m?u.resolveHref(P,m):n||t}}),[P,o,m]),N=I.href,D=I.as,U=a.default.useRef(N),B=a.default.useRef(D);O&&(A=a.default.Children.only(n));var H=O?A&&"object"===typeof A&&A.ref:t,K=r(f.useIntersection({rootMargin:"200px"}),3),Z=K[0],F=K[1],S=K[2],q=a.default.useCallback((function(e){B.current===D&&U.current===N||(S(),B.current=D,U.current=N),Z(e),H&&("function"===typeof H?H(e):"object"===typeof H&&(H.current=e))}),[D,H,N,S,Z]);a.default.useEffect((function(){var e=F&&L&&u.isLocalURL(N),t="undefined"!==typeof C?C:P&&P.locale,n=v[N+"%"+D+(t?"%"+t:"")];e&&!n&&y(P,N,D,{locale:t})}),[D,N,F,C,L,P]);var z={ref:q,onClick:function(e){O||"function"!==typeof M||M(e),O&&A.props&&"function"===typeof A.props.onClick&&A.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,a,l,c,i){if("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&u.isLocalURL(n)){e.preventDefault();var f=function(){t[o?"replace":"push"](n,r,{shallow:a,locale:c,scroll:l})};i?i(f):f()}}(e,P,N,D,k,_,E,C,T?R:void 0)},onMouseEnter:function(e){O||"function"!==typeof x||x(e),O&&A.props&&"function"===typeof A.props.onMouseEnter&&A.props.onMouseEnter(e),u.isLocalURL(N)&&y(P,N,D,{priority:!0})}};if(!O||b||"a"===A.type&&!("href"in A.props)){var G="undefined"!==typeof C?C:P&&P.locale,J=P&&P.isLocaleDomain&&s.getDomainLocale(D,G,P.locales,P.domainLocales);z.href=J||p.addBasePath(l.addLocale(D,G,P&&P.defaultLocale))}return O?a.default.cloneElement(A,z):a.default.createElement("a",Object.assign({},w,z),n)}));t.default=m,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7190:function(e,t,n){"use strict";var r=n(4941).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,i=e.disabled||!u,f=o.useRef(),s=r(o.useState(!1),2),p=s[0],d=s[1],v=r(o.useState(null),2),y=v[0],m=v[1];o.useEffect((function(){if(u){if(f.current&&(f.current(),f.current=void 0),i||p)return;return y&&y.tagName&&(f.current=function(e,t,n){var r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=c.find((function(e){return e.root===n.root&&e.margin===n.margin}));if(r&&(t=l.get(r)))return t;var o=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return t={id:n,observer:a,elements:o},c.push(n),l.set(n,t),t}(n),o=r.id,a=r.observer,u=r.elements;return u.set(e,t),a.observe(e),function(){if(u.delete(e),a.unobserve(e),0===u.size){a.disconnect(),l.delete(o);var t=c.findIndex((function(e){return e.root===o.root&&e.margin===o.margin}));t>-1&&c.splice(t,1)}}}(y,(function(e){return e&&d(e)}),{root:null==t?void 0:t.current,rootMargin:n})),function(){null==f.current||f.current(),f.current=void 0}}if(!p){var e=a.requestIdleCallback((function(){return d(!0)}));return function(){return a.cancelIdleCallback(e)}}}),[y,i,n,t,p]);var g=o.useCallback((function(){d(!1)}),[]);return[m,p,g]};var o=n(7294),a=n(9311),u="function"===typeof IntersectionObserver;var l=new Map,c=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1018:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FullAppTreeContext=t.AppTreeContext=t.AppRouterContext=void 0;var r,o=(r=n(7294))&&r.__esModule?r:{default:r};var a=o.default.createContext(null);t.AppRouterContext=a;var u=o.default.createContext(null);t.AppTreeContext=u;var l=o.default.createContext(null);t.FullAppTreeContext=l},1664:function(e,t,n){e.exports=n(8418)}}]);