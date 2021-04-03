/*!
 * jQuery JavaScript Library v3.5.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-05-04T22:49Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.5.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

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

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( _i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.5
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2020-03-14
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
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
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
					dataPriv.get( this, "events" ) || Object.create( null )
				)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px";
				tr.style.height = "1px";
				trChild.style.height = "9px";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = parseInt( trStyle.height ) > 3;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = (
					dataPriv.get( cur, "events" ) || Object.create( null )
				)[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script
			if ( !isSuccess && jQuery.inArray( "script", s.dataTypes ) > -1 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			if ( typeof props.top === "number" ) {
				props.top += "px";
			}
			if ( typeof props.left === "number" ) {
				props.left += "px";
			}
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

;/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Popper = factory());
}(this, (function () { 'use strict';

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

return Popper;

})));
//# sourceMappingURL=popper.js.map

;/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.6.2 (2020-12-08)
 */
!function(){"use strict";var r=function(e){if(null===e)return"null";if(e===undefined)return"undefined";var t=typeof e;return"object"==t&&(Array.prototype.isPrototypeOf(e)||e.constructor&&"Array"===e.constructor.name)?"array":"object"==t&&(String.prototype.isPrototypeOf(e)||e.constructor&&"String"===e.constructor.name)?"string":t},t=function(e){return{eq:e}},s=t(function(e,t){return e===t}),i=function(o){return t(function(e,t){if(e.length!==t.length)return!1;for(var n=e.length,r=0;r<n;r++)if(!o.eq(e[r],t[r]))return!1;return!0})},c=function(e,r){return n=i(e),o=function(e){return t=e,n=r,Array.prototype.slice.call(t).sort(n);var t,n},t(function(e,t){return n.eq(o(e),o(t))});var n,o},u=function(u){return t(function(e,t){var n=Object.keys(e),r=Object.keys(t);if(!c(s).eq(n,r))return!1;for(var o=n.length,i=0;i<o;i++){var a=n[i];if(!u.eq(e[a],t[a]))return!1}return!0})},l=t(function(e,t){if(e===t)return!0;var n=r(e);return n===r(t)&&(-1!==["undefined","boolean","number","string","function","xml","null"].indexOf(n)?e===t:"array"===n?i(l).eq(e,t):"object"===n&&u(l).eq(e,t))}),V=function(){},a=function(n,r){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n(r.apply(null,e))}},E=function(e){return function(){return e}},o=function(e){return e};function N(r){for(var o=[],e=1;e<arguments.length;e++)o[e-1]=arguments[e];return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=o.concat(e);return r.apply(null,n)}}var e,n,f,d=function(t){return function(e){return!t(e)}},m=function(e){return function(){throw new Error(e)}},b=function(e){e()},C=E(!1),k=E(!0),p=function(){return g},g=(e=function(e){return e.isNone()},{fold:function(e,t){return e()},is:C,isSome:C,isNone:k,getOr:f=function(e){return e},getOrThunk:n=function(e){return e()},getOrDie:function(e){throw new Error(e||"error: getOrDie called on none.")},getOrNull:E(null),getOrUndefined:E(undefined),or:f,orThunk:n,map:p,each:V,bind:p,exists:C,forall:k,filter:p,equals:e,equals_:e,toArray:function(){return[]},toString:E("none()")}),h=function(n){var e=E(n),t=function(){return o},r=function(e){return e(n)},o={fold:function(e,t){return t(n)},is:function(e){return n===e},isSome:k,isNone:C,getOr:e,getOrThunk:e,getOrDie:e,getOrNull:e,getOrUndefined:e,or:t,orThunk:t,map:function(e){return h(e(n))},each:function(e){e(n)},bind:r,exists:r,forall:r,filter:function(e){return e(n)?o:g},toArray:function(){return[n]},toString:function(){return"some("+n+")"},equals:function(e){return e.is(n)},equals_:function(e,t){return e.fold(C,function(e){return t(n,e)})}};return o},U={some:h,none:p,from:function(e){return null===e||e===undefined?g:h(e)}},v=function(r){return function(e){return n=typeof(t=e),(null===t?"null":"object"==n&&(Array.prototype.isPrototypeOf(t)||t.constructor&&"Array"===t.constructor.name)?"array":"object"==n&&(String.prototype.isPrototypeOf(t)||t.constructor&&"String"===t.constructor.name)?"string":n)===r;var t,n}},y=function(t){return function(e){return typeof e===t}},w=function(t){return function(e){return t===e}},q=v("string"),_=v("object"),S=v("array"),x=w(null),A=y("boolean"),R=w(undefined),$=function(e){return null===e||e===undefined},D=function(e){return!$(e)},T=y("function"),O=y("number"),B=Array.prototype.slice,P=Array.prototype.indexOf,L=Array.prototype.push,I=function(e,t){return P.call(e,t)},M=function(e,t){return-1<I(e,t)},F=function(e,t){for(var n=0,r=e.length;n<r;n++){if(t(e[n],n))return!0}return!1},z=function(e,t){for(var n=e.length,r=new Array(n),o=0;o<n;o++){var i=e[o];r[o]=t(i,o)}return r},W=function(e,t){for(var n=0,r=e.length;n<r;n++){t(e[n],n)}},j=function(e,t){for(var n=e.length-1;0<=n;n--){t(e[n],n)}},H=function(e,t){for(var n=[],r=0,o=e.length;r<o;r++){var i=e[r];t(i,r)&&n.push(i)}return n},K=function(e,t,n){return j(e,function(e){n=t(n,e)}),n},X=function(e,t,n){return W(e,function(e){n=t(n,e)}),n},Y=function(e,t){return function(e,t,n){for(var r=0,o=e.length;r<o;r++){var i=e[r];if(t(i,r))return U.some(i);if(n(i,r))break}return U.none()}(e,t,C)},G=function(e,t){for(var n=0,r=e.length;n<r;n++){if(t(e[n],n))return U.some(n)}return U.none()},J=function(e,t){return function(e){for(var t=[],n=0,r=e.length;n<r;++n){if(!S(e[n]))throw new Error("Arr.flatten item "+n+" was not an array, input: "+e);L.apply(t,e[n])}return t}(z(e,t))},Q=function(e,t){for(var n=0,r=e.length;n<r;++n){if(!0!==t(e[n],n))return!1}return!0},Z=function(e){var t=B.call(e,0);return t.reverse(),t},ee=function(e,t){return H(e,function(e){return!M(t,e)})},te=function(e,t){return 0<=t&&t<e.length?U.some(e[t]):U.none()},ne=function(e){return te(e,0)},re=function(e){return te(e,e.length-1)},oe=T(Array.from)?Array.from:function(e){return B.call(e)},ie=Object.keys,ae=Object.hasOwnProperty,ue=function(e,t){for(var n=ie(e),r=0,o=n.length;r<o;r++){var i=n[r];t(e[i],i)}},se=function(e,n){return ce(e,function(e,t){return{k:t,v:n(e,t)}})},ce=function(e,r){var o={};return ue(e,function(e,t){var n=r(e,t);o[n.k]=n.v}),o},le=function(n){return function(e,t){n[t]=e}},fe=function(e,n,r,o){return ue(e,function(e,t){(n(e,t)?r:o)(e,t)}),{}},de=function(e,t){var n={},r={};return fe(e,t,le(n),le(r)),{t:n,f:r}},me=function(e,t){var n={};return fe(e,t,le(n),V),n},pe=function(e){return n=function(e){return e},r=[],ue(e,function(e,t){r.push(n(e,t))}),r;var n,r},ge=function(e,t){return he(e,t)?U.from(e[t]):U.none()},he=function(e,t){return ae.call(e,t)},ve=function(e,t){return he(e,t)&&e[t]!==undefined&&null!==e[t]},ye=Array.isArray,be=function(e,t,n){var r,o;if(!e)return!1;if(n=n||e,e.length!==undefined){for(r=0,o=e.length;r<o;r++)if(!1===t.call(n,e[r],r,e))return!1}else for(r in e)if(e.hasOwnProperty(r)&&!1===t.call(n,e[r],r,e))return!1;return!0},Ce=function(n,r){var o=[];return be(n,function(e,t){o.push(r(e,t,n))}),o},we=function(n,r){var o=[];return be(n,function(e,t){r&&!r(e,t,n)||o.push(e)}),o},xe=function(e,t){if(e)for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},Se=function(e,t,n,r){for(var o=R(n)?e[0]:n,i=0;i<e.length;i++)o=t.call(r,o,e[i],i);return o},Ne=function(e,t,n){for(var r=0,o=e.length;r<o;r++)if(t.call(n,e[r],r,e))return r;return-1},Ee=function(e){return e[e.length-1]},ke=function(){return(ke=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function _e(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;for(var r=Array(e),o=0,t=0;t<n;t++)for(var i=arguments[t],a=0,u=i.length;a<u;a++,o++)r[o]=i[a];return r}var Ae,Re,Te,De,Oe,Be,Pe,Le=function(e,t){var n=function(e,t){for(var n=0;n<e.length;n++){var r=e[n];if(r.test(t))return r}return undefined}(e,t);if(!n)return{major:0,minor:0};var r=function(e){return Number(t.replace(n,"$"+e))};return Me(r(1),r(2))},Ie=function(){return Me(0,0)},Me=function(e,t){return{major:e,minor:t}},Fe={nu:Me,detect:function(e,t){var n=String(t).toLowerCase();return 0===e.length?Ie():Le(e,n)},unknown:Ie},Ue=function(e,t){var n=String(t).toLowerCase();return Y(e,function(e){return e.search(n)})},ze=function(e,n){return Ue(e,n).map(function(e){var t=Fe.detect(e.versionRegexes,n);return{current:e.name,version:t}})},je=function(e,n){return Ue(e,n).map(function(e){var t=Fe.detect(e.versionRegexes,n);return{current:e.name,version:t}})},He=function(e,t){return-1!==e.indexOf(t)},Ve=function(e,t){return n=e,o=0,""===(r=t)||n.length>=r.length&&n.substr(o,o+r.length)===r;var n,r,o},qe=function(t){return function(e){return e.replace(t,"")}},$e=qe(/^\s+|\s+$/g),We=qe(/^\s+/g),Ke=qe(/\s+$/g),Xe=/.*?version\/\ ?([0-9]+)\.([0-9]+).*/,Ye=function(t){return function(e){return He(e,t)}},Ge=[{name:"Edge",versionRegexes:[/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],search:function(e){return He(e,"edge/")&&He(e,"chrome")&&He(e,"safari")&&He(e,"applewebkit")}},{name:"Chrome",versionRegexes:[/.*?chrome\/([0-9]+)\.([0-9]+).*/,Xe],search:function(e){return He(e,"chrome")&&!He(e,"chromeframe")}},{name:"IE",versionRegexes:[/.*?msie\ ?([0-9]+)\.([0-9]+).*/,/.*?rv:([0-9]+)\.([0-9]+).*/],search:function(e){return He(e,"msie")||He(e,"trident")}},{name:"Opera",versionRegexes:[Xe,/.*?opera\/([0-9]+)\.([0-9]+).*/],search:Ye("opera")},{name:"Firefox",versionRegexes:[/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],search:Ye("firefox")},{name:"Safari",versionRegexes:[Xe,/.*?cpu os ([0-9]+)_([0-9]+).*/],search:function(e){return(He(e,"safari")||He(e,"mobile/"))&&He(e,"applewebkit")}}],Je=[{name:"Windows",search:Ye("win"),versionRegexes:[/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]},{name:"iOS",search:function(e){return He(e,"iphone")||He(e,"ipad")},versionRegexes:[/.*?version\/\ ?([0-9]+)\.([0-9]+).*/,/.*cpu os ([0-9]+)_([0-9]+).*/,/.*cpu iphone os ([0-9]+)_([0-9]+).*/]},{name:"Android",search:Ye("android"),versionRegexes:[/.*?android\ ?([0-9]+)\.([0-9]+).*/]},{name:"OSX",search:Ye("mac os x"),versionRegexes:[/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]},{name:"Linux",search:Ye("linux"),versionRegexes:[]},{name:"Solaris",search:Ye("sunos"),versionRegexes:[]},{name:"FreeBSD",search:Ye("freebsd"),versionRegexes:[]},{name:"ChromeOS",search:Ye("cros"),versionRegexes:[/.*?chrome\/([0-9]+)\.([0-9]+).*/]}],Qe={browsers:E(Ge),oses:E(Je)},Ze="Firefox",et=function(e){var t=e.current,n=e.version,r=function(e){return function(){return t===e}};return{current:t,version:n,isEdge:r("Edge"),isChrome:r("Chrome"),isIE:r("IE"),isOpera:r("Opera"),isFirefox:r(Ze),isSafari:r("Safari")}},tt={unknown:function(){return et({current:undefined,version:Fe.unknown()})},nu:et,edge:E("Edge"),chrome:E("Chrome"),ie:E("IE"),opera:E("Opera"),firefox:E(Ze),safari:E("Safari")},nt="Windows",rt="Android",ot="Solaris",it="FreeBSD",at="ChromeOS",ut=function(e){var t=e.current,n=e.version,r=function(e){return function(){return t===e}};return{current:t,version:n,isWindows:r(nt),isiOS:r("iOS"),isAndroid:r(rt),isOSX:r("OSX"),isLinux:r("Linux"),isSolaris:r(ot),isFreeBSD:r(it),isChromeOS:r(at)}},st={unknown:function(){return ut({current:undefined,version:Fe.unknown()})},nu:ut,windows:E(nt),ios:E("iOS"),android:E(rt),linux:E("Linux"),osx:E("OSX"),solaris:E(ot),freebsd:E(it),chromeos:E(at)},ct=function(e,t){var n,r,o,i,a,u,s,c,l,f,d,m,p=Qe.browsers(),g=Qe.oses(),h=ze(p,e).fold(tt.unknown,tt.nu),v=je(g,e).fold(st.unknown,st.nu);return{browser:h,os:v,deviceType:(r=h,o=e,i=t,a=(n=v).isiOS()&&!0===/ipad/i.test(o),u=n.isiOS()&&!a,s=n.isiOS()||n.isAndroid(),c=s||i("(pointer:coarse)"),l=a||!u&&s&&i("(min-device-width:768px)"),f=u||s&&!l,d=r.isSafari()&&n.isiOS()&&!1===/safari/i.test(o),m=!f&&!l&&!d,{isiPad:E(a),isiPhone:E(u),isTablet:E(l),isPhone:E(f),isTouch:E(c),isAndroid:n.isAndroid,isiOS:n.isiOS,isWebView:E(d),isDesktop:E(m)})}},lt=function(e){return window.matchMedia(e).matches},ft=(Te=!(Ae=function(){return ct(navigator.userAgent,lt)}),function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return Te||(Te=!0,Re=Ae.apply(null,e)),Re}),dt=function(){return ft()},mt=navigator.userAgent,pt=dt(),gt=pt.browser,ht=pt.os,vt=pt.deviceType,yt=/WebKit/.test(mt)&&!gt.isEdge(),bt="FormData"in window&&"FileReader"in window&&"URL"in window&&!!URL.createObjectURL,Ct=-1!==mt.indexOf("Windows Phone"),wt={opera:gt.isOpera(),webkit:yt,ie:!(!gt.isIE()&&!gt.isEdge())&&gt.version.major,gecko:gt.isFirefox(),mac:ht.isOSX()||ht.isiOS(),iOS:vt.isiPad()||vt.isiPhone(),android:ht.isAndroid(),contentEditable:!0,transparentSrc:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",caretAfter:!0,range:window.getSelection&&"Range"in window,documentMode:gt.isIE()?document.documentMode||7:10,fileApi:bt,ceFalse:!0,cacheSuffix:null,container:null,experimentalShadowDom:!1,canHaveCSP:!gt.isIE(),desktop:vt.isDesktop(),windowsPhone:Ct,browser:{current:gt.current,version:gt.version,isChrome:gt.isChrome,isEdge:gt.isEdge,isFirefox:gt.isFirefox,isIE:gt.isIE,isOpera:gt.isOpera,isSafari:gt.isSafari},os:{current:ht.current,version:ht.version,isAndroid:ht.isAndroid,isChromeOS:ht.isChromeOS,isFreeBSD:ht.isFreeBSD,isiOS:ht.isiOS,isLinux:ht.isLinux,isOSX:ht.isOSX,isSolaris:ht.isSolaris,isWindows:ht.isWindows},deviceType:{isDesktop:vt.isDesktop,isiPad:vt.isiPad,isiPhone:vt.isiPhone,isPhone:vt.isPhone,isTablet:vt.isTablet,isTouch:vt.isTouch,isWebView:vt.isWebView}},xt=/^\s*|\s*$/g,St=function(e){return null===e||e===undefined?"":(""+e).replace(xt,"")},Nt=function(e,t){return t?!("array"!==t||!ye(e))||typeof e===t:e!==undefined},Et=function(e,n,r,o){o=o||this,e&&(r&&(e=e[r]),be(e,function(e,t){return!1!==n.call(o,e,t,r)&&void Et(e,n,r,o)}))},kt={trim:St,isArray:ye,is:Nt,toArray:function(e){if(ye(e))return e;for(var t=[],n=0,r=e.length;n<r;n++)t[n]=e[n];return t},makeMap:function(e,t,n){var r;for(t=t||",","string"==typeof(e=e||[])&&(e=e.split(t)),n=n||{},r=e.length;r--;)n[e[r]]={};return n},each:be,map:Ce,grep:we,inArray:xe,hasOwn:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},extend:function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0;r<t.length;r++){var o,i=t[r];for(var a in i){!i.hasOwnProperty(a)||(o=i[a])!==undefined&&(e[a]=o)}}return e},create:function(e,t,n){var r,o,i,a=this,u=0,s=(e=/^((static) )?([\w.]+)(:([\w.]+))?/.exec(e))[3].match(/(^|\.)(\w+)$/i)[2],c=a.createNS(e[3].replace(/\.\w+$/,""),n);if(!c[s]){if("static"===e[2])return c[s]=t,void(this.onCreate&&this.onCreate(e[2],e[3],c[s]));t[s]||(t[s]=function(){},u=1),c[s]=t[s],a.extend(c[s].prototype,t),e[5]&&(r=a.resolve(e[5]).prototype,o=e[5].match(/\.(\w+)$/i)[1],i=c[s],c[s]=u?function(){return r[o].apply(this,arguments)}:function(){return this.parent=r[o],i.apply(this,arguments)},c[s].prototype[s]=c[s],a.each(r,function(e,t){c[s].prototype[t]=r[t]}),a.each(t,function(e,t){r[t]?c[s].prototype[t]=function(){return this.parent=r[t],e.apply(this,arguments)}:t!==s&&(c[s].prototype[t]=e)})),a.each(t["static"],function(e,t){c[s][t]=e})}},walk:Et,createNS:function(e,t){var n,r;for(t=t||window,e=e.split("."),n=0;n<e.length;n++)t[r=e[n]]||(t[r]={}),t=t[r];return t},resolve:function(e,t){var n,r;for(t=t||window,n=0,r=(e=e.split(".")).length;n<r&&(t=t[e[n]]);n++);return t},explode:function(e,t){return!e||Nt(e,"array")?e:Ce(e.split(t||","),St)},_addCacheSuffix:function(e){var t=wt.cacheSuffix;return t&&(e+=(-1===e.indexOf("?")?"?":"&")+t),e}},_t=function(e){if(null===e||e===undefined)throw new Error("Node cannot be null or undefined");return{dom:e}},At={fromHtml:function(e,t){var n=(t||document).createElement("div");if(n.innerHTML=e,!n.hasChildNodes()||1<n.childNodes.length)throw console.error("HTML does not have a single root node",e),new Error("HTML must have a single root node");return _t(n.childNodes[0])},fromTag:function(e,t){var n=(t||document).createElement(e);return _t(n)},fromText:function(e,t){var n=(t||document).createTextNode(e);return _t(n)},fromDom:_t,fromPoint:function(e,t,n){return U.from(e.dom.elementFromPoint(t,n)).map(_t)}},Rt=function(e,t){for(var n=[],r=function(e){return n.push(e),t(e)},o=t(e);(o=o.bind(r)).isSome(););return n},Tt=function(e,t){var n=e.dom;if(1!==n.nodeType)return!1;var r=n;if(r.matches!==undefined)return r.matches(t);if(r.msMatchesSelector!==undefined)return r.msMatchesSelector(t);if(r.webkitMatchesSelector!==undefined)return r.webkitMatchesSelector(t);if(r.mozMatchesSelector!==undefined)return r.mozMatchesSelector(t);throw new Error("Browser lacks native selectors")},Dt=function(e){return 1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType||0===e.childElementCount},Ot=function(e,t){return e.dom===t.dom},Bt=function(e,t){return n=e.dom,r=t.dom,o=n,i=r,a=Node.DOCUMENT_POSITION_CONTAINED_BY,0!=(o.compareDocumentPosition(i)&a);var n,r,o,i,a},Pt=function(e,t){return dt().browser.isIE()?Bt(e,t):(n=t,r=e.dom,o=n.dom,r!==o&&r.contains(o));var n,r,o},Lt=("undefined"!=typeof window||Function("return this;")(),function(e){return e.dom.nodeName.toLowerCase()}),It=function(e){return e.dom.nodeType},Mt=function(t){return function(e){return It(e)===t}},Ft=Mt(1),Ut=Mt(3),zt=Mt(9),jt=Mt(11),Ht=function(e){return At.fromDom(e.dom.ownerDocument)},Vt=function(e){return zt(e)?e:Ht(e)},qt=function(e){return At.fromDom(Vt(e).dom.defaultView)},$t=function(e){return U.from(e.dom.parentNode).map(At.fromDom)},Wt=function(e){return U.from(e.dom.previousSibling).map(At.fromDom)},Kt=function(e){return U.from(e.dom.nextSibling).map(At.fromDom)},Xt=function(e){return Z(Rt(e,Wt))},Yt=function(e){return Rt(e,Kt)},Gt=function(e){return z(e.dom.childNodes,At.fromDom)},Jt=function(e,t){var n=e.dom.childNodes;return U.from(n[t]).map(At.fromDom)},Qt=function(e){return Jt(e,0)},Zt=function(e){return Jt(e,e.dom.childNodes.length-1)},en=function(e){return jt(e)},tn=T(Element.prototype.attachShadow)&&T(Node.prototype.getRootNode),nn=E(tn),rn=tn?function(e){return At.fromDom(e.dom.getRootNode())}:Vt,on=function(e){return en(e)?e:function(e){var t=e.dom.head;if(null===t||t===undefined)throw new Error("Head is not available yet");return At.fromDom(t)}(Vt(e))},an=function(e){return At.fromDom(e.dom.host)},un=function(e){return D(e.dom.shadowRoot)},sn=function(t,n){$t(t).each(function(e){e.dom.insertBefore(n.dom,t.dom)})},cn=function(e,t){Kt(e).fold(function(){$t(e).each(function(e){fn(e,t)})},function(e){sn(e,t)})},ln=function(t,n){Qt(t).fold(function(){fn(t,n)},function(e){t.dom.insertBefore(n.dom,e.dom)})},fn=function(e,t){e.dom.appendChild(t.dom)},dn=function(t,e){W(e,function(e){fn(t,e)})},mn=function(e){e.dom.textContent="",W(Gt(e),function(e){pn(e)})},pn=function(e){var t=e.dom;null!==t.parentNode&&t.parentNode.removeChild(t)},gn=function(e){var t,n=Gt(e);0<n.length&&(t=e,W(n,function(e){sn(t,e)})),pn(e)},hn=function(e){var t=Ut(e)?e.dom.parentNode:e.dom;if(t===undefined||null===t||null===t.ownerDocument)return!1;var n,r,o,i,a=t.ownerDocument;return o=At.fromDom(t),i=rn(o),(en(i)?U.some(i):U.none()).fold(function(){return a.body.contains(t)},(n=hn,r=an,function(e){return n(r(e))}))},vn=function(n,r){return{left:n,top:r,translate:function(e,t){return vn(n+e,r+t)}}},yn=vn,bn=function(e,t){return e!==undefined?e:t!==undefined?t:0},Cn=function(e){var t,n=e.dom,r=n.ownerDocument.body;return r===n?yn(r.offsetLeft,r.offsetTop):hn(e)?(t=n.getBoundingClientRect(),yn(t.left,t.top)):yn(0,0)},wn=function(e){var t=e!==undefined?e.dom:document,n=t.body.scrollLeft||t.documentElement.scrollLeft,r=t.body.scrollTop||t.documentElement.scrollTop;return yn(n,r)},xn=function(e,t,n){var r=(n!==undefined?n.dom:document).defaultView;r&&r.scrollTo(e,t)},Sn=function(e,t){dt().browser.isSafari()&&T(e.dom.scrollIntoViewIfNeeded)?e.dom.scrollIntoViewIfNeeded(!1):e.dom.scrollIntoView(t)},Nn=function(e,t,n,r){return{x:e,y:t,width:n,height:r,right:e+n,bottom:t+r}},En=function(e){var t,n,r=e===undefined?window:e,o=r.document,i=wn(At.fromDom(o));return n=(t=r)===undefined?window:t,U.from(n.visualViewport).fold(function(){var e=r.document.documentElement,t=e.clientWidth,n=e.clientHeight;return Nn(i.left,i.top,t,n)},function(e){return Nn(Math.max(e.pageLeft,i.left),Math.max(e.pageTop,i.top),e.width,e.height)})},kn=function(t){return function(e){return!!e&&e.nodeType===t}},_n=function(e){return!!e&&!Object.getPrototypeOf(e)},An=kn(1),Rn=function(e){var n=e.map(function(e){return e.toLowerCase()});return function(e){if(e&&e.nodeName){var t=e.nodeName.toLowerCase();return M(n,t)}return!1}},Tn=function(r,e){var o=e.toLowerCase().split(" ");return function(e){var t;if(An(e))for(t=0;t<o.length;t++){var n=e.ownerDocument.defaultView.getComputedStyle(e,null);if((n?n.getPropertyValue(r):null)===o[t])return!0}return!1}},Dn=function(t){return function(e){return An(e)&&e.hasAttribute(t)}},On=function(e){return An(e)&&e.hasAttribute("data-mce-bogus")},Bn=function(e){return An(e)&&"TABLE"===e.tagName},Pn=function(t){return function(e){if(An(e)){if(e.contentEditable===t)return!0;if(e.getAttribute("data-mce-contenteditable")===t)return!0}return!1}},Ln=Rn(["textarea","input"]),In=kn(3),Mn=kn(8),Fn=kn(9),Un=kn(11),zn=Rn(["br"]),jn=Rn(["img"]),Hn=Pn("true"),Vn=Pn("false"),qn=Rn(["td","th"]),$n=Rn(["video","audio","object","embed"]),Wn=function(e){return e.style!==undefined&&T(e.style.getPropertyValue)},Kn=function(e,t,n){if(!(q(n)||A(n)||O(n)))throw console.error("Invalid call to Attribute.set. Key ",t,":: Value ",n,":: Element ",e),new Error("Attribute value was not simple");e.setAttribute(t,n+"")},Xn=function(e,t,n){Kn(e.dom,t,n)},Yn=function(e,t){var n=e.dom;ue(t,function(e,t){Kn(n,t,e)})},Gn=function(e,t){var n=e.dom.getAttribute(t);return null===n?undefined:n},Jn=function(e,t){return U.from(Gn(e,t))},Qn=function(e,t){e.dom.removeAttribute(t)},Zn=function(e,t){var n=e.dom;ue(t,function(e,t){!function(e,t,n){if(!q(n))throw console.error("Invalid call to CSS.set. Property ",t,":: Value ",n,":: Element ",e),new Error("CSS value must be a string: "+n);Wn(e)&&e.style.setProperty(t,n)}(n,t,e)})},er=function(e,t){var n=e.dom,r=window.getComputedStyle(n).getPropertyValue(t);return""!==r||hn(e)?r:tr(n,t)},tr=function(e,t){return Wn(e)?e.style.getPropertyValue(t):""},nr=function(e,t){var n=e.dom,r=tr(n,t);return U.from(r).filter(function(e){return 0<e.length})},rr=function(e){var t={},n=e.dom;if(Wn(n))for(var r=0;r<n.style.length;r++){var o=n.style.item(r);t[o]=n.style[o]}return t},or=dt().browser,ir=function(e){return Y(e,Ft)},ar=function(e,t){return e.children&&M(e.children,t)},ur=function(e,t,n){var r,o,i,a=0,u=0,s=e.ownerDocument;if(n=n||e,t){if(n===e&&t.getBoundingClientRect&&"static"===er(At.fromDom(e),"position"))return{x:a=(o=t.getBoundingClientRect()).left+(s.documentElement.scrollLeft||e.scrollLeft)-s.documentElement.clientLeft,y:u=o.top+(s.documentElement.scrollTop||e.scrollTop)-s.documentElement.clientTop};for(r=t;r&&r!==n&&r.nodeType&&!ar(r,n);)a+=r.offsetLeft||0,u+=r.offsetTop||0,r=r.offsetParent;for(r=t.parentNode;r&&r!==n&&r.nodeType&&!ar(r,n);)a-=r.scrollLeft||0,u-=r.scrollTop||0,r=r.parentNode;u+=(i=At.fromDom(t),or.isFirefox()&&"table"===Lt(i)?ir(Gt(i)).filter(function(e){return"caption"===Lt(e)}).bind(function(o){return ir(Yt(o)).map(function(e){var t=e.dom.offsetTop,n=o.dom.offsetTop,r=o.dom.offsetHeight;return t<=n?-r:0})}).getOr(0):0)}return{x:a,y:u}},sr={},cr={exports:sr};De=undefined,Oe=sr,Be=cr,Pe=undefined,function(e){"object"==typeof Oe&&void 0!==Be?Be.exports=e():"function"==typeof De&&De.amd?De([],e):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).EphoxContactWrapper=e()}(function(){return function l(i,a,u){function s(t,e){if(!a[t]){if(!i[t]){var n="function"==typeof Pe&&Pe;if(!e&&n)return n(t,!0);if(c)return c(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=a[t]={exports:{}};i[t][0].call(o.exports,function(e){return s(i[t][1][e]||e)},o,o.exports,l,i,a,u)}return a[t].exports}for(var c="function"==typeof Pe&&Pe,e=0;e<u.length;e++)s(u[e]);return s}({1:[function(e,t,n){var r,o,i=t.exports={};function a(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function s(e){if(r===setTimeout)return setTimeout(e,0);if((r===a||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:a}catch(e){r=a}try{o="function"==typeof clearTimeout?clearTimeout:u}catch(e){o=u}}();var c,l=[],f=!1,d=-1;function m(){f&&c&&(f=!1,c.length?l=c.concat(l):d=-1,l.length&&p())}function p(){if(!f){var e=s(m);f=!0;for(var t=l.length;t;){for(c=l,l=[];++d<t;)c&&c[d].run();d=-1,t=l.length}c=null,f=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===u||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}function g(e,t){this.fun=e,this.array=t}function h(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(1<arguments.length)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new g(e,t)),1!==l.length||f||s(p)},g.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=h,i.addListener=h,i.once=h,i.off=h,i.removeListener=h,i.removeAllListeners=h,i.emit=h,i.prependListener=h,i.prependOnceListener=h,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},{}],2:[function(e,f,t){(function(t){function r(){}function a(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],l(e,this)}function o(r,o){for(;3===r._state;)r=r._value;0!==r._state?(r._handled=!0,a._immediateFn(function(){var e,t=1===r._state?o.onFulfilled:o.onRejected;if(null!==t){try{e=t(r._value)}catch(n){return void u(o.promise,n)}i(o.promise,e)}else(1===r._state?i:u)(o.promise,r._value)})):r._deferreds.push(o)}function i(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof a)return e._state=3,e._value=t,void s(e);if("function"==typeof n)return void l((r=n,o=t,function(){r.apply(o,arguments)}),e)}e._state=1,e._value=t,s(e)}catch(i){u(e,i)}var r,o}function u(e,t){e._state=2,e._value=t,s(e)}function s(e){2===e._state&&0===e._deferreds.length&&a._immediateFn(function(){e._handled||a._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)o(e,e._deferreds[t]);e._deferreds=null}function c(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,i(t,e))},function(e){n||(n=!0,u(t,e))})}catch(r){if(n)return;n=!0,u(t,r)}}var e,n;e=this,n=setTimeout,a.prototype["catch"]=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var n=new this.constructor(r);return o(this,new c(e,t,n)),n},a.all=function(e){var s=Array.prototype.slice.call(e);return new a(function(o,i){if(0===s.length)return o([]);var a=s.length;for(var e=0;e<s.length;e++)!function u(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){u(t,e)},i)}s[t]=e,0==--a&&o(s)}catch(r){i(r)}}(e,s[e])})},a.resolve=function(t){return t&&"object"==typeof t&&t.constructor===a?t:new a(function(e){e(t)})},a.reject=function(n){return new a(function(e,t){t(n)})},a.race=function(o){return new a(function(e,t){for(var n=0,r=o.length;n<r;n++)o[n].then(e,t)})},a._immediateFn="function"==typeof t?function(e){t(e)}:function(e){n(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},a._setImmediateFn=function(e){a._immediateFn=e},a._setUnhandledRejectionFn=function(e){a._unhandledRejectionFn=e},void 0!==f&&f.exports?f.exports=a:e.Promise||(e.Promise=a)}).call(this,e("timers").setImmediate)},{timers:3}],3:[function(s,e,c){(function(e,t){var r=s("process/browser.js").nextTick,n=Function.prototype.apply,o=Array.prototype.slice,i={},a=0;function u(e,t){this._id=e,this._clearFn=t}c.setTimeout=function(){return new u(n.call(setTimeout,window,arguments),clearTimeout)},c.setInterval=function(){return new u(n.call(setInterval,window,arguments),clearInterval)},c.clearTimeout=c.clearInterval=function(e){e.close()},u.prototype.unref=u.prototype.ref=function(){},u.prototype.close=function(){this._clearFn.call(window,this._id)},c.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},c.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},c._unrefActive=c.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;0<=t&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},c.setImmediate="function"==typeof e?e:function(e){var t=a++,n=!(arguments.length<2)&&o.call(arguments,1);return i[t]=!0,r(function(){i[t]&&(n?e.apply(null,n):e.call(null),c.clearImmediate(t))}),t},c.clearImmediate="function"==typeof t?t:function(e){delete i[e]}}).call(this,s("timers").setImmediate,s("timers").clearImmediate)},{"process/browser.js":1,timers:3}],4:[function(e,t,n){var r=e("promise-polyfill"),o="undefined"!=typeof window?window:Function("return this;")();t.exports={boltExport:o.Promise||r}},{"promise-polyfill":2}]},{},[4])(4)});var lr=cr.exports.boltExport,fr=function(e){var n=U.none(),t=[],r=function(e){o()?a(e):t.push(e)},o=function(){return n.isSome()},i=function(e){W(e,a)},a=function(t){n.each(function(e){setTimeout(function(){t(e)},0)})};return e(function(e){o()||(n=U.some(e),i(t),t=[])}),{get:r,map:function(n){return fr(function(t){r(function(e){t(n(e))})})},isReady:o}},dr={nu:fr,pure:function(t){return fr(function(e){e(t)})}},mr=function(e){setTimeout(function(){throw e},0)},pr=function(n){var e=function(e){n().then(e,mr)};return{map:function(e){return pr(function(){return n().then(e)})},bind:function(t){return pr(function(){return n().then(function(e){return t(e).toPromise()})})},anonBind:function(e){return pr(function(){return n().then(function(){return e.toPromise()})})},toLazy:function(){return dr.nu(e)},toCached:function(){var e=null;return pr(function(){return null===e&&(e=n()),e})},toPromise:n,get:e}},gr=function(e){return pr(function(){return new lr(e)})},hr=function(a,e){return e(function(r){var o=[],i=0;0===a.length?r([]):W(a,function(e,t){var n;e.get((n=t,function(e){o[n]=e,++i>=a.length&&r(o)}))})})},vr=function(n){return{is:function(e){return n===e},isValue:k,isError:C,getOr:E(n),getOrThunk:E(n),getOrDie:E(n),or:function(e){return vr(n)},orThunk:function(e){return vr(n)},fold:function(e,t){return t(n)},map:function(e){return vr(e(n))},mapError:function(e){return vr(n)},each:function(e){e(n)},bind:function(e){return e(n)},exists:function(e){return e(n)},forall:function(e){return e(n)},toOptional:function(){return U.some(n)}}},yr=function(n){return{is:C,isValue:C,isError:k,getOr:o,getOrThunk:function(e){return e()},getOrDie:function(){return m(String(n))()},or:function(e){return e},orThunk:function(e){return e()},fold:function(e,t){return e(n)},map:function(e){return yr(n)},mapError:function(e){return yr(e(n))},each:V,bind:function(e){return yr(n)},exists:C,forall:k,toOptional:U.none}},br={value:vr,error:yr,fromOption:function(e,t){return e.fold(function(){return yr(t)},vr)}},Cr=function(a){if(!S(a))throw new Error("cases must be an array");if(0===a.length)throw new Error("there must be at least one case");var u=[],n={};return W(a,function(e,r){var t=ie(e);if(1!==t.length)throw new Error("one and only one name per case");var o=t[0],i=e[o];if(n[o]!==undefined)throw new Error("duplicate key detected:"+o);if("cata"===o)throw new Error("cannot have a case named cata (sorry)");if(!S(i))throw new Error("case arguments must be an array");u.push(o),n[o]=function(){var e=arguments.length;if(e!==i.length)throw new Error("Wrong number of arguments to case "+o+". Expected "+i.length+" ("+i+"), got "+e);for(var n=new Array(e),t=0;t<n.length;t++)n[t]=arguments[t];return{fold:function(){if(arguments.length!==a.length)throw new Error("Wrong number of arguments to fold. Expected "+a.length+", got "+arguments.length);return arguments[r].apply(null,n)},match:function(e){var t=ie(e);if(u.length!==t.length)throw new Error("Wrong number of arguments to match. Expected: "+u.join(",")+"\nActual: "+t.join(","));if(!Q(u,function(e){return M(t,e)}))throw new Error("Not all branches were specified when using match. Specified: "+t.join(", ")+"\nRequired: "+u.join(", "));return e[o].apply(null,n)},log:function(e){console.log(e,{constructors:u,constructor:o,params:n})}}}}),n},wr=(Cr([{bothErrors:["error1","error2"]},{firstError:["error1","value2"]},{secondError:["value1","error2"]},{bothValues:["value1","value2"]}]),function(e){return e.fold(o,o)});function xr(e,t,n,r,o){return e(n,r)?U.some(n):T(o)&&o(n)?U.none():t(n,r,o)}var Sr,Nr,Er,kr,_r=function(e,t,n){for(var r=e.dom,o=T(n)?n:C;r.parentNode;){r=r.parentNode;var i=At.fromDom(r);if(t(i))return U.some(i);if(o(i))break}return U.none()},Ar=function(e,t,n){return xr(function(e,t){return t(e)},_r,e,t,n)},Rr=function(e,t){return Y(e.dom.childNodes,function(e){return t(At.fromDom(e))}).map(At.fromDom)},Tr=function(e,t,n){return _r(e,function(e){return Tt(e,t)},n)},Dr=function(e,t){return n=t,o=(r=e)===undefined?document:r.dom,Dt(o)?U.none():U.from(o.querySelector(n)).map(At.fromDom);var n,r,o},Or=function(e,t,n){return xr(Tt,Tr,e,t,n)},Br=window.Promise?window.Promise:(Sr=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},Er=(Nr=function(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],zr(e,Pr(Ir,this),Pr(Mr,this))}).immediateFn||"function"==typeof setImmediate&&setImmediate||function(e){setTimeout(e,1)},Nr.prototype["catch"]=function(e){return this.then(null,e)},Nr.prototype.then=function(n,r){var o=this;return new Nr(function(e,t){Lr.call(o,new Ur(n,r,e,t))})},Nr.all=function(){var s=Array.prototype.slice.call(1===arguments.length&&Sr(arguments[0])?arguments[0]:arguments);return new Nr(function(o,i){if(0===s.length)return o([]);for(var a=s.length,e=0;e<s.length;e++)!function u(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){u(t,e)},i)}s[t]=e,0==--a&&o(s)}catch(r){i(r)}}(e,s[e])})},Nr.resolve=function(t){return t&&"object"==typeof t&&t.constructor===Nr?t:new Nr(function(e){e(t)})},Nr.reject=function(n){return new Nr(function(e,t){t(n)})},Nr.race=function(o){return new Nr(function(e,t){for(var n=0,r=o.length;n<r;n++)o[n].then(e,t)})},Nr);function Pr(e,t){return function(){e.apply(t,arguments)}}function Lr(r){var o=this;null!==this._state?Er(function(){var e,t=o._state?r.onFulfilled:r.onRejected;if(null!==t){try{e=t(o._value)}catch(n){return void r.reject(n)}r.resolve(e)}else(o._state?r.resolve:r.reject)(o._value)}):this._deferreds.push(r)}function Ir(e){try{if(e===this)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var t=e.then;if("function"==typeof t)return void zr(Pr(t,e),Pr(Ir,this),Pr(Mr,this))}this._state=!0,this._value=e,Fr.call(this)}catch(n){Mr.call(this,n)}}function Mr(e){this._state=!1,this._value=e,Fr.call(this)}function Fr(){for(var e=0,t=this._deferreds.length;e<t;e++)Lr.call(this,this._deferreds[e]);this._deferreds=null}function Ur(e,t,n,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.resolve=n,this.reject=r}function zr(e,t,n){var r=!1;try{e(function(e){r||(r=!0,t(e))},function(e){r||(r=!0,n(e))})}catch(o){if(r)return;r=!0,n(o)}}var jr=function(e,t){return"number"!=typeof t&&(t=0),setTimeout(e,t)},Hr=function(e,t){return"number"!=typeof t&&(t=1),setInterval(e,t)},Vr=function(n,r){var o,e=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];clearTimeout(o),o=jr(function(){n.apply(this,e)},r)};return e.stop=function(){clearTimeout(o)},e},qr={requestAnimationFrame:function(e,t){kr?kr.then(e):kr=new Br(function(e){!function(e,t){for(var n=window.requestAnimationFrame,r=["ms","moz","webkit"],o=0;o<r.length&&!n;o++)n=window[r[o]+"RequestAnimationFrame"];(n=n||function(e){window.setTimeout(e,0)})(e,t)}(e,t=t||document.body)}).then(e)},setTimeout:jr,setInterval:Hr,setEditorTimeout:function(e,t,n){return jr(function(){e.removed||t()},n)},setEditorInterval:function(e,t,n){var r=Hr(function(){e.removed?clearInterval(r):t()},n);return r},debounce:Vr,throttle:Vr,clearInterval:function(e){return clearInterval(e)},clearTimeout:function(e){return clearTimeout(e)}};function $r(m,p){void 0===p&&(p={});var g=0,h={},v=At.fromDom(m),y=Vt(v),b=p.maxLoadTime||5e3,n=function(e,t,n){var r,o=kt._addCacheSuffix(e),i=ge(h,o).getOrThunk(function(){return{id:"mce-u"+g++,passed:[],failed:[],count:0}});(h[o]=i).count++;var a,u,s,c=function(e,t){for(var n=e.length;n--;)e[n]();i.status=t,i.passed=[],i.failed=[],r&&(r.onload=null,r.onerror=null,r=null)},l=function(){return c(i.passed,2)},f=function(){return c(i.failed,3)},d=function(){var e;e=d,function(){for(var e=m.styleSheets,t=e.length;t--;){var n=e[t].ownerNode;if(n&&n.id===r.id)return l(),1}}()||(Date.now()-u<b?qr.setTimeout(e):f())};t&&i.passed.push(t),n&&i.failed.push(n),1!==i.status&&(2!==i.status?3!==i.status?(i.status=1,a=At.fromTag("link",y.dom),Yn(a,{rel:"stylesheet",type:"text/css",id:i.id}),u=Date.now(),p.contentCssCors&&Xn(a,"crossOrigin","anonymous"),p.referrerPolicy&&Xn(a,"referrerpolicy",p.referrerPolicy),(r=a.dom).onload=d,r.onerror=f,s=a,fn(on(v),s),Xn(a,"href",o)):f():l())},o=function(t){return gr(function(e){n(t,a(e,E(br.value(t))),a(e,E(br.error(t))))})},t=function(e){var r=kt._addCacheSuffix(e);ge(h,r).each(function(e){var t,n;0==--e.count&&(delete h[r],t=e.id,n=on(v),Dr(n,"#"+t).each(pn))})};return{load:n,loadAll:function(e,n,r){var t;t=z(e,o),hr(t,gr).get(function(e){var t=function(e,t){for(var n=[],r=[],o=0,i=e.length;o<i;o++){var a=e[o];(t(a,o)?n:r).push(a)}return{pass:n,fail:r}}(e,function(e){return e.isValue()});0<t.fail.length?r(t.fail.map(wr)):n(t.pass.map(wr))})},unload:t,unloadAll:function(e){W(e,function(e){t(e)})},_setReferrerPolicy:function(e){p.referrerPolicy=e}}}var Wr,Kr=(Wr=new WeakMap,{forElement:function(e,t){var n=rn(e).dom;return U.from(Wr.get(n)).getOrThunk(function(){var e=$r(n,t);return Wr.set(n,e),e})}}),Xr=(Yr.prototype.current=function(){return this.node},Yr.prototype.next=function(e){return this.node=this.findSibling(this.node,"firstChild","nextSibling",e),this.node},Yr.prototype.prev=function(e){return this.node=this.findSibling(this.node,"lastChild","previousSibling",e),this.node},Yr.prototype.prev2=function(e){return this.node=this.findPreviousNode(this.node,"lastChild","previousSibling",e),this.node},Yr.prototype.findSibling=function(e,t,n,r){var o,i;if(e){if(!r&&e[t])return e[t];if(e!==this.rootNode){if(o=e[n])return o;for(i=e.parentNode;i&&i!==this.rootNode;i=i.parentNode)if(o=i[n])return o}}},Yr.prototype.findPreviousNode=function(e,t,n,r){var o,i,a;if(e){if(o=e[n],this.rootNode&&o===this.rootNode)return;if(o){if(!r)for(a=o[t];a;a=a[t])if(!a[t])return a;return o}if((i=e.parentNode)&&i!==this.rootNode)return i}},Yr);function Yr(e,t){this.node=e,this.rootNode=t,this.current=this.current.bind(this),this.next=this.next.bind(this),this.prev=this.prev.bind(this),this.prev2=this.prev2.bind(this)}var Gr,Jr,Qr=function(t){var n;return function(e){return(n=n||function(e,t){for(var n={},r=0,o=e.length;r<o;r++){var i=e[r];n[String(i)]=t(i,r)}return n}(t,k)).hasOwnProperty(Lt(e))}},Zr=Qr(["h1","h2","h3","h4","h5","h6"]),eo=Qr(["article","aside","details","div","dt","figcaption","footer","form","fieldset","header","hgroup","html","main","nav","section","summary","body","p","dl","multicol","dd","figure","address","center","blockquote","h1","h2","h3","h4","h5","h6","listing","xmp","pre","plaintext","menu","dir","ul","ol","li","hr","table","tbody","thead","tfoot","th","tr","td","caption"]),to=function(e){return Ft(e)&&!eo(e)},no=function(e){return Ft(e)&&"br"===Lt(e)},ro=Qr(["h1","h2","h3","h4","h5","h6","p","div","address","pre","form","blockquote","center","dir","fieldset","header","footer","article","section","hgroup","aside","nav","figure"]),oo=Qr(["ul","ol","dl"]),io=Qr(["li","dd","dt"]),ao=Qr(["thead","tbody","tfoot"]),uo=Qr(["td","th"]),so=Qr(["pre","script","textarea","style"]),co="\ufeff",lo="\xa0",fo=co,mo=function(e){return e===co},po=function(e){return e.replace(/\uFEFF/g,"")},go=An,ho=In,vo=function(e){return ho(e)&&(e=e.parentNode),go(e)&&e.hasAttribute("data-mce-caret")},yo=function(e){return ho(e)&&mo(e.data)},bo=function(e){return vo(e)||yo(e)},Co=function(e){return e.firstChild!==e.lastChild||!zn(e.firstChild)},wo=function(e){var t=e.container();return!!In(t)&&(t.data.charAt(e.offset())===fo||e.isAtStart()&&yo(t.previousSibling))},xo=function(e){var t=e.container();return!!In(t)&&(t.data.charAt(e.offset()-1)===fo||e.isAtEnd()&&yo(t.nextSibling))},So=function(e,t,n){var r,o=t.ownerDocument.createElement(e);o.setAttribute("data-mce-caret",n?"before":"after"),o.setAttribute("data-mce-bogus","all"),o.appendChild(((r=document.createElement("br")).setAttribute("data-mce-bogus","1"),r));var i=t.parentNode;return n?i.insertBefore(o,t):t.nextSibling?i.insertBefore(o,t.nextSibling):i.appendChild(o),o},No=function(e){return ho(e)&&e.data[0]===fo},Eo=function(e){return ho(e)&&e.data[e.data.length-1]===fo},ko=function(e){return e&&e.hasAttribute("data-mce-caret")?(t=e.getElementsByTagName("br"),n=t[t.length-1],On(n)&&n.parentNode.removeChild(n),e.removeAttribute("data-mce-caret"),e.removeAttribute("data-mce-bogus"),e.removeAttribute("style"),e.removeAttribute("_moz_abspos"),e):null;var t,n},_o=Hn,Ao=Vn,Ro=zn,To=In,Do=Rn(["script","style","textarea"]),Oo=Rn(["img","input","textarea","hr","iframe","video","audio","object","embed"]),Bo=Rn(["table"]),Po=bo,Lo=function(e){return!Po(e)&&(To(e)?!Do(e.parentNode):Oo(e)||Ro(e)||Bo(e)||Io(e))},Io=function(e){return!1===(An(t=e)&&"true"===t.getAttribute("unselectable"))&&Ao(e);var t},Mo=function(e,t){return Lo(e)&&function(e,t){for(e=e.parentNode;e&&e!==t;e=e.parentNode){if(Io(e))return!1;if(_o(e))return!0}return!0}(e,t)},Fo=/^[ \t\r\n]*$/,Uo=function(e){return Fo.test(e)},zo=function(e,t){var n,r,o,i=At.fromDom(t),a=At.fromDom(e);return n=a,r="pre,code",o=N(Ot,i),Tr(n,r,o).isSome()},jo=function(e,t){return Lo(e)&&!1===(o=t,In(r=e)&&Uo(r.data)&&!1===zo(r,o))||An(n=e)&&"A"===n.nodeName&&!n.hasAttribute("href")&&(n.hasAttribute("name")||n.hasAttribute("id"))||Ho(e);var n,r,o},Ho=Dn("data-mce-bookmark"),Vo=Dn("data-mce-bogus"),qo=(Gr="data-mce-bogus",Jr="all",function(e){return An(e)&&e.getAttribute(Gr)===Jr}),$o=function(e,t){return void 0===t&&(t=!0),function(e,t){var n,r=0;if(jo(e,e))return!1;if(!(n=e.firstChild))return!0;var o=new Xr(n,e);do{if(t){if(qo(n)){n=o.next(!0);continue}if(Vo(n)){n=o.next();continue}}if(zn(n))r++,n=o.next();else{if(jo(n,e))return!1;n=o.next()}}while(n);return r<=1}(e.dom,t)},Wo=function(e,t){return D(e)&&(jo(e,t)||to(At.fromDom(e)))},Ko=function(e){return"span"===e.nodeName.toLowerCase()&&"bookmark"===e.getAttribute("data-mce-type")},Xo=function(e,t){return In(e)&&0<e.data.length&&(o=new Xr(n=e,r=t).prev(!1),i=new Xr(n,r).next(!1),a=R(o)||Wo(o,r),u=R(i)||Wo(i,r),a&&u);var n,r,o,i,a,u},Yo=function(e,t,n){var r=n||t;if(An(t)&&Ko(t))return t;for(var o,i,a,u=t.childNodes,s=u.length-1;0<=s;s--)Yo(e,u[s],r);return!An(t)||1===(o=t.childNodes).length&&Ko(o[0])&&t.parentNode.insertBefore(o[0],t),Un(a=t)||Fn(a)||jo(t,r)||An(i=t)&&0<i.childNodes.length||Xo(t,r)||e.remove(t),t},Go=kt.makeMap,Jo=/[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,Qo=/[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,Zo=/[<>&\"\']/g,ei=/&#([a-z0-9]+);?|&([a-z0-9]+);/gi,ti={128:"\u20ac",130:"\u201a",131:"\u0192",132:"\u201e",133:"\u2026",134:"\u2020",135:"\u2021",136:"\u02c6",137:"\u2030",138:"\u0160",139:"\u2039",140:"\u0152",142:"\u017d",145:"\u2018",146:"\u2019",147:"\u201c",148:"\u201d",149:"\u2022",150:"\u2013",151:"\u2014",152:"\u02dc",153:"\u2122",154:"\u0161",155:"\u203a",156:"\u0153",158:"\u017e",159:"\u0178"},ni={'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;","&":"&amp;","`":"&#96;"},ri={"&lt;":"<","&gt;":">","&amp;":"&","&quot;":'"',"&apos;":"'"},oi=function(e,t){var n,r,o,i={};if(e){for(e=e.split(","),t=t||10,n=0;n<e.length;n+=2)r=String.fromCharCode(parseInt(e[n],t)),ni[r]||(o="&"+e[n+1]+";",i[r]=o,i[o]=r);return i}},ii=oi("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",32),ai=function(e,t){return e.replace(t?Jo:Qo,function(e){return ni[e]||e})},ui=function(e,t){return e.replace(t?Jo:Qo,function(e){return 1<e.length?"&#"+(1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320)+65536)+";":ni[e]||"&#"+e.charCodeAt(0)+";"})},si=function(e,t,n){return n=n||ii,e.replace(t?Jo:Qo,function(e){return ni[e]||n[e]||e})},ci={encodeRaw:ai,encodeAllRaw:function(e){return(""+e).replace(Zo,function(e){return ni[e]||e})},encodeNumeric:ui,encodeNamed:si,getEncodeFunc:function(e,t){var n=oi(t)||ii,r=Go(e.replace(/\+/g,","));return r.named&&r.numeric?function(e,t){return e.replace(t?Jo:Qo,function(e){return ni[e]!==undefined?ni[e]:n[e]!==undefined?n[e]:1<e.length?"&#"+(1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320)+65536)+";":"&#"+e.charCodeAt(0)+";"})}:r.named?t?function(e,t){return si(e,t,n)}:si:r.numeric?ui:ai},decode:function(e){return e.replace(ei,function(e,t){return t?65535<(t="x"===t.charAt(0).toLowerCase()?parseInt(t.substr(1),16):parseInt(t,10))?(t-=65536,String.fromCharCode(55296+(t>>10),56320+(1023&t))):ti[t]||String.fromCharCode(t):ri[e]||ii[e]||(n=e,(r=At.fromTag("div").dom).innerHTML=n,r.textContent||r.innerText||n);var n,r})}},li={},fi={},di=kt.makeMap,mi=kt.each,pi=kt.extend,gi=kt.explode,hi=kt.inArray,vi=function(e,t){return(e=kt.trim(e))?e.split(t||" "):[]},yi=function(e){var s,t,n,r,o,i,c={},a=function(e,t,n){var r,o,i=function(e,t){for(var n={},r=0,o=e.length;r<o;r++)n[e[r]]=t||{};return n};t=t||"","string"==typeof(n=n||[])&&(n=vi(n));for(var a=vi(e),u=a.length;u--;)o={attributes:i(r=vi([s,t].join(" "))),attributesOrder:r,children:i(n,fi)},c[a[u]]=o},u=function(e,t){for(var n,r,o,i=vi(e),a=i.length,u=vi(t);a--;)for(n=c[i[a]],r=0,o=u.length;r<o;r++)n.attributes[u[r]]={},n.attributesOrder.push(u[r])};return li[e]?li[e]:(s="id accesskey class dir lang style tabindex title role",t="address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul",n="a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd label map noscript object q s samp script select small span strong sub sup textarea u var #text #comment","html4"!==e&&(s+=" contenteditable contextmenu draggable dropzone hidden spellcheck translate",t+=" article aside details dialog figure main header footer hgroup section nav",n+=" audio canvas command datalist mark meter output picture progress time wbr video ruby bdi keygen"),"html5-strict"!==e&&(s+=" xml:lang",n=[n,i="acronym applet basefont big font strike tt"].join(" "),mi(vi(i),function(e){a(e,"",n)}),t=[t,o="center dir isindex noframes"].join(" "),r=[t,n].join(" "),mi(vi(o),function(e){a(e,"",r)})),r=r||[t,n].join(" "),a("html","manifest","head body"),a("head","","base command link meta noscript script style title"),a("title hr noscript br"),a("base","href target"),a("link","href rel media hreflang type sizes hreflang"),a("meta","name http-equiv content charset"),a("style","media type scoped"),a("script","src async defer type charset"),a("body","onafterprint onbeforeprint onbeforeunload onblur onerror onfocus onhashchange onload onmessage onoffline ononline onpagehide onpageshow onpopstate onresize onscroll onstorage onunload",r),a("address dt dd div caption","",r),a("h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn","",n),a("blockquote","cite",r),a("ol","reversed start type","li"),a("ul","","li"),a("li","value",r),a("dl","","dt dd"),a("a","href target rel media hreflang type",n),a("q","cite",n),a("ins del","cite datetime",r),a("img","src sizes srcset alt usemap ismap width height"),a("iframe","src name width height",r),a("embed","src type width height"),a("object","data type typemustmatch name usemap form width height",[r,"param"].join(" ")),a("param","name value"),a("map","name",[r,"area"].join(" ")),a("area","alt coords shape href target rel media hreflang type"),a("table","border","caption colgroup thead tfoot tbody tr"+("html4"===e?" col":"")),a("colgroup","span","col"),a("col","span"),a("tbody thead tfoot","","tr"),a("tr","","td th"),a("td","colspan rowspan headers",r),a("th","colspan rowspan headers scope abbr",r),a("form","accept-charset action autocomplete enctype method name novalidate target",r),a("fieldset","disabled form name",[r,"legend"].join(" ")),a("label","form for",n),a("input","accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"),a("button","disabled form formaction formenctype formmethod formnovalidate formtarget name type value","html4"===e?r:n),a("select","disabled form multiple name required size","option optgroup"),a("optgroup","disabled label","option"),a("option","disabled label selected value"),a("textarea","cols dirname disabled form maxlength name readonly required rows wrap"),a("menu","type label",[r,"li"].join(" ")),a("noscript","",r),"html4"!==e&&(a("wbr"),a("ruby","",[n,"rt rp"].join(" ")),a("figcaption","",r),a("mark rt rp summary bdi","",n),a("canvas","width height",r),a("video","src crossorigin poster preload autoplay mediagroup loop muted controls width height buffered",[r,"track source"].join(" ")),a("audio","src crossorigin preload autoplay mediagroup loop muted controls buffered volume",[r,"track source"].join(" ")),a("picture","","img source"),a("source","src srcset type media sizes"),a("track","kind src srclang label default"),a("datalist","",[n,"option"].join(" ")),a("article section nav aside main header footer","",r),a("hgroup","","h1 h2 h3 h4 h5 h6"),a("figure","",[r,"figcaption"].join(" ")),a("time","datetime",n),a("dialog","open",r),a("command","type label icon disabled checked radiogroup command"),a("output","for form name",n),a("progress","value max",n),a("meter","value min max low high optimum",n),a("details","open",[r,"summary"].join(" ")),a("keygen","autofocus challenge disabled form keytype name")),"html5-strict"!==e&&(u("script","language xml:space"),u("style","xml:space"),u("object","declare classid code codebase codetype archive standby align border hspace vspace"),u("embed","align name hspace vspace"),u("param","valuetype type"),u("a","charset name rev shape coords"),u("br","clear"),u("applet","codebase archive code object alt name width height align hspace vspace"),u("img","name longdesc align border hspace vspace"),u("iframe","longdesc frameborder marginwidth marginheight scrolling align"),u("font basefont","size color face"),u("input","usemap align"),u("select"),u("textarea"),u("h1 h2 h3 h4 h5 h6 div p legend caption","align"),u("ul","type compact"),u("li","type"),u("ol dl menu dir","compact"),u("pre","width xml:space"),u("hr","align noshade size width"),u("isindex","prompt"),u("table","summary width frame rules cellspacing cellpadding align bgcolor"),u("col","width align char charoff valign"),u("colgroup","width align char charoff valign"),u("thead","align char charoff valign"),u("tr","align char charoff valign bgcolor"),u("th","axis align char charoff valign nowrap bgcolor width height"),u("form","accept"),u("td","abbr axis scope align char charoff valign nowrap bgcolor width height"),u("tfoot","align char charoff valign"),u("tbody","align char charoff valign"),u("area","nohref"),u("body","background bgcolor text link vlink alink")),"html4"!==e&&(u("input button select textarea","autofocus"),u("input textarea","placeholder"),u("a","download"),u("link script img","crossorigin"),u("img","loading"),u("iframe","sandbox seamless allowfullscreen loading")),mi(vi("a form meter progress dfn"),function(e){c[e]&&delete c[e].children[e]}),delete c.caption.children.table,delete c.script,li[e]=c)},bi=function(e,n){var r;return e&&(r={},"string"==typeof e&&(e={"*":e}),mi(e,function(e,t){r[t]=r[t.toUpperCase()]=("map"===n?di:gi)(e,/[, ]/)})),r};function Ci(i){var S={},u={},N=[],s={},t={},e=function(e,t,n){var r=i[e];return r?r=di(r,/[, ]/,di(r.toUpperCase(),/[, ]/)):(r=li[e])||(r=di(t," ",di(t.toUpperCase()," ")),r=pi(r,n),li[e]=r),r},n=yi((i=i||{}).schema);!1===i.verify_html&&(i.valid_elements="*[*]");var r=bi(i.valid_styles),o=bi(i.invalid_styles,"map"),a=bi(i.valid_classes,"map"),c=e("whitespace_elements","pre script noscript style textarea video audio iframe object code"),l=e("self_closing_elements","colgroup dd dt li option p td tfoot th thead tr"),f=e("short_ended_elements","area base basefont br col frame hr img input isindex link meta param embed source wbr track"),d=e("boolean_attributes","checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls"),m="td th iframe video audio object script code",p=e("non_empty_elements",m+" pre",f),g=e("move_caret_before_on_enter_elements",m+" table",f),h=e("text_block_elements","h1 h2 h3 h4 h5 h6 p div address pre form blockquote center dir fieldset header footer article section hgroup aside main nav figure"),v=e("block_elements","hr table tbody thead tfoot th tr td li ol ul caption dl dt dd noscript menu isindex option datalist select optgroup figcaption details summary",h),y=e("text_inline_elements","span strong b em i font strike u var cite dfn code mark q sup sub samp");mi((i.special||"script noscript iframe noframes noembed title style textarea xmp").split(" "),function(e){t[e]=new RegExp("</"+e+"[^>]*>","gi")});var E=function(e){return new RegExp("^"+e.replace(/([?+*])/g,".$1")+"$")},b=function(e){var t,n,r,o,i,a,u,s,c,l,f,d,m,p,g,h,v,y,b=/^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)])?$/,C=/^([!\-])?(\w+[\\:]:\w+|[^=:<]+)?(?:([=:<])(.*))?$/,w=/[*?+]/;if(e){var x=vi(e,",");for(S["@"]&&(h=S["@"].attributes,v=S["@"].attributesOrder),t=0,n=x.length;t<n;t++)if(i=b.exec(x[t])){if(p=i[1],c=i[2],g=i[3],s=i[5],a={attributes:d={},attributesOrder:m=[]},"#"===p&&(a.paddEmpty=!0),"-"===p&&(a.removeEmpty=!0),"!"===i[4]&&(a.removeEmptyAttrs=!0),h&&(ue(h,function(e,t){d[t]=e}),m.push.apply(m,v)),s)for(r=0,o=(s=vi(s,"|")).length;r<o;r++)if(i=C.exec(s[r])){if(u={},f=i[1],l=i[2].replace(/[\\:]:/g,":"),p=i[3],y=i[4],"!"===f&&(a.attributesRequired=a.attributesRequired||[],a.attributesRequired.push(l),u.required=!0),"-"===f){delete d[l],m.splice(hi(m,l),1);continue}p&&("="===p&&(a.attributesDefault=a.attributesDefault||[],a.attributesDefault.push({name:l,value:y}),u.defaultValue=y),":"===p&&(a.attributesForced=a.attributesForced||[],a.attributesForced.push({name:l,value:y}),u.forcedValue=y),"<"===p&&(u.validValues=di(y,"?"))),w.test(l)?(a.attributePatterns=a.attributePatterns||[],u.pattern=E(l),a.attributePatterns.push(u)):(d[l]||m.push(l),d[l]=u)}h||"@"!==c||(h=d,v=m),g&&(a.outputName=c,S[g]=a),w.test(c)?(a.pattern=E(c),N.push(a)):S[c]=a}}},C=function(e){S={},N=[],b(e),mi(n,function(e,t){u[t]=e.children})},w=function(e){var a=/^(~)?(.+)$/;e&&(li.text_block_elements=li.block_elements=null,mi(vi(e,","),function(e){var t,n=a.exec(e),r="~"===n[1],o=r?"span":"div",i=n[2];u[i]=u[o],s[i]=o,r||(v[i.toUpperCase()]={},v[i]={}),S[i]||(t=S[o],delete(t=pi({},t)).removeEmptyAttrs,delete t.removeEmpty,S[i]=t),mi(u,function(e,t){e[o]&&(u[t]=e=pi({},u[t]),e[i]=e[o])})}))},x=function(e){var o=/^([+\-]?)([A-Za-z0-9_\-.\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u037f-\u1fff\u200c-\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]+)\[([^\]]+)]$/;li[i.schema]=null,e&&mi(vi(e,","),function(e){var t,n,r=o.exec(e);r&&(n=r[1],t=n?u[r[2]]:u[r[2]]={"#comment":{}},t=u[r[2]],mi(vi(r[3],"|"),function(e){"-"===n?delete t[e]:t[e]={}}))})},k=function(e){var t,n=S[e];if(n)return n;for(t=N.length;t--;)if((n=N[t]).pattern.test(e))return n};i.valid_elements?C(i.valid_elements):(mi(n,function(e,t){S[t]={attributes:e.attributes,attributesOrder:e.attributesOrder},u[t]=e.children}),"html5"!==i.schema&&mi(vi("strong/b em/i"),function(e){var t=vi(e,"/");S[t[1]].outputName=t[0]}),mi(vi("ol ul sub sup blockquote span font a table tbody strong em b i"),function(e){S[e]&&(S[e].removeEmpty=!0)}),mi(vi("p h1 h2 h3 h4 h5 h6 th td pre div address caption li"),function(e){S[e].paddEmpty=!0}),mi(vi("span"),function(e){S[e].removeEmptyAttrs=!0})),w(i.custom_elements),x(i.valid_children),b(i.extended_valid_elements),x("+ol[ul|ol],+ul[ul|ol]"),mi({dd:"dl",dt:"dl",li:"ul ol",td:"tr",th:"tr",tr:"tbody thead tfoot",tbody:"table",thead:"table",tfoot:"table",legend:"fieldset",area:"map",param:"video audio object"},function(e,t){S[t]&&(S[t].parentsRequired=vi(e))}),i.invalid_elements&&mi(gi(i.invalid_elements),function(e){S[e]&&delete S[e]}),k("span")||b("span[!data-mce-type|*]");return{children:u,elements:S,getValidStyles:function(){return r},getValidClasses:function(){return a},getBlockElements:function(){return v},getInvalidStyles:function(){return o},getShortEndedElements:function(){return f},getTextBlockElements:function(){return h},getTextInlineElements:function(){return y},getBoolAttrs:function(){return d},getElementRule:k,getSelfClosingElements:function(){return l},getNonEmptyElements:function(){return p},getMoveCaretBeforeOnEnterElements:function(){return g},getWhiteSpaceElements:function(){return c},getSpecialElements:function(){return t},isValidChild:function(e,t){var n=u[e.toLowerCase()];return!(!n||!n[t.toLowerCase()])},isValid:function(e,t){var n,r,o=k(e);if(o){if(!t)return!0;if(o.attributes[t])return!0;if(n=o.attributePatterns)for(r=n.length;r--;)if(n[r].pattern.test(e))return!0}return!1},getCustomElements:function(){return s},addValidElements:b,setValidElements:C,addCustomElements:w,addValidChildren:x}}var wi=function(e,t,n,r){var o=function(e){return 1<(e=parseInt(e,10).toString(16)).length?e:"0"+e};return"#"+o(t)+o(n)+o(r)},xi=function(b,e){var s,c,C=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,w=/(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,x=/\s*([^:]+):\s*([^;]+);?/g,S=/\s+$/,N={},E=co;b=b||{},e&&(s=e.getValidStyles(),c=e.getInvalidStyles());for(var t=("\\\" \\' \\; \\: ; : "+E).split(" "),k=0;k<t.length;k++)N[t[k]]=E+k,N[E+k]=t[k];return{toHex:function(e){return e.replace(C,wi)},parse:function(e){var t,n,r,o,i,a,u,s,c={},l=b.url_converter,f=b.url_converter_scope||this,d=function(e,t,n){var r=c[e+"-top"+t];if(r){var o=c[e+"-right"+t];if(o){var i=c[e+"-bottom"+t];if(i){var a=c[e+"-left"+t];if(a){var u=[r,o,i,a];for(k=u.length-1;k--&&u[k]===u[k+1];);-1<k&&n||(c[e+t]=-1===k?u[0]:u.join(" "),delete c[e+"-top"+t],delete c[e+"-right"+t],delete c[e+"-bottom"+t],delete c[e+"-left"+t])}}}}},m=function(e){var t,n=c[e];if(n){for(t=(n=n.split(" ")).length;t--;)if(n[t]!==n[0])return!1;return c[e]=n[0],!0}},p=function(e){return o=!0,N[e]},g=function(e,t){return o&&(e=e.replace(/\uFEFF[0-9]/g,function(e){return N[e]})),t||(e=e.replace(/\\([\'\";:])/g,"$1")),e},h=function(e){return String.fromCharCode(parseInt(e.slice(1),16))},v=function(e){return e.replace(/\\[0-9a-f]+/gi,h)},y=function(e,t,n,r,o,i){if(o=o||i)return"'"+(o=g(o)).replace(/\'/g,"\\'")+"'";if(t=g(t||n||r),!b.allow_script_urls){var a=t.replace(/[\s\r\n]+/g,"");if(/(java|vb)script:/i.test(a))return"";if(!b.allow_svg_data_urls&&/^data:image\/svg/i.test(a))return""}return l&&(t=l.call(f,t,"style")),"url('"+t.replace(/\'/g,"\\'")+"')"};if(e){for(e=(e=e.replace(/[\u0000-\u001F]/g,"")).replace(/\\[\"\';:\uFEFF]/g,p).replace(/\"[^\"]+\"|\'[^\']+\'/g,function(e){return e.replace(/[;:]/g,p)});t=x.exec(e);)if(x.lastIndex=t.index+t[0].length,n=t[1].replace(S,"").toLowerCase(),r=t[2].replace(S,""),n&&r){if(n=v(n),r=v(r),-1!==n.indexOf(E)||-1!==n.indexOf('"'))continue;if(!b.allow_script_urls&&("behavior"===n||/expression\s*\(|\/\*|\*\//.test(r)))continue;"font-weight"===n&&"700"===r?r="bold":"color"!==n&&"background-color"!==n||(r=r.toLowerCase()),r=(r=r.replace(C,wi)).replace(w,y),c[n]=o?g(r,!0):r}d("border","",!0),d("border","-width"),d("border","-color"),d("border","-style"),d("padding",""),d("margin",""),i="border",u="border-style",s="border-color",m(a="border-width")&&m(u)&&m(s)&&(c[i]=c[a]+" "+c[u]+" "+c[s],delete c[a],delete c[u],delete c[s]),"medium none"===c.border&&delete c.border,"none"===c["border-image"]&&delete c["border-image"]}return c},serialize:function(i,a){var u="",e=function(e){var t,n=s[e];if(n)for(var r=0,o=n.length;r<o;r++)e=n[r],(t=i[e])&&(u+=(0<u.length?" ":"")+e+": "+t+";")};return a&&s?(e("*"),e(a)):ue(i,function(e,t){var n,r,o;!e||c&&(n=t,r=a,(o=c["*"])&&o[n]||(o=c[r])&&o[n])||(u+=(0<u.length?" ":"")+t+": "+e+";")}),u}}},Si=/^(?:mouse|contextmenu)|click/,Ni={keyLocation:1,layerX:1,layerY:1,returnValue:1,webkitMovementX:1,webkitMovementY:1,keyIdentifier:1,mozPressure:1},Ei=function(){return!1},ki=function(){return!0},_i=function(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)},Ai=function(e,t,n,r){e.removeEventListener?e.removeEventListener(t,n,r||!1):e.detachEvent&&e.detachEvent("on"+t,n)},Ri=function(e,t){var n,r,o,i,a,u,s=t||{};for(n in e)Ni[n]||(s[n]=e[n]);return s.target||(s.target=s.srcElement||document),s.composedPath&&(s.composedPath=function(){return e.composedPath()}),e&&(a=e,Si.test(a.type))&&e.pageX===undefined&&e.clientX!==undefined&&(o=(r=s.target.ownerDocument||document).documentElement,i=r.body,s.pageX=e.clientX+(o&&o.scrollLeft||i&&i.scrollLeft||0)-(o&&o.clientLeft||i&&i.clientLeft||0),s.pageY=e.clientY+(o&&o.scrollTop||i&&i.scrollTop||0)-(o&&o.clientTop||i&&i.clientTop||0)),s.preventDefault=function(){s.isDefaultPrevented=ki,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},s.stopPropagation=function(){s.isPropagationStopped=ki,e&&(e.stopPropagation?e.stopPropagation():e.cancelBubble=!0)},!(s.stopImmediatePropagation=function(){s.isImmediatePropagationStopped=ki,s.stopPropagation()})==((u=s).isDefaultPrevented===ki||u.isDefaultPrevented===Ei)&&(s.isDefaultPrevented=Ei,s.isPropagationStopped=Ei,s.isImmediatePropagationStopped=Ei),"undefined"==typeof s.metaKey&&(s.metaKey=!1),s},Ti=(Di.prototype.bind=function(e,t,n,r){var o,i,a,u,s,c,l=this,f=window,d=function(e){l.executeHandlers(Ri(e||f.event),o)};if(e&&3!==e.nodeType&&8!==e.nodeType){e[l.expando]?o=e[l.expando]:(o=l.count++,e[l.expando]=o,l.events[o]={}),r=r||e;for(var m=t.split(" "),p=m.length;p--;)s=d,u=c=!1,"DOMContentLoaded"===(a=m[p])&&(a="ready"),l.domLoaded&&"ready"===a&&"complete"===e.readyState?n.call(r,Ri({type:a})):(l.hasMouseEnterLeave||(u=l.mouseEnterLeave[a])&&(s=function(e){var t=e.currentTarget,n=e.relatedTarget;if(n&&t.contains)n=t.contains(n);else for(;n&&n!==t;)n=n.parentNode;n||((e=Ri(e||f.event)).type="mouseout"===e.type?"mouseleave":"mouseenter",e.target=t,l.executeHandlers(e,o))}),l.hasFocusIn||"focusin"!==a&&"focusout"!==a||(c=!0,u="focusin"===a?"focus":"blur",s=function(e){(e=Ri(e||f.event)).type="focus"===e.type?"focusin":"focusout",l.executeHandlers(e,o)}),(i=l.events[o][a])?"ready"===a&&l.domLoaded?n(Ri({type:a})):i.push({func:n,scope:r}):(l.events[o][a]=i=[{func:n,scope:r}],i.fakeName=u,i.capture=c,i.nativeHandler=s,"ready"===a?function(e,t,n){var r,o=e.document,i={type:"ready"};n.domLoaded?t(i):(r=function(){Ai(e,"DOMContentLoaded",r),Ai(e,"load",r),n.domLoaded||(n.domLoaded=!0,t(i)),e=null},"complete"===o.readyState||"interactive"===o.readyState&&o.body?r():_i(e,"DOMContentLoaded",r),n.domLoaded||_i(e,"load",r))}(e,s,l):_i(e,u||a,s,c)));return e=i=null,n}},Di.prototype.unbind=function(n,e,t){var r,o,i;if(!n||3===n.nodeType||8===n.nodeType)return this;var a=n[this.expando];if(a){if(i=this.events[a],e){for(var u,s,c,l,f=e.split(" "),d=f.length;d--;)if(l=i[o=f[d]]){if(t)for(r=l.length;r--;)l[r].func===t&&(u=l.nativeHandler,s=l.fakeName,c=l.capture,(l=l.slice(0,r).concat(l.slice(r+1))).nativeHandler=u,l.fakeName=s,l.capture=c,i[o]=l);t&&0!==l.length||(delete i[o],Ai(n,l.fakeName||o,l.nativeHandler,l.capture))}}else ue(i,function(e,t){Ai(n,e.fakeName||t,e.nativeHandler,e.capture)}),i={};for(o in i)if(he(i,o))return this;delete this.events[a];try{delete n[this.expando]}catch(m){n[this.expando]=null}}return this},Di.prototype.fire=function(e,t,n){var r;if(!e||3===e.nodeType||8===e.nodeType)return this;var o=Ri(null,n);for(o.type=t,o.target=e;(r=e[this.expando])&&this.executeHandlers(o,r),(e=e.parentNode||e.ownerDocument||e.defaultView||e.parentWindow)&&!o.isPropagationStopped(););return this},Di.prototype.clean=function(e){var t,n;if(!e||3===e.nodeType||8===e.nodeType)return this;if(e[this.expando]&&this.unbind(e),e.getElementsByTagName||(e=e.document),e&&e.getElementsByTagName)for(this.unbind(e),t=(n=e.getElementsByTagName("*")).length;t--;)(e=n[t])[this.expando]&&this.unbind(e);return this},Di.prototype.destroy=function(){this.events={}},Di.prototype.cancel=function(e){return e&&(e.preventDefault(),e.stopImmediatePropagation()),!1},Di.prototype.executeHandlers=function(e,t){var n=this.events[t],r=n&&n[e.type];if(r)for(var o=0,i=r.length;o<i;o++){var a=r[o];if(a&&!1===a.func.call(a.scope,e)&&e.preventDefault(),e.isImmediatePropagationStopped())return}},Di.Event=new Di,Di);function Di(){this.domLoaded=!1,this.events={},this.count=1,this.expando="mce-data-"+(+new Date).toString(32),this.hasMouseEnterLeave="onmouseenter"in document.documentElement,this.hasFocusIn="onfocusin"in document.documentElement,this.count=1}var Oi,Bi,Pi,Li,Ii,Mi,Fi,Ui,zi,ji,Hi,Vi,qi,$i,Wi,Ki,Xi,Yi="sizzle"+-new Date,Gi=window.document,Ji=0,Qi=0,Zi=Da(),ea=Da(),ta=Da(),na=function(e,t){return e===t&&(ji=!0),0},ra=typeof undefined,oa={}.hasOwnProperty,ia=[],aa=ia.pop,ua=ia.push,sa=ia.push,ca=ia.slice,la=ia.indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(this[t]===e)return t;return-1},fa="[\\x20\\t\\r\\n\\f]",da="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ma="\\["+fa+"*("+da+")(?:"+fa+"*([*^$|!~]?=)"+fa+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+da+"))|)"+fa+"*\\]",pa=":("+da+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ma+")*)|.*)\\)|)",ga=new RegExp("^"+fa+"+|((?:^|[^\\\\])(?:\\\\.)*)"+fa+"+$","g"),ha=new RegExp("^"+fa+"*,"+fa+"*"),va=new RegExp("^"+fa+"*([>+~]|"+fa+")"+fa+"*"),ya=new RegExp("="+fa+"*([^\\]'\"]*?)"+fa+"*\\]","g"),ba=new RegExp(pa),Ca=new RegExp("^"+da+"$"),wa={ID:new RegExp("^#("+da+")"),CLASS:new RegExp("^\\.("+da+")"),TAG:new RegExp("^("+da+"|[*])"),ATTR:new RegExp("^"+ma),PSEUDO:new RegExp("^"+pa),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+fa+"*(even|odd|(([+-]|)(\\d*)n|)"+fa+"*(?:([+-]|)"+fa+"*(\\d+)|))"+fa+"*\\)|)","i"),bool:new RegExp("^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$","i"),needsContext:new RegExp("^"+fa+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+fa+"*((?:-\\d)?\\d*)"+fa+"*\\)|)(?=[^-]|$)","i")},xa=/^(?:input|select|textarea|button)$/i,Sa=/^h\d$/i,Na=/^[^{]+\{\s*\[native \w/,Ea=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ka=/[+~]/,_a=/'|\\/g,Aa=new RegExp("\\\\([\\da-f]{1,6}"+fa+"?|("+fa+")|.)","ig"),Ra=function(e,t,n){var r="0x"+t-65536;return r!=r||n?t:r<0?String.fromCharCode(65536+r):String.fromCharCode(r>>10|55296,1023&r|56320)};try{sa.apply(ia=ca.call(Gi.childNodes),Gi.childNodes),ia[Gi.childNodes.length].nodeType}catch(Ok){sa={apply:ia.length?function(e,t){ua.apply(e,ca.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}var Ta=function(e,t,n,r){var o,i,a,u,s,c,l,f,d,m;if((t?t.ownerDocument||t:Gi)!==Vi&&Hi(t),n=n||[],!e||"string"!=typeof e)return n;if(1!==(u=(t=t||Vi).nodeType)&&9!==u)return[];if($i&&!r){if(o=Ea.exec(e))if(a=o[1]){if(9===u){if(!(i=t.getElementById(a))||!i.parentNode)return n;if(i.id===a)return n.push(i),n}else if(t.ownerDocument&&(i=t.ownerDocument.getElementById(a))&&Xi(t,i)&&i.id===a)return n.push(i),n}else{if(o[2])return sa.apply(n,t.getElementsByTagName(e)),n;if((a=o[3])&&Oi.getElementsByClassName)return sa.apply(n,t.getElementsByClassName(a)),n}if(Oi.qsa&&(!Wi||!Wi.test(e))){if(f=l=Yi,d=t,m=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){for(c=Ii(e),(l=t.getAttribute("id"))?f=l.replace(_a,"\\$&"):t.setAttribute("id",f),f="[id='"+f+"'] ",s=c.length;s--;)c[s]=f+Ma(c[s]);d=ka.test(e)&&La(t.parentNode)||t,m=c.join(",")}if(m)try{return sa.apply(n,d.querySelectorAll(m)),n}catch(p){}finally{l||t.removeAttribute("id")}}}return Fi(e.replace(ga,"$1"),t,n,r)};function Da(){var n=[];function r(e,t){return n.push(e+" ")>Bi.cacheLength&&delete r[n.shift()],r[e+" "]=t}return r}function Oa(e){return e[Yi]=!0,e}function Ba(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||1<<31)-(~e.sourceIndex||1<<31);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function Pa(a){return Oa(function(i){return i=+i,Oa(function(e,t){for(var n,r=a([],e.length,i),o=r.length;o--;)e[n=r[o]]&&(e[n]=!(t[n]=e[n]))})})}function La(e){return e&&typeof e.getElementsByTagName!=ra&&e}function Ia(){}function Ma(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function Fa(a,e,t){var u=e.dir,s=t&&"parentNode"===u,c=Qi++;return e.first?function(e,t,n){for(;e=e[u];)if(1===e.nodeType||s)return a(e,t,n)}:function(e,t,n){var r,o,i=[Ji,c];if(n){for(;e=e[u];)if((1===e.nodeType||s)&&a(e,t,n))return!0}else for(;e=e[u];)if(1===e.nodeType||s){if((r=(o=e[Yi]||(e[Yi]={}))[u])&&r[0]===Ji&&r[1]===c)return i[2]=r[2];if((o[u]=i)[2]=a(e,t,n))return!0}}}function Ua(o){return 1<o.length?function(e,t,n){for(var r=o.length;r--;)if(!o[r](e,t,n))return!1;return!0}:o[0]}function za(e,t,n,r,o){for(var i,a=[],u=0,s=e.length,c=null!=t;u<s;u++)(i=e[u])&&(n&&!n(i,r,o)||(a.push(i),c&&t.push(u)));return a}function ja(m,p,g,h,v,e){return h&&!h[Yi]&&(h=ja(h)),v&&!v[Yi]&&(v=ja(v,e)),Oa(function(e,t,n,r){var o,i,a,u=[],s=[],c=t.length,l=e||function(e,t,n){for(var r=0,o=t.length;r<o;r++)Ta(e,t[r],n);return n}(p||"*",n.nodeType?[n]:n,[]),f=!m||!e&&p?l:za(l,u,m,n,r),d=g?v||(e?m:c||h)?[]:t:f;if(g&&g(f,d,n,r),h)for(o=za(d,s),h(o,[],n,r),i=o.length;i--;)(a=o[i])&&(d[s[i]]=!(f[s[i]]=a));if(e){if(v||m){if(v){for(o=[],i=d.length;i--;)(a=d[i])&&o.push(f[i]=a);v(null,d=[],o,r)}for(i=d.length;i--;)(a=d[i])&&-1<(o=v?la.call(e,a):u[i])&&(e[o]=!(t[o]=a))}}else d=za(d===t?d.splice(c,d.length):d),v?v(null,t,d,r):sa.apply(t,d)})}Oi=Ta.support={},Li=Ta.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},Hi=Ta.setDocument=function(e){var t,s=e?e.ownerDocument||e:Gi,n=s.defaultView;return s!==Vi&&9===s.nodeType&&s.documentElement?(qi=(Vi=s).documentElement,$i=!Li(s),n&&n!==function(e){try{return e.top}catch(t){}return null}(n)&&(n.addEventListener?n.addEventListener("unload",function(){Hi()},!1):n.attachEvent&&n.attachEvent("onunload",function(){Hi()})),Oi.attributes=!0,Oi.getElementsByTagName=!0,Oi.getElementsByClassName=Na.test(s.getElementsByClassName),Oi.getById=!0,Bi.find.ID=function(e,t){if(typeof t.getElementById!=ra&&$i){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},Bi.filter.ID=function(e){var t=e.replace(Aa,Ra);return function(e){return e.getAttribute("id")===t}},Bi.find.TAG=Oi.getElementsByTagName?function(e,t){if(typeof t.getElementsByTagName!=ra)return t.getElementsByTagName(e)}:function(e,t){var n,r=[],o=0,i=t.getElementsByTagName(e);if("*"!==e)return i;for(;n=i[o++];)1===n.nodeType&&r.push(n);return r},Bi.find.CLASS=Oi.getElementsByClassName&&function(e,t){if($i)return t.getElementsByClassName(e)},Ki=[],Wi=[],Oi.disconnectedMatch=!0,Wi=Wi.length&&new RegExp(Wi.join("|")),Ki=Ki.length&&new RegExp(Ki.join("|")),t=Na.test(qi.compareDocumentPosition),Xi=t||Na.test(qi.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},na=t?function(e,t){if(e===t)return ji=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!Oi.sortDetached&&t.compareDocumentPosition(e)===n?e===s||e.ownerDocument===Gi&&Xi(Gi,e)?-1:t===s||t.ownerDocument===Gi&&Xi(Gi,t)?1:zi?la.call(zi,e)-la.call(zi,t):0:4&n?-1:1)}:function(e,t){if(e===t)return ji=!0,0;var n,r=0,o=e.parentNode,i=t.parentNode,a=[e],u=[t];if(!o||!i)return e===s?-1:t===s?1:o?-1:i?1:zi?la.call(zi,e)-la.call(zi,t):0;if(o===i)return Ba(e,t);for(n=e;n=n.parentNode;)a.unshift(n);for(n=t;n=n.parentNode;)u.unshift(n);for(;a[r]===u[r];)r++;return r?Ba(a[r],u[r]):a[r]===Gi?-1:u[r]===Gi?1:0},s):Vi},Ta.matches=function(e,t){return Ta(e,null,null,t)},Ta.matchesSelector=function(e,t){if((e.ownerDocument||e)!==Vi&&Hi(e),t=t.replace(ya,"='$1']"),Oi.matchesSelector&&$i&&(!Ki||!Ki.test(t))&&(!Wi||!Wi.test(t)))try{var n=(void 0).call(e,t);if(n||Oi.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(Ok){}return 0<Ta(t,Vi,null,[e]).length},Ta.contains=function(e,t){return(e.ownerDocument||e)!==Vi&&Hi(e),Xi(e,t)},Ta.attr=function(e,t){(e.ownerDocument||e)!==Vi&&Hi(e);var n=Bi.attrHandle[t.toLowerCase()],r=n&&oa.call(Bi.attrHandle,t.toLowerCase())?n(e,t,!$i):undefined;return r!==undefined?r:Oi.attributes||!$i?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},Ta.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},Ta.uniqueSort=function(e){var t,n=[],r=0,o=0;if(ji=!Oi.detectDuplicates,zi=!Oi.sortStable&&e.slice(0),e.sort(na),ji){for(;t=e[o++];)t===e[o]&&(r=n.push(o));for(;r--;)e.splice(n[r],1)}return zi=null,e},Pi=Ta.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=Pi(e)}else if(3===o||4===o)return e.nodeValue}else for(;t=e[r++];)n+=Pi(t);return n},(Bi=Ta.selectors={cacheLength:50,createPseudo:Oa,match:wa,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Aa,Ra),e[3]=(e[3]||e[4]||e[5]||"").replace(Aa,Ra),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||Ta.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&Ta.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return wa.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&ba.test(n)&&(t=Ii(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Aa,Ra).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=Zi[e+" "];return t||(t=new RegExp("(^|"+fa+")"+e+"("+fa+"|$)"))&&Zi(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!=ra&&e.getAttribute("class")||"")})},ATTR:function(n,r,o){return function(e){var t=Ta.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===o:"!="===r?t!==o:"^="===r?o&&0===t.indexOf(o):"*="===r?o&&-1<t.indexOf(o):"$="===r?o&&t.slice(-o.length)===o:"~="===r?-1<(" "+t+" ").indexOf(o):"|="===r&&(t===o||t.slice(0,o.length+1)===o+"-"))}},CHILD:function(m,e,t,p,g){var h="nth"!==m.slice(0,3),v="last"!==m.slice(-4),y="of-type"===e;return 1===p&&0===g?function(e){return!!e.parentNode}:function(e,t,n){var r,o,i,a,u,s,c=h!=v?"nextSibling":"previousSibling",l=e.parentNode,f=y&&e.nodeName.toLowerCase(),d=!n&&!y;if(l){if(h){for(;c;){for(i=e;i=i[c];)if(y?i.nodeName.toLowerCase()===f:1===i.nodeType)return!1;s=c="only"===m&&!s&&"nextSibling"}return!0}if(s=[v?l.firstChild:l.lastChild],v&&d){for(u=(r=(o=l[Yi]||(l[Yi]={}))[m]||[])[0]===Ji&&r[1],a=r[0]===Ji&&r[2],i=u&&l.childNodes[u];i=++u&&i&&i[c]||(a=u=0)||s.pop();)if(1===i.nodeType&&++a&&i===e){o[m]=[Ji,u,a];break}}else if(d&&(r=(e[Yi]||(e[Yi]={}))[m])&&r[0]===Ji)a=r[1];else for(;(i=++u&&i&&i[c]||(a=u=0)||s.pop())&&((y?i.nodeName.toLowerCase()!==f:1!==i.nodeType)||!++a||(d&&((i[Yi]||(i[Yi]={}))[m]=[Ji,a]),i!==e)););return(a-=g)===p||a%p==0&&0<=a/p}}},PSEUDO:function(e,i){var t,a=Bi.pseudos[e]||Bi.setFilters[e.toLowerCase()]||Ta.error("unsupported pseudo: "+e);return a[Yi]?a(i):1<a.length?(t=[e,e,"",i],Bi.setFilters.hasOwnProperty(e.toLowerCase())?Oa(function(e,t){for(var n,r=a(e,i),o=r.length;o--;)e[n=la.call(e,r[o])]=!(t[n]=r[o])}):function(e){return a(e,0,t)}):a}},pseudos:{not:Oa(function(e){var r=[],o=[],u=Mi(e.replace(ga,"$1"));return u[Yi]?Oa(function(e,t,n,r){for(var o,i=u(e,null,r,[]),a=e.length;a--;)(o=i[a])&&(e[a]=!(t[a]=o))}):function(e,t,n){return r[0]=e,u(r,null,n,o),!o.pop()}}),has:Oa(function(t){return function(e){return 0<Ta(t,e).length}}),contains:Oa(function(t){return t=t.replace(Aa,Ra),function(e){return-1<(e.textContent||e.innerText||Pi(e)).indexOf(t)}}),lang:Oa(function(n){return Ca.test(n||"")||Ta.error("unsupported lang: "+n),n=n.replace(Aa,Ra).toLowerCase(),function(e){var t;do{if(t=$i?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=window.location&&window.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===qi},focus:function(e){return e===Vi.activeElement&&(!Vi.hasFocus||Vi.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return!1===e.disabled},disabled:function(e){return!0===e.disabled},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!Bi.pseudos.empty(e)},header:function(e){return Sa.test(e.nodeName)},input:function(e){return xa.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:Pa(function(){return[0]}),last:Pa(function(e,t){return[t-1]}),eq:Pa(function(e,t,n){return[n<0?n+t:n]}),even:Pa(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:Pa(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:Pa(function(e,t,n){for(var r=n<0?n+t:n;0<=--r;)e.push(r);return e}),gt:Pa(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=Bi.pseudos.eq,W(["radio","checkbox","file","password","image"],function(e){var t;Bi.pseudos[e]=(t=e,function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t})}),W(["submit","reset"],function(e){var n;Bi.pseudos[e]=(n=e,function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n})}),Ia.prototype=Bi.filters=Bi.pseudos,Bi.setFilters=new Ia,Ii=Ta.tokenize=function(e,t){var n,r,o,i,a,u,s,c=ea[e+" "];if(c)return t?0:c.slice(0);for(a=e,u=[],s=Bi.preFilter;a;){for(i in n&&!(r=ha.exec(a))||(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=va.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(ga," ")}),a=a.slice(n.length)),Bi.filter)Bi.filter.hasOwnProperty(i)&&(!(r=wa[i].exec(a))||s[i]&&!(r=s[i](r))||(n=r.shift(),o.push({value:n,type:i,matches:r}),a=a.slice(n.length)));if(!n)break}return t?a.length:a?Ta.error(e):ea(e,u).slice(0)},Mi=Ta.compile=function(e,t){var n,h,v,y,b,r,o=[],i=[],a=ta[e+" "];if(!a){for(n=(t=t||Ii(e)).length;n--;)(a=function f(e){for(var r,t,n,o=e.length,i=Bi.relative[e[0].type],a=i||Bi.relative[" "],u=i?1:0,s=Fa(function(e){return e===r},a,!0),c=Fa(function(e){return-1<la.call(r,e)},a,!0),l=[function(e,t,n){return!i&&(n||t!==Ui)||((r=t).nodeType?s:c)(e,t,n)}];u<o;u++)if(t=Bi.relative[e[u].type])l=[Fa(Ua(l),t)];else{if((t=Bi.filter[e[u].type].apply(null,e[u].matches))[Yi]){for(n=++u;n<o&&!Bi.relative[e[n].type];n++);return ja(1<u&&Ua(l),1<u&&Ma(e.slice(0,u-1).concat({value:" "===e[u-2].type?"*":""})).replace(ga,"$1"),t,u<n&&f(e.slice(u,n)),n<o&&f(e=e.slice(n)),n<o&&Ma(e))}l.push(t)}return Ua(l)}(t[n]))[Yi]?o.push(a):i.push(a);(a=ta(e,(h=i,y=0<(v=o).length,b=0<h.length,r=function(e,t,n,r,o){var i,a,u,s=0,c="0",l=e&&[],f=[],d=Ui,m=e||b&&Bi.find.TAG("*",o),p=Ji+=null==d?1:Math.random()||.1,g=m.length;for(o&&(Ui=t!==Vi&&t);c!==g&&null!=(i=m[c]);c++){if(b&&i){for(a=0;u=h[a++];)if(u(i,t,n)){r.push(i);break}o&&(Ji=p)}y&&((i=!u&&i)&&s--,e&&l.push(i))}if(s+=c,y&&c!==s){for(a=0;u=v[a++];)u(l,f,t,n);if(e){if(0<s)for(;c--;)l[c]||f[c]||(f[c]=aa.call(r));f=za(f)}sa.apply(r,f),o&&!e&&0<f.length&&1<s+v.length&&Ta.uniqueSort(r)}return o&&(Ji=p,Ui=d),l},y?Oa(r):r))).selector=e}return a},Fi=Ta.select=function(e,t,n,r){var o,i,a,u,s,c="function"==typeof e&&e,l=!r&&Ii(e=c.selector||e);if(n=n||[],1===l.length){if(2<(i=l[0]=l[0].slice(0)).length&&"ID"===(a=i[0]).type&&Oi.getById&&9===t.nodeType&&$i&&Bi.relative[i[1].type]){if(!(t=(Bi.find.ID(a.matches[0].replace(Aa,Ra),t)||[])[0]))return n;c&&(t=t.parentNode),e=e.slice(i.shift().value.length)}for(o=wa.needsContext.test(e)?0:i.length;o--&&(a=i[o],!Bi.relative[u=a.type]);)if((s=Bi.find[u])&&(r=s(a.matches[0].replace(Aa,Ra),ka.test(i[0].type)&&La(t.parentNode)||t))){if(i.splice(o,1),!(e=r.length&&Ma(i)))return sa.apply(n,r),n;break}}return(c||Mi(e,l))(r,t,!$i,n,ka.test(e)&&La(t.parentNode)||t),n},Oi.sortStable=Yi.split("").sort(na).join("")===Yi,Oi.detectDuplicates=!!ji,Hi(),Oi.sortDetached=!0;var Ha=document,Va=Array.prototype.push,qa=Array.prototype.slice,$a=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,Wa=Ti.Event,Ka=kt.makeMap("children,contents,next,prev"),Xa=function(e){return void 0!==e},Ya=function(e){return"string"==typeof e},Ga=function(e,t){var n,r=(t=t||Ha).createElement("div"),o=t.createDocumentFragment();for(r.innerHTML=e;n=r.firstChild;)o.appendChild(n);return o},Ja=function(e,t,n,r){var o;if(Ya(t))t=Ga(t,fu(e[0]));else if(t.length&&!t.nodeType){if(t=hu.makeArray(t),r)for(o=t.length-1;0<=o;o--)Ja(e,t[o],n,r);else for(o=0;o<t.length;o++)Ja(e,t[o],n,r);return e}if(t.nodeType)for(o=e.length;o--;)n.call(e[o],t);return e},Qa=function(e,t){return e&&t&&-1!==(" "+e.className+" ").indexOf(" "+t+" ")},Za=function(e,t,n){var r,o;return t=hu(t)[0],e.each(function(){n&&r===this.parentNode||(r=this.parentNode,o=t.cloneNode(!1),this.parentNode.insertBefore(o,this)),o.appendChild(this)}),e},eu=kt.makeMap("fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom"," "),tu=kt.makeMap("checked compact declare defer disabled ismap multiple nohref noshade nowrap readonly selected"," "),nu={"for":"htmlFor","class":"className",readonly:"readOnly"},ru={"float":"cssFloat"},ou={},iu={},au=function(e,t){return new hu.fn.init(e,t)},uu=/^\s*|\s*$/g,su=function(e){return null===e||e===undefined?"":(""+e).replace(uu,"")},cu=function(e,t){var n,r,o,i;if(e)if((n=e.length)===undefined){for(r in e)if(e.hasOwnProperty(r)&&(i=e[r],!1===t.call(i,r,i)))break}else for(o=0;o<n&&(i=e[o],!1!==t.call(i,o,i));o++);return e},lu=function(e,n){var r=[];return cu(e,function(e,t){n(t,e)&&r.push(t)}),r},fu=function(e){return e?9===e.nodeType?e:e.ownerDocument:Ha};au.fn=au.prototype={constructor:au,selector:"",context:null,length:0,init:function(e,t){var n,r,o=this;if(!e)return o;if(e.nodeType)return o.context=o[0]=e,o.length=1,o;if(t&&t.nodeType)o.context=t;else{if(t)return hu(e).attr(t);o.context=t=document}if(Ya(e)){if(!(n="<"===(o.selector=e).charAt(0)&&">"===e.charAt(e.length-1)&&3<=e.length?[null,e,null]:$a.exec(e)))return hu(t).find(e);if(n[1])for(r=Ga(e,fu(t)).firstChild;r;)Va.call(o,r),r=r.nextSibling;else{if(!(r=fu(t).getElementById(n[2])))return o;if(r.id!==n[2])return o.find(e);o.length=1,o[0]=r}}else this.add(e,!1);return o},toArray:function(){return kt.toArray(this)},add:function(e,t){var n,r;if(Ya(e))return this.add(hu(e));if(!1!==t)for(n=hu.unique(this.toArray().concat(hu.makeArray(e))),this.length=n.length,r=0;r<n.length;r++)this[r]=n[r];else Va.apply(this,hu.makeArray(e));return this},attr:function(t,n){var e,r=this;if("object"==typeof t)cu(t,function(e,t){r.attr(e,t)});else{if(!Xa(n)){if(r[0]&&1===r[0].nodeType){if((e=ou[t])&&e.get)return e.get(r[0],t);if(tu[t])return r.prop(t)?t:undefined;null===(n=r[0].getAttribute(t,2))&&(n=undefined)}return n}this.each(function(){var e;if(1===this.nodeType){if((e=ou[t])&&e.set)return void e.set(this,n);null===n?this.removeAttribute(t,2):this.setAttribute(t,n,2)}})}return r},removeAttr:function(e){return this.attr(e,null)},prop:function(e,t){var n=this;if("object"==typeof(e=nu[e]||e))cu(e,function(e,t){n.prop(e,t)});else{if(!Xa(t))return n[0]&&n[0].nodeType&&e in n[0]?n[0][e]:t;this.each(function(){1===this.nodeType&&(this[e]=t)})}return n},css:function(n,r){var e,o,i=this,t=function(e){return e.replace(/-(\D)/g,function(e,t){return t.toUpperCase()})},a=function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e})};if("object"==typeof n)cu(n,function(e,t){i.css(e,t)});else if(Xa(r))n=t(n),"number"!=typeof r||eu[n]||(r=r.toString()+"px"),i.each(function(){var e=this.style;if((o=iu[n])&&o.set)o.set(this,r);else{try{this.style[ru[n]||n]=r}catch(t){}null!==r&&""!==r||(e.removeProperty?e.removeProperty(a(n)):e.removeAttribute(n))}});else{if(e=i[0],(o=iu[n])&&o.get)return o.get(e);if(!e.ownerDocument.defaultView)return e.currentStyle?e.currentStyle[t(n)]:"";try{return e.ownerDocument.defaultView.getComputedStyle(e,null).getPropertyValue(a(n))}catch(u){return undefined}}return i},remove:function(){for(var e,t=this.length;t--;)e=this[t],Wa.clean(e),e.parentNode&&e.parentNode.removeChild(e);return this},empty:function(){for(var e,t=this.length;t--;)for(e=this[t];e.firstChild;)e.removeChild(e.firstChild);return this},html:function(e){var t;if(Xa(e)){t=this.length;try{for(;t--;)this[t].innerHTML=e}catch(n){hu(this[t]).empty().append(e)}return this}return this[0]?this[0].innerHTML:""},text:function(e){var t;if(Xa(e)){for(t=this.length;t--;)"innerText"in this[t]?this[t].innerText=e:this[0].textContent=e;return this}return this[0]?this[0].innerText||this[0].textContent:""},append:function(){return Ja(this,arguments,function(e){(1===this.nodeType||this.host&&1===this.host.nodeType)&&this.appendChild(e)})},prepend:function(){return Ja(this,arguments,function(e){(1===this.nodeType||this.host&&1===this.host.nodeType)&&this.insertBefore(e,this.firstChild)},!0)},before:function(){return this[0]&&this[0].parentNode?Ja(this,arguments,function(e){this.parentNode.insertBefore(e,this)}):this},after:function(){return this[0]&&this[0].parentNode?Ja(this,arguments,function(e){this.parentNode.insertBefore(e,this.nextSibling)},!0):this},appendTo:function(e){return hu(e).append(this),this},prependTo:function(e){return hu(e).prepend(this),this},replaceWith:function(e){return this.before(e).remove()},wrap:function(e){return Za(this,e)},wrapAll:function(e){return Za(this,e,!0)},wrapInner:function(e){return this.each(function(){hu(this).contents().wrapAll(e)}),this},unwrap:function(){return this.parent().each(function(){hu(this).replaceWith(this.childNodes)})},clone:function(){var e=[];return this.each(function(){e.push(this.cloneNode(!0))}),hu(e)},addClass:function(e){return this.toggleClass(e,!0)},removeClass:function(e){return this.toggleClass(e,!1)},toggleClass:function(o,i){var e=this;return"string"!=typeof o||(-1!==o.indexOf(" ")?cu(o.split(" "),function(){e.toggleClass(this,i)}):e.each(function(e,t){var n,r=Qa(t,o);r!==i&&(n=t.className,r?t.className=su((" "+n+" ").replace(" "+o+" "," ")):t.className+=n?" "+o:o)})),e},hasClass:function(e){return Qa(this[0],e)},each:function(e){return cu(this,e)},on:function(e,t){return this.each(function(){Wa.bind(this,e,t)})},off:function(e,t){return this.each(function(){Wa.unbind(this,e,t)})},trigger:function(e){return this.each(function(){"object"==typeof e?Wa.fire(this,e.type,e):Wa.fire(this,e)})},show:function(){return this.css("display","")},hide:function(){return this.css("display","none")},slice:function(){return new hu(qa.apply(this,arguments))},eq:function(e){return-1===e?this.slice(e):this.slice(e,+e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},find:function(e){for(var t=[],n=0,r=this.length;n<r;n++)hu.find(e,this[n],t);return hu(t)},filter:function(n){return hu("function"==typeof n?lu(this.toArray(),function(e,t){return n(t,e)}):hu.filter(n,this.toArray()))},closest:function(n){var r=[];return n instanceof hu&&(n=n[0]),this.each(function(e,t){for(;t;){if("string"==typeof n&&hu(t).is(n)){r.push(t);break}if(t===n){r.push(t);break}t=t.parentNode}}),hu(r)},offset:function(e){var t,n,r,o,i=0,a=0;return e?this.css(e):((t=this[0])&&(r=(n=t.ownerDocument).documentElement,t.getBoundingClientRect&&(i=(o=t.getBoundingClientRect()).left+(r.scrollLeft||n.body.scrollLeft)-r.clientLeft,a=o.top+(r.scrollTop||n.body.scrollTop)-r.clientTop)),{left:i,top:a})},push:Va,sort:Array.prototype.sort,splice:Array.prototype.splice},kt.extend(au,{extend:kt.extend,makeArray:function(e){return(t=e)&&t===t.window||e.nodeType?[e]:kt.toArray(e);var t},inArray:function(e,t){var n;if(t.indexOf)return t.indexOf(e);for(n=t.length;n--;)if(t[n]===e)return n;return-1},isArray:kt.isArray,each:cu,trim:su,grep:lu,find:Ta,expr:Ta.selectors,unique:Ta.uniqueSort,text:Ta.getText,contains:Ta.contains,filter:function(e,t,n){var r=t.length;for(n&&(e=":not("+e+")");r--;)1!==t[r].nodeType&&t.splice(r,1);return t=1===t.length?hu.find.matchesSelector(t[0],e)?[t[0]]:[]:hu.find.matches(e,t)}});var du=function(e,t,n){var r=[],o=e[t];for("string"!=typeof n&&n instanceof hu&&(n=n[0]);o&&9!==o.nodeType;){if(n!==undefined){if(o===n)break;if("string"==typeof n&&hu(o).is(n))break}1===o.nodeType&&r.push(o),o=o[t]}return r},mu=function(e,t,n,r){var o=[];for(r instanceof hu&&(r=r[0]);e;e=e[t])if(!n||e.nodeType===n){if(r!==undefined){if(e===r)break;if("string"==typeof r&&hu(e).is(r))break}o.push(e)}return o},pu=function(e,t,n){for(e=e[t];e;e=e[t])if(e.nodeType===n)return e;return null};cu({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return du(e,"parentNode")},next:function(e){return pu(e,"nextSibling",1)},prev:function(e){return pu(e,"previousSibling",1)},children:function(e){return mu(e.firstChild,"nextSibling",1)},contents:function(e){return kt.toArray(("iframe"===e.nodeName?e.contentDocument||e.contentWindow.document:e).childNodes)}},function(r,o){au.fn[r]=function(t){var n=[];this.each(function(){var e=o.call(n,this,t,n);e&&(hu.isArray(e)?n.push.apply(n,e):n.push(e))}),1<this.length&&(Ka[r]||(n=hu.unique(n)),0===r.indexOf("parents")&&(n=n.reverse()));var e=hu(n);return t?e.filter(t):e}}),cu({parentsUntil:function(e,t){return du(e,"parentNode",t)},nextUntil:function(e,t){return mu(e,"nextSibling",1,t).slice(1)},prevUntil:function(e,t){return mu(e,"previousSibling",1,t).slice(1)}},function(o,i){au.fn[o]=function(t,e){var n=[];this.each(function(){var e=i.call(n,this,t,n);e&&(hu.isArray(e)?n.push.apply(n,e):n.push(e))}),1<this.length&&(n=hu.unique(n),0!==o.indexOf("parents")&&"prevUntil"!==o||(n=n.reverse()));var r=hu(n);return e?r.filter(e):r}}),au.fn.is=function(e){return!!e&&0<this.filter(e).length},au.fn.init.prototype=au.fn,au.overrideDefaults=function(n){var r,o=function(e,t){return r=r||n(),0===arguments.length&&(e=r.element),t=t||r.context,new o.fn.init(e,t)};return hu.extend(o,this),o},au.attrHooks=ou,au.cssHooks=iu;var gu,hu=au,vu=kt.each,yu=kt.grep,bu=wt.ie,Cu=/^([a-z0-9],?)+$/i,wu=function(n,r,o){var i=r.keep_values,e={set:function(e,t,n){r.url_converter&&(t=r.url_converter.call(r.url_converter_scope||o(),t,n,e[0])),e.attr("data-mce-"+n,t).attr(n,t)},get:function(e,t){return e.attr("data-mce-"+t)||e.attr(t)}},t={style:{set:function(e,t){null===t||"object"!=typeof t?(i&&e.attr("data-mce-style",t),null!==t&&"string"==typeof t?(e.removeAttr("style"),e.css(n.parse(t))):e.attr("style",t)):e.css(t)},get:function(e){var t=e.attr("data-mce-style")||e.attr("style");return t=n.serialize(n.parse(t),e[0].nodeName)}}};return i&&(t.href=t.src=e),t},xu=function(e,t){var n=t.attr("style"),r=(r=e.serialize(e.parse(n),t[0].nodeName))||null;t.attr("data-mce-style",r)},Su=function(e,t){var n,r,o=0;if(e)for(n=e.nodeType,e=e.previousSibling;e;e=e.previousSibling)r=e.nodeType,(!t||3!==r||r!==n&&e.nodeValue.length)&&(o++,n=r);return o};function Nu(a,u){var s=this;void 0===u&&(u={});var r={},c=window,n={},t=0,o=Kr.forElement(At.fromDom(a),{contentCssCors:u.contentCssCors,referrerPolicy:u.referrerPolicy}),l=[],f=u.schema?u.schema:Ci({}),i=xi({url_converter:u.url_converter,url_converter_scope:u.url_converter_scope},u.schema),d=u.ownEvents?new Ti:Ti.Event,m=f.getBlockElements(),p=hu.overrideDefaults(function(){return{context:a,element:j.getRoot()}}),g=function(e){return e&&a&&q(e)?a.getElementById(e):e},h=function(e){return p("string"==typeof e?g(e):e)},v=function(e,t,n){var r,o,i=h(e);return i.length&&(o=(r=H[t])&&r.get?r.get(i,t):i.attr(t)),void 0===o&&(o=n||""),o},y=function(e){var t=g(e);return t?t.attributes:[]},b=function(e,t,n){""===n&&(n=null);var r,o=h(e),i=o.attr(t);o.length&&((r=H[t])&&r.set?r.set(o,n,t):o.attr(t,n),i!==n&&u.onSetAttrib&&u.onSetAttrib({attrElm:o,attrName:t,attrValue:n}))},C=function(){return u.root_element||a.body},w=function(e,t){return ur(a.body,g(e),t)},x=function(e,t,n){var r=h(e);return n?r.css(t):("float"===(t=t.replace(/-(\D)/g,function(e,t){return t.toUpperCase()}))&&(t=wt.browser.isIE()?"styleFloat":"cssFloat"),r[0]&&r[0].style?r[0].style[t]:undefined)},S=function(e){var t,n;return e=g(e),t=x(e,"width"),n=x(e,"height"),-1===t.indexOf("px")&&(t=0),-1===n.indexOf("px")&&(n=0),{w:parseInt(t,10)||e.offsetWidth||e.clientWidth,h:parseInt(n,10)||e.offsetHeight||e.clientHeight}},N=function(e,t){if(!e)return!1;if(!Array.isArray(e)){if("*"===t)return 1===e.nodeType;if(Cu.test(t)){for(var n=t.toLowerCase().split(/,/),r=e.nodeName.toLowerCase(),o=n.length-1;0<=o;o--)if(n[o]===r)return!0;return!1}if(e.nodeType&&1!==e.nodeType)return!1}var i=Array.isArray(e)?e:[e];return 0<Ta(t,i[0].ownerDocument||i[0],null,i).length},E=function(e,t,n,r){var o,i=[],a=g(e);for(r=r===undefined,n=n||("BODY"!==C().nodeName?C().parentNode:null),kt.is(t,"string")&&(t="*"===(o=t)?function(e){return 1===e.nodeType}:function(e){return N(e,o)});a&&!(a===n||$(a.nodeType)||Fn(a)||Un(a));){if(!t||"function"==typeof t&&t(a)){if(!r)return[a];i.push(a)}a=a.parentNode}return r?i:null},k=function(e,t,n){var r=t;if(e)for("string"==typeof t&&(r=function(e){return N(e,t)}),e=e[n];e;e=e[n])if("function"==typeof r&&r(e))return e;return null},_=function(e,n,r){var o,t="string"==typeof e?g(e):e;if(!t)return!1;if(kt.isArray(t)&&(t.length||0===t.length))return o=[],vu(t,function(e,t){e&&o.push(n.call(r,"string"==typeof e?g(e):e,t))}),o;var i=r||s;return n.call(i,t)},A=function(e,t){h(e).each(function(e,n){vu(t,function(e,t){b(n,t,e)})})},R=function(e,r){var t=h(e);bu?t.each(function(e,t){if(!1!==t.canHaveHTML){for(;t.firstChild;)t.removeChild(t.firstChild);try{t.innerHTML="<br>"+r,t.removeChild(t.firstChild)}catch(n){hu("<div></div>").html("<br>"+r).contents().slice(1).appendTo(t)}return r}}):t.html(r)},T=function(e,n,r,o,i){return _(e,function(e){var t="string"==typeof n?a.createElement(n):n;return A(t,r),o&&("string"!=typeof o&&o.nodeType?t.appendChild(o):"string"==typeof o&&R(t,o)),i?t:e.appendChild(t)})},D=function(e,t,n){return T(a.createElement(e),e,t,n,!0)},e=ci.decode,O=ci.encodeAllRaw,B=function(e,t){var n=h(e);return t?n.each(function(){for(var e;e=this.firstChild;)3===e.nodeType&&0===e.data.length?this.removeChild(e):this.parentNode.insertBefore(e,this)}).remove():n.remove(),1<n.length?n.toArray():n[0]},P=function(e,t,n){h(e).toggleClass(t,n).each(function(){""===this.className&&hu(this).attr("class",null)})},L=function(t,e,n){return _(e,function(e){return kt.is(e,"array")&&(t=t.cloneNode(!0)),n&&vu(yu(e.childNodes),function(e){t.appendChild(e)}),e.parentNode.replaceChild(t,e)})},I=function(e){if(An(e)){var t="a"===e.nodeName.toLowerCase()&&!v(e,"href")&&v(e,"id");if(v(e,"name")||v(e,"data-mce-bookmark")||t)return!0}return!1},M=function(){return a.createRange()},F=function(e,t,n,r){if(kt.isArray(e)){for(var o=e.length,i=[];o--;)i[o]=F(e[o],t,n,r);return i}return!u.collect||e!==a&&e!==c||l.push([e,t,n,r]),d.bind(e,t,n,r||j)},U=function(e,t,n){if(kt.isArray(e)){for(var r=e.length,o=[];r--;)o[r]=U(e[r],t,n);return o}if(0<l.length&&(e===a||e===c))for(r=l.length;r--;){var i=l[r];e!==i[0]||t&&t!==i[1]||n&&n!==i[2]||d.unbind(i[0],i[1],i[2])}return d.unbind(e,t,n)},z=function(e){if(e&&An(e)){var t=e.getAttribute("data-mce-contenteditable");return t&&"inherit"!==t?t:"inherit"!==e.contentEditable?e.contentEditable:null}return null},j={doc:a,settings:u,win:c,files:n,stdMode:!0,boxModel:!0,styleSheetLoader:o,boundEvents:l,styles:i,schema:f,events:d,isBlock:function(e){if("string"==typeof e)return!!m[e];if(e){var t=e.nodeType;if(t)return!(1!==t||!m[e.nodeName])}return!1},$:p,$$:h,root:null,clone:function(t,e){if(!bu||1!==t.nodeType||e)return t.cloneNode(e);var n=a.createElement(t.nodeName);return vu(y(t),function(e){b(n,e.nodeName,v(t,e.nodeName))}),n},getRoot:C,getViewPort:function(e){var t=En(e);return{x:t.x,y:t.y,w:t.width,h:t.height}},getRect:function(e){e=g(e);var t=w(e),n=S(e);return{x:t.x,y:t.y,w:n.w,h:n.h}},getSize:S,getParent:function(e,t,n){var r=E(e,t,n,!1);return r&&0<r.length?r[0]:null},getParents:E,get:g,getNext:function(e,t){return k(e,t,"nextSibling")},getPrev:function(e,t){return k(e,t,"previousSibling")},select:function(e,t){return Ta(e,g(t)||u.root_element||a,[])},is:N,add:T,create:D,createHTML:function(e,t,n){var r,o="";for(r in o+="<"+e,t)t.hasOwnProperty(r)&&null!==t[r]&&"undefined"!=typeof t[r]&&(o+=" "+r+'="'+O(t[r])+'"');return void 0!==n?o+">"+n+"</"+e+">":o+" />"},createFragment:function(e){var t,n=a.createElement("div"),r=a.createDocumentFragment();for(r.appendChild(n),e&&(n.innerHTML=e);t=n.firstChild;)r.appendChild(t);return r.removeChild(n),r},remove:B,setStyle:function(e,t,n){var r=q(t)?h(e).css(t,n):h(e).css(t);u.update_styles&&xu(i,r)},getStyle:x,setStyles:function(e,t){var n=h(e).css(t);u.update_styles&&xu(i,n)},removeAllAttribs:function(e){return _(e,function(e){for(var t=e.attributes,n=t.length-1;0<=n;n--)e.removeAttributeNode(t.item(n))})},setAttrib:b,setAttribs:A,getAttrib:v,getPos:w,parseStyle:function(e){return i.parse(e)},serializeStyle:function(e,t){return i.serialize(e,t)},addStyle:function(e){var t,n;if(j!==Nu.DOM&&a===document){if(r[e])return;r[e]=!0}(n=a.getElementById("mceDefaultStyles"))||((n=a.createElement("style")).id="mceDefaultStyles",n.type="text/css",(t=a.getElementsByTagName("head")[0]).firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n)),n.styleSheet?n.styleSheet.cssText+=e:n.appendChild(a.createTextNode(e))},loadCSS:function(e){W((e=e||"").split(","),function(e){n[e]=!0,o.load(e,V)})},addClass:function(e,t){h(e).addClass(t)},removeClass:function(e,t){P(e,t,!1)},hasClass:function(e,t){return h(e).hasClass(t)},toggleClass:P,show:function(e){h(e).show()},hide:function(e){h(e).hide()},isHidden:function(e){return"none"===h(e).css("display")},uniqueId:function(e){return(e||"mce_")+t++},setHTML:R,getOuterHTML:function(e){var t="string"==typeof e?g(e):e;return An(t)?t.outerHTML:hu("<div></div>").append(hu(t).clone()).html()},setOuterHTML:function(e,t){h(e).each(function(){try{if("outerHTML"in this)return void(this.outerHTML=t)}catch(e){}B(hu(this).html(t),!0)})},decode:e,encode:O,insertAfter:function(e,t){var r=g(t);return _(e,function(e){var t=r.parentNode,n=r.nextSibling;return n?t.insertBefore(e,n):t.appendChild(e),e})},replace:L,rename:function(t,e){var n;return t.nodeName!==e.toUpperCase()&&(n=D(e),vu(y(t),function(e){b(n,e.nodeName,v(t,e.nodeName))}),L(n,t,!0)),n||t},findCommonAncestor:function(e,t){for(var n,r=e;r;){for(n=t;n&&r!==n;)n=n.parentNode;if(r===n)break;r=r.parentNode}return!r&&e.ownerDocument?e.ownerDocument.documentElement:r},toHex:function(e){return i.toHex(kt.trim(e))},run:_,getAttribs:y,isEmpty:function(e,t){var n,r,o=0;if(I(e))return!1;if(e=e.firstChild){var i=new Xr(e,e.parentNode),a=f?f.getWhiteSpaceElements():{};t=t||(f?f.getNonEmptyElements():null);do{if(n=e.nodeType,An(e)){var u=e.getAttribute("data-mce-bogus");if(u){e=i.next("all"===u);continue}if(r=e.nodeName.toLowerCase(),t&&t[r]){if("br"!==r)return!1;o++,e=i.next();continue}if(I(e))return!1}if(8===n)return!1;if(3===n&&!Uo(e.nodeValue))return!1;if(3===n&&e.parentNode&&a[e.parentNode.nodeName]&&Uo(e.nodeValue))return!1;e=i.next()}while(e)}return o<=1},createRng:M,nodeIndex:Su,split:function(e,t,n){var r,o,i,a=M();if(e&&t)return a.setStart(e.parentNode,Su(e)),a.setEnd(t.parentNode,Su(t)),r=a.extractContents(),(a=M()).setStart(t.parentNode,Su(t)+1),a.setEnd(e.parentNode,Su(e)+1),o=a.extractContents(),(i=e.parentNode).insertBefore(Yo(j,r),e),n?i.insertBefore(n,e):i.insertBefore(t,e),i.insertBefore(Yo(j,o),e),B(e),n||t},bind:F,unbind:U,fire:function(e,t,n){return d.fire(e,t,n)},getContentEditable:z,getContentEditableParent:function(e){for(var t=C(),n=null;e&&e!==t&&null===(n=z(e));e=e.parentNode);return n},destroy:function(){if(0<l.length)for(var e=l.length;e--;){var t=l[e];d.unbind(t[0],t[1],t[2])}ue(n,function(e,t){o.unload(t),delete n[t]}),Ta.setDocument&&Ta.setDocument()},isChildOf:function(e,t){for(;e;){if(t===e)return!0;e=e.parentNode}return!1},dumpRng:function(e){return"startContainer: "+e.startContainer.nodeName+", startOffset: "+e.startOffset+", endContainer: "+e.endContainer.nodeName+", endOffset: "+e.endOffset}},H=wu(i,u,function(){return j});return j}(gu=Nu=Nu||{}).DOM=gu(document),gu.nodeIndex=Su;var Eu=Nu,ku=Eu.DOM,_u=kt.each,Au=kt.grep,Ru=(Tu.prototype._setReferrerPolicy=function(e){this.settings.referrerPolicy=e},Tu.prototype.loadScript=function(e,t,n){var r=ku,o=function(){r.remove(i),a&&(a.onerror=a.onload=a=null)},i=r.uniqueId(),a=document.createElement("script");a.id=i,a.type="text/javascript",a.src=kt._addCacheSuffix(e),this.settings.referrerPolicy&&r.setAttrib(a,"referrerpolicy",this.settings.referrerPolicy),a.onload=function(){o(),t()},a.onerror=function(){o(),T(n)?n():"undefined"!=typeof console&&console.log&&console.log("Failed to load script: "+e)},(document.getElementsByTagName("head")[0]||document.body).appendChild(a)},Tu.prototype.isDone=function(e){return 2===this.states[e]},Tu.prototype.markDone=function(e){this.states[e]=2},Tu.prototype.add=function(e,t,n,r){var o=this.states[e];this.queue.push(e),o===undefined&&(this.states[e]=0),t&&(this.scriptLoadedCallbacks[e]||(this.scriptLoadedCallbacks[e]=[]),this.scriptLoadedCallbacks[e].push({success:t,failure:r,scope:n||this}))},Tu.prototype.load=function(e,t,n,r){return this.add(e,t,n,r)},Tu.prototype.remove=function(e){delete this.states[e],delete this.scriptLoadedCallbacks[e]},Tu.prototype.loadQueue=function(e,t,n){this.loadScripts(this.queue,e,t,n)},Tu.prototype.loadScripts=function(n,e,t,r){var o=this,i=[],a=function(t,e){_u(o.scriptLoadedCallbacks[e],function(e){T(e[t])&&e[t].call(e.scope)}),o.scriptLoadedCallbacks[e]=undefined};o.queueLoadedCallbacks.push({success:e,failure:r,scope:t||this});var u=function(){var e,t=Au(n);n.length=0,_u(t,function(e){2!==o.states[e]?3!==o.states[e]?1!==o.states[e]&&(o.states[e]=1,o.loading++,o.loadScript(e,function(){o.states[e]=2,o.loading--,a("success",e),u()},function(){o.states[e]=3,o.loading--,i.push(e),a("failure",e),u()})):a("failure",e):a("success",e)}),o.loading||(e=o.queueLoadedCallbacks.slice(0),o.queueLoadedCallbacks.length=0,_u(e,function(e){0===i.length?T(e.success)&&e.success.call(e.scope):T(e.failure)&&e.failure.call(e.scope,i)}))};u()},Tu.ScriptLoader=new Tu,Tu);function Tu(e){void 0===e&&(e={}),this.states={},this.queue=[],this.scriptLoadedCallbacks={},this.queueLoadedCallbacks=[],this.loading=0,this.settings=e}var Du,Ou=function(e){var t=e;return{get:function(){return t},set:function(e){t=e}}},Bu={},Pu=Ou("en"),Lu=function(){return ge(Bu,Pu.get())},Iu={getData:function(){return se(Bu,function(e){return ke({},e)})},setCode:function(e){e&&Pu.set(e)},getCode:function(){return Pu.get()},add:function(e,t){var n=Bu[e];n||(Bu[e]=n={}),ue(t,function(e,t){n[t.toLowerCase()]=e})},translate:function(e){var t,n,r=Lu().getOr({}),o=function(e){return T(e)?Object.prototype.toString.call(e):i(e)?"":""+e},i=function(e){return""===e||null===e||e===undefined},a=function(e){var t=o(e);return ge(r,t.toLowerCase()).map(o).getOr(t)},u=function(e){return e.replace(/{context:\w+}$/,"")};if(i(e))return"";if(_(t=e)&&he(t,"raw"))return o(e.raw);if(S(n=e)&&1<n.length){var s=e.slice(1);return u(a(e[0]).replace(/\{([0-9]+)\}/g,function(e,t){return he(s,t)?o(s[t]):e}))}return u(a(e))},isRtl:function(){return Lu().bind(function(e){return ge(e,"_dir")}).exists(function(e){return"rtl"===e})},hasCode:function(e){return he(Bu,e)}};function Mu(){var r=this,o=[],s={},c={},i=[],l=function(t,n){var e=H(i,function(e){return e.name===t&&e.state===n});W(e,function(e){return e.callback()})},f=function(e){var t;return c[e]&&(t=c[e].dependencies),t||[]},d=function(e,t){return"object"==typeof t?t:"string"==typeof e?{prefix:"",resource:t,suffix:""}:{prefix:e.prefix,resource:t,suffix:e.suffix}},m=function(o,i,a,u,e){var t,n;s[o]||(0!==(t="string"==typeof i?i:i.prefix+i.resource+i.suffix).indexOf("/")&&-1===t.indexOf("://")&&(t=Mu.baseURL+"/"+t),s[o]=t.substring(0,t.lastIndexOf("/")),n=function(){var n,e,t,r;l(o,"loaded"),n=i,e=a,t=u,r=f(o),W(r,function(e){var t=d(n,e);m(t.resource,t,undefined,undefined)}),e&&(t?e.call(t):e.call(Ru))},c[o]?n():Ru.ScriptLoader.add(t,n,u,e))},e=function(e,t,n){void 0===n&&(n="added"),he(c,e)&&"added"===n||he(s,e)&&"loaded"===n?t():i.push({name:e,state:n,callback:t})};return{items:o,urls:s,lookup:c,_listeners:i,get:function(e){return c[e]?c[e].instance:undefined},dependencies:f,requireLangPack:function(t,n){!1!==Mu.languageLoad&&e(t,function(){var e=Iu.getCode();!e||n&&-1===(","+(n||"")+",").indexOf(","+e+",")||Ru.ScriptLoader.add(s[t]+"/langs/"+e+".js")},"loaded")},add:function(e,t,n){var r=t;return o.push(r),c[e]={instance:r,dependencies:n},l(e,"added"),r},remove:function(e){delete s[e],delete c[e]},createUrl:d,addComponents:function(e,t){var n=r.urls[e];W(t,function(e){Ru.ScriptLoader.add(n+"/"+e)})},load:m,waitFor:e}}(Du=Mu=Mu||{}).PluginManager=Du(),Du.ThemeManager=Du();var Fu,Uu=Mu,zu=function(n,r){var o=null;return{cancel:function(){null!==o&&(clearTimeout(o),o=null)},throttle:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];null===o&&(o=setTimeout(function(){n.apply(null,e),o=null},r))}}},ju=function(n,r){var o=null;return{cancel:function(){null!==o&&(clearTimeout(o),o=null)},throttle:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];null!==o&&clearTimeout(o),o=setTimeout(function(){n.apply(null,e),o=null},r)}}},Hu=function(e,t){var n=Gn(e,t);return n===undefined||""===n?[]:n.split(" ")},Vu=function(e){return e.dom.classList!==undefined},qu=function(e,t){return o=t,i=Hu(n=e,r="class").concat([o]),Xn(n,r,i.join(" ")),!0;var n,r,o,i},$u=function(e,t){return o=t,0<(i=H(Hu(n=e,r="class"),function(e){return e!==o})).length?Xn(n,r,i.join(" ")):Qn(n,r),!1;var n,r,o,i},Wu=function(e,t){Vu(e)?e.dom.classList.add(t):qu(e,t)},Ku=function(e){0===(Vu(e)?e.dom.classList:Hu(e,"class")).length&&Qn(e,"class")},Xu=function(e,t){return Vu(e)&&e.dom.classList.contains(t)},Yu=function(e,t){var n=[];return W(Gt(e),function(e){t(e)&&(n=n.concat([e])),n=n.concat(Yu(e,t))}),n},Gu=function(e,t){return n=t,o=(r=e)===undefined?document:r.dom,Dt(o)?[]:z(o.querySelectorAll(n),At.fromDom);var n,r,o},Ju=E("mce-annotation"),Qu=E("data-mce-annotation"),Zu=E("data-mce-annotation-uid"),es=function(r,e){var t=r.selection.getRng(),n=At.fromDom(t.startContainer),o=At.fromDom(r.getBody()),i=e.fold(function(){return"."+Ju()},function(e){return"["+Qu()+'="'+e+'"]'}),a=Jt(n,t.startOffset).getOr(n),u=Or(a,i,function(e){return Ot(e,o)}),s=function(e,t){return n=t,(r=e.dom)&&r.hasAttribute&&r.hasAttribute(n)?U.some(Gn(e,t)):U.none();var n,r};return u.bind(function(e){return s(e,""+Zu()).bind(function(n){return s(e,""+Qu()).map(function(e){var t=ts(r,n);return{uid:n,name:e,elements:t}})})})},ts=function(e,t){var n=At.fromDom(e.getBody());return Gu(n,"["+Zu()+'="'+t+'"]')},ns=function(i,e){var a=Ou({}),c=function(e,t){u(e,function(e){return t(e),e})},u=function(e,t){var n=a.get(),r=t(n.hasOwnProperty(e)?n[e]:{listeners:[],previous:Ou(U.none())});n[e]=r,a.set(n)},t=ju(function(){var e,t,n,r=a.get(),o=(e=ie(r),(n=B.call(e,0)).sort(t),n);W(o,function(e){u(e,function(u){var s=u.previous.get();return es(i,U.some(e)).fold(function(){var t;s.isSome()&&(c(t=e,function(e){W(e.listeners,function(e){return e(!1,t)})}),u.previous.set(U.none()))},function(e){var t,n,r,o=e.uid,i=e.name,a=e.elements;s.is(o)||(n=o,r=a,c(t=i,function(e){W(e.listeners,function(e){return e(!0,t,{uid:n,nodes:z(r,function(e){return e.dom})})})}),u.previous.set(U.some(o)))}),{previous:u.previous,listeners:u.listeners}})})},30);i.on("remove",function(){t.cancel()}),i.on("NodeChange",function(){t.throttle()});return{addListener:function(e,t){u(e,function(e){return{previous:e.previous,listeners:e.listeners.concat([t])}})}}},rs=function(e,n){e.on("init",function(){e.serializer.addNodeFilter("span",function(e){W(e,function(t){var e;e=t,U.from(e.attr(Qu())).bind(n.lookup).each(function(e){!1===e.persistent&&t.unwrap()})})})})},os=0,is=function(e){var t=(new Date).getTime();return e+"_"+Math.floor(1e9*Math.random())+ ++os+String(t)},as=function(e,t){var n,r,o=Ht(e).dom,i=At.fromDom(o.createDocumentFragment()),a=(n=t,(r=(o||document).createElement("div")).innerHTML=n,Gt(At.fromDom(r)));dn(i,a),mn(e),fn(e,i)},us=function(e,t){return At.fromDom(e.dom.cloneNode(t))},ss=function(e){return us(e,!1)},cs=function(e){return us(e,!0)},ls=function(e,t,n){void 0===n&&(n=C);var r=new Xr(e,t),o=function(e){for(var t;(t=r[e]())&&!In(t)&&!n(t););return U.from(t).filter(In)};return{current:function(){return U.from(r.current()).filter(In)},next:function(){return o("next")},prev:function(){return o("prev")},prev2:function(){return o("prev2")}}},fs=function(t,e){var i=e||function(e){return t.isBlock(e)||zn(e)||Vn(e)},a=function(e,t,n,r){if(In(e)){var o=r(e,t,e.data);if(-1!==o)return U.some({container:e,offset:o})}return n().bind(function(e){return a(e.container,e.offset,n,r)})};return{backwards:function(e,t,n,r){var o=ls(e,r,i);return a(e,t,function(){return o.prev().map(function(e){return{container:e,offset:e.length}})},n).getOrNull()},forwards:function(e,t,n,r){var o=ls(e,r,i);return a(e,t,function(){return o.next().map(function(e){return{container:e,offset:0}})},n).getOrNull()}}},ds=function(e,t,n){return e.isSome()&&t.isSome()?U.some(n(e.getOrDie(),t.getOrDie())):U.none()},ms=Math.round,ps=function(e){return e?{left:ms(e.left),top:ms(e.top),bottom:ms(e.bottom),right:ms(e.right),width:ms(e.width),height:ms(e.height)}:{left:0,top:0,bottom:0,right:0,width:0,height:0}},gs=function(e,t){return e=ps(e),t||(e.left=e.left+e.width),e.right=e.left,e.width=0,e},hs=function(e,t,n){return 0<=e&&e<=Math.min(t.height,n.height)/2},vs=function(e,t){var n=Math.min(t.height/2,e.height/2);return e.bottom-n<t.top||!(e.top>t.bottom)&&hs(t.top-e.bottom,e,t)},ys=function(e,t){return e.top>t.bottom||!(e.bottom<t.top)&&hs(t.bottom-e.top,e,t)},bs=function(e,t,n){return t>=e.left&&t<=e.right&&n>=e.top&&n<=e.bottom},Cs=function(e){var t=e.startContainer,n=e.startOffset;return t.hasChildNodes()&&e.endOffset===n+1?t.childNodes[n]:null},ws=function(e,t){return 1===e.nodeType&&e.hasChildNodes()&&(t>=e.childNodes.length&&(t=e.childNodes.length-1),e=e.childNodes[t]),e},xs=new RegExp("[\u0300-\u036f\u0483-\u0487\u0488-\u0489\u0591-\u05bd\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e3-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962-\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2-\u09e3\u0a01-\u0a02\u0a3c\u0a41-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a51\u0a70-\u0a71\u0a75\u0a81-\u0a82\u0abc\u0ac1-\u0ac5\u0ac7-\u0ac8\u0acd\u0ae2-\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62-\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c00\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c62-\u0c63\u0c81\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc-\u0ccd\u0cd5-\u0cd6\u0ce2-\u0ce3\u0d01\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62-\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039-\u103a\u103d-\u103e\u1058-\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17b4-\u17b5\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193b\u1a17-\u1a18\u1a1b\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1ab0-\u1abd\u1abe\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80-\u1b81\u1ba2-\u1ba5\u1ba8-\u1ba9\u1bab-\u1bad\u1be6\u1be8-\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1cf4\u1cf8-\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u200c-\u200d\u20d0-\u20dc\u20dd-\u20e0\u20e1\u20e2-\u20e4\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302d\u302e-\u302f\u3099-\u309a\ua66f\ua670-\ua672\ua674-\ua67d\ua69e-\ua69f\ua6f0-\ua6f1\ua802\ua806\ua80b\ua825-\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\ua9e5\uaa29-\uaa2e\uaa31-\uaa32\uaa35-\uaa36\uaa43\uaa4c\uaa7c\uaab0\uaab2-\uaab4\uaab7-\uaab8\uaabe-\uaabf\uaac1\uaaec-\uaaed\uaaf6\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\uff9e-\uff9f]"),Ss=function(e){return"string"==typeof e&&768<=e.charCodeAt(0)&&xs.test(e)},Ns=An,Es=Lo,ks=Tn("display","block table"),_s=Tn("float","left right"),As=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return function(e){for(var t=0;t<n.length;t++)if(!n[t](e))return!1;return!0}}(Ns,Es,d(_s)),Rs=d(Tn("white-space","pre pre-line pre-wrap")),Ts=In,Ds=zn,Os=Eu.nodeIndex,Bs=ws,Ps=function(e){return"createRange"in e?e.createRange():Eu.DOM.createRng()},Ls=function(e){return e&&/[\r\n\t ]/.test(e)},Is=function(e){return!!e.setStart&&!!e.setEnd},Ms=function(e){var t,n=e.startContainer,r=e.startOffset;return!!(Ls(e.toString())&&Rs(n.parentNode)&&In(n)&&(t=n.data,Ls(t[r-1])||Ls(t[r+1])))},Fs=function(e){return 0===e.left&&0===e.right&&0===e.top&&0===e.bottom},Us=function(e){var t=e.getClientRects(),n=0<t.length?ps(t[0]):ps(e.getBoundingClientRect());return!Is(e)&&Ds(e)&&Fs(n)?function(e){var t=e.ownerDocument,n=Ps(t),r=t.createTextNode(lo),o=e.parentNode;o.insertBefore(r,e),n.setStart(r,0),n.setEnd(r,1);var i=ps(n.getBoundingClientRect());return o.removeChild(r),i}(e):Fs(n)&&Is(e)?function(e){var t=e.startContainer,n=e.endContainer,r=e.startOffset,o=e.endOffset;if(t===n&&In(n)&&0===r&&1===o){var i=e.cloneRange();return i.setEndAfter(n),Us(i)}return null}(e):n},zs=function(e,t){var n=gs(e,t);return n.width=1,n.right=n.left+1,n},js=function(e){var t,n,r=[],o=function(e){var t,n;0!==e.height&&(0<r.length&&(t=e,n=r[r.length-1],t.left===n.left&&t.top===n.top&&t.bottom===n.bottom&&t.right===n.right)||r.push(e))},i=function(e,t){var n=Ps(e.ownerDocument);if(t<e.data.length){if(Ss(e.data[t]))return r;if(Ss(e.data[t-1])&&(n.setStart(e,t),n.setEnd(e,t+1),!Ms(n)))return o(zs(Us(n),!1)),r}0<t&&(n.setStart(e,t-1),n.setEnd(e,t),Ms(n)||o(zs(Us(n),!1))),t<e.data.length&&(n.setStart(e,t),n.setEnd(e,t+1),Ms(n)||o(zs(Us(n),!0)))};if(Ts(e.container()))return i(e.container(),e.offset()),r;if(Ns(e.container()))if(e.isAtEnd())n=Bs(e.container(),e.offset()),Ts(n)&&i(n,n.data.length),As(n)&&!Ds(n)&&o(zs(Us(n),!1));else{if(n=Bs(e.container(),e.offset()),Ts(n)&&i(n,0),As(n)&&e.isAtEnd())return o(zs(Us(n),!1)),r;t=Bs(e.container(),e.offset()-1),As(t)&&!Ds(t)&&(!ks(t)&&!ks(n)&&As(n)||o(zs(Us(t),!1))),As(n)&&o(zs(Us(n),!0))}return r};function Hs(t,n,e){var r=function(){return e=e||js(Hs(t,n))};return{container:E(t),offset:E(n),toRange:function(){var e=Ps(t.ownerDocument);return e.setStart(t,n),e.setEnd(t,n),e},getClientRects:r,isVisible:function(){return 0<r().length},isAtStart:function(){return Ts(t),0===n},isAtEnd:function(){return Ts(t)?n>=t.data.length:n>=t.childNodes.length},isEqual:function(e){return e&&t===e.container()&&n===e.offset()},getNode:function(e){return Bs(t,e?n-1:n)}}}(Fu=Hs=Hs||{}).fromRangeStart=function(e){return Fu(e.startContainer,e.startOffset)},Fu.fromRangeEnd=function(e){return Fu(e.endContainer,e.endOffset)},Fu.after=function(e){return Fu(e.parentNode,Os(e)+1)},Fu.before=function(e){return Fu(e.parentNode,Os(e))},Fu.isAbove=function(e,t){return ds(ne(t.getClientRects()),re(e.getClientRects()),vs).getOr(!1)},Fu.isBelow=function(e,t){return ds(re(t.getClientRects()),ne(e.getClientRects()),ys).getOr(!1)},Fu.isAtStart=function(e){return!!e&&e.isAtStart()},Fu.isAtEnd=function(e){return!!e&&e.isAtEnd()},Fu.isTextPosition=function(e){return!!e&&In(e.container())},Fu.isElementPosition=function(e){return!1===Fu.isTextPosition(e)};var Vs,qs,$s=Hs,Ws=function(e,t){In(t)&&0===t.data.length&&e.remove(t)},Ks=function(e,t,n){var r,o,i,a,u,s,c;Un(n)?(i=e,a=t,u=n,s=U.from(u.firstChild),c=U.from(u.lastChild),a.insertNode(u),s.each(function(e){return Ws(i,e.previousSibling)}),c.each(function(e){return Ws(i,e.nextSibling)})):(r=e,o=n,t.insertNode(o),Ws(r,o.previousSibling),Ws(r,o.nextSibling))},Xs=In,Ys=On,Gs=Eu.nodeIndex,Js=function(e){var t=e.parentNode;return Ys(t)?Js(t):t},Qs=function(e){return e?Se(e.childNodes,function(e,t){return Ys(t)&&"BR"!==t.nodeName?e=e.concat(Qs(t)):e.push(t),e},[]):[]},Zs=function(t){return function(e){return t===e}},ec=function(e){var t=Xs(e)?"text()":e.nodeName.toLowerCase();return t+"["+function(e){var r=Qs(Js(e)),t=Ne(r,Zs(e),e);r=r.slice(0,t+1);var n=Se(r,function(e,t,n){return Xs(t)&&Xs(r[n-1])&&e++,e},0);return r=we(r,Rn([e.nodeName])),(t=Ne(r,Zs(e),e))-n}(e)+"]"},tc=function(e,t){var n,r,o,i=[],a=t.container(),u=t.offset();return Xs(a)?n=function(e,t){for(;(e=e.previousSibling)&&Xs(e);)t+=e.data.length;return t}(a,u):(u>=(r=a.childNodes).length?(n="after",u=r.length-1):n="before",a=r[u]),i.push(ec(a)),o=function(e,t,n){var r=[];for(t=t.parentNode;t!==e&&(!n||!n(t));t=t.parentNode)r.push(t);return r}(e,a),o=we(o,d(On)),(i=i.concat(Ce(o,ec))).reverse().join("/")+","+n},nc=function(e,t){if(!t)return null;var n=t.split(","),r=n[0].split("/"),o=1<n.length?n[1]:"before",i=Se(r,function(e,t){var n,r,o,i,a=/([\w\-\(\)]+)\[([0-9]+)\]/.exec(t);return a?("text()"===a[1]&&(a[1]="#text"),n=e,r=a[1],o=parseInt(a[2],10),i=Qs(n),i=we(i,function(e,t){return!Xs(e)||!Xs(i[t-1])}),(i=we(i,Rn([r])))[o]):null},e);return i?Xs(i)?function(e,t){for(var n,r=e,o=0;Xs(r);){if(n=r.data.length,o<=t&&t<=o+n){e=r,t-=o;break}if(!Xs(r.nextSibling)){e=r,t=n;break}o+=n,r=r.nextSibling}return Xs(e)&&t>e.data.length&&(t=e.data.length),$s(e,t)}(i,parseInt(o,10)):(o="after"===o?Gs(i)+1:Gs(i),$s(i.parentNode,o)):null},rc=Vn,oc=function(e,t,n,r,o){var i,a=r[o?"startContainer":"endContainer"],u=r[o?"startOffset":"endOffset"],s=[],c=0,l=e.getRoot();for(In(a)?s.push(n?function(e,t,n){for(var r=e(t.data.slice(0,n)).length,o=t.previousSibling;o&&In(o);o=o.previousSibling)r+=e(o.data).length;return r}(t,a,u):u):(u>=(i=a.childNodes).length&&i.length&&(c=1,u=Math.max(0,i.length-1)),s.push(e.nodeIndex(i[u],n)+c));a&&a!==l;a=a.parentNode)s.push(e.nodeIndex(a,n));return s},ic=function(e,t,n){var r=0;return kt.each(e.select(t),function(e){if("all"!==e.getAttribute("data-mce-bogus"))return e!==n&&void r++}),r},ac=function(e,t){var n,r=t?"start":"end",o=e[r+"Container"],i=e[r+"Offset"];An(o)&&"TR"===o.nodeName&&(o=(n=o.childNodes)[Math.min(t?i:i-1,n.length-1)])&&(i=t?0:o.childNodes.length,e["set"+(t?"Start":"End")](o,i))},uc=function(e){return ac(e,!0),ac(e,!1),e},sc=function(e,t){var n;if(An(e)&&(e=ws(e,t),rc(e)))return e;if(bo(e)){if(In(e)&&vo(e)&&(e=e.parentNode),n=e.previousSibling,rc(n))return n;if(n=e.nextSibling,rc(n))return n}},cc=function(e,t,n){var r=n.getNode(),o=r?r.nodeName:null,i=n.getRng();if(rc(r)||"IMG"===o)return{name:o,index:ic(n.dom,o,r)};var a,u,s,c,l,f,d,m=sc((a=i).startContainer,a.startOffset)||sc(a.endContainer,a.endOffset);return m?{name:o=m.tagName,index:ic(n.dom,o,m)}:(u=e,c=t,l=i,f=(s=n).dom,(d={}).start=oc(f,u,c,l,!0),s.isCollapsed()||(d.end=oc(f,u,c,l,!1)),d)},lc=function(e,t,n){var r={"data-mce-type":"bookmark",id:t,style:"overflow:hidden;line-height:0px"};return n?e.create("span",r,"&#xFEFF;"):e.create("span",r)},fc=function(e,t){var n=e.dom,r=e.getRng(),o=n.uniqueId(),i=e.isCollapsed(),a=e.getNode(),u=a.nodeName;if("IMG"===u)return{name:u,index:ic(n,u,a)};var s,c=uc(r.cloneRange());i||(c.collapse(!1),s=lc(n,o+"_end",t),Ks(n,c,s)),(r=uc(r)).collapse(!0);var l=lc(n,o+"_start",t);return Ks(n,r,l),e.moveToBookmark({id:o,keep:!0}),{id:o}},dc=function(e,t,n){return 2===t?cc(po,n,e):3===t?(o=(r=e).getRng(),{start:tc(r.dom.getRoot(),$s.fromRangeStart(o)),end:tc(r.dom.getRoot(),$s.fromRangeEnd(o))}):t?{rng:e.getRng()}:fc(e,!1);var r,o},mc=N(cc,o,!0),pc=Eu.DOM,gc=function(e,t,n){var r=e.getParam(t,n);if(-1===r.indexOf("="))return r;var o=e.getParam(t,"","hash");return o.hasOwnProperty(e.id)?o[e.id]:n},hc=function(e){return e.getParam("content_security_policy","")},vc=function(e){if(e.getParam("force_p_newlines",!1))return"p";var t=e.getParam("forced_root_block","p");return!1===t?"":!0===t?"p":t},yc=function(e){return e.getParam("forced_root_block_attrs",{})},bc=function(e){return e.getParam("automatic_uploads",!0,"boolean")},Cc=function(e){return e.getParam("icons","","string")},wc=function(e){return e.getParam("referrer_policy","","string")},xc=function(e){return e.getParam("language","en","string")},Sc=function(e){return e.getParam("indent_use_margin",!1)},Nc=function(e){var t=e.getParam("object_resizing");return!1!==t&&!wt.iOS&&(q(t)?t:"table,img,figure.image,div")},Ec=function(e){return e.getParam("event_root")},kc=function(e){return e.getParam("theme")},_c=function(e){return!1!==e.getParam("inline_boundaries")},Ac=function(e){return e.getParam("plugins","","string")},Rc=An,Tc=In,Dc=function(e){var t=e.parentNode;t&&t.removeChild(e)},Oc=function(e){var t=po(e);return{count:e.length-t.length,text:t}},Bc=function(e){for(var t;-1!==(t=e.data.lastIndexOf(fo));)e.deleteData(t,1)},Pc=function(e,t){return Fc(e),t},Lc=function(e,t){var n,r,o=t.container(),i=(n=oe(o.childNodes),(-1===(r=I(n,e))?U.none():U.some(r)).map(function(e){return e<t.offset()?$s(o,t.offset()-1):t}).getOr(t));return Fc(e),i},Ic=function(e,t){return Tc(e)&&t.container()===e?(r=t,o=Oc((n=e).data.substr(0,r.offset())),i=Oc(n.data.substr(r.offset())),0<(o.text+i.text).length?(Bc(n),$s(n,r.offset()-o.count)):r):Pc(e,t);var n,r,o,i},Mc=function(e,t){return $s.isTextPosition(t)?Ic(e,t):(n=e,((r=t).container()===n.parentNode?Lc:Pc)(n,r));var n,r},Fc=function(e){Rc(e)&&bo(e)&&(Co(e)?e.removeAttribute("data-mce-caret"):Dc(e)),Tc(e)&&(Bc(e),0===e.data.length&&Dc(e))},Uc=dt().browser,zc=Vn,jc=$n,Hc=qn,Vc=function(e,t,n){var r,o,i,a,u=gs(t.getBoundingClientRect(),n),s="BODY"===e.tagName?(r=e.ownerDocument.documentElement,o=e.scrollLeft||r.scrollLeft,e.scrollTop||r.scrollTop):(a=e.getBoundingClientRect(),o=e.scrollLeft-a.left,e.scrollTop-a.top);return u.left+=o,u.right+=o,u.top+=s,u.bottom+=s,u.width=1,0<(i=t.offsetWidth-t.clientWidth)&&(n&&(i*=-1),u.left+=i,u.right+=i),u},qc=function(e,i,a,t){var n,u,s=Ou(U.none()),r=vc(e),c=0<r.length?r:"p",l=function(){!function(e){for(var t=Gu(At.fromDom(e),"*[contentEditable=false],video,audio,embed,object"),n=0;n<t.length;n++){var r,o=t[n].dom,i=o.previousSibling;Eo(i)&&(1===(r=i.data).length?i.parentNode.removeChild(i):i.deleteData(r.length-1,1)),i=o.nextSibling,No(i)&&(1===(r=i.data).length?i.parentNode.removeChild(i):i.deleteData(0,1))}}(i),u&&(Fc(u),u=null),s.get().each(function(e){hu(e.caret).remove(),s.set(U.none())}),n&&(qr.clearInterval(n),n=null)},f=function(){n=qr.setInterval(function(){t()?hu("div.mce-visual-caret",i).toggleClass("mce-visual-caret-hidden"):hu("div.mce-visual-caret",i).addClass("mce-visual-caret-hidden")},500)};return{show:function(t,e){var n,r;if(l(),Hc(e))return null;if(!a(e))return u=function(e,t){var n,r=e.ownerDocument.createTextNode(fo),o=e.parentNode;if(t){if(n=e.previousSibling,ho(n)){if(bo(n))return n;if(Eo(n))return n.splitText(n.data.length-1)}o.insertBefore(r,e)}else{if(n=e.nextSibling,ho(n)){if(bo(n))return n;if(No(n))return n.splitText(1),n}e.nextSibling?o.insertBefore(r,e.nextSibling):o.appendChild(r)}return r}(e,t),r=e.ownerDocument.createRange(),Wc(u.nextSibling)?(r.setStart(u,0),r.setEnd(u,0)):(r.setStart(u,1),r.setEnd(u,1)),r;u=So(c,e,t),n=Vc(i,e,t),hu(u).css("top",n.top);var o=hu('<div class="mce-visual-caret" data-mce-bogus="all"></div>').css(n).appendTo(i)[0];return s.set(U.some({caret:o,element:e,before:t})),s.get().each(function(e){t&&hu(e.caret).addClass("mce-visual-caret-before")}),f(),(r=e.ownerDocument.createRange()).setStart(u,0),r.setEnd(u,0),r},hide:l,getCss:function(){return".mce-visual-caret {position: absolute;background-color: black;background-color: currentcolor;}.mce-visual-caret-hidden {display: none;}*[data-mce-caret] {position: absolute;left: -1000px;right: auto;top: 0;margin: 0;padding: 0;}"},reposition:function(){s.get().each(function(e){var t=Vc(i,e.element,e.before);hu(e.caret).css(ke({},t))})},destroy:function(){return qr.clearInterval(n)}}},$c=function(){return Uc.isIE()||Uc.isEdge()||Uc.isFirefox()},Wc=function(e){return zc(e)||jc(e)},Kc=function(e){return Wc(e)||Bn(e)&&$c()},Xc=Vn,Yc=$n,Gc=Tn("display","block table table-cell table-caption list-item"),Jc=bo,Qc=vo,Zc=An,el=Lo,tl=function(e,t){for(var n;n=e(t);)if(!Qc(n))return n;return null},nl=function(e,t,n,r,o){var i=new Xr(e,r),a=Xc(e)||Qc(e);if(t<0){if(a&&n(e=tl(i.prev,!0)))return e;for(;e=tl(i.prev,o);)if(n(e))return e}if(0<t){if(a&&n(e=tl(i.next,!0)))return e;for(;e=tl(i.next,o);)if(n(e))return e}return null},rl=function(e,t){for(;e&&e!==t;){if(Gc(e))return e;e=e.parentNode}return null},ol=function(e,t,n){return rl(e.container(),n)===rl(t.container(),n)},il=function(e,t){if(!t)return null;var n=t.container(),r=t.offset();return Zc(n)?n.childNodes[r+e]:null},al=function(e,t){var n=t.ownerDocument.createRange();return e?(n.setStartBefore(t),n.setEndBefore(t)):(n.setStartAfter(t),n.setEndAfter(t)),n},ul=function(e,t,n){for(var r,o,i,a=e?"previousSibling":"nextSibling";n&&n!==t;){if(r=n[a],Jc(r)&&(r=r[a]),Xc(r)||Yc(r)){if(i=n,rl(r,o=t)===rl(i,o))return r;break}if(el(r))break;n=n.parentNode}return null},sl=N(al,!0),cl=N(al,!1),ll=function(e,t,n){var r,o,i=N(ul,!0,t),a=N(ul,!1,t),u=n.startContainer,s=n.startOffset;if(vo(u)){if(Zc(u)||(u=u.parentNode),"before"===(o=u.getAttribute("data-mce-caret"))&&(r=u.nextSibling,Kc(r)))return sl(r);if("after"===o&&(r=u.previousSibling,Kc(r)))return cl(r)}if(!n.collapsed)return n;if(In(u)){if(Jc(u)){if(1===e){if(r=a(u))return sl(r);if(r=i(u))return cl(r)}if(-1===e){if(r=i(u))return cl(r);if(r=a(u))return sl(r)}return n}if(Eo(u)&&s>=u.data.length-1)return 1===e&&(r=a(u))?sl(r):n;if(No(u)&&s<=1)return-1===e&&(r=i(u))?cl(r):n;if(s===u.data.length)return(r=a(u))?sl(r):n;if(0===s)return(r=i(u))?cl(r):n}return n},fl=function(e,t){return U.from(il(e?0:-1,t)).filter(Xc)},dl=function(e,t,n){var r=ll(e,t,n);return-1===e?Hs.fromRangeStart(r):Hs.fromRangeEnd(r)},ml=function(e){return U.from(e.getNode()).map(At.fromDom)},pl=function(e,t){for(;t=e(t);)if(t.isVisible())return t;return t},gl=function(e,t){var n=ol(e,t);return!(n||!zn(e.getNode()))||n};(qs=Vs=Vs||{})[qs.Backwards=-1]="Backwards",qs[qs.Forwards=1]="Forwards";var hl,vl=Vn,yl=In,bl=An,Cl=zn,wl=Lo,xl=function(e){return Oo(e)||!!Io(t=e)&&!0!==X(oe(t.getElementsByTagName("*")),function(e,t){return e||_o(t)},!1);var t},Sl=Mo,Nl=function(e,t){return e.hasChildNodes()&&t<e.childNodes.length?e.childNodes[t]:null},El=function(e,t){if(0<e){if(wl(t.previousSibling)&&!yl(t.previousSibling))return $s.before(t);if(yl(t))return $s(t,0)}if(e<0){if(wl(t.nextSibling)&&!yl(t.nextSibling))return $s.after(t);if(yl(t))return $s(t,t.data.length)}return!(e<0)||Cl(t)?$s.before(t):$s.after(t)},kl=function(e,t,n){var r,o,i,a;if(!bl(n)||!t)return null;if(t.isEqual($s.after(n))&&n.lastChild){if(a=$s.after(n.lastChild),e<0&&wl(n.lastChild)&&bl(n.lastChild))return Cl(n.lastChild)?$s.before(n.lastChild):a}else a=t;var u,s,c,l=a.container(),f=a.offset();if(yl(l)){if(e<0&&0<f)return $s(l,--f);if(0<e&&f<l.length)return $s(l,++f);r=l}else{if(e<0&&0<f&&(o=Nl(l,f-1),wl(o)))return!xl(o)&&(i=nl(o,e,Sl,o))?yl(i)?$s(i,i.data.length):$s.after(i):yl(o)?$s(o,o.data.length):$s.before(o);if(0<e&&f<l.childNodes.length&&(o=Nl(l,f),wl(o)))return Cl(o)?(u=n,(c=(s=o).nextSibling)&&wl(c)?yl(c)?$s(c,0):$s.before(c):kl(Vs.Forwards,$s.after(s),u)):!xl(o)&&(i=nl(o,e,Sl,o))?yl(i)?$s(i,0):$s.before(i):yl(o)?$s(o,0):$s.after(o);r=o||a.getNode()}if((0<e&&a.isAtEnd()||e<0&&a.isAtStart())&&(r=nl(r,e,k,n,!0),Sl(r,n)))return El(e,r);o=nl(r,e,Sl,n);var d=Ee(H(function(e,t){for(var n=[];e&&e!==t;)n.push(e),e=e.parentNode;return n}(l,n),vl));return!d||o&&d.contains(o)?o?El(e,o):null:a=0<e?$s.after(d):$s.before(d)},_l=function(t){return{next:function(e){return kl(Vs.Forwards,e,t)},prev:function(e){return kl(Vs.Backwards,e,t)}}},Al=function(e){return $s.isTextPosition(e)?0===e.offset():Lo(e.getNode())},Rl=function(e){if($s.isTextPosition(e)){var t=e.container();return e.offset()===t.data.length}return Lo(e.getNode(!0))},Tl=function(e,t){return!$s.isTextPosition(e)&&!$s.isTextPosition(t)&&e.getNode()===t.getNode(!0)},Dl=function(e,t,n){return e?!Tl(t,n)&&(r=t,!(!$s.isTextPosition(r)&&zn(r.getNode())))&&Rl(t)&&Al(n):!Tl(n,t)&&Al(t)&&Rl(n);var r},Ol=function(e,t,n){var r=_l(t);return U.from(e?r.next(n):r.prev(n))},Bl=function(t,n,r){return Ol(t,n,r).bind(function(e){return ol(r,e,n)&&Dl(t,r,e)?Ol(t,n,e):U.some(e)})},Pl=function(t,n,e,r){return Bl(t,n,e).bind(function(e){return r(e)?Pl(t,n,e,r):U.some(e)})},Ll=function(e,t){var n,r,o,i,a,u=e?t.firstChild:t.lastChild;return In(u)?U.some($s(u,e?0:u.data.length)):u?Lo(u)?U.some(e?$s.before(u):zn(a=u)?$s.before(a):$s.after(a)):(r=t,o=u,i=(n=e)?$s.before(o):$s.after(o),Ol(n,r,i)):U.none()},Il=N(Ol,!0),Ml=N(Ol,!1),Fl=N(Ll,!0),Ul=N(Ll,!1),zl="_mce_caret",jl=function(e){return An(e)&&e.id===zl},Hl=function(e,t){for(;t&&t!==e;){if(t.id===zl)return t;t=t.parentNode}return null},Vl=function(e,t){return An(t)&&e.isBlock(t)&&!t.innerHTML&&!wt.ie&&(t.innerHTML='<br data-mce-bogus="1" />'),t},ql=function(e,t,n){return!(!1!==t.hasChildNodes()||!Hl(e,t))&&(o=n,i=(r=t).ownerDocument.createTextNode(fo),r.appendChild(i),o.setStart(i,0),o.setEnd(i,0),!0);var r,o,i},$l=function(e,t,n,r){var o,i,a,u,s=n[t?"start":"end"],c=e.getRoot();if(s){for(a=s[0],i=c,o=s.length-1;1<=o;o--){if(u=i.childNodes,ql(c,i,r))return!0;if(s[o]>u.length-1)return!!ql(c,i,r)||function(e,t){return Ul(e).fold(function(){return!1},function(e){return t.setStart(e.container(),e.offset()),t.setEnd(e.container(),e.offset()),!0})}(i,r);i=u[s[o]]}3===i.nodeType&&(a=Math.min(s[0],i.nodeValue.length)),1===i.nodeType&&(a=Math.min(s[0],i.childNodes.length)),t?r.setStart(i,a):r.setEnd(i,a)}return!0},Wl=function(e){return In(e)&&0<e.data.length},Kl=function(e,t,n){var r,o,i,a,u,s,c=e.get(n.id+"_"+t),l=n.keep;if(c){if(r=c.parentNode,s=(u=(o="start"===t?l?c.hasChildNodes()?(r=c.firstChild,1):Wl(c.nextSibling)?(r=c.nextSibling,0):Wl(c.previousSibling)?(r=c.previousSibling,c.previousSibling.data.length):(r=c.parentNode,e.nodeIndex(c)+1):e.nodeIndex(c):l?c.hasChildNodes()?(r=c.firstChild,1):Wl(c.previousSibling)?(r=c.previousSibling,c.previousSibling.data.length):(r=c.parentNode,e.nodeIndex(c)):e.nodeIndex(c),r),o),!l){for(a=c.previousSibling,i=c.nextSibling,kt.each(kt.grep(c.childNodes),function(e){In(e)&&(e.nodeValue=e.nodeValue.replace(/\uFEFF/g,""))});c=e.get(n.id+"_"+t);)e.remove(c,!0);a&&i&&a.nodeType===i.nodeType&&In(a)&&!wt.opera&&(o=a.nodeValue.length,a.appendData(i.nodeValue),e.remove(i),u=a,s=o)}return U.some($s(u,s))}return U.none()},Xl=function(e,t){var n,r,o,i,a,u,s,c,l,f,d,m,p,g,h=e.dom;if(t){if(g=t,kt.isArray(g.start))return m=t,p=(d=h).createRng(),$l(d,!0,m,p)&&$l(d,!1,m,p)?U.some(p):U.none();if("string"==typeof t.start)return U.some((c=t,l=(s=h).createRng(),f=nc(s.getRoot(),c.start),l.setStart(f.container(),f.offset()),f=nc(s.getRoot(),c.end),l.setEnd(f.container(),f.offset()),l));if(t.hasOwnProperty("id"))return a=Kl(o=h,"start",i=t),u=Kl(o,"end",i),ds(a,u.or(a),function(e,t){var n=o.createRng();return n.setStart(Vl(o,e.container()),e.offset()),n.setEnd(Vl(o,t.container()),t.offset()),n});if(t.hasOwnProperty("name"))return n=h,r=t,U.from(n.select(r.name)[r.index]).map(function(e){var t=n.createRng();return t.selectNode(e),t});if(t.hasOwnProperty("rng"))return U.some(t.rng)}return U.none()},Yl=dc,Gl=function(t,e){Xl(t,e).each(function(e){t.setRng(e)})},Jl=function(e){return An(e)&&"SPAN"===e.tagName&&"bookmark"===e.getAttribute("data-mce-type")},Ql=(hl=lo,function(e){return hl===e}),Zl=function(e){return""!==e&&-1!==" \f\n\r\t\x0B".indexOf(e)},ef=function(e){return!Zl(e)&&!Ql(e)},tf=function(e){return!!e.nodeType},nf=function(e,t,n){var r,o,i,a,u=n.startOffset,s=n.startContainer;if((n.startContainer!==n.endContainer||!(a=n.startContainer.childNodes[n.startOffset])||!/^(IMG)$/.test(a.nodeName))&&1===s.nodeType)for(u<(i=s.childNodes).length?(s=i[u],r=new Xr(s,e.getParent(s,e.isBlock))):(s=i[i.length-1],(r=new Xr(s,e.getParent(s,e.isBlock))).next(!0)),o=r.current();o;o=r.next())if(3===o.nodeType&&!uf(o))return n.setStart(o,0),void t.setRng(n)},rf=function(e,t,n){if(e){var r=t?"nextSibling":"previousSibling";for(e=n?e:e[r];e;e=e[r])if(1===e.nodeType||!uf(e))return e}},of=function(e,t){return tf(t)&&(t=t.nodeName),!!e.schema.getTextBlockElements()[t.toLowerCase()]},af=function(e,t,n){return e.schema.isValidChild(t,n)},uf=function(e,t){if(void 0===t&&(t=!1),D(e)&&In(e)){var n=t?e.data.replace(/ /g,"\xa0"):e.data;return Uo(n)}return!1},sf=function(e,n){return"string"!=typeof e?e=e(n):n&&(e=e.replace(/%(\w+)/g,function(e,t){return n[t]||e})),e},cf=function(e,t){return e=""+((e=e||"").nodeName||e),t=""+((t=t||"").nodeName||t),e.toLowerCase()===t.toLowerCase()},lf=function(e,t,n){return"color"!==n&&"backgroundColor"!==n||(t=e.toHex(t)),"fontWeight"===n&&700===t&&(t="bold"),"fontFamily"===n&&(t=t.replace(/[\'\"]/g,"").replace(/,\s+/g,",")),""+t},ff=function(e,t,n){return lf(e,e.getStyle(t,n),n)},df=function(t,e){var n;return t.getParent(e,function(e){return(n=t.getStyle(e,"text-decoration"))&&"none"!==n}),n},mf=function(e,t,n){return e.getParents(t,n,e.getRoot())},pf=function(t,e,n){var r=["inline","block","selector","attributes","styles","classes"],a=function(e){return me(e,function(e,t){return F(r,function(e){return e===t})})};return F(t.formatter.get(e),function(e){var i=a(e);return F(t.formatter.get(n),function(e){var t,n,r,o=a(e);return t=i,n=o,void 0===r&&(r=l),u(r).eq(t,n)})})},gf=function(e){return ve(e,"block")},hf=function(e){return ve(e,"selector")},vf=function(e){return ve(e,"inline")},yf=Jl,bf=mf,Cf=uf,wf=of,xf=function(e,t){for(var n=t;n;){if(An(n)&&e.getContentEditable(n))return"false"===e.getContentEditable(n)?n:t;n=n.parentNode}return t},Sf=function(e,t,n,r){for(var o=t.data,i=n;e?0<=i:i<o.length;e?i--:i++)if(r(o.charAt(i)))return e?i+1:i;return-1},Nf=function(e,t,n){return Sf(e,t,n,function(e){return Ql(e)||Zl(e)})},Ef=function(e,t,n){return Sf(e,t,n,ef)},kf=function(i,e,t,n,a,r){var u,s=i.getParent(t,i.isBlock)||e,o=function(e,t,n){var r=fs(i),o=a?r.backwards:r.forwards;return U.from(o(e,t,function(e,t){return yf(e.parentNode)?-1:n(a,u=e,t)},s))};return o(t,n,Nf).bind(function(e){return r?o(e.container,e.offset+(a?-1:0),Ef):U.some(e)}).orThunk(function(){return u?U.some({container:u,offset:a?0:u.length}):U.none()})},_f=function(e,t,n,r,o){In(r)&&0===r.nodeValue.length&&r[o]&&(r=r[o]);for(var i=bf(e,r),a=0;a<i.length;a++)for(var u=0;u<t.length;u++){var s=t[u];if(!("collapsed"in s&&s.collapsed!==n.collapsed)&&e.is(i[a],s.selector))return i[a]}return r},Af=function(t,e,n,r){var o,i,a=t.dom,u=a.getRoot();if(e[0].wrapper||(i=a.getParent(n,e[0].block,u)),i||(o=a.getParent(n,"LI,TD,TH"),i=a.getParent(In(n)?n.parentNode:n,function(e){return e!==u&&wf(t,e)},o)),i&&e[0].wrapper&&(i=bf(a,i,"ul,ol").reverse()[0]||i),!i)for(i=n;i[r]&&!a.isBlock(i[r])&&(i=i[r],!cf(i,"br")););return i||n},Rf=function(e,t,n,r){var o=n.parentNode;return!D(n[r])&&(!(o!==t&&!$(o)&&!e.isBlock(o))||Rf(e,t,o,r))},Tf=function(e,t,n,r,o){var i,a,u=n,s=o?"previousSibling":"nextSibling",c=e.getRoot();if(In(n)&&!Cf(n)&&(o?0<r:r<n.data.length))return n;for(;;){if(!t[0].block_expand&&e.isBlock(u))return u;for(i=u[s];i;i=i[s]){var l=In(i)&&!Rf(e,c,i,s);if(!yf(i)&&(!zn(a=i)||!a.getAttribute("data-mce-bogus")||a.nextSibling)&&!Cf(i,l))return u}if(u===c||u.parentNode===c){n=u;break}u=u.parentNode}return n},Df=function(e){return yf(e.parentNode)||yf(e)},Of=function(e,t,n,r){void 0===r&&(r=!1);var o=t.startContainer,i=t.startOffset,a=t.endContainer,u=t.endOffset,s=e.dom;return An(o)&&o.hasChildNodes()&&(o=ws(o,i),In(o)&&(i=0)),An(a)&&a.hasChildNodes()&&(a=ws(a,t.collapsed?u:u-1),In(a)&&(u=a.nodeValue.length)),o=xf(s,o),a=xf(s,a),Df(o)&&(o=yf(o)?o:o.parentNode,o=t.collapsed?o.previousSibling||o:o.nextSibling||o,In(o)&&(i=t.collapsed?o.length:0)),Df(a)&&(a=yf(a)?a:a.parentNode,a=t.collapsed?a.nextSibling||a:a.previousSibling||a,In(a)&&(u=t.collapsed?0:a.length)),t.collapsed&&(kf(s,e.getBody(),o,i,!0,r).each(function(e){var t=e.container,n=e.offset;o=t,i=n}),kf(s,e.getBody(),a,u,!1,r).each(function(e){var t=e.container,n=e.offset;a=t,u=n})),(n[0].inline||n[0].block_expand)&&(n[0].inline&&In(o)&&0!==i||(o=Tf(s,n,o,i,!0)),n[0].inline&&In(a)&&u!==a.nodeValue.length||(a=Tf(s,n,a,u,!1))),n[0].selector&&!1!==n[0].expand&&!n[0].inline&&(o=_f(s,n,t,o,"previousSibling"),a=_f(s,n,t,a,"nextSibling")),(n[0].block||n[0].selector)&&(o=Af(e,n,o,"previousSibling"),a=Af(e,n,a,"nextSibling"),n[0].block&&(s.isBlock(o)||(o=Tf(s,n,o,i,!0)),s.isBlock(a)||(a=Tf(s,n,a,u,!1)))),An(o)&&(i=s.nodeIndex(o),o=o.parentNode),An(a)&&(u=s.nodeIndex(a)+1,a=a.parentNode),{startContainer:o,startOffset:i,endContainer:a,endOffset:u}},Bf=function(e,t){var n=e.childNodes;return t>=n.length?t=n.length-1:t<0&&(t=0),n[t]||e},Pf=function(e,t,u){var n=t.startContainer,r=t.startOffset,o=t.endContainer,i=t.endOffset,s=function(e){var t=e[0];return 3===t.nodeType&&t===n&&r>=t.nodeValue.length&&e.splice(0,1),t=e[e.length-1],0===i&&0<e.length&&t===o&&3===t.nodeType&&e.splice(e.length-1,1),e},c=function(e,t,n){for(var r=[];e&&e!==n;e=e[t])r.push(e);return r},a=function(e,t){do{if(e.parentNode===t)return e;e=e.parentNode}while(e)},l=function(e,t,n){for(var r=n?"nextSibling":"previousSibling",o=e,i=o.parentNode;o&&o!==t;o=i){i=o.parentNode;var a=c(o===e?o:o[r],r);a.length&&(n||a.reverse(),u(s(a)))}};if(1===n.nodeType&&n.hasChildNodes()&&(n=Bf(n,r)),1===o.nodeType&&o.hasChildNodes()&&(o=Bf(o,i-1)),n===o)return u(s([n]));for(var f=e.findCommonAncestor(n,o),d=n;d;d=d.parentNode){if(d===o)return l(n,f,!0);if(d===f)break}for(d=o;d;d=d.parentNode){if(d===n)return l(o,f);if(d===f)break}var m=a(n,f)||n,p=a(o,f)||o;l(n,m,!0);var g=c(m===n?m:m.nextSibling,"nextSibling",p===o?p.nextSibling:p);g.length&&u(s(g)),l(o,p)},Lf=function(e){var t=[];if(e)for(var n=0;n<e.rangeCount;n++)t.push(e.getRangeAt(n));return t},If=function(e){return H(J(e,function(e){var t=Cs(e);return t?[At.fromDom(t)]:[]}),uo)},Mf=function(e,t){var n=Gu(t,"td[data-mce-selected],th[data-mce-selected]");return 0<n.length?n:If(e)},Ff=function(e){return Mf(Lf(e.selection.getSel()),At.fromDom(e.getBody()))},Uf=function(t){return Qt(t).fold(E([t]),function(e){return[t].concat(Uf(e))})},zf=function(t){return Zt(t).fold(E([t]),function(e){return"br"===Lt(e)?Wt(e).map(function(e){return[t].concat(zf(e))}).getOr([]):[t].concat(zf(e))})},jf=function(o,e){return ds((a=(i=e).startContainer,u=i.startOffset,In(a)?0===u?U.some(At.fromDom(a)):U.none():U.from(a.childNodes[u]).map(At.fromDom)),(n=(t=e).endContainer,r=t.endOffset,In(n)?r===n.data.length?U.some(At.fromDom(n)):U.none():U.from(n.childNodes[r-1]).map(At.fromDom)),function(e,t){var n=Y(Uf(o),N(Ot,e)),r=Y(zf(o),N(Ot,t));return n.isSome()&&r.isSome()}).getOr(!1);var t,n,r,i,a,u},Hf=function(e,t,n,r){var o=n,i=new Xr(n,o),a=me(e.schema.getMoveCaretBeforeOnEnterElements(),function(e,t){return!M(["td","th","table"],t.toLowerCase())});do{if(In(n)&&0!==kt.trim(n.nodeValue).length)return void(r?t.setStart(n,0):t.setEnd(n,n.nodeValue.length));if(a[n.nodeName])return void(r?t.setStartBefore(n):"BR"===n.nodeName?t.setEndBefore(n):t.setEndAfter(n))}while(n=r?i.next():i.prev());"BODY"===o.nodeName&&(r?t.setStart(o,0):t.setEnd(o,o.childNodes.length))},Vf=function(e){var t=e.selection.getSel();return t&&0<t.rangeCount},qf=function(r,o){var e=Ff(r);0<e.length?W(e,function(e){var t=e.dom,n=r.dom.createRng();n.setStartBefore(t),n.setEndAfter(t),o(n,!0)}):o(r.selection.getRng(),!1)},$f=function(e,t,n){var r=fc(e,t);n(r),e.moveToBookmark(r)};var Wf,Kf,Xf,Yf=(Wf=Ut,Kf="text",{get:function(e){if(!Wf(e))throw new Error("Can only get "+Kf+" value of a "+Kf+" node");return Xf(e).getOr("")},getOption:Xf=function(e){return Wf(e)?U.from(e.dom.nodeValue):U.none()},set:function(e,t){if(!Wf(e))throw new Error("Can only set raw "+Kf+" value of a "+Kf+" node");e.dom.nodeValue=t}}),Gf=function(e){return Yf.get(e)},Jf=function(r,o,i,a){return $t(o).fold(function(){return"skipping"},function(e){return"br"===a||Ut(n=o)&&Gf(n)===fo?"valid":Ft(t=o)&&Xu(t,Ju())?"existing":jl(o.dom)?"caret":af(r,i,a)&&af(r,Lt(e),i)?"valid":"invalid-child";var t,n})},Qf=function(e,t,n,r){var o=t.uid,i=void 0===o?is("mce-annotation"):o,a=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n}(t,["uid"]),u=At.fromTag("span",e);Wu(u,Ju()),Xn(u,""+Zu(),i),Xn(u,""+Qu(),n);var s,c=r(i,a),l=c.attributes,f=void 0===l?{}:l,d=c.classes,m=void 0===d?[]:d;return Yn(u,f),s=u,W(m,function(e){Wu(s,e)}),u},Zf=function(i,e,t,n,r){var a=[],u=Qf(i.getDoc(),r,t,n),s=Ou(U.none()),c=function(){s.set(U.none())},l=function(e){W(e,o)},o=function(e){var t,n;switch(Jf(i,e,"span",Lt(e))){case"invalid-child":c();var r=Gt(e);l(r),c();break;case"valid":var o=s.get().getOrThunk(function(){var e=ss(u);return a.push(e),s.set(U.some(e)),e});sn(t=e,n=o),fn(n,t)}};return Pf(i.dom,e,function(e){var t;c(),t=z(e,At.fromDom),l(t)}),a},ed=function(u,s,c,l){u.undoManager.transact(function(){var e,t,n,r,o=u.selection,i=o.getRng(),a=0<Ff(u).length;i.collapsed&&!a&&(n=Of(e=u,t=i,[{inline:!0}]),t.setStart(n.startContainer,n.startOffset),t.setEnd(n.endContainer,n.endOffset),e.selection.setRng(t)),o.getRng().collapsed&&!a?(r=Qf(u.getDoc(),l,s,c.decorate),as(r,lo),o.getRng().insertNode(r.dom),o.select(r.dom)):$f(o,!1,function(){qf(u,function(e){Zf(u,e,s,c.decorate,l)})})})},td=function(u){var n,r=(n={},{register:function(e,t){n[e]={name:e,settings:t}},lookup:function(e){return n.hasOwnProperty(e)?U.from(n[e]).map(function(e){return e.settings}):U.none()}});rs(u,r);var o=ns(u);return{register:function(e,t){r.register(e,t)},annotate:function(t,n){r.lookup(t).each(function(e){ed(u,t,e,n)})},annotationChanged:function(e,t){o.addListener(e,t)},remove:function(e){es(u,U.some(e)).each(function(e){var t=e.elements;W(t,gn)})},getAll:function(e){var t,n,r,o,i,a=(t=u,n=e,r=At.fromDom(t.getBody()),o=Gu(r,"["+Qu()+'="'+n+'"]'),i={},W(o,function(e){var t=Gn(e,Zu()),n=i.hasOwnProperty(t)?i[t]:[];i[t]=n.concat([e])}),i);return se(a,function(e){return z(e,function(e){return e.dom})})}}};function nd(e){return{getBookmark:N(Yl,e),moveToBookmark:N(Gl,e)}}(nd=nd||{}).isBookmarkNode=Jl;var rd,od=nd,id=function(e,t){for(;t&&t!==e;){if(Hn(t)||Vn(t))return t;t=t.parentNode}return null},ad=function(t,n,e){if(e.collapsed)return!1;if(wt.browser.isIE()&&e.startOffset===e.endOffset-1&&e.startContainer===e.endContainer){var r=e.startContainer.childNodes[e.startOffset];if(An(r))return F(r.getClientRects(),function(e){return bs(e,t,n)})}return F(e.getClientRects(),function(e){return bs(e,t,n)})},ud={BACKSPACE:8,DELETE:46,DOWN:40,ENTER:13,LEFT:37,RIGHT:39,SPACEBAR:32,TAB:9,UP:38,END:35,HOME:36,modifierPressed:function(e){return e.shiftKey||e.ctrlKey||e.altKey||this.metaKeyPressed(e)},metaKeyPressed:function(e){return wt.mac?e.metaKey:e.ctrlKey&&!e.altKey}},sd=Vn,cd=function(r,l){var f,d,m,p,g,h,v,y,b,C,w,x,S,N,E=l.dom,s=kt.each,c=l.getDoc(),k=document,_=Math.abs,A=Math.round,R=l.getBody(),T={nw:[0,0,-1,-1],ne:[1,0,1,-1],se:[1,1,1,1],sw:[0,1,-1,1]},D=function(e){return e&&("IMG"===e.nodeName||l.dom.is(e,"figure.image"))},n=function(e){var t=e.target;!function(e,t){if("longpress"!==e.type&&0!==e.type.indexOf("touch"))return D(e.target)&&!ad(e.clientX,e.clientY,t);var n=e.touches[0];return D(e.target)&&!ad(n.clientX,n.clientY,t)}(e,l.selection.getRng())||e.isDefaultPrevented()||l.selection.select(t)},O=function(e){return l.dom.is(e,"figure.image")?e.querySelector("img"):e},B=function(e){var t=Nc(l);return!!t&&("false"!==e.getAttribute("data-mce-resize")&&(e!==l.getBody()&&Tt(At.fromDom(e),t)))},P=function(e,t,n){E.setStyles(O(e),{width:t,height:n})},L=function(e){var t,n,r,o,i,a,u,s=e.screenX-g,c=e.screenY-h;w=s*p[2]+v,x=c*p[3]+y,w=w<5?5:w,x=x<5?5:x,(D(f)&&!1!==l.getParam("resize_img_proportional",!0,"boolean")?!ud.modifierPressed(e):ud.modifierPressed(e))&&(_(s)>_(c)?(x=A(w*b),w=A(x/b)):(w=A(x/b),x=A(w*b))),P(d,w,x),t=0<(t=p.startPos.x+s)?t:0,n=0<(n=p.startPos.y+c)?n:0,E.setStyles(m,{left:t,top:n,display:"block"}),m.innerHTML=w+" &times; "+x,p[2]<0&&d.clientWidth<=w&&E.setStyle(d,"left",void 0+(v-w)),p[3]<0&&d.clientHeight<=x&&E.setStyle(d,"top",void 0+(y-x)),(s=R.scrollWidth-S)+(c=R.scrollHeight-N)!==0&&E.setStyles(m,{left:t-s,top:n-c}),C||(r=l,o=f,i=v,a=y,u="corner-"+p.name,r.fire("ObjectResizeStart",{target:o,width:i,height:a,origin:u}),C=!0)},I=function(){var e=C;C=!1;var t,n,r,o,i,a=function(e,t){t&&(f.style[e]||!l.schema.isValid(f.nodeName.toLowerCase(),e)?E.setStyle(O(f),e,t):E.setAttrib(O(f),e,""+t))};e&&(a("width",w),a("height",x)),E.unbind(c,"mousemove",L),E.unbind(c,"mouseup",I),k!==c&&(E.unbind(k,"mousemove",L),E.unbind(k,"mouseup",I)),E.remove(d),E.remove(m),u(f),e&&(t=l,n=f,r=w,o=x,i="corner-"+p.name,t.fire("ObjectResized",{target:n,width:r,height:o,origin:i}),E.setAttrib(f,"style",E.getAttrib(f,"style"))),l.nodeChanged()},u=function(e){M(),F();var t=E.getPos(e,R),o=t.x,i=t.y,n=e.getBoundingClientRect(),a=n.width||n.right-n.left,u=n.height||n.bottom-n.top;f!==e&&(f=e,w=x=0);var r=l.fire("ObjectSelected",{target:e});B(e)&&!r.isDefaultPrevented()?s(T,function(n,r){var e=E.get("mceResizeHandle"+r);e&&E.remove(e),e=E.add(R,"div",{id:"mceResizeHandle"+r,"data-mce-bogus":"all","class":"mce-resizehandle",unselectable:!0,style:"cursor:"+r+"-resize; margin:0; padding:0"}),11===wt.ie&&(e.contentEditable=!1),E.bind(e,"mousedown",function(e){var t;e.stopImmediatePropagation(),e.preventDefault(),g=(t=e).screenX,h=t.screenY,v=O(f).clientWidth,y=O(f).clientHeight,b=y/v,(p=n).name=r,p.startPos={x:a*n[0]+o,y:u*n[1]+i},S=R.scrollWidth,N=R.scrollHeight,d=f.cloneNode(!0),E.addClass(d,"mce-clonedresizable"),E.setAttrib(d,"data-mce-bogus","all"),d.contentEditable=!1,d.unSelectabe=!0,E.setStyles(d,{left:o,top:i,margin:0}),P(d,a,u),d.removeAttribute("data-mce-selected"),R.appendChild(d),E.bind(c,"mousemove",L),E.bind(c,"mouseup",I),k!==c&&(E.bind(k,"mousemove",L),E.bind(k,"mouseup",I)),m=E.add(R,"div",{"class":"mce-resize-helper","data-mce-bogus":"all"},v+" &times; "+y)}),n.elm=e,E.setStyles(e,{left:a*n[0]+o-e.offsetWidth/2,top:u*n[1]+i-e.offsetHeight/2})}):M(),f.setAttribute("data-mce-selected","1")},M=function(){F(),f&&f.removeAttribute("data-mce-selected"),ue(T,function(e,t){var n=E.get("mceResizeHandle"+t);n&&(E.unbind(n),E.remove(n))})},o=function(e){var t,n=function(e,t){if(e)do{if(e===t)return!0}while(e=e.parentNode)};C||l.removed||(s(E.select("img[data-mce-selected],hr[data-mce-selected]"),function(e){e.removeAttribute("data-mce-selected")}),t="mousedown"===e.type?e.target:r.getNode(),n(t=E.$(t).closest("table,img,figure.image,hr")[0],R)&&(a(),n(r.getStart(!0),t)&&n(r.getEnd(!0),t))?u(t):M())},i=function(e){return sd(id(l.getBody(),e))},F=function(){ue(T,function(e){e.elm&&(E.unbind(e.elm),delete e.elm)})},a=function(){try{l.getDoc().execCommand("enableObjectResizing",!1,"false")}catch(e){}};l.on("init",function(){var e;a(),(wt.browser.isIE()||wt.browser.isEdge())&&(l.on("mousedown click",function(e){var t=e.target,n=t.nodeName;C||!/^(TABLE|IMG|HR)$/.test(n)||i(t)||(2!==e.button&&l.selection.select(t,"TABLE"===n),"mousedown"===e.type&&l.nodeChanged())}),e=function(e){var t=function(e){qr.setEditorTimeout(l,function(){return l.selection.select(e)})};if(i(e.target)||$n(e.target))return e.preventDefault(),void t(e.target);/^(TABLE|IMG|HR)$/.test(e.target.nodeName)&&(e.preventDefault(),"IMG"===e.target.tagName&&t(e.target))},E.bind(R,"mscontrolselect",e),l.on("remove",function(){return E.unbind(R,"mscontrolselect",e)}));var t=qr.throttle(function(e){l.composing||o(e)});l.on("nodechange ResizeEditor ResizeWindow ResizeContent drop FullscreenStateChanged",t),l.on("keyup compositionend",function(e){f&&"TABLE"===f.nodeName&&t(e)}),l.on("hide blur",M),l.on("contextmenu longpress",n,!0)}),l.on("remove",F);return{isResizable:B,showResizeRect:u,hideResizeRect:M,updateResizeRect:o,destroy:function(){f=d=null}}},ld=function(e){return Hn(e)||Vn(e)},fd=function(e,t,n){var r,o,i,a,u,s=n;if(s.caretPositionFromPoint)(o=s.caretPositionFromPoint(e,t))&&((r=n.createRange()).setStart(o.offsetNode,o.offset),r.collapse(!0));else if(n.caretRangeFromPoint)r=n.caretRangeFromPoint(e,t);else if(s.body.createTextRange){r=s.body.createTextRange();try{r.moveToPoint(e,t),r.collapse(!0)}catch(c){r=function(e,n,t){var r,o=t.elementFromPoint(e,n),i=t.body.createTextRange();if(o&&"HTML"!==o.tagName||(o=t.body),i.moveToElementText(o),0<(r=(r=kt.toArray(i.getClientRects())).sort(function(e,t){return(e=Math.abs(Math.max(e.top-n,e.bottom-n)))-(t=Math.abs(Math.max(t.top-n,t.bottom-n)))})).length){n=(r[0].bottom+r[0].top)/2;try{return i.moveToPoint(e,n),i.collapse(!0),i}catch(a){}}return null}(e,t,n)}return i=r,a=n.body,u=i&&i.parentElement?i.parentElement():null,Vn(function(e,t,n){for(;e&&e!==t;){if(n(e))return e;e=e.parentNode}return null}(u,a,ld))?null:i}return r},dd=function(e,t){return e&&t&&e.startContainer===t.startContainer&&e.startOffset===t.startOffset&&e.endContainer===t.endContainer&&e.endOffset===t.endOffset},md=function(e,t,n){return null!==function(e,t,n){for(;e&&e!==t;){if(n(e))return e;e=e.parentNode}return null}(e,t,n)},pd=function(e){return e&&"TABLE"===e.nodeName},gd=function(e,t,n){for(var r=new Xr(t,e.getParent(t.parentNode,e.isBlock)||e.getRoot());t=r[n?"prev":"next"]();)if(zn(t))return!0},hd=function(e,t,n,r,o){var i,a,u=e.getRoot(),s=e.schema.getNonEmptyElements(),c=e.getParent(o.parentNode,e.isBlock)||u;if(r&&zn(o)&&t&&e.isEmpty(c))return U.some(Hs(o.parentNode,e.nodeIndex(o)));for(var l,f,d=new Xr(o,c);a=d[r?"prev":"next"]();){if("false"===e.getContentEditableParent(a)||(f=u,bo(l=a)&&!1===md(l,f,jl)))return U.none();if(In(a)&&0<a.nodeValue.length)return!1===function(e,t,n){return md(e,t,function(e){return e.nodeName===n})}(a,u,"A")?U.some(Hs(a,r?a.nodeValue.length:0)):U.none();if(e.isBlock(a)||s[a.nodeName.toLowerCase()])return U.none();i=a}return n&&i?U.some(Hs(i,0)):U.none()},vd=function(e,t,n,r){var o,i,a,u,s=e.getRoot(),c=!1,l=r[(n?"start":"end")+"Container"],f=r[(n?"start":"end")+"Offset"],d=An(l)&&f===l.childNodes.length,m=e.schema.getNonEmptyElements(),p=n;if(bo(l))return U.none();if(An(l)&&f>l.childNodes.length-1&&(p=!1),Fn(l)&&(l=s,f=0),l===s){if(p&&(o=l.childNodes[0<f?f-1:0])){if(bo(o))return U.none();if(m[o.nodeName]||pd(o))return U.none()}if(l.hasChildNodes()){if(f=Math.min(!p&&0<f?f-1:f,l.childNodes.length-1),l=l.childNodes[f],f=In(l)&&d?l.data.length:0,!t&&l===s.lastChild&&pd(l))return U.none();if(function(e,t){for(;t&&t!==e;){if(Vn(t))return!0;t=t.parentNode}return!1}(s,l)||bo(l))return U.none();if(l.hasChildNodes()&&!1===pd(l)){var g=new Xr(o=l,s);do{if(Vn(o)||bo(o)){c=!1;break}if(In(o)&&0<o.nodeValue.length){f=p?0:o.nodeValue.length,l=o,c=!0;break}if(m[o.nodeName.toLowerCase()]&&(!(i=o)||!/^(TD|TH|CAPTION)$/.test(i.nodeName))){f=e.nodeIndex(o),l=o.parentNode,p||f++,c=!0;break}}while(o=p?g.next():g.prev())}}}return t&&(In(l)&&0===f&&hd(e,d,t,!0,l).each(function(e){l=e.container(),f=e.offset(),c=!0}),An(l)&&(!(o=(o=l.childNodes[f])||l.childNodes[f-1])||!zn(o)||(u="A",(a=o).previousSibling&&a.previousSibling.nodeName===u)||gd(e,o,!1)||gd(e,o,!0)||hd(e,d,t,!0,o).each(function(e){l=e.container(),f=e.offset(),c=!0}))),p&&!t&&In(l)&&f===l.nodeValue.length&&hd(e,d,t,!1,l).each(function(e){l=e.container(),f=e.offset(),c=!0}),c?U.some(Hs(l,f)):U.none()},yd=function(e,t){var n=t.collapsed,r=t.cloneRange(),o=Hs.fromRangeStart(t);return vd(e,n,!0,r).each(function(e){n&&Hs.isAbove(o,e)||r.setStart(e.container(),e.offset())}),n||vd(e,n,!1,r).each(function(e){r.setEnd(e.container(),e.offset())}),n&&r.collapse(!0),dd(t,r)?U.none():U.some(r)},bd=function(e,t){return e.splitText(t)},Cd=function(e){var t=e.startContainer,n=e.startOffset,r=e.endContainer,o=e.endOffset;return t===r&&In(t)?0<n&&n<t.nodeValue.length&&(t=(r=bd(t,n)).previousSibling,n<o?(t=r=bd(r,o-=n).previousSibling,o=r.nodeValue.length,n=0):o=0):(In(t)&&0<n&&n<t.nodeValue.length&&(t=bd(t,n),n=0),In(r)&&0<o&&o<r.nodeValue.length&&(o=(r=bd(r,o).previousSibling).nodeValue.length)),{startContainer:t,startOffset:n,endContainer:r,endOffset:o}};function wd(n){return{walk:function(e,t){return Pf(n,e,t)},split:Cd,normalize:function(t){return yd(n,t).fold(C,function(e){return t.setStart(e.startContainer,e.startOffset),t.setEnd(e.endContainer,e.endOffset),!0})}}}(rd=wd=wd||{}).compareRanges=dd,rd.getCaretRangeFromPoint=fd,rd.getSelectedNode=Cs,rd.getNode=ws;var xd=wd;var Sd,Nd,Ed,kd,_d,Ad=(Sd="height",Nd=function(e){var t=e.dom;return hn(e)?t.getBoundingClientRect().height:t.offsetHeight},{set:function(e,t){if(!O(t)&&!t.match(/^[0-9]+$/))throw new Error(Sd+".set accepts only positive integer values. Value was "+t);var n=e.dom;Wn(n)&&(n.style[Sd]=t+"px")},get:Ed=function(e){var t=Nd(e);if(t<=0||null===t){var n=er(e,Sd);return parseFloat(n)||0}return t},getOuter:Ed,aggregate:kd=function(o,e){return X(e,function(e,t){var n=er(o,t),r=n===undefined?0:parseInt(n,10);return isNaN(r)?e:e+r},0)},max:function(e,t,n){var r=kd(e,n);return r<t?t-r:0}}),Rd=function(r,e){return r.view(e).fold(E([]),function(e){var t=r.owner(e),n=Rd(r,t);return[e].concat(n)})},Td=/* */Object.freeze({__proto__:null,view:function(e){var t;return(e.dom===document?U.none():U.from(null===(t=e.dom.defaultView)||void 0===t?void 0:t.frameElement)).map(At.fromDom)},owner:Vt}),Dd=function(e){var t,n,r,o=At.fromDom(document),i=wn(o),a=(t=e,r=(n=Td).owner(t),Rd(n,r)),u=Cn(e),s=K(a,function(e,t){var n=Cn(t);return{left:e.left+n.left,top:e.top+n.top}},{left:0,top:0});return yn(s.left+u.left+i.left,s.top+u.top+i.top)},Od=function(e){return"textarea"===Lt(e)},Bd=function(e,t){var n,r=function(e){var t=e.dom.ownerDocument,n=t.body,r=t.defaultView,o=t.documentElement;if(n===e.dom)return yn(n.offsetLeft,n.offsetTop);var i=bn(null==r?void 0:r.pageYOffset,o.scrollTop),a=bn(null==r?void 0:r.pageXOffset,o.scrollLeft),u=bn(o.clientTop,n.clientTop),s=bn(o.clientLeft,n.clientLeft);return Cn(e).translate(a-s,i-u)}(e),o=(n=e,Ad.get(n));return{element:e,bottom:r.top+o,height:o,pos:r,cleanup:t}},Pd=function(e,t){var n=function(e,t){var n=Gt(e);if(0===n.length||Od(e))return{element:e,offset:t};if(t<n.length&&!Od(n[t]))return{element:n[t],offset:0};var r=n[n.length-1];return Od(r)?{element:e,offset:t}:"img"===Lt(r)?{element:r,offset:1}:Ut(r)?{element:r,offset:Gf(r).length}:{element:r,offset:Gt(r).length}}(e,t),r=At.fromHtml('<span data-mce-bogus="all">\ufeff</span>');return sn(n.element,r),Bd(r,function(){return pn(r)})},Ld=function(n,r,o,i){Ud(n,function(e,t){return Md(n,r,o,i)},o)},Id=function(e,t,n,r,o){var i,a,u={elm:r.element.dom,alignToTop:o};i=u,e.fire("ScrollIntoView",i).isDefaultPrevented()||(n(t,wn(t).top,r,o),a=u,e.fire("AfterScrollIntoView",a))},Md=function(e,t,n,r){var o=At.fromDom(e.getBody()),i=At.fromDom(e.getDoc());o.dom.offsetWidth;var a=Pd(At.fromDom(n.startContainer),n.startOffset);Id(e,i,t,a,r),a.cleanup()},Fd=function(e,t,n,r){var o,i=At.fromDom(e.getDoc());Id(e,i,n,(o=t,Bd(At.fromDom(o),V)),r)},Ud=function(e,t,n){var r=n.startContainer,o=n.startOffset,i=n.endContainer,a=n.endOffset;t(At.fromDom(r),At.fromDom(i));var u=e.dom.createRng();u.setStart(r,o),u.setEnd(i,a),e.selection.setRng(n)},zd=function(e,t,n,r){var o,i=e.pos;n?xn(i.left,i.top,r):(o=i.top-t+e.height,xn(i.left,o,r))},jd=function(e,t,n,r,o){var i=n+t,a=r.pos.top,u=r.bottom,s=n<=u-a;a<t?zd(r,n,!1!==o,e):i<a?zd(r,n,s?!1!==o:!0===o,e):i<u&&!s&&zd(r,n,!0===o,e)},Hd=function(e,t,n,r){var o=e.dom.defaultView.innerHeight;jd(e,t,o,n,r)},Vd=function(e,t,n,r){var o=e.dom.defaultView.innerHeight;jd(e,t,o,n,r);var i=Dd(n.element),a=En(window);i.top<a.y?Sn(n.element,!1!==r):i.top>a.bottom&&Sn(n.element,!0===r)},qd=function(e,t,n){return Ld(e,Hd,t,n)},$d=function(e,t,n){return Fd(e,t,Hd,n)},Wd=function(e,t,n){return Ld(e,Vd,t,n)},Kd=function(e,t,n){return Fd(e,t,Vd,n)},Xd=function(e,t,n){(e.inline?qd:Wd)(e,t,n)},Yd=function(e){var t=rn(e).dom;return e.dom===t.activeElement},Gd=function(e){return void 0===e&&(e=At.fromDom(document)),U.from(e.dom.activeElement).map(At.fromDom)},Jd=function(e,t,n,r){return{start:e,soffset:t,finish:n,foffset:r}},Qd=Cr([{before:["element"]},{on:["element","offset"]},{after:["element"]}]),Zd=(Qd.before,Qd.on,Qd.after,function(e){return e.fold(o,o,o)}),em=Cr([{domRange:["rng"]},{relative:["startSitu","finishSitu"]},{exact:["start","soffset","finish","foffset"]}]),tm={domRange:em.domRange,relative:em.relative,exact:em.exact,exactFromRange:function(e){return em.exact(e.start,e.soffset,e.finish,e.foffset)},getWin:function(e){var t=e.match({domRange:function(e){return At.fromDom(e.startContainer)},relative:function(e,t){return Zd(e)},exact:function(e,t,n,r){return e}});return qt(t)},range:Jd},nm=dt().browser,rm=function(e,t){var n=Ut(t)?Gf(t).length:Gt(t).length+1;return n<e?n:e<0?0:e},om=function(e){return tm.range(e.start,rm(e.soffset,e.start),e.finish,rm(e.foffset,e.finish))},im=function(e,t){return!_n(t.dom)&&(Pt(e,t)||Ot(e,t))},am=function(t){return function(e){return im(t,e.start)&&im(t,e.finish)}},um=function(e){return!0===e.inline||nm.isIE()},sm=function(e){return tm.range(At.fromDom(e.startContainer),e.startOffset,At.fromDom(e.endContainer),e.endOffset)},cm=function(e){var t,n,r=qt(e);return t=r.dom,((n=t.getSelection())&&0!==n.rangeCount?U.from(n.getRangeAt(0)):U.none()).map(sm).filter(am(e))},lm=function(e){var t=document.createRange();try{return t.setStart(e.start.dom,e.soffset),t.setEnd(e.finish.dom,e.foffset),U.some(t)}catch(n){return U.none()}},fm=function(e){var t=um(e)?cm(At.fromDom(e.getBody())):U.none();e.bookmark=t.isSome()?t:e.bookmark},dm=function(r){return(r.bookmark?r.bookmark:U.none()).bind(function(e){return t=At.fromDom(r.getBody()),n=e,U.from(n).filter(am(t)).map(om);var t,n}).bind(lm)},mm={isEditorUIElement:function(e){var t=e.className.toString();return-1!==t.indexOf("tox-")||-1!==t.indexOf("mce-")}},pm=function(n,e){var t,r;dt().browser.isIE()?(r=n).on("focusout",function(){fm(r)}):(t=e,n.on("mouseup touchend",function(e){t.throttle()})),n.on("keyup NodeChange",function(e){var t;"nodechange"===(t=e).type&&t.selectionChange||fm(n)})},gm=function(r){var o=zu(function(){fm(r)},0);r.on("init",function(){var e,t,n;r.inline&&(e=r,t=o,n=function(){t.throttle()},Eu.DOM.bind(document,"mouseup",n),e.on("remove",function(){Eu.DOM.unbind(document,"mouseup",n)})),pm(r,o)}),r.on("remove",function(){o.cancel()})},hm=Eu.DOM,vm=function(t,e){var n=t.getParam("custom_ui_selector","","string");return null!==hm.getParent(e,function(e){return mm.isEditorUIElement(e)||!!n&&t.dom.is(e,n)})},ym=function(n,e){var t=e.editor;gm(t),t.on("focusin",function(){var e=n.focusedEditor;e!==this&&(e&&e.fire("blur",{focusedEditor:this}),n.setActive(this),(n.focusedEditor=this).fire("focus",{blurredEditor:e}),this.focus(!0))}),t.on("focusout",function(){var t=this;qr.setEditorTimeout(t,function(){var e=n.focusedEditor;vm(t,function(e){try{var t=rn(At.fromDom(e.getElement()));return Gd(t).fold(function(){return document.body},function(e){return e.dom})}catch(n){return document.body}}(t))||e!==t||(t.fire("blur",{focusedEditor:null}),n.focusedEditor=null)})}),_d||(_d=function(e){var t=n.activeEditor;t&&function(e){if(nn()&&D(e.target)){var t=At.fromDom(e.target);if(Ft(t)&&un(t)&&e.composed&&e.composedPath){var n=e.composedPath();if(n)return ne(n)}}return U.from(e.target)}(e).each(function(e){e.ownerDocument===document&&(e===document.body||vm(t,e)||n.focusedEditor!==t||(t.fire("blur",{focusedEditor:null}),n.focusedEditor=null))})},hm.bind(document,"focusin",_d))},bm=function(e,t){e.focusedEditor===t.editor&&(e.focusedEditor=null),e.activeEditor||(hm.unbind(document,"focusin",_d),_d=null)},Cm=function(t,e){return((n=e).collapsed?U.from(ws(n.startContainer,n.startOffset)).map(At.fromDom):U.none()).bind(function(e){return ao(e)?U.some(e):!1===Pt(t,e)?U.some(t):U.none()});var n},wm=function(t,e){Cm(At.fromDom(t.getBody()),e).bind(function(e){return Fl(e.dom)}).fold(function(){t.selection.normalize()},function(e){return t.selection.setRng(e.toRange())})},xm=function(e){if(e.setActive)try{e.setActive()}catch(t){e.focus()}else e.focus()},Sm=function(e){return Yd(e)||Gd(rn(t=e)).filter(function(e){return t.dom.contains(e.dom)}).isSome();var t},Nm=function(r){return Gd().filter(function(e){return t=e.dom,!((n=t.classList)!==undefined&&(n.contains("tox-edit-area")||n.contains("tox-edit-area__iframe")||n.contains("mce-content-body")))&&vm(r,e.dom);var t,n}).isSome()},Em=function(e){return e.inline?(n=e.getBody())&&Sm(At.fromDom(n)):(t=e).iframeElement&&Yd(At.fromDom(t.iframeElement));var t,n},km=function(t){var e=t.selection,n=t.getBody(),r=e.getRng();t.quirks.refreshContentEditable(),t.bookmark!==undefined&&!1===Em(t)&&dm(t).each(function(e){t.selection.setRng(e),r=e});var o,i,a=(o=t,i=e.getNode(),o.dom.getParent(i,function(e){return"true"===o.dom.getContentEditable(e)}));if(t.$.contains(n,a))return xm(a),wm(t,r),void _m(t);t.inline||(wt.opera||xm(n),t.getWin().focus()),(wt.gecko||t.inline)&&(xm(n),wm(t,r)),_m(t)},_m=function(e){return e.editorManager.setActive(e)},Am=function(e,t,n,r,o){var i=n?t.startContainer:t.endContainer,a=n?t.startOffset:t.endOffset;return U.from(i).map(At.fromDom).map(function(e){return r&&t.collapsed?e:Jt(e,o(e,a)).getOr(e)}).bind(function(e){return Ft(e)?U.some(e):$t(e).filter(Ft)}).map(function(e){return e.dom}).getOr(e)},Rm=function(e,t,n){return Am(e,t,!0,n,function(e,t){return Math.min(e.dom.childNodes.length,t)})},Tm=function(e,t,n){return Am(e,t,!1,n,function(e,t){return 0<t?t-1:t})},Dm=function(e,t){for(var n=e;e&&In(e)&&0===e.length;)e=t?e.nextSibling:e.previousSibling;return e||n},Om=function(n,e){return z(e,function(e){var t=n.fire("GetSelectionRange",{range:e});return t.range!==e?t.range:e})},Bm=function(e){return T(e)?e:C},Pm=function(e,t,n){var r=t(e),o=Bm(n);return r.orThunk(function(){return o(e)?U.none():function(e,t,n){for(var r=e.dom,o=Bm(n);r.parentNode;){r=r.parentNode;var i=At.fromDom(r),a=t(i);if(a.isSome())return a;if(o(i))break}return U.none()}(e,t,o)})},Lm=cf,Im=function(e,t,n){var r=e.formatter.get(n);if(r)for(var o=0;o<r.length;o++)if(!1===r[o].inherit&&e.dom.is(t,r[o].selector))return!0;return!1},Mm=function(t,e,n,r){var o=t.dom.getRoot();return e!==o&&(e=t.dom.getParent(e,function(e){return!!Im(t,e,n)||(e.parentNode===o||!!zm(t,e,n,r,!0))}),zm(t,e,n,r))},Fm=function(e,t,n){return!!Lm(t,n.inline)||(!!Lm(t,n.block)||(n.selector?1===t.nodeType&&e.is(t,n.selector):void 0))},Um=function(e,t,n,r,o,i){var a,u,s,c=n[r];if(n.onmatch)return n.onmatch(t,n,r);if(c)if("undefined"==typeof c.length){for(a in c)if(c.hasOwnProperty(a)){if(u="attributes"===r?e.getAttrib(t,a):ff(e,t,a),o&&!u&&!n.exact)return;if((!o||n.exact)&&!Lm(u,lf(e,sf(c[a],i),a)))return}}else for(s=0;s<c.length;s++)if("attributes"===r?e.getAttrib(t,c[s]):ff(e,t,c[s]))return n;return n},zm=function(e,t,n,r,o){var i,a,u,s,c=e.formatter.get(n),l=e.dom;if(c&&t)for(a=0;a<c.length;a++)if(i=c[a],Fm(e.dom,t,i)&&Um(l,t,i,"attributes",o,r)&&Um(l,t,i,"styles",o,r)){if(s=i.classes)for(u=0;u<s.length;u++)if(!e.dom.hasClass(t,s[u]))return;return i}},jm=function(e,t,n,r){if(r)return Mm(e,r,t,n);if(r=e.selection.getNode(),Mm(e,r,t,n))return!0;var o=e.selection.getStart();return!(o===r||!Mm(e,o,t,n))},Hm=function(r,t){var n=function(e){return Ot(e,At.fromDom(r.getBody()))};return U.from(r.selection.getStart(!0)).bind(function(e){return Pm(At.fromDom(e),function(n){return function(e,t){for(var n=0;n<e.length;n++){var r=t(e[n],n);if(r.isSome())return r}return U.none()}(t,function(e){return t=e,zm(r,n.dom,t)?U.some(t):U.none();var t})},n)}).getOrNull()},Vm=function(o,i,e){return X(e,function(e,t){var n,r=(n=t,F(o.formatter.get(n),function(t){var n=function(e){return 1<e.length&&"%"===e.charAt(0)};return F(["styles","attributes"],function(e){return ge(t,e).exists(function(e){var t=S(e)?e:pe(e);return F(t,n)})})}));return o.formatter.matchNode(i,t,{},r)?e.concat([t]):e},[])},qm={"#text":3,"#comment":8,"#cdata":4,"#pi":7,"#doctype":10,"#document-fragment":11},$m=function(e,t,n){var r=n?"lastChild":"firstChild",o=n?"prev":"next";if(e[r])return e[r];if(e!==t){var i=e[o];if(i)return i;for(var a=e.parent;a&&a!==t;a=a.parent)if(i=a[o])return i}},Wm=function(e){var t="a"===e.name&&!e.attr("href")&&e.attr("id");return e.attr("name")||e.attr("id")&&!e.firstChild||e.attr("data-mce-bookmark")||t},Km=(Xm.create=function(e,t){var n=new Xm(e,qm[e]||1);return t&&ue(t,function(e,t){n.attr(t,e)}),n},Xm.prototype.replace=function(e){return e.parent&&e.remove(),this.insert(e,this),this.remove(),this},Xm.prototype.attr=function(e,t){var n,r=this;if("string"!=typeof e)return e!==undefined&&null!==e&&ue(e,function(e,t){r.attr(t,e)}),r;if(n=r.attributes){if(t===undefined)return n.map[e];if(null===t){if(e in n.map){delete n.map[e];for(var o=n.length;o--;)if(n[o].name===e)return n.splice(o,1),r}return r}if(e in n.map){for(o=n.length;o--;)if(n[o].name===e){n[o].value=t;break}}else n.push({name:e,value:t});return n.map[e]=t,r}},Xm.prototype.clone=function(){var e,t=new Xm(this.name,this.type);if(e=this.attributes){var n=[];n.map={};for(var r=0,o=e.length;r<o;r++){var i=e[r];"id"!==i.name&&(n[n.length]={name:i.name,value:i.value},n.map[i.name]=i.value)}t.attributes=n}return t.value=this.value,t.shortEnded=this.shortEnded,t},Xm.prototype.wrap=function(e){return this.parent.insert(e,this),e.append(this),this},Xm.prototype.unwrap=function(){for(var e=this.firstChild;e;){var t=e.next;this.insert(e,this,!0),e=t}this.remove()},Xm.prototype.remove=function(){var e=this.parent,t=this.next,n=this.prev;return e&&(e.firstChild===this?(e.firstChild=t)&&(t.prev=null):n.next=t,e.lastChild===this?(e.lastChild=n)&&(n.next=null):t.prev=n,this.parent=this.next=this.prev=null),this},Xm.prototype.append=function(e){e.parent&&e.remove();var t=this.lastChild;return t?((t.next=e).prev=t,this.lastChild=e):this.lastChild=this.firstChild=e,e.parent=this,e},Xm.prototype.insert=function(e,t,n){e.parent&&e.remove();var r=t.parent||this;return n?(t===r.firstChild?r.firstChild=e:t.prev.next=e,e.prev=t.prev,(e.next=t).prev=e):(t===r.lastChild?r.lastChild=e:t.next.prev=e,e.next=t.next,(e.prev=t).next=e),e.parent=r,e},Xm.prototype.getAll=function(e){for(var t=[],n=this.firstChild;n;n=$m(n,this))n.name===e&&t.push(n);return t},Xm.prototype.empty=function(){if(this.firstChild){for(var e=[],t=this.firstChild;t;t=$m(t,this))e.push(t);for(var n=e.length;n--;)(t=e[n]).parent=t.firstChild=t.lastChild=t.next=t.prev=null}return this.firstChild=this.lastChild=null,this},Xm.prototype.isEmpty=function(e,t,n){void 0===t&&(t={});var r=this.firstChild;if(Wm(this))return!1;if(r)do{if(1===r.type){if(r.attr("data-mce-bogus"))continue;if(e[r.name])return!1;if(Wm(r))return!1}if(8===r.type)return!1;if(3===r.type&&!function(e){if(Uo(e.value)){var t=e.parent;return!t||"span"===t.name&&!t.attr("style")||!/^[ ]+$/.test(e.value)}}(r))return!1;if(3===r.type&&r.parent&&t[r.parent.name]&&Uo(r.value))return!1;if(n&&n(r))return!1}while(r=$m(r,this));return!0},Xm.prototype.walk=function(e){return $m(this,null,e)},Xm);function Xm(e,t){this.name=e,1===(this.type=t)&&(this.attributes=[],this.attributes.map={})}var Ym=kt.makeMap,Gm=function(e){var u=[],s=(e=e||{}).indent,c=Ym(e.indent_before||""),l=Ym(e.indent_after||""),f=ci.getEncodeFunc(e.entity_encoding||"raw",e.entities),d="html"===e.element_format;return{start:function(e,t,n){var r,o,i,a;if(s&&c[e]&&0<u.length&&0<(a=u[u.length-1]).length&&"\n"!==a&&u.push("\n"),u.push("<",e),t)for(r=0,o=t.length;r<o;r++)i=t[r],u.push(" ",i.name,'="',f(i.value,!0),'"');u[u.length]=!n||d?">":" />",n&&s&&l[e]&&0<u.length&&0<(a=u[u.length-1]).length&&"\n"!==a&&u.push("\n")},end:function(e){var t;u.push("</",e,">"),s&&l[e]&&0<u.length&&0<(t=u[u.length-1]).length&&"\n"!==t&&u.push("\n")},text:function(e,t){0<e.length&&(u[u.length]=t?e:f(e))},cdata:function(e){u.push("<![CDATA[",e,"]]>")},comment:function(e){u.push("\x3c!--",e,"--\x3e")},pi:function(e,t){t?u.push("<?",e," ",f(t),"?>"):u.push("<?",e,"?>"),s&&u.push("\n")},doctype:function(e){u.push("<!DOCTYPE",e,">",s?"\n":"")},reset:function(){u.length=0},getContent:function(){return u.join("").replace(/\n$/,"")}}},Jm=function(t,p){void 0===p&&(p=Ci());var g=Gm(t);(t=t||{}).validate=!("validate"in t)||t.validate;return{serialize:function(e){var f=t.validate,d={3:function(e){g.text(e.value,e.raw)},8:function(e){g.comment(e.value)},7:function(e){g.pi(e.name,e.value)},10:function(e){g.doctype(e.value)},4:function(e){g.cdata(e.value)},11:function(e){if(e=e.firstChild)for(;m(e),e=e.next;);}};g.reset();var m=function(e){var t,n,r,o,i,a,u,s,c,l=d[e.type];if(l)l(e);else{if(t=e.name,n=e.shortEnded,r=e.attributes,f&&r&&1<r.length&&((a=[]).map={},c=p.getElementRule(e.name))){for(u=0,s=c.attributesOrder.length;u<s;u++)(o=c.attributesOrder[u])in r.map&&(i=r.map[o],a.map[o]=i,a.push({name:o,value:i}));for(u=0,s=r.length;u<s;u++)(o=r[u].name)in a.map||(i=r.map[o],a.map[o]=i,a.push({name:o,value:i}));r=a}if(g.start(e.name,r,n),!n){if(e=e.firstChild)for(;m(e),e=e.next;);g.end(t)}}};return 1!==e.type||t.inner?d[11](e):m(e),g.getContent()}}},Qm=function(e,t){return e.replace(new RegExp(t.prefix+"_[0-9]+","g"),function(e){return ge(t.uris,e).getOr(e)})},Zm=["img","video"],ep=function(e,t,n){return!e.allow_html_data_urls&&(/^data:image\//i.test(t)?(r=e.allow_svg_data_urls,o=n,!($(r)?M(Zm,o):r)&&/^data:image\/svg\+xml/i.test(t)):/^data:/i.test(t));var r,o},tp=function(e,t,n){var r,o,i=1,a=e.getShortEndedElements(),u=/<([!?\/])?([A-Za-z0-9\-_\:\.]+)((?:\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\/|\s+)>/g;for(u.lastIndex=r=n;o=u.exec(t);){if(r=u.lastIndex,"/"===o[1])i--;else if(!o[1]){if(o[2]in a)continue;i++}if(0===i)break}return r};function np(W,K){void 0===K&&(K=Ci());var e=function(){};!1!==(W=W||{}).fix_self_closing&&(W.fix_self_closing=!0);var X=W.comment?W.comment:e,Y=W.cdata?W.cdata:e,G=W.text?W.text:e,J=W.start?W.start:e,Q=W.end?W.end:e,Z=W.pi?W.pi:e,ee=W.doctype?W.doctype:e,n=function(f,e){void 0===e&&(e="html");for(var t,i,n,d,r,o,a,m,u,s,c,l,p,g,h,v,y,b,C,w=f.html,x=0,S=[],N=0,E=ci.decode,k=kt.makeMap("src,href,data,background,formaction,poster,xlink:href"),_=/((java|vb)script|mhtml):/i,A="html"===e?0:1,R=function(e){for(var t,n=S.length;n--&&S[n].name!==e;);if(0<=n){for(t=S.length-1;n<=t;t--)(e=S[t]).valid&&Q(e.name);S.length=n}},T=function(e,t){return G(Qm(e,f),t)},D=function(e){""!==e&&(">"===e.charAt(0)&&(e=" "+e),W.allow_conditional_comments||"[if"!==e.substr(0,3).toLowerCase()||(e=" "+e),X(Qm(e,f)))},O=function(e,t){var n=e||"",r=!Ve(n,"--"),o=function(e,t,n){void 0===n&&(n=0);var r=e.toLowerCase();if(-1!==r.indexOf("[if ",n)&&(u=n,/^\s*\[if [\w\W]+\]>.*<!\[endif\](--!?)?>/.test(r.substr(u)))){var o=r.indexOf("[endif]",n);return r.indexOf(">",o)}if(t){var i=r.indexOf(">",n);return-1!==i?i:r.length}var a=/--!?>/;a.lastIndex=n;var u,s=a.exec(e);return s?s.index+s[0].length:r.length}(w,r,t);return e=w.substr(t,o-t),D(r?n+e:e),o+1},B=function(e,t,n,r,o){var i,a,u,s;if(t=t.toLowerCase(),u=t in F?t:E(n||r||o||""),n=ge(f.uris,u).getOr(u),U&&!m&&!1==(0===(s=t).indexOf("data-")||0===s.indexOf("aria-"))){if(!(i=g[t])&&h){for(a=h.length;a--&&!(i=h[a]).pattern.test(t););-1===a&&(i=null)}if(!i)return;if(i.validValues&&!(n in i.validValues))return}if(k[t]&&!W.allow_script_urls){var c=n.replace(/[\s\u0000-\u001F]+/g,"");try{c=decodeURIComponent(c)}catch(l){c=unescape(c)}if(_.test(c))return;if(ep(W,c,e))return}m&&(t in k||0===t.indexOf("on"))||(d.map[t]=n,d.push({name:t,value:n}))},P=new RegExp("<(?:(?:!--([\\w\\W]*?)--!?>)|(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|(?:![Dd][Oo][Cc][Tt][Yy][Pp][Ee]([\\w\\W]*?)>)|(?:!(--)?)|(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|(?:\\/([A-Za-z][A-Za-z0-9\\-_\\:\\.]*)>)|(?:([A-Za-z][A-Za-z0-9\\-_\\:\\.]*)((?:\\s+[^\"'>]+(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>]*))*|\\/|\\s+)>))","g"),L=/([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:[^\"])*)\")|(?:\'((?:[^\'])*)\')|([^>\s]+)))?/g,I=K.getShortEndedElements(),M=W.self_closing_elements||K.getSelfClosingElements(),F=K.getBoolAttrs(),U=W.validate,z=W.remove_internals,j=W.fix_self_closing,H=K.getSpecialElements(),V=w+">";t=P.exec(V);){var q=t[0];if(x<t.index&&T(E(w.substr(x,t.index-x))),i=t[7])":"===(i=i.toLowerCase()).charAt(0)&&(i=i.substr(1)),R(i);else if(i=t[8]){if(t.index+q.length>w.length){T(E(w.substr(t.index))),x=t.index+q.length;continue}":"===(i=i.toLowerCase()).charAt(0)&&(i=i.substr(1)),u=i in I,j&&M[i]&&0<S.length&&S[S.length-1].name===i&&R(i);var $=function(e,t){var n=e.exec(t);if(n){var r=n[1],o=n[2];return"string"==typeof r&&"data-mce-bogus"===r.toLowerCase()?o:null}return null}(L,t[9]);if(null!==$){if("all"===$){x=tp(K,w,P.lastIndex),P.lastIndex=x;continue}c=!1}if(!U||(s=K.getElementRule(i))){if(c=!0,U&&(g=s.attributes,h=s.attributePatterns),(p=t[9])?((m=-1!==p.indexOf("data-mce-type"))&&z&&(c=!1),(d=[]).map={},p.replace(L,function(e,t,n,r,o){return B(i,t,n,r,o),""})):(d=[]).map={},U&&!m){if(v=s.attributesRequired,y=s.attributesDefault,b=s.attributesForced,s.removeEmptyAttrs&&!d.length&&(c=!1),b)for(r=b.length;r--;)a=(l=b[r]).name,"{$uid}"===(C=l.value)&&(C="mce_"+N++),d.map[a]=C,d.push({name:a,value:C});if(y)for(r=y.length;r--;)(a=(l=y[r]).name)in d.map||("{$uid}"===(C=l.value)&&(C="mce_"+N++),d.map[a]=C,d.push({name:a,value:C}));if(v){for(r=v.length;r--&&!(v[r]in d.map););-1===r&&(c=!1)}if(l=d.map["data-mce-bogus"]){if("all"===l){x=tp(K,w,P.lastIndex),P.lastIndex=x;continue}c=!1}}c&&J(i,d,u)}else c=!1;if(n=H[i]){n.lastIndex=x=t.index+q.length,x=(t=n.exec(w))?(c&&(o=w.substr(x,t.index-x)),t.index+t[0].length):(o=w.substr(x),w.length),c&&(0<o.length&&T(o,!0),Q(i)),P.lastIndex=x;continue}u||(p&&p.indexOf("/")===p.length-1?c&&Q(i):S.push({name:i,valid:c}))}else if(i=t[1])D(i);else if(i=t[2]){if(!(1==A||W.preserve_cdata||0<S.length&&K.isValidChild(S[S.length-1].name,"#cdata"))){x=O("",t.index+2),P.lastIndex=x;continue}Y(i)}else if(i=t[3])ee(i);else{if((i=t[4])||"<!"===q){x=O(i,t.index+q.length),P.lastIndex=x;continue}if(i=t[5]){if(1!=A){x=O("?",t.index+2),P.lastIndex=x;continue}Z(i,t[6])}}x=t.index+q.length}for(x<w.length&&T(E(w.substr(x))),r=S.length-1;0<=r;r--)(i=S[r]).valid&&Q(i.name)};return{parse:function(e,t){void 0===t&&(t="html"),n(function(e){for(var t,n=/data:[^;]+;base64,([a-z0-9\+\/=]+)/gi,r=[],o={},i=is("img"),a=0,u=0;t=n.exec(e);){var s=t[0],c=i+"_"+u++;o[c]=s,a<t.index&&r.push(e.substr(a,t.index-a)),r.push(c),a=t.index+s.length}return 0===a?{prefix:i,uris:o,html:e}:(a<e.length&&r.push(e.substr(a)),{prefix:i,uris:o,html:r.join("")})}(e),t)}}}(np=np||{}).findEndTag=tp;var rp,op,ip=np,ap=function(e,t){var n,r,o,i,a,u,s,c=t,l=/<(\w+) [^>]*data-mce-bogus="all"[^>]*>/g,f=e.schema;a=e.getTempAttrs(),u=c,s=new RegExp(["\\s?("+a.join("|")+')="[^"]+"'].join("|"),"gi"),c=u.replace(s,"");for(var d=f.getShortEndedElements();i=l.exec(c);)r=l.lastIndex,o=i[0].length,n=d[i[1]]?r:ip.findEndTag(f,c,r),c=c.substring(0,r-o)+c.substring(n),l.lastIndex=r-o;return po(c)},up=ap,sp=function(e,t,n,r){var o,i,a,u,s;return t.format=n,t.get=!0,t.getInner=!0,t.no_events||e.fire("BeforeGetContent",t),o="raw"===t.format?kt.trim(up(e.serializer,r.innerHTML)):"text"===t.format?e.dom.isEmpty(r)?"":po(r.innerText||r.textContent):"tree"===t.format?e.serializer.serialize(r,t):(a=(i=e).serializer.serialize(r,t),u=vc(i),s=new RegExp("^(<"+u+"[^>]*>(&nbsp;|&#160;|\\s|\xa0|<br \\/>|)<\\/"+u+">[\r\n]*|<br \\/>[\r\n]*)$"),a.replace(s,"")),M(["text","tree"],t.format)||so(At.fromDom(r))?t.content=o:t.content=kt.trim(o),t.no_events||e.fire("GetContent",t),t.content},cp=kt.each,lp=function(o){this.compare=function(e,t){if(e.nodeName!==t.nodeName)return!1;var n=function(n){var r={};return cp(o.getAttribs(n),function(e){var t=e.nodeName.toLowerCase();0!==t.indexOf("_")&&"style"!==t&&0!==t.indexOf("data-")&&(r[t]=o.getAttrib(n,t))}),r},r=function(e,t){var n,r;for(r in e)if(e.hasOwnProperty(r)){if(void 0===(n=t[r]))return!1;if(e[r]!==n)return!1;delete t[r]}for(r in t)if(t.hasOwnProperty(r))return!1;return!0};return!!r(n(e),n(t))&&(!!r(o.parseStyle(o.getAttrib(e,"style")),o.parseStyle(o.getAttrib(t,"style")))&&(!Jl(e)&&!Jl(t)))}},fp=function(n,r,o){return U.from(o.container()).filter(In).exists(function(e){var t=n?0:-1;return r(e.data.charAt(o.offset()+t))})},dp=N(fp,!0,Zl),mp=N(fp,!1,Zl),pp=function(e){var t=e.container();return In(t)&&(0===t.data.length||mo(t.data)&&od.isBookmarkNode(t.parentNode))},gp=function(t,n){return function(e){return U.from(il(t?0:-1,e)).filter(n).isSome()}},hp=function(e){return jn(e)&&"block"===er(At.fromDom(e),"display")},vp=function(e){return Vn(e)&&!(An(t=e)&&"all"===t.getAttribute("data-mce-bogus"));var t},yp=gp(!0,hp),bp=gp(!1,hp),Cp=gp(!0,$n),wp=gp(!1,$n),xp=gp(!0,Bn),Sp=gp(!1,Bn),Np=gp(!0,vp),Ep=gp(!1,vp),kp=function(e){var t=Gu(e,"br"),n=H(function(e){for(var t=[],n=e.dom;n;)t.push(At.fromDom(n)),n=n.lastChild;return t}(e).slice(-1),no);t.length===n.length&&W(n,pn)},_p=function(e){mn(e),fn(e,At.fromHtml('<br data-mce-bogus="1">'))},Ap=function(n){Zt(n).each(function(t){Wt(t).each(function(e){eo(n)&&no(t)&&eo(e)&&pn(t)})})},Rp=function(e,t,n){return Pt(t,e)?function(e,t){for(var n=T(t)?t:C,r=e.dom,o=[];null!==r.parentNode&&r.parentNode!==undefined;){var i=r.parentNode,a=At.fromDom(i);if(o.push(a),!0===n(a))break;r=i}return o}(e,function(e){return n(e)||Ot(e,t)}).slice(0,-1):[]},Tp=function(e,t){return Rp(e,t,C)},Dp=function(e,t){return[e].concat(Tp(e,t))},Op=function(e,t,n){return Pl(e,t,n,pp)},Bp=function(e,t){return Y(Dp(At.fromDom(t.container()),e),eo)},Pp=function(e,n,r){return Op(e,n.dom,r).forall(function(t){return Bp(n,r).fold(function(){return!1===ol(t,r,n.dom)},function(e){return!1===ol(t,r,n.dom)&&Pt(e,At.fromDom(t.container()))})})},Lp=function(t,n,r){return Bp(n,r).fold(function(){return Op(t,n.dom,r).forall(function(e){return!1===ol(e,r,n.dom)})},function(e){return Op(t,e.dom,r).isNone()})},Ip=N(Lp,!1),Mp=N(Lp,!0),Fp=N(Pp,!1),Up=N(Pp,!0),zp=function(e){return ml(e).exists(no)},jp=function(e,t,n){var r=H(Dp(At.fromDom(n.container()),t),eo),o=ne(r).getOr(t);return Ol(e,o.dom,n).filter(zp)},Hp=function(e,t){return ml(t).exists(no)||jp(!0,e,t).isSome()},Vp=function(e,t){return n=t,U.from(n.getNode(!0)).map(At.fromDom).exists(no)||jp(!1,e,t).isSome();var n},qp=N(jp,!1),$p=N(jp,!0),Wp=function(e){return Hs.isTextPosition(e)&&!e.isAtStart()&&!e.isAtEnd()},Kp=function(e,t){var n=H(Dp(At.fromDom(t.container()),e),eo);return ne(n).getOr(e)},Xp=function(e,t){return Wp(t)?mp(t):mp(t)||Ml(Kp(e,t).dom,t).exists(mp)},Yp=function(e,t){return Wp(t)?dp(t):dp(t)||Il(Kp(e,t).dom,t).exists(dp)},Gp=function(e){return ml(e).bind(function(e){return Ar(e,Ft)}).exists(function(e){return t=er(e,"white-space"),M(["pre","pre-wrap"],t);var t})},Jp=function(e,t){return r=t,Ml(e.dom,r).isNone()||(n=t,Il(e.dom,n).isNone())||Ip(e,t)||Mp(e,t)||Vp(e,t)||Hp(e,t);var n,r},Qp=function(e,t){return!Gp(t)&&(Ip(e,t)||Fp(e,t)||Vp(e,t)||Xp(e,t))},Zp=function(e,t){return!Gp(t)&&(Mp(e,t)||Up(e,t)||Hp(e,t)||Yp(e,t))},eg=function(e,t){return Qp(e,t)||Zp(e,(r=(n=t).container(),o=n.offset(),In(r)&&o<r.data.length?Hs(r,o+1):n));var n,r,o},tg=function(e,t){return Ql(e.charAt(t))},ng=function(e){var t=e.container();return In(t)&&He(t.data,lo)},rg=function(e){var n,t=e.data,r=(n=t.split(""),z(n,function(e,t){return Ql(e)&&0<t&&t<n.length-1&&ef(n[t-1])&&ef(n[t+1])?" ":e}).join(""));return r!==t&&(e.data=r,!0)},og=function(l,e){return U.some(e).filter(ng).bind(function(e){var t,n,r,o,i,a,u,s,c=e.container();return(i=l,u=(a=c).data,s=Hs(a,0),!(!tg(u,0)||eg(i,s)||(a.data=" "+u.slice(1),0))||rg(c)||(t=l,r=(n=c).data,o=Hs(n,r.length-1),!(!tg(r,r.length-1)||eg(t,o)||(n.data=r.slice(0,-1)+" ",0))))?U.some(e):U.none()})},ig=function(t){var e=At.fromDom(t.getBody());t.selection.isCollapsed()&&og(e,Hs.fromRangeStart(t.selection.getRng())).each(function(e){t.selection.setRng(e.toRange())})},ag=function(e,t,n){var r,o,i,a,u,s,c,l;0!==n&&(r=At.fromDom(e),o=_r(r,eo).getOr(r),i=e.data.slice(t,t+n),a=t+n>=e.data.length&&Zp(o,$s(e,e.data.length)),u=0===t&&Qp(o,$s(e,0)),e.replaceData(t,n,(c=u,l=a,X(s=i,function(e,t){return Zl(t)||Ql(t)?e.previousCharIsSpace||""===e.str&&c||e.str.length===s.length-1&&l?{previousCharIsSpace:!1,str:e.str+lo}:{previousCharIsSpace:!0,str:e.str+" "}:{previousCharIsSpace:!1,str:e.str+t}},{previousCharIsSpace:!1,str:""}).str)))},ug=function(e,t){var n=e.data.slice(t),r=n.length-We(n).length;return ag(e,t,r)},sg=function(e,t){var n=e.data.slice(0,t),r=n.length-Ke(n).length;return ag(e,t-r,r)},cg=function(e,t,n,r){void 0===r&&(r=!0);var o=Ke(e.data).length,i=r?e:t,a=r?t:e;return r?i.appendData(a.data):i.insertData(0,a.data),pn(At.fromDom(a)),n&&ug(i,o),i},lg=function(e,t){return r=e,o=(n=t).container(),i=n.offset(),!1===$s.isTextPosition(n)&&o===r.parentNode&&i>$s.before(r).offset()?$s(t.container(),t.offset()-1):t;var n,r,o,i},fg=function(e){return Lo(e.previousSibling)?U.some((t=e.previousSibling,In(t)?$s(t,t.data.length):$s.after(t))):e.previousSibling?Ul(e.previousSibling):U.none();var t},dg=function(e){return Lo(e.nextSibling)?U.some((t=e.nextSibling,In(t)?$s(t,0):$s.before(t))):e.nextSibling?Fl(e.nextSibling):U.none();var t},mg=function(r,o){return fg(o).orThunk(function(){return dg(o)}).orThunk(function(){return e=r,t=o,n=$s.before(t.previousSibling?t.previousSibling:t.parentNode),Ml(e,n).fold(function(){return Il(e,$s.after(t))},U.some);var e,t,n})},pg=function(n,r){return dg(r).orThunk(function(){return fg(r)}).orThunk(function(){return t=r,Il(e=n,$s.after(t)).fold(function(){return Ml(e,$s.before(t))},U.some);var e,t})},gg=function(e,t,n){return(e?pg:mg)(t,n).map(N(lg,n))},hg=function(t,n,e){e.fold(function(){t.focus()},function(e){t.selection.setRng(e.toRange(),n)})},vg=function(e,t){return t&&he(e.schema.getBlockElements(),Lt(t))},yg=function(e){if($o(e)){var t=At.fromHtml('<br data-mce-bogus="1">');return mn(e),fn(e,t),U.some($s.before(t.dom))}return U.none()},bg=function(e,t,a){var n,r,o,i,u=Wt(e).filter(Ut),s=Kt(e).filter(Ut);return pn(e),r=s,o=t,i=function(e,t,n){var r=e.dom,o=t.dom,i=r.data.length;return cg(r,o,a),n.container()===o?$s(r,i):n},((n=u).isSome()&&r.isSome()&&o.isSome()?U.some(i(n.getOrDie(),r.getOrDie(),o.getOrDie())):U.none()).orThunk(function(){return a&&(u.each(function(e){return sg(e.dom,e.dom.length)}),s.each(function(e){return ug(e.dom,0)})),t})},Cg=function(t,n,e,r){void 0===r&&(r=!0);var o,i,a=gg(n,t.getBody(),e.dom),u=_r(e,N(vg,t),(o=t.getBody(),function(e){return e.dom===o})),s=bg(e,a,(i=e,he(t.schema.getTextInlineElements(),Lt(i))));t.dom.isEmpty(t.getBody())?(t.setContent(""),t.selection.setCursorLocation()):u.bind(yg).fold(function(){r&&hg(t,n,s)},function(e){r&&hg(t,n,U.some(e))})},wg=function(e,t){return{start:e,end:t}},xg=Cr([{removeTable:["element"]},{emptyCells:["cells"]},{deleteCellSelection:["rng","cell"]}]),Sg=function(e,t){return Or(At.fromDom(e),"td,th",t)},Ng=function(e,t){return Tr(e,"table",t)},Eg=function(e){return!Ot(e.start,e.end)},kg=function(e,t){return Ng(e.start,t).bind(function(r){return Ng(e.end,t).bind(function(e){return t=Ot(r,e),n=r,t?U.some(n):U.none();var t,n})})},_g=function(e){return Gu(e,"td,th")},Ag=function(r,e){var t=Sg(e.startContainer,r),n=Sg(e.endContainer,r);return e.collapsed?U.none():ds(t,n,wg).fold(function(){return t.fold(function(){return n.bind(function(t){return Ng(t,r).bind(function(e){return ne(_g(e)).map(function(e){return wg(e,t)})})})},function(t){return Ng(t,r).bind(function(e){return re(_g(e)).map(function(e){return wg(t,e)})})})},function(e){return Rg(r,e)?U.none():(n=r,Ng((t=e).start,n).bind(function(e){return re(_g(e)).map(function(e){return wg(t.start,e)})}));var t,n})},Rg=function(e,t){return kg(t,e).isSome()},Tg=function(e,t,n){return e.filter(function(e){return Eg(e)&&Rg(n,e)}).orThunk(function(){return Ag(n,t)}).bind(function(e){return kg(t=e,n).map(function(e){return{rng:t,table:e,cells:_g(e)}});var t})},Dg=function(e,t){return G(e,function(e){return Ot(e,t)})},Og=function(e,r,o){return e.filter(function(e){return n=o,!Eg(t=e)&&kg(t,n).exists(function(e){var t=e.dom.rows;return 1===t.length&&1===t[0].cells.length})&&jf(e.start,r);var t,n}).map(function(e){return e.start})},Bg=function(n){return ds(Dg((r=n).cells,r.rng.start),Dg(r.cells,r.rng.end),function(e,t){return r.cells.slice(e,t+1)}).map(function(e){var t=n.cells;return e.length===t.length?xg.removeTable(n.table):xg.emptyCells(e)});var r},Pg=function(e,t){var n,r,o,i,a,u=(n=e,function(e){return Ot(n,e)}),s=(o=u,i=Sg((r=t).startContainer,o),a=Sg(r.endContainer,o),ds(i,a,wg));return Og(s,t,u).map(function(e){return xg.deleteCellSelection(t,e)}).orThunk(function(){return Tg(s,t,u).bind(Bg)})},Lg=function(e){var t;return(8===It(t=e)||"#comment"===Lt(t)?Wt:Zt)(e).bind(Lg).orThunk(function(){return U.some(e)})},Ig=function(e,t){return W(t,_p),e.selection.setCursorLocation(t[0].dom,0),!0},Mg=function(e,t,n){t.deleteContents();var r,o,i=Lg(n).getOr(n),a=At.fromDom(e.dom.getParent(i.dom,e.dom.isBlock));return $o(a)&&(_p(a),e.selection.setCursorLocation(a.dom,0)),Ot(n,a)||(r=$t(a).is(n)?[]:$t(o=a).map(Gt).map(function(e){return H(e,function(e){return!Ot(o,e)})}).getOr([]),W(r.concat(Gt(n)),function(e){Ot(e,a)||Pt(e,a)||pn(e)})),!0},Fg=function(e,t){return Cg(e,!1,t),!0},Ug=function(n,e,r,t){return jg(e,t).fold(function(){return t=n,Pg(e,r).map(function(e){return e.fold(N(Fg,t),N(Ig,t),N(Mg,t))});var t},function(e){return Hg(n,e)}).getOr(!1)},zg=function(e,t){return Y(Dp(t,e),uo)},jg=function(e,t){return Y(Dp(t,e),function(e){return"caption"===Lt(e)})},Hg=function(e,t){return _p(t),e.selection.setCursorLocation(t.dom,0),U.some(!0)},Vg=function(u,s,c,l,f){return Bl(c,u.getBody(),f).bind(function(e){return o=c,i=f,a=e,Fl((r=l).dom).bind(function(t){return Ul(r.dom).map(function(e){return o?i.isEqual(t)&&a.isEqual(e):i.isEqual(e)&&a.isEqual(t)})}).getOr(!0)?Hg(u,l):(t=l,n=e,jg(s,At.fromDom(n.getNode())).map(function(e){return!1===Ot(e,t)}));var t,n,r,o,i,a}).or(U.some(!0))},qg=function(o,i,a,e){var u=$s.fromRangeStart(o.selection.getRng());return zg(a,e).bind(function(e){return $o(e)?Hg(o,e):(t=a,n=e,r=u,Bl(i,o.getBody(),r).bind(function(e){return zg(t,At.fromDom(e.getNode())).map(function(e){return!1===Ot(e,n)})}));var t,n,r}).getOr(!1)},$g=function(e,t){return(e?xp:Sp)(t)},Wg=function(a,u,r){var s=At.fromDom(a.getBody());return jg(s,r).fold(function(){return qg(a,u,s,r)||(e=a,t=u,n=$s.fromRangeStart(e.selection.getRng()),$g(t,n)||Ol(t,e.getBody(),n).exists(function(e){return $g(t,e)}));var e,t,n},function(e){return t=a,n=u,r=s,o=e,i=$s.fromRangeStart(t.selection.getRng()),($o(o)?Hg(t,o):Vg(t,r,n,o,i)).getOr(!1);var t,n,r,o,i})},Kg=function(e,t){var n,r,o,i,a,u=At.fromDom(e.selection.getStart(!0)),s=Ff(e);return e.selection.isCollapsed()&&0===s.length?Wg(e,t,u):(n=e,r=u,o=At.fromDom(n.getBody()),i=n.selection.getRng(),0!==(a=Ff(n)).length?Ig(n,a):Ug(n,o,i,r))},Xg=function(a){var u=$s.fromRangeStart(a),s=$s.fromRangeEnd(a),c=a.commonAncestorContainer;return Ol(!1,c,s).map(function(e){return!ol(u,s,c)&&ol(u,e,c)?(t=u.container(),n=u.offset(),r=e.container(),o=e.offset(),(i=document.createRange()).setStart(t,n),i.setEnd(r,o),i):a;var t,n,r,o,i}).getOr(a)},Yg=function(e){return e.collapsed?e:Xg(e)},Gg=function(e,t){var n,r;return e.getBlockElements()[t.name]&&((r=t).firstChild&&r.firstChild===r.lastChild)&&("br"===(n=t.firstChild).name||n.value===lo)},Jg=function(e,t){var n,r,o,i=t.firstChild,a=t.lastChild;return i&&"meta"===i.name&&(i=i.next),a&&"mce_marker"===a.attr("id")&&(a=a.prev),r=a,o=(n=e).getNonEmptyElements(),r&&(r.isEmpty(o)||Gg(n,r))&&(a=a.prev),!(!i||i!==a)&&("ul"===i.name||"ol"===i.name)},Qg=function(e){return e&&e.firstChild&&e.firstChild===e.lastChild&&((t=e.firstChild).data===lo||zn(t));var t},Zg=function(e){return 0<e.length&&(!(t=e[e.length-1]).firstChild||Qg(t))?e.slice(0,-1):e;var t},eh=function(e,t){var n=e.getParent(t,e.isBlock);return n&&"LI"===n.nodeName?n:null},th=function(e,t){var n=$s.after(e),r=_l(t).prev(n);return r?r.toRange():null},nh=function(t,e,n){var r,o,i,a,u=t.parentNode;return kt.each(e,function(e){u.insertBefore(e,t)}),r=t,o=n,i=$s.before(r),(a=_l(o).next(i))?a.toRange():null},rh=function(e,o,i,t){var n,r,a,u,s,c,l,f,d,m,p,g,h,v,y,b,C,w,x,S,N=(n=o,r=t,c=e.serialize(r),l=n.createFragment(c),u=(a=l).firstChild,s=a.lastChild,u&&"META"===u.nodeName&&u.parentNode.removeChild(u),s&&"mce_marker"===s.id&&s.parentNode.removeChild(s),a),E=eh(o,i.startContainer),k=Zg((f=N.firstChild,kt.grep(f.childNodes,function(e){return"LI"===e.nodeName}))),_=o.getRoot(),A=function(e){var t=$s.fromRangeStart(i),n=_l(o.getRoot()),r=1===e?n.prev(t):n.next(t);return!r||eh(o,r.getNode())!==E};return A(1)?nh(E,k,_):A(2)?(d=E,m=k,p=_,o.insertAfter(m.reverse(),d),th(m[0],p)):(h=k,v=_,y=g=E,C=(b=i).cloneRange(),w=b.cloneRange(),C.setStartBefore(y),w.setEndAfter(y),x=[C.cloneContents(),w.cloneContents()],(S=g.parentNode).insertBefore(x[0],g),kt.each(h,function(e){S.insertBefore(e,g)}),S.insertBefore(x[1],g),S.removeChild(g),th(h[h.length-1],v))},oh=qn,ih=function(e){var t=e.dom,n=Yg(e.selection.getRng());e.selection.setRng(n);var r,o,i,a=t.getParent(n.startContainer,oh);r=t,o=n,null!==(i=a)&&i===r.getParent(o.endContainer,oh)&&jf(At.fromDom(i),o)?Mg(e,n,At.fromDom(a)):e.getDoc().execCommand("Delete",!1,null)},ah=function(e,t,n){var r,o,i,a,u,s,c,l,f,d=e.selection,m=e.dom;/^ | $/.test(t)&&(s=m,c=d.getRng(),l=t,f=At.fromDom(s.getRoot()),l=Qp(f,$s.fromRangeStart(c))?l.replace(/^ /,"&nbsp;"):l.replace(/^&nbsp;/," "),t=l=Zp(f,$s.fromRangeEnd(c))?l.replace(/(&nbsp;| )(<br( \/)>)?$/,"&nbsp;"):l.replace(/&nbsp;(<br( \/)?>)?$/," "));var p=e.parser,g=n.merge,h=Jm({validate:e.getParam("validate")},e.schema),v='<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;</span>',y={content:t,format:"html",selection:!0,paste:n.paste};if((y=e.fire("BeforeSetContent",y)).isDefaultPrevented())e.fire("SetContent",{content:y.content,format:"html",selection:!0,paste:n.paste});else{-1===(t=y.content).indexOf("{$caret}")&&(t+="{$caret}"),t=t.replace(/\{\$caret\}/,v);var b,C,w=(a=d.getRng()).startContainer||(a.parentElement?a.parentElement():null),x=e.getBody();w===x&&d.isCollapsed()&&m.isBlock(x.firstChild)&&(b=e,(C=x.firstChild)&&!b.schema.getShortEndedElements()[C.nodeName])&&m.isEmpty(x.firstChild)&&((a=m.createRng()).setStart(x.firstChild,0),a.setEnd(x.firstChild,0),d.setRng(a)),d.isCollapsed()||ih(e);var S,N,E,k,_,A,R,T,D,O,B,P,L,I,M={context:(r=d.getNode()).nodeName.toLowerCase(),data:n.data,insert:!0},F=p.parse(t,M);if(!0===n.paste&&Jg(e.schema,F)&&eh(m,r))return a=rh(h,m,d.getRng(),F),d.setRng(a),void e.fire("SetContent",y);if(!function(e){for(var t=e;t=t.walk();)1===t.type&&t.attr("data-mce-fragment","1")}(F),"mce_marker"===(u=F.lastChild).attr("id"))for(u=(i=u).prev;u;u=u.walk(!0))if(3===u.type||!m.isBlock(u.name)){e.schema.isValidChild(u.parent.name,"span")&&u.parent.insert(i,u,"br"===u.name);break}if(e._selectionOverrides.showBlockCaretContainer(r),M.invalid){for(e.selection.setContent(v),r=d.getNode(),o=e.getBody(),9===r.nodeType?r=u=o:u=r;u!==o;)u=(r=u).parentNode;t=r===o?o.innerHTML:m.getOuterHTML(r),t=h.serialize(p.parse(t.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i,function(){return h.serialize(F)}))),r===o?m.setHTML(o,t):m.setOuterHTML(r,t)}else t=h.serialize(F),S=e,N=t,"all"===(E=r).getAttribute("data-mce-bogus")?E.parentNode.insertBefore(S.dom.createFragment(N),E):(k=E.firstChild,_=E.lastChild,!k||k===_&&"BR"===k.nodeName?S.dom.setHTML(E,N):S.selection.setContent(N));R=g,O=(A=e).schema.getTextInlineElements(),B=A.dom,R&&(T=A.getBody(),D=new lp(B),kt.each(B.select("*[data-mce-fragment]"),function(e){for(var t=e.parentNode;t&&t!==T;t=t.parentNode)O[e.nodeName.toLowerCase()]&&D.compare(t,e)&&B.remove(e,!0)})),function(n,e){var t,r,o=n.dom,i=n.selection;if(e){i.scrollIntoView(e);var a=function(e){for(var t=n.getBody();e&&e!==t;e=e.parentNode)if("false"===o.getContentEditable(e))return e;return null}(e);if(a)return o.remove(e),i.select(a);var u=o.createRng(),s=e.previousSibling;s&&3===s.nodeType?(u.setStart(s,s.nodeValue.length),wt.ie||(r=e.nextSibling)&&3===r.nodeType&&(s.appendData(r.data),r.parentNode.removeChild(r))):(u.setStartBefore(e),u.setEndBefore(e));var c=o.getParent(e,o.isBlock);o.remove(e),c&&o.isEmpty(c)&&(n.$(c).empty(),u.setStart(c,0),u.setEnd(c,0),oh(c)||c.getAttribute("data-mce-fragment")||!(t=function(e){var t=$s.fromRangeStart(e);if(t=_l(n.getBody()).next(t))return t.toRange()}(u))?o.add(c,o.create("br",{"data-mce-bogus":"1"})):(u=t,o.remove(c))),i.setRng(u)}}(e,m.get("mce_marker")),P=e.getBody(),kt.each(P.getElementsByTagName("*"),function(e){e.removeAttribute("data-mce-fragment")}),L=m,I=d.getStart(),U.from(L.getParent(I,"td,th")).map(At.fromDom).each(Ap),e.fire("SetContent",y),e.addVisual()}},uh=function(e,t){t(e),e.firstChild&&uh(e.firstChild,t),e.next&&uh(e.next,t)},sh=function(e,t,n){var r=function(e,n,t){var r={},o={},i=[];for(var a in t.firstChild&&uh(t.firstChild,function(t){W(e,function(e){e.name===t.name&&(r[e.name]?r[e.name].nodes.push(t):r[e.name]={filter:e,nodes:[t]})}),W(n,function(e){"string"==typeof t.attr(e.name)&&(o[e.name]?o[e.name].nodes.push(t):o[e.name]={filter:e,nodes:[t]})})}),r)r.hasOwnProperty(a)&&i.push(r[a]);for(var u in o)o.hasOwnProperty(u)&&i.push(o[u]);return i}(e,t,n);W(r,function(t){W(t.filter.callbacks,function(e){e(t.nodes,t.filter.name,{})})})},ch=function(e){return e instanceof Km},lh=function(e,t){var r;e.dom.setHTML(e.getBody(),t),Em(r=e)&&Fl(r.getBody()).each(function(e){var t=e.getNode(),n=Bn(t)?Fl(t).getOr(e):e;r.selection.setRng(n.toRange())})},fh=function(u,s,c){return c.format=c.format?c.format:"html",c.set=!0,c.content=ch(s)?"":s,c.no_events||u.fire("BeforeSetContent",c),ch(s)||(s=c.content),U.from(u.getBody()).fold(E(s),function(e){return ch(s)?function(e,t,n,r){sh(e.parser.getNodeFilters(),e.parser.getAttributeFilters(),n);var o=Jm({validate:e.validate},e.schema).serialize(n);return r.content=so(At.fromDom(t))?o:kt.trim(o),lh(e,r.content),r.no_events||e.fire("SetContent",r),n}(u,e,s,c):(t=u,n=e,o=c,0===(r=s).length||/^\s+$/.test(r)?(a='<br data-mce-bogus="1">',"TABLE"===n.nodeName?r="<tr><td>"+a+"</td></tr>":/^(UL|OL)$/.test(n.nodeName)&&(r="<li>"+a+"</li>"),r=(i=vc(t))&&t.schema.isValidChild(n.nodeName.toLowerCase(),i.toLowerCase())?(r=a,t.dom.createHTML(i,yc(t),r)):r||'<br data-mce-bogus="1">',lh(t,r),t.fire("SetContent",o)):("raw"!==o.format&&(r=Jm({validate:t.validate},t.schema).serialize(t.parser.parse(r,{isRootContent:!0,insert:!0}))),o.content=so(At.fromDom(n))?r:kt.trim(r),lh(t,o.content),o.no_events||t.fire("SetContent",o)),o.content);var t,n,r,o,i,a})},dh=function(e,t){return r=t,((o=(n=e).dom).parentNode?Rr(At.fromDom(o.parentNode),function(e){return!Ot(n,e)&&r(e)}):U.none()).isSome();var n,r,o},mh=fo,ph="_mce_caret",gh=function(e){return 0<function(e){for(var t=[];e;){if(3===e.nodeType&&e.nodeValue!==mh||1<e.childNodes.length)return[];1===e.nodeType&&t.push(e),e=e.firstChild}return t}(e).length},hh=function(e){if(e){var t=new Xr(e,e);for(e=t.current();e;e=t.next())if(In(e))return e}return null},vh=function(e){var t=At.fromTag("span");return Yn(t,{id:ph,"data-mce-bogus":"1","data-mce-type":"format-caret"}),e&&fn(t,At.fromText(mh)),t},yh=function(e,t,n){void 0===n&&(n=!0);var r,o,i,a,u,s,c,l,f=e.dom,d=e.selection;gh(t)?Cg(e,!1,At.fromDom(t),n):(r=d.getRng(),o=f.getParent(t,f.isBlock),i=r.startContainer,a=r.startOffset,u=r.endContainer,s=r.endOffset,(l=hh(t))&&l.nodeValue.charAt(0)===mh&&l.deleteData(0,1),c=l,f.remove(t,!0),i===c&&0<a&&r.setStart(c,a-1),u===c&&0<s&&r.setEnd(c,s-1),o&&f.isEmpty(o)&&_p(At.fromDom(o)),d.setRng(r))},bh=function(e,t,n){void 0===n&&(n=!0);var r=e.dom,o=e.selection;if(t)yh(e,t,n);else if(!(t=Hl(e.getBody(),o.getStart())))for(;t=r.get(ph);)yh(e,t,!1)},Ch=function(e,t){return e.appendChild(t),t},wh=function(e,t){var n=K(e,function(e,t){return Ch(e,t.cloneNode(!1))},t);return Ch(n,n.ownerDocument.createTextNode(mh))},xh=function(e,t,n,r){var o,i,a,u,s,c,l,f,d,m,p,g,h,v=e.dom,y=e.selection,b=[],C=y.getRng(),w=C.startContainer,x=C.startOffset,S=w;for(3===w.nodeType&&(x!==w.nodeValue.length&&(o=!0),S=S.parentNode);S;){if(zm(e,S,t,n,r)){i=S;break}S.nextSibling&&(o=!0),b.push(S),S=S.parentNode}i&&(o?(a=y.getBookmark(),C.collapse(!0),u=Of(e,C,e.formatter.get(t),!0),u=Cd(u),e.formatter.remove(t,n,u,r),y.moveToBookmark(a)):(s=Hl(e.getBody(),i),c=vh(!1).dom,m=c,p=null!==s?s:i,g=(d=e).dom,(h=g.getParent(p,N(of,d)))&&g.isEmpty(h)?p.parentNode.replaceChild(m,p):(kp(At.fromDom(p)),g.isEmpty(p)?p.parentNode.replaceChild(m,p):g.insertAfter(m,p)),l=function(t,e,n,r,o,i){var a=t.formatter,u=t.dom,s=H(ie(a.get()),function(e){return e!==r&&!He(e,"removeformat")}),c=Vm(t,n,s);if(0<H(c,function(e){return!pf(t,e,r)}).length){var l=n.cloneNode(!1);return u.add(e,l),a.remove(r,o,l,i),u.remove(l),U.some(l)}return U.none()}(e,c,i,t,n,r),f=wh(b.concat(l.toArray()),c),yh(e,s,!1),y.setCursorLocation(f,1),v.isEmpty(i)&&v.remove(i)))},Sh=function(i){i.on("mouseup keydown",function(e){var t,n,r,o;t=i,n=e.keyCode,r=t.selection,o=t.getBody(),bh(t,null,!1),8!==n&&46!==n||!r.isCollapsed()||r.getStart().innerHTML!==mh||bh(t,Hl(o,r.getStart())),37!==n&&39!==n||bh(t,Hl(o,r.getStart()))})},Nh=function(e,t){return e.schema.getTextInlineElements().hasOwnProperty(Lt(t))&&!jl(t.dom)&&!On(t.dom)},Eh={},kh=we,_h=be;op=function(e){var t,n=e.selection.getRng(),r=Rn(["pre"]);n.collapsed||(t=e.selection.getSelectedBlocks(),_h(kh(kh(t,r),function(e){return r(e.previousSibling)&&-1!==xe(t,e.previousSibling)}),function(e){var t,n;t=e.previousSibling,hu(n=e).remove(),hu(t).append("<br><br>").append(n.childNodes)}))},Eh[rp="pre"]||(Eh[rp]=[]),Eh[rp].push(op);var Ah=kt.each,Rh=function(e){return An(e)&&!Jl(e)&&!jl(e)&&!On(e)},Th=function(e,t){for(var n=e;n;n=n[t]){if(In(n)&&0!==n.nodeValue.length)return e;if(An(n)&&!Jl(n))return n}return e},Dh=function(e,t,n){var r,o,i=new lp(e);if(t&&n&&(t=Th(t,"previousSibling"),n=Th(n,"nextSibling"),i.compare(t,n))){for(r=t.nextSibling;r&&r!==n;)r=(o=r).nextSibling,t.appendChild(o);return e.remove(n),kt.each(kt.grep(n.childNodes),function(e){t.appendChild(e)}),t}return n},Oh=function(e,t,n,r){var o;r&&!1!==t.merge_siblings&&(o=Dh(e,rf(r),r),Dh(e,o,rf(o,!0)))},Bh=function(e,t,n){Ah(e.childNodes,function(e){Rh(e)&&(t(e)&&n(e),e.hasChildNodes()&&Bh(e,t,n))})},Ph=function(t,n){return function(e){return!(!e||!ff(t,e,n))}},Lh=function(r,o,i){return function(e){var t,n;r.setStyle(e,o,i),""===e.getAttribute("style")&&e.removeAttribute("style"),t=r,"SPAN"===(n=e).nodeName&&0===t.getAttribs(n).length&&t.remove(n,!0)}},Ih=Cr([{keep:[]},{rename:["name"]},{removed:[]}]),Mh=/^(src|href|style)$/,Fh=kt.each,Uh=cf,zh=function(e,t,n){return e.isChildOf(t,n)&&t!==n&&!e.isBlock(n)},jh=function(e,t,n){var r,o=t[n?"startContainer":"endContainer"],i=t[n?"startOffset":"endOffset"];return An(o)&&(r=o.childNodes.length-1,!n&&i&&i--,o=o.childNodes[r<i?r:i]),In(o)&&n&&i>=o.nodeValue.length&&(o=new Xr(o,e.getBody()).next()||o),In(o)&&!n&&0===i&&(o=new Xr(o,e.getBody()).prev()||o),o},Hh=function(e,t){var n=t?"firstChild":"lastChild";if(/^(TR|TH|TD)$/.test(e.nodeName)&&e[n]){var r=e[n];return"TR"===e.nodeName&&r[n]||r}return e},Vh=function(e,t,n,r){var o=e.create(n,r);return t.parentNode.insertBefore(o,t),o.appendChild(t),o},qh=function(e,t,n,r,o){var i=At.fromDom(t),a=At.fromDom(e.create(r,o)),u=(n?Yt:Xt)(i);return dn(a,u),n?(sn(i,a),ln(a,i)):(cn(i,a),fn(a,i)),a.dom},$h=function(e,t,n,r){return!(t=rf(t,n,r))||"BR"===t.nodeName||e.isBlock(t)},Wh=function(e,r,o,t,i){var n,a,u,s,c,l=e.dom;if(u=l,!(Uh(s=t,(c=r).inline)||Uh(s,c.block)||c.selector&&(An(s)&&u.is(s,c.selector))||(a=t,r.links&&"A"===a.nodeName)))return Ih.keep();var f,d,m,p,g,h,v,y=t;if(r.inline&&"all"===r.remove&&S(r.preserve_attributes)){var b=H(l.getAttribs(y),function(e){return M(r.preserve_attributes,e.name.toLowerCase())});if(l.removeAllAttribs(y),W(b,function(e){return l.setAttrib(y,e.name,e.value)}),0<b.length)return Ih.rename("span")}if("all"!==r.remove){Fh(r.styles,function(e,t){e=lf(l,sf(e,o),t+""),O(t)&&(t=e,i=null),!r.remove_similar&&i&&!Uh(ff(l,i,t),e)||l.setStyle(y,t,""),n=!0}),n&&""===l.getAttrib(y,"style")&&(y.removeAttribute("style"),y.removeAttribute("data-mce-style")),Fh(r.attributes,function(e,t){var n;if(e=sf(e,o),O(t)&&(t=e,i=null),r.remove_similar||!i||Uh(l.getAttrib(i,t),e)){if("class"===t&&(e=l.getAttrib(y,t))&&(n="",W(e.split(/\s+/),function(e){/mce\-\w+/.test(e)&&(n+=(n?" ":"")+e)}),n))return void l.setAttrib(y,t,n);"class"===t&&y.removeAttribute("className"),Mh.test(t)&&y.removeAttribute("data-mce-"+t),y.removeAttribute(t)}}),Fh(r.classes,function(e){e=sf(e,o),i&&!l.hasClass(i,e)||l.removeClass(y,e)});for(var C=l.getAttribs(y),w=0;w<C.length;w++){var x=C[w].nodeName;if(0!==x.indexOf("_")&&0!==x.indexOf("data-"))return Ih.keep()}}return"none"!==r.remove?(f=e,m=r,g=(d=y).parentNode,h=f.dom,v=vc(f),m.block&&(v?g===h.getRoot()&&(m.list_block&&Uh(d,m.list_block)||W(oe(d.childNodes),function(e){af(f,v,e.nodeName.toLowerCase())?p?p.appendChild(e):(p=Vh(h,e,v),h.setAttribs(p,f.settings.forced_root_block_attrs)):p=0})):h.isBlock(d)&&!h.isBlock(g)&&($h(h,d,!1)||$h(h,d.firstChild,!0,!0)||d.insertBefore(h.create("br"),d.firstChild),$h(h,d,!0)||$h(h,d.lastChild,!1,!0)||d.appendChild(h.create("br")))),m.selector&&m.inline&&!Uh(m.inline,d)||h.remove(d,!0),Ih.removed()):Ih.keep()},Kh=function(t,e,n,r,o){return Wh(t,e,n,r,o).fold(C,function(e){return t.dom.rename(r,e),!0},k)},Xh=function(e,t,n,r,o,i,a,u){var s,c,l,f=e.dom;if(n){for(var d=n.parentNode,m=r.parentNode;m&&m!==d;m=m.parentNode){s=f.clone(m,!1);for(var p=0;p<t.length&&null!==(s=function(t,e,n,r){return Wh(t,e,n,r,r).fold(E(r),function(e){return t.dom.createFragment().appendChild(r),t.dom.rename(r,e)},E(null))}(e,t[p],u,s));p++);s&&(c&&s.appendChild(c),l=l||s,c=s)}!i||a.mixed&&f.isBlock(n)||(r=f.split(n,r)),c&&(o.parentNode.insertBefore(c,o),l.appendChild(o),a.inline&&Oh(f,a,0,c))}return r},Yh=function(s,c,l,e,f){var t,d=s.formatter.get(c),m=d[0],i=!0,a=s.dom,n=s.selection,u=function(e){var n,t,r,o,i,a,u=(t=e,r=c,o=l,i=f,W(mf((n=s).dom,t.parentNode).reverse(),function(e){var t;a||"_start"===e.id||"_end"===e.id||(t=zm(n,e,r,o,i))&&!1!==t.split&&(a=e)}),a);return Xh(s,d,u,e,e,!0,m,l)},p=function(e){var t,n;An(e)&&a.getContentEditable(e)&&(t=i,i="true"===a.getContentEditable(e),n=!0);var r=oe(e.childNodes);if(i&&!n)for(var o=0;o<d.length&&!Kh(s,d[o],l,e,e);o++);if(m.deep&&r.length){for(o=0;o<r.length;o++)p(r[o]);n&&(i=t)}},g=function(e){var t,n=a.get(e?"_start":"_end"),r=n[e?"firstChild":"lastChild"];return Jl(t=r)&&An(t)&&("_start"===t.id||"_end"===t.id)&&(r=r[e?"firstChild":"lastChild"]),In(r)&&0===r.data.length&&(r=e?n.previousSibling||n.nextSibling:n.nextSibling||n.previousSibling),a.remove(n,!0),r},r=function(e){var t,n,r=Of(s,e,d,e.collapsed);if(m.split){if(r=Cd(r),(t=jh(s,r,!0))!==(n=jh(s,r))){if(t=Hh(t,!0),n=Hh(n,!1),zh(a,t,n)){var o=U.from(t.firstChild).getOr(t);return u(qh(a,o,!0,"span",{id:"_start","data-mce-type":"bookmark"})),void g(!0)}if(zh(a,n,t)){o=U.from(n.lastChild).getOr(n);return u(qh(a,o,!1,"span",{id:"_end","data-mce-type":"bookmark"})),void g(!1)}t=Vh(a,t,"span",{id:"_start","data-mce-type":"bookmark"}),n=Vh(a,n,"span",{id:"_end","data-mce-type":"bookmark"});var i=a.createRng();i.setStartAfter(t),i.setEndBefore(n),Pf(a,i,function(e){W(e,function(e){Jl(e)||Jl(e.parentNode)||u(e)})}),u(t),u(n),t=g(!0),n=g()}else t=n=u(t);r.startContainer=t.parentNode?t.parentNode:t,r.startOffset=a.nodeIndex(t),r.endContainer=n.parentNode?n.parentNode:n,r.endOffset=a.nodeIndex(n)+1}Pf(a,r,function(e){W(e,function(t){p(t);W(["underline","line-through","overline"],function(e){An(t)&&s.dom.getStyle(t,"text-decoration")===e&&t.parentNode&&df(a,t.parentNode)===e&&Kh(s,{deep:!1,exact:!0,inline:"span",styles:{textDecoration:e}},null,t)})})})};if(e)tf(e)?((t=a.createRng()).setStartBefore(e),t.setEndAfter(e),r(t)):r(e);else if("false"!==a.getContentEditable(n.getNode()))n.isCollapsed()&&m.inline&&!Ff(s).length?xh(s,c,l,f):($f(n,!0,function(){qf(s,r)}),m.inline&&jm(s,c,l,n.getStart())&&nf(a,n,n.getRng()),s.nodeChanged());else{e=n.getNode();for(var o=0;o<d.length&&(!d[o].ceFalseOverride||!Kh(s,d[o],l,e,e));o++);}},Gh=kt.each,Jh=function(i,e,a,u){Gh(e,function(t){var r,e,n,o;Gh(i.dom.select(t.inline,u),function(e){Rh(e)&&Kh(i,t,a,e,t.exact?e:null)}),r=i.dom,n=u,(e=t).clear_child_styles&&(o=e.links?"*:not(a)":"*",Ah(r.select(o,n),function(n){Rh(n)&&Ah(e.styles,function(e,t){r.setStyle(n,t,"")})}))})},Qh=kt.each,Zh=ve,ev=function(E,k,_,r){var e,t,n,o,A=E.formatter.get(k),R=A[0],i=!r&&E.selection.isCollapsed(),a=E.dom,u=E.selection,T=function(n,e){var t;e=e||R,n&&(e.onformat&&e.onformat(n,e,_,r),Qh(e.styles,function(e,t){a.setStyle(n,t,sf(e,_))}),!e.styles||(t=a.getAttrib(n,"style"))&&a.setAttrib(n,"data-mce-style",t),Qh(e.attributes,function(e,t){a.setAttrib(n,t,sf(e,_))}),Qh(e.classes,function(e){e=sf(e,_),a.hasClass(n,e)||a.addClass(n,e)}))},m=function(e,t){var n=!1;return!!hf(R)&&(Qh(e,function(e){if(!("collapsed"in e&&e.collapsed!==i))return a.is(t,e.selector)&&!jl(t)?(T(t,e),!(n=!0)):void 0}),n)},s=function(S,e,t,c){var N=[],l=!0,f=R.inline||R.block,d=S.create(f);T(d),Pf(S,e,function(e){var u,s=function(e){var t=!1,n=l,r=e.nodeName.toLowerCase(),o=e.parentNode.nodeName.toLowerCase();if(An(e)&&S.getContentEditable(e)&&(n=l,l="true"===S.getContentEditable(e),t=!0),zn(e)&&!function(e,t,n,r){if(e.getParam("format_empty_lines",!1,"boolean")&&vf(t)){var o=ke(ke({},e.schema.getTextBlockElements()),{td:{},th:{},li:{},dt:{},dd:{},figcaption:{},caption:{},details:{},summary:{}}),i=dh(At.fromDom(n),function(e){return jl(e.dom)});return ve(o,r)&&$o(At.fromDom(n.parentNode),!1)&&!i}return!1}(E,R,e,o))return u=null,void(gf(R)&&S.remove(e));if(R.wrapper&&zm(E,e,k,_))u=null;else{if(l&&!t&&gf(R)&&!R.wrapper&&of(E,r)&&af(E,o,f)){var i=S.rename(e,f);return T(i),N.push(i),void(u=null)}if(hf(R)){var a=m(A,e);if(!Zh(R,"inline")||a)return void(u=null)}!l||t||!af(E,f,r)||!af(E,o,f)||!c&&3===e.nodeType&&1===e.nodeValue.length&&65279===e.nodeValue.charCodeAt(0)||jl(e)||Zh(R,"inline")&&S.isBlock(e)?(u=null,Qh(kt.grep(e.childNodes),s),t&&(l=n),u=null):(u||(u=S.clone(d,!1),e.parentNode.insertBefore(u,e),N.push(u)),u.appendChild(e))}};Qh(e,s)}),!0===R.links&&Qh(N,function(e){var t=function(e){"A"===e.nodeName&&T(e,R),Qh(kt.grep(e.childNodes),t)};t(e)}),Qh(N,function(e){var n,t,r,o,i,a,u,s,c,l,f,d,m,p,g,h,v,y,b,C,w=function(e){var n=!1;return Qh(e.childNodes,function(e){if((t=e)&&1===t.nodeType&&!Jl(t)&&!jl(t)&&!On(t))return n=e,!1;var t}),n},x=(n=0,Qh(e.childNodes,function(e){var t;D(t=e)&&In(t)&&0===t.length||Jl(e)||n++}),n);!(1<N.length)&&S.isBlock(e)||0!==x?(vf(R)||R.wrapper)&&(R.exact||1!==x||((C=w(y=e))&&!Jl(C)&&Fm(S,C,R)&&(b=S.clone(C,!1),T(b),S.replace(b,y,!0),S.remove(C,!0)),e=b||y),Jh(E,A,_,e),p=R,g=k,h=_,zm(m=E,(v=e).parentNode,g,h)&&Kh(m,p,h,v)||p.merge_with_parents&&m.dom.getParent(v.parentNode,function(e){if(zm(m,e,g,h))return Kh(m,p,h,v),!0}),c=S,f=_,d=e,(l=R).styles&&l.styles.backgroundColor&&Bh(d,Ph(c,"fontSize"),Lh(c,"backgroundColor",sf(l.styles.backgroundColor,f))),i=S,u=e,s=function(e){var t;1===e.nodeType&&e.parentNode&&1===e.parentNode.nodeType&&(t=df(i,e.parentNode),i.getStyle(e,"color")&&t?i.setStyle(e,"text-decoration",t):i.getStyle(e,"text-decoration")===t&&i.setStyle(e,"text-decoration",null))},(a=R).styles&&(a.styles.color||a.styles.textDecoration)&&(kt.walk(u,s,"childNodes"),s(u)),t=S,o=e,"sub"!==(r=R).inline&&"sup"!==r.inline||(Bh(o,Ph(t,"fontSize"),Lh(t,"fontSize","")),t.remove(t.select("sup"===r.inline?"sub":"sup",o),!0)),Oh(S,R,0,e)):S.remove(e,!0)})};if("false"!==a.getContentEditable(u.getNode())){R&&(r?tf(r)?m(A,r)||((e=a.createRng()).setStartBefore(r),e.setEndAfter(r),s(a,Of(E,e,A),0,!0)):s(a,r,0,!0):i&&vf(R)&&!Ff(E).length?function(e,t,n){var r,o=e.selection,i=o.getRng(),a=i.startOffset,u=i.startContainer.nodeValue,s=Hl(e.getBody(),o.getStart());s&&(r=hh(s));var c,l,f,d,m=/[^\s\u00a0\u00ad\u200b\ufeff]/;u&&0<a&&a<u.length&&m.test(u.charAt(a))&&m.test(u.charAt(a-1))?(c=o.getBookmark(),i.collapse(!0),l=Of(e,i,e.formatter.get(t)),l=Cd(l),e.formatter.apply(t,n,l),o.moveToBookmark(c)):(s&&r.nodeValue===mh||(f=e.getDoc(),d=vh(!0).dom,r=(s=f.importNode(d,!0)).firstChild,i.insertNode(s),a=1),e.formatter.apply(t,n,s),o.setCursorLocation(r,a))}(E,k,_):(t=u.getNode(),n=A[0],E.settings.forced_root_block||!n.defaultBlock||a.getParent(t,a.isBlock)||ev(E,n.defaultBlock),u.setRng(Yg(u.getRng())),$f(u,!0,function(e){qf(E,function(e,t){var n=t?e:Of(E,e,A);s(a,n)})}),nf(a,u,u.getRng()),E.nodeChanged()),o=E,_h(Eh[k],function(e){e(o)}))}else{r=u.getNode();for(var c=0,l=A.length;c<l;c++){var f=A[c];if(f.ceFalseOverride&&hf(f)&&a.is(r,f.selector))return void T(r,f)}}},tv=function(r,e,t,n){var o=ie(t.get()),i={},a={},u=H(mf(r.dom,e),function(e){return 1===e.nodeType&&!e.getAttribute("data-mce-bogus")});ue(n,function(e,n){kt.each(u,function(t){return r.formatter.matchNode(t,n,{},e.similar)?(-1===o.indexOf(n)&&(W(e.callbacks,function(e){e(!0,{node:t,format:n,parents:u})}),i[n]=e.callbacks),a[n]=e.callbacks,!1):!Im(r,t,n)&&void 0})});var s=nv(t.get(),a,e,u);t.set(ke(ke({},i),s))},nv=function(e,n,r,o){return de(e,function(e,t){return!!he(n,t)||(W(e,function(e){e(!1,{node:r,format:t,parents:o})}),!1)}).t},rv=function(e,o,i,a,t){var n,r,u,s,c,l,f,d;return null===o.get()&&(r=e,u=Ou({}),(n=o).set({}),r.on("NodeChange",function(e){tv(r,e.element,u,n.get())})),c=i,l=a,f=t,d=(s=o).get(),W(c.split(","),function(e){d[e]||(d[e]={similar:f,callbacks:[]}),d[e].callbacks.push(l)}),s.set(d),{unbind:function(){return t=i,n=a,r=(e=o).get(),W(t.split(","),function(e){r[e].callbacks=H(r[e].callbacks,function(e){return e!==n}),0===r[e].callbacks.length&&delete r[e]}),void e.set(r);var e,t,n,r}}},ov=function(e,t){var n=(t||document).createDocumentFragment();return W(e,function(e){n.appendChild(e.dom)}),At.fromDom(n)},iv=function(e,t,n){return{element:e,width:t,rows:n}},av=function(e,t){return{element:e,cells:t}},uv=function(e,t){var n=parseInt(Gn(e,t),10);return isNaN(n)?1:n},sv=function(e){return X(e,function(e,t){return t.cells.length>e?t.cells.length:e},0)},cv=function(e,t){for(var n=e.rows,r=0;r<n.length;r++)for(var o=n[r].cells,i=0;i<o.length;i++)if(Ot(o[i],t))return U.some({x:i,y:r});return U.none()},lv=function(e,t,n,r,o){for(var i=[],a=e.rows,u=n;u<=o;u++){var s=a[u].cells,c=t<r?s.slice(t,r+1):s.slice(r,t+1);i.push(av(a[u].element,c))}return i},fv=function(e){var o=iv(ss(e),0,[]);return W(Gu(e,"tr"),function(n,r){W(Gu(n,"td,th"),function(e,t){!function(e,t,n,r,o){for(var i=uv(o,"rowspan"),a=uv(o,"colspan"),u=e.rows,s=n;s<n+i;s++){u[s]||(u[s]=av(cs(r),[]));for(var c=t;c<t+a;c++){u[s].cells[c]=s===n&&c===t?o:ss(o)}}}(o,function(e,t,n){for(;r=t,o=n,((i=e.rows)[o]?i[o].cells:[])[r];)t++;var r,o,i;return t}(o,t,r),r,n,e)})}),iv(o.element,sv(o.rows),o.rows)},dv=function(e){return n=z((t=e).rows,function(e){var t=z(e.cells,function(e){var t=cs(e);return Qn(t,"colspan"),Qn(t,"rowspan"),t}),n=ss(e.element);return dn(n,t),n}),r=ss(t.element),o=At.fromTag("tbody"),dn(o,n),fn(r,o),r;var t,n,r,o},mv=function(l,e,t){return cv(l,e).bind(function(c){return cv(l,t).map(function(e){return t=l,r=e,o=(n=c).x,i=n.y,a=r.x,u=r.y,s=i<u?lv(t,o,i,a,u):lv(t,o,u,a,i),iv(t.element,sv(s),s);var t,n,r,o,i,a,u,s})})},pv=function(t,n){return Y(t,function(e){return"li"===Lt(e)&&jf(e,n)}).fold(E([]),function(e){return Y(t,function(e){return"ul"===Lt(e)||"ol"===Lt(e)}).map(function(e){var t=At.fromTag(Lt(e)),n=me(rr(e),function(e,t){return Ve(t,"list-style")});return Zn(t,n),[At.fromTag("li"),t]}).getOr([])})},gv=function(e,t){var n,r=At.fromDom(t.commonAncestorContainer),o=Dp(r,e),i=H(o,function(e){return to(e)||Zr(e)}),a=pv(o,t),u=i.concat(a.length?a:io(n=r)?$t(n).filter(oo).fold(E([]),function(e){return[n,e]}):oo(n)?[n]:[]);return z(u,ss)},hv=function(){return ov([])},vv=function(e,t){return n=At.fromDom(t.cloneContents()),r=gv(e,t),o=X(r,function(e,t){return fn(t,e),t},n),0<r.length?ov([o]):o;var n,r,o},yv=function(e,o){return t=e,n=o[0],Tr(n,"table",N(Ot,t)).bind(function(e){var t=o[0],n=o[o.length-1],r=fv(e);return mv(r,t,n).map(function(e){return ov([dv(e)])})}).getOrThunk(hv);var t,n},bv=function(e,t){var n,r,o=Mf(t,e);return 0<o.length?yv(e,o):(n=e,0<(r=t).length&&r[0].collapsed?hv():vv(n,r[0]))},Cv=function(e,t){return 0<=t&&t<e.length&&Zl(e.charAt(t))},wv=function(e,t){var n=po(e.innerText);return t?n.replace(/^[ \f\n\r\t\v]+/,""):n},xv=function(f){return U.from(f.selection.getRng()).map(function(e){var t=U.from(f.dom.getParent(e.commonAncestorContainer,f.dom.isBlock)),n=f.getBody(),r=t.map(function(e){return e.nodeName}).getOr("div").toLowerCase(),o=wt.browser.isIE()&&"pre"!==r,i=f.dom.add(n,r,{"data-mce-bogus":"all",style:"overflow: hidden; opacity: 0;"},e.cloneContents()),a=wv(i,o),u=po(i.textContent);if(f.dom.remove(i),Cv(u,0)||Cv(u,u.length-1)){var s=t.getOr(n),c=wv(s,o),l=c.indexOf(a);return-1===l?a:(Cv(c,l-1)?" ":"")+a+(Cv(c,l+a.length)?" ":"")}return a}).getOr("")},Sv=function(e,t,n){if(void 0===n&&(n={}),n.get=!0,n.format=t,n.selection=!0,(n=e.fire("BeforeGetContent",n)).isDefaultPrevented())return e.fire("GetContent",n),n.content;if("text"===n.format)return xv(e);n.getInner=!0;var r,o,i,a,u,s,c,l=(o=n,i=(r=e).selection.getRng(),a=r.dom.create("body"),u=r.selection.getSel(),s=Om(r,Lf(u)),(c=o.contextual?bv(At.fromDom(r.getBody()),s).dom:i.cloneContents())&&a.appendChild(c),r.selection.serializer.serialize(a,o));return"tree"===n.format?l:(n.content=e.selection.isCollapsed()?"":l,e.fire("GetContent",n),n.content)},Nv=function(e){return An(e)?e.outerHTML:In(e)?ci.encodeRaw(e.data,!1):Mn(e)?"\x3c!--"+e.data+"--\x3e":""},Ev=function(e,t,n){var r,o=function(e){var t,n=document.createElement("div"),r=document.createDocumentFragment();for(e&&(n.innerHTML=e);t=n.firstChild;)r.appendChild(t);return r}(t);e.hasChildNodes()&&n<e.childNodes.length?(r=e.childNodes[n]).parentNode.insertBefore(o,r):e.appendChild(o)},kv=function(e,o){var i=0;W(e,function(e){var t,n,r;0===e[0]?i++:1===e[0]?(Ev(o,e[1],i),i++):2===e[0]&&(n=i,(t=o).hasChildNodes()&&n<t.childNodes.length&&(r=t.childNodes[n]).parentNode.removeChild(r))})},_v=function(e,t){var p,g,n,h,v,c,y,l,r,o=z(oe(t.childNodes),Nv);return kv((g=e,n=(p=o).length+g.length+2,h=new Array(n),v=new Array(n),c=function(e,t,n,r,o){var i=l(e,t,n,r);if(null===i||i.start===t&&i.diag===t-r||i.end===e&&i.diag===e-n)for(var a=e,u=n;a<t||u<r;)a<t&&u<r&&p[a]===g[u]?(o.push([0,p[a]]),++a,++u):r-n<t-e?(o.push([2,p[a]]),++a):(o.push([1,g[u]]),++u);else{c(e,i.start,n,i.start-i.diag,o);for(var s=i.start;s<i.end;++s)o.push([0,p[s]]);c(i.end,t,i.end-i.diag,r,o)}},y=function(e,t,n,r){for(var o=e;o-t<r&&o<n&&p[o]===g[o-t];)++o;return{start:e,end:o,diag:t}},l=function(e,t,n,r){var o=t-e,i=r-n;if(0==o||0==i)return null;var a,u,s,c,l,f=o-i,d=i+o,m=(d%2==0?d:1+d)/2;for(h[1+m]=e,v[1+m]=t+1,a=0;a<=m;++a){for(u=-a;u<=a;u+=2){for(s=u+m,u===-a||u!==a&&h[s-1]<h[s+1]?h[s]=h[s+1]:h[s]=h[s-1]+1,l=(c=h[s])-e+n-u;c<t&&l<r&&p[c]===g[l];)h[s]=++c,++l;if(f%2!=0&&f-a<=u&&u<=f+a&&v[s-f]<=h[s])return y(v[s-f],u+e-n,t,r)}for(u=f-a;u<=f+a;u+=2){for(s=u+m-f,u===f-a||u!==f+a&&v[s+1]<=v[s-1]?v[s]=v[s+1]-1:v[s]=v[s-1],l=(c=v[s]-1)-e+n-u;e<=c&&n<=l&&p[c]===g[l];)v[s]=c--,l--;if(f%2==0&&-a<=u&&u<=a&&v[s]<=h[s+f])return y(v[s],u+e-n,t,r)}}},r=[],c(0,p.length,0,g.length,r),r),t),t},Av=Ou(U.none()),Rv=function(n){var e,t=(e=n.getBody(),H(z(oe(e.childNodes),Nv),function(e){return 0<e.length})),r=J(t,function(e){var t=ap(n.serializer,e);return 0<t.length?[t]:[]}),o=r.join("");return-1!==o.indexOf("</iframe>")?{type:"fragmented",fragments:r,content:"",bookmark:null,beforeBookmark:null}:{type:"complete",fragments:null,content:o,bookmark:null,beforeBookmark:null}},Tv=function(e,t,n){"fragmented"===t.type?_v(t.fragments,e.getBody()):e.setContent(t.content,{format:"raw"}),e.selection.moveToBookmark(n?t.beforeBookmark:t.bookmark)},Dv=function(e){return"fragmented"===e.type?e.fragments.join(""):e.content},Ov=function(e){var t=At.fromTag("body",Av.get().getOrThunk(function(){var e=document.implementation.createHTMLDocument("undo");return Av.set(U.some(e)),e}));return as(t,Dv(e)),W(Gu(t,"*[data-mce-bogus]"),gn),t.dom.innerHTML},Bv=function(e,t){return!(!e||!t)&&(r=t,Dv(e)===Dv(r)||(n=t,Ov(e)===Ov(n)));var n,r},Pv=function(e){return 0===e.get()},Lv=function(e,t,n){Pv(n)&&(e.typing=t)},Iv=function(e,t){e.typing&&(Lv(e,!1,t),e.add())},Mv=function(e){return e instanceof Km},Fv=function(e,t){sh(e.serializer.getNodeFilters(),e.serializer.getAttributeFilters(),t)},Uv=function(){return{type:"complete",fragments:[],content:"",bookmark:null,beforeBookmark:null}},zv=function(f){return{undoManager:{beforeChange:function(e,t){return n=f,r=t,void(Pv(e)&&r.set(U.some(mc(n.selection))));var n,r},addUndoLevel:function(e,t,n,r,o,i){return function(e,t,n,r,o,i,a){var u=Rv(e);if(i=i||{},i=kt.extend(i,u),!1===Pv(r)||e.removed)return null;var s=t.data[n.get()];if(e.fire("BeforeAddUndo",{level:i,lastLevel:s,originalEvent:a}).isDefaultPrevented())return null;if(s&&Bv(s,i))return null;t.data[n.get()]&&o.get().each(function(e){t.data[n.get()].beforeBookmark=e});var c=e.getParam("custom_undo_redo_levels",0,"number");if(c&&t.data.length>c){for(var l=0;l<t.data.length-1;l++)t.data[l]=t.data[l+1];t.data.length--,n.set(t.data.length)}i.bookmark=mc(e.selection),n.get()<t.data.length-1&&(t.data.length=n.get()+1),t.data.push(i),n.set(t.data.length-1);var f={level:i,lastLevel:s,originalEvent:a};return 0<n.get()?(e.setDirty(!0),e.fire("AddUndo",f),e.fire("change",f)):e.fire("AddUndo",f),i}(f,e,t,n,r,o,i)},undo:function(e,t,n){return r=f,i=t,a=n,(o=e).typing&&(o.add(),o.typing=!1,Lv(o,!1,i)),0<a.get()&&(a.set(a.get()-1),u=o.data[a.get()],Tv(r,u,!0),r.setDirty(!0),r.fire("Undo",{level:u})),u;var r,o,i,a,u},redo:function(e,t){return n=f,o=t,(r=e).get()<o.length-1&&(r.set(r.get()+1),i=o[r.get()],Tv(n,i,!1),n.setDirty(!0),n.fire("Redo",{level:i})),i;var n,r,o,i},clear:function(e,t){return n=f,o=t,(r=e).data=[],o.set(0),r.typing=!1,void n.fire("ClearUndos");var n,r,o},reset:function(e){return(t=e).clear(),void t.add();var t},hasUndo:function(e,t){return n=f,r=e,0<t.get()||r.typing&&r.data[0]&&!Bv(Rv(n),r.data[0]);var n,r},hasRedo:function(e,t){return n=e,t.get()<n.data.length-1&&!n.typing;var n},transact:function(e,t,n){return o=n,Iv(r=e,t),r.beforeChange(),r.ignore(o),r.add();var r,o},ignore:function(e,t){try{e.set(e.get()+1),t()}finally{e.set(e.get()-1)}},extra:function(e,t,n,r){return o=f,a=t,u=n,s=r,void((i=e).transact(u)&&(c=i.data[a.get()].bookmark,l=i.data[a.get()-1],Tv(o,l,!0),i.transact(s)&&(i.data[a.get()-1].beforeBookmark=c)));var o,i,a,u,s,c,l}},formatter:{match:function(e,t,n){return jm(f,e,t,n)},matchAll:function(e,t){return o=e,i=t,a=[],u={},n=(r=f).selection.getStart(),r.dom.getParent(n,function(e){for(var t=0;t<o.length;t++){var n=o[t];!u[n]&&zm(r,e,n,i)&&(u[n]=!0,a.push(n))}},r.dom.getRoot()),a;var r,o,i,a,u,n},matchNode:function(e,t,n,r){return zm(f,e,t,n,r)},canApply:function(e){return function(e,t){var n,r,o,i,a,u=e.formatter.get(t),s=e.dom;if(u)for(n=e.selection.getStart(),r=mf(s,n),i=u.length-1;0<=i;i--){if(!(a=u[i].selector)||u[i].defaultBlock)return!0;for(o=r.length-1;0<=o;o--)if(s.is(r[o],a))return!0}return!1}(f,e)},closest:function(e){return Hm(f,e)},apply:function(e,t,n){return ev(f,e,t,n)},remove:function(e,t,n,r){return Yh(f,e,t,n,r)},toggle:function(e,t,n){return o=e,i=t,a=n,u=(r=f).formatter.get(o),void(!jm(r,o,i,a)||"toggle"in u[0]&&!u[0].toggle?ev:Yh)(r,o,i,a);var r,o,i,a,u},formatChanged:function(e,t,n,r){return rv(f,e,t,n,r)}},editor:{getContent:function(e,t){return n=f,r=e,o=t,U.from(n.getBody()).fold(E("tree"===r.format?new Km("body",11):""),function(e){return sp(n,r,o,e)});var n,r,o},setContent:function(e,t){return fh(f,e,t)},insertContent:function(e,t){return ah(f,e,t)},addVisual:function(e){return t=e,a=(i=f).dom,n=D(t)?t:i.getBody(),R(i.hasVisual)&&(i.hasVisual=i.getParam("visual",!0,"boolean")),W(a.select("table,a",n),function(e){switch(e.nodeName){case"TABLE":var t=i.getParam("visual_table_class","mce-item-table","string"),n=a.getAttrib(e,"border");n&&"0"!==n||!i.hasVisual?a.removeClass(e,t):a.addClass(e,t);break;case"A":var r,o;a.getAttrib(e,"href")||(r=a.getAttrib(e,"name")||e.id,o=i.getParam("visual_anchor_class","mce-item-anchor","string"),r&&i.hasVisual?a.addClass(e,o):a.removeClass(e,o))}}),void i.fire("VisualAid",{element:t,hasVisual:i.hasVisual});var i,t,a,n}},selection:{getContent:function(e,t){return Sv(f,e,t)}},raw:{getModel:function(){return U.none()}}}},jv=function(i,a){var o=function(e){return _(e)?e:{}},e=m("Unimplemented feature for rtc");return{undoManager:{beforeChange:V,addUndoLevel:e,undo:function(){return a.undo(),Uv()},redo:function(){return a.redo(),Uv()},clear:e,reset:e,hasUndo:function(){return a.hasUndo()},hasRedo:function(){return a.hasRedo()},transact:function(e,t,n){return a.transact(n),Uv()},ignore:e,extra:e},formatter:{match:function(e,t,n){return a.matchFormat(e,o(t))},matchAll:e,matchNode:e,canApply:function(e){return a.canApplyFormat(e)},closest:function(e){return a.closestFormat(e)},apply:function(e,t,n){return a.applyFormat(e,o(t))},remove:function(e,t,n,r){return a.removeFormat(e,o(t))},toggle:function(e,t,n){return a.toggleFormat(e,o(t))},formatChanged:function(e,t,n,r){return a.formatChanged(t,n,r)}},editor:{getContent:function(e,t){if("html"!==t&&"tree"!==t)return zv(i).editor.getContent(e,t);var n=a.getContent(),r=Jm({inner:!0});return Fv(i,n),"tree"===t?n:r.serialize(n)},setContent:function(e,t){var n=Mv(e)?e:i.parser.parse(e,{isRootContent:!0,insert:!0});return a.setContent(n),e},insertContent:function(e,t){var n,r=(n=i,U.from(n.selection.getStart(!0)).map(function(e){return e.nodeName.toLowerCase()}).fold(function(){return{}},function(e){return{context:e}})),o=Mv(e)?e:i.parser.parse(e,ke(ke({},r),{insert:!0}));a.insertContent(o)},addVisual:function(e){}},selection:{getContent:function(e,t){if("html"!==e&&"tree"!==e)return zv(i).selection.getContent(e,t);var n=a.getSelectedContent(),r=Jm({});return Fv(i,n),"tree"===e?n:r.serialize(n)}},raw:{getModel:function(){return U.some(a.getRawModel())}}}},Hv=function(e){return he(e.plugins,"rtc")},Vv=function(e){return e.rtcInstance?e.rtcInstance:zv(e)},qv=function(e){var t=e.rtcInstance;if(t)return t;throw new Error("Failed to get RTC instance not yet initialized.")},$v=function(e,t){void 0===t&&(t={});var n,r,o=t.format?t.format:"html";return n=o,r=t,qv(e).selection.getContent(n,r)},Wv=function(e){return 0===e.dom.length?(pn(e),U.none()):U.some(e)},Kv=function(e,t,s,c){e.bind(function(u){return(c?sg:ug)(u.dom,c?u.dom.length:0),t.filter(Ut).map(function(e){return t=e,n=s,r=c,o=u.dom,i=t.dom,a=r?o.length:i.length,void(r?(cg(o,i,!1,!r),n.setStart(i,a)):(cg(i,o,!1,!r),n.setEnd(i,a)));var t,n,r,o,i,a})}).orThunk(function(){var e;return(e=c,t.filter(function(e){return od.isBookmarkNode(e.dom)}).bind(e?Kt:Wt).or(t).filter(Ut)).map(function(e){return r=c,void $t(n=e).each(function(e){var t=n.dom;r&&Qp(e,$s(t,0))?ug(t,0):!r&&Zp(e,$s(t,t.length))&&sg(t,t.length)});var n,r})})},Xv=function(e,t,n){void 0===n&&(n={});var r,o,i=(r=t,ke(ke({format:"html"},n),{set:!0,selection:!0,content:r}));i.no_events||!(i=e.fire("BeforeSetContent",i)).isDefaultPrevented()?(n.content=function(e,t){if("raw"===t.format)return t.content;var n=e.selection.getRng(),r=e.dom.getParent(n.commonAncestorContainer,e.dom.isBlock),o=r?{context:r.nodeName.toLowerCase()}:{},i=e.parser.parse(t.content,ke(ke({isRootContent:!0,forced_root_block:!1},o),t));return Jm({validate:e.validate},e.schema).serialize(i)}(e,i),function(e,t){var n=U.from(t.firstChild).map(At.fromDom),r=U.from(t.lastChild).map(At.fromDom);e.deleteContents(),e.insertNode(t);var o=n.bind(Wt).filter(Ut).bind(Wv),i=r.bind(Kt).filter(Ut).bind(Wv);Kv(o,n,e,!0),Kv(i,r,e,!1),e.collapse(!1)}(o=e.selection.getRng(),o.createContextualFragment(n.content)),e.selection.setRng(o),Xd(e,o),i.no_events||e.fire("SetContent",i)):e.fire("SetContent",i)},Yv=function(e,t,n){var r;e&&e.hasOwnProperty(t)&&(0===(r=H(e[t],function(e){return e!==n})).length?delete e[t]:e[t]=r)};var Gv=function(e){return!!e.select},Jv=function(e){return!(!e||!e.ownerDocument)&&Pt(At.fromDom(e.ownerDocument),At.fromDom(e))},Qv=function(u,s,e,c){var l,f,i,n,a,d,r=function(e,t){return a||(a={},d={},n.on("NodeChange",function(e){var n=e.element,r=i.getParents(n,null,i.getRoot()),o={};kt.each(a,function(e,n){kt.each(r,function(t){if(i.is(t,n))return d[n]||(kt.each(e,function(e){e(!0,{node:t,selector:n,parents:r})}),d[n]=e),o[n]=e,!1})}),kt.each(d,function(e,t){o[t]||(delete d[t],kt.each(e,function(e){e(!1,{node:n,selector:t,parents:r})}))})})),a[e]||(a[e]=[]),a[e].push(t),{unbind:function(){Yv(a,e,t),Yv(d,e,t)}}},t=function(e,t){return Xv(c,e,t)},o=function(e){var t=p();t.collapse(!!e),g(t)},m=function(){return s.getSelection?s.getSelection():s.document.selection},p=function(){var e,t,n,r=function(e,t,n){try{return t.compareBoundaryPoints(e,n)}catch(r){return-1}};if(!s)return null;var o=s.document;if(null==o)return null;if(c.bookmark!==undefined&&!1===Em(c)){var i=dm(c);if(i.isSome())return i.map(function(e){return Om(c,[e])[0]}).getOr(o.createRange())}try{(e=m())&&!_n(e.anchorNode)&&(t=0<e.rangeCount?e.getRangeAt(0):e.createRange?e.createRange():o.createRange(),t=Om(c,[t])[0])}catch(a){}return(t=t||(o.createRange?o.createRange():o.body.createTextRange())).setStart&&9===t.startContainer.nodeType&&t.collapsed&&(n=u.getRoot(),t.setStart(n,0),t.setEnd(n,0)),l&&f&&(0===r(t.START_TO_START,t,l)&&0===r(t.END_TO_END,t,l)?t=f:f=l=null),t},g=function(e,t){var n;if((r=e)&&(Gv(r)||Jv(r.startContainer)&&Jv(r.endContainer))){var r,o=Gv(e)?e:null;if(o){f=null;try{o.select()}catch(a){}}else{var i=m();if(e=c.fire("SetSelectionRange",{range:e,forward:t}).range,i){f=e;try{i.removeAllRanges(),i.addRange(e)}catch(a){}!1===t&&i.extend&&(i.collapse(e.endContainer,e.endOffset),i.extend(e.startContainer,e.startOffset)),l=0<i.rangeCount?i.getRangeAt(0):null}e.collapsed||e.startContainer!==e.endContainer||!i.setBaseAndExtent||wt.ie||e.endOffset-e.startOffset<2&&e.startContainer.hasChildNodes()&&(n=e.startContainer.childNodes[e.startOffset])&&"IMG"===n.tagName&&(i.setBaseAndExtent(e.startContainer,e.startOffset,e.endContainer,e.endOffset),i.anchorNode===e.startContainer&&i.focusNode===e.endContainer||i.setBaseAndExtent(n,0,n,1)),c.fire("AfterSetSelectionRange",{range:e,forward:t})}}},h=function(){var e=m(),t=null==e?void 0:e.anchorNode,n=null==e?void 0:e.focusNode;if(!e||!t||!n||_n(t)||_n(n))return!0;var r=u.createRng();r.setStart(t,e.anchorOffset),r.collapse(!0);var o=u.createRng();return o.setStart(n,e.focusOffset),o.collapse(!0),r.compareBoundaryPoints(r.START_TO_START,o)<=0},v={bookmarkManager:null,controlSelection:null,dom:i=u,win:s,serializer:e,editor:n=c,collapse:o,setCursorLocation:function(e,t){var n=u.createRng();e?(n.setStart(e,t),n.setEnd(e,t),g(n),o(!1)):(Hf(u,n,c.getBody(),!0),g(n))},getContent:function(e){return $v(c,e)},setContent:t,getBookmark:function(e,t){return y.getBookmark(e,t)},moveToBookmark:function(e){return y.moveToBookmark(e)},select:function(e,t){var r,n,o;return r=u,n=e,o=t,U.from(n).map(function(e){var t=r.nodeIndex(e),n=r.createRng();return n.setStart(e.parentNode,t),n.setEnd(e.parentNode,t+1),o&&(Hf(r,n,e,!0),Hf(r,n,e,!1)),n}).each(g),e},isCollapsed:function(){var e=p(),t=m();return!(!e||e.item)&&(e.compareEndPoints?0===e.compareEndPoints("StartToEnd",e):!t||e.collapsed)},isForward:h,setNode:function(e){return t(u.getOuterHTML(e)),e},getNode:function(){return function(e,t){var n,r;if(!t)return e;n=t.startContainer,r=t.endContainer;var o=t.startOffset,i=t.endOffset,a=t.commonAncestorContainer;return!t.collapsed&&(n===r&&i-o<2&&n.hasChildNodes()&&(a=n.childNodes[o]),3===n.nodeType&&3===r.nodeType&&(n=n.length===o?Dm(n.nextSibling,!0):n.parentNode,r=0===i?Dm(r.previousSibling,!1):r.parentNode,n&&n===r))?n:a&&3===a.nodeType?a.parentNode:a}(c.getBody(),p())},getSel:m,setRng:g,getRng:p,getStart:function(e){return Rm(c.getBody(),p(),e)},getEnd:function(e){return Tm(c.getBody(),p(),e)},getSelectedBlocks:function(e,t){return function(e,t,n,r){var o,i=[],a=e.getRoot();if(n=e.getParent(n||Rm(a,t,t.collapsed),e.isBlock),r=e.getParent(r||Tm(a,t,t.collapsed),e.isBlock),n&&n!==a&&i.push(n),n&&r&&n!==r)for(var u=new Xr(o=n,a);(o=u.next())&&o!==r;)e.isBlock(o)&&i.push(o);return r&&n!==r&&r!==a&&i.push(r),i}(u,p(),e,t)},normalize:function(){var e=p(),t=m();if(1<Lf(t).length||!Vf(c))return e;var n=yd(u,e);return n.each(function(e){g(e,h())}),n.getOr(e)},selectorChanged:function(e,t){return r(e,t),v},selectorChangedWithUnbind:r,getScrollContainer:function(){for(var e,t=u.getRoot();t&&"BODY"!==t.nodeName;){if(t.scrollHeight>t.clientHeight){e=t;break}t=t.parentNode}return e},scrollIntoView:function(e,t){return r=e,o=t,void((n=c).inline?$d:Kd)(n,r,o);var n,r,o},placeCaretAt:function(e,t){return g(fd(e,t,c.getDoc()))},getBoundingClientRect:function(){var e=p();return e.collapsed?$s.fromRangeStart(e).getClientRects()[0]:e.getBoundingClientRect()},destroy:function(){s=l=f=null,b.destroy()}},y=od(v),b=cd(v,c);return v.bookmarkManager=y,v.controlSelection=b,v},Zv=function(e,a,u){e.addNodeFilter("font",function(e){W(e,function(e){var t,n=a.parse(e.attr("style")),r=e.attr("color"),o=e.attr("face"),i=e.attr("size");r&&(n.color=r),o&&(n["font-family"]=o),i&&(n["font-size"]=u[parseInt(e.attr("size"),10)-1]),e.name="span",e.attr("style",a.serialize(n)),t=e,W(["color","face","size"],function(e){t.attr(e,null)})})})},ey=function(e,t){var n,r=xi();t.convert_fonts_to_spans&&Zv(e,r,kt.explode(t.font_size_legacy_values)),n=r,e.addNodeFilter("strike",function(e){W(e,function(e){var t=n.parse(e.attr("style"));t["text-decoration"]="line-through",e.name="span",e.attr("style",n.serialize(t))})})},ty=function(e){var t,n=decodeURIComponent(e).split(","),r=/data:([^;]+)/.exec(n[0]);return r&&(t=r[1]),{type:t,data:n[1]}},ny=function(e,t){var n;try{n=atob(t)}catch(Ok){return U.none()}for(var r=new Uint8Array(n.length),o=0;o<r.length;o++)r[o]=n.charCodeAt(o);return U.some(new Blob([r],{type:e}))},ry=function(e){return 0===e.indexOf("blob:")?(i=e,new Br(function(e,t){var n=function(){t("Cannot convert "+i+" to Blob. Resource might not exist or is inaccessible.")};try{var r=new XMLHttpRequest;r.open("GET",i,!0),r.responseType="blob",r.onload=function(){200===this.status?e(this.response):n()},r.onerror=n,r.send()}catch(o){n()}})):0===e.indexOf("data:")?(o=e,new Br(function(e){var t=ty(o),n=t.type,r=t.data;ny(n,r).fold(function(){return e(new Blob([]))},e)})):null;var i,o},oy=0,iy=function(e){return(e||"blobid")+oy++},ay=function(r,o,i,t){var e,n,a,u,s;0!==o.src.indexOf("blob:")?(n=(e=ty(o.src)).data,a=e.type,u=n,(s=r.getByData(u,a))?i({image:o,blobInfo:s}):ry(o.src).then(function(e){s=r.create(iy(),e,u),r.add(s),i({image:o,blobInfo:s})},function(e){t(e)})):(s=r.getByUri(o.src))?i({image:o,blobInfo:s}):ry(o.src).then(function(t){var n;n=t,new Br(function(e){var t=new FileReader;t.onloadend=function(){e(t.result)},t.readAsDataURL(n)}).then(function(e){u=ty(e).data,s=r.create(iy(),t,u),r.add(s),i({image:o,blobInfo:s})})},function(e){t(e)})};function uy(i,a){var u={};return{findAll:function(e,n){n=n||k;var t,r=H((t=e)?oe(t.getElementsByTagName("img")):[],function(e){var t=e.src;return!!wt.fileApi&&(!e.hasAttribute("data-mce-bogus")&&(!e.hasAttribute("data-mce-placeholder")&&(!(!t||t===wt.transparentSrc)&&(0===t.indexOf("blob:")?!i.isUploaded(t)&&n(e):0===t.indexOf("data:")&&n(e)))))}),o=z(r,function(n){if(u[n.src]!==undefined)return new Br(function(t){u[n.src].then(function(e){return"string"==typeof e?e:void t({image:n,blobInfo:e.blobInfo})})});var e=new Br(function(e,t){ay(a,n,e,t)}).then(function(e){return delete u[e.image.src],e})["catch"](function(e){return delete u[n.src],e});return u[n.src]=e});return Br.all(o)}}}var sy,cy,ly=function(e,t,n,r){(e.padd_empty_with_br||t.insert)&&n[r.name]?r.empty().append(new Km("br",1)).shortEnded=!0:r.empty().append(new Km("#text",3)).value=lo},fy=function(e,t){return e&&e.firstChild&&e.firstChild===e.lastChild&&e.firstChild.name===t},dy=function(r,e,t,n){return n.isEmpty(e,t,function(e){return t=e,(n=r.getElementRule(t.name))&&n.paddEmpty;var t,n})},my=function(e,o){var i=o.blob_cache,t=function(t){var e,n,r=t.attr("src");(e=t).attr("src")===wt.transparentSrc||e.attr("data-mce-placeholder")||t.attr("data-mce-bogus")||((n=/data:([^;]+);base64,([a-z0-9\+\/=]+)/i.exec(r))?U.some({type:n[1],data:decodeURIComponent(n[2])}):U.none()).filter(function(){return function(e,t){if(t.images_dataimg_filter){var n=new Image;return n.src=e.attr("src"),ue(e.attributes.map,function(e,t){n.setAttribute(t,e)}),t.images_dataimg_filter(n)}return!0}(t,o)}).bind(function(e){var t=e.type,n=e.data;return U.from(i.getByData(n,t)).orThunk(function(){return ny(t,n).map(function(e){var t=i.create(iy(),e,n);return i.add(t),t})})}).each(function(e){t.attr("src",e.blobUri())})};i&&e.addAttributeFilter("src",function(e){return W(e,t)})},py=function(e,g){var h=e.schema;g.remove_trailing_brs&&e.addNodeFilter("br",function(e,t,n){var r,o,i,a,u,s,c,l,f=e.length,d=kt.extend({},h.getBlockElements()),m=h.getNonEmptyElements(),p=h.getWhiteSpaceElements();for(d.body=1,r=0;r<f;r++)if(i=(o=e[r]).parent,d[o.parent.name]&&o===i.lastChild){for(u=o.prev;u;){if("span"!==(s=u.name)||"bookmark"!==u.attr("data-mce-type")){"br"===s&&(o=null);break}u=u.prev}o&&(o.remove(),dy(h,m,p,i)&&(c=h.getElementRule(i.name))&&(c.removeEmpty?i.remove():c.paddEmpty&&ly(g,n,d,i)))}else{for(a=o;i&&i.firstChild===a&&i.lastChild===a&&!d[(a=i).name];)i=i.parent;a===i&&!0!==g.padd_empty_with_br&&((l=new Km("#text",3)).value=lo,o.replace(l))}}),e.addAttributeFilter("href",function(e){var t,n,r=e.length;if(!g.allow_unsafe_link_target)for(;r--;){var o=e[r];"a"===o.name&&"_blank"===o.attr("target")&&o.attr("rel",(t=o.attr("rel"),n=t?kt.trim(t):"",/\b(noopener)\b/g.test(n)?n:n.split(" ").filter(function(e){return 0<e.length}).concat(["noopener"]).sort().join(" ")))}}),g.allow_html_in_named_anchor||e.addAttributeFilter("id,name",function(e){for(var t,n,r,o,i=e.length;i--;)if("a"===(o=e[i]).name&&o.firstChild&&!o.attr("href"))for(r=o.parent,t=o.lastChild;n=t.prev,r.insert(t,o),t=n;);}),g.fix_list_elements&&e.addNodeFilter("ul,ol",function(e){for(var t,n,r,o=e.length;o--;){"ul"!==(r=(n=e[o]).parent).name&&"ol"!==r.name||(n.prev&&"li"===n.prev.name?n.prev.append(n):((t=new Km("li",1)).attr("style","list-style-type: none"),n.wrap(t)))}}),g.validate&&h.getValidClasses()&&e.addAttributeFilter("class",function(e){for(var t,n,r,o,i,a,u,s=e.length,c=h.getValidClasses();s--;){for(n=(t=e[s]).attr("class").split(" "),i="",r=0;r<n.length;r++)o=n[r],u=!1,(a=c["*"])&&a[o]&&(u=!0),a=c[t.name],!u&&a&&a[o]&&(u=!0),u&&(i&&(i+=" "),i+=o);i.length||(i=null),t.attr("class",i)}}),my(e,g)},gy=kt.makeMap,hy=kt.each,vy=kt.explode,yy=kt.extend,by=function(A,R){void 0===R&&(R=Ci());var T={},D=[],O={},B={};(A=A||{}).validate=!("validate"in A)||A.validate,A.root_name=A.root_name||"body";var e,t,P=function(e){var t,n,r=e.name;r in T&&((n=O[r])?n.push(e):O[r]=[e]),t=D.length;for(;t--;)(r=D[t].name)in e.attributes.map&&((n=B[r])?n.push(e):B[r]=[e]);return e},n={schema:R,addAttributeFilter:function(e,n){hy(vy(e),function(e){for(var t=0;t<D.length;t++)if(D[t].name===e)return void D[t].callbacks.push(n);D.push({name:e,callbacks:[n]})})},getAttributeFilters:function(){return[].concat(D)},addNodeFilter:function(e,n){hy(vy(e),function(e){var t=T[e];t||(T[e]=t=[]),t.push(n)})},getNodeFilters:function(){var e=[];for(var t in T)T.hasOwnProperty(t)&&e.push({name:t,callbacks:T[t]});return e},filterNode:P,parse:function(e,u){var t,n,r,o,i,s,a,c,l=[];u=u||{},O={},B={};var f,d=yy(gy("script,style,head,html,body,title,meta,param"),R.getBlockElements()),m=R.getNonEmptyElements(),p=R.children,g=A.validate,h="forced_root_block"in u?u.forced_root_block:A.forced_root_block,v=!1===(f=h)?"":!0===f?"p":f,y=R.getWhiteSpaceElements(),b=/^[ \t\r\n]+/,C=/[ \t\r\n]+$/,w=/[ \t\r\n]+/g,x=/^[ \t\r\n]+$/,S=y.hasOwnProperty(u.context)||y.hasOwnProperty(A.root_name),N=function(e,t){var n,r=new Km(e,t);return e in T&&((n=O[e])?n.push(r):O[e]=[r]),r},E=function(e){for(var t,n,r,o=R.getBlockElements(),i=e.prev;i&&3===i.type;){if(0<(n=i.value.replace(C,"")).length)return void(i.value=n);if(t=i.next){if(3===t.type&&t.value.length){i=i.prev;continue}if(!o[t.name]&&"script"!==t.name&&"style"!==t.name){i=i.prev;continue}}r=i.prev,i.remove(),i=r}},k=ip({validate:g,allow_html_data_urls:A.allow_html_data_urls,allow_svg_data_urls:A.allow_svg_data_urls,allow_script_urls:A.allow_script_urls,allow_conditional_comments:A.allow_conditional_comments,preserve_cdata:A.preserve_cdata,self_closing_elements:function(e){var t,n={};for(t in e)"li"!==t&&"p"!==t&&(n[t]=e[t]);return n}(R.getSelfClosingElements()),cdata:function(e){c.append(N("#cdata",4)).value=e},text:function(e,t){var n,r,o;S||(e=e.replace(w," "),r=c.lastChild,o=d,r&&(o[r.name]||"br"===r.name)&&(e=e.replace(b,""))),0!==e.length&&((n=N("#text",3)).raw=!!t,c.append(n).value=e)},comment:function(e){c.append(N("#comment",8)).value=e},pi:function(e,t){c.append(N(e,7)).value=t,E(c)},doctype:function(e){c.append(N("#doctype",10)).value=e,E(c)},start:function(e,t,n){var r,o,i,a,u=g?R.getElementRule(e):{};if(u){for((r=N(u.outputName||e,1)).attributes=t,r.shortEnded=n,c.append(r),(a=p[c.name])&&p[r.name]&&!a[r.name]&&l.push(r),o=D.length;o--;)(i=D[o].name)in t.map&&((s=B[i])?s.push(r):B[i]=[r]);d[e]&&E(r),n||(c=r),!S&&y[e]&&(S=!0)}},end:function(e){var t,n,r,o,i,a=g?R.getElementRule(e):{};if(a){if(d[e]&&!S){if((t=c.firstChild)&&3===t.type)if(0<(n=t.value.replace(b,"")).length)t.value=n,t=t.next;else for(r=t.next,t.remove(),t=r;t&&3===t.type;)n=t.value,r=t.next,0!==n.length&&!x.test(n)||(t.remove(),t=r),t=r;if((t=c.lastChild)&&3===t.type)if(0<(n=t.value.replace(C,"")).length)t.value=n,t=t.prev;else for(r=t.prev,t.remove(),t=r;t&&3===t.type;)n=t.value,r=t.prev,0!==n.length&&!x.test(n)||(t.remove(),t=r),t=r}if(S&&y[e]&&(S=!1),a.removeEmpty&&dy(R,m,y,c))return o=c.parent,d[c.name]?c.empty().remove():c.unwrap(),void(c=o);a.paddEmpty&&(fy(i=c,"#text")&&i.firstChild.value===lo||dy(R,m,y,c))&&ly(A,u,d,c),c=c.parent}}},R),_=c=new Km(u.context||A.root_name,11);if(k.parse(e,u.format),g&&l.length&&(u.context?u.invalid=!0:function(e){for(var t,n,r,o,i,a,u,s,c,l,f=gy("tr,td,th,tbody,thead,tfoot,table"),d=R.getNonEmptyElements(),m=R.getWhiteSpaceElements(),p=R.getTextBlockElements(),g=R.getSpecialElements(),h=0;h<e.length;h++)if((t=e[h]).parent&&!t.fixed)if(p[t.name]&&"li"===t.parent.name){for(c=t.next;c&&p[c.name];)c.name="li",c.fixed=!0,t.parent.insert(c,t.parent),c=c.next;t.unwrap(t)}else{for(r=[t],n=t.parent;n&&!R.isValidChild(n.name,t.name)&&!f[n.name];n=n.parent)r.push(n);if(n&&1<r.length){for(r.reverse(),o=i=P(r[0].clone()),s=0;s<r.length-1;s++){for(R.isValidChild(i.name,r[s].name)?(a=P(r[s].clone()),i.append(a)):a=i,u=r[s].firstChild;u&&u!==r[s+1];)l=u.next,a.append(u),u=l;i=a}dy(R,d,m,o)?n.insert(t,r[0],!0):(n.insert(o,r[0],!0),n.insert(t,o)),n=r[0],(dy(R,d,m,n)||fy(n,"br"))&&n.empty().remove()}else if(t.parent){if("li"===t.name){if((c=t.prev)&&("ul"===c.name||"ol"===c.name)){c.append(t);continue}if((c=t.next)&&("ul"===c.name||"ol"===c.name)){c.insert(t,c.firstChild,!0);continue}t.wrap(P(new Km("ul",1)));continue}R.isValidChild(t.parent.name,"div")&&R.isValidChild("div",t.name)?t.wrap(P(new Km("div",1))):g[t.name]?t.empty().remove():t.unwrap()}}}(l)),v&&("body"===_.name||u.isRootContent)&&function(){var e,t,n=_.firstChild,r=function(e){e&&((n=e.firstChild)&&3===n.type&&(n.value=n.value.replace(b,"")),(n=e.lastChild)&&3===n.type&&(n.value=n.value.replace(C,"")))};if(R.isValidChild(_.name,v.toLowerCase())){for(;n;)e=n.next,3===n.type||1===n.type&&"p"!==n.name&&!d[n.name]&&!n.attr("data-mce-type")?(t||((t=N(v,1)).attr(A.forced_root_block_attrs),_.insert(t,n)),t.append(n)):(r(t),t=null),n=e;r(t)}}(),!u.invalid){for(a in O)if(O.hasOwnProperty(a)){for(s=T[a],o=(t=O[a]).length;o--;)t[o].parent||t.splice(o,1);for(n=0,r=s.length;n<r;n++)s[n](t,a,u)}for(n=0,r=D.length;n<r;n++)if((s=D[n]).name in B){for(o=(t=B[s.name]).length;o--;)t[o].parent||t.splice(o,1);for(o=0,i=s.callbacks.length;o<i;o++)s.callbacks[o](t,s.name,u)}}return _}};return py(n,A),e=n,(t=A).inline_styles&&ey(e,t),n},Cy=function(e,t,n){return o=n,(r=e)&&r.hasEventListeners("PreProcess")&&!o.no_events?function(e,t,n){var r,o,i=e.dom;t=t.cloneNode(!0);var a,u,s=document.implementation;return s.createHTMLDocument&&(r=s.createHTMLDocument(""),kt.each("BODY"===t.nodeName?t.childNodes:[t],function(e){r.body.appendChild(r.importNode(e,!0))}),t="BODY"!==t.nodeName?r.body.firstChild:r.body,o=i.doc,i.doc=r),a=e,u=ke(ke({},n),{node:t}),a.fire("PreProcess",u),o&&(i.doc=o),t}(e,t,n):t;var r,o},wy=function(e,t,n){-1===kt.inArray(t,n)&&(e.addAttributeFilter(n,function(e,t){for(var n=e.length;n--;)e[n].attr(t,null)}),t.push(n))},xy=function(e,t,n,r,o){var i,a,u,s,c,l,f=(i=r,Jm(t,n).serialize(i));return a=e,s=f,(u=o).no_events||!a?s:(c=a,l=ke(ke({},u),{content:s}),c.fire("PostProcess",l).content)},Sy=function(y,b){var e=["data-mce-selected"],C=b&&b.dom?b.dom:Eu.DOM,w=b&&b.schema?b.schema:Ci(y);y.entity_encoding=y.entity_encoding||"named",y.remove_trailing_brs=!("remove_trailing_brs"in y)||y.remove_trailing_brs;var t,s,c,x=by(y,w);s=y,c=C,(t=x).addAttributeFilter("data-mce-tabindex",function(e,t){for(var n,r=e.length;r--;)(n=e[r]).attr("tabindex",n.attr("data-mce-tabindex")),n.attr(t,null)}),t.addAttributeFilter("src,href,style",function(e,t){for(var n,r,o=e.length,i="data-mce-"+t,a=s.url_converter,u=s.url_converter_scope;o--;)(r=(n=e[o]).attr(i))!==undefined?(n.attr(t,0<r.length?r:null),n.attr(i,null)):(r=n.attr(t),"style"===t?r=c.serializeStyle(c.parseStyle(r),n.name):a&&(r=a.call(u,r,t,n.name)),n.attr(t,0<r.length?r:null))}),t.addAttributeFilter("class",function(e){for(var t,n,r=e.length;r--;)(n=(t=e[r]).attr("class"))&&(n=t.attr("class").replace(/(?:^|\s)mce-item-\w+(?!\S)/g,""),t.attr("class",0<n.length?n:null))}),t.addAttributeFilter("data-mce-type",function(e,t,n){for(var r,o=e.length;o--;){"bookmark"!==(r=e[o]).attr("data-mce-type")||n.cleanup||(U.from(r.firstChild).exists(function(e){return!mo(e.value)})?r.unwrap():r.remove())}}),t.addNodeFilter("noscript",function(e){for(var t,n=e.length;n--;)(t=e[n].firstChild)&&(t.value=ci.decode(t.value))}),t.addNodeFilter("script,style",function(e,t){for(var n,r,o,i=e.length,a=function(e){return e.replace(/(<!--\[CDATA\[|\]\]-->)/g,"\n").replace(/^[\r\n]*|[\r\n]*$/g,"").replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi,"").replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g,"")};i--;)r=(n=e[i]).firstChild?n.firstChild.value:"","script"===t?((o=n.attr("type"))&&n.attr("type","mce-no/type"===o?null:o.replace(/^mce\-/,"")),"xhtml"===s.element_format&&0<r.length&&(n.firstChild.value="// <![CDATA[\n"+a(r)+"\n// ]]>")):"xhtml"===s.element_format&&0<r.length&&(n.firstChild.value="\x3c!--\n"+a(r)+"\n--\x3e")}),t.addNodeFilter("#comment",function(e){for(var t,n=e.length;n--;)t=e[n],s.preserve_cdata&&0===t.value.indexOf("[CDATA[")?(t.name="#cdata",t.type=4,t.value=c.decode(t.value.replace(/^\[CDATA\[|\]\]$/g,""))):0===t.value.indexOf("mce:protected ")&&(t.name="#text",t.type=3,t.raw=!0,t.value=unescape(t.value).substr(14))}),t.addNodeFilter("xml:namespace,input",function(e,t){for(var n,r=e.length;r--;)7===(n=e[r]).type?n.remove():1===n.type&&("input"!==t||n.attr("type")||n.attr("type","text"))}),t.addAttributeFilter("data-mce-type",function(e){W(e,function(e){"format-caret"===e.attr("data-mce-type")&&(e.isEmpty(t.schema.getNonEmptyElements())?e.remove():e.unwrap())})}),t.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style,data-mce-selected,data-mce-expando,data-mce-type,data-mce-resize,data-mce-placeholder",function(e,t){for(var n=e.length;n--;)e[n].attr(t,null)});return{schema:w,addNodeFilter:x.addNodeFilter,addAttributeFilter:x.addAttributeFilter,serialize:function(e,t){void 0===t&&(t={});var n,r,o,i,a,u,s,c,l,f,d,m,p=ke({format:"html"},t),g=Cy(b,e,p),h=(n=C,r=g,i=po((o=p).getInner?r.innerHTML:n.getOuterHTML(r)),o.selection||so(At.fromDom(r))?i:kt.trim(i)),v=(a=x,u=h,d=(s=p).selection?ke({forced_root_block:!1},s):s,m=a.parse(u,d),l=function(e){return e&&"br"===e.name},f=m.lastChild,!l(f)||l(c=f.prev)&&(f.remove(),c.remove()),m);return"tree"===p.format?v:xy(b,y,w,v,p)},addRules:function(e){w.addValidElements(e)},setRules:function(e){w.setValidElements(e)},addTempAttr:N(wy,x,e),getTempAttrs:function(){return e},getNodeFilters:x.getNodeFilters,getAttributeFilters:x.getAttributeFilters}},Ny=function(e,t){var n=Sy(e,t);return{schema:n.schema,addNodeFilter:n.addNodeFilter,addAttributeFilter:n.addAttributeFilter,serialize:n.serialize,addRules:n.addRules,setRules:n.setRules,addTempAttr:n.addTempAttr,getTempAttrs:n.getTempAttrs,getNodeFilters:n.getNodeFilters,getAttributeFilters:n.getAttributeFilters}},Ey=function(e,t){void 0===t&&(t={});var n,r,o=t.format?t.format:"html";return n=t,r=o,Vv(e).editor.getContent(n,r)},ky=function(e,t,n){return void 0===n&&(n={}),r=t,o=n,Vv(e).editor.setContent(r,o);var r,o},_y=Eu.DOM,Ay=function(e){return U.from(e).each(function(e){return e.destroy()})},Ry=function(e){var t,n,r,o,i;e.removed||(t=e._selectionOverrides,n=e.editorUpload,r=e.getBody(),o=e.getElement(),r&&e.save({is_removing:!0}),e.removed=!0,e.unbindAllNativeEvents(),e.hasHiddenInput&&o&&_y.remove(o.nextSibling),e.fire("remove"),e.editorManager.remove(e),!e.inline&&r&&(i=e,_y.setStyle(i.id,"display",i.orgDisplay)),e.fire("detach"),_y.remove(e.getContainer()),Ay(t),Ay(n),e.destroy())},Ty=function(e,t){var n,r,o,i=e.selection,a=e.dom;e.destroyed||(t||e.removed?(t||(e.editorManager.off("beforeunload",e._beforeUnload),e.theme&&e.theme.destroy&&e.theme.destroy(),Ay(i),Ay(a)),(r=(n=e).formElement)&&(r._mceOldSubmit&&(r.submit=r._mceOldSubmit,r._mceOldSubmit=null),_y.unbind(r,"submit reset",n.formEventDelegate)),(o=e).contentAreaContainer=o.formElement=o.container=o.editorContainer=null,o.bodyElement=o.contentDocument=o.contentWindow=null,o.iframeElement=o.targetElm=null,o.selection&&(o.selection=o.selection.win=o.selection.dom=o.selection.dom.doc=null),e.destroyed=!0):e.remove())},Dy=Object.prototype.hasOwnProperty,Oy=(sy=function(e,t){return _(e)&&_(t)?Oy(e,t):t},function(){for(var e=new Array(arguments.length),t=0;t<e.length;t++)e[t]=arguments[t];if(0===e.length)throw new Error("Can't merge zero objects");for(var n={},r=0;r<e.length;r++){var o=e[r];for(var i in o)Dy.call(o,i)&&(n[i]=sy(n[i],o[i]))}return n}),By=dt().deviceType,Py=By.isTouch(),Ly=By.isPhone(),Iy=By.isTablet(),My=["lists","autolink","autosave"],Fy={table_grid:!1,object_resizing:!1,resize:!1},Uy=function(e){var t=S(e)?e.join(" "):e,n=z(q(t)?t.split(" "):[],$e);return H(n,function(e){return 0<e.length})},zy=function(n,e){var t,r,o=de(e,function(e,t){return M(n,t)});return t=o.t,r=o.f,{sections:E(t),settings:E(r)}},jy=function(e,t){return e.sections().hasOwnProperty(t)},Hy=function(e,t){return ge(e,"toolbar_mode").orThunk(function(){return ge(e,"toolbar_drawer").map(function(e){return!1===e?"wrap":e})}).getOr(t)},Vy=function(e,t,n,r){return e&&(a=i="mobile",u=(o=t).sections(),jy(o,i)&&u[i].theme===a)?H(r,N(M,My)):e&&jy(t,"mobile")?r:n;var o,i,a,u},qy=function(e,t,n,r){var o,i,a,u=Uy(n.forced_plugins),s=Uy(r.plugins),c=jy(o=t,i="mobile")?o.sections()[i]:{},l=c.plugins?Uy(c.plugins):s,f=Vy(e,t,s,l),d=(a=f,[].concat(Uy(u)).concat(Uy(a)));if(wt.browser.isIE()&&M(d,"rtc"))throw new Error("RTC plugin is not supported on IE 11.");return kt.extend(r,{plugins:d.join(" ")})},$y=function(e,t,n,r,o){var i,a,u,s,c,l,f,d=e?{mobile:(i=o.mobile||{},a=t,u={resize:!1,toolbar_mode:Hy(i,"scrolling"),toolbar_sticky:!1},ke(ke(ke({},Fy),u),a?{menubar:!1}:{}))}:{},m=zy(["mobile"],Oy(d,o)),p=kt.extend(n,r,m.settings(),(f=m,e&&jy(f,"mobile")?function(e,t,n){void 0===n&&(n={});var r=e.sections(),o=r.hasOwnProperty(t)?r[t]:{};return kt.extend({},n,o)}(m,"mobile"):{}),{validate:!0,external_plugins:(s=r,c=m.settings(),l=c.external_plugins?c.external_plugins:{},s&&s.external_plugins?kt.extend({},s.external_plugins,l):l)});return qy(e,m,r,p)},Wy=function(e,t,n,r,o){var i,a,u,s,c=(i=n,a=Py,u=e,s={id:t,theme:"silver",toolbar_mode:Hy(o,"floating"),plugins:"",document_base_url:i,add_form_submit_trigger:!0,submit_patch:!0,add_unload_trigger:!0,convert_urls:!0,relative_urls:!0,remove_script_host:!0,object_resizing:!0,doctype:"<!DOCTYPE html>",visual:!0,font_size_legacy_values:"xx-small,small,medium,large,x-large,xx-large,300%",forced_root_block:"p",hidden_input:!0,inline_styles:!0,convert_fonts_to_spans:!0,indent:!0,indent_before:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,summary,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",indent_after:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,summary,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",entity_encoding:"named",url_converter:u.convertURL,url_converter_scope:u},ke(ke({},s),a?Fy:{}));return $y(Ly||Iy,Ly,c,r,o)},Ky=function(e,t,n){return U.from(t.settings[n]).filter(e)},Xy=function(e,t,n,r){var o,i,a,u=t in e.settings?e.settings[t]:n;return"hash"===r?(a={},"string"==typeof(i=u)?W(0<i.indexOf("=")?i.split(/[;,](?![^=;,]*(?:[;,]|$))/):i.split(","),function(e){var t=e.split("=");1<t.length?a[kt.trim(t[0])]=kt.trim(t[1]):a[kt.trim(t[0])]=kt.trim(t[0])}):a=i,a):"string"===r?Ky(q,e,t).getOr(n):"number"===r?Ky(O,e,t).getOr(n):"boolean"===r?Ky(A,e,t).getOr(n):"object"===r?Ky(_,e,t).getOr(n):"array"===r?Ky(S,e,t).getOr(n):"string[]"===r?Ky((o=q,function(e){return S(e)&&Q(e,o)}),e,t).getOr(n):"function"===r?Ky(T,e,t).getOr(n):u},Yy=(cy={},{add:function(e,t){cy[e]=t},get:function(e){return cy[e]?cy[e]:{icons:{}}},has:function(e){return he(cy,e)}}),Gy=function(e,t){return t.dom[e]},Jy=function(e,t){return parseInt(er(t,e),10)},Qy=N(Gy,"clientWidth"),Zy=N(Gy,"clientHeight"),eb=N(Jy,"margin-top"),tb=N(Jy,"margin-left"),nb=function(e,t,n){var r,o,i,a,u,s,c,l,f,d,m,p=At.fromDom(e.getBody()),g=e.inline?p:(r=p,At.fromDom(Vt(r).dom.documentElement)),h=(o=e.inline,a=t,u=n,s=(i=g).dom.getBoundingClientRect(),{x:a-(o?s.left+i.dom.clientLeft+tb(i):0),y:u-(o?s.top+i.dom.clientTop+eb(i):0)});return l=h.x,f=h.y,d=Qy(c=g),m=Zy(c),0<=l&&0<=f&&l<=d&&f<=m},rb=function(e){var t,n=e.inline?e.getBody():e.getContentAreaContainer();return t=n,U.from(t).map(At.fromDom).map(hn).getOr(!1)};function ob(n){var t,o=[],i=function(){var e,t=n.theme;return t&&t.getNotificationManagerImpl?t.getNotificationManagerImpl():{open:e=function(){throw new Error("Theme did not provide a NotificationManager implementation.")},close:e,reposition:e,getArgs:e}},a=function(){return U.from(o[0])},u=function(){0<o.length&&i().reposition(o)},s=function(t){G(o,function(e){return e===t}).each(function(e){o.splice(e,1)})},r=function(r,e){if(void 0===e&&(e=!0),!n.removed&&rb(n))return e&&n.fire("BeforeOpenNotification",{notification:r}),Y(o,function(e){return t=i().getArgs(e),n=r,!(t.type!==n.type||t.text!==n.text||t.progressBar||t.timeout||n.progressBar||n.timeout);var t,n}).getOrThunk(function(){n.editorManager.setActive(n);var e,t=i().open(r,function(){s(t),u(),a().fold(function(){return n.focus()},function(e){return At.fromDom(e.getEl()).dom.focus()})});return e=t,o.push(e),u(),n.fire("OpenNotification",ke({},t)),t})};return(t=n).on("SkinLoaded",function(){var e=t.getParam("service_message");e&&r({text:e,type:"warning",timeout:0},!1)}),t.on("ResizeEditor ResizeWindow NodeChange",function(){qr.requestAnimationFrame(u)}),t.on("remove",function(){W(o.slice(),function(e){i().close(e)})}),{open:r,close:function(){a().each(function(e){i().close(e),s(e),u()})},getNotifications:function(){return o}}}var ib=Uu.PluginManager,ab=Uu.ThemeManager;var ub=function(n){var r=[],o=function(){var e,t=n.theme;return t&&t.getWindowManagerImpl?t.getWindowManagerImpl():{open:e=function(){throw new Error("Theme did not provide a WindowManager implementation.")},openUrl:e,alert:e,confirm:e,close:e,getParams:e,setParams:e}},i=function(e,t){return function(){return t?t.apply(e,arguments):undefined}},a=function(e){var t;r.push(e),t=e,n.fire("OpenWindow",{dialog:t})},u=function(t){var e;e=t,n.fire("CloseWindow",{dialog:e}),0===(r=H(r,function(e){return e!==t})).length&&n.focus()},s=function(e){n.editorManager.setActive(n),fm(n);var t=e();return a(t),t};return n.on("remove",function(){W(r,function(e){o().close(e)})}),{open:function(e,t){return s(function(){return o().open(e,t,u)})},openUrl:function(e){return s(function(){return o().openUrl(e,u)})},alert:function(e,t,n){o().alert(e,i(n||this,t))},confirm:function(e,t,n){o().confirm(e,i(n||this,t))},close:function(){U.from(r[r.length-1]).each(function(e){o().close(e),u(e)})}}},sb=function(e,t){e.notificationManager.open({type:"error",text:t})},cb=function(e,t){e._skinLoaded?sb(e,t):e.on("SkinLoaded",function(){sb(e,t)})},lb=function(e,t,n){var r,o;r=t,o={message:n},e.fire(r,o),console.error(n)},fb=function(e,t,n){return n?"Failed to load "+e+": "+n+" from url "+t:"Failed to load "+e+" url: "+t},db=function(e,t,n){lb(e,"PluginLoadError",fb("plugin",t,n))},mb=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=window.console;r&&(r.error?r.error.apply(r,_e([e],t)):r.log.apply(r,_e([e],t)))},pb=function(t){var e,n,r=(n=(e=t).getParam("content_css"),q(n)?z(n.split(","),$e):S(n)?n:!1===n||e.inline?[]:["default"]),o=t.editorManager.baseURL+"/skins/content",i="content"+t.editorManager.suffix+".css",a=!0===t.inline;return z(r,function(e){return/^[a-z0-9\-]+$/i.test(e)&&!a?o+"/"+e+"/"+i:t.documentBaseURI.toAbsolute(e)})};function gb(u,s){var o={},n=function(e,r,o,t){var i=new XMLHttpRequest;i.open("POST",s.url),i.withCredentials=s.credentials,i.upload.onprogress=function(e){t(e.loaded/e.total*100)},i.onerror=function(){o("Image upload failed due to a XHR Transport error. Code: "+i.status)},i.onload=function(){var e,t,n;i.status<200||300<=i.status?o("HTTP Error: "+i.status):(e=JSON.parse(i.responseText))&&"string"==typeof e.location?r((t=s.basePath,n=e.location,t?t.replace(/\/$/,"")+"/"+n.replace(/^\//,""):n)):o("Invalid JSON: "+i.responseText)};var n=new FormData;n.append("file",e.blob(),e.filename()),i.send(n)},c=function(e,t){return{url:t,blobInfo:e,status:!0}},l=function(e,t,n){return{url:"",blobInfo:e,status:!1,error:{message:t,options:n}}},f=function(e,t){kt.each(o[e],function(e){e(t)}),delete o[e]},r=function(e,r){return e=kt.grep(e,function(e){return!u.isUploaded(e.blobUri())}),Br.all(kt.map(e,function(e){return u.isPending(e.blobUri())?(t=e.blobUri(),new Br(function(e){o[t]=o[t]||[],o[t].push(e)})):(i=e,n=s.handler,a=r,u.markPending(i.blobUri()),new Br(function(r){var t;try{var o=function(){t&&t.close()};n(i,function(e){o(),u.markUploaded(i.blobUri(),e),f(i.blobUri(),c(i,e)),r(c(i,e))},function(e,t){var n=t||{};o(),u.removeFailed(i.blobUri()),f(i.blobUri(),l(i,e,n)),r(l(i,e,n))},function(e){e<0||100<e||(t=t||a()).progressBar.value(e)})}catch(e){r(l(i,e.message,{}))}}));var i,n,a,t}))};return!1===T(s.handler)&&(s.handler=n),{upload:function(e,t){return s.url||s.handler!==n?r(e,t):new Br(function(e){e([])})}}}var hb=0,vb=function(e){return e+hb+++(t=function(){return Math.round(4294967295*Math.random()).toString(36)},"s"+(new Date).getTime().toString(36)+t()+t()+t());var t},yb=function(s){var n,i,e,t,r,o,a,u,c,l=(n=[],i=function(e){if(!e.blob||!e.base64)throw new Error("blob and base64 representations of the image are required for BlobInfo to be created");var t=e.id||vb("blobid"),n=e.name||t,r=e.blob;return{id:E(t),name:E(n),filename:E(e.filename||n+"."+({"image/jpeg":"jpg","image/jpg":"jpg","image/gif":"gif","image/png":"png","image/apng":"apng","image/avif":"avif","image/svg+xml":"svg","image/webp":"webp","image/bmp":"bmp","image/tiff":"tiff"}[r.type.toLowerCase()]||"dat")),blob:E(r),base64:E(e.base64),blobUri:E(e.blobUri||URL.createObjectURL(r)),uri:E(e.uri)}},{create:function(e,t,n,r,o){if(q(e))return i({id:e,name:r,filename:o,blob:t,base64:n});if(_(e))return i(e);throw new Error("Unknown input type")},add:function(e){t(e.id())||n.push(e)},get:t=function(t){return e(function(e){return e.id()===t})},getByUri:function(t){return e(function(e){return e.blobUri()===t})},getByData:function(t,n){return e(function(e){return e.base64()===t&&e.blob().type===n})},findFirst:e=function(e){return Y(n,e).getOrUndefined()},removeByUri:function(t){n=H(n,function(e){return e.blobUri()!==t||(URL.revokeObjectURL(e.blobUri()),!1)})},destroy:function(){W(n,function(e){URL.revokeObjectURL(e.blobUri())}),n=[]}}),f=(a={},u=function(e,t){return{status:e,resultUri:t}},{hasBlobUri:c=function(e){return e in a},getResultUri:function(e){var t=a[e];return t?t.resultUri:null},isPending:function(e){return!!c(e)&&1===a[e].status},isUploaded:function(e){return!!c(e)&&2===a[e].status},markPending:function(e){a[e]=u(1,null)},markUploaded:function(e,t){a[e]=u(2,t)},removeFailed:function(e){delete a[e]},destroy:function(){a={}}}),d=[],m=function(n){var r=Ou(null);n.on("change AddUndo",function(e){r.set(ke({},e.level))});return{fireIfChanged:function(){var t=n.undoManager.data;re(t).filter(function(e){return!Bv(r.get(),e)}).each(function(e){n.setDirty(!0),n.fire("change",{level:e,lastLevel:te(t,t.length-2).getOrNull()})})}}}(s),p=function(t){return function(e){return s.selection?t(e):[]}},g=function(e,t,n){for(var r=0;-1!==(r=e.indexOf(t,r))&&(e=e.substring(0,r)+n+e.substr(r+t.length),r+=n.length-t.length+1),-1!==r;);return e},h=function(e,t,n){var r='src="'+n+'"'+(n===wt.transparentSrc?' data-mce-placeholder="1"':"");return e=g(e,'src="'+t+'"',r),e=g(e,'data-mce-src="'+t+'"','data-mce-src="'+n+'"')},v=function(t,n){W(s.undoManager.data,function(e){"fragmented"===e.type?e.fragments=z(e.fragments,function(e){return h(e,t,n)}):e.content=h(e.content,t,n)})},y=function(){return s.notificationManager.open({text:s.translate("Image uploading..."),type:"info",timeout:-1,progressBar:!0})},b=function(e,t){var n,r=s.convertURL(t,"src");v(e.src,t),s.$(e).attr({src:s.getParam("images_reuse_filename",!1,"boolean")?(n=t)+(-1===n.indexOf("?")?"?":"&")+(new Date).getTime():t,"data-mce-src":r})},C=function(n){return r=r||gb(f,{url:s.getParam("images_upload_url","","string"),basePath:s.getParam("images_upload_base_path","","string"),credentials:s.getParam("images_upload_credentials",!1,"boolean"),handler:s.getParam("images_upload_handler",null,"function")}),S().then(p(function(u){var e=z(u,function(e){return e.blobInfo});return r.upload(e,y).then(p(function(e){var a=[],t=z(e,function(e,t){var n,r,o=u[t].blobInfo,i=u[t].image;return e.status&&s.getParam("images_replace_blob_uris",!0,"boolean")?(l.removeByUri(i.src),b(i,e.url)):e.error&&(e.error.options.remove&&(v(i.getAttribute("src"),wt.transparentSrc),a.push(i)),n=s,r=e.error.message,cb(n,Iu.translate(["Failed to upload image: {0}",r]))),{element:i,status:e.status,uploadUri:e.url,blobInfo:o}});return 0<t.length&&m.fireIfChanged(),0<a.length&&(Hv(s)?console.error("Removing images on failed uploads is currently unsupported for RTC"):s.undoManager.transact(function(){W(a,function(e){s.dom.remove(e),l.removeByUri(e.src)})})),n&&n(t),t}))}))},w=function(e){if(bc(s))return C(e)},x=function(t){return!1!==Q(d,function(e){return e(t)})&&(0!==t.getAttribute("src").indexOf("data:")||s.getParam("images_dataimg_filter",k,"function")(t))},S=function(){return(o=o||uy(f,l)).findAll(s.getBody(),x).then(p(function(e){return e=H(e,function(e){return"string"!=typeof e||(cb(s,e),!1)}),W(e,function(e){v(e.image.src,e.blobInfo.blobUri()),e.image.src=e.blobInfo.blobUri(),e.image.removeAttribute("data-mce-src")}),e}))},N=function(e){return e.replace(/src="(blob:[^"]+)"/g,function(e,n){var t=f.getResultUri(n);if(t)return'src="'+t+'"';var r=l.getByUri(n);return(r=r||X(s.editorManager.get(),function(e,t){return e||t.editorUpload&&t.editorUpload.blobCache.getByUri(n)},null))?'src="data:'+r.blob().type+";base64,"+r.base64()+'"':e})};return s.on("SetContent",function(){(bc(s)?w:S)()}),s.on("RawSaveContent",function(e){e.content=N(e.content)}),s.on("GetContent",function(e){e.source_view||"raw"===e.format||"tree"===e.format||(e.content=N(e.content))}),s.on("PostRender",function(){s.parser.addNodeFilter("img",function(e){W(e,function(e){var t,n=e.attr("src");l.getByUri(n)||(t=f.getResultUri(n))&&e.attr("src",t)})})}),{blobCache:l,addFilter:function(e){d.push(e)},uploadImages:C,uploadImagesAuto:w,scanForImages:S,destroy:function(){l.destroy(),f.destroy(),o=r=null}}};function bb(e){var r,t,n={},o=function(e,t){e&&("string"!=typeof e?kt.each(e,function(e,t){o(t,e)}):(S(t)||(t=[t]),kt.each(t,function(e){"undefined"==typeof e.deep&&(e.deep=!e.selector),"undefined"==typeof e.split&&(e.split=!e.selector||e.inline),"undefined"==typeof e.remove&&e.selector&&!e.inline&&(e.remove="none"),e.selector&&e.inline&&(e.mixed=!0,e.block_expand=!0),"string"==typeof e.classes&&(e.classes=e.classes.split(/\s+/))}),n[e]=t))};return o((r=e.dom,t={valigntop:[{selector:"td,th",styles:{verticalAlign:"top"}}],valignmiddle:[{selector:"td,th",styles:{verticalAlign:"middle"}}],valignbottom:[{selector:"td,th",styles:{verticalAlign:"bottom"}}],alignleft:[{selector:"figure.image",collapsed:!1,classes:"align-left",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"left"},inherit:!1,preview:!1,defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"left"},preview:"font-family font-size"}],aligncenter:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"center"},inherit:!1,preview:"font-family font-size",defaultBlock:"div"},{selector:"figure.image",collapsed:!1,classes:"align-center",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"img",collapsed:!1,styles:{display:"block",marginLeft:"auto",marginRight:"auto"},preview:!1},{selector:"table",collapsed:!1,styles:{marginLeft:"auto",marginRight:"auto"},preview:"font-family font-size"}],alignright:[{selector:"figure.image",collapsed:!1,classes:"align-right",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"right"},inherit:!1,preview:"font-family font-size",defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"right"},preview:"font-family font-size"}],alignjustify:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"justify"},inherit:!1,defaultBlock:"div",preview:"font-family font-size"}],bold:[{inline:"strong",remove:"all",preserve_attributes:["class","style"]},{inline:"span",styles:{fontWeight:"bold"}},{inline:"b",remove:"all",preserve_attributes:["class","style"]}],italic:[{inline:"em",remove:"all",preserve_attributes:["class","style"]},{inline:"span",styles:{fontStyle:"italic"}},{inline:"i",remove:"all",preserve_attributes:["class","style"]}],underline:[{inline:"span",styles:{textDecoration:"underline"},exact:!0},{inline:"u",remove:"all",preserve_attributes:["class","style"]}],strikethrough:[{inline:"span",styles:{textDecoration:"line-through"},exact:!0},{inline:"strike",remove:"all",preserve_attributes:["class","style"]},{inline:"s",remove:"all",preserve_attributes:["class","style"]}],forecolor:{inline:"span",styles:{color:"%value"},links:!0,remove_similar:!0,clear_child_styles:!0},hilitecolor:{inline:"span",styles:{backgroundColor:"%value"},links:!0,remove_similar:!0,clear_child_styles:!0},fontname:{inline:"span",toggle:!1,styles:{fontFamily:"%value"},clear_child_styles:!0},fontsize:{inline:"span",toggle:!1,styles:{fontSize:"%value"},clear_child_styles:!0},lineheight:{selector:"h1,h2,h3,h4,h5,h6,p,li,td,th,div",defaultBlock:"p",styles:{lineHeight:"%value"}},fontsize_class:{inline:"span",attributes:{"class":"%value"}},blockquote:{block:"blockquote",wrapper:!0,remove:"all"},subscript:{inline:"sub"},superscript:{inline:"sup"},code:{inline:"code"},link:{inline:"a",selector:"a",remove:"all",split:!0,deep:!0,onmatch:function(e,t,n){return An(e)&&e.hasAttribute("href")},onformat:function(n,e,t){kt.each(t,function(e,t){r.setAttrib(n,t,e)})}},removeformat:[{selector:"b,strong,em,i,font,u,strike,s,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins",remove:"all",split:!0,expand:!1,block_expand:!0,deep:!0},{selector:"span",attributes:["style","class"],remove:"empty",split:!0,expand:!1,deep:!0},{selector:"*",attributes:["style","class"],split:!1,expand:!1,deep:!0}]},kt.each("p h1 h2 h3 h4 h5 h6 div address pre div dt dd samp".split(/\s/),function(e){t[e]={block:e,remove:"all"}}),t)),o(e.getParam("formats")),{get:function(e){return e?n[e]:n},has:function(e){return he(n,e)},register:o,unregister:function(e){return e&&n[e]&&delete n[e],n}}}var Cb,wb,xb=kt.each,Sb=Eu.DOM,Nb=function(e,t){var n,o,r,m=t&&t.schema||Ci({}),p=function(e){o="string"==typeof e?{name:e,classes:[],attrs:{}}:e;var t,n,r=Sb.create(o.name);return t=r,(n=o).classes.length&&Sb.addClass(t,n.classes.join(" ")),Sb.setAttribs(t,n.attrs),r},g=function(n,e,t){var r,o,i,a,u,s,c,l=0<e.length&&e[0],f=l&&l.name,d=(a=f,u="string"!=typeof(i=n)?i.nodeName.toLowerCase():i,s=m.getElementRule(u),!(!(c=s&&s.parentsRequired)||!c.length)&&(a&&-1!==kt.inArray(c,a)?a:c[0]));if(d)f===d?(o=e[0],e=e.slice(1)):o=d;else if(l)o=e[0],e=e.slice(1);else if(!t)return n;return o&&(r=p(o)).appendChild(n),t&&(r||(r=Sb.create("div")).appendChild(n),kt.each(t,function(e){var t=p(e);r.insertBefore(t,n)})),g(r,e,o&&o.siblings)};return e&&e.length?(o=e[0],n=p(o),(r=Sb.create("div")).appendChild(g(n,e.slice(1),o.siblings)),r):""},Eb=function(e){var t,a={classes:[],attrs:{}};return"*"!==(e=a.selector=kt.trim(e))&&(t=e.replace(/(?:([#\.]|::?)([\w\-]+)|(\[)([^\]]+)\]?)/g,function(e,t,n,r,o){switch(t){case"#":a.attrs.id=n;break;case".":a.classes.push(n);break;case":":-1!==kt.inArray("checked disabled enabled read-only required".split(" "),n)&&(a.attrs[n]=n)}var i;return"["!==r||(i=o.match(/([\w\-]+)(?:\=\"([^\"]+))?/))&&(a.attrs[i[1]]=i[2]),""})),a.name=t||"div",a},kb=function(n,e){var t,r,o,i="",a=(o=n.getParam("preview_styles","font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow"),q(o)?o:"");if(""===a)return"";var u=function(e){return e.replace(/%(\w+)/g,"")};if("string"==typeof e){if(!(e=n.formatter.get(e)))return;e=e[0]}if("preview"in e){var s=ge(e,"preview");if(s.is(!1))return"";a=s.getOr(a)}t=e.block||e.inline||"span";var c,l=(c=e.selector)&&"string"==typeof c?(c=(c=c.split(/\s*,\s*/)[0]).replace(/\s*(~\+|~|\+|>)\s*/g,"$1"),kt.map(c.split(/(?:>|\s+(?![^\[\]]+\]))/),function(e){var t=kt.map(e.split(/(?:~\+|~|\+)/),Eb),n=t.pop();return t.length&&(n.siblings=t),n}).reverse()):[],f=l.length?(l[0].name||(l[0].name=t),t=e.selector,Nb(l,n)):Nb([t],n),d=Sb.select(t,f)[0]||f.firstChild;return xb(e.styles,function(e,t){var n=u(e);n&&Sb.setStyle(d,t,n)}),xb(e.attributes,function(e,t){var n=u(e);n&&Sb.setAttrib(d,t,n)}),xb(e.classes,function(e){var t=u(e);Sb.hasClass(d,t)||Sb.addClass(d,t)}),n.fire("PreviewFormats"),Sb.setStyles(f,{position:"absolute",left:-65535}),n.getBody().appendChild(f),r=Sb.getStyle(n.getBody(),"fontSize",!0),r=/px$/.test(r)?parseInt(r,10):0,xb(a.split(" "),function(e){var t=Sb.getStyle(d,e,!0);if(!("background-color"===e&&/transparent|rgba\s*\([^)]+,\s*0\)/.test(t)&&(t=Sb.getStyle(n.getBody(),e,!0),"#ffffff"===Sb.toHex(t).toLowerCase())||"color"===e&&"#000000"===Sb.toHex(t).toLowerCase())){if("font-size"===e&&/em|%$/.test(t)){if(0===r)return;t=parseFloat(t)/(/%$/.test(t)?100:1)*r+"px"}"border"===e&&t&&(i+="padding:0 2px;"),i+=e+":"+t+";"}}),n.fire("AfterPreviewFormats"),Sb.remove(f),i},_b=function(s){var e=bb(s),u=Ou(null);return function(e){e.addShortcut("meta+b","","Bold"),e.addShortcut("meta+i","","Italic"),e.addShortcut("meta+u","","Underline");for(var t=1;t<=6;t++)e.addShortcut("access+"+t,"",["FormatBlock",!1,"h"+t]);e.addShortcut("access+7","",["FormatBlock",!1,"p"]),e.addShortcut("access+8","",["FormatBlock",!1,"div"]),e.addShortcut("access+9","",["FormatBlock",!1,"address"])}(s),Sh(s),{get:e.get,has:e.has,register:e.register,unregister:e.unregister,apply:function(e,t,n){var r,o,i;r=e,o=t,i=n,qv(s).formatter.apply(r,o,i)},remove:function(e,t,n,r){var o,i,a,u;o=e,i=t,a=n,u=r,qv(s).formatter.remove(o,i,a,u)},toggle:function(e,t,n){var r,o,i;r=e,o=t,i=n,qv(s).formatter.toggle(r,o,i)},match:function(e,t,n){return r=e,o=t,i=n,qv(s).formatter.match(r,o,i);var r,o,i},closest:function(e){return t=e,qv(s).formatter.closest(t);var t},matchAll:function(e,t){return n=e,r=t,qv(s).formatter.matchAll(n,r);var n,r},matchNode:function(e,t,n,r){return o=e,i=t,a=n,u=r,qv(s).formatter.matchNode(o,i,a,u);var o,i,a,u},canApply:function(e){return t=e,qv(s).formatter.canApply(t);var t},formatChanged:function(e,t,n){return r=u,o=e,i=t,void 0===(a=n)&&(a=!1),qv(s).formatter.formatChanged(r,o,i,a);var r,o,i,a},getCssText:N(kb,s)}},Ab=function(n,r,o){var i=Ou(!1),a=function(e){Lv(r,!1,o),r.add({},e)};n.on("init",function(){r.add()}),n.on("BeforeExecCommand",function(e){var t=e.command.toLowerCase();"undo"!==t&&"redo"!==t&&"mcerepaint"!==t&&(Iv(r,o),r.beforeChange())}),n.on("ExecCommand",function(e){var t=e.command.toLowerCase();"undo"!==t&&"redo"!==t&&"mcerepaint"!==t&&a(e)}),n.on("ObjectResizeStart cut",function(){r.beforeChange()}),n.on("SaveContent ObjectResized blur",a),n.on("dragend",a),n.on("keyup",function(e){var t=e.keyCode;e.isDefaultPrevented()||((33<=t&&t<=36||37<=t&&t<=40||45===t||e.ctrlKey)&&(a(),n.nodeChanged()),46!==t&&8!==t||n.nodeChanged(),i.get()&&r.typing&&!1===Bv(Rv(n),r.data[0])&&(!1===n.isDirty()&&(n.setDirty(!0),n.fire("change",{level:r.data[0],lastLevel:null})),n.fire("TypingUndo"),i.set(!1),n.nodeChanged()))}),n.on("keydown",function(e){var t,n=e.keyCode;e.isDefaultPrevented()||(33<=n&&n<=36||37<=n&&n<=40||45===n?r.typing&&a(e):(t=e.ctrlKey&&!e.altKey||e.metaKey,!(n<16||20<n)||224===n||91===n||r.typing||t||(r.beforeChange(),Lv(r,!0,o),r.add({},e),i.set(!0))))}),n.on("mousedown",function(e){r.typing&&a(e)});n.on("input",function(e){var t,n;e.inputType&&("insertReplacementText"===e.inputType||"insertText"===(n=e).inputType&&null===n.data||("insertFromPaste"===(t=e).inputType||"insertFromDrop"===t.inputType))&&a(e)}),n.on("AddUndo Undo Redo ClearUndos",function(e){e.isDefaultPrevented()||n.nodeChanged()})},Rb=function(s){var e,c=Ou(U.none()),l=Ou(0),f=Ou(0),d={data:[],typing:!1,beforeChange:function(){var e,t;e=l,t=c,qv(s).undoManager.beforeChange(e,t)},add:function(e,t){return n=d,r=f,o=l,i=c,a=e,u=t,qv(s).undoManager.addUndoLevel(n,r,o,i,a,u);var n,r,o,i,a,u},undo:function(){return e=d,t=l,n=f,qv(s).undoManager.undo(e,t,n);var e,t,n},redo:function(){return e=s,t=f,n=d.data,qv(e).undoManager.redo(t,n);var e,t,n},clear:function(){var e,t;e=d,t=f,qv(s).undoManager.clear(e,t)},reset:function(){var e;e=d,qv(s).undoManager.reset(e)},hasUndo:function(){return e=d,t=f,qv(s).undoManager.hasUndo(e,t);var e,t},hasRedo:function(){return e=d,t=f,qv(s).undoManager.hasRedo(e,t);var e,t},transact:function(e){return t=d,n=l,r=e,qv(s).undoManager.transact(t,n,r);var t,n,r},ignore:function(e){var t,n;t=l,n=e,qv(s).undoManager.ignore(t,n)},extra:function(e,t){var n,r,o,i;n=d,r=f,o=e,i=t,qv(s).undoManager.extra(n,r,o,i)}};return Hv(s)||Ab(s,d,l),(e=s).addShortcut("meta+z","","Undo"),e.addShortcut("meta+y,meta+shift+z","","Redo"),d},Tb=[9,27,ud.HOME,ud.END,19,20,44,144,145,33,34,45,16,17,18,91,92,93,ud.DOWN,ud.UP,ud.LEFT,ud.RIGHT].concat(wt.browser.isFirefox()?[224]:[]),Db="data-mce-placeholder",Ob=function(e){return"keydown"===e.type||"keyup"===e.type},Bb=function(e){var t=e.keyCode;return t===ud.BACKSPACE||t===ud.DELETE},Pb=function(a){var e,u=a.dom,s=vc(a),c=(e=a).getParam("placeholder",pc.getAttrib(e.getElement(),"placeholder"),"string"),l=function(e,t){var n,r,o,i;!function(e){if(Ob(e)){var t=e.keyCode;return!Bb(e)&&(ud.metaKeyPressed(e)||e.altKey||112<=t&&t<=123||M(Tb,t))}return!1}(e)&&(n=a.getBody(),r=!(Ob(o=e)&&!(Bb(o)||"keyup"===o.type&&229===o.keyCode))&&function(e,t,n){if($o(At.fromDom(t),!1)){var r=""===n,o=t.firstElementChild;return!o||!e.getStyle(t.firstElementChild,"padding-left")&&!e.getStyle(t.firstElementChild,"padding-right")&&(r?!e.isBlock(o):n===o.nodeName.toLowerCase())}return!1}(u,n,s),""!==u.getAttrib(n,Db)===r&&!t||(u.setAttrib(n,Db,r?c:null),u.setAttrib(n,"aria-placeholder",r?c:null),i=r,a.fire("PlaceholderToggle",{state:i}),a.on(r?"keydown":"keyup",l),a.off(r?"keyup":"keydown",l)))};c&&a.on("init",function(e){l(e,!0),a.on("change SetContent ExecCommand",l),a.on("paste",function(e){return qr.setEditorTimeout(a,function(){return l(e)})})})},Lb=/[\u0591-\u07FF\uFB1D-\uFDFF\uFE70-\uFEFC]/,Ib=function(e,t){return Tt(At.fromDom(t),e.getParam("inline_boundaries_selector","a[href],code,.mce-annotation","string"))},Mb=function(e){return"rtl"===Eu.DOM.getStyle(e,"direction",!0)||(t=e.textContent,Lb.test(t));var t},Fb=function(e,t,n){var r,o,i,a=(r=e,o=t,i=n,H(Eu.DOM.getParents(i.container(),"*",o),r));return U.from(a[a.length-1])},Ub=function(e,t){if(!t)return t;var n=t.container(),r=t.offset();return e?yo(n)?In(n.nextSibling)?$s(n.nextSibling,0):$s.after(n):wo(t)?$s(n,r+1):t:yo(n)?In(n.previousSibling)?$s(n.previousSibling,n.previousSibling.data.length):$s.before(n):xo(t)?$s(n,r-1):t},zb=N(Ub,!0),jb=N(Ub,!1),Hb=function(e,t){return Pt(e,t)?Ar(t,function(e){return ro(e)||io(e)},(n=e,function(e){return Ot(n,At.fromDom(e.dom.parentNode))})):U.none();var n},Vb=function(e){var t,n,r;e.dom.isEmpty(e.getBody())&&(e.setContent(""),n=(t=e).getBody(),r=n.firstChild&&t.dom.isBlock(n.firstChild)?n.firstChild:n,t.selection.setCursorLocation(r,0))},qb=function(e,t){return{from:e,to:t}},$b=function(e,t){var n=At.fromDom(e),r=At.fromDom(t.container());return Hb(n,r).map(function(e){return{block:e,position:t}})},Wb=function(o,i,e){var t=$b(o,$s.fromRangeStart(e)),n=t.bind(function(e){return Ol(i,o,e.position).bind(function(e){return $b(o,e).map(function(e){return t=o,n=i,zn((r=e).position.getNode())&&!1===$o(r.block)?Ll(!1,r.block.dom).bind(function(e){return e.isEqual(r.position)?Ol(n,t,e).bind(function(e){return $b(t,e)}):U.some(r)}).getOr(r):r;var t,n,r})})});return ds(t,n,qb).filter(function(e){return!1===Ot((r=e).from.block,r.to.block)&&$t((n=e).from.block).bind(function(t){return $t(n.to.block).filter(function(e){return Ot(t,e)})}).isSome()&&(!1===Vn((t=e).from.block.dom)&&!1===Vn(t.to.block.dom));var t,n,r})},Kb=function(e){var t,n=(t=Gt(e),G(t,eo).fold(function(){return t},function(e){return t.slice(0,e)}));return W(n,pn),n},Xb=function(e,t){var n=Dp(t,e);return Y(n.reverse(),function(e){return $o(e)}).each(pn)},Yb=function(e,t,n,r){if($o(n))return _p(n),Fl(n.dom);0===H(Xt(r),function(e){return!$o(e)}).length&&$o(t)&&sn(r,At.fromTag("br"));var o=Ml(n.dom,$s.before(r.dom));return W(Kb(t),function(e){sn(r,e)}),Xb(e,t),o},Gb=function(e,t,n){if($o(n))return pn(n),$o(t)&&_p(t),Fl(t.dom);var r=Ul(n.dom);return W(Kb(t),function(e){fn(n,e)}),Xb(e,t),r},Jb=function(e,t){return Pt(t,e)?(n=Dp(e,t),U.from(n[n.length-1])):U.none();var n},Qb=function(e,t){Ll(e,t.dom).map(function(e){return e.getNode()}).map(At.fromDom).filter(no).each(pn)},Zb=function(e,t,n){return Qb(!0,t),Qb(!1,n),Jb(t,n).fold(N(Gb,e,t,n),N(Yb,e,t,n))},eC=function(e,t,n,r){return t?Zb(e,r,n):Zb(e,n,r)},tC=function(t,n){var e,r,o,i=At.fromDom(t.getBody()),a=(e=i.dom,r=n,((o=t.selection.getRng()).collapsed?Wb(e,r,o):U.none()).bind(function(e){return eC(i,n,e.from.block,e.to.block)}));return a.each(function(e){t.selection.setRng(e.toRange())}),a.isSome()},nC=function(e,t){var n=At.fromDom(t),r=N(Ot,e);return _r(n,uo,r).isSome()},rC=function(e,t){var n,r,o=Ml(e.dom,$s.fromRangeStart(t)).isNone(),i=Il(e.dom,$s.fromRangeEnd(t)).isNone();return!(nC(n=e,(r=t).startContainer)||nC(n,r.endContainer))&&o&&i},oC=function(e){var n,r,o,t,i=At.fromDom(e.getBody()),a=e.selection.getRng();return rC(i,a)?((t=e).setContent(""),t.selection.setCursorLocation(),!0):(n=i,r=e.selection,o=r.getRng(),ds(Hb(n,At.fromDom(o.startContainer)),Hb(n,At.fromDom(o.endContainer)),function(e,t){return!1===Ot(e,t)&&(o.deleteContents(),eC(n,!0,e,t).each(function(e){r.setRng(e.toRange())}),!0)}).getOr(!1))},iC=function(e,t){return!e.selection.isCollapsed()&&oC(e)},aC=Hn,uC=Vn,sC=function(e,t,n,r,o){return U.from(t._selectionOverrides.showCaret(e,n,r,o))},cC=function(e,t){var n,r;return e.fire("BeforeObjectSelected",{target:t}).isDefaultPrevented()?U.none():U.some(((r=(n=t).ownerDocument.createRange()).selectNode(n),r))},lC=function(e,t,n){var r=ll(1,e.getBody(),t),o=$s.fromRangeStart(r),i=o.getNode();if(Wc(i))return sC(1,e,i,!o.isAtEnd(),!1);var a=o.getNode(!0);if(Wc(a))return sC(1,e,a,!1,!1);var u=e.dom.getParent(o.getNode(),function(e){return uC(e)||aC(e)});return Wc(u)?sC(1,e,u,!1,n):U.none()},fC=function(e,t,n){return t.collapsed?lC(e,t,n).getOr(t):t},dC=function(e){return Np(e)||Cp(e)},mC=function(e){return Ep(e)||wp(e)},pC=function(n,r,e,t,o,i){var a,u;return sC(t,n,i.getNode(!o),o,!0).each(function(e){var t;r.collapsed?(t=r.cloneRange(),o?t.setEnd(e.startContainer,e.startOffset):t.setStart(e.endContainer,e.endOffset),t.deleteContents()):r.deleteContents(),n.selection.setRng(e)}),a=n.dom,In(u=e)&&0===u.data.length&&a.remove(u),!0},gC=function(e,t){var n=e.selection.getRng();if(!In(n.commonAncestorContainer))return!1;var r=t?Vs.Forwards:Vs.Backwards,o=_l(e.getBody()),i=N(pl,t?o.next:o.prev),a=t?dC:mC,u=dl(r,e.getBody(),n),s=Ub(t,i(u));if(!s||!gl(u,s))return!1;if(a(s))return pC(e,n,u.getNode(),r,t,s);var c=i(s);return!!(c&&a(c)&&gl(s,c))&&pC(e,n,u.getNode(),r,t,c)},hC=Cr([{remove:["element"]},{moveToElement:["element"]},{moveToPosition:["position"]}]),vC=function(e,t,n,r){var o=r.getNode(!1===t);return Hb(At.fromDom(e),At.fromDom(n.getNode())).map(function(e){return $o(e)?hC.remove(e.dom):hC.moveToElement(o)}).orThunk(function(){return U.some(hC.moveToElement(o))})},yC=function(u,s,c){return Ol(s,u,c).bind(function(e){return a=e.getNode(),uo(At.fromDom(a))||io(At.fromDom(a))?U.none():(t=u,o=e,i=function(e){return to(At.fromDom(e))&&!ol(r,o,t)},fl(!(n=s),r=c).fold(function(){return fl(n,o).fold(C,i)},i)?U.none():s&&Vn(e.getNode())||!1===s&&Vn(e.getNode(!0))?vC(u,s,c,e):s&&Ep(c)||!1===s&&Np(c)?U.some(hC.moveToPosition(e)):U.none());var t,n,r,o,i,a})},bC=function(r,e,o){return i=e,a=o.getNode(!1===i),u=i?"after":"before",An(a)&&a.getAttribute("data-mce-caret")===u?(t=e,n=o.getNode(!1===e),(t&&Vn(n.nextSibling)?U.some(hC.moveToElement(n.nextSibling)):!1===t&&Vn(n.previousSibling)?U.some(hC.moveToElement(n.previousSibling)):U.none()).fold(function(){return yC(r,e,o)},U.some)):yC(r,e,o).bind(function(e){return t=r,n=o,e.fold(function(e){return U.some(hC.remove(e))},function(e){return U.some(hC.moveToElement(e))},function(e){return ol(n,e,t)?U.none():U.some(hC.moveToPosition(e))});var t,n});var t,n,i,a,u},CC=function(e,t){return U.from(id(e.getBody(),t))},wC=function(a,u){var e=a.selection.getNode();return CC(a,e).filter(Vn).fold(function(){return e=a.getBody(),t=u,n=a.selection.getRng(),r=ll(t?1:-1,e,n),o=$s.fromRangeStart(r),i=At.fromDom(e),(!1===t&&Ep(o)?U.some(hC.remove(o.getNode(!0))):t&&Np(o)?U.some(hC.remove(o.getNode())):!1===t&&Np(o)&&Vp(i,o)?qp(i,o).map(function(e){return hC.remove(e.getNode())}):t&&Ep(o)&&Hp(i,o)?$p(i,o).map(function(e){return hC.remove(e.getNode())}):bC(e,t,o)).exists(function(e){return e.fold(function(e){return o._selectionOverrides.hideFakeCaret(),Cg(o,i,At.fromDom(e)),!0},(r=i=u,function(e){var t=r?$s.before(e):$s.after(e);return n.selection.setRng(t.toRange()),!0}),(t=n=o=a,function(e){return t.selection.setRng(e.toRange()),!0}));var t,n,r,o,i});var e,t,n,r,o,i},k)},xC=function(t,n){var e=t.selection.getNode();return!!Vn(e)&&CC(t,e.parentNode).filter(Vn).fold(function(){var e;return e=At.fromDom(t.getBody()),W(Gu(e,".mce-offscreen-selection"),pn),Cg(t,n,At.fromDom(t.selection.getNode())),Vb(t),!0},function(){return!0})},SC=function(e){var t,n=e.dom,r=e.selection,o=id(e.getBody(),r.getNode());return Hn(o)&&n.isBlock(o)&&n.isEmpty(o)&&(t=n.create("br",{"data-mce-bogus":"1"}),n.setHTML(o,""),o.appendChild(t),r.setRng($s.before(t).toRange())),!0},NC=function(e,t){return(e.selection.isCollapsed()?wC:xC)(e,t)},EC=function(e,t){return!!e.selection.isCollapsed()&&(n=e,r=t,o=$s.fromRangeStart(n.selection.getRng()),Ol(r,n.getBody(),o).filter(function(e){return(r?yp:bp)(e)}).bind(function(e){return U.from(il(r?0:-1,e))}).exists(function(e){return n.selection.select(e),!0}));var n,r,o},kC=In,_C=function(e){return kC(e)&&e.data[0]===fo},AC=function(e){return kC(e)&&e.data[e.data.length-1]===fo},RC=function(e){return e.ownerDocument.createTextNode(fo)},TC=function(e,t){return(e?function(e){if(kC(e.previousSibling))return AC(e.previousSibling)||e.previousSibling.appendData(fo),e.previousSibling;if(kC(e))return _C(e)||e.insertData(0,fo),e;var t=RC(e);return e.parentNode.insertBefore(t,e),t}:function(e){if(kC(e.nextSibling))return _C(e.nextSibling)||e.nextSibling.insertData(0,fo),e.nextSibling;if(kC(e))return AC(e)||e.appendData(fo),e;var t=RC(e);return e.nextSibling?e.parentNode.insertBefore(t,e.nextSibling):e.parentNode.appendChild(t),t})(t)},DC=N(TC,!0),OC=N(TC,!1),BC=function(e,t){return In(e.container())?TC(t,e.container()):TC(t,e.getNode())},PC=function(e,t){var n=t.get();return n&&e.container()===n&&yo(n)},LC=function(n,e){return e.fold(function(e){Fc(n.get());var t=DC(e);return n.set(t),U.some($s(t,t.length-1))},function(e){return Fl(e).map(function(e){if(PC(e,n))return $s(n.get(),1);Fc(n.get());var t=BC(e,!0);return n.set(t),$s(t,1)})},function(e){return Ul(e).map(function(e){if(PC(e,n))return $s(n.get(),n.get().length-1);Fc(n.get());var t=BC(e,!1);return n.set(t),$s(t,t.length-1)})},function(e){Fc(n.get());var t=OC(e);return n.set(t),U.some($s(t,1))})},IC=function(e,t){for(var n=0;n<e.length;n++){var r=e[n].apply(null,t);if(r.isSome())return r}return U.none()},MC=Cr([{before:["element"]},{start:["element"]},{end:["element"]},{after:["element"]}]),FC=function(e,t){var n=rl(t,e);return n||e},UC=function(e,t,n){var r=zb(n),o=FC(t,r.container());return Fb(e,o,r).fold(function(){return Il(o,r).bind(N(Fb,e,o)).map(function(e){return MC.before(e)})},U.none)},zC=function(e,t){return null===Hl(e,t)},jC=function(e,t,n){return Fb(e,t,n).filter(N(zC,t))},HC=function(e,t,n){var r=jb(n);return jC(e,t,r).bind(function(e){return Ml(e,r).isNone()?U.some(MC.start(e)):U.none()})},VC=function(e,t,n){var r=zb(n);return jC(e,t,r).bind(function(e){return Il(e,r).isNone()?U.some(MC.end(e)):U.none()})},qC=function(e,t,n){var r=jb(n),o=FC(t,r.container());return Fb(e,o,r).fold(function(){return Ml(o,r).bind(N(Fb,e,o)).map(function(e){return MC.after(e)})},U.none)},$C=function(e){return!1===Mb(KC(e))},WC=function(e,t,n){return IC([UC,HC,VC,qC],[e,t,n]).filter($C)},KC=function(e){return e.fold(o,o,o,o)},XC=function(e){return e.fold(E("before"),E("start"),E("end"),E("after"))},YC=function(e){return e.fold(MC.before,MC.before,MC.after,MC.after)},GC=function(e){return e.fold(MC.start,MC.start,MC.end,MC.end)},JC=function(a,e,u,t,n,s){return ds(Fb(e,u,t),Fb(e,u,n),function(e,t){return e!==t&&(r=t,o=rl(e,n=u),i=rl(r,n),o&&o===i)?MC.after(a?e:t):s;var n,r,o,i}).getOr(s)},QC=function(e,r){return e.fold(k,function(e){return n=r,!(XC(t=e)===XC(n)&&KC(t)===KC(n));var t,n})},ZC=function(e,t){return e?t.fold(a(U.some,MC.start),U.none,a(U.some,MC.after),U.none):t.fold(U.none,a(U.some,MC.before),U.none,a(U.some,MC.end))},ew=function(e,a,u,s){var t=Ub(e,s),c=WC(a,u,t);return WC(a,u,t).bind(N(ZC,e)).orThunk(function(){return n=a,r=u,o=c,i=Ub(t=e,s),Ol(t,r,i).map(N(Ub,t)).fold(function(){return o.map(YC)},function(e){return WC(n,r,e).map(N(JC,t,n,r,i,e)).filter(N(QC,o))}).filter($C);var t,n,r,o,i})},tw=(N(ew,!1),N(ew,!0),function(e,t,n){var r=e?1:-1;return t.setRng($s(n.container(),n.offset()+r).toRange()),t.getSel().modify("move",e?"forward":"backward","word"),!0}),nw=function(e,t){var n=t.selection.getRng(),r=e?$s.fromRangeEnd(n):$s.fromRangeStart(n);return!!T(t.selection.getSel().modify)&&(e&&wo(r)?tw(!0,t.selection,r):!(e||!xo(r))&&tw(!1,t.selection,r))},rw=function(e,t){var n=e.dom.createRng();n.setStart(t.container(),t.offset()),n.setEnd(t.container(),t.offset()),e.selection.setRng(n)},ow=function(e,t){e?t.setAttribute("data-mce-selected","inline-boundary"):t.removeAttribute("data-mce-selected")},iw=function(t,e,n){return LC(e,n).map(function(e){return rw(t,e),n})},aw=function(e,t){var n,r;e.selection.isCollapsed()&&!0!==e.composing&&t.get()&&(n=$s.fromRangeStart(e.selection.getRng()),$s.isTextPosition(n)&&!1===(wo(r=n)||xo(r))&&(rw(e,Mc(t.get(),n)),t.set(null)))},uw=function(e,t,n){return!!_c(e)&&(o=t,i=n,a=(r=e).getBody(),u=$s.fromRangeStart(r.selection.getRng()),s=N(Ib,r),ew(i,s,a,u).bind(function(e){return iw(r,o,e)}).isSome());var r,o,i,a,u,s},sw=function(e,t,n){return!!_c(t)&&nw(e,t)},cw=function(d){var m=Ou(null),p=N(Ib,d);return d.on("NodeChange",function(e){var n,r,o,t,i,a,u,s,c,l,f;!_c(d)||wt.browser.isIE()&&e.initial||(a=p,u=d.dom,s=e.parents,c=z(Gu(At.fromDom(u.getRoot()),'*[data-mce-selected="inline-boundary"]'),function(e){return e.dom}),l=H(c,a),f=H(s,a),W(ee(l,f),N(ow,!1)),W(ee(f,l),N(ow,!0)),aw(d,m),n=p,r=d,o=m,t=e.parents,r.selection.isCollapsed()&&(i=H(t,n),W(i,function(e){var t=$s.fromRangeStart(r.selection.getRng());WC(n,r.getBody(),t).bind(function(e){return iw(r,o,e)})})))}),m},lw=N(sw,!0),fw=N(sw,!1),dw=function(t,n){return function(e){return LC(n,e).exists(function(e){return rw(t,e),!0})}},mw=function(r,o,i,a){var u=r.getBody(),s=N(Ib,r);r.undoManager.ignore(function(){var e,t,n;r.selection.setRng((e=i,t=a,(n=document.createRange()).setStart(e.container(),e.offset()),n.setEnd(t.container(),t.offset()),n)),r.execCommand("Delete"),WC(s,u,$s.fromRangeStart(r.selection.getRng())).map(GC).map(dw(r,o))}),r.nodeChanged()},pw=function(n,r,i,o){var e,t,a=(e=n.getBody(),t=o.container(),rl(t,e)||e),u=N(Ib,n),s=WC(u,a,o);return s.bind(function(e){return i?e.fold(E(U.some(GC(e))),U.none,E(U.some(YC(e))),U.none):e.fold(U.none,E(U.some(YC(e))),U.none,E(U.some(GC(e))))}).map(dw(n,r)).getOrThunk(function(){var t=Bl(i,a,o),e=t.bind(function(e){return WC(u,a,e)});return ds(s,e,function(){return Fb(u,a,o).exists(function(e){return!!ds(Fl(o=e),Ul(o),function(e,t){var n=Ub(!0,e),r=Ub(!1,t);return Il(o,n).forall(function(e){return e.isEqual(r)})}).getOr(!0)&&(Cg(n,i,At.fromDom(e)),!0);var o})}).orThunk(function(){return e.bind(function(e){return t.map(function(e){return i?mw(n,r,o,e):mw(n,r,e,o),!0})})}).getOr(!1)})},gw=function(e,t,n){if(e.selection.isCollapsed()&&_c(e)){var r=$s.fromRangeStart(e.selection.getRng());return pw(e,t,n,r)}return!1},hw=function(e){return 1===Gt(e).length},vw=function(e,t,n,r){var o,i,a,u,s,c=N(Nh,t),l=z(H(r,c),function(e){return e.dom});0===l.length?Cg(t,e,n):(i=n.dom,a=l,u=vh(!1),s=wh(a,u.dom),sn(At.fromDom(i),u),pn(At.fromDom(i)),o=$s(s,0),t.selection.setRng(o.toRange()))},yw=function(r,o){var t,e=At.fromDom(r.getBody()),n=At.fromDom(r.selection.getStart()),s=H((t=Dp(n,e),G(t,eo).fold(E(t),function(e){return t.slice(0,e)})),hw);return re(s).exists(function(e){var t,i,a,u,n=$s.fromRangeStart(r.selection.getRng());return i=o,a=n,u=e.dom,!(!ds(Fl(u),Ul(u),function(e,t){var n=Ub(!0,e),r=Ub(!1,t),o=Ub(!1,a);return i?Il(u,o).exists(function(e){return e.isEqual(r)&&a.isEqual(n)}):Ml(u,o).exists(function(e){return e.isEqual(n)&&a.isEqual(r)})}).getOr(!0)||jl((t=e).dom)&&gh(t.dom))&&(vw(o,r,e,s),!0)})},bw=function(e,t){return!!e.selection.isCollapsed()&&yw(e,t)},Cw=function(e,t,n){return e._selectionOverrides.hideFakeCaret(),Cg(e,t,At.fromDom(n)),!0},ww=function(e,t){return e.selection.isCollapsed()?(i=e,u=(a=t)?Cp:wp,s=a?Vs.Forwards:Vs.Backwards,c=dl(s,i.getBody(),i.selection.getRng()),u(c)?Cw(i,a,c.getNode(!a)):U.from(Ub(a,c)).filter(function(e){return u(e)&&gl(c,e)}).exists(function(e){return Cw(i,a,e.getNode(!a))})):(r=t,o=(n=e).selection.getNode(),!!$n(o)&&Cw(n,r,o));var n,r,o,i,a,u,s,c},xw=function(e){var t=parseInt(e,10);return isNaN(t)?0:t},Sw=function(e,t){return(e||"table"===Lt(t)?"margin":"padding")+("rtl"===er(t,"direction")?"-right":"-left")},Nw=function(e){var r,t=kw(e);return!e.mode.isReadOnly()&&(1<t.length||(r=e,Q(t,function(e){var t=Sw(Sc(r),e),n=nr(e,t).map(xw).getOr(0);return"false"!==r.dom.getContentEditable(e.dom)&&0<n})))},Ew=function(e){return oo(e)||io(e)},kw=function(e){return H(z(e.selection.getSelectedBlocks(),At.fromDom),function(e){return!Ew(e)&&!$t(e).map(Ew).getOr(!1)&&Ar(e,function(e){return Hn(e.dom)||Vn(e.dom)}).exists(function(e){return Hn(e.dom)})})},_w=function(e,c){var l=e.dom,t=e.selection,n=e.formatter,r=e.getParam("indentation","40px","string"),f=/[a-z%]+$/i.exec(r)[0],d=parseInt(r,10),m=Sc(e),o=vc(e);e.queryCommandState("InsertUnorderedList")||e.queryCommandState("InsertOrderedList")||""!==o||l.getParent(t.getNode(),l.isBlock)||n.apply("div"),W(kw(e),function(e){var t,n,r,o,i,a,u,s;t=l,n=c,r=m,o=d,i=f,a=e.dom,s=Sw(r,At.fromDom(a)),"outdent"===n?(u=Math.max(0,xw(a.style[s])-o),t.setStyle(a,s,u?u+i:"")):(u=xw(a.style[s])+o+i,t.setStyle(a,s,u))})},Aw=function(e,t){if(e.selection.isCollapsed()&&Nw(e)){var n=e.dom,r=e.selection.getRng(),o=$s.fromRangeStart(r),i=n.getParent(r.startContainer,n.isBlock);if(null!==i&&Ip(At.fromDom(i),o))return _w(e,"outdent"),!0}return!1},Rw=function(e,t){e.getDoc().execCommand(t,!1,null)},Tw=function(n,r){n.addCommand("delete",function(){var e,t;t=r,Aw(e=n)||NC(e,!1)||gC(e,!1)||gw(e,t,!1)||tC(e,!1)||Kg(e)||EC(e,!1)||ww(e,!1)||iC(e)||bw(e,!1)||(Rw(e,"Delete"),Vb(e))}),n.addCommand("forwardDelete",function(){var e,t;t=r,NC(e=n,!0)||gC(e,!0)||gw(e,t,!0)||tC(e,!0)||Kg(e)||EC(e,!0)||ww(e,!0)||iC(e)||bw(e,!0)||Rw(e,"ForwardDelete")})},Dw=function(e){return e.touches===undefined||1!==e.touches.length?U.none():U.some(e.touches[0])},Ow=function(a){var u=Ou(U.none()),s=Ou(!1),r=ju(function(e){a.fire("longpress",ke(ke({},e),{type:"longpress"})),s.set(!0)},400);a.on("touchstart",function(n){Dw(n).each(function(e){r.cancel();var t={x:e.clientX,y:e.clientY,target:n.target};r.throttle(n),s.set(!1),u.set(U.some(t))})},!0),a.on("touchmove",function(e){r.cancel(),Dw(e).each(function(i){u.get().each(function(e){var t,n,r,o;t=i,n=e,r=Math.abs(t.clientX-n.x),o=Math.abs(t.clientY-n.y),(5<r||5<o)&&(u.set(U.none()),s.set(!1),a.fire("longpresscancel"))})})},!0),a.on("touchend touchcancel",function(t){r.cancel(),"touchcancel"!==t.type&&u.get().filter(function(e){return e.target.isEqualNode(t.target)}).each(function(){s.get()?t.preventDefault():a.fire("tap",ke(ke({},t),{type:"tap"}))})},!0)},Bw=function(e,t){return e.hasOwnProperty(t.nodeName)},Pw=function(e){var t,n,r,o=e.dom,i=e.selection,a=e.schema,u=a.getBlockElements(),s=i.getStart(),c=e.getBody(),l=vc(e);if(s&&An(s)&&l){var f=c.nodeName.toLowerCase();if(a.isValidChild(f,l.toLowerCase())&&(d=u,m=c,p=s,!F(Tp(At.fromDom(p),At.fromDom(m)),function(e){return Bw(d,e.dom)}))){for(var d,m,p,g,h,v=i.getRng(),y=v.startContainer,b=v.startOffset,C=v.endContainer,w=v.endOffset,x=Em(e),s=c.firstChild;s;)if(g=u,In(h=s)||An(h)&&!Bw(g,h)&&!Jl(h)){if(function(e,t){if(In(t)){if(0===t.nodeValue.length)return!0;if(/^\s+$/.test(t.nodeValue)&&(!t.nextSibling||Bw(e,t.nextSibling)))return!0}return!1}(u,s)){s=(n=s).nextSibling,o.remove(n);continue}t||(t=o.create(l,yc(e)),s.parentNode.insertBefore(t,s),r=!0),s=(n=s).nextSibling,t.appendChild(n)}else t=null,s=s.nextSibling;r&&x&&(v.setStart(y,b),v.setEnd(C,w),i.setRng(v),e.nodeChanged())}}},Lw=function(e,t){var n;t.hasAttribute("data-mce-caret")&&(ko(t),(n=e).selection.setRng(n.selection.getRng()),e.selection.scrollIntoView(t))},Iw=function(e,t){var n,r=(n=e,Dr(At.fromDom(n.getBody()),"*[data-mce-caret]").fold(E(null),function(e){return e.dom}));if(r)return"compositionstart"===t.type?(t.preventDefault(),t.stopPropagation(),void Lw(e,r)):void(Co(r)&&(Lw(e,r),e.undoManager.add()))};(wb=Cb=Cb||{})[wb.Br=0]="Br",wb[wb.Block=1]="Block",wb[wb.Wrap=2]="Wrap",wb[wb.Eol=3]="Eol";var Mw,Fw,Uw=function(e,t){return e===Vs.Backwards?Z(t):t},zw=function(e,t,n,r){for(var o,i,a,u,s,c,l=_l(n),f=r,d=[];f&&(s=l,c=f,o=t===Vs.Forwards?s.next(c):s.prev(c));){if(zn(o.getNode(!1)))return t===Vs.Forwards?{positions:Uw(t,d).concat([o]),breakType:Cb.Br,breakAt:U.some(o)}:{positions:Uw(t,d),breakType:Cb.Br,breakAt:U.some(o)};if(o.isVisible()){if(e(f,o)){var m=(i=t,a=f,zn((u=o).getNode(i===Vs.Forwards))?Cb.Br:!1===ol(a,u)?Cb.Block:Cb.Wrap);return{positions:Uw(t,d),breakType:m,breakAt:U.some(o)}}d.push(o),f=o}else f=o}return{positions:Uw(t,d),breakType:Cb.Eol,breakAt:U.none()}},jw=function(n,r,o,e){return r(o,e).breakAt.map(function(e){var t=r(o,e).positions;return n===Vs.Backwards?t.concat(e):[e].concat(t)}).getOr([])},Hw=function(e,i){return X(e,function(e,o){return e.fold(function(){return U.some(o)},function(r){return ds(ne(r.getClientRects()),ne(o.getClientRects()),function(e,t){var n=Math.abs(i-e.left);return Math.abs(i-t.left)<=n?o:r}).or(e)})},U.none())},Vw=function(t,e){return ne(e.getClientRects()).bind(function(e){return Hw(t,e.left)})},qw=N(zw,Hs.isAbove,-1),$w=N(zw,Hs.isBelow,1),Ww=N(jw,-1,qw),Kw=N(jw,1,$w),Xw=function(t){var e=function(e){return z(e,function(e){return(e=ps(e)).node=t,e})};if(An(t))return e(t.getClientRects());if(In(t)){var n=t.ownerDocument.createRange();return n.setStart(t,0),n.setEnd(t,t.data.length),e(n.getClientRects())}},Yw=function(e){return J(e,Xw)};(Fw=Mw=Mw||{})[Fw.Up=-1]="Up",Fw[Fw.Down=1]="Down";var Gw=function(o,i,a,e,u,t){var s=0,c=[],n=function(e){var t,n,r=Yw([e]);for(-1===o&&(r=r.reverse()),t=0;t<r.length;t++)if(n=r[t],!a(n,l)){if(0<c.length&&i(n,Ee(c))&&s++,n.line=s,u(n))return!0;c.push(n)}},l=Ee(t.getClientRects());if(!l)return c;var r=t.getNode();return n(r),function(e,t,n,r){for(;r=nl(r,e,Mo,t);)if(n(r))return}(o,e,n,r),c},Jw=N(Gw,Mw.Up,vs,ys),Qw=N(Gw,Mw.Down,ys,vs),Zw=function(n){return function(e){return t=n,e.line>t;var t}},ex=function(n){return function(e){return t=n,e.line===t;var t}},tx=Vn,nx=nl,rx=function(e,t){return Math.abs(e.left-t)},ox=function(e,t){return Math.abs(e.right-t)},ix=function(e,t){return e>=t.left&&e<=t.right},ax=function(e,t){return e>=t.top&&e<=t.bottom},ux=function(e,o){return Se(e,function(e,t){var n=Math.min(rx(e,o),ox(e,o)),r=Math.min(rx(t,o),ox(t,o));return ix(o,t)||!ix(o,e)&&(r===n&&tx(t.node)||r<n)?t:e})},sx=function(e,t,n,r,o){var i=nx(r,e,Mo,t,!o);do{if(!i||n(i))return}while(i=nx(i,e,Mo,t))},cx=function(e,t,n){var r,o,i=Yw(H(oe(e.getElementsByTagName("*")),Kc)),a=H(i,N(ax,n));if(u=ux(a,t)){var u,s=!Bn(u.node)&&!$n(u.node);if((u=ux(function(e,r,t){void 0===t&&(t=!0);var o=[],n=function(t,e){var n=H(Yw([e]),function(e){return!t(e,r)});return o=o.concat(n),0===n.length};return o.push(r),sx(Mw.Up,e,N(n,vs),r.node,t),sx(Mw.Down,e,N(n,ys),r.node,t),o}(e,u,s),t))&&Kc(u.node))return o=t,{node:(r=u).node,before:rx(r,o)<ox(r,o)}}return null},lx=function(e,t){e.selection.setRng(t),Xd(e,e.selection.getRng())},fx=function(e,t,n){return U.some(fC(e,t,n))},dx=function(e,t,n,r,o,i){var a=t===Vs.Forwards,u=_l(e.getBody()),s=N(pl,a?u.next:u.prev),c=a?r:o;if(!n.collapsed){var l=Cs(n);if(i(l))return sC(t,e,l,t===Vs.Backwards,!1)}var f=dl(t,e.getBody(),n);if(c(f))return cC(e,f.getNode(!a));var d=Ub(a,s(f)),m=vo(n.startContainer);if(!d)return m?U.some(n):U.none();if(c(d))return sC(t,e,d.getNode(!a),a,!1);var p=s(d);return p&&c(p)&&gl(d,p)?sC(t,e,p.getNode(!a),a,!1):m?fx(e,d.toRange(),!1):U.none()},mx=function(t,e,n,r,o,i){var a=dl(e,t.getBody(),n),u=Ee(a.getClientRects()),s=e===Mw.Down;if(!u)return U.none();var c,l=(s?Qw:Jw)(t.getBody(),Zw(1),a),f=H(l,ex(1)),d=u.left,m=ux(f,d);if(m&&i(m.node)){var p=Math.abs(d-m.left),g=Math.abs(d-m.right);return sC(e,t,m.node,p<g,!1)}if(c=r(a)?a.getNode():o(a)?a.getNode(!0):Cs(n)){var h=function(e,t,n,r){var o,i,a,u,s=_l(t),c=[],l=0,f=function(e){return Ee(e.getClientRects())},d=1===e?(o=s.next,i=ys,a=vs,$s.after(r)):(o=s.prev,i=vs,a=ys,$s.before(r)),m=f(d);do{if(d.isVisible()&&!a(u=f(d),m)){if(0<c.length&&i(u,Ee(c))&&l++,(u=ps(u)).position=d,u.line=l,n(u))return c;c.push(u)}}while(d=o(d));return c}(e,t.getBody(),Zw(1),c),v=ux(H(h,ex(1)),d);if(v)return fx(t,v.position.toRange(),!1);if(v=Ee(H(h,ex(0))))return fx(t,v.position.toRange(),!1)}return 0===f.length?px(t,s).filter(s?o:r).map(function(e){return fC(t,e.toRange(),!1)}):U.none()},px=function(e,t){var n=e.selection.getRng(),r=e.getBody();if(t){var o=$s.fromRangeEnd(n),i=$w(r,o);return re(i.positions)}o=$s.fromRangeStart(n),i=qw(r,o);return ne(i.positions)},gx=function(t,e,n){return px(t,e).filter(n).exists(function(e){return t.selection.setRng(e.toRange()),!0})},hx=Vn,vx=function(e,t,n){var r,o,i=_l(e.getBody()),a=N(pl,1===t?i.next:i.prev);if(n.collapsed&&""!==vc(e)){var u,s=e.dom.getParent(n.startContainer,"PRE");if(!s)return;a($s.fromRangeStart(n))||(o=(r=e).dom.create(vc(r)),(!wt.ie||11<=wt.ie)&&(o.innerHTML='<br data-mce-bogus="1">'),u=o,1===t?e.$(s).after(u):e.$(s).before(u),e.selection.select(u,!0),e.selection.collapse())}},yx=function(e,t){var n=t?Vs.Forwards:Vs.Backwards,r=e.selection.getRng();return dx(e,n,r,Np,Ep,hx).orThunk(function(){return vx(e,n,r),U.none()})},bx=function(e,t){var n=t?1:-1,r=e.selection.getRng();return mx(e,n,r,function(e){return Np(e)||xp(e)},function(e){return Ep(e)||Sp(e)},hx).orThunk(function(){return vx(e,n,r),U.none()})},Cx=function(t,e){return yx(t,e).exists(function(e){return lx(t,e),!0})},wx=function(t,e){return bx(t,e).exists(function(e){return lx(t,e),!0})},xx=function(e,t){return gx(e,t,t?Ep:Np)},Sx=function(e){return M(["figcaption"],Lt(e))},Nx=function(e){var t=document.createRange();return t.setStartBefore(e.dom),t.setEndBefore(e.dom),t},Ex=function(e,t,n){(n?fn:ln)(e,t)},kx=function(e,t,n,r){return""===t?(l=e,f=r,d=At.fromTag("br"),Ex(l,d,f),Nx(d)):(o=e,i=r,a=t,u=n,s=At.fromTag(a),c=At.fromTag("br"),Yn(s,u),fn(s,c),Ex(o,s,i),Nx(c));var o,i,a,u,s,c,l,f,d},_x=function(e,t,n){return t?(o=e.dom,$w(o,n).breakAt.isNone()):(r=e.dom,qw(r,n).breakAt.isNone());var r,o},Ax=function(t,n){var e,r,o=At.fromDom(t.getBody()),i=$s.fromRangeStart(t.selection.getRng()),a=vc(t),u=yc(t);return e=i,r=N(Ot,o),Ar(At.fromDom(e.container()),eo,r).filter(Sx).exists(function(){if(_x(o,n,i)){var e=kx(o,a,u,n);return t.selection.setRng(e),!0}return!1})},Rx=function(e,t){return!!e.selection.isCollapsed()&&Ax(e,t)},Tx=function(e,r){return J(z(e,function(e){return ke({shiftKey:!1,altKey:!1,ctrlKey:!1,metaKey:!1,keyCode:0,action:V},e)}),function(e){return t=e,(n=r).keyCode===t.keyCode&&n.shiftKey===t.shiftKey&&n.altKey===t.altKey&&n.ctrlKey===t.ctrlKey&&n.metaKey===t.metaKey?[e]:[];var t,n})},Dx=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return function(){return e.apply(null,t)}},Ox=function(e,t){return Y(Tx(e,t),function(e){return e.action()})},Bx=function(t,e){var n=e?Vs.Forwards:Vs.Backwards,r=t.selection.getRng();return dx(t,n,r,Cp,wp,$n).exists(function(e){return lx(t,e),!0})},Px=function(t,e){var n=e?1:-1,r=t.selection.getRng();return mx(t,n,r,Cp,wp,$n).exists(function(e){return lx(t,e),!0})},Lx=function(e,t){return gx(e,t,t?wp:Cp)},Ix=function(o,e){return J(e,function(e){var t,n,r=(t=ps(e.getBoundingClientRect()),n=-1,{left:t.left-n,top:t.top-n,right:t.right+2*n,bottom:t.bottom+2*n,width:t.width+n,height:t.height+n});return[{x:r.left,y:o(r),cell:e},{x:r.right,y:o(r),cell:e}]})},Mx=function(e,t,n,r,o){var i,a,u=Gu(At.fromDom(n),"td,th,caption").map(function(e){return e.dom}),s=H(Ix(e,u),function(e){return t(e,o)});return i=r,a=o,X(s,function(e,r){return e.fold(function(){return U.some(r)},function(e){var t=Math.sqrt(Math.abs(e.x-i)+Math.abs(e.y-a)),n=Math.sqrt(Math.abs(r.x-i)+Math.abs(r.y-a));return U.some(n<t?r:e)})},U.none()).map(function(e){return e.cell})},Fx=N(Mx,function(e){return e.bottom},function(e,t){return e.y<t}),Ux=N(Mx,function(e){return e.top},function(e,t){return e.y>t}),zx=function(t,n){return ne(n.getClientRects()).bind(function(e){return Fx(t,e.left,e.top)}).bind(function(e){return Vw(Ul(t=e).map(function(e){return qw(t,e).positions.concat(e)}).getOr([]),n);var t})},jx=function(t,n){return re(n.getClientRects()).bind(function(e){return Ux(t,e.left,e.top)}).bind(function(e){return Vw(Fl(t=e).map(function(e){return[e].concat($w(t,e).positions)}).getOr([]),n);var t})},Hx=function(e,t,n){var r,o,i,a,u=e(t,n);return(a=u).breakType===Cb.Wrap&&0===a.positions.length||!zn(n.getNode())&&((i=u).breakType===Cb.Br&&1===i.positions.length)?(r=e,o=t,!u.breakAt.exists(function(e){return r(o,e).breakAt.isSome()})):u.breakAt.isNone()},Vx=N(Hx,qw),qx=N(Hx,$w),$x=function(t,e,n,r){var o,i,a,u,s=t.selection.getRng(),c=e?1:-1;return!(!$c()||(o=e,i=s,a=n,u=$s.fromRangeStart(i),!Ll(!o,a).exists(function(e){return e.isEqual(u)})))&&(sC(c,t,n,!e,!1).each(function(e){lx(t,e)}),!0)},Wx=function(e,t){var n=t.getNode(e);return An(n)&&"TABLE"===n.nodeName?U.some(n):U.none()},Kx=function(u,s,c){var e=Wx(!!s,c),t=!1===s;e.fold(function(){return lx(u,c.toRange())},function(a){return Ll(t,u.getBody()).filter(function(e){return e.isEqual(c)}).fold(function(){return lx(u,c.toRange())},function(e){return n=s,o=a,t=c,void((i=vc(r=u))?r.undoManager.transact(function(){var e=At.fromTag(i);Yn(e,yc(r)),fn(e,At.fromTag("br")),(n?cn:sn)(At.fromDom(o),e);var t=r.dom.createRng();t.setStart(e.dom,0),t.setEnd(e.dom,0),lx(r,t)}):lx(r,t.toRange()));var n,r,o,t,i})})},Xx=function(e,t,n,r){var o,i,a,u,s,c,l=e.selection.getRng(),f=$s.fromRangeStart(l),d=e.getBody();if(!t&&Vx(r,f)){var m=(u=d,zx(s=n,c=f).orThunk(function(){return ne(c.getClientRects()).bind(function(e){return Hw(Ww(u,$s.before(s)),e.left)})}).getOr($s.before(s)));return Kx(e,t,m),!0}if(t&&qx(r,f)){m=(o=d,jx(i=n,a=f).orThunk(function(){return ne(a.getClientRects()).bind(function(e){return Hw(Kw(o,$s.after(i)),e.left)})}).getOr($s.after(i)));return Kx(e,t,m),!0}return!1},Yx=function(n,r,o){return U.from(n.dom.getParent(n.selection.getNode(),"td,th")).bind(function(t){return U.from(n.dom.getParent(t,"table")).map(function(e){return o(n,r,e,t)})}).getOr(!1)},Gx=function(e,t){return Yx(e,t,$x)},Jx=function(e,t){return Yx(e,t,Xx)},Qx=function(i,a){i.on("keydown",function(e){var t,n,r,o;!1===e.isDefaultPrevented()&&(t=i,n=a,r=e,o=dt().os,Ox([{keyCode:ud.RIGHT,action:Dx(Cx,t,!0)},{keyCode:ud.LEFT,action:Dx(Cx,t,!1)},{keyCode:ud.UP,action:Dx(wx,t,!1)},{keyCode:ud.DOWN,action:Dx(wx,t,!0)},{keyCode:ud.RIGHT,action:Dx(Gx,t,!0)},{keyCode:ud.LEFT,action:Dx(Gx,t,!1)},{keyCode:ud.UP,action:Dx(Jx,t,!1)},{keyCode:ud.DOWN,action:Dx(Jx,t,!0)},{keyCode:ud.RIGHT,action:Dx(Bx,t,!0)},{keyCode:ud.LEFT,action:Dx(Bx,t,!1)},{keyCode:ud.UP,action:Dx(Px,t,!1)},{keyCode:ud.DOWN,action:Dx(Px,t,!0)},{keyCode:ud.RIGHT,action:Dx(uw,t,n,!0)},{keyCode:ud.LEFT,action:Dx(uw,t,n,!1)},{keyCode:ud.RIGHT,ctrlKey:!o.isOSX(),altKey:o.isOSX(),action:Dx(lw,t,n)},{keyCode:ud.LEFT,ctrlKey:!o.isOSX(),altKey:o.isOSX(),action:Dx(fw,t,n)},{keyCode:ud.UP,action:Dx(Rx,t,!1)},{keyCode:ud.DOWN,action:Dx(Rx,t,!0)}],r).each(function(e){r.preventDefault()}))})},Zx=function(o,i){o.on("keydown",function(e){var t,n,r;!1===e.isDefaultPrevented()&&(t=o,n=i,r=e,Ox([{keyCode:ud.BACKSPACE,action:Dx(Aw,t,!1)},{keyCode:ud.BACKSPACE,action:Dx(NC,t,!1)},{keyCode:ud.DELETE,action:Dx(NC,t,!0)},{keyCode:ud.BACKSPACE,action:Dx(gC,t,!1)},{keyCode:ud.DELETE,action:Dx(gC,t,!0)},{keyCode:ud.BACKSPACE,action:Dx(gw,t,n,!1)},{keyCode:ud.DELETE,action:Dx(gw,t,n,!0)},{keyCode:ud.BACKSPACE,action:Dx(Kg,t,!1)},{keyCode:ud.DELETE,action:Dx(Kg,t,!0)},{keyCode:ud.BACKSPACE,action:Dx(EC,t,!1)},{keyCode:ud.DELETE,action:Dx(EC,t,!0)},{keyCode:ud.BACKSPACE,action:Dx(ww,t,!1)},{keyCode:ud.DELETE,action:Dx(ww,t,!0)},{keyCode:ud.BACKSPACE,action:Dx(iC,t,!1)},{keyCode:ud.DELETE,action:Dx(iC,t,!0)},{keyCode:ud.BACKSPACE,action:Dx(tC,t,!1)},{keyCode:ud.DELETE,action:Dx(tC,t,!0)},{keyCode:ud.BACKSPACE,action:Dx(bw,t,!1)},{keyCode:ud.DELETE,action:Dx(bw,t,!0)}],r).each(function(e){r.preventDefault()}))}),o.on("keyup",function(e){var t,n;!1===e.isDefaultPrevented()&&(t=o,n=e,Ox([{keyCode:ud.BACKSPACE,action:Dx(SC,t)},{keyCode:ud.DELETE,action:Dx(SC,t)}],n))})},eS=function(e,t){var n,r,o=t,i=e.dom,a=e.schema.getMoveCaretBeforeOnEnterElements();if(t){!/^(LI|DT|DD)$/.test(t.nodeName)||(r=function(e){for(;e;){if(1===e.nodeType||3===e.nodeType&&e.data&&/[\r\n\s]/.test(e.data))return e;e=e.nextSibling}}(t.firstChild))&&/^(UL|OL|DL)$/.test(r.nodeName)&&t.insertBefore(i.doc.createTextNode(lo),t.firstChild);var u=i.createRng();if(t.normalize(),t.hasChildNodes()){for(var s=new Xr(t,t);n=s.current();){if(In(n)){u.setStart(n,0),u.setEnd(n,0);break}if(a[n.nodeName.toLowerCase()]){u.setStartBefore(n),u.setEndBefore(n);break}o=n,n=s.next()}n||(u.setStart(o,0),u.setEnd(o,0))}else zn(t)?t.nextSibling&&i.isBlock(t.nextSibling)?(u.setStartBefore(t),u.setEndBefore(t)):(u.setStartAfter(t),u.setEndAfter(t)):(u.setStart(t,0),u.setEnd(t,0));e.selection.setRng(u),Xd(e,u)}},tS=function(e){return U.from(e.dom.getParent(e.selection.getStart(!0),e.dom.isBlock))},nS=function(e,t){return e&&e.parentNode&&e.parentNode.nodeName===t},rS=function(e){return e&&/^(OL|UL|LI)$/.test(e.nodeName)},oS=function(e){var t=e.parentNode;return/^(LI|DT|DD)$/.test(t.nodeName)?t:e},iS=function(e,t,n){for(var r=e[n?"firstChild":"lastChild"];r&&!An(r);)r=r[n?"nextSibling":"previousSibling"];return r===t},aS=function(e,t,n,r,o){var i,a,u,s,c,l,f=e.dom,d=e.selection.getRng();n!==e.getBody()&&(rS(i=n)&&rS(i.parentNode)&&(o="LI"),a=o?t(o):f.create("BR"),iS(n,r,!0)&&iS(n,r,!1)?nS(n,"LI")?f.insertAfter(a,oS(n)):f.replace(a,n):iS(n,r,!0)?nS(n,"LI")?(f.insertAfter(a,oS(n)),a.appendChild(f.doc.createTextNode(" ")),a.appendChild(n)):n.parentNode.insertBefore(a,n):iS(n,r,!1)?f.insertAfter(a,oS(n)):(n=oS(n),(u=d.cloneRange()).setStartAfter(r),u.setEndAfter(n),s=u.extractContents(),"LI"===o&&(l="LI",(c=s).firstChild&&c.firstChild.nodeName===l)?(a=s.firstChild,f.insertAfter(s,n)):(f.insertAfter(s,n),f.insertAfter(a,n))),f.remove(r),eS(e,a))},uS=function(e){e.innerHTML='<br data-mce-bogus="1">'},sS=function(e,t){return e.nodeName===t||e.previousSibling&&e.previousSibling.nodeName===t},cS=function(e,t){return t&&e.isBlock(t)&&!/^(TD|TH|CAPTION|FORM)$/.test(t.nodeName)&&!/^(fixed|absolute)/i.test(t.style.position)&&"true"!==e.getContentEditable(t)},lS=function(e,t,n){return!1===In(t)?n:e?1===n&&t.data.charAt(n-1)===fo?0:n:n===t.data.length-1&&t.data.charAt(n)===fo?t.data.length:n},fS=function(e,t){for(var n,r=e.getRoot(),o=t;o!==r&&"false"!==e.getContentEditable(o);)"true"===e.getContentEditable(o)&&(n=o),o=o.parentNode;return o!==r?n:r},dS=function(e,t){var n=vc(e);n&&n.toLowerCase()===t.tagName.toLowerCase()&&function(e,o,t){var i=e.dom;U.from(t.style).map(i.parseStyle).each(function(e){var t=rr(At.fromDom(o)),n=ke(ke({},t),e);i.setStyles(o,n)});var n=U.from(t["class"]).map(function(e){return e.split(/\s+/)}),r=U.from(o.className).map(function(e){return H(e.split(/\s+/),function(e){return""!==e})});ds(n,r,function(t,e){var n=H(e,function(e){return!M(t,e)}),r=_e(t,n);i.setAttrib(o,"class",r.join(" "))});var a=["style","class"],u=me(t,function(e,t){return!M(a,t)});i.setAttribs(o,u)}(e,t,yc(e))},mS=function(a,e){var t,u,i,s,n,r,o,c,l,f=a.dom,d=a.schema,m=d.getNonEmptyElements(),p=a.selection.getRng(),g=function(e){var t,n=u,r=d.getTextInlineElements(),o=e||"TABLE"===c||"HR"===c?f.create(e||N):s.cloneNode(!1),i=o;if(!1===a.getParam("keep_styles",!0))f.setAttrib(o,"style",null),f.setAttrib(o,"class",null);else do{if(r[n.nodeName]){if(jl(n)||Jl(n))continue;t=n.cloneNode(!1),f.setAttrib(t,"id",""),o.hasChildNodes()?t.appendChild(o.firstChild):i=t,o.appendChild(t)}}while((n=n.parentNode)&&n!==E);return dS(a,o),uS(i),o},h=function(e){var t,n,r=lS(e,u,i);if(In(u)&&(e?0<r:r<u.nodeValue.length))return!1;if(u.parentNode===s&&l&&!e)return!0;if(e&&An(u)&&u===s.firstChild)return!0;if(sS(u,"TABLE")||sS(u,"HR"))return l&&!e||!l&&e;var o=new Xr(u,s);for(In(u)&&(e&&0===r?o.prev():e||r!==u.nodeValue.length||o.next());t=o.current();){if(An(t)){if(!t.getAttribute("data-mce-bogus")&&(n=t.nodeName.toLowerCase(),m[n]&&"br"!==n))return!1}else if(In(t)&&!Uo(t.nodeValue))return!1;e?o.prev():o.next()}return!0},v=function(){n=/^(H[1-6]|PRE|FIGURE)$/.test(c)&&"HGROUP"!==C?g(N):g(),a.getParam("end_container_on_empty_block",!1)&&cS(f,o)&&f.isEmpty(s)?n=f.split(o,s):f.insertAfter(n,s),eS(a,n)};yd(f,p).each(function(e){p.setStart(e.startContainer,e.startOffset),p.setEnd(e.endContainer,e.endOffset)}),u=p.startContainer,i=p.startOffset,N=vc(a);var y=!(!e||!e.shiftKey),b=!(!e||!e.ctrlKey);An(u)&&u.hasChildNodes()&&(l=i>u.childNodes.length-1,u=u.childNodes[Math.min(i,u.childNodes.length-1)]||u,i=l&&In(u)?u.nodeValue.length:0);var C,w,x,S,N,E=fS(f,u);E&&((N&&!y||!N&&y)&&(u=function(e,t,n,r,o){var i,a,u,s,c,l,f=t||"P",d=e.dom,m=fS(d,r),p=d.getParent(r,d.isBlock);if(!p||!cS(d,p)){if(c=(p=p||m)===e.getBody()||(l=p)&&/^(TD|TH|CAPTION)$/.test(l.nodeName)?p.nodeName.toLowerCase():p.parentNode.nodeName.toLowerCase(),!p.hasChildNodes())return i=d.create(f),dS(e,i),p.appendChild(i),n.setStart(i,0),n.setEnd(i,0),i;for(u=r;u.parentNode!==p;)u=u.parentNode;for(;u&&!d.isBlock(u);)u=(a=u).previousSibling;if(a&&e.schema.isValidChild(c,f.toLowerCase())){for(i=d.create(f),dS(e,i),a.parentNode.insertBefore(i,a),u=a;u&&!d.isBlock(u);)s=u.nextSibling,i.appendChild(u),u=s;n.setStart(r,o),n.setEnd(r,o)}}return r}(a,N,p,u,i)),s=f.getParent(u,f.isBlock),o=s?f.getParent(s.parentNode,f.isBlock):null,c=s?s.nodeName.toUpperCase():"","LI"!==(C=o?o.nodeName.toUpperCase():"")||b||(o=(s=o).parentNode,c=C),/^(LI|DT|DD)$/.test(c)&&f.isEmpty(s)?aS(a,g,o,s,N):N&&s===a.getBody()||(N=N||"P",vo(s)?(n=ko(s),f.isEmpty(s)&&uS(s),dS(a,n),eS(a,n)):h()?v():h(!0)?(n=s.parentNode.insertBefore(g(),s),eS(a,sS(s,"HR")?n:s)):((S=(x=p).cloneRange()).setStart(x.startContainer,lS(!0,x.startContainer,x.startOffset)),S.setEnd(x.endContainer,lS(!1,x.endContainer,x.endOffset)),(t=S.cloneRange()).setEndAfter(s),r=t.extractContents(),w=r,W(Yu(At.fromDom(w),Ut),function(e){var t=e.dom;t.nodeValue=po(t.nodeValue)}),function(e){for(;In(e)&&(e.nodeValue=e.nodeValue.replace(/^[\r\n]+/,"")),e=e.firstChild;);}(r),n=r.firstChild,f.insertAfter(r,s),function(e,t,n){var r,o,i,a=n,u=[];if(a){for(;a=a.firstChild;){if(e.isBlock(a))return;An(a)&&!t[a.nodeName.toLowerCase()]&&u.push(a)}for(r=u.length;r--;)!(a=u[r]).hasChildNodes()||a.firstChild===a.lastChild&&""===a.firstChild.nodeValue?e.remove(a):(o=e,(i=a)&&"A"===i.nodeName&&o.isEmpty(i)&&e.remove(a))}}(f,m,n),function(e,t){t.normalize();var n=t.lastChild;n&&!/^(left|right)$/gi.test(e.getStyle(n,"float",!0))||e.add(t,"br")}(f,s),f.isEmpty(s)&&uS(s),n.normalize(),f.isEmpty(n)?(f.remove(n),v()):(dS(a,n),eS(a,n))),f.setAttrib(n,"id",""),a.fire("NewBlock",{newBlock:n})))},pS=function(e,t,n){var r=e.create("span",{},"&nbsp;");n.parentNode.insertBefore(r,n),t.scrollIntoView(r),e.remove(r)},gS=function(e,t,n,r){var o=e.createRng();r?(o.setStartBefore(n),o.setEndBefore(n)):(o.setStartAfter(n),o.setEndAfter(n)),t.setRng(o)},hS=function(e,t){var n,r,o=e.selection,i=e.dom,a=o.getRng();yd(i,a).each(function(e){a.setStart(e.startContainer,e.startOffset),a.setEnd(e.endContainer,e.endOffset)});var u,s=a.startOffset,c=a.startContainer;1===c.nodeType&&c.hasChildNodes()&&(u=s>c.childNodes.length-1,c=c.childNodes[Math.min(s,c.childNodes.length-1)]||c,s=u&&3===c.nodeType?c.nodeValue.length:0);var l=i.getParent(c,i.isBlock),f=l?i.getParent(l.parentNode,i.isBlock):null,d=f?f.nodeName.toUpperCase():"",m=!(!t||!t.ctrlKey);"LI"!==d||m||(l=f),c&&3===c.nodeType&&s>=c.nodeValue.length&&!function(e,t,n){for(var r,o=new Xr(t,n),i=e.getNonEmptyElements();r=o.next();)if(i[r.nodeName.toLowerCase()]||0<r.length)return!0}(e.schema,c,l)&&(n=i.create("br"),a.insertNode(n),a.setStartAfter(n),a.setEndAfter(n),r=!0),n=i.create("br"),Ks(i,a,n),pS(i,o,n),gS(i,o,n,r),e.undoManager.add()},vS=function(e,t){var n=At.fromTag("br");sn(At.fromDom(t),n),e.undoManager.add()},yS=function(e,t){bS(e.getBody(),t)||cn(At.fromDom(t),At.fromTag("br"));var n=At.fromTag("br");cn(At.fromDom(t),n),pS(e.dom,e.selection,n.dom),gS(e.dom,e.selection,n.dom,!1),e.undoManager.add()},bS=function(e,t){return n=$s.after(t),!!zn(n.getNode())||Il(e,$s.after(t)).map(function(e){return zn(e.getNode())}).getOr(!1);var n},CS=function(e){return e&&"A"===e.nodeName&&"href"in e},wS=function(e){return e.fold(C,CS,CS,C)},xS=function(e,t){t.fold(V,N(vS,e),N(yS,e),V)},SS=function(e,t){var n,r,o,i=(r=N(Ib,n=e),o=$s.fromRangeStart(n.selection.getRng()),WC(r,n.getBody(),o).filter(wS));i.isSome()?i.each(N(xS,e)):hS(e,t)},NS=function(e,t){return tS(e).filter(function(e){return 0<t.length&&Tt(At.fromDom(e),t)}).isSome()},ES=Cr([{br:[]},{block:[]},{none:[]}]),kS=function(e,t){return NS(n=e,n.getParam("no_newline_selector",""));var n},_S=function(n){return function(e,t){return""===vc(e)===n}},AS=function(n){return function(e,t){return tS(e).filter(function(e){return io(At.fromDom(e))}).isSome()===n}},RS=function(n,r){return function(e,t){return tS(e).fold(E(""),function(e){return e.nodeName.toUpperCase()})===n.toUpperCase()===r}},TS=function(e){return RS("pre",e)},DS=function(n){return function(e,t){return e.getParam("br_in_pre",!0)===n}},OS=function(e,t){return NS(n=e,n.getParam("br_newline_selector",".mce-toc h2,figcaption,caption"));var n},BS=function(e,t){return t},PS=function(e){var t=vc(e),n=function(e,t){for(var n,r=e.getRoot(),o=t;o!==r&&"false"!==e.getContentEditable(o);)"true"===e.getContentEditable(o)&&(n=o),o=o.parentNode;return o!==r?n:r}(e.dom,e.selection.getStart());return n&&e.schema.isValidChild(n.nodeName,t||"P")},LS=function(e,t){return function(n,r){return X(e,function(e,t){return e&&t(n,r)},!0)?U.some(t):U.none()}},IS=function(e,t){return IC([LS([kS],ES.none()),LS([RS("summary",!0)],ES.br()),LS([TS(!0),DS(!1),BS],ES.br()),LS([TS(!0),DS(!1)],ES.block()),LS([TS(!0),DS(!0),BS],ES.block()),LS([TS(!0),DS(!0)],ES.br()),LS([AS(!0),BS],ES.br()),LS([AS(!0)],ES.block()),LS([_S(!0),BS,PS],ES.block()),LS([_S(!0)],ES.br()),LS([OS],ES.br()),LS([_S(!1),BS],ES.br()),LS([PS],ES.block())],[e,!(!t||!t.shiftKey)]).getOr(ES.none())},MS=function(e,t){IS(e,t).fold(function(){SS(e,t)},function(){mS(e,t)},V)},FS=function(o){o.on("keydown",function(e){var t,n,r;e.keyCode===ud.ENTER&&(t=o,(n=e).isDefaultPrevented()||(n.preventDefault(),(r=t.undoManager).typing&&(r.typing=!1,r.add()),t.undoManager.transact(function(){!1===t.selection.isCollapsed()&&t.execCommand("Delete"),MS(t,n)})))})},US=function(r){r.on("keydown",function(e){var t,n;!1===e.isDefaultPrevented()&&(t=r,n=e,Ox([{keyCode:ud.END,action:Dx(xx,t,!0)},{keyCode:ud.HOME,action:Dx(xx,t,!1)},{keyCode:ud.END,action:Dx(Lx,t,!0)},{keyCode:ud.HOME,action:Dx(Lx,t,!1)}],n).each(function(e){n.preventDefault()}))})},zS=dt().browser,jS=function(t){var e,n;e=t,n=zu(function(){e.composing||ig(e)},0),zS.isIE()&&(e.on("keypress",function(e){n.throttle()}),e.on("remove",function(e){n.cancel()})),t.on("input",function(e){!1===e.isComposing&&ig(t)})},HS=function(n,r){var e=r.container(),t=r.offset();return In(e)?(e.insertData(t,n),U.some(Hs(e,t+n.length))):ml(r).map(function(e){var t=At.fromText(n);return(r.isAtEnd()?cn:sn)(e,t),Hs(t.dom,n.length)})},VS=N(HS,lo),qS=N(HS," "),$S=function(r,o){return function(e){return t=r,(!Gp(n=e)&&(Jp(t,n)||Xp(t,n)||Yp(t,n))?VS:qS)(o);var t,n}},WS=function(e){var t,n,r=$s.fromRangeStart(e.selection.getRng()),o=At.fromDom(e.getBody());if(e.selection.isCollapsed()){var i=N(Ib,e),a=$s.fromRangeStart(e.selection.getRng());return WC(i,e.getBody(),a).bind((n=o,function(e){return e.fold(function(e){return Ml(n.dom,$s.before(e))},function(e){return Fl(e)},function(e){return Ul(e)},function(e){return Il(n.dom,$s.after(e))})})).bind($S(o,r)).exists((t=e,function(e){return t.selection.setRng(e.toRange()),t.nodeChanged(),!0}))}return!1},KS=function(r){r.on("keydown",function(e){var t,n;!1===e.isDefaultPrevented()&&(t=r,n=e,Ox([{keyCode:ud.SPACEBAR,action:Dx(WS,t)}],n).each(function(e){n.preventDefault()}))})},XS=function(e){var t,n=cw(e);return(t=e).on("keyup compositionstart",N(Iw,t)),Qx(e,n),Zx(e,n),FS(e),KS(e),jS(e),US(e),n},YS=(GS.prototype.nodeChanged=function(e){var t,n,r,o=this.editor.selection;this.editor.initialized&&o&&!this.editor.getParam("disable_nodechange")&&!this.editor.mode.isReadOnly()&&(r=this.editor.getBody(),(t=o.getStart(!0)||r).ownerDocument===this.editor.getDoc()&&this.editor.dom.isChildOf(t,r)||(t=r),n=[],this.editor.dom.getParent(t,function(e){return e===r||void n.push(e)}),(e=e||{}).element=t,e.parents=n,this.editor.fire("NodeChange",e))},GS.prototype.isSameElementPath=function(e){var t,n=this.editor.$(e).parentsUntil(this.editor.getBody()).add(e);if(n.length===this.lastPath.length){for(t=n.length;0<=t&&n[t]===this.lastPath[t];t--);if(-1===t)return this.lastPath=n,!0}return this.lastPath=n,!1},GS);function GS(r){var o;this.lastPath=[],this.editor=r;var t=this;"onselectionchange"in r.getDoc()||r.on("NodeChange click mouseup keyup focus",function(e){var t=r.selection.getRng(),n={startContainer:t.startContainer,startOffset:t.startOffset,endContainer:t.endContainer,endOffset:t.endOffset};"nodechange"!==e.type&&dd(n,o)||r.fire("SelectionChange"),o=n}),r.on("contextmenu",function(){r.fire("SelectionChange")}),r.on("SelectionChange",function(){var e=r.selection.getStart(!0);!e||!wt.range&&r.selection.isCollapsed()||Vf(r)&&!t.isSameElementPath(e)&&r.dom.isChildOf(e,r.getBody())&&r.nodeChanged({selectionChange:!0})}),r.on("mouseup",function(e){!e.isDefaultPrevented()&&Vf(r)&&("IMG"===r.selection.getNode().nodeName?qr.setEditorTimeout(r,function(){r.nodeChanged()}):r.nodeChanged())})}var JS=function(e){var t,n;(t=e).on("click",function(e){t.dom.getParent(e.target,"details")&&e.preventDefault()}),(n=e).parser.addNodeFilter("details",function(e){W(e,function(e){e.attr("data-mce-open",e.attr("open")),e.attr("open","open")})}),n.serializer.addNodeFilter("details",function(e){W(e,function(e){var t=e.attr("data-mce-open");e.attr("open",q(t)?t:null),e.attr("data-mce-open",null)})})},QS=function(e){return An(e)&&ro(At.fromDom(e))},ZS=function(a){a.on("click",function(e){var t,n,r,o,i;3<=e.detail&&(r=(t=a).selection.getRng(),o=Hs.fromRangeStart(r),i=Hs.fromRangeEnd(r),Hs.isElementPosition(o)&&(n=o.container(),QS(n)&&Fl(n).each(function(e){return r.setStart(e.container(),e.offset())})),Hs.isElementPosition(i)&&(n=o.container(),QS(n)&&Ul(n).each(function(e){return r.setEnd(e.container(),e.offset())})),t.selection.setRng(Yg(r)))})},eN=function(e){var t=e.getBoundingClientRect(),n=e.ownerDocument,r=n.documentElement,o=n.defaultView;return{top:t.top+o.pageYOffset-r.clientTop,left:t.left+o.pageXOffset-r.clientLeft}},tN=function(e,t){return n=(u=e).inline?eN(u.getBody()):{left:0,top:0},a=(i=e).getBody(),r=i.inline?{left:a.scrollLeft,top:a.scrollTop}:{left:0,top:0},{pageX:(o=function(e,t){if(t.target.ownerDocument===e.getDoc())return{left:t.pageX,top:t.pageY};var n,r,o,i,a,u=eN(e.getContentAreaContainer()),s=(r=(n=e).getBody(),o=n.getDoc().documentElement,i={left:r.scrollLeft,top:r.scrollTop},a={left:r.scrollLeft||o.scrollLeft,top:r.scrollTop||o.scrollTop},n.inline?i:a);return{left:t.pageX-u.left+s.left,top:t.pageY-u.top+s.top}}(e,t)).left-n.left+r.left,pageY:o.top-n.top+r.top};var n,r,o,i,a,u},nN=Vn,rN=Hn,oN=function(e){e&&e.parentNode&&e.parentNode.removeChild(e)},iN=function(u,s){return function(e){var t,n,r,o,i,a;0===e.button&&(t=Y(s.dom.getParents(e.target),function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return function(e){for(var t=0;t<n.length;t++)if(n[t](e))return!0;return!1}}(nN,rN)).getOr(null),i=s.getBody(),nN(a=t)&&a!==i&&(n=s.dom.getPos(t),r=s.getBody(),o=s.getDoc().documentElement,u.set({element:t,dragging:!1,screenX:e.screenX,screenY:e.screenY,maxX:(s.inline?r.scrollWidth:o.offsetWidth)-2,maxY:(s.inline?r.scrollHeight:o.offsetHeight)-2,relX:e.pageX-n.x,relY:e.pageY-n.y,width:t.offsetWidth,height:t.offsetHeight,ghost:function(e,t,n,r){var o=e.dom,i=t.cloneNode(!0);o.setStyles(i,{width:n,height:r}),o.setAttrib(i,"data-mce-selected",null);var a=o.create("div",{"class":"mce-drag-container","data-mce-bogus":"all",unselectable:"on",contenteditable:"false"});return o.setStyles(a,{position:"absolute",opacity:.5,overflow:"hidden",border:0,padding:0,margin:0,width:n,height:r}),o.setStyles(i,{margin:0,boxSizing:"border-box"}),a.appendChild(i),a}(s,t,t.offsetWidth,t.offsetHeight)})))}},aN=function(e,h){var v=qr.throttle(function(e,t){h._selectionOverrides.hideFakeCaret(),h.selection.placeCaretAt(e,t)},0);return h.on("remove",v.stop),function(g){return e.on(function(e){var t,n,r,o,i,a,u,s,c,l,f,d,m,p=Math.max(Math.abs(g.screenX-e.screenX),Math.abs(g.screenY-e.screenY));if(!e.dragging&&10<p){if(h.fire("dragstart",{target:e.element}).isDefaultPrevented())return;e.dragging=!0,h.focus()}e.dragging&&(d=e,t={pageX:(m=tN(h,g)).pageX-d.relX,pageY:m.pageY+5},l=e.ghost,f=h.getBody(),l.parentNode!==f&&f.appendChild(l),n=e.ghost,r=t,o=e.width,i=e.height,a=e.maxX,u=e.maxY,c=s=0,n.style.left=r.pageX+"px",n.style.top=r.pageY+"px",r.pageX+o>a&&(s=r.pageX+o-a),r.pageY+i>u&&(c=r.pageY+i-u),n.style.width=o-s+"px",n.style.height=i-c+"px",v(g.clientX,g.clientY))})}},uN=function(e,l){return function(c){e.on(function(e){var t,n,r,o,i,a,u,s;e.dragging&&(u=(o=l).selection,s=u.getSel().getRangeAt(0).startContainer,i=3===s.nodeType?s.parentNode:s,a=e.element,i===a||o.dom.isChildOf(i,a)||nN(i)||(n=e.element,(r=n.cloneNode(!0)).removeAttribute("data-mce-selected"),t=r,l.fire("drop",{clientX:c.clientX,clientY:c.clientY}).isDefaultPrevented()||l.undoManager.transact(function(){oN(e.element),l.insertContent(l.dom.getOuterHTML(t)),l._selectionOverrides.hideFakeCaret()})))}),sN(e)}},sN=function(e){e.on(function(e){oN(e.ghost)}),e.clear()},cN=function(e){var t,n,r,o=(t=Ou(U.none()),{clear:function(){return t.set(U.none())},set:function(e){return t.set(U.some(e))},isSet:function(){return t.get().isSome()},on:function(e){return t.get().each(e)}}),i=Eu.DOM,a=document,u=iN(o,e),s=aN(o,e),c=uN(o,e),l=(n=o,function(){n.on(function(e){e.dragging&&r.fire("dragend")}),sN(n)});(r=e).on("mousedown",u),e.on("mousemove",s),e.on("mouseup",c),i.bind(a,"mousemove",s),i.bind(a,"mouseup",l),e.on("remove",function(){i.unbind(a,"mousemove",s),i.unbind(a,"mouseup",l)})},lN=function(e){var n,i,a,u,t;cN(e),(n=e).on("drop",function(e){var t="undefined"!=typeof e.clientX?n.getDoc().elementFromPoint(e.clientX,e.clientY):null;!nN(t)&&"false"!==n.dom.getContentEditableParent(t)||e.preventDefault()}),e.getParam("block_unsupported_drop",!0,"boolean")&&(a=function(e){var t;e.defaultPrevented||(t=e.dataTransfer)&&(M(t.types,"Files")||0<t.files.length)&&(e.preventDefault(),"drop"===e.type&&cb(i,"Dropped file type is not supported"))},u=function(e){vm(i,e.target)&&a(e)},t=function(){var t=Eu.DOM,n=i.dom,r=document,o=i.inline?i.getBody():i.getDoc(),e=["drop","dragover"];W(e,function(e){t.bind(r,e,u),n.bind(o,e,a)}),i.on("remove",function(){W(e,function(e){t.unbind(r,e,u),n.unbind(o,e,a)})})},(i=e).on("init",function(){qr.setEditorTimeout(i,t,0)}))},fN=Hn,dN=Vn,mN=function(e,t){return id(e.getBody(),t)},pN=function(u){var s,c=u.selection,l=u.dom,f=l.isBlock,d=u.getBody(),m=qc(u,d,f,function(){return Em(u)}),p="sel-"+l.uniqueId(),i="data-mce-selected",g=function(e){return e!==d&&(dN(e)||$n(e))&&l.isChildOf(e,d)},h=function(e){e&&c.setRng(e)},r=c.getRng,v=function(e,t,n,r){return void 0===r&&(r=!0),u.fire("ShowCaret",{target:t,direction:e,before:n}).isDefaultPrevented()?null:(r&&c.scrollIntoView(t,-1===e),m.show(n,t))},t=function(e){return bo(e)||No(e)||Eo(e)},y=function(e){return t(e.startContainer)||t(e.endContainer)},b=function(e){var t=u.schema.getShortEndedElements(),n=l.createRng(),r=e.startContainer,o=e.startOffset,i=e.endContainer,a=e.endOffset;return he(t,r.nodeName.toLowerCase())?0===o?n.setStartBefore(r):n.setStartAfter(r):n.setStart(r,o),he(t,i.nodeName.toLowerCase())?0===a?n.setEndBefore(i):n.setEndAfter(i):n.setEnd(i,a),n},C=function(e){var t=e.cloneNode(!0),n=u.fire("ObjectSelected",{target:e,targetClone:t});if(n.isDefaultPrevented())return null;var r=function(e,t,n){var r=u.$,o=Dr(At.fromDom(u.getBody()),"#"+p).fold(function(){return r([])},function(e){return r([e.dom])});0===o.length&&(o=r('<div data-mce-bogus="all" class="mce-offscreen-selection"></div>').attr("id",p)).appendTo(u.getBody());var i=l.createRng();t===n&&wt.ie?(o.empty().append('<p style="font-size: 0" data-mce-bogus="all">\xa0</p>').append(t),i.setStartAfter(o[0].firstChild.firstChild),i.setEndAfter(t)):(o.empty().append(lo).append(t).append(lo),i.setStart(o[0].firstChild,1),i.setEnd(o[0].lastChild,0)),o.css({top:l.getPos(e,u.getBody()).y}),o[0].focus();var a=c.getSel();return a.removeAllRanges(),a.addRange(i),i}(e,n.targetClone,t),o=At.fromDom(e);return W(Gu(At.fromDom(u.getBody()),"*[data-mce-selected]"),function(e){Ot(o,e)||Qn(e,i)}),l.getAttrib(e,i)||e.setAttribute(i,"1"),s=e,S(),r},w=function(e,t){if(!e)return null;if(e.collapsed){if(!y(e)){var n=t?1:-1,r=dl(n,d,e),o=r.getNode(!t);if(Kc(o))return v(n,o,!!t&&!r.isAtEnd(),!1);var i=r.getNode(t);if(Kc(i))return v(n,i,!t&&!r.isAtEnd(),!1)}return null}var a=e.startContainer,u=e.startOffset,s=e.endOffset;if(3===a.nodeType&&0===u&&dN(a.parentNode)&&(a=a.parentNode,u=l.nodeIndex(a),a=a.parentNode),1!==a.nodeType)return null;if(s===u+1&&a===e.endContainer){var c=a.childNodes[u];if(g(c))return C(c)}return null},x=function(){s&&s.removeAttribute(i),Dr(At.fromDom(u.getBody()),"#"+p).each(pn),s=null},S=function(){m.hide()};return wt.ceFalse&&function(){u.on("mouseup",function(e){var t=r();t.collapsed&&nb(u,e.clientX,e.clientY)&&lC(u,t,!1).each(h)}),u.on("click",function(e){var t=mN(u,e.target);t&&(dN(t)&&(e.preventDefault(),u.focus()),fN(t)&&l.isChildOf(t,c.getNode())&&x())}),u.on("blur NewBlock",x),u.on("ResizeWindow FullscreenStateChanged",m.reposition);var a=function(e){var t=_l(e);if(!e.firstChild)return!1;var n,r=$s.before(e.firstChild),o=t.next(r);return o&&!(Np(n=o)||Ep(n)||Cp(n)||wp(n))},i=function(e,t){var n,r,o=l.getParent(e,f),i=l.getParent(t,f);return!(!o||e===i||!l.isChildOf(o,i)||!1!==dN(mN(u,o)))||o&&(n=o,r=i,!(l.getParent(n,f)===l.getParent(r,f)))&&a(o)};u.on("tap",function(e){var t=e.target,n=mN(u,t);dN(n)?(e.preventDefault(),cC(u,n).each(w)):g(t)&&cC(u,t).each(w)},!0),u.on("mousedown",function(e){var t,n,r,o=e.target;o!==d&&"HTML"!==o.nodeName&&!l.isChildOf(o,d)||!1===nb(u,e.clientX,e.clientY)||((t=mN(u,o))?dN(t)?(e.preventDefault(),cC(u,t).each(w)):(x(),fN(t)&&e.shiftKey||ad(e.clientX,e.clientY,c.getRng())||(S(),c.placeCaretAt(e.clientX,e.clientY))):g(o)?cC(u,o).each(w):!1===Kc(o)&&(x(),S(),(n=cx(d,e.clientX,e.clientY))&&(i(o,n.node)||(e.preventDefault(),r=v(1,n.node,n.before,!1),u.getBody().focus(),h(r)))))}),u.on("keypress",function(e){ud.modifierPressed(e)||dN(c.getNode())&&e.preventDefault()}),u.on("GetSelectionRange",function(e){var t=e.range;if(s){if(!s.parentNode)return void(s=null);(t=t.cloneRange()).selectNode(s),e.range=t}}),u.on("SetSelectionRange",function(e){e.range=b(e.range);var t=w(e.range,e.forward);t&&(e.range=t)});var n,e,o;u.on("AfterSetSelectionRange",function(e){var t,n=e.range,r=n.startContainer.parentNode;y(n)||"mcepastebin"===r.id||S(),t=r,l.hasClass(t,"mce-offscreen-selection")||x()}),u.on("copy",function(e){var t,n,r=e.clipboardData;e.isDefaultPrevented()||!e.clipboardData||wt.ie||(t=(n=l.get(p))?n.getElementsByTagName("*")[0]:n)&&(e.preventDefault(),r.clearData(),r.setData("text/html",t.outerHTML),r.setData("text/plain",t.outerText||t.innerText))}),lN(u),e=zu(function(){var e,t;n.removed||!n.getBody().contains(document.activeElement)||(e=n.selection.getRng()).collapsed&&(t=fC(n,e,!1),n.selection.setRng(t))},0),(n=u).on("focus",function(){e.throttle()}),n.on("blur",function(){e.cancel()}),(o=u).on("init",function(){o.on("focusin",function(e){var t,n,r=e.target;$n(r)&&(t=id(o.getBody(),r),n=Vn(t)?t:r,o.selection.getNode()!==n&&cC(o,n).each(function(e){return o.selection.setRng(e)}))})})}(),{showCaret:v,showBlockCaretContainer:function(e){e.hasAttribute("data-mce-caret")&&(ko(e),h(r()),c.scrollIntoView(e))},hideFakeCaret:S,destroy:function(){m.destroy(),s=null}}},gN=function(u){var s,n,r,o=kt.each,c=ud.BACKSPACE,l=ud.DELETE,f=u.dom,d=u.selection,e=u.parser,t=wt.gecko,i=wt.ie,a=wt.webkit,m="data:text/mce-internal,",p=i?"Text":"URL",g=function(e,t){try{u.getDoc().execCommand(e,!1,t)}catch(n){}},h=function(e){return e.isDefaultPrevented()},v=function(){u.shortcuts.add("meta+a",null,"SelectAll")},y=function(){u.on("keydown",function(e){if(!h(e)&&e.keyCode===c&&d.isCollapsed()&&0===d.getRng().startOffset){var t=d.getNode().previousSibling;if(t&&t.nodeName&&"table"===t.nodeName.toLowerCase())return e.preventDefault(),!1}})},b=function(){u.inline||(u.contentStyles.push("body {min-height: 150px}"),u.on("click",function(e){var t;if("HTML"===e.target.nodeName){if(11<wt.ie)return void u.getBody().focus();t=u.selection.getRng(),u.getBody().focus(),u.selection.setRng(t),u.selection.normalize(),u.nodeChanged()}}))};return u.on("keydown",function(e){var t;if(!h(e)&&e.keyCode===ud.BACKSPACE){var n=(t=d.getRng()).startContainer,r=t.startOffset,o=f.getRoot(),i=n;if(t.collapsed&&0===r){for(;i&&i.parentNode&&i.parentNode.firstChild===i&&i.parentNode!==o;)i=i.parentNode;"BLOCKQUOTE"===i.tagName&&(u.formatter.toggle("blockquote",null,i),(t=f.createRng()).setStart(n,0),t.setEnd(n,0),d.setRng(t))}}}),s=function(e){var t=f.create("body"),n=e.cloneContents();return t.appendChild(n),d.serializer.serialize(t,{format:"html"})},u.on("keydown",function(e){var t,n,r,o,i,a=e.keyCode;if(!h(e)&&(a===l||a===c)){if(t=u.selection.isCollapsed(),n=u.getBody(),t&&!f.isEmpty(n))return;if(!t&&(r=u.selection.getRng(),o=s(r),(i=f.createRng()).selectNode(u.getBody()),o!==s(i)))return;e.preventDefault(),u.setContent(""),n.firstChild&&f.isBlock(n.firstChild)?u.selection.setCursorLocation(n.firstChild,0):u.selection.setCursorLocation(n,0),u.nodeChanged()}}),wt.windowsPhone||u.on("keyup focusin mouseup",function(e){ud.modifierPressed(e)||d.normalize()},!0),a&&(u.inline||f.bind(u.getDoc(),"mousedown mouseup",function(e){var t;if(e.target===u.getDoc().documentElement)if(t=d.getRng(),u.getBody().focus(),"mousedown"===e.type){if(bo(t.startContainer))return;d.placeCaretAt(e.clientX,e.clientY)}else d.setRng(t)}),u.on("click",function(e){var t=e.target;/^(IMG|HR)$/.test(t.nodeName)&&"false"!==f.getContentEditableParent(t)&&(e.preventDefault(),u.selection.select(t),u.nodeChanged()),"A"===t.nodeName&&f.hasClass(t,"mce-item-anchor")&&(e.preventDefault(),d.select(t))}),vc(u)&&u.on("init",function(){g("DefaultParagraphSeparator",vc(u))}),u.on("init",function(){u.dom.bind(u.getBody(),"submit",function(e){e.preventDefault()})}),y(),e.addNodeFilter("br",function(e){for(var t=e.length;t--;)"Apple-interchange-newline"===e[t].attr("class")&&e[t].remove()}),wt.iOS?(u.inline||u.on("keydown",function(){document.activeElement===document.body&&u.getWin().focus()}),b(),u.on("click",function(e){var t=e.target;do{if("A"===t.tagName)return void e.preventDefault()}while(t=t.parentNode)}),u.contentStyles.push(".mce-content-body {-webkit-touch-callout: none}")):v()),11<=wt.ie&&(b(),y()),wt.ie&&(v(),g("AutoUrlDetect",!1),u.on("dragstart",function(e){var t,n,r;(t=e).dataTransfer&&(u.selection.isCollapsed()&&"IMG"===t.target.tagName&&d.select(t.target),0<(n=u.selection.getContent()).length&&(r=m+escape(u.id)+","+escape(n),t.dataTransfer.setData(p,r)))}),u.on("drop",function(e){var t,n,r,o,i,a;h(e)||(t=(i=e).dataTransfer&&(a=i.dataTransfer.getData(p))&&0<=a.indexOf(m)?(a=a.substr(m.length).split(","),{id:unescape(a[0]),html:unescape(a[1])}):null)&&t.id!==u.id&&(e.preventDefault(),n=fd(e.x,e.y,u.getDoc()),d.setRng(n),r=t.html,o=!0,u.queryCommandSupported("mceInsertClipboardContent")?u.execCommand("mceInsertClipboardContent",!1,{content:r,internal:o}):u.execCommand("mceInsertContent",!1,r))})),t&&(u.on("keydown",function(e){if(!h(e)&&e.keyCode===c){if(!u.getBody().getElementsByTagName("hr").length)return;if(d.isCollapsed()&&0===d.getRng().startOffset){var t=d.getNode(),n=t.previousSibling;if("HR"===t.nodeName)return f.remove(t),void e.preventDefault();n&&n.nodeName&&"hr"===n.nodeName.toLowerCase()&&(f.remove(n),e.preventDefault())}}}),Range.prototype.getClientRects||u.on("mousedown",function(e){var t;h(e)||"HTML"!==e.target.nodeName||((t=u.getBody()).blur(),qr.setEditorTimeout(u,function(){t.focus()}))}),n=function(){var e=f.getAttribs(d.getStart().cloneNode(!1));return function(){var t=d.getStart();t!==u.getBody()&&(f.setAttrib(t,"style",null),o(e,function(e){t.setAttributeNode(e.cloneNode(!0))}))}},r=function(){return!d.isCollapsed()&&f.getParent(d.getStart(),f.isBlock)!==f.getParent(d.getEnd(),f.isBlock)},u.on("keypress",function(e){var t;if(!h(e)&&(8===e.keyCode||46===e.keyCode)&&r())return t=n(),u.getDoc().execCommand("delete",!1,null),t(),e.preventDefault(),!1}),f.bind(u.getDoc(),"cut",function(e){var t;!h(e)&&r()&&(t=n(),qr.setEditorTimeout(u,function(){t()}))}),u.getParam("readonly")||u.on("BeforeExecCommand mousedown",function(){g("StyleWithCSS",!1),g("enableInlineTableEditing",!1),Nc(u)||g("enableObjectResizing",!1)}),u.on("SetContent ExecCommand",function(e){"setcontent"!==e.type&&"mceInsertLink"!==e.command||o(f.select("a"),function(e){var t=e.parentNode,n=f.getRoot();if(t.lastChild===e){for(;t&&!f.isBlock(t);){if(t.parentNode.lastChild!==t||t===n)return;t=t.parentNode}f.add(t,"br",{"data-mce-bogus":1})}})}),u.contentStyles.push("img:-moz-broken {-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"),wt.mac&&u.on("keydown",function(e){!ud.metaKeyPressed(e)||e.shiftKey||37!==e.keyCode&&39!==e.keyCode||(e.preventDefault(),u.selection.getSel().modify("move",37===e.keyCode?"backward":"forward","lineboundary"))}),y()),{refreshContentEditable:function(){},isHidden:function(){if(!t||u.removed)return!1;var e=u.selection.getSel();return!e||!e.rangeCount||0===e.rangeCount}}},hN=Eu.DOM,vN=function(e){return me(e,function(e){return!1===R(e)})},yN=function(e){var t,n=e.settings,r=e.editorUpload.blobCache;return vN({allow_conditional_comments:n.allow_conditional_comments,allow_html_data_urls:n.allow_html_data_urls,allow_svg_data_urls:n.allow_svg_data_urls,allow_html_in_named_anchor:n.allow_html_in_named_anchor,allow_script_urls:n.allow_script_urls,allow_unsafe_link_target:n.allow_unsafe_link_target,convert_fonts_to_spans:n.convert_fonts_to_spans,fix_list_elements:n.fix_list_elements,font_size_legacy_values:n.font_size_legacy_values,forced_root_block:n.forced_root_block,forced_root_block_attrs:n.forced_root_block_attrs,padd_empty_with_br:n.padd_empty_with_br,preserve_cdata:n.preserve_cdata,remove_trailing_brs:n.remove_trailing_brs,inline_styles:n.inline_styles,root_name:(t=e).inline?t.getElement().nodeName.toLowerCase():undefined,validate:!0,blob_cache:r,images_dataimg_filter:n.images_dataimg_filter})},bN=function(u){var e=u.dom.getRoot();u.inline||Vf(u)&&u.selection.getStart(!0)!==e||Fl(e).each(function(e){var t,n,r,o,i=e.getNode(),a=Bn(i)?Fl(i).getOr(e):e;wt.browser.isIE()?(t=u,n=a.toRange(),r=At.fromDom(t.getBody()),o=(um(t)?U.from(n):U.none()).map(sm).filter(am(r)),t.bookmark=o.isSome()?o:t.bookmark):u.selection.setRng(a.toRange())})},CN=function(e){var t;e.bindPendingEventDelegates(),e.initialized=!0,e.fire("Init"),e.focus(!0),bN(e),e.nodeChanged({initial:!0}),e.execCallback("init_instance_callback",e),(t=e).settings.auto_focus&&qr.setEditorTimeout(t,function(){var e=!0===t.settings.auto_focus?t:t.editorManager.get(t.settings.auto_focus);e.destroyed||e.focus()},100)},wN=function(t,e){var n=t.settings,r=t.getDoc(),o=t.getBody();n.browser_spellcheck||n.gecko_spellcheck||(r.body.spellcheck=!1,hN.setAttrib(o,"spellcheck","false")),t.quirks=gN(t),t.fire("PostRender");var i,a,u,s,c,l,f,d,m,p,g,h=t.getParam("directionality",Iu.isRtl()?"rtl":undefined);h!==undefined&&(o.dir=h),n.protect&&t.on("BeforeSetContent",function(t){kt.each(n.protect,function(e){t.content=t.content.replace(e,function(e){return"\x3c!--mce:protected "+escape(e)+"--\x3e"})})}),t.on("SetContent",function(){t.addVisual(t.getBody())}),!1===e&&t.load({initial:!0,format:"html"}),t.startContent=t.getContent({format:"raw"}),t.on("compositionstart compositionend",function(e){t.composing="compositionstart"===e.type}),0<t.contentStyles.length&&(i="",kt.each(t.contentStyles,function(e){i+=e+"\r\n"}),t.dom.addStyle(i)),u=(a=t).contentCSS,c=(s=a).inline?s.ui.styleSheetLoader:s.dom.styleSheetLoader,l=function(){a.on("remove",function(){return c.unloadAll(u)}),CN(a)},c.loadAll(u,l,l),n.content_style&&(f=t,d=n.content_style,m=At.fromDom(f.getBody()),p=on(rn(m)),g=At.fromTag("style"),Xn(g,"type","text/css"),fn(g,At.fromText(d)),fn(p,g),f.on("remove",function(){pn(g)}))},xN=function(t,e){var n=t.settings,r=t.getElement(),o=t.getDoc();n.inline||(t.getElement().style.visibility=t.orgVisibility),e||t.inline||(o.open(),o.write(t.iframeHTML),o.close()),t.inline&&(hN.addClass(r,"mce-content-body"),t.contentDocument=o=document,t.contentWindow=window,t.bodyElement=r,t.contentAreaContainer=r);var u,i,a,s,c=t.getBody();c.disabled=!0,t.readonly=!!n.readonly,t.readonly||(t.inline&&"static"===hN.getStyle(c,"position",!0)&&(c.style.position="relative"),c.contentEditable=t.getParam("content_editable_state",!0)),c.disabled=!1,t.editorUpload=yb(t),t.schema=Ci(n),t.dom=Eu(o,{keep_values:!0,url_converter:t.convertURL,url_converter_scope:t,hex_colors:n.force_hex_style_colors,update_styles:!0,root_element:t.inline?t.getBody():null,collect:function(){return t.inline},schema:t.schema,contentCssCors:t.getParam("content_css_cors",!1,"boolean"),referrerPolicy:wc(t),onSetAttrib:function(e){t.fire("SetAttrib",e)}}),t.parser=((i=by(yN(u=t),u.schema)).addAttributeFilter("src,href,style,tabindex",function(e,t){for(var n,r,o=e.length,i=u.dom,a="data-mce-"+t;o--;)if((r=(n=e[o]).attr(t))&&!n.attr(a)){if(0===r.indexOf("data:")||0===r.indexOf("blob:"))continue;"style"===t?((r=i.serializeStyle(i.parseStyle(r),n.name)).length||(r=null),n.attr(a,r),n.attr(t,r)):"tabindex"===t?(n.attr(a,r),n.attr(t,null)):n.attr(a,u.convertURL(r,t,n.name))}}),i.addNodeFilter("script",function(e){for(var t=e.length;t--;){var n=e[t],r=n.attr("type")||"no/type";0!==r.indexOf("mce-")&&n.attr("type","mce-"+r)}}),u.settings.preserve_cdata&&i.addNodeFilter("#cdata",function(e){for(var t=e.length;t--;){var n=e[t];n.type=8,n.name="#comment",n.value="[CDATA["+u.dom.encode(n.value)+"]]"}}),i.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div",function(e){for(var t=e.length,n=u.schema.getNonEmptyElements();t--;){var r=e[t];r.isEmpty(n)&&0===r.getAll("br").length&&(r.append(new Km("br",1)).shortEnded=!0)}}),i),t.serializer=Ny((s=(a=t).settings,ke(ke({},yN(a)),vN({url_converter:s.url_converter,url_converter_scope:s.url_converter_scope,element_format:s.element_format,entities:s.entities,entity_encoding:s.entity_encoding,indent:s.indent,indent_after:s.indent_after,indent_before:s.indent_before,block_elements:s.block_elements,boolean_attributes:s.boolean_attributes,custom_elements:s.custom_elements,extended_valid_elements:s.extended_valid_elements,invalid_elements:s.invalid_elements,invalid_styles:s.invalid_styles,move_caret_before_on_enter_elements:s.move_caret_before_on_enter_elements,non_empty_elements:s.non_empty_elements,schema:s.schema,self_closing_elements:s.self_closing_elements,short_ended_elements:s.short_ended_elements,special:s.special,text_block_elements:s.text_block_elements,text_inline_elements:s.text_inline_elements,valid_children:s.valid_children,valid_classes:s.valid_classes,valid_elements:s.valid_elements,valid_styles:s.valid_styles,verify_html:s.verify_html,whitespace_elements:s.whitespace_elements}))),t),t.selection=Qv(t.dom,t.getWin(),t.serializer,t),t.annotator=td(t),t.formatter=_b(t),t.undoManager=Rb(t),t._nodeChangeDispatcher=new YS(t),t._selectionOverrides=pN(t),Ow(t),JS(t),Hv(t)||ZS(t);var l,f,d,m,p=Hv(l=t)?Ou(null):XS(l);Tw(t,p),vc(f=t)&&f.on("NodeChange",N(Pw,f)),Pb(t),t.fire("PreInit"),ge((m=d=t).plugins,"rtc").fold(function(){return m.rtcInstance=zv(d),U.none()},function(e){return U.some(e.setup().then(function(e){return m.rtcInstance=jv(d,e),e.isRemote}))}).fold(function(){wN(t,!1)},function(e){t.setProgressState(!0),e.then(function(e){t.setProgressState(!1),wN(t,e)})})},SN=Eu.DOM,NN=function(e){var t=e.getParam("doctype","<!DOCTYPE html>")+"<html><head>";e.getParam("document_base_url","")!==e.documentBaseUrl&&(t+='<base href="'+e.documentBaseURI.getURI()+'" />'),t+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';var n=gc(e,"body_id","tinymce"),r=gc(e,"body_class","");return hc(e)&&(t+='<meta http-equiv="Content-Security-Policy" content="'+hc(e)+'" />'),t+='</head><body id="'+n+'" class="mce-content-body '+r+'" data-id="'+e.id+'"><br></body></html>'},EN=function(e,t){var n,r,o,i,a=e.editorManager.translate("Rich Text Area. Press ALT-0 for help."),u=(n=e.id,r=a,t.height,o=e.getParam("iframe_attrs",{}),i=At.fromTag("iframe"),Yn(i,o),Yn(i,{id:n+"_ifr",frameBorder:"0",allowTransparency:"true",title:r}),Wu(i,"tox-edit-area__iframe"),i.dom);u.onload=function(){u.onload=null,e.fire("load")};var s=function(e,t){if(document.domain!==window.location.hostname&&wt.browser.isIE()){var n=vb("mce");e[n]=function(){xN(e)};var r='javascript:(function(){document.open();document.domain="'+document.domain+'";var ed = window.parent.tinymce.get("'+e.id+'");document.write(ed.iframeHTML);document.close();ed.'+n+"(true);})()";return SN.setAttrib(t,"src",r),!0}return!1}(e,u);return e.contentAreaContainer=t.iframeContainer,e.iframeElement=u,e.iframeHTML=NN(e),SN.add(t.iframeContainer,u),s},kN=Eu.DOM,_N=function(t,n,e){var r=ib.get(e),o=ib.urls[e]||t.documentBaseUrl.replace(/\/$/,"");if(e=kt.trim(e),r&&-1===kt.inArray(n,e)){if(kt.each(ib.dependencies(e),function(e){_N(t,n,e)}),t.plugins[e])return;try{var i=new r(t,o,t.$);(t.plugins[e]=i).init&&(i.init(t,o),n.push(e))}catch(Ok){!function(e,t,n){var r=Iu.translate(["Failed to initialize plugin: {0}",t]);mb(r,n),cb(e,r)}(t,e,Ok)}}},AN=function(e){return e.replace(/^\-/,"")},RN=function(e){return{editorContainer:e,iframeContainer:e,api:{}}},TN=function(e){var t,n,r=e.getElement();return e.inline?RN(null):(t=r,n=kN.create("div"),kN.insertAfter(n,t),RN(n))},DN=function(e){var t,n,r,o=e.getElement();return e.orgDisplay=o.style.display,q(kc(e))?e.theme.renderUI():T(kc(e))?(n=(t=e).getElement(),(r=kc(t)(t,n)).editorContainer.nodeType&&(r.editorContainer.id=r.editorContainer.id||t.id+"_parent"),r.iframeContainer&&r.iframeContainer.nodeType&&(r.iframeContainer.id=r.iframeContainer.id||t.id+"_iframecontainer"),r.height=r.iframeHeight?r.iframeHeight:n.offsetHeight,r):TN(e)},ON=function(e){var n,t,r,o,i,a,u,s,c;e.fire("ScriptsLoaded"),n=e,t=kt.trim(Cc(n)),r=n.ui.registry.getAll().icons,o=ke(ke({},Yy.get("default").icons),Yy.get(t).icons),ue(o,function(e,t){he(r,t)||n.ui.registry.addIcon(t,e)}),u=kc(i=e),q(u)?(i.settings.theme=AN(u),a=ab.get(u),i.theme=new a(i,ab.urls[u]),i.theme.init&&i.theme.init(i,ab.urls[u]||i.documentBaseUrl.replace(/\/$/,""),i.$)):i.theme={},s=e,c=[],kt.each(Ac(s).split(/[ ,]/),function(e){_N(s,c,AN(e))});var l,f,d,m=DN(e);l=e,f=U.from(m.api).getOr({}),d={show:U.from(f.show).getOr(V),hide:U.from(f.hide).getOr(V),disable:U.from(f.disable).getOr(V),isDisabled:U.from(f.isDisabled).getOr(C),enable:function(){l.mode.isReadOnly()||U.from(f.enable).map(b)}},l.ui=ke(ke({},l.ui),d);var p,g,h,v,y={editorContainer:m.editorContainer,iframeContainer:m.iframeContainer};return e.editorContainer=y.editorContainer?y.editorContainer:null,(p=e).contentCSS=p.contentCSS.concat(pb(p)),e.inline?xN(e):(v=EN(g=e,h=y),h.editorContainer&&(SN.get(h.editorContainer).style.display=g.orgDisplay,g.hidden=SN.isHidden(h.editorContainer)),g.getElement().style.display="none",SN.setAttrib(g.id,"aria-hidden","true"),void(v||xN(g)))},BN=Eu.DOM,PN=function(e){return"-"===e.charAt(0)},LN=function(e,t){var n,r=xc(t),o=t.getParam("language_url","","string");!1===Iu.hasCode(r)&&"en"!==r&&(n=""!==o?o:t.editorManager.baseURL+"/langs/"+r+".js",e.add(n,V,undefined,function(){lb(t,"LanguageLoadError",fb("language",n,r))}))},IN=function(t,e,n){return U.from(e).filter(function(e){return 0<e.length&&!Yy.has(e)}).map(function(e){return{url:t.editorManager.baseURL+"/icons/"+e+"/icons"+n+".js",name:U.some(e)}})},MN=function(e,o,t){var n,r=IN(o,"default",t),i=(n=o,U.from(n.getParam("icons_url","","string")).filter(function(e){return 0<e.length}).map(function(e){return{url:e,name:U.none()}}).orThunk(function(){return IN(o,Cc(o),"")}));W(function(e){for(var t=[],n=function(e){t.push(e)},r=0;r<e.length;r++)e[r].each(n);return t}([r,i]),function(r){e.add(r.url,V,undefined,function(){var e,t,n;e=o,t=r.url,n=r.name.getOrUndefined(),lb(e,"IconsLoadError",fb("icons",t,n))})})},FN=function(e,t){var n,r,o,i,a,u,s=Ru.ScriptLoader;n=s,o=t,i=function(){var r,o;LN(s,e),MN(s,e,t),r=e,o=t,kt.each(r.getParam("external_plugins"),function(e,t){ib.load(t,e,V,undefined,function(){db(r,e,t)}),r.settings.plugins+=" "+t}),kt.each(Ac(r).split(/[ ,]/),function(e){var t,n;(e=kt.trim(e))&&!ib.urls[e]&&(PN(e)?(e=e.substr(1,e.length),t=ib.dependencies(e),kt.each(t,function(e){var t={prefix:"plugins/",resource:e,suffix:"/plugin"+o+".js"},n=ib.createUrl(t,e);ib.load(n.resource,n,V,undefined,function(){db(r,n.prefix+n.resource+n.suffix,n.resource)})})):(n={prefix:"plugins/",resource:e,suffix:"/plugin"+o+".js"},ib.load(e,n,V,undefined,function(){db(r,n.prefix+n.resource+n.suffix,e)})))}),s.loadQueue(function(){e.removed||ON(e)},e,function(){e.removed||ON(e)})},u=kc(r=e),q(u)?(PN(u)||ab.urls.hasOwnProperty(u)||((a=r.getParam("theme_url"))?ab.load(u,r.documentBaseURI.toAbsolute(a)):ab.load(u,"themes/"+u+"/theme"+o+".js")),n.loadQueue(function(){ab.waitFor(u,i)})):i()},UN=function(t){var e=t.id;Iu.setCode(xc(t));var n,r,o,i,a,u=function(){BN.unbind(window,"ready",u),t.render()};Ti.Event.domLoaded?t.getElement()&&wt.contentEditable&&(n=At.fromDom(t.getElement()),r=X(n.dom.attributes,function(e,t){return e[t.name]=t.value,e},{}),t.on("remove",function(){j(n.dom.attributes,function(e){return Qn(n,e.name),0}),Yn(n,r)}),t.ui.styleSheetLoader=(o=n,i=t,Kr.forElement(o,{contentCssCors:i.getParam("content_css_cors"),referrerPolicy:wc(i)})),t.getParam("inline")?t.inline=!0:(t.orgVisibility=t.getElement().style.visibility,t.getElement().style.visibility="hidden"),(a=t.getElement().form||BN.getParent(e,"form"))&&(t.formElement=a,t.getParam("hidden_input")&&!Ln(t.getElement())&&(BN.insertAfter(BN.create("input",{type:"hidden",name:e}),e),t.hasHiddenInput=!0),t.formEventDelegate=function(e){t.fire(e.type,e)},BN.bind(a,"submit reset",t.formEventDelegate),t.on("reset",function(){t.resetContent()}),!t.getParam("submit_patch")||a.submit.nodeType||a.submit.length||a._mceOldSubmit||(a._mceOldSubmit=a.submit,a.submit=function(){return t.editorManager.triggerSave(),t.setDirty(!1),a._mceOldSubmit(a)})),t.windowManager=ub(t),t.notificationManager=ob(t),"xml"===t.getParam("encoding")&&t.on("GetContent",function(e){e.save&&(e.content=BN.encode(e.content))}),t.getParam("add_form_submit_trigger")&&t.on("submit",function(){t.initialized&&t.save()}),t.getParam("add_unload_trigger")&&(t._beforeUnload=function(){!t.initialized||t.destroyed||t.isHidden()||t.save({format:"raw",no_events:!0,set_dirty:!1})},t.editorManager.on("BeforeUnload",t._beforeUnload)),t.editorManager.add(t),FN(t,t.suffix)):BN.bind(window,"ready",u)},zN=function(e,t){return n=t,qv(e).editor.addVisual(n);var n},jN={"font-size":"size","font-family":"face"},HN=function(n,t,e){return Pm(At.fromDom(e),function(e){return nr(t=e,n).orThunk(function(){return"font"===Lt(t)?ge(jN,n).bind(function(e){return Jn(t,e)}):U.none()});var t},function(e){return Ot(At.fromDom(t),e)})},VN=function(o){return function(r,e){return U.from(e).map(At.fromDom).filter(Ft).bind(function(e){return HN(o,r,e.dom).or((t=o,n=e.dom,U.from(Eu.DOM.getStyle(n,t,!0))));var t,n}).getOr("")}},qN=VN("font-size"),$N=a(function(e){return e.replace(/[\'\"\\]/g,"").replace(/,\s+/g,",")},VN("font-family")),WN=function(e){return Fl(e.getBody()).map(function(e){var t=e.container();return In(t)?t.parentNode:t})},KN=function(e,t){return n=e,U.from(n.selection.getRng()).bind(function(e){var t=n.getBody();return e.startContainer===t&&0===e.startOffset?U.none():U.from(n.selection.getStart(!0))}).orThunk(N(WN,e)).map(At.fromDom).filter(Ft).map(t);var n},XN=function(e,t){if(/^[0-9.]+$/.test(t)){var n=parseInt(t,10);if(1<=n&&n<=7){var r=(a=e,kt.explode(a.getParam("font_size_style_values","xx-small,x-small,small,medium,large,x-large,xx-large"))),o=(i=e,kt.explode(i.getParam("font_size_classes","")));return o?o[n-1]||t:r[n-1]||t}return t}return t;var i,a},YN=function(e,t){var n,r=XN(e,t);e.formatter.toggle("fontname",{value:(n=r.split(/\s*,\s*/),z(n,function(e){return-1===e.indexOf(" ")||Ve(e,'"')||Ve(e,"'")?e:"'"+e+"'"}).join(","))}),e.nodeChanged()},GN=function(e,t){var n,r,o,i,a="string"!=typeof(n=t)?(r=kt.extend({paste:n.paste,data:{paste:n.paste}},n),{content:n.content,details:r}):{content:n,details:{}};o=a.content,i=a.details,Vv(e).editor.insertContent(o,i)},JN=kt.each,QN=kt.map,ZN=kt.inArray,eE=(tE.prototype.execCommand=function(t,n,r,e){var o,i,a=!1,u=this;if(!u.editor.removed){if(/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(t)||e&&e.skip_focus?(i=u.editor,dm(i).each(function(e){return i.selection.setRng(e)})):u.editor.focus(),(e=u.editor.fire("BeforeExecCommand",{command:t,ui:n,value:r})).isDefaultPrevented())return!1;var s=t.toLowerCase();if(o=u.commands.exec[s])return o(s,n,r),u.editor.fire("ExecCommand",{command:t,ui:n,value:r}),!0;if(JN(this.editor.plugins,function(e){if(e.execCommand&&e.execCommand(t,n,r))return u.editor.fire("ExecCommand",{command:t,ui:n,value:r}),!(a=!0)}),a)return a;if(u.editor.theme&&u.editor.theme.execCommand&&u.editor.theme.execCommand(t,n,r))return u.editor.fire("ExecCommand",{command:t,ui:n,value:r}),!0;try{a=u.editor.getDoc().execCommand(t,n,r)}catch(c){}return!!a&&(u.editor.fire("ExecCommand",{command:t,ui:n,value:r}),!0)}},tE.prototype.queryCommandState=function(e){var t;if(!this.editor.quirks.isHidden()&&!this.editor.removed){if(e=e.toLowerCase(),t=this.commands.state[e])return t(e);try{return this.editor.getDoc().queryCommandState(e)}catch(n){}return!1}},tE.prototype.queryCommandValue=function(e){var t;if(!this.editor.quirks.isHidden()&&!this.editor.removed){if(e=e.toLowerCase(),t=this.commands.value[e])return t(e);try{return this.editor.getDoc().queryCommandValue(e)}catch(n){}}},tE.prototype.addCommands=function(e,n){void 0===n&&(n="exec");var r=this;JN(e,function(t,e){JN(e.toLowerCase().split(","),function(e){r.commands[n][e]=t})})},tE.prototype.addCommand=function(e,o,i){var a=this;e=e.toLowerCase(),this.commands.exec[e]=function(e,t,n,r){return o.call(i||a.editor,t,n,r)}},tE.prototype.queryCommandSupported=function(e){if(e=e.toLowerCase(),this.commands.exec[e])return!0;try{return this.editor.getDoc().queryCommandSupported(e)}catch(t){}return!1},tE.prototype.addQueryStateHandler=function(e,t,n){var r=this;e=e.toLowerCase(),this.commands.state[e]=function(){return t.call(n||r.editor)}},tE.prototype.addQueryValueHandler=function(e,t,n){var r=this;e=e.toLowerCase(),this.commands.value[e]=function(){return t.call(n||r.editor)}},tE.prototype.hasCustomCommand=function(e){return e=e.toLowerCase(),!!this.commands.exec[e]},tE.prototype.execNativeCommand=function(e,t,n){return t===undefined&&(t=!1),n===undefined&&(n=null),this.editor.getDoc().execCommand(e,t,n)},tE.prototype.isFormatMatch=function(e){return this.editor.formatter.match(e)},tE.prototype.toggleFormat=function(e,t){this.editor.formatter.toggle(e,t?{value:t}:undefined),this.editor.nodeChanged()},tE.prototype.storeSelection=function(e){this.selectionBookmark=this.editor.selection.getBookmark(e)},tE.prototype.restoreSelection=function(){this.editor.selection.moveToBookmark(this.selectionBookmark)},tE.prototype.setupCommands=function(i){var a=this;this.addCommands({"mceResetDesignMode,mceBeginUndoLevel":function(){},"mceEndUndoLevel,mceAddUndoLevel":function(){i.undoManager.add()},"Cut,Copy,Paste":function(e){var t,n,r=i.getDoc();try{a.execNativeCommand(e)}catch(o){t=!0}"paste"!==e||r.queryCommandEnabled(e)||(t=!0),!t&&r.queryCommandSupported(e)||(n=i.translate("Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead."),wt.mac&&(n=n.replace(/Ctrl\+/g,"\u2318+")),i.notificationManager.open({text:n,type:"error"}))},unlink:function(){var e;i.selection.isCollapsed()?(e=i.dom.getParent(i.selection.getStart(),"a"))&&i.dom.remove(e,!0):i.formatter.remove("link")},"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull,JustifyNone":function(e){var t=e.substring(7);"full"===t&&(t="justify"),JN("left,center,right,justify".split(","),function(e){t!==e&&i.formatter.remove("align"+e)}),"none"!==t&&a.toggleFormat("align"+t)},"InsertUnorderedList,InsertOrderedList":function(e){var t;a.execNativeCommand(e);var n=i.dom.getParent(i.selection.getNode(),"ol,ul");n&&(t=n.parentNode,/^(H[1-6]|P|ADDRESS|PRE)$/.test(t.nodeName)&&(a.storeSelection(),i.dom.split(t,n),a.restoreSelection()))},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){a.toggleFormat(e)},"ForeColor,HiliteColor":function(e,t,n){a.toggleFormat(e,n)},FontName:function(e,t,n){YN(i,n)},FontSize:function(e,t,n){var r,o;o=n,(r=i).formatter.toggle("fontsize",{value:XN(r,o)}),r.nodeChanged()},LineHeight:function(e,t,n){var r,o;o=n,(r=i).undoManager.transact(function(){r.formatter.toggle("lineheight",{value:String(o)}),r.nodeChanged()})},RemoveFormat:function(e){i.formatter.remove(e)},mceBlockQuote:function(){a.toggleFormat("blockquote")},FormatBlock:function(e,t,n){return a.toggleFormat(n||"p")},mceCleanup:function(){var e=i.selection.getBookmark();i.setContent(i.getContent()),i.selection.moveToBookmark(e)},mceRemoveNode:function(e,t,n){var r=n||i.selection.getNode();r!==i.getBody()&&(a.storeSelection(),i.dom.remove(r,!0),a.restoreSelection())},mceSelectNodeDepth:function(e,t,n){var r=0;i.dom.getParent(i.selection.getNode(),function(e){if(1===e.nodeType&&r++===n)return i.selection.select(e),!1},i.getBody())},mceSelectNode:function(e,t,n){i.selection.select(n)},mceInsertContent:function(e,t,n){GN(i,n)},mceInsertRawHTML:function(e,t,n){i.selection.setContent("tiny_mce_marker");var r=i.getContent();i.setContent(r.replace(/tiny_mce_marker/g,function(){return n}))},mceInsertNewLine:function(e,t,n){MS(i,n)},mceToggleFormat:function(e,t,n){a.toggleFormat(n)},mceSetContent:function(e,t,n){i.setContent(n)},"Indent,Outdent":function(e){_w(i,e)},mceRepaint:function(){},InsertHorizontalRule:function(){i.execCommand("mceInsertContent",!1,"<hr />")},mceToggleVisualAid:function(){i.hasVisual=!i.hasVisual,i.addVisual()},mceReplaceContent:function(e,t,n){i.execCommand("mceInsertContent",!1,n.replace(/\{\$selection\}/g,i.selection.getContent({format:"text"})))},mceInsertLink:function(e,t,n){"string"==typeof n&&(n={href:n});var r=i.dom.getParent(i.selection.getNode(),"a");n.href=n.href.replace(/ /g,"%20"),r&&n.href||i.formatter.remove("link"),n.href&&i.formatter.apply("link",n,r)},selectAll:function(){var e,t=i.dom.getParent(i.selection.getStart(),Hn);t&&((e=i.dom.createRng()).selectNodeContents(t),i.selection.setRng(e))},mceNewDocument:function(){i.setContent("")},InsertLineBreak:function(e,t,n){return SS(i,n),!0}});var e=function(r){return function(){var e=i.selection,t=e.isCollapsed()?[i.dom.getParent(e.getNode(),i.dom.isBlock)]:e.getSelectedBlocks(),n=QN(t,function(e){return!!i.formatter.matchNode(e,r)});return-1!==ZN(n,!0)}};a.addCommands({JustifyLeft:e("alignleft"),JustifyCenter:e("aligncenter"),JustifyRight:e("alignright"),JustifyFull:e("alignjustify"),"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){return a.isFormatMatch(e)},mceBlockQuote:function(){return a.isFormatMatch("blockquote")},Outdent:function(){return Nw(i)},"InsertUnorderedList,InsertOrderedList":function(e){var t=i.dom.getParent(i.selection.getNode(),"ul,ol");return t&&("insertunorderedlist"===e&&"UL"===t.tagName||"insertorderedlist"===e&&"OL"===t.tagName)}},"state"),a.addCommands({Undo:function(){i.undoManager.undo()},Redo:function(){i.undoManager.redo()}}),a.addQueryValueHandler("FontName",function(){return KN(t=i,function(e){return $N(t.getBody(),e.dom)}).getOr("");var t},this),a.addQueryValueHandler("FontSize",function(){return KN(t=i,function(e){return qN(t.getBody(),e.dom)}).getOr("");var t},this),a.addQueryValueHandler("LineHeight",function(){return KN(t=i,function(n){var e=At.fromDom(t.getBody());return Pm(n,function(e){return nr(e,"line-height")},N(Ot,e)).getOrThunk(function(){var e=parseFloat(er(n,"line-height")),t=parseFloat(er(n,"font-size"));return String(e/t)})}).getOr("");var t},this)},tE);function tE(e){this.commands={state:{},exec:{},value:{}},this.editor=e,this.setupCommands(e)}var nE="data-mce-contenteditable",rE=function(e,t,n){var r,o;Xu(e,t)&&!1===n?(o=t,Vu(r=e)?r.dom.classList.remove(o):$u(r,o),Ku(r)):n&&Wu(e,t)},oE=function(e,t,n){try{e.getDoc().execCommand(t,!1,String(n))}catch(r){}},iE=function(e,t){e.dom.contentEditable=t?"true":"false"},aE=function(e,t){var n,r,o,i=At.fromDom(e.getBody());rE(i,"mce-content-readonly",t),t?(e.selection.controlSelection.hideResizeRect(),e._selectionOverrides.hideFakeCaret(),o=e,U.from(o.selection.getNode()).each(function(e){e.removeAttribute("data-mce-selected")}),e.readonly=!0,iE(i,!1),W(Gu(i,'*[contenteditable="true"]'),function(e){Xn(e,nE,"true"),iE(e,!1)})):(e.readonly=!1,iE(i,!0),W(Gu(i,"*["+nE+'="true"]'),function(e){Qn(e,nE),iE(e,!0)}),oE(e,"StyleWithCSS",!1),oE(e,"enableInlineTableEditing",!1),oE(e,"enableObjectResizing",!1),(Em(r=e)||Nm(r))&&e.focus(),(n=e).selection.setRng(n.selection.getRng()),e.nodeChanged())},uE=function(e){return e.readonly},sE=function(t){t.parser.addAttributeFilter("contenteditable",function(e){uE(t)&&W(e,function(e){e.attr(nE,e.attr("contenteditable")),e.attr("contenteditable","false")})}),t.serializer.addAttributeFilter(nE,function(e){uE(t)&&W(e,function(e){e.attr("contenteditable",e.attr(nE))})}),t.serializer.addTempAttr(nE)},cE=function(a,u){var e,t;"click"!==u.type||ud.metaKeyPressed(u)||(e=At.fromDom(u.target),t=a,Or(e,"a",function(e){return Ot(e,At.fromDom(t.getBody()))}).bind(function(e){return Jn(e,"href")}).each(function(e){var t,n,r,o,i;u.preventDefault(),/^#/.test(e)?(t=a.dom.select(e+',[name="'+(Ve(n=e,r="#")?(o=n,i=r.length,o.substring(i)):n)+'"]')).length&&a.selection.scrollIntoView(t[0],!0):window.open(e,"_blank","rel=noopener noreferrer,menubar=yes,toolbar=yes,location=yes,status=yes,resizable=yes,scrollbars=yes")}))},lE=kt.makeMap("focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange mouseout mouseenter mouseleave wheel keydown keypress keyup input beforeinput contextmenu dragstart dragend dragover draggesture dragdrop drop drag submit compositionstart compositionend compositionupdate touchstart touchmove touchend touchcancel"," "),fE=(dE.isNative=function(e){return!!lE[e.toLowerCase()]},dE.prototype.fire=function(e,t){var n=e.toLowerCase(),r=t||{};r.type=n,r.target||(r.target=this.scope),r.preventDefault||(r.preventDefault=function(){r.isDefaultPrevented=k},r.stopPropagation=function(){r.isPropagationStopped=k},r.stopImmediatePropagation=function(){r.isImmediatePropagationStopped=k},r.isDefaultPrevented=C,r.isPropagationStopped=C,r.isImmediatePropagationStopped=C),this.settings.beforeFire&&this.settings.beforeFire(r);var o=this.bindings[n];if(o)for(var i=0,a=o.length;i<a;i++){var u=o[i];if(u.once&&this.off(n,u.func),r.isImmediatePropagationStopped())return r.stopPropagation(),r;if(!1===u.func.call(this.scope,r))return r.preventDefault(),r}return r},dE.prototype.on=function(e,t,n,r){if(!1===t&&(t=C),t){var o={func:t};r&&kt.extend(o,r);for(var i=e.toLowerCase().split(" "),a=i.length;a--;){var u=i[a],s=this.bindings[u];s||(s=this.bindings[u]=[],this.toggleEvent(u,!0)),n?s.unshift(o):s.push(o)}}return this},dE.prototype.off=function(e,t){var n=this;if(e)for(var r=e.toLowerCase().split(" "),o=r.length;o--;){var i=r[o],a=this.bindings[i];if(!i)return ue(this.bindings,function(e,t){n.toggleEvent(t,!1),delete n.bindings[t]}),this;if(a){if(t)for(var u=a.length;u--;)a[u].func===t&&(a=a.slice(0,u).concat(a.slice(u+1)),this.bindings[i]=a);else a.length=0;a.length||(this.toggleEvent(e,!1),delete this.bindings[i])}}else ue(this.bindings,function(e,t){n.toggleEvent(t,!1)}),this.bindings={};return this},dE.prototype.once=function(e,t,n){return this.on(e,t,n,{once:!0})},dE.prototype.has=function(e){return e=e.toLowerCase(),!(!this.bindings[e]||0===this.bindings[e].length)},dE);function dE(e){this.bindings={},this.settings=e||{},this.scope=this.settings.scope||this,this.toggleEvent=this.settings.toggleEvent||C}var mE,pE=function(n){return n._eventDispatcher||(n._eventDispatcher=new fE({scope:n,toggleEvent:function(e,t){fE.isNative(e)&&n.toggleNativeEvent&&n.toggleNativeEvent(e,t)}})),n._eventDispatcher},gE={fire:function(e,t,n){if(this.removed&&"remove"!==e&&"detach"!==e)return t;var r=pE(this).fire(e,t);if(!1!==n&&this.parent)for(var o=this.parent();o&&!r.isPropagationStopped();)o.fire(e,r,!1),o=o.parent();return r},on:function(e,t,n){return pE(this).on(e,t,n)},off:function(e,t){return pE(this).off(e,t)},once:function(e,t){return pE(this).once(e,t)},hasEventListeners:function(e){return pE(this).has(e)}},hE=Eu.DOM,vE=function(e,t){if("selectionchange"===t)return e.getDoc();if(!e.inline&&/^mouse|touch|click|contextmenu|drop|dragover|dragend/.test(t))return e.getDoc().documentElement;var n=Ec(e);return n?(e.eventRoot||(e.eventRoot=hE.select(n)[0]),e.eventRoot):e.getBody()},yE=function(e,t,n){var r;(r=e).hidden||uE(r)?uE(e)&&cE(e,n):e.fire(t,n)},bE=function(i,a){var e;if(i.delegates||(i.delegates={}),!i.delegates[a]&&!i.removed){var t=vE(i,a);if(Ec(i)){if(mE||(mE={},i.editorManager.on("removeEditor",function(){i.editorManager.activeEditor||mE&&(ue(mE,function(e,t){i.dom.unbind(vE(i,t))}),mE=null)})),mE[a])return;e=function(e){for(var t=e.target,n=i.editorManager.get(),r=n.length;r--;){var o=n[r].getBody();o!==t&&!hE.isChildOf(t,o)||yE(n[r],a,e)}},mE[a]=e,hE.bind(t,a,e)}else e=function(e){yE(i,a,e)},hE.bind(t,a,e),i.delegates[a]=e}},CE=ke(ke({},gE),{bindPendingEventDelegates:function(){var t=this;kt.each(t._pendingNativeEvents,function(e){bE(t,e)})},toggleNativeEvent:function(e,t){var n=this;"focus"!==e&&"blur"!==e&&(t?n.initialized?bE(n,e):n._pendingNativeEvents?n._pendingNativeEvents.push(e):n._pendingNativeEvents=[e]:n.initialized&&(n.dom.unbind(vE(n,e),e,n.delegates[e]),delete n.delegates[e]))},unbindAllNativeEvents:function(){var n=this,e=n.getBody(),t=n.dom;n.delegates&&(ue(n.delegates,function(e,t){n.dom.unbind(vE(n,t),t,e)}),delete n.delegates),!n.inline&&e&&t&&(e.onload=null,t.unbind(n.getWin()),t.unbind(n.getDoc())),t&&(t.unbind(e),t.unbind(n.getContainer()))}}),wE=["design","readonly"],xE=function(e,t,n,r){var o,i=n[t.get()],a=n[r];try{a.activate()}catch(Ok){return void console.error("problem while activating editor mode "+r+":",Ok)}i.deactivate(),i.editorReadOnly!==a.editorReadOnly&&aE(e,a.editorReadOnly),t.set(r),o=r,e.fire("SwitchMode",{mode:o})},SE=function(t){var e,n,r=Ou("design"),o=Ou({design:{activate:V,deactivate:V,editorReadOnly:!1},readonly:{activate:V,deactivate:V,editorReadOnly:!0}});return(e=t).serializer?sE(e):e.on("PreInit",function(){sE(e)}),(n=t).on("ShowCaret",function(e){uE(n)&&e.preventDefault()}),n.on("ObjectSelected",function(e){uE(n)&&e.preventDefault()}),{isReadOnly:function(){return uE(t)},set:function(e){return function(e,t,n,r){if(r!==n.get()){if(!he(t,r))throw new Error("Editor mode '"+r+"' is invalid");e.initialized?xE(e,n,t,r):e.on("init",function(){return xE(e,n,t,r)})}}(t,o.get(),r,e)},get:function(){return r.get()},register:function(e,t){o.set(function(e,t,n){var r;if(M(wE,t))throw new Error("Cannot override default mode "+t);return ke(ke({},e),((r={})[t]=ke(ke({},n),{deactivate:function(){try{n.deactivate()}catch(Ok){console.error("problem while deactivating editor mode "+t+":",Ok)}}}),r))}(o.get(),e,t))}}},NE=kt.each,EE=kt.explode,kE={f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},_E=kt.makeMap("alt,ctrl,shift,meta,access"),AE=(RE.prototype.add=function(e,n,t,r){var o=this,i=o.normalizeCommandFunc(t);return NE(EE(kt.trim(e)),function(e){var t=o.createShortcut(e,n,i,r);o.shortcuts[t.id]=t}),!0},RE.prototype.remove=function(e){var t=this.createShortcut(e);return!!this.shortcuts[t.id]&&(delete this.shortcuts[t.id],!0)},RE.prototype.normalizeCommandFunc=function(e){var t=this,n=e;return"string"==typeof n?function(){t.editor.execCommand(n,!1,null)}:kt.isArray(n)?function(){t.editor.execCommand(n[0],n[1],n[2])}:n},RE.prototype.parseShortcut=function(e){var t,n={};NE(EE(e.toLowerCase(),"+"),function(e){e in _E?n[e]=!0:/^[0-9]{2,}$/.test(e)?n.keyCode=parseInt(e,10):(n.charCode=e.charCodeAt(0),n.keyCode=kE[e]||e.toUpperCase().charCodeAt(0))});var r=[n.keyCode];for(t in _E)n[t]?r.push(t):n[t]=!1;return n.id=r.join(","),n.access&&(n.alt=!0,wt.mac?n.ctrl=!0:n.shift=!0),n.meta&&(wt.mac?n.meta=!0:(n.ctrl=!0,n.meta=!1)),n},RE.prototype.createShortcut=function(e,t,n,r){var o=kt.map(EE(e,">"),this.parseShortcut);return o[o.length-1]=kt.extend(o[o.length-1],{func:n,scope:r||this.editor}),kt.extend(o[0],{desc:this.editor.translate(t),subpatterns:o.slice(1)})},RE.prototype.hasModifier=function(e){return e.altKey||e.ctrlKey||e.metaKey},RE.prototype.isFunctionKey=function(e){return"keydown"===e.type&&112<=e.keyCode&&e.keyCode<=123},RE.prototype.matchShortcut=function(e,t){return!!t&&t.ctrl===e.ctrlKey&&t.meta===e.metaKey&&t.alt===e.altKey&&t.shift===e.shiftKey&&!!(e.keyCode===t.keyCode||e.charCode&&e.charCode===t.charCode)&&(e.preventDefault(),!0)},RE.prototype.executeShortcutAction=function(e){return e.func?e.func.call(e.scope):null},RE);function RE(e){this.shortcuts={},this.pendingPatterns=[],this.editor=e;var n=this;e.on("keyup keypress keydown",function(t){!n.hasModifier(t)&&!n.isFunctionKey(t)||t.isDefaultPrevented()||(NE(n.shortcuts,function(e){if(n.matchShortcut(t,e))return n.pendingPatterns=e.subpatterns.slice(0),"keydown"===t.type&&n.executeShortcutAction(e),!0}),n.matchShortcut(t,n.pendingPatterns[0])&&(1===n.pendingPatterns.length&&"keydown"===t.type&&n.executeShortcutAction(n.pendingPatterns[0]),n.pendingPatterns.shift()))})}var TE=function(){var e,t,n,r,o,i,a,u,s=(t={},n={},r={},o={},i={},a={},{addButton:(u=function(n,r){return function(e,t){return n[e.toLowerCase()]=ke(ke({},t),{type:r})}})(e={},"button"),addGroupToolbarButton:u(e,"grouptoolbarbutton"),addToggleButton:u(e,"togglebutton"),addMenuButton:u(e,"menubutton"),addSplitButton:u(e,"splitbutton"),addMenuItem:u(t,"menuitem"),addNestedMenuItem:u(t,"nestedmenuitem"),addToggleMenuItem:u(t,"togglemenuitem"),addAutocompleter:u(n,"autocompleter"),addContextMenu:u(o,"contextmenu"),addContextToolbar:u(i,"contexttoolbar"),addContextForm:u(i,"contextform"),addSidebar:u(a,"sidebar"),addIcon:function(e,t){return r[e.toLowerCase()]=t},getAll:function(){return{buttons:e,menuItems:t,icons:r,popups:n,contextMenus:o,contextToolbars:i,sidebars:a}}});return{addAutocompleter:s.addAutocompleter,addButton:s.addButton,addContextForm:s.addContextForm,addContextMenu:s.addContextMenu,addContextToolbar:s.addContextToolbar,addIcon:s.addIcon,addMenuButton:s.addMenuButton,addMenuItem:s.addMenuItem,addNestedMenuItem:s.addNestedMenuItem,addSidebar:s.addSidebar,addSplitButton:s.addSplitButton,addToggleButton:s.addToggleButton,addGroupToolbarButton:s.addGroupToolbarButton,addToggleMenuItem:s.addToggleMenuItem,getAll:s.getAll}},DE=kt.each,OE=kt.trim,BE="source protocol authority userInfo user password host port relative path directory file query anchor".split(" "),PE={ftp:21,http:80,https:443,mailto:25},LE=(IE.parseDataUri=function(e){var t,n=decodeURIComponent(e).split(","),r=/data:([^;]+)/.exec(n[0]);return r&&(t=r[1]),{type:t,data:n[1]}},IE.getDocumentBaseUrl=function(e){var t=0!==e.protocol.indexOf("http")&&"file:"!==e.protocol?e.href:e.protocol+"//"+e.host+e.pathname;return/^[^:]+:\/\/\/?[^\/]+\//.test(t)&&(t=t.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,""),/[\/\\]$/.test(t)||(t+="/")),t},IE.prototype.setPath=function(e){var t=/^(.*?)\/?(\w+)?$/.exec(e);this.path=t[0],this.directory=t[1],this.file=t[2],this.source="",this.getURI()},IE.prototype.toRelative=function(e){var t;if("./"===e)return e;var n=new IE(e,{base_uri:this});if("mce_host"!==n.host&&this.host!==n.host&&n.host||this.port!==n.port||this.protocol!==n.protocol&&""!==n.protocol)return n.getURI();var r=this.getURI(),o=n.getURI();return r===o||"/"===r.charAt(r.length-1)&&r.substr(0,r.length-1)===o?r:(t=this.toRelPath(this.path,n.path),n.query&&(t+="?"+n.query),n.anchor&&(t+="#"+n.anchor),t)},IE.prototype.toAbsolute=function(e,t){var n=new IE(e,{base_uri:this});return n.getURI(t&&this.isSameOrigin(n))},IE.prototype.isSameOrigin=function(e){if(this.host==e.host&&this.protocol==e.protocol){if(this.port==e.port)return!0;var t=PE[this.protocol];if(t&&(this.port||t)==(e.port||t))return!0}return!1},IE.prototype.toRelPath=function(e,t){var n,r,o=0,i="",a=e.substring(0,e.lastIndexOf("/")).split("/"),u=t.split("/");if(a.length>=u.length)for(n=0,r=a.length;n<r;n++)if(n>=u.length||a[n]!==u[n]){o=n+1;break}if(a.length<u.length)for(n=0,r=u.length;n<r;n++)if(n>=a.length||a[n]!==u[n]){o=n+1;break}if(1===o)return t;for(n=0,r=a.length-(o-1);n<r;n++)i+="../";for(n=o-1,r=u.length;n<r;n++)i+=n!==o-1?"/"+u[n]:u[n];return i},IE.prototype.toAbsPath=function(e,t){var n,r,o=0,i=[],a=/\/$/.test(t)?"/":"",u=e.split("/"),s=t.split("/");for(DE(u,function(e){e&&i.push(e)}),u=i,n=s.length-1,i=[];0<=n;n--)0!==s[n].length&&"."!==s[n]&&(".."!==s[n]?0<o?o--:i.push(s[n]):o++);return 0!==(r=(n=u.length-o)<=0?Z(i).join("/"):u.slice(0,n).join("/")+"/"+Z(i).join("/")).indexOf("/")&&(r="/"+r),a&&r.lastIndexOf("/")!==r.length-1&&(r+=a),r},IE.prototype.getURI=function(e){var t;return void 0===e&&(e=!1),this.source&&!e||(t="",e||(this.protocol?t+=this.protocol+"://":t+="//",this.userInfo&&(t+=this.userInfo+"@"),this.host&&(t+=this.host),this.port&&(t+=":"+this.port)),this.path&&(t+=this.path),this.query&&(t+="?"+this.query),this.anchor&&(t+="#"+this.anchor),this.source=t),this.source},IE);function IE(e,t){e=OE(e),this.settings=t||{};var n,r,o,i,a=this.settings.base_uri,u=this;/^([\w\-]+):([^\/]{2})/i.test(e)||/^\s*#/.test(e)?u.source=e:(n=0===e.indexOf("//"),0!==e.indexOf("/")||n||(e=(a&&a.protocol||"http")+"://mce_host"+e),/^[\w\-]*:?\/\//.test(e)||(r=this.settings.base_uri?this.settings.base_uri.path:new IE(document.location.href).directory,e=this.settings.base_uri&&""==this.settings.base_uri.protocol?"//mce_host"+u.toAbsPath(r,e):(o=/([^#?]*)([#?]?.*)/.exec(e),(a&&a.protocol||"http")+"://mce_host"+u.toAbsPath(r,o[1])+o[2])),e=e.replace(/@@/g,"(mce_at)"),i=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e),DE(BE,function(e,t){var n=(n=i[t])&&n.replace(/\(mce_at\)/g,"@@");u[e]=n}),a&&(u.protocol||(u.protocol=a.protocol),u.userInfo||(u.userInfo=a.userInfo),u.port||"mce_host"!==u.host||(u.port=a.port),u.host&&"mce_host"!==u.host||(u.host=a.host),u.source=""),n&&(u.protocol=""))}var ME=Eu.DOM,FE=kt.extend,UE=kt.each,zE=kt.resolve,jE=wt.ie,HE=(VE.prototype.render=function(){UN(this)},VE.prototype.focus=function(e){var t,n;n=e,(t=this).removed||(n?_m:km)(t)},VE.prototype.hasFocus=function(){return Em(this)},VE.prototype.execCallback=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r,o=this.settings[e];if(o)return this.callbackLookup&&(r=this.callbackLookup[e])&&(o=r.func,r=r.scope),"string"==typeof o&&(r=(r=o.replace(/\.\w+$/,""))?zE(r):0,o=zE(o),this.callbackLookup=this.callbackLookup||{},this.callbackLookup[e]={func:o,scope:r}),o.apply(r||this,t)},VE.prototype.translate=function(e){return Iu.translate(e)},VE.prototype.getParam=function(e,t,n){return Xy(this,e,t,n)},VE.prototype.hasPlugin=function(e,t){return!(!M(Ac(this).split(/[ ,]/),e)||t&&ib.get(e)===undefined)},VE.prototype.nodeChanged=function(e){this._nodeChangeDispatcher.nodeChanged(e)},VE.prototype.addCommand=function(e,t,n){this.editorCommands.addCommand(e,t,n)},VE.prototype.addQueryStateHandler=function(e,t,n){this.editorCommands.addQueryStateHandler(e,t,n)},VE.prototype.addQueryValueHandler=function(e,t,n){this.editorCommands.addQueryValueHandler(e,t,n)},VE.prototype.addShortcut=function(e,t,n,r){this.shortcuts.add(e,t,n,r)},VE.prototype.execCommand=function(e,t,n,r){return this.editorCommands.execCommand(e,t,n,r)},VE.prototype.queryCommandState=function(e){return this.editorCommands.queryCommandState(e)},VE.prototype.queryCommandValue=function(e){return this.editorCommands.queryCommandValue(e)},VE.prototype.queryCommandSupported=function(e){return this.editorCommands.queryCommandSupported(e)},VE.prototype.show=function(){this.hidden&&(this.hidden=!1,this.inline?this.getBody().contentEditable="true":(ME.show(this.getContainer()),ME.hide(this.id)),this.load(),this.fire("show"))},VE.prototype.hide=function(){var e=this,t=e.getDoc();e.hidden||(jE&&t&&!e.inline&&t.execCommand("SelectAll"),e.save(),e.inline?(e.getBody().contentEditable="false",e===e.editorManager.focusedEditor&&(e.editorManager.focusedEditor=null)):(ME.hide(e.getContainer()),ME.setStyle(e.id,"display",e.orgDisplay)),e.hidden=!0,e.fire("hide"))},VE.prototype.isHidden=function(){return!!this.hidden},VE.prototype.setProgressState=function(e,t){this.fire("ProgressState",{state:e,time:t})},VE.prototype.load=function(e){var t=this.getElement();if(this.removed)return"";if(t){(e=e||{}).load=!0;var n=Ln(t)?t.value:t.innerHTML,r=this.setContent(n,e);return e.element=t,e.no_events||this.fire("LoadContent",e),e.element=t=null,r}},VE.prototype.save=function(e){var t,n,r=this,o=r.getElement();if(o&&r.initialized&&!r.removed)return(e=e||{}).save=!0,e.element=o,e.content=r.getContent(e),e.no_events||r.fire("SaveContent",e),"raw"===e.format&&r.fire("RawSaveContent",e),t=e.content,Ln(o)?o.value=t:(!e.is_removing&&r.inline||(o.innerHTML=t),(n=ME.getParent(r.id,"form"))&&UE(n.elements,function(e){if(e.name===r.id)return e.value=t,!1})),e.element=o=null,!1!==e.set_dirty&&r.setDirty(!1),t},VE.prototype.setContent=function(e,t){return ky(this,e,t)},VE.prototype.getContent=function(e){return Ey(this,e)},VE.prototype.insertContent=function(e,t){t&&(e=FE({content:e},t)),this.execCommand("mceInsertContent",!1,e)},VE.prototype.resetContent=function(e){e===undefined?ky(this,this.startContent,{format:"raw"}):ky(this,e),this.undoManager.reset(),this.setDirty(!1),this.nodeChanged()},VE.prototype.isDirty=function(){return!this.isNotDirty},VE.prototype.setDirty=function(e){var t=!this.isNotDirty;this.isNotDirty=!e,e&&e!==t&&this.fire("dirty")},VE.prototype.getContainer=function(){return this.container||(this.container=ME.get(this.editorContainer||this.id+"_parent")),this.container},VE.prototype.getContentAreaContainer=function(){return this.contentAreaContainer},VE.prototype.getElement=function(){return this.targetElm||(this.targetElm=ME.get(this.id)),this.targetElm},VE.prototype.getWin=function(){var e;return this.contentWindow||(e=this.iframeElement)&&(this.contentWindow=e.contentWindow),this.contentWindow},VE.prototype.getDoc=function(){var e;return this.contentDocument||(e=this.getWin())&&(this.contentDocument=e.document),this.contentDocument},VE.prototype.getBody=function(){var e=this.getDoc();return this.bodyElement||(e?e.body:null)},VE.prototype.convertURL=function(e,t,n){var r=this.settings;return r.urlconverter_callback?this.execCallback("urlconverter_callback",e,n,!0,t):!r.convert_urls||n&&"LINK"===n.nodeName||0===e.indexOf("file:")||0===e.length?e:r.relative_urls?this.documentBaseURI.toRelative(e):e=this.documentBaseURI.toAbsolute(e,r.remove_script_host)},VE.prototype.addVisual=function(e){zN(this,e)},VE.prototype.remove=function(){Ry(this)},VE.prototype.destroy=function(e){Ty(this,e)},VE.prototype.uploadImages=function(e){return this.editorUpload.uploadImages(e)},VE.prototype._scanForImages=function(){return this.editorUpload.scanForImages()},VE.prototype.addButton=function(){throw new Error("editor.addButton has been removed in tinymce 5x, use editor.ui.registry.addButton or editor.ui.registry.addToggleButton or editor.ui.registry.addSplitButton instead")},VE.prototype.addSidebar=function(){throw new Error("editor.addSidebar has been removed in tinymce 5x, use editor.ui.registry.addSidebar instead")},VE.prototype.addMenuItem=function(){throw new Error("editor.addMenuItem has been removed in tinymce 5x, use editor.ui.registry.addMenuItem instead")},VE.prototype.addContextToolbar=function(){throw new Error("editor.addContextToolbar has been removed in tinymce 5x, use editor.ui.registry.addContextToolbar instead")},VE);function VE(e,t,n){var r=this;this.plugins={},this.contentCSS=[],this.contentStyles=[],this.loadedCSS={},this.isNotDirty=!1,this.editorManager=n,this.documentBaseUrl=n.documentBaseURL,FE(this,CE),this.settings=Wy(this,e,this.documentBaseUrl,n.defaultSettings,t),this.settings.suffix&&(n.suffix=this.settings.suffix),this.suffix=n.suffix,this.settings.base_url&&n._setBaseUrl(this.settings.base_url),this.baseUri=n.baseURI,this.settings.referrer_policy&&(Ru.ScriptLoader._setReferrerPolicy(this.settings.referrer_policy),Eu.DOM.styleSheetLoader._setReferrerPolicy(this.settings.referrer_policy)),Uu.languageLoad=this.settings.language_load,Uu.baseURL=n.baseURL,this.id=e,this.setDirty(!1),this.documentBaseURI=new LE(this.settings.document_base_url,{base_uri:this.baseUri}),this.baseURI=this.baseUri,this.inline=!!this.settings.inline,this.shortcuts=new AE(this),this.editorCommands=new eE(this),this.settings.cache_suffix&&(wt.cacheSuffix=this.settings.cache_suffix.replace(/^[\?\&]+/,"")),this.ui={registry:TE(),styleSheetLoader:undefined,show:V,hide:V,enable:V,disable:V,isDisabled:C};var o=SE(this);this.mode=o,this.setMode=o.set,n.fire("SetupEditor",{editor:this}),this.execCallback("setup",this),this.$=hu.overrideDefaults(function(){return{context:r.inline?r.getBody():r.getDoc(),element:r.getBody()}})}var qE,$E=Eu.DOM,WE=kt.explode,KE=kt.each,XE=kt.extend,YE=0,GE=!1,JE=[],QE=[],ZE=function(t){var n=t.type;KE(rk.get(),function(e){switch(n){case"scroll":e.fire("ScrollWindow",t);break;case"resize":e.fire("ResizeWindow",t)}})},ek=function(e){e!==GE&&(e?hu(window).on("resize scroll",ZE):hu(window).off("resize scroll",ZE),GE=e)},tk=function(t){var e=QE;delete JE[t.id];for(var n=0;n<JE.length;n++)if(JE[n]===t){JE.splice(n,1);break}return QE=H(QE,function(e){return t!==e}),rk.activeEditor===t&&(rk.activeEditor=0<QE.length?QE[0]:null),rk.focusedEditor===t&&(rk.focusedEditor=null),e.length!==QE.length},nk="CSS1Compat"!==document.compatMode,rk=ke(ke({},gE),{baseURI:null,baseURL:null,defaultSettings:{},documentBaseURL:null,suffix:null,$:hu,majorVersion:"5",minorVersion:"6.2",releaseDate:"2020-12-08",editors:JE,i18n:Iu,activeEditor:null,focusedEditor:null,settings:{},setup:function(){var e,t="",n=LE.getDocumentBaseUrl(document.location);/^[^:]+:\/\/\/?[^\/]+\//.test(n)&&(n=n.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,""),/[\/\\]$/.test(n)||(n+="/"));var r,o=window.tinymce||window.tinyMCEPreInit;if(o)e=o.base||o.baseURL,t=o.suffix;else{for(var i,a=document.getElementsByTagName("script"),u=0;u<a.length;u++){if(""!==(i=a[u].src||"")){var s=i.substring(i.lastIndexOf("/"));if(/tinymce(\.full|\.jquery|)(\.min|\.dev|)\.js/.test(i)){-1!==s.indexOf(".min")&&(t=".min"),e=i.substring(0,i.lastIndexOf("/"));break}}}!e&&document.currentScript&&(-1!==(i=document.currentScript.src).indexOf(".min")&&(t=".min"),e=i.substring(0,i.lastIndexOf("/")))}this.baseURL=new LE(n).toAbsolute(e),this.documentBaseURL=n,this.baseURI=new LE(this.baseURL),this.suffix=t,(r=this).on("AddEditor",N(ym,r)),r.on("RemoveEditor",N(bm,r))},overrideDefaults:function(e){var t=e.base_url;t&&this._setBaseUrl(t);var n=e.suffix;e.suffix&&(this.suffix=n);var r=(this.defaultSettings=e).plugin_base_urls;r!==undefined&&ue(r,function(e,t){Uu.PluginManager.urls[t]=e})},init:function(r){var n,u=this,s=kt.makeMap("area base basefont br col frame hr img input isindex link meta param embed source wbr track colgroup option table tbody tfoot thead tr th td script noscript style textarea video audio iframe object menu"," "),c=function(e){var t=e.id;return t||(t=ge(e,"name").filter(function(e){return!$E.get(e)}).getOrThunk($E.uniqueId),e.setAttribute("id",t)),t},l=function(e,t){return t.constructor===RegExp?t.test(e.className):$E.hasClass(e,t)},f=function(e){n=e},e=function(){var o,i=0,a=[],n=function(e,t,n){var r=new HE(e,t,u);a.push(r),r.on("init",function(){++i===o.length&&f(a)}),r.targetElm=r.targetElm||n,r.render()};$E.unbind(window,"ready",e),function(e){var t=r[e];if(t)t.apply(u,Array.prototype.slice.call(arguments,2))}("onpageload"),o=hu.unique(function(t){var n=[];if(wt.browser.isIE()&&wt.browser.version.major<11)return mb("TinyMCE does not support the browser you are using. For a list of supported browsers please see: https://www.tinymce.com/docs/get-started/system-requirements/"),[];if(nk)return mb("Failed to initialize the editor as the document is not in standards mode. TinyMCE requires standards mode."),[];if(t.types)return KE(t.types,function(e){n=n.concat($E.select(e.selector))}),n;if(t.selector)return $E.select(t.selector);if(t.target)return[t.target];switch(t.mode){case"exact":var e=t.elements||"";0<e.length&&KE(WE(e),function(t){var e=$E.get(t);e?n.push(e):KE(document.forms,function(e){KE(e.elements,function(e){e.name===t&&(t="mce_editor_"+YE++,$E.setAttrib(e,"id",t),n.push(e))})})});break;case"textareas":case"specific_textareas":KE($E.select("textarea"),function(e){t.editor_deselector&&l(e,t.editor_deselector)||t.editor_selector&&!l(e,t.editor_selector)||n.push(e)})}return n}(r)),r.types?KE(r.types,function(t){kt.each(o,function(e){return!$E.is(e,t.selector)||(n(c(e),XE({},r,t),e),!1)})}):(kt.each(o,function(e){var t;(t=u.get(e.id))&&t.initialized&&!(t.getContainer()||t.getBody()).parentNode&&(tk(t),t.unbindAllNativeEvents(),t.destroy(!0),t.removed=!0,t=null)}),0===(o=kt.grep(o,function(e){return!u.get(e.id)})).length?f([]):KE(o,function(e){var t;t=e,r.inline&&t.tagName.toLowerCase()in s?mb("Could not initialize inline editor on invalid inline target element",e):n(c(e),r,e)}))};return u.settings=r,$E.bind(window,"ready",e),new Br(function(t){n?t(n):f=function(e){t(e)}})},get:function(t){return 0===arguments.length?QE.slice(0):q(t)?Y(QE,function(e){return e.id===t}).getOr(null):O(t)&&QE[t]?QE[t]:null},add:function(e){var n=this;return JE[e.id]===e||(null===n.get(e.id)&&("length"!==e.id&&(JE[e.id]=e),JE.push(e),QE.push(e)),ek(!0),n.activeEditor=e,n.fire("AddEditor",{editor:e}),qE||(qE=function(e){var t=n.fire("BeforeUnload");if(t.returnValue)return e.preventDefault(),e.returnValue=t.returnValue,t.returnValue},window.addEventListener("beforeunload",qE))),e},createEditor:function(e,t){return this.add(new HE(e,t,this))},remove:function(e){var t,n,r=this;if(e){if(!q(e))return n=e,x(r.get(n.id))?null:(tk(n)&&r.fire("RemoveEditor",{editor:n}),0===QE.length&&window.removeEventListener("beforeunload",qE),n.remove(),ek(0<QE.length),n);KE($E.select(e),function(e){(n=r.get(e.id))&&r.remove(n)})}else for(t=QE.length-1;0<=t;t--)r.remove(QE[t])},execCommand:function(e,t,n){var r=this.get(n);switch(e){case"mceAddEditor":return this.get(n)||new HE(n,this.settings,this).render(),!0;case"mceRemoveEditor":return r&&r.remove(),!0;case"mceToggleEditor":return r?(r.isHidden()?r.show():r.hide(),!0):(this.execCommand("mceAddEditor",0,n),!0)}return!!this.activeEditor&&this.activeEditor.execCommand(e,t,n)},triggerSave:function(){KE(QE,function(e){e.save()})},addI18n:function(e,t){Iu.add(e,t)},translate:function(e){return Iu.translate(e)},setActive:function(e){var t=this.activeEditor;this.activeEditor!==e&&(t&&t.fire("deactivate",{relatedTarget:e}),e.fire("activate",{relatedTarget:t})),this.activeEditor=e},_setBaseUrl:function(e){this.baseURL=new LE(this.documentBaseURL).toAbsolute(e.replace(/\/+$/,"")),this.baseURI=new LE(this.baseURL)}});rk.setup();var ok,ik,ak,uk,sk=Math.min,ck=Math.max,lk=Math.round,fk=function(e,t,n){var r=t.x,o=t.y,i=e.w,a=e.h,u=t.w,s=t.h,c=(n||"").split("");return"b"===c[0]&&(o+=s),"r"===c[1]&&(r+=u),"c"===c[0]&&(o+=lk(s/2)),"c"===c[1]&&(r+=lk(u/2)),"b"===c[3]&&(o-=a),"r"===c[4]&&(r-=i),"c"===c[3]&&(o-=lk(a/2)),"c"===c[4]&&(r-=lk(i/2)),dk(r,o,i,a)},dk=function(e,t,n,r){return{x:e,y:t,w:n,h:r}},mk={inflate:function(e,t,n){return dk(e.x-t,e.y-n,e.w+2*t,e.h+2*n)},relativePosition:fk,findBestRelativePosition:function(e,t,n,r){for(var o,i=0;i<r.length;i++)if((o=fk(e,t,r[i])).x>=n.x&&o.x+o.w<=n.w+n.x&&o.y>=n.y&&o.y+o.h<=n.h+n.y)return r[i];return null},intersect:function(e,t){var n=ck(e.x,t.x),r=ck(e.y,t.y),o=sk(e.x+e.w,t.x+t.w),i=sk(e.y+e.h,t.y+t.h);return o-n<0||i-r<0?null:dk(n,r,o-n,i-r)},clamp:function(e,t,n){var r=e.x,o=e.y,i=e.x+e.w,a=e.y+e.h,u=t.x+t.w,s=t.y+t.h,c=ck(0,t.x-r),l=ck(0,t.y-o),f=ck(0,i-u),d=ck(0,a-s);return r+=c,o+=l,n&&(i+=c,a+=l,r-=f,o-=d),dk(r,o,(i-=f)-r,(a-=d)-o)},create:dk,fromClientRect:function(e){return dk(e.left,e.top,e.width,e.height)}},pk=(ok={},ik={},{load:function(r,o){var i='Script at URL "'+o+'" failed to load',a='Script at URL "'+o+"\" did not call `tinymce.Resource.add('"+r+"', data)` within 1 second";if(ok[r]!==undefined)return ok[r];var e=new Br(function(e,t){var n=function(e,t,n){void 0===n&&(n=1e3);var r=!1,o=null,i=function(n){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r||(r=!0,null!==o&&(clearTimeout(o),o=null),n.apply(null,e))}},a=i(e),u=i(t);return{start:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r||null!==o||(o=setTimeout(function(){return u.apply(null,e)},n))},resolve:a,reject:u}}(e,t);ik[r]=n.resolve,Ru.ScriptLoader.loadScript(o,function(){return n.start(a)},function(){return n.reject(i)})});return ok[r]=e},add:function(e,t){ik[e]!==undefined&&(ik[e](t),delete ik[e]),ok[e]=Br.resolve(t)}}),gk=kt.each,hk=kt.extend,vk=function(){};vk.extend=ak=function(n){var o=this.prototype,r=function(){var e,t,n;if(!uk&&(this.init&&this.init.apply(this,arguments),t=this.Mixins))for(e=t.length;e--;)(n=t[e]).init&&n.init.apply(this,arguments)},t=function(){return this};uk=!0;var i=new this;return uk=!1,n.Mixins&&(gk(n.Mixins,function(e){for(var t in e)"init"!==t&&(n[t]=e[t])}),o.Mixins&&(n.Mixins=o.Mixins.concat(n.Mixins))),n.Methods&&gk(n.Methods.split(","),function(e){n[e]=t}),n.Properties&&gk(n.Properties.split(","),function(e){var t="_"+e;n[e]=function(e){return e!==undefined?(this[t]=e,this):this[t]}}),n.Statics&&gk(n.Statics,function(e,t){r[t]=e}),n.Defaults&&o.Defaults&&(n.Defaults=hk({},o.Defaults,n.Defaults)),ue(n,function(e,t){var n,r;"function"==typeof e&&o[t]?i[t]=(n=t,r=e,function(){var e=this._super;this._super=o[n];var t=r.apply(this,arguments);return this._super=e,t}):i[t]=e}),r.prototype=i,(r.constructor=r).extend=ak,r};var yk=Math.min,bk=Math.max,Ck=Math.round,wk={serialize:function(e){var t=JSON.stringify(e);return q(t)?t.replace(/[\u0080-\uFFFF]/g,function(e){var t=e.charCodeAt(0).toString(16);return"\\u"+"0000".substring(t.length)+t}):t},parse:function(e){try{return JSON.parse(e)}catch(t){}}},xk={callbacks:{},count:0,send:function(t){var n=this,r=Eu.DOM,o=t.count!==undefined?t.count:n.count,i="tinymce_jsonp_"+o;n.callbacks[o]=function(e){r.remove(i),delete n.callbacks[o],t.callback(e)},r.add(r.doc.body,"script",{id:i,src:t.url,type:"text/javascript"}),n.count++}},Sk=ke(ke({},gE),{send:function(e){var t,n=0,r=function(){!e.async||4===t.readyState||1e4<n++?(e.success&&n<1e4&&200===t.status?e.success.call(e.success_scope,""+t.responseText,t,e):e.error&&e.error.call(e.error_scope,1e4<n?"TIMED_OUT":"GENERAL",t,e),t=null):qr.setTimeout(r,10)};if(e.scope=e.scope||this,e.success_scope=e.success_scope||e.scope,e.error_scope=e.error_scope||e.scope,e.async=!1!==e.async,e.data=e.data||"",Sk.fire("beforeInitialize",{settings:e}),(t=new XMLHttpRequest).overrideMimeType&&t.overrideMimeType(e.content_type),t.open(e.type||(e.data?"POST":"GET"),e.url,e.async),e.crossDomain&&(t.withCredentials=!0),e.content_type&&t.setRequestHeader("Content-Type",e.content_type),e.requestheaders&&kt.each(e.requestheaders,function(e){t.setRequestHeader(e.key,e.value)}),t.setRequestHeader("X-Requested-With","XMLHttpRequest"),(t=Sk.fire("beforeSend",{xhr:t,settings:e}).xhr).send(e.data),!e.async)return r();qr.setTimeout(r,10)}}),Nk=kt.extend,Ek=(kk.sendRPC=function(e){return(new kk).send(e)},kk.prototype.send=function(e){var n=e.error,r=e.success,o=Nk(this.settings,e);o.success=function(e,t){void 0===(e=wk.parse(e))&&(e={error:"JSON Parse error."}),e.error?n.call(o.error_scope||o.scope,e.error,t):r.call(o.success_scope||o.scope,e.result)},o.error=function(e,t){n&&n.call(o.error_scope||o.scope,e,t)},o.data=wk.serialize({id:e.id||"c"+this.count++,method:e.method,params:e.params}),o.content_type="application/json",Sk.send(o)},kk);function kk(e){this.settings=Nk({},e),this.count=0}try{var _k,Ak="__storage_test__";(_k=window.localStorage).setItem(Ak,Ak),_k.removeItem(Ak)}catch(Ok){_k=function(){return n={},r=[],e={getItem:function(e){var t=n[e];return t||null},setItem:function(e,t){r.push(e),n[e]=String(t)},key:function(e){return r[e]},removeItem:function(t){r=r.filter(function(e){return e===t}),delete n[t]},clear:function(){r=[],n={}},length:0},Object.defineProperty(e,"length",{get:function(){return r.length},configurable:!1,enumerable:!1}),e;var n,r,e}()}var Rk,Tk={geom:{Rect:mk},util:{Promise:Br,Delay:qr,Tools:kt,VK:ud,URI:LE,Class:vk,EventDispatcher:fE,Observable:gE,I18n:Iu,XHR:Sk,JSON:wk,JSONRequest:Ek,JSONP:xk,LocalStorage:_k,Color:function(e){var n={},u=0,s=0,c=0,t=function(e){var t;return"object"==typeof e?"r"in e?(u=e.r,s=e.g,c=e.b):"v"in e&&function(e,t,n){if(e=(parseInt(e,10)||0)%360,t=parseInt(t,10)/100,n=parseInt(n,10)/100,t=bk(0,yk(t,1)),n=bk(0,yk(n,1)),0!==t){var r=e/60,o=n*t,i=o*(1-Math.abs(r%2-1)),a=n-o;switch(Math.floor(r)){case 0:u=o,s=i,c=0;break;case 1:u=i,s=o,c=0;break;case 2:u=0,s=o,c=i;break;case 3:u=0,s=i,c=o;break;case 4:u=i,s=0,c=o;break;case 5:u=o,s=0,c=i;break;default:u=s=c=0}u=Ck(255*(u+a)),s=Ck(255*(s+a)),c=Ck(255*(c+a))}else u=s=c=Ck(255*n)}(e.h,e.s,e.v):(t=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)[^\)]*\)/gi.exec(e))?(u=parseInt(t[1],10),s=parseInt(t[2],10),c=parseInt(t[3],10)):(t=/#([0-F]{2})([0-F]{2})([0-F]{2})/gi.exec(e))?(u=parseInt(t[1],16),s=parseInt(t[2],16),c=parseInt(t[3],16)):(t=/#([0-F])([0-F])([0-F])/gi.exec(e))&&(u=parseInt(t[1]+t[1],16),s=parseInt(t[2]+t[2],16),c=parseInt(t[3]+t[3],16)),u=u<0?0:255<u?255:u,s=s<0?0:255<s?255:s,c=c<0?0:255<c?255:c,n};return e&&t(e),n.toRgb=function(){return{r:u,g:s,b:c}},n.toHsv=function(){return e=u,t=s,n=c,o=0,i=yk(e/=255,yk(t/=255,n/=255)),a=bk(e,bk(t,n)),i===a?{h:0,s:0,v:100*(o=i)}:(r=(a-i)/a,{h:Ck(60*((e===i?3:n===i?1:5)-(e===i?t-n:n===i?e-t:n-e)/((o=a)-i))),s:Ck(100*r),v:Ck(100*o)});var e,t,n,r,o,i,a},n.toHex=function(){var e=function(e){return 1<(e=parseInt(e,10).toString(16)).length?e:"0"+e};return"#"+e(u)+e(s)+e(c)},n.parse=t,n}},dom:{EventUtils:Ti,Sizzle:Ta,DomQuery:hu,TreeWalker:Xr,TextSeeker:fs,DOMUtils:Eu,ScriptLoader:Ru,RangeUtils:xd,Serializer:Ny,StyleSheetLoader:$r,ControlSelection:cd,BookmarkManager:od,Selection:Qv,Event:Ti.Event},html:{Styles:xi,Entities:ci,Node:Km,Schema:Ci,SaxParser:ip,DomParser:by,Writer:Gm,Serializer:Jm},Env:wt,AddOnManager:Uu,Annotator:td,Formatter:_b,UndoManager:Rb,EditorCommands:eE,WindowManager:ub,NotificationManager:ob,EditorObservable:CE,Shortcuts:AE,Editor:HE,FocusManager:mm,EditorManager:rk,DOM:Eu.DOM,ScriptLoader:Ru.ScriptLoader,PluginManager:ib,ThemeManager:ab,IconManager:Yy,Resource:pk,trim:kt.trim,isArray:kt.isArray,is:kt.is,toArray:kt.toArray,makeMap:kt.makeMap,each:kt.each,map:kt.map,grep:kt.grep,inArray:kt.inArray,extend:kt.extend,create:kt.create,walk:kt.walk,createNS:kt.createNS,resolve:kt.resolve,explode:kt.explode,_addCacheSuffix:kt._addCacheSuffix,isOpera:wt.opera,isWebKit:wt.webkit,isIE:wt.ie,isGecko:wt.gecko,isMac:wt.mac},Dk=kt.extend(rk,Tk);Rk=Dk,window.tinymce=Rk,window.tinyMCE=Rk,function(e){if("object"==typeof module)try{module.exports=e}catch(t){}}(Dk)}();
;
//# sourceMappingURL=scripts.js.map