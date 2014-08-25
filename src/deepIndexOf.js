(function (window, document, undefined) {'use strict';

if (!Array.prototype.deepIndexOf) {
	function deepIndexOf(searchElement /*, fromIndex */ ) {
		"use strict";
		if (this == null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;

		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n != 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}

		// angularjs's equals, but made independent of angular
		var equals = function(o1, o2) {
			if (o1 === o2) return true;
			if (o1 === null || o2 === null) return false;
			if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
			var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
			if (t1 == t2) {
				if (t1 == 'object') {
					if (Object.prototype.toString.call(o1) === '[object Array]') {
						if ((length = o1.length) == o2.length) {
							for(key=0; key<length; key++) {
								if (!equals(o1[key], o2[key])) return false;
							}
							return true;
						}
					} else if (Object.prototype.toString.call(o1) === '[object Date]') {
						return Object.prototype.toString.call(o2) === '[object Date]' && o1.getTime() == o2.getTime();
					} else {
						if ((o1 && o1.$evalAsync && o1.$watch) ||
							(o2 && o2.$evalAsync && o2.$watch) ||
							(o1 && o1.document && o1.location && o1.alert && o1.setInterval) || 
							(o2 && o2.document && o2.location && o2.alert && o2.setInterval))
								return false;
						keySet = {};
						for(key in o1) {
							if (key.charAt(0) === '$' || (typeof o1[key] === 'function')) continue;
							if (!equals(o1[key], o2[key])) return false;
							keySet[key] = true;
						}
						for(key in o2) {
							if (!keySet[key] &&
									key.charAt(0) !== '$' &&
									o2[key] !== undefined &&
									!(typeof o2[key] === 'function')) return false;
						}
						return true;
					}
				}
			}
			return false;
		};

		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t) {
				if(equals(t[k],searchElement)) {
					return k;
				}
			}
		}
		return -1;
	}
	
	if (Object.defineProperty) {
		Object.defineProperty(Array.prototype, 'deepIndexOf', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: deepIndexOf
		})
	} else {
		Array.prototype.deepIndexOf = deepIndexOf;
	}
}

})(window, document);
