const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/about-feature-BdiOS_w8.js","assets/index-CV6V5HGt.js","assets/index-CefNqneL.css","assets/card-DIWT9mvj.js","assets/utils-BQHNewu7.js","assets/vector-feature-B-m2akbj.js","assets/solana-ui-address-Dz2wKyUx.js","assets/theme-provider-1LJZmV8Q.js","assets/solana-ui-wallet-dialog-BzMWyE_y.js","assets/loader-circle-CwkTxBzD.js","assets/wallet-feature-CO9gHu1D.js","assets/use-wallet-balance-query-D0E5fIfm.js","assets/shell-not-found-feature-CUuZuMBv.js"])))=>i.map(i=>d[i]);
import{r as X,j as N,S as bn,a as En,_ as oe,g as Cn}from"./index-CV6V5HGt.js";import{e as vn,a as An,b as _n,c as Rn,S as Ht,M as Sn,n as k,m as $e,d as q,h as Kt,Q as Ln,f as et,g as Mn,o as tt,r as nt,i as Tn,j as rt,p as at,s as In,R as xn,k as On,l as Pn,N as Nn,T as kn,q as Dn,t as je,u as Qe,v as Wt,w as Vt,x as jt,y as j,z as Q,W as Bn,A as Un,B as Fn,C as zn,D as qn,E as Hn,F as Kn}from"./theme-provider-1LJZmV8Q.js";import{c as pe,L as Wn}from"./loader-circle-CwkTxBzD.js";function it(e){return{onFetch:(t,n)=>{const r=t.options,a=t.fetchOptions?.meta?.fetchMore?.direction,i=t.state.data?.pages||[],o=t.state.data?.pageParams||[];let s={pages:[],pageParams:[]},l=0;const c=async()=>{let u=!1;const E=g=>{Rn(g,()=>t.signal,()=>u=!0)},y=vn(t.options,t.fetchOptions),d=async(g,m,M)=>{if(u)return Promise.reject();if(m==null&&g.pages.length)return Promise.resolve(g);const A=(()=>{const p={client:t.client,queryKey:t.queryKey,pageParam:m,direction:M?"backward":"forward",meta:t.options.meta};return E(p),p})(),v=await y(A),{maxPages:b}=t.options,I=M?An:_n;return{pages:I(g.pages,v,b),pageParams:I(g.pageParams,m,b)}};if(a&&i.length){const g=a==="backward",m=g?Vn:ot,M={pages:i,pageParams:o},C=m(r,M);s=await d(M,C,g)}else{const g=e??i.length;do{const m=l===0?o[0]??r.initialPageParam:ot(r,s);if(l>0&&m==null)break;s=await d(s,m),l++}while(l<g)}return s};t.options.persister?t.fetchFn=()=>t.options.persister?.(c,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},n):t.fetchFn=c}}}function ot(e,{pages:t,pageParams:n}){const r=t.length-1;return t.length>0?e.getNextPageParam(t[r],t,n[r],n):void 0}function Vn(e,{pages:t,pageParams:n}){return t.length>0?e.getPreviousPageParam?.(t[0],t,n[0],n):void 0}var jn=class extends Ht{constructor(e={}){super(),this.config=e,this.#e=new Set,this.#n=new Map,this.#r=0}#e;#n;#r;build(e,t,n){const r=new Sn({client:e,mutationCache:this,mutationId:++this.#r,options:e.defaultMutationOptions(t),state:n});return this.add(r),r}add(e){this.#e.add(e);const t=se(e);if(typeof t=="string"){const n=this.#n.get(t);n?n.push(e):this.#n.set(t,[e])}this.notify({type:"added",mutation:e})}remove(e){if(this.#e.delete(e)){const t=se(e);if(typeof t=="string"){const n=this.#n.get(t);if(n)if(n.length>1){const r=n.indexOf(e);r!==-1&&n.splice(r,1)}else n[0]===e&&this.#n.delete(t)}}this.notify({type:"removed",mutation:e})}canRun(e){const t=se(e);if(typeof t=="string"){const r=this.#n.get(t)?.find(a=>a.state.status==="pending");return!r||r===e}else return!0}runNext(e){const t=se(e);return typeof t=="string"?this.#n.get(t)?.find(r=>r!==e&&r.state.isPaused)?.continue()??Promise.resolve():Promise.resolve()}clear(){k.batch(()=>{this.#e.forEach(e=>{this.notify({type:"removed",mutation:e})}),this.#e.clear(),this.#n.clear()})}getAll(){return Array.from(this.#e)}find(e){const t={exact:!0,...e};return this.getAll().find(n=>$e(t,n))}findAll(e={}){return this.getAll().filter(t=>$e(e,t))}notify(e){k.batch(()=>{this.listeners.forEach(t=>{t(e)})})}resumePausedMutations(){const e=this.getAll().filter(t=>t.state.isPaused);return k.batch(()=>Promise.all(e.map(t=>t.continue().catch(q))))}};function se(e){return e.options.scope?.id}var Qn=class extends Ht{constructor(e={}){super(),this.config=e,this.#e=new Map}#e;build(e,t,n){const r=t.queryKey,a=t.queryHash??Kt(r,t);let i=this.get(a);return i||(i=new Ln({client:e,queryKey:r,queryHash:a,options:e.defaultQueryOptions(t),state:n,defaultOptions:e.getQueryDefaults(r)}),this.add(i)),i}add(e){this.#e.has(e.queryHash)||(this.#e.set(e.queryHash,e),this.notify({type:"added",query:e}))}remove(e){const t=this.#e.get(e.queryHash);t&&(e.destroy(),t===e&&this.#e.delete(e.queryHash),this.notify({type:"removed",query:e}))}clear(){k.batch(()=>{this.getAll().forEach(e=>{this.remove(e)})})}get(e){return this.#e.get(e)}getAll(){return[...this.#e.values()]}find(e){const t={exact:!0,...e};return this.getAll().find(n=>et(t,n))}findAll(e={}){const t=this.getAll();return Object.keys(e).length>0?t.filter(n=>et(e,n)):t}notify(e){k.batch(()=>{this.listeners.forEach(t=>{t(e)})})}onFocus(){k.batch(()=>{this.getAll().forEach(e=>{e.onFocus()})})}onOnline(){k.batch(()=>{this.getAll().forEach(e=>{e.onOnline()})})}},Gn=class{#e;#n;#r;#l;#c;#i;#t;#a;constructor(e={}){this.#e=e.queryCache||new Qn,this.#n=e.mutationCache||new jn,this.#r=e.defaultOptions||{},this.#l=new Map,this.#c=new Map,this.#i=0}mount(){this.#i++,this.#i===1&&(this.#t=Mn.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#e.onFocus())}),this.#a=tt.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#e.onOnline())}))}unmount(){this.#i--,this.#i===0&&(this.#t?.(),this.#t=void 0,this.#a?.(),this.#a=void 0)}isFetching(e){return this.#e.findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return this.#n.findAll({...e,status:"pending"}).length}getQueryData(e){const t=this.defaultQueryOptions({queryKey:e});return this.#e.get(t.queryHash)?.state.data}ensureQueryData(e){const t=this.defaultQueryOptions(e),n=this.#e.build(this,t),r=n.state.data;return r===void 0?this.fetchQuery(e):(e.revalidateIfStale&&n.isStaleByTime(nt(t.staleTime,n))&&this.prefetchQuery(t),Promise.resolve(r))}getQueriesData(e){return this.#e.findAll(e).map(({queryKey:t,state:n})=>{const r=n.data;return[t,r]})}setQueryData(e,t,n){const r=this.defaultQueryOptions({queryKey:e}),i=this.#e.get(r.queryHash)?.state.data,o=Tn(t,i);if(o!==void 0)return this.#e.build(this,r).setData(o,{...n,manual:!0})}setQueriesData(e,t,n){return k.batch(()=>this.#e.findAll(e).map(({queryKey:r})=>[r,this.setQueryData(r,t,n)]))}getQueryState(e){const t=this.defaultQueryOptions({queryKey:e});return this.#e.get(t.queryHash)?.state}removeQueries(e){const t=this.#e;k.batch(()=>{t.findAll(e).forEach(n=>{t.remove(n)})})}resetQueries(e,t){const n=this.#e;return k.batch(()=>(n.findAll(e).forEach(r=>{r.reset()}),this.refetchQueries({type:"active",...e},t)))}cancelQueries(e,t={}){const n={revert:!0,...t},r=k.batch(()=>this.#e.findAll(e).map(a=>a.cancel(n)));return Promise.all(r).then(q).catch(q)}invalidateQueries(e,t={}){return k.batch(()=>(this.#e.findAll(e).forEach(n=>{n.invalidate()}),e?.refetchType==="none"?Promise.resolve():this.refetchQueries({...e,type:e?.refetchType??e?.type??"active"},t)))}refetchQueries(e,t={}){const n={...t,cancelRefetch:t.cancelRefetch??!0},r=k.batch(()=>this.#e.findAll(e).filter(a=>!a.isDisabled()&&!a.isStatic()).map(a=>{let i=a.fetch(void 0,n);return n.throwOnError||(i=i.catch(q)),a.state.fetchStatus==="paused"?Promise.resolve():i}));return Promise.all(r).then(q)}fetchQuery(e){const t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);const n=this.#e.build(this,t);return n.isStaleByTime(nt(t.staleTime,n))?n.fetch(t):Promise.resolve(n.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(q).catch(q)}fetchInfiniteQuery(e){return e.behavior=it(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(q).catch(q)}ensureInfiniteQueryData(e){return e.behavior=it(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return tt.isOnline()?this.#n.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#e}getMutationCache(){return this.#n}getDefaultOptions(){return this.#r}setDefaultOptions(e){this.#r=e}setQueryDefaults(e,t){this.#l.set(rt(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){const t=[...this.#l.values()],n={};return t.forEach(r=>{at(e,r.queryKey)&&Object.assign(n,r.defaultOptions)}),n}setMutationDefaults(e,t){this.#c.set(rt(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){const t=[...this.#c.values()],n={};return t.forEach(r=>{at(e,r.mutationKey)&&Object.assign(n,r.defaultOptions)}),n}defaultQueryOptions(e){if(e._defaulted)return e;const t={...this.#r.queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=Kt(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===In&&(t.enabled=!1),t}defaultMutationOptions(e){return e?._defaulted?e:{...this.#r.mutations,...e?.mutationKey&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){this.#e.clear(),this.#n.clear()}},Zn=function(e,t,n,r){if(n==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?e!==t||!r:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?r:n==="a"?r.call(e):r?r.value:t.get(e)},Jn=function(e,t,n,r,a){if(r==="m")throw new TypeError("Private method is not writable");if(r==="a"&&!a)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?e!==t||!a:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r==="a"?a.call(e,n):a?a.value=n:t.set(e,n),n},ce;function st(e){const t=({register:n})=>n(e);try{window.dispatchEvent(new Yn(t))}catch(n){console.error(`wallet-standard:register-wallet event could not be dispatched
`,n)}try{window.addEventListener("wallet-standard:app-ready",({detail:n})=>t(n))}catch(n){console.error(`wallet-standard:app-ready event listener could not be added
`,n)}}class Yn extends Event{get detail(){return Zn(this,ce,"f")}get type(){return"wallet-standard:register-wallet"}constructor(t){super("wallet-standard:register-wallet",{bubbles:!1,cancelable:!1,composed:!1}),ce.set(this,void 0),Jn(this,ce,t,"f")}preventDefault(){throw new Error("preventDefault cannot be called")}stopImmediatePropagation(){throw new Error("stopImmediatePropagation cannot be called")}stopPropagation(){throw new Error("stopPropagation cannot be called")}}ce=new WeakMap;const Xn=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],$n=pe("circle-check",Xn);const er=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],tr=pe("info",er);const nr=[["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",key:"2d38gg"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],rr=pe("octagon-x",nr);const ar=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],ir=pe("triangle-alert",ar);function or(e){return X.createElement(xn,{flushSync:On.flushSync,...e})}const sr="/vector-react-demo/",lr=sr.replace(/\/$/,""),cr=Pn([{children:[{element:N.jsx(Nn,{replace:!0,to:"/vector"}),index:!0},{lazy:()=>oe(()=>import("./about-feature-BdiOS_w8.js"),__vite__mapDeps([0,1,2,3,4])),path:"about"},{lazy:()=>oe(()=>import("./vector-feature-B-m2akbj.js"),__vite__mapDeps([5,1,2,6,7,8,4,9,3])),path:"vector"},{lazy:()=>oe(()=>import("./wallet-feature-CO9gHu1D.js"),__vite__mapDeps([10,1,2,6,7,8,4,9,3,11])),path:"wallet"},{lazy:()=>oe(()=>import("./shell-not-found-feature-CUuZuMBv.js"),__vite__mapDeps([12,1,2,7,3,4])),loader:()=>({links:[{description:"Open the Vector workflow to initialize a signer-bound PDA and run the localnet advance demo.",title:"Vector",to:"/vector"},{description:"Open the wallet screen if you were looking for connection and signing tools.",title:"Wallet",to:"/wallet"},{description:"Read how this demo maps to the upstream Vector protocol and how to run the flow locally.",title:"About",to:"/about"}]}),path:"*"}],element:N.jsx(En,{links:[{label:"Vector",to:"/vector"},{label:"Wallet",to:"/wallet"},{label:"About",to:"/about"}]}),hydrateFallbackElement:N.jsx(bn,{fullScreen:!0})}],{basename:lr});var dr=(e,t,n,r,a,i,o,s)=>{let l=document.documentElement,c=["light","dark"];function u(d){(Array.isArray(e)?e:[e]).forEach(g=>{let m=g==="class",M=m&&i?a.map(C=>i[C]||C):a;m?(l.classList.remove(...M),l.classList.add(i&&i[d]?i[d]:d)):l.setAttribute(g,d)}),E(d)}function E(d){s&&c.includes(d)&&(l.style.colorScheme=d)}function y(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(r)u(r);else try{let d=localStorage.getItem(t)||n,g=o&&d==="system"?y():d;u(g)}catch{}},ur=X.createContext(void 0),hr={setTheme:e=>{},themes:[]},fr=()=>{var e;return(e=X.useContext(ur))!=null?e:hr};X.memo(({forcedTheme:e,storageKey:t,attribute:n,enableSystem:r,enableColorScheme:a,defaultTheme:i,value:o,themes:s,nonce:l,scriptProps:c})=>{let u=JSON.stringify([n,t,i,e,s,o,r,a]).slice(1,-1);return X.createElement("script",{...c,suppressHydrationWarning:!0,nonce:typeof window>"u"?l:"",dangerouslySetInnerHTML:{__html:`(${dr.toString()})(${u})`}})});const mr=({...e})=>{const{theme:t="system"}=fr();return N.jsx(kn,{className:"toaster group",icons:{error:N.jsx(rr,{className:"size-4"}),info:N.jsx(tr,{className:"size-4"}),loading:N.jsx(Wn,{className:"size-4 animate-spin"}),success:N.jsx($n,{className:"size-4"}),warning:N.jsx(ir,{className:"size-4"})},style:{"--border-radius":"var(--radius)","--normal-bg":"var(--popover)","--normal-border":"var(--border)","--normal-text":"var(--popover-foreground)"},theme:t,toastOptions:{classNames:{toast:"cn-toast"}},...e})};var Y={},Ee,lt;function pr(){return lt||(lt=1,Ee=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Ee}var Ce={},K={},ct;function G(){if(ct)return K;ct=1;let e;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return K.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},K.getSymbolTotalCodewords=function(r){return t[r]},K.getBCHDigit=function(n){let r=0;for(;n!==0;)r++,n>>>=1;return r},K.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');e=r},K.isKanjiModeEnabled=function(){return typeof e<"u"},K.toSJIS=function(r){return e(r)},K}var ve={},dt;function Ge(){return dt||(dt=1,(function(e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+n)}}e.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},e.from=function(r,a){if(e.isValid(r))return r;try{return t(r)}catch{return a}}})(ve)),ve}var Ae,ut;function gr(){if(ut)return Ae;ut=1;function e(){this.buffer=[],this.length=0}return e.prototype={get:function(t){const n=Math.floor(t/8);return(this.buffer[n]>>>7-t%8&1)===1},put:function(t,n){for(let r=0;r<n;r++)this.putBit((t>>>n-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const n=Math.floor(this.length/8);this.buffer.length<=n&&this.buffer.push(0),t&&(this.buffer[n]|=128>>>this.length%8),this.length++}},Ae=e,Ae}var _e,ht;function wr(){if(ht)return _e;ht=1;function e(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return e.prototype.set=function(t,n,r,a){const i=t*this.size+n;this.data[i]=r,a&&(this.reservedBit[i]=!0)},e.prototype.get=function(t,n){return this.data[t*this.size+n]},e.prototype.xor=function(t,n,r){this.data[t*this.size+n]^=r},e.prototype.isReserved=function(t,n){return this.reservedBit[t*this.size+n]},_e=e,_e}var Re={},ft;function yr(){return ft||(ft=1,(function(e){const t=G().getSymbolSize;e.getRowColCoords=function(r){if(r===1)return[];const a=Math.floor(r/7)+2,i=t(r),o=i===145?26:Math.ceil((i-13)/(2*a-2))*2,s=[i-7];for(let l=1;l<a-1;l++)s[l]=s[l-1]-o;return s.push(6),s.reverse()},e.getPositions=function(r){const a=[],i=e.getRowColCoords(r),o=i.length;for(let s=0;s<o;s++)for(let l=0;l<o;l++)s===0&&l===0||s===0&&l===o-1||s===o-1&&l===0||a.push([i[s],i[l]]);return a}})(Re)),Re}var Se={},mt;function br(){if(mt)return Se;mt=1;const e=G().getSymbolSize,t=7;return Se.getPositions=function(r){const a=e(r);return[[0,0],[a-t,0],[0,a-t]]},Se}var Le={},pt;function Er(){return pt||(pt=1,(function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(a){return a!=null&&a!==""&&!isNaN(a)&&a>=0&&a<=7},e.from=function(a){return e.isValid(a)?parseInt(a,10):void 0},e.getPenaltyN1=function(a){const i=a.size;let o=0,s=0,l=0,c=null,u=null;for(let E=0;E<i;E++){s=l=0,c=u=null;for(let y=0;y<i;y++){let d=a.get(E,y);d===c?s++:(s>=5&&(o+=t.N1+(s-5)),c=d,s=1),d=a.get(y,E),d===u?l++:(l>=5&&(o+=t.N1+(l-5)),u=d,l=1)}s>=5&&(o+=t.N1+(s-5)),l>=5&&(o+=t.N1+(l-5))}return o},e.getPenaltyN2=function(a){const i=a.size;let o=0;for(let s=0;s<i-1;s++)for(let l=0;l<i-1;l++){const c=a.get(s,l)+a.get(s,l+1)+a.get(s+1,l)+a.get(s+1,l+1);(c===4||c===0)&&o++}return o*t.N2},e.getPenaltyN3=function(a){const i=a.size;let o=0,s=0,l=0;for(let c=0;c<i;c++){s=l=0;for(let u=0;u<i;u++)s=s<<1&2047|a.get(c,u),u>=10&&(s===1488||s===93)&&o++,l=l<<1&2047|a.get(u,c),u>=10&&(l===1488||l===93)&&o++}return o*t.N3},e.getPenaltyN4=function(a){let i=0;const o=a.data.length;for(let l=0;l<o;l++)i+=a.data[l];return Math.abs(Math.ceil(i*100/o/5)-10)*t.N4};function n(r,a,i){switch(r){case e.Patterns.PATTERN000:return(a+i)%2===0;case e.Patterns.PATTERN001:return a%2===0;case e.Patterns.PATTERN010:return i%3===0;case e.Patterns.PATTERN011:return(a+i)%3===0;case e.Patterns.PATTERN100:return(Math.floor(a/2)+Math.floor(i/3))%2===0;case e.Patterns.PATTERN101:return a*i%2+a*i%3===0;case e.Patterns.PATTERN110:return(a*i%2+a*i%3)%2===0;case e.Patterns.PATTERN111:return(a*i%3+(a+i)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}e.applyMask=function(a,i){const o=i.size;for(let s=0;s<o;s++)for(let l=0;l<o;l++)i.isReserved(l,s)||i.xor(l,s,n(a,l,s))},e.getBestMask=function(a,i){const o=Object.keys(e.Patterns).length;let s=0,l=1/0;for(let c=0;c<o;c++){i(c),e.applyMask(c,a);const u=e.getPenaltyN1(a)+e.getPenaltyN2(a)+e.getPenaltyN3(a)+e.getPenaltyN4(a);e.applyMask(c,a),u<l&&(l=u,s=c)}return s}})(Le)),Le}var le={},gt;function Qt(){if(gt)return le;gt=1;const e=Ge(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],n=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return le.getBlocksCount=function(a,i){switch(i){case e.L:return t[(a-1)*4+0];case e.M:return t[(a-1)*4+1];case e.Q:return t[(a-1)*4+2];case e.H:return t[(a-1)*4+3];default:return}},le.getTotalCodewordsCount=function(a,i){switch(i){case e.L:return n[(a-1)*4+0];case e.M:return n[(a-1)*4+1];case e.Q:return n[(a-1)*4+2];case e.H:return n[(a-1)*4+3];default:return}},le}var Me={},ee={},wt;function Cr(){if(wt)return ee;wt=1;const e=new Uint8Array(512),t=new Uint8Array(256);return(function(){let r=1;for(let a=0;a<255;a++)e[a]=r,t[r]=a,r<<=1,r&256&&(r^=285);for(let a=255;a<512;a++)e[a]=e[a-255]})(),ee.log=function(r){if(r<1)throw new Error("log("+r+")");return t[r]},ee.exp=function(r){return e[r]},ee.mul=function(r,a){return r===0||a===0?0:e[t[r]+t[a]]},ee}var yt;function vr(){return yt||(yt=1,(function(e){const t=Cr();e.mul=function(r,a){const i=new Uint8Array(r.length+a.length-1);for(let o=0;o<r.length;o++)for(let s=0;s<a.length;s++)i[o+s]^=t.mul(r[o],a[s]);return i},e.mod=function(r,a){let i=new Uint8Array(r);for(;i.length-a.length>=0;){const o=i[0];for(let l=0;l<a.length;l++)i[l]^=t.mul(a[l],o);let s=0;for(;s<i.length&&i[s]===0;)s++;i=i.slice(s)}return i},e.generateECPolynomial=function(r){let a=new Uint8Array([1]);for(let i=0;i<r;i++)a=e.mul(a,new Uint8Array([1,t.exp(i)]));return a}})(Me)),Me}var Te,bt;function Ar(){if(bt)return Te;bt=1;const e=vr();function t(n){this.genPoly=void 0,this.degree=n,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(r){this.degree=r,this.genPoly=e.generateECPolynomial(this.degree)},t.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const a=new Uint8Array(r.length+this.degree);a.set(r);const i=e.mod(a,this.genPoly),o=this.degree-i.length;if(o>0){const s=new Uint8Array(this.degree);return s.set(i,o),s}return i},Te=t,Te}var Ie={},xe={},Oe={},Et;function Gt(){return Et||(Et=1,Oe.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),Oe}var U={},Ct;function Zt(){if(Ct)return U;Ct=1;const e="[0-9]+",t="[A-Z $%*+\\-./:]+";let n="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";n=n.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+n+`)(?:.|[\r
]))+`;U.KANJI=new RegExp(n,"g"),U.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),U.BYTE=new RegExp(r,"g"),U.NUMERIC=new RegExp(e,"g"),U.ALPHANUMERIC=new RegExp(t,"g");const a=new RegExp("^"+n+"$"),i=new RegExp("^"+e+"$"),o=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return U.testKanji=function(l){return a.test(l)},U.testNumeric=function(l){return i.test(l)},U.testAlphanumeric=function(l){return o.test(l)},U}var vt;function Z(){return vt||(vt=1,(function(e){const t=Gt(),n=Zt();e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(i,o){if(!i.ccBits)throw new Error("Invalid mode: "+i);if(!t.isValid(o))throw new Error("Invalid version: "+o);return o>=1&&o<10?i.ccBits[0]:o<27?i.ccBits[1]:i.ccBits[2]},e.getBestModeForData=function(i){return n.testNumeric(i)?e.NUMERIC:n.testAlphanumeric(i)?e.ALPHANUMERIC:n.testKanji(i)?e.KANJI:e.BYTE},e.toString=function(i){if(i&&i.id)return i.id;throw new Error("Invalid mode")},e.isValid=function(i){return i&&i.bit&&i.ccBits};function r(a){if(typeof a!="string")throw new Error("Param is not a string");switch(a.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+a)}}e.from=function(i,o){if(e.isValid(i))return i;try{return r(i)}catch{return o}}})(xe)),xe}var At;function _r(){return At||(At=1,(function(e){const t=G(),n=Qt(),r=Ge(),a=Z(),i=Gt(),o=7973,s=t.getBCHDigit(o);function l(y,d,g){for(let m=1;m<=40;m++)if(d<=e.getCapacity(m,g,y))return m}function c(y,d){return a.getCharCountIndicator(y,d)+4}function u(y,d){let g=0;return y.forEach(function(m){const M=c(m.mode,d);g+=M+m.getBitsLength()}),g}function E(y,d){for(let g=1;g<=40;g++)if(u(y,g)<=e.getCapacity(g,d,a.MIXED))return g}e.from=function(d,g){return i.isValid(d)?parseInt(d,10):g},e.getCapacity=function(d,g,m){if(!i.isValid(d))throw new Error("Invalid QR Code version");typeof m>"u"&&(m=a.BYTE);const M=t.getSymbolTotalCodewords(d),C=n.getTotalCodewordsCount(d,g),A=(M-C)*8;if(m===a.MIXED)return A;const v=A-c(m,d);switch(m){case a.NUMERIC:return Math.floor(v/10*3);case a.ALPHANUMERIC:return Math.floor(v/11*2);case a.KANJI:return Math.floor(v/13);case a.BYTE:default:return Math.floor(v/8)}},e.getBestVersionForData=function(d,g){let m;const M=r.from(g,r.M);if(Array.isArray(d)){if(d.length>1)return E(d,M);if(d.length===0)return 1;m=d[0]}else m=d;return l(m.mode,m.getLength(),M)},e.getEncodedBits=function(d){if(!i.isValid(d)||d<7)throw new Error("Invalid QR Code version");let g=d<<12;for(;t.getBCHDigit(g)-s>=0;)g^=o<<t.getBCHDigit(g)-s;return d<<12|g}})(Ie)),Ie}var Pe={},_t;function Rr(){if(_t)return Pe;_t=1;const e=G(),t=1335,n=21522,r=e.getBCHDigit(t);return Pe.getEncodedBits=function(i,o){const s=i.bit<<3|o;let l=s<<10;for(;e.getBCHDigit(l)-r>=0;)l^=t<<e.getBCHDigit(l)-r;return(s<<10|l)^n},Pe}var Ne={},ke,Rt;function Sr(){if(Rt)return ke;Rt=1;const e=Z();function t(n){this.mode=e.NUMERIC,this.data=n.toString()}return t.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(r){let a,i,o;for(a=0;a+3<=this.data.length;a+=3)i=this.data.substr(a,3),o=parseInt(i,10),r.put(o,10);const s=this.data.length-a;s>0&&(i=this.data.substr(a),o=parseInt(i,10),r.put(o,s*3+1))},ke=t,ke}var De,St;function Lr(){if(St)return De;St=1;const e=Z(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function n(r){this.mode=e.ALPHANUMERIC,this.data=r}return n.getBitsLength=function(a){return 11*Math.floor(a/2)+6*(a%2)},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(a){let i;for(i=0;i+2<=this.data.length;i+=2){let o=t.indexOf(this.data[i])*45;o+=t.indexOf(this.data[i+1]),a.put(o,11)}this.data.length%2&&a.put(t.indexOf(this.data[i]),6)},De=n,De}var Be,Lt;function Mr(){if(Lt)return Be;Lt=1;const e=Z();function t(n){this.mode=e.BYTE,typeof n=="string"?this.data=new TextEncoder().encode(n):this.data=new Uint8Array(n)}return t.getBitsLength=function(r){return r*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(n){for(let r=0,a=this.data.length;r<a;r++)n.put(this.data[r],8)},Be=t,Be}var Ue,Mt;function Tr(){if(Mt)return Ue;Mt=1;const e=Z(),t=G();function n(r){this.mode=e.KANJI,this.data=r}return n.getBitsLength=function(a){return a*13},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(r){let a;for(a=0;a<this.data.length;a++){let i=t.toSJIS(this.data[a]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[a]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),r.put(i,13)}},Ue=n,Ue}var Fe={exports:{}},Tt;function Ir(){return Tt||(Tt=1,(function(e){var t={single_source_shortest_paths:function(n,r,a){var i={},o={};o[r]=0;var s=t.PriorityQueue.make();s.push(r,0);for(var l,c,u,E,y,d,g,m,M;!s.empty();){l=s.pop(),c=l.value,E=l.cost,y=n[c]||{};for(u in y)y.hasOwnProperty(u)&&(d=y[u],g=E+d,m=o[u],M=typeof o[u]>"u",(M||m>g)&&(o[u]=g,s.push(u,g),i[u]=c))}if(typeof a<"u"&&typeof o[a]>"u"){var C=["Could not find a path from ",r," to ",a,"."].join("");throw new Error(C)}return i},extract_shortest_path_from_predecessor_list:function(n,r){for(var a=[],i=r;i;)a.push(i),n[i],i=n[i];return a.reverse(),a},find_path:function(n,r,a){var i=t.single_source_shortest_paths(n,r,a);return t.extract_shortest_path_from_predecessor_list(i,a)},PriorityQueue:{make:function(n){var r=t.PriorityQueue,a={},i;n=n||{};for(i in r)r.hasOwnProperty(i)&&(a[i]=r[i]);return a.queue=[],a.sorter=n.sorter||r.default_sorter,a},default_sorter:function(n,r){return n.cost-r.cost},push:function(n,r){var a={value:n,cost:r};this.queue.push(a),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};e.exports=t})(Fe)),Fe.exports}var It;function xr(){return It||(It=1,(function(e){const t=Z(),n=Sr(),r=Lr(),a=Mr(),i=Tr(),o=Zt(),s=G(),l=Ir();function c(C){return unescape(encodeURIComponent(C)).length}function u(C,A,v){const b=[];let I;for(;(I=C.exec(v))!==null;)b.push({data:I[0],index:I.index,mode:A,length:I[0].length});return b}function E(C){const A=u(o.NUMERIC,t.NUMERIC,C),v=u(o.ALPHANUMERIC,t.ALPHANUMERIC,C);let b,I;return s.isKanjiModeEnabled()?(b=u(o.BYTE,t.BYTE,C),I=u(o.KANJI,t.KANJI,C)):(b=u(o.BYTE_KANJI,t.BYTE,C),I=[]),A.concat(v,b,I).sort(function(w,h){return w.index-h.index}).map(function(w){return{data:w.data,mode:w.mode,length:w.length}})}function y(C,A){switch(A){case t.NUMERIC:return n.getBitsLength(C);case t.ALPHANUMERIC:return r.getBitsLength(C);case t.KANJI:return i.getBitsLength(C);case t.BYTE:return a.getBitsLength(C)}}function d(C){return C.reduce(function(A,v){const b=A.length-1>=0?A[A.length-1]:null;return b&&b.mode===v.mode?(A[A.length-1].data+=v.data,A):(A.push(v),A)},[])}function g(C){const A=[];for(let v=0;v<C.length;v++){const b=C[v];switch(b.mode){case t.NUMERIC:A.push([b,{data:b.data,mode:t.ALPHANUMERIC,length:b.length},{data:b.data,mode:t.BYTE,length:b.length}]);break;case t.ALPHANUMERIC:A.push([b,{data:b.data,mode:t.BYTE,length:b.length}]);break;case t.KANJI:A.push([b,{data:b.data,mode:t.BYTE,length:c(b.data)}]);break;case t.BYTE:A.push([{data:b.data,mode:t.BYTE,length:c(b.data)}])}}return A}function m(C,A){const v={},b={start:{}};let I=["start"];for(let p=0;p<C.length;p++){const w=C[p],h=[];for(let f=0;f<w.length;f++){const L=w[f],R=""+p+f;h.push(R),v[R]={node:L,lastCount:0},b[R]={};for(let _=0;_<I.length;_++){const S=I[_];v[S]&&v[S].node.mode===L.mode?(b[S][R]=y(v[S].lastCount+L.length,L.mode)-y(v[S].lastCount,L.mode),v[S].lastCount+=L.length):(v[S]&&(v[S].lastCount=L.length),b[S][R]=y(L.length,L.mode)+4+t.getCharCountIndicator(L.mode,A))}}I=h}for(let p=0;p<I.length;p++)b[I[p]].end=0;return{map:b,table:v}}function M(C,A){let v;const b=t.getBestModeForData(C);if(v=t.from(A,b),v!==t.BYTE&&v.bit<b.bit)throw new Error('"'+C+'" cannot be encoded with mode '+t.toString(v)+`.
 Suggested mode is: `+t.toString(b));switch(v===t.KANJI&&!s.isKanjiModeEnabled()&&(v=t.BYTE),v){case t.NUMERIC:return new n(C);case t.ALPHANUMERIC:return new r(C);case t.KANJI:return new i(C);case t.BYTE:return new a(C)}}e.fromArray=function(A){return A.reduce(function(v,b){return typeof b=="string"?v.push(M(b,null)):b.data&&v.push(M(b.data,b.mode)),v},[])},e.fromString=function(A,v){const b=E(A,s.isKanjiModeEnabled()),I=g(b),p=m(I,v),w=l.find_path(p.map,"start","end"),h=[];for(let f=1;f<w.length-1;f++)h.push(p.table[w[f]].node);return e.fromArray(d(h))},e.rawSplit=function(A){return e.fromArray(E(A,s.isKanjiModeEnabled()))}})(Ne)),Ne}var xt;function Or(){if(xt)return Ce;xt=1;const e=G(),t=Ge(),n=gr(),r=wr(),a=yr(),i=br(),o=Er(),s=Qt(),l=Ar(),c=_r(),u=Rr(),E=Z(),y=xr();function d(p,w){const h=p.size,f=i.getPositions(w);for(let L=0;L<f.length;L++){const R=f[L][0],_=f[L][1];for(let S=-1;S<=7;S++)if(!(R+S<=-1||h<=R+S))for(let T=-1;T<=7;T++)_+T<=-1||h<=_+T||(S>=0&&S<=6&&(T===0||T===6)||T>=0&&T<=6&&(S===0||S===6)||S>=2&&S<=4&&T>=2&&T<=4?p.set(R+S,_+T,!0,!0):p.set(R+S,_+T,!1,!0))}}function g(p){const w=p.size;for(let h=8;h<w-8;h++){const f=h%2===0;p.set(h,6,f,!0),p.set(6,h,f,!0)}}function m(p,w){const h=a.getPositions(w);for(let f=0;f<h.length;f++){const L=h[f][0],R=h[f][1];for(let _=-2;_<=2;_++)for(let S=-2;S<=2;S++)_===-2||_===2||S===-2||S===2||_===0&&S===0?p.set(L+_,R+S,!0,!0):p.set(L+_,R+S,!1,!0)}}function M(p,w){const h=p.size,f=c.getEncodedBits(w);let L,R,_;for(let S=0;S<18;S++)L=Math.floor(S/3),R=S%3+h-8-3,_=(f>>S&1)===1,p.set(L,R,_,!0),p.set(R,L,_,!0)}function C(p,w,h){const f=p.size,L=u.getEncodedBits(w,h);let R,_;for(R=0;R<15;R++)_=(L>>R&1)===1,R<6?p.set(R,8,_,!0):R<8?p.set(R+1,8,_,!0):p.set(f-15+R,8,_,!0),R<8?p.set(8,f-R-1,_,!0):R<9?p.set(8,15-R-1+1,_,!0):p.set(8,15-R-1,_,!0);p.set(f-8,8,1,!0)}function A(p,w){const h=p.size;let f=-1,L=h-1,R=7,_=0;for(let S=h-1;S>0;S-=2)for(S===6&&S--;;){for(let T=0;T<2;T++)if(!p.isReserved(L,S-T)){let D=!1;_<w.length&&(D=(w[_]>>>R&1)===1),p.set(L,S-T,D),R--,R===-1&&(_++,R=7)}if(L+=f,L<0||h<=L){L-=f,f=-f;break}}}function v(p,w,h){const f=new n;h.forEach(function(T){f.put(T.mode.bit,4),f.put(T.getLength(),E.getCharCountIndicator(T.mode,p)),T.write(f)});const L=e.getSymbolTotalCodewords(p),R=s.getTotalCodewordsCount(p,w),_=(L-R)*8;for(f.getLengthInBits()+4<=_&&f.put(0,4);f.getLengthInBits()%8!==0;)f.putBit(0);const S=(_-f.getLengthInBits())/8;for(let T=0;T<S;T++)f.put(T%2?17:236,8);return b(f,p,w)}function b(p,w,h){const f=e.getSymbolTotalCodewords(w),L=s.getTotalCodewordsCount(w,h),R=f-L,_=s.getBlocksCount(w,h),S=f%_,T=_-S,D=Math.floor(f/_),B=Math.floor(R/_),V=B+1,H=D-B,$=new l(H);let ge=0;const ie=new Array(_),Ye=new Array(_);let we=0;const yn=new Uint8Array(p.buffer);for(let J=0;J<_;J++){const be=J<T?B:V;ie[J]=yn.slice(ge,ge+be),Ye[J]=$.encode(ie[J]),ge+=be,we=Math.max(we,be)}const ye=new Uint8Array(f);let Xe=0,F,z;for(F=0;F<we;F++)for(z=0;z<_;z++)F<ie[z].length&&(ye[Xe++]=ie[z][F]);for(F=0;F<H;F++)for(z=0;z<_;z++)ye[Xe++]=Ye[z][F];return ye}function I(p,w,h,f){let L;if(Array.isArray(p))L=y.fromArray(p);else if(typeof p=="string"){let D=w;if(!D){const B=y.rawSplit(p);D=c.getBestVersionForData(B,h)}L=y.fromString(p,D||40)}else throw new Error("Invalid data");const R=c.getBestVersionForData(L,h);if(!R)throw new Error("The amount of data is too big to be stored in a QR Code");if(!w)w=R;else if(w<R)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+R+`.
