!function(){"use strict";function getUrlParameter(sParam){for(var sPageURL=window.location.search.substring(1),sURLVariables=sPageURL.split("&"),i=0;i<sURLVariables.length;i++){var sParameterName=sURLVariables[i].split("=");if(sParameterName[0]===sParam)return sParameterName[1]}}var slabs={send:function(data){"function"==typeof window.top.submitSlabData?window.top.submitSlabData(data):(alert("you have correctly sent data from your slab."),console.log(data))},getData:function(){var outputId=getUrlParameter("outputid");if(void 0!==outputId)return qwest.get("/getdata/"+outputId,null,{dataType:"json",responseType:"json"});var deferred=Q.defer();return deferred.resolve(),deferred.promise},getConfigs:function(){var deferred=Q.defer();return deferred.resolve(),deferred.promise}};window.slabs=slabs}(),!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c:"function"==typeof define&&define.amd?define(c):a[b]=c}(this,"qwest",function(){var win=window,doc=document,before,defaultXdrResponseType="json",limit=null,requests=0,request_stack=[],getXHR=function(){return win.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},xhr2=""===getXHR().responseType,qwest=function(method,url,data,options,before){method=method.toUpperCase(),data=data||null,options=options||{};var nativeResponseParsing=!1,crossOrigin,xhr,xdr=!1,timeoutInterval,aborted=!1,retries=0,headers={},mimeTypes={text:"*/*",xml:"text/xml",json:"application/json",arraybuffer:null,formdata:null,document:null,file:null,blob:null},contentType="Content-Type",vars="",i,j,serialized,then_stack=[],catch_stack=[],complete_stack=[],response,success,error,func,promises={then:function(a){return options.async?then_stack.push(a):success&&a.call(xhr,response),promises},"catch":function(a){return options.async?catch_stack.push(a):error&&a.call(xhr,response),promises},complete:function(a){return options.async?complete_stack.push(a):a.call(xhr),promises}},promises_limit={then:function(a){return request_stack[request_stack.length-1].then.push(a),promises_limit},"catch":function(a){return request_stack[request_stack.length-1]["catch"].push(a),promises_limit},complete:function(a){return request_stack[request_stack.length-1].complete.push(a),promises_limit}},handleResponse=function(){if(!aborted){var i,req,p,responseType;if(--requests,clearInterval(timeoutInterval),request_stack.length){for(req=request_stack.shift(),p=qwest(req.method,req.url,req.data,req.options,req.before),i=0;func=req.then[i];++i)p.then(func);for(i=0;func=req["catch"][i];++i)p["catch"](func);for(i=0;func=req.complete[i];++i)p.complete(func)}try{if("status"in xhr&&!/^2|1223/.test(xhr.status))throw xhr.status+" ("+xhr.statusText+")";var responseText="responseText",responseXML="responseXML",parseError="parseError";if(nativeResponseParsing&&"response"in xhr&&null!==xhr.response)response=xhr.response;else if("document"==options.responseType){var frame=doc.createElement("iframe");frame.style.display="none",doc.body.appendChild(frame),frame.contentDocument.open(),frame.contentDocument.write(xhr.response),frame.contentDocument.close(),response=frame.contentDocument,doc.body.removeChild(frame)}else{if(responseType=options.responseType,"auto"==responseType)if(xdr)responseType=defaultXdrResponseType;else switch(xhr.getResponseHeader(contentType)){case mimeTypes.json:responseType="json";break;case mimeTypes.xml:responseType="xml";break;default:responseType="text"}switch(responseType){case"json":try{response="JSON"in win?JSON.parse(xhr[responseText]):eval("("+xhr[responseText]+")")}catch(e){throw"Error while parsing JSON body : "+e}break;case"xml":try{win.DOMParser?response=(new DOMParser).parseFromString(xhr[responseText],"text/xml"):(response=new ActiveXObject("Microsoft.XMLDOM"),response.async="false",response.loadXML(xhr[responseText]))}catch(e){response=void 0}if(!response||!response.documentElement||response.getElementsByTagName("parsererror").length)throw"Invalid XML";break;default:response=xhr[responseText]}}if(success=!0,p=response,options.async)for(i=0;func=then_stack[i];++i)p=func.call(xhr,p)}catch(e){if(error=!0,options.async)for(i=0;func=catch_stack[i];++i)func.call(xhr,e+" ("+url+")")}if(options.async)for(i=0;func=complete_stack[i];++i)func.call(xhr)}},buildData=function(a,b){var c,d=[],e=encodeURIComponent;if("object"==typeof a&&null!=a){for(c in a)if(a.hasOwnProperty(c)){var f=buildData(a[c],b?b+"["+c+"]":c);""!==f&&(d=d.concat(f))}}else null!=a&&null!=b&&d.push(e(b)+"="+e(a));return d.join("&")};switch(++requests,options.async="async"in options?!!options.async:!0,options.cache="cache"in options?!!options.cache:"GET"!=method,options.dataType="dataType"in options?options.dataType.toLowerCase():"post",options.responseType="responseType"in options?options.responseType.toLowerCase():"auto",options.user=options.user||"",options.password=options.password||"",options.withCredentials=!!options.withCredentials,options.timeout=options.timeout?parseInt(options.timeout,10):3e3,options.retries=options.retries?parseInt(options.retries,10):3,i=url.match(/\/\/(.+?)\//),crossOrigin=i&&i[1]?i[1]!=location.host:!1,"ArrayBuffer"in win&&data instanceof ArrayBuffer?options.dataType="arraybuffer":"Blob"in win&&data instanceof Blob?options.dataType="blob":"Document"in win&&data instanceof Document?options.dataType="document":"FormData"in win&&data instanceof FormData&&(options.dataType="formdata"),options.dataType){case"json":data=JSON.stringify(data);break;case"post":data=buildData(data)}if(options.headers){var format=function(a,b,c){return b+c.toUpperCase()};for(i in options.headers)headers[i.replace(/(^|-)([^-])/g,format)]=options.headers[i]}if(headers[contentType]||"GET"==method||(options.dataType in mimeTypes?mimeTypes[options.dataType]&&(headers[contentType]=mimeTypes[options.dataType]):headers[contentType]="application/x-www-form-urlencoded"),headers.Accept||(headers.Accept=options.responseType in mimeTypes?mimeTypes[options.responseType]:"*/*"),crossOrigin||headers["X-Requested-With"]||(headers["X-Requested-With"]="XMLHttpRequest"),"GET"==method&&(vars+=data),options.cache||(vars&&(vars+="&"),vars+="__t="+ +new Date),vars&&(url+=(/\?/.test(url)?"&":"?")+vars),limit&&requests==limit)return request_stack.push({method:method,url:url,data:data,options:options,before:before,then:[],"catch":[],complete:[]}),promises_limit;var send=function(){if(xhr=getXHR(),crossOrigin&&("withCredentials"in xhr||!win.XDomainRequest||(xhr=new XDomainRequest,xdr=!0,"GET"!=method&&"POST"!=method&&(method="POST"))),xdr?xhr.open(method,url):(xhr.open(method,url,options.async,options.user,options.password),xhr2&&options.async&&(xhr.withCredentials=options.withCredentials)),!xdr)for(var a in headers)xhr.setRequestHeader(a,headers[a]);if(xhr2&&"document"!=options.responseType)try{xhr.responseType=options.responseType,nativeResponseParsing=xhr.responseType==options.responseType}catch(b){}xhr2||xdr?xhr.onload=handleResponse:xhr.onreadystatechange=function(){4==xhr.readyState&&handleResponse()},"auto"!==options.responseType&&"overrideMimeType"in xhr&&xhr.overrideMimeType(mimeTypes[options.responseType]),before&&before.call(xhr),xdr?setTimeout(function(){xhr.send()},0):xhr.send("GET"!=method?data:null)},timeout=function(){timeoutInterval=setTimeout(function(){if(aborted=!0,xhr.abort(),options.retries&&++retries==options.retries){if(aborted=!1,error=!0,response="Timeout ("+url+")",options.async)for(i=0;func=catch_stack[i];++i)func.call(xhr,response)}else aborted=!1,timeout(),send()},options.timeout)};return timeout(),send(),promises},create=function(a){return function(b,c,d){var e=before;return before=null,qwest(a,b,c,d,e)}},obj={before:function(a){return before=a,obj},get:create("GET"),post:create("POST"),put:create("PUT"),"delete":create("DELETE"),xhr2:xhr2,limit:function(a){limit=a},setDefaultXdrResponseType:function(a){defaultXdrResponseType=a.toLowerCase()}};return obj}()),function(definition){"use strict";if("function"==typeof bootstrap)bootstrap("promise",definition);else if("object"==typeof exports&&"object"==typeof module)module.exports=definition();else if("function"==typeof define&&define.amd)define(definition);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeQ=definition}else{if("undefined"==typeof self)throw new Error("This environment was not anticiapted by Q. Please file a bug.");self.Q=definition()}}(function(){"use strict";function uncurryThis(f){return function(){return call.apply(f,arguments)}}function isObject(value){return value===Object(value)}function isStopIteration(exception){return"[object StopIteration]"===object_toString(exception)||exception instanceof QReturnValue}function makeStackTraceLong(error,promise){if(hasStacks&&promise.stack&&"object"==typeof error&&null!==error&&error.stack&&-1===error.stack.indexOf(STACK_JUMP_SEPARATOR)){for(var stacks=[],p=promise;p;p=p.source)p.stack&&stacks.unshift(p.stack);stacks.unshift(error.stack);var concatedStacks=stacks.join("\n"+STACK_JUMP_SEPARATOR+"\n");error.stack=filterStackString(concatedStacks)}}function filterStackString(stackString){for(var lines=stackString.split("\n"),desiredLines=[],i=0;i<lines.length;++i){var line=lines[i];isInternalFrame(line)||isNodeFrame(line)||!line||desiredLines.push(line)}return desiredLines.join("\n")}function isNodeFrame(stackLine){return-1!==stackLine.indexOf("(module.js:")||-1!==stackLine.indexOf("(node.js:")}function getFileNameAndLineNumber(stackLine){var attempt1=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);if(attempt1)return[attempt1[1],Number(attempt1[2])];var attempt2=/at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);if(attempt2)return[attempt2[1],Number(attempt2[2])];var attempt3=/.*@(.+):(\d+)$/.exec(stackLine);return attempt3?[attempt3[1],Number(attempt3[2])]:void 0}function isInternalFrame(stackLine){var fileNameAndLineNumber=getFileNameAndLineNumber(stackLine);if(!fileNameAndLineNumber)return!1;var fileName=fileNameAndLineNumber[0],lineNumber=fileNameAndLineNumber[1];return fileName===qFileName&&lineNumber>=qStartingLine&&qEndingLine>=lineNumber}function captureLine(){if(hasStacks)try{throw new Error}catch(e){var lines=e.stack.split("\n"),firstLine=lines[0].indexOf("@")>0?lines[1]:lines[2],fileNameAndLineNumber=getFileNameAndLineNumber(firstLine);if(!fileNameAndLineNumber)return;return qFileName=fileNameAndLineNumber[0],fileNameAndLineNumber[1]}}function deprecate(callback,name,alternative){return function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn(name+" is deprecated, use "+alternative+" instead.",new Error("").stack),callback.apply(callback,arguments)}}function Q(value){return value instanceof Promise?value:isPromiseAlike(value)?coerce(value):fulfill(value)}function defer(){function become(newPromise){resolvedPromise=newPromise,promise.source=newPromise,array_reduce(messages,function(undefined,message){Q.nextTick(function(){newPromise.promiseDispatch.apply(newPromise,message)})},void 0),messages=void 0,progressListeners=void 0}var resolvedPromise,messages=[],progressListeners=[],deferred=object_create(defer.prototype),promise=object_create(Promise.prototype);if(promise.promiseDispatch=function(resolve,op,operands){var args=array_slice(arguments);messages?(messages.push(args),"when"===op&&operands[1]&&progressListeners.push(operands[1])):Q.nextTick(function(){resolvedPromise.promiseDispatch.apply(resolvedPromise,args)})},promise.valueOf=function(){if(messages)return promise;var nearerValue=nearer(resolvedPromise);return isPromise(nearerValue)&&(resolvedPromise=nearerValue),nearerValue},promise.inspect=function(){return resolvedPromise?resolvedPromise.inspect():{state:"pending"}},Q.longStackSupport&&hasStacks)try{throw new Error}catch(e){promise.stack=e.stack.substring(e.stack.indexOf("\n")+1)}return deferred.promise=promise,deferred.resolve=function(value){resolvedPromise||become(Q(value))},deferred.fulfill=function(value){resolvedPromise||become(fulfill(value))},deferred.reject=function(reason){resolvedPromise||become(reject(reason))},deferred.notify=function(progress){resolvedPromise||array_reduce(progressListeners,function(undefined,progressListener){Q.nextTick(function(){progressListener(progress)})},void 0)},deferred}function promise(resolver){if("function"!=typeof resolver)throw new TypeError("resolver must be a function.");var deferred=defer();try{resolver(deferred.resolve,deferred.reject,deferred.notify)}catch(reason){deferred.reject(reason)}return deferred.promise}function race(answerPs){return promise(function(resolve,reject){for(var i=0,len=answerPs.length;len>i;i++)Q(answerPs[i]).then(resolve,reject)})}function Promise(descriptor,fallback,inspect){void 0===fallback&&(fallback=function(op){return reject(new Error("Promise does not support operation: "+op))}),void 0===inspect&&(inspect=function(){return{state:"unknown"}});var promise=object_create(Promise.prototype);if(promise.promiseDispatch=function(resolve,op,args){var result;try{result=descriptor[op]?descriptor[op].apply(promise,args):fallback.call(promise,op,args)}catch(exception){result=reject(exception)}resolve&&resolve(result)},promise.inspect=inspect,inspect){var inspected=inspect();"rejected"===inspected.state&&(promise.exception=inspected.reason),promise.valueOf=function(){var inspected=inspect();return"pending"===inspected.state||"rejected"===inspected.state?promise:inspected.value}}return promise}function when(value,fulfilled,rejected,progressed){return Q(value).then(fulfilled,rejected,progressed)}function nearer(value){if(isPromise(value)){var inspected=value.inspect();if("fulfilled"===inspected.state)return inspected.value}return value}function isPromise(object){return object instanceof Promise}function isPromiseAlike(object){return isObject(object)&&"function"==typeof object.then}function isPending(object){return isPromise(object)&&"pending"===object.inspect().state}function isFulfilled(object){return!isPromise(object)||"fulfilled"===object.inspect().state}function isRejected(object){return isPromise(object)&&"rejected"===object.inspect().state}function resetUnhandledRejections(){unhandledReasons.length=0,unhandledRejections.length=0,trackUnhandledRejections||(trackUnhandledRejections=!0)}function trackRejection(promise,reason){trackUnhandledRejections&&(unhandledRejections.push(promise),unhandledReasons.push(reason&&"undefined"!=typeof reason.stack?reason.stack:"(no stack) "+reason))}function untrackRejection(promise){if(trackUnhandledRejections){var at=array_indexOf(unhandledRejections,promise);-1!==at&&(unhandledRejections.splice(at,1),unhandledReasons.splice(at,1))}}function reject(reason){var rejection=Promise({when:function(rejected){return rejected&&untrackRejection(this),rejected?rejected(reason):this}},function(){return this},function(){return{state:"rejected",reason:reason}});return trackRejection(rejection,reason),rejection}function fulfill(value){return Promise({when:function(){return value},get:function(name){return value[name]},set:function(name,rhs){value[name]=rhs},"delete":function(name){delete value[name]},post:function(name,args){return null===name||void 0===name?value.apply(void 0,args):value[name].apply(value,args)},apply:function(thisp,args){return value.apply(thisp,args)},keys:function(){return object_keys(value)}},void 0,function(){return{state:"fulfilled",value:value}})}function coerce(promise){var deferred=defer();return Q.nextTick(function(){try{promise.then(deferred.resolve,deferred.reject,deferred.notify)}catch(exception){deferred.reject(exception)}}),deferred.promise}function master(object){return Promise({isDef:function(){}},function(op,args){return dispatch(object,op,args)},function(){return Q(object).inspect()})}function spread(value,fulfilled,rejected){return Q(value).spread(fulfilled,rejected)}function async(makeGenerator){return function(){function continuer(verb,arg){var result;if("undefined"==typeof StopIteration){try{result=generator[verb](arg)}catch(exception){return reject(exception)}return result.done?Q(result.value):when(result.value,callback,errback)}try{result=generator[verb](arg)}catch(exception){return isStopIteration(exception)?Q(exception.value):reject(exception)}return when(result,callback,errback)}var generator=makeGenerator.apply(this,arguments),callback=continuer.bind(continuer,"next"),errback=continuer.bind(continuer,"throw");return callback()}}function spawn(makeGenerator){Q.done(Q.async(makeGenerator)())}function _return(value){throw new QReturnValue(value)}function promised(callback){return function(){return spread([this,all(arguments)],function(self,args){return callback.apply(self,args)})}}function dispatch(object,op,args){return Q(object).dispatch(op,args)}function all(promises){return when(promises,function(promises){var countDown=0,deferred=defer();return array_reduce(promises,function(undefined,promise,index){var snapshot;isPromise(promise)&&"fulfilled"===(snapshot=promise.inspect()).state?promises[index]=snapshot.value:(++countDown,when(promise,function(value){promises[index]=value,0===--countDown&&deferred.resolve(promises)},deferred.reject,function(progress){deferred.notify({index:index,value:progress})}))},void 0),0===countDown&&deferred.resolve(promises),deferred.promise})}function allResolved(promises){return when(promises,function(promises){return promises=array_map(promises,Q),when(all(array_map(promises,function(promise){return when(promise,noop,noop)})),function(){return promises})})}function allSettled(promises){return Q(promises).allSettled()}function progress(object,progressed){return Q(object).then(void 0,void 0,progressed)}function nodeify(object,nodeback){return Q(object).nodeify(nodeback)}var hasStacks=!1;try{throw new Error}catch(e){hasStacks=!!e.stack}var qFileName,QReturnValue,qStartingLine=captureLine(),noop=function(){},nextTick=function(){function flush(){for(;head.next;){head=head.next;var task=head.task;head.task=void 0;var domain=head.domain;domain&&(head.domain=void 0,domain.enter());try{task()}catch(e){if(isNodeJS)throw domain&&domain.exit(),setTimeout(flush,0),domain&&domain.enter(),e;setTimeout(function(){throw e},0)}domain&&domain.exit()}flushing=!1}var head={task:void 0,next:null},tail=head,flushing=!1,requestTick=void 0,isNodeJS=!1;if(nextTick=function(task){tail=tail.next={task:task,domain:isNodeJS&&process.domain,next:null},flushing||(flushing=!0,requestTick())},"undefined"!=typeof process&&process.nextTick)isNodeJS=!0,requestTick=function(){process.nextTick(flush)};else if("function"==typeof setImmediate)requestTick="undefined"!=typeof window?setImmediate.bind(window,flush):function(){setImmediate(flush)};else if("undefined"!=typeof MessageChannel){var channel=new MessageChannel;channel.port1.onmessage=function(){requestTick=requestPortTick,channel.port1.onmessage=flush,flush()};var requestPortTick=function(){channel.port2.postMessage(0)};requestTick=function(){setTimeout(flush,0),requestPortTick()}}else requestTick=function(){setTimeout(flush,0)};return nextTick}(),call=Function.call,array_slice=uncurryThis(Array.prototype.slice),array_reduce=uncurryThis(Array.prototype.reduce||function(callback,basis){var index=0,length=this.length;if(1===arguments.length)for(;;){if(index in this){basis=this[index++];break}if(++index>=length)throw new TypeError}for(;length>index;index++)index in this&&(basis=callback(basis,this[index],index));return basis}),array_indexOf=uncurryThis(Array.prototype.indexOf||function(value){for(var i=0;i<this.length;i++)if(this[i]===value)return i;return-1}),array_map=uncurryThis(Array.prototype.map||function(callback,thisp){var self=this,collect=[];return array_reduce(self,function(undefined,value,index){collect.push(callback.call(thisp,value,index,self))},void 0),collect}),object_create=Object.create||function(prototype){function Type(){}return Type.prototype=prototype,new Type},object_hasOwnProperty=uncurryThis(Object.prototype.hasOwnProperty),object_keys=Object.keys||function(object){var keys=[];for(var key in object)object_hasOwnProperty(object,key)&&keys.push(key);return keys},object_toString=uncurryThis(Object.prototype.toString);QReturnValue="undefined"!=typeof ReturnValue?ReturnValue:function(value){this.value=value};var STACK_JUMP_SEPARATOR="From previous event:";Q.resolve=Q,Q.nextTick=nextTick,Q.longStackSupport=!1,"object"==typeof process&&process&&process.env&&process.env.Q_DEBUG&&(Q.longStackSupport=!0),Q.defer=defer,defer.prototype.makeNodeResolver=function(){var self=this;return function(error,value){error?self.reject(error):self.resolve(arguments.length>2?array_slice(arguments,1):value)}},Q.Promise=promise,Q.promise=promise,promise.race=race,promise.all=all,promise.reject=reject,promise.resolve=Q,Q.passByCopy=function(object){return object},Promise.prototype.passByCopy=function(){return this},Q.join=function(x,y){return Q(x).join(y)},Promise.prototype.join=function(that){return Q([this,that]).spread(function(x,y){if(x===y)return x;throw new Error("Can't join: not the same: "+x+" "+y)})},Q.race=race,Promise.prototype.race=function(){return this.then(Q.race)},Q.makePromise=Promise,Promise.prototype.toString=function(){return"[object Promise]"},Promise.prototype.then=function(fulfilled,rejected,progressed){function _fulfilled(value){try{return"function"==typeof fulfilled?fulfilled(value):value}catch(exception){return reject(exception)}}function _rejected(exception){if("function"==typeof rejected){makeStackTraceLong(exception,self);try{return rejected(exception)}catch(newException){return reject(newException)}}return reject(exception)}function _progressed(value){return"function"==typeof progressed?progressed(value):value}var self=this,deferred=defer(),done=!1;return Q.nextTick(function(){self.promiseDispatch(function(value){done||(done=!0,deferred.resolve(_fulfilled(value)))},"when",[function(exception){done||(done=!0,deferred.resolve(_rejected(exception)))}])}),self.promiseDispatch(void 0,"when",[void 0,function(value){var newValue,threw=!1;try{newValue=_progressed(value)}catch(e){if(threw=!0,!Q.onerror)throw e;Q.onerror(e)}threw||deferred.notify(newValue)}]),deferred.promise},Q.tap=function(promise,callback){return Q(promise).tap(callback)},Promise.prototype.tap=function(callback){return callback=Q(callback),this.then(function(value){return callback.fcall(value).thenResolve(value)})},Q.when=when,Promise.prototype.thenResolve=function(value){return this.then(function(){return value})},Q.thenResolve=function(promise,value){return Q(promise).thenResolve(value)},Promise.prototype.thenReject=function(reason){return this.then(function(){throw reason})},Q.thenReject=function(promise,reason){return Q(promise).thenReject(reason)},Q.nearer=nearer,Q.isPromise=isPromise,Q.isPromiseAlike=isPromiseAlike,Q.isPending=isPending,Promise.prototype.isPending=function(){return"pending"===this.inspect().state},Q.isFulfilled=isFulfilled,Promise.prototype.isFulfilled=function(){return"fulfilled"===this.inspect().state},Q.isRejected=isRejected,Promise.prototype.isRejected=function(){return"rejected"===this.inspect().state};var unhandledReasons=[],unhandledRejections=[],trackUnhandledRejections=!0;Q.resetUnhandledRejections=resetUnhandledRejections,Q.getUnhandledReasons=function(){return unhandledReasons.slice()},Q.stopUnhandledRejectionTracking=function(){resetUnhandledRejections(),trackUnhandledRejections=!1},resetUnhandledRejections(),Q.reject=reject,Q.fulfill=fulfill,Q.master=master,Q.spread=spread,Promise.prototype.spread=function(fulfilled,rejected){return this.all().then(function(array){return fulfilled.apply(void 0,array)},rejected)},Q.async=async,Q.spawn=spawn,Q["return"]=_return,Q.promised=promised,Q.dispatch=dispatch,Promise.prototype.dispatch=function(op,args){var self=this,deferred=defer();return Q.nextTick(function(){self.promiseDispatch(deferred.resolve,op,args)}),deferred.promise},Q.get=function(object,key){return Q(object).dispatch("get",[key])},Promise.prototype.get=function(key){return this.dispatch("get",[key])},Q.set=function(object,key,value){return Q(object).dispatch("set",[key,value])},Promise.prototype.set=function(key,value){return this.dispatch("set",[key,value])},Q.del=Q["delete"]=function(object,key){return Q(object).dispatch("delete",[key])},Promise.prototype.del=Promise.prototype["delete"]=function(key){return this.dispatch("delete",[key])},Q.mapply=Q.post=function(object,name,args){return Q(object).dispatch("post",[name,args])},Promise.prototype.mapply=Promise.prototype.post=function(name,args){return this.dispatch("post",[name,args])},Q.send=Q.mcall=Q.invoke=function(object,name){return Q(object).dispatch("post",[name,array_slice(arguments,2)])},Promise.prototype.send=Promise.prototype.mcall=Promise.prototype.invoke=function(name){return this.dispatch("post",[name,array_slice(arguments,1)])},Q.fapply=function(object,args){return Q(object).dispatch("apply",[void 0,args])},Promise.prototype.fapply=function(args){return this.dispatch("apply",[void 0,args])},Q["try"]=Q.fcall=function(object){return Q(object).dispatch("apply",[void 0,array_slice(arguments,1)])},Promise.prototype.fcall=function(){return this.dispatch("apply",[void 0,array_slice(arguments)])},Q.fbind=function(object){var promise=Q(object),args=array_slice(arguments,1);return function(){return promise.dispatch("apply",[this,args.concat(array_slice(arguments))])}},Promise.prototype.fbind=function(){var promise=this,args=array_slice(arguments);return function(){return promise.dispatch("apply",[this,args.concat(array_slice(arguments))])}},Q.keys=function(object){return Q(object).dispatch("keys",[])},Promise.prototype.keys=function(){return this.dispatch("keys",[])},Q.all=all,Promise.prototype.all=function(){return all(this)},Q.allResolved=deprecate(allResolved,"allResolved","allSettled"),Promise.prototype.allResolved=function(){return allResolved(this)},Q.allSettled=allSettled,Promise.prototype.allSettled=function(){return this.then(function(promises){return all(array_map(promises,function(promise){function regardless(){return promise.inspect()}return promise=Q(promise),promise.then(regardless,regardless)}))})},Q.fail=Q["catch"]=function(object,rejected){return Q(object).then(void 0,rejected)},Promise.prototype.fail=Promise.prototype["catch"]=function(rejected){return this.then(void 0,rejected)},Q.progress=progress,Promise.prototype.progress=function(progressed){return this.then(void 0,void 0,progressed)},Q.fin=Q["finally"]=function(object,callback){return Q(object)["finally"](callback)},Promise.prototype.fin=Promise.prototype["finally"]=function(callback){return callback=Q(callback),this.then(function(value){return callback.fcall().then(function(){return value})},function(reason){return callback.fcall().then(function(){throw reason})})},Q.done=function(object,fulfilled,rejected,progress){return Q(object).done(fulfilled,rejected,progress)},Promise.prototype.done=function(fulfilled,rejected,progress){var onUnhandledError=function(error){Q.nextTick(function(){if(makeStackTraceLong(error,promise),!Q.onerror)throw error;Q.onerror(error)})},promise=fulfilled||rejected||progress?this.then(fulfilled,rejected,progress):this;"object"==typeof process&&process&&process.domain&&(onUnhandledError=process.domain.bind(onUnhandledError)),promise.then(void 0,onUnhandledError)},Q.timeout=function(object,ms,error){return Q(object).timeout(ms,error)},Promise.prototype.timeout=function(ms,error){var deferred=defer(),timeoutId=setTimeout(function(){error&&"string"!=typeof error||(error=new Error(error||"Timed out after "+ms+" ms"),error.code="ETIMEDOUT"),deferred.reject(error)},ms);return this.then(function(value){clearTimeout(timeoutId),deferred.resolve(value)},function(exception){clearTimeout(timeoutId),deferred.reject(exception)},deferred.notify),deferred.promise},Q.delay=function(object,timeout){return void 0===timeout&&(timeout=object,object=void 0),Q(object).delay(timeout)},Promise.prototype.delay=function(timeout){return this.then(function(value){var deferred=defer();return setTimeout(function(){deferred.resolve(value)},timeout),deferred.promise})},Q.nfapply=function(callback,args){return Q(callback).nfapply(args)},Promise.prototype.nfapply=function(args){var deferred=defer(),nodeArgs=array_slice(args);return nodeArgs.push(deferred.makeNodeResolver()),this.fapply(nodeArgs).fail(deferred.reject),deferred.promise},Q.nfcall=function(callback){var args=array_slice(arguments,1);return Q(callback).nfapply(args)},Promise.prototype.nfcall=function(){var nodeArgs=array_slice(arguments),deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),this.fapply(nodeArgs).fail(deferred.reject),deferred.promise},Q.nfbind=Q.denodeify=function(callback){var baseArgs=array_slice(arguments,1);return function(){var nodeArgs=baseArgs.concat(array_slice(arguments)),deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),Q(callback).fapply(nodeArgs).fail(deferred.reject),deferred.promise}},Promise.prototype.nfbind=Promise.prototype.denodeify=function(){var args=array_slice(arguments);return args.unshift(this),Q.denodeify.apply(void 0,args)},Q.nbind=function(callback,thisp){var baseArgs=array_slice(arguments,2);return function(){function bound(){return callback.apply(thisp,arguments)}var nodeArgs=baseArgs.concat(array_slice(arguments)),deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),Q(bound).fapply(nodeArgs).fail(deferred.reject),deferred.promise}},Promise.prototype.nbind=function(){var args=array_slice(arguments,0);return args.unshift(this),Q.nbind.apply(void 0,args)},Q.nmapply=Q.npost=function(object,name,args){return Q(object).npost(name,args)},Promise.prototype.nmapply=Promise.prototype.npost=function(name,args){var nodeArgs=array_slice(args||[]),deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),this.dispatch("post",[name,nodeArgs]).fail(deferred.reject),deferred.promise},Q.nsend=Q.nmcall=Q.ninvoke=function(object,name){var nodeArgs=array_slice(arguments,2),deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),Q(object).dispatch("post",[name,nodeArgs]).fail(deferred.reject),deferred.promise},Promise.prototype.nsend=Promise.prototype.nmcall=Promise.prototype.ninvoke=function(name){var nodeArgs=array_slice(arguments,1),deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),this.dispatch("post",[name,nodeArgs]).fail(deferred.reject),deferred.promise},Q.nodeify=nodeify,Promise.prototype.nodeify=function(nodeback){return nodeback?void this.then(function(value){Q.nextTick(function(){nodeback(null,value)})},function(error){Q.nextTick(function(){nodeback(error)})}):this};var qEndingLine=captureLine();return Q});