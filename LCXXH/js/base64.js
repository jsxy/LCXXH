(function($) {
	var base64module = {};
	var base64 = new function()
	// 
	{
		var utfLibName = "utf";
		var b64char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var b64encTable = b64char.split("");
		var b64decTable = [];
		for (var i = 0; i < b64char.length; i++)
			b64decTable[b64char.charAt(i)] = i;

		this.encode = function(_dat, _strMode) {
			return encoder(_strMode ? unpackUTF8(_dat) : unpackChar(_dat));
		}

		var encoder = function(_ary) {
			var md = _ary.length % 3;
			var b64 = "";
			var i, tmp = 0;

			if (md)
				for (i = 3 - md; i > 0; i--)
					_ary[_ary.length] = 0;

			for (i = 0; i < _ary.length; i += 3) {
				tmp = (_ary[i] << 16) | (_ary[i + 1] << 8) | _ary[i + 2];
				b64 += b64encTable[(tmp >>> 18) & 0x3f] + b64encTable[(tmp >>> 12) & 0x3f] + b64encTable[(tmp >>> 6) & 0x3f] + b64encTable[tmp & 0x3f];
			}

			if (md) // 3ã®å€æ•°ã«ãƒ‘ãƒ‡ã‚£ãƒ³ã‚°ã—ãŸ 0x0 åˆ† =
			// ã«ç½®ãæ›ãˆ
			{
				md = 3 - md;
				b64 = b64.substr(0, b64.length - md);
				while (md--)
					b64 += "=";
			}

			return b64;
		}

		this.decode = function(_b64, _strMode) {
			var tmp = decoder(_b64);
			return _strMode ? packUTF8(tmp) : packChar(tmp);
		}

		var decoder = function(_b64) {
			_b64 = _b64.replace(/[^A-Za-z0-9\+\/]/g, "");
			var md = _b64.length % 4;
			var j, i, tmp;
			var dat = [];

			// replace æ™‚ = ã‚‚å‰Šã£ã¦ã„ã‚‹ã€‚ãã® = ã®ä»£ã‚ã‚Šã« 0x0
			// ã‚’è£œé–“
			if (md)
				for (i = 0; i < 4 - md; i++)
					_b64 += "A";

			for (j = i = 0; i < _b64.length; i += 4, j += 3) {
				tmp = (b64decTable[_b64.charAt(i)] << 18) | (b64decTable[_b64.charAt(i + 1)] << 12) | (b64decTable[_b64.charAt(i + 2)] << 6) | b64decTable[_b64.charAt(i + 3)];
				dat[j] = tmp >>> 16;
				dat[j + 1] = (tmp >>> 8) & 0xff;
				dat[j + 2] = tmp & 0xff;
			}
			// è£œå®Œã•ã‚ŒãŸ 0x0 åˆ†å‰Šã‚‹
			if (md)
				dat.length -= [ 0, 0, 2, 1 ][md];

			return dat;
		}

		var packUTF8 = function(_x) {
			return utf.packUTF8(_x)
		};
		var unpackUTF8 = function(_x) {
			return utf.unpackUTF8(_x)
		};
		var packChar = function(_x) {
			return utf.packChar(_x)
		};
		var unpackChar = function(_x) {
			return utf.unpackChar(_x)
		};
		// var packUTF8 = function(_x){ return window[utfLibName].packUTF8(_x)
		// };
		// var unpackUTF8 = function(_x){ return
		// window[utfLibName].unpackUTF8(_x) };
		// var packChar = function(_x){ return window[utfLibName].packChar(_x)
		// };
		// var unpackChar = function(_x){ return
		// window[utfLibName].unpackChar(_x) };
	}

	var utf = new function()
	//
	{
		this.unpackUTF16 = function(_str) {
			var i, utf16 = [];
			for (i = 0; i < _str.length; i++)
				utf16[i] = _str.charCodeAt(i);
			return utf16;
		}

		this.unpackChar = function(_str) {
			var utf16 = this.unpackUTF16(_str);
			var i, n, tmp = [];
			for (n = i = 0; i < utf16.length; i++) {
				if (utf16[i] <= 0xff)
					tmp[n++] = utf16[i];
				else {
					tmp[n++] = utf16[i] >> 8;
					tmp[n++] = utf16[i] & 0xff;
				}
			}
			return tmp;
		}

		this.packChar = this.packUTF16 = function(_utf16) {
			var i, str = "";
			for (i in _utf16)
				str += String.fromCharCode(_utf16[i]);
			return str;
		}

		this.unpackUTF8 = function(_str) {
			return this.toUTF8(this.unpackUTF16(_str));
		}

		this.packUTF8 = function(_utf8) {
			return this.packUTF16(this.toUTF16(_utf8));
		}

		this.toUTF8 = function(_utf16) {
			var utf8 = [];
			var idx = 0;
			var i, j, c;
			for (i = 0; i < _utf16.length; i++) {
				c = _utf16[i];
				if (c <= 0x7f)
					utf8[idx++] = c;
				else if (c <= 0x7ff) {
					utf8[idx++] = 0xc0 | (c >>> 6);
					utf8[idx++] = 0x80 | (c & 0x3f);
				} else if (c <= 0xffff) {
					utf8[idx++] = 0xe0 | (c >>> 12);
					utf8[idx++] = 0x80 | ((c >>> 6) & 0x3f);
					utf8[idx++] = 0x80 | (c & 0x3f);
				} else {
					j = 4;
					while (c >> (6 * j))
						j++;
					utf8[idx++] = ((0xff00 >>> j) & 0xff) | (c >>> (6 * --j));
					while (j--)
						utf8[idx++] = 0x80 | ((c >>> (6 * j)) & 0x3f);
				}
			}
			return utf8;
		}

		this.toUTF16 = function(_utf8) {
			var utf16 = [];
			var idx = 0;
			var i, s;
			for (i = 0; i < _utf8.length; i++, idx++) {
				if (_utf8[i] <= 0x7f)
					utf16[idx] = _utf8[i];
				else {
					if ((_utf8[i] >> 5) == 0x6) {
						utf16[idx] = ((_utf8[i] & 0x1f) << 6) | (_utf8[++i] & 0x3f);
					} else if ((_utf8[i] >> 4) == 0xe) {
						utf16[idx] = ((_utf8[i] & 0xf) << 12) | ((_utf8[++i] & 0x3f) << 6) | (_utf8[++i] & 0x3f);
					} else {
						s = 1;
						while (_utf8[i] & (0x20 >>> s))
							s++;
						utf16[idx] = _utf8[i] & (0x1f >>> s);
						while (s-- >= 0)
							utf16[idx] = (utf16[idx] << 6) ^ (_utf8[++i] & 0x3f);
					}
				}
			}
			return utf16;
		}

		this.URLencode = function(_str) {
			return _str.replace(/([^a-zA-Z0-9_\-\.])/g, function(_tmp, _c) {
				if (_c == "\x20")
					return "+";
				var tmp = utf.toUTF8([ _c.charCodeAt(0) ]);
				var c = "";
				for ( var i in tmp) {
					i = tmp[i].toString(16);
					if (i.length == 1)
						i = "0" + i;
					c += "%" + i;
				}
				return c;
			});
		}

		this.URLdecode = function(_dat) {
			_dat = _dat.replace(/\+/g, "\x20");
			_dat = _dat.replace(/%([a-fA-F0-9][a-fA-F0-9])/g, function(_tmp, _hex) {
				return String.fromCharCode(parseInt(_hex, 16))
			});
			return this.packChar(this.toUTF16(this.unpackUTF16(_dat)));
		}
	}

	// *** end

	// add functions
	$.extend({
		base64 : {
			encode : base64.encode,
			decode : base64.decode,
			codec : typeof atob == 'function' ? 'builtin' : 'alternate'
		}
	})

	//
	// override jQuery.ajax:
	// if ajax 'dataType' option value ended by ':b64', then
	// decode base64 string automatically
	//
	$.ajax = (function(ajax) {
		return function(option) {
			var flg = 0

			// dataType string ended by ':b64' or not?
			if (option.dataType && option.dataType.match(/:b64/)) {
				option.dataType = option.dataType.replace(':b64', '')
				flg = 1
			}

			if (flg) {
				option.success = (function(callback) {
					return function(data, status, xhr) {
						data = $.base64.decode(data)
						callback(data, status, xhr)
					}
				})(option.success || function(data, status, xhr) {
				})
			}

			return ajax.apply(this, arguments)
		}
	})($.ajax)

})(jQuery);