`);const _=v(w,h,L),S=e.getSymbolSize(w),T=new r(S);return d(T,w),g(T),m(T,w),C(T,h,0),w>=7&&M(T,w),A(T,_),isNaN(f)&&(f=o.getBestMask(T,C.bind(null,T,h))),o.applyMask(f,T),C(T,h,f),{modules:T,version:w,errorCorrectionLevel:h,maskPattern:f,segments:L}}return Ce.create=function(w,h){if(typeof w>"u"||w==="")throw new Error("No input text");let f=t.M,L,R;return typeof h<"u"&&(f=t.from(h.errorCorrectionLevel,t.M),L=c.from(h.version),R=o.from(h.maskPattern),h.toSJISFunc&&e.setToSJISFunction(h.toSJISFunc)),I(w,L,f,R)},Ce}var ze={},qe={},Ot;function Jt(){return Ot||(Ot=1,(function(e){function t(n){if(typeof n=="number"&&(n=n.toString()),typeof n!="string")throw new Error("Color should be defined as hex string");let r=n.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+n);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(i){return[i,i]}))),r.length===6&&r.push("F","F");const a=parseInt(r.join(""),16);return{r:a>>24&255,g:a>>16&255,b:a>>8&255,a:a&255,hex:"#"+r.slice(0,6).join("")}}e.getOptions=function(r){r||(r={}),r.color||(r.color={});const a=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,i=r.width&&r.width>=21?r.width:void 0,o=r.scale||4;return{width:i,scale:i?4:o,margin:a,color:{dark:t(r.color.dark||"#000000ff"),light:t(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},e.getScale=function(r,a){return a.width&&a.width>=r+a.margin*2?a.width/(r+a.margin*2):a.scale},e.getImageWidth=function(r,a){const i=e.getScale(r,a);return Math.floor((r+a.margin*2)*i)},e.qrToImageData=function(r,a,i){const o=a.modules.size,s=a.modules.data,l=e.getScale(o,i),c=Math.floor((o+i.margin*2)*l),u=i.margin*l,E=[i.color.light,i.color.dark];for(let y=0;y<c;y++)for(let d=0;d<c;d++){let g=(y*c+d)*4,m=i.color.light;if(y>=u&&d>=u&&y<c-u&&d<c-u){const M=Math.floor((y-u)/l),C=Math.floor((d-u)/l);m=E[s[M*o+C]?1:0]}r[g++]=m.r,r[g++]=m.g,r[g++]=m.b,r[g]=m.a}}})(qe)),qe}var Pt;function Pr(){return Pt||(Pt=1,(function(e){const t=Jt();function n(a,i,o){a.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=o,i.width=o,i.style.height=o+"px",i.style.width=o+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}e.render=function(i,o,s){let l=s,c=o;typeof l>"u"&&(!o||!o.getContext)&&(l=o,o=void 0),o||(c=r()),l=t.getOptions(l);const u=t.getImageWidth(i.modules.size,l),E=c.getContext("2d"),y=E.createImageData(u,u);return t.qrToImageData(y.data,i,l),n(E,c,u),E.putImageData(y,0,0),c},e.renderToDataURL=function(i,o,s){let l=s;typeof l>"u"&&(!o||!o.getContext)&&(l=o,o=void 0),l||(l={});const c=e.render(i,o,l),u=l.type||"image/png",E=l.rendererOpts||{};return c.toDataURL(u,E.quality)}})(ze)),ze}var He={},Nt;function Nr(){if(Nt)return He;Nt=1;const e=Jt();function t(a,i){const o=a.a/255,s=i+'="'+a.hex+'"';return o<1?s+" "+i+'-opacity="'+o.toFixed(2).slice(1)+'"':s}function n(a,i,o){let s=a+i;return typeof o<"u"&&(s+=" "+o),s}function r(a,i,o){let s="",l=0,c=!1,u=0;for(let E=0;E<a.length;E++){const y=Math.floor(E%i),d=Math.floor(E/i);!y&&!c&&(c=!0),a[E]?(u++,E>0&&y>0&&a[E-1]||(s+=c?n("M",y+o,.5+d+o):n("m",l,0),l=0,c=!1),y+1<i&&a[E+1]||(s+=n("h",u),u=0)):l++}return s}return He.render=function(i,o,s){const l=e.getOptions(o),c=i.modules.size,u=i.modules.data,E=c+l.margin*2,y=l.color.light.a?"<path "+t(l.color.light,"fill")+' d="M0 0h'+E+"v"+E+'H0z"/>':"",d="<path "+t(l.color.dark,"stroke")+' d="'+r(u,c,l.margin)+'"/>',g='viewBox="0 0 '+E+" "+E+'"',M='<svg xmlns="http://www.w3.org/2000/svg" '+(l.width?'width="'+l.width+'" height="'+l.width+'" ':"")+g+' shape-rendering="crispEdges">'+y+d+`</svg>
`;return typeof s=="function"&&s(null,M),M},He}var kt;function kr(){if(kt)return Y;kt=1;const e=pr(),t=Or(),n=Pr(),r=Nr();function a(i,o,s,l,c){const u=[].slice.call(arguments,1),E=u.length,y=typeof u[E-1]=="function";if(!y&&!e())throw new Error("Callback required as last argument");if(y){if(E<2)throw new Error("Too few arguments provided");E===2?(c=s,s=o,o=l=void 0):E===3&&(o.getContext&&typeof c>"u"?(c=l,l=void 0):(c=l,l=s,s=o,o=void 0))}else{if(E<1)throw new Error("Too few arguments provided");return E===1?(s=o,o=l=void 0):E===2&&!o.getContext&&(l=s,s=o,o=void 0),new Promise(function(d,g){try{const m=t.create(s,l);d(i(m,o,l))}catch(m){g(m)}})}try{const d=t.create(s,l);c(null,i(d,o,l))}catch(d){c(d)}}return Y.create=t.create,Y.toCanvas=a.bind(null,n.render),Y.toDataURL=a.bind(null,n.renderToDataURL),Y.toString=a.bind(null,function(i,o,s){return r.render(i,s)}),Y}var Dr=kr();const Br=Cn(Dr),Dt="solana:mainnet";function Ur(e){let t=`${e.domain} wants you to sign in with your Solana account:
`;t+=`${e.address}`,e.statement&&(t+=`

