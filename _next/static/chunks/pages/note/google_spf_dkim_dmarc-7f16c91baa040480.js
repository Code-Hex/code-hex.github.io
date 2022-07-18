(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[52],{8915:function(e,n,r){"use strict";r.r(n),r.d(n,{__N_SSG:function(){return a},meta:function(){return l}});var s=r(85893),o=r(48463),a=!0,l={title:"\u53d6\u5f97\u3057\u305f\u30c9\u30e1\u30a4\u30f3\u3067\u9001\u4fe1\u3059\u308b\u30e1\u30fc\u30eb\u306e\u4fe1\u983c\u6027\u3092\u4e0a\u3052\u308b\u65b9\u6cd5",description:"Terraform \u3067\u69cb\u6210\u3055\u308c\u305f Cloud DNS \u3092\u4f8b\u306b\u3001SPF\u3001DKIM\u3001DMARC \u3092\u3069\u306e\u3088\u3046\u306b\u8a2d\u5b9a\u3059\u308b\u3053\u3068\u3067\u30e1\u30fc\u30eb\u306e\u4fe1\u983c\u6027\u3092\u5411\u4e0a\u3055\u305b\u308b\u304b\u7d39\u4ecb\u3057\u305f\u3002",date:"2021-12-19T22:56:58+09:00",tags:["terraform","gcp","email"]},d=function(e){return(0,s.jsx)(o.ZP,Object.assign({meta:l},e))};n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return d?(0,s.jsx)(d,Object.assign({},e,{children:(0,s.jsx)(n,{})})):n();function n(){var n=Object.assign({p:"p",ol:"ol",li:"li",pre:"pre",code:"code",img:"img",h2:"h2",a:"a",svg:"svg",path:"path",sup:"sup",ul:"ul",h3:"h3",blockquote:"blockquote",section:"section"},e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"\u30c9\u30e1\u30a4\u30f3\u3092\u53d6\u5f97\u5f8c\u306b\u305d\u308c\u3092\u4f7f\u3063\u305f\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3067\u9001\u4fe1\u3067\u304d\u308b\u3088\u3046\u306b\u306a\u3063\u305f\u304c\u3001\u53d7\u4fe1\u5148\u3067\u305d\u306e\u30e1\u30fc\u30eb\u304c\u8ff7\u60d1\u30d5\u30a9\u30eb\u30c0\u3078\u5206\u985e\u3055\u308c\u308b\u3053\u3068\u304c\u3042\u308b\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u4f1a\u793e\u3067\u306f Google Domain \u3067\u30c9\u30e1\u30a4\u30f3\u3092\u53d6\u5f97\u5f8c\u3001Google Workspace \u3092\u5229\u7528\u3057\u3066\u30e1\u30fc\u30eb\u3092\u9001\u4fe1\u3067\u304d\u308b\u3088\u3046\u306b\u306a\u3063\u305f\u3002DNS \u306e\u7ba1\u7406\u306f Cloud DNS \u3092\u5229\u7528\u3057\u3066\u3044\u3066\u3001\u305d\u306e\u8a2d\u5b9a\u306f Terraform \u3092\u7528\u3044\u3066\u7ba1\u7406\u3057\u3066\u3044\u308b\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u5f53\u521d\u306e\u8a2d\u5b9a\u306f\u30b7\u30f3\u30d7\u30eb\u306a\u3082\u306e\u3067\u3042\u3063\u305f\u3002"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"DNS \u30be\u30fc\u30f3\u3092\u8a2d\u5b9a"}),"\n",(0,s.jsx)(n.li,{children:"\u8a2d\u5b9a\u3057\u305f\u30be\u30fc\u30f3\u306b\u5bfe\u3057\u3066 MX \u30ec\u30b3\u30fc\u30c9\u3092\u8a2d\u5b9a"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-hcl",children:'resource "google_dns_managed_zone" "example_com_domain" {\n  name     = "example-com"\n  dns_name = "example.com."\n}\n\n# https://support.google.com/a/answer/9222085\nresource "google_dns_record_set" "example_com_email" {\n  name         = google_dns_managed_zone.example_com_domain.dns_name\n  type         = "MX"\n  ttl          = 300\n  managed_zone = google_dns_managed_zone.example_com_domain.name\n  rrdatas = [\n    "1 aspmx.l.google.com.",\n    "5 alt1.aspmx.l.google.com.",\n    "5 alt2.aspmx.l.google.com.",\n    "10 alt3.aspmx.l.google.com.",\n    "10 alt4.aspmx.l.google.com.",\n  ]\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"\u3053\u308c\u3060\u3051\u3067\u53d6\u5f97\u3057\u305f\u30c9\u30e1\u30a4\u30f3\u3092\u5229\u7528\u3057\u305f\u30a2\u30c9\u30ec\u30b9\u3067\u30e1\u30fc\u30eb\u306e\u9001\u4fe1\u304c\u3067\u304d\u308b\u3002\u3057\u304b\u3057\u53d7\u4fe1\u5148\u306e Gmail \u4e0a\u3067\u306f\u6b21\u306e\u3088\u3046\u306a\u8b66\u544a\u304c\u8868\u793a\u3055\u308c\u3066\u3044\u305f\u3002"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://user-images.githubusercontent.com/6500104/146682538-4be73b57-f202-4ad7-a47c-8316388e9149.png",alt:"146682538-4be73b57-f202-4ad7-a47c-8316388e9149.png"})}),"\n",(0,s.jsx)(n.p,{children:"\u3053\u308c\u306f Gmail \u5074\u3067\u884c\u308f\u308c\u308b\u8a8d\u8a3c\u30ed\u30b8\u30c3\u30af\u306b\u3088\u3063\u3066\u3001\u30c9\u30e1\u30a4\u30f3\u3092\u53d6\u5f97\u3057\u305f\u672c\u4eba\uff08\u3082\u3057\u304f\u306f\u6cd5\u4eba\uff09\u304b\u3089\u9001\u4fe1\u3055\u308c\u3066\u3044\u308b\u30e1\u30fc\u30eb\u304b\u3069\u3046\u304b\u5224\u65ad\u3067\u304d\u306a\u304b\u3063\u305f\u5834\u5408\u306b\u8868\u793a\u3055\u308c\u308b\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u672c\u8a18\u4e8b\u3067\u306f Terraform \u3067\u7ba1\u7406\u3055\u308c\u305f Cloud DNS \u3092\u4f8b\u306b\u30e1\u30fc\u30eb\u306e\u4fe1\u983c\u6027\u3092\u3069\u3046\u5411\u4e0a\u3055\u305b\u305f\u306e\u304b\u3092\u7d39\u4ecb\u3057\u3066\u3044\u304f\u3002"}),"\n",(0,s.jsxs)(n.h2,{id:"spf\u3001dkim\u3001dmarc-\u3092\u8a2d\u5b9a\u3059\u308b",children:[(0,s.jsx)(n.a,{href:"#spf%E3%80%81dkim%E3%80%81dmarc-%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B","aria-hidden":"true",tabIndex:"-1",children:(0,s.jsx)(n.svg,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",children:(0,s.jsx)(n.path,{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"})})}),"SPF\u3001DKIM\u3001DMARC \u3092\u8a2d\u5b9a\u3059\u308b"]}),"\n",(0,s.jsxs)(n.p,{children:["\u524d\u8ff0\u3057\u305f\u554f\u984c\u3092\u56de\u907f\u3059\u308b\u305f\u3081\u306b Google \u306e\u30b5\u30dd\u30fc\u30c8\u3067\u306f SPF\u3001DKIM\u3001DMARC \u306e\u8a2d\u5b9a\u3092\u63a8\u5968\u3057\u3066\u3044\u308b",(0,s.jsx)(n.sup,{children:(0,s.jsx)(n.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"1"})}),"\u3002"]}),"\n",(0,s.jsx)(n.p,{children:"\u8a2d\u5b9a\u65b9\u6cd5\u3092\u7d39\u4ecb\u3059\u308b\u524d\u306b\u3053\u308c\u3089\u304c\u4f55\u304b\u7c21\u5358\u306b\u7d39\u4ecb\u3059\u308b\u3002"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["SPF (Sender Policy Framework)","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u7279\u5b9a\u306e\u30c9\u30e1\u30a4\u30f3\u540d\u306e\u4f7f\u7528\u3092\u3001\u8a31\u53ef\u3055\u308c\u3066\u3044\u308b\u30db\u30b9\u30c8\u306e\u30ea\u30b9\u30c8\u3092\u63d0\u4f9b\u3059\u308b\u305f\u3081\u306b\u4f7f\u7528\u3055\u308c\u308b"}),"\n",(0,s.jsx)(n.li,{children:"\u53d7\u4fe1\u5074\u306f\u3053\u306e\u60c5\u5831\u3092\u4f7f\u3063\u3066\u3001\u8a50\u79f0\u3055\u308c\u3066\u3044\u306a\u3044\u304b\u3092\u691c\u67fb\u3067\u304d\u308b"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["DKIM (Domain Keys Identified Mail)","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u30e1\u30fc\u30eb\u3092\u9001\u4fe1\u3059\u308b\u969b\u306b\u9001\u4fe1\u5143\u304c\u96fb\u5b50\u7f72\u540d\u3092\u884c\u3044\u3001\u53d7\u4fe1\u8005\u304c\u305d\u308c\u3092\u691c\u8a3c\u3059\u308b\u3053\u3068\u3067\u9001\u4fe1\u8005\u306e\u306a\u308a\u3059\u307e\u3057\u3084\u30e1\u30fc\u30eb\u306e\u6539\u3056\u3093\u3092\u691c\u77e5\u3067\u304d\u308b\u3088\u3046\u306b\u3059\u308b"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["DMARC (Domain-based Message Authentication, Reporting, and Conformance)","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"SPF \u3068 DKIM \u3092\u5229\u7528\u3057\u3066\u8a8d\u8a3c\u306b\u5931\u6557\u3057\u305f\u30e1\u30fc\u30eb\u3092\u3069\u3046\u6271\u3046\u304b\u306f\u53d7\u4fe1\u5074\u306b\u4efb\u3055\u308c\u3066\u3044\u308b"}),"\n",(0,s.jsx)(n.li,{children:"\u9001\u4fe1\u8005\u304c\u53d7\u4fe1\u8005\u306b\u5bfe\u3057\u3066\u3001\u8a8d\u8a3c\u306b\u5931\u6557\u3057\u305f\u30e1\u30fc\u30eb\u3092\u3069\u3046\u6271\u3063\u3066\u6b32\u3057\u3044\u304b\u6307\u793a\u304c\u53ef\u80fd"}),"\n",(0,s.jsx)(n.li,{children:"\u53d7\u4fe1\u8005\u304b\u3089\u9001\u4fe1\u8005\u306b\u5bfe\u3057\u3066\u8a8d\u8a3c\u306b\u5931\u6557\u3057\u305f\u3053\u3068\u3092\u901a\u77e5\u3059\u308b\u30ec\u30dd\u30fc\u30c8\u3082\u9001\u4fe1\u53ef\u80fd"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"DNS \u30ec\u30b3\u30fc\u30c9\u306b SPF \u3067\u3042\u308c\u3070\u30db\u30b9\u30c8\u3084 IP \u306a\u3069\u306e\u30ea\u30b9\u30c8\u3092\u3001DKIM \u3060\u3068\u691c\u8a3c\u306b\u5fc5\u8981\u306a\u516c\u958b\u9375\u3092\u8a18\u9332\u3059\u308b\u3053\u3068\u3067\u8a8d\u8a3c\u304c\u6a5f\u80fd\u3059\u308b\u3002DMARC \u306f\u30dd\u30ea\u30b7\u30fc\u3092\u516c\u958b\u3059\u308b\u3053\u3068\u3067\u53d7\u4fe1\u8005\u3078\u8a8d\u8a3c\u306b\u5931\u6557\u3057\u305f\u30e1\u30fc\u30eb\u3092\u3069\u3046\u3059\u308b\u304b\u6307\u793a\u3092\u884c\u3048\u308b\u3002"}),"\n",(0,s.jsxs)(n.h3,{id:"spf-\u3068-dkim-\u3092\u8a2d\u5b9a\u3059\u308b",children:[(0,s.jsx)(n.a,{href:"#spf-%E3%81%A8-dkim-%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B","aria-hidden":"true",tabIndex:"-1",children:(0,s.jsx)(n.svg,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",children:(0,s.jsx)(n.path,{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"})})}),"SPF \u3068 DKIM \u3092\u8a2d\u5b9a\u3059\u308b"]}),"\n",(0,s.jsx)(n.p,{children:"Google \u30b5\u30dd\u30fc\u30c8\u3067\u6848\u5185\u3055\u308c\u3066\u3044\u308b\u65b9\u6cd5\u306b\u5f93\u3063\u3066\u3001\u307e\u305a\u306f Terraform \u306b SPF \u3068 DKIM \u306e\u8a2d\u5b9a\u306e\u307f\u8a18\u8ff0\u3059\u308b\u3002DMARC \u306f\u3053\u308c\u3089\u306e\u8a2d\u5b9a\u304c\u53cd\u6620\u3055\u308c\u305f\u5f8c\u306b\u8a2d\u5b9a\u3059\u308b\u3002"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-hcl",children:'# https://support.google.com/a/answer/10684623\n# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/dns_record_set#adding-an-spf-record\nresource "google_dns_record_set" "example_com_email_spf" {\n  name         = google_dns_managed_zone.example_com_domain.dns_name\n  type         = "TXT"\n  ttl          = 300\n  managed_zone = google_dns_managed_zone.example_com_domain.name\n  rrdatas = [\n    "\\"v=spf1 include:_spf.google.com ~all\\"",\n  ]\n}\n\n# https://support.google.com/a/answer/174124\nresource "google_dns_record_set" "example_com_email_dkim" {\n  name         = "google._domainkey.${google_dns_managed_zone.example_com_domain.dns_name}"\n  type         = "TXT"\n  ttl          = 300\n  managed_zone = google_dns_managed_zone.example_com_domain.name\n  rrdatas = [\n    "\\"v=DKIM1; k=rsa; p=<DKIM-KEY>\\"",\n  ]\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"DKIM \u306e\u5024\u306f Google Workspace \u306e\u7ba1\u7406\u30b3\u30f3\u30bd\u30fc\u30eb\u306b\u30a2\u30af\u30bb\u30b9\u3057\u3001[\u30a2\u30d7\u30ea] > [Google Workspace] > [Gmail] \u3092\u9078\u629e\u3057\u3066 [\u30e1\u30fc\u30eb\u306e\u8a8d\u8a3c] \u304b\u3089\u53d6\u5f97\u3059\u308b\u3053\u3068\u304c\u3067\u304d\u308b\u3002"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://user-images.githubusercontent.com/6500104/146678437-00ae1693-104f-48ef-ac1d-94b29301e5ee.png",alt:"146678437-00ae1693-104f-48ef-ac1d-94b29301e5ee.png"})}),"\n",(0,s.jsx)(n.p,{children:"\u753b\u50cf\u304b\u3089\u5206\u304b\u308b\u3088\u3046\u306b DKIM \u306e\u5024\uff08\u9752\u304f\u9078\u629e\u3055\u308c\u3066\u3044\u308b\u7b87\u6240\uff09\u306f\u3068\u3066\u3082\u9577\u3044\u6587\u5b57\u5217\u306b\u306a\u308b\u3002\u3053\u308c\u306f 255 \u6587\u5b57\u3092\u8d85\u3048\u308b\u9577\u3055\u306b\u306a\u308b\u3002\u3053\u306e\u9577\u3055\u306e\u5024\u3092\u305d\u306e\u307e\u307e TXT \u30ec\u30b3\u30fc\u30c9\u3078\u53cd\u6620\u3057\u3088\u3046\u3068\u3059\u308b\u3068\u5931\u6557\u3059\u308b\u3002"}),"\n",(0,s.jsxs)(n.p,{children:["\u56de\u907f\u7b56\u3068\u3057\u3066 Terraform Google Provider \u306e ",(0,s.jsx)(n.a,{href:"https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/dns_record_set#rrdatas",children:"dns_record_set (rrdatas) \u306e\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8"})," \u306b ",(0,s.jsx)(n.code,{children:'\\" \\"'})," \u3092\u4f7f\u7528\u3059\u308b\u3053\u3068\u304c\u8a18\u8ff0\u3055\u308c\u3066\u3044\u308b\u3002"]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:'To specify a single record value longer than 255 characters such as a TXT record for DKIM, add " " inside the Terraform configuration string (e.g. "first255characters" "morecharacters").'}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"\u7b46\u8005\u306f 255 \u6587\u5b57\u76ee\u3067\u533a\u5207\u308c\u308b\u3088\u3046\u306a\u6b21\u306e\u30ef\u30f3\u30e9\u30a4\u30ca\u30fc\u3092\u6d3b\u7528\u3057\u305f\u3002"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:'$ pbpaste | perl -ne \'my @a = $_ =~ /.{255}|.+/g; print join "\\\\\\" \\\\\\"", @a;\' | pbcopy'})}),"\n",(0,s.jsx)(n.p,{children:"\u3053\u306e\u30ef\u30f3\u30e9\u30a4\u30ca\u30fc\u306f DKIM \u306e\u5024\u3092\u7ba1\u7406\u30b3\u30f3\u30bd\u30fc\u30eb\u3067\u30b3\u30d4\u30fc\u3057\u305f\u5f8c\u306b\u5b9f\u884c\u3059\u308b\u3002\u3059\u308b\u3068\u30af\u30ea\u30c3\u30d7\u30dc\u30fc\u30c9\u306e\u4e2d\u8eab\u306f 255 \u6587\u5b57\u76ee\u3067\u533a\u5207\u3089\u308c\u305f\u72b6\u614b\u3078\u66f4\u65b0\u3055\u308c\u308b\u3002\u3042\u3068\u306f rrdatas \u3078\u30da\u30fc\u30b9\u30c8\u3059\u308c\u3070\u826f\u3044\u3002"}),"\n",(0,s.jsx)(n.p,{children:"apply \u304c\u5b8c\u4e86\u3057\u3001\u53cd\u6620\u3055\u308c\u305f\u3089\u6b21\u306f DMARC \u306e\u8a2d\u5b9a\u3092\u8a18\u8ff0\u3059\u308b\u3002"}),"\n",(0,s.jsxs)(n.h3,{id:"dmarc-\u3092\u8a2d\u5b9a\u3059\u308b",children:[(0,s.jsx)(n.a,{href:"#dmarc-%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B","aria-hidden":"true",tabIndex:"-1",children:(0,s.jsx)(n.svg,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",children:(0,s.jsx)(n.path,{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"})})}),"DMARC \u3092\u8a2d\u5b9a\u3059\u308b"]}),"\n",(0,s.jsx)(n.p,{children:"Terraform \u306e\u8a18\u8ff0\u306f\u30b7\u30f3\u30d7\u30eb\u306b\u306a\u308b\u3002"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-hcl",children:'# https://support.google.com/a/answer/2466563\nresource "google_dns_record_set" "example_com_email_dmarc" {\n  name         = "_dmarc.${google_dns_managed_zone.example_com_domain.dns_name}"\n  type         = "TXT"\n  ttl          = 300\n  managed_zone = google_dns_managed_zone.example_com_domain.name\n  rrdatas      = ["\\"v=DMARC1; p=reject; rua=mailto:dmarc@example.com\\""]\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["DMARC \u306e\u5024\u306f ",(0,s.jsx)(n.code,{children:"v"})," ",(0,s.jsx)(n.code,{children:"p"})," \u30bf\u30b0\u304c\u5fc5\u9808\u306b\u306a\u308b\u3002\u3053\u3053\u3067\u306f ",(0,s.jsx)(n.code,{children:"p"})," \u30bf\u30b0\u306b\u3064\u3044\u3066\u89e6\u308c\u3066\u304a\u304d\u305f\u3044\u3002"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"p"})," \u30bf\u30b0\u3067\u306f\u53d7\u4fe1\u3057\u305f\u30e1\u30fc\u30eb\u304c\u8a8d\u8a3c\u3067\u304d\u306a\u304b\u3063\u305f\u5834\u5408\u3001\u305d\u306e\u30e1\u30fc\u30eb\u3092\u3069\u3046\u51e6\u7406\u3059\u308b\u304b\u6307\u793a\u3067\u304d\u308b\u3002\u6307\u5b9a\u3067\u304d\u308b\u5024\u306f ",(0,s.jsx)(n.code,{children:"none"})," ",(0,s.jsx)(n.code,{children:"quarantine"})," ",(0,s.jsx)(n.code,{children:"reject"})," \u306e\u3044\u305a\u308c\u304b\u3067\u3042\u308b\u3002"]}),"\n",(0,s.jsxs)(n.p,{children:["\u7b46\u8005\u3068\u3057\u3066 DMARC \u3092\u5c0e\u5165\u3059\u308b\u306e\u3067\u3042\u308c\u3070 ",(0,s.jsx)(n.code,{children:"none"})," \u306f\u7d76\u5bfe\u306b\u907f\u3051\u308b\u3079\u304d\u3060\u3068\u8003\u3048\u308b\u3002\u306a\u305c\u306a\u3089\u8a8d\u8a3c\u306b\u5931\u6557\u3057\u305f\u30e1\u30fc\u30eb\u3092\u81ea\u52d5\u7684\u306b\u4e0d\u6b63\u306a\u30e1\u30fc\u30eb\u3001\u3082\u3057\u304f\u306f\u8ff7\u60d1\u30e1\u30fc\u30eb\u3068\u3057\u3066\u51e6\u7406\u3057\u306a\u3044\u304b\u3089\u3067\u3042\u308b\u3002\u51e6\u7406\u3055\u308c\u306a\u3044\u5834\u5408\u3001\u305d\u306e\u30e1\u30fc\u30eb\u306f\u30e1\u30a4\u30f3\u306e\u53d7\u4fe1\u30c8\u30ec\u30a4\u3078\u4fdd\u5b58\u3055\u308c\u308b\u3053\u3068\u306b\u306a\u308b\u3002\u4e00\u822c\u7684\u306a\u53d7\u4fe1\u8005\u306b\u3068\u3063\u3066\u3001\u30e1\u30fc\u30eb\u304c\u672c\u5f53\u306b\u4fe1\u983c\u3057\u3066\u3044\u308b\u7d44\u7e54\u304b\u3089\u9001\u3089\u308c\u3066\u304d\u3066\u3044\u308b\u304b\u3069\u3046\u304b\u3092\u958b\u5c01\u3057\u305f\u3068\u304d\u306b\u5224\u65ad\u3059\u308b\u3053\u3068\u304c\u96e3\u3057\u3044\u3002\u3064\u307e\u308a\u653b\u6483\u8005\u304c\u7d44\u7e54\u3092\u88c5\u3063\u3066\u9001\u4fe1\u3057\u305f\u30e1\u30fc\u30eb\u306b\u3088\u3063\u3066\u3001\u53d7\u4fe1\u8005\u306e\u500b\u4eba\u60c5\u5831\u304c\u6d41\u51fa\u3059\u308b\u306a\u3069\u306e\u30a4\u30f3\u30b7\u30c7\u30f3\u30c8\u304c\u5bb9\u6613\u306b\u767a\u751f\u3059\u308b\u3053\u3068\u304c\u60f3\u5b9a\u3067\u304d\u308b\u3002"]}),"\n",(0,s.jsxs)(n.p,{children:["\u4f1a\u793e\u3067\u306f ",(0,s.jsx)(n.code,{children:"reject"})," \u3092\u5229\u7528\u3059\u308b\u9078\u629e\u3092\u3057\u305f\u3002\u3061\u306a\u307f\u306b Microsoft \u3084 Gmail \u306f\u65e2\u306b ",(0,s.jsx)(n.code,{children:"reject"})," \u3092\u5229\u7528\u3057\u3066\u3044\u308b",(0,s.jsx)(n.sup,{children:(0,s.jsx)(n.a,{href:"#user-content-fn-2",id:"user-content-fnref-2","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"2"})}),"\u3002"]}),"\n",(0,s.jsx)(n.p,{children:"apply \u5b8c\u4e86\u5f8c\u3001\u30e1\u30fc\u30eb\u3092\u9001\u4fe1\u3057\u3066\u30c6\u30b9\u30c8\u3057\u3066\u307f\u308b\u3068\u8b66\u544a\u304c\u8868\u793a\u3055\u308c\u306a\u3044\u3002\u3053\u308c\u3067\u4fe1\u983c\u5ea6\u3092\u4e0a\u3052\u308b\u305f\u3081\u306b\u5fc5\u8981\u306a\u8a2d\u5b9a\u306f\u7d42\u308f\u308a\u3067\u3042\u308b\u3002"}),"\n",(0,s.jsxs)(n.h2,{id:"\u6700\u5f8c\u306b",children:[(0,s.jsx)(n.a,{href:"#%E6%9C%80%E5%BE%8C%E3%81%AB","aria-hidden":"true",tabIndex:"-1",children:(0,s.jsx)(n.svg,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",children:(0,s.jsx)(n.path,{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"})})}),"\u6700\u5f8c\u306b"]}),"\n",(0,s.jsx)(n.p,{children:"\u3053\u308c\u3089\u306e\u6280\u8853\u306f\u5168\u3066 DNS \u3092\u4fe1\u983c\u3059\u308b\u524d\u63d0\u3067\u6210\u308a\u7acb\u3063\u3066\u3044\u308b\u3002\u4f8b\u3048\u3070\u4e2d\u9593\u8005\u653b\u6483\u306b\u3088\u3063\u3066 DNS \u306e\u5fdc\u7b54\u3092\u5909\u66f4\u3067\u304d\u308b\u5834\u5408\u4e0a\u8a18\u3067\u6319\u3052\u305f\u5185\u5bb9\u3092\u5b8c\u5168\u306b\u691c\u8a3c\u3059\u308b\u3053\u3068\u306f\u4e0d\u53ef\u80fd\u306b\u306a\u308b\u3002\u3053\u306e\u3088\u3046\u306a\u6539\u3056\u3093\u3092\u9632\u3050\u305f\u3081\u306b DNSSEC \u3092\u5229\u7528\u3059\u308b\u3002(HTTPS \u3092\u306a\u305c\u5229\u7528\u3059\u308b\u306e\u304b\u77e5\u3063\u3066\u3044\u308b\u3068\u30a4\u30e1\u30fc\u30b8\u304c\u3064\u304d\u3084\u3059\u3044)"}),"\n",(0,s.jsxs)(n.p,{children:["Cloud DNS \u306e\u5834\u5408 Terraform \u3067\u7ba1\u7406\u3055\u308c\u3066\u3044\u308c\u3070 ",(0,s.jsx)(n.a,{href:"https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/dns_managed_zone#nested_dnssec_config",children:"dnssec_config"})," \u3092\u8a18\u8ff0\u3057 state \u3092 ",(0,s.jsx)(n.code,{children:"on"})," \u3078\u8a2d\u5b9a\u3059\u308c\u3070\u6709\u52b9\u306b\u306a\u308b\u3002"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-diff-hcl",children:'resource "google_dns_managed_zone" "example_com_domain" {\n  name     = "example-com"\n  dns_name = "example.com."\n+ dnssec_config {\n+   kind          = "dns#managedZoneDnsSecConfig"\n+   non_existence = "nsec3"\n+   state         = "on"\n+ }\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"apply \u5f8c\u3001\u30c9\u30e1\u30a4\u30f3\u3092\u53d6\u5f97\u3057\u305f\u30d7\u30ed\u30d0\u30a4\u30c0\u3067 DNSSEC \u306e DS \u30ec\u30b3\u30fc\u30c9\u3092\u4fdd\u5b58\u3059\u308b\u5fc5\u8981\u304c\u3042\u308b\u3002\u4fdd\u5b58\u3059\u3079\u304d\u30ec\u30b3\u30fc\u30c9\u306e\u5024\u306f Cloud DNS \u3060\u3068 gcloud \u30b3\u30de\u30f3\u30c9\u3092\u5229\u7528\u3057\u3066\u53d6\u5f97\u3067\u304d\u308b\u3002"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:'gcloud dns dns-keys describe 0 --zone <ZONE> --format "value(ds_record())"'})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://cloud.google.com/dns/docs/dnssec-advanced#spf-dkim-dmarc",children:"Google Cloud \u306e\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8\uff08\u9ad8\u5ea6\u306a DNSSEC \u3092\u4f7f\u7528\u3059\u308b\uff09"})," \u3067\u306f\u3001\u672c\u8a18\u4e8b\u3067\u7d39\u4ecb\u3057\u305f\u8a2d\u5b9a\u304c\u6b63\u3057\u304f\u69cb\u6210\u3055\u308c\u3066\u3044\u308b\u3053\u3068\u3092\u78ba\u8a8d\u3059\u308b\u305f\u3081\u306b ",(0,s.jsx)(n.a,{href:"https://en.internet.nl/",children:"https://en.internet.nl/"})," \u3092\u5229\u7528\u3059\u308b\u3053\u3068\u3092\u63a8\u5968\u3057\u3066\u3044\u308b\u3002"]}),"\n",(0,s.jsxs)(n.p,{children:["\u672c\u8a18\u4e8b\u3067\u306f Terraform \u3067\u7ba1\u7406\u3055\u308c\u305f Cloud DNS \u3092\u4f8b\u306b\u3001\u9001\u4fe1\u5143\u306e\u96fb\u5b50\u30e1\u30fc\u30eb\u306e\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u3092\u3069\u3046\u5411\u4e0a\u3055\u305b\u308b\u304b\u7d39\u4ecb\u3057\u305f\u3002\u8a18\u8ff0\u306b\u9593\u9055\u3044\u3084\u4fee\u6b63\u3059\u3079\u304d\u70b9\u304c\u3042\u308c\u3070 ",(0,s.jsx)(n.a,{href:"https://twitter.com/codehex",children:"@codehex"})," \u307e\u3067\u77e5\u3089\u305b\u3066\u307b\u3057\u3044\u3002"]}),"\n",(0,s.jsxs)(n.h2,{id:"\u53c2\u8003",children:[(0,s.jsx)(n.a,{href:"#%E5%8F%82%E8%80%83","aria-hidden":"true",tabIndex:"-1",children:(0,s.jsx)(n.svg,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",children:(0,s.jsx)(n.path,{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"})})}),"\u53c2\u8003"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://www.praetorian.com/blog/email-security/",children:"Email Security (SPF, DKIM, and DMARC)"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"SPF\u3001DKIM\u3001DMARC \u306b\u3064\u3044\u3066\u8a73\u3057\u304f\u8aac\u660e\u3055\u308c\u3066\u3044\u308b"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://dmarc.org/wiki/FAQ",children:"https://dmarc.org/wiki/FAQ"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"DMARC \u306b\u95a2\u3059\u308b\u4e00\u822c\u7684\u306a FAQ \u304c\u307e\u3068\u3081\u3089\u308c\u3066\u3044\u308b"}),"\n"]}),"\n"]}),"\n"]}),"\n","\n",(0,s.jsxs)(n.section,{"data-footnotes":!0,className:"footnotes",children:[(0,s.jsx)(n.h2,{id:"footnote-label",className:"sr-only",children:"Footnotes"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{id:"user-content-fn-1",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://support.google.com/a/answer/10583557",children:"\u8ff7\u60d1\u30e1\u30fc\u30eb\u3001\u306a\u308a\u3059\u307e\u3057\u3001\u30d5\u30a3\u30c3\u30b7\u30f3\u30b0\u3092 Gmail \u8a8d\u8a3c\u3067\u9632\u6b62\u3059\u308b"})," ",(0,s.jsx)(n.a,{href:"#user-content-fnref-1","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content",children:"\u21a9"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{id:"user-content-fn-2",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://sendgrid.kke.co.jp/blog/?p=5384",children:"Gmail/Microsoft\u306eDMARC\u8a2d\u5b9a\u304c\u5e74\u5185\u306b\u5909\u66f4\u3055\u308c\u307e\u3059"})," ",(0,s.jsx)(n.a,{href:"#user-content-fnref-2","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content",children:"\u21a9"})]}),"\n"]}),"\n"]}),"\n"]})]})}}},5054:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/note/google_spf_dkim_dmarc",function(){return r(8915)}])}},function(e){e.O(0,[186,55,463,774,888,179],(function(){return n=5054,e(e.s=n);var n}));var n=e.O();_N_E=n}]);