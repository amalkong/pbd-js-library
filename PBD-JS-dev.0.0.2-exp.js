;(function (_global ){
	var global = this;
	var that = self = this, __pbd_self, hasCompare, arr = [],
	slice = arr.slice,concat = arr.concat,push = arr.push,indexOf = arr.indexOf, 
	getProto = Object.getPrototypeOf, 
	// Support: IE 11+, Edge 18+
	// Provide fallback for browsers without Array#flat.
	flat = arr.flat ? function( array ) {return arr.flat.call( array );} : function( array ) {return arr.concat.apply( [], array );},
	class2type = {},
	toString = class2type.toString,
	hasOwn = class2type.hasOwnProperty,
	allTypes = "*/".concat( "*" ),
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,// Make sure we trim BOM and NBSP
	rmsPrefix = /^-ms-/,// Matches dashed string for camelizing
	rdashAlpha = /-([\da-z])/gi,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
	rnoInnerhtml = /<script|<style|<link/i,
	rtagName = ( /<([\w:-]+)/ ),
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	rcheckableType = ( /^(?:checkbox|radio)$/i ),
	rscriptType = ( /^$|\/(?:java|ecma)script/i ),
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rquery = ( /\?/ ),
	rheader = /^h\d$/i,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rget = /GET/i,rpost = /POST/i,rimage = /^(?:gif|jpg|jpeg|png)$/i,rscript = /^(?:js|jsp|css|php|phtml|inc)$/i,
	rnative = /^[^{]+\{\s*\[native \w/,
	rsibling = /[+~]/,
	rescape = /'|\\/g,
	rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, 
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,// #7653, #8125, #8152: local protocol detection
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
    // util().trim()
    rLWhitespace = /^\s+/,
    rTWhitespace = /\s+$/,
    // util().getUID
    uidReplace = /[xy]/g,
    // util().getFilename()
    rPath = /.*(\/|\\)/,
    // util().getExt()
    rExt = /.*[.]/,
    // util().hasClass()
    rHasClass = /[\t\r\n]/g,
    rURI = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/, // returns groups for protocol (2), domain (3) and port (4) 
	rParent = /[\-\w]+\/\.\.\//, // matches a foo/../ expression 
	rDoubleSlash = /([^:])\/\//g, // matches // anywhere but in the protocol
    /**
	 * Regex that validates if a string is a valid url
	 */
	URL_REGEX = /^\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/, // eslint-disable-line
	version='1.0.0',_random = String(Math.random()).replace('.','').replace('-',''),nonce = Date.now(),
	docElem = document.documentElement,
	isXPathAvailable = !!document.evaluate,
	channelId = Math.floor(Math.random() * 10000), // randomize the initial id in case of multiple closures loaded 
	_uid = _random, uid = () => { return _uid++;},
	returnFalse = () => {return false;},
	emptyFn = Function.prototype,
	Expr = {
		// Can be adjusted by the user
		cacheLength: 50,
		_cache : {}
	};
/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
/* function createCache() {
	var keys = [];
	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}
String.prototype.capitalize||(String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)}),
String.prototype.strip=function(e){return this.replace(e,"")},
String.prototype.trim=function(){return this.strip(/^\s+|\s+$/g)},*/
// String.prototype.stripForTags=function(){return this.strip(/[^a-z0-9 ,]*/gi)},
// String.prototype.stripForTagsMultilingual=function(){return this.strip(/[^a-zA-Z0-9\u0401\u0410-\u044f\u0451\u3041-\u3096\u30A0-\u30FF\u3400-\u4DB5\u4E00-\u9FCB\uF900-\uFA6A\u2E80-\u2FD5\uFF5F-\uFF9F\u3000-\u303F\u31F0-\u31FF\u3220-\u3243\u3280-\u337F\uFF01-\uFF5E ,]*/g)},
/* String.prototype.stripHtmlTags=function(){var e="(?:[^\"'>]|\"[^\"]*\"|'[^']*')*",t=new RegExp("<(?:!--(?:(?:-*[^->])*--+|-?)|script\\b"+e+">[\\s\\S]*?</script\\s*|style\\b"+e+">[\\s\\S]*?</style\\s*|/?[a-z]"+e+")>","gi");return this.strip(t)},
String.prototype.stripExtended=function(){return this.strip(/[^\u0000-\u0080]+/g)},
String.prototype.stripExtendedMultilingual=function(){return this.strip(/[^\u0000-\u0080\u0401\u0410-\u044f\u0451\u3041-\u3096\u30A0-\u30FF\u3400-\u4DB5\u4E00-\u9FCB\uF900-\uFA6A\u2E80-\u2FD5\uFF5F-\uFF9F\u3000-\u303F\u31F0-\u31FF\u3220-\u3243\u3280-\u337F\uFF01-\uFF5E]+/g)},
String.prototype.sanitize=function(){return this.stripExtended().stripHtmlTags().trim()},
String.prototype.sanitizeMultilingual=function(){return this.stripExtendedMultilingual().stripHtmlTags().trim()};
Array.prototype.remove = Array.prototype.remove || function(val){var i = this.length;while(i--){if (this[i] === val){this.splice(i,1);}}};
*/
// ---------------------------------------------------------
	function _type(obj){Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();return;}
	function _typeof(obj){
		if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
			_typeof = function (obj) {return typeof obj;};
		} else {
			_typeof = function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};
		}
		return arguments.length > 1 && arguments[1] && typeof arguments[1] === "string" ? _typeof(obj) === arguments[1] : _typeof(obj);
		//return _typeof(obj);
	}
	function _extendObj(){
		var options, name, src, copy, copyIsArray, clone,target = arguments[ 0 ] || {},
		i = 1,length = arguments.length,deep = false;
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !isFunction( target ) ) {
			target = {};
		}
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
		for( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( isPlainObject( copy ) || ( copyIsArray = Array.isArray( copy ) ) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							//clone = src && Array.isArray( src ) ? src : [];
							clone = src && isArray( src ) ? src : [];
						} else {
							clone = src && isPlainObject( src ) ? src : {};
						}
						// Never move original objects, clone them
						target[ name ] = _extendObj( deep, clone, copy );
						// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
		return target;
	};
	function _extendObj2 ( first, second ){"use strict";for( var prop in second ) {if( second.hasOwnProperty( prop ) ) {first[prop] = second[prop];}}return first;}
	function isIn ( obj ,property) {return (property in obj) || hasOwn.call( obj,property);}
	function isWindow ( obj ) {var toString = Object.prototype.toString.call(obj);return toString == '[object global]' || toString == '[object Window]' || toString == '[object DOMWindow]' || (obj != null && obj === obj.window);};
	//--------------------------------------------------
    var _trim = "".trim;
    const trim = _trim && !_trim.call("\uFEFF\xA0") ? function( text ) {return text === null ? "" : trim.call( text );} : function( text ) {return text === null ? "" : text.toString().replace( rLWhitespace, '' ).replace( rTWhitespace, '' );};
	const logError = (msg) => {console.log(msg);}
	const makeArray = (collection) => {return Array.from ? Array.from(collection) : Array.prototype.slice.call(collection);}
	const merge = (array1, array2) => {return [].concat(array1, array2);/* return array1.push(...array2); */}
	var merge2 = function(...args) {
		// Native, doesn't remove duplicate items
		//return [].concat(...args)
		// ES6-way, doesn't remove duplicate items
		//array1 = [...array1, ...array2]
		// Set version, does remove duplicate items
		return Array.from(new Set([].concat(...args)))
	}
	const inArray = (needle, arr) => {if ((typeof arr == 'undefined') || !arr.length || !arr.push) return false;for (var i = 0; i < arr.length; i++) if (arr[i] == needle) return true;return false;}
	const isArray = (value) => {return Object.prototype.toString.call(value) == '[object Array]';}
	// const isArrayLike = ( obj ) => {return obj != null && typeof obj[Symbol.iterator] === 'function';};
	const isArrayLike = ( obj ) => {
		var length = !!obj /* && hasOwn.call( obj,"length") */&& isIn(obj,"length") && obj.length,type = _type( obj );
		if ( type === "function" || isWindow( obj ) ) {
			return false;
		}
		return type === "array" || length === 0 || typeof length === "number" && length > 0 && isIn(obj,( length - 1 )) || obj != null && typeof obj[Symbol.iterator] === 'function';
	}
	//Returns true if it is a DOM element    
	const isElement = (obj) => {return (typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string");};
	const isEmptyObject = function(obj){for(var key in obj) {if(obj.hasOwnProperty(key)) return false;}return true;};
	const isFile = (f) =>{ return !isElement(f) && !isSelector(f) && f.include && f.include(".");};
	const isFunction = ( obj ) => {return Object.prototype.toString.call(obj) == '[object Function]' || ( typeof obj === "function" && typeof obj.nodeType !== "number" );};
	const isNil = (val) => {return val === undefined || val === null;};
	const isNull = (val) => {return val === null;};
	const isNumber = (val) => {return _typeof( val ) === 'number' && val === val;};
	const isNumeric = function( obj ) {var realStringObj = obj && obj.toString();return isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;}
	const isObject = (obj) => {return obj === Object(obj);};
	const isPlainObject = (val) => {return !!val && _typeof(val) === 'object' && val.constructor === Object;};
	const isSet = (varname) => {return _typeof( varname ) !== 'undefined';}
	const isSelector = function() { return ( arguments.length > 0 && ( match = rquickExpr.exec(arguments[0]) ) && ( match[1] || match[2] || match[3] || $one(arguments[0]) ) )};
	const isAudioElement = (elem) => {return elem instanceof HTMLAudioElement;};
	const isMediaElement = (elem) => {return elem instanceof HTMLMediaElement;};
	const isVideoElement = (elem) => {return elem instanceof HTMLVideoElement;};
	const isString = (val) => {return typeof val === 'string';};
	if ((navigator.userAgent.toLowerCase().match(/chrome\/([4][9-9]|[5-9][0-9]|[1-9][0-9][0-9])\./) !== null ) || (navigator.userAgent.toLowerCase().match(/crios\/([4][9-9]|[5-9][0-9]|[1-9][0-9][0-9])\./) !== null )) {
		function isURL(str) {
			var pattern = new RegExp('^(https?:\\/\\/)?' +
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
			'((\\d{1,3}\\.){3}\\d{1,3}))' +
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
			'(\\?[;&a-z\\d%_.~+=-]*)?' +
			'(\\#[-a-z\\d_]*)?$','i');
			
			return pattern.test(str);
		}
	}
	
	const str2DOMElement = (html) => {
		"use strict";
		var wrapMap = {
			option: [ 1, "<select multiple='multiple'>", "</select>" ],
			legend: [ 1, "<fieldset>", "</fieldset>" ],
			area: [ 1, "<map>", "</map>" ],
			param: [ 1, "<object>", "</object>" ],
			thead: [ 1, "<table>", "</table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
			body: [0, "", ""],
			_default: [ 1, "<div>", "</div>"  ]
		};
		wrapMap.optgroup = wrapMap.option;
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;
		var match = /<\s*\w.*?>/g.exec(html);
		var element = document.createElement('div');
		if(/></.test(html)){
			element.innerHTML = html;
			element = element.innerHTML;
		} else {
			if(match != null) {
				var tag = match[0].replace(/</g, '').replace(/>/g, '').split(' ')[0];
				if(tag.toLowerCase() === 'body') {
					var dom = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
					var body = document.createElement("body");
					// keeping the attributes
					element.innerHTML = html.replace(/<body/g, '<div').replace(/<\/body>/g, '</div>');
					var attrs = element.firstChild.attributes;
					body.innerHTML = html;
					for(var i=0; i<attrs.length; i++) {
						body.setAttribute(attrs[i].name, attrs[i].value);
					}
					return body;
				} else {
					var map = wrapMap[tag] || wrapMap._default, element;
					html = map[1] + html + map[2];
					element.innerHTML = html;
					// Descend through wrappers to the right content
					var j = map[0]+1;
					while(j--) {
						element = element.lastChild;
					}
				}
			} else {
				element.innerHTML = html;
				element = element.lastChild;
			}
		}
		return element;
	};
	/**
	* Nulls out event handlers to prevent memory leaks in IE6/IE7
	* http://javascript.crockford.com/memory/leak.html
	* @param {Element} d
	* @return void
	*/
	const purge = ( d ) => {
		"use strict";
		var a = d.attributes, i, l, n;
		if ( a ) {
			for ( i = a.length - 1; i >= 0; i -= 1 ) {
				n = a[i].name;
				if ( typeof d[n] === 'function' ) {
					d[n] = null;
				}
			}
		}
		a = d.childNodes;
		if ( a ) {
			l = a.length;
			for ( i = 0; i < l; i += 1 ) {
				this.purge( d.childNodes[i] );
			}
		}
	};
	//Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
	const bind = (obj, fn, superOBJ) => {
		//return function () {return fn.apply(obj, arguments);};
		var fn = fn || this, args = Array.prototype.slice.call(arguments),
		object = args.shift();
		return function(){
			return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
		};
	}

	const wait = (id) => {
		var con_dimensions=[],top,left;
		target = isElement(id) ? id : $one(id);
	    //con_dimensions = [parseInt(app.appStyle.getStyleProp(target,'height').replace('px','')),parseInt(app.appStyle.getStyleProp(target,'width').replace('px',''))];
		left = '47.5%';//left = (con_dimensions[0]/2)-20 +'px';
	    top = '47.5%';// (con_dimensions[1]/2)-20 +'px';
		//HTMLResult2 = "<strong>top:"+top+";left:"+left+";</strong>";HTMLResult = "<center><div id='loader'><img src='" + BASE_URL + "Uploads/images/loaders/Atomic.gif' border='1'/><br>Rendering.....</div></center>";
	    _pbd.animation.fadeOpacity(id,0,100,1300);
		target.innerHTML = "<div class='loader' style=\"position:relative;top:"+top+";left:"+left+";\"></div>";
		return true;
	}
	const fileReaderChunksUploader = (file) => {
		var progress = document.createElement("progress");
		file.onchange = function(e){
			var fr = new FileReader();
			fr.onprogress = function(e){progress.value = e.loaded /  e.total;}
			fr.onload = startUpload.bind(fr);
			progress.style.display = "inline-block";
			fr.readAsArrayBuffer(e.target.files[0]);
		}
		function startUpload (){
			var chunkSize = 16<<10;
			var buffer = this.result;
			var fileSize = buffer.byteLength;
			var segments = Math.ceil(fileSize / chunkSize);
			var count = 0;
			progress.value = 0;
			
			(function upload(){
				var segSize = Math.min(chunkSize, fileSize - count * chunkSize);
				if(segSize > 0){
					var chunk = new Uint8Array(buffer, count++ * chunkSize, segSize);
					progress.value = count / segments;
					// send chunks to server (here pseudo cycle for demo purpose)
					setTimeout(upload,100); // when upload ok, call function again for the next block
				} else {
					alert("done");
					progress.style.display = "none";
				}
			})();
		}
	}
	/**
	 * Make an HTML element
	 * @param  {Object} elem The element details
	 * @return {Node}        The HTML element
	 */
	const makeElem = (elem) => {
		if( !isPlainObject( elem ) ) return this;
		// Create the element
		// var node = elem.type === 'text' ? document.createTextNode(elem.content) : (elem.type === 'comment' ? document.createComment(elem.content) : document.createElement(elem.type));
		var node;
		if (elem.type === 'text') {
			node = document.createTextNode(elem.content);
		} else if (elem.type === 'comment') {
			node = document.createComment(elem.content);
		} else if (elem.isSVG || elem.type === 'svg') {
			node = document.createElementNS('http://www.w3.org/2000/svg', elem.type);
		} else {
			node = document.createElement(elem.type);
		}
		// Add attributes
		Object.assign(node, elem.atts);
		// If the element has child nodes, create them
		// Otherwise, add textContent
		if (elem.children.length > 0) {
			elem.children.forEach((function (childElem) {
				node.appendChild(makeElem(childElem));
			}));
		} else if (elem.type !== 'text') {
			node.textContent = elem.content;
		}
		return node;
	};
	/**
 * @description
 * Invokes the `iterator` function once for each item in `obj` collection, which can be either an
 * object or an array. The `iterator` function is invoked with `iterator(value, key)`, where `value`
 * is the value of an object property or an array element and `key` is the object property key or
 * array element index. Specifying a `context` for the function is optional.
 *
 * It is worth noting that `.forEach` does not iterate over inherited properties because it filters
 * using the `hasOwnProperty` method.
 *
   ```js
     var values = {name: 'misko', gender: 'male'};
     var log = [];
     angular.forEach(values, function(value, key){
       this.push(key + ': ' + value);
     }, log);
     expect(log).toEqual(['name: misko', 'gender: male']);
   ```
 *
 * @param {Object|Array} obj Object to iterate over.
 * @param {Function} iterator Iterator function.
 * @param {Object=} context Object to become context (`this`) for the iterator function.
 * @returns {Object|Array} Reference to `obj`.
 */
	const forEach = (obj, iterator, context) => {
		var key;
		if (obj) {
			if (isFunction(obj)){
				for (key in obj) {
					// Need to check if hasOwnProperty exists,
					// as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
					if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
						iterator.call(context, obj[key], key);
					}
				}
			} else if (obj.forEach && obj.forEach !== forEach) {
				obj.forEach(iterator, context);
			} else if (isArrayLike(obj)) {
				for (key = 0; key < obj.length; key++) iterator.call(context, obj[key], key);
			} else {
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						iterator.call(context, obj[key], key);
					}
				}
			}
		}
		return obj;
	};
/**
 * @description
 * Determines the number of elements in an array, the number of properties an object has, or
 * the length of a string.
 *
 * @param {Object|Array|string} obj Object, array, or string to inspect.
 * @param {boolean} [ownPropsOnly=false] Count only "own" properties in an object
 * @returns {number} The size of `obj` or `0` if `obj` is neither an object nor an array.
 */
	const size = (obj, ownPropsOnly) => {
		var count = 0, key;
		if (isArray(obj) || isString(obj)) {
			return obj.length;
		} else if (isObject(obj)){
			for (key in obj) if (!ownPropsOnly || obj.hasOwnProperty(key)) count++;
		}
		return count;
	}
	const byteSize = str => new Blob([str]).size;
	var size2 = function size(val) {return ( isArray(val) || isString(val) ) ? val.length : val && _typeof(val) === 'object' ? val.size || val.length || Object.keys(val).length : typeof val === 'string' ? new Blob([val]).size : 0;};
	const dig = (obj, target) => target in obj ? obj[target] : Object.values(obj).reduce((acc, val) => {if (acc !== undefined) return acc;if (typeof val === 'object') return dig(val, target);}, undefined);
	/* const data = {
		level1: {
			level2: {
				level3: 'some data'
			}
		}
	};
	dig(data, 'level3'); // 'some data'
	dig(data, 'level4'); // undefined
	*/
	var createElement = function createElement(str) {
	    var el = document.createElement('div');
	    el.innerHTML = str;
	    return el.firstElementChild;
	  };
	  var createEventHub = function createEventHub() {
	    return {
	      hub: Object.create(null),
	      emit: function emit(event, data) {
	        (this.hub[event] || []).forEach(function (handler) {
	          return handler(data);
	        });
	      },
	      on: function on(event, handler) {
	        if (!this.hub[event]) this.hub[event] = [];
	        this.hub[event].push(handler);
	      },
	      off: function off(event, handler) {
	        var i = (this.hub[event] || []).findIndex(function (h) {
	          return h === handler;
	        });
	        if (i > -1) this.hub[event].splice(i, 1);
	        if (this.hub[event].length === 0) delete this.hub[event];
	      }
	    };
	};
	const getImages = (el, includeDuplicates = false) => {
		const images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'));
		return includeDuplicates ? images : [...new Set(images)];
	};
	const indentString = (str, count, indent = ' ') => str.replace(/^/gm, indent.repeat(count));
	const prettyBytes = (num, precision = 3, addSpace = true) => {
		const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
		const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
		const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision));
		return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
	};
/*
prettyBytes(1000); // "1 KB"
prettyBytes(-27145424323.5821, 5); // "-27.145 GB"
prettyBytes(123456789, 3, false); // "123MB*/
	/* Returns all indices of `val` in an array.
	* If `val` never occurs, returns `[]`.
	* Use `Array.prototype.reduce()` to loop over elements and store indices for matching elements.
	* Return the array of indices.
	*/
	const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
	/*indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0, 3]
	indexOfAll([1, 2, 3], 4); // []*/
	var sleep = function sleep(ms) {return new Promise(function (resolve) {return setTimeout(resolve, ms);});};
	var indexOf = function(array, obj) {
		if (array.indexOf) return array.indexOf(obj);
		for (var i = 0; i < array.length; i++) {
			if (obj === array[i]) return i;
		}
		return -1;
	}
	const includes = (array, obj) => {return indexOf(array, obj) != -1;}
	const arrayRemove = (array, value) => {
		var index = indexOf(array, value);
		if (index >=0) array.splice(index, 1);
		return value;
	}
	const getMarkDownAnchor = paragraphTitle =>
  paragraphTitle
    .trim()
    .toLowerCase()
    .replace(/[^\w\- ]+/g, '')
    .replace(/\s/g, '-')
    .replace(/\-+$/, '');
// Creates an object from pairs
const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});
// Optimizes nodes in an HTML document
const optimizeNodes = (data, regexp, replacer) => {
  let count = 0;
  let output = data;
  do {
    output = output.replace(regexp, replacer);
    count = 0;
    while (regexp.exec(output) !== null) ++count;
  } while (count > 0);
  return output;
};
	const removeNonASCII = (str) => {return str.replace(/[^\x20-\x7E]/g, '');};
	const on = (el, evt, fn, opts = {}) => {
        const delegatorFn = e => e.target.matches(opts.target) && fn.call(e.target, e);
        el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false);
       if (opts.target) return delegatorFn;
    };
	const $all = (selector, context,root) => {
		var m, i, elem, match,newContext = context && context.ownerDocument,
		nodeList,list = [];
		if(selector === Object(selector)/* &&selector.nodeType&&selector.nodeType === 1||selector.nodeType === 9 */) {
			return isArray(selector) || isArrayLike(selector) ? selector:[selector];
		} else if(rsingleTag.test( selector ) ) {
			m = rsingleTag.exec(str);
			//alert("single tag found "+m[0]+"-"+m[1]+"-"+m[2]);
			elem = str2DOMElement(selector);
			return list.push(elem);
		} else {
			context = context || document;
			nodeType = context ? context.nodeType : 9;// nodeType defaults to 9, since context defaults to document
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
				// ID selector
				if ( (m = match[1]) ) {
					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {
							if ( elem.id === m ) {
								list.push( elem );
							}
						}
					// Element context
					} else {
						if ( newContext && (elem = newContext.getElementById( m )) && contains( context, elem ) && elem.id === m ) {
							list.push( elem );
						}
					}
				// Type selector
				} else if ( (m = match[2])  && context.getElementsByTagName && _typeof(context.getElementsByTagName(m)[0] ) === "object") {
					// nodeList = context.getElementsByTagName( m );
					nodeList = getBy( "tag", m, context );
					
					if (nodeList && nodeList.length > 0) {
						list = makeArray(nodeList);
					}
				// Class selector
				} else if ( (m = match[3]) && context.getElementsByClassName && _typeof(context.getElementsByClassName(m)[0] ) === "object" ) {
					// nodeList = context.getElementsByClassName( m );
					nodeList = getBy( "class", m, context );
					if (nodeList && nodeList.length > 0) {
						list = makeArray(nodeList);
					}
				} else if (_typeof(context.querySelectorAll(selector)[0]) === "object") {
					// nodeList = context.querySelectorAll( selector );
					nodeList = getBy( "all", selector, context );
					if (nodeList && nodeList.length > 0) {
						list = makeArray(nodeList);
					}
				}
			// HANDLE: $(DOMElement)
			} else if ( selector && selector.nodeType ) {
				context = selector;
				list.push( selector );
				// HANDLE: $(function)
				// Shortcut for document ready
			} else if ( isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :
					// Execute immediately if ready is not present
					selector( _pbd );
			} else if( isArray( context ) ){
				// ToDo : search array for elements, attach to the closest relative
				alert("context is an array : " + context);
			} else if(context/*_typeof(context.querySelectorAll(selector)[0]) === "object"*/) {
				newContext = context;
				// alert(_typeof(context)+" - "+context+" - "+context.nodeType+" - "+context.nodeName);
				try {
					/*;for(i in context) {
						//alert(i+"="+context[i]+" - "+context[i].nodeType+" - "+context[i].nodeName); 
						if(isElement(context[i]) ) {
							newContext = context[i];  
							// alert(context[i]+" - "+context[i].nodeType+" - "+context[i].nodeName); 
							break;
						}
					}*/
					//nodeList = newContext.querySelectorAll(selector);
					nodeList = getBy( "all", selector, newContext );
					if (nodeList && nodeList.length > 0) {
						list = makeArray(nodeList);
						//list = Array.from ? Array.from(nodeList) : Array.prototype.slice.call(nodeList);
					}
				} catch(ctxError) {
					newContext = context instanceof _pbd ? ( context.nodes?context.nodes:context[ 0 ] ) : context;
					list = newContext;
					//list = _pbd().util().find(selector);
				}
				
			}
			return list;
		}
	};
	const $one = (selector,context,whichOne) => {
		try{
		var theOne,elems;
		if(isString(selector)){
			elems = $all(selector,context);
			if(isString(whichOne) && whichOne === "first" &&  isArray(elems) ){whichOne =  0;} else if(isString(whichOne) && whichOne === "last" &&  isArray(elems) ) {whichOne = elems.length - 1;}
			theOne =  isElement(elems[whichOne]) ? elems[whichOne] : ( isElement(elems[0]) ? elems[0] : elems );
		} else if(isElement(selector)) {theOne = selector;}
		return theOne;
		} catch (e){alert(e.stack)}
	};
	
	//const $one = (selector,context) => {return _typeof(selector) === "string" && $all(selector,context)[0] && _typeof($all(selector,context)[0]) === "object" ? $all(selector,context)[0] : typeof(selector) === "object" ? selector : false;/* context = context || document;return typeof(selector) === "string" ? context.querySelector(selector) : typeof(selector) === "object" ? selector : false; */}
	// getElementById
	const $id = (id) => {return getBy('id',id);}
	var _toggleClass = function(elem, className){
		//elem = __pbd_self.isObject(ele) ? ele : __pbd_self.$$(ele);
		if(elem.classList){
			elem.classList.toggle(className);
		} else {
			var classes = elem.className.split(' ');
			existingIndex = classes.indexOf(className);
			if(existingIndex >= 0){
				classes.splice(existingIndex,1);
			} else classes.push(className);
			elem.className = classes.join(' ');
			/* if (this.hasClass(elem, className)) this.removeClass(elem, className);
			else this.addClass(elem, className); */
		}
		return elem;
	};
	if (isXPathAvailable) {
		document._getElementsByXPath = function(expression, parentElement) {
			var results = [];
			var query = document.evaluate(expression, $(parentElement) || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0, length = query.snapshotLength; i < length; i++)
				results.push( query.snapshotItem(i) );
				// results.push(Element.extend(query.snapshotItem(i)));
			return results;
		};
	}
	var getBy = (by, selector,context) => {
		try{
			var _by,_context,allowed = ["id","class","tag","name","all","query","query-one","queryOne"];
			by = ( _typeof(by) === "string" && inArray(by.toLowerCase(),allowed) ? by : "id" ).toLowerCase();
			_context = isElement( context ) && ( by !=="id" || by !== "xpath" ) ? context : document;
			_by = by === "id" ? "getElementById" : by === "class" ? "getElementsByClassName" : by === "tag" ? "getElementsByTagName" : by === "name" ? "getElementsByName" : by === "xpath" && isXPathAvailable ? "evaluate" : (by === "query" || by === "query-one" || by === "queryOne" ) ? "querySelector" : "querySelectorAll";
			return _typeof(selector) === "string" ? ( by === "id" ? _context[_by](selector) : by === "xpath" ?  _context[_by](selector, _context || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null) : Array.from( _context[_by](selector) ) ) : selector;
		} catch (e){
			return [context, selector];
		}
	};
	var _pbd = function(selector,context) {
		this.selector = selector || null;
		this.context = context || document;
		this.nodes = null;
		this.currentIndex = 0;
		this.selectedNode = null;
		this.coreConfig = {};
		this.eventConfig = {};
		if(!selector) return this;
	};
	_pbd.fn = _pbd.prototype = {
		constructor: _pbd,
		guid:0,
		activeRequests : 0,
		prevObj : this,
		toArray: function() {
			return slice.call( this );
		},
		ready: function (fn) {
			// Sanity check
			if (typeof fn !== 'function') return;
			// If document is already loaded, run method
			if (document.readyState === 'interactive' || document.readyState === 'complete') {
				return fn();
			}
			// Otherwise, wait until document is loaded
			document.addEventListener('DOMContentLoaded', fn, false);
		},
		/**
		 * Run a callback on each item
		 * @param  {Function} callback The callback function to run
		 */
		each : function (arr, callback) {
			if(arr && isFunction( arr) ){callback = arr;arr = null;}
			if (!callback || !isFunction(callback ) ) return;
			if( arr && ( isArray( arr ) || isArrayLike( arr ) ) ){
				if( isArray( arr ) ) {arr.forEach(callback, i);}
				else if( isArrayLike( arr ) ) {forEach(arr, callback , this);}
			} else {
				if( !isArray( this.nodes ) ) {this.nodes = this[ 0 ] = [ this.nodes ];}
				for (var i = 0; i < this.nodes.length; i++) {
					if( isElement( this.nodes[i] ) ) {
						callback(this.nodes[i], i);
					}
				}
			}
			return this;
		},
		// style & css section
		animate : function(params = {}, speed){
			var _elem, _this = this;
			if(isArray(params)){
				for(var i = 0, l = this.nodes.length;i<l;i++){
					_elem = this.animation.keyframes(this.nodes[ i ], params, isPlainObject(speed) ? speed : {});
					this.nodes[ i ] = this[ i ] = _elem;
					//elem.animate(params, isPlainObject(speed) ? speed : {});
				}
			} else {
				this.each(function (elem){
					elem.style.transition = 'all ' + ( speed || _this.animation.animConfig.speeds._default );
					if(_typeof(params) === "string") elem.style.cssText += params;
					else Object.keys(params).forEach((key) => {elem.style[key] = params[key];});
				});
			}
			return this;
		},
		/**
		 * Add a class to elements
		 * @param {String} className The class name
		 */
		addClass : function(className){
			if (!className) return this;
		    var _this = this;
			if( isArray(this.nodes) || isArrayLike(this.nodes) ){
				this.each(function (elem){
					// _pbd.each(this.nodes,function(i){
					//if (!elem || !className || (elem.className && elem.className.search(new RegExp("\\b" + className + "\\b")) != -1))
					//return;//continue;
					if (!_this.hasClass(elem, className)) {elem.classList ? elem.classList.add(className) : elem.className += (elem.className ? " " : "") + className;}
     	    	});
   	 	} else {
			    if (!this.hasClass(this.nodes, className)) this.nodes.classList ? this.nodes.classList.add(className) : this.nodes.className += (this.nodes.className ? " " : "") + className;
		    }
			return this;
  	  },
		/**
		 * Remove a class to elements
		 * @param {String} className The class name
		 */
		removeClass : function( className){
			if ( !className) return this;
			var _this = this;
			if(isArray(this.nodes) || isArrayLike(this.nodes)){
				this.each(function (elem){
				//__pbd.each(this.nodes,function(i){
					if (_this.hasClass(className)) {
						if(elem.classList) elem.classList.remove(className);
						//else elem.className = elem.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
						else elem.className = elem.className.replace(new RegExp("(^|\\b)" + className.split(" ").joi("|") + "\\b|$", "gi"), " ");
					}
				});
			} else {
				if (this.hasClass(className)) {
					if(this.nodes.classList) this.nodes.classList.remove(className);
					//else elem.className = elem.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
					else this.nodes.className = this.nodes.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "\\b|$", "gi"), " ");
			    }
			}
			return this;
		},
		toggleClass : function(className){
			if(isArray(this.nodes) || isArrayLike(this.nodes)){
				var _this = this,elem;
				this.each(function (elem){
					/* if (_this.hasClass(elem, className)) _this.removeClass(elem, className);
					else _this.addClass(elem, className); */
					_toggleClass(elem, className);
				});
			} else {
		    	/* if (this.hasClass(this.nodes, className)) this.removeClass(elem, className);
		    	else this.addClass(this.nodes, className); */
				_toggleClass(this.nodes, className);
		    }
			return this;
		},
		hasClass: function( selector ) {
			var className = " " + selector + " ",i = 0, l = this.nodes.length;
			for ( ; i < l; i++ ) {
				if(_typeof( this.nodes[i].classList ) !== "undefined" && this.nodes[i].classList.contains(className) ){
					return true;
				} else if ( this.nodes[i].nodeType === 1 && (" " + this.nodes[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}
			return false;
		},
		css : function(value){
			var ret,styleValue,elem = this.nodes, util = this.util();
			if(arguments.length === 1){
				if(isObject(arguments[0])){
					util.styleElement(elem, arguments[0]);
					return this;
				} else {
					var camelized = util.camelize(value),index = this.currentIndex;
					if(elem && (isArray(elem) || isArrayLike(elem))){
						if( isElement(elem[index]) ){
							ret = (elem[index].style && elem[index].style[camelized]) ? elem[index].style[camelized] : util.get.styleProp(elem[index],value);
						} else {
							_pbd.each(elem,function(i){
								if(index == i) ret = (elem[i].style && elem[i].style[camelized]) ? elem[i].style[camelized] : util.get.styleProp(elem[i],value);
							});
						}
					} else {
						elem = (elem || elem[index]);
						ret = (elem.style && elem.style[camelized]) ? elem.style[camelized] : util.get.styleProp(elem,value);
						/* ret = util.get.styleProp((elem||elem[index]),value); */
					} 
					return ret
				}
			} else if(arguments.length === 2){
				var camelized = util.camelize(arguments[0]);
				styleValue = arguments[1];
				this.each(function(elem){
					elem.style[camelized] = styleValue;
					//elem.style.setProperty(camelized,styleValue);
				});
				return this;
			}
		},
		// index section
		get: function( num, chain ) {
			var tmp, _this = this, chain = chain || false;
			if ( num == null ) {
				return slice.call( this || this.nodes);
			}
			//this.currentIndex = num < 0 ? num + this.nodes.length : num;
			this.setCurrentIndex(num < 0 ? num + this.nodes.length : num);
			// Return just the one element from the set
			// return num < 0 ? this.nodes[ num + this.nodes.length ] : this.nodes[ num ];
			//alert(this.currentIndex);
			tmp = this.nodes[ this.currentIndex ];
			//this.nodeCopies = tmp;
			return chain ? (function (){
				_this.nodes = tmp;
				_this[0] = tmp;
				return _this;
			})() : tmp;
		},
		index: function ( num ) {
			num = num || this.currentIndex;
			el = num && isElement( this.nodes[ num ] ) ? this.nodes[ num ] : isElement( this.nodes ) ? this.nodes : this.nodes[ this.currentIndex ];
			if (!el) return -1;
			var i = 0;
			do {
				i++;
			} while (el = el.previousElementSibling);
			return i;
		},
		// mark each child node with its position (for nth calls)
		// "ofType" flag indicates whether we're indexing for nth-of-type
		// rather than nth-child
		index2 : function(parentNode, reverse, ofType) {
			var i = 0, j = 1, num = this.currentIndex,
			parentNode = parentNode && isElement(parentNode) ? parentNode : ( isElement( this.nodes[ num ] ) ? this.nodes[ num ] : isElement( this.nodes ) ? this.nodes : this.nodes[ 0 ] );
			if (!parentNode) return -1;
			var nodes = parentNode.childNodes;
			parentNode._countedByPrototype = emptyFn;
			if (reverse) {
				for ( i = nodes.length - 1; i >= 0; i--) {
					var node = nodes[i];
					if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
				}
			} else {
				//for (var i = 0, j = 1, nodes = parentNode.childNodes; node = nodes[i]; i++){
				for ( ; j = 1, node = nodes[i]; i++){
					if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
				}
			}
			return j;
		},
		getCurrentIndex: function(){return this.currentIndex;},
		setCurrentIndex: function(index){return this.currentIndex = isNumber(index) ? index : 0;},
		getCurrentElement: function (){var cElem = isElement(this.nodes[ this.currentIndex ]) ?  this.nodes[ this.currentIndex ] : isElement(this.nodes[ 0 ]) ?  this.nodes[ 0 ] : this.nodes; this.selectedNode = cElem; return cElem;},
		merge : merge,
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
			// Build a new jQuery matched element set
			var ret = this.util().merge( this.constructor(), elems );
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			// Return the newly-formed element set
			return ret;
		},
		// element select
		child: function ( num ){
			var elem = this.getCurrentElement();
			var children = ( elem.children || elem.childNodes || elem.parentElement.children );
			this.nodes = children;
			if(!isNil( num )){
				if(_typeof( num ) === "string"){
					this.nodes = num === "first" ? (elem.firstElementChild || elem.firstChild) : num === "last" ? (elem.lastElementChild || elem.lastChild) : (elem.children[0] || elem.childNodes[0]);
				} else if(isNumber( num )){
					this.nodes = isArrayLike(children) && isElement(children[ num ]) ? children[ num ] : children[ 0 ];
				}
			}
			this[0] = this.nodes;
			return  this;
		},
		children: function (){
			var elem = this.getCurrentElement();
			this[0] = this.nodes = elem.children || elem.childNodes || elem.parentElement.children;
			return  this;
		},
		first: function (){
			var elem = this.getCurrentElement();
			this[0] = this.nodes = elem.firstElementChild || elem.firstChild;
			return  this;
		},
		//first: function() {return this.eq( 0 );},
		last: function (){
			var elem = this.getCurrentElement();
			this[0] = this.nodes = elem.lastElementChild || elem.lastChild;
			return  this;
		},
		//last: function() {return this.eq( -1 );},
		next: function(){
			var elem = this.getCurrentElement();
			this[0] = this.nodes = elem.nextElementSibling || elem.nextSibling;
			return  this;
		},
		/* 
		For all nodes: parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling.
		For element nodes only: parentElement, children, firstElementChild, lastElementChild, previousElementSibling, nextElementSibling.
		 */
		parent: function(){
			var elem = this.getCurrentElement();
			this[0] = this.nodes = elem.parentElement || elem.parentNode;
			return  this;
		},
		parents: function (selector){
			var elem = this.getCurrentElement();
			const parents = Array.from(this.nodes, x => x.closest(selector));
			this[0] = this.nodes = parents;
			return this;
		},
		prev: function (){
			//return i && this[i].previousElementSibling ? this[i].previousElementSibling : this.nodes[ this.currentIndex ].previousElementSibling;
			var elem = this.getCurrentElement();
			this[0] = this.nodes = elem.previousElementSibling || elem.previousSibling;
			return  this;
		},
		siblings : function () {
			//return i && this[i].previousElementSibling ? this[i].previousElementSibling : this.nodes[ this.currentIndex ].previousElementSibling;
			var elem = this.getCurrentElement();
			// Setup siblings array and get the first sibling
			var siblings = [];
			var sibling = elem.parentNode.firstChild;
			// Loop through each sibling and push to the array
			while (sibling) {
				if (sibling.nodeType === 1 && sibling !== elem) {
					siblings.push(sibling);
				}
				sibling = sibling.nextSibling
			}
			//return siblings;
			this[0] = this.nodes = siblings;
			/*Array.prototype.filter.call(elem.parentNode.children, function(child){
				return child !== el;
			}); */
			/* const siblings = Array.from(elem.parentNode.children).filter(x => x !== ele); */
			return this;
		},
		// element placement
		after: function (element){
			this.each(function (elem){
				if(isElement(element)) elem.insertAdjacentElement('afterend', element);
			});
			return this;
		},
		before: function (element){
			this.each(function (elem){
				if(isElement(element)) elem.insertAdjacentElement('beforebegin', element);
			});
			return this;
		},
		append : function(newContent) {
			this.each(function (parent){
				if( isString(newContent) ){
					parent.insertAdjacentHTML('beforeend', newContent);
					//parent.innerHTML = parent.innerHTML + newContent;
				} else parent.appendChild(newContent);
			});
			return this;
		},
		appendTo : function(elem){
			this.each( (parent) => {
				this.$$(elem).append(parent);
			});
			return this;
		},
		prepend : function(newContent) {
			this.each(function (parent){
				if( isString(newContent) ) {
					parent.insertAdjacentHTML('afterbegin', newContent);
					// parent.innerHTML = newContent + parent.innerHTML;
				} else parent.insertBefore(newContent, parent.firstChild);
			});
			return this;
		},
		/* prepend: function (element){
			//let parent = isElement(this.nodes[ this.currentIndex ]) ?  this.nodes[ this.currentIndex ] : isElement(this.nodes[ 0 ]) ?  this.nodes[ 0 ] : this.nodes;
			this.each(function (parent){
				if( isElement(element) ) parent.insertBefore(element, parent.firstChild);
			});
			return this;
		},*/
		wrap: function(element, wrapper, attributes) {
			element = $(element);
			if(isElement(wrapper)) this.util().setAttr(wrapper, attributes || { });
			else if (isString(wrapper)) wrapper = new Element(wrapper, attributes);
			else wrapper = new Element('div', wrapper);
			if(element.parentNode) element.parentNode.replaceChild(wrapper, element);
			wrapper.appendChild(element);
			return wrapper;
		},
		empty: function (){
			var elem,
			i = 0;
			//var el = this.getCurrentElement();
			// while(el.firstChild) el.removeChild(el.firstChild);
			for ( ; (elem = this.nodes[i]) != null; i++ ) {
				// Remove element nodes and prevent memory leaks
				if ( elem.nodeType === 1 ) {
					//jQuery.cleanData( getAll( elem, false ) );
					// this.util().purge( elem );
					elem.innerHTML = "";
					elem.textContent = "";
				}
				// Remove any remaining nodes
				while ( elem.firstChild ) {
					elem.removeChild( elem.firstChild );
				}
				// If this is a select, ensure that it displays empty (#12336)
				// Support: IE<9
				if ( elem.options && elem.nodeName === "select" ) {
					elem.options.length = 0;
				}
			}
			return this;
		},
		remove : function(val){
			if(isString(val)){
				if(isSelector(val)){
					val = this.$$(val);
				} else if(rsingleTag.test(val)){
					val = "";
				}
			}
			this.each(function(elem){
				if(!val || val === "" || _typeof(val) ==="undefined" && elem.parentNode) {
					elem.parentNode.removeChild(elem);
					elem = null;
				} else if(isElement(val) && elem.contain(val) ){
					elem.removeChild(val);
				}
			});
			return this;
		},
		// element filters
		eq : function(num){var el = this.nodes;index = num != null ? ( num < 0 ? el[ num + el.length ] : el[ num ] ) : slice.call( this.nodes );this.nodes = index;return this;},
		filter: function (selector){
			return Array.from(this.nodes).filter(x => x.classList.contains(selector));
		},
		// removes whitespace-only text node children
		removeEmptyTextnode : function(element){
		// cleanWhitespace: function(element) {
			element = $(element);
			var node = element.firstChild;
			while (node) {
				var nextNode = node.nextSibling;
				if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
					element.removeChild(node);
				node = nextNode;
			}
			return element;
		},
		find : function(selector){
			var foundElements = [];
			for (var i = 0; i < this.nodes.length; i++) {
				/* var found = this.nodes[i].querySelectorAll(selector); */
				if(!isWindow(this.nodes[i])){
					var found = $all(selector,this.nodes[i]);
					for (var j = 0; j < found.length; j++) {
						foundElements.push(found[j]);
					}
				}
			}
			this.prevObj = this.merge(this.nodes,foundElements);
			this[0] = this.nodes = foundElements;
			this.length = this.nodes.length;
			return this;
		},
		is: function (otherEl){
			return this.nodes[ this.currentIndex ] === otherEl;
		},
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		//Matches Selector
		//JQUERY
		//$(el).is('.my-class');
		matches : function(selector) {
			return isString(selector) ? (this.nodes[ this.currentIndex ].matches || this.nodes[ this.currentIndex ].matchesSelector || this.nodes[ this.currentIndex ].msMatchesSelector || this.nodes[ this.currentIndex ].mozMatchesSelector || this.nodes[ this.currentIndex ].webkitMatchesSelector || this.nodes[ this.currentIndex ].oMatchesSelector).call(this.nodes[ this.currentIndex ], selector) : 
				this.nodes[ this.currentIndex ] === selector;
		},
		closest : function (el, selector) {
			this.each(function(el){
				const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
				while (el) {
					if (matchesSelector.call(el, selector)) {
						return el;
					} else {
						el = el.parentElement;
					}
				}
			});
			return this;
		},
		nodes: function (){return this.nodes || this[0];},
		// content getters / setters
		html : function(value) {
			"use strict";
			var elem,ret = "", el=false,append=false,sTargetId=null,sIndex=0;
			if(arguments.length > 1){
				if(arguments.length === 2){
					if( _typeof( arguments[1] ) === "object" ){
						if( "targetId" in arguments[1] ) sTargetId = arguments[1].targetId;
						if( "elementId" in arguments[1] ) el = arguments[1].elementId;
						if( "elementIndex" in arguments[1] ) sIndex = arguments[1].elementIndex;
						if( "appendContent" in arguments[1] ) append = arguments[1]. appendContent;
					} else sTargetId = arguments[1];
				} else if(arguments.length === 3){
					sTargetId = arguments[1];el = arguments[2];
				} else if(arguments.length === 4){
					sTargetId = arguments[1];el = arguments[2];sIndex = arguments[3];
				} else if(arguments.length === 5){
					sTargetId = arguments[1];el = arguments[2];sIndex = arguments[3];append = arguments[4];
				}
			}
			elem = isObject(el) && isElement(el) ? el : isString(el) ? $all(el) : this.nodes;
			// append = (typeof apd !== 'undefined') ? apd : false;
			if( !value || value === "" || value === null || typeof value === 'undefined') {
				if(elem && elem.length && elem.length>0){
					if(sIndex && isElement(elem[sIndex])){
						ret = elem[sIndex].innerHTML;
					} else {
						for(var i =0;i<elem.length;i++) {
							if(elem[i].nodeName.toLowerCase() === "iframe") var el = getIframeDocument(elem[i]).body;
							else var el = elem[i];
							ret += el.innerHTML;
						}
					}
					var content = append ? ret : elem[ sIndex || 0 ].innerHTML;
					if(sTargetId){
						var target,fragment = document.createDocumentFragment(),
						tmp = document.createElement("div");
						tmp.innerHTML = content;
						fragment.appendChild(tmp);
						if(target = $all(sTargetId, fragment) ) {
							fragment = tmp = null;
							return target[0].innerHTML;
						} else {fragment = tmp = null;return content;}
					} else return content;
				} else return elem ? (elem.length&&elem.length>0?elem[ sIndex || 0 ].innerHTML : elem.innerHTML) : undefined;
			} else {
				//var _value = str2DOMElement(value);
				//var value = _typeof(_value) === 'object' ? _value : value;
				if( isArray(elem) && elem.length > 0 ){
					if( _typeof(value) === "string" /* && !rnoInnerhtml.test( value ) */) value = value.replace( rxhtmlTag, "<$1></$2>" );
					if(sIndex && isElement(elem[sIndex])){
						if(elem[sIndex].nodeName.toLowerCase() === "iframe") {
							var el = getIframeDocument(elem[sIndex]).body;
						} else var el = elem[sIndex];
						if( isElement(el)){
							if(_typeof(value) === 'object') el.appendChild(value);
							else append ? el.innerHTML += value : el.innerHTML = value;
						}
					} else {
						for (var i = 0; i < elem.length; i++) {
							if(elem[i].nodeName.toLowerCase() === "iframe") {
								var el = getIframeDocument(elem[i]).body;
							} else var el = elem[i];
							if ( el.nodeType === 1 ) {
								if(_typeof(value) === 'object') el.appendChild(value);
								else append ? el.innerHTML += value : el.innerHTML = value;
							}
						}
					}
				} else {
					if(elem.nodeName.toLowerCase() === "iframe") elem = getIframeDocument(elem).body;
					if ( elem.nodeType === 1 ) {
						if(_typeof(value) === 'object') elem.appendChild(value);
						else append ? elem.innerHTML += value : elem.innerHTML = value;
					}
				}
				elem = 0;
				value = '';
				return this;
			}
		},
		outerHtml : function(value){
			var ret;
			if( !value || value === "" || value === null || typeof value === 'undefined') {
				if(this.nodes && this.nodes.length && this.nodes.length>0 && isElement(this.nodes[0])){
					ret = this.nodes[0].outerHTML;
				} else ret = this.nodes.outerHTML;
				return ret;
			} else {
				if( isArray (this.nodes) ){
					this.each(function (elem){
						elem.outerHTML = value;
					});
				} else this.nodes.outerHTML = value;
			}
			return this;
		},
		text : function(value){
			el.textContent = value;
			return this;
		},
		/**
		* Accepts a form input element and returns its value
		*/
		val : function(str, minOrMax){
			"use strict";
			var ret, minOrMax=minOrMax||false,elem = this.getCurrentElement();
			if ( elem && isElement( elem ) ) {
				if (str !== undefined && elem.value !== undefined) {
					elem.value = str;
					return this;
				}
				
				if ( elem.nodeName.toUpperCase() == 'SELECT' ) {
					var options = elem.options,index = elem.selectedIndex,one = elem.type === 'select-one' || index < 0,values = one ? null : [],value,_value;
					for ( var i = 0, len = options.length; i < len; i++ ) {
						if ( ( options[ i ].selected || i === index ) && !options[ i ].disabled ) {
							value = !options[ i ].value ? options[ i ].text : options[ i ].value;
							if ( one ) {
								return value;
							}
							_value = { i : value }
							values.push( _value );
						}
					}
					return minOrMax ? (minOrMax === "min" ? this.util().get.minOfArray(values) : minOrMax === "max" ? this.util().get.maxOfArray(values) : values[0] ) : values;
				} else {
					//ret = elem.value;
					ret = isElement( elem ) ? ( elem.hasAttribute("value") ? elem.getAttribute("value") : elem.value ? elem.value : elem.text ? elem.text : elem.textContent ) : null;
					
					return typeof ret === "string" ?
						// Handle most common string cases
						ret.replace( /\r/g, "" ) :
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}
			}
		},
		value : function (content) {
			var ret;
			//var node = this.nodes || this[0];
			//if (!node) return content ? this : void 0;
			this.each(function(node){
				var tagName = node.tagName;
				if (content === void 0) {
					if (tagName === "SELECT") {
						ret =  ~node.selectedIndex ? node.options[node.selectedIndex] : node.options[0];
						//alert(ret.getAttribute("value"));
						//return isElement( ret ) && ret.hasAttribute("value") ? ret.getAttribute("value") : ret.value ? ret.value : ret.text;
					} else if (tagName === "OPTION") {
						ret = node.hasAttribute("value") ? node.value : node.text;
					} else if (tagName === "INPUT" || tagName === "TEXTAREA") {
						ret = node.value;
					} else {
						ret = node.textContent;
					}
				} else {
					switch (tagName) {
						case "INPUT":
						case "OPTION":
						case "TEXTAREA":
							if (typeof content === "function") {
								content = content(node.value);
							}
							node.value = content;
						break;
						case "SELECT":
							if (typeof content === "function") {
								content = content(node.value);
							}
							if (Array.prototype.every.call(node.options, function (o) {return !(o.selected = o.value === content);})) {
								node.selectedIndex = -1;
							}
						break;
						default:
							if (typeof content === "function") {
								content = content(node.textContent);
							}
							node.textContent = content;
					}
				}
			});
			if( ret ){
				return isElement( ret ) && ret.hasAttribute("value") ? ret.getAttribute("value") : ret.value ? ret.value : ret.text;
			}
		},
		offset : function () {
			var node = this.selectedNode || this.nodes[0];
			var result = { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
			if (node) {
				var docEl = (node.ownerDocument || node).documentElement;
				var clientTop = docEl.clientTop;
				var clientLeft = docEl.clientLeft;
				var scrollTop = window.pageYOffset || docEl.scrollTop;
				var scrollLeft = window.pageXOffset || docEl.scrollLeft;
				var boundingRect = node.getBoundingClientRect();
				result.top = boundingRect.top + scrollTop - clientTop;
				result.left = boundingRect.left + scrollLeft - clientLeft;
				result.right = boundingRect.right + scrollLeft - clientLeft;
				result.bottom = boundingRect.bottom + scrollTop - clientTop;
				result.width = boundingRect.right - boundingRect.left;
				result.height = boundingRect.bottom - boundingRect.top;
			}
		    return result;
		},
		// attributes & property modifiers
		data : function (attribute,value){
			var camelized = this.util().camelize(attribute);
			if(value !== undefined){
				try{
				this.each(function (elem){
					elem.dataset[camelized] = value;
				});
				} catch(e) {alert(e.stack)}
				return this;
			} else {
				return value === null ? "" : this.nodes[this.currentIndex].dataset[camelized];
			}
		},
		attr : function( name, value) {
			try{
			var ret = [], _this = this;
			//elem = this.nodes;
			this.each(function(elem){
				var nType = elem.nodeType;
				// Don't get/set attributes on text, comment and attribute nodes
				if ( nType === 3 || nType === 8 || nType === 2 ) {
					return;
					//continue;
				}
				if(typeof(name) === "object") {
					/* if ( typeof elem.getAttribute === "undefined" ) {
						var newName;
						for(x in name) if( name.hasOwnProperty(x) )  _this.prop( name[x], x, elem );
						return _this.prop( name, value, elem );
					} else */
					_this.util().setAttr(elem, name);
				} else {
					// Fallback to prop when attributes are not supported
					if ( typeof elem.getAttribute === "undefined" ) { 
						return _this.prop( name, value, elem );
					}
					if ( nType !== 1 /* || !documentIsHTML( elem )*/ && _typeof(name) === "string" ) {
						name = name.toLowerCase();
					}
					if ( value !== undefined ) {
						if ( value === null ) {
							elem.removeAttribute( name );
						} else {
							_this.util().setAttr(elem, name, value + "" );
							//_this.setNodeAttribute(elem, name, value + "" );
							/* elem.setAttribute( name, value + "" ); */
						}
						return _this;
					} else {
						//alert(name);
						ret.push(elem.getAttribute( name ));
						//return ret === null ? undefined : ret;
					}
				}
			});
			if( !arguments || !arguments.length || arguments.length === 0) return this.getCurrentElement().getAttributes();
			else if ( _typeof(name) !== "object" && value === undefined ) return ret[0];
			else return this;
			} catch (e){alert(e.stack)}
		},
		removeAttr : function (attr){
			this.each(function (elem){
				if(isString(attr) && elem.hasAttribute(attr) ) elem.removeAttribute(attr);
			});
			return this;
		},
		hasAttr : function (attr){
			var elem = this.getCurrentElement();
			return elem.hasAttribute(attr);
		},
		prop : function( name, value, elem ) {
			//elem = elem && isElement(elem) ? elem : (this.nodes ?  this.nodes : $all(elem); // __pbd_self.$$(elem));
			var ret, nType = elem.nodeType;
			var propFix = {"for": "htmlFor","class": "className","checked":"defaultChecked"};
			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return this;
			}
			if ( nType !== 1 /*|| !documentIsHTML( elem )*/ ) {
				// Fix name and attach hooks
				name = inArray(name,propFix) ? propFix[ name ] : name;
			}
			if ( value !== undefined ) {
				return ( elem[ name ] = value );
			} else 
			return elem[ name ];
		},
		// event methods
		on : function(event, selector, data, callback) {
			var that = this;
			// var evt = this.eventHandler.bindEvent(event, callback, this.nodes);
			this.each(function (elem){
				var evt = that.eventHandler.bindEvent(elem, event, selector, data, callback,false );
			});
			return this;
		},
		off : function(event) {
			var that = this;
			// var evt = this.eventHandler.unbindEvent(event, this.nodes);
			this.each(function (elem){
				var evt = that.eventHandler.unbindEvent(event, elem);
			});
			return this;
		},
		delegate : function (eventName,elementSelector,handler){
			// this[0] = this.nodes = isArray(this.nodes) || isArrayLike(this.nodes) ? this.nodes : [this.nodes];
			this.each(function (elem){
				_pbd.event().add(elem,eventName,elementSelector, null,handler,false);
			});
			return this;
		},
		trigger : function(name){var that = this;return this.each(this.nodes, function() {var event = document.createEvent('HTMLEvents');if ( !event.target ) {event.target = this;}event.initEvent(name,true,false);this.dispatchEvent(event);});/* return this; */}
	};
	init = _pbd.fn.init = function() {
		//try{
		var m;
		if (!this.selector) return this;
		switch (this.selector[0]) {
			case '<':
			if(rsingleTag.test( this.selector ) ) {
				//m = rsingleTag.exec(this.selector);
				//alert("single tag found "+m[0]+"-"+m[1]+"-"+m[2]);
				this[ 0 ] = this.nodes = [ str2DOMElement(this.selector) ];
				this.length = 1;
			} else {
				var matches = this.selector.match("/<([\w-]*)>/");
				if (matches === null || matches === undefined) {
					throw "Invalid Selector or Node";
					return false;
				}
				var nodeName = matches[0].replace('<', '').replace('>','');
				this[ 0 ] = this.nodes = [ document.createElement(nodeName) ];
				this.length = 1;
			}
			break;
			default:
			if (this.selector === 'document' || this.selector === document) {
				this[ 0 ] = this.nodes = [document];
			} else if (this.selector === 'window' || this.selector === window) {
				this[ 0 ] = this.nodes = [window];
			} else {
				//this.nodes = document.querySelector(this.selector);
				//this.nodes = this[ 0 ] = $all(this.selector, this.context, this);
				this.$$(this.selector, this.context, null, this, false);
			}
			this.length = this.nodes.length ? this.nodes.length : 0;
		}
		// } catch(e){alert(e.stack)}
	};
	// Give the init function the _pbd prototype for later instantiation
	init.prototype = _pbd.fn;
	// Initialize central reference
	//rootjQuery = $pbd( document );
	_pbd._cache = _pbd.prototype._cache = {"apps":[], "events":[]};
	_pbd.$$ = _pbd.prototype.$$ = function (selector, context, results, root, chain){
		results = results && ( isArray(results) || isArrayLike(results) ) ? results : false;
		chain = isSet( chain ) ? chain : true;
		var ret = $all(selector, context, root);
		if( results && ( isArray(ret) || isArrayLike(ret) ) ) ret = merge(ret, results);
		this[ 0 ] = this.nodes = ret;
		if( chain ) {
			return this;
		} else {
			return this.nodes;
		}
	};
	_pbd.prototype.setup = function( _newConfig ={} ){
		let _defaultConfig = {
			debugMode : false,
			theme : "#theme",
			currentTheme : ".w3-theme",
			speeds : {
				off: false,
				slow: 600,
				fast: 200,
				_default: 400// Default speed
			},
			wallpaper : {
				bgImg : 'http://localhost/ui/uploads/images/__GALLERY__/girlsxxx/917_1000.jpg',
				bgClip : "no-clip", //no-clip,border-box,content-box,padding-box
				bgColor : "transparent",
				bgAttachment : 'fixed', //scroll,fixed,initial,inherit,local,unset
				bgSize : "100% 100%", //auto,cover,contain,
				bgPosition : "center center",
				bgRepeat : "no-repeat",
				color : "#f5f5f5",
				realImage : false
			},
			tag : {
				append : true
			}
		};
		this.coreConfig = this.settings = _extendObj(_defaultConfig,_newConfig);
		return this;
	};
	
	_pbd.prototype.eventHandler = {
		events: [],
		bindEvent: function(targetElement, event, selector, data, callback, useCapture) {
			//elem, types, selector, data, fn, one, useCapture 
			if( useCapture === "undefined" ){
				useCapture = false;
			}
			// Types can be a map of types/handlers
			if ( typeof event === "object" ) {
				// ( event-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( event-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in event ) {
					this.bindEvent( targetElement, type, selector, data, event[ type ], useCapture );
				}
				return targetElement;
			}
			if ( data == null && callback == null ) {
				// ( event, callback )
				callback = selector;
				//alert(callback);
				data = selector = undefined;
			} else if ( callback == null ) {
				if ( typeof selector === "string" ) {
					// ( event, selector, callback )
					callback = data;
					data = undefined;
				} else {
					// ( event, data, callback )
					callback = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( callback === false ) {
				callback = returnFalse;
			} else if ( !callback ) {
				return targetElement;
			}
			if(isString( event ) && (eventsArr = event.split(' ') ) && eventsArr.length > 1 ){
				var x = 0,total = eventsArr.length;
				for(;x<total;x++){
					this.unbindEvent(eventsArr[ x ], targetElement);
					//_pbd.each(targetElement, function() {_pbd.event().add( this, eventsArr[ x ], callback, data, selector );});
					//targetElement.addEventListener(eventsArr[ x ], callback, false);
					_pbd.event().add(targetElement, eventsArr[ x ], selector, data, callback, useCapture);
					this.events.push({
						type: eventsArr[ x ],
						event: callback,
						target: targetElement
					});
				}
			} else {
				// return _pbd.each(elem, function() {_pbd.event().add( this, types, fn, data, selector );});
				this.unbindEvent(event, targetElement);
				// targetElement.addEventListener(event, callback, false);
				_pbd.event().add(targetElement, event, selector, data, callback, useCapture);
				this.events.push({
					type: event,
					event: callback,
					target: targetElement
				});
			}
		},
		findEvent: function(event) {
			return this.events.filter(function(evt) {
				return (evt.type === event);
			}, event)[0];
		},
		unbindEvent: function(event, targetElement) {
			var foundEvent = this.findEvent(event);
			if (foundEvent !== undefined) {
				targetElement.removeEventListener(event, foundEvent.event, false);
			}
			this.events = this.events.filter(function(evt) {
				return (evt.type !== event);
			}, event);
		}
	};

	_pbd.event = _pbd.fn.event =function (_newConfig={}){
		const _this = this;
		let _defaultConfig = {
			debugMode : false,
			errorMessages : []
		}
		this.eventConfig = _extendObj(_defaultConfig,_newConfig);
		var browser = this.browser(),
		isButton = function(event, code) {
			if (browser.IE) {
				var buttonMap = { 0: 1, 1: 4, 2: 2 };
				return event.button == buttonMap[code];
			} else if (browser.webkit) {
				switch (code) {
					case 0: return event.which == 1 && !event.metaKey;
					case 1: return event.which == 1 && event.metaKey;
					default: return false;
				}
			} else {
				return event.which ? (event.which === code + 1) : (event.button === code);
			}
		};
		return {
			__proto__ : _pbd,
			eventConfig : this.eventConfig,
			handlerId : 1,
			add : function (elem, type, selector, data, handler, useCapture) {
				if( !elem || !isElement(elem) ) {
					return this;
				}
				if (useCapture === undefined) {
					useCapture = false;
				}
				if (!handler.handlerId) {
					handler.handlerId = this.handlerId++;
				}
				var that = this,
				oldID = "PBD_old_" + type + handler.handlerId,
				newID = "PBD_new_" + type + handler.handlerId,
				newFunc = function(evt){
					evt = that.fixEvent(evt||window.event);
					if(!selector) elem[oldID]( evt );
					else {
						let target = evt.target.closest(selector); // (1)
						if (!target) return; // (2)
						if (!elem.contains(target)) return; // (3)
						// loop parent nodes from the target to the delegation node
						// for (var target = e.target; target && target != this; target = target.parentNode) {
							if(target.matches(selector)) {
								elem[oldID].call(target, evt);
								//break;
							}
						//}
					}
				};
				if ( elem.addEventListener ) {// DOM Standard
					elem[oldID] = handler;
					elem[newID] = newFunc;
					elem.addEventListener(type,elem[newID], useCapture);
				} else if (elem.attachEvent){// IE
					elem[oldID] = handler;
					//elem[newID] = function(){elem[oldID](that.fixEvent(evt||window.event));}
					elem[newID] = newFunc;
					elem.attachEvent("on"+type, elem[newID]);
				} else {
					elem[oldID] = handler;
					//elem[newID] = function(){elem[oldID](that.fixEvent(evt||window.event));}
					elem[newID] = newFunc;
					eventType = "on" + type;
					if (typeof elem[eventType] == "function"){
						var oldListener = elem[eventType];
						elem[eventType] = function(){
							oldListener();
							return handler();
						};
					} else {
						elem[eventType] = handler;
					}
				}
				return this;
			},
			attachEvent : function (target, eventType, functionRef,capture){if(typeof target.addEventListener != "undefined"){target.addEventListener(eventType, functionRef, capture);} else if (typeof target.attachEvent != "undefined"){target.attachEvent("on" + eventType, functionRef);} else{eventType = "on" + eventType;if (typeof target[eventType] == "function"){var oldListener = target[eventType];target[eventType] = function(){oldListener();return functionRef();};}else{target[eventType] = functionRef;}}return this;},
			remove : function (elem, type, handler,useCapture) {
				if (useCapture === undefined) {
					useCapture = false;
				}
				var that = this,
				oldID = "PBD_old_" + type + handler.handlerId,
				newID = "PBD_new_" + type + handler.handlerId;
				if (elem.removeEventListener) {// DOM Standard
					elem.removeEventListener(type, elem[newID], useCapture);
					elem[newID] = null;
					elem[oldID] = null;
				} else if ( elem.detachEvent ) {// IE
					elem.detachEvent( "on"+type, elem[newID] );
					elem[newID] = null;
					elem[oldID] = null;
				} else {// IE
					eventType = "on" + type;
					elem[eventType] = null;
					elem[newID] = null;
					elem[oldID] = null;
				}
				if (handler.handlerId) {
					handler.handlerId = this.handlerId--;
				}
				return this;
			},
			detachEvent : function (target, eventType, functionRef,capture){if(typeof target.removeEventListener != "undefined"){target.removeEventListener(eventType, functionRef, capture);} else if (typeof target.detachEvent != "undefined") {target.detachEvent("on" + eventType, functionRef);} else {target["on" + eventType] = null;}return this;},
			stopDefaultAction : function(event){event.returnValue = false;if (typeof event.preventDefault != "undefined"){event.preventDefault();}return this;},
			fixEvent : function (oEvt) {
				if (isSet(oEvt.fixed) && _typeof(oEvt.fixed) !=="undefined" && oEvt.fixed === true ) return oEvt;
				var evt = {};
				evt.oEvt = oEvt;
				// Event properties
				evt.type = oEvt.type;
				evt.target = oEvt.target || oEvt.srcElement || document;
				if ( evt.target.nodeType == 3 ){evt.target = evt.target.parentNode;}
				evt.timeStamp = oEvt.timeStamp || (new Date()).valueOf();
				// Event methods
				evt.preventDefault=function(){
					if ( oEvt.preventDefault ) oEvt.preventDefault();
					else oEvt.returnValue = false;
				}
				evt.stopPropagation=function(){
					if (oEvt.stopPropagation) oEvt.stopPropagation();
					else oEvt.cancelBubble = true;
				}
				// Support: IE<9
				// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
				evt.metaKey = !!evt.metaKey;

				return evt;
			},
			/*!
			 * Emit a custom event
			 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
			 * @param  {String} type   The event type
			 * @param  {Node}   elem   The element to attach the event to
			 * @param  {Object} detail Any details to pass along with the event
			 */
			emitEvent : function (type, elem, detail) {
				// Make sure there's an event type
				if (!type) return;
				// Variables
				elem = elem || window;
				detail = detail || {};
				// Create a new event
				var event = new CustomEvent(type, {
					bubbles: true,
					cancelable: true,
					detail: detail
				});
				// Dispatch the event
				elem.dispatchEvent(event);
				return _this || this;
			},
			delegate : function(eventType, selector, fn){
				this[0] = this.nodes = isArray(this.nodes) || isArrayLike(this.nodes) ? this.nodes : [this.nodes];
				// this.each(function (elem){
				for(var x =0;x<this.nodes.length;x++){
					var $el = this.nodes[x];
					if ( !isElement($el) ) { return; }
					$el.addEventListener(eventType, function(e) {
						let targets = $all(selector, $el);
						if (!targets) {
							return;
						}
						let $node = e.target;
						for (let i=0; i<targets.length; i++) {
							while ($node) {
								if ($node === targets[i] || targets[i].matches(selector)) {
									//alert($el.id +"-"+$node.id +"-"+targets.length);
									return fn.call($node, e);
									//break;
								}
								$node = $node.parentNode;
								if ($node === $el) {
									break;
								}
							}
						}
					});
				}
				return this;
			},
			on : function ( elem, types, selector, data, fn, one, useCapture ) {
				var origFn, type,typesArr;
				//_this = new Micro()
				if( useCapture === "undefined" ){
					useCapture = false;
				}
				// Types can be a map of types/handlers
				if ( typeof types === "object" ) {
					// ( types-Object, selector, data )
					if ( typeof selector !== "string" ) {
						// ( types-Object, data )
						data = data || selector;
						selector = undefined;
					}
					for ( type in types ) {
						this.event().on( elem, type, selector, data, types[ type ], one );
					}
					return elem;
				}
				if ( data == null && fn == null ) {
					// ( types, fn )
					fn = selector;
					//alert(fn);
					data = selector = undefined;
				} else if ( fn == null ) {
					if ( typeof selector === "string" ) {
						// ( types, selector, fn )
						fn = data;
						data = undefined;
					} else {
						// ( types, data, fn )
						fn = data;
						data = selector;
						selector = undefined;
					}
				}
				if ( fn === false ) {
					fn = returnFalse;
				} else if ( !fn ) {
					return elem;
				}
				if ( one === 1 ) {
					origFn = fn;
					fn = function( event ) {
						// Can use an empty set, since event contains the info
						_pbd.event().remove( event );
						return origFn.apply( this, arguments );
					};
					// Use same guid so caller can remove using origFn
					fn.guid = origFn.guid || ( origFn.guid = Micro.guid++ );
				}
				if(isString( types ) && (typesArr = types.split(' ') ) && typesArr.length > 1 ){
					var x = 0,total = typesArr.length;
					for(;x<total;x++){
						this.each(function(elem) {
							_pbd.event().add( elem, typesArr[ x ], fn, data, selector );
						});
					}
				} else {
					this.each(function(elem) {
						_pbd.event().add( elem, types, fn, data, selector );
					});
				}
				return this;
			},
			trigger: function (eventName){
				return this;
			},
			isLeftClick:   function(event) { return isButton(event, 0) },
			isMiddleClick: function(event) { return isButton(event, 1) },
			isRightClick:  function(event) { return isButton(event, 2) },
			element: function(event) {
				var node = event.target || event.srcElement;
				return node.nodeType == Node.TEXT_NODE ? node.parentNode : node;
			},
			findElement: function(event, expression) {
				var element = Event.element(event);
				if (!expression) return element;
				var elements = [element].concat(element.ancestors());
				return Selector.findElement(elements, expression, 0);
			},
			pointer: function(event) {
				return {
					x: event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
					y: event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop))
				};
			},
			pointerX: function(event) { return this.pointer(event).x },
			pointerY: function(event) { return this.pointer(event).y },
			stop: function(event) {
				Event.extend(event);
				event.preventDefault();
				event.stopPropagation();
				event.stopped = true;
			}
		}
	};
	// pbd.util 
	_pbd.util = _pbd.fn.util = function util(_newConfig={}){
		var _this = this || Object.getPrototypeOf(_pbd);
		let _defaultConfig = {
			debugMode : false,
			theme : "#theme",
			currentTheme : ".w3-theme",
			speeds : {
				off: false,
				slow: 600,
				fast: 200,
				_default: 400// Default speed
			},
			wallpaper : {
				bgImg : 'http://localhost/ui/uploads/images/__GALLERY__/girlsxxx/917_1000.jpg',
				bgClip : "no-clip", //no-clip,border-box,content-box,padding-box
				bgColor : "transparent",
				bgAttachment : 'fixed', //scroll,fixed,initial,inherit,local,unset
				bgSize : "100% 100%", //auto,cover,contain,
				bgPosition : "center center",
				bgRepeat : "no-repeat",
				color : "#f5f5f5",
				realImage : false
			},
			tag : {
				append : true
			}
		};
		this.utilConfig = _extendObj(_defaultConfig,_newConfig);
		// alert(_this.nodes+"-"+this.nodes.length/*+ Object.getPrototypeOf(_pbd)*/); 
			
		return {
			__proto__ : _pbd,
			utilConfig : this.utilConfig,
			/*
			 * Wrap an address in a Google Maps link.
			 */
			address : function (addr) {return "<a href=\"http://maps.google.com/maps?q=" + encodeURI(addr) + ">" + addr + "</a>";},
			animate : function (animation, hide) {
				_this.each(function (elem){
					// If there's no element or animation, do nothing
					if (!elem || !animation) return;
					// Remove the [hidden] attribute
					elem.removeAttribute('hidden');
					// Apply the animation
					elem.classList.add(animation);
					// Detect when the animation ends
					elem.addEventListener('animationend', function endAnimation (event) {
						// Remove the animation class
						elem.classList.remove(animation);
						// If the element should be hidden, hide it
						if (hide) {
							elem.setAttribute('hidden', 'true');
						}
						// Remove this event listener
						elem.removeEventListener('animationend', endAnimation, false);
					}, false);
				});
				return _this;
			},
			argsToArray : function(args) {
				var arrayOfArgs = [];
				for (var i = 0; i < args.length; i++) arrayOfArgs.push(args[i]);
				return arrayOfArgs;
			},
			/*
			 * Replace all line break characters (\n) with <br>.
			 */
			breaklines : function (str) {return str.replace(/\n/g, "<br>");},
			/*
			 * Add a cache buster (unique value) to a URL.
			 */
			bust : function (url) {return url + (url.indexOf("?") > -1 ? "&" : "?") + "cache=" + (+new Date());},
			bytes : function(bytes, si){
				var thresh = si ? 1000 : 1024;
				if (Math.abs(bytes) < thresh) {
					return bytes + ' B';
				}
				var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
				var u = -1;
				do {
					bytes /= thresh;
					++u;
				} while (Math.abs(bytes) >= thresh && u < units.length - 1);
				return bytes.toFixed(1) + ' ' + units[u];
			} ,
			call: function (obj, fn) {return obj[fn].apply(obj, [].slice.call(arguments, 2));},
			camelize : function(stringToCamelize){if (String(stringToCamelize).indexOf('-') == -1){return stringToCamelize;}var oStringList = String(stringToCamelize).split('-');var isFirstEntry = true;var camelizedString = '';for(var i=0; i < oStringList.length; i++){if(oStringList[i].length>0){if(isFirstEntry){camelizedString = oStringList[i];isFirstEntry = false;} else {var s = oStringList[i];camelizedString += s.charAt(0).toUpperCase() + s.substring(1);}}}return camelizedString;},
			capcase: function (str) {return str.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });},
			chop: function (str, n) {return str.length > n ? str.substr(0, n) + "..." : str;},
			cleanElementInsert : function( el, child) {if(!el || !child) return false;var cloned = false;if(this.is.arrayLike(el) || this.is.array(el) || (el.length && el.length > 0)) {clonedNode = [];_pbd.each(el,function(i){clonedNode[i] = child.cloneNode( true );elem = el[i];if(elem && isElement(elem)){while(elem.firstChild){elem.removeChild(elem.firstChild);}elem.appendChild(clonedNode[i]);}});} else {while(el.firstChild){el.removeChild(el.firstChild);}el.appendChild(child);}return this;},
			cloneNode: function (retClone=false){var clone = el.cloneNode(true);return retClone ? clone : this;},
			/**
			 * Creates a typed "data clone" of an object
			 * Notice that Object.getPrototypeOf(obj) === obj.__proto__
			 * === Book.prototype when obj has been created by new Book(...)
			 *
			 * @param {object} obj
			 */
			cloneObject: function (obj) {
				var clone = Object.create( Object.getPrototypeOf(obj));
				for (var p in obj) {
					if (obj.hasOwnProperty(p)) {
						if (typeof obj[p] === "number" ||
							typeof obj[p] === "string" ||
							typeof obj[p] === "boolean" ||
							this.typeName(obj[p]) === "Function" ||
							(this.util().typeName(obj[p]) === "Date" && obj[p] != null)) {
							clone[p] = obj[p];
						}
						// else clone[p] = cloneObject(obj[p]);
					}
				}
				return clone;
			},
			/**
			 * Creates a clone of a data record object or extracts the data record part of an object
			 * @param {object} obj
			 */
			cloneRecord: function (obj) {
				var record = null;
				for (var p in obj) {
					if (obj.hasOwnProperty(p) && typeof obj[p] != "object" && typeof obj[p] != "null" && typeof obj[p] != "undefined") {
						record[p] = obj[p];
					}
				}
				return record;
			},
			contains: function (child){
				const el = _this.getCurrentElement();
				return el !== child && el.contains(child);
			},
			//contains : ( a, b ) => {if ( b ) {while ( (b = b.parentNode) ) {if ( b === a ) {return true;}}}return false;},
			contents: function( elem ) {
				return elem.nodeName.toLowerCase() === "iframe" ?
					elem.contentDocument || elem.contentWindow.document :
					merge( [], elem.childNodes );
			},
			createElement: function(tagName, attr, _parent) {var el = document.createElement(tagName);for(prop in attr) {if(attr.hasOwnProperty(prop)) el.setAttribute(prop, attr[prop]);}if(_parent&&typeof(_parent)=="object"&&(_parent.nodeType===1 || _parent.nodeType===9 )) _parent.appendChild(el);return el;},
			/**
			 * Debounce functions for better performance
			 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
			 * @param  {Function} fn The function to debounce
			 */
			debounce : function (fn) {
				// Setup a timer
				var timeout;
				// Return a function to run debounced
				return function () {
					// Setup the arguments
					var context = this;
					var args = arguments;
					// If there's a timer, cancel it
					if (timeout) {
						window.cancelAnimationFrame(timeout);
					}
					// Setup the new requestAnimationFrame()
					timeout = window.requestAnimationFrame(function () {
						fn.apply(context, args);
					});
				}
			},
			/*!
			 * Remove duplicate items from an array
			 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
			 * @param  {Array} arr The array
			 * @return {Array}     A new array with duplicates removed
			 */
			dedupe : function (arr) {return arr.filter(function (item, index) {return arr.indexOf(item) === index;});},
			detectDeviceType : function() {return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';},
			downcase: function (str) {return String(str).toLowerCase();},
			find: function (selector){
				const x = _this.getCurrentElement();
				const y = Array.from(_this.nodes, x => Array.from(x.querySelectorAll(selector))).reduce((a, b) => a.concat(b));
				// **New** | Using [flat](https://devdocs.io/javascript/global_objects/array/flat)
				// const y = Array.from(_this.nodes, x => Array.from(x.querySelectorAll(selector))).flat();
				return y;
			},
			formatException : function(e) {
				var lineNumber;
				if (e.line) {
					lineNumber = e.line;
				} else if (e.lineNumber) {
					lineNumber = e.lineNumber;
				}
				var file;
				if (e.sourceURL) {
					file = e.sourceURL;
				} else if (e.fileName) {
					file = e.fileName;
				}
				var message = (e.name && e.message) ? (e.name + ': ' + e.message) : e.toString();
				if (file && lineNumber) {
					message += ' in ' + file + ' (line ' + lineNumber + ')';
				}
				return message;
			},
			formatToMS : function(val){var _d,rMS = /ms/i,rSS = /s/i;if(rMS.test(val)) _d = val.replace('ms','');else if(rSS.test(val)){_d = val.replace('s','');_d = Number(_d) * 1000;}return _d;},
			get: {
				body: function(content){var x = content.indexOf("<body");if(x == -1) return "";x = content.indexOf(">", x);if(x == -1) return "";var y = content.lastIndexOf("</body>");if(y == -1) return "";return content.slice(x + 1, y);},
				elementStyle : function(intOrEle){var element = isElement(intOrEle) ? intOrEle : _typeof(intOrEle) === "number" ? this.nodes[intOrEle] : this.nodes[0];return (!element) ? false :(element.currentStyle ? element.currentStyle : (window.getComputedStyle ? window.getComputedStyle(element,null) : document.defaultView.getComputedStyle(element, null)));},
				ext : (filename,toLower) => {if(typeof(toLower) == 'undefined') toLower = true;if(/^.*\.[^\.]*$/.test(filename)){var splint = filename.split('?');var ext = splint[0].replace(/^.*\.([^\.]*)$/, "$1");/* var ext = filename.replace(/^.*\.([^\.]*)$/, "$1"); */return toLower ? ext.toLowerCase(ext) : ext;} else return "";},
				fileExtension : this.ext,
				/**
				 * Extract file name from path
				*/
				//var getFilename = ( path ) => {"use strict";return path.replace( rPath, '' );};
				filename : (filename,with_ext) => {if( filename.length == 0 ) return "";if(with_ext == '' || with_ext == null) var with_ext = false;var dot = filename.lastIndexOf(".");if( dot == -1 ) return filename;/* var splint = filename.split('.'); */var splint = filename.split('?');var splint2 = splint[0].split('.');var pieces = splint2[0].split("/");var ext = splint2[1];for (var i = 0; i < pieces.length; i++) nameOnly = pieces[i];if(with_ext) return nameOnly.replace('.','') + '.' + ext;else return nameOnly;},
				iframeDocument : function (frameId) {
					const x = $all(frameId)[0];
					const y = x.contentWindow || x.contentDocument;
					const z = y.document ? y.document : y;
					//alert(z.body.innerHTML);
					return z;
				},
				minOfArray : function (numArray) {
					var min;
					// return Math.min.apply(null, numArray);
					/* The new spread operator is a shorter way of writing the apply solution to get the maximum of an array: */
					// var max = Math.min(...numArray);
					// recommended solution
					min = numArray.reduce(function(a, b) {return Math.min(a, b);});
					return min;
				},
				maxOfArray : function (numArray) {
					var max;
					// return Math.max.apply(null, numArray);
					/* The new spread operator is a shorter way of writing the apply solution to get the maximum of an array: */
					// var max = Math.max(...numArray);
					// recommended solution
					max = numArray.reduce(function(a, b) {return Math.max(a, b);});
					return max;
				},
				/*!
				 * Get next sibling of an element that matches selector
				 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
				 * @param  {Node}   elem     The element
				 * @param  {String} selector The selector to match against
				 * @return {Node}            The sibling
				 */
				nextSibling : function (elem, selector) {
					// Get the next sibling element
					var sibling = elem.nextElementSibling;
					// If there's no selector, return the first sibling
					if (!selector) return sibling;
					// If the sibling matches our selector, use it
					// If not, jump to the next sibling and continue the loop
					while (sibling) {
						if (sibling.matches(selector)) return sibling;
						sibling = sibling.nextElementSibling
					}
				},
				/*!
				 * Get next siblings of an element until selector
				 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
				 * @param  {Node}   elem     The element
				 * @param  {String} selector The selector to match against
				 * @return {Array}           The siblings
				 */
				nextUntil : function (elem, selector) {
					// Setup siblings array and get next sibling
					var siblings = [];
					var next = elem.nextElementSibling;
					// Loop through all siblings
					while (next) {
						// If the matching item is found, quit
						if (selector && next.matches(selector)) break;
						// Otherwise, push to array
						siblings.push(next);
						// Get the next sibling
						next = next.nextElementSibling;
					}
					return siblings;
				},
				offsetTop : function (elem) {
					var location = 0;
					if (elem.offsetParent) {
						while (elem) {
							location += elem.offsetTop;
							elem = elem.offsetParent;
						}
					}
					return location >= 0 ? location : 0;
				},
				parents : function (elem, selector) {
					// Setup parents array
					var parents = [];
					// Get matching parent elements
					while (elem && elem !== document) {
						// If using a selector, add matching parents to array
					// Otherwise, add all parents
						if (selector) {
							if (elem.matches(selector)) {
								parents.push(elem);
							}
						} else {
							parents.push(elem);
						}
						// Jump to the next parent node
						elem = elem.parentNode;
					}
					return parents;
				},
				/*!
				 * Get all of an element's parent elements up the DOM tree until a matching parent is found
				 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
				 * @param  {Node}   elem     The element
				 * @param  {String} parent   The selector for the parent to stop at
				 * @param  {String} filter   The selector to filter against [optional]
				 * @return {Array}           The parent elements
				 */
				parentsUntil : function (elem, parent, filter) {
					var parents = [];
					// Get matching parent elements
					while (elem && elem !== document) {
						// If there's a parent and the element matches, break
						if (parent) {
							if (elem.matches(parent)) break;
						}
						// If there's a filter and the element matches, push it to the array
						if (filter) {
							if (elem.matches(filter)) {
								parents.push(elem);
							}
							continue;
						}
						// Otherwise, just add it to the array
						parents.push(elem);
						elem = elem.parentNode;
					}
					return parents;
				},
				/*!
				 * Get previous sibling of an element that matches selector
				 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
				 * @param  {Node}   elem     The element
				 * @param  {String} selector The selector to match against
				 * @return {Node}            The sibling
				 */
				previousSibling : function (elem, selector) {
					// Get the next sibling element
					var sibling = elem.previousElementSibling;
					// If there's no selector, return the first sibling
					if (!selector) return sibling;
					// If the sibling matches our selector, use it
					// If not, jump to the next sibling and continue the loop
					while (sibling) {
						if (sibling.matches(selector)) return sibling;
						sibling = sibling.previousElementSibling;
					}
				},
				/*!
				 * Get previous siblings of an element until a selector is found
				 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
				 * @param  {Node}   elem     The element
				 * @param  {String} selector The selector to match against
				 * @return {Array}           The siblings
				 */
				previousUntil : function (elem, selector) {
					// Setup siblings array and get previous sibling
					var siblings = [];
					var prev = elem.previousElementSibling;
					// Loop through all siblings
					while (prev) {
						// If the matching item is found, quit
						if (selector && prev.matches(selector)) break;
						// Otherwise, push to array
						siblings.push(prev);
						// Get the previous sibling
						prev = prev.previousElementSibling
					}
					return siblings;
				},
				styles : function(element, style) {
					element = isElement(element) ? element : $one(element);
					style = style == 'float' ? 'cssFloat' : this.camelize(style);
					var value = element.style[style];
					if (!value) {
						var css = document.defaultView.getComputedStyle(element, null);
						value = css ? css[style] : null;
					}
					if (style == 'opacity') return value ? parseFloat(value) : 1.0;
					if (value == 'auto') {
						if ((style == 'width' || style == 'height') && this.styleProp(element, 'display') != 'none') return element['offset' + this.capitalize(style)] + 'px';
						return null;
					}
					return value == 'auto' ? null : value;
				},
				styleProp : function(element, prop){
					var value,camelized = this.camelize(prop);
					try{
						if (element.style) value = element.style[camelized];
						if (!value){
							if (document.defaultView && document.defaultView.getComputedStyle){
								var css = document.defaultView.getComputedStyle(element, null);
								value = css ? css.getPropertyValue(prop) : null;
							} else if (window.getComputedStyle) {
								var css = window.getComputedStyle(element,null);
								value = css ? css.getPropertyValue(prop) : null;
							} else if (element.currentStyle) {
								value = element.currentStyle[camelized];
							}
						}
					} catch (e) {console.log('_pbd.util().get.styleProp: ' + e);}
					if (prop == 'opacity') return value ? parseFloat(value) : 1.0;
					return value == 'auto' ? null : value;
				},
				/**
				 * Retrieve the direct supertype of a given class.
				 * @author Gerd Wagner
				 * @return {boolean}
				 */
				superType: function (Class) {
					return Class.prototype.__proto__.constructor
				},
				_this: function (key){
					return this.hasOwnProperty(key) ? this[key] : this;
				},
				unit : function(val) {var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);if (split) { return split[1]; }},
				urlVars : function(url) {
					var vars = [], hash;
					if(url){
						var hashes = url.slice(url.indexOf('?') + 1).split('&');
					} else var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for (var i = 0; i < hashes.length; i++) {
						hash = hashes[i].split('=');
						vars.push(hash[0]);
						vars[hash[0]] = hash[1];
					}
					return vars;
				},
				/*
				 Get an array [width, height] of the window.
				*/
				windowDimensions : function(){
					// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
					if (typeof window.innerWidth != 'undefined') {
						var viewPortWidth = window.innerWidth,viewPortHeight = window.innerHeight;
					} // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
					else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
						var viewPortWidth = document.documentElement.clientWidth,viewPortHeight = document.documentElement.clientHeight;
					} // older versions of IE
					else {
						var viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
					}
					return {width : viewPortWidth,height : viewPortHeight}
				}
				/* windowDimensions : () => {
					var w = window,d = document,e = d.documentElement,g = d.body,
					x = w.innerWidth || e.clientWidth || g.clientWidth,
					y = w.innerHeight || e.clientHeight || g.clientHeight;
					return [width:x, height:y];
				} */
			},
			/*!
			 * Group items from an array together by some criteria or value.
			 * (c) 2019 Tom Bremmer (https://tbremer.com/) and Chris Ferdinandi (https://gomakethings.com), MIT License,
			 * @param  {Array}           arr      The array to group items from
			 * @param  {String|Function} criteria The criteria to group by
			 * @return {Object}                   The grouped object
			 */
			groupBy : function (arr, criteria) {
				return arr.reduce(function (obj, item) {
					// Check if the criteria is a function to run on the item or a property of it
					var key = typeof criteria === 'function' ? criteria(item) : item[criteria];
					// If the key doesn't exist yet, create it
					if (!obj.hasOwnProperty(key)) {
						obj[key] = [];
					}
					// Push the value to the object
					obj[key].push(item);
					// Return the object to the next item in the loop
					return obj;
				}, {});
			},
			hasClass : function(ele, className){
				//ele = __pbd_self.isObject(ele) ? ele : __pbd_self.$$(ele);
				/* if (!ele || !className || !ele.className || ele.className.search(new RegExp("\\b" + className + "\\b")) == -1) return false;
				return true; */
				return ele.classList ? ele.classList.contains(className) : new RegExp('(^| )' + className + ' |$','gi').test(ele.className);
			},
			/*
			 * Capitalize the first character in each word, excluding some articles and prepositions.
			 */
			headline : function (str) {
				var exclude = "a,an,the,for,to,of,on,as,in,and,from".split(",");
				return str.replace(/\b\w+/g, function (s, i) {
					if (exclude.indexOf(s) > -1 && i > 0) {
						return s;
					}
					return s.charAt(0).toUpperCase() + s.slice(1);
				});
			},
			/*
			 * Highlight a pattern throughout a string.
			 */
			highlight : function (str, pattern) {return str.replace(new RegExp("(" + pattern + ")", "g"), "<em>$1</em>");},
			html : {
				/**
				 * Decode HTML entities from an encoded string
				 * https://stackoverflow.com/a/7394787/1293256
				 * @param  {String} html The encoded HTML string
				 * @return {String}      A decoded HTML string
				 */
				decode : function (html) {var txt = document.createElement('textarea');txt.innerHTML = html;return txt.value;},
				encodeUTF8 : ( str ) => {"use strict";/*jshint nonstandard:true*/return unescape( encodeURIComponent( str ) );},
				escape : function(str) {if (!str) return str;return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');},
				/*
				 * Escape HTML in the input string.
				 */
				escapeInput : function (str) {
					var entityMap = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'};
					return String(str).replace(/[&<>"'`=\/]/g, function (s) {
						return entityMap[s];
					});
				},
				escapeHTML : (str) => {return str.replace(/[&<>'"]/g, function (tag) {return {'&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#39;','"': '&quot;'}[tag] || tag;});},
    			unescape : (str) => {return str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, function (tag) {return {'&amp;': '&','&lt;': '<','&gt;': '>','&#39;': "'",'&quot;': '"'}[tag] || tag;});},
				/*!
				 * Sanitize and encode all HTML in a user-submitted string
				 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
				 * @param  {String} str  The user-submitted string
				 * @return {String} str  The sanitized string
				 */
				sanitize : function (str) {
					var temp = document.createElement('div');
					temp.textContent = str;
					return temp.innerHTML;
				},
				stripTags : (str) => {return str.replace(/<[^>]*>/g, '');},
				truncateString : (str, num) => {return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;}
			},
			inArray: inArray || function (needle,arr){return arr[needle] === true;},
			is : {
				array: isArray || function (arr){return _typeof(arr) === "array";},
				arrayLike : isArrayLike,
				element: isElement,
				emptyObject : isEmptyObject,
				"function" : isFunction,
				image : (url) => {return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);},
				/**
				 * Verifies if a value represents an integer
				 * @param {number} x
				 * @return {boolean}
				 */
				integer: function (x) {return typeof(x) === "number" && x.toString().search(/^-?[0-9]+$/) == 0;},
				lowerCase : (str) => {return str === str.toLowerCase();},
				negativeZero : (val) => {return val === 0 && 1 / val === -Infinity;},
				nil : (val) => {return val === undefined || val === null;},
				//Returns true if it is a DOM node
				node : (obj) => {return (typeof Node === "object" ? obj instanceof Node : obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string");},
				/**
				 * Verifies if a value represents a non-negative integer
				 * @param {number} x
				 * @return {boolean}
				 */
				nonNegativeInteger: function (x) {return typeof(x) === "number" && x.toString().search(/^-?[0-9]+$/) == 0 && x >= 0;},
				"null" : (val) => {return val === null;},
				object: isObject,
				objectLike : (val) => {return val !== null && _typeof(val) === 'object';},
				/**
				 * Verifies if a value represents a positive integer
				 * @param {number} x
				 * @return {boolean}
				 */
				positiveInteger: function (x) {return typeof(x) === "number" && x.toString().search(/^-?[0-9]+$/) == 0 && x > 0;},
				plainObject : isPlainObject || function (obj) {return Object.prototype.toString.call(obj) === '[object Object]';},
				selector : isSelector,
				string : isString,
				stream : (val) => {return val !== null && _typeof(val) === 'object' && typeof val.pipe === 'function';},
				symbol : (val) => {return _typeof(val) === 'symbol';},
				travisCI : () => {return 'TRAVIS' in process.env && 'CI' in process.env;},
				type: _type,
				"typeof": _typeof,
				/**
				  * Retrieves the type of a value, either a data value of type "Number", "String" or "Boolean",
				  * or an object of type "Function", "Array", "HTMLDocument", ..., or "Object"
				  * @param {any} val
				  */
				typeName: function (val) {
					// stringify val and extract the word following "object"
					var typeName = Object.prototype.toString.call(val).match(/^\[object\s(.*)\]$/)[1];
					// special case: null is of type "Null"
					if (val === null) return "Null"; 
					// special case: instance of a user-defined class or ad-hoc object
					if (typeName === "Object") return val.constructor.name || "Object";
					// all other cases: "Number", "String", "Boolean", "Function", "Array", "HTMLDocument", ...
					return typeName;
				},
				"undefined" : (val) => {return val === undefined;},
				upperCase : (str) => {return str === str.toUpperCase();},
				validJSON : (str) => {try {JSON.parse(str);return true;} catch (e) {return false;}},
				window : isWindow,
				writableStream : (val) => {return val !== null && _typeof(val) === 'object' && typeof val.pipe === 'function' && typeof val._write === 'function' && _typeof(val._writableState) === 'object';}
			},
			/* eg: if( this.isA_("Number", value) ) alert(value+" is a number"); */
			isA_ : function(typeName, value) {return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';},
			logError: function (msg){return logError(msg);},
			//merge: function(first,second){var len = +second.length,j = 0,i = first.length;for (;j < len;j++){first[i++] = second[j];}first.length = i;return first;},
			merge:merge,
			/**
			 * Converts object to query string
			*/
			obj2string : ( obj, prefix ) => {"use strict";var str = [];for ( var prop in obj ) {if ( obj.hasOwnProperty( prop ) ) {var k = prefix ? prefix + '[' + prop + ']' : prop, v = obj[prop];str.push( typeof v === 'object' ? obj2string( v, k ) : encodeURIComponent( k ) + '=' + encodeURIComponent( v ) );}}return str.join( '&' );},
			/*
			 * Express a number as an ordinal, e.g. "10th".
			 */
			ordinal : function (num) {
				if (num > 10 && num < 20) {
					return num + "th";
				}
				return num + ["th","st","nd","rd","th","th","th","th","th","th"][num % 10];
			},
			printArray : (arr,joiner,el) =>{"use strict";if(isArray(arr)){var str;joiner = joiner || ',';str = arr.join(joiner);if(el&&typeof el === 'object') el.innerHTML = str;else alert(str);}return this;},
			parse : {
				html : function(string,setBase) {
					const context = document.implementation.createHTMLDocument();
					if(setBase ){
						// Set the base href for the created document so any parsed elements with URLs
						// are based on the document's URL
						const base = context.createElement('base');
						base.href = document.location.href;
						context.head.appendChild(base);
					}
					context.body.innerHTML = string;
					return context.body.children;
				},
				jade : function(data){return data;},
				json : function(data){try{data = JSON.parse(data+"");} catch (e){} return data;},
				markdown : function (str){
					// Replaces 'regex' with 'replacement' in 'str'
					// Curry function, usage: replaceRegex(regexVar, replacementVar) (strVar)
					const replaceRegex = function(regex, replacement){return function(str){return str.replace(regex, replacement);}}
					// Regular expressions for Markdown (a bit strict, but they work)
					const codeBlockRegex = /((\n\t)(.*))+/g;
					const inlineCodeRegex = /(`)(.*?)\1/g;
					const imageRegex = /!\[([^\[]+)\]\(([^\)]+)\)/g;
					const linkRegex = /\[([^\[]+)\]\(([^\)]+)\)/g;
					const headingRegex = /\n(#+\s*)(.*)/g;
					const boldItalicsRegex = /(\*{1,2})(.*?)\1/g;
					const strikethroughRegex = /(\~\~)(.*?)\1/g;
					const blockquoteRegex = /\n(&gt;|\>)(.*)/g;
					const horizontalRuleRegex = /\n((\-{3,})|(={3,}))/g;
					const unorderedListRegex = /(\n\s*(\-|\+)\s.*)+/g;
					const orderedListRegex = /(\n\s*([0-9]+\.)\s.*)+/g;
					const paragraphRegex = /\n+(?!<pre>)(?!<h)(?!<ul>)(?!<blockquote)(?!<hr)(?!\t)([^\n]+)\n/g;
					// Replacer functions for Markdown
					const codeBlockReplacer = function(fullMatch){return '\n<pre>' + fullMatch + '</pre>';}
					const inlineCodeReplacer = function(fullMatch, tagStart, tagContents){return '<code>' + tagContents + '</code>';}
					const imageReplacer = function(fullMatch, tagTitle, tagURL){return '<img src="' + tagURL + '" alt="' + tagTitle + '" />';}
					const linkReplacer = function(fullMatch, tagTitle, tagURL){return '<a href="' + tagURL + '">' + tagTitle + '</a>';}
					const headingReplacer = function(fullMatch, tagStart, tagContents){return '\n<h' + tagStart.trim().length + '>' + tagContents + '</h' + tagStart.trim().length + '>';}
					const boldItalicsReplacer = function(fullMatch, tagStart, tagContents){return '<' + ( (tagStart.trim().length==1)?('em'):('strong') ) + '>'+ tagContents + '</' + ( (tagStart.trim().length==1)?('em'):('strong') ) + '>';}
					const strikethroughReplacer = function(fullMatch, tagStart, tagContents){return '<del>' + tagContents + '</del>';}
					const blockquoteReplacer = function(fullMatch, tagStart, tagContents){return '\n<blockquote>' + tagContents + '</blockquote>';}
					const horizontalRuleReplacer = function(fullMatch){return '\n<hr />';}
					const unorderedListReplacer = function(fullMatch){let items = '';fullMatch.trim().split('\n').forEach( item => { items += '<li>' + item.substring(2) + '</li>'; } );return '\n<ul>' + items + '</ul>';}
					const orderedListReplacer = function(fullMatch){let items = '';fullMatch.trim().split('\n').forEach( item => { items += '<li>' + item.substring(item.indexOf('.')+2) + '</li>'; } );return '\n<ol>' + items + '</ol>';}
					const paragraphReplacer = function(fullMatch, tagContents){return '<p>' + tagContents + '</p>';}
					// Rules for Markdown parsing (use in order of appearance for best results)
					const replaceCodeBlocks = replaceRegex(codeBlockRegex, codeBlockReplacer);
					const replaceInlineCodes = replaceRegex(inlineCodeRegex, inlineCodeReplacer);
					const replaceImages = replaceRegex(imageRegex, imageReplacer);
					const replaceLinks = replaceRegex(linkRegex, linkReplacer);
					const replaceHeadings = replaceRegex(headingRegex, headingReplacer);
					const replaceBoldItalics = replaceRegex(boldItalicsRegex, boldItalicsReplacer);
					const replaceceStrikethrough = replaceRegex(strikethroughRegex, strikethroughReplacer);
					const replaceBlockquotes = replaceRegex(blockquoteRegex, blockquoteReplacer);
					const replaceHorizontalRules = replaceRegex(horizontalRuleRegex, horizontalRuleReplacer);
					const replaceUnorderedLists = replaceRegex(unorderedListRegex, unorderedListReplacer);
					const replaceOrderedLists = replaceRegex(orderedListRegex, orderedListReplacer);
					const replaceParagraphs = replaceRegex(paragraphRegex, paragraphReplacer);
					// Fix for tab-indexed code blocks
					const codeBlockFixRegex = /\n(<pre>)((\n|.)*)(<\/pre>)/g;
					const codeBlockFixer = function(fullMatch, tagStart, tagContents, lastMatch, tagEnd){let lines = '';tagContents.split('\n').forEach( line => { lines += line.substring(1) + '\n'; } );return tagStart + lines + tagEnd;}
					const fixCodeBlocks = replaceRegex(codeBlockFixRegex, codeBlockFixer);
					// Replacement rule order function for Markdown
					// Do not use as-is, prefer parseMarkdown as seen below
					const replaceMarkdown = function(str) {
						return replaceParagraphs(replaceOrderedLists(replaceUnorderedLists(
							replaceHorizontalRules(replaceBlockquotes(replaceceStrikethrough(
								replaceBoldItalics(replaceHeadings(replaceLinks(replaceImages(
									replaceInlineCodes(replaceCodeBlocks(str))
								))))
							)))
						)));
					}
					// Parser for Markdown (fixes code, adds empty lines around for parsing)
					// Usage: parseMarkdown(strVar)
					const parseMarkdown = function(str) {return fixCodeBlocks(replaceMarkdown('\n' + str + '\n')).trim();}
					return parseMarkdown(str);
				},
				template : function(str, _params){
					var out,params ={};
					if(isString(params)){
						params.tmpl = _params;
					} else if(isPlainObject(_params)){
						params = _extendObj({},_params);
					} else if(isArray(_params)){
						params = this.zipObject(["tmpl","parser"], _params);
					}
					str = ( isFile(params.tmpl) || isUrl(params.tmpl) ) ? GET(params.tmpl).response() : isElement(params.tmpl) ? params.tmpl.innerHTML : isString(params.tmpl) && ( tmp = $one(params.tmpl) ) ? tmp.innerHTML : "";
					if(!("parser" in params) || ! isFunction(params.parser) ) params.parser = native_parser;
					out = params.parser(str);
					function native_parser(str){ 
						var fn = "var p=[]; p.push('" +
							str.replace(/[\r\t\n]/g, " ")
								.replace(/'(?=[^%]*%>)/g,"\t")
								.split("'").join("\\'")
								.split("\t").join("'")
								.replace(/<%=(.+?)%>/g, "',$1,'")
								.split("<%").join("');")
								.split("%>").join("p.push('")
							 + "'); return p.join('');";
						return new Function("o", fn);
					};
					return out;
				},
				xml : function(data){var xml;if(!data || typeof data !== "string"){return null;}try{xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );} catch ( e ) {xml = undefined;}if( !xml || xml.getElementsByTagName( "parsererror" ).length ){alert( "Invalid XML: " + data );this.error( "Invalid XML: " + data );}return xml;}
			},
			/*
			 * Express a number as a percent, e.g. "123.45%". precision defaults to 0.
			 */
			percent : function (num, precision) {return (num < 1 ? num * 100 : num).toFixed(precision || 0) + "%";},
			percentToPixel : function(elemValue,value) {
				var newValue,percent;
				if(value && typeof value === 'string' && (/\%/g).test(value) ){
					percent = value.replace('%','');
					newValue = (elemValue*percent)/100;
				}
				return isNil(newValue) ? value : newValue;
			},
			/*
			 * Format a U.S. phone number string as "(###) ###-####".
			 */
			phone : function (str) {var s = str.replace(/[^\d]/g, "");return "(" + s.substr(0, 3) + ") " + s.substr(3, 3) + "-" + s.substr(6, 4);},
			/*!
			 * Create a new object composed of properties picked from another object
			 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
			 * @param  {Object} obj   The object to pick properties from
			 * @param  {Array}  props An array of properties to use
			 * @return {Object}       The new object
			 */
			pick : function (obj, props) {
				'use strict';
				// Make sure object and properties are provided
				if (!obj || !props) return;
				// Create new object
				var picked = {};
				// Loop through props and push to new object
				props.forEach(function(prop) {
					picked[prop] = obj[prop];
				});
				// Return new object
				return picked;
			},
			putHTML : function(content, target){
				if(target = typeof target === 'object' ? target: typeof target === 'string' ? $all(target) : ""){
					//target.innerHTML = this.getBody(content);
					target.html(this.get.body(content));
					return this;
				} else return this.get.body(content);
			},
			/*
			 * Repeat a string. Count defaults to 2; separator defaults to "".
			 */
			repeat : function (str, count, separator) {return new Array(+count || 2).join(str + (separator || "")) + str;},
			setAttr : function(node, attribute, value){
				if(isElement(node) /*|| _typeof(node) === "object"*/){
					if(_typeof(attribute) === "string"){
						if (attribute == "class") node.className = value;else if (attribute == "checked") node.defaultChecked = value;else if (attribute == "for") node.htmlFor = value;else if (attribute == "style") node.style.cssText = value;else node.setAttribute(attribute, value);
					} else if(_typeof(attribute) === "object"){
						Object.assign(node,(attribute || {} ));return this;
					}
				} else logError("Micro.util().setAttr() : The Element Node selected is not a valid [HTMLElement]"+node);
			},
			/*!
			 * Serialize all form data into a query string
			 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
			 * @param  {Node}   form The form to serialize
			 * @return {String}      The serialized form data
			 */
			serialize : function (form) {
				// Setup our serialized data
				var serialized = [];
				// Loop through each field in the form
				for (var i = 0; i < form.elements.length; i++) {
					var field = form.elements[i];
					// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
					if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
					// If a multi-select, get all selections
					if (field.type === 'select-multiple') {
						for (var n = 0; n < field.options.length; n++) {
							if (!field.options[n].selected) continue;
							serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
						}
					}
					// Convert field data to a query string
					else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
						serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
					}
				}

				return serialized.join('&');
			},
			/*!
			 * Serialize all form data into an array
			 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
			 * @param  {Node}   form The form to serialize
			 * @return {String}      The serialized form data
			 */
			serializeArray : function (form) {
				// Setup our serialized data
				var serialized = [];
				// Loop through each field in the form
				for (var i = 0; i < form.elements.length; i++) {
					var field = form.elements[i];
					// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
					if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
					// If a multi-select, get all selections
					if (field.type === 'select-multiple') {
						for (var n = 0; n < field.options.length; n++) {
							if (!field.options[n].selected) continue;
							serialized.push({name: field.name,value: field.options[n].value});
						}
					}
					// Convert field data to a query string
					else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
						serialized.push({name: field.name,value: field.value});
					}
				}

				return serialized;
			},
			//var serializeCookie : function serializeCookie(name, val) {return "".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(val));},
			serializeCookie : (name, val) =>  "".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(val)),
			serializeForm : (form) => {return Array.from(new FormData(form), function (field) {return field.map(encodeURIComponent).join('=');}).join('&');},
			//const serializeForm : (form) => Array.from(new FormData(form), (field) => field.map(encodeURIComponent).join('=');).join('&'),
			setThis: function (obj, key) {
				// Mark.globals[key] = obj; return "";
				this[key] = obj; return this;
			},
			/**
			 * Randomly shuffle an array
			 * https://stackoverflow.com/a/2450976/1293256
			 * @param  {Array} array The array to shuffle
			 * @return {String}      The first item in the shuffled array
			 */
			shuffle : function (array) {
				var currentIndex = array.length;
				var temporaryValue, randomIndex;
				// While there remain elements to shuffle...
				while (0 !== currentIndex) {
					// Pick a remaining element...
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;
					// And swap it with the current element.
					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}

				return array;
			},
			styleElement: function (elem, obj){
				elem = elem || _this.nodes;
				if(!elem) return this;
				styles = _typeof(obj) === "object" ? obj : {};
				_pbd.each(elem, function (i){
					if( isElement(elem[i]) ){
						Object.assign(elem[i].style, styles);
					}
				});
				/* for (const [i, x] of Array.from(elem).entries()) {
					// use 'x' here
					Object.assign(x.style, obj);
				} */
				return this;
			},
			styleElement2 : function(el, styles){
				el = el || _this.nodes;
				alert(el);
				if( !el ) return this;
				if(isArrayLike(el) ||(el.length && el.length > 0)) {
					for(var i=0; i<el.length; i++){
						var elem = el[i];
						if(elem) for (var property in styles) elem.style[property] = styles[property];
					}
					//this.each(el,function(i){for (var property in styles) el[i].style[property] = styles[property]});
				} else {
					for (var property in styles) el.style[property] = styles[property];
				}
				return this;
			},
			setNodeAttribute : function(node, attribute, value) {if (attribute == "class") node.className = value;else if (attribute == "checked") node.defaultChecked = value;else if (attribute == "for") node.htmlFor = value;else if (attribute == "style") node.style.cssText = value;else node.setAttribute(attribute, value);return this;},
			tag : function(tagName, attributes){
				//"use strict";return Object.assign(document.createElement(tagName),(attributes || {} ));
				try{
				name = tagName.replace('<','').replace('/>','').replace('>','');
				var node = typeof(name) === "object" ? name : document.createElement(name);
				if (attributes) {
					for(prop in attributes) {
						//if(attributes.hasOwnProperty(prop)) setNodeAttribute(node, prop, attributes[prop]);
						if(attributes.hasOwnProperty(prop)) node.setAttribute(prop, attributes[prop]);
					}
				}
				for (var i = 2; i < arguments.length; i++) {
					var child = arguments[i];
					if (typeof child == "string") child = document.createTextNode(child);
					node.appendChild(child);
				}
				return node;
				} catch(e){
					alert(e.stack?e.stack:e);
					return __pbd_self;
				}
			},
			/*!
				 * Convert a string to title case
				 * source: https://gist.github.com/SonyaMoisset/aa79f51d78b39639430661c03d9b1058#file-title-case-a-sentence-for-loop-wc-js
				 * @param {String} str The string to convert to title case
				 * @return {String} The converted string
			 */
			toTitleCase : function (str) {
				str = str.toLowerCase().split(' ');
				for (var i = 0; i < str.length; i++) {
					str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
				}
				return str.join(' ');
			},
			upcase: function (str) {return String(str).toUpperCase();},
			url : {
				createURL : function(blob){
					var URL = window.URL || window.webkitURL;
					var url = URL.createObjectURL(blob);
					return url;
				},
				revokeURL: function (url) {
					var URL = window.URL || window.webkitURL;
					URL.revokeObjectURL(url);
					return true;
				},
				/**
				 * Get the domain name from a url.
				 * @param {String} url The url to extract the domain from.
				 * @return The domain part of the url.
				 * @type {String}
				 */
				domainName : function(url){
					if (!url) {
						throw new Error("url is undefined or empty");
					}
					return url.match(rURI)[3];
				},
				/**
				 * Get the port for a given URL, or "" if none
				 * @param {String} url The url to extract the port from.
				 * @return The port part of the url.
				 * @type {String}
				 */
				port : function(url){
					if (!url) {
						throw new Error("url is undefined or empty");
					}
					return url.match(rURI)[4] || "";
				},
				/**
				 * Returns  a string containing the schema, domain and if present the port
				 * @param {String} url The url to extract the location from
				 * @return {String} The location part of the url
				 */
				location : function(url){
					if (!url) {
						throw new Error("url is undefined or empty");
					}
					if (/^file/.test(url)) {
						throw new Error("The file:// protocol is not supported");
					}
					var m = url.toLowerCase().match(rURI);
					//if the origin is non standard url, such as chrome extensions
					if (!m) {
						return '';
					}
					var proto = m[2], domain = m[3], port = m[4] || "";
					if ((proto == "http:" && port == ":80") || (proto == "https:" && port == ":443")) {
						port = "";
					}
					return proto + "//" + domain + port;
				},
				/**
				 * Resolves a relative url into an absolute one.
				 * @param {String} url The path to resolve.
				 * @return {String} The resolved url.
				 */
				resolveUrl : function(url){
					if (!url) {
						throw new Error("url is undefined or empty");
					}
					// replace all // except the one in proto with /
					url = url.replace(rDoubleSlash, "$1/");
					// If the url is a valid url we do nothing
					if (!url.match(/^(http||https):\/\//)) {
						// If this is a relative path
						var path = (url.substring(0, 1) === "/") ? "" : location.pathname;
						if (path.substring(path.length - 1) !== "/") {
							path = path.substring(0, path.lastIndexOf("/") + 1);
						}
						url = location.protocol + "//" + location.host + path + url;
					}
					// reduce all 'xyz/../' to just '' 
					while (rParent.test(url)) {
						url = url.replace(rParent, "");
					}
					return url;
				}
			},
			wrap : {
				/*
				 * Wrap text blocks (delimited by line breaks) in <p>...</p>.
				 */
				grafs : function (str) {return str.replace(/(.+)/g, function (s, p1) {return "<p>" + p1 + "</p>";});},
				/*
				 * Inject values into string with numeric tokens, e.g. "a=[0]&b=[1]". This is
				 * a templating function in itself.
				 */
				inject : function (str) {
					var args = arguments;
					return str.replace(/\[(\d+)\]/g, function (s, i) {
						return args[+i + 1] || "";
					});
				},
				/*
				 * Wrap all URLs in links.
				 */
				links : function (str) {return str.replace(/\b(https?:[^\b\s]+)\b/g, "<a href=\"$1\">$1</a>");},
				// String.prototype.insert = function (index, string) {var ind = index < 0 ? this.length + index  :  index;return this.substring(0, ind) + string + this.substring(ind, this.length);};
				/**
				 * Insert `what` to string at position `index`.
				 */
				// String.prototype.insert = function(what, index) {return index > 0 ? this.replace(new RegExp('.{' + index + '}'), '$&' + what) : what + this;};
				// var str = 'foo baz';
				// alert(str.insert('bar ', str.length) );  // "foo bar baz"
				// alert( str.insert('bar ') );  // "bar foo baz"
				// Use case: Lets say you have full size images using a naming convention but can't update the data to also provide thumbnail urls.
				// var url = '/images/myimage.jpg';
				// var thumb = stringInsert(url,-4, '_thm');
				//   result:  '/images/myimage_thm.jpg'
				// alert(thumb);
				// use a negative index to insert relative to the end of the string.
				insertString : function (str, index, value,_use) {
					_use = _typeof(_use,"string") && _use.length > 4 ? _use : "slice";
					var ind = index < 0 ? str.length + index  :  index;
					if(_use === "slice" || _use === "") return str.slice(0, ind) + value + str.slice(ind);
					else if(_use === "substring") return  str.substring(0, ind) + value + str.substring(ind, str.length);
					else if(_use === "regexp" || _use === "RegExp") return  index > 0 ? str.replace(new RegExp('.{' + index + '}'), '$&' + value) : value + str;
				},
				string: function (str){
					// * list item 1 /- /^(?:\d+\.|[*+-]) .*(?:\r?\n(?!(?:\d+\.|[*+-]) ).*)*/gm
					// "*This is italic*".replace(/\*(.*?)\*/gi, '<span style="font-style: italic">$1</span>');
					// "[Google](http://google.com)".replace(/\[(.*?)\]\((.*?)\)/gi, '<a href="$2">$1</a>');
					if( (/\*(.*?)\*/gi).test(str) ) str.replace(/\*(.*?)\*/gi, '<span style="font-style: italic">$1</span>');
					if( (/\[(.*?)\]\((.*?)\)/gi).test(str) ) str.replace(/\[(.*?)\]\((.*?)\)/gi, '<a href="$2">$1</a>');
					return str;
				},
				/*
				 * Link all screen names in a tweet.
				 */
				tweet : function (str) {return str.replace(/(@\w+)/g, "<a href=\"http://twitter.com/#!/$1\">$1</a>");}
			},
			/* Converts a given string into an array of words.
			* Use `String.prototype.split()` with a supplied pattern (defaults to non-alpha as a regexp) to convert to an array of strings. Use `Array.prototype.filter()` to remove any empty strings.
			* Omit the second argument to use the default regexp.
			
			* words('I love javaScript!!'); // ["I", "love", "javaScript"]
			* words('python, javaScript & coffee'); // ["python", "javaScript", "coffee"]
			*/
			words : (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean),
			//var words = function words(str) {var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /[^a-zA-Z-]+/;return str.split(pattern).filter(Boolean);};
			/* Creates a new array out of the two supplied by creating each possible pair from the arrays.
			* Use `Array.prototype.reduce()`, `Array.prototype.map()` and `Array.prototype.concat()` to produce every possible pair from the elements of the two arrays and save them in an array.
			* xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
			 */
			xProd : (a, b) => a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []),
			//var xProd = function xProd(a, b) {return a.reduce(function (acc, x) {return acc.concat(b.map(function (y) {return [x, y];}));}, []);};
			/* Given an array of valid property identifiers and an array of values, return an object associating the properties to the values.
			* Since an object can have undefined values but not undefined property pointers, the array of properties is used to decide the structure of the resulting object using `Array.prototype.reduce()`.
			* zipObject(['a', 'b', 'c'], [1, 2]); // {a: 1, b: 2, c: undefined}
			* zipObject(['a', 'b'], [1, 2, 3]); // {a: 1, b: 2}
			*/
			//var zipObject = function zipObject(props, values) {return props.reduce(function (obj, prop, index) {return obj[prop] = values[index], obj;}, {});};
			zipObject : (props, values) => props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {}),
			/*
			children:function(c){var d=c.childNodes,b=[],a=d.length;while(a--){if(d[a].nodeType==1){b.unshift(d[a])}}return b},
			docHeight:function(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,b.clientHeight,b.scrollHeight,b.offsetHeight)},
			setText:function(a,b){if(a.textContent){a.textContent=b}else{a.innerText=b}},
			setData:function(b,a,c){if(b.dataset){a=a.replace(/[-_]([a-z])/g,function(d){return d[1].toUpperCase()});b.dataset[a]=c}else{b.setAttribute("data-"+a,c)}},
			getData:function(b,a){var c=null;if(b.dataset){a=a.replace(/[-_]([a-z])/g,function(d){return d[1].toUpperCase()});c=b.dataset[a]}else{c=b.getAttribute("data-"+a)}return c},
			isElement:function(a){return(typeof HTMLElement==="object"?a instanceof HTMLElement:a&&typeof a==="object"&&a!==null&&a.nodeType===1&&typeof a.nodeName==="string")}
			*/
		}; // End : return {};
		//return this.coreObject;
	};
	// ANIMATION ===============
	_pbd.inAnim = _pbd.fn.inAnim = false;
	_pbd.animation = _pbd.fn.animation = {
		//inAnim : false,
		animConfig : {
			debugMode : false,
			speeds : {
				off: false,
				slow: 1600,
				fast: 1000,
				_default: 600// Default speed
			}
		},
		configure : function (_newConfig){
			this.animConfig = _extendObj(this._defaultConfig,_newConfig);
		// alert(_this+"-"+ Object.getPrototypeOf(_pbd));
		},
		// Native fadeOut
		fadeOut : function(elem, ms) {
			var _this = this, ms = ms || this.speeds.fast, hms = (ms+500);
			if( isElement( elem) ) {
				if( _typeof(elem.style.opacity ) === "undefined") elem.style.opacity = 1;
				elem.style.transition = `opacity ${ms}ms, height ${hms}ms`;
				if(window.requestAnimationFrame){
					var start = null;
					function fadeOut(timestamp) {
						if (!start) start = timestamp;
						var progress = timestamp - start;
						elem.style.opacity = parseInt(100 / progress);
						if (progress < ms) {
							_pbd.inAnim = true;
							window.requestAnimationFrame(fadeOut);
						} else {
							_pbd.inAnim = false;
							elem.style.display = 'none';
						}
					}
					window.requestAnimationFrame(fadeOut);
				} else if (ms && !_pbd.inAnim) {
					_pbd.inAnim = true;
					setTimeout(function (){elem.style.height = '0px';_pbd.inAnim = false;},ms);
					// this.fadeOpacity(elem, 100, 0, ms);
					// elem.addEventListener('transitionend',function(event) {elem.style.height = '0';_pbd.inAnim = false;},false);
				} else {
					elem.style.opacity = 0;
					elem.style.height = '0';
					_pbd.inAnim = false;
				}
			}
			return this;
		},
		// Native fadeIn
		fadeIn : function(elem, ms) {
			var _this = this, ms = ms || this.speeds.fast, hms = 400;
				if( _typeof(elem.style.opacity ) === "undefined") elem.style.opacity = "0px";
				if(window.requestAnimationFrame){
					var start = null;
					ms = ms > 0 ? ms + 1000 : ms;
					elem.style.display = "block";
					function fadeIn(timestamp) {
						if (!start) start = timestamp;
						var progress = timestamp - start;
						elem.style.opacity = parseInt( (progress / 100), 10);
						if (progress < ms) {
							//alert(parseInt( ( progress / 100 ),10));
							_pbd.inAnim = true;
							window.requestAnimationFrame(fadeIn);
						} else {
							_pbd.inAnim = false;
						}
					}
					window.requestAnimationFrame(fadeIn);
				} else if (ms /*&& !_pbd.inAnim*/) {
					elem.style.transition = `opacity ${ms}ms, height ${hms}ms`;
					elem.style.opacity = 1;
					//this.fadeOpacity(elem, 0, 100, ms);
					_pbd.inAnim = true;
					// elem.addEventListener('transitionend',function(event) {elem.style.height = elem.scrollHeight+"px";_pbd.inAnim = false;},false);
				} else {
					elem.style.opacity = 1;
					_pbd.inAnim = false;
			}
			return this;
		},
		// Native slideFadeOut
		slideFadeOut : function(elem, ms) {
			var _this = this;
			if(typeof elem.style.opacity === "undefined") elem.style.opacity = 1;
			if( window.requestAnimationFrame ) {
				var start = null;
				function slideFadeOut(timestamp) {
					if (!start) start = timestamp;
					var progress = timestamp - start;
					//elem.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
					elem.style.opacity = parseInt(100 / progress);
					if (progress < ms) {
						window.requestAnimationFrame(slideFadeOut);
					} else {
						elem.style.height = '0px';
					}
				}
				window.requestAnimationFrame(slideFadeOut);
			} else if (ms /*&& !_pbd.inAnim*/) {
				var hms = (ms+500);
				elem.style.transition = `opacity ${ms}ms, height ${hms}ms`;
				elem.style.opacity = 0;
				setTimeout(function (){elem.style.height = '0px';},ms);
				// this.fadeOpacity(elem, 100, 0, ms);
				_pbd.inAnim = true;
				// elem.addEventListener('transitionend',function(event) {elem.style.height = '0';_pbd.inAnim = false;},false);
			} else {
				elem.style.opacity = 0;
				elem.style.height = '0';
				_pbd.inAnim = false;
			}
			
			return this;
		},
		// Native slideFadeIn
		slideFadeIn : function(elem, ms) {
			var _this = this, hms = 400;
			// if(typeof elem.style.opacity === "undefined") elem.style.opacity = 0;
			if( window.requestAnimationFrame ) {
				var start = null;
				function slideFadeIn(timestamp) {
					if (!start) start = timestamp;
					var progress = timestamp - start;
					elem.style.transition = `opacity ${ms}ms, height ${hms}ms`;
					elem.style.height = elem.scrollHeight+"px";
					elem.style.opacity = 1;
					//elem.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
					elem.style.opacity = parseInt(progress / 100);
					if (progress < ms) {
						window.requestAnimationFrame(slideFadeIn);
					} else {
						elem.style.height = elem.scrollHeight+"px";
					}
				}
				window.requestAnimationFrame(slideFadeIn);
			} else if (ms /*&& !_pbd.inAnim*/) {
				elem.style.transition = `opacity ${ms}ms, height ${hms}ms`;
				elem.style.height = elem.scrollHeight+"px";
				elem.style.opacity = 0;
				//this.fadeOpacity(elem, 0, 100, ms);
				_pbd.inAnim = true;
				// elem.addEventListener('transitionend',function(event) {elem.style.height = elem.scrollHeight+"px";_pbd.inAnim = false;},false);
			} else {
				elem.style.opacity = 0;
				elem.style.height = elem.scrollHeight+"px";
				_pbd.inAnim = false;
			}
			
			return this;
		},
		slideUp : function(elem, ms) {
			var _this = this, ms = ms || this.speeds.fast || 1500, oms = (ms > 1000 ? ms + 1000 : 1000);
			if (ms /*&& !_pbd.inAnim*/) {
				elem.style.transition = `opacity ${oms}ms, height ${ms}ms`;
				elem.style.opacity = 1;
				elem.style.height = elem.scrollHeight+"px";
				_pbd.inAnim = true;
			} else {
				elem.style.opacity = 1;
				elem.style.height = elem.scrollHeight+"px";
				_pbd.inAnim = false;
			}
			return this;
		},
		slideDown : function(elem, ms) {
			var _this = this, ms = ms || this.speeds.fast || 1500, oms = (ms > 1000 ? ms -1000 : 1000);
			if (ms /*&& !_pbd.inAnim*/) {
				elem.style.transition = `opacity ${oms}ms, height ${ms}ms`;
				elem.style.opacity = 0;
				elem.style.height = "0px";
				_pbd.inAnim = true;
			} else {
				elem.style.opacity = 0;
				elem.style.height = "0px";
				_pbd.inAnim = false;
			}
			return this;
		},
		setOpacity : function(id, opacity){
			var element = isElement(id) ? id : $one(id);
			//styleElement(element,{ opacity:(opacity / 100),MozOpacity:(opacity / 100),filter:'alpha(opacity=' + opacity + ')',KhtmlOpacity:(opacity / 100),visibility:"visible",transition:"all ease-in 600ms"});
			_pbd.util().styleElement(element,{
				"opacity":(opacity / 100),
				"MozOpacity":(opacity / 100),
				"filter":'alpha(opacity=' + opacity + ')',
				"KhtmlOpacity":(opacity / 100)/*,visibility:"visible",transition:"all linear 600ms"*/
			});
			return this;
		},
		fadeOpacity : function(id, opacityStart, opacityEnd, msToFade){
			var _this=this,element = isElement(id) ? id : $one(id);
			//element.style.transition = `opacity ${msToFade}ms`;
			if (msToFade > 0){
				var frames = Math.round((msToFade / 1000) * 30);
				var msPerFrame = Math.round(msToFade / frames);
				var opacityPerFrame = (opacityEnd - opacityStart) / frames;
				var opacity = opacityStart;
				for (frame = 1; frame <= frames; frame++){
					setTimeout(function(){_this.setOpacity(element, opacity)},(frame * msPerFrame));
					opacity += opacityPerFrame;
				}
				if (opacityEnd == 0){
					setTimeout(function(){element.style['visibility'] = 'collapse';},((frames+1) * msPerFrame));
					//setTimeout('id_obj.style.visibility=\'hidden\'',((frames+1) * msPerFrame));
				} else {
					setTimeout(function(){_pbd.util().styleElement(element,{'visibility': 'visible','display':'block'});_this.setOpacity(id,opacityEnd)},((frames+1) * msPerFrame));
				}
			} else {
				this.setOpacity(element, opacityEnd);
				if (opacityEnd == 0){
					element.style['visibility'] = 'collapse';
				}
			}
			return this;
		},
		keyframes : (elem, _keyframes, _keyframeOptions) => {
			var _default_keyframe_options = {
				autoplay : true,
				duration: 1000,
				delay : 0,
				fill: 'forwards', // none, forwards, backwards, both
				easing: 'ease-in' // linear, ease, ease-in, ease-in-out, frames( integer )
				/* 
				direction : "" // normal, reverse, alternate, alternate-reverse
				iterations : 1, // (1 - ...) , infinity
				iterationStart : 0.0
				 */
			},
			that = this;
			this.keyframeOptions = _extendObj(_default_keyframe_options, _keyframeOptions);
			this.keyframeAnimation = elem.animate(_keyframes, this.keyframeOptions);
			this.step = 0.2;
			this.keyframeOptions.autoplay === true ? this.keyframeAnimation.play() : this.keyframeAnimation.pause();
			var kfAnim = function (kfAnim) {
				this.play = function (){kfAnim.play(); return this;};
				this.pause = function (){kfAnim.pause(); return this;};
				this.reverse = function (){kfAnim.reverse(); return this;};
				this.cancel = function (){kfAnim.cancel(); return this;};
				this.finish = function (){kfAnim.finish(); return this;};
				this.currentTime = function (time){if( time ) {kfAnim.currentTime += time; return this;} else {return kfAnim.currentTime;}};
				this.startTime = function (time){if( time ) {kfAnim.startTime += time; return this;} else {return kfAnim.startTime;}};
				this.playback = function (val){
					if( isString(val) ){
						if(val === "+" || val === "faster") kfAnim.playbackRate = (kfAnim.playbackRate + that.step);
						else if(val === "-" || val === "slower") kfAnim.playbackRate = (kfAnim.playbackRate - that.step);
						else if(val === "=" || val === "normal") kfAnim.playbackRate = 1;
					} else if( isInteger(val) ){
						kfAnim.playbackRate = val < 1 ? val : 1;
					} else {
						if(val === true) kfAnim.playbackRate = (kfAnim.playbackRate + that.step);
						else if(val === false) kfAnim.playbackRate = (kfAnim.playbackRate - that.step);
						else if(val === "" || val === null) kfAnim.playbackRate = 1;
					}
					return this;
				};
				this.delay = function ( ms ){
					if( ms ){
						that.keyframeOptions.delay = ms;
					}
					return this;
				};
				this.config = function(key, val){
					if( isPlainObject(key) ){
						that.keyframeOptions = _extendObj(that.keyframeOptions, key);
					} else if(key && val){
						that.keyframeOptions[ key ] = val;
					}
					return this;
				};
				return this;
			}
			
			return new kfAnim(this.keyframeAnimation);
		},
		recordAnimationFrames : function(callback, autoStart = true){
			let running = true,raf;
			const stop = () => {
				running = false;
				cancelAnimationFrame(raf);
			};
			const start = () => {
				running = true;
				run();
			};
			const run = () => {
				raf = requestAnimationFrame(() => {
					callback();
					if (running) run();
				});
			};
			if (autoStart) start();
			return { start, stop };
		},
		scrollIndicator : function (selector) {
		    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		    var scrolled = (winScroll / height) * 100;
		    //getBy('id',"myBar").style.width = scrolled + "%";
		    //document.querySelector(selector).style.width = scrolled + "%";
		    var element = document.querySelector(selector);
			element.style.width = scrolled + "%";
		    if(scrolled < 49){
				element.style.backgroundColor = '#0099cc';
			} else if(scrolled > 49 && scrolled < 79){
				element.style.backgroundColor = '#ffff00';
			} else if(scrolled > 79){
				element.style.backgroundColor = '#ff0000';
			}
		},
		elementScrollIndicator : function (eleId,indicator) {
			var el = typeof eleId === 'string' ? document.querySelector(eleId) : eleId,
			indicator = typeof indicator === 'string' ? document.querySelector(indicator) : indicator,total = 0;
			//alert(total);
			//if(!el || !indicator) return false;
			el.addEventListener("scroll",function() {
			    var customScrollTop = el.scrollTop;
				var customHeight = el.getBoundingClientRect().height;
			    var customScrollHeight = el.scrollHeight;
			    var total = (customScrollTop / (customScrollHeight - customHeight))*100;
				//alert(customHeight);
				indicator.style.width =  total+ "%";
			});
		}
	};
	// CANVAS ===================
	_pbd.canvas = _pbd.fn.canvas = function canvas(cID, _newConfig={}){
		var canvas, tmp, _this = Object.getPrototypeOf(_pbd) || this;
		if(cID ){
			if( isString(cID) && (tmp = $all(cID) ) && isElement(tmp) ){
				canvas = tmp;
				tmp = null;
			} else if( isElement(cID) ){
				canvas = cID;
			} else if( isPlainObject(cID) ){
				canvas = ("canvas" in cID) ? ( isElement(cID.canvas) ? cID.canvas : isString(cID.canvas) ? $all(cID.canvas) : false ) : false;
			} else {
				canvas = _pbd.util().tag("canvas",{id:"","class":""},"your browser does not support the canvas element");
			}
			var sourceimage = document.querySelector('img');
			var canvas = document.querySelector('canvas');
			canvas.height = canvas.width = 0;
			var context = canvas.getContext('2d');
			function copy() {
				var imgwidth = sourceimage.offsetWidth;
				var imgheight = sourceimage.offsetHeight;
				canvas.width = imgwidth;
				canvas.height = imgheight;
				context.drawImage(sourceimage, 0, 0);
			}
			// Rotate 90 degrees and copy image to canvas ➜ 
			function rotate() {
				var imgwidth = sourceimage.offsetWidth;
				var imgheight = sourceimage.offsetHeight;
				canvas.width = imgwidth;
				canvas.height = imgheight;
				context.save();
				context.translate(imgwidth / 2, imgheight / 2);
				context.rotate(Math.PI/2);
				context.drawImage(sourceimage, -(imgwidth / 2), -(imgheight / 2));
				context.restore();
			}
			// resize image
			function resize(nWidth, nHeight) {
				var imgwidth = sourceimage.offsetWidth;
				var imgheight = sourceimage.offsetHeight;
				canvas.width = nWidth || 10;
				canvas.height = nHeight || 50;
				context.drawImage(sourceimage, 0, 0, imgwidth, imgheight, 0, 0, ( nWidth || 10 ), ( nHeight || 50 ) );
			}
			// scale image
			var scaleX = 2;
			var scaleY = 2;
			function scale(scaleX = 2, scaleY = 2){
				var imgwidth = sourceimage.offsetWidth;
				var imgheight = sourceimage.offsetHeight;
				canvas.width = scaleX ? imgwidth * scaleX : imgwidth;
				canvas.height = scaleY ? imgheight * scaleY : imgheight;
				if(scaleX && scaleY ) context.scale(scaleX, scaleY);
				context.drawImage(sourceimage, 0, 0);
			}
			//------------------------------------------------
			function capture(video,scaleFactor) {
			    if(scaleFactor == null) scaleFactor = 1;
				var w = video.videoWidth * scaleFactor;
				var h = video.videoHeight * scaleFactor;
				var canvas = document.createElement('canvas');
				canvas.width = w;
				canvas.height = h;
				ctx = canvas.getContext('2d');
				ctx.drawImage(video,0,0,w,h);
				return canvas;
			}
			function shoot(output, v, scaleFactor){
			    if(v.paused || v.ended)	return false;
				// var output = jQuery('#snapshotsOutput');
				var canvas = capture(v,scaleFactor);
				canvas.onclick = function(){
				    window.open(this.toDataURL());
				}
				snapshots.unshift(canvas);
				output.innerHTML = '';
				for(var i=0;i<4;i++){
				    output.appendChild(snapshots[i]);
				}
			}
            //function snap(v,c,w,h) {
            function snap(output, video,snapW,snapH,mime) {
			    if(video.paused || video.ended || !output) return false;
				mime = mime || "image/png";
				//var output = document.getElementById('c3'),
			    a = document.createElement('a'),
			    c = document.createElement('canvas'),
			    ctx = c.getContext('2d');
				canvas.width = snapW || 800;
				canvas.height = snapH || 500;
				w = canvas.width;
				h = canvas.height;
				ctx.fillRect(0,0,w,h);
				ctx.drawImage(video,0,0,w,h);
				canvas.style.width = '250px';
				canvas.style.height = '150px';
				this.util().setAttr(a, {'href':canvas.toDataURL(mime), 'title':'Download ', 'download':'canvas'});
				a.innerHTML = '';
				a.appendChild(canvas);
				output.innerHTML = '';
				output.appendChild(a);
			    //output.appendChild(canvas);
			}
			function draw(v,c,w,h) {
			    if(v.paused || v.ended)	return false;
				c.drawImage(v,0,0,w,h);
				setTimeout(draw,20,v,c,w,h);
			}
			function draw2(v,c,bc,w,h) {
                if(v.paused || v.ended) return false;
                // First, draw it into the backing canvas
                bc.drawImage(v,0,0,w,h);
                // Grab the pixel data from the backing canvas
                var idata = bc.getImageData(0,0,w,h);
                var data = idata.data;
                // Loop through the pixels, turning them grayscale
                for(var i = 0; i < data.length; i+=4) {
				    var r = data[i];
					var g = data[i+1];
					var b = data[i+2];
					var brightness = (3*r+4*g+b)>>>3;
					data[i] = brightness;
					data[i+1] = brightness;
					data[i+2] = brightness;
				}
				idata.data = data;
				// Draw the pixels onto the visible canvas
				c.putImageData(idata,0,0);
				// Start over!
				setTimeout(function(){ draw2(v,c,bc,w,h); }, 0);
			}
			//-----------------------------------------
		}
		return _this;
	}
	// MEDIA =====================
	_pbd.media = _pbd.fn.media = function media(_newConfig={}){
		var _this = this || Object.getPrototypeOf(_pbd);
		let _defaultConfig = {
			debugMode : false,
			theme : "#theme",
			currentTheme : ".w3-theme",
			logElem : "#log",
			speeds : {
				off: false,
				slow: 600,
				fast: 200,
				_default: 400// Default speed
			},
			tag : {
				append : true
			}
		};
		this.mediaConfig = _extendObj(_defaultConfig,_newConfig);
		// alert(_this+"-"+ Object.getPrototypeOf(_pbd)); 
		//  skip forward, backward, or restart
		var logger = new Logger(this.mediaConfig.logElem || 'log');
		function setTime(tValue, v) {try {if (tValue == 0) {v.currentTime = tValue;}else {v.currentTime += tValue;}} catch (err) {errMessage("Video content might not be loaded"+err);}}
    	function setVol(value, v, volSlider) {var vol = v.volume;vol += value;if (vol >= 0 && vol <= 1) {v.volume = vol;volSlider.value = vol;} else {v.volume = (vol < 0) ? 0 : 1;volSlider.value = (vol < 0) ? 0 : 1;}}
		function errMessage(msg) {
			// displays an error message for 5 seconds then clears it
			document.getElementById("errorMsg").textContent = msg;
			setTimeout("document.getElementById('errorMsg').textContent=''", 5000);
		}
		function togglePlayPause(m) {
			if (window.HTMLAudioElement || window.HTMLVideoElement) {
				try {
					//if(typeof(v) === ''){
					if(m.paused) m.play();
					else m.pause();
				} catch (e) {
					// Fail silently but show in F12 developer tools console
					if (window.console && console.error("Error:" + e));
					logger.log("Error:" + e);
					alert("Error:" + e);
				}
			}
		}
		function checkCodec (_codec, _default){
			var isValidCodec = _codec.test(/webm|mp4|ogv/);
			if(isValidCodec) return _codec;
			else return _default;
		}
		function stream (url, type, codec, targetElem){
			window.MediaSource = window.MediaSource || window.WebKitMediaSource;
			if (!!!window.MediaSource) {
				logger.log('MediaSource API is not available');
				alert('MediaSource API is not available');
				return false;
			}

			var FILE = url || 'test.webm',
			type = type && inArray(["audio","video"], type) ? type : "video",
			codec = checkCodec(codec, 'video/webm; codecs="vorbis,vp8"'),
			NUM_CHUNKS = 5,
			streamElem = targetElem ? ( isElement(targetElem) ? targetElem : isString(targetElem) ? $all(targetElem) : false ) : false;
			if(! streamElem) {streamElem = makeElem(type);}
			document.querySelector('[data-num-chunks]').textContent = NUM_CHUNKS;
			
			var mediaSource = new MediaSource();
			var mediaUrl = window.URL.createObjectURL(mediaSource);
			if(streamElem && isArray(streamElem) && streamElem.length > 0 && (streamElem = streamElem[0]) ){
				/*this.each(function(elem){
					if(isElement(elem) && ( isAudioElement(elem) || isVideoElement(elem) ) ) elem.src = mediaUrl;
				});*/
				if(isElement(streamElem) && ( isAudioElement(streamElem) || isVideoElement(streamElem) ) ) streamElem.src = mediaUrl;
			} else {
				streamElem.src = mediaUrl;
			}
			function GET(url, callback) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', url, true);
				xhr.responseType = 'arraybuffer';
				xhr.send();
				xhr.onload = function(e) {
					if (xhr.status != 200) {
						logger.log("Unexpected status code " + xhr.status + " for " + url);
						alert("Unexpected status code " + xhr.status + " for " + url);
						return false;
					}
					callback(new Uint8Array(xhr.response));
				};
			}
			
			function callback(e) {
				//var sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
				var sourceBuffer = mediaSource.addSourceBuffer(codec);
				logger.log('mediaSource readyState: ' + this.readyState);
				GET(FILE, function(uInt8Array) {
					var file = new Blob([uInt8Array], {type: 'video/webm'});
					var chunkSize = Math.ceil(file.size / NUM_CHUNKS);
					logger.log('num chunks:' + NUM_CHUNKS);
					logger.log('chunkSize:' + chunkSize + ', totalSize:' + file.size);
					// Slice the video into NUM_CHUNKS and append each to the media element.
					var i = 0;
					(function readChunk_(i) {
						var reader = new FileReader();
						// Reads aren't guaranteed to finish in the same order they're started in,
						// so we need to read + append the next chunk after the previous reader
						// is done (onload is fired).
						reader.onload = function(e) {
							sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
							logger.log('appending chunk:' + i);
							if (i == NUM_CHUNKS - 1) {
								mediaSource.endOfStream();
							} else {
								if (streamElem.paused) {
									streamElem.play(); // Start playing after 1st chunk is appended.
								}
								readChunk_(++i);
							}
						};
						var startByte = chunkSize * i;
						var chunk = file.slice(startByte, startByte + chunkSize);
						reader.readAsArrayBuffer(chunk);
					})(i);  // Start the recursive call by self calling.
				});
			}
			mediaSource.addEventListener('sourceopen', callback, false);
			mediaSource.addEventListener('webkitsourceopen', callback, false);
			mediaSource.addEventListener('webkitsourceended', function(e) {
				logger.log('mediaSource readyState: ' + this.readyState);
			}, false);
			
			return this;
		}
		return {
			__proto__ : _pbd,
			mediaConfig : this.mediaConfig,
			audio : {},
			video : {},
			playlist : {},
			stream : stream,
			track : new Track
		};
	};
	// IMAGE /PHOTOS ==============
	_pbd.image = _pbd.fn.image = function image(_newConfig={}){
		var _this = this || Object.getPrototypeOf(_pbd);
		let _defaultConfig = {
			debugMode : false,
			theme : "#theme",
			currentTheme : ".w3-theme",
			speeds : {
				off: false,
				slow: 1600,
				fast: 800,
				_default: 1000// Default speed
			}, 
			wallpaper : {
				bgImg : 'http://localhost/ui/uploads/images/__GALLERY__/girlsxxx/917_1000.jpg',
				bgClip : "no-clip", //no-clip,border-box,content-box,padding-box
				bgColor : "transparent",
				bgAttachment : 'fixed', //scroll,fixed,initial,inherit,local,unset
				bgSize : "100% 100%", //auto,cover,contain,
				bgPosition : "center center",
				bgRepeat : "no-repeat",
				color : "#f5f5f5",
				realImage : false
			}
		};
		this.imageConfig = _extendObj(_defaultConfig,_newConfig);
		// alert(_this+"-"+ Object.getPrototypeOf(_pbd)); 
		return {
			__proto__ : _pbd,
			imageConfig : this.imageConfig,
			slideShow : {},
			gallery : {},
			editor : {},
			modal : {},
			wallPaper: {}
		};
	};
	// LAYOUT /GRID ==============
	_pbd.fn.layout = function (selector, ratio){
		this.calculateRatio = function (ratio){
			if(!ratio) return false;
			/*ratio = ratio || '1:1';
			 ratio = (ratio && typeof ratio == 'string' || app.isArray(ratio) && ratio.length == 2) || '1:1';
			if(app.isArray(ratio) && ratio.length == 2){
				return [ratio[0],ratio[1]]
			} */
			var ratioValues = {
				'1:1':['50%','50%'],
				'1:2':['25%','75%'],'2:1':['75%','25%'],
				'1:3':['33.3%','66.6%'],'3:1':['66.6%','33.3%'],
				'1:5':['20%','80%'],'5:1':['80%','20%'],'2:5':['40%','60%'],'5:2':['60%','40%'],
			};
			var ratioProp = [];
	
			for(var ratioProperty in ratioValues){
				ratioProp.push(ratioProperty);
			}
			for(var i =0;i<ratioProp.length;i++){
				if(ratio.match(ratioProp[i])){
					return [ratioValues[ratioProp[i]][0],ratioValues[ratioProp[i]][1]];
					//break;
				}
			}
			return false;
		};
		this.positionElement = function(ele1,ele2,direction,ratio){
			ele1 = this.isObject(ele1) ? ele1 : this.$$(ele1);
			ele2 = this.isObject(ele2) ? ele2 : this.$$(ele2);
			direction = direction || 2; // 1 = horizontal, 2 = vertical
			ratio = ratio || '1:1';
			var ratioValues = {
				'1:1':['50%','50%'],
				'1:2':['25%','75%'],
				'2:1':['75%','25%']
			};
			var ratioProp = [];
			if(direction == 1){
				//ele1_height = this.util().get.styleProp(ele1,'height');
				//ele2.style.cssText += 'position:relative;top'+ele1_height;
				ele1_height = ele1.css('height');
				ele2.css({'position':'relative','top':ele1_height});
			} else if(direction == 2) {
				ele1.removeClass('clearfix');
				ele2.removeClass('clearfix');
				//ele1.style.position = ele2.style.position = 'absolute';
				ele1.css({'position':'absolute','left':'0','margin-right':'5px'});
				ele2.css({'position':'absolute','right':'0'});
				for(var ratioProperty in ratioValues){
					ratioProp.push(ratioProperty);
				}
				for(var i =0;i<ratioProp.length;i++){
					if(ratio.match(ratioProp[i])){
						/* ele1.style.width = ratioValues[ratioProp[i]][0];ele2.style.width = ratioValues[ratioProp[i]][1];*/
						ele1.css('width',ratioValues[ratioProp[i]][0]);
						ele2.css('width',ratioValues[ratioProp[i]][1]);
						break;
					}
				}
			}
			return this instanceof _pbd ? this : $pbd( this );
		};
		this.layoutElements = function (container,direction,ele){
			ele = ele || this.results;
			elem = ele && isObject(ele) ? ele : this.$$(ele);
			direction = direction || 2;
			container = container || 'window';
			
			if(container == 'window'){
			    viewPort = this.util().get.windowDimensions();
			    container_width = viewPort.width;
			    container_height = viewPort.height;
			} else {
				container = $pbd(container).index(0);
			    /* alert(container.css('height'));
				container_width = this.util().get.styleProp(container[0],'width');
				container_height = this.util().get.styleProp(container[0],'height');*/
				container_width = container.width();
				container_height = container.height();
				container_width = container_width.replace('px','');
				container_height = container_height.replace('px','');
			}
			var length = elem.length;
			if(direction === 1 || direction === 'horizontal'){
				this.util().styleElement(elem,{'position':'relative','display':'list-item','height':(container_height/length)-(5*length)+'px','overflow':'auto'/* ,'margin-bottom':((i+1) !==length ? '5px' : '0') */});
			} else if(direction === 2 || direction === 'vertical') {
				this.util().styleElement(elem,{'position':'relative','display':'inline-block','clear':'none','float':'none','width':parseInt(container_width/length)-(5*length)+'px','height':(container_height-10)+'px','overflow':'auto'/* ,'margin-right':((i+1) !==length ? '5px' : '0') */});
			}
			for(var i=0;i<length;i++){
				//this.style.removeClass(elem[i],'clearfix');
				if(direction === 1 || direction === 'horizontal'){
				    ((i+1)!==length) ? elem[i].style.marginBottom = '5px' : elem[i].style.marginBottom = '0';
				} else if(direction === 2 || direction === 'vertical') {
					((i+1)!==length) ? elem[i].style.marginRight = '5px' : elem[i].style.marginRight = '0';
				}
			}
			return this;
		};
		this.grid = function (){
			return this;
		};
		this.render = function (){
			return this;
		};
		return {
		
		};
	};
	
	_pbd.app = _pbd.prototype.app = function app(appName, appObject, appConfig){
		var $this = this;
		var _defaultConfig = {};
		appConfig = _extendObj(_defaultConfig, appConfig || {});
		
		var $return = this.appLoader( appName, appObject, appConfig, this );
		return this;
	}
	// APP BUILDER / LOADER ========
	_pbd.fn.appLoader = function appLoader( appName, appObject, appConfig, context){
		var x,xl;
		this.$apps = {};
		this.$loadedApps = {};
		this.$app_index = 0;
		this.$app_name = null;
		this.$nativeApp = null;
		this.$localApp = null;
		this.$App = null;
		this.$context = context || _pbd;
		var localApps = [
			{app_id : "3409ghtc5g34",app_name : "test-app",app_type : "image",
				app_tags : "image, photo",
				app_description : "this is just a simple imagery application",
				app_callback : (...args) => {alert(this.app_description);return this;},
				app_extra : {},
				app_isLocal : true
			},
			{app_id : "1",app_name : "set-bg-app",
				app_type : "image",app_tags : ["background", "image", "photo"],
				app_description : "this is just a simple imagery application",
				app_callback : setBG,
				app_extra : {},
				app_isLocal : true
			} 
		];
		this.registerApp = function(app, name, config) {
			_pbd._cache["apps"][ name ] = true;
			if( app && isObject( app ) ) {
				if( isPlainObject( app ) ){
					name = isString( name ) ? name : app.app_name ? app.app_name : "";
				} else if(isFunction( app )){
					name = app.name || app.displayName || "unknown-app-"+uid();
					app = {app_id:uid(),app_name:name,app_type:app.type||"",app_tags:[],app_description:"no description available",app_callback:app,app_extra:{}}
				}
				this.setApp( app, name, config, (this.$apps.length+1) );
			}
			return this;
		};
		this.isRegistered = function(appName) {
			let ret = false;
			if( isArray( this.$apps ) || isArrayLike( this.$apps ) ){
				for(var i = 0,l=this.$apps.length;i<l;i++){
					if( inArray(appName, this.$apps[i]) ){ret = true;}
				}
			} else {
				Object.keys(this.$apps).forEach(function (app,i){
					if(app === appName) ret = true;
				});
			}
			return ret;
		};
		this.setApp = function(app, app_name, app_config, app_index) {
			if(isObject(app) ) {
				app_name = isString( app_name ) ? app_name : ( isObject( app ) && app.app_name ? app.app_name : app );
				this.$app_name = app_name;
				this.$app_index = app_index || 0;
				this.$app_config = isPlainObject(app_config) ? app_config : {};
				if( !this.isRegistered( app_name ) ) {
					if( isArray(this.$apps) ) this.$apps.push( app );
					else if(isObject( this.$apps )) this.$apps[ app_name ] = app;
				}
			}
			return this;
		};
		this.getApp = function(appName,chain) {
			var is_registered = this.isRegistered( appName );
			if( isObject(this.$apps[ appName ] ) && is_registered ){
				// if( !( "app_isLocal" in this.$apps[ appName ] ) && !( "app_isNative" in this.$apps[ appName ] ) ) {this.$App = this.$apps[ appName ];}
				if( _typeof( this.$apps[ appName ].app_isLocal ) === "undefined" && _typeof( this.$apps[ appName ].app_isNative ) === "undefined" ) {this.$App = this.$apps[ appName ];}
				else if( _typeof( this.$apps[ appName ].app_isLocal ) !== "undefined" ) {this.$localApp = this.$apps[ appName ];}
				else if( _typeof( this.$apps[ appName ].app_isNative ) !== "undefined" ) {this.$nativeApp = this.$apps[ appName ];}
				if( !chain ) {
					return is_registered ? this.$apps[ appName ] : "";
				}
			}
			return this;
		};
		/*this.getApp = function(appName,chain) {var is_registered = this.isRegistered( appName );if( chain ) {this.$localApp = this.$apps[ appName ];//alert(this.$localApp.app_name);// for(var i in this.$apps) alert(i +" - "+this.$apps[ i ]);return this;} else return is_registered ? this.$apps[ appName ] : "";};*/
		this.buildApp = function (appObj, asPlainObject){
			if( appObj && isObject( appObj ) ){
				let newAppObj = {};
				_extendObj(newAppObj,appObj);
				return newAppObj;
			}
			return this;
		};
		this.load = function(apps, register) {
			var $FnParams, $Fn, $appFn, $nativeFn, $localFn, $originalName, $appOriginalName, $nativeOriginalName, $localOriginalName, $camelizedName, $appCamelizedName, $nativeCamelizedName, $localCamelizedName, 
			appType = _typeof( apps ), util = _pbd.util(), unknownFnName = "unknown-function-"+uid();
			/// for(var i in this.$apps) alert(i +" - "+this.$apps[ i ].app_name);
			// Load Local Apps ---------------
			if( this.$localApp ){
				if( this.$localApp.app_callback && isFunction(this.$localApp.app_callback) ){
					$localOriginalName = this.$localApp.app_name;
					$localCamelizedName = util.camelize($localOriginalName);
					$localFn = this.$localApp.app_callback;
				} else if( this.$apps[ this.$localApp ] && this.$apps[ this.$localApp ].app_callback && isFunction(this.$apps[ this.$localApp ].app_callback) ){
					$localOriginalName = this.$apps[ this.$localApp ].app_name;
					$localCamelizedName = util.camelize($localOriginalName);
					$localFn = this.$apps[ this.$localApp ].app_callback;
				}
				if($localOriginalName && !this.$loadedApps[ $localOriginalName ] ){
					_pbd.fn[ $localOriginalName ] = _pbd.fn[ $localCamelizedName ] = /*this[ $localCamelizedName ] = */bind(this.$context,$localFn);
					this.$loadedApps[ $localOriginalName ] = true;
				}
				$localFn = $localOriginalName = $localCamelizedName = null;
			}
			// Load Native Apps ----------------
			if( this.$nativeApp ){
				if( this.$nativeApp.app_callback && isFunction(this.$nativeApp.app_callback ) ){
					$nativeOriginalName = this.$nativeApp.app_name;
					$nativeCamelizedName = util.camelize($nativeOriginalName);
					$nativeFn = this.$natveApp.app_callback;
				} else if( this.$apps[ this.$nativeApp ] && this.$apps[ this.$nativeApp ].app_callback && isFunction(this.$apps[ this.$nativeApp ].app_callback) ){
					$nativeOriginalName = this.$apps[ this.$nativeApp ].app_name;
					$nativeCamelizedName = util.camelize($nativeOriginalName);
					$nativeFn = this.$apps[ this.$nativeApp ].app_callback;
				}
				if($nativeOriginalName && !this.$loadedApps[ $nativeOriginalName ] ){
					this.$loadedApps[ $nativeOriginalName ] = true;
					_pbd.fn[ $nativeOriginalName ] = _pbd.fn[ $nativeCamelizedName ] = $nativeFn;
				}
				$nativeFn = $nativeOriginalName = $nativeCamelizedName = null;
			}
			// Load Other Apps ---------------
			if( this.$App ){
				if( this.$App.app_callback && isFunction(this.$App.app_callback) ){
					$appOriginalName = this.$App.app_name;
					$camelizedName = util.camelize($appOriginalName);
					$appFn = this.$App.app_callback;
				} else if( this.$apps[ this.$App ] && this.$apps[ this.$App ].app_callback && isFunction(this.$apps[ this.$App ].app_callback) ){
					$appOriginalName = this.$apps[ this.$App ].app_name;
					$appCamelizedName = util.camelize($appOriginalName);
					$appFn = this.$apps[ this.$App ].app_callback;
					//this[ this.$apps[ this.$App ] ] = this[ $camelizedName ] = this.$apps[ this.$App ].app_callback;
				}
				if($appOriginalName && !this.$loadedApps[ $appOriginalName ] ){
					this.$loadedApps[ $appOriginalName ] = true;
					_pbd.fn[ $appOriginalName ] = _pbd.fn[ $appCamelizedName ] = $appFn;
				}
				$appFn = $appOriginalName = $appCamelizedName = null;
			}
			// Load apps from the loader
			if( this.isRegistered( apps ) && !this.$loadedApps[ apps ] ){
				if( this.$apps[ apps ].app_callback && isFunction(this.$apps[ apps ].app_callback) ){
					$originalName = this.$apps[ apps ].app_name;
					$camelizedName = util.camelize($originalName);
					$Fn = this.$apps[ apps ].app_callback;
				}
				if($originalName && !this.$loadedApps[ $originalName ] ){
					this.$loadedApps[ $originalName ] = true;
					// this[ $originalName ] = this[ $camelizedName ] = $Fn;
					_pbd.fn[ $originalName ] = _pbd.fn[ $camelizedName ] = $Fn;
				}
				$Fn = $originalName = $camelizedName = null;
			} else {
				var appNames,is_comma = /,/i.test(appName),
				is_space = /\s+$/.test(appName);
				if(is_comma){appNames = appName.split(",");} 
				else if(is_space) {appNames = appName.split(" ");}
				$Fn = $originalName = $camelizedName = null;
				if(  isString( apps ) ){
					$originalName = apps;
					//var $FnParams = [1, 2, 3];
					//$Fn = apps();
					$Fn = window[ $originalName ];
					// if (typeof $Fn === "function") fnparams ? $Fn.apply(null, fnparams) : $Fn();
				} else if(isFunction(apps)) {
					$originalName = apps.name || apps.displayName || unknownFnName;
					$Fn = apps;
				} else if( isPlainObject( apps ) ){
					appObj = this.buildApp(apps);
					$originalName = appObj.app_name || false;
					$Fn = appObj.app_callback || null;
				} else if( appNames && isArray( appNames ) && appNames.length >= 2 ){
					/* var x = 0,total = appNames.length;
					for(;x<total;x++){if(_pbd.trim(appNames[ x ]) !== "") this.getApp(appNames[ x ],true).load();} */
					forEach(appNames, function (app){ if(_pbd.trim(app) !== "") this.load(app);});
				}
				$camelizedName = util.camelize($originalName);
				if( $originalName && isFunction($Fn ) ){
					if(register){
						this.registerApp( $originalName );
					}
					//$Fn.apply(null, fnparams) : $Fn();
					this[ $originalName ] = this[ $camelizedName ] = $Fn;
					_pbd.fn[ $originalName ] = _pbd.fn[ $camelizedName ] = bind(this.$context,$Fn,_pbd);//$FnParams ? $Fn.apply(null, $FnParams) : $Fn;
				}
				$Fn = $originalName = $camelizedName = null;
			}
			return this;
		};
		for(x=0,xl=localApps.length;x<xl;x++){
			if( isObject( localApps[x] ) && isString( localApps[x].app_name ) ) this.setApp( localApps[x], localApps[x].app_name, {}, x);
		}
		if( isString(appName) ){
			var appNames,is_comma = /,/i.test(appName),
			is_space = /\s+$/.test(appName);
			if(is_comma){appNames = appName.split(",");} 
			else if(is_space) {appNames = appName.split(" ");}
			if( appNames && appNames.length >= 2 ){
				var x = 0,total = appNames.length;
				for(;x<total;x++){
					if(_pbd.trim(appNames[ x ]) !== "") this.getApp(appNames[ x ],true).load();
				}
			} else this.getApp(appName,true).load();
		} else if(isObject(appName) ) {
			this.registerApp( appObject, appName, appConfig );
		} else {
			//this.loadApp( appName, appConfig );
			// return this;
		}
	};
	// TEMPLATE Engine
	_pbd.prototype.templater = _pbd.templater = _pbd.prototype.hashRouter = _pbd.hashRouter = function () {
		var that = this, route, routes = {}, el = null,  str = null, err = [],
		default_params = {viewId:'view','animation':null},
		params = arguments && arguments.length>0&& isObject(arguments[0]) ? arguments[0] : {};
		this.params = _extendObj(default_params,params);
		this.routerUrl = location.hash.slice(1) || '/';// Current route url (getting rid of '#' in hash as well):
		//// A hash to store our routes:
		this.routes = {};
		// Put John's template engine code here...
		(function(){
			var cache = {};
			var _tmplCache = {};
			var _tmplCache2 = {};
			this.tmpl = function tmpl(str,data){
				err = err || [];
				try{
				var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(tmpl.load(str)) : 
				new Function("obj",
					"var p = [],print = function(){p.push.apply(p,arguments);};" + 
					"with(obj){p.push('" + 
					str.replace(/[\r\t\n]/g, " ")
					.replace(/'(?=[^%]*%>)/g,"\t").replace(/'(?=[^#]*#>)/g,"\t").replace(/'(?=[^%]*%})/g,"\t").replace(/'(?=[^}]*}})/g,"\t")
					.split("'").join("\\'").split("\t").join("'")
					.replace(/<%=(.+?)%>/g, "',$1,'").replace(/<#=(.+?)#>/g, "',$1,'").replace(/{%=(.+?)%}/g, "',$1,'").replace(/{{=(.+?)}}/g, "',$1,'")
					.split("<%").join("');").split("<#").join("');").split("{%").join("');").split("{{").join("');")
					.split("%>").join("p.push('").split("#>").join("p.push('").split("%}").join("p.push('").split("}}").join("p.push('")
				+ "');}return p.join('');");
				return isFunction(fn) ? ( data ? fn(data) : fn) : function (data){return tmpl(data);};
				} catch(e){alert(e.stack);err.push(e.message);
				return "{{= tmpl error: "+err.join(" \t\n")+" }}";
				}
			};
			this.parseTemplate = function parseTemplate(str,data){
				err = err || [];
				try{
					var func = _tmplCache[str];
					if(!func){
						var strFunc = "var p = [],print = function(){p.push.apply(p,arguments);};" + 
						"with(obj){"+
							"p.push('" + (
								str.replace(/\t(?![^#]*#>)/g,"\\t").replace(/(\r?\n)(?![^#]*#>)/g,"\\n")
								.replace(/\t(?![^%]*%>)/g,"\\t").replace(/(\r?\n)(?![^%]*%>)/g,"\\n")
								.replace(/\t(?![^{{]*}})/g,"\\t").replace(/(\r?\n)(?![^{{]*}})/g,"\\n")
								.replace(/[\r\t\n]/g," ")
								.replace(/'(?=[^%]*%>)/g,"\t")
								.replace(/'(?=[^#]*#>)/g,"\t")
								.split("'").join("\\'").split("\t").join("'")
								.replace(/<#=(.+?)#>/g,"',$1,'").split("<#").join("');").split("#>").join("p.push('")
								.replace(/<%=(.+?)%>/g,"',$1,'").split("<%").join("');").split("%>").join("p.push('")
								.replace(/{{=(.+?)}}/g,"',$1,'").split("{{").join("');").split("}}").join("p.push('")
							) + "');"+
						"}return p.join('');";
						func = new Function("obj",strFunc);
						_tmplCache[str] = func;
					}
					return func(data);
				} catch(e){err.push(e.message);
					return "{{= parseTemplate error: "+err.join(" \t\n")+" }}";
				}
			};
			this.tmpl.load = tmpl.load = function (id) {return document.getElementById(id).innerHTML;}
			
		})();
		function route(path, templateId, controller) {
			routes[path] = {templateId: templateId, controller: controller};
			that.routes[path] = {templateId: templateId, controller: controller};
			return this;
		};
		function notfound() {
			that.routerUrl = location.hash.slice(1) || '/';
			str = document.getElementById('not-found') ? document.getElementById('not-found').innerHTML : (document.getElementById('not-found-template') ? document.getElementById('not-found-template').innerHTML : '<h2>Not Found</h2><p>Sorry! I cannot find that page.</p>');
			msg = '<p>It would appear that link to the requested page is broken and/or the template was not found.</p>';
			return {templateId:'not-found',controller:{message:msg,page:that.routerUrl},str:str};
		}
		if(el&&el.classList&&typeof that.params.animation === 'string'){el.classList.remove(that.params.animation);}
		function render(){
			var tmp,i=0;
			var url = location.hash.slice(1) || '/';// Current route url (getting rid of '#' in hash as well):
			var _route2 = that.routes[url];// Get route by url:
			str = str || ((_route2 && document.getElementById(_route2.templateId)) ? document.getElementById(_route2.templateId).innerHTML: ((_route2 && document.getElementById(_route2.templateId + '-template')) ? document.getElementById(_route2.templateId + '-template').innerHTML:notfound().str));
			el = el || document.getElementById(that.params.viewId||'view');
			tpl = arguments&&arguments.length>=1?arguments[0]:that.routes[url];
			if(isFunction(tpl)){
				tpl(str,el,tmpl);
				// var callbackFunction = tpl;var callbackParams = [str,el];if(typeof callbackFunction === "function") tmp = callbackFunction.apply(null,callbackParams);else{var fn = window[callbackFunction];if(typeof fn === "function") tmp = fn.apply(null,callbackParams);}el.innerHTML = tmp;
			} else if(isPlainObject(tpl)){
				tmpl(tpl.templateId,(isPlainObject(tpl.controller) ? tpl.controller : new tpl.controller));
			} else if(isString(tpl)) {
				el.innerHTML = tpl;
			} else {
				el.innerHTML = tmpl(_route2.templateId,(isPlainObject(_route2.controller) ? _route2.controller : new _route2.controller));
			}
			return this;
		}
		function setRoute(){
			err = err || [];
			try{
			el = el || document.getElementById(that.params.viewId||'view');
			var url = location.hash.slice(1) || '/';// Current route url (getting rid of '#' in hash as well):
			var _route = routes[url];
			if(_route&&_route.templateId&&_route.controller){
				// Do we have both a view and a route?
				str = str || (document.getElementById(_route.templateId)?document.getElementById(_route.templateId).innerHTML:(document.getElementById(_route.templateId + '-template')?document.getElementById(_route.templateId + '-template').innerHTML:""));
                if (el &&  _route.controller) {
                    if(typeof that.params.animation === 'string'){el.classList.add(that.params.animation);}
			        // Render route template with John Resig's template engine:
                    //render(parseTemplate(str,(__pbd_self.isPlainObject(_route.controller) ? _route.controller : new _route.controller)));
                    //el.innerHTML = tmpl(_route.templateId,(__pbd_self.isPlainObject(_route.controller) ? _route.controller : new _route.controller));
                    render(tmpl(_route.templateId,( isPlainObject(_route.controller) ? _route.controller : new _route.controller)));
                }
			} else {
				_route = {templateId:notfound().templateId,controller:notfound().controller,str:notfound().str};
				render(parseTemplate(_route.str,(isPlainObject(_route.controller) ? _route.controller : new _route.controller)));
				//render(notfound().str);
			}
			} catch(e){alert(e.stack);err.push(e.message);el.innerHTML = "{{= error: "+err.join(" \t\n")+" }}";}
		};
		function onRouteChanged(e) {
			console.log(window.location.hash);
			const hash = window.location.hash !== "" ? window.location.hash : '#page-home';
			const routerView = document.getElementById("router-view");
			if (!(routerView instanceof HTMLElement)) {
				throw new ReferenceError("No router view element available for rendering");
			}
			var target_url = $(this).attr('href');
			var effect = $(this).attr('data-page-display-effect') || getStorageItem('page-display-effect') || 'animated slideInDown';
			PBD.globals.currentToolPageEffect = effect;
			var effect_time = $(this).attr('data-page-display-effecttime') || 1000;
			var page_type = $(this).attr('data-page-type') || '';
			var page_title = $(this).attr('title') || $(this).text() || $(this).html();
			var baseUrl = window.location.href.split('#')[0];
	        var backurl = baseUrl + hash;
	        $('.sidenav .sidenav-block a').removeClass('active-button');
	        $('#main .app-page').removeClass(effect).hide();
			$('#current-page-title').html(page_title);
	        document.title = 'PBD Developer Box | '+page_title;
			if(target_url.match(/^.*#/) || target_url.match(/^#/)){
				switch (hash) {
					case "#home":
						routerView.innerHTML = "<h1>Home page</h1>";
						break;
					case "#about":
						routerView.innerHTML = "<h1>About page</h1>";
						break;
					default:
						routerView.innerHTML = "<h1>404 - Page Not Found</h1>";
					    $('#full-page-loader-overlay').removeClass('visible').addClass('hidden').fadeOut('slow');
				    	$(target_url).css({'min-height':($win_height-($top_nav_height+35))});
						if(effect == 'show') $(target_url).show(effect_time);
						else if(effect == 'fadein') $(target_url).fadeIn(effect_time);
						else $(target_url).addClass(effect).css('display','block');
						$('.backbtn').attr('href',hash).css('display','block').on('click',function(ev){ev.preventDefault();window.location = backurl;});
						break;
				}
			} else {
		    	e.preventDefault();
				window.location.href = baseUrl + hash;
			    if(isSet($(this).attr('data-page-id'))){
			        var $target = $($(this).attr('data-page-id'));
			    } else var $target = $('#main-ajax-container');
				
			    if(isSet($(this).attr('data-method'))){
					var method = $(this).attr('data-method');
				} else var method = 'GET';
				
				$target.css({'min-height':($win_height-($top_nav_height+35))});
	
				if(effect == 'show') $target.show(effect_time).html(_loading_code);
				else if(effect == 'fadein') $target.fadeIn(effect_time).html(_loading_code);
				else $target.addClass(effect).css('display','block').html(_loading_code);
	
				if(page_type == 'iframe') {
					$iframe = '<iframe class="box box-info" src="'+target_url+'" style="width:100%;min-height:'+($win_height-($top_nav_height+35))+'px;" frameborder="0" scrolling="yes" sandbox="allow-scripts allow-forms allow-same-origin"></iframe>'
					+'<div class="spacer"></div>'
					+'<center><a href="#page-home" class="site-link btn btn-default"><i class="fa fa-home"></i>Home</a></center>';
	
				    $('#full-page-loader-overlay').fadeOut('slow').removeClass('visible').addClass('hidden');
		        	if(effect == 'show') $target.html($iframe).show(effect_time);
					else if(effect == 'fadein') $target.html($iframe).fadeIn(effect_time);
				    else $target.addClass(effect).css('display','block').html($iframe);
				} else if(page_type == 'child') {
					window.location = target_url;
				} else if(page_type == 'external') {
				    inAppBrowserInit.browseNet(target_url);
				} else {
					ext = getFileExtension(target_url);
					$.ajax({
					    url: target_url,
					    type: method,
					    cache: false,
						dataType:(ext.toLowerCase() == 'md'||ext.toLowerCase() == 'txt')?'text':'',
					    success: function (html) {
						    $('#full-page-loader-overlay').fadeOut('slow').removeClass('visible').addClass('hidden');
		                	var result = parseFile(target_url,html);
					        if(effect == 'show') $target.html(result).show(effect_time);
						    else if(effect == 'fadein') $target.html(result).fadeIn(effect_time);
					        else $target.addClass(effect).css('display','block').html(result);
				        },
					    error: function(html){
					        $('#full-page-loader-overlay').fadeOut('slow').removeClass('visible').addClass('hidden');
		                    if(effect == 'show') $target.show(effect_time).html(_loading_error_code + "<br>\n" + html.responseText);
						    else if(effect == 'fadein') $target.fadeIn(effect_time).html(_loading_error_code + "<br>\n" + html.responseText);
					        else $target.addClass(effect).css('display','block').html(_loading_error_code + "<br>\n" + html.responseText);
				        }
				    });
				}
		    }
			$('html,body').animate({scrollTop: 0}, 1000);
		};
		// Listen on hash change:
		window.addEventListener('hashchange', setRoute);
		// Listen on page load:
		window.addEventListener('load', setRoute);
		//document.addEventListener(clickEvent, onclick, false);
		return {route:route,addRoute:route,add:route,render:render};
	};
	_pbd.TemplateEngine = function(html, options) {
		var _tmpl = function (html, options){
    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\\n', cursor = 0, match;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\\n' : 'r.push(' + line + ');\\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\\\"') + '");\\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\\r\\t\\n]/g, '')).apply(options);
    }
    function _tmpl2(str, options){ 
			var fn = "var p=[]; p.push('" +
				str.replace(/[\r\t\n]/g, " ")
					.replace(/'(?=[^%]*%>)/g,"\t")
					.split("'").join("\\'")
					.split("\t").join("'")
					.replace(/<%=(.+?)%>/g, "',$1,'")
					.split("<%").join("');")
					.split("%>").join("p.push('")
				 + "'); return p.join('');";
			return new Function("o", fn).apply(options);
		};

    return _tmpl2(html, options);
}
	_pbd.Router = {
		routes: [], mode: null, root: '/', container : "",
		config: function(options) {
			this.container = !('container' in options) ? document.body : ( isElement(options.container) ? options.container : isString(options.container) ? $one(options.container) : false );
			this.mode = options && options.mode && options.mode == 'history' && !!(history.pushState) ? 'history' : 'hash'; 
			this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/'; 
			return this;
		}, 
		getFragment: function() {
			var fragment = '';
			if(this.mode === 'history') {
				fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
				fragment = fragment.replace(/\?(.*)$/, '');
				fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
			} else {
				var match = window.location.href.match(/#(.*)$/);
				fragment = match ? match[1] : '';
			}
			return this.clearSlashes(fragment);
		}, 
		clearSlashes: function(path) {
			return path.toString().replace(/\/$/, '').replace(/^\//, '');
		}, 
		add: function(re, handler) {
			if(typeof re == 'function') { handler = re; re = ''; }
			this.routes.push({ re: re, handler: handler});
			return this;
		},
		remove: function(param) {
			for(var i=0, r; i<this.routes.length, r = this.routes[i]; i++) {
				if(r.handler === param || r.re.toString() === param.toString()) {
					this.routes.splice(i, 1); return this;
				}
			}
			return this;
		},
		flush: function() {this.routes = []; this.mode = null; this.root = '/'; return this; }, 
		check: function(f) {
			var fragment = f || this.getFragment();
			for(var i=0; i<this.routes.length; i++) {
				var match = fragment.match(this.routes[i].re);
				if(match) {
					match.shift();
					this.routes[i].handler.apply({}, match);
					return this;
				}
			}
			return this;
		}, 
		listen: function() {
			var self = this;
			var current = self.getFragment();
			var fn = function() {
				if(current !== self.getFragment()) {
					current = self.getFragment();
					self.check(current);
				}
			}
			clearInterval(this.interval);
			this.interval = setInterval(fn, 50);
			return this;
		},
		navigate: function(path) {
			path = path ? path : '';
			if(this.mode === 'history') {
				history.pushState(null, null, this.root + this.clearSlashes(path));
			} else {
				window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
			}
			return this;
		}
	};
	// configuration Router.config({ mode: 'history'});
	// returning the user to the initial state Router.navigate();
	// adding routes Router.add(/about/, function() { console.log('about'); }).add(/products\/(.*)\/edit\/(.*)/, function() { console.log('products', arguments); }).add(function() { console.log('default'); }).check('/products/12/edit/22').listen();
	// forwarding Router.navigate('/about');
	// ---------------------------------------------------
	// SOCKET ====================
	_pbd.socket = _pbd.fn.socket = function (url, protocol){
		this._url = url || 'ws://localhost:8080';
		this._protocol = isArray(protocol) ? protocol : [ protocol ];
		this._socket = null;
		// Create WebSocket connection.
		this.connect = function (){
			if( ("WebSocket" in window ) && !this._socket){
				this._socket = new WebSocket( this._url, this._protocol );
			}
			return this;
		};
		// Connection opened
		this.send = function (data){
			if(this._socket){
				this._socket.addEventListener('open', function (event) {
					_this._socket.send('Hello Server!');
				});
			}
			return this;
		};
		// Listen for messages
		this.message = function (elem){
			if(this._socket){
				this._socket.addEventListener('message', function (event) {
					console.log('Message from server ', event.data);
					alert(`[message] Data received from server: ${event.data}`);
				});
			}
			return this;
		};
		this.closeConnection = function (code, reason){
			if(this._socket){
				this._socket.close(code, reason);
				this._socket.addEventListener('close', function (event) {
					if (event.wasClean) {
						console.log('Server connection was closed successfully!');
						alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
					} else {
						// e.g. server process killed or network down
						// event.code is usually 1006 in this case
						alert('[close] Connection died');
					}
				});
			}
			return this;
		};
		this.error = function(){
			if(this._socket){
				this._socket.onerror = function(error) {
					alert(`[error] ${error.message}`);
				};
			}
		};
		this.terminal = function (socketObj){
			this.ui = $pbd("<div>").css({}).append('<pre id="" class=""></pre><div id="terminal-input-wrapper" class="flex"><input id="terminal-input" class="terminal-input" type="text" /><button id="terminal-submit" class=""> >> </button></div>');
			return this;
		};
		this.gui = function (socketObj){
			//  var secureCb, secureCbLabel;
			var wsUri, consoleLog, connectBut,disconnectBut, sendMessage, sendBut, clearLogBut;
			this.ui = $pbd("<div>").attr({"id":"socket-gui","class":"socket-gui"}).append('<div id="echo">'+
				'<div id="echo-config" style="float: left;">'+
					'<strong>Location:</strong><br>'+
					'<input class="draw-border" id="wsUri" size="35" /><br>'+
					'<div class="flex even">'+
						//'<input class="draw-border echo-checkbox" type="checkbox" id="secureCb" onClick="toggleTls();"><br>'+
						//'<span id="secureCbLabel" style="font-size: smaller; color: black;">Use secure WebSocket (TLS)</span><br>'+
						'<button class="echo-button pad-by-5" id="connect">Connect</button>'+
						'<button class="echo-button pad-by-5" id="disconnect">Disconnect</button>'+
					'</div>'+
					'<br>'+
					'<strong>Message:</strong><br>'+
					'<input class="draw-border" id="sendMessage" size="35" value="Rock it with HTML5 WebSocket" />'+
					'<br>'+
					'<button id="send" class="echo-button wsButton pad-by-5">Send</button>'+
				'</div>'+
				'<div id="echo-log" style="float:left;margin-left:20px;padding-left:20px;width:350px;border-left:solid 1px #cccccc;"> <strong>Log:</strong>'+
					'<div id="consoleLog"></div>'+
					'<button class="echo-button pad-by-5" id="clearLogBut" style="position:relative;top:3px;">Clear log</button>'+
				'</div>'+
			'</div>'+
			'<div class="clear clearfix"></div>'+
			'<br/>'+
			'<h4>Instructions</h4>'+
			'<ol>'+
				'<li>Press the <b>Connect</b> button.</li>'+
				'<li>Once connected, enter a message and press the <b>Send</b> button. The output will appear in the <b>Log</b> section. You can change the message and send again multiple times.</li>'+
				'<li>Press the <b>Disconnect</b> button.</li>'+
			'</ol>'+
			'<strong>Note:</strong> In some environments the WebSocket connection may fail due to intermediary firewalls, proxies, routers, etc.'+
			'<br /><br />').get(0);
			// alert(this.ui.get(0).id);
			document.body.appendChild(this.ui);
			//=========================
			function echoHandlePageLoad(){
				// if (window.WebSocket) {getBy('id','webSocketSupp').style.display = 'block';} else {getBy('id','noWebSocketSupp').style.display = 'block';}
				// secureCb = getBy('id','secureCb');
				// secureCb.checked = false;
				// secureCb.onclick = toggleTlS;

				// secureCbLabel = getBy('id','secureCbLabel')
				wsUri = getBy('id','wsUri');
				initializeLocation();
				// Connect if the user presses enter in the connect field.
				wsUri.onkeypress = function(e){
					if (!e) {e = window.event;}
					var keyCode = e.keyCode || e.which;
					if (keyCode == '13'){
						doConnect();
						return false;
					}
				}
				connectBut = getBy('id','connect');
				connectBut.onclick = doConnect;
				disconnectBut = getBy('id','disconnect');
				disconnectBut.onclick = doDisconnect;
				sendMessage = getBy('id','sendMessage');
				// Send message if the user presses enter in the the sendMessage field.
				sendMessage.onkeypress = function(e){
					if (!e) {e = window.event;}
					var keyCode = e.keyCode || e.which;
					if (keyCode == '13'){
						doSend();
						return false;
					}
				}
				sendBut = getBy('id','send');
				sendBut.onclick = doSend;
				consoleLog = getBy('id','consoleLog');
				clearLogBut = getBy('id','clearLogBut');
				clearLogBut.onclick = clearLog;
				setGuiConnected(false);
				//getBy('id','disconnect').onclick = doDisconnect;
				//getBy('id','send').onclick = doSend;
			}
			function initializeLocation() {
				// See if the location was passed in.
				wsUri.value = getParameterByName('location');
				if (wsUri.value != '') {return;}
				var wsScheme = 'ws:';
				if (window.location.protocol.toString() == 'https:') {
					wsScheme = 'wss:';
					// secureCb.checked = true;
				}
				var wsPort = (window.location.port.toString() == '' ? '' : ':'+window.location.port)
				wsUri.value = wsScheme+'//echo.websocket.org'+wsPort
			}
			function toggleTlS(){
				if (secureCb.checked) {
					wsUri.value = wsUri.value.replace('ws:', 'wss:');
				} else {
					wsUri.value = wsUri.value.replace ('wss:', 'ws:');
				}
			} 
			function getParameterByName(name, url) {
				try{
				if (!url) url = window.location.href;
				name = name.replace(/[\[\]]/g, '\\$&');
				var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i'),
				results = regex.exec(url);
				if (!results) return null;
				if (!results[2]) return '';
				} catch (e){alert(e.stack)}
				return decodeURIComponent(results[2].replace(/\+/g, ' '));
			}
			function doConnect(){
				if (window.MozWebSocket) {
					logErrorToConsole('Info', 'This browser supports WebSocket using the MozWebSocket constructor');
					window.WebSocket = window.MozWebSocket;
				} else if (!window.WebSocket){
					logErrorToConsole('ERROR', 'This browser does not have support for WebSocket');
					return;
				}
				// prefer text messages
				var uri = wsUri.value;
				if (uri.indexOf('?') == -1) {
					uri += '?encoding=text';
				} else {
					uri += '&encoding=text';
				}
				websocket = new WebSocket(uri);
				websocket.onopen = function(evt) { onOpen(evt) };
				websocket.onclose = function(evt) { onClose(evt) };
				websocket.onmessage = function(evt) { onMessage(evt) };
				websocket.onerror = function(evt) { onError(evt) };
			}
			function doDisconnect(){
				websocket.close()
			}
			function doSend(){
				logTextToConsole('SENT: ' + sendMessage.value);
				websocket.send(sendMessage.value);
			}
			function logTextToConsole(text) {
				var span = document.createTextNode(text);
				logElementToConsole(span);
			}
			// label is a string like 'Info' or 'Error'.
			function logErrorToConsole(label, text) {
				var span = document.createElement('span');
				span.style.wordWrap = 'break-word';
				span.style.color = 'red';
				span.innerHTML = '<strong>'+label+':</strong> ';
				var text = document.createTextNode(text);
				span.appendChild(text);
				logElementToConsole(span);
			}
			function logElementToConsole(element) {
				var p = document.createElement('p');
				p.style.wordWrap = 'break-word';
				// p.innerHTML = getSecureTag();
				p.appendChild(element);
				consoleLog.appendChild(p);
				while (consoleLog.childNodes.length > 50){
					consoleLog.removeChild(consoleLog.firstChild);
				}
				consoleLog.scrollTop = consoleLog.scrollHeight;
			}
			function onOpen(evt) {
				logTextToConsole('CONNECTED');
				setGuiConnected(true);
				// For convenience, put the cursor in the message field, and at the end of the text.
				sendMessage.focus();
				sendMessage.selectionStart = sendMessage.selectionEnd = sendMessage.value.length;
			}
			function onClose(evt){
				logTextToConsole('DISCONNECTED');
				setGuiConnected(false);
			}
			function onMessage(evt){
				var span = document.createElement('span');
				span.style.wordWrap = 'break-word';
				span.style.color = 'blue';
				span.innerHTML = 'RECEIVED: ';
				var message = document.createTextNode(evt.data);
				span.appendChild(message);
				logElementToConsole(span);
			}
			function onError(evt){
				logErrorToConsole('ERROR', evt.data);
			}
			function setGuiConnected(isConnected){
				wsUri.disabled = isConnected;
				connectBut.disabled = isConnected;
				disconnectBut.disabled = !isConnected;
				sendMessage.disabled = !isConnected;
				sendBut.disabled = !isConnected;
				// secureCb.disabled = isConnected;
				var labelColor = 'black';
				if (isConnected){labelColor = '#999999';}
				// secureCbLabel.style.color = labelColor;
			}
			function clearLog() {
				while (consoleLog.childNodes.length > 0) {
					consoleLog.removeChild(consoleLog.lastChild);
				}
			}
			function getSecureTag(){
				if (secureCb.checked){
					return '<img src="img/tls-lock.png" width="6px" height="9px"> ';
				} else {
					return '';
				}
			} 
			//window.addEventListener('load', echoHandlePageLoad, false);
			return this;
		};
		this.GUI = this.gui;
		
		return this;
	};
	var sokx = function (url, opts) {
		opts = opts || {};
		var ws, num=0, timer=1, __={};
		var max = opts.maxAttempts || Infinity;
	
		__.open = function () {
			ws = new WebSocket(url, opts.protocols || []);
	
			ws.onmessage = opts.onmessage || noop;
	
			ws.onopen = function (e) {
				(opts.onopen || noop)(e);
				num = 0;
			};
	
			ws.onclose = function (e) {
				e.code === 1e3 || e.code === 1001 || e.code === 1005 || $.reconnect(e);
				(opts.onclose || noop)(e);
			};
	
			ws.onerror = function (e) {
				(e && e.code==='ECONNREFUSED') ? __.reconnect(e) : (opts.onerror || noop)(e);
			};
		};
	
		__.reconnect = function (e) {
			if (timer && num++ < max) {
				timer = setTimeout(function () {
					(opts.onreconnect || noop)(e);
					$.open();
				}, opts.timeout || 1e3);
			} else {
				(opts.onmaximum || noop)(e);
			}
		};
	
		__.json = function (x) {
			ws.send(JSON.stringify(x));
		};
	
		__.send = function (x) {
			ws.send(x);
		};
	
		__.close = function (x, y) {
			timer = clearTimeout(timer);
			ws.close(x || 1e3, y);
		};
	
		__.open(); // init
	
		return __;
	}
	/*function setBG(arr, cfg) {
		var z, i, elmnt=null, file=null,
		_def = {
			backgroundColor : '#ff0000',
			backgroundAttachment : 'fixed', //scroll,fixed,initial,inherit,local,unset
			backgroundSize : "100% 100%", //auto,cover,contain,
        	backgroundPosition : "center center",
            backgroundRepeat : "no-repeat",
            backgroundClip : "no-clip", //no-clip,border-box,content-box,padding-box
            backgroundColor : "transparent"
		};
		cfg = _extendObj(_def, cfg || {});
		z = isArray( arr ) || isArrayLike( arr ) ? arr : _typeof(arr) === "string" ? $all(arr) : $all("[data-background-image]");
		if( !z ) z = document.getElementsByTagName("*");
		if(z.length && z.length > 0){
				
				for (i = 0; i < z.length; i++) {
					elmnt = z[i];
					if(isElement(elmnt)){
						file = elmnt.getAttribute("data-background-image");
						if(file){
							cfg.backgroundImage = "url('"+file+"')";
							Object.assign(elmnt.style, cfg);
							//elmnt.style.cssText += 'background-image:url("'+file+'");background-attachment:fixed;background-position:center;background-repeat:no-repeat;background-size:cover;';
						}
					}
				}
			//}
		} else {
			elmnt = arr;
			if(isElement(elmnt)){
				file = elmnt.getAttribute("data-background-image");
				if(file){
					cfg.backgroundImage = "url('"+file+"')";
					Object.assign(elmnt.style, cfg);
					// elmnt.style.cssText += 'background-image:url("'+file+'");background-attachment:fixed;background-position:center;background-repeat:no-repeat;background-size:cover;';
				}
			}
		}
		return this;
	}; */
	// --------------------- // http://www.iana.org/assignments/http-status-codes/http-status-codes.xml 
	const _HTTPStatus = {
		0: "Offline : Ajax Requests Works On A Server Only!",
		100: "Continue",101: "Switching Protocols",102: "Processing",
		200: "OK",201: "Created",202: "Accepted",
		203: "Non-Authoritative Information",204: "No Content",205: "Reset Content",
		206: "Partial Content",207: "Multi-Status",208: "Already Reported",226: "IM Used",
		300: "Multiple Choices",301: "Moved Permanently",302: "Found",303: "See Other",
		304: "Not Modified",305: "Use Proxy",306: "Reserved",
		307: "Temporary Redirect",308: "Permanent Redirect",
		400: "Bad Request",401: "Unauthorized",402: "Payment Required",
		403: "Forbidden",404: "Not Found",405: "Method Not Allowed",
		406: "Not Acceptable",407: "Proxy Authentication Required",
		408: "Request Timeout",409: "Conflict",410: "Gone",411: "Length Required",
		412: "Precondition Failed",413: "Request Entity Too Large",
		414: "Request-URI Too Long",415: "Unsupported Media Type",
		416: "Requested Range Not Satisfiable",417: "Expectation Failed",
		422: "Unprocessable Entity",423: "Locked",424: "Failed Dependency",
		425: "Unassigned",426: "Upgrade Required",427: "Unassigned",
		428: "Precondition Required",429: "Too Many Requests",
		430: "Unassigned",431: "Request Header Fields Too Large",
		500: "Internal Server Error",501: "Not Implemented",502: "Bad Gateway",
		503: "Service Unavailable",504: "Gateway Timeout",
		505: "HTTP Version Not Supported",506: "Variant Also Negotiates (Experimental)",
		507: "Insufficient Storage",508: "Loop Detected",509: "Unassigned",
		510: "Not Extended",511: "Network Authentication Required"
	}; 
	_pbd.active = 0;
	_pbd.prototype.xhr = _pbd.xhr = {
		__proto__ : _pbd,
		//constructor : function (){},
		XHR_Obj : false,
		XHR_Url : null,
		progressBar : false,
		progressBarExists : false,
		responseContent : null,
		active: 0,
		lastModified: {},// Last-Modified header cache for next request
		etag: {},
		validMethods : ["get", "post", "put", "delete", "head"],
		validResposeType : ["arrayBuffer", "blob", "document", "json", "text"],
		//isValidMethod : !!inArray(this.validMethods, this.ajaxSettings.method) ,
		//isValidResponseType : !!inArray(this.validResponseTypes, this.ajaxSettings.responseType) ,
		ajaxSettings: {
			url: location.href,
			isLocal: rlocalProtocol.test( location.protocol ),
			method : 'GET',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			data: null,
			postData : null,
			dataType : false,//html
			dataTypeCallback : false,
			// dataTypeCallback : {'md': function(str,el){return marked(str,el) || el.innerHTML = marked(str);}} 
			mimeType : false,// "text/html";
			responseType: null,
			timeout : 0,
			headers : {},
			// validMethods : ["get", "post", "put", "delete"],
			username: false,
			password: false,
			throws: false,
			global: true,
			cache : false,
			async: true,
			isUpload : false,
			processData : false,
			bodyOnly : false,
			crossDomain : false,
			showProgressBar : false,
			// callbacks 
			before : false,
			success : false,
			error : false,
			completed: false,
			then : false
			// Add custom fields to xhr object
			//,xhrFields : {}
		},
		util : _pbd.util(),
		init_XHR : function (){
			if(!this.XHR_Obj && typeof XMLHttpRequest !== 'undefined') {try {this.XHR_Obj = new XMLHttpRequest();} catch (e) {this.XHR_Obj=false;}}
			if(!this.XHR_Obj && window.ActiveXObject){var versions = ["MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"];for(var i = 0, len = versions.length; i < len; i++) {try {this.XHR_Obj = new ActiveXObject(versions[i]);break;}catch(e){};}}
			if (!this.XHR_Obj && window.createRequest) {try {this.XHR_Obj = window.createRequest();} catch (e) {this.XHR_Obj=false;}}
			return this.XHR_Obj;
		},
		support_ajax_upload_with_progress : function () {
			function supportFileAPI() {var fi = document.createElement('INPUT');fi.type = 'file';return 'files' in fi;};
			function supportAjaxUploadProgressEvents() {var xhr = new XMLHttpRequest();return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));};
			function supportFormData() {return !! window.FormData;}
			return supportFileAPI() && supportAjaxUploadProgressEvents() && supportFormData();
		},
		open_req : function (url, targetId,opts) {
			var _this = this, timeoutTimer,
			elem = ("ajaxContainer" in opts) ? ( isElement(opts.ajaxContainer) ? opts.ajaxContainer : isString(opts.ajaxContainer) ? $all(opts.ajaxContainer) : false) : isElement(targetId) ? targetId : $all(targetId);
			if(!elem || !isElement(elem)) return false;
			this.init_XHR();
			if(!this.XHR_Obj) return false;
			if ( typeof url === "object" ) {
				opts = url;
				url = opts.url || undefined;
			}
			// Force options to be an object
			var opt = _extendObj( this.ajaxSettings,opts );
			opt.method = opt.method.toUpperCase();
				
			// if (!opt.crossDomain && !opt.headers["X-Requested-With"]){opt.headers["X-Requested-With"] = "XMLHttpRequest";} 
			url = ( ( url || location.href ) + "" ).replace( rhash, "" ).replace( rprotocol, location.protocol + "//" );
		    if(opt.postData != null && rget.test(opt.method)) {
				var had = url.indexOf("?") > -1;
				if (!had) {
					url += "?";
				}
				var first = true;
				for (var key in opt.postData) {
					if (opt.postData.hasOwnProperty(key) && typeof opt.postData[key] === "string") {
						if (first && !had) {
							url += encodeURIComponent(key) + "=" + encodeURIComponent(opt.postData[key]);
						} else {
							url += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(opt.postData[key]);
						}
						first = false;
					}
				}
			}
			cacheURL = url;
		
			if (opt.cache === false) {
				url = rts.test(cacheURL) ?
					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :
					// Otherwise add one to the end
					cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
			    url = url + (rquery.test(url) ?'&':'?') + "nocache=" +  Math.random();
		        //url = url +  "?nocache=" +  Math.random();
			}
			this.XHR_Url = url;
			////__pbd_self.$$(targetId||elem).css({display:'block'});
			this.util.styleElement(elem,{display:'block'});
			//wait(targetId||e);
			if(opt.before || opt.beforeSend) {
				var callbackFunction = opt.before || opt.beforeSend;
				var callbackParams = [tmp,this.XHR_Obj,url,elem];//var callbackParams = [tmp,url,elem];
				if(typeof callbackFunction === "function") tmp = this.responseContent = callbackFunction.apply(null,callbackParams);
				else{
					var fn = window[callbackFunction];
					if(typeof fn === "function") tmp = this.responseContent = fn.apply(null,callbackParams);
				}
			}
			// Open the socket
			// Passing null username, generates a login popup on Opera (#2865)
			if ( opt.username ) {
				this.XHR_Obj.open( opt.method, url, opt.async, opt.username, opt.password );
			} else {
				this.XHR_Obj.open(opt.method, url, opt.async);
			}
			
			this.active++;
			// Apply custom fields if provided
			if ( opt.xhrFields ) {
				for ( i in opt.xhrFields ) {
					this.XHR_Obj[ i ] = opt.xhrFields[ i ];
				}
			}
			// Override mime type if needed
			if ( opt.mimeType) {
				this.XHR_Obj.overrideMimeType( opt.mimeType );
			}
			// Force "Connection: close" for older Mozilla browsers to work around a bug where XMLHttpRequest sends an incorrect Content-length header. See Mozilla Bugzilla #246651.
			//if (this.XHR_Obj.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005) opt.headers['Connection'] = 'close';
			//this.XHR_Obj.setRequestHeader('Connection','close');
			
			this.XHR_Obj.setRequestHeader("Accept", opt.dataType && opt.accepts[ opt.dataType ] ? opt.accepts[ opt.dataType ] + ( opt.dataType !== "*" ? ", " + allTypes + "; q=0.01" : "" ) : opt.accepts[ "*" ]);
	        if(!isEmptyObject(opt.headers)){
			    // Check for headers option
			    for( var name in opt.headers ) {
					this.XHR_Obj.setRequestHeader( name, opt.headers[ name ] );
			    }
			}
			// if(opt.isUpload) {
				//_Pbd.event.add(this.XHR_Obj.upload,"progress", updateProgress, false);
				//_pbd.event.add(xhr,"load", () => {
				// this.progressBarContainer.className += " uploaded";
				// this.progressBar.innerHTML = "Uploaded!";
			// }, false);
			//}
			if(opt.showProgressBar){
				if(!this.progressBarExists) this.createProgressBar();
				if(this.progressBar.classList.contains('failure')) this.progressBar.classList.remove('failure');
				if(this.progressBar.classList.contains('loading')) this.progressBar.classList.remove('loading');
				this.XHR_Obj.onloadstart = (e) => {
					//this.appStyle.addClass(this.progressBar,'loading');//progressBar.className += ' loading';
					this.progressBar.classList.add('loading');//progressBar.className += ' loading';
				};
				//this.XHR_Obj.upload.onprogress = this.update_progress;
				this.progressBar.style.width = Number(0);
				this.XHR_Obj.onprogress  = (ev) => {
					if (this.progressBar && ev.lengthComputable) {
						pc = ((ev.loaded / ev.total) * 100);//pc = parseInt(100 - (ev.loaded / ev.total * 100));
						this.util.styleElement(this.progressBar,{opacity:1,display:'block',width:pc + '%',transition:'width linear 1200ms'});
						this.progressBar.innerHTML = pc + "%";//progressBar.innerHTML += ' - ' + file.name + " Uploaded! ";
					} else this.util.styleElement(this.progressBar,{opacity:1,display:'block',width:'100%',transition:'width linear 2000ms'});
				};
				// this.XHR_Obj.onloadend = function(e) {this.progressBar.style.opacity = 0.4;};
			}
			//Note that if you want to POST data, you may have to set the MIME type of the request. For example, use the following before calling send() for form data sent as a query string:
			// Set appropriate headers 
			if(opt.method === "post" || opt.method.toUpperCase === "POST") {
				this.XHR_Obj.setRequestHeader('Content-Type', opt.contentType);
				this.XHR_Obj.onreadystatechange = () => { this.post_response(url, elem,opt); }
			} else {
				this.XHR_Obj.onreadystatechange = () => { this.get_response(url, elem,opt); }
			}
			// Timeout
			if ( opt.async && opt.timeout && opt.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {_this.XHR_Obj.abort( "timeout" );}, opt.timeout );
			}
			try{
				this.XHR_Obj.send(opt.postData);
			} catch(l){
				__pbd.cleanElementInsert(elem,document.createTextNode("request failed , here's why : "+l));
				//while(e.firstChild) e.removeChild(e.firstChild); //e.innerHTML="" the standard way
				//e.appendChild(document.createTextNode("request failed"));
			}
			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}
		},
		get_response : function (url, elem, opt) {
			if(!this.XHR_Obj || this.XHR_Obj.readyState != 4) {if(this.active > 0) {this.active = (this.active - 1);}return this;}
			var tmp, _this = this, _random = Math.random();
			var ext = this.util.get.ext(url);
			if(this.XHR_Obj.status == 200 || this.XHR_Obj.status == 0) {
				if(opt.processData == true){
					tmp = this.process_request(this.XHR_Url,opt,this.XHR_Obj);
				} else tmp = this.XHR_Obj.responseText;
				
				if(opt.ajaxSettings.dataTypeCallback&&isObject(opt.ajaxSettings.dataTypeCallback)){
					if(opt.ajaxSettings.dataTypeCallback[ext]&&isFunction(opt.ajaxSettings.dataTypeCallback[ext])){
						var dataTypeCallback_fn = opt.ajaxSettings.dataTypeCallback[ext];
						tmp = dataTypeCallback_fn(tmp);
					}
				}
				
				if(opt.success) {
					var callbackFunction = opt.success;
					var callbackParams = [tmp,this.XHR_Obj,url,elem,opt.success];//var callbackParams = [tmp,url,e];
					if(typeof callbackFunction === "function") tmp = this.responseContent = callbackFunction.apply(null,callbackParams);
					else{
						var fn = window[callbackFunction];
						if(typeof fn === "function") tmp = this.responseContent = fn.apply(null,callbackParams);
					}
				}
				if(opt.completed) {
					var callbackFunction = opt.completed;
					var callbackParams = [tmp,this.XHR_Obj,url,elem,opt.completed];//var callbackParams = [tmp,url,e];
					if(typeof callbackFunction === "function") tmp = this.responseContent = callbackFunction.apply(null,callbackParams);
					else{
						var fn = window[callbackFunction];
						if(typeof fn === "function") tmp = this.responseContent = fn.apply(null,callbackParams);
					}
				}
				document.title = 'Currently Viewing : '+__pbd_self.getFilename(url,true);
			} else {
				document.title = '404 : ['+this.util.get.filename(url,true) +'] Not Found';
				tmp = "Ooops!! A broken link! Please contact the webmaster of this website ASAP and give him the following error code: " + this.XHR_Obj.status+" "+this.XHR_Obj.statusText+",URL: "+this.XHR_Obj.responseURL;
				if(opt.showProgressBar){
					if(!this.progressBarExists) this.createProgressBar();
						//this.appStyle.addClass(this.progressBar,'failure');
					this.progressBar.classList.add('failure');
					this.util.styleElement(this.progressBar,{width:'100%',transition:'width linear 1s'})
				}
			}
			var d = Object.assign(document.createElement("div"),{"id" : ('_responseContent_'+_random).replace('.','_'),"class" : '_responseContent',"style" : 'position:absolute;display:block;margin:0;padding:0;overflow:auto;width:100%;height:auto;min-height:99%;'});
			d.innerHTML = tmp;
			setTimeout(function(){
				_pbd.cleanElementInsert(elem,d);
				if(isArrayLike(elem) || isArray(elem)||(elem.length && elem.length > 0)) {
					_pbd.each(elem,function(i){
						if(elem[i] && isElement(elem[i])){
							d.style.cssText += 'max-width:'+ _this.util.get.elementStyle(elem[i]).width+';';
						}
					});
 	           } else {
					d.style.cssText += 'max-width:'+ _this.util.get.elementStyle(elem).width+';';
				}
			},10);
			if (this.active > 0) {
				this.active = (this.active - 1);
			}
		},
		post_response : function (url, elem, opt) {
			if(!this.XHR_Obj || this.XHR_Obj.readyState != 4){if(this.active > 0){this.active = (this.active - 1);}return this;}
			var tmp, _this = this, _random = Math.random();
			if(this.XHR_Obj.status == 200 || this.XHR_Obj.status == 0) {
				if(opt.processData == true){
					var ext = this.util.get.ext(url);
					var isJSON = (opt.dataType && opt.dataType == 'json' ? true : ext.toLowerCase() == "json");	
					var isXML = (opt.dataType && opt.dataType == 'xml' ? true : ext.toLowerCase() == "xml");
					var isFEED =  ext.toLowerCase() == "atom";	
					if( isXML || isFEED ) tmp = this.util.parse.xml(this.XHR_Obj.responseText);
					else if(isJSON) tmp = this.util.parse.json(this.XHR_Obj.responseJSON ? this.XHR_Obj.responseJSON : this.XHR_Obj.responseText);
					else tmp = this.XHR_Obj.responseText;
				} else tmp = this.XHR_Obj.responseText;
				if(opt.success) {
					var callbackFunction = opt.success;
					var callbackParams = [tmp,this.XHR_Obj,url,elem,opt.success];//var callbackParams = [tmp,url,e];
					if(typeof callbackFunction === "function") tmp = this.responseContent = callbackFunction.apply(null,callbackParams);
					else{
						var fn = window[callbackFunction];
						if(typeof fn === "function") tmp = this.responseContent = fn.apply(null,callbackParams);
					}
				}
			} else {
				document.title = '404 : ['+ this.util.get.filename(url,true) +'] Not Found';
				tmp = "Ooops!! A broken link! Please contact the webmaster of this website ASAP and give him the following error code: " + this.XHR_Obj.status+" "+this.XHR_Obj.statusText+",URL: "+this.XHR_Obj.responseURL;
				if(opt.showProgressBar){
					if(!this.progressBarExists) this.createProgressBar();
					//progressBar = this.progressBar || $$('#progress_bar');
					//this.addClass(this.progressBar,'failure');
					this.progressBar.classList.add('failure');
					this.util.styleElement(this.progressBar,{width:'100%',transition:'width linear 1s'})
				}
			}
			var d = Object.assign(document.createElement("div"),{"id" : ('_responseContent_'+_random).replace('.','_'),"class" : '_responseContent',"style" : 'margin:0;padding:0;overflow:auto;height:auto;min-height:99%;max-width:'+ this.util.elementStyle(elem).width+';'});
			d.innerHTML = tmp;
			//this.wallpaper(d,{image:__pbd_self.settings.wallpaper.bgImg,bgSize:'cover',bgColor:'#000'});
			setTimeout(function(){
				_pbd.cleanElementInsert(elem,d);
				if(isArrayLike(elem) || isArray(elem)||(elem.length && elem.length > 0)) {
					_pbd.each(elem,function(i){
						if(elem[i] && isElement(elem[i])){
							d.style.cssText += 'max-width:'+ _this.util.get.elementStyle(elem[i]).width+';';
						}
					});
 	           } else {
					d.style.cssText += 'max-width:'+ _this.util.get.elementStyle(elem).width+';';
				}
			},10);
			if (this.active > 0) {
				this.active = (this.active - 1);
			}
		},
		create_progress_bar : function () {
			if(!this.progressBarExists){
				this.progressBar = this.util.tag('div',{id:'progress_bar','class':'window_progressbar',style:'position:fixed;top:0;display:block;margin:0;padding:0;height:2.5px;box-shadow:0 1px 15px 0 rgba(0,0,0,0.6),0 3px 2px 0 rgba(0,0,0,0.19);'});
				document.body.appendChild(this.progressBar);
				//progressBar.parentNode.insertBefore(document.body.children[0],progressBar.nextSibling);
			 	//document.body.appendChild(this.progressBar);
				this.progressBarExists = true;
			}
		},
		call_in_progress : function() {switch ( this.XHR_Obj.readyState ) {case 1: case 2: case 3:return true;break;default:return false;break;}return this;},
		abort_request : function(reportTimeout) {if ( this.call_in_progress() ) {this.XHR_Obj.abort();if(reportTimeout&& isFunction(reportTimeout))reportTimeout();}return this;},
		exec_JS : function(node) {
			var strExec,st = node.getElementsByTagName('SCRIPT'),
			bSaf = (navigator.userAgent.indexOf('Safari') != -1),
			bOpera = (navigator.userAgent.indexOf('Opera') != -1);
			bMoz = (navigator.appName == 'Netscape');
			for(var i=0;i<st.length; i++) {
				if (bSaf) {
					strExec = st[i].innerHTML;
				} else if (bOpera) {
					strExec = st[i].text;
				} else if (bMoz) {
					strExec = st[i].textContent;
				} else {
					strExec = st[i].text;
				}
				try{
					eval(strExec);
				} catch(e){
					alert(e);
				}
			}
			return this;
		},
		display_result : function(targetElem,result){
			if(targetElem.length > 0){
				targetElem.forEach( (elem) => {
					if( isElement(elem) ) elem.innerHTML = result;
				});
			} else {
				var _id = ('_responseContent_'+_random).replace('.','_'),
				d = this.util().tag("div",{"id" : _id,"class" : "_responseContent", "style":'position:absolute;display:block;margin:0;padding:0;overflow:auto;width:100%;height:auto;min-height:99%;'});
				d.innerHTML = result;
				setTimeout(function(){
					_pbd.cleanElementInsert(elem,d);
					if(isArrayLike(elem) || isArray(elem)||(elem.length && elem.length > 0)) {
						_pbd.each(elem,function(i){
							if(elem[i] && isElement(elem[i])){
								d.style.cssText += 'max-width:'+ _this.util.get.elementStyle(elem[i]).width+';';
							}
						});
					} else {
						d.style.cssText += 'max-width:'+ _this.util.get.elementStyle(elem).width+';';
					}
				},10);
			}
			return this;
		},
		process_request: function (url,opt,xhr) {
			var tmp, ext = this.util.get.ext(url), nameOnly = this.util.get.filename(url);
			if( xhr.responseType.toLowerCase() === "document" ){
				tmp = this.util.get.body(xhr.responseText);
			} else if( xhr.responseType.toLowerCase() === "blob" || xhr.responseType.toLowerCase() === "arraybuffer" ){
				xhr.timeout = 9999999;
				var isImage = ((opt.dataType && opt.dataType == 'image') || (opt.mimeType && opt.mimeType.indexOf("image") == 0)) ? true : rimage.test(ext);
				if( isImage ){
					var arrayBuffer = xhr.response || xhr.responseText;
					// if you want to access the bytes:
					var byteArray = new Uint8Array(arrayBuffer);
					// If you want to use the image in your DOM:
					var blob = new Blob([arrayBuffer], {type: opt.mimeType || "image/png"});
					var url = this.util.url.createURL(blob);
					tmp = url;
					this.util.url.revokeURL(url);
				} else {
					
				}
			} else if( xhr.responseType === "" || xhr.responseType.toLowerCase() === "text" || xhr.responseType.toLowerCase() === "json" || xhr.responseType.toLowerCase() === "xml" ){
				//var xmlext = url.substr(url.length - 3);//var jsonext = url.substr(url.length - 4);
				var isFEED =  ext.toLowerCase() == "atom";
				var isScript = rscript.test(ext);
				var isHTML = ((opt.dataType && opt.dataType == 'html') || (opt.mimeType && opt.mimeType.indexOf('html') == 0)) ? true : (ext.toLowerCase() == "html" || ext.toLowerCase() == "htm");
				var isJSON = ((opt.dataType && opt.dataType == 'json') || (opt.mimeType && opt.mimeType.indexOf('json') == 0)) ? true : ext.toLowerCase() == "json";	
				var isXML = ((opt.dataType && opt.dataType == 'xml') || (opt.mimeType && opt.mimeType.indexOf('xml') == 0)) ? true : ext.toLowerCase() == "xml";
				var isImage = ((opt.dataType && opt.dataType == 'image') || (opt.mimeType && opt.mimeType.indexOf("image") == 0)) ? true : rimage.test(ext);
				var isMARKDOWN = (opt.dataType && opt.dataType == 'text') ? true : (ext.toLowerCase() == "md" || ext.toLowerCase() == "txt");
				if( isMARKDOWN ) {
					// strip leading whitespace so it isn't evaluated as code
					var leadingWs = xhr.responseText.match(/^\n?(\s*)/)[1].length,
					leadingTabs = xhr.responseText.match(/^\n?(\t*)/)[1].length;
					if( leadingTabs > 0 ) {
						var text = xhr.responseText.replace( new RegExp('\\n?\\t{' + leadingTabs + '}','g'), '\n' );
					} else if( leadingWs > 1 ) {
						var text = xhr.responseText.replace( new RegExp('\\n? {' + leadingWs + '}','g'), '\n' );
					} else var text = xhr.responseText;
					
					if(showdown && typeof showdown !== 'undefined') {
						var converter = new showdown.Converter({ghCompatibleHeaderId:true,tables:true,extensions: ['prettify']});
						var html = converter.makeHtml(text);
						tmp = '<div style="padding:4px;">'+html+'</div>';
					} else if(micromarkdown && isFunction(micromarkdown) ) tmp = '<div style="padding:4px;">'+micromarkdown.parse(text)+'</div>';
					else tmp = '<div style="padding:4px;">'+xhr.responseText+'</div>';
				} else if( isXML || isFEED ) {try{tmp = parseXML(xhr.responseXML ? xhr.responseXML : xhr.responseText)}catch(e){tmp = _this.util().formatException(e);}}
				else if( isJSON ) {try{tmp = parseJSON(xhr.responseJSON ? xhr.responseJSON : xhr.responseText);}catch(e){tmp = _this.util().formatException(e);}}
				else if( isImage ) tmp = '<img src="'+url+'" alt="'+nameOnly+'" style="top:40%;right:25%;bottom:40%;left:25%;width:auto;height:auto;margin:auto;border:1px dotted #ff0009;"/>';
				else if( isScript ) tmp = '<pre style="height:auto;overflow:auto;background:#e0f6ff;color:#000;padding:20px 30px 20px;margin:10px auto;font-family:Monaco,\'Lucida Console\',\'Courier New\',Courier,Monospace;font-size:12px">'+xhr.responseText+'<\/pre>'; 
				else if( isHTML ) {
					if(isSet(opt.bodyOnly) && opt.bodyOnly) tmp = _this.util().get_body(xhr.responseText);
					else tmp = xhr.responseText;
				} else tmp = '<pre>'+xhr.responseText+'</pre>';
			}
			return tmp;
		},
		supports : function () {return 'XMLHttpRequest' in window && 'JSON' in window && 'Promise' in window;},
			//Merge two or more objects together.
		extend : function () {
			var extended = {};
			// Merge the object into the extended object
			var merge = function (obj) {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
							extended[prop] = extend(extended[prop], obj[prop]);
						} else {
							extended[prop] = obj[prop];
						}
					}
				}
			};
			// Loop through each object and conduct a merge
			for (var i = 0; i < arguments.length; i++) {
				var obj = arguments[i];
				merge(obj);
			}
			return extended;
		},
		// Parse text response into JSON
		// @return {Array}  A JSON Object of the responseText, plus the orginal response
		parse : function (req) {
			var result;
			if (this.ajaxSettings.responseType !== 'text' && this.ajaxSettings.responseType !== '') {
				return {data: req.response, xhr: req};
			}
			try {
				result = JSON.parse(req.responseText);
			} catch (e) {
				result = req.responseText;
			}
			return {data: result, xhr: req};
		},
		// Convert an object into a query string
		param : function (obj) {
			// If already a string, or if a FormData object, return it as-is
			if (typeof (obj) === 'string' || Object.prototype.toString.call(obj) === '[object FormData]') return obj;
			// If the content-type is set to JSON, stringify the JSON object
			if (/application\/json/i.test(settings.headers['Content-type']) || Object.prototype.toString.call(obj) === '[object Array]') return JSON.stringify(obj);
			// Otherwise, convert object to a serialized string
			var encoded = [];
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					encoded.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
				}
			}
			return encoded.join('&');
		},
		push : function(objectOrKey, value) {
			switch (typeof objectOrKey){
				case 'object': this.ajaxSettings.data = Object.assign(objectOrKey, this.ajaxSettings.data); break;
				case 'string': this.ajaxSettings.data =  Object.assign({ [objectOrKey] : value}, this.ajaxSettings.data); break;
			}
			return this;
		},
		// AJAX Methods 
		// Push data (key and value) or object
		set_data : function(objectOrKey, value) {this.push(objectOrKey, value);return this;},
		// Set URL
		set_url : function(url) {this.ajaxSettings.url=url;this.XHR_Obj.responseURL = url;return this;},
		// Set method (POST or GET)
		set_method : function(method) {method = method.toUpperCase();this.ajaxSettings.method = inArray(method,this.validRequestMethods) ? method : "GET";return this;},
		// Set mine type
		set_mime_type : function( type ) {if ( this.completed == null ) {this.ajaxSettings.mimeType = type;}return this;},
		// Set request header
		set_header : function (key , value){this.XHR_Obj.setRequestHeader(key,value);return this;},
		vowAll : function(arr, callbackAll) {
			// object store of responses
			var objResolved = {};
			arr.forEach(function(obj, index) {
				// null "placeholder"
				objResolved[index] = null;
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						// replace null with response, 
						// if response is 404/403 etc, replace null with undefined
						// optional request callback
						objResolved[index] = xhr.status == (obj.status || 200) ? (obj.callback ? obj.callback(xhr.responseText) : xhr.responseText) : undefined;
						var allResolved = true;
						// loop through all responses
						for (var key in objResolved) {
							if (objResolved[key] === null) {
								// if any are unresolved, 
								// prevent the callbackAll function from firing
								allResolved = false;
							}
						}
						// "Promise.all" callback when all requests have been resolved
						allResolved && callbackAll(objResolved);
					}
				};
				xhr.open(obj.method || "GET", obj.url, true);
				for (var key in obj.headers) {
					xhr.setRequestHeader(key, obj.headers[key]);
				}
				xhr.send(obj.body);
			});
		},
		addEventHandler:function(c,a,b){if(c.addEventListener){c.addEventListener(a,b,false)}else{if(c.attachEvent){c.attachEvent("on"+a,b)}else{c["on"+a]=b}}},
		removeEventHandler:function(c,a,b){if(c.removeEventListener){c.removeEventListener(a,b,false)}else{if(c.detachEvent){c.detachEvent("on"+a,b)}else{c["on"+a]=null}}},
		triggerEvent:function(b,a){if(document.createEvent){var c=document.createEvent("HTMLEvents");c.initEvent(a,true,false);b.dispatchEvent(c)}else{b.fireEvent("on"+a)}},
		ajax_call : function(d){
			var _this = this;
			if(d==null||d.url==""||d.data==""||d.type==""){
				console.log("ajaxPost: Parameters can't be empty");
				return false
			}
			if(d.crossDomain==true&&typeof XDomainRequest!="undefined"){var c=new XDomainRequest()}else{var c=new XMLHttpRequest()}
			var b=new CustomEvent("ajaxSuccess");
			var f=new CustomEvent("ajaxFail");
			var g=(d.type)?d.type.toUpperCase():"GET";
			var e="";
			for(var a in d.data){
				if(e!=""){e+="&"}
				e+=a+"="+encodeURIComponent(d.data[a])
			}
			if(g==="GET"){
				if(d.cache==false){
					d.url+="&timestamp="+Date.now()
				}else{
					d.url=d.url+"?"+e
				}
			}
			c.open(g,d.url,true,d.username||null,d.password||null);
			if(d.dataType!=""&&typeof d.dataType=="string"){c.responseType=d.dataType}else{c.responseType="json"}
			if(c instanceof XMLHttpRequest){
				c.setRequestHeader("X-Requested-With","XMLHttpRequest");
				c.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
			}
			if(d.headers){
				if(!Object.keys){
					Object.keys=function(k){var j=[];for(var h in k){if(k.hasOwnProperty(h)){j.push(h)}}return j}
				}
				Object.keys(d.headers).forEach(function(h){c.setRequestHeader(h,d.headers[h])})
			}
			if(d.cache=="false"&&g=="POST"){c.setRequestHeader("cache-control","no-cache")}
			if(d.xhrFields){
				for(i in d.xhrFields){c[i]=d.xhrFields[i]}
			}
			if(typeof d.beforeSend=="function"&&(d.beforeSend()===false)){return c.abort()}
			c.onreadystatechange=function(){
				var h={};
				if(c.readyState==4){
					if(c.status>=200&&c.status<400){
						try{h=JSON.parse(c.responseText)}catch(j){h=c.response}
						if(typeof d.success=="function"){
							if(c instanceof XMLHttpRequest){
								d.success(h, c)
							}else{
								c.onload(function(){d.success(h, c)})
							}
						}
						c.dispatchEvent(b)
					}else{
						c.dispatchEvent(f);
						h={error:"Error getting data from AJAX call"}
					}
				}
				if(h!=null&&typeof h.error!="undefined"){console.log("ajaxPost: "+h.error);return false}
			};
			c.send(e);
			c.done=function(h){
				if(typeof h=="function"){
					if(c instanceof XMLHttpRequest){
						_this.addEventHandler(c,"ajaxSuccess",h)
					}else{
						c.onload=h()
					}
				}
			};
			c.fail=function(h){
				if(typeof h=="function"){
					if(c instanceof XMLHttpRequest){_this.addEventHandler(c,"ajaxFail",h)}else{c.onerror=h()}
				}
			};
			c.always=function(h){
				if(typeof h=="function"){
					if(c instanceof XMLHttpRequest){
						_this.addEventHandler(c,"ajaxSuccess",h);
						_this.addEventHandler(c,"ajaxFail",h);
					}else{
						c.onload=h();
						c.onerror=h();
					}
				}
			};
			return c;
		},
    	ajaxPromise : function(settings=undefined) {
			try{
			var _this = this, completed;
			var params = {};
			switch (typeof settings) {
				case 'string' : params.url = settings; break
				case 'object' : params = settings; break;
			}
			/*if (!('method' in params)) params.method = 'GET';
			if (!('mime' in params) || !('mimeType' in params)) params.mimeType = 'text/html';
			if (!('processData' in params)) params.processData = false;
			if( !('crossDomain' in params) ) params.crossDomain = false;*/
			// Create the data key for future use
			if (!('data' in params)) params.data = this.ajaxSettings.method.toLowerCase() === 'post' ? {} : null;
			if (!('headers' in params)) params.headers = {};
			if (!('ajaxElement' in params) || !('target' in params) || !('targetElement' in params)) params.target = this.nodes;
			if( !isNil(params.target) ) params.target = isElement(params.target) ? params.target : $all(params.target);
			if(!("showProgressBar" in params)) params.showProgressBar = false;
			if(!("dataTypeCallback" in params)) params.dataTypeCallback = false;
			//if (!('success' in params)) params.success = success;
			// if (!('error' in params)) params.error = error;
			
			this.ajaxSettings = _extendObj( this.ajaxSettings, params );
			// Promise resolve and reject
			let promise = {
				resolve: function (result){alert("request has been successful <br> "+result.responseText)},
				reject:function (err){alert("an error has been detected - <br> "+err.statusText)}
			}
			// HTTP request object
			this.init_XHR();
			var request = this.XHR_Obj;
			//this.XHR_Obj.responseURL = this.ajaxSettings.url;
			this.active = (this.active + 1);
			//--------------
			// Variables
			var settings,
			// Default settings
			defaults = {
				method: 'GET',
				username: null,
				password: null,
				data: {},
				headers: {
					'Content-type': 'application/x-www-form-urlencoded'
				},
				responseType: 'text',
				timeout: null,
				withCredentials: false
			};
			// Methods
			// Send a POST Request
			var post = function(data) {this.ajaxSettings.method='POST';return send(data);}
			// Send a GET Request
			var get = function(data) {this.ajaxSettings.method='GET';return send(data);}
			// GET JSON Formatted Request
			var getJSON = function(data) {this.ajaxSettings.method='GET';request.responseType = "json";return send(data);}
			var mime = function (t){_this.set_mime_type(t);return this;}
			var method = function (m){_this.set_method(m);return this;}
			var header = function (hk, hv){_this.set_header(hk, hv);return this;}
			var url = function (u){_this.set_url(u);return this;}
			var data = function (dk, dv){_this.set_data(dk, dv);return this;}
			var before = function (fn){_this.ajaxSettings.before = fn;return this;}
			var success = function (cb){if (request.readyState === 4 && request.status === 200) {cb(request.responseText,request);}return this;};
			var error = function (errObj){var vMsg, nStatus = request.status;vMsg = nStatus + ": " + (_HTTPStatus[nStatus] || "Unknown");if (request.status<200 || request.status>299) {errObj(vMsg, request);}return this;};
			// Send request and return a promise
			var send = function(data) {
				if (_this.active > 0) {
					_this.active = (_this.active - 1);
				}
				_this.push(data);
				//request.onreadystatechange = callBack;
				// request.onreadystatechange = function (e){
				var loadReady = request.responseType.toLowerCase() === "blob" || request.responseType.toLowerCase() === "arraybuffer" ? "onload" : "onreadystatechange";
				request[ loadReady ] = function (){
					// if(this.readyState != 4) {if(_this.active > 0) {_this.active = (_this.active - 1);}return this;}
					var tmp, fireSuccess = true, ajaxMsg, _random = Math.random(), 
					target = _typeof(_this.ajaxSettings.target) === "object" && isElement(_this.ajaxSettings.target) ? this.ajaxSettings.target : _this.nodes, 
					ext = _this.util.get.ext(_this.ajaxSettings.url);
					callbacks = [];
					if (this.readyState === 4 && this.status === 200) {
						tmp = request.responseType.toLowerCase() === "blob" || request.responseType.toLowerCase() === "arraybuffer" ? this.response : this.responseText;
						if(_this.ajaxSettings.processData === true){
							tmp = _this.process_request(_this.XHR_Url, _this.ajaxSettings, _this.XHR_Obj);
						}
						if(_this.ajaxSettings.dataTypeCallback&&isObject(_this.ajaxSettings.dataTypeCallback)){
							if(_this.ajaxSettings.dataTypeCallback[ext] && isFunction(_this.ajaxSettings.dataTypeCallback[ext])){
								var dataTypeCallback_fn = _this.ajaxSettings.dataTypeCallback[ext];
								tmp = dataTypeCallback_fn(tmp, target, request);
								// tmp = dataTypeCallback_fn.apply(null,[tmp, target, request]);
								fireSuccess = false;
							}
						}
						if(fireSuccess && _this.ajaxSettings.success) {
							var callbackFunction = _this.ajaxSettings.success;
							var callbackParams = [tmp, target, _this.XHR_Obj, params.url, params.success];//var callbackParams = [tmp,url,e];
							if(typeof callbackFunction === "function") tmp = _this.responseContent = callbackFunction.apply(null,callbackParams);
							else{
								var fn = window[callbackFunction];
								if(typeof fn === "function") tmp = _this.responseContent = fn.apply(null,callbackParams);
							}
						} else _this.display_result(target,tmp);
						completed = true;
						//document.title = 'Currently Viewing : '+__pbd_self.getFilename(url,true);
					} else if (this.readyState === 4 && (this.status < 200 || this.status > 299 ) ){
						var nStatus = this.status;
						ajaxMsg = nStatus + ": " + (_HTTPStatus[nStatus] || "Unknown");
						//document.title = '404 : ['+__pbd_self.getFilename(url,true) +'] Not Found';
						tmp = "Ooops!! A broken link! Please contact the webmaster of this website ASAP and give him the following error code: " + this.status+" "+this.statusText+",URL: "+this.responseURL+"<br>"+ajaxMsg;
						if(_this.ajaxSettings.showProgressBar){
							if(!_this.progressBarExists) _this.createProgressBar();
							//this.appStyle.addClass(this.progressBar,'failure');
							_this.progressBar.classList.add('failure');
							_this.util.styleElement(_this.progressBar,{width:'100%',transition:'width linear 1s'})
						}
						if(_this.ajaxSettings.error) {
							var callbackFunction = _this.ajaxSettings.error;
							var callbackParams = [tmp,target, _this.XHR_Obj, _this.ajaxSettings.url, _this.ajaxSettings.error];//var callbackParams = [tmp,url,e];
							if(typeof callbackFunction === "function") tmp = _this.responseContent = callbackFunction.apply(null,callbackParams);
							else{
								var fn = window[callbackFunction];
								if(typeof fn === "function") tmp = _this.responseContent = fn.apply(null,callbackParams);
							}
						} else _this.display_result(target,tmp);
						completed = true;
					}
					if (this.readyState === 4 || this.readyState == this.DONE ){
						completed = true;
					}
				}
				
				if(_this.ajaxSettings.username) request.open(_this.ajaxSettings.method, this.ajaxSettings.url, true, this.ajaxSettings.username, this.ajaxSettings.password);
				else request.open(_this.ajaxSettings.method, _this.ajaxSettings.url, true);
				if ( _this.ajaxSettings.mimeType) {
					request.overrideMimeType( this.ajaxSettings.mimeType );
				}
				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup). For same-domain requests, won't change header if already provided.
				if ( !_this.ajaxSettings.crossDomain && !_this.ajaxSettings.headers[ "X-Requested-With" ] ) {
					_this.ajaxSettings.headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}
				// Set headers
				for ( i in _this.ajaxSettings.headers ) {
					if ( _this.ajaxSettings.headers[ i ] !== undefined ) {
						request.setRequestHeader( i, _this.ajaxSettings.headers[ i ] + "" );
					}
				}
				if(request.responseType === "json") request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				if(_this.ajaxSettings.method==='POST') {
					request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
					if(request.responseType === "json") request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				}
				// Hack to pass bytes through unprocessed, or pass binary data as a string
				if(request.responseType === "arraybuffer") request.setRequestHeader('Content-type', 'text/plain; charset=x-user-defined');
				try{
					request.send( Object.keys(this.ajaxSettings.data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(this.ajaxSettings.data[key])) .join('&') );
					//request.send( this.ajaxSettings.data );
				} catch(l){
					_xhr = {status:400,statusText:'Bad Request',responseType:'text',responseText:"request failed:"+l};
					defaultCallBack(_xhr,_this.XHR_Obj);
				}
				return this;
			}
			// Get Promise-like results
			var then = function (_promiseFn){if (request.readyState === 4 && completed /* && request.status === 200 */) {return isFunction(_promiseFn) ? _promiseFn.apply(_this, [ request.responseText, request ]) : false;}return this;}
			var all = function(reqArray, onCompleteCallback){
				/*_pbd.each(reqArray,function(i, req){});*/
				_this.vowAll(reqArray, onCompleteCallback)
				return this;
			};
			// Callback function 
			var defaultCallBack = function() {   	
				// alert(request.status);
				// Request not finished
				if (request.readyState != 4) return;
				// Check status and reject in case of failure
				if (request.status<200 || request.status>299) { promise.reject(request); return; }
				// Success, resolve response
				promise.resolve (request.responseText);
			};
			// Make an XHR request, returned as a Promise
			var makeRequest = function (url) {
				// Create the XHR request
				//var request = new XMLHttpRequest();
				var request = request && request instanceof XMLHttpRequest ? request : ( _this.XHR_Obj && _this.XHR_Obj instanceof XMLHttpRequest ? _this.XHR_Obj : initXHR() );
				// Setup the Promise
				var xhrPromise = new Promise(function (resolve, reject) {
					// Setup our listener to process compeleted requests
					request.onreadystatechange = function () {
						// Only run if the request is complete
						if (request.readyState !== 4) return;
						// Prevent timeout errors from being processed
						if (!request.status) return;
						// Process the response
						if (request.status >= 200 && request.status < 300) {
							// If successful
							resolve(parse(request));
						} else {
							// If failed
							reject({
								status: request.status,
								statusText: request.statusText,
								responseText : request.responseText
							});
						}
					};
					// Setup our HTTP request
					request.open(settings.method, url, true, settings.username, settings.password);
					request.responseType = settings.responseType;
					// Add headers
					for (var header in settings.headers) {
						if (settings.headers.hasOwnProperty(header)) {
							request.setRequestHeader(header, settings.headers[header]);
						}
					}
					// Set timeout
					if (settings.timeout) {
						request.timeout = settings.timeout;
						request.ontimeout = function (e) {
							reject({
								status: 408,
								statusText: 'Request timeout'
							});
						};
					}
					// Add withCredentials
					if (settings.withCredentials) {
						request.withCredentials = true;
					}
					// Send the request
					request.send(param(settings.data));
				});
				// Cancel the XHR request
				xhrPromise.cancel = function () {
					request.abort();
				};
				// Return the request as a Promise
				return xhrPromise;
			};
			// ...........................................................
			// Atomic Method
			// ...........................................................
			var Atomic = function (url, options) {
				// Check browser support
				if (!supports()) throw 'Atomic: This browser does not support the methods used in this plugin.';
				// Merge options into defaults
				settings = extend(defaults, options || {});
				// Make request
				return makeRequest(url);
			};
			// ...........................................................
			// Fetch Polifill Method
			// ...........................................................
			var fetchPolyfill = function (url, options) {
				options = options || {};
				return new Promise( (resolve, reject) => {
					const request = new XMLHttpRequest();
					const keys = [];
					const all = [];
					const headers = {};
					const response = () => ({
						ok: (request.status/100|0) == 2,		// 200-299
						statusText: request.statusText,
						status: request.status,
						url: request.responseURL,
						text: () => Promise.resolve(request.responseText),
						json: () => Promise.resolve(request.responseText).then(JSON.parse),
						blob: () => Promise.resolve(new Blob([request.response])),
						clone: response,
						headers: {
							keys: () => keys,
							entries: () => all,
							get: n => headers[n.toLowerCase()],
							has: n => n.toLowerCase() in headers
						}
					});
					request.open(options.method || 'get', url, true);
					request.onload = () => {
						request.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, (m, key, value) => {
							keys.push(key = key.toLowerCase());
							all.push([key, value]);
							headers[key] = headers[key] ? `${headers[key]},${value}` : value;
						});
						resolve(response());
					};
					request.onerror = reject;
					request.withCredentials = options.credentials=='include';
					for (const i in options.headers) {
						request.setRequestHeader(i, options.headers[i]);
					}
					request.send(options.body || null);
				});
				// return this;
			};
			//---------------------
			if(_this.ajaxSettings.before || _this.ajaxSettings.beforeSend) {
				var fn = returnFalse, callbackFunction = _this.ajaxSettings.before || _this.ajaxSettings.beforeSend;
				var callbackParams = [_this.XHR_Obj, _this.ajaxSettings, _this.ajaxSettings.target];//var callbackParams = [tmp,url,elem];
				if(typeof callbackFunction === "function") tmp_fn = callbackFunction.apply(null,callbackParams);
				else{
					var tmp_fn = window[callbackFunction];
					if(typeof tmp_fn === "function") fn = tmp_fn.apply(null,callbackParams);
				}
				fn();
			}
			//-------------
			return { "data" : data, "url" : url, "method" : method, "mime" : mime, "header" : header, "before" : before, "success" : success, "error" : error, "send" : send, "post" : post, "get" : get, "getJSON" : getJSON, "then" : then, "all" : all,"fetch" : fetchPolyfill, "atomic" : Atomic};
			//} catch(e){alert( this.util.formatException(e));}
			} catch(e){alert( e.stack);}
		}
	};
	// ---------------------------------------------------
	// STORAGE ===================
	_pbd.store = _pbd.dataStorage = function dataStorage(id,type){
		var validStoreTypes = ["localStorage","cookieStorage","sessionStorage","cacheStorage"], storeTypes = {};
		this.storeId = id;
		this.storeType = type || "localStorage";
		if( _$.inArray(this.storeType, validStoreTypes) && isFunction( this[ validStoreTypes[ this.storeType ] ] ) ){
			this.store = storeTypes[ validStoreTypes[ this.storeType ] ];
		}
		this.keyPrefix = '_pbd_';
		alert(this.keyPrefix);
		this.addStoreType = function(name, obj){
			if( name && isString(name) && obj && isObject(obj) ){
				storeTypes[ name ] = obj;
			}
			return this;
		};
		this.setPrefix = function(prefix){if(prefix && isString(prefix)){this.keyPrefix = prefix;} return this;};
		this.set = function(key, value){if(key && isString(key)){this.store.set(key, value);} return this;};
		//.....................................
		storeTypes.cacheStorage = {
			//constructor : dataStorage,
			nextId: 1,
			cache: {},
			add: function(fn) {
				if (!fn.id) {
					fn.id = this.nextId++;
					this.cache[fn.id] = fn;
					return true;
				}
			},
			remove: function(fn) {
				if (fn.id) {
					this.nextId--;
					this.cache[fn.id] = null;
					delete this.cache[fn.id];
					return true;
				}
			},
			get : function (key){return this;},
			set: function(key, value){if(key && isString(key)){this.cache[ this.keyPrefix ] = value;} return this;},
			key : function (key){return this;},
			clear : function (){this.cache = {};return this;}
		};
		/**
		 * localStorage methods
		*/
		storeTypes.localStorage = {
			/**
			 * Store a new settings in the browser
			 *
			 * @param String name Name of the setting
			 * @param String val Value of the setting
			 * @returns void
			*/
			set : function (key, value) {
				if (typeof (Storage) === "undefined" || !window.localStorage) {
					window.alert('Please use a modern browser to properly view this template!');
					return false;
				} else {
					key = this.keyPrefix + key;
					localStorage.setItem(key, value);
					return true;
				}
			},
			/**
			 * Get a prestored setting
			 *
			 * @param String name Name of of the setting
			 * @returns String The value of the setting | null
			*/
			get : function (key) {
				if (typeof (Storage) === "undefined" || !window.localStorage) {
					window.alert('Please use a modern browser to properly view this template!');
					return false;
				} else {
					key = this.keyPrefix + key;
					return localStorage.getItem(key);
				}
			},
			/**
			 * Remove a prestored setting
			 *
			 * @param String name Name of of the setting
			 * @returns String The value of the setting | null
			*/
			remove : function (key) {
				if (typeof (Storage) === "undefined" || !window.localStorage) {
					window.alert('Please use a modern browser to properly view this template!');
					return false;
				} else {
					key = this.keyPrefix + key;
					return localStorage.removeItem(key);
				}
			},
			/**
			 * Get a specific value from storage
			 *
			 * @param String key Name of the storage item
			 * @returns String The value of the setting | null
			*/
			key : function (key) {
				if (typeof (Storage) === "undefined" || !window.localStorage) {
					window.alert('Please use a modern browser to properly view this template!');
					return false;
				}
				key = this.keyPrefix + key;
				return localStorage.key(key);
			},
			/**
			 * Clear the entire storage
			 *
			 * @returns void | String The error message
			*/
			clear : function (){
				if(!!window.localStorage) {
					try{
						localStorage.clear();
						alert('localStorage.clear() succeeded.');
						return true;
					} catch (e) {
						alert('localStorage.clear() fail.'+e);
						return false;
					}
				}
			}/* <div class="wrapper">
		    	<h1>Event output</h1>
				<ul>
		    		<li>Key: <span class="my-key"></span></li>
					<li>Old value: <span class="my-old"></span></li>
					<li>New value: <span class="my-new"></span></li>
					<li>URL: <span class="my-url"></span></li>
					<li>Storage area: <span class="my-storage"></span></li>
				</ul>
			</div> 
			,storageEventOutput:function (key, value) {
				window.addEventListener('storage', function(e) {
					document.querySelector('.my-key').textContent = e.key;
					document.querySelector('.my-old').textContent = e.oldValue;
					document.querySelector('.my-new').textContent = e.newValue;
					document.querySelector('.my-url').textContent = e.url;
					document.querySelector('.my-storage').textContent = JSON.stringify(e.storageArea);
				});
			}*/
		};
		storeTypes.tmpStorage = {
			set : function (key,value){return localStorage.setItem(key, value);},
			get : function (key){return localStorage.getItem(key);},
			remove : function (key){return localStorage.remove(key)},
			clear : function (){return localStorage.clear();}
		};
		return this;
	}
	_pbd.head = _pbd.fn.head = function (cfg){
		this.appendMeta = function(name, value){
			if( name && isString(name) && value && isString(value) ){
				if( (meta = document.getElementsByTagName('meta')) && meta[ name ] && isElement(meta[ name ]) ) meta[ name ].content = value;
				//document.getElementsByTagName('meta')["description"].content = "My new page description!!";
				// if( (meta = document.querySelector('meta[name="'+name+'"]')) && isElement(meta) ) meta.setAttribute("content", value);
			}
			return this;
		};
		this.appendStylesheet = function(url,overwrite,inline){inline = inline || false;if( !(document.body||false)){setTimeout(function(){_pbd.appendStylesheet.apply(this,[url,overwrite,inline]);},500);return this;}var id = 'stylesheet-'+url.replace(/[^a-zA-Z0-9]/g,'');var $old = $one('#'+id);if(typeof overwrite === 'undefined' ) {overwrite = false;}if($old.length === 1){if(overwrite ){_pbd.$$($old).remove();} else {return this;}}var bodyEl = document.getElementsByTagName(_pbd.browser.safari ? 'head' : 'body')[0];var linkEl = inline ? document.createElement('style') : document.createElement('link');linkEl.type = 'text/css';linkEl.rel = 'stylesheet';linkEl.media = 'screen';linkEl[inline ? 'innerHTML' : 'href'] = url;linkEl.id = id;bodyEl.appendChild(linkEl);return this;};
		this.appendScript = function(url, overwrite,inline){inline = inline || false;if(!(document.body||false)){setTimeout(function(){_pbd.appendScript.apply(this,[url,overwrite]);},500);return this;}var id = 'script-'+url.replace(/[^a-zA-Z0-9]/g,'');var $old = $one('#'+id);if(typeof overwrite === 'undefined'){overwrite = false;}if($old.length === 1){if (overwrite){_pbd.$$($old).remove();} else {return this;}}var bodyEl = document.getElementsByTagName(_pbd.browser.safari ? 'head' : 'body')[0];var scriptEl = document.createElement('script');scriptEl.type = 'text/javascript';scriptEl[inline ? 'innerHTML' : 'src'] = url;scriptEl.id = id;bodyEl.appendChild(scriptEl);return this;};
    /*
     * $.import_js() helper (for JavaScript importing within JavaScript code).
     */
		/* (function($){
		var import_js_imported = [];
		$.extend(true, {
			import_js : function(script) {
            var found = false;
            for (var i = 0; i < import_js_imported.length; i++)
                if (import_js_imported[i] == script) {
                    found = true;
                    break;
                }

            if (found == false) {
                $("head").append('<script type="text/javascript" src="' + script + '"></script>');
                import_js_imported.push(script);
            }
        }
    });
})($pbd);*/
		return this;
	};
	var closeBtnCreated = false;
	_pbd.buildAjaxContainer = (targetId,xhr) => {
		currentURL = xhr.responseURL || ( location.href + "" ).replace( rhash, "" ).replace( rprotocol, location.protocol + "//" );
		var ajaxTargetContainer = isString(targetId) && isSelector(targetId) ? one(targetId) : 
			isString(targetId) && isObject(str2DOMElement(targetId))? str2DOMElement(targetId):
		        isObject(targetId)&&isElement(targetId)/* targetId.nodeType===9 */? targetId : '_PBD-ajax-inner-panel_';
		_targetId = isString(targetId)?targetId.replace('#','').replace('.',''):targetId.id;
		/* var ajaxTargetWrapper = __pbd_self.tag('div',{id:'_PBD-ajax-inner-wrapper_',style:'display:block;z-index:10000;position:fixed;top:5%;left:5%;margin:auto;padding:0;max-width:90%;width:90%;min-height:250px;height:90%;overflow:hidden;background:rgba(204,204,204,0.9);border:solid #3399ff;border-width:2px 2px 6px 2px;border-radius:10px;'});
		var ajaxTargetHeader = __pbd_self.tag('div',{id:'_PBD-ajax-inner-panel-header_',style:'color:#fff;display:block;margin:0;padding:0;width:100%;max-height:100px;background:rgba(0,0,0,0.5);border:solid #3399ff;border-width:0 0 2px 0;border-radius:10px 10px 0 0;'});
		var urlElement = __pbd_self.tag('input',{id:'','name':'fileURL','type':'text','value':currentURL,'class':'inline grid-8','style':'z-index:1000000;position:relative;top:-1px;width:79%;min-width:200px;padding:8px;margin:0 5px 0 0;border:solid #3399ff;border-width:0 2px 0 0;border-top-left-radius:10px;'});
		//urlElement.setAttribute('value',document.location.toString());
		var submitBtn = __pbd_self.tag('button',{id:'ajaxSubmit','class':'inline btn submit-btn grid-10','type':'submit',style:'width:10%;min-width:40px;margin:0;padding:8px;'},'GO!');
		var closeBtn = __pbd_self.tag('button',{id:'_closeBtn_','class':'inline btn close-btn',style:'display:block;z-index:100001;position:absolute;top:0;right:0;color:#000;margin:0;padding:10px;width:35px;height:35px;border:solid #3399ff;border-width:0 0 0 2px;border-radius:0 10px 0 0;'},__pbd_self.tag('i',{'class':"fa fa-close"},'X'));
		//closeBtn.innerHTML = '';
		var ajaxTargetFooter = __pbd_self.tag('h3',{id:'_PBD-ajax-inner-panel-footer_',style:'z-index:100000;clear:both;display:block;margin:0;padding:0 2.5px;width:100%;background:rgba(0,0,0,0.5);border:solid #3399ff;border-width:2px 0 0 0;border-radius:0'},__pbd_self.basename(urlElement.value));
		 *///var ajaxTargetContainer = __pbd_self.tag('div',{id:targetId/* '_PBD-ajax-inner-panel_' */,style:'display:block;margin:0;padding:5px;overflow:auto;width:100%;min-width:250px;min-height:250px;height:90%;overflow:auto;background:transparent;border-radius:0;'});
		/* ajaxTargetHeader.appendChild(urlElement);
		ajaxTargetHeader.appendChild(submitBtn);
		ajaxTargetHeader.appendChild(ajaxTargetFooter);
		
		ajaxTargetWrapper.appendChild(ajaxTargetHeader);
		ajaxTargetWrapper.appendChild(ajaxTargetContainer);
		ajaxTargetWrapper.appendChild(closeBtn);
		ajaxTargetContainer = '#'+ajaxTargetContainer.id; */
		
		var _ajax_template = '<div id="_PBD-ajax-inner-panel-header_" style="color:#fff;display:block;margin:0;padding:0;width:100%;max-height:100px;background:rgba(0,0,0,0.5);border:solid #3399ff;border-width:0 0 2px 0;border-radius:10px 10px 0 0;">'+
		    '<input id="" name="fileURL" type="text" value="'+currentURL+'" class="inline grid-8" style="z-index:1000000;position:relative;top:-1px;width:79%;min-width:200px;padding:8px;margin:0 5px 0 0;border:solid #3399ff;border-width:0 2px 0 0;border-top-left-radius:10px;" />'+
			'<button id="ajaxSubmit" class="inline btn submit-btn grid-10" type="submit" style="width:10%;min-width:40px;margin:0;padding:8px;">GO!</button>'+
			'<h3 id="_PBD-ajax-inner-panel-footer_" style="z-index:100000;clear:both;display:block;margin:0;padding:0 2.5px;width:100%;background:rgba(0,0,0,0.5);border:solid #3399ff;border-width:2px 0 0 0;border-radius:0;">'+__pbd_self.basename(urlElement.value)+'</h3>'+
		'</div>'+
		'<div id="'+_targetId/* '_PBD-ajax-inner-panel_' */+'" style="display:block;margin:0;padding:5px;overflow:auto;width:100%;min-width:250px;min-height:250px;height:90%;overflow:auto;background:transparent;border-radius:0;">'+xhr.responseText+'</div>'+
		'<button id="_closeBtn_" class="inline btn close-btn" style="display:block;z-index:100001;position:absolute;top:0;right:0;color:#000;margin:0;padding:10px;width:35px;height:35px;border:solid #3399ff;border-width:0 0 0 2px;border-radius:0 10px 0 0;"><i class="fa fa-close">X</i></button>';
		ajaxTargetWrapper.innerHTML = _ajax_template;
		if(!closeBtnCreated) {
			urlElement.oninput = function(){ ajaxTargetFooter.innerHTML = this.value;}
			document.body.ondblclick = function(){_$$.animation.kadabra('#_PBD-ajax-inner-wrapper_');}
			closeBtn.onclick = function(){_$$.animation.kadabra('#_PBD-ajax-inner-wrapper_');}
			submitBtn.onclick = function(e){
				e.preventDefault();
				//app.XHR.open_url(urlElement.value,ajaxTargetContainer,{});
				//_$.xhr(url).success(function(result){_$.byID('ajax-viewer-1')}).error(function(result){_$.byID('ajax-viewer-1')});
				_$.xhr({url:urlElement.value,method:'GET'})
				//.before(function(){ajaxTargetContainer.innerHTML = _loader;})
				.success(function(result){ajaxTargetContainer.innerHTML =  result;})
				.error(function(result){ajaxTargetContainer.innerHTML =  result.full_response;})
			}
			//if(_$$('body')[0].hasChildNodes(ajaxTargetWrapper)) $$('body')[0].removeChild(ajaxTargetWrapper) ;
			_$$('body')[0].appendChild(ajaxTargetWrapper);
			var ResizableNode = new dragResizer({content: '#_PBD-ajax-inner-wrapper_',handle:'#ghostpane'});
			ajaxTargetWrapper.style.position = 'fixed';
			closeBtnCreated = true;
		}
		return this;
	}
	_pbd.core = _pbd.fn.core = _pbd.parentObject = _pbd.fn.parentObject = _pbd.superObject = _pbd.fn.superObject = function superObject(){
		if(this instanceof _pbd) return this;
		else return _pbd.util().get.superType(_pbd);
	}
	// -------------------------------------------------
	_pbd.all = $all;
	_pbd.one = $one;
	_pbd.getBy = getBy;
	_pbd.trim = function( text ) {return text === null ? "" : text.toString().replace( rLWhitespace, '' ).replace( rTWhitespace, '' );};
	_pbd.each = function(obj,callback) {var length, i = 0;if (isArrayLike(obj)) {length = obj.length;for ( ; i < length; i++ ) {if (callback.call( obj[ i ],i,obj[i]) === false) {break;}}} else {for (i in obj) {if (callback.call( obj[ i ],i,obj[i]) === false) {break;}}}return obj;};
	_pbd.browser = _pbd.prototype.browser = function(){
		this.uaMatch = function (ua) {
			ua = ua.toLowerCase();
			var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
			return {browser: match[1] || "",version: match[2] || "0"};
		};
		matched = this.uaMatch(navigator.userAgent);
		_browser = {
			IE:  !!(window.attachEvent && !window.opera),
			opera:  !!window.opera,
			webkit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
			gecko:  navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,
			mobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/),
			browserFeatures: {
				XPath: !!document.evaluate,
				ElementExtensions: !!window.HTMLElement,
				SpecificElementExtensions: document.createElement('div').__proto__ && document.createElement('div').__proto__ !== document.createElement('form').__proto__
			},
			ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
			JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/
		}

		if(matched.browser) {
			_browser[matched.browser] = true;
			_browser.version = matched.version;
		}
		if (_browser.chrome) {_browser.webkit = true;} else if (_browser.webkit) {_browser.safari = true;}
		this._browser = _browser;
		return this._browser;
	};
	// --------------------------------------------------
	// Populate the class2type map
	_pbd.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),function( i, name ){class2type[ "[object " + name + "]" ] = name.toLowerCase();});
	_pbd.each(["inArray", "isArray", "isArrayLike", "isAudioElement", "isEmptyObject", "isElement","isFunction","isImage","isLowerCase", "isMediaElement",
		"isNegativeZero", "isNil", "isNode", "isNull", "isNumber", "isNumeric",
		"isObject", "isObjectLike", "isPlainObject", "isSet", "isSelector", "isStream", "isString", "isSymbol", "isTravisCI", "isType", "isTypeof", "isUndefined", "isUpperCase", "isValidJSON", "isVideoElement", "isWritableStream"], function (i, name){
		var util = _pbd.util(), _name = name.split("is")[1]+"";
		_name = _name.charAt(0).toLowerCase() + _name.slice(1);
		if(isFunction (window[ name+"" ] ) ){_pbd[ name ] = _pbd.fn[ name ] = window[ name+"" ];}
		else if(_name && (_name in util.is) ){_pbd[ name ] = util.is[ _name ];}
	});
	_pbd.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {
		// Handle event binding
		_pbd.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				_pbd.event().on( name, null, data, fn ) :
				_pbd.event().trigger( name );
		};
	});
	_pbd.prototype.hover = function( fnOver, fnOut ){return fnOut ? this.mouseenter( fnOver ).mouseleave( fnOut || null ) : this.mouseenter( fnOver );}
	_pbd.each( [ "fadeIn", "fadeOut" ,"slideFadeIn", "slideFadeOut" ,"slideIn" ,"slideOut", "slideUp", "slideDown", "show", "hide" ], function( i, name ) {
		_pbd.prototype[ name ] = function( duration, type ) {
			var _this = this;
			//duration = duration === 'fast' ? 900 : (duration === 'slow' ? 1900 : duration);
			duration = this.animation.animConfig.off ? 0 : typeof duration === "number" ?
			duration : duration in this.animation.animConfig.speeds ?
				this.animation.animConfig.speeds[ duration ] : this.animation.animConfig.speeds._default;
				
			this.each(function (elem){
				if(elem && isElement (elem) && (name in _pbd.animation) ){
					//name === 'fadeIn' ? _pbd.animation.fadeIn(elem,duration) : _pbd.animation.fadeOut(elem,duration);
					_this.animation[ name ](elem,duration);
					//name === 'fadeIn' ? _this.animation.fadeOpacity(elem,0,100,duration) : _this.animation.fadeOpacity(elem,100,0,duration);
				}
			});
			// else name === 'fadeIn' ? this.animation.fadeOpacity(this.nodes,0,100,duration) : this.animation.fadeOpacity(this.nodes,100,0,duration);
			return this;
		};
	});
	_pbd.each( ["outerHeight", "outerWidth" ], function( i, name ) {
		_pbd.fn[ name ] = function(){
			var that = this, heightOrWidth, util = this.util(),
			_name = name.replace("outer","-"),
			camelizeName = util.camelize("offset"+_name);
			if(isArray(this.nodes) || isArrayLike(this.nodes)){
				heightOrWidth = [];
				this.each(function(elem){
					if(util.isWindow(elem)) {
						return util.get.windowDimensions()[ _name ];
					} else {
						var _heightOrWidth = elem[ camelizeName ];
						var style = util.get.elementStyle(elem);
						_heightOrWidth += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.paddingTop) + parseInt(style.paddingBottom);
					}
					heightOrWidth.push(_heightOrWidth);
				});
				heightOrWidth = util.get.maxOfArray(heightOrWidth);
			} else {
				if(util.isWindow(this.nodes)) {
					heightOrWidth = util.get.windowDimensions()[ _name ];
				} else {
					heightOrWidth = this.nodes[camelizeName ];
					var style = util.get.elementStyle(this.nodes);
					heightOrWidth += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.paddingTop) + parseInt(style.paddingBottom);
				}
			}
			return heightOrWidth;
		};
	});
	_pbd.each(["height", "width"], function (i, name){
		var that = this,elem = callback =null;
		var heightOrWidth = ""+name;
		_pbd.fn[ name ] = function(){
			var that = this,height = elem = callback =null, util = this.util();
			if(arguments && arguments.length > 0 ){
				if( arguments.length === 1){
					heightOrWidth = typeof arguments[0] === 'string' ? util.percentToPixel(window[ util.camelize("inner"+name) ], arguments[0]) : arguments[0] + "px";
				} else if( arguments.length === 2){
					heightOrWidth = typeof arguments[0] === 'string' ? util.percentToPixel(window[ util.camelize("inner"+name) ], arguments[0]) : arguments[0] + "px";
					if(isFunction(arguments[1] )) callback = arguments[1] ;
					else if(_typeof(arguments[1] ) === "object") elem = arguments[1];
				} else if( arguments.length > 2){
					heightOrWidth = typeof arguments[0] === 'string' ? util.percentToPixel(window[ util.camelize("inner"+name) ], arguments[0]) : arguments[0] + "px";
					if(isFunction(arguments[1] )) {callback = arguments[1] ;elem = arguments[2];}
					else if(_typeof(arguments[1] ) === "object") {elem = arguments[1];callback = arguments[2];}
				}
				elem = elem ? (isElement(elem) ? elem : $all(elem)) : this.nodes;
				elem = isArray(elem) || isArrayLike(elem) ? elem : [elem];
				if(callback) _pbd.each(elem,callback);
				else {
					//_pbd.each(elem,function(){
					this.each(function(elem){
						if(!isWindow(elem) ) elem.style[ name ] = heightOrWidth;
					});
				}
				return this;
			} else {
				elem = this.nodes;
				if(isArray(elem) || isArrayLike(elem)){
					heightOrWidth = [];
					_pbd.each(elem,function(i){
						if(util.isWindow(elem[i])) {
							return util.get.windowDimensions()[ name ];
						} else {
							_elem = isObject(elem[i]) ? elem[i] : $all(elem[i]);
							var _b = _elem.getBoundingClientRect();
							var style = util.get.elementStyle(_elem);
							var _heightOrWidth = _b[ name ]&&_b[ name ] >0?_b[ name ] : _elem[util.camelize("offset"+name) ];
							_heightOrWidth += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.paddingTop) + parseInt(style.paddingBottom);
							heightOrWidth.push(parseInt(_heightOrWidth));
						}
					});
					heightOrWidth = util.get.maxOfArray(heightOrWidth);
				} else {
					if(isWindow(elem)){
						heightOrWidth = util.get.windowDimensions()[ name ];
					} else if(isElement(elem)) {
						var style = util.get.elementStyle(elem);
						var _b = elem.getBoundingClientRect();
						//heightOrWidth = style[ name ];
						heightOrWidth = _b[ name ] &&_b[ name ] >0?_b[ name ] : elem[ util.camelize("offset"+name) ];
						heightOrWidth += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.paddingTop) + parseInt(style.paddingBottom);
						heightOrWidth = parseInt(heightOrWidth);
					}
				}
				return heightOrWidth;
			}
		};
	});
	_pbd.prototype.load = function(){
	elem = this.results;
    if(arguments.length > 1 ){
		url = arguments[0],params = arguments[1] || {};
	    this.xhr.open_url(url,elem,params);
	} else if(arguments.length === 1 && this.isFunction(arguments[0])){ 
	    name = 'load';
	    fn = arguments[0];
		this.each(el,function(i){
	        elem = el[i];
	        __pbd_self[ 0 ] = __pbd_self.nodes = __pbd_self.event().add(elem,name,fn,false);
	    });
		//arguments.length > 0 ? this.on( name, null, data, fn ) : this.trigger( name );
	}
	return this;
}
	// ---------------------------------------------------
	function Logger(id) {
		var elem = isElement(id) ? id : isString(id) ? $one(id) : (function (_id){var el,e_id = isString(_id)?_id:"logger";if( !(el = $one(_id)) || !(el = $one("#logger")) ) {el = Object.assign(document.createElement("div"), {"id":e_id});}return el;})(id);
		this.el = elem || document.getElementById('log');
	}
	Logger.prototype.log = function(msg) {
	  var fragment = document.createDocumentFragment();
	  fragment.appendChild(document.createTextNode(msg));
	  fragment.appendChild(document.createElement('br'));
	  this.el.appendChild(fragment);
	  return this;
	};
	Logger.prototype.clear = function() {
		this.el.textContent = "";
		this.el.innerHTML = "";
		return this;
	};
	// ---------------------------------------------------
	function Sandbox() {
	    this.test = 'insandbox';
		this.keys = [];
		this.values = [];
	    return this;
	}
	Sandbox.prototype.Run = function(src) {typeof src === "function" ? src.call(this) : eval.call(this, src);};
	Sandbox.prototype.RunFn = function(fn){fn.call(this);}
	Sandbox.prototype.getvar = function(name) {return this[name];};
	Sandbox.prototype.evaluate = function(src){return eval("function(){" + src + "}");}
	Sandbox.prototype.eval = function(src){
	    var before = {}, prop, fn;
	    // Take a snapshopt of the window object before
	    src = "function(" + this.keys.join(",") + "){" + src + "}";
	    src = src.replace(/var/g, "");
	    // I'm not a wisard at regex so a better one should be used avoid this bug
		//var x, y, z; 
	    for(prop in window){
	        before[prop] = true;
	    }
	    // Then evaluate the source
	    fn = window.eval(src);
	    fn.apply(window, this.values);
	    // Then see what changed
	    for(prop in window){
	        if(!before[prop]){
	            // Add to the sandbox object
	            this.keys.push(prop);
	            this.values.push(window[prop]);
	            this[prop] = window[prop];
	            delete window[prop];
	        }
	    }
	}
/*
var bx = new Sandbox();
bx.Run('var x = 1;');
print(bx.getvar('test'))
print(bx.getvar('x'))        // undefined
print(x)
// function example
bx.run(function(){
    this.x = 1;
});
bx.getVar("x") // 1
//------------------------------------------
bx.Run(Sandbox.evaluate(src));
bx.getVar("x") // 1
bx.getVar("blah") // "Hello, World!"
//-----------------------------
bx.eval("var x = 1;");
bx.eval("var y = x;");
alert(bx.x);
alert(bx.y);
*/
/* function getURLParameter(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||null}
function storageAvailable(e){try{var t=window[e],E="__storage_test__";return t.setItem(E,E),t.removeItem(E),!0}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&0!==t.length}}
function localStorageFull(e){var t=!1;if(e)if(e.code)switch(e.code){case 22:t=!0;break;case 1014:"NS_ERROR_DOM_QUOTA_REACHED"===e.name&&(t=!0)}else-2147024882===e.number&&(t=!0);return t}
var PH_Storage={
		hasLocalStorage : !!window.localStorage,
		defaultExpiry:1,
		saveWithExpiry : function(e,t,E){
			t.expires&&!E&&(E=t.expires),
			E||(E=new Date,E.setDate(E.getDate()+this.defaultExpiry)),
			E=E instanceof Date?E.getTime():parseInt(E),
			this.saveItem(e,{val:t,expires:E})
		},
		getItem:function(e){if(this.hasLocalStorage){var t;try{t=JSON.parse(localStorage[e])}catch(t){return localStorage[e]}return parseInt(t.expires)<(new Date).getTime()?(this.deleteItem(e),null):t.val||t}},
		saveItem:function(e,t){this.hasLocalStorage&&(t=JSON.stringify("object"==typeof t?t:{val:t}),localStorage.setItem(e,t))},
		deleteItem:function(e){this.hasLocalStorage&&localStorage.removeItem(e)},
		saveExpiry:function(e,t,E){if("undefined"==typeof Storage)return!1;var E=E,A={value:JSON.stringify(t),timestamp:(new Date).getTime()+E};return localStorage.setItem(e,JSON.stringify(A)),t},
		getExpiry:function(e){if("undefined"==typeof Storage)return!1;var t=JSON.parse(localStorage.getItem(e));return!!t&&((new Date).getTime()<t.timestamp&&JSON.parse(t.value))}
	}
	//, CollectRecommended=function(){function e(e){e&&-1===E.recommendedIds.indexOf(e)&&E.recommendedIds.push(e),E.recommendedIds.length===E.limit&&E.recommendedIds.shift(),t()}function t(){storageAvailable("localStorage")&&localStorage.setItem("recommendVideoIds_BS",JSON.stringify(E.recommendedIds))}var E={limit:101,recommendedIds:function(){return!!storageAvailable("localStorage")&&JSON.parse(localStorage.getItem("recommendVideoIds_BS"))}()||[]};return{set:e}}();
	function mutilator(obj, name = "mutilated", context = window) {
		const mutilated = {};
		for (let prop in obj) {
			let ref = `m-${prop}`;
			mutilated[ref] = obj[prop];
			Object.defineProperty(mutilated, prop, {
				set: function(v) {
					this[ref] = v;
					context.dispatchEvent(
						new CustomEvent(`${name}:${prop}`, {
							detail: { prop: prop, value: v }
						})
					);
				},
				get: function() {
					return this[ref];
				}
			});
		}
		return mutilated;
	} */
var audioCtx = null;
var leftTrack=null;
var rightTrack=null;
var FADE=0.01;
var REVPERSEC = 33.3 / 60.0;
var masterGain = null;
var runningDisplayContext = null;
// The Track object represents an in-memory track.  In order to be able to
// reverse the playback, it also creates and keeps a reversed version of
// the track in memory.
//
// This object does not currently handle running off the ends of the buffer
// (forward or backward) very gracefully.  //TODO.
function Track( url, left ) {
	var thisTrack = this;
	var e = document.createElement( "div" );
	e.track = thisTrack;
	e.className = "track loading";
	thisTrack.isLeftTrack = left;

	// It is important that this element be the first child!
	// when we load a new file, it changes child[0].
	var nameElement = document.createElement("div");
	nameElement.className="name";
	var name = url.slice( url.lastIndexOf("/") + 1 );
	var dot = name.lastIndexOf(".");
	if (dot != -1)
		name = name.slice( 0, dot );
	nameElement.appendChild( document.createTextNode(name) );
	this.nameElement = nameElement;
	e.appendChild( nameElement );

	var cueButton = document.createElement( "div" );
	cueButton.className = "cueButton";
	cueButton.appendChild( document.createTextNode("CUE") );
	cueButton.onclick=cue;
	e.appendChild( cueButton );

	var powerButton = document.createElement("div");
	powerButton.className = "powerButton";

	var powerImg = document.createElement("img");
	powerImg.src = "img/power.png";
	powerButton.appendChild( powerImg );
	powerButton.onclick=function(e) { 
		if (this.parentNode.track) {
			if ( this.parentNode.track.togglePlaybackSpinUpDown() )
				this.classList.add("active");
			  else
			  	this.classList.remove("active");
		}
	};
	e.appendChild( powerButton );

	var bufferdrawer = document.createElement("div");
	bufferdrawer.className = "audiobuffer";
	bufferdrawer.onclick = function ( ev ) {
		this.parentNode.track.jumpToPoint(ev.offsetX / 370.0 * this.parentNode.track.buffer.duration);
	}

	var canvas = document.createElement("canvas");
	canvas.width = "370";
	canvas.height = "50";
	this.bufferCanvas = canvas;
//	bufferdrawer.appendChild(canvas);

	canvas = document.createElement("canvas");
	canvas.width = "370";
	canvas.height = "50";
	canvas.style.zIndex = "100";
	this.trackDisplayCanvas = canvas;
	bufferdrawer.appendChild(canvas);

	e.appendChild( bufferdrawer );

	var deck = document.createElement( "div" );
	deck.className = "deck";
	var disc = document.createElement( "div" );
	disc.className = "disc";

	var platter = document.createElement( "canvas" );
	platter.className = "platter";
	this.platter = platter;
	this.platterContext = platter.getContext("2d");
	this.platterContext.fillStyle = "white";
	platter.width = 300;
	platter.height = 300;
	this.platterContext.translate(150,150);
	this.platterContext.font = "22px 'Chango', sans-serif";

	disc.appendChild( platter );
	deck.appendChild( disc );
	e.appendChild( deck );

	e.appendChild( document.createTextNode("rate") );

	var pbrSlider = document.createElement("input");
	pbrSlider.className = "slider";
	pbrSlider.type = "range";
	pbrSlider.min = "-2";
	pbrSlider.max = "2";
	pbrSlider.step = "0.01";
	pbrSlider.value = "1";
	pbrSlider.oninput = function(event) {
		this.parentNode.track.changePlaybackRate(event.target.value);
	};
	e.appendChild( pbrSlider );

	var pbrText = document.createElement( "span" );
	pbrText.appendChild( document.createTextNode("1.00"));
	e.appendChild( pbrText );
	this.pbrText = pbrText;

	e.appendChild( document.createElement("br") );
	e.appendChild( document.createTextNode("gain") );

	var gainSlider = document.createElement("input");
	gainSlider.className = "slider";
	gainSlider.type = "range";
	gainSlider.min = "0";
	gainSlider.max = "2";
	gainSlider.step = "0.01";
	gainSlider.value = "1";
	gainSlider.oninput = function(event) {
		this.parentNode.track.changeGain(event.target.value);
	};
	e.appendChild( gainSlider );

	var gainText = document.createElement( "span" );
	gainText.appendChild( document.createTextNode("1.00"));
	e.appendChild( gainText );
	this.gainText = gainText;

	document.getElementById( "trackContainer" ).appendChild(e);
	this.trackElement = e;

  	e.addEventListener('dragover', function (evt) {
	    evt.stopPropagation();
	    evt.preventDefault();
	    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  	}, false);

	e.addEventListener('dragenter', function () { 
		e.classList.add("droptarget"); 
		return false; 
	}, false );
	e.addEventListener('dragleave', function () { 
		e.classList.remove("droptarget"); 
		return false; 
	}, false );

  	e.addEventListener('drop', function (ev) {
  		ev.preventDefault();
		e.classList.remove("droptarget");
  		e.firstChild.innerHTML = ev.dataTransfer.files[0].name;
  		e.classList.add("loading");

	  	var reader = new FileReader();
	  	reader.onload = function (event) {
	  		audioCtx.decodeAudioData( event.target.result, function(buffer) {
				if (thisTrack.isPlaying) thisTrack.togglePlayback();
				thisTrack.buffer = buffer;
				thisTrack.postLoadTasks();
	  		}, function(){alert("error loading!");} );
	  	};
	  	reader.onerror = function (event) {
	  		alert("Error: " + reader.error );
		};
	  	reader.readAsArrayBuffer(ev.dataTransfer.files[0]);
	  	return false;
	}, false );	

	this.gain = 1.0;
	this.gainSlider = gainSlider;
	this.pbrSlider = pbrSlider;
	this.currentPlaybackRate = 1.0;
    this.lastBufferTime = 0.0;
	this.isPlaying = false;
	this.loadNewTrack( url );
	this.xfadeGain = audioCtx.createGain();
	this.xfadeGain.gain.value = 0.5;
	this.xfadeGain.connect(masterGain);

	this.low = audioCtx.createBiquadFilter();
	this.low.type = "lowshelf";
	this.low.frequency.value = 320.0;
	this.low.gain.value = 0.0;
	this.low.connect( this.xfadeGain );

	this.mid = audioCtx.createBiquadFilter();
	this.mid.type = "peaking";
	this.mid.frequency.value = 1000.0;
	this.mid.Q.value = 0.5;
	this.mid.gain.value = 0.0;
	this.mid.connect( this.low );

	this.high = audioCtx.createBiquadFilter();
	this.high.type = "highshelf";
	this.high.frequency.value = 3200.0;
	this.high.gain.value = 0.0;
	this.high.connect( this.mid );

	this.filter = audioCtx.createBiquadFilter();
	this.filter.frequency.value = 20000.0;
	this.filter.type = this.filter.LOWPASS;
	this.filter.connect( this.high );
	this.cues = [ null, null, null, null ];
	this.cueButton = cueButton;
	this.cueDeleteMode = false;
}

function reverseBuffer( buffer ) {
	var newBuffer = audioCtx.createBuffer( buffer.numberOfChannels, buffer.length, buffer.sampleRate );
	if ( newBuffer ) {
		var length = buffer.length;
		for ( var channel=0; channel<buffer.numberOfChannels; channel++) {
			var oldBuf = buffer.getChannelData( channel );
			var newBuf = newBuffer.getChannelData( channel );
			for (var i=0; i<length; i++)
				newBuf[length-i-1] = oldBuf[i];
		}
	}
	return newBuffer;
}

Track.prototype.postLoadTasks = function() {
	this.revBuffer = reverseBuffer( this.buffer );
	this.trackElement.classList.remove( "loading" );
	this.lastBufferTime = 0.0;
	for (var i=0; i<4; i++)
		this.cues[i] = null;
	// TODO: need to clear MIDI cue lights
	drawBuffer( this.bufferCanvas.width, this.bufferCanvas.height, this.bufferCanvas.getContext('2d'), this.buffer ); 
	this.nameElement.innerHTML += " (" + this.buffer.duration.toFixed(1) + " sec)";
	this.waveformDisplayCache = createRunningDisplayCache( this.buffer, this.isLeftTrack );
	drawRunningDisplay( runningDisplayContext, this.waveformDisplayCache, this.lastBufferTime ); 

}

Track.prototype.loadNewTrack = function( url ) {
	this.buffer = null;
	this.url = url;
	var track = this;
	if (!url) return;
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";
	request.onload = function() {
	  audioCtx.decodeAudioData( request.response, function(buffer) { 
	    	track.buffer = buffer;
	    	track.postLoadTasks();
		} );
	}
	request.send();
}

Track.prototype.setCuePointAtCurrentTime = function(index) {
	// save the current time
	this.updatePlatter( false );
	this.cues[index] = new Cue(this.lastBufferTime);
	if (index==0)
		this.cueButton.classList.add("active");
	
	return this.cues[index];
}

Track.prototype.clearCuePoint = function( index ) {
	this.cues[index] = null;
	if (index==0)
		this.cueButton.classList.remove("active");
}

Track.prototype.jumpToCuePoint = function( index ) {
	if (this.isPlaying) this.togglePlayback();
	this.lastBufferTime = this.cues[index].time;
	this.togglePlayback();
}

Track.prototype.jumpToPoint = function( time ) {
	var wasPlaying = this.isPlaying;
	if (wasPlaying)
		this.togglePlayback();
	this.lastBufferTime = time;
	if (wasPlaying)
		this.togglePlayback();
}

// play a short snippet of sound
Track.prototype.playSnippet = function() {
	var now = audioCtx.currentTime;
	var snippetLength = 11.0/360.0;
	var then = now + snippetLength;	// one tick
    var sourceNode = audioCtx.createBufferSource();
	var gainNode = audioCtx.createGain();
    sourceNode.loop = false;
	gainNode.connect( this.filter );
    sourceNode.connect( gainNode );
    sourceNode.buffer = (this.currentPlaybackRate>0) ? this.buffer : this.revBuffer;
    var startTime = (this.currentPlaybackRate>0) ? this.lastBufferTime : sourceNode.buffer.duration-this.lastBufferTime;
    // for now, let's try full playback rate
	// sourceNode.playbackRate.setValueAtTime( Math.abs(rate), now );
	// fade the sound in and out to avoid "clicking"
    gainNode.gain.setValueAtTime( 0.0, now );
    gainNode.gain.setTargetAtTime( this.gain, now, FADE );
    gainNode.gain.setTargetAtTime( 0.0, then, FADE );

	sourceNode.track = this;
	sourceNode.onended = shutDownNodeWhenDonePlaying.bind(sourceNode);
	sourceNode.start( now, startTime, sourceNode.buffer.duration - startTime );
	sourceNode.stop( then+snippetLength );
}

Track.prototype.skip = function( ticks ) {
	var restart = false;
	if (this.isPlaying) {
		restart = true;
		this.togglePlayback();
	}
	this.lastBufferTime += ticks * 11/360;
	if (this.lastBufferTime<0.0)
		this.lastBufferTime = 0.0;
	if ( restart )
		this.togglePlayback();
	  else {
	  	this.playSnippet();
	  }
}

function shutDownNodeWhenDonePlaying() {
	if (this.track) {
		this.track.sourceNode = null;
	    this.track.gainNode = null;
		this.track.isPlaying = false;
	}
	if (this.onPlaybackEnd)
		this.onPlaybackEnd();
}

Track.prototype.togglePlaybackSpinUpDown = function() {
    var now = audioCtx.currentTime;
	// this.cuePointIsActive = false;
    if (this.isPlaying) {
        //stop playing and return
        if (this.sourceNode) {  // we may not have a sourceNode, if our PBR is zero.
	        var playback = this.sourceNode.playbackRate;
	        playback.cancelScheduledValues( now );
	        playback.setValueAtTime( playback.value, now );
	        playback.linearRampToValueAtTime( 0.001, now+1 );
	        this.gainNode.gain.setTargetAtTime( 0, now+1, 0.01 );
	        this.stopTime = now;
 		   	this.sourceNode.stop( now + 2 );
	        this.sourceNode = null;
	        this.gainNode = null;
        }
        this.isPlaying = false;
        return false;
    }
    sourceNode = audioCtx.createBufferSource();
    sourceNode.buffer = this.buffer;
    sourceNode.loop = false;
    // The "now" below causes issues in FFnightly
    sourceNode.playbackRate.setValueAtTime( 0.001, now );
    sourceNode.playbackRate.linearRampToValueAtTime( this.currentPlaybackRate, now+1 );
	this.gainNode = audioCtx.createGain();
	this.gainNode.connect( this.filter );
	this.gainNode.gain.value = this.gain;
    sourceNode.connect( this.gainNode );
    this.sourceNode = sourceNode;
    this.isPlaying = true;
    this.lastTimeStamp = now + 0.5;		// the 0.5 is to make up for the initial 1s "spin-up" ramp.
    this.offset = this.lastBufferTime;
    this.restartTime = now;
    this.stopTime = 0.0;
    this.lastPBR = this.currentPlaybackRate;
    sourceNode.onended = shutDownNodeWhenDonePlaying.bind(this);
    sourceNode.start( now, this.lastBufferTime );
    return true;
}

Track.prototype.togglePlayback = function() {
    var now = audioCtx.currentTime;
    if (this.isPlaying) {
        //stop playing and return
        if (this.sourceNode) {  // we may not have a sourceNode, if our PBR is zero.
        	this.sourceNode.track = null;
	        this.stopTime = 0;
		    this.gainNode.gain.setTargetAtTime( 0.0, now, FADE );
 		   	this.sourceNode.stop( now + FADE*4 );
 	        this.sourceNode = null;
	        this.gainNode = null;
        }
        this.isPlaying = false;
        return "play";
    }
    this.isPlaying = true;
    this.lastTimeStamp = now;
    this.restartTime = now-1;	// skips our "spin-up" animation
    this.offset = this.lastBufferTime;
    this.stopTime = 0;
    this.lastPBR = this.currentPlaybackRate;
    this.changePlaybackRate(this.lastPBR);
    return "stop";
}
Track.prototype.updateTime = function( now ) {
//	console.log("updateTime: " + now + ", " + this.lastBufferTime)
    // update the position we're at in the buffer
    this.lastBufferTime += (now-this.lastTimeStamp) * this.lastPBR;
    this.lastTimeStamp = now;
}

var cueColors = ["red", "blue", "green", "yellow"];
var cueText = ["cue", "1", "2", "3"];

Track.prototype.updatePlatter = function( drawOnScreen ) {
    var now = audioCtx.currentTime;
    var bufferTime;
    var keepAnimating = this.isPlaying;
	if (!this.isPlaying) {
		if (this.stopTime) {	// still in spin-down; 
			if (now > (this.stopTime + 1) ) {	// done spinning down.
				this.lastBufferTime = this.lastBufferTime + 0.5;
				this.stopTime = 0;
				return false;
			} else {
				// bufferTime = 1/2 acceleration * t^2;  // keeping acceleration = 1 simplifies this!!
				bufferTime = 1 - (now-this.stopTime);
				bufferTime = bufferTime * bufferTime;
				bufferTime = bufferTime / 2;
				bufferTime = 0.5 - bufferTime + this.lastBufferTime;
				keepAnimating = true;
			//console.log( "now:" + now + " stopTime:" + this.stopTime + " bufferTime:" + bufferTime + " this.lastBufferTime:" + this.lastBufferTime );
			}
		} else
			bufferTime = this.lastBufferTime;
	} else if ((this.restartTime + 1) > now) {	// we're still in "spin-up"
		// bufferTime = 1/2 acceleration * t^2;  // acceleration = 1
		bufferTime = now-this.restartTime;
		bufferTime = bufferTime * bufferTime;
		bufferTime = bufferTime / 2;
		bufferTime += this.offset;
    } else {
		this.updateTime( now );
		bufferTime = this.lastBufferTime;
	}

	if (drawOnScreen) {
		var radians = ((bufferTime * REVPERSEC) % 1) * 2 * Math.PI;
		var context = this.platterContext;
		context.clearRect(-150,-150,300,300);  // TODO: shouldn't hardcode
      	context.rotate( radians );
		context.fillStyle = "white";
		context.fillText("wubwubwub",-61,8);
      	context.rotate( -radians );
		if (this.buffer) {
			// Now draw the position in the buffer
			var w = this.trackDisplayCanvas.width;
			var h = this.trackDisplayCanvas.height;
			var ctx = this.trackDisplayCanvas.getContext('2d');
			ctx.clearRect(0,0,w,h);
		    ctx.drawImage( this.bufferCanvas, 0, 0 );
			var boxWidth = w * bufferTime / this.buffer.duration;
			ctx.fillStyle = "rgba(255,255,255,0.33)";
			ctx.fillRect(0,0,boxWidth,h);
			for (var i=0; i<4; i++) {
				var cue = this.cues[i]; 
				if (cue ) {
					var x = cue.time / this.buffer.duration * w; 
					ctx.fillStyle = cueColors[i];
					ctx.fillRect( x, 0, 1, h );
					ctx.font = "12px bold Skia, Arial, sans-serif";
					ctx.fillText( cueText[i], x+2, h/4 );
				}
			}
			drawRunningDisplay( runningDisplayContext, this.waveformDisplayCache, bufferTime );
		    // draw the center bar
		    var isTop = this.isLeftTrack;
		    ctx = runningDisplayContext;
		    runningDisplayContext.fillStyle = "gray";
		    runningDisplayContext.fillRect(RUNNING_DISPLAY_HALF_WIDTH,isTop?0:RUNNING_DISPLAY_HALF_HEIGHT,1,RUNNING_DISPLAY_HALF_HEIGHT);
			// draw cues on the running display
			var begin = bufferTime - (SECONDS_OF_RUNNING_DISPLAY/2);
			var end = begin + SECONDS_OF_RUNNING_DISPLAY;
			for (var i=0; i<4; i++) {
				var cue = this.cues[i]; 
				if (cue && (cue.time>begin) && (cue.time<end)) {
					var x = (cue.time-begin) * RUNNING_DISPLAY_WIDTH / SECONDS_OF_RUNNING_DISPLAY; 
					ctx.fillStyle = cueColors[i];
					ctx.fillRect( x, isTop ? 0 : RUNNING_DISPLAY_HALF_HEIGHT, 1, RUNNING_DISPLAY_HALF_HEIGHT );
					ctx.font = "12px bold Skia, Arial, sans-serif";
					ctx.fillText( cueText[i], x+2, isTop ? RUNNING_DISPLAY_HALF_HEIGHT/2 : RUNNING_DISPLAY_HALF_HEIGHT*1.5 );
				}
			}

		}
	}
	return keepAnimating;	// "keep animating" - may need to check if !isplaying
}
Track.prototype.changePlaybackRate = function( rate ) {	// rate may be negative
	this.pbrText.innerHTML = parseFloat(rate).toFixed(2);
    if (!this.isPlaying) {
    	this.currentPlaybackRate = rate;
    	return;
	}
    var now = audioCtx.currentTime;

    if (this.lastTimeStamp > now)
    	return; 	// TODO: for now, we don't deal with changing pbr before the
    // initial "spin-up" is complete.

    // update the position we're at in the buffer
    this.lastBufferTime += (now-this.lastTimeStamp) * this.lastPBR;
    this.lastPBR = rate;
    this.lastTimeStamp = now;

    if (this.lastBufferTime > this.buffer.duration) {	// we've run off the end
	    this.sourceNode = null;
		this.gainNode = null;
		this.lastPBR = this.buffer.duration;
		if (rate >=0)
			return;
		else
			this.lastBufferTime = this.buffer.duration;
    }
    if (this.lastBufferTime < 0) {	// we've run backwards over the beginning
	    this.sourceNode = null;
		this.gainNode = null;
		this.lastPBR = 0;
		if (rate <= 0)
			return;
		else
			this.lastBufferTime = 0;
    }
    if ( rate == 0.0 ) {
    	// stop playing and null the sourceNode
    	if (this.sourceNode) {
    		this.gainNode.gain.setTargetAtTime( 0, now, 0.01 );
    		this.sourceNode.stop(now + 0.1);
    		this.sourceNode = null;
    		this.gainNode = null;
    	}
    	return;
    }
    // if the rate isn't zero, we know we'll need a source node.
    // if the old value and the new value are on the same side
    // of zero, we can just set the rate, but otherwise we'll
    // need to stop the node and re-create it.  We may already 
    // be stopped, with no sourceNode.
    if ( this.sourceNode ) {
	    if (((this.currentPlaybackRate > 0) && (rate < 0)) ||
	    	((this.currentPlaybackRate < 0) && (rate > 0))	) {
	    	if (this.sourceNode) {
				this.gainNode.gain.setTargetAtTime( 0, now, FADE );
				this.sourceNode.stop(now + FADE*4);
				this.sourceNode = null;
				this.gainNode = null;
	    	}
	    }
	}

    // so... we may have just killed the sourceNode to flip, or 
    // we may have been stopped before.  Create the sourceNode,
    // pointing to the correct direction buffer.
	if (!this.sourceNode) {
	    var sourceNode = audioCtx.createBufferSource();
	    sourceNode.loop = false;
		this.gainNode = audioCtx.createGain();
		this.gainNode.gain.value = this.gain;
		this.gainNode.connect( this.filter );
	    sourceNode.connect( this.gainNode );
	    sourceNode.buffer = (rate>0) ? this.buffer : this.revBuffer;
	    var startTime = (rate>0) ? this.lastBufferTime : sourceNode.buffer.duration-this.lastBufferTime;
	    
    	sourceNode.playbackRate.setValueAtTime( Math.abs(rate), now );
    	var duration = (sourceNode.buffer.duration - startTime);
        this.gainNode.gain.value = 0.0;
        this.gainNode.gain.setTargetAtTime( this.gain, now, FADE );
		sourceNode.onended = shutDownNodeWhenDonePlaying.bind(sourceNode);
        sourceNode.start( now, startTime, duration );
	    this.sourceNode = sourceNode;
	} else  // if I replace "now" with "0" below, Firefox works.
	    this.sourceNode.playbackRate.setValueAtTime( Math.abs(rate), now );
    this.currentPlaybackRate = rate;
}

Track.prototype.changeGain = function( gain ) {
	gain = parseFloat(gain).toFixed(2);
	this.gain = gain;
	if (this.gainNode) {
		this.gainNode.gain.cancelScheduledValues( 0 );
		this.gainNode.gain.value = gain;
		this.gainNode.gain.setValueAtTime(gain,0);
	}
	this.gainText.innerHTML = gain;
}
// -------------------------------------------------------------
	// http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
	function isHostMethod(object, property){var t = typeof object[property];return t == 'function' || (!!(t == 'object' && object[property])) || t == 'unknown';}
	function isHostObject(object, property){return !!(typeof(object[property]) == 'object' && object[property]);}
	function encodeUriSegment(val) {return encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');}
/**
 * This method is intended for encoding *key* or *value* parts of query component. We need a custom
 * method because encodeURIComponent is too aggressive and encodes stuff that doesn't have to be
 * encoded per http://tools.ietf.org/html/rfc3986:
 *    query       = *( pchar / "/" / "?" )
 *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
 *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
 *    pct-encoded   = "%" HEXDIG HEXDIG
 *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
 *                     / "*" / "+" / "," / ";" / "="
 */
	function encodeUriQuery(val, pctEncodeSpaces ) {return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));}
	/* 
	 * Escapes a string to use in a regular expression.
	 * Use `String.prototype.replace()` to escape special characters.
	 * escapeRegExp('(test)'); // \\(test\\)
	*/
	const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	
/* 
 *DEMO
 * Optionally you might want to prepend 'use strict'; to the code.
 * This works at least in Chrome. Whether the function created this way has access to the iframe's global scope or the page's global scope can be easily tested with:
*/
/* (function() {
    var frame = document.createElement('iframe');
    document.body.appendChild(frame);
    var same = window === frame.contentWindow.Function('return window;')();
    alert(same ? ':(' : ':)');
    document.body.removeChild(frame);
}()); */
	function sandboxed(code) {
		var frame = document.createElement('iframe');
		document.body.appendChild(frame);
		
		var F = frame.contentWindow.Function,
		args = Object.keys(frame.contentWindow).join();
		
		document.body.removeChild(frame);
		return F(args, code)();
	}
	// -------------------------------------------------------------
	var $pbd = function(selector,context) {
		__pbd_self = _pbd || this;
		if(!arguments || arguments.length === 0 ) return _pbd;
		else {
			__pbd_self = el = new _pbd(selector,context);
			el.init();
			return el;
		}
	}
	//if ( !noGlobal ) {
	window.pbd = window.$pbd = window.$ = $pbd;
	window._$ = _pbd;
	//}
	return $pbd;
})(getGlobalObject() || window);
function getGlobalObject(){return typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};}

var $pbd_ = function () {
	'use strict';
	/**
	 * Create the constructor
	 * @param {String} selector The selector to use
	 */
	var __$ = function (selector) {
		if (!selector) return;
		if (selector === 'document') {
			this.elems = [document];
		} else if (selector === 'window') {
			this.elems = [window];
		} else {
			try{
			this.elems = (Array.from || Array.prototype.slice.call )( document.querySelectorAll(selector) );
			} catch (er){
				this.elems = null;
			}
		}
	};
	__$.prototype.ajaxTransport = function (type, fn){
		return fn.bind.apply(this, arguments);
	}
	/**
	 * Do ajax stuff
	 * @param  {String} url The URL to get
	 */
	__$.prototype.ajax = function (url) {
		// Do some XHR/Fetch thing here
		console.log(url);
	};
	/**
	 * Run a callback on each item
	 * @param  {Function} callback The callback function to run
	 */
	__$.prototype.each = function (callback) {
		if (!callback || typeof callback !== 'function') return;
		for (var i = 0; i < this.elems.length; i++) {
			callback(this.elems[i], i);
		}
		return this;
	};
	/**
	 * Instantiate a new constructor
	 */
	var instantiate = function (selector) {
		return new __$(selector);
	};
	/**
	 * Return the constructor instantiation
	 */
	return instantiate;
}
/*// use this transport for "binary" data type
$.ajaxTransport("+binary", function (options, originalOptions, jqXHR) {
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob))))) {
        return {
            // create new XMLHttpRequest
            send: function (headers, callback) {
                // setup all variables
                var xhr = new XMLHttpRequest(),
                    url = options.url,
                    type = options.type,
                    async = options.async || true,
                    // blob or arraybuffer. Default is blob
                    dataType = options.responseType || "blob",
                    data = options.data || null,
                    username = options.username || null,
                    password = options.password || null;

                xhr.addEventListener('load', function () {
                    var data = {};
                    data[options.dataType] = xhr.response;
                    // make callback and send data
                    callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.open(type, url, async, username, password);

                // setup custom headers
                for (var i in headers) {
                    xhr.setRequestHeader(i, headers[i]);
                }

                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function () {
                jqXHR.abort();
            }
        };
    }
});
and then make your ajax call:

return $.ajax({
    url: url,
    method: 'GET',
    dataType: 'binary',
    processData: 'false',
    responseType: 'arraybuffer',
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
}).then(function (response) {
    var data = new Uint8Array(response);
    //do something with the data
    return data;
}, function (error) {
    alertify.error('There was an error! Error:' + error.name + ':' + error.status)
});
*/
/*
Sample code

function solution1(base64Data) {

var arrBuffer = base64ToArrayBuffer(base64Data);

// It is necessary to create a new blob object with mime-type explicitly set
// otherwise only Chrome works like it should
var newBlob = new Blob([arrBuffer], { type: "application/pdf" });

// IE doesn't allow using a blob object directly as link href
// instead it is necessary to use msSaveOrOpenBlob
if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
}

// For other browsers: 
// Create a link pointing to the ObjectURL containing the blob.
var data = window.URL.createObjectURL(newBlob);

var link = document.createElement('a');
document.body.appendChild(link); //required in FF, optional for Chrome
link.href = data;
link.download = "file.pdf";
link.click();
window.URL.revokeObjectURL(data);
link.remove();
}

function base64ToArrayBuffer(data) {
var binaryString = window.atob(data);
var binaryLen = binaryString.length;
var bytes = new Uint8Array(binaryLen);
for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
}
return bytes;
}
//---------------------------------------------------
ar csvData = new Blob([str], {type: 'text/csv;charset=utf-8;'});
var csvURL =  null;
if (navigator.msSaveBlob) {
    csvURL = navigator.msSaveBlob(csvData, 'download.cv');
} else {
    csvURL = window.URL.createObjectURL(csvData);
}
var tempLink = document.createElement('a');
tempLink.href = csvURL;
tempLink.setAttribute('download', 'download.cv');
tempLink.click();
//Another option
 function openSaveFileDialog (data, filename, mimetype) {
  if (!data) return;

  var blob = data.constructor !== Blob ? new Blob([data], {type: mimetype || 'application/octet-stream'}) : data ;

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
    return;
  }

  var lnk = document.createElement('a'),
      url = window.URL,
      objectURL;

  if (mimetype) {
    lnk.type = mimetype;
  }

  lnk.download = filename || 'untitled';
  lnk.href = objectURL = url.createObjectURL(blob);
  lnk.dispatchEvent(new MouseEvent('click'));
  setTimeout(url.revokeObjectURL.bind(url, objectURL));
}
*/
/* var jQuery = (function (){
	// Define a local copy of “k”
	var k = function (selector, context){
		// The k object is actually just the init constructor 'enhanced'
		var kobj = new k.fn.init(selector, context);
		return kobj;
	};
	
	//Define k’s fn prototype, specially contains init method
	k.fn = k.prototype = {
		init: function (selector, context){
			if (!selector){
				return this;
			}
		}
	};
	
	// Give the init function the “k” prototype for later instantiation
	k.fn.init.prototype = k.fn;
	// Return “k” to the global object
	return k;
})(); */
/**
* vkTemplate - jQuery Plugin
*  
* Version - 0.94.00 ( ECMAScript-5 strict mode compatible)
* Copyright (c) 2010 - 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/vktemplate/
* 
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
* _tmpl function is "Micro-Templating" engine, 
* originally written by John Resig ( http://ejohn.org/ - MIT Licensed )
* and modified by Vadim Kiryukhin. Issue with single quotes is fixed based on Neil's comment at 
* http://www.west-wind.com/weblog/posts/2008/Oct/13/Client-Templating-with-jQuery
*
*	.vkTemplate(urlTemplate, jsonData [,params] [,callback(elm, data, context)] [,context]) 
*
* PARAMETERS:
*
*	@urlTemplate  	- Strig; 
*					  template URL or element's id;
*					  
* 	@jsonData		- can be either json object or json string or URL 
*	
*	@params			- Object (optional); 
*					  jQuery Ajax "data" parameter that is sent to the 
*                     server with jsonData URL if needed 
*
* 	@function		- Function  (optional);
*					  callback function
*					  
*	@context		- Object  (optional);   
*				      object to pass as a context (optional)
*
* USAGE:
*	
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php'); 
*	$('#container').vkTemplate('myTemplate.tmpl','{"foo":"bar"}');
*	$('#container').vkTemplate('myTemplate.tmpl',{foo:"bar"});
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php', function(elm, jsonObj){...});
*   $('#container').vkTemplate('myTemplate.tmpl','myData.php', {id:123});
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php', {id:123}, function(elm, jsonObj){...});
*
*	When @context is provided, all optional parameters must be provided as well. 
*   If they are not used, set them to null.
*
*   $('#container').vkTemplate('myTemplate.tmpl','myData.php',null,null,contextObj); 
* 
*	Use "o." prefix with this version of Strict Mode Compatible Micro-Templating engine:
* 	object:    {first_name:"John",last_name:"Smith"} 
* 	template:  <%= o.first_name %>  <% if(o.first_name == ... ) {} %> 
*		
*/

/* (function($) {
	var vkTemplatesCache = {};
	_pbd.fn.vkTemplate = function (urlTmpl, jsonData, params, callback, contextObj ) {
		function _tmpl(str){ 
			var fn = "var p=[]; p.push('" +
				str.replace(/[\r\t\n]/g, " ")
					.replace(/'(?=[^%]*%>)/g,"\t")
					.split("'").join("\\'")
					.split("\t").join("'")
					.replace(/<%=(.+?)%>/g, "',$1,'")
					.split("<%").join("');")
					.split("%>").join("p.push('")
				 + "'); return p.join('');";
			return new Function("o", fn);
		};

		function _getData(jsonData, elm, params, callback, contextObj) { 
			if(!jsonData) return;
			var context = contextObj ? contextObj : window;
			// both "params" and "callback" arguments are optional, so let's check 
			// if the 3rd argument exists and either it is an object or a function.
			if ( params ) {
				if ( _pbd.isFunction( params ) ) {// We assume that it's the callback function
					callback = params;
					params = null;
				} else if ( typeof params === "object" ) {// Otherwise, build a param string for ajax request
					params = jQuery.param( params );
				}
			}
			// jsonData can be: object | string | URL
			if( typeof(jsonData) === 'object') {//json object
				$(elm).empty().append(vkTemplatesCache[urlTmpl].call(context,jsonData));	
				if(callback) {
					callback(elm, jsonData, context);
				}
			} else // We assume that it's a string
			if($.trim(jsonData).charAt(0) == '{') { //JSON-string
				var jsonObj = jQuery.parseJSON(jsonData);
				$(elm).empty().append(vkTemplatesCache[urlTmpl].call(context,jsonObj));	
				if(callback) {
					callback(elm, jsonObj, context);
				}
			} else { // URL-string
				$.ajax( {
					url		: jsonData,
					dataType: "text",
					cache	: false, 
					data	: params,
					context : context,
					success	: function(data) {
						var jsonObj = jQuery.parseJSON(data);
						$(elm).empty().append(vkTemplatesCache[urlTmpl].call(context,jsonObj));
						if(callback) {
							callback(elm, jsonObj, context);
						}
					}
				});
			}
		}
		return this.each(function () {
			var elm = this,localTmpl;
			if(vkTemplatesCache[urlTmpl]) { //template has been cached;
				_getData(jsonData, elm, params, callback, contextObj);
			} else { 
				if(localTmpl = document.getElementById(urlTmpl)) {//[sic] (it's not a comparison, it's assignment!)
				//it's a local template, so get it as a regular innerHTML
					vkTemplatesCache[urlTmpl] = _tmpl(localTmpl.innerHTML); // compile and save function in cache
					_getData(jsonData, elm, params, callback, contextObj);
				} else {
				//it's remote template, so get it with ajax
					$.ajax( { 
						url: urlTmpl,
						dataType: "text",
						context: contextObj,
						success: function(data) { 
							vkTemplatesCache[urlTmpl] = _tmpl(data); // compile and save function in cache
							_getData(jsonData, elm, params, callback, contextObj);
						}
					});
				}
			}
		});
	};
})($);*/
;(function ($) {
	'use strict'
	var tmpl =  function (str, data) {
		var f = !/[^\w\-.:]/.test(str) ? (tmpl.cache[str] = tmpl.cache[str] || tmpl(tmpl.load(str))) : new Function(tmpl.arg + ',tmpl', 'var _e=tmpl.encode' + tmpl.helper + ",_s='" + str.replace(tmpl.regexp, tmpl.func) + "';return _s;");
		return data ? f(data, tmpl) : function (data) {return f(data, tmpl);}
	}
	
	tmpl.cache = {};
	tmpl.load = function (id) {return document.getElementById(id).innerHTML;}
	tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;
	tmpl.func = function (s, p1, p2, p3, p4, p5) {
		if (p1) {
			// whitespace, quote and backspace in HTML context
			return ({'\n': '\\n', '\r': '\\r', '\t': '\\t', ' ': ' '}[p1] || '\\' + p1)
		}
		if (p2) {
			// interpolation: {%=prop%}, or unescaped: {%#prop%}
			if (p2 === '=') {return "'+_e(" + p3 + ")+'"}
			return "'+(" + p3 + "==null?'':" + p3 + ")+'"
		}
		if (p4) {
			return "';"// evaluation start tag: {%
		}
		if (p5) {
			return "_s+='"// evaluation end tag: %}
		}
	}
	tmpl.encReg = /[<>&"'\x00]/g // eslint-disable-line no-control-regex
	tmpl.encMap = {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;'}
	tmpl.encode = function(s){return (s == null ? '' : '' + s).replace(tmpl.encReg, function(c){return tmpl.encMap[c] || ''});}
	tmpl.arg = 'o'
	tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" + ',include=function(s,d){_s+=tmpl(s,d);}'
	$.tmpl = tmpl;
})(_$)