${e.statement}`);const n=[];if(e.uri&&n.push(`URI: ${e.uri}`),e.version&&n.push(`Version: ${e.version}`),e.chainId&&n.push(`Chain ID: ${e.chainId}`),e.nonce&&n.push(`Nonce: ${e.nonce}`),e.issuedAt&&n.push(`Issued At: ${e.issuedAt}`),e.expirationTime&&n.push(`Expiration Time: ${e.expirationTime}`),e.notBefore&&n.push(`Not Before: ${e.notBefore}`),e.requestId&&n.push(`Request ID: ${e.requestId}`),e.resources){n.push("Resources:");for(const r of e.resources)n.push(`- ${r}`)}return n.length&&(t+=`

${n.join(`
`)}`),t}const O={ERROR_ASSOCIATION_PORT_OUT_OF_RANGE:"ERROR_ASSOCIATION_PORT_OUT_OF_RANGE",ERROR_REFLECTOR_ID_OUT_OF_RANGE:"ERROR_REFLECTOR_ID_OUT_OF_RANGE",ERROR_FORBIDDEN_WALLET_BASE_URL:"ERROR_FORBIDDEN_WALLET_BASE_URL",ERROR_SECURE_CONTEXT_REQUIRED:"ERROR_SECURE_CONTEXT_REQUIRED",ERROR_SESSION_CLOSED:"ERROR_SESSION_CLOSED",ERROR_SESSION_TIMEOUT:"ERROR_SESSION_TIMEOUT",ERROR_WALLET_NOT_FOUND:"ERROR_WALLET_NOT_FOUND",ERROR_INVALID_PROTOCOL_VERSION:"ERROR_INVALID_PROTOCOL_VERSION",ERROR_BROWSER_NOT_SUPPORTED:"ERROR_BROWSER_NOT_SUPPORTED",ERROR_LOOPBACK_ACCESS_BLOCKED:"ERROR_LOOPBACK_ACCESS_BLOCKED",ERROR_ASSOCIATION_CANCELLED:"ERROR_ASSOCIATION_CANCELLED"};var x=class extends Error{data;code;constructor(...e){const[t,n,r]=e;super(n),this.code=t,this.data=r,this.name="SolanaMobileWalletAdapterError"}},Ze=class extends Error{data;code;jsonRpcMessageId;constructor(...e){const[t,n,r,a]=e;super(r),this.code=n,this.data=a,this.jsonRpcMessageId=t,this.name="SolanaMobileWalletAdapterProtocolError"}};function Fr(e){return window.btoa(e)}function ne(e,t){const n=window.btoa(String.fromCharCode.call(null,...e));return t?n.replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""):n}function Je(e){return new Uint8Array(window.atob(e).split("").map(t=>t.charCodeAt(0)))}async function de(e,t){const n=await crypto.subtle.exportKey("raw",e),r=await crypto.subtle.sign({hash:"SHA-256",name:"ECDSA"},t,n),a=new Uint8Array(n.byteLength+r.byteLength);return a.set(new Uint8Array(n),0),a.set(new Uint8Array(r),n.byteLength),a}function zr(e){return Ur(e)}function qr(e){return Fr(zr(e)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const Hr="solana:signTransactions",Bt="solana:cloneAuthorization";function Kr(e){return Dn().decode(e)}function Wr(e){return Kr(Je(e))}function Yt(e,t){return new Proxy({},{get(n,r){return r==="then"?null:(n[r]==null&&(n[r]=async function(a){const{method:i,params:o}=Vr(r,a,e),s=await t(i,o);return i==="authorize"&&o.sign_in_payload&&!s.sign_in_result&&(s.sign_in_result=await Qr(o.sign_in_payload,s,t)),jr(r,s,e)}),n[r])},defineProperty(){return!1},deleteProperty(){return!1}})}function Vr(e,t,n){let r=t,a=e.toString().replace(/[A-Z]/g,i=>`_${i.toLowerCase()}`).toLowerCase();switch(e){case"authorize":{let{chain:i}=r;if(n==="legacy"){switch(i){case"solana:testnet":i="testnet";break;case"solana:devnet":i="devnet";break;case"solana:mainnet":i="mainnet-beta";break;default:i=r.cluster}r.cluster=i}else{switch(i){case"testnet":case"devnet":i=`solana:${i}`;break;case"mainnet-beta":i="solana:mainnet";break}r.chain=i}}case"reauthorize":{const{auth_token:i,identity:o}=r;i&&(n==="legacy"?(a="reauthorize",r={auth_token:i,identity:o}):a="authorize");break}}return{method:a,params:r}}function jr(e,t,n){switch(e){case"getCapabilities":{const r=t;switch(n){case"legacy":{const a=[Hr];return r.supports_clone_authorization===!0&&a.push(Bt),{...r,features:a}}case"v1":return{...r,supports_sign_and_send_transactions:!0,supports_clone_authorization:r.features.includes(Bt)}}}}return t}async function Qr(e,t,n){const r=e.domain??window.location.host,a=t.accounts[0].address,i=qr({...e,domain:r,address:Wr(a)}),o=Je((await n("sign_messages",{addresses:[a],payloads:[i]})).signed_payloads[0]),s=ne(o.slice(0,o.length-64)),l=ne(o.slice(o.length-64));return{address:a,signed_message:s.length==0?i:s,signature:l}}function Gr(e){if(e>=4294967296)throw new Error("Outbound sequence number overflow. The maximum sequence number is 32-bytes.");const t=new ArrayBuffer(4);return new DataView(t).setUint32(0,e,!1),new Uint8Array(t)}const Ve=12;async function Zr(e,t,n){const r=Gr(t),a=new Uint8Array(Ve);crypto.getRandomValues(a);const i=await crypto.subtle.encrypt($t(r,a),n,new TextEncoder().encode(e)),o=new Uint8Array(r.byteLength+a.byteLength+i.byteLength);return o.set(new Uint8Array(r),0),o.set(new Uint8Array(a),r.byteLength),o.set(new Uint8Array(i),r.byteLength+a.byteLength),o}async function Xt(e,t){const n=e.slice(0,4),r=e.slice(4,4+Ve),a=e.slice(4+Ve),i=await crypto.subtle.decrypt($t(n,r),t,a);return Jr().decode(i)}function $t(e,t){return{additionalData:e,iv:t,name:"AES-GCM",tagLength:128}}let Ke;function Jr(){return Ke===void 0&&(Ke=new TextDecoder("utf-8")),Ke}async function en(){return await crypto.subtle.generateKey({name:"ECDSA",namedCurve:"P-256"},!1,["sign"])}async function ue(){return await crypto.subtle.generateKey({name:"ECDH",namedCurve:"P-256"},!1,["deriveKey","deriveBits"])}function tn(e){let t="";const n=new Uint8Array(e),r=n.byteLength;for(let a=0;a<r;a++)t+=String.fromCharCode(n[a]);return window.btoa(t)}function Yr(){return nn(49152+Math.floor(Math.random()*16384))}function nn(e){if(e<49152||e>65535)throw new x(O.ERROR_ASSOCIATION_PORT_OUT_OF_RANGE,`Association port number must be between 49152 and 65535. ${e} given.`,{port:e});return e}function rn(e){return e.replace(/[/+=]/g,t=>({"/":"_","+":"-","=":"."})[t])}const Xr="solana-wallet";function Ut(e){return e.replace(/(^\/+|\/+$)/g,"").split("/")}function an(e,t){let n=null;if(t){try{n=new URL(t)}catch{}if(n?.protocol!=="https:")throw new x(O.ERROR_FORBIDDEN_WALLET_BASE_URL,"Base URLs supplied by wallets must be valid `https` URLs")}n||=new URL(`${Xr}:/`);const r=e.startsWith("/")?e:[...Ut(n.pathname),...Ut(e)].join("/");return new URL(r,n)}async function $r(e,t,n,r=["v1"]){const a=nn(t),i=tn(await crypto.subtle.exportKey("raw",e)),o=an("v1/associate/local",n);return o.searchParams.set("association",rn(i)),o.searchParams.set("port",`${a}`),r.forEach(s=>{o.searchParams.set("v",s)}),o}async function ea(e,t,n,r,a=["v1"]){const i=tn(await crypto.subtle.exportKey("raw",e)),o=an("v1/associate/remote",r);return o.searchParams.set("association",rn(i)),o.searchParams.set("reflector",`${t}`),o.searchParams.set("id",`${ne(n,!0)}`),a.forEach(s=>{o.searchParams.set("v",s)}),o}async function on(e,t){const n=JSON.stringify(e),r=e.id;return Zr(n,r,t)}async function sn(e,t){const n=await Xt(e,t),r=JSON.parse(n);if(Object.hasOwnProperty.call(r,"error"))throw new Ze(r.id,r.error.code,r.error.message);return r}async function ln(e,t,n){const[r,a]=await Promise.all([crypto.subtle.exportKey("raw",t),crypto.subtle.importKey("raw",e.slice(0,65),{name:"ECDH",namedCurve:"P-256"},!1,[])]),i=await crypto.subtle.deriveBits({name:"ECDH",public:a},n,256),o=await crypto.subtle.importKey("raw",i,"HKDF",!1,["deriveKey"]);return await crypto.subtle.deriveKey({name:"HKDF",hash:"SHA-256",salt:new Uint8Array(r),info:new Uint8Array},o,{name:"AES-GCM",length:128},!1,["encrypt","decrypt"])}async function cn(e,t){const n=await Xt(e,t),r=JSON.parse(n);let a="legacy";if(Object.hasOwnProperty.call(r,"v"))switch(r.v){case 1:case"1":case"v1":a="v1";break;case"legacy":a="legacy";break;default:throw new x(O.ERROR_INVALID_PROTOCOL_VERSION,`Unknown/unsupported protocol version: ${r.v}`)}return{protocol_version:a}}const he={Firefox:0,Other:1};function ta(){return navigator.userAgent.indexOf("Firefox/")!==-1?he.Firefox:he.Other}function na(){return new Promise((e,t)=>{function n(){clearTimeout(a),window.removeEventListener("blur",r)}function r(){n(),e()}window.addEventListener("blur",r);const a=setTimeout(()=>{n(),t()},3e3)})}let te=null;function ra(e){te==null&&(te=document.createElement("iframe"),te.style.display="none",document.body.appendChild(te)),te.contentWindow.location.href=e.toString()}async function aa(e){if(e.protocol==="https:")window.location.assign(e);else try{const t=ta();switch(t){case he.Firefox:ra(e);break;case he.Other:{const n=na();window.location.assign(e),await n;break}default:}}catch{throw new x(O.ERROR_WALLET_NOT_FOUND,"Found no installed wallet that supports the mobile wallet protocol.")}}async function ia(e,t){const n=Yr();return await aa(await $r(e,n,t)),n}const fe={retryDelayScheduleMs:[150,150,200,500,500,750,750,1e3],timeoutMs:3e4},dn="com.solana.mobilewalletadapter.v1",Ft="com.solana.mobilewalletadapter.v1.base64";function un(){if(typeof window>"u"||window.isSecureContext!==!0)throw new x(O.ERROR_SECURE_CONTEXT_REQUIRED,"The mobile wallet adapter protocol must be used in a secure context (`https`).")}function hn(e){let t;try{t=new URL(e)}catch{throw new x(O.ERROR_FORBIDDEN_WALLET_BASE_URL,"Invalid base URL supplied by wallet")}if(t.protocol!=="https:")throw new x(O.ERROR_FORBIDDEN_WALLET_BASE_URL,"Base URLs supplied by wallets must be valid `https` URLs")}function me(e){return new DataView(e).getUint32(0,!1)}function oa(e){var t=new Uint8Array(e),n=e.byteLength,r=10,a=0,i=0,o;do{if(i>=n||i>r)throw new RangeError("Failed to decode varint");o=t[i++],a|=(o&127)<<7*i}while(o>=128);return{value:a,offset:i}}function sa(e){let{value:t,offset:n}=oa(e);return new Uint8Array(e.slice(n,n+t))}async function la(e){un();const t=await en(),n=`ws://localhost:${await ia(t.publicKey,e?.baseUri)}/solana-wallet`;let r;const a=(()=>{const E=[...fe.retryDelayScheduleMs];return()=>E.length>1?E.shift():E[0]})();let i=1,o=0,s={__type:"disconnected"},l,c=!1,u;return{close:()=>{l.close(),u()},wallet:new Promise((E,y)=>{const d={},g=async()=>{if(s.__type!=="connecting"){console.warn(`Expected adapter state to be \`connecting\` at the moment the websocket opens. Got \`${s.__type}\`.`);return}l.removeEventListener("open",g);const{associationKeypair:I}=s,p=await ue();l.send(await de(p.publicKey,I.privateKey)),s={__type:"hello_req_sent",associationPublicKey:I.publicKey,ecdhPrivateKey:p.privateKey}},m=I=>{I.wasClean?s={__type:"disconnected"}:y(new x(O.ERROR_SESSION_CLOSED,`The wallet session dropped unexpectedly (${I.code}: ${I.reason}).`,{closeEvent:I})),A()},M=async I=>{A(),Date.now()-r>=fe.timeoutMs?y(new x(O.ERROR_SESSION_TIMEOUT,`Failed to connect to the wallet websocket at ${n}.`)):(await new Promise(p=>{const w=a();v=window.setTimeout(p,w)}),b())},C=async I=>{const p=await I.data.arrayBuffer();switch(s.__type){case"connecting":if(p.byteLength!==0)throw new Error("Encountered unexpected message while connecting");const w=await ue();l.send(await de(w.publicKey,t.privateKey)),s={__type:"hello_req_sent",associationPublicKey:t.publicKey,ecdhPrivateKey:w.privateKey};break;case"connected":try{const h=me(p.slice(0,4));if(h!==o+1)throw new Error("Encrypted message has invalid sequence number");o=h;const f=await sn(p,s.sharedSecret),L=d[f.id];delete d[f.id],L.resolve(f.result)}catch(h){if(h instanceof Ze){const f=d[h.jsonRpcMessageId];delete d[h.jsonRpcMessageId],f.reject(h)}else throw h}break;case"hello_req_sent":{if(p.byteLength===0){const _=await ue();l.send(await de(_.publicKey,t.privateKey)),s={__type:"hello_req_sent",associationPublicKey:t.publicKey,ecdhPrivateKey:_.privateKey};break}const h=await ln(p,s.associationPublicKey,s.ecdhPrivateKey),f=p.slice(65),L=f.byteLength!==0?await(async()=>{const _=me(f.slice(0,4));if(_!==o+1)throw new Error("Encrypted message has invalid sequence number");return o=_,cn(f,h)})():{protocol_version:"legacy"};s={__type:"connected",sharedSecret:h,sessionProperties:L};const R=Yt(L.protocol_version,async(_,S)=>{const T=i++;return l.send(await on({id:T,jsonrpc:"2.0",method:_,params:S??{}},h)),new Promise((D,B)=>{d[T]={resolve(V){switch(_){case"authorize":case"reauthorize":{const{wallet_uri_base:H}=V;if(H!=null)try{hn(H)}catch($){B($);return}break}}D(V)},reject:B}})});c=!0;try{E(R)}catch(_){y(_)}break}}};u=()=>{l.removeEventListener("message",C),A(),c||y(new x(O.ERROR_SESSION_CLOSED,"The wallet session was closed before connection.",{closeEvent:new CloseEvent("socket was closed before connection")}))};let A,v;const b=()=>{A&&A(),s={__type:"connecting",associationKeypair:t},r===void 0&&(r=Date.now()),l=new WebSocket(n,[dn]),l.addEventListener("open",g),l.addEventListener("close",m),l.addEventListener("error",M),l.addEventListener("message",C),A=()=>{window.clearTimeout(v),l.removeEventListener("open",g),l.removeEventListener("close",m),l.removeEventListener("error",M),l.removeEventListener("message",C)}};b()})}}async function ca(e){un();const t=await en(),n=`wss://${e?.remoteHostAuthority}/reflect`;let r;const a=(()=>{const m=[...fe.retryDelayScheduleMs];return()=>m.length>1?m.shift():m[0]})();let i=1,o=0,s,l={__type:"disconnected"},c,u,E=async m=>s=="base64"?Je(await m.data).buffer:await m.data.arrayBuffer();const y=await new Promise((m,M)=>{const C=async()=>{if(l.__type!=="connecting"){console.warn(`Expected adapter state to be \`connecting\` at the moment the websocket opens. Got \`${l.__type}\`.`);return}c.protocol.includes(Ft)?s="base64":s="binary",c.removeEventListener("open",C)},A=w=>{w.wasClean?l={__type:"disconnected"}:M(new x(O.ERROR_SESSION_CLOSED,`The wallet session dropped unexpectedly (${w.code}: ${w.reason}).`,{closeEvent:w})),u()},v=async w=>{u(),Date.now()-r>=fe.timeoutMs?M(new x(O.ERROR_SESSION_TIMEOUT,`Failed to connect to the wallet websocket at ${n}.`)):(await new Promise(h=>{const f=a();I=window.setTimeout(h,f)}),p())},b=async w=>{const h=await E(w);if(l.__type==="connecting"){if(h.byteLength==0)throw new Error("Encountered unexpected message while connecting");const f=sa(h);l={__type:"reflector_id_received",reflectorId:f};const L=await ea(t.publicKey,e.remoteHostAuthority,f,e?.baseUri);c.removeEventListener("message",b),m(L)}};let I;const p=()=>{u&&u(),l={__type:"connecting",associationKeypair:t},r===void 0&&(r=Date.now()),c=new WebSocket(n,[dn,Ft]),c.addEventListener("open",C),c.addEventListener("close",A),c.addEventListener("error",v),c.addEventListener("message",b),u=()=>{window.clearTimeout(I),c.removeEventListener("open",C),c.removeEventListener("close",A),c.removeEventListener("error",v),c.removeEventListener("message",b)}};p()});let d=!1,g;return{associationUrl:y,close:()=>{c.close(),g()},wallet:new Promise((m,M)=>{const C={},A=async v=>{const b=await E(v);switch(l.__type){case"reflector_id_received":if(b.byteLength!==0)throw new Error("Encountered unexpected message while awaiting reflection");const I=await ue(),p=await de(I.publicKey,t.privateKey);s=="base64"?c.send(ne(p)):c.send(p),l={__type:"hello_req_sent",associationPublicKey:t.publicKey,ecdhPrivateKey:I.privateKey};break;case"connected":try{const w=me(b.slice(0,4));if(w!==o+1)throw new Error("Encrypted message has invalid sequence number");o=w;const h=await sn(b,l.sharedSecret),f=C[h.id];delete C[h.id],f.resolve(h.result)}catch(w){if(w instanceof Ze){const h=C[w.jsonRpcMessageId];delete C[w.jsonRpcMessageId],h.reject(w)}else throw w}break;case"hello_req_sent":{const w=await ln(b,l.associationPublicKey,l.ecdhPrivateKey),h=b.slice(65),f=h.byteLength!==0?await(async()=>{const R=me(h.slice(0,4));if(R!==o+1)throw new Error("Encrypted message has invalid sequence number");return o=R,cn(h,w)})():{protocol_version:"legacy"};l={__type:"connected",sharedSecret:w,sessionProperties:f};const L=Yt(f.protocol_version,async(R,_)=>{const S=i++,T=await on({id:S,jsonrpc:"2.0",method:R,params:_??{}},w);return s=="base64"?c.send(ne(T)):c.send(T),new Promise((D,B)=>{C[S]={resolve(V){switch(R){case"authorize":case"reauthorize":{const{wallet_uri_base:H}=V;if(H!=null)try{hn(H)}catch($){B($);return}break}}D(V)},reject:B}})});d=!0;try{m(L)}catch(R){M(R)}break}}};c.addEventListener("message",A),g=()=>{c.removeEventListener("message",A),u(),d||M(new x(O.ERROR_SESSION_CLOSED,"The wallet session was closed before connection.",{closeEvent:new CloseEvent("socket was closed before connection")}))}})}}function da(e){if(e.length>=255)throw new TypeError("Alphabet too long");const t=new Uint8Array(256);for(let c=0;c<t.length;c++)t[c]=255;for(let c=0;c<e.length;c++){const u=e.charAt(c),E=u.charCodeAt(0);if(t[E]!==255)throw new TypeError(u+" is ambiguous");t[E]=c}const n=e.length,r=e.charAt(0),a=Math.log(n)/Math.log(256),i=Math.log(256)/Math.log(n);function o(c){if(c instanceof Uint8Array||(ArrayBuffer.isView(c)?c=new Uint8Array(c.buffer,c.byteOffset,c.byteLength):Array.isArray(c)&&(c=Uint8Array.from(c))),!(c instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(c.length===0)return"";let u=0,E=0,y=0;const d=c.length;for(;y!==d&&c[y]===0;)y++,u++;const g=(d-y)*i+1>>>0,m=new Uint8Array(g);for(;y!==d;){let A=c[y],v=0;for(let b=g-1;(A!==0||v<E)&&b!==-1;b--,v++)A+=256*m[b]>>>0,m[b]=A%n>>>0,A=A/n>>>0;if(A!==0)throw new Error("Non-zero carry");E=v,y++}let M=g-E;for(;M!==g&&m[M]===0;)M++;let C=r.repeat(u);for(;M<g;++M)C+=e.charAt(m[M]);return C}function s(c){if(typeof c!="string")throw new TypeError("Expected String");if(c.length===0)return new Uint8Array;let u=0,E=0,y=0;for(;c[u]===r;)E++,u++;const d=(c.length-u)*a+1>>>0,g=new Uint8Array(d);for(;u<c.length;){const A=c.charCodeAt(u);if(A>255)return;let v=t[A];if(v===255)return;let b=0;for(let I=d-1;(v!==0||b<y)&&I!==-1;I--,b++)v+=n*g[I]>>>0,g[I]=v%256>>>0,v=v/256>>>0;if(v!==0)throw new Error("Non-zero carry");y=b,u++}let m=d-y;for(;m!==d&&g[m]===0;)m++;const M=new Uint8Array(E+(d-m));let C=E;for(;m!==d;)M[C++]=g[m++];return M}function l(c){const u=s(c);if(u)return u;throw new Error("Non-base"+n+" character")}return{encode:o,decodeUnsafe:s,decode:l}}var ua="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";const re=da(ua),ha=`
<div class="mobile-wallet-adapter-embedded-loading-indicator" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div data-modal-close style="position: absolute; width: 100%; height: 100%;"></div>
    <div class="mobile-wallet-adapter-embedded-loading-container">
        <div class="mobile-wallet-adapter-embedded-loading-animation"></div>
    </div>
