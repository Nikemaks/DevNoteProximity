import{F as st,P as O,Q as R,R as at,S as ct,T as ut,V as y,W as S,_ as L,aa as A,s as nt,t as rt,u as it,v as ot,w as k}from"./chunk-7LQXRQCB.js";import{h as u}from"./chunk-DLDOR3YA.js";var dt="@firebase/installations",j="0.6.6";var pt=1e4,gt=`w:${j}`,mt="FIS_v2",ee="https://firebaseinstallations.googleapis.com/v1",ne=60*60*1e3,re="installations",ie="Installations";var oe={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},_=new k(re,ie,oe);function ht(t){return t instanceof ot&&t.code.includes("request-failed")}function Tt({projectId:t}){return`${ee}/projects/${t}/installations`}function It(t){return{token:t.token,requestStatus:2,expiresIn:ae(t.expiresIn),creationTime:Date.now()}}function _t(t,e){return u(this,null,function*(){let r=(yield e.json()).error;return _.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})})}function Et({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function se(t,{refreshToken:e}){let n=Et(t);return n.append("Authorization",ce(e)),n}function bt(t){return u(this,null,function*(){let e=yield t();return e.status>=500&&e.status<600?t():e})}function ae(t){return Number(t.replace("s","000"))}function ce(t){return`${mt} ${t}`}function ue(r,i){return u(this,arguments,function*({appConfig:t,heartbeatServiceProvider:e},{fid:n}){let o=Tt(t),s=Et(t),a=e.getImmediate({optional:!0});if(a){let f=yield a.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}let T={fid:n,authVersion:mt,appId:t.appId,sdkVersion:gt},v={method:"POST",headers:s,body:JSON.stringify(T)},p=yield bt(()=>fetch(o,v));if(p.ok){let f=yield p.json();return{fid:f.fid||n,registrationStatus:2,refreshToken:f.refreshToken,authToken:It(f.authToken)}}else throw yield _t("Create Installation",p)})}function St(t){return new Promise(e=>{setTimeout(e,t)})}function le(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}var fe=/^[cdef][\w-]{21}$/,V="";function de(){try{let t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;let n=pe(t);return fe.test(n)?n:V}catch{return V}}function pe(t){return le(t).substr(0,22)}function M(t){return`${t.appName}!${t.appId}`}var At=new Map;function vt(t,e){let n=M(t);wt(n,e),ge(n,e)}function wt(t,e){let n=At.get(t);if(n)for(let r of n)r(e)}function ge(t,e){let n=me();n&&n.postMessage({key:t,fid:e}),he()}var I=null;function me(){return!I&&"BroadcastChannel"in self&&(I=new BroadcastChannel("[Firebase] FID Change"),I.onmessage=t=>{wt(t.data.key,t.data.fid)}),I}function he(){At.size===0&&I&&(I.close(),I=null)}var Te="firebase-installations-database",Ie=1,E="firebase-installations-store",q=null;function $(){return q||(q=ut(Te,Ie,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(E)}}})),q}function P(t,e){return u(this,null,function*(){let n=M(t),i=(yield $()).transaction(E,"readwrite"),o=i.objectStore(E),s=yield o.get(n);return yield o.put(e,n),yield i.done,(!s||s.fid!==e.fid)&&vt(t,e.fid),e})}function Rt(t){return u(this,null,function*(){let e=M(t),r=(yield $()).transaction(E,"readwrite");yield r.objectStore(E).delete(e),yield r.done})}function C(t,e){return u(this,null,function*(){let n=M(t),i=(yield $()).transaction(E,"readwrite"),o=i.objectStore(E),s=yield o.get(n),a=e(s);return a===void 0?yield o.delete(n):yield o.put(a,n),yield i.done,a&&(!s||s.fid!==a.fid)&&vt(t,a.fid),a})}function x(t){return u(this,null,function*(){let e,n=yield C(t.appConfig,r=>{let i=_e(r),o=Ee(t,i);return e=o.registrationPromise,o.installationEntry});return n.fid===V?{installationEntry:yield e}:{installationEntry:n,registrationPromise:e}})}function _e(t){let e=t||{fid:de(),registrationStatus:0};return yt(e)}function Ee(t,e){if(e.registrationStatus===0){if(!navigator.onLine){let i=Promise.reject(_.create("app-offline"));return{installationEntry:e,registrationPromise:i}}let n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=be(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Se(t)}:{installationEntry:e}}function be(t,e){return u(this,null,function*(){try{let n=yield ue(t,e);return P(t.appConfig,n)}catch(n){throw ht(n)&&n.customData.serverCode===409?yield Rt(t.appConfig):yield P(t.appConfig,{fid:e.fid,registrationStatus:0}),n}})}function Se(t){return u(this,null,function*(){let e=yield lt(t.appConfig);for(;e.registrationStatus===1;)yield St(100),e=yield lt(t.appConfig);if(e.registrationStatus===0){let{installationEntry:n,registrationPromise:r}=yield x(t);return r||n}return e})}function lt(t){return C(t,e=>{if(!e)throw _.create("installation-not-found");return yt(e)})}function yt(t){return Ae(t)?{fid:t.fid,registrationStatus:0}:t}function Ae(t){return t.registrationStatus===1&&t.registrationTime+pt<Date.now()}function ve(r,i){return u(this,arguments,function*({appConfig:t,heartbeatServiceProvider:e},n){let o=we(t,n),s=se(t,n),a=e.getImmediate({optional:!0});if(a){let f=yield a.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}let T={installation:{sdkVersion:gt,appId:t.appId}},v={method:"POST",headers:s,body:JSON.stringify(T)},p=yield bt(()=>fetch(o,v));if(p.ok){let f=yield p.json();return It(f)}else throw yield _t("Generate Auth Token",p)})}function we(t,{fid:e}){return`${Tt(t)}/${e}/authTokens:generate`}function z(t,e=!1){return u(this,null,function*(){let n,r=yield C(t.appConfig,o=>{if(!Nt(o))throw _.create("not-registered");let s=o.authToken;if(!e&&Ne(s))return o;if(s.requestStatus===1)return n=Re(t,e),o;{if(!navigator.onLine)throw _.create("app-offline");let a=Oe(o);return n=ye(t,a),a}});return n?yield n:r.authToken})}function Re(t,e){return u(this,null,function*(){let n=yield ft(t.appConfig);for(;n.authToken.requestStatus===1;)yield St(100),n=yield ft(t.appConfig);let r=n.authToken;return r.requestStatus===0?z(t,e):r})}function ft(t){return C(t,e=>{if(!Nt(e))throw _.create("not-registered");let n=e.authToken;return Pe(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}function ye(t,e){return u(this,null,function*(){try{let n=yield ve(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return yield P(t.appConfig,r),n}catch(n){if(ht(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))yield Rt(t.appConfig);else{let r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});yield P(t.appConfig,r)}throw n}})}function Nt(t){return t!==void 0&&t.registrationStatus===2}function Ne(t){return t.requestStatus===2&&!ke(t)}function ke(t){let e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+ne}function Oe(t){let e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Pe(t){return t.requestStatus===1&&t.requestTime+pt<Date.now()}function Me(t){return u(this,null,function*(){let e=t,{installationEntry:n,registrationPromise:r}=yield x(e);return r?r.catch(console.error):z(e).catch(console.error),n.fid})}function Ce(t,e=!1){return u(this,null,function*(){let n=t;return yield Fe(n),(yield z(n,e)).token})}function Fe(t){return u(this,null,function*(){let{registrationPromise:e}=yield x(t);e&&(yield e)})}function Ue(t){if(!t||!t.options)throw B("App Configuration");if(!t.name)throw B("App Name");let e=["projectId","apiKey","appId"];for(let n of e)if(!t.options[n])throw B(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function B(t){return _.create("missing-app-config-values",{valueName:t})}var kt="installations",De="installations-internal",Le=t=>{let e=t.getProvider("app").getImmediate(),n=Ue(e),r=S(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},qe=t=>{let e=t.getProvider("app").getImmediate(),n=S(e,kt).getImmediate();return{getId:()=>Me(n),getToken:i=>Ce(n,i)}};function Be(){y(new R(kt,Le,"PUBLIC")),y(new R(De,qe,"PRIVATE"))}Be();A(dt,j);A(dt,j,"esm2017");var Ot="@firebase/performance",J="0.6.6";var Bt=J,Ve="FB-PERF-TRACE-START",je="FB-PERF-TRACE-STOP",Y="FB-PERF-TRACE-MEASURE",Vt="_wt_",jt="_fp",$t="_fcp",xt="_fid",zt="@firebase/performance/config",Kt="@firebase/performance/configexpire",$e="performance",Gt="Performance";var xe={"trace started":"Trace {$traceName} was started before.","trace stopped":"Trace {$traceName} is not running.","nonpositive trace startTime":"Trace {$traceName} startTime should be positive.","nonpositive trace duration":"Trace {$traceName} duration should be positive.","no window":"Window is not available.","no app id":"App id is not available.","no project id":"Project id is not available.","no api key":"Api key is not available.","invalid cc log":"Attempted to queue invalid cc event","FB not default":"Performance can only start when Firebase app instance is the default one.","RC response not ok":"RC response is not ok","invalid attribute name":"Attribute name {$attributeName} is invalid.","invalid attribute value":"Attribute value {$attributeValue} is invalid.","invalid custom metric name":"Custom metric name {$customMetricName} is invalid","invalid String merger input":"Input for String merger is invalid, contact support team to resolve.","already initialized":"initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance."},l=new k($e,Gt,xe);var m=new ct(Gt);m.logLevel=at.INFO;var K,Ht,c=class t{constructor(e){if(this.window=e,!e)throw l.create("no window");this.performance=e.performance,this.PerformanceObserver=e.PerformanceObserver,this.windowLocation=e.location,this.navigator=e.navigator,this.document=e.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=e.localStorage),e.perfMetrics&&e.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=e.perfMetrics.onFirstInputDelay)}getUrl(){return this.windowLocation.href.split("?")[0]}mark(e){!this.performance||!this.performance.mark||this.performance.mark(e)}measure(e,n,r){!this.performance||!this.performance.measure||this.performance.measure(e,n,r)}getEntriesByType(e){return!this.performance||!this.performance.getEntriesByType?[]:this.performance.getEntriesByType(e)}getEntriesByName(e){return!this.performance||!this.performance.getEntriesByName?[]:this.performance.getEntriesByName(e)}getTimeOrigin(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)}requiredApisAvailable(){return!fetch||!Promise||!it()?(m.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1):nt()?!0:(m.info("IndexedDB is not supported by current browser"),!1)}setupObserver(e,n){if(!this.PerformanceObserver)return;new this.PerformanceObserver(i=>{for(let o of i.getEntries())n(o)}).observe({entryTypes:[e]})}static getInstance(){return K===void 0&&(K=new t(Ht)),K}};function ze(t){Ht=t}var Wt;function Ke(t){let e=t.getId();return e.then(n=>{Wt=n}),e}function Z(){return Wt}function Ge(t){let e=t.getToken();return e.then(n=>{}),e}function Pt(t,e){let n=t.length-e.length;if(n<0||n>1)throw l.create("invalid String merger input");let r=[];for(let i=0;i<t.length;i++)r.push(t.charAt(i)),e.length>i&&r.push(e.charAt(i));return r.join("")}var G,d=class t{constructor(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=Pt("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=Pt("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}getFlTransportFullUrl(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)}static getInstance(){return G===void 0&&(G=new t),G}};var N=function(t){return t[t.UNKNOWN=0]="UNKNOWN",t[t.VISIBLE=1]="VISIBLE",t[t.HIDDEN=2]="HIDDEN",t}(N||{}),He=["firebase_","google_","ga_"],We=new RegExp("^[a-zA-Z]\\w*$"),Xe=40,Je=100;function Ye(){let t=c.getInstance().navigator;return t?.serviceWorker?t.serviceWorker.controller?2:3:1}function Xt(){switch(c.getInstance().document.visibilityState){case"visible":return N.VISIBLE;case"hidden":return N.HIDDEN;default:return N.UNKNOWN}}function Qe(){let e=c.getInstance().navigator.connection;switch(e&&e.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}function Ze(t){return t.length===0||t.length>Xe?!1:!He.some(n=>t.startsWith(n))&&!!t.match(We)}function tn(t){return t.length!==0&&t.length<=Je}function Jt(t){var e;let n=(e=t.options)===null||e===void 0?void 0:e.appId;if(!n)throw l.create("no app id");return n}function en(t){var e;let n=(e=t.options)===null||e===void 0?void 0:e.projectId;if(!n)throw l.create("no project id");return n}function nn(t){var e;let n=(e=t.options)===null||e===void 0?void 0:e.apiKey;if(!n)throw l.create("no api key");return n}var rn="0.0.1",g={loggingEnabled:!0},on="FIREBASE_INSTALLATIONS_AUTH";function sn(t,e){let n=an();return n?(Mt(n),Promise.resolve()):ln(t,e).then(Mt).then(r=>cn(r),()=>{})}function an(){let t=c.getInstance().localStorage;if(!t)return;let e=t.getItem(Kt);if(!e||!fn(e))return;let n=t.getItem(zt);if(n)try{return JSON.parse(n)}catch{return}}function cn(t){let e=c.getInstance().localStorage;!t||!e||(e.setItem(zt,JSON.stringify(t)),e.setItem(Kt,String(Date.now()+d.getInstance().configTimeToLive*60*60*1e3)))}var un="Could not fetch config, will use default configs";function ln(t,e){return Ge(t.installations).then(n=>{let r=en(t.app),i=nn(t.app),o=`https://firebaseremoteconfig.googleapis.com/v1/projects/${r}/namespaces/fireperf:fetch?key=${i}`,s=new Request(o,{method:"POST",headers:{Authorization:`${on} ${n}`},body:JSON.stringify({app_instance_id:e,app_instance_id_token:n,app_id:Jt(t.app),app_version:Bt,sdk_version:rn})});return fetch(s).then(a=>{if(a.ok)return a.json();throw l.create("RC response not ok")})}).catch(()=>{m.info(un)})}function Mt(t){if(!t)return t;let e=d.getInstance(),n=t.entries||{};return n.fpr_enabled!==void 0?e.loggingEnabled=String(n.fpr_enabled)==="true":e.loggingEnabled=g.loggingEnabled,n.fpr_log_source?e.logSource=Number(n.fpr_log_source):g.logSource&&(e.logSource=g.logSource),n.fpr_log_endpoint_url?e.logEndPointUrl=n.fpr_log_endpoint_url:g.logEndPointUrl&&(e.logEndPointUrl=g.logEndPointUrl),n.fpr_log_transport_key?e.transportKey=n.fpr_log_transport_key:g.transportKey&&(e.transportKey=g.transportKey),n.fpr_vc_network_request_sampling_rate!==void 0?e.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate):g.networkRequestsSamplingRate!==void 0&&(e.networkRequestsSamplingRate=g.networkRequestsSamplingRate),n.fpr_vc_trace_sampling_rate!==void 0?e.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate):g.tracesSamplingRate!==void 0&&(e.tracesSamplingRate=g.tracesSamplingRate),e.logTraceAfterSampling=Ct(e.tracesSamplingRate),e.logNetworkAfterSampling=Ct(e.networkRequestsSamplingRate),t}function fn(t){return Number(t)>Date.now()}function Ct(t){return Math.random()<=t}var tt=1,H;function Yt(t){return tt=2,H=H||pn(t),H}function dn(){return tt===3}function pn(t){return gn().then(()=>Ke(t.installations)).then(e=>sn(t,e)).then(()=>Ft(),()=>Ft())}function gn(){let t=c.getInstance().document;return new Promise(e=>{if(t&&t.readyState!=="complete"){let n=()=>{t.readyState==="complete"&&(t.removeEventListener("readystatechange",n),e())};t.addEventListener("readystatechange",n)}else e()})}function Ft(){tt=3}var et=10*1e3,mn=5.5*1e3,Qt=3,hn=1e3,U=Qt,h=[],Ut=!1;function Tn(){Ut||(D(mn),Ut=!0)}function D(t){setTimeout(()=>{if(U!==0){if(!h.length)return D(et);In()}},t)}function In(){let t=h.splice(0,hn),e=t.map(r=>({source_extension_json_proto3:r.message,event_time_ms:String(r.eventTime)})),n={request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:d.getInstance().logSource,log_event:e};_n(n,t).catch(()=>{h=[...t,...h],U--,m.info(`Tries left: ${U}.`),D(et)})}function _n(t,e){return En(t).then(n=>(n.ok||m.info("Call to Firebase backend failed."),n.json())).then(n=>{let r=Number(n.nextRequestWaitMillis),i=et;isNaN(r)||(i=Math.max(r,i));let o=n.logResponseDetails;Array.isArray(o)&&o.length>0&&o[0].responseAction==="RETRY_REQUEST_LATER"&&(h=[...e,...h],m.info("Retry transport request later.")),U=Qt,D(i)})}function En(t){let e=d.getInstance().getFlTransportFullUrl();return fetch(e,{method:"POST",body:JSON.stringify(t)})}function bn(t){if(!t.eventTime||!t.message)throw l.create("invalid cc log");h=[...h,t]}function Sn(t){return(...e)=>{let n=t(...e);bn({message:n,eventTime:Date.now()})}}var W;function Zt(t,e){W||(W=Sn(vn)),W(t,e)}function F(t){let e=d.getInstance();!e.instrumentationEnabled&&t.isAuto||!e.dataCollectionEnabled&&!t.isAuto||c.getInstance().requiredApisAvailable()&&(t.isAuto&&Xt()!==N.VISIBLE||(dn()?X(t):Yt(t.performanceController).then(()=>X(t),()=>X(t))))}function X(t){if(!Z())return;let e=d.getInstance();!e.loggingEnabled||!e.logTraceAfterSampling||setTimeout(()=>Zt(t,1),0)}function An(t){let e=d.getInstance();if(!e.instrumentationEnabled)return;let n=t.url,r=e.logEndPointUrl.split("?")[0],i=e.flTransportEndpointUrl.split("?")[0];n===r||n===i||!e.loggingEnabled||!e.logNetworkAfterSampling||setTimeout(()=>Zt(t,0),0)}function vn(t,e){return e===0?wn(t):Rn(t)}function wn(t){let e={url:t.url,http_method:t.httpMethod||0,http_response_code:200,response_payload_bytes:t.responsePayloadBytes,client_start_time_us:t.startTimeUs,time_to_response_initiated_us:t.timeToResponseInitiatedUs,time_to_response_completed_us:t.timeToResponseCompletedUs},n={application_info:te(t.performanceController.app),network_request_metric:e};return JSON.stringify(n)}function Rn(t){let e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};Object.keys(t.counters).length!==0&&(e.counters=t.counters);let n=t.getAttributes();Object.keys(n).length!==0&&(e.custom_attributes=n);let r={application_info:te(t.performanceController.app),trace_metric:e};return JSON.stringify(r)}function te(t){return{google_app_id:Jt(t),app_instance_id:Z(),web_app_info:{sdk_version:Bt,page_url:c.getInstance().getUrl(),service_worker_status:Ye(),visibility_state:Xt(),effective_connection_type:Qe()},application_process_state:0}}var yn=100,Nn="_",kn=[jt,$t,xt];function On(t,e){return t.length===0||t.length>yn?!1:e&&e.startsWith(Vt)&&kn.indexOf(t)>-1||!t.startsWith(Nn)}function Pn(t){let e=Math.floor(t);return e<t&&m.info(`Metric value should be an Integer, setting the value as : ${e}.`),e}var b=class t{constructor(e,n,r=!1,i){this.performanceController=e,this.name=n,this.isAuto=r,this.state=1,this.customAttributes={},this.counters={},this.api=c.getInstance(),this.randomId=Math.floor(Math.random()*1e6),this.isAuto||(this.traceStartMark=`${Ve}-${this.randomId}-${this.name}`,this.traceStopMark=`${je}-${this.randomId}-${this.name}`,this.traceMeasure=i||`${Y}-${this.randomId}-${this.name}`,i&&this.calculateTraceMetrics())}start(){if(this.state!==1)throw l.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2}stop(){if(this.state!==2)throw l.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),F(this)}record(e,n,r){if(e<=0)throw l.create("nonpositive trace startTime",{traceName:this.name});if(n<=0)throw l.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(n*1e3),this.startTimeUs=Math.floor(e*1e3),r&&r.attributes&&(this.customAttributes=Object.assign({},r.attributes)),r&&r.metrics)for(let i of Object.keys(r.metrics))isNaN(Number(r.metrics[i]))||(this.counters[i]=Math.floor(Number(r.metrics[i])));F(this)}incrementMetric(e,n=1){this.counters[e]===void 0?this.putMetric(e,n):this.putMetric(e,this.counters[e]+n)}putMetric(e,n){if(On(e,this.name))this.counters[e]=Pn(n??0);else throw l.create("invalid custom metric name",{customMetricName:e})}getMetric(e){return this.counters[e]||0}putAttribute(e,n){let r=Ze(e),i=tn(n);if(r&&i){this.customAttributes[e]=n;return}if(!r)throw l.create("invalid attribute name",{attributeName:e});if(!i)throw l.create("invalid attribute value",{attributeValue:n})}getAttribute(e){return this.customAttributes[e]}removeAttribute(e){this.customAttributes[e]!==void 0&&delete this.customAttributes[e]}getAttributes(){return Object.assign({},this.customAttributes)}setStartTime(e){this.startTimeUs=e}setDuration(e){this.durationUs=e}calculateTraceMetrics(){let e=this.api.getEntriesByName(this.traceMeasure),n=e&&e[0];n&&(this.durationUs=Math.floor(n.duration*1e3),this.startTimeUs=Math.floor((n.startTime+this.api.getTimeOrigin())*1e3))}static createOobTrace(e,n,r,i){let o=c.getInstance().getUrl();if(!o)return;let s=new t(e,Vt+o,!0),a=Math.floor(c.getInstance().getTimeOrigin()*1e3);s.setStartTime(a),n&&n[0]&&(s.setDuration(Math.floor(n[0].duration*1e3)),s.putMetric("domInteractive",Math.floor(n[0].domInteractive*1e3)),s.putMetric("domContentLoadedEventEnd",Math.floor(n[0].domContentLoadedEventEnd*1e3)),s.putMetric("loadEventEnd",Math.floor(n[0].loadEventEnd*1e3)));let T="first-paint",v="first-contentful-paint";if(r){let p=r.find(w=>w.name===T);p&&p.startTime&&s.putMetric(jt,Math.floor(p.startTime*1e3));let f=r.find(w=>w.name===v);f&&f.startTime&&s.putMetric($t,Math.floor(f.startTime*1e3)),i&&s.putMetric(xt,Math.floor(i*1e3))}F(s)}static createUserTimingTrace(e,n){let r=new t(e,n,!1,n);F(r)}};function Dt(t,e){let n=e;if(!n||n.responseStart===void 0)return;let r=c.getInstance().getTimeOrigin(),i=Math.floor((n.startTime+r)*1e3),o=n.responseStart?Math.floor((n.responseStart-n.startTime)*1e3):void 0,s=Math.floor((n.responseEnd-n.startTime)*1e3),a=n.name&&n.name.split("?")[0],T={performanceController:t,url:a,responsePayloadBytes:n.transferSize,startTimeUs:i,timeToResponseInitiatedUs:o,timeToResponseCompletedUs:s};An(T)}var Mn=5e3;function Lt(t){Z()&&(setTimeout(()=>Fn(t),0),setTimeout(()=>Cn(t),0),setTimeout(()=>Un(t),0))}function Cn(t){let e=c.getInstance(),n=e.getEntriesByType("resource");for(let r of n)Dt(t,r);e.setupObserver("resource",r=>Dt(t,r))}function Fn(t){let e=c.getInstance(),n=e.getEntriesByType("navigation"),r=e.getEntriesByType("paint");if(e.onFirstInputDelay){let i=setTimeout(()=>{b.createOobTrace(t,n,r),i=void 0},Mn);e.onFirstInputDelay(o=>{i&&(clearTimeout(i),b.createOobTrace(t,n,r,o))})}else b.createOobTrace(t,n,r)}function Un(t){let e=c.getInstance(),n=e.getEntriesByType("measure");for(let r of n)qt(t,r);e.setupObserver("measure",r=>qt(t,r))}function qt(t,e){let n=e.name;n.substring(0,Y.length)!==Y&&b.createUserTimingTrace(t,n)}var Q=class{constructor(e,n){this.app=e,this.installations=n,this.initialized=!1}_init(e){this.initialized||(e?.dataCollectionEnabled!==void 0&&(this.dataCollectionEnabled=e.dataCollectionEnabled),e?.instrumentationEnabled!==void 0&&(this.instrumentationEnabled=e.instrumentationEnabled),c.getInstance().requiredApisAvailable()?rt().then(n=>{n&&(Tn(),Yt(this).then(()=>Lt(this),()=>Lt(this)),this.initialized=!0)}).catch(n=>{m.info(`Environment doesn't support IndexedDB: ${n}`)}):m.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'))}set instrumentationEnabled(e){d.getInstance().instrumentationEnabled=e}get instrumentationEnabled(){return d.getInstance().instrumentationEnabled}set dataCollectionEnabled(e){d.getInstance().dataCollectionEnabled=e}get dataCollectionEnabled(){return d.getInstance().dataCollectionEnabled}},Dn="[DEFAULT]";function Jn(t=L()){return t=O(t),S(t,"performance").getImmediate()}function Yn(t,e){t=O(t);let n=S(t,"performance");if(n.isInitialized()){let i=n.getImmediate(),o=n.getOptions();if(st(o,e??{}))return i;throw l.create("already initialized")}return n.initialize({options:e})}function Qn(t,e){return t=O(t),new b(t,e)}var Ln=(t,{options:e})=>{let n=t.getProvider("app").getImmediate(),r=t.getProvider("installations-internal").getImmediate();if(n.name!==Dn)throw l.create("FB not default");if(typeof window>"u")throw l.create("no window");ze(window);let i=new Q(n,r);return i._init(e),i};function qn(){y(new R("performance",Ln,"PUBLIC")),A(Ot,J),A(Ot,J,"esm2017")}qn();export{Jn as a,Yn as b,Qn as c};