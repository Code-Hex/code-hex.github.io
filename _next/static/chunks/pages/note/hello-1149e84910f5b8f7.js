(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[813],{23646:function(a,b,c){var d=c(67228);a.exports=function(a){if(Array.isArray(a))return d(a)},a.exports.default=a.exports,a.exports.__esModule=!0},46860:function(a){a.exports=function(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)},a.exports.default=a.exports,a.exports.__esModule=!0},98206:function(a){a.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},a.exports.default=a.exports,a.exports.__esModule=!0},319:function(a,b,c){var d=c(23646),e=c(46860),f=c(60379),g=c(98206);a.exports=function(a){return d(a)||e(a)||f(a)||g()},a.exports.default=a.exports,a.exports.__esModule=!0},78000:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.AmpStateContext=void 0;var d,e=((d=c(67294))&&d.__esModule?d:{"default":d}).default.createContext({});b.AmpStateContext=e},45646:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.isInAmpMode=g,b.useAmp=function(){return g(e.default.useContext(f.AmpStateContext))};var d,e=(d=c(67294))&&d.__esModule?d:{"default":d},f=c(78000);function g(){var a=arguments.length>0&& void 0!==arguments[0]?arguments[0]:{},b=a.ampFirst,c=a.hybrid,d=a.hasQuery;return void 0!==b&&b|| void 0!==c&&c&& void 0!==d&&d}},72717:function(a,b,c){"use strict";var d=c(59713);function e(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}Object.defineProperty(b,"__esModule",{value:!0}),b.defaultHead=l,b.default=void 0;var f,g=function(a){if(a&&a.__esModule)return a;var b={};if(null!=a){for(var c in a)if(Object.prototype.hasOwnProperty.call(a,c)){var d=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(a,c):{};d.get||d.set?Object.defineProperty(b,c,d):b[c]=a[c]}}return b.default=a,b}(c(67294)),h=(f=c(11585))&&f.__esModule?f:{"default":f},i=c(78000),j=c(15850),k=c(45646);function l(){var a=arguments.length>0&& void 0!==arguments[0]&&arguments[0],b=[g.default.createElement("meta",{charSet:"utf-8"})];return a||b.push(g.default.createElement("meta",{name:"viewport",content:"width=device-width"})),b}function m(a,b){return"string"==typeof b||"number"==typeof b?a:b.type===g.default.Fragment?a.concat(g.default.Children.toArray(b.props.children).reduce(function(a,b){return"string"==typeof b||"number"==typeof b?a:a.concat(b)},[])):a.concat(b)}var n=["name","httpEquiv","charSet","itemProp"];function o(a,b){var c,f,h,i;return a.reduce(function(a,b){var c=g.default.Children.toArray(b.props.children);return a.concat(c)},[]).reduce(m,[]).reverse().concat(l(b.inAmpMode)).filter((c=new Set(),f=new Set(),h=new Set(),i={},function(a){var b=!0,d=!1;if(a.key&&"number"!=typeof a.key&&a.key.indexOf("$")>0){d=!0;var e=a.key.slice(a.key.indexOf("$")+1);c.has(e)?b=!1:c.add(e)}switch(a.type){case"title":case"base":f.has(a.type)?b=!1:f.add(a.type);break;case"meta":for(var g=0,j=n.length;g<j;g++){var k=n[g];if(a.props.hasOwnProperty(k))if("charSet"===k)h.has(k)?b=!1:h.add(k);else{var l=a.props[k],m=i[k]||new Set();("name"!==k||!d)&&m.has(l)?b=!1:(m.add(l),i[k]=m)}}break}return b})).reverse().map(function(a,c){var f=a.key||c;if(!b.inAmpMode&&"link"===a.type&&a.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(b){return a.props.href.startsWith(b)})){var h=function(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{};b%2?e(Object(c),!0).forEach(function(b){d(a,b,c[b])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(c)):e(Object(c)).forEach(function(b){Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(c,b))})}return a}({},a.props||{});return h["data-href"]=h.href,h.href=void 0,h["data-optimized-fonts"]=!0,g.default.cloneElement(a,h)}return g.default.cloneElement(a,{key:f})})}b.default=function(a){var b=a.children,c=g.useContext(i.AmpStateContext),d=g.useContext(j.HeadManagerContext);return g.default.createElement(h.default,{reduceComponentsToState:o,headManager:d,inAmpMode:k.isInAmpMode(c)},b)}},11585:function(a,b,c){"use strict";var d=c(319),e=c(34575),f=c(93913),g=c(81506),h=c(2205),i=c(78585),j=c(29754);Object.defineProperty(b,"__esModule",{value:!0}),b.default=void 0;var k=function(a){h(c,a);var b=function(a){var b=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(a){return!1}}();return function(){var c,d=j(a);if(b){var e=j(this).constructor;c=Reflect.construct(d,arguments,e)}else c=d.apply(this,arguments);return i(this,c)}}(c);function c(a){var f;return e(this,c),(f=b.call(this,a)).emitChange=function(){f._hasHeadManager&&f.props.headManager.updateHead(f.props.reduceComponentsToState(d(f.props.headManager.mountedInstances),f.props))},f._hasHeadManager=f.props.headManager&&f.props.headManager.mountedInstances,f}return f(c,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),c}(function(a){if(a&&a.__esModule)return a;var b={};if(null!=a){for(var c in a)if(Object.prototype.hasOwnProperty.call(a,c)){var d=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(a,c):{};d.get||d.set?Object.defineProperty(b,c,d):b[c]=a[c]}}return b.default=a,b}(c(67294)).Component);b.default=k},38327:function(a,b,c){"use strict";c.d(b,{X:function(){return se}});var d=c(3905),e=c(9008),f=c(41664),g=c(11163),h=c(67294),i=c(28325),j=c.n(i),k=c(24335);c.n(k);var l=c(15251);c.n(l);var m=c(35433);c.n(m);var n=c(49299);c.n(n);var o=c(39980);c.n(o);var p=c(86405);c.n(p);var q=c(68758);c.n(q);var r=c(35249);c.n(r);var s=c(85795);c.n(s);var t=c(47231);c.n(t);var u=c(42273);c.n(u);var v=c(44852);c.n(v);var w=c(77533);c.n(w);var x=c(35266);c.n(x);var y=c(72594);c.n(y);var z=c(18508);c.n(z);var A=c(31093);c.n(A);var B=c(25691);c.n(B);var C=c(4279);c.n(C);var D=c(2731);c.n(D);var E=c(51849);c.n(E);var F=c(73253);c.n(F);var G=c(10856);c.n(G);var H=c(79016);c.n(H);var I=c(54019);c.n(I);var J=c(36972);c.n(J);var K=c(92776);c.n(K);var L=c(24940);c.n(L);var M=c(58060);c.n(M);var N=c(639);c.n(N);var O=c(57874);c.n(O);var P=c(94446);c.n(P);var Q=c(53292);c.n(Q);var R=c(46428);c.n(R);var S=c(86043);c.n(S);var T=c(69104);c.n(T);var U=c(97861);c.n(U);var V=c(24115);c.n(V);var W=c(15827);c.n(W);var X=c(21275);c.n(X);var Y=c(76609);c.n(Y);var Z=c(61354);c.n(Z);var $=c(86902);c.n($);var _=c(64681);c.n(_);var aa=c(4677);c.n(aa);var ba=c(52812);c.n(ba);var ca=c(44225);c.n(ca);var da=c(57649);c.n(da);var ea=c(46213);c.n(ea);var fa=c(29467);c.n(fa);var ga=c(4412);c.n(ga);var ha=c(74307);c.n(ha);var ia=c(59385);c.n(ia);var ja=c(18980);c.n(ja);var ka=c(80871);c.n(ka);var la=c(97899);c.n(la);var ma=c(30258);c.n(ma);var na=c(58149);c.n(na);var oa=c(57065);c.n(oa);var pa=c(73162);c.n(pa);var qa=c(90827);c.n(qa);var ra=c(24370);c.n(ra);var sa=c(40728);c.n(sa);var ta=c(96854);c.n(ta);var ua=c(54409);c.n(ua);var va=c(68483);c.n(va);var wa=c(77158);c.n(wa);var xa=c(60397);c.n(xa);var ya=c(68232);c.n(ya);var za=c(22456);c.n(za);var Aa=c(59979);c.n(Aa);var Ba=c(70060);c.n(Ba);var Ca=c(68805);c.n(Ca);var Da=c(75041);c.n(Da);var Ea=c(66841);c.n(Ea);var Fa=c(79958);c.n(Fa);var Ga=c(66512);c.n(Ga);var Ha=c(8956);c.n(Ha);var Ia=c(51039);c.n(Ia);var Ja=c(75045);c.n(Ja);var Ka=c(50171);c.n(Ka);var La=c(10427);c.n(La);var Ma=c(6634);c.n(Ma);var Na=c(9220);c.n(Na);var Oa=c(27915);c.n(Oa);var Pa=c(72778);c.n(Pa);var Qa=c(71828);c.n(Qa);var Ra=c(91709);c.n(Ra);var Sa=c(28407);c.n(Sa);var Ta=c(65276);c.n(Ta);var Ua=c(66857);c.n(Ua);var Va=c(49472);c.n(Va);var Wa=c(79787);c.n(Wa);var Xa=c(79812);c.n(Xa);var Ya=c(1415);c.n(Ya);var Za=c(27046);c.n(Za);var $a=c(73358);c.n($a);var _a=c(24064);c.n(_a);var ab=c(17117);c.n(ab);var bb=c(40485);c.n(bb);var cb=c(37802);c.n(cb);var db=c(92447);c.n(db);var eb=c(60075);c.n(eb);var fb=c(39181);c.n(fb);var gb=c(70110);c.n(gb);var hb=c(81295);c.n(hb);var ib=c(14324);c.n(ib);var jb=c(24677);c.n(jb);var kb=c(5578);c.n(kb);var lb=c(88161);c.n(lb);var mb=c(74277);c.n(mb);var nb=c(65503);c.n(nb);var ob=c(50057);c.n(ob);var pb=c(26203);c.n(pb);var qb=c(17786);c.n(qb);var rb=c(77460);c.n(rb);var sb=c(54263);c.n(sb);var tb=c(90175);c.n(tb);var ub=c(16150);c.n(ub);var vb=c(10880);c.n(vb);var wb=c(56521);c.n(wb);var xb=c(29525);c.n(xb);var yb=c(48942);c.n(yb);var zb=c(18848);c.n(zb);var Ab=c(52503);c.n(Ab);var Bb=c(99945);c.n(Bb);var Cb=c(54884);c.n(Cb);var Db=c(12886);c.n(Db);var Eb=c(52008);c.n(Eb);var Fb=c(81454);c.n(Fb);var Gb=c(55314);c.n(Gb);var Hb=c(68874);c.n(Hb);var Ib=c(96342);c.n(Ib);var Jb=c(38885);c.n(Jb);var Kb=c(96836);c.n(Kb);var Lb=c(68915);c.n(Lb);var Mb=c(88651);c.n(Mb);var Nb=c(46690);c.n(Nb);var Ob=c(22444);c.n(Ob);var Pb=c(64488);c.n(Pb);var Qb=c(81917);c.n(Qb);var Rb=c(56543);c.n(Rb);var Sb=c(82821);c.n(Sb);var Tb=c(32334);c.n(Tb);var Ub=c(69486);c.n(Ub);var Vb=c(31634);c.n(Vb);var Wb=c(90319);c.n(Wb);var Xb=c(87442);c.n(Xb);var Yb=c(51412);c.n(Yb);var Zb=c(61719);c.n(Zb);var $b=c(150);c.n($b);var _b=c(45520);c.n(_b);var ac=c(76347);c.n(ac);var bc=c(85153);c.n(bc);var cc=c(93335);c.n(cc);var dc=c(26555);c.n(dc);var ec=c(6004);c.n(ec);var fc=c(48443);c.n(fc);var gc=c(61169);c.n(gc);var hc=c(33965);c.n(hc);var ic=c(16185);c.n(ic);var jc=c(23099);c.n(jc);var kc=c(15101);c.n(kc);var lc=c(89134);c.n(lc);var mc=c(62468);c.n(mc);var nc=c(61899);c.n(nc);var oc=c(55949);c.n(oc);var pc=c(80454);c.n(pc);var qc=c(17898);c.n(qc);var rc=c(52353);c.n(rc);var sc=c(77661);c.n(sc);var tc=c(677);c.n(tc);var uc=c(33436);c.n(uc);var vc=c(35743);c.n(vc);var wc=c(58704);c.n(wc);var xc=c(74876);c.n(xc);var yc=c(11426);c.n(yc);var zc=c(24371);c.n(zc);var Ac=c(13144);c.n(Ac);var Bc=c(85513);c.n(Bc);var Cc=c(903);c.n(Cc);var Dc=c(47511);c.n(Dc);var Ec=c(40780);c.n(Ec);var Fc=c(13210);c.n(Fc);var Gc=c(54332);c.n(Gc);var Hc=c(70942);c.n(Hc);var Ic=c(52892);c.n(Ic);var Jc=c(74984);c.n(Jc);var Kc=c(20288);c.n(Kc);var Lc=c(26280);c.n(Lc);var Mc=c(89425);c.n(Mc);var Nc=c(92927);c.n(Nc);var Oc=c(63887);c.n(Oc);var Pc=c(86862);c.n(Pc);var Qc=c(97353);c.n(Qc);var Rc=c(43932);c.n(Rc);var Sc=c(17929);c.n(Sc);var Tc=c(45820);c.n(Tc);var Uc=c(37345);c.n(Uc);var Vc=c(24906);c.n(Vc);var Wc=c(71429);c.n(Wc);var Xc=c(93381);c.n(Xc);var Yc=c(24319);c.n(Yc);var Zc=c(9753);c.n(Zc);var $c=c(92168);c.n($c);var _c=c(89485);c.n(_c);var ad=c(80366);c.n(ad);var bd=c(26896);c.n(bd);var cd=c(82939);c.n(cd);var dd=c(84891);c.n(dd);var ed=c(94933);c.n(ed);var fd=c(54803);c.n(fd);var gd=c(24540);c.n(gd);var hd=c(63326);c.n(hd);var id=c(62356);c.n(id);var jd=c(21029);c.n(jd);var kd=c(28439);c.n(kd);var ld=c(2040);c.n(ld);var md=c(38512);c.n(md);var nd=c(76577);c.n(nd);var od=c(40998);c.n(od);var pd=c(94840);c.n(pd);var qd=c(23449);c.n(qd);var rd=c(70767);c.n(rd);var sd=c(71384);c.n(sd);var td=c(89865);c.n(td);var ud=c(42963);c.n(ud);var vd=c(10509);c.n(vd);var wd=c(22738);c.n(wd);var xd=c(89281);c.n(xd);var yd=c(9983);c.n(yd);var zd=c(30893);c.n(zd);var Ad=c(37485);c.n(Ad);var Bd=c(84435);c.n(Bd);var Cd=c(68092);c.n(Cd);var Dd=c(71327);c.n(Dd);var Ed=c(612);c.n(Ed);var Fd=c(83113);c.n(Fd);var Gd=c(34229);c.n(Gd);var Hd=c(65683);c.n(Hd);var Id=c(55689);c.n(Id);var Jd=c(90874);c.n(Jd);var Kd=c(48598);c.n(Kd);var Ld=c(89239);c.n(Ld);var Md=c(20601);c.n(Md);var Nd=c(65398);c.n(Nd);var Od=c(16241);c.n(Od);var Pd=c(46193);c.n(Pd);var Qd=c(1607);c.n(Qd);var Rd=c(37838);c.n(Rd);var Sd=c(9930);c.n(Sd);var Td=c(14032);c.n(Td);var Ud=c(10196);c.n(Ud);var Vd=c(14641);c.n(Vd);var Wd=c(30035);c.n(Wd);var Xd=c(70981);c.n(Xd);var Yd=c(47251);c.n(Yd);var Zd=c(38564);c.n(Zd);var $d=c(34438);c.n($d);var _d=c(83082);c.n(_d);var ae=c(10008);c.n(ae);var be=c(5774);c.n(be);var ce=c(31693);c.n(ce);var de=c(99729);c.n(de);var ee=c(45682);c.n(ee);var fe=c(10504);c.n(fe);var ge=c(62349);c.n(ge);var he=c(22449);c.n(he);var ie=c(19938);c.n(ie);var je=c(2982);c.n(je);var ke=c(857);c.n(ke);var le=c(36866);c.n(le);var me=c(27484),ne=c.n(me),oe=c(84110),pe=c.n(oe),qe=c(30051),re=c(85893);ne().extend(pe());var se=function(a){var b=a.meta,c=a.components,e=a.children;(0,h.useEffect)(function(){j().highlightAll()},[]);var f=ne()(b.date);return(0,re.jsx)("div",{className:"w-full bg-white antialiased",children:(0,re.jsxs)("div",{className:"mx-8 sm:mx-10 md:mx-12 pt-10 pb-16",children:[(0,re.jsxs)("div",{className:"pb-2 border-b border-gray-200 mb-10",children:[(0,re.jsx)("h1",{className:"inline-block text-3xl font-bold text-gray-900 tracking-tight",children:b.title}),(0,re.jsxs)("div",{className:"text-sm sm:text-base whitespace-nowrap text-gray-500",children:[(0,re.jsx)("div",{className:"sr-only",children:"Published on"}),(0,re.jsxs)("time",{dateTime:b.date,children:[f.format("MMMM DD, YYYY")," (",f.fromNow(),")"]})]}),(0,re.jsx)("div",{className:"flex space-x-2 py-2",children:b.tags.map(function(a){return(0,re.jsx)(qe.V,{tag:a},a)})})]}),(0,re.jsx)("article",{className:"prose sm:prose-sm md:prose-md",children:(0,re.jsx)(d.Zo,{components:void 0===c?{}:c,children:e})})]})})};b.Z=function(a){var b=a.meta,c=a.components,d=a.children,h=a.ogpPath,i=(0,g.useRouter)(),j=b.title,k=b.description;return(0,re.jsxs)(re.Fragment,{children:[(0,re.jsxs)(e.default,{children:[(0,re.jsxs)("title",{children:[j," – codehex note"]}),(0,re.jsx)("meta",{name:"description",content:k}),(0,re.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,re.jsx)("meta",{name:"twitter:site",content:"@codehex"}),(0,re.jsx)("meta",{name:"twitter:creator",content:"@codehex"}),(0,re.jsx)("meta",{name:"twitter:title",content:"".concat(j," – codehex note")}),(0,re.jsx)("meta",{name:"twitter:description",content:k}),(0,re.jsx)("meta",{name:"twitter:image:src",content:"https://codehex.dev".concat(h)}),(0,re.jsx)("meta",{property:"og:url",content:"https://codehex.dev".concat(i.pathname)}),(0,re.jsx)("meta",{property:"og:type",content:"article"}),(0,re.jsx)("meta",{property:"og:title",content:"".concat(j," – codehex note")}),(0,re.jsx)("meta",{property:"og:description",content:k}),(0,re.jsx)("meta",{property:"og:image",content:"https://codehex.dev".concat(h)}),(0,re.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})]}),(0,re.jsx)("main",{className:"w-full mx-auto max-w-3xl xl:max-w-5xl",children:(0,re.jsx)(se,{meta:b,components:c,children:d})}),(0,re.jsx)("footer",{className:"w-full mx-auto max-w-3xl xl:max-w-5xl",children:(0,re.jsx)("div",{className:"text-md font-medium leading-5 divide-y divide-gray-200",children:(0,re.jsx)("div",{className:"mx-8 sm:mx-10 md:mx-12 pb-24 lg:pb-16",children:(0,re.jsx)(f.default,{href:"/note",children:(0,re.jsx)("a",{className:"text-teal-500 hover:text-teal-600",children:"← Back to the note"})})})})})]})}},30051:function(a,b,c){"use strict";c.d(b,{s:function(){return j},V:function(){return k}});var d=c(27484),e=c.n(d),f=c(41664),g=c(84110),h=c.n(g),i=c(85893);e().extend(h());var j=function(a){var b=a.items;return(0,i.jsx)("ul",{className:"divide-y divide-gray-200",children:b.map(function(a){return(0,i.jsx)("li",{className:"py-4",children:(0,i.jsx)("div",{className:"mb-4 pt-4",children:(0,i.jsxs)("div",{className:"flex flex-col space-y-8",children:[(0,i.jsxs)("div",{className:"flex flex-col space-y-1",children:[(0,i.jsx)("div",{className:"pt-1.5 flex justify-between items-center",children:(0,i.jsx)(f.default,{href:a.href,children:(0,i.jsx)("a",{children:(0,i.jsx)("h2",{className:"text-2xl sm:text-3xl font-bold text-gray-900",children:a.title})})})}),(0,i.jsxs)("div",{className:"text-sm sm:text-base whitespace-nowrap text-gray-500",children:[(0,i.jsx)("div",{className:"sr-only",children:"Published on"}),(0,i.jsxs)("time",{dateTime:a.datetime,children:[e()(a.datetime).format("MMMM DD, YYYY")," (",e()(a.datetime).fromNow(),")"]})]}),(0,i.jsx)("div",{className:"flex space-x-2 py-2",children:a.tags.map(function(a){return(0,i.jsx)(k,{tag:a},a)})})]}),(0,i.jsxs)("div",{className:"flex flex-col space-y-6",children:[(0,i.jsx)("div",{className:"prose sm:prose-sm md:prose-md",children:(0,i.jsx)(a.Preview,{})}),(0,i.jsx)("div",{className:"flex text-base font-medium",children:(0,i.jsx)(f.default,{href:a.href,children:(0,i.jsx)("a",{className:"text-teal-600 hover:text-teal-700","aria-label":a.title,children:"Read more →"})})})]})]})})},a.href)})})},k=function(a){var b=a.tag;return(0,i.jsx)(f.default,{href:"/note/tags/".concat(b),children:(0,i.jsx)("a",{className:"inline-flex rounded-sm bg-blue-100 hover:bg-blue-600 px-2 py-0.5 text-sm",children:(0,i.jsxs)("span",{className:"font-medium text-blue-700 hover:text-white",children:["# ",b]})})})}},20891:function(a,b,c){"use strict";c.r(b),c.d(b,{"__N_SSG":function(){return i},meta:function(){return j}});var d=c(91),e=c(87462);c(67294);var f=c(3905),g=c(38327),h=["components"],i=!0,j={title:"Perl 5",description:"This is Perl 5 article",date:"2020-11-24T18:05:31+09:00",tags:["perl"]};function k(a){var b=a.components,c=(0,d.Z)(a,h);return(0,f.kt)(function(a){return(0,f.kt)(g.Z,(0,e.Z)({meta:j},a,{mdxType:"Note"}))},(0,e.Z)({components:b},c),(0,f.kt)("p",null,"これはコードブロックプレビュー"),(0,f.kt)("pre",null,(0,f.kt)("code",{className:"language-perl",parentName:"pre"},"print \"Hello, world\"\n")),(0,f.kt)("h2",{id:"perl-5-の記事"},(0,f.kt)("a",{href:"#perl-5-%E3%81%AE%E8%A8%98%E4%BA%8B","aria-hidden":"true",tabIndex:"-1",parentName:"h2"},(0,f.kt)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",parentName:"a"},(0,f.kt)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",parentName:"svg"}))),"Perl 5 の記事"))}k.isMDXComponent=!0,b.default=k},87754:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/note/hello",function(){return c(20891)}])},9008:function(a,b,c){a.exports=c(72717)},11163:function(a,b,c){a.exports=c(69898)},87462:function(a,b,c){"use strict";function d(){return(d=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a}).apply(this,arguments)}c.d(b,{Z:function(){return d}})},91:function(a,b,c){"use strict";function d(a,b){if(null==a)return{};var c,d,e=function(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],b.indexOf(c)>=0||(e[c]=a[c]);return e}(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],b.indexOf(c)>=0||Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}c.d(b,{Z:function(){return d}})}},function(a){a.O(0,[541,774,888,179],function(){return a(a.s=87754)}),_N_E=a.O()}])