</div>
`,fa=`
.mobile-wallet-adapter-embedded-loading-indicator {
    display: flex; /* Use flexbox to center content */
    justify-content: center; /* Center horizontally */
    align-items: start; /* Center vertically */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    overflow-y: auto; /* enable scrolling */
}

.mobile-wallet-adapter-embedded-loading-container {
    display: flex;
    margin: auto;
}

.mobile-wallet-adapter-embedded-loading-animation {
    position: relative;
    left: -9999px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--spinner-color);
    color: var(--spinner-color);
    box-shadow: 9984px 0 0 0 var(--spinner-color), 
                9999px 0 0 0 var(--spinner-color), 
                10014px 0 0 0 var(--spinner-color);
    animation: dot-typing 1.5s infinite linear;
}

@keyframes dot-typing {
    0% {
        box-shadow: 9984px 0 0 0 var(--spinner-color), 
                    9999px 0 0 0 var(--spinner-color), 
                    10014px 0 0 0 var(--spinner-color);
    }
    16.667% {
        box-shadow: 9984px -10px 0 0 var(--spinner-color), 
                    9999px 0 0 0 var(--spinner-color), 
                    10014px 0 0 0 var(--spinner-color);
    }
    33.333% {
        box-shadow: 9984px 0 0 0 var(--spinner-color), 
                    9999px 0 0 0 var(--spinner-color), 
                    10014px 0 0 0 var(--spinner-color);
    }
    50% {
        box-shadow: 9984px 0 0 0 var(--spinner-color), 
                    9999px -10px 0 0 var(--spinner-color), 
                    10014px 0 0 0 var(--spinner-color);
    }
    66.667% {
        box-shadow: 9984px 0 0 0 var(--spinner-color), 
                    9999px 0 0 0 var(--spinner-color), 
                    10014px 0 0 0 var(--spinner-color);
    }
    83.333% {
        box-shadow: 9984px 0 0 0 var(--spinner-color), 
                    9999px 0 0 0 var(--spinner-color), 
                    10014px -10px 0 0 var(--spinner-color);
    }
    100% {
        box-shadow: 9984px 0 0 0 var(--spinner-color), 
                    9999px 0 0 0 var(--spinner-color), 
                    10014px 0 0 0 var(--spinner-color);
    }
}
`;var ma=class{#e=null;#n={};#r=!1;dom=null;constructor(){this.init=this.init.bind(this),this.#e=document.getElementById("mobile-wallet-adapter-embedded-root-ui")}async init(){console.log("Injecting modal"),this.#l()}open=()=>{console.debug("Modal open"),this.#c(),this.#e&&(this.#e.style.display="flex")};close=(e=void 0)=>{console.debug("Modal close"),this.#i(),this.#e&&(this.#e.style.display="none"),this.#n.close?.forEach(t=>t(e))};addEventListener(e,t){return this.#n[e]?.push(t)||(this.#n[e]=[t]),()=>this.removeEventListener(e,t)}removeEventListener(e,t){this.#n[e]=this.#n[e]?.filter(n=>t!==n)}#l(){if(this.dom)return;this.#e=document.createElement("div"),this.#e.id="mobile-wallet-adapter-embedded-root-ui",this.#e.innerHTML=ha,this.#e.style.display="none";const e=document.createElement("style");e.id="mobile-wallet-adapter-embedded-modal-styles",e.textContent=fa;const t=document.createElement("div");this.dom=t.attachShadow({mode:"closed"}),t.style.setProperty("--spinner-color","#FFFFFF"),this.dom.appendChild(e),this.dom.appendChild(this.#e),document.body.appendChild(t)}#c(){!this.#e||this.#r||([...this.#e.querySelectorAll("[data-modal-close]")].forEach(e=>e?.addEventListener("click",t=>{this.close(t)})),window.addEventListener("load",this.close),document.addEventListener("keydown",this.#t),this.#r=!0)}#i(){this.#r&&(window.removeEventListener("load",this.close),document.removeEventListener("keydown",this.#t),this.#e&&([...this.#e.querySelectorAll("[data-modal-close]")].forEach(e=>e?.removeEventListener("click",this.close)),this.#r=!1))}#t=e=>{e.key==="Escape"&&this.close(e)}};const pa=`
<div class="mobile-wallet-adapter-embedded-modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div data-modal-close style="position: absolute; width: 100%; height: 100%;"></div>
	<div class="mobile-wallet-adapter-embedded-modal-card">
		<div>
			<button data-modal-close class="mobile-wallet-adapter-embedded-modal-close">
				<svg width="14" height="14">
					<path d="M 6.7125,8.3036995 1.9082,13.108199 c -0.2113,0.2112 -0.4765,0.3168 -0.7957,0.3168 -0.3192,0 -0.5844,-0.1056 -0.7958,-0.3168 C 0.1056,12.896899 0,12.631699 0,12.312499 c 0,-0.3192 0.1056,-0.5844 0.3167,-0.7958 L 5.1212,6.7124995 0.3167,1.9082 C 0.1056,1.6969 0,1.4317 0,1.1125 0,0.7933 0.1056,0.5281 0.3167,0.3167 0.5281,0.1056 0.7933,0 1.1125,0 1.4317,0 1.6969,0.1056 1.9082,0.3167 L 6.7125,5.1212 11.5167,0.3167 C 11.7281,0.1056 11.9933,0 12.3125,0 c 0.3192,0 0.5844,0.1056 0.7957,0.3167 0.2112,0.2114 0.3168,0.4766 0.3168,0.7958 0,0.3192 -0.1056,0.5844 -0.3168,0.7957 L 8.3037001,6.7124995 13.1082,11.516699 c 0.2112,0.2114 0.3168,0.4766 0.3168,0.7958 0,0.3192 -0.1056,0.5844 -0.3168,0.7957 -0.2113,0.2112 -0.4765,0.3168 -0.7957,0.3168 -0.3192,0 -0.5844,-0.1056 -0.7958,-0.3168 z" />
				</svg>
			</button>
		</div>
		<div class="mobile-wallet-adapter-embedded-modal-content"></div>
	</div>
</div>
`,ga=`
.mobile-wallet-adapter-embedded-modal-container {
    display: flex; /* Use flexbox to center content */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    position: fixed; /* Stay in place */
    z-index: 2147483647; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    overflow-y: auto; /* enable scrolling */
}

.mobile-wallet-adapter-embedded-modal-card {
    display: flex;
    flex-direction: column;
    margin: auto 20px;
    max-width: 780px;
    padding: 20px;
    border-radius: 24px;
    background: #ffffff;
    font-family: "Inter Tight", "PT Sans", Calibri, sans-serif;
    transform: translateY(-200%);
    animation: slide-in 0.5s forwards;
}

@keyframes slide-in {
    100% { transform: translateY(0%); }
}

.mobile-wallet-adapter-embedded-modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: #e4e9e9;
    border: none;
    border-radius: 50%;
}

.mobile-wallet-adapter-embedded-modal-close:focus-visible {
    outline-color: red;
}

.mobile-wallet-adapter-embedded-modal-close svg {
    fill: #546266;
    transition: fill 200ms ease 0s;
}

.mobile-wallet-adapter-embedded-modal-close:hover svg {
    fill: #fff;
}
`,wa=`
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
`;var ae=class{#e=null;#n={};#r=!1;dom=null;constructor(){this.init=this.init.bind(this),this.#e=document.getElementById("mobile-wallet-adapter-embedded-root-ui")}async init(){console.log("Injecting modal"),this.#l()}open=()=>{console.debug("Modal open"),this.#c(),this.#e&&(this.#e.style.display="flex")};close=(e=void 0)=>{console.debug("Modal close"),this.#i(),this.#e&&(this.#e.style.display="none"),this.#n.close?.forEach(t=>t(e))};addEventListener(e,t){return this.#n[e]?.push(t)||(this.#n[e]=[t]),()=>this.removeEventListener(e,t)}removeEventListener(e,t){this.#n[e]=this.#n[e]?.filter(n=>t!==n)}#l(){if(document.getElementById("mobile-wallet-adapter-embedded-root-ui")){this.#e||(this.#e=document.getElementById("mobile-wallet-adapter-embedded-root-ui"));return}this.#e=document.createElement("div"),this.#e.id="mobile-wallet-adapter-embedded-root-ui",this.#e.innerHTML=pa,this.#e.style.display="none";const e=this.#e.querySelector(".mobile-wallet-adapter-embedded-modal-content");e&&(e.innerHTML=this.contentHtml);const t=document.createElement("style");t.id="mobile-wallet-adapter-embedded-modal-styles",t.textContent=ga+this.contentStyles;const n=document.createElement("div");n.innerHTML=wa,this.dom=n.attachShadow({mode:"closed"}),this.dom.appendChild(t),this.dom.appendChild(this.#e),document.body.appendChild(n)}#c(){!this.#e||this.#r||([...this.#e.querySelectorAll("[data-modal-close]")].forEach(e=>e?.addEventListener("click",this.close)),window.addEventListener("load",this.close),document.addEventListener("keydown",this.#t),this.#r=!0)}#i(){this.#r&&(window.removeEventListener("load",this.close),document.removeEventListener("keydown",this.#t),this.#e&&([...this.#e.querySelectorAll("[data-modal-close]")].forEach(e=>e?.removeEventListener("click",this.close)),this.#r=!1))}#t=e=>{e.key==="Escape"&&this.close(e)}},ya=class extends ae{contentStyles=Ea;contentHtml=ba;async initWithQR(e){super.init(),this.populateQRCode(e)}async populateQRCode(e){const t=this.dom?.getElementById("mobile-wallet-adapter-embedded-modal-qr-code-container");if(t){const n=await Br.toCanvas(e,{width:200,margin:0});t.firstElementChild!==null?t.replaceChild(n,t.firstElementChild):t.appendChild(n);const r=this.dom?.getElementById("mobile-wallet-adapter-embedded-modal-qr-placeholder");r&&(r.style.display="none")}else console.error("QRCode Container not found")}};const ba=`
<div class="mobile-wallet-adapter-embedded-modal-qr-content">
    <div>
        <svg class="mobile-wallet-adapter-embedded-modal-icon" width="100%" height="100%">
            <circle r="52" cx="53" cy="53" fill="#99b3be" stroke="#000000" stroke-width="2"/>
            <path d="m 53,82.7305 c -3.3116,0 -6.1361,-1.169 -8.4735,-3.507 -2.338,-2.338 -3.507,-5.1625 -3.507,-8.4735 0,-3.3116 1.169,-6.1364 3.507,-8.4744 2.3374,-2.338 5.1619,-3.507 8.4735,-3.507 3.3116,0 6.1361,1.169 8.4735,3.507 2.338,2.338 3.507,5.1628 3.507,8.4744 0,3.311 -1.169,6.1355 -3.507,8.4735 -2.3374,2.338 -5.1619,3.507 -8.4735,3.507 z m 0.007,-5.25 c 1.8532,0 3.437,-0.6598 4.7512,-1.9793 1.3149,-1.3195 1.9723,-2.9058 1.9723,-4.7591 0,-1.8526 -0.6598,-3.4364 -1.9793,-4.7512 -1.3195,-1.3149 -2.9055,-1.9723 -4.7582,-1.9723 -1.8533,0 -3.437,0.6598 -4.7513,1.9793 -1.3148,1.3195 -1.9722,2.9058 -1.9722,4.7591 0,1.8527 0.6597,3.4364 1.9792,4.7512 1.3195,1.3149 2.9056,1.9723 4.7583,1.9723 z m -28,-33.5729 -3.85,-3.6347 c 4.1195,-4.025 8.8792,-7.1984 14.2791,-9.52 5.4005,-2.3223 11.2551,-3.4834 17.5639,-3.4834 6.3087,0 12.1634,1.1611 17.5639,3.4834 5.3999,2.3216 10.1596,5.495 14.2791,9.52 l -3.85,3.6347 C 77.2999,40.358 73.0684,37.5726 68.2985,35.5514 63.5292,33.5301 58.4296,32.5195 53,32.5195 c -5.4297,0 -10.5292,1.0106 -15.2985,3.0319 -4.7699,2.0212 -9.0014,4.8066 -12.6945,8.3562 z m 44.625,10.8771 c -2.2709,-2.1046 -4.7962,-3.7167 -7.5758,-4.8361 -2.7795,-1.12 -5.7983,-1.68 -9.0562,-1.68 -3.2579,0 -6.2621,0.56 -9.0125,1.68 -2.7504,1.1194 -5.2903,2.7315 -7.6195,4.8361 L 32.5189,51.15 c 2.8355,-2.6028 5.9777,-4.6086 9.4263,-6.0174 3.4481,-1.4087 7.133,-2.1131 11.0548,-2.1131 3.9217,0 7.5979,0.7044 11.0285,2.1131 3.43,1.4088 6.5631,3.4146 9.3992,6.0174 z"/>
        </svg>
        <div class="mobile-wallet-adapter-embedded-modal-title">Remote Mobile Wallet Adapter</div>
    </div>
    <div>
        <div>
            <h4 class="mobile-wallet-adapter-embedded-modal-qr-label">
                Open your wallet and scan this code
            </h4>
        </div>
        <div id="mobile-wallet-adapter-embedded-modal-qr-code-container" class="mobile-wallet-adapter-embedded-modal-qr-code-container">
            <div id="mobile-wallet-adapter-embedded-modal-qr-placeholder" class="mobile-wallet-adapter-embedded-modal-qr-placeholder"></div>
        </div>
    </div>
</div>
<div class="mobile-wallet-adapter-embedded-modal-divider"><hr></div>
<div class="mobile-wallet-adapter-embedded-modal-footer">
    <div class="mobile-wallet-adapter-embedded-modal-subtitle">
        Follow the instructions on your device. When you're finished, this screen will update.
    </div>
    <div class="mobile-wallet-adapter-embedded-modal-progress-badge">
        <div>
            <div class="spinner">
                <div class="leftWrapper">
                    <div class="left">
                        <div class="circle"></div>
                    </div>
                </div>
                <div class="rightWrapper">
                    <div class="right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
        <div>Waiting for scan</div>
    </div>
</div>
`,Ea=`
.mobile-wallet-adapter-embedded-modal-qr-content {
    display: flex; 
    margin-top: 10px;
    padding: 10px;
}

.mobile-wallet-adapter-embedded-modal-qr-content > div:first-child {
    display: flex;
    flex-direction: column;
    flex: 2;
    margin-top: auto;
    margin-right: 30px;
}

.mobile-wallet-adapter-embedded-modal-qr-content > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: auto;
}

.mobile-wallet-adapter-embedded-modal-footer {
    display: flex;
    padding: 10px;
}

.mobile-wallet-adapter-embedded-modal-icon {}

.mobile-wallet-adapter-embedded-modal-title {
    color: #000000;
    font-size: 2.5em;
    font-weight: 600;
}

.mobile-wallet-adapter-embedded-modal-qr-label {
    text-align: right;
    color: #000000;
}

.mobile-wallet-adapter-embedded-modal-qr-code-container {
    margin-left: auto;
}

.mobile-wallet-adapter-embedded-modal-qr-placeholder {
    margin-left: auto;
    min-width: 200px;
    min-height: 200px;
    background: linear-gradient(-60deg, #F7F8F8 30%, #ECEEEE 50%, #F7F8F8 70%);
    background-size: 200%;
    animation: placeholderAnimate 2.7s linear infinite;
    border-radius: 12px;
}

.mobile-wallet-adapter-embedded-modal-divider {
    margin-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
}

.mobile-wallet-adapter-embedded-modal-divider hr {
    border-top: 1px solid #D9DEDE;
}

.mobile-wallet-adapter-embedded-modal-subtitle {
    margin: auto;
    margin-right: 60px;
    padding: 20px;
    color: #6E8286;
}

.mobile-wallet-adapter-embedded-modal-progress-badge {
    display: flex;
    background: #F7F8F8;
    height: 56px;
    min-width: 200px;
    margin: auto;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 18px;
    color: #A8B6B8;
    align-items: center;
}

.mobile-wallet-adapter-embedded-modal-progress-badge > div:first-child {
    margin-left: auto;
    margin-right: 20px;
}

.mobile-wallet-adapter-embedded-modal-progress-badge > div:nth-child(2) {
    margin-right: auto;
}

/* Smaller screens */
@media all and (max-width: 600px) {
    .mobile-wallet-adapter-embedded-modal-card {
        text-align: center;
    }
    .mobile-wallet-adapter-embedded-modal-qr-content {
        flex-direction: column;
    }
    .mobile-wallet-adapter-embedded-modal-qr-content > div:first-child {
        margin: auto;
    }
    .mobile-wallet-adapter-embedded-modal-qr-content > div:nth-child(2) {
        margin: auto;
        flex: 2 auto;
    }
    .mobile-wallet-adapter-embedded-modal-footer {
        flex-direction: column;
    }
    .mobile-wallet-adapter-embedded-modal-icon {
        display: none;
    }
    .mobile-wallet-adapter-embedded-modal-title {
        font-size: 1.5em;
    }
    .mobile-wallet-adapter-embedded-modal-subtitle {
        margin-right: unset;
    }
    .mobile-wallet-adapter-embedded-modal-qr-label {
        text-align: center;
    }
    .mobile-wallet-adapter-embedded-modal-qr-code-container {
        margin: auto;
    }
    .mobile-wallet-adapter-embedded-modal-qr-placeholder {
        margin: auto;
    }
}

/* QR Placeholder */
@keyframes placeholderAnimate {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* Spinner */
@keyframes spinLeft {
    0% {
        transform: rotate(20deg);
    }
    50% {
        transform: rotate(160deg);
    }
    100% {
        transform: rotate(20deg);
    }
}
@keyframes spinRight {
    0% {
        transform: rotate(160deg);
    }
    50% {
        transform: rotate(20deg);
    }
    100% {
        transform: rotate(160deg);
    }
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(2520deg);
    }
}

.spinner {
    position: relative;
    width: 1.5em;
    height: 1.5em;
    margin: auto;
    animation: spin 10s linear infinite;
}
.spinner::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.right, .rightWrapper, .left, .leftWrapper {
    position: absolute;
    top: 0;
    overflow: hidden;
    width: .75em;
    height: 1.5em;
}
.left, .leftWrapper {
    left: 0;
}
.right {
    left: -12px;
}
.rightWrapper {
    right: 0;
}
.circle {
    border: .125em solid #A8B6B8;
    width: 1.25em; /* 1.5em - 2*0.125em border */
    height: 1.25em; /* 1.5em - 2*0.125em border */
    border-radius: 0.75em; /* 0.5*1.5em spinner size 8 */
}
.left {
    transform-origin: 100% 50%;
    animation: spinLeft 2.5s cubic-bezier(.2,0,.8,1) infinite;
}
.right {
    transform-origin: 100% 50%;
    animation: spinRight 2.5s cubic-bezier(.2,0,.8,1) infinite;
}
`,fn="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03IDIuNUgxN0MxNy44Mjg0IDIuNSAxOC41IDMuMTcxNTcgMTguNSA0VjIwQzE4LjUgMjAuODI4NCAxNy44Mjg0IDIxLjUgMTcgMjEuNUg3QzYuMTcxNTcgMjEuNSA1LjUgMjAuODI4NCA1LjUgMjBWNEM1LjUgMy4xNzE1NyA2LjE3MTU3IDIuNSA3IDIuNVpNMyA0QzMgMS43OTA4NiA0Ljc5MDg2IDAgNyAwSDE3QzE5LjIwOTEgMCAyMSAxLjc5MDg2IDIxIDRWMjBDMjEgMjIuMjA5MSAxOS4yMDkxIDI0IDE3IDI0SDdDNC43OTA4NiAyNCAzIDIyLjIwOTEgMyAyMFY0Wk0xMSA0LjYxNTM4QzEwLjQ0NzcgNC42MTUzOCAxMCA1LjA2MzEgMTAgNS42MTUzOFY2LjM4NDYyQzEwIDYuOTM2OSAxMC40NDc3IDcuMzg0NjIgMTEgNy4zODQ2MkgxM0MxMy41NTIzIDcuMzg0NjIgMTQgNi45MzY5IDE0IDYuMzg0NjJWNS42MTUzOEMxNCA1LjA2MzEgMTMuNTUyMyA0LjYxNTM4IDEzIDQuNjE1MzhIMTFaIiBmaWxsPSIjRENCOEZGIi8+Cjwvc3ZnPgo=";function W(e){return window.btoa(String.fromCharCode.call(null,...e))}function P(e){return new Uint8Array(window.atob(e).split("").map(t=>t.charCodeAt(0)))}var Ca=class extends ae{contentStyles=Aa;contentHtml=va;initWithCallback(e){super.init(),this.#e(e)}#e(e){const t=this.dom?.getElementById("mobile-wallet-adapter-launch-action"),n=async()=>{t?.removeEventListener("click",n),this.close(),e()};t?.addEventListener("click",n)}};const va=`
<svg class="mobile-wallet-adapter-embedded-modal-launch-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.6 48C7.2 48 0 40.8 0 26.4V21.6C0 7.2 7.2 0 21.6 0H26.4C40.8 0 48 7.2 48 21.6V26.4C48 40.8 40.8 48 26.4 48H21.6Z" fill="#15994E"/>
    <mask id="mask0_189_522" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="32" height="32">
        <rect x="8" y="8" width="32" height="32" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_189_522)">
        <mask id="mask1_189_522" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="32" height="32">
            <rect x="8" y="8" width="32" height="32" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask1_189_522)">
            <path d="M22.1092 26.1208L19.4498 23.4615C19.1736 23.1851 18.8253 23.0468 18.4048 23.0468C17.9846 23.0468 17.6363 23.1851 17.3598 23.4615C17.0836 23.7377 16.9468 24.0861 16.9495 24.5065C16.9522 24.9267 17.0916 25.275 17.3678 25.5512L21.0405 29.2238C21.3463 29.5276 21.7031 29.6795 22.1108 29.6795C22.5184 29.6795 22.8742 29.5276 23.1782 29.2238L30.5918 21.8098C30.8683 21.5336 31.0065 21.1867 31.0065 20.7692C31.0065 20.3514 30.8683 20.0044 30.5918 19.7282C30.3156 19.4517 29.9673 19.3135 29.5468 19.3135C29.1266 19.3135 28.7784 19.4517 28.5022 19.7282L22.1092 26.1208ZM23.9998 37.6042C22.113 37.6042 20.3425 37.2473 18.6885 36.5335C17.0343 35.8197 15.5954 34.8512 14.3718 33.6278C13.1485 32.4043 12.18 30.9654 11.4662 29.3112C10.7524 27.6572 10.3955 25.8867 10.3955 23.9998C10.3955 22.113 10.7524 20.3425 11.4662 18.6885C12.18 17.0343 13.1485 15.5954 14.3718 14.3718C15.5954 13.1485 17.0343 12.18 18.6885 11.4662C20.3425 10.7524 22.113 10.3955 23.9998 10.3955C25.8867 10.3955 27.6572 10.7524 29.3112 11.4662C30.9654 12.18 32.4043 13.1485 33.6278 14.3718C34.8512 15.5954 35.8197 17.0343 36.5335 18.6885C37.2473 20.3425 37.6042 22.113 37.6042 23.9998C37.6042 25.8867 37.2473 27.6572 36.5335 29.3112C35.8197 30.9654 34.8512 32.4043 33.6278 33.6278C32.4043 34.8512 30.9654 35.8197 29.3112 36.5335C27.6572 37.2473 25.8867 37.6042 23.9998 37.6042Z" fill="white"/>
        </g>
    </g>
</svg>
<div class="mobile-wallet-adapter-embedded-modal-title">Ready to connect!</div>
<div>
    <button data-modal-action id="mobile-wallet-adapter-launch-action" class="mobile-wallet-adapter-embedded-modal-launch-action">
        Connect Wallet
    </button>
</div>
`,Aa=`
.mobile-wallet-adapter-embedded-modal-close {
    display: none;
}
.mobile-wallet-adapter-embedded-modal-content {
    text-align: center;
    min-width: 300px;
}
.mobile-wallet-adapter-embedded-modal-launch-icon {
    margin-top: 24px;
}
.mobile-wallet-adapter-embedded-modal-title {
    margin: 18px 100px 30px 100px;
    color: #000000;
    font-size: 2.75em;
    font-weight: 600;
}
.mobile-wallet-adapter-embedded-modal-launch-action {
    display: block;
    width: 100%;
    height: 56px;
    font-size: 1.25em;
    background: #000000;
    color: #FFFFFF;
    border-radius: 18px;
}
/* Smaller screens */
@media all and (max-width: 600px) {
    .mobile-wallet-adapter-embedded-modal-title {
        font-size: 1.5em;
        margin-right: 12px;
        margin-left: 12px;
    }
}
`;var _a=class extends ae{contentStyles=Sa;get contentHtml(){const e=Pa()?"Long press the app icon on your home screen to open site settings":"Tap the lock or settings icon in the address bar to open site settings";return Ra.replace("{{PERMISSION_INSTRUCTION_DETAIL}}",e)}async init(){super.init(),this.#e()}#e(){const e=this.dom?.getElementById("mobile-wallet-adapter-launch-action"),t=async n=>{e?.removeEventListener("click",t),this.close(n)};e?.addEventListener("click",t)}};const Ra=`
<div class="mobile-wallet-adapter-embedded-modal-header">
    Local Wallet Connection
</div>
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.6 48C7.2 48 0 40.8 0 26.4V21.6C0 7.2 7.2 0 21.6 0H26.4C40.8 0 48 7.2 48 21.6V26.4C48 40.8 40.8 48 26.4 48H21.6Z" fill="#ED1515"/>
    <mask id="mask0_147_1364" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="32" height="32">
        <rect x="8" y="8" width="32" height="32" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_147_1364)">
        <path d="M20.1398 36.2705C19.7363 36.2705 19.3508 36.1945 18.9835 36.0425C18.6162 35.8907 18.2916 35.674 18.0098 35.3922L12.6072 29.9895C12.3254 29.7077 12.1086 29.3832 11.9568 29.0158C11.8048 28.6485 11.7288 28.2631 11.7288 27.8595V20.1395C11.7288 19.736 11.8048 19.3505 11.9568 18.9832C12.1086 18.6158 12.3254 18.2913 12.6072 18.0095L18.0098 12.6068C18.2916 12.3251 18.6162 12.1083 18.9835 11.9565C19.3508 11.8045 19.7363 11.7285 20.1398 11.7285H27.8598C28.2634 11.7285 28.6488 11.8045 29.0162 11.9565C29.3835 12.1083 29.708 12.3251 29.9898 12.6068L35.3925 18.0095C35.6743 18.2913 35.891 18.6158 36.0428 18.9832C36.1948 19.3505 36.2708 19.736 36.2708 20.1395V27.8595C36.2708 28.2631 36.1948 28.6485 36.0428 29.0158C35.891 29.3832 35.6743 29.7077 35.3925 29.9895L29.9898 35.3922C29.708 35.674 29.3835 35.8907 29.0162 36.0425C28.6488 36.1945 28.2634 36.2705 27.8598 36.2705H20.1398ZM20.1732 33.2372H27.8265L33.2375 27.8262V20.1728L27.8265 14.7618H20.1732L14.7622 20.1728V27.8262L20.1732 33.2372ZM23.9998 25.9538L26.7868 28.7408C27.0473 29.0013 27.3729 29.1302 27.7638 29.1275C28.1549 29.1248 28.4807 28.9933 28.7412 28.7328C29.0016 28.4724 29.1318 28.1466 29.1318 27.7555C29.1318 27.3646 29.0016 27.039 28.7412 26.7785L25.9542 23.9995L28.7412 21.2125C29.0016 20.9521 29.1318 20.6264 29.1318 20.2355C29.1318 19.8444 29.0016 19.5186 28.7412 19.2582C28.4807 18.9977 28.1549 18.8675 27.7638 18.8675C27.3729 18.8675 27.0473 18.9977 26.7868 19.2582L23.9998 22.0452L21.2128 19.2582C20.9524 18.9977 20.628 18.8675 20.2398 18.8675C19.8514 18.8675 19.5269 18.9977 19.2665 19.2582C19.006 19.5186 18.8758 19.8444 18.8758 20.2355C18.8758 20.6264 19.006 20.9521 19.2665 21.2125L22.0455 23.9995L19.2585 26.7865C18.998 27.047 18.8692 27.3713 18.8718 27.7595C18.8745 28.148 19.006 28.4724 19.2665 28.7328C19.5269 28.9933 19.8527 29.1235 20.2438 29.1235C20.6347 29.1235 20.9604 28.9933 21.2208 28.7328L23.9998 25.9538Z" fill="black"/>
    </g>
</svg>
<div class="mobile-wallet-adapter-embedded-modal-title">
    Your wallet connection is blocked
</div>
<div id="mobile-wallet-adapter-local-launch-message" class="mobile-wallet-adapter-embedded-modal-subtitle">
    Visit site settings in the address bar and allow "Apps on Device".
</div>

<div class="mobile-wallet-adapter-embedded-modal-divider"><hr></div>
<div class="mobile-wallet-adapter-embedded-modal-footer">
    <div class="mobile-wallet-adapter-embedded-modal-details">
        <!-- Clickable header (label associated with the checkbox) -->
      	<label for="collapsible-1" class="mobile-wallet-adapter-embedded-modal-details-collapsible-header">
            <!-- Hidden checkbox to track state -->
            <input type="checkbox" id="collapsible-1" class="mobile-wallet-adapter-embedded-modal-details-collapsible-input">
            <span class="mobile-wallet-adapter-embedded-modal-details-collapsible-header-label">
              See details
            </span>
            <svg class="mobile-wallet-adapter-embedded-modal-details-collapsible-header-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_147_1382" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_147_1382)">
                <path d="M11.9999 17.0811C11.8506 17.0811 11.7087 17.0563 11.5741 17.0067C11.4395 16.957 11.3162 16.8762 11.2042 16.7643L6.57924 12.1393C6.36801 11.9281 6.26656 11.667 6.27489 11.3561C6.28322 11.0453 6.39301 10.7842 6.60424 10.573C6.81547 10.3618 7.08069 10.2561 7.39989 10.2561C7.71909 10.2561 7.9843 10.3618 8.19554 10.573L11.9999 14.3773L15.8292 10.548C16.0405 10.3368 16.3015 10.2353 16.6124 10.2436C16.9233 10.252 17.1843 10.3618 17.3955 10.573C17.6068 10.7842 17.7124 11.0494 17.7124 11.3686C17.7124 11.6878 17.6068 11.9531 17.3955 12.1643L12.7955 16.7643C12.6836 16.8762 12.5603 16.957 12.4257 17.0067C12.2911 17.0563 12.1492 17.0811 11.9999 17.0811Z" fill="black"/>
              </g>
            </svg>
      	</label>
        
        <!-- Content to show/hide -->
        <ul class="mobile-wallet-adapter-embedded-modal-details-collapsible-content">
            <li>{{PERMISSION_INSTRUCTION_DETAIL}}</li>
            <li>Allow "Apps on Device"</li>
        </ul>
    </div>
</div>
<div>
    <button data-modal-action id="mobile-wallet-adapter-launch-action" class="mobile-wallet-adapter-embedded-modal-launch-action">
        Got it
    </button>
</div>
`,Sa=`
.mobile-wallet-adapter-embedded-modal-close {
    display: none;
}
.mobile-wallet-adapter-embedded-modal-content {
    text-align: center;
}
.mobile-wallet-adapter-embedded-modal-header {
    margin: 18px auto 30px auto;
    color: #7D9093;
    font-size: 1.0em;
    font-weight: 500;
}
.mobile-wallet-adapter-embedded-modal-title {
    margin: 18px 100px auto 100px;
    color: #000000;
    font-size: 2.75em;
    font-weight: 600;
}
.mobile-wallet-adapter-embedded-modal-subtitle {
    margin: 12px 60px 30px 60px;
    color: #7D9093;
    font-size: 1.25em;
    font-weight: 400;
}
.mobile-wallet-adapter-embedded-modal-details-collapsible-header {
    display: flex;
    flex-direction: row;
  	justify-content: space-between;
    margin: 10px auto 10px auto;
    color: #000000;
    font-size: 1.5em;
    font-weight: 600;
    cursor: pointer; /* Show pointer on hover */
    transition: background 0.2s ease; /* Smooth background change */
}
.mobile-wallet-adapter-embedded-modal-details-collapsible-header-icon {
  	transition: rotate 0.3s ease;
}
.mobile-wallet-adapter-embedded-modal-details-collapsible-input {
  	display: none; /* Hide the checkbox */
}
.mobile-wallet-adapter-embedded-modal-details-collapsible-content {
    margin: 0px auto 40px auto;
    max-height: 0px; /* Collapse content */
    overflow: hidden; /* Hide overflow when collapsed */
    transition: max-height 0.3s ease; /* Smooth transition */
}
.mobile-wallet-adapter-embedded-modal-details-collapsible-content li {
    margin: 20px auto;
    color: #000000;
    font-size: 1.25em;
    font-weight: 400;
    text-align: left;
}
/* When checkbox is checked, show content */
.mobile-wallet-adapter-embedded-modal-details-collapsible-header:has(> input:checked) ~ .mobile-wallet-adapter-embedded-modal-details-collapsible-content {
  	max-height: 300px;
}
.mobile-wallet-adapter-embedded-modal-details-collapsible-header:has(> input:checked) > .mobile-wallet-adapter-embedded-modal-details-collapsible-header-icon {
  	rotate: 180deg;
}
.mobile-wallet-adapter-embedded-modal-launch-action {
    display: block;
    width: 100%;
    height: 56px;
    /*margin-top: 40px;*/
    font-size: 1.25em;
    /*line-height: 24px;*/
    /*letter-spacing: -1%;*/
    background: #000000;
    color: #FFFFFF;
    border-radius: 18px;
}
/* Smaller screens */
@media all and (max-width: 600px) {
    .mobile-wallet-adapter-embedded-modal-title {
        font-size: 1.75em;
        margin-right: 12px;
        margin-left: 12px;
    }
    .mobile-wallet-adapter-embedded-modal-subtitle {
        margin-right: 12px;
        margin-left: 12px;
    }
}
`;var La=class extends ae{contentStyles=Ta;contentHtml=Ma;async init(){super.init(),this.#e()}#e(){const e=this.dom?.getElementById("mobile-wallet-adapter-launch-action"),t=async()=>{e?.removeEventListener("click",t);try{await fetch("http://localhost")}catch{}this.close()};e?.addEventListener("click",t)}};const Ma=`
<div class="mobile-wallet-adapter-embedded-modal-title">Allow connections to your wallet</div>
<div id="mobile-wallet-adapter-local-launch-message" class="mobile-wallet-adapter-embedded-modal-subtitle">
    Tap "Allow" on the next screen
</div>
<svg class="mobile-wallet-adapter-embedded-modal-permission-prompt-mock" xmlns="http://www.w3.org/2000/svg" width="281" height="83" viewBox="0 0 281 83" fill="none">
    <rect width="281" height="83" rx="22" fill="#F0F3F5"/>
    <path d="M254.194 64L252.626 56.657H254.047L254.866 61.452L254.985 62.278H255.02L255.146 61.452L255.993 57.497H257.4L258.254 61.431L258.373 62.278H258.415L258.534 61.431L259.346 56.657H260.718L259.143 64H257.673L256.826 59.961L256.693 59.093H256.651L256.511 59.961L255.664 64H254.194Z" fill="black"/>
    <path d="M248.837 64.231C248.147 64.231 247.54 64.07 247.017 63.748C246.495 63.426 246.086 62.978 245.792 62.404C245.498 61.83 245.351 61.1673 245.351 60.416V60.241C245.351 59.4897 245.498 58.827 245.792 58.253C246.086 57.679 246.495 57.2333 247.017 56.916C247.54 56.594 248.147 56.433 248.837 56.433C249.528 56.433 250.135 56.594 250.657 56.916C251.18 57.2333 251.588 57.679 251.882 58.253C252.176 58.827 252.323 59.4897 252.323 60.241V60.416C252.323 61.1673 252.176 61.83 251.882 62.404C251.588 62.978 251.18 63.426 250.657 63.748C250.135 64.07 249.528 64.231 248.837 64.231ZM248.837 62.824C249.43 62.824 249.897 62.607 250.237 62.173C250.583 61.7343 250.755 61.1417 250.755 60.395V60.262C250.755 59.5107 250.583 58.918 250.237 58.484C249.897 58.05 249.43 57.833 248.837 57.833C248.249 57.833 247.783 58.05 247.437 58.484C247.092 58.918 246.919 59.5107 246.919 60.262V60.395C246.919 61.1417 247.092 61.7343 247.437 62.173C247.783 62.607 248.249 62.824 248.837 62.824Z" fill="black"/>
    <path d="M242.298 64.231C241.467 64.231 240.814 63.993 240.338 63.517C239.866 63.0364 239.631 62.3737 239.631 61.529V53.78H241.178V61.389C241.178 62.3317 241.591 62.803 242.417 62.803C242.65 62.803 242.865 62.7587 243.061 62.67C243.257 62.5814 243.464 62.4367 243.684 62.236L244.538 63.377C244.225 63.6664 243.884 63.881 243.516 64.021C243.152 64.161 242.746 64.231 242.298 64.231ZM237.51 55.061V53.78H240.611V55.061H237.51Z" fill="black"/>
    <path d="M234.463 64.231C233.633 64.231 232.979 63.993 232.503 63.517C232.032 63.0364 231.796 62.3737 231.796 61.529V53.78H233.343V61.389C233.343 62.3317 233.756 62.803 234.582 62.803C234.816 62.803 235.03 62.7587 235.226 62.67C235.422 62.5814 235.63 62.4367 235.849 62.236L236.703 63.377C236.391 63.6664 236.05 63.881 235.681 64.021C235.317 64.161 234.911 64.231 234.463 64.231ZM229.675 55.061V53.78H232.776V55.061H229.675Z" fill="black"/>
    <path d="M221.442 64L224.557 53.976H226.132L229.233 64H227.581L225.642 56.972L225.341 55.761H225.299L225.005 56.972L223.073 64H221.442ZM222.835 61.634L223.255 60.29H227.371L227.805 61.634H222.835Z" fill="black"/>
    <path d="M178.261 64L175.034 60.066V60.024L178.121 56.657H180.011L176.504 60.423V59.632L180.165 64H178.261ZM173.543 64V53.78H175.097V64H173.543Z" fill="#7D9093" fill-opacity="0.5"/>
    <path d="M169.306 64.224C168.588 64.224 167.958 64.0653 167.416 63.748C166.88 63.426 166.462 62.9803 166.163 62.411C165.865 61.837 165.715 61.1673 165.715 60.402V60.248C165.715 59.4873 165.862 58.8223 166.156 58.253C166.45 57.679 166.863 57.2333 167.395 56.916C167.927 56.594 168.546 56.433 169.25 56.433C169.978 56.433 170.59 56.6056 171.084 56.951C171.579 57.2917 171.955 57.777 172.211 58.407L170.874 58.995C170.72 58.6123 170.508 58.323 170.237 58.127C169.967 57.9263 169.633 57.826 169.236 57.826C168.63 57.826 168.149 58.0383 167.794 58.463C167.444 58.883 167.269 59.4616 167.269 60.199V60.465C167.269 61.1837 167.454 61.7577 167.822 62.187C168.196 62.6163 168.69 62.831 169.306 62.831C169.712 62.831 170.06 62.733 170.349 62.537C170.639 62.341 170.877 62.0423 171.063 61.641L172.379 62.285C172.188 62.6957 171.941 63.0457 171.637 63.335C171.334 63.6243 170.986 63.846 170.594 64C170.202 64.1493 169.773 64.224 169.306 64.224Z" fill="#7D9093" fill-opacity="0.5"/>
    <path d="M161.003 64.231C160.312 64.231 159.706 64.07 159.183 63.748C158.66 63.426 158.252 62.978 157.958 62.404C157.664 61.83 157.517 61.1673 157.517 60.416V60.241C157.517 59.4897 157.664 58.827 157.958 58.253C158.252 57.679 158.66 57.2333 159.183 56.916C159.706 56.594 160.312 56.433 161.003 56.433C161.694 56.433 162.3 56.594 162.823 56.916C163.346 57.2333 163.754 57.679 164.048 58.253C164.342 58.827 164.489 59.4897 164.489 60.241V60.416C164.489 61.1673 164.342 61.83 164.048 62.404C163.754 62.978 163.346 63.426 162.823 63.748C162.3 64.07 161.694 64.231 161.003 64.231ZM161.003 62.824C161.596 62.824 162.062 62.607 162.403 62.173C162.748 61.7343 162.921 61.1417 162.921 60.395V60.262C162.921 59.5107 162.748 58.918 162.403 58.484C162.062 58.05 161.596 57.833 161.003 57.833C160.415 57.833 159.948 58.05 159.603 58.484C159.258 58.918 159.085 59.5107 159.085 60.262V60.395C159.085 61.1417 159.258 61.7343 159.603 62.173C159.948 62.607 160.415 62.824 161.003 62.824Z" fill="#7D9093" fill-opacity="0.5"/>
    <path d="M154.463 64.231C153.633 64.231 152.979 63.993 152.503 63.517C152.032 63.0364 151.796 62.3737 151.796 61.529V53.78H153.343V61.389C153.343 62.3317 153.756 62.803 154.582 62.803C154.816 62.803 155.03 62.7587 155.226 62.67C155.422 62.5814 155.63 62.4367 155.849 62.236L156.703 63.377C156.391 63.6664 156.05 63.881 155.681 64.021C155.317 64.161 154.911 64.231 154.463 64.231ZM149.675 55.061V53.78H152.776V55.061H149.675Z" fill="#7D9093" fill-opacity="0.5"/>
    <path d="M142.24 64V53.976H145.544C146.421 53.976 147.112 54.1953 147.616 54.634C148.12 55.0726 148.372 55.6583 148.372 56.391V56.566C148.372 57.0886 148.246 57.5366 147.994 57.91C147.742 58.2833 147.38 58.5586 146.909 58.736V58.792C147.492 58.9226 147.947 59.2003 148.274 59.625C148.605 60.045 148.771 60.5606 148.771 61.172V61.361C148.771 61.893 148.645 62.3573 148.393 62.754C148.145 63.1506 147.795 63.4586 147.343 63.678C146.895 63.8926 146.365 64 145.754 64H142.24ZM143.794 62.656H145.572C146.085 62.656 146.482 62.5253 146.762 62.264C147.042 62.0026 147.182 61.6293 147.182 61.144V60.99C147.182 60.5046 147.037 60.1313 146.748 59.87C146.463 59.604 146.05 59.471 145.509 59.471H143.36V58.183H145.32C145.791 58.183 146.153 58.064 146.405 57.826C146.657 57.588 146.783 57.2496 146.783 56.811V56.685C146.783 56.2416 146.657 55.9033 146.405 55.67C146.157 55.4366 145.796 55.32 145.32 55.32H143.794V62.656Z" fill="#7D9093" fill-opacity="0.5"/>
    <rect x="18" y="17" width="246" height="7" rx="3.5" fill="#7D9093" fill-opacity="0.26"/>
    <rect x="18" y="33" width="82" height="7" rx="3.5" fill="#7D9093" fill-opacity="0.26"/>
</svg>
<div>
    <button data-modal-action id="mobile-wallet-adapter-launch-action" class="mobile-wallet-adapter-embedded-modal-launch-action">
        Continue to Allow
    </button>
</div>
`,Ta=`
.mobile-wallet-adapter-embedded-modal-close {
    display: none;
}
.mobile-wallet-adapter-embedded-modal-content {
    text-align: center;
}
.mobile-wallet-adapter-embedded-modal-title {
    margin: 18px 100px auto 100px;
    color: #000000;
    font-size: 2.75em;
    font-weight: 600;
}
.mobile-wallet-adapter-embedded-modal-subtitle {
    margin: 20px 60px 40px 60px;
    color: #7D9093;
    font-size: 1.25em;
    font-weight: 400;
}
.mobile-wallet-adapter-embedded-modal-permission-prompt-mock {
    width: 90%;
    height: auto;
    margin: 0 auto 30px auto;
    display: block;
}
.mobile-wallet-adapter-embedded-modal-launch-action {
    display: block;
    width: 100%;
    height: 56px;
    font-size: 1.25em;
    background: #000000;
    color: #FFFFFF;
    border-radius: 18px;
}
/* Smaller screens */
@media all and (max-width: 600px) {
    .mobile-wallet-adapter-embedded-modal-title {
        font-size: 1.5em;
        margin-right: 12px;
        margin-left: 12px;
    }
    .mobile-wallet-adapter-embedded-modal-subtitle {
        margin-right: 12px;
        margin-left: 12px;
    }
}
`;function Ia(){return typeof window<"u"&&window.isSecureContext&&typeof document<"u"&&/android/i.test(navigator.userAgent)}function xa(){return typeof window<"u"&&window.isSecureContext&&typeof document<"u"&&!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function Oa(e){return/(WebView|Version\/.+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)|; wv\).+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+))/i.test(e)}function mn(e){return e.includes("Solana Mobile Web Shell")}function Pa(){const e=typeof document<"u"&&document.referrer.startsWith("android-app://");if(typeof window>"u")return e;const t=window.matchMedia("(display-mode: standalone)").matches,n=window.matchMedia("(display-mode: fullscreen)").matches,r=window.matchMedia("(display-mode: minimal-ui)").matches;return e||t||n||r}async function pn(){if(!(typeof navigator<"u"&&mn(navigator.userAgent)))try{let e=await navigator.permissions.query({name:"loopback-network"});if(e.state==="granted")return;if(e.state==="denied"){const t=new _a;throw t.init(),t.open(),new x(O.ERROR_LOOPBACK_ACCESS_BLOCKED,"Local Network Access permission denied")}else if(e.state==="prompt"){const t=new La;if(await new Promise((n,r)=>{t.addEventListener("close",a=>{a&&r(new x(O.ERROR_ASSOCIATION_CANCELLED,"Wallet connection cancelled by user",{event:a}))}),e.onchange=()=>{e.onchange=null,n(e.state)},t.init(),t.open()})==="granted"){const n=new Ca;await new Promise((r,a)=>{n.addEventListener("close",i=>{i&&a(new x(O.ERROR_ASSOCIATION_CANCELLED,"Wallet connection cancelled by user",{event:i}))}),n.initWithCallback(async()=>{r(!0)}),n.open()});return}else return await pn()}throw new x(O.ERROR_LOOPBACK_ACCESS_BLOCKED,"Local Network Access permission unknown")}catch(e){if(e instanceof TypeError&&(e.message.includes("loopback-network")||e.message.includes("local-network-access")))return;throw e instanceof x?e:new x(O.ERROR_LOOPBACK_ACCESS_BLOCKED,e instanceof Error?e.message:"Local Network Access permission unknown")}}const Na="Mobile Wallet Adapter",ka="Remote Mobile Wallet Adapter",gn=64,wn=[Q,j,Qe,je],Da=3e4;var Ba=class{#e={};#n="1.0.0";#r=Na;#l="https://solanamobile.com/wallets";#c=fn;#i;#t;#a;#o=!1;#h=0;#d=[];#y;#f;#b;get version(){return this.#n}get name(){return this.#r}get url(){return this.#l}get icon(){return this.#c}get chains(){return this.#d}get features(){return{[jt]:{version:"1.0.0",connect:this.#E},[Vt]:{version:"1.0.0",disconnect:this.#R},[Wt]:{version:"1.0.0",on:this.#A},[Qe]:{version:"1.0.0",signMessage:this.#T},[je]:{version:"1.0.0",signIn:this.#I},...this.#f}}get accounts(){return this.#t?.accounts??[]}constructor(e){this.#a=e.authorizationCache,this.#i=e.appIdentity,this.#d=e.chains,this.#y=e.chainSelector,this.#b=e.onWalletNotFound,this.#f={[Q]:{version:"1.0.0",supportedTransactionVersions:["legacy",0],signAndSendTransaction:this.#L},[j]:{version:"1.0.0",supportedTransactionVersions:["legacy",0],signTransaction:this.#M}}}get connected(){return!!this.#t}get isAuthorized(){return!!this.#t}get currentAuthorization(){return this.#t}get cachedAuthorizationResult(){return this.#a.get()}#A=(e,t)=>(this.#e[e]?.push(t)||(this.#e[e]=[t]),()=>this.#O(e,t));#s(e,...t){this.#e[e]?.forEach(n=>n.apply(null,t))}#O(e,t){this.#e[e]=this.#e[e]?.filter(n=>t!==n)}#E=async({silent:e}={})=>{if(this.#o||this.connected)return{accounts:this.accounts};this.#o=!0;try{if(e){const t=await this.#a.get();if(t)await this.#C(t.capabilities),await this.#g(t);else return{accounts:this.accounts}}else await this.#_()}catch(t){throw new Error(t instanceof Error&&t.message||"Unknown error")}finally{this.#o=!1}return{accounts:this.accounts}};#_=async e=>{try{const t=await this.#a.get();if(t)return this.#g(t),t;const n=await this.#y.select(this.#d);return await this.#u(async r=>{const[a,i]=await Promise.all([r.getCapabilities(),r.authorize({chain:n,identity:this.#i,sign_in_payload:e})]),o=this.#p(i.accounts),s={...i,accounts:o,chain:n,capabilities:a};return Promise.all([this.#C(a),this.#a.set(s),this.#g(s)]),s})}catch(t){throw new Error(t instanceof Error&&t.message||"Unknown error")}};#g=async e=>{const t=this.#t==null||this.#t?.accounts.length!==e.accounts.length||this.#t.accounts.some((n,r)=>n.address!==e.accounts[r].address);this.#t=e,t&&this.#s("change",{accounts:this.accounts})};#C=async e=>{const t=e.features.includes("solana:signTransactions"),n=e.supports_sign_and_send_transactions,r=Q in this.features!==n||j in this.features!==t;this.#f={...(n||!n&&!t)&&{[Q]:{version:"1.0.0",supportedTransactionVersions:["legacy",0],signAndSendTransaction:this.#L}},...t&&{[j]:{version:"1.0.0",supportedTransactionVersions:["legacy",0],signTransaction:this.#M}}},r&&this.#s("change",{features:this.features})};#m=async(e,t,n)=>{try{const[r,a]=await Promise.all([this.#t?.capabilities??await e.getCapabilities(),e.authorize({auth_token:t,identity:this.#i,chain:n})]),i=this.#p(a.accounts),o={...a,accounts:i,chain:n,capabilities:r};Promise.all([this.#a.set(o),this.#g(o)])}catch(r){throw this.#R(),new Error(r instanceof Error&&r.message||"Unknown error")}};#R=async()=>{this.#a.clear(),this.#o=!1,this.#h++,this.#t=void 0,this.#s("change",{accounts:this.accounts})};#u=async e=>{const t=this.#t?.wallet_uri_base,n=t?{baseUri:t}:void 0,r=this.#h,a=new ma;try{let i;const o=await Promise.race([pn().then(async()=>{a.init();const{wallet:s,close:l}=await la(n);a.addEventListener("close",u=>{u&&l()}),a.open();const c=await e(await s);return a.close(),l(),c}),new Promise((s,l)=>{i=setTimeout(()=>{l(new x(O.ERROR_ASSOCIATION_CANCELLED,"Wallet connection timed out",{event:void 0}))},Da)})]);return clearTimeout(i),o}catch(i){throw a.close(),this.#h!==r&&await new Promise(()=>{}),i instanceof Error&&i.name==="SolanaMobileWalletAdapterError"&&i.code==="ERROR_WALLET_NOT_FOUND"&&await this.#b(this),i}};#w=()=>{if(!this.#t)throw new Error("Wallet not connected");return{authToken:this.#t.auth_token,chain:this.#t.chain}};#p=e=>e.map(t=>{const n=P(t.address);return{address:re.encode(n),publicKey:n,label:t.label,icon:t.icon,chains:t.chains??this.#d,features:t.features??wn}});#v=async e=>{const{authToken:t,chain:n}=this.#w();try{const r=e.map(a=>W(a));return await this.#u(async a=>(await this.#m(a,t,n),(await a.signTransactions({payloads:r})).signed_payloads.map(P)))}catch(r){throw new Error(r instanceof Error&&r.message||"Unknown error")}};#S=async(e,t)=>{const{authToken:n,chain:r}=this.#w();try{return await this.#u(async a=>{const[i,o]=await Promise.all([a.getCapabilities(),this.#m(a,n,r)]);if(i.supports_sign_and_send_transactions){const s=W(e);return(await a.signAndSendTransactions({...t,payloads:[s]})).signatures.map(P)[0]}else throw new Error("connected wallet does not support signAndSendTransaction")})}catch(a){throw new Error(a instanceof Error&&a.message||"Unknown error")}};#L=async(...e)=>{const t=[];for(const n of e){const r=await this.#S(n.transaction,n.options);t.push({signature:r})}return t};#M=async(...e)=>(await this.#v(e.map(({transaction:t})=>t))).map(t=>({signedTransaction:t}));#T=async(...e)=>{const{authToken:t,chain:n}=this.#w(),r=e.map(({account:i})=>W(new Uint8Array(i.publicKey))),a=e.map(({message:i})=>W(i));try{return await this.#u(async i=>(await this.#m(i,t,n),(await i.signMessages({addresses:r,payloads:a})).signed_payloads.map(P).map(o=>({signedMessage:o,signature:o.slice(-gn)}))))}catch(i){throw new Error(i instanceof Error&&i.message||"Unknown error")}};#I=async(...e)=>{const t=[];if(e.length>1)for(const n of e)t.push(await this.#x(n));else return[await this.#x(e[0])];return t};#x=async e=>{this.#o=!0;try{const t=await this.#_({...e,domain:e?.domain??window.location.host});if(!t.sign_in_result)throw new Error("Sign in failed, no sign in result returned by wallet");const n=t.sign_in_result.address,r=t.accounts.find(a=>a.address==n);return{account:{...r??{address:re.encode(P(n))},publicKey:P(n),chains:r?.chains??this.#d,features:r?.features??t.capabilities.features},signedMessage:P(t.sign_in_result.signed_message),signature:P(t.sign_in_result.signature)}}catch(t){throw new Error(t instanceof Error&&t.message||"Unknown error")}finally{this.#o=!1}}},Ua=class{#e={};#n="1.0.0";#r=ka;#l="https://solanamobile.com/wallets";#c=fn;#i;#t;#a;#o=!1;#h=0;#d=[];#y;#f;#b;#A;#s;get version(){return this.#n}get name(){return this.#r}get url(){return this.#l}get icon(){return this.#c}get chains(){return this.#d}get features(){return{[jt]:{version:"1.0.0",connect:this.#g},[Vt]:{version:"1.0.0",disconnect:this.#w},[Wt]:{version:"1.0.0",on:this.#O},[Qe]:{version:"1.0.0",signMessage:this.#x},[je]:{version:"1.0.0",signIn:this.#N},...this.#f}}get accounts(){return this.#t?.accounts??[]}constructor(e){this.#a=e.authorizationCache,this.#i=e.appIdentity,this.#d=e.chains,this.#y=e.chainSelector,this.#A=e.remoteHostAuthority,this.#b=e.onWalletNotFound,this.#f={[Q]:{version:"1.0.0",supportedTransactionVersions:["legacy",0],signAndSendTransaction:this.#T},[j]:{version:"1.0.0",supportedTransactionVersions:["legacy",0],signTransaction:this.#I}}}get connected(){return!!this.#s&&!!this.#t}get isAuthorized(){return!!this.#t}get currentAuthorization(){return this.#t}get cachedAuthorizationResult(){return this.#a.get()}#O=(e,t)=>(this.#e[e]?.push(t)||(this.#e[e]=[t]),()=>this.#_(e,t));#E(e,...t){this.#e[e]?.forEach(n=>n.apply(null,t))}#_(e,t){this.#e[e]=this.#e[e]?.filter(n=>t!==n)}#g=async({silent:e}={})=>{if(this.#o||this.connected)return{accounts:this.accounts};this.#o=!0;try{await this.#C()}catch(t){throw new Error(t instanceof Error&&t.message||"Unknown error")}finally{this.#o=!1}return{accounts:this.accounts}};#C=async e=>{try{const t=await this.#a.get();if(t)return this.#m(t),t;this.#s&&(this.#s=void 0);const n=await this.#y.select(this.#d);return await this.#p(async r=>{const[a,i]=await Promise.all([r.getCapabilities(),r.authorize({chain:n,identity:this.#i,sign_in_payload:e})]),o=this.#S(i.accounts),s={...i,accounts:o,chain:n,capabilities:a};return Promise.all([this.#R(a),this.#a.set(s),this.#m(s)]),s})}catch(t){throw new Error(t instanceof Error&&t.message||"Unknown error")}};#m=async e=>{const t=this.#t==null||this.#t?.accounts.length!==e.accounts.length||this.#t.accounts.some((n,r)=>n.address!==e.accounts[r].address);this.#t=e,t&&this.#E("change",{accounts:this.accounts})};#R=async e=>{const t=e.features.includes("solana:signTransactions"),n=e.supports_sign_and_send_transactions||e.features.includes("solana:signAndSendTransaction"),r=Q in this.features!==n||j in this.features!==t;this.#f={...n&&{[Q]:{version:"1.0.0",supportedTransactionVersions:e.supported_transaction_versions,signAndSendTransaction:this.#T}},...t&&{[j]:{version:"1.0.0",supportedTransactionVersions:e.supported_transaction_versions,signTransaction:this.#I}}},r&&this.#E("change",{features:this.features})};#u=async(e,t,n)=>{try{const[r,a]=await Promise.all([this.#t?.capabilities??await e.getCapabilities(),e.authorize({auth_token:t,identity:this.#i,chain:n})]),i=this.#S(a.accounts),o={...a,accounts:i,chain:n,capabilities:r};Promise.all([this.#a.set(o),this.#m(o)])}catch(r){throw this.#w(),new Error(r instanceof Error&&r.message||"Unknown error")}};#w=async()=>{this.#s?.close(),this.#a.clear(),this.#o=!1,this.#h++,this.#t=void 0,this.#s=void 0,this.#E("change",{accounts:this.accounts})};#p=async e=>{const t=this.#t?.wallet_uri_base,n={...t?{baseUri:t}:void 0,remoteHostAuthority:this.#A},r=this.#h,a=new ya;if(this.#s)return e(this.#s.wallet);try{a.init(),a.open();const{associationUrl:i,close:o,wallet:s}=await ca(n),l=a.addEventListener("close",c=>{c&&o()});return a.populateQRCode(i.toString()),this.#s={close:o,wallet:await s},l(),a.close(),await e(this.#s.wallet)}catch(i){throw a.close(),this.#h!==r&&await new Promise(()=>{}),i instanceof Error&&i.name==="SolanaMobileWalletAdapterError"&&i.code==="ERROR_WALLET_NOT_FOUND"&&await this.#b(this),i}};#v=()=>{if(!this.#t)throw new Error("Wallet not connected");return{authToken:this.#t.auth_token,chain:this.#t.chain}};#S=e=>e.map(t=>{const n=P(t.address);return{address:re.encode(n),publicKey:n,label:t.label,icon:t.icon,chains:t.chains??this.#d,features:t.features??wn}});#L=async e=>{const{authToken:t,chain:n}=this.#v();try{return await this.#p(async r=>(await this.#u(r,t,n),(await r.signTransactions({payloads:e.map(W)})).signed_payloads.map(P)))}catch(r){throw new Error(r instanceof Error&&r.message||"Unknown error")}};#M=async(e,t)=>{const{authToken:n,chain:r}=this.#v();try{return await this.#p(async a=>{const[i,o]=await Promise.all([a.getCapabilities(),this.#u(a,n,r)]);if(i.supports_sign_and_send_transactions)return(await a.signAndSendTransactions({...t,payloads:[W(e)]})).signatures.map(P)[0];throw new Error("connected wallet does not support signAndSendTransaction")})}catch(a){throw new Error(a instanceof Error&&a.message||"Unknown error")}};#T=async(...e)=>{const t=[];for(const n of e){const r=await this.#M(n.transaction,n.options);t.push({signature:r})}return t};#I=async(...e)=>(await this.#L(e.map(({transaction:t})=>t))).map(t=>({signedTransaction:t}));#x=async(...e)=>{const{authToken:t,chain:n}=this.#v(),r=e.map(({account:i})=>W(new Uint8Array(i.publicKey))),a=e.map(({message:i})=>W(i));try{return await this.#p(async i=>(await this.#u(i,t,n),(await i.signMessages({addresses:r,payloads:a})).signed_payloads.map(P).map(o=>({signedMessage:o,signature:o.slice(-gn)}))))}catch(i){throw new Error(i instanceof Error&&i.message||"Unknown error")}};#N=async(...e)=>{const t=[];if(e.length>1)for(const n of e)t.push(await this.#P(n));else return[await this.#P(e[0])];return t};#P=async e=>{this.#o=!0;try{const t=await this.#C({...e,domain:e?.domain??window.location.host});if(!t.sign_in_result)throw new Error("Sign in failed, no sign in result returned by wallet");const n=t.sign_in_result.address,r=t.accounts.find(a=>a.address==n);return{account:{...r??{address:re.encode(P(n))},publicKey:P(n),chains:r?.chains??this.#d,features:r?.features??t.capabilities.features},signedMessage:P(t.sign_in_result.signed_message),signature:P(t.sign_in_result.signature)}}catch(t){throw new Error(t instanceof Error&&t.message||"Unknown error")}finally{this.#o=!1}}};function Fa(e){if(typeof window>"u"){console.warn("MWA not registered: no window object");return}if(!window.isSecureContext){console.warn("MWA not registered: secure context required (https)");return}const t=navigator.userAgent;Ia()&&(!Oa(t)||mn(t))?st(new Ba(e)):xa()&&e.remoteHostAuthority!==void 0&&st(new Ua({...e,remoteHostAuthority:e.remoteHostAuthority}))}const za="To use mobile wallet adapter, you must have a compatible mobile wallet application installed on your device.",qa="This browser appears to be incompatible with mobile wallet adapter. Open this page in a compatible mobile browser app and try again.";var Ha=class extends ae{contentStyles=Wa;contentHtml=Ka;initWithError(e){super.init(),this.populateError(e)}populateError(e){const t=this.dom?.getElementById("mobile-wallet-adapter-error-message"),n=this.dom?.getElementById("mobile-wallet-adapter-error-action");if(t){if(e.name==="SolanaMobileWalletAdapterError")switch(e.code){case"ERROR_WALLET_NOT_FOUND":t.innerHTML=za,n&&n.addEventListener("click",()=>{window.location.href="https://solanamobile.com/wallets"});return;case"ERROR_BROWSER_NOT_SUPPORTED":t.innerHTML=qa,n&&(n.style.display="none");return}t.innerHTML=`An unexpected error occurred: ${e.message}`}else console.log("Failed to locate error dialog element")}};const Ka=`
<svg class="mobile-wallet-adapter-embedded-modal-error-icon" xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#000000"><path d="M 280,-80 Q 197,-80 138.5,-138.5 80,-197 80,-280 80,-363 138.5,-421.5 197,-480 280,-480 q 83,0 141.5,58.5 58.5,58.5 58.5,141.5 0,83 -58.5,141.5 Q 363,-80 280,-80 Z M 824,-120 568,-376 Q 556,-389 542.5,-402.5 529,-416 516,-428 q 38,-24 61,-64 23,-40 23,-88 0,-75 -52.5,-127.5 Q 495,-760 420,-760 345,-760 292.5,-707.5 240,-655 240,-580 q 0,6 0.5,11.5 0.5,5.5 1.5,11.5 -18,2 -39.5,8 -21.5,6 -38.5,14 -2,-11 -3,-22 -1,-11 -1,-23 0,-109 75.5,-184.5 Q 311,-840 420,-840 q 109,0 184.5,75.5 75.5,75.5 75.5,184.5 0,43 -13.5,81.5 Q 653,-460 629,-428 l 251,252 z m -615,-61 71,-71 70,71 29,-28 -71,-71 71,-71 -28,-28 -71,71 -71,-71 -28,28 71,71 -71,71 z"/></svg>
<div class="mobile-wallet-adapter-embedded-modal-title">We can't find a wallet.</div>
<div id="mobile-wallet-adapter-error-message" class="mobile-wallet-adapter-embedded-modal-subtitle"></div>
<div>
    <button data-error-action id="mobile-wallet-adapter-error-action" class="mobile-wallet-adapter-embedded-modal-error-action">
        Find a wallet
    </button>
</div>
`,Wa=`
.mobile-wallet-adapter-embedded-modal-content {
    text-align: center;
}

.mobile-wallet-adapter-embedded-modal-error-icon {
    margin-top: 24px;
}

.mobile-wallet-adapter-embedded-modal-title {
    margin: 18px 100px auto 100px;
    color: #000000;
    font-size: 2.75em;
    font-weight: 600;
}

.mobile-wallet-adapter-embedded-modal-subtitle {
    margin: 30px 60px 40px 60px;
    color: #000000;
    font-size: 1.25em;
    font-weight: 400;
}

.mobile-wallet-adapter-embedded-modal-error-action {
    display: block;
    width: 100%;
    height: 56px;
    /*margin-top: 40px;*/
    font-size: 1.25em;
    /*line-height: 24px;*/
    /*letter-spacing: -1%;*/
    background: #000000;
    color: #FFFFFF;
    border-radius: 18px;
}

/* Smaller screens */
@media all and (max-width: 600px) {
    .mobile-wallet-adapter-embedded-modal-title {
        font-size: 1.5em;
        margin-right: 12px;
        margin-left: 12px;
    }
    .mobile-wallet-adapter-embedded-modal-subtitle {
        margin-right: 12px;
        margin-left: 12px;
    }
}
`;async function Va(){if(typeof window<"u"){const e=window.navigator.userAgent.toLowerCase(),t=new Ha;e.includes("wv")?t.initWithError({name:"SolanaMobileWalletAdapterError",code:"ERROR_BROWSER_NOT_SUPPORTED",message:""}):t.initWithError({name:"SolanaMobileWalletAdapterError",code:"ERROR_WALLET_NOT_FOUND",message:""}),t.open()}}function ja(){return async()=>{Va()}}const We="SolanaMobileWalletAdapterDefaultAuthorizationCache";function Qa(){let e;try{e=window.localStorage}catch{}return{async clear(){if(e)try{e.removeItem(We)}catch{}},async get(){if(e)try{const t=JSON.parse(e.getItem(We));if(t&&t.accounts){const n=t.accounts.map(r=>({...r,publicKey:"publicKey"in r?new Uint8Array(Object.values(r.publicKey)):re.decode(r.address)}));return{...t,accounts:n}}else return t||void 0}catch{}},async set(t){if(e)try{e.setItem(We,JSON.stringify(t))}catch{}}}}function Ga(){return{async select(e){return e.length===1?e[0]:e.includes(Dt)?Dt:e[0]}}}function Za({appIdentity:e={name:"Wallet UI"},clusters:t}){if(typeof window>"u")return;if(!window.isSecureContext){console.warn("Solana Mobile Wallet Adapter not loaded: https connection required");return}const n=t.map(r=>r.id);if(!n.length){console.warn("Solana Mobile Wallet Adapter not loaded: no clusters provided");return}Fa({appIdentity:e,authorizationCache:Qa(),chains:n,chainSelector:Ga(),onWalletNotFound:ja()}),console.log("Loaded Solana Mobile Wallet Adapter")}const zt=Un({clusters:[Fn("https://api.devnet.solana.com"),zn("http://127.0.0.1:8899"),qn("https://api.testnet.solana.com")]});let qt=!1;function Ja({children:e}){return X.useEffect(()=>{qt||(qt=!0,Za({clusters:zt.clusters}))},[]),N.jsx(Bn,{config:zt,children:e})}const Ya=new Gn;function Xa({children:e}){return N.jsx(Hn,{children:N.jsx(Kn,{client:Ya,children:N.jsxs(Ja,{children:[e,N.jsx(mr,{closeButton:!0,richColors:!0})]})})})}function ni(){return N.jsx(Xa,{children:N.jsx(or,{router:cr})})}export{ni as default};
