var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/protobufjs/src/util/aspromise.js
var require_aspromise = __commonJS({
  "node_modules/protobufjs/src/util/aspromise.js"(exports, module) {
    "use strict";
    module.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(/* @__PURE__ */ __name(function executor(resolve, reject) {
        params[offset] = /* @__PURE__ */ __name(function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        }, "callback");
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      }, "executor"));
    }
    __name(asPromise, "asPromise");
  }
});

// node_modules/protobufjs/src/util/base64.js
var require_base64 = __commonJS({
  "node_modules/protobufjs/src/util/base64.js"(exports) {
    "use strict";
    var base64 = exports;
    base64.length = /* @__PURE__ */ __name(function length(string) {
      var p = string.length;
      if (!p)
        return 0;
      while (p > 0 && string.charAt(p - 1) === "=")
        --p;
      return Math.floor(p * 3 / 4);
    }, "length");
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    s64[45] = 62;
    s64[95] = 63;
    base64.encode = /* @__PURE__ */ __name(function encode(buffer, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    }, "encode");
    var invalidEncoding = "invalid encoding";
    base64.decode = /* @__PURE__ */ __name(function decode(string, buffer, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string.length; ) {
        var c = string.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    }, "decode");
    var base64Re = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    var base64UrlRe = /[-_]/;
    var base64UrlNoPaddingRe = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2}(?:==)?|[A-Za-z0-9_-]{3}=?)?$/;
    base64.test = /* @__PURE__ */ __name(function test(string) {
      return base64Re.test(string) || base64UrlRe.test(string) && base64UrlNoPaddingRe.test(string);
    }, "test");
  }
});

// node_modules/protobufjs/src/util/eventemitter.js
var require_eventemitter = __commonJS({
  "node_modules/protobufjs/src/util/eventemitter.js"(exports, module) {
    "use strict";
    module.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = /* @__PURE__ */ Object.create(null);
    }
    __name(EventEmitter, "EventEmitter");
    EventEmitter.prototype.on = /* @__PURE__ */ __name(function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    }, "on");
    EventEmitter.prototype.off = /* @__PURE__ */ __name(function off(evt, fn) {
      if (evt === void 0)
        this._listeners = /* @__PURE__ */ Object.create(null);
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          if (!listeners)
            return this;
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    }, "off");
    EventEmitter.prototype.emit = /* @__PURE__ */ __name(function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    }, "emit");
  }
});

// node_modules/protobufjs/src/util/float.js
var require_float = __commonJS({
  "node_modules/protobufjs/src/util/float.js"(exports, module) {
    "use strict";
    module.exports = factory(factory);
    function factory(exports2) {
      if (typeof Float32Array !== "undefined") (function() {
        var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
        function writeFloat_f32_cpy(val, buf, pos) {
          f32[0] = val;
          buf[pos] = f8b[0];
          buf[pos + 1] = f8b[1];
          buf[pos + 2] = f8b[2];
          buf[pos + 3] = f8b[3];
        }
        __name(writeFloat_f32_cpy, "writeFloat_f32_cpy");
        function writeFloat_f32_rev(val, buf, pos) {
          f32[0] = val;
          buf[pos] = f8b[3];
          buf[pos + 1] = f8b[2];
          buf[pos + 2] = f8b[1];
          buf[pos + 3] = f8b[0];
        }
        __name(writeFloat_f32_rev, "writeFloat_f32_rev");
        exports2.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        exports2.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
        function readFloat_f32_cpy(buf, pos) {
          f8b[0] = buf[pos];
          f8b[1] = buf[pos + 1];
          f8b[2] = buf[pos + 2];
          f8b[3] = buf[pos + 3];
          return f32[0];
        }
        __name(readFloat_f32_cpy, "readFloat_f32_cpy");
        function readFloat_f32_rev(buf, pos) {
          f8b[3] = buf[pos];
          f8b[2] = buf[pos + 1];
          f8b[1] = buf[pos + 2];
          f8b[0] = buf[pos + 3];
          return f32[0];
        }
        __name(readFloat_f32_rev, "readFloat_f32_rev");
        exports2.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        exports2.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
      })();
      else (function() {
        function writeFloat_ieee754(writeUint, val, buf, pos) {
          var sign = val < 0 ? 1 : 0;
          if (sign)
            val = -val;
          if (val === 0)
            writeUint(1 / val > 0 ? (
              /* positive */
              0
            ) : (
              /* negative 0 */
              2147483648
            ), buf, pos);
          else if (isNaN(val))
            writeUint(2143289344, buf, pos);
          else if (val > 34028234663852886e22)
            writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
          else if (val < 11754943508222875e-54)
            writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
          else {
            var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
            writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
          }
        }
        __name(writeFloat_ieee754, "writeFloat_ieee754");
        exports2.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports2.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
        function readFloat_ieee754(readUint, buf, pos) {
          var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
          return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }
        __name(readFloat_ieee754, "readFloat_ieee754");
        exports2.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports2.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
      })();
      if (typeof Float64Array !== "undefined") (function() {
        var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
        function writeDouble_f64_cpy(val, buf, pos) {
          f64[0] = val;
          buf[pos] = f8b[0];
          buf[pos + 1] = f8b[1];
          buf[pos + 2] = f8b[2];
          buf[pos + 3] = f8b[3];
          buf[pos + 4] = f8b[4];
          buf[pos + 5] = f8b[5];
          buf[pos + 6] = f8b[6];
          buf[pos + 7] = f8b[7];
        }
        __name(writeDouble_f64_cpy, "writeDouble_f64_cpy");
        function writeDouble_f64_rev(val, buf, pos) {
          f64[0] = val;
          buf[pos] = f8b[7];
          buf[pos + 1] = f8b[6];
          buf[pos + 2] = f8b[5];
          buf[pos + 3] = f8b[4];
          buf[pos + 4] = f8b[3];
          buf[pos + 5] = f8b[2];
          buf[pos + 6] = f8b[1];
          buf[pos + 7] = f8b[0];
        }
        __name(writeDouble_f64_rev, "writeDouble_f64_rev");
        exports2.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        exports2.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
        function readDouble_f64_cpy(buf, pos) {
          f8b[0] = buf[pos];
          f8b[1] = buf[pos + 1];
          f8b[2] = buf[pos + 2];
          f8b[3] = buf[pos + 3];
          f8b[4] = buf[pos + 4];
          f8b[5] = buf[pos + 5];
          f8b[6] = buf[pos + 6];
          f8b[7] = buf[pos + 7];
          return f64[0];
        }
        __name(readDouble_f64_cpy, "readDouble_f64_cpy");
        function readDouble_f64_rev(buf, pos) {
          f8b[7] = buf[pos];
          f8b[6] = buf[pos + 1];
          f8b[5] = buf[pos + 2];
          f8b[4] = buf[pos + 3];
          f8b[3] = buf[pos + 4];
          f8b[2] = buf[pos + 5];
          f8b[1] = buf[pos + 6];
          f8b[0] = buf[pos + 7];
          return f64[0];
        }
        __name(readDouble_f64_rev, "readDouble_f64_rev");
        exports2.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        exports2.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
      })();
      else (function() {
        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
          var sign = val < 0 ? 1 : 0;
          if (sign)
            val = -val;
          if (val === 0) {
            writeUint(0, buf, pos + off0);
            writeUint(1 / val > 0 ? (
              /* positive */
              0
            ) : (
              /* negative 0 */
              2147483648
            ), buf, pos + off1);
          } else if (isNaN(val)) {
            writeUint(0, buf, pos + off0);
            writeUint(2146959360, buf, pos + off1);
          } else if (val > 17976931348623157e292) {
            writeUint(0, buf, pos + off0);
            writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
          } else {
            var mantissa;
            if (val < 22250738585072014e-324) {
              mantissa = val / 5e-324;
              writeUint(mantissa >>> 0, buf, pos + off0);
              writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
            } else {
              var exponent = Math.floor(Math.log(val) / Math.LN2);
              if (exponent === 1024)
                exponent = 1023;
              mantissa = val * Math.pow(2, -exponent);
              writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
              writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
            }
          }
        }
        __name(writeDouble_ieee754, "writeDouble_ieee754");
        exports2.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports2.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
          var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
          var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
          return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }
        __name(readDouble_ieee754, "readDouble_ieee754");
        exports2.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports2.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
      })();
      return exports2;
    }
    __name(factory, "factory");
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    __name(writeUintLE, "writeUintLE");
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    __name(writeUintBE, "writeUintBE");
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    __name(readUintLE, "readUintLE");
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
    __name(readUintBE, "readUintBE");
  }
});

// node_modules/protobufjs/src/util/utf8.js
var require_utf8 = __commonJS({
  "node_modules/protobufjs/src/util/utf8.js"(exports) {
    "use strict";
    var utf8 = exports;
    var replacementChar = "\uFFFD";
    utf8.length = /* @__PURE__ */ __name(function utf8_length(string) {
      var len = 0, c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    }, "utf8_length");
    function utf8_read_js(buffer, start, end, str) {
      for (var i = start; i < end; ) {
        var t = buffer[i++];
        if (t <= 127) {
          str += String.fromCharCode(t);
        } else if (t >= 192 && t < 224) {
          var c2 = (t & 31) << 6 | buffer[i++] & 63;
          str += c2 >= 128 ? String.fromCharCode(c2) : replacementChar;
        } else if (t >= 224 && t < 240) {
          var c3 = (t & 15) << 12 | (buffer[i++] & 63) << 6 | buffer[i++] & 63;
          str += c3 >= 2048 ? String.fromCharCode(c3) : replacementChar;
        } else if (t >= 240) {
          var t2 = (t & 7) << 18 | (buffer[i++] & 63) << 12 | (buffer[i++] & 63) << 6 | buffer[i++] & 63;
          if (t2 < 65536 || t2 > 1114111)
            str += replacementChar;
          else {
            t2 -= 65536;
            str += String.fromCharCode(55296 + (t2 >> 10));
            str += String.fromCharCode(56320 + (t2 & 1023));
          }
        }
      }
      return str;
    }
    __name(utf8_read_js, "utf8_read_js");
    utf8.read = /* @__PURE__ */ __name(function utf8_read_ascii(buffer, start, end) {
      if (end - start < 1)
        return "";
      var str = "", i = start, c1, c2, c3, c4, c5, c6, c7, c8;
      for (; i + 7 < end; i += 8) {
        c1 = buffer[i];
        c2 = buffer[i + 1];
        c3 = buffer[i + 2];
        c4 = buffer[i + 3];
        c5 = buffer[i + 4];
        c6 = buffer[i + 5];
        c7 = buffer[i + 6];
        c8 = buffer[i + 7];
        if ((c1 | c2 | c3 | c4 | c5 | c6 | c7 | c8) & 128)
          return utf8_read_js(buffer, i, end, str);
        str += String.fromCharCode(c1, c2, c3, c4, c5, c6, c7, c8);
      }
      for (; i < end; ++i) {
        c1 = buffer[i];
        if (c1 & 128)
          return utf8_read_js(buffer, i, end, str);
        str += String.fromCharCode(c1);
      }
      return str;
    }, "utf8_read_ascii");
    utf8.write = /* @__PURE__ */ __name(function utf8_write(string, buffer, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
          buffer[offset++] = c1;
        } else if (c1 < 2048) {
          buffer[offset++] = c1 >> 6 | 192;
          buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = c1 >> 18 | 240;
          buffer[offset++] = c1 >> 12 & 63 | 128;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        } else {
          buffer[offset++] = c1 >> 12 | 224;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    }, "utf8_write");
  }
});

// node_modules/protobufjs/src/util/pool.js
var require_pool = __commonJS({
  "node_modules/protobufjs/src/util/pool.js"(exports, module) {
    "use strict";
    module.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return /* @__PURE__ */ __name(function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      }, "pool_alloc");
    }
    __name(pool, "pool");
  }
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports, module) {
    "use strict";
    module.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    __name(LongBits, "LongBits");
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = /* @__PURE__ */ __name(function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    }, "fromNumber");
    LongBits.from = /* @__PURE__ */ __name(function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    }, "from");
    LongBits.prototype.toNumber = /* @__PURE__ */ __name(function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    }, "toNumber");
    LongBits.prototype.toLong = /* @__PURE__ */ __name(function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    }, "toLong");
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = /* @__PURE__ */ __name(function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
        (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
      );
    }, "fromHash");
    LongBits.prototype.toHash = /* @__PURE__ */ __name(function toHash() {
      return String.fromCharCode(
        this.lo & 255,
        this.lo >>> 8 & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24,
        this.hi & 255,
        this.hi >>> 8 & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
      );
    }, "toHash");
    LongBits.prototype.zzEncode = /* @__PURE__ */ __name(function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    }, "zzEncode");
    LongBits.prototype.zzDecode = /* @__PURE__ */ __name(function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    }, "zzDecode");
    LongBits.prototype.length = /* @__PURE__ */ __name(function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    }, "length");
  }
});

// node_modules/long/umd/index.js
var require_umd = __commonJS({
  "node_modules/long/umd/index.js"(exports, module) {
    (function(global2, factory) {
      function preferDefault(exports2) {
        return exports2.default || exports2;
      }
      __name(preferDefault, "preferDefault");
      if (typeof define === "function" && define.amd) {
        define([], function() {
          var exports2 = {};
          factory(exports2);
          return preferDefault(exports2);
        });
      } else if (typeof exports === "object") {
        factory(exports);
        if (typeof module === "object") module.exports = preferDefault(exports);
      } else {
        (function() {
          var exports2 = {};
          factory(exports2);
          global2.Long = preferDefault(exports2);
        })();
      }
    })(
      typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports,
      function(_exports) {
        "use strict";
        Object.defineProperty(_exports, "__esModule", {
          value: true
        });
        _exports.default = void 0;
        var wasm = null;
        try {
          wasm = new WebAssembly.Instance(
            new WebAssembly.Module(
              new Uint8Array([
                // \0asm
                0,
                97,
                115,
                109,
                // version 1
                1,
                0,
                0,
                0,
                // section "type"
                1,
                13,
                2,
                // 0, () => i32
                96,
                0,
                1,
                127,
                // 1, (i32, i32, i32, i32) => i32
                96,
                4,
                127,
                127,
                127,
                127,
                1,
                127,
                // section "function"
                3,
                7,
                6,
                // 0, type 0
                0,
                // 1, type 1
                1,
                // 2, type 1
                1,
                // 3, type 1
                1,
                // 4, type 1
                1,
                // 5, type 1
                1,
                // section "global"
                6,
                6,
                1,
                // 0, "high", mutable i32
                127,
                1,
                65,
                0,
                11,
                // section "export"
                7,
                50,
                6,
                // 0, "mul"
                3,
                109,
                117,
                108,
                0,
                1,
                // 1, "div_s"
                5,
                100,
                105,
                118,
                95,
                115,
                0,
                2,
                // 2, "div_u"
                5,
                100,
                105,
                118,
                95,
                117,
                0,
                3,
                // 3, "rem_s"
                5,
                114,
                101,
                109,
                95,
                115,
                0,
                4,
                // 4, "rem_u"
                5,
                114,
                101,
                109,
                95,
                117,
                0,
                5,
                // 5, "get_high"
                8,
                103,
                101,
                116,
                95,
                104,
                105,
                103,
                104,
                0,
                0,
                // section "code"
                10,
                191,
                1,
                6,
                // 0, "get_high"
                4,
                0,
                35,
                0,
                11,
                // 1, "mul"
                36,
                1,
                1,
                126,
                32,
                0,
                173,
                32,
                1,
                173,
                66,
                32,
                134,
                132,
                32,
                2,
                173,
                32,
                3,
                173,
                66,
                32,
                134,
                132,
                126,
                34,
                4,
                66,
                32,
                135,
                167,
                36,
                0,
                32,
                4,
                167,
                11,
                // 2, "div_s"
                36,
                1,
                1,
                126,
                32,
                0,
                173,
                32,
                1,
                173,
                66,
                32,
                134,
                132,
                32,
                2,
                173,
                32,
                3,
                173,
                66,
                32,
                134,
                132,
                127,
                34,
                4,
                66,
                32,
                135,
                167,
                36,
                0,
                32,
                4,
                167,
                11,
                // 3, "div_u"
                36,
                1,
                1,
                126,
                32,
                0,
                173,
                32,
                1,
                173,
                66,
                32,
                134,
                132,
                32,
                2,
                173,
                32,
                3,
                173,
                66,
                32,
                134,
                132,
                128,
                34,
                4,
                66,
                32,
                135,
                167,
                36,
                0,
                32,
                4,
                167,
                11,
                // 4, "rem_s"
                36,
                1,
                1,
                126,
                32,
                0,
                173,
                32,
                1,
                173,
                66,
                32,
                134,
                132,
                32,
                2,
                173,
                32,
                3,
                173,
                66,
                32,
                134,
                132,
                129,
                34,
                4,
                66,
                32,
                135,
                167,
                36,
                0,
                32,
                4,
                167,
                11,
                // 5, "rem_u"
                36,
                1,
                1,
                126,
                32,
                0,
                173,
                32,
                1,
                173,
                66,
                32,
                134,
                132,
                32,
                2,
                173,
                32,
                3,
                173,
                66,
                32,
                134,
                132,
                130,
                34,
                4,
                66,
                32,
                135,
                167,
                36,
                0,
                32,
                4,
                167,
                11
              ])
            ),
            {}
          ).exports;
        } catch {
        }
        function Long(low, high, unsigned) {
          this.low = low | 0;
          this.high = high | 0;
          this.unsigned = !!unsigned;
        }
        __name(Long, "Long");
        Long.prototype.__isLong__;
        Object.defineProperty(Long.prototype, "__isLong__", {
          value: true
        });
        function isLong(obj) {
          return (obj && obj["__isLong__"]) === true;
        }
        __name(isLong, "isLong");
        function ctz32(value) {
          var c = Math.clz32(value & -value);
          return value ? 31 - c : c;
        }
        __name(ctz32, "ctz32");
        Long.isLong = isLong;
        var INT_CACHE = {};
        var UINT_CACHE = {};
        function fromInt(value, unsigned) {
          var obj, cachedObj, cache;
          if (unsigned) {
            value >>>= 0;
            if (cache = 0 <= value && value < 256) {
              cachedObj = UINT_CACHE[value];
              if (cachedObj) return cachedObj;
            }
            obj = fromBits(value, 0, true);
            if (cache) UINT_CACHE[value] = obj;
            return obj;
          } else {
            value |= 0;
            if (cache = -128 <= value && value < 128) {
              cachedObj = INT_CACHE[value];
              if (cachedObj) return cachedObj;
            }
            obj = fromBits(value, value < 0 ? -1 : 0, false);
            if (cache) INT_CACHE[value] = obj;
            return obj;
          }
        }
        __name(fromInt, "fromInt");
        Long.fromInt = fromInt;
        function fromNumber(value, unsigned) {
          if (isNaN(value)) return unsigned ? UZERO : ZERO;
          if (unsigned) {
            if (value < 0) return UZERO;
            if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
          } else {
            if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
            if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
          }
          if (value < 0) return fromNumber(-value, unsigned).neg();
          return fromBits(
            value % TWO_PWR_32_DBL | 0,
            value / TWO_PWR_32_DBL | 0,
            unsigned
          );
        }
        __name(fromNumber, "fromNumber");
        Long.fromNumber = fromNumber;
        function fromBits(lowBits, highBits, unsigned) {
          return new Long(lowBits, highBits, unsigned);
        }
        __name(fromBits, "fromBits");
        Long.fromBits = fromBits;
        var pow_dbl = Math.pow;
        function fromString(str, unsigned, radix) {
          if (str.length === 0) throw Error("empty string");
          if (typeof unsigned === "number") {
            radix = unsigned;
            unsigned = false;
          } else {
            unsigned = !!unsigned;
          }
          if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return unsigned ? UZERO : ZERO;
          radix = radix || 10;
          if (radix < 2 || 36 < radix) throw RangeError("radix");
          var p;
          if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
          else if (p === 0) {
            return fromString(str.substring(1), unsigned, radix).neg();
          }
          var radixToPower = fromNumber(pow_dbl(radix, 8));
          var result = ZERO;
          for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
              var power = fromNumber(pow_dbl(radix, size));
              result = result.mul(power).add(fromNumber(value));
            } else {
              result = result.mul(radixToPower);
              result = result.add(fromNumber(value));
            }
          }
          result.unsigned = unsigned;
          return result;
        }
        __name(fromString, "fromString");
        Long.fromString = fromString;
        function fromValue(val, unsigned) {
          if (typeof val === "number") return fromNumber(val, unsigned);
          if (typeof val === "string") return fromString(val, unsigned);
          return fromBits(
            val.low,
            val.high,
            typeof unsigned === "boolean" ? unsigned : val.unsigned
          );
        }
        __name(fromValue, "fromValue");
        Long.fromValue = fromValue;
        var TWO_PWR_16_DBL = 1 << 16;
        var TWO_PWR_24_DBL = 1 << 24;
        var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
        var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
        var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
        var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
        var ZERO = fromInt(0);
        Long.ZERO = ZERO;
        var UZERO = fromInt(0, true);
        Long.UZERO = UZERO;
        var ONE = fromInt(1);
        Long.ONE = ONE;
        var UONE = fromInt(1, true);
        Long.UONE = UONE;
        var NEG_ONE = fromInt(-1);
        Long.NEG_ONE = NEG_ONE;
        var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
        Long.MAX_VALUE = MAX_VALUE;
        var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
        Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
        var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
        Long.MIN_VALUE = MIN_VALUE;
        var LongPrototype = Long.prototype;
        LongPrototype.toInt = /* @__PURE__ */ __name(function toInt() {
          return this.unsigned ? this.low >>> 0 : this.low;
        }, "toInt");
        LongPrototype.toNumber = /* @__PURE__ */ __name(function toNumber() {
          if (this.unsigned)
            return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
          return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
        }, "toNumber");
        LongPrototype.toString = /* @__PURE__ */ __name(function toString(radix) {
          radix = radix || 10;
          if (radix < 2 || 36 < radix) throw RangeError("radix");
          if (this.isZero()) return "0";
          if (this.isNegative()) {
            if (this.eq(MIN_VALUE)) {
              var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
              return div.toString(radix) + rem1.toInt().toString(radix);
            } else return "-" + this.neg().toString(radix);
          }
          var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
          var result = "";
          while (true) {
            var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero()) return digits + result;
            else {
              while (digits.length < 6) digits = "0" + digits;
              result = "" + digits + result;
            }
          }
        }, "toString");
        LongPrototype.getHighBits = /* @__PURE__ */ __name(function getHighBits() {
          return this.high;
        }, "getHighBits");
        LongPrototype.getHighBitsUnsigned = /* @__PURE__ */ __name(function getHighBitsUnsigned() {
          return this.high >>> 0;
        }, "getHighBitsUnsigned");
        LongPrototype.getLowBits = /* @__PURE__ */ __name(function getLowBits() {
          return this.low;
        }, "getLowBits");
        LongPrototype.getLowBitsUnsigned = /* @__PURE__ */ __name(function getLowBitsUnsigned() {
          return this.low >>> 0;
        }, "getLowBitsUnsigned");
        LongPrototype.getNumBitsAbs = /* @__PURE__ */ __name(function getNumBitsAbs() {
          if (this.isNegative())
            return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
          var val = this.high != 0 ? this.high : this.low;
          for (var bit = 31; bit > 0; bit--) if ((val & 1 << bit) != 0) break;
          return this.high != 0 ? bit + 33 : bit + 1;
        }, "getNumBitsAbs");
        LongPrototype.isSafeInteger = /* @__PURE__ */ __name(function isSafeInteger() {
          var top11Bits = this.high >> 21;
          if (!top11Bits) return true;
          if (this.unsigned) return false;
          return top11Bits === -1 && !(this.low === 0 && this.high === -2097152);
        }, "isSafeInteger");
        LongPrototype.isZero = /* @__PURE__ */ __name(function isZero() {
          return this.high === 0 && this.low === 0;
        }, "isZero");
        LongPrototype.eqz = LongPrototype.isZero;
        LongPrototype.isNegative = /* @__PURE__ */ __name(function isNegative() {
          return !this.unsigned && this.high < 0;
        }, "isNegative");
        LongPrototype.isPositive = /* @__PURE__ */ __name(function isPositive() {
          return this.unsigned || this.high >= 0;
        }, "isPositive");
        LongPrototype.isOdd = /* @__PURE__ */ __name(function isOdd() {
          return (this.low & 1) === 1;
        }, "isOdd");
        LongPrototype.isEven = /* @__PURE__ */ __name(function isEven() {
          return (this.low & 1) === 0;
        }, "isEven");
        LongPrototype.equals = /* @__PURE__ */ __name(function equals(other) {
          if (!isLong(other)) other = fromValue(other);
          if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
            return false;
          return this.high === other.high && this.low === other.low;
        }, "equals");
        LongPrototype.eq = LongPrototype.equals;
        LongPrototype.notEquals = /* @__PURE__ */ __name(function notEquals(other) {
          return !this.eq(
            /* validates */
            other
          );
        }, "notEquals");
        LongPrototype.neq = LongPrototype.notEquals;
        LongPrototype.ne = LongPrototype.notEquals;
        LongPrototype.lessThan = /* @__PURE__ */ __name(function lessThan(other) {
          return this.comp(
            /* validates */
            other
          ) < 0;
        }, "lessThan");
        LongPrototype.lt = LongPrototype.lessThan;
        LongPrototype.lessThanOrEqual = /* @__PURE__ */ __name(function lessThanOrEqual(other) {
          return this.comp(
            /* validates */
            other
          ) <= 0;
        }, "lessThanOrEqual");
        LongPrototype.lte = LongPrototype.lessThanOrEqual;
        LongPrototype.le = LongPrototype.lessThanOrEqual;
        LongPrototype.greaterThan = /* @__PURE__ */ __name(function greaterThan(other) {
          return this.comp(
            /* validates */
            other
          ) > 0;
        }, "greaterThan");
        LongPrototype.gt = LongPrototype.greaterThan;
        LongPrototype.greaterThanOrEqual = /* @__PURE__ */ __name(function greaterThanOrEqual(other) {
          return this.comp(
            /* validates */
            other
          ) >= 0;
        }, "greaterThanOrEqual");
        LongPrototype.gte = LongPrototype.greaterThanOrEqual;
        LongPrototype.ge = LongPrototype.greaterThanOrEqual;
        LongPrototype.compare = /* @__PURE__ */ __name(function compare(other) {
          if (!isLong(other)) other = fromValue(other);
          if (this.eq(other)) return 0;
          var thisNeg = this.isNegative(), otherNeg = other.isNegative();
          if (thisNeg && !otherNeg) return -1;
          if (!thisNeg && otherNeg) return 1;
          if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
          return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
        }, "compare");
        LongPrototype.comp = LongPrototype.compare;
        LongPrototype.negate = /* @__PURE__ */ __name(function negate() {
          if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
          return this.not().add(ONE);
        }, "negate");
        LongPrototype.neg = LongPrototype.negate;
        LongPrototype.add = /* @__PURE__ */ __name(function add(addend) {
          if (!isLong(addend)) addend = fromValue(addend);
          var a48 = this.high >>> 16;
          var a32 = this.high & 65535;
          var a16 = this.low >>> 16;
          var a00 = this.low & 65535;
          var b48 = addend.high >>> 16;
          var b32 = addend.high & 65535;
          var b16 = addend.low >>> 16;
          var b00 = addend.low & 65535;
          var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
          c00 += a00 + b00;
          c16 += c00 >>> 16;
          c00 &= 65535;
          c16 += a16 + b16;
          c32 += c16 >>> 16;
          c16 &= 65535;
          c32 += a32 + b32;
          c48 += c32 >>> 16;
          c32 &= 65535;
          c48 += a48 + b48;
          c48 &= 65535;
          return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
        }, "add");
        LongPrototype.subtract = /* @__PURE__ */ __name(function subtract(subtrahend) {
          if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
          return this.add(subtrahend.neg());
        }, "subtract");
        LongPrototype.sub = LongPrototype.subtract;
        LongPrototype.multiply = /* @__PURE__ */ __name(function multiply(multiplier) {
          if (this.isZero()) return this;
          if (!isLong(multiplier)) multiplier = fromValue(multiplier);
          if (wasm) {
            var low = wasm["mul"](
              this.low,
              this.high,
              multiplier.low,
              multiplier.high
            );
            return fromBits(low, wasm["get_high"](), this.unsigned);
          }
          if (multiplier.isZero()) return this.unsigned ? UZERO : ZERO;
          if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
          if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
          if (this.isNegative()) {
            if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());
            else return this.neg().mul(multiplier).neg();
          } else if (multiplier.isNegative())
            return this.mul(multiplier.neg()).neg();
          if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
            return fromNumber(
              this.toNumber() * multiplier.toNumber(),
              this.unsigned
            );
          var a48 = this.high >>> 16;
          var a32 = this.high & 65535;
          var a16 = this.low >>> 16;
          var a00 = this.low & 65535;
          var b48 = multiplier.high >>> 16;
          var b32 = multiplier.high & 65535;
          var b16 = multiplier.low >>> 16;
          var b00 = multiplier.low & 65535;
          var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
          c00 += a00 * b00;
          c16 += c00 >>> 16;
          c00 &= 65535;
          c16 += a16 * b00;
          c32 += c16 >>> 16;
          c16 &= 65535;
          c16 += a00 * b16;
          c32 += c16 >>> 16;
          c16 &= 65535;
          c32 += a32 * b00;
          c48 += c32 >>> 16;
          c32 &= 65535;
          c32 += a16 * b16;
          c48 += c32 >>> 16;
          c32 &= 65535;
          c32 += a00 * b32;
          c48 += c32 >>> 16;
          c32 &= 65535;
          c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
          c48 &= 65535;
          return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
        }, "multiply");
        LongPrototype.mul = LongPrototype.multiply;
        LongPrototype.divide = /* @__PURE__ */ __name(function divide(divisor) {
          if (!isLong(divisor)) divisor = fromValue(divisor);
          if (divisor.isZero()) throw Error("division by zero");
          if (wasm) {
            if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
              return this;
            }
            var low = (this.unsigned ? wasm["div_u"] : wasm["div_s"])(
              this.low,
              this.high,
              divisor.low,
              divisor.high
            );
            return fromBits(low, wasm["get_high"](), this.unsigned);
          }
          if (this.isZero()) return this.unsigned ? UZERO : ZERO;
          var approx, rem, res;
          if (!this.unsigned) {
            if (this.eq(MIN_VALUE)) {
              if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                return MIN_VALUE;
              else if (divisor.eq(MIN_VALUE)) return ONE;
              else {
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                  return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                  rem = this.sub(divisor.mul(approx));
                  res = approx.add(rem.div(divisor));
                  return res;
                }
              }
            } else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) {
              if (divisor.isNegative()) return this.neg().div(divisor.neg());
              return this.neg().div(divisor).neg();
            } else if (divisor.isNegative()) return this.div(divisor.neg()).neg();
            res = ZERO;
          } else {
            if (!divisor.unsigned) divisor = divisor.toUnsigned();
            if (divisor.gt(this)) return UZERO;
            if (divisor.gt(this.shru(1)))
              return UONE;
            res = UZERO;
          }
          rem = this;
          while (rem.gte(divisor)) {
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
            var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
            while (approxRem.isNegative() || approxRem.gt(rem)) {
              approx -= delta;
              approxRes = fromNumber(approx, this.unsigned);
              approxRem = approxRes.mul(divisor);
            }
            if (approxRes.isZero()) approxRes = ONE;
            res = res.add(approxRes);
            rem = rem.sub(approxRem);
          }
          return res;
        }, "divide");
        LongPrototype.div = LongPrototype.divide;
        LongPrototype.modulo = /* @__PURE__ */ __name(function modulo(divisor) {
          if (!isLong(divisor)) divisor = fromValue(divisor);
          if (wasm) {
            var low = (this.unsigned ? wasm["rem_u"] : wasm["rem_s"])(
              this.low,
              this.high,
              divisor.low,
              divisor.high
            );
            return fromBits(low, wasm["get_high"](), this.unsigned);
          }
          return this.sub(this.div(divisor).mul(divisor));
        }, "modulo");
        LongPrototype.mod = LongPrototype.modulo;
        LongPrototype.rem = LongPrototype.modulo;
        LongPrototype.not = /* @__PURE__ */ __name(function not() {
          return fromBits(~this.low, ~this.high, this.unsigned);
        }, "not");
        LongPrototype.countLeadingZeros = /* @__PURE__ */ __name(function countLeadingZeros() {
          return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
        }, "countLeadingZeros");
        LongPrototype.clz = LongPrototype.countLeadingZeros;
        LongPrototype.countTrailingZeros = /* @__PURE__ */ __name(function countTrailingZeros() {
          return this.low ? ctz32(this.low) : ctz32(this.high) + 32;
        }, "countTrailingZeros");
        LongPrototype.ctz = LongPrototype.countTrailingZeros;
        LongPrototype.and = /* @__PURE__ */ __name(function and(other) {
          if (!isLong(other)) other = fromValue(other);
          return fromBits(
            this.low & other.low,
            this.high & other.high,
            this.unsigned
          );
        }, "and");
        LongPrototype.or = /* @__PURE__ */ __name(function or(other) {
          if (!isLong(other)) other = fromValue(other);
          return fromBits(
            this.low | other.low,
            this.high | other.high,
            this.unsigned
          );
        }, "or");
        LongPrototype.xor = /* @__PURE__ */ __name(function xor(other) {
          if (!isLong(other)) other = fromValue(other);
          return fromBits(
            this.low ^ other.low,
            this.high ^ other.high,
            this.unsigned
          );
        }, "xor");
        LongPrototype.shiftLeft = /* @__PURE__ */ __name(function shiftLeft(numBits) {
          if (isLong(numBits)) numBits = numBits.toInt();
          if ((numBits &= 63) === 0) return this;
          else if (numBits < 32)
            return fromBits(
              this.low << numBits,
              this.high << numBits | this.low >>> 32 - numBits,
              this.unsigned
            );
          else return fromBits(0, this.low << numBits - 32, this.unsigned);
        }, "shiftLeft");
        LongPrototype.shl = LongPrototype.shiftLeft;
        LongPrototype.shiftRight = /* @__PURE__ */ __name(function shiftRight(numBits) {
          if (isLong(numBits)) numBits = numBits.toInt();
          if ((numBits &= 63) === 0) return this;
          else if (numBits < 32)
            return fromBits(
              this.low >>> numBits | this.high << 32 - numBits,
              this.high >> numBits,
              this.unsigned
            );
          else
            return fromBits(
              this.high >> numBits - 32,
              this.high >= 0 ? 0 : -1,
              this.unsigned
            );
        }, "shiftRight");
        LongPrototype.shr = LongPrototype.shiftRight;
        LongPrototype.shiftRightUnsigned = /* @__PURE__ */ __name(function shiftRightUnsigned(numBits) {
          if (isLong(numBits)) numBits = numBits.toInt();
          if ((numBits &= 63) === 0) return this;
          if (numBits < 32)
            return fromBits(
              this.low >>> numBits | this.high << 32 - numBits,
              this.high >>> numBits,
              this.unsigned
            );
          if (numBits === 32) return fromBits(this.high, 0, this.unsigned);
          return fromBits(this.high >>> numBits - 32, 0, this.unsigned);
        }, "shiftRightUnsigned");
        LongPrototype.shru = LongPrototype.shiftRightUnsigned;
        LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
        LongPrototype.rotateLeft = /* @__PURE__ */ __name(function rotateLeft(numBits) {
          var b;
          if (isLong(numBits)) numBits = numBits.toInt();
          if ((numBits &= 63) === 0) return this;
          if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
          if (numBits < 32) {
            b = 32 - numBits;
            return fromBits(
              this.low << numBits | this.high >>> b,
              this.high << numBits | this.low >>> b,
              this.unsigned
            );
          }
          numBits -= 32;
          b = 32 - numBits;
          return fromBits(
            this.high << numBits | this.low >>> b,
            this.low << numBits | this.high >>> b,
            this.unsigned
          );
        }, "rotateLeft");
        LongPrototype.rotl = LongPrototype.rotateLeft;
        LongPrototype.rotateRight = /* @__PURE__ */ __name(function rotateRight(numBits) {
          var b;
          if (isLong(numBits)) numBits = numBits.toInt();
          if ((numBits &= 63) === 0) return this;
          if (numBits === 32) return fromBits(this.high, this.low, this.unsigned);
          if (numBits < 32) {
            b = 32 - numBits;
            return fromBits(
              this.high << b | this.low >>> numBits,
              this.low << b | this.high >>> numBits,
              this.unsigned
            );
          }
          numBits -= 32;
          b = 32 - numBits;
          return fromBits(
            this.low << b | this.high >>> numBits,
            this.high << b | this.low >>> numBits,
            this.unsigned
          );
        }, "rotateRight");
        LongPrototype.rotr = LongPrototype.rotateRight;
        LongPrototype.toSigned = /* @__PURE__ */ __name(function toSigned() {
          if (!this.unsigned) return this;
          return fromBits(this.low, this.high, false);
        }, "toSigned");
        LongPrototype.toUnsigned = /* @__PURE__ */ __name(function toUnsigned() {
          if (this.unsigned) return this;
          return fromBits(this.low, this.high, true);
        }, "toUnsigned");
        LongPrototype.toBytes = /* @__PURE__ */ __name(function toBytes(le) {
          return le ? this.toBytesLE() : this.toBytesBE();
        }, "toBytes");
        LongPrototype.toBytesLE = /* @__PURE__ */ __name(function toBytesLE() {
          var hi = this.high, lo = this.low;
          return [
            lo & 255,
            lo >>> 8 & 255,
            lo >>> 16 & 255,
            lo >>> 24,
            hi & 255,
            hi >>> 8 & 255,
            hi >>> 16 & 255,
            hi >>> 24
          ];
        }, "toBytesLE");
        LongPrototype.toBytesBE = /* @__PURE__ */ __name(function toBytesBE() {
          var hi = this.high, lo = this.low;
          return [
            hi >>> 24,
            hi >>> 16 & 255,
            hi >>> 8 & 255,
            hi & 255,
            lo >>> 24,
            lo >>> 16 & 255,
            lo >>> 8 & 255,
            lo & 255
          ];
        }, "toBytesBE");
        Long.fromBytes = /* @__PURE__ */ __name(function fromBytes(bytes, unsigned, le) {
          return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
        }, "fromBytes");
        Long.fromBytesLE = /* @__PURE__ */ __name(function fromBytesLE(bytes, unsigned) {
          return new Long(
            bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
            bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
            unsigned
          );
        }, "fromBytesLE");
        Long.fromBytesBE = /* @__PURE__ */ __name(function fromBytesBE(bytes, unsigned) {
          return new Long(
            bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
            bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
            unsigned
          );
        }, "fromBytesBE");
        if (typeof BigInt === "function") {
          Long.fromBigInt = /* @__PURE__ */ __name(function fromBigInt(value, unsigned) {
            var lowBits = Number(BigInt.asIntN(32, value));
            var highBits = Number(BigInt.asIntN(32, value >> BigInt(32)));
            return fromBits(lowBits, highBits, unsigned);
          }, "fromBigInt");
          Long.fromValue = /* @__PURE__ */ __name(function fromValueWithBigInt(value, unsigned) {
            if (typeof value === "bigint") return Long.fromBigInt(value, unsigned);
            return fromValue(value, unsigned);
          }, "fromValueWithBigInt");
          LongPrototype.toBigInt = /* @__PURE__ */ __name(function toBigInt() {
            var lowBigInt = BigInt(this.low >>> 0);
            var highBigInt = BigInt(this.unsigned ? this.high >>> 0 : this.high);
            return highBigInt << BigInt(32) | lowBigInt;
          }, "toBigInt");
        }
        var _default = _exports.default = Long;
      }
    );
  }
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports) {
    "use strict";
    var util = exports;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    function isUnsafeProperty(key) {
      return key === "__proto__" || key === "prototype" || key === "constructor";
    }
    __name(isUnsafeProperty, "isUnsafeProperty");
    util.isUnsafeProperty = isUnsafeProperty;
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports;
    util.emptyArray = Object.freeze ? Object.freeze([]) : (
      /* istanbul ignore next */
      []
    );
    util.emptyObject = Object.freeze ? Object.freeze({}) : (
      /* istanbul ignore next */
      {}
    );
    util.isInteger = Number.isInteger || /* istanbul ignore next */
    /* @__PURE__ */ __name(function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    }, "isInteger");
    util.isString = /* @__PURE__ */ __name(function isString(value) {
      return typeof value === "string" || value instanceof String;
    }, "isString");
    util.isObject = /* @__PURE__ */ __name(function isObject(value) {
      return value && typeof value === "object";
    }, "isObject");
    util.isset = /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util.isSet = /* @__PURE__ */ __name(function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && Object.hasOwnProperty.call(obj, prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    }, "isSet");
    util.Buffer = (function() {
      try {
        var Buffer2 = util.global.Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : (
          /* istanbul ignore next */
          null
        );
      } catch (e) {
        return null;
      }
    })();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = /* @__PURE__ */ __name(function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    }, "newBuffer");
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = /* istanbul ignore next */
    util.global.dcodeIO && /* istanbul ignore next */
    util.global.dcodeIO.Long || /* istanbul ignore next */
    util.global.Long || (function() {
      try {
        var Long = require_umd();
        return Long && Long.isLong ? Long : null;
      } catch (e) {
        return null;
      }
    })();
    util.key2Re = /^(?:true|false|0|1)$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\x00-\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = /* @__PURE__ */ __name(function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    }, "longToHash");
    util.longFromHash = /* @__PURE__ */ __name(function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    }, "longFromHash");
    util.longFromKey = /* @__PURE__ */ __name(function longFromKey(key, unsigned) {
      return util.key64Re.test(key) && !util.key32Re.test(key) ? util.longFromHash(key, unsigned) : key;
    }, "longFromKey");
    util.boolFromKey = /* @__PURE__ */ __name(function boolFromKey(key) {
      return key === "true" || key === "1";
    }, "boolFromKey");
    function merge(dst) {
      var ifNotSet = typeof arguments[arguments.length - 1] === "boolean", limit = ifNotSet ? arguments.length - 1 : arguments.length;
      ifNotSet = ifNotSet && arguments[arguments.length - 1];
      for (var a = 1; a < limit; ++a) {
        var src = arguments[a];
        if (!src)
          continue;
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
          if (!isUnsafeProperty(keys[i]) && (dst[keys[i]] === void 0 || !ifNotSet))
            dst[keys[i]] = src[keys[i]];
      }
      return dst;
    }
    __name(merge, "merge");
    util.merge = merge;
    util.nestingLimit = 32;
    util.recursionLimit = 100;
    util.makeProp = /* @__PURE__ */ __name(function makeProp(obj, key, enumerable) {
      if (Object.prototype.hasOwnProperty.call(obj, key))
        return;
      Object.defineProperty(obj, key, {
        enumerable: enumerable === void 0 ? true : enumerable,
        configurable: true,
        writable: true
      });
    }, "makeProp");
    util.lcFirst = /* @__PURE__ */ __name(function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    }, "lcFirst");
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: /* @__PURE__ */ __name(function() {
          return message;
        }, "get") });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      __name(CustomError, "CustomError");
      CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: CustomError,
          writable: true,
          enumerable: false,
          configurable: true
        },
        name: {
          get: /* @__PURE__ */ __name(function get() {
            return name;
          }, "get"),
          set: void 0,
          enumerable: false,
          // configurable: false would accurately preserve the behavior of
          // the original, but I'm guessing that was not intentional.
          // For an actual error subclass, this property would
          // be configurable.
          configurable: true
        },
        toString: {
          value: /* @__PURE__ */ __name(function value() {
            return this.name + ": " + this.message;
          }, "value"),
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      return CustomError;
    }
    __name(newError, "newError");
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = /* @__PURE__ */ __name(function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    }, "getOneOf");
    util.oneOfSetter = /* @__PURE__ */ __name(function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    }, "setOneOf");
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
      /* @__PURE__ */ __name(function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      }, "Buffer_from");
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
      /* @__PURE__ */ __name(function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      }, "Buffer_allocUnsafe");
    };
  }
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports, module) {
    "use strict";
    module.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base64 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    __name(Op, "Op");
    function noop() {
    }
    __name(noop, "noop");
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    __name(State, "State");
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    __name(Writer, "Writer");
    var create = /* @__PURE__ */ __name(function create2() {
      return util.Buffer ? /* @__PURE__ */ __name(function create_buffer_setup() {
        return (Writer.create = /* @__PURE__ */ __name(function create_buffer() {
          return new BufferWriter();
        }, "create_buffer"))();
      }, "create_buffer_setup") : /* @__PURE__ */ __name(function create_array() {
        return new Writer();
      }, "create_array");
    }, "create");
    Writer.create = create();
    Writer.alloc = /* @__PURE__ */ __name(function alloc(size) {
      return new util.Array(size);
    }, "alloc");
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = /* @__PURE__ */ __name(function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    }, "push");
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    __name(writeByte, "writeByte");
    function writeStringAscii(val, buf, pos) {
      for (var i = 0; i < val.length; )
        buf[pos++] = val.charCodeAt(i++);
    }
    __name(writeStringAscii, "writeStringAscii");
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    __name(writeVarint32, "writeVarint32");
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    __name(VarintOp, "VarintOp");
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = /* @__PURE__ */ __name(function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
        value
      )).len;
      return this;
    }, "write_uint32");
    Writer.prototype.int32 = /* @__PURE__ */ __name(function write_int32(value) {
      return (value |= 0) < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    }, "write_int32");
    Writer.prototype.sint32 = /* @__PURE__ */ __name(function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    }, "write_sint32");
    function writeVarint64(val, buf, pos) {
      var lo = val.lo, hi = val.hi;
      while (hi) {
        buf[pos++] = lo & 127 | 128;
        lo = (lo >>> 7 | hi << 25) >>> 0;
        hi >>>= 7;
      }
      while (lo > 127) {
        buf[pos++] = lo & 127 | 128;
        lo = lo >>> 7;
      }
      buf[pos++] = lo;
    }
    __name(writeVarint64, "writeVarint64");
    Writer.prototype.uint64 = /* @__PURE__ */ __name(function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    }, "write_uint64");
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = /* @__PURE__ */ __name(function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    }, "write_sint64");
    Writer.prototype.bool = /* @__PURE__ */ __name(function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    }, "write_bool");
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    __name(writeFixed32, "writeFixed32");
    Writer.prototype.fixed32 = /* @__PURE__ */ __name(function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    }, "write_fixed32");
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = /* @__PURE__ */ __name(function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    }, "write_fixed64");
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = /* @__PURE__ */ __name(function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    }, "write_float");
    Writer.prototype.double = /* @__PURE__ */ __name(function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    }, "write_double");
    var writeBytes = util.Array.prototype.set ? /* @__PURE__ */ __name(function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    }, "writeBytes_set") : /* @__PURE__ */ __name(function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    }, "writeBytes_for");
    Writer.prototype.bytes = /* @__PURE__ */ __name(function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    }, "write_bytes");
    Writer.prototype.raw = /* @__PURE__ */ __name(function write_raw(value) {
      var len = value.length >>> 0;
      return len ? this._push(writeBytes, len, value) : this;
    }, "write_raw");
    Writer.prototype.string = /* @__PURE__ */ __name(function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(len === value.length ? writeStringAscii : utf8.write, len, value) : this._push(writeByte, 1, 0);
    }, "write_string");
    Writer.prototype.fork = /* @__PURE__ */ __name(function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    }, "fork");
    Writer.prototype.reset = /* @__PURE__ */ __name(function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    }, "reset");
    Writer.prototype.ldelim = /* @__PURE__ */ __name(function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    }, "ldelim");
    Writer.prototype.finish = /* @__PURE__ */ __name(function finish() {
      return this.finishInto(this.constructor.alloc(this.len), 0);
    }, "finish");
    Writer.prototype.finishInto = /* @__PURE__ */ __name(function finishInto(buf, offset) {
      if (offset === void 0)
        offset = 0;
      var head = this.head.next, pos = offset;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    }, "finishInto");
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create();
      BufferWriter._configure();
    };
  }
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports, module) {
    "use strict";
    module.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    __name(BufferWriter, "BufferWriter");
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? /* @__PURE__ */ __name(function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      }, "writeBytesBuffer_set") : /* @__PURE__ */ __name(function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else for (var i = 0; i < val.length; )
          buf[pos++] = val[i++];
      }, "writeBytesBuffer_copy");
    };
    BufferWriter.prototype.bytes = /* @__PURE__ */ __name(function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    }, "write_bytes_buffer");
    BufferWriter.prototype.raw = /* @__PURE__ */ __name(function write_raw_buffer(value) {
      var len = value.length >>> 0;
      return len ? this._push(BufferWriter.writeBytesBuffer, len, value) : this;
    }, "write_raw_buffer");
    function writeStringBufferAscii(val, buf, pos) {
      for (var i = 0; i < val.length; )
        buf[pos++] = val.charCodeAt(i++);
    }
    __name(writeStringBufferAscii, "writeStringBufferAscii");
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    __name(writeStringBuffer, "writeStringBuffer");
    BufferWriter.prototype.string = /* @__PURE__ */ __name(function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(len === value.length && len < 40 ? writeStringBufferAscii : writeStringBuffer, len, value);
      return this;
    }, "write_string_buffer");
    BufferWriter._configure();
  }
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports, module) {
    "use strict";
    module.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    __name(indexOutOfRange, "indexOutOfRange");
    function Reader(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
      this.discardUnknown = Reader.discardUnknown;
    }
    __name(Reader, "Reader");
    var create_array = typeof Uint8Array !== "undefined" ? /* @__PURE__ */ __name(function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    }, "create_typed_array") : /* @__PURE__ */ __name(function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    }, "create_array");
    var create = /* @__PURE__ */ __name(function create2() {
      return util.Buffer ? /* @__PURE__ */ __name(function create_buffer_setup(buffer) {
        return (Reader.create = /* @__PURE__ */ __name(function create_buffer(buffer2) {
          return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        }, "create_buffer"))(buffer);
      }, "create_buffer_setup") : create_array;
    }, "create");
    Reader.create = create();
    Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
    util.Array.prototype.slice;
    Reader.prototype.raw = /* @__PURE__ */ __name(function read_raw(start, end) {
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      if (start === end)
        return new this.buf.constructor(0);
      return this._slice.call(this.buf, start, end);
    }, "read_raw");
    Reader.prototype.uint32 = /* @__PURE__ */ __name(function read_uint32() {
      var buf = this.buf, pos = this.pos, value = (buf[pos] & 127) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | (buf[pos] & 127) << 7) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | (buf[pos] & 127) << 14) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | (buf[pos] & 127) << 21) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | (buf[pos] & 15) << 28) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      for (var i = 0; i < 5; ++i) {
        if (pos >= this.len) {
          this.pos = pos;
          throw indexOutOfRange(this);
        }
        if (buf[pos++] < 128) {
          this.pos = pos;
          return value;
        }
      }
      this.pos = pos;
      throw Error("invalid varint encoding");
    }, "read_uint32");
    Reader.prototype.tag = /* @__PURE__ */ __name(function read_tag() {
      var buf = this.buf, pos = this.pos, value = (buf[pos] & 127) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | (buf[pos] & 127) << 7) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | (buf[pos] & 127) << 14) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | (buf[pos] & 127) << 21) >>> 0;
      if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
      }
      value = (value | (buf[pos] & 15) << 28) >>> 0;
      if (buf[pos] < 128 && (buf[pos] & 112) === 0) {
        this.pos = pos + 1;
        return value;
      }
      this.pos = pos + 1;
      throw Error("invalid tag encoding");
    }, "read_tag");
    Reader.prototype.int32 = /* @__PURE__ */ __name(function read_int32() {
      return this.uint32() | 0;
    }, "read_int32");
    Reader.prototype.sint32 = /* @__PURE__ */ __name(function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    }, "read_sint32");
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    __name(readLongVarint, "readLongVarint");
    Reader.prototype.bool = /* @__PURE__ */ __name(function read_bool() {
      var value = false, b;
      for (var i = 0; i < 10; ++i) {
        if (this.pos >= this.len)
          throw indexOutOfRange(this);
        b = this.buf[this.pos++];
        if (b & 127)
          value = true;
        if (b < 128)
          return value;
      }
      throw Error("invalid varint encoding");
    }, "read_bool");
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    __name(readFixed32_end, "readFixed32_end");
    Reader.prototype.fixed32 = /* @__PURE__ */ __name(function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    }, "read_fixed32");
    Reader.prototype.sfixed32 = /* @__PURE__ */ __name(function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    }, "read_sfixed32");
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    __name(readFixed64, "readFixed64");
    Reader.prototype.float = /* @__PURE__ */ __name(function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    }, "read_float");
    Reader.prototype.double = /* @__PURE__ */ __name(function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    }, "read_double");
    Reader.prototype.bytes = /* @__PURE__ */ __name(function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos = end;
      return this.raw(start, end);
    }, "read_bytes");
    Reader.prototype.string = /* @__PURE__ */ __name(function read_string() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos = end;
      return utf8.read(this.buf, start, end);
    }, "read_string");
    Reader.prototype.skip = /* @__PURE__ */ __name(function skip(length) {
      if (typeof length === "number") {
        if (this.pos + length > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    }, "skip");
    Reader.recursionLimit = util.recursionLimit;
    Reader.discardUnknown = true;
    Reader.prototype.skipType = function(wireType, depth, fieldNumber) {
      if (depth === void 0) depth = 0;
      if (depth > Reader.recursionLimit)
        throw Error("max depth exceeded");
      if (fieldNumber === 0)
        throw Error("illegal tag: field number 0");
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while (true) {
            var tag = this.tag();
            var nestedField = tag >>> 3;
            wireType = tag & 7;
            if (!nestedField)
              throw Error("illegal tag: field number 0");
            if (wireType === 4) {
              if (fieldNumber !== void 0 && nestedField !== fieldNumber)
                throw Error("invalid end group tag");
              break;
            }
            this.skipType(wireType, depth + 1, nestedField);
          }
          break;
        case 5:
          this.skip(4);
          break;
        /* istanbul ignore next */
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : (
        /* istanbul ignore next */
        "toNumber"
      );
      util.merge(Reader.prototype, {
        int64: /* @__PURE__ */ __name(function read_int64() {
          return readLongVarint.call(this)[fn](false);
        }, "read_int64"),
        uint64: /* @__PURE__ */ __name(function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        }, "read_uint64"),
        sint64: /* @__PURE__ */ __name(function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        }, "read_sint64"),
        fixed64: /* @__PURE__ */ __name(function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        }, "read_fixed64"),
        sfixed64: /* @__PURE__ */ __name(function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }, "read_sfixed64")
      });
    };
  }
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports, module) {
    "use strict";
    module.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util = require_minimal();
    function BufferReader(buffer) {
      Reader.call(this, buffer);
    }
    __name(BufferReader, "BufferReader");
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.raw = /* @__PURE__ */ __name(function read_raw_buffer(start, end) {
      if (start === end)
        return util.Buffer.alloc(0);
      return this._slice.call(this.buf, start, end);
    }, "read_raw_buffer");
    BufferReader.prototype.string = /* @__PURE__ */ __name(function read_string_buffer() {
      var len = this.uint32(), start = this.pos, end = this.pos + len;
      if (end > this.len)
        throw RangeError("index out of range: " + this.pos + " + " + len + " > " + this.len);
      this.pos = end;
      return this.buf.utf8Slice ? this.buf.utf8Slice(start, end) : this.buf.toString("utf-8", start, end);
    }, "read_string_buffer");
    BufferReader._configure();
  }
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports, module) {
    "use strict";
    module.exports = Service;
    var util = require_minimal();
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    __name(Service, "Service");
    Service.prototype.rpcCall = /* @__PURE__ */ __name(function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(
          method,
          requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
          /* @__PURE__ */ __name(function rpcCallback(err, response) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response === null) {
              self2.end(
                /* endedByRPC */
                true
              );
              return void 0;
            }
            if (!(response instanceof responseCtor)) {
              try {
                response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
              } catch (err2) {
                self2.emit("error", err2, method);
                return callback(err2);
              }
            }
            self2.emit("data", response, method);
            return callback(null, response);
          }, "rpcCallback")
        );
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    }, "rpcCall");
    Service.prototype.end = /* @__PURE__ */ __name(function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    }, "end");
  }
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports) {
    "use strict";
    var rpc = exports;
    rpc.Service = require_service();
  }
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports, module) {
    "use strict";
    module.exports = /* @__PURE__ */ Object.create(null);
  }
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports) {
    "use strict";
    var protobuf = exports;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    __name(configure, "configure");
    configure();
  }
});

// node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "node_modules/protobufjs/minimal.js"(exports, module) {
    "use strict";
    module.exports = require_index_minimal();
  }
});

// node_modules/gtfs-realtime-bindings/gtfs-realtime.js
var require_gtfs_realtime = __commonJS({
  "node_modules/gtfs-realtime-bindings/gtfs-realtime.js"(exports, module) {
    "use strict";
    var $protobuf = require_minimal2();
    var $Reader = $protobuf.Reader;
    var $Writer = $protobuf.Writer;
    var $util = $protobuf.util;
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    $root.transit_realtime = (function() {
      var transit_realtime = {};
      transit_realtime.FeedMessage = (function() {
        function FeedMessage(properties) {
          this.entity = [];
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(FeedMessage, "FeedMessage");
        FeedMessage.prototype.header = null;
        FeedMessage.prototype.entity = $util.emptyArray;
        FeedMessage.create = /* @__PURE__ */ __name(function create(properties) {
          return new FeedMessage(properties);
        }, "create");
        FeedMessage.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          $root.transit_realtime.FeedHeader.encode(message.header, writer.uint32(
            /* id 1, wireType 2 =*/
            10
          ).fork()).ldelim();
          if (message.entity != null && message.entity.length)
            for (var i = 0; i < message.entity.length; ++i)
              $root.transit_realtime.FeedEntity.encode(message.entity[i], writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).fork()).ldelim();
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        FeedMessage.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        FeedMessage.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.FeedMessage();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                message.header = $root.transit_realtime.FeedHeader.decode(reader, reader.uint32(), void 0, _depth + 1, message.header);
                continue;
              }
              case 2: {
                if (wireType !== 2)
                  break;
                if (!(message.entity && message.entity.length))
                  message.entity = [];
                message.entity.push($root.transit_realtime.FeedEntity.decode(reader, reader.uint32(), void 0, _depth + 1));
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          if (!message.hasOwnProperty("header"))
            throw $util.ProtocolError("missing required 'header'", { instance: message });
          return message;
        }, "decode");
        FeedMessage.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        FeedMessage.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          {
            var error = $root.transit_realtime.FeedHeader.verify(message.header, _depth + 1);
            if (error)
              return "header." + error;
          }
          if (message.entity != null && message.hasOwnProperty("entity")) {
            if (!Array.isArray(message.entity))
              return "entity: array expected";
            for (var i = 0; i < message.entity.length; ++i) {
              var error = $root.transit_realtime.FeedEntity.verify(message.entity[i], _depth + 1);
              if (error)
                return "entity." + error;
            }
          }
          return null;
        }, "verify");
        FeedMessage.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.FeedMessage)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.FeedMessage();
          if (object.header != null) {
            if (typeof object.header !== "object")
              throw TypeError(".transit_realtime.FeedMessage.header: object expected");
            message.header = $root.transit_realtime.FeedHeader.fromObject(object.header, _depth + 1);
          }
          if (object.entity) {
            if (!Array.isArray(object.entity))
              throw TypeError(".transit_realtime.FeedMessage.entity: array expected");
            message.entity = Array(object.entity.length);
            for (var i = 0; i < object.entity.length; ++i) {
              if (typeof object.entity[i] !== "object")
                throw TypeError(".transit_realtime.FeedMessage.entity: object expected");
              message.entity[i] = $root.transit_realtime.FeedEntity.fromObject(object.entity[i], _depth + 1);
            }
          }
          return message;
        }, "fromObject");
        FeedMessage.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.arrays || options.defaults)
            object.entity = [];
          if (options.defaults)
            object.header = null;
          if (message.header != null && message.hasOwnProperty("header"))
            object.header = $root.transit_realtime.FeedHeader.toObject(message.header, options);
          if (message.entity && message.entity.length) {
            object.entity = Array(message.entity.length);
            for (var j = 0; j < message.entity.length; ++j)
              object.entity[j] = $root.transit_realtime.FeedEntity.toObject(message.entity[j], options);
          }
          return object;
        }, "toObject");
        FeedMessage.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        FeedMessage.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.FeedMessage";
        }, "getTypeUrl");
        return FeedMessage;
      })();
      transit_realtime.FeedHeader = (function() {
        function FeedHeader(properties) {
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(FeedHeader, "FeedHeader");
        FeedHeader.prototype.gtfsRealtimeVersion = "";
        FeedHeader.prototype.incrementality = 0;
        FeedHeader.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        FeedHeader.prototype.feedVersion = "";
        FeedHeader.create = /* @__PURE__ */ __name(function create(properties) {
          return new FeedHeader(properties);
        }, "create");
        FeedHeader.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          writer.uint32(
            /* id 1, wireType 2 =*/
            10
          ).string(message.gtfsRealtimeVersion);
          if (message.incrementality != null && Object.hasOwnProperty.call(message, "incrementality"))
            writer.uint32(
              /* id 2, wireType 0 =*/
              16
            ).int32(message.incrementality);
          if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(
              /* id 3, wireType 0 =*/
              24
            ).uint64(message.timestamp);
          if (message.feedVersion != null && Object.hasOwnProperty.call(message, "feedVersion"))
            writer.uint32(
              /* id 4, wireType 2 =*/
              34
            ).string(message.feedVersion);
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        FeedHeader.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        FeedHeader.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.FeedHeader();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                message.gtfsRealtimeVersion = reader.string();
                continue;
              }
              case 2: {
                if (wireType !== 0)
                  break;
                message.incrementality = reader.int32();
                continue;
              }
              case 3: {
                if (wireType !== 0)
                  break;
                message.timestamp = reader.uint64();
                continue;
              }
              case 4: {
                if (wireType !== 2)
                  break;
                message.feedVersion = reader.string();
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          if (!message.hasOwnProperty("gtfsRealtimeVersion"))
            throw $util.ProtocolError("missing required 'gtfsRealtimeVersion'", { instance: message });
          return message;
        }, "decode");
        FeedHeader.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        FeedHeader.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (!$util.isString(message.gtfsRealtimeVersion))
            return "gtfsRealtimeVersion: string expected";
          if (message.incrementality != null && message.hasOwnProperty("incrementality"))
            switch (message.incrementality) {
              default:
                return "incrementality: enum value expected";
              case 0:
              case 1:
                break;
            }
          if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
              return "timestamp: integer|Long expected";
          }
          if (message.feedVersion != null && message.hasOwnProperty("feedVersion")) {
            if (!$util.isString(message.feedVersion))
              return "feedVersion: string expected";
          }
          return null;
        }, "verify");
        FeedHeader.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.FeedHeader)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.FeedHeader();
          if (object.gtfsRealtimeVersion != null)
            message.gtfsRealtimeVersion = String(object.gtfsRealtimeVersion);
          switch (object.incrementality) {
            default:
              if (typeof object.incrementality === "number") {
                message.incrementality = object.incrementality;
                break;
              }
              break;
            case "FULL_DATASET":
            case 0:
              message.incrementality = 0;
              break;
            case "DIFFERENTIAL":
            case 1:
              message.incrementality = 1;
              break;
          }
          if (object.timestamp != null) {
            if ($util.Long)
              (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
            else if (typeof object.timestamp === "string")
              message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
              message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
              message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
          }
          if (object.feedVersion != null)
            message.feedVersion = String(object.feedVersion);
          return message;
        }, "fromObject");
        FeedHeader.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.defaults) {
            object.gtfsRealtimeVersion = "";
            object.incrementality = options.enums === String ? "FULL_DATASET" : 0;
            if ($util.Long) {
              var long = new $util.Long(0, 0, true);
              object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
              object.timestamp = options.longs === String ? "0" : 0;
            object.feedVersion = "";
          }
          if (message.gtfsRealtimeVersion != null && message.hasOwnProperty("gtfsRealtimeVersion"))
            object.gtfsRealtimeVersion = message.gtfsRealtimeVersion;
          if (message.incrementality != null && message.hasOwnProperty("incrementality"))
            object.incrementality = options.enums === String ? $root.transit_realtime.FeedHeader.Incrementality[message.incrementality] === void 0 ? message.incrementality : $root.transit_realtime.FeedHeader.Incrementality[message.incrementality] : message.incrementality;
          if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
              object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
              object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
          if (message.feedVersion != null && message.hasOwnProperty("feedVersion"))
            object.feedVersion = message.feedVersion;
          return object;
        }, "toObject");
        FeedHeader.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        FeedHeader.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.FeedHeader";
        }, "getTypeUrl");
        FeedHeader.Incrementality = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "FULL_DATASET"] = 0;
          values[valuesById[1] = "DIFFERENTIAL"] = 1;
          return values;
        })();
        return FeedHeader;
      })();
      transit_realtime.FeedEntity = (function() {
        function FeedEntity(properties) {
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(FeedEntity, "FeedEntity");
        FeedEntity.prototype.id = "";
        FeedEntity.prototype.isDeleted = false;
        FeedEntity.prototype.tripUpdate = null;
        FeedEntity.prototype.vehicle = null;
        FeedEntity.prototype.alert = null;
        FeedEntity.prototype.shape = null;
        FeedEntity.prototype.stop = null;
        FeedEntity.prototype.tripModifications = null;
        FeedEntity.create = /* @__PURE__ */ __name(function create(properties) {
          return new FeedEntity(properties);
        }, "create");
        FeedEntity.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          writer.uint32(
            /* id 1, wireType 2 =*/
            10
          ).string(message.id);
          if (message.isDeleted != null && Object.hasOwnProperty.call(message, "isDeleted"))
            writer.uint32(
              /* id 2, wireType 0 =*/
              16
            ).bool(message.isDeleted);
          if (message.tripUpdate != null && Object.hasOwnProperty.call(message, "tripUpdate"))
            $root.transit_realtime.TripUpdate.encode(message.tripUpdate, writer.uint32(
              /* id 3, wireType 2 =*/
              26
            ).fork()).ldelim();
          if (message.vehicle != null && Object.hasOwnProperty.call(message, "vehicle"))
            $root.transit_realtime.VehiclePosition.encode(message.vehicle, writer.uint32(
              /* id 4, wireType 2 =*/
              34
            ).fork()).ldelim();
          if (message.alert != null && Object.hasOwnProperty.call(message, "alert"))
            $root.transit_realtime.Alert.encode(message.alert, writer.uint32(
              /* id 5, wireType 2 =*/
              42
            ).fork()).ldelim();
          if (message.shape != null && Object.hasOwnProperty.call(message, "shape"))
            $root.transit_realtime.Shape.encode(message.shape, writer.uint32(
              /* id 6, wireType 2 =*/
              50
            ).fork()).ldelim();
          if (message.stop != null && Object.hasOwnProperty.call(message, "stop"))
            $root.transit_realtime.Stop.encode(message.stop, writer.uint32(
              /* id 7, wireType 2 =*/
              58
            ).fork()).ldelim();
          if (message.tripModifications != null && Object.hasOwnProperty.call(message, "tripModifications"))
            $root.transit_realtime.TripModifications.encode(message.tripModifications, writer.uint32(
              /* id 8, wireType 2 =*/
              66
            ).fork()).ldelim();
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        FeedEntity.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        FeedEntity.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.FeedEntity();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                message.id = reader.string();
                continue;
              }
              case 2: {
                if (wireType !== 0)
                  break;
                message.isDeleted = reader.bool();
                continue;
              }
              case 3: {
                if (wireType !== 2)
                  break;
                message.tripUpdate = $root.transit_realtime.TripUpdate.decode(reader, reader.uint32(), void 0, _depth + 1, message.tripUpdate);
                continue;
              }
              case 4: {
                if (wireType !== 2)
                  break;
                message.vehicle = $root.transit_realtime.VehiclePosition.decode(reader, reader.uint32(), void 0, _depth + 1, message.vehicle);
                continue;
              }
              case 5: {
                if (wireType !== 2)
                  break;
                message.alert = $root.transit_realtime.Alert.decode(reader, reader.uint32(), void 0, _depth + 1, message.alert);
                continue;
              }
              case 6: {
                if (wireType !== 2)
                  break;
                message.shape = $root.transit_realtime.Shape.decode(reader, reader.uint32(), void 0, _depth + 1, message.shape);
                continue;
              }
              case 7: {
                if (wireType !== 2)
                  break;
                message.stop = $root.transit_realtime.Stop.decode(reader, reader.uint32(), void 0, _depth + 1, message.stop);
                continue;
              }
              case 8: {
                if (wireType !== 2)
                  break;
                message.tripModifications = $root.transit_realtime.TripModifications.decode(reader, reader.uint32(), void 0, _depth + 1, message.tripModifications);
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          if (!message.hasOwnProperty("id"))
            throw $util.ProtocolError("missing required 'id'", { instance: message });
          return message;
        }, "decode");
        FeedEntity.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        FeedEntity.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (!$util.isString(message.id))
            return "id: string expected";
          if (message.isDeleted != null && message.hasOwnProperty("isDeleted")) {
            if (typeof message.isDeleted !== "boolean")
              return "isDeleted: boolean expected";
          }
          if (message.tripUpdate != null && message.hasOwnProperty("tripUpdate")) {
            var error = $root.transit_realtime.TripUpdate.verify(message.tripUpdate, _depth + 1);
            if (error)
              return "tripUpdate." + error;
          }
          if (message.vehicle != null && message.hasOwnProperty("vehicle")) {
            var error = $root.transit_realtime.VehiclePosition.verify(message.vehicle, _depth + 1);
            if (error)
              return "vehicle." + error;
          }
          if (message.alert != null && message.hasOwnProperty("alert")) {
            var error = $root.transit_realtime.Alert.verify(message.alert, _depth + 1);
            if (error)
              return "alert." + error;
          }
          if (message.shape != null && message.hasOwnProperty("shape")) {
            var error = $root.transit_realtime.Shape.verify(message.shape, _depth + 1);
            if (error)
              return "shape." + error;
          }
          if (message.stop != null && message.hasOwnProperty("stop")) {
            var error = $root.transit_realtime.Stop.verify(message.stop, _depth + 1);
            if (error)
              return "stop." + error;
          }
          if (message.tripModifications != null && message.hasOwnProperty("tripModifications")) {
            var error = $root.transit_realtime.TripModifications.verify(message.tripModifications, _depth + 1);
            if (error)
              return "tripModifications." + error;
          }
          return null;
        }, "verify");
        FeedEntity.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.FeedEntity)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.FeedEntity();
          if (object.id != null)
            message.id = String(object.id);
          if (object.isDeleted != null)
            message.isDeleted = Boolean(object.isDeleted);
          if (object.tripUpdate != null) {
            if (typeof object.tripUpdate !== "object")
              throw TypeError(".transit_realtime.FeedEntity.tripUpdate: object expected");
            message.tripUpdate = $root.transit_realtime.TripUpdate.fromObject(object.tripUpdate, _depth + 1);
          }
          if (object.vehicle != null) {
            if (typeof object.vehicle !== "object")
              throw TypeError(".transit_realtime.FeedEntity.vehicle: object expected");
            message.vehicle = $root.transit_realtime.VehiclePosition.fromObject(object.vehicle, _depth + 1);
          }
          if (object.alert != null) {
            if (typeof object.alert !== "object")
              throw TypeError(".transit_realtime.FeedEntity.alert: object expected");
            message.alert = $root.transit_realtime.Alert.fromObject(object.alert, _depth + 1);
          }
          if (object.shape != null) {
            if (typeof object.shape !== "object")
              throw TypeError(".transit_realtime.FeedEntity.shape: object expected");
            message.shape = $root.transit_realtime.Shape.fromObject(object.shape, _depth + 1);
          }
          if (object.stop != null) {
            if (typeof object.stop !== "object")
              throw TypeError(".transit_realtime.FeedEntity.stop: object expected");
            message.stop = $root.transit_realtime.Stop.fromObject(object.stop, _depth + 1);
          }
          if (object.tripModifications != null) {
            if (typeof object.tripModifications !== "object")
              throw TypeError(".transit_realtime.FeedEntity.tripModifications: object expected");
            message.tripModifications = $root.transit_realtime.TripModifications.fromObject(object.tripModifications, _depth + 1);
          }
          return message;
        }, "fromObject");
        FeedEntity.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.defaults) {
            object.id = "";
            object.isDeleted = false;
            object.tripUpdate = null;
            object.vehicle = null;
            object.alert = null;
            object.shape = null;
            object.stop = null;
            object.tripModifications = null;
          }
          if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
          if (message.isDeleted != null && message.hasOwnProperty("isDeleted"))
            object.isDeleted = message.isDeleted;
          if (message.tripUpdate != null && message.hasOwnProperty("tripUpdate"))
            object.tripUpdate = $root.transit_realtime.TripUpdate.toObject(message.tripUpdate, options);
          if (message.vehicle != null && message.hasOwnProperty("vehicle"))
            object.vehicle = $root.transit_realtime.VehiclePosition.toObject(message.vehicle, options);
          if (message.alert != null && message.hasOwnProperty("alert"))
            object.alert = $root.transit_realtime.Alert.toObject(message.alert, options);
          if (message.shape != null && message.hasOwnProperty("shape"))
            object.shape = $root.transit_realtime.Shape.toObject(message.shape, options);
          if (message.stop != null && message.hasOwnProperty("stop"))
            object.stop = $root.transit_realtime.Stop.toObject(message.stop, options);
          if (message.tripModifications != null && message.hasOwnProperty("tripModifications"))
            object.tripModifications = $root.transit_realtime.TripModifications.toObject(message.tripModifications, options);
          return object;
        }, "toObject");
        FeedEntity.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        FeedEntity.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.FeedEntity";
        }, "getTypeUrl");
        return FeedEntity;
      })();
      transit_realtime.TripUpdate = (function() {
        function TripUpdate(properties) {
          this.stopTimeUpdate = [];
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(TripUpdate, "TripUpdate");
        TripUpdate.prototype.trip = null;
        TripUpdate.prototype.vehicle = null;
        TripUpdate.prototype.stopTimeUpdate = $util.emptyArray;
        TripUpdate.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        TripUpdate.prototype.delay = 0;
        TripUpdate.prototype.tripProperties = null;
        TripUpdate.create = /* @__PURE__ */ __name(function create(properties) {
          return new TripUpdate(properties);
        }, "create");
        TripUpdate.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          $root.transit_realtime.TripDescriptor.encode(message.trip, writer.uint32(
            /* id 1, wireType 2 =*/
            10
          ).fork()).ldelim();
          if (message.stopTimeUpdate != null && message.stopTimeUpdate.length)
            for (var i = 0; i < message.stopTimeUpdate.length; ++i)
              $root.transit_realtime.TripUpdate.StopTimeUpdate.encode(message.stopTimeUpdate[i], writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).fork()).ldelim();
          if (message.vehicle != null && Object.hasOwnProperty.call(message, "vehicle"))
            $root.transit_realtime.VehicleDescriptor.encode(message.vehicle, writer.uint32(
              /* id 3, wireType 2 =*/
              26
            ).fork()).ldelim();
          if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(
              /* id 4, wireType 0 =*/
              32
            ).uint64(message.timestamp);
          if (message.delay != null && Object.hasOwnProperty.call(message, "delay"))
            writer.uint32(
              /* id 5, wireType 0 =*/
              40
            ).int32(message.delay);
          if (message.tripProperties != null && Object.hasOwnProperty.call(message, "tripProperties"))
            $root.transit_realtime.TripUpdate.TripProperties.encode(message.tripProperties, writer.uint32(
              /* id 6, wireType 2 =*/
              50
            ).fork()).ldelim();
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        TripUpdate.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        TripUpdate.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TripUpdate();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                message.trip = $root.transit_realtime.TripDescriptor.decode(reader, reader.uint32(), void 0, _depth + 1, message.trip);
                continue;
              }
              case 3: {
                if (wireType !== 2)
                  break;
                message.vehicle = $root.transit_realtime.VehicleDescriptor.decode(reader, reader.uint32(), void 0, _depth + 1, message.vehicle);
                continue;
              }
              case 2: {
                if (wireType !== 2)
                  break;
                if (!(message.stopTimeUpdate && message.stopTimeUpdate.length))
                  message.stopTimeUpdate = [];
                message.stopTimeUpdate.push($root.transit_realtime.TripUpdate.StopTimeUpdate.decode(reader, reader.uint32(), void 0, _depth + 1));
                continue;
              }
              case 4: {
                if (wireType !== 0)
                  break;
                message.timestamp = reader.uint64();
                continue;
              }
              case 5: {
                if (wireType !== 0)
                  break;
                message.delay = reader.int32();
                continue;
              }
              case 6: {
                if (wireType !== 2)
                  break;
                message.tripProperties = $root.transit_realtime.TripUpdate.TripProperties.decode(reader, reader.uint32(), void 0, _depth + 1, message.tripProperties);
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          if (!message.hasOwnProperty("trip"))
            throw $util.ProtocolError("missing required 'trip'", { instance: message });
          return message;
        }, "decode");
        TripUpdate.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        TripUpdate.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          {
            var error = $root.transit_realtime.TripDescriptor.verify(message.trip, _depth + 1);
            if (error)
              return "trip." + error;
          }
          if (message.vehicle != null && message.hasOwnProperty("vehicle")) {
            var error = $root.transit_realtime.VehicleDescriptor.verify(message.vehicle, _depth + 1);
            if (error)
              return "vehicle." + error;
          }
          if (message.stopTimeUpdate != null && message.hasOwnProperty("stopTimeUpdate")) {
            if (!Array.isArray(message.stopTimeUpdate))
              return "stopTimeUpdate: array expected";
            for (var i = 0; i < message.stopTimeUpdate.length; ++i) {
              var error = $root.transit_realtime.TripUpdate.StopTimeUpdate.verify(message.stopTimeUpdate[i], _depth + 1);
              if (error)
                return "stopTimeUpdate." + error;
            }
          }
          if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
              return "timestamp: integer|Long expected";
          }
          if (message.delay != null && message.hasOwnProperty("delay")) {
            if (!$util.isInteger(message.delay))
              return "delay: integer expected";
          }
          if (message.tripProperties != null && message.hasOwnProperty("tripProperties")) {
            var error = $root.transit_realtime.TripUpdate.TripProperties.verify(message.tripProperties, _depth + 1);
            if (error)
              return "tripProperties." + error;
          }
          return null;
        }, "verify");
        TripUpdate.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.TripUpdate)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.TripUpdate();
          if (object.trip != null) {
            if (typeof object.trip !== "object")
              throw TypeError(".transit_realtime.TripUpdate.trip: object expected");
            message.trip = $root.transit_realtime.TripDescriptor.fromObject(object.trip, _depth + 1);
          }
          if (object.vehicle != null) {
            if (typeof object.vehicle !== "object")
              throw TypeError(".transit_realtime.TripUpdate.vehicle: object expected");
            message.vehicle = $root.transit_realtime.VehicleDescriptor.fromObject(object.vehicle, _depth + 1);
          }
          if (object.stopTimeUpdate) {
            if (!Array.isArray(object.stopTimeUpdate))
              throw TypeError(".transit_realtime.TripUpdate.stopTimeUpdate: array expected");
            message.stopTimeUpdate = Array(object.stopTimeUpdate.length);
            for (var i = 0; i < object.stopTimeUpdate.length; ++i) {
              if (typeof object.stopTimeUpdate[i] !== "object")
                throw TypeError(".transit_realtime.TripUpdate.stopTimeUpdate: object expected");
              message.stopTimeUpdate[i] = $root.transit_realtime.TripUpdate.StopTimeUpdate.fromObject(object.stopTimeUpdate[i], _depth + 1);
            }
          }
          if (object.timestamp != null) {
            if ($util.Long)
              (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
            else if (typeof object.timestamp === "string")
              message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
              message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
              message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
          }
          if (object.delay != null)
            message.delay = object.delay | 0;
          if (object.tripProperties != null) {
            if (typeof object.tripProperties !== "object")
              throw TypeError(".transit_realtime.TripUpdate.tripProperties: object expected");
            message.tripProperties = $root.transit_realtime.TripUpdate.TripProperties.fromObject(object.tripProperties, _depth + 1);
          }
          return message;
        }, "fromObject");
        TripUpdate.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.arrays || options.defaults)
            object.stopTimeUpdate = [];
          if (options.defaults) {
            object.trip = null;
            object.vehicle = null;
            if ($util.Long) {
              var long = new $util.Long(0, 0, true);
              object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
              object.timestamp = options.longs === String ? "0" : 0;
            object.delay = 0;
            object.tripProperties = null;
          }
          if (message.trip != null && message.hasOwnProperty("trip"))
            object.trip = $root.transit_realtime.TripDescriptor.toObject(message.trip, options);
          if (message.stopTimeUpdate && message.stopTimeUpdate.length) {
            object.stopTimeUpdate = Array(message.stopTimeUpdate.length);
            for (var j = 0; j < message.stopTimeUpdate.length; ++j)
              object.stopTimeUpdate[j] = $root.transit_realtime.TripUpdate.StopTimeUpdate.toObject(message.stopTimeUpdate[j], options);
          }
          if (message.vehicle != null && message.hasOwnProperty("vehicle"))
            object.vehicle = $root.transit_realtime.VehicleDescriptor.toObject(message.vehicle, options);
          if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
              object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
              object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
          if (message.delay != null && message.hasOwnProperty("delay"))
            object.delay = message.delay;
          if (message.tripProperties != null && message.hasOwnProperty("tripProperties"))
            object.tripProperties = $root.transit_realtime.TripUpdate.TripProperties.toObject(message.tripProperties, options);
          return object;
        }, "toObject");
        TripUpdate.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        TripUpdate.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.TripUpdate";
        }, "getTypeUrl");
        TripUpdate.StopTimeEvent = (function() {
          function StopTimeEvent(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                  this[keys[i]] = properties[keys[i]];
            }
          }
          __name(StopTimeEvent, "StopTimeEvent");
          StopTimeEvent.prototype.delay = 0;
          StopTimeEvent.prototype.time = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
          StopTimeEvent.prototype.uncertainty = 0;
          StopTimeEvent.prototype.scheduledTime = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
          StopTimeEvent.create = /* @__PURE__ */ __name(function create(properties) {
            return new StopTimeEvent(properties);
          }, "create");
          StopTimeEvent.encode = /* @__PURE__ */ __name(function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.delay != null && Object.hasOwnProperty.call(message, "delay"))
              writer.uint32(
                /* id 1, wireType 0 =*/
                8
              ).int32(message.delay);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
              writer.uint32(
                /* id 2, wireType 0 =*/
                16
              ).int64(message.time);
            if (message.uncertainty != null && Object.hasOwnProperty.call(message, "uncertainty"))
              writer.uint32(
                /* id 3, wireType 0 =*/
                24
              ).int32(message.uncertainty);
            if (message.scheduledTime != null && Object.hasOwnProperty.call(message, "scheduledTime"))
              writer.uint32(
                /* id 4, wireType 0 =*/
                32
              ).int64(message.scheduledTime);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
              for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
            return writer;
          }, "encode");
          StopTimeEvent.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          }, "encodeDelimited");
          StopTimeEvent.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $Reader.recursionLimit)
              throw Error("max depth exceeded");
            var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TripUpdate.StopTimeEvent();
            while (reader.pos < end) {
              var start = reader.pos;
              var tag = reader.tag();
              if (tag === _end) {
                _end = void 0;
                break;
              }
              var wireType = tag & 7;
              switch (tag >>>= 3) {
                case 1: {
                  if (wireType !== 0)
                    break;
                  message.delay = reader.int32();
                  continue;
                }
                case 2: {
                  if (wireType !== 0)
                    break;
                  message.time = reader.int64();
                  continue;
                }
                case 3: {
                  if (wireType !== 0)
                    break;
                  message.uncertainty = reader.int32();
                  continue;
                }
                case 4: {
                  if (wireType !== 0)
                    break;
                  message.scheduledTime = reader.int64();
                  continue;
                }
              }
              reader.skipType(wireType, _depth, tag);
              $util.makeProp(message, "$unknowns", false);
              (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
            if (_end !== void 0)
              throw Error("missing end group");
            return message;
          }, "decode");
          StopTimeEvent.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          }, "decodeDelimited");
          StopTimeEvent.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              return "max depth exceeded";
            if (message.delay != null && message.hasOwnProperty("delay")) {
              if (!$util.isInteger(message.delay))
                return "delay: integer expected";
            }
            if (message.time != null && message.hasOwnProperty("time")) {
              if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                return "time: integer|Long expected";
            }
            if (message.uncertainty != null && message.hasOwnProperty("uncertainty")) {
              if (!$util.isInteger(message.uncertainty))
                return "uncertainty: integer expected";
            }
            if (message.scheduledTime != null && message.hasOwnProperty("scheduledTime")) {
              if (!$util.isInteger(message.scheduledTime) && !(message.scheduledTime && $util.isInteger(message.scheduledTime.low) && $util.isInteger(message.scheduledTime.high)))
                return "scheduledTime: integer|Long expected";
            }
            return null;
          }, "verify");
          StopTimeEvent.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
            if (object instanceof $root.transit_realtime.TripUpdate.StopTimeEvent)
              return object;
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              throw Error("max depth exceeded");
            var message = new $root.transit_realtime.TripUpdate.StopTimeEvent();
            if (object.delay != null)
              message.delay = object.delay | 0;
            if (object.time != null) {
              if ($util.Long)
                (message.time = $util.Long.fromValue(object.time)).unsigned = false;
              else if (typeof object.time === "string")
                message.time = parseInt(object.time, 10);
              else if (typeof object.time === "number")
                message.time = object.time;
              else if (typeof object.time === "object")
                message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            }
            if (object.uncertainty != null)
              message.uncertainty = object.uncertainty | 0;
            if (object.scheduledTime != null) {
              if ($util.Long)
                (message.scheduledTime = $util.Long.fromValue(object.scheduledTime)).unsigned = false;
              else if (typeof object.scheduledTime === "string")
                message.scheduledTime = parseInt(object.scheduledTime, 10);
              else if (typeof object.scheduledTime === "number")
                message.scheduledTime = object.scheduledTime;
              else if (typeof object.scheduledTime === "object")
                message.scheduledTime = new $util.LongBits(object.scheduledTime.low >>> 0, object.scheduledTime.high >>> 0).toNumber();
            }
            return message;
          }, "fromObject");
          StopTimeEvent.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults) {
              object.delay = 0;
              if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
              } else
                object.time = options.longs === String ? "0" : 0;
              object.uncertainty = 0;
              if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.scheduledTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
              } else
                object.scheduledTime = options.longs === String ? "0" : 0;
            }
            if (message.delay != null && message.hasOwnProperty("delay"))
              object.delay = message.delay;
            if (message.time != null && message.hasOwnProperty("time"))
              if (typeof message.time === "number")
                object.time = options.longs === String ? String(message.time) : message.time;
              else
                object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            if (message.uncertainty != null && message.hasOwnProperty("uncertainty"))
              object.uncertainty = message.uncertainty;
            if (message.scheduledTime != null && message.hasOwnProperty("scheduledTime"))
              if (typeof message.scheduledTime === "number")
                object.scheduledTime = options.longs === String ? String(message.scheduledTime) : message.scheduledTime;
              else
                object.scheduledTime = options.longs === String ? $util.Long.prototype.toString.call(message.scheduledTime) : options.longs === Number ? new $util.LongBits(message.scheduledTime.low >>> 0, message.scheduledTime.high >>> 0).toNumber() : message.scheduledTime;
            return object;
          }, "toObject");
          StopTimeEvent.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          }, "toJSON");
          StopTimeEvent.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
            if (prefix === void 0)
              prefix = "type.googleapis.com";
            return prefix + "/transit_realtime.TripUpdate.StopTimeEvent";
          }, "getTypeUrl");
          return StopTimeEvent;
        })();
        TripUpdate.StopTimeUpdate = (function() {
          function StopTimeUpdate(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                  this[keys[i]] = properties[keys[i]];
            }
          }
          __name(StopTimeUpdate, "StopTimeUpdate");
          StopTimeUpdate.prototype.stopSequence = 0;
          StopTimeUpdate.prototype.stopId = "";
          StopTimeUpdate.prototype.arrival = null;
          StopTimeUpdate.prototype.departure = null;
          StopTimeUpdate.prototype.departureOccupancyStatus = 0;
          StopTimeUpdate.prototype.scheduleRelationship = 0;
          StopTimeUpdate.prototype.stopTimeProperties = null;
          StopTimeUpdate.create = /* @__PURE__ */ __name(function create(properties) {
            return new StopTimeUpdate(properties);
          }, "create");
          StopTimeUpdate.encode = /* @__PURE__ */ __name(function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.stopSequence != null && Object.hasOwnProperty.call(message, "stopSequence"))
              writer.uint32(
                /* id 1, wireType 0 =*/
                8
              ).uint32(message.stopSequence);
            if (message.arrival != null && Object.hasOwnProperty.call(message, "arrival"))
              $root.transit_realtime.TripUpdate.StopTimeEvent.encode(message.arrival, writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).fork()).ldelim();
            if (message.departure != null && Object.hasOwnProperty.call(message, "departure"))
              $root.transit_realtime.TripUpdate.StopTimeEvent.encode(message.departure, writer.uint32(
                /* id 3, wireType 2 =*/
                26
              ).fork()).ldelim();
            if (message.stopId != null && Object.hasOwnProperty.call(message, "stopId"))
              writer.uint32(
                /* id 4, wireType 2 =*/
                34
              ).string(message.stopId);
            if (message.scheduleRelationship != null && Object.hasOwnProperty.call(message, "scheduleRelationship"))
              writer.uint32(
                /* id 5, wireType 0 =*/
                40
              ).int32(message.scheduleRelationship);
            if (message.stopTimeProperties != null && Object.hasOwnProperty.call(message, "stopTimeProperties"))
              $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties.encode(message.stopTimeProperties, writer.uint32(
                /* id 6, wireType 2 =*/
                50
              ).fork()).ldelim();
            if (message.departureOccupancyStatus != null && Object.hasOwnProperty.call(message, "departureOccupancyStatus"))
              writer.uint32(
                /* id 7, wireType 0 =*/
                56
              ).int32(message.departureOccupancyStatus);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
              for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
            return writer;
          }, "encode");
          StopTimeUpdate.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          }, "encodeDelimited");
          StopTimeUpdate.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $Reader.recursionLimit)
              throw Error("max depth exceeded");
            var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TripUpdate.StopTimeUpdate();
            while (reader.pos < end) {
              var start = reader.pos;
              var tag = reader.tag();
              if (tag === _end) {
                _end = void 0;
                break;
              }
              var wireType = tag & 7;
              switch (tag >>>= 3) {
                case 1: {
                  if (wireType !== 0)
                    break;
                  message.stopSequence = reader.uint32();
                  continue;
                }
                case 4: {
                  if (wireType !== 2)
                    break;
                  message.stopId = reader.string();
                  continue;
                }
                case 2: {
                  if (wireType !== 2)
                    break;
                  message.arrival = $root.transit_realtime.TripUpdate.StopTimeEvent.decode(reader, reader.uint32(), void 0, _depth + 1, message.arrival);
                  continue;
                }
                case 3: {
                  if (wireType !== 2)
                    break;
                  message.departure = $root.transit_realtime.TripUpdate.StopTimeEvent.decode(reader, reader.uint32(), void 0, _depth + 1, message.departure);
                  continue;
                }
                case 7: {
                  if (wireType !== 0)
                    break;
                  message.departureOccupancyStatus = reader.int32();
                  continue;
                }
                case 5: {
                  if (wireType !== 0)
                    break;
                  message.scheduleRelationship = reader.int32();
                  continue;
                }
                case 6: {
                  if (wireType !== 2)
                    break;
                  message.stopTimeProperties = $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties.decode(reader, reader.uint32(), void 0, _depth + 1, message.stopTimeProperties);
                  continue;
                }
              }
              reader.skipType(wireType, _depth, tag);
              $util.makeProp(message, "$unknowns", false);
              (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
            if (_end !== void 0)
              throw Error("missing end group");
            return message;
          }, "decode");
          StopTimeUpdate.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          }, "decodeDelimited");
          StopTimeUpdate.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              return "max depth exceeded";
            if (message.stopSequence != null && message.hasOwnProperty("stopSequence")) {
              if (!$util.isInteger(message.stopSequence))
                return "stopSequence: integer expected";
            }
            if (message.stopId != null && message.hasOwnProperty("stopId")) {
              if (!$util.isString(message.stopId))
                return "stopId: string expected";
            }
            if (message.arrival != null && message.hasOwnProperty("arrival")) {
              var error = $root.transit_realtime.TripUpdate.StopTimeEvent.verify(message.arrival, _depth + 1);
              if (error)
                return "arrival." + error;
            }
            if (message.departure != null && message.hasOwnProperty("departure")) {
              var error = $root.transit_realtime.TripUpdate.StopTimeEvent.verify(message.departure, _depth + 1);
              if (error)
                return "departure." + error;
            }
            if (message.departureOccupancyStatus != null && message.hasOwnProperty("departureOccupancyStatus"))
              switch (message.departureOccupancyStatus) {
                default:
                  return "departureOccupancyStatus: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                  break;
              }
            if (message.scheduleRelationship != null && message.hasOwnProperty("scheduleRelationship"))
              switch (message.scheduleRelationship) {
                default:
                  return "scheduleRelationship: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                  break;
              }
            if (message.stopTimeProperties != null && message.hasOwnProperty("stopTimeProperties")) {
              var error = $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties.verify(message.stopTimeProperties, _depth + 1);
              if (error)
                return "stopTimeProperties." + error;
            }
            return null;
          }, "verify");
          StopTimeUpdate.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
            if (object instanceof $root.transit_realtime.TripUpdate.StopTimeUpdate)
              return object;
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              throw Error("max depth exceeded");
            var message = new $root.transit_realtime.TripUpdate.StopTimeUpdate();
            if (object.stopSequence != null)
              message.stopSequence = object.stopSequence >>> 0;
            if (object.stopId != null)
              message.stopId = String(object.stopId);
            if (object.arrival != null) {
              if (typeof object.arrival !== "object")
                throw TypeError(".transit_realtime.TripUpdate.StopTimeUpdate.arrival: object expected");
              message.arrival = $root.transit_realtime.TripUpdate.StopTimeEvent.fromObject(object.arrival, _depth + 1);
            }
            if (object.departure != null) {
              if (typeof object.departure !== "object")
                throw TypeError(".transit_realtime.TripUpdate.StopTimeUpdate.departure: object expected");
              message.departure = $root.transit_realtime.TripUpdate.StopTimeEvent.fromObject(object.departure, _depth + 1);
            }
            switch (object.departureOccupancyStatus) {
              default:
                if (typeof object.departureOccupancyStatus === "number") {
                  message.departureOccupancyStatus = object.departureOccupancyStatus;
                  break;
                }
                break;
              case "EMPTY":
              case 0:
                message.departureOccupancyStatus = 0;
                break;
              case "MANY_SEATS_AVAILABLE":
              case 1:
                message.departureOccupancyStatus = 1;
                break;
              case "FEW_SEATS_AVAILABLE":
              case 2:
                message.departureOccupancyStatus = 2;
                break;
              case "STANDING_ROOM_ONLY":
              case 3:
                message.departureOccupancyStatus = 3;
                break;
              case "CRUSHED_STANDING_ROOM_ONLY":
              case 4:
                message.departureOccupancyStatus = 4;
                break;
              case "FULL":
              case 5:
                message.departureOccupancyStatus = 5;
                break;
              case "NOT_ACCEPTING_PASSENGERS":
              case 6:
                message.departureOccupancyStatus = 6;
                break;
              case "NO_DATA_AVAILABLE":
              case 7:
                message.departureOccupancyStatus = 7;
                break;
              case "NOT_BOARDABLE":
              case 8:
                message.departureOccupancyStatus = 8;
                break;
            }
            switch (object.scheduleRelationship) {
              default:
                if (typeof object.scheduleRelationship === "number") {
                  message.scheduleRelationship = object.scheduleRelationship;
                  break;
                }
                break;
              case "SCHEDULED":
              case 0:
                message.scheduleRelationship = 0;
                break;
              case "SKIPPED":
              case 1:
                message.scheduleRelationship = 1;
                break;
              case "NO_DATA":
              case 2:
                message.scheduleRelationship = 2;
                break;
              case "UNSCHEDULED":
              case 3:
                message.scheduleRelationship = 3;
                break;
            }
            if (object.stopTimeProperties != null) {
              if (typeof object.stopTimeProperties !== "object")
                throw TypeError(".transit_realtime.TripUpdate.StopTimeUpdate.stopTimeProperties: object expected");
              message.stopTimeProperties = $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties.fromObject(object.stopTimeProperties, _depth + 1);
            }
            return message;
          }, "fromObject");
          StopTimeUpdate.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults) {
              object.stopSequence = 0;
              object.arrival = null;
              object.departure = null;
              object.stopId = "";
              object.scheduleRelationship = options.enums === String ? "SCHEDULED" : 0;
              object.stopTimeProperties = null;
              object.departureOccupancyStatus = options.enums === String ? "EMPTY" : 0;
            }
            if (message.stopSequence != null && message.hasOwnProperty("stopSequence"))
              object.stopSequence = message.stopSequence;
            if (message.arrival != null && message.hasOwnProperty("arrival"))
              object.arrival = $root.transit_realtime.TripUpdate.StopTimeEvent.toObject(message.arrival, options);
            if (message.departure != null && message.hasOwnProperty("departure"))
              object.departure = $root.transit_realtime.TripUpdate.StopTimeEvent.toObject(message.departure, options);
            if (message.stopId != null && message.hasOwnProperty("stopId"))
              object.stopId = message.stopId;
            if (message.scheduleRelationship != null && message.hasOwnProperty("scheduleRelationship"))
              object.scheduleRelationship = options.enums === String ? $root.transit_realtime.TripUpdate.StopTimeUpdate.ScheduleRelationship[message.scheduleRelationship] === void 0 ? message.scheduleRelationship : $root.transit_realtime.TripUpdate.StopTimeUpdate.ScheduleRelationship[message.scheduleRelationship] : message.scheduleRelationship;
            if (message.stopTimeProperties != null && message.hasOwnProperty("stopTimeProperties"))
              object.stopTimeProperties = $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties.toObject(message.stopTimeProperties, options);
            if (message.departureOccupancyStatus != null && message.hasOwnProperty("departureOccupancyStatus"))
              object.departureOccupancyStatus = options.enums === String ? $root.transit_realtime.VehiclePosition.OccupancyStatus[message.departureOccupancyStatus] === void 0 ? message.departureOccupancyStatus : $root.transit_realtime.VehiclePosition.OccupancyStatus[message.departureOccupancyStatus] : message.departureOccupancyStatus;
            return object;
          }, "toObject");
          StopTimeUpdate.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          }, "toJSON");
          StopTimeUpdate.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
            if (prefix === void 0)
              prefix = "type.googleapis.com";
            return prefix + "/transit_realtime.TripUpdate.StopTimeUpdate";
          }, "getTypeUrl");
          StopTimeUpdate.ScheduleRelationship = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "SCHEDULED"] = 0;
            values[valuesById[1] = "SKIPPED"] = 1;
            values[valuesById[2] = "NO_DATA"] = 2;
            values[valuesById[3] = "UNSCHEDULED"] = 3;
            return values;
          })();
          StopTimeUpdate.StopTimeProperties = (function() {
            function StopTimeProperties(properties) {
              if (properties) {
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                  if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
              }
            }
            __name(StopTimeProperties, "StopTimeProperties");
            StopTimeProperties.prototype.assignedStopId = "";
            StopTimeProperties.prototype.stopHeadsign = "";
            StopTimeProperties.prototype.pickupType = 0;
            StopTimeProperties.prototype.dropOffType = 0;
            StopTimeProperties.create = /* @__PURE__ */ __name(function create(properties) {
              return new StopTimeProperties(properties);
            }, "create");
            StopTimeProperties.encode = /* @__PURE__ */ __name(function encode(message, writer) {
              if (!writer)
                writer = $Writer.create();
              if (message.assignedStopId != null && Object.hasOwnProperty.call(message, "assignedStopId"))
                writer.uint32(
                  /* id 1, wireType 2 =*/
                  10
                ).string(message.assignedStopId);
              if (message.stopHeadsign != null && Object.hasOwnProperty.call(message, "stopHeadsign"))
                writer.uint32(
                  /* id 2, wireType 2 =*/
                  18
                ).string(message.stopHeadsign);
              if (message.pickupType != null && Object.hasOwnProperty.call(message, "pickupType"))
                writer.uint32(
                  /* id 3, wireType 0 =*/
                  24
                ).int32(message.pickupType);
              if (message.dropOffType != null && Object.hasOwnProperty.call(message, "dropOffType"))
                writer.uint32(
                  /* id 4, wireType 0 =*/
                  32
                ).int32(message.dropOffType);
              if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                  writer.raw(message.$unknowns[i]);
              return writer;
            }, "encode");
            StopTimeProperties.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
              return this.encode(message, writer).ldelim();
            }, "encodeDelimited");
            StopTimeProperties.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
              if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
              if (_depth === void 0)
                _depth = 0;
              if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
              var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties();
              while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                  _end = void 0;
                  break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                  case 1: {
                    if (wireType !== 2)
                      break;
                    message.assignedStopId = reader.string();
                    continue;
                  }
                  case 2: {
                    if (wireType !== 2)
                      break;
                    message.stopHeadsign = reader.string();
                    continue;
                  }
                  case 3: {
                    if (wireType !== 0)
                      break;
                    message.pickupType = reader.int32();
                    continue;
                  }
                  case 4: {
                    if (wireType !== 0)
                      break;
                    message.dropOffType = reader.int32();
                    continue;
                  }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
              }
              if (_end !== void 0)
                throw Error("missing end group");
              return message;
            }, "decode");
            StopTimeProperties.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
              if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
              return this.decode(reader, reader.uint32());
            }, "decodeDelimited");
            StopTimeProperties.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
              if (typeof message !== "object" || message === null)
                return "object expected";
              if (_depth === void 0)
                _depth = 0;
              if (_depth > $util.recursionLimit)
                return "max depth exceeded";
              if (message.assignedStopId != null && message.hasOwnProperty("assignedStopId")) {
                if (!$util.isString(message.assignedStopId))
                  return "assignedStopId: string expected";
              }
              if (message.stopHeadsign != null && message.hasOwnProperty("stopHeadsign")) {
                if (!$util.isString(message.stopHeadsign))
                  return "stopHeadsign: string expected";
              }
              if (message.pickupType != null && message.hasOwnProperty("pickupType"))
                switch (message.pickupType) {
                  default:
                    return "pickupType: enum value expected";
                  case 0:
                  case 1:
                  case 2:
                  case 3:
                    break;
                }
              if (message.dropOffType != null && message.hasOwnProperty("dropOffType"))
                switch (message.dropOffType) {
                  default:
                    return "dropOffType: enum value expected";
                  case 0:
                  case 1:
                  case 2:
                  case 3:
                    break;
                }
              return null;
            }, "verify");
            StopTimeProperties.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
              if (object instanceof $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties)
                return object;
              if (_depth === void 0)
                _depth = 0;
              if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
              var message = new $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties();
              if (object.assignedStopId != null)
                message.assignedStopId = String(object.assignedStopId);
              if (object.stopHeadsign != null)
                message.stopHeadsign = String(object.stopHeadsign);
              switch (object.pickupType) {
                default:
                  if (typeof object.pickupType === "number") {
                    message.pickupType = object.pickupType;
                    break;
                  }
                  break;
                case "REGULAR":
                case 0:
                  message.pickupType = 0;
                  break;
                case "NONE":
                case 1:
                  message.pickupType = 1;
                  break;
                case "PHONE_AGENCY":
                case 2:
                  message.pickupType = 2;
                  break;
                case "COORDINATE_WITH_DRIVER":
                case 3:
                  message.pickupType = 3;
                  break;
              }
              switch (object.dropOffType) {
                default:
                  if (typeof object.dropOffType === "number") {
                    message.dropOffType = object.dropOffType;
                    break;
                  }
                  break;
                case "REGULAR":
                case 0:
                  message.dropOffType = 0;
                  break;
                case "NONE":
                case 1:
                  message.dropOffType = 1;
                  break;
                case "PHONE_AGENCY":
                case 2:
                  message.dropOffType = 2;
                  break;
                case "COORDINATE_WITH_DRIVER":
                case 3:
                  message.dropOffType = 3;
                  break;
              }
              return message;
            }, "fromObject");
            StopTimeProperties.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
              if (!options)
                options = {};
              var object = {};
              if (options.defaults) {
                object.assignedStopId = "";
                object.stopHeadsign = "";
                object.pickupType = options.enums === String ? "REGULAR" : 0;
                object.dropOffType = options.enums === String ? "REGULAR" : 0;
              }
              if (message.assignedStopId != null && message.hasOwnProperty("assignedStopId"))
                object.assignedStopId = message.assignedStopId;
              if (message.stopHeadsign != null && message.hasOwnProperty("stopHeadsign"))
                object.stopHeadsign = message.stopHeadsign;
              if (message.pickupType != null && message.hasOwnProperty("pickupType"))
                object.pickupType = options.enums === String ? $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties.DropOffPickupType[message.pickupType] === void 0 ? message.pickupType : $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties.DropOffPickupType[message.pickupType] : message.pickupType;
              if (message.dropOffType != null && message.hasOwnProperty("dropOffType"))
                object.dropOffType = options.enums === String ? $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties.DropOffPickupType[message.dropOffType] === void 0 ? message.dropOffType : $root.transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties.DropOffPickupType[message.dropOffType] : message.dropOffType;
              return object;
            }, "toObject");
            StopTimeProperties.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
              return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            }, "toJSON");
            StopTimeProperties.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
              if (prefix === void 0)
                prefix = "type.googleapis.com";
              return prefix + "/transit_realtime.TripUpdate.StopTimeUpdate.StopTimeProperties";
            }, "getTypeUrl");
            StopTimeProperties.DropOffPickupType = (function() {
              var valuesById = {}, values = Object.create(valuesById);
              values[valuesById[0] = "REGULAR"] = 0;
              values[valuesById[1] = "NONE"] = 1;
              values[valuesById[2] = "PHONE_AGENCY"] = 2;
              values[valuesById[3] = "COORDINATE_WITH_DRIVER"] = 3;
              return values;
            })();
            return StopTimeProperties;
          })();
          return StopTimeUpdate;
        })();
        TripUpdate.TripProperties = (function() {
          function TripProperties(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                  this[keys[i]] = properties[keys[i]];
            }
          }
          __name(TripProperties, "TripProperties");
          TripProperties.prototype.tripId = "";
          TripProperties.prototype.startDate = "";
          TripProperties.prototype.startTime = "";
          TripProperties.prototype.shapeId = "";
          TripProperties.prototype.tripHeadsign = "";
          TripProperties.prototype.tripShortName = "";
          TripProperties.create = /* @__PURE__ */ __name(function create(properties) {
            return new TripProperties(properties);
          }, "create");
          TripProperties.encode = /* @__PURE__ */ __name(function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.tripId != null && Object.hasOwnProperty.call(message, "tripId"))
              writer.uint32(
                /* id 1, wireType 2 =*/
                10
              ).string(message.tripId);
            if (message.startDate != null && Object.hasOwnProperty.call(message, "startDate"))
              writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).string(message.startDate);
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
              writer.uint32(
                /* id 3, wireType 2 =*/
                26
              ).string(message.startTime);
            if (message.shapeId != null && Object.hasOwnProperty.call(message, "shapeId"))
              writer.uint32(
                /* id 4, wireType 2 =*/
                34
              ).string(message.shapeId);
            if (message.tripHeadsign != null && Object.hasOwnProperty.call(message, "tripHeadsign"))
              writer.uint32(
                /* id 5, wireType 2 =*/
                42
              ).string(message.tripHeadsign);
            if (message.tripShortName != null && Object.hasOwnProperty.call(message, "tripShortName"))
              writer.uint32(
                /* id 6, wireType 2 =*/
                50
              ).string(message.tripShortName);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
              for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
            return writer;
          }, "encode");
          TripProperties.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          }, "encodeDelimited");
          TripProperties.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $Reader.recursionLimit)
              throw Error("max depth exceeded");
            var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TripUpdate.TripProperties();
            while (reader.pos < end) {
              var start = reader.pos;
              var tag = reader.tag();
              if (tag === _end) {
                _end = void 0;
                break;
              }
              var wireType = tag & 7;
              switch (tag >>>= 3) {
                case 1: {
                  if (wireType !== 2)
                    break;
                  message.tripId = reader.string();
                  continue;
                }
                case 2: {
                  if (wireType !== 2)
                    break;
                  message.startDate = reader.string();
                  continue;
                }
                case 3: {
                  if (wireType !== 2)
                    break;
                  message.startTime = reader.string();
                  continue;
                }
                case 4: {
                  if (wireType !== 2)
                    break;
                  message.shapeId = reader.string();
                  continue;
                }
                case 5: {
                  if (wireType !== 2)
                    break;
                  message.tripHeadsign = reader.string();
                  continue;
                }
                case 6: {
                  if (wireType !== 2)
                    break;
                  message.tripShortName = reader.string();
                  continue;
                }
              }
              reader.skipType(wireType, _depth, tag);
              $util.makeProp(message, "$unknowns", false);
              (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
            if (_end !== void 0)
              throw Error("missing end group");
            return message;
          }, "decode");
          TripProperties.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          }, "decodeDelimited");
          TripProperties.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              return "max depth exceeded";
            if (message.tripId != null && message.hasOwnProperty("tripId")) {
              if (!$util.isString(message.tripId))
                return "tripId: string expected";
            }
            if (message.startDate != null && message.hasOwnProperty("startDate")) {
              if (!$util.isString(message.startDate))
                return "startDate: string expected";
            }
            if (message.startTime != null && message.hasOwnProperty("startTime")) {
              if (!$util.isString(message.startTime))
                return "startTime: string expected";
            }
            if (message.shapeId != null && message.hasOwnProperty("shapeId")) {
              if (!$util.isString(message.shapeId))
                return "shapeId: string expected";
            }
            if (message.tripHeadsign != null && message.hasOwnProperty("tripHeadsign")) {
              if (!$util.isString(message.tripHeadsign))
                return "tripHeadsign: string expected";
            }
            if (message.tripShortName != null && message.hasOwnProperty("tripShortName")) {
              if (!$util.isString(message.tripShortName))
                return "tripShortName: string expected";
            }
            return null;
          }, "verify");
          TripProperties.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
            if (object instanceof $root.transit_realtime.TripUpdate.TripProperties)
              return object;
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              throw Error("max depth exceeded");
            var message = new $root.transit_realtime.TripUpdate.TripProperties();
            if (object.tripId != null)
              message.tripId = String(object.tripId);
            if (object.startDate != null)
              message.startDate = String(object.startDate);
            if (object.startTime != null)
              message.startTime = String(object.startTime);
            if (object.shapeId != null)
              message.shapeId = String(object.shapeId);
            if (object.tripHeadsign != null)
              message.tripHeadsign = String(object.tripHeadsign);
            if (object.tripShortName != null)
              message.tripShortName = String(object.tripShortName);
            return message;
          }, "fromObject");
          TripProperties.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults) {
              object.tripId = "";
              object.startDate = "";
              object.startTime = "";
              object.shapeId = "";
              object.tripHeadsign = "";
              object.tripShortName = "";
            }
            if (message.tripId != null && message.hasOwnProperty("tripId"))
              object.tripId = message.tripId;
            if (message.startDate != null && message.hasOwnProperty("startDate"))
              object.startDate = message.startDate;
            if (message.startTime != null && message.hasOwnProperty("startTime"))
              object.startTime = message.startTime;
            if (message.shapeId != null && message.hasOwnProperty("shapeId"))
              object.shapeId = message.shapeId;
            if (message.tripHeadsign != null && message.hasOwnProperty("tripHeadsign"))
              object.tripHeadsign = message.tripHeadsign;
            if (message.tripShortName != null && message.hasOwnProperty("tripShortName"))
              object.tripShortName = message.tripShortName;
            return object;
          }, "toObject");
          TripProperties.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          }, "toJSON");
          TripProperties.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
            if (prefix === void 0)
              prefix = "type.googleapis.com";
            return prefix + "/transit_realtime.TripUpdate.TripProperties";
          }, "getTypeUrl");
          return TripProperties;
        })();
        return TripUpdate;
      })();
      transit_realtime.VehiclePosition = (function() {
        function VehiclePosition(properties) {
          this.multiCarriageDetails = [];
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(VehiclePosition, "VehiclePosition");
        VehiclePosition.prototype.trip = null;
        VehiclePosition.prototype.vehicle = null;
        VehiclePosition.prototype.position = null;
        VehiclePosition.prototype.currentStopSequence = 0;
        VehiclePosition.prototype.stopId = "";
        VehiclePosition.prototype.currentStatus = 2;
        VehiclePosition.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        VehiclePosition.prototype.congestionLevel = 0;
        VehiclePosition.prototype.occupancyStatus = 0;
        VehiclePosition.prototype.occupancyPercentage = 0;
        VehiclePosition.prototype.multiCarriageDetails = $util.emptyArray;
        VehiclePosition.create = /* @__PURE__ */ __name(function create(properties) {
          return new VehiclePosition(properties);
        }, "create");
        VehiclePosition.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.trip != null && Object.hasOwnProperty.call(message, "trip"))
            $root.transit_realtime.TripDescriptor.encode(message.trip, writer.uint32(
              /* id 1, wireType 2 =*/
              10
            ).fork()).ldelim();
          if (message.position != null && Object.hasOwnProperty.call(message, "position"))
            $root.transit_realtime.Position.encode(message.position, writer.uint32(
              /* id 2, wireType 2 =*/
              18
            ).fork()).ldelim();
          if (message.currentStopSequence != null && Object.hasOwnProperty.call(message, "currentStopSequence"))
            writer.uint32(
              /* id 3, wireType 0 =*/
              24
            ).uint32(message.currentStopSequence);
          if (message.currentStatus != null && Object.hasOwnProperty.call(message, "currentStatus"))
            writer.uint32(
              /* id 4, wireType 0 =*/
              32
            ).int32(message.currentStatus);
          if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(
              /* id 5, wireType 0 =*/
              40
            ).uint64(message.timestamp);
          if (message.congestionLevel != null && Object.hasOwnProperty.call(message, "congestionLevel"))
            writer.uint32(
              /* id 6, wireType 0 =*/
              48
            ).int32(message.congestionLevel);
          if (message.stopId != null && Object.hasOwnProperty.call(message, "stopId"))
            writer.uint32(
              /* id 7, wireType 2 =*/
              58
            ).string(message.stopId);
          if (message.vehicle != null && Object.hasOwnProperty.call(message, "vehicle"))
            $root.transit_realtime.VehicleDescriptor.encode(message.vehicle, writer.uint32(
              /* id 8, wireType 2 =*/
              66
            ).fork()).ldelim();
          if (message.occupancyStatus != null && Object.hasOwnProperty.call(message, "occupancyStatus"))
            writer.uint32(
              /* id 9, wireType 0 =*/
              72
            ).int32(message.occupancyStatus);
          if (message.occupancyPercentage != null && Object.hasOwnProperty.call(message, "occupancyPercentage"))
            writer.uint32(
              /* id 10, wireType 0 =*/
              80
            ).uint32(message.occupancyPercentage);
          if (message.multiCarriageDetails != null && message.multiCarriageDetails.length)
            for (var i = 0; i < message.multiCarriageDetails.length; ++i)
              $root.transit_realtime.VehiclePosition.CarriageDetails.encode(message.multiCarriageDetails[i], writer.uint32(
                /* id 11, wireType 2 =*/
                90
              ).fork()).ldelim();
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        VehiclePosition.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        VehiclePosition.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.VehiclePosition();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                message.trip = $root.transit_realtime.TripDescriptor.decode(reader, reader.uint32(), void 0, _depth + 1, message.trip);
                continue;
              }
              case 8: {
                if (wireType !== 2)
                  break;
                message.vehicle = $root.transit_realtime.VehicleDescriptor.decode(reader, reader.uint32(), void 0, _depth + 1, message.vehicle);
                continue;
              }
              case 2: {
                if (wireType !== 2)
                  break;
                message.position = $root.transit_realtime.Position.decode(reader, reader.uint32(), void 0, _depth + 1, message.position);
                continue;
              }
              case 3: {
                if (wireType !== 0)
                  break;
                message.currentStopSequence = reader.uint32();
                continue;
              }
              case 7: {
                if (wireType !== 2)
                  break;
                message.stopId = reader.string();
                continue;
              }
              case 4: {
                if (wireType !== 0)
                  break;
                message.currentStatus = reader.int32();
                continue;
              }
              case 5: {
                if (wireType !== 0)
                  break;
                message.timestamp = reader.uint64();
                continue;
              }
              case 6: {
                if (wireType !== 0)
                  break;
                message.congestionLevel = reader.int32();
                continue;
              }
              case 9: {
                if (wireType !== 0)
                  break;
                message.occupancyStatus = reader.int32();
                continue;
              }
              case 10: {
                if (wireType !== 0)
                  break;
                message.occupancyPercentage = reader.uint32();
                continue;
              }
              case 11: {
                if (wireType !== 2)
                  break;
                if (!(message.multiCarriageDetails && message.multiCarriageDetails.length))
                  message.multiCarriageDetails = [];
                message.multiCarriageDetails.push($root.transit_realtime.VehiclePosition.CarriageDetails.decode(reader, reader.uint32(), void 0, _depth + 1));
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        VehiclePosition.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        VehiclePosition.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.trip != null && message.hasOwnProperty("trip")) {
            var error = $root.transit_realtime.TripDescriptor.verify(message.trip, _depth + 1);
            if (error)
              return "trip." + error;
          }
          if (message.vehicle != null && message.hasOwnProperty("vehicle")) {
            var error = $root.transit_realtime.VehicleDescriptor.verify(message.vehicle, _depth + 1);
            if (error)
              return "vehicle." + error;
          }
          if (message.position != null && message.hasOwnProperty("position")) {
            var error = $root.transit_realtime.Position.verify(message.position, _depth + 1);
            if (error)
              return "position." + error;
          }
          if (message.currentStopSequence != null && message.hasOwnProperty("currentStopSequence")) {
            if (!$util.isInteger(message.currentStopSequence))
              return "currentStopSequence: integer expected";
          }
          if (message.stopId != null && message.hasOwnProperty("stopId")) {
            if (!$util.isString(message.stopId))
              return "stopId: string expected";
          }
          if (message.currentStatus != null && message.hasOwnProperty("currentStatus"))
            switch (message.currentStatus) {
              default:
                return "currentStatus: enum value expected";
              case 0:
              case 1:
              case 2:
                break;
            }
          if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
              return "timestamp: integer|Long expected";
          }
          if (message.congestionLevel != null && message.hasOwnProperty("congestionLevel"))
            switch (message.congestionLevel) {
              default:
                return "congestionLevel: enum value expected";
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
                break;
            }
          if (message.occupancyStatus != null && message.hasOwnProperty("occupancyStatus"))
            switch (message.occupancyStatus) {
              default:
                return "occupancyStatus: enum value expected";
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
              case 7:
              case 8:
                break;
            }
          if (message.occupancyPercentage != null && message.hasOwnProperty("occupancyPercentage")) {
            if (!$util.isInteger(message.occupancyPercentage))
              return "occupancyPercentage: integer expected";
          }
          if (message.multiCarriageDetails != null && message.hasOwnProperty("multiCarriageDetails")) {
            if (!Array.isArray(message.multiCarriageDetails))
              return "multiCarriageDetails: array expected";
            for (var i = 0; i < message.multiCarriageDetails.length; ++i) {
              var error = $root.transit_realtime.VehiclePosition.CarriageDetails.verify(message.multiCarriageDetails[i], _depth + 1);
              if (error)
                return "multiCarriageDetails." + error;
            }
          }
          return null;
        }, "verify");
        VehiclePosition.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.VehiclePosition)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.VehiclePosition();
          if (object.trip != null) {
            if (typeof object.trip !== "object")
              throw TypeError(".transit_realtime.VehiclePosition.trip: object expected");
            message.trip = $root.transit_realtime.TripDescriptor.fromObject(object.trip, _depth + 1);
          }
          if (object.vehicle != null) {
            if (typeof object.vehicle !== "object")
              throw TypeError(".transit_realtime.VehiclePosition.vehicle: object expected");
            message.vehicle = $root.transit_realtime.VehicleDescriptor.fromObject(object.vehicle, _depth + 1);
          }
          if (object.position != null) {
            if (typeof object.position !== "object")
              throw TypeError(".transit_realtime.VehiclePosition.position: object expected");
            message.position = $root.transit_realtime.Position.fromObject(object.position, _depth + 1);
          }
          if (object.currentStopSequence != null)
            message.currentStopSequence = object.currentStopSequence >>> 0;
          if (object.stopId != null)
            message.stopId = String(object.stopId);
          switch (object.currentStatus) {
            case "INCOMING_AT":
            case 0:
              message.currentStatus = 0;
              break;
            case "STOPPED_AT":
            case 1:
              message.currentStatus = 1;
              break;
            default:
              if (typeof object.currentStatus === "number") {
                message.currentStatus = object.currentStatus;
                break;
              }
              break;
            case "IN_TRANSIT_TO":
            case 2:
              message.currentStatus = 2;
              break;
          }
          if (object.timestamp != null) {
            if ($util.Long)
              (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
            else if (typeof object.timestamp === "string")
              message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
              message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
              message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
          }
          switch (object.congestionLevel) {
            default:
              if (typeof object.congestionLevel === "number") {
                message.congestionLevel = object.congestionLevel;
                break;
              }
              break;
            case "UNKNOWN_CONGESTION_LEVEL":
            case 0:
              message.congestionLevel = 0;
              break;
            case "RUNNING_SMOOTHLY":
            case 1:
              message.congestionLevel = 1;
              break;
            case "STOP_AND_GO":
            case 2:
              message.congestionLevel = 2;
              break;
            case "CONGESTION":
            case 3:
              message.congestionLevel = 3;
              break;
            case "SEVERE_CONGESTION":
            case 4:
              message.congestionLevel = 4;
              break;
          }
          switch (object.occupancyStatus) {
            default:
              if (typeof object.occupancyStatus === "number") {
                message.occupancyStatus = object.occupancyStatus;
                break;
              }
              break;
            case "EMPTY":
            case 0:
              message.occupancyStatus = 0;
              break;
            case "MANY_SEATS_AVAILABLE":
            case 1:
              message.occupancyStatus = 1;
              break;
            case "FEW_SEATS_AVAILABLE":
            case 2:
              message.occupancyStatus = 2;
              break;
            case "STANDING_ROOM_ONLY":
            case 3:
              message.occupancyStatus = 3;
              break;
            case "CRUSHED_STANDING_ROOM_ONLY":
            case 4:
              message.occupancyStatus = 4;
              break;
            case "FULL":
            case 5:
              message.occupancyStatus = 5;
              break;
            case "NOT_ACCEPTING_PASSENGERS":
            case 6:
              message.occupancyStatus = 6;
              break;
            case "NO_DATA_AVAILABLE":
            case 7:
              message.occupancyStatus = 7;
              break;
            case "NOT_BOARDABLE":
            case 8:
              message.occupancyStatus = 8;
              break;
          }
          if (object.occupancyPercentage != null)
            message.occupancyPercentage = object.occupancyPercentage >>> 0;
          if (object.multiCarriageDetails) {
            if (!Array.isArray(object.multiCarriageDetails))
              throw TypeError(".transit_realtime.VehiclePosition.multiCarriageDetails: array expected");
            message.multiCarriageDetails = Array(object.multiCarriageDetails.length);
            for (var i = 0; i < object.multiCarriageDetails.length; ++i) {
              if (typeof object.multiCarriageDetails[i] !== "object")
                throw TypeError(".transit_realtime.VehiclePosition.multiCarriageDetails: object expected");
              message.multiCarriageDetails[i] = $root.transit_realtime.VehiclePosition.CarriageDetails.fromObject(object.multiCarriageDetails[i], _depth + 1);
            }
          }
          return message;
        }, "fromObject");
        VehiclePosition.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.arrays || options.defaults)
            object.multiCarriageDetails = [];
          if (options.defaults) {
            object.trip = null;
            object.position = null;
            object.currentStopSequence = 0;
            object.currentStatus = options.enums === String ? "IN_TRANSIT_TO" : 2;
            if ($util.Long) {
              var long = new $util.Long(0, 0, true);
              object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
              object.timestamp = options.longs === String ? "0" : 0;
            object.congestionLevel = options.enums === String ? "UNKNOWN_CONGESTION_LEVEL" : 0;
            object.stopId = "";
            object.vehicle = null;
            object.occupancyStatus = options.enums === String ? "EMPTY" : 0;
            object.occupancyPercentage = 0;
          }
          if (message.trip != null && message.hasOwnProperty("trip"))
            object.trip = $root.transit_realtime.TripDescriptor.toObject(message.trip, options);
          if (message.position != null && message.hasOwnProperty("position"))
            object.position = $root.transit_realtime.Position.toObject(message.position, options);
          if (message.currentStopSequence != null && message.hasOwnProperty("currentStopSequence"))
            object.currentStopSequence = message.currentStopSequence;
          if (message.currentStatus != null && message.hasOwnProperty("currentStatus"))
            object.currentStatus = options.enums === String ? $root.transit_realtime.VehiclePosition.VehicleStopStatus[message.currentStatus] === void 0 ? message.currentStatus : $root.transit_realtime.VehiclePosition.VehicleStopStatus[message.currentStatus] : message.currentStatus;
          if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
              object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
              object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
          if (message.congestionLevel != null && message.hasOwnProperty("congestionLevel"))
            object.congestionLevel = options.enums === String ? $root.transit_realtime.VehiclePosition.CongestionLevel[message.congestionLevel] === void 0 ? message.congestionLevel : $root.transit_realtime.VehiclePosition.CongestionLevel[message.congestionLevel] : message.congestionLevel;
          if (message.stopId != null && message.hasOwnProperty("stopId"))
            object.stopId = message.stopId;
          if (message.vehicle != null && message.hasOwnProperty("vehicle"))
            object.vehicle = $root.transit_realtime.VehicleDescriptor.toObject(message.vehicle, options);
          if (message.occupancyStatus != null && message.hasOwnProperty("occupancyStatus"))
            object.occupancyStatus = options.enums === String ? $root.transit_realtime.VehiclePosition.OccupancyStatus[message.occupancyStatus] === void 0 ? message.occupancyStatus : $root.transit_realtime.VehiclePosition.OccupancyStatus[message.occupancyStatus] : message.occupancyStatus;
          if (message.occupancyPercentage != null && message.hasOwnProperty("occupancyPercentage"))
            object.occupancyPercentage = message.occupancyPercentage;
          if (message.multiCarriageDetails && message.multiCarriageDetails.length) {
            object.multiCarriageDetails = Array(message.multiCarriageDetails.length);
            for (var j = 0; j < message.multiCarriageDetails.length; ++j)
              object.multiCarriageDetails[j] = $root.transit_realtime.VehiclePosition.CarriageDetails.toObject(message.multiCarriageDetails[j], options);
          }
          return object;
        }, "toObject");
        VehiclePosition.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        VehiclePosition.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.VehiclePosition";
        }, "getTypeUrl");
        VehiclePosition.VehicleStopStatus = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "INCOMING_AT"] = 0;
          values[valuesById[1] = "STOPPED_AT"] = 1;
          values[valuesById[2] = "IN_TRANSIT_TO"] = 2;
          return values;
        })();
        VehiclePosition.CongestionLevel = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "UNKNOWN_CONGESTION_LEVEL"] = 0;
          values[valuesById[1] = "RUNNING_SMOOTHLY"] = 1;
          values[valuesById[2] = "STOP_AND_GO"] = 2;
          values[valuesById[3] = "CONGESTION"] = 3;
          values[valuesById[4] = "SEVERE_CONGESTION"] = 4;
          return values;
        })();
        VehiclePosition.OccupancyStatus = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "EMPTY"] = 0;
          values[valuesById[1] = "MANY_SEATS_AVAILABLE"] = 1;
          values[valuesById[2] = "FEW_SEATS_AVAILABLE"] = 2;
          values[valuesById[3] = "STANDING_ROOM_ONLY"] = 3;
          values[valuesById[4] = "CRUSHED_STANDING_ROOM_ONLY"] = 4;
          values[valuesById[5] = "FULL"] = 5;
          values[valuesById[6] = "NOT_ACCEPTING_PASSENGERS"] = 6;
          values[valuesById[7] = "NO_DATA_AVAILABLE"] = 7;
          values[valuesById[8] = "NOT_BOARDABLE"] = 8;
          return values;
        })();
        VehiclePosition.CarriageDetails = (function() {
          function CarriageDetails(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                  this[keys[i]] = properties[keys[i]];
            }
          }
          __name(CarriageDetails, "CarriageDetails");
          CarriageDetails.prototype.id = "";
          CarriageDetails.prototype.label = "";
          CarriageDetails.prototype.occupancyStatus = 7;
          CarriageDetails.prototype.occupancyPercentage = -1;
          CarriageDetails.prototype.carriageSequence = 0;
          CarriageDetails.create = /* @__PURE__ */ __name(function create(properties) {
            return new CarriageDetails(properties);
          }, "create");
          CarriageDetails.encode = /* @__PURE__ */ __name(function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
              writer.uint32(
                /* id 1, wireType 2 =*/
                10
              ).string(message.id);
            if (message.label != null && Object.hasOwnProperty.call(message, "label"))
              writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).string(message.label);
            if (message.occupancyStatus != null && Object.hasOwnProperty.call(message, "occupancyStatus"))
              writer.uint32(
                /* id 3, wireType 0 =*/
                24
              ).int32(message.occupancyStatus);
            if (message.occupancyPercentage != null && Object.hasOwnProperty.call(message, "occupancyPercentage"))
              writer.uint32(
                /* id 4, wireType 0 =*/
                32
              ).int32(message.occupancyPercentage);
            if (message.carriageSequence != null && Object.hasOwnProperty.call(message, "carriageSequence"))
              writer.uint32(
                /* id 5, wireType 0 =*/
                40
              ).uint32(message.carriageSequence);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
              for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
            return writer;
          }, "encode");
          CarriageDetails.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          }, "encodeDelimited");
          CarriageDetails.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $Reader.recursionLimit)
              throw Error("max depth exceeded");
            var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.VehiclePosition.CarriageDetails();
            while (reader.pos < end) {
              var start = reader.pos;
              var tag = reader.tag();
              if (tag === _end) {
                _end = void 0;
                break;
              }
              var wireType = tag & 7;
              switch (tag >>>= 3) {
                case 1: {
                  if (wireType !== 2)
                    break;
                  message.id = reader.string();
                  continue;
                }
                case 2: {
                  if (wireType !== 2)
                    break;
                  message.label = reader.string();
                  continue;
                }
                case 3: {
                  if (wireType !== 0)
                    break;
                  message.occupancyStatus = reader.int32();
                  continue;
                }
                case 4: {
                  if (wireType !== 0)
                    break;
                  message.occupancyPercentage = reader.int32();
                  continue;
                }
                case 5: {
                  if (wireType !== 0)
                    break;
                  message.carriageSequence = reader.uint32();
                  continue;
                }
              }
              reader.skipType(wireType, _depth, tag);
              $util.makeProp(message, "$unknowns", false);
              (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
            if (_end !== void 0)
              throw Error("missing end group");
            return message;
          }, "decode");
          CarriageDetails.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          }, "decodeDelimited");
          CarriageDetails.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              return "max depth exceeded";
            if (message.id != null && message.hasOwnProperty("id")) {
              if (!$util.isString(message.id))
                return "id: string expected";
            }
            if (message.label != null && message.hasOwnProperty("label")) {
              if (!$util.isString(message.label))
                return "label: string expected";
            }
            if (message.occupancyStatus != null && message.hasOwnProperty("occupancyStatus"))
              switch (message.occupancyStatus) {
                default:
                  return "occupancyStatus: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                  break;
              }
            if (message.occupancyPercentage != null && message.hasOwnProperty("occupancyPercentage")) {
              if (!$util.isInteger(message.occupancyPercentage))
                return "occupancyPercentage: integer expected";
            }
            if (message.carriageSequence != null && message.hasOwnProperty("carriageSequence")) {
              if (!$util.isInteger(message.carriageSequence))
                return "carriageSequence: integer expected";
            }
            return null;
          }, "verify");
          CarriageDetails.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
            if (object instanceof $root.transit_realtime.VehiclePosition.CarriageDetails)
              return object;
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              throw Error("max depth exceeded");
            var message = new $root.transit_realtime.VehiclePosition.CarriageDetails();
            if (object.id != null)
              message.id = String(object.id);
            if (object.label != null)
              message.label = String(object.label);
            switch (object.occupancyStatus) {
              case "EMPTY":
              case 0:
                message.occupancyStatus = 0;
                break;
              case "MANY_SEATS_AVAILABLE":
              case 1:
                message.occupancyStatus = 1;
                break;
              case "FEW_SEATS_AVAILABLE":
              case 2:
                message.occupancyStatus = 2;
                break;
              case "STANDING_ROOM_ONLY":
              case 3:
                message.occupancyStatus = 3;
                break;
              case "CRUSHED_STANDING_ROOM_ONLY":
              case 4:
                message.occupancyStatus = 4;
                break;
              case "FULL":
              case 5:
                message.occupancyStatus = 5;
                break;
              case "NOT_ACCEPTING_PASSENGERS":
              case 6:
                message.occupancyStatus = 6;
                break;
              default:
                if (typeof object.occupancyStatus === "number") {
                  message.occupancyStatus = object.occupancyStatus;
                  break;
                }
                break;
              case "NO_DATA_AVAILABLE":
              case 7:
                message.occupancyStatus = 7;
                break;
              case "NOT_BOARDABLE":
              case 8:
                message.occupancyStatus = 8;
                break;
            }
            if (object.occupancyPercentage != null)
              message.occupancyPercentage = object.occupancyPercentage | 0;
            if (object.carriageSequence != null)
              message.carriageSequence = object.carriageSequence >>> 0;
            return message;
          }, "fromObject");
          CarriageDetails.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults) {
              object.id = "";
              object.label = "";
              object.occupancyStatus = options.enums === String ? "NO_DATA_AVAILABLE" : 7;
              object.occupancyPercentage = -1;
              object.carriageSequence = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
              object.id = message.id;
            if (message.label != null && message.hasOwnProperty("label"))
              object.label = message.label;
            if (message.occupancyStatus != null && message.hasOwnProperty("occupancyStatus"))
              object.occupancyStatus = options.enums === String ? $root.transit_realtime.VehiclePosition.OccupancyStatus[message.occupancyStatus] === void 0 ? message.occupancyStatus : $root.transit_realtime.VehiclePosition.OccupancyStatus[message.occupancyStatus] : message.occupancyStatus;
            if (message.occupancyPercentage != null && message.hasOwnProperty("occupancyPercentage"))
              object.occupancyPercentage = message.occupancyPercentage;
            if (message.carriageSequence != null && message.hasOwnProperty("carriageSequence"))
              object.carriageSequence = message.carriageSequence;
            return object;
          }, "toObject");
          CarriageDetails.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          }, "toJSON");
          CarriageDetails.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
            if (prefix === void 0)
              prefix = "type.googleapis.com";
            return prefix + "/transit_realtime.VehiclePosition.CarriageDetails";
          }, "getTypeUrl");
          return CarriageDetails;
        })();
        return VehiclePosition;
      })();
      transit_realtime.Alert = (function() {
        function Alert(properties) {
          this.activePeriod = [];
          this.informedEntity = [];
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(Alert, "Alert");
        Alert.prototype.activePeriod = $util.emptyArray;
        Alert.prototype.informedEntity = $util.emptyArray;
        Alert.prototype.cause = 1;
        Alert.prototype.effect = 8;
        Alert.prototype.url = null;
        Alert.prototype.headerText = null;
        Alert.prototype.descriptionText = null;
        Alert.prototype.ttsHeaderText = null;
        Alert.prototype.ttsDescriptionText = null;
        Alert.prototype.severityLevel = 1;
        Alert.prototype.image = null;
        Alert.prototype.imageAlternativeText = null;
        Alert.prototype.causeDetail = null;
        Alert.prototype.effectDetail = null;
        Alert.create = /* @__PURE__ */ __name(function create(properties) {
          return new Alert(properties);
        }, "create");
        Alert.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.activePeriod != null && message.activePeriod.length)
            for (var i = 0; i < message.activePeriod.length; ++i)
              $root.transit_realtime.TimeRange.encode(message.activePeriod[i], writer.uint32(
                /* id 1, wireType 2 =*/
                10
              ).fork()).ldelim();
          if (message.informedEntity != null && message.informedEntity.length)
            for (var i = 0; i < message.informedEntity.length; ++i)
              $root.transit_realtime.EntitySelector.encode(message.informedEntity[i], writer.uint32(
                /* id 5, wireType 2 =*/
                42
              ).fork()).ldelim();
          if (message.cause != null && Object.hasOwnProperty.call(message, "cause"))
            writer.uint32(
              /* id 6, wireType 0 =*/
              48
            ).int32(message.cause);
          if (message.effect != null && Object.hasOwnProperty.call(message, "effect"))
            writer.uint32(
              /* id 7, wireType 0 =*/
              56
            ).int32(message.effect);
          if (message.url != null && Object.hasOwnProperty.call(message, "url"))
            $root.transit_realtime.TranslatedString.encode(message.url, writer.uint32(
              /* id 8, wireType 2 =*/
              66
            ).fork()).ldelim();
          if (message.headerText != null && Object.hasOwnProperty.call(message, "headerText"))
            $root.transit_realtime.TranslatedString.encode(message.headerText, writer.uint32(
              /* id 10, wireType 2 =*/
              82
            ).fork()).ldelim();
          if (message.descriptionText != null && Object.hasOwnProperty.call(message, "descriptionText"))
            $root.transit_realtime.TranslatedString.encode(message.descriptionText, writer.uint32(
              /* id 11, wireType 2 =*/
              90
            ).fork()).ldelim();
          if (message.ttsHeaderText != null && Object.hasOwnProperty.call(message, "ttsHeaderText"))
            $root.transit_realtime.TranslatedString.encode(message.ttsHeaderText, writer.uint32(
              /* id 12, wireType 2 =*/
              98
            ).fork()).ldelim();
          if (message.ttsDescriptionText != null && Object.hasOwnProperty.call(message, "ttsDescriptionText"))
            $root.transit_realtime.TranslatedString.encode(message.ttsDescriptionText, writer.uint32(
              /* id 13, wireType 2 =*/
              106
            ).fork()).ldelim();
          if (message.severityLevel != null && Object.hasOwnProperty.call(message, "severityLevel"))
            writer.uint32(
              /* id 14, wireType 0 =*/
              112
            ).int32(message.severityLevel);
          if (message.image != null && Object.hasOwnProperty.call(message, "image"))
            $root.transit_realtime.TranslatedImage.encode(message.image, writer.uint32(
              /* id 15, wireType 2 =*/
              122
            ).fork()).ldelim();
          if (message.imageAlternativeText != null && Object.hasOwnProperty.call(message, "imageAlternativeText"))
            $root.transit_realtime.TranslatedString.encode(message.imageAlternativeText, writer.uint32(
              /* id 16, wireType 2 =*/
              130
            ).fork()).ldelim();
          if (message.causeDetail != null && Object.hasOwnProperty.call(message, "causeDetail"))
            $root.transit_realtime.TranslatedString.encode(message.causeDetail, writer.uint32(
              /* id 17, wireType 2 =*/
              138
            ).fork()).ldelim();
          if (message.effectDetail != null && Object.hasOwnProperty.call(message, "effectDetail"))
            $root.transit_realtime.TranslatedString.encode(message.effectDetail, writer.uint32(
              /* id 18, wireType 2 =*/
              146
            ).fork()).ldelim();
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        Alert.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        Alert.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.Alert();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                if (!(message.activePeriod && message.activePeriod.length))
                  message.activePeriod = [];
                message.activePeriod.push($root.transit_realtime.TimeRange.decode(reader, reader.uint32(), void 0, _depth + 1));
                continue;
              }
              case 5: {
                if (wireType !== 2)
                  break;
                if (!(message.informedEntity && message.informedEntity.length))
                  message.informedEntity = [];
                message.informedEntity.push($root.transit_realtime.EntitySelector.decode(reader, reader.uint32(), void 0, _depth + 1));
                continue;
              }
              case 6: {
                if (wireType !== 0)
                  break;
                message.cause = reader.int32();
                continue;
              }
              case 7: {
                if (wireType !== 0)
                  break;
                message.effect = reader.int32();
                continue;
              }
              case 8: {
                if (wireType !== 2)
                  break;
                message.url = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.url);
                continue;
              }
              case 10: {
                if (wireType !== 2)
                  break;
                message.headerText = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.headerText);
                continue;
              }
              case 11: {
                if (wireType !== 2)
                  break;
                message.descriptionText = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.descriptionText);
                continue;
              }
              case 12: {
                if (wireType !== 2)
                  break;
                message.ttsHeaderText = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.ttsHeaderText);
                continue;
              }
              case 13: {
                if (wireType !== 2)
                  break;
                message.ttsDescriptionText = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.ttsDescriptionText);
                continue;
              }
              case 14: {
                if (wireType !== 0)
                  break;
                message.severityLevel = reader.int32();
                continue;
              }
              case 15: {
                if (wireType !== 2)
                  break;
                message.image = $root.transit_realtime.TranslatedImage.decode(reader, reader.uint32(), void 0, _depth + 1, message.image);
                continue;
              }
              case 16: {
                if (wireType !== 2)
                  break;
                message.imageAlternativeText = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.imageAlternativeText);
                continue;
              }
              case 17: {
                if (wireType !== 2)
                  break;
                message.causeDetail = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.causeDetail);
                continue;
              }
              case 18: {
                if (wireType !== 2)
                  break;
                message.effectDetail = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.effectDetail);
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        Alert.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        Alert.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.activePeriod != null && message.hasOwnProperty("activePeriod")) {
            if (!Array.isArray(message.activePeriod))
              return "activePeriod: array expected";
            for (var i = 0; i < message.activePeriod.length; ++i) {
              var error = $root.transit_realtime.TimeRange.verify(message.activePeriod[i], _depth + 1);
              if (error)
                return "activePeriod." + error;
            }
          }
          if (message.informedEntity != null && message.hasOwnProperty("informedEntity")) {
            if (!Array.isArray(message.informedEntity))
              return "informedEntity: array expected";
            for (var i = 0; i < message.informedEntity.length; ++i) {
              var error = $root.transit_realtime.EntitySelector.verify(message.informedEntity[i], _depth + 1);
              if (error)
                return "informedEntity." + error;
            }
          }
          if (message.cause != null && message.hasOwnProperty("cause"))
            switch (message.cause) {
              default:
                return "cause: enum value expected";
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
              case 7:
              case 8:
              case 9:
              case 10:
              case 11:
              case 12:
                break;
            }
          if (message.effect != null && message.hasOwnProperty("effect"))
            switch (message.effect) {
              default:
                return "effect: enum value expected";
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
              case 7:
              case 8:
              case 9:
              case 10:
              case 11:
                break;
            }
          if (message.url != null && message.hasOwnProperty("url")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.url, _depth + 1);
            if (error)
              return "url." + error;
          }
          if (message.headerText != null && message.hasOwnProperty("headerText")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.headerText, _depth + 1);
            if (error)
              return "headerText." + error;
          }
          if (message.descriptionText != null && message.hasOwnProperty("descriptionText")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.descriptionText, _depth + 1);
            if (error)
              return "descriptionText." + error;
          }
          if (message.ttsHeaderText != null && message.hasOwnProperty("ttsHeaderText")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.ttsHeaderText, _depth + 1);
            if (error)
              return "ttsHeaderText." + error;
          }
          if (message.ttsDescriptionText != null && message.hasOwnProperty("ttsDescriptionText")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.ttsDescriptionText, _depth + 1);
            if (error)
              return "ttsDescriptionText." + error;
          }
          if (message.severityLevel != null && message.hasOwnProperty("severityLevel"))
            switch (message.severityLevel) {
              default:
                return "severityLevel: enum value expected";
              case 1:
              case 2:
              case 3:
              case 4:
                break;
            }
          if (message.image != null && message.hasOwnProperty("image")) {
            var error = $root.transit_realtime.TranslatedImage.verify(message.image, _depth + 1);
            if (error)
              return "image." + error;
          }
          if (message.imageAlternativeText != null && message.hasOwnProperty("imageAlternativeText")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.imageAlternativeText, _depth + 1);
            if (error)
              return "imageAlternativeText." + error;
          }
          if (message.causeDetail != null && message.hasOwnProperty("causeDetail")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.causeDetail, _depth + 1);
            if (error)
              return "causeDetail." + error;
          }
          if (message.effectDetail != null && message.hasOwnProperty("effectDetail")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.effectDetail, _depth + 1);
            if (error)
              return "effectDetail." + error;
          }
          return null;
        }, "verify");
        Alert.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.Alert)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.Alert();
          if (object.activePeriod) {
            if (!Array.isArray(object.activePeriod))
              throw TypeError(".transit_realtime.Alert.activePeriod: array expected");
            message.activePeriod = Array(object.activePeriod.length);
            for (var i = 0; i < object.activePeriod.length; ++i) {
              if (typeof object.activePeriod[i] !== "object")
                throw TypeError(".transit_realtime.Alert.activePeriod: object expected");
              message.activePeriod[i] = $root.transit_realtime.TimeRange.fromObject(object.activePeriod[i], _depth + 1);
            }
          }
          if (object.informedEntity) {
            if (!Array.isArray(object.informedEntity))
              throw TypeError(".transit_realtime.Alert.informedEntity: array expected");
            message.informedEntity = Array(object.informedEntity.length);
            for (var i = 0; i < object.informedEntity.length; ++i) {
              if (typeof object.informedEntity[i] !== "object")
                throw TypeError(".transit_realtime.Alert.informedEntity: object expected");
              message.informedEntity[i] = $root.transit_realtime.EntitySelector.fromObject(object.informedEntity[i], _depth + 1);
            }
          }
          switch (object.cause) {
            default:
              if (typeof object.cause === "number") {
                message.cause = object.cause;
                break;
              }
              break;
            case "UNKNOWN_CAUSE":
            case 1:
              message.cause = 1;
              break;
            case "OTHER_CAUSE":
            case 2:
              message.cause = 2;
              break;
            case "TECHNICAL_PROBLEM":
            case 3:
              message.cause = 3;
              break;
            case "STRIKE":
            case 4:
              message.cause = 4;
              break;
            case "DEMONSTRATION":
            case 5:
              message.cause = 5;
              break;
            case "ACCIDENT":
            case 6:
              message.cause = 6;
              break;
            case "HOLIDAY":
            case 7:
              message.cause = 7;
              break;
            case "WEATHER":
            case 8:
              message.cause = 8;
              break;
            case "MAINTENANCE":
            case 9:
              message.cause = 9;
              break;
            case "CONSTRUCTION":
            case 10:
              message.cause = 10;
              break;
            case "POLICE_ACTIVITY":
            case 11:
              message.cause = 11;
              break;
            case "MEDICAL_EMERGENCY":
            case 12:
              message.cause = 12;
              break;
          }
          switch (object.effect) {
            case "NO_SERVICE":
            case 1:
              message.effect = 1;
              break;
            case "REDUCED_SERVICE":
            case 2:
              message.effect = 2;
              break;
            case "SIGNIFICANT_DELAYS":
            case 3:
              message.effect = 3;
              break;
            case "DETOUR":
            case 4:
              message.effect = 4;
              break;
            case "ADDITIONAL_SERVICE":
            case 5:
              message.effect = 5;
              break;
            case "MODIFIED_SERVICE":
            case 6:
              message.effect = 6;
              break;
            case "OTHER_EFFECT":
            case 7:
              message.effect = 7;
              break;
            default:
              if (typeof object.effect === "number") {
                message.effect = object.effect;
                break;
              }
              break;
            case "UNKNOWN_EFFECT":
            case 8:
              message.effect = 8;
              break;
            case "STOP_MOVED":
            case 9:
              message.effect = 9;
              break;
            case "NO_EFFECT":
            case 10:
              message.effect = 10;
              break;
            case "ACCESSIBILITY_ISSUE":
            case 11:
              message.effect = 11;
              break;
          }
          if (object.url != null) {
            if (typeof object.url !== "object")
              throw TypeError(".transit_realtime.Alert.url: object expected");
            message.url = $root.transit_realtime.TranslatedString.fromObject(object.url, _depth + 1);
          }
          if (object.headerText != null) {
            if (typeof object.headerText !== "object")
              throw TypeError(".transit_realtime.Alert.headerText: object expected");
            message.headerText = $root.transit_realtime.TranslatedString.fromObject(object.headerText, _depth + 1);
          }
          if (object.descriptionText != null) {
            if (typeof object.descriptionText !== "object")
              throw TypeError(".transit_realtime.Alert.descriptionText: object expected");
            message.descriptionText = $root.transit_realtime.TranslatedString.fromObject(object.descriptionText, _depth + 1);
          }
          if (object.ttsHeaderText != null) {
            if (typeof object.ttsHeaderText !== "object")
              throw TypeError(".transit_realtime.Alert.ttsHeaderText: object expected");
            message.ttsHeaderText = $root.transit_realtime.TranslatedString.fromObject(object.ttsHeaderText, _depth + 1);
          }
          if (object.ttsDescriptionText != null) {
            if (typeof object.ttsDescriptionText !== "object")
              throw TypeError(".transit_realtime.Alert.ttsDescriptionText: object expected");
            message.ttsDescriptionText = $root.transit_realtime.TranslatedString.fromObject(object.ttsDescriptionText, _depth + 1);
          }
          switch (object.severityLevel) {
            default:
              if (typeof object.severityLevel === "number") {
                message.severityLevel = object.severityLevel;
                break;
              }
              break;
            case "UNKNOWN_SEVERITY":
            case 1:
              message.severityLevel = 1;
              break;
            case "INFO":
            case 2:
              message.severityLevel = 2;
              break;
            case "WARNING":
            case 3:
              message.severityLevel = 3;
              break;
            case "SEVERE":
            case 4:
              message.severityLevel = 4;
              break;
          }
          if (object.image != null) {
            if (typeof object.image !== "object")
              throw TypeError(".transit_realtime.Alert.image: object expected");
            message.image = $root.transit_realtime.TranslatedImage.fromObject(object.image, _depth + 1);
          }
          if (object.imageAlternativeText != null) {
            if (typeof object.imageAlternativeText !== "object")
              throw TypeError(".transit_realtime.Alert.imageAlternativeText: object expected");
            message.imageAlternativeText = $root.transit_realtime.TranslatedString.fromObject(object.imageAlternativeText, _depth + 1);
          }
          if (object.causeDetail != null) {
            if (typeof object.causeDetail !== "object")
              throw TypeError(".transit_realtime.Alert.causeDetail: object expected");
            message.causeDetail = $root.transit_realtime.TranslatedString.fromObject(object.causeDetail, _depth + 1);
          }
          if (object.effectDetail != null) {
            if (typeof object.effectDetail !== "object")
              throw TypeError(".transit_realtime.Alert.effectDetail: object expected");
            message.effectDetail = $root.transit_realtime.TranslatedString.fromObject(object.effectDetail, _depth + 1);
          }
          return message;
        }, "fromObject");
        Alert.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.arrays || options.defaults) {
            object.activePeriod = [];
            object.informedEntity = [];
          }
          if (options.defaults) {
            object.cause = options.enums === String ? "UNKNOWN_CAUSE" : 1;
            object.effect = options.enums === String ? "UNKNOWN_EFFECT" : 8;
            object.url = null;
            object.headerText = null;
            object.descriptionText = null;
            object.ttsHeaderText = null;
            object.ttsDescriptionText = null;
            object.severityLevel = options.enums === String ? "UNKNOWN_SEVERITY" : 1;
            object.image = null;
            object.imageAlternativeText = null;
            object.causeDetail = null;
            object.effectDetail = null;
          }
          if (message.activePeriod && message.activePeriod.length) {
            object.activePeriod = Array(message.activePeriod.length);
            for (var j = 0; j < message.activePeriod.length; ++j)
              object.activePeriod[j] = $root.transit_realtime.TimeRange.toObject(message.activePeriod[j], options);
          }
          if (message.informedEntity && message.informedEntity.length) {
            object.informedEntity = Array(message.informedEntity.length);
            for (var j = 0; j < message.informedEntity.length; ++j)
              object.informedEntity[j] = $root.transit_realtime.EntitySelector.toObject(message.informedEntity[j], options);
          }
          if (message.cause != null && message.hasOwnProperty("cause"))
            object.cause = options.enums === String ? $root.transit_realtime.Alert.Cause[message.cause] === void 0 ? message.cause : $root.transit_realtime.Alert.Cause[message.cause] : message.cause;
          if (message.effect != null && message.hasOwnProperty("effect"))
            object.effect = options.enums === String ? $root.transit_realtime.Alert.Effect[message.effect] === void 0 ? message.effect : $root.transit_realtime.Alert.Effect[message.effect] : message.effect;
          if (message.url != null && message.hasOwnProperty("url"))
            object.url = $root.transit_realtime.TranslatedString.toObject(message.url, options);
          if (message.headerText != null && message.hasOwnProperty("headerText"))
            object.headerText = $root.transit_realtime.TranslatedString.toObject(message.headerText, options);
          if (message.descriptionText != null && message.hasOwnProperty("descriptionText"))
            object.descriptionText = $root.transit_realtime.TranslatedString.toObject(message.descriptionText, options);
          if (message.ttsHeaderText != null && message.hasOwnProperty("ttsHeaderText"))
            object.ttsHeaderText = $root.transit_realtime.TranslatedString.toObject(message.ttsHeaderText, options);
          if (message.ttsDescriptionText != null && message.hasOwnProperty("ttsDescriptionText"))
            object.ttsDescriptionText = $root.transit_realtime.TranslatedString.toObject(message.ttsDescriptionText, options);
          if (message.severityLevel != null && message.hasOwnProperty("severityLevel"))
            object.severityLevel = options.enums === String ? $root.transit_realtime.Alert.SeverityLevel[message.severityLevel] === void 0 ? message.severityLevel : $root.transit_realtime.Alert.SeverityLevel[message.severityLevel] : message.severityLevel;
          if (message.image != null && message.hasOwnProperty("image"))
            object.image = $root.transit_realtime.TranslatedImage.toObject(message.image, options);
          if (message.imageAlternativeText != null && message.hasOwnProperty("imageAlternativeText"))
            object.imageAlternativeText = $root.transit_realtime.TranslatedString.toObject(message.imageAlternativeText, options);
          if (message.causeDetail != null && message.hasOwnProperty("causeDetail"))
            object.causeDetail = $root.transit_realtime.TranslatedString.toObject(message.causeDetail, options);
          if (message.effectDetail != null && message.hasOwnProperty("effectDetail"))
            object.effectDetail = $root.transit_realtime.TranslatedString.toObject(message.effectDetail, options);
          return object;
        }, "toObject");
        Alert.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        Alert.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.Alert";
        }, "getTypeUrl");
        Alert.Cause = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[1] = "UNKNOWN_CAUSE"] = 1;
          values[valuesById[2] = "OTHER_CAUSE"] = 2;
          values[valuesById[3] = "TECHNICAL_PROBLEM"] = 3;
          values[valuesById[4] = "STRIKE"] = 4;
          values[valuesById[5] = "DEMONSTRATION"] = 5;
          values[valuesById[6] = "ACCIDENT"] = 6;
          values[valuesById[7] = "HOLIDAY"] = 7;
          values[valuesById[8] = "WEATHER"] = 8;
          values[valuesById[9] = "MAINTENANCE"] = 9;
          values[valuesById[10] = "CONSTRUCTION"] = 10;
          values[valuesById[11] = "POLICE_ACTIVITY"] = 11;
          values[valuesById[12] = "MEDICAL_EMERGENCY"] = 12;
          return values;
        })();
        Alert.Effect = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[1] = "NO_SERVICE"] = 1;
          values[valuesById[2] = "REDUCED_SERVICE"] = 2;
          values[valuesById[3] = "SIGNIFICANT_DELAYS"] = 3;
          values[valuesById[4] = "DETOUR"] = 4;
          values[valuesById[5] = "ADDITIONAL_SERVICE"] = 5;
          values[valuesById[6] = "MODIFIED_SERVICE"] = 6;
          values[valuesById[7] = "OTHER_EFFECT"] = 7;
          values[valuesById[8] = "UNKNOWN_EFFECT"] = 8;
          values[valuesById[9] = "STOP_MOVED"] = 9;
          values[valuesById[10] = "NO_EFFECT"] = 10;
          values[valuesById[11] = "ACCESSIBILITY_ISSUE"] = 11;
          return values;
        })();
        Alert.SeverityLevel = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[1] = "UNKNOWN_SEVERITY"] = 1;
          values[valuesById[2] = "INFO"] = 2;
          values[valuesById[3] = "WARNING"] = 3;
          values[valuesById[4] = "SEVERE"] = 4;
          return values;
        })();
        return Alert;
      })();
      transit_realtime.TimeRange = (function() {
        function TimeRange(properties) {
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(TimeRange, "TimeRange");
        TimeRange.prototype.start = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        TimeRange.prototype.end = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        TimeRange.create = /* @__PURE__ */ __name(function create(properties) {
          return new TimeRange(properties);
        }, "create");
        TimeRange.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.start != null && Object.hasOwnProperty.call(message, "start"))
            writer.uint32(
              /* id 1, wireType 0 =*/
              8
            ).uint64(message.start);
          if (message.end != null && Object.hasOwnProperty.call(message, "end"))
            writer.uint32(
              /* id 2, wireType 0 =*/
              16
            ).uint64(message.end);
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        TimeRange.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        TimeRange.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TimeRange();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 0)
                  break;
                message.start = reader.uint64();
                continue;
              }
              case 2: {
                if (wireType !== 0)
                  break;
                message.end = reader.uint64();
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        TimeRange.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        TimeRange.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.start != null && message.hasOwnProperty("start")) {
            if (!$util.isInteger(message.start) && !(message.start && $util.isInteger(message.start.low) && $util.isInteger(message.start.high)))
              return "start: integer|Long expected";
          }
          if (message.end != null && message.hasOwnProperty("end")) {
            if (!$util.isInteger(message.end) && !(message.end && $util.isInteger(message.end.low) && $util.isInteger(message.end.high)))
              return "end: integer|Long expected";
          }
          return null;
        }, "verify");
        TimeRange.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.TimeRange)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.TimeRange();
          if (object.start != null) {
            if ($util.Long)
              (message.start = $util.Long.fromValue(object.start)).unsigned = true;
            else if (typeof object.start === "string")
              message.start = parseInt(object.start, 10);
            else if (typeof object.start === "number")
              message.start = object.start;
            else if (typeof object.start === "object")
              message.start = new $util.LongBits(object.start.low >>> 0, object.start.high >>> 0).toNumber(true);
          }
          if (object.end != null) {
            if ($util.Long)
              (message.end = $util.Long.fromValue(object.end)).unsigned = true;
            else if (typeof object.end === "string")
              message.end = parseInt(object.end, 10);
            else if (typeof object.end === "number")
              message.end = object.end;
            else if (typeof object.end === "object")
              message.end = new $util.LongBits(object.end.low >>> 0, object.end.high >>> 0).toNumber(true);
          }
          return message;
        }, "fromObject");
        TimeRange.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var long = new $util.Long(0, 0, true);
              object.start = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
              object.start = options.longs === String ? "0" : 0;
            if ($util.Long) {
              var long = new $util.Long(0, 0, true);
              object.end = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
              object.end = options.longs === String ? "0" : 0;
          }
          if (message.start != null && message.hasOwnProperty("start"))
            if (typeof message.start === "number")
              object.start = options.longs === String ? String(message.start) : message.start;
            else
              object.start = options.longs === String ? $util.Long.prototype.toString.call(message.start) : options.longs === Number ? new $util.LongBits(message.start.low >>> 0, message.start.high >>> 0).toNumber(true) : message.start;
          if (message.end != null && message.hasOwnProperty("end"))
            if (typeof message.end === "number")
              object.end = options.longs === String ? String(message.end) : message.end;
            else
              object.end = options.longs === String ? $util.Long.prototype.toString.call(message.end) : options.longs === Number ? new $util.LongBits(message.end.low >>> 0, message.end.high >>> 0).toNumber(true) : message.end;
          return object;
        }, "toObject");
        TimeRange.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        TimeRange.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.TimeRange";
        }, "getTypeUrl");
        return TimeRange;
      })();
      transit_realtime.Position = (function() {
        function Position(properties) {
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(Position, "Position");
        Position.prototype.latitude = 0;
        Position.prototype.longitude = 0;
        Position.prototype.bearing = 0;
        Position.prototype.odometer = 0;
        Position.prototype.speed = 0;
        Position.create = /* @__PURE__ */ __name(function create(properties) {
          return new Position(properties);
        }, "create");
        Position.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          writer.uint32(
            /* id 1, wireType 5 =*/
            13
          ).float(message.latitude);
          writer.uint32(
            /* id 2, wireType 5 =*/
            21
          ).float(message.longitude);
          if (message.bearing != null && Object.hasOwnProperty.call(message, "bearing"))
            writer.uint32(
              /* id 3, wireType 5 =*/
              29
            ).float(message.bearing);
          if (message.odometer != null && Object.hasOwnProperty.call(message, "odometer"))
            writer.uint32(
              /* id 4, wireType 1 =*/
              33
            ).double(message.odometer);
          if (message.speed != null && Object.hasOwnProperty.call(message, "speed"))
            writer.uint32(
              /* id 5, wireType 5 =*/
              45
            ).float(message.speed);
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        Position.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        Position.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.Position();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 5)
                  break;
                message.latitude = reader.float();
                continue;
              }
              case 2: {
                if (wireType !== 5)
                  break;
                message.longitude = reader.float();
                continue;
              }
              case 3: {
                if (wireType !== 5)
                  break;
                message.bearing = reader.float();
                continue;
              }
              case 4: {
                if (wireType !== 1)
                  break;
                message.odometer = reader.double();
                continue;
              }
              case 5: {
                if (wireType !== 5)
                  break;
                message.speed = reader.float();
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          if (!message.hasOwnProperty("latitude"))
            throw $util.ProtocolError("missing required 'latitude'", { instance: message });
          if (!message.hasOwnProperty("longitude"))
            throw $util.ProtocolError("missing required 'longitude'", { instance: message });
          return message;
        }, "decode");
        Position.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        Position.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (typeof message.latitude !== "number")
            return "latitude: number expected";
          if (typeof message.longitude !== "number")
            return "longitude: number expected";
          if (message.bearing != null && message.hasOwnProperty("bearing")) {
            if (typeof message.bearing !== "number")
              return "bearing: number expected";
          }
          if (message.odometer != null && message.hasOwnProperty("odometer")) {
            if (typeof message.odometer !== "number")
              return "odometer: number expected";
          }
          if (message.speed != null && message.hasOwnProperty("speed")) {
            if (typeof message.speed !== "number")
              return "speed: number expected";
          }
          return null;
        }, "verify");
        Position.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.Position)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.Position();
          if (object.latitude != null)
            message.latitude = Number(object.latitude);
          if (object.longitude != null)
            message.longitude = Number(object.longitude);
          if (object.bearing != null)
            message.bearing = Number(object.bearing);
          if (object.odometer != null)
            message.odometer = Number(object.odometer);
          if (object.speed != null)
            message.speed = Number(object.speed);
          return message;
        }, "fromObject");
        Position.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.defaults) {
            object.latitude = 0;
            object.longitude = 0;
            object.bearing = 0;
            object.odometer = 0;
            object.speed = 0;
          }
          if (message.latitude != null && message.hasOwnProperty("latitude"))
            object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
          if (message.longitude != null && message.hasOwnProperty("longitude"))
            object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
          if (message.bearing != null && message.hasOwnProperty("bearing"))
            object.bearing = options.json && !isFinite(message.bearing) ? String(message.bearing) : message.bearing;
          if (message.odometer != null && message.hasOwnProperty("odometer"))
            object.odometer = options.json && !isFinite(message.odometer) ? String(message.odometer) : message.odometer;
          if (message.speed != null && message.hasOwnProperty("speed"))
            object.speed = options.json && !isFinite(message.speed) ? String(message.speed) : message.speed;
          return object;
        }, "toObject");
        Position.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        Position.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.Position";
        }, "getTypeUrl");
        return Position;
      })();
      transit_realtime.TripDescriptor = (function() {
        function TripDescriptor(properties) {
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(TripDescriptor, "TripDescriptor");
        TripDescriptor.prototype.tripId = "";
        TripDescriptor.prototype.routeId = "";
        TripDescriptor.prototype.directionId = 0;
        TripDescriptor.prototype.startTime = "";
        TripDescriptor.prototype.startDate = "";
        TripDescriptor.prototype.scheduleRelationship = 0;
        TripDescriptor.prototype.modifiedTrip = null;
        TripDescriptor.create = /* @__PURE__ */ __name(function create(properties) {
          return new TripDescriptor(properties);
        }, "create");
        TripDescriptor.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.tripId != null && Object.hasOwnProperty.call(message, "tripId"))
            writer.uint32(
              /* id 1, wireType 2 =*/
              10
            ).string(message.tripId);
          if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
            writer.uint32(
              /* id 2, wireType 2 =*/
              18
            ).string(message.startTime);
          if (message.startDate != null && Object.hasOwnProperty.call(message, "startDate"))
            writer.uint32(
              /* id 3, wireType 2 =*/
              26
            ).string(message.startDate);
          if (message.scheduleRelationship != null && Object.hasOwnProperty.call(message, "scheduleRelationship"))
            writer.uint32(
              /* id 4, wireType 0 =*/
              32
            ).int32(message.scheduleRelationship);
          if (message.routeId != null && Object.hasOwnProperty.call(message, "routeId"))
            writer.uint32(
              /* id 5, wireType 2 =*/
              42
            ).string(message.routeId);
          if (message.directionId != null && Object.hasOwnProperty.call(message, "directionId"))
            writer.uint32(
              /* id 6, wireType 0 =*/
              48
            ).uint32(message.directionId);
          if (message.modifiedTrip != null && Object.hasOwnProperty.call(message, "modifiedTrip"))
            $root.transit_realtime.TripDescriptor.ModifiedTripSelector.encode(message.modifiedTrip, writer.uint32(
              /* id 7, wireType 2 =*/
              58
            ).fork()).ldelim();
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        TripDescriptor.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        TripDescriptor.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TripDescriptor();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                message.tripId = reader.string();
                continue;
              }
              case 5: {
                if (wireType !== 2)
                  break;
                message.routeId = reader.string();
                continue;
              }
              case 6: {
                if (wireType !== 0)
                  break;
                message.directionId = reader.uint32();
                continue;
              }
              case 2: {
                if (wireType !== 2)
                  break;
                message.startTime = reader.string();
                continue;
              }
              case 3: {
                if (wireType !== 2)
                  break;
                message.startDate = reader.string();
                continue;
              }
              case 4: {
                if (wireType !== 0)
                  break;
                message.scheduleRelationship = reader.int32();
                continue;
              }
              case 7: {
                if (wireType !== 2)
                  break;
                message.modifiedTrip = $root.transit_realtime.TripDescriptor.ModifiedTripSelector.decode(reader, reader.uint32(), void 0, _depth + 1, message.modifiedTrip);
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        TripDescriptor.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        TripDescriptor.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.tripId != null && message.hasOwnProperty("tripId")) {
            if (!$util.isString(message.tripId))
              return "tripId: string expected";
          }
          if (message.routeId != null && message.hasOwnProperty("routeId")) {
            if (!$util.isString(message.routeId))
              return "routeId: string expected";
          }
          if (message.directionId != null && message.hasOwnProperty("directionId")) {
            if (!$util.isInteger(message.directionId))
              return "directionId: integer expected";
          }
          if (message.startTime != null && message.hasOwnProperty("startTime")) {
            if (!$util.isString(message.startTime))
              return "startTime: string expected";
          }
          if (message.startDate != null && message.hasOwnProperty("startDate")) {
            if (!$util.isString(message.startDate))
              return "startDate: string expected";
          }
          if (message.scheduleRelationship != null && message.hasOwnProperty("scheduleRelationship"))
            switch (message.scheduleRelationship) {
              default:
                return "scheduleRelationship: enum value expected";
              case 0:
              case 1:
              case 2:
              case 3:
              case 5:
              case 6:
              case 7:
              case 8:
                break;
            }
          if (message.modifiedTrip != null && message.hasOwnProperty("modifiedTrip")) {
            var error = $root.transit_realtime.TripDescriptor.ModifiedTripSelector.verify(message.modifiedTrip, _depth + 1);
            if (error)
              return "modifiedTrip." + error;
          }
          return null;
        }, "verify");
        TripDescriptor.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.TripDescriptor)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.TripDescriptor();
          if (object.tripId != null)
            message.tripId = String(object.tripId);
          if (object.routeId != null)
            message.routeId = String(object.routeId);
          if (object.directionId != null)
            message.directionId = object.directionId >>> 0;
          if (object.startTime != null)
            message.startTime = String(object.startTime);
          if (object.startDate != null)
            message.startDate = String(object.startDate);
          switch (object.scheduleRelationship) {
            default:
              if (typeof object.scheduleRelationship === "number") {
                message.scheduleRelationship = object.scheduleRelationship;
                break;
              }
              break;
            case "SCHEDULED":
            case 0:
              message.scheduleRelationship = 0;
              break;
            case "ADDED":
            case 1:
              message.scheduleRelationship = 1;
              break;
            case "UNSCHEDULED":
            case 2:
              message.scheduleRelationship = 2;
              break;
            case "CANCELED":
            case 3:
              message.scheduleRelationship = 3;
              break;
            case "REPLACEMENT":
            case 5:
              message.scheduleRelationship = 5;
              break;
            case "DUPLICATED":
            case 6:
              message.scheduleRelationship = 6;
              break;
            case "DELETED":
            case 7:
              message.scheduleRelationship = 7;
              break;
            case "NEW":
            case 8:
              message.scheduleRelationship = 8;
              break;
          }
          if (object.modifiedTrip != null) {
            if (typeof object.modifiedTrip !== "object")
              throw TypeError(".transit_realtime.TripDescriptor.modifiedTrip: object expected");
            message.modifiedTrip = $root.transit_realtime.TripDescriptor.ModifiedTripSelector.fromObject(object.modifiedTrip, _depth + 1);
          }
          return message;
        }, "fromObject");
        TripDescriptor.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.defaults) {
            object.tripId = "";
            object.startTime = "";
            object.startDate = "";
            object.scheduleRelationship = options.enums === String ? "SCHEDULED" : 0;
            object.routeId = "";
            object.directionId = 0;
            object.modifiedTrip = null;
          }
          if (message.tripId != null && message.hasOwnProperty("tripId"))
            object.tripId = message.tripId;
          if (message.startTime != null && message.hasOwnProperty("startTime"))
            object.startTime = message.startTime;
          if (message.startDate != null && message.hasOwnProperty("startDate"))
            object.startDate = message.startDate;
          if (message.scheduleRelationship != null && message.hasOwnProperty("scheduleRelationship"))
            object.scheduleRelationship = options.enums === String ? $root.transit_realtime.TripDescriptor.ScheduleRelationship[message.scheduleRelationship] === void 0 ? message.scheduleRelationship : $root.transit_realtime.TripDescriptor.ScheduleRelationship[message.scheduleRelationship] : message.scheduleRelationship;
          if (message.routeId != null && message.hasOwnProperty("routeId"))
            object.routeId = message.routeId;
          if (message.directionId != null && message.hasOwnProperty("directionId"))
            object.directionId = message.directionId;
          if (message.modifiedTrip != null && message.hasOwnProperty("modifiedTrip"))
            object.modifiedTrip = $root.transit_realtime.TripDescriptor.ModifiedTripSelector.toObject(message.modifiedTrip, options);
          return object;
        }, "toObject");
        TripDescriptor.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        TripDescriptor.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.TripDescriptor";
        }, "getTypeUrl");
        TripDescriptor.ScheduleRelationship = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "SCHEDULED"] = 0;
          values[valuesById[1] = "ADDED"] = 1;
          values[valuesById[2] = "UNSCHEDULED"] = 2;
          values[valuesById[3] = "CANCELED"] = 3;
          values[valuesById[5] = "REPLACEMENT"] = 5;
          values[valuesById[6] = "DUPLICATED"] = 6;
          values[valuesById[7] = "DELETED"] = 7;
          values[valuesById[8] = "NEW"] = 8;
          return values;
        })();
        TripDescriptor.ModifiedTripSelector = (function() {
          function ModifiedTripSelector(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                  this[keys[i]] = properties[keys[i]];
            }
          }
          __name(ModifiedTripSelector, "ModifiedTripSelector");
          ModifiedTripSelector.prototype.modificationsId = "";
          ModifiedTripSelector.prototype.affectedTripId = "";
          ModifiedTripSelector.prototype.startTime = "";
          ModifiedTripSelector.prototype.startDate = "";
          ModifiedTripSelector.create = /* @__PURE__ */ __name(function create(properties) {
            return new ModifiedTripSelector(properties);
          }, "create");
          ModifiedTripSelector.encode = /* @__PURE__ */ __name(function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.modificationsId != null && Object.hasOwnProperty.call(message, "modificationsId"))
              writer.uint32(
                /* id 1, wireType 2 =*/
                10
              ).string(message.modificationsId);
            if (message.affectedTripId != null && Object.hasOwnProperty.call(message, "affectedTripId"))
              writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).string(message.affectedTripId);
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
              writer.uint32(
                /* id 3, wireType 2 =*/
                26
              ).string(message.startTime);
            if (message.startDate != null && Object.hasOwnProperty.call(message, "startDate"))
              writer.uint32(
                /* id 4, wireType 2 =*/
                34
              ).string(message.startDate);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
              for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
            return writer;
          }, "encode");
          ModifiedTripSelector.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          }, "encodeDelimited");
          ModifiedTripSelector.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $Reader.recursionLimit)
              throw Error("max depth exceeded");
            var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TripDescriptor.ModifiedTripSelector();
            while (reader.pos < end) {
              var start = reader.pos;
              var tag = reader.tag();
              if (tag === _end) {
                _end = void 0;
                break;
              }
              var wireType = tag & 7;
              switch (tag >>>= 3) {
                case 1: {
                  if (wireType !== 2)
                    break;
                  message.modificationsId = reader.string();
                  continue;
                }
                case 2: {
                  if (wireType !== 2)
                    break;
                  message.affectedTripId = reader.string();
                  continue;
                }
                case 3: {
                  if (wireType !== 2)
                    break;
                  message.startTime = reader.string();
                  continue;
                }
                case 4: {
                  if (wireType !== 2)
                    break;
                  message.startDate = reader.string();
                  continue;
                }
              }
              reader.skipType(wireType, _depth, tag);
              $util.makeProp(message, "$unknowns", false);
              (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
            if (_end !== void 0)
              throw Error("missing end group");
            return message;
          }, "decode");
          ModifiedTripSelector.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          }, "decodeDelimited");
          ModifiedTripSelector.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              return "max depth exceeded";
            if (message.modificationsId != null && message.hasOwnProperty("modificationsId")) {
              if (!$util.isString(message.modificationsId))
                return "modificationsId: string expected";
            }
            if (message.affectedTripId != null && message.hasOwnProperty("affectedTripId")) {
              if (!$util.isString(message.affectedTripId))
                return "affectedTripId: string expected";
            }
            if (message.startTime != null && message.hasOwnProperty("startTime")) {
              if (!$util.isString(message.startTime))
                return "startTime: string expected";
            }
            if (message.startDate != null && message.hasOwnProperty("startDate")) {
              if (!$util.isString(message.startDate))
                return "startDate: string expected";
            }
            return null;
          }, "verify");
          ModifiedTripSelector.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
            if (object instanceof $root.transit_realtime.TripDescriptor.ModifiedTripSelector)
              return object;
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              throw Error("max depth exceeded");
            var message = new $root.transit_realtime.TripDescriptor.ModifiedTripSelector();
            if (object.modificationsId != null)
              message.modificationsId = String(object.modificationsId);
            if (object.affectedTripId != null)
              message.affectedTripId = String(object.affectedTripId);
            if (object.startTime != null)
              message.startTime = String(object.startTime);
            if (object.startDate != null)
              message.startDate = String(object.startDate);
            return message;
          }, "fromObject");
          ModifiedTripSelector.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults) {
              object.modificationsId = "";
              object.affectedTripId = "";
              object.startTime = "";
              object.startDate = "";
            }
            if (message.modificationsId != null && message.hasOwnProperty("modificationsId"))
              object.modificationsId = message.modificationsId;
            if (message.affectedTripId != null && message.hasOwnProperty("affectedTripId"))
              object.affectedTripId = message.affectedTripId;
            if (message.startTime != null && message.hasOwnProperty("startTime"))
              object.startTime = message.startTime;
            if (message.startDate != null && message.hasOwnProperty("startDate"))
              object.startDate = message.startDate;
            return object;
          }, "toObject");
          ModifiedTripSelector.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          }, "toJSON");
          ModifiedTripSelector.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
            if (prefix === void 0)
              prefix = "type.googleapis.com";
            return prefix + "/transit_realtime.TripDescriptor.ModifiedTripSelector";
          }, "getTypeUrl");
          return ModifiedTripSelector;
        })();
        return TripDescriptor;
      })();
      transit_realtime.VehicleDescriptor = (function() {
        function VehicleDescriptor(properties) {
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(VehicleDescriptor, "VehicleDescriptor");
        VehicleDescriptor.prototype.id = "";
        VehicleDescriptor.prototype.label = "";
        VehicleDescriptor.prototype.licensePlate = "";
        VehicleDescriptor.prototype.wheelchairAccessible = 0;
        VehicleDescriptor.create = /* @__PURE__ */ __name(function create(properties) {
          return new VehicleDescriptor(properties);
        }, "create");
        VehicleDescriptor.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(
              /* id 1, wireType 2 =*/
              10
            ).string(message.id);
          if (message.label != null && Object.hasOwnProperty.call(message, "label"))
            writer.uint32(
              /* id 2, wireType 2 =*/
              18
            ).string(message.label);
          if (message.licensePlate != null && Object.hasOwnProperty.call(message, "licensePlate"))
            writer.uint32(
              /* id 3, wireType 2 =*/
              26
            ).string(message.licensePlate);
          if (message.wheelchairAccessible != null && Object.hasOwnProperty.call(message, "wheelchairAccessible"))
            writer.uint32(
              /* id 4, wireType 0 =*/
              32
            ).int32(message.wheelchairAccessible);
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        VehicleDescriptor.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        VehicleDescriptor.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.VehicleDescriptor();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                message.id = reader.string();
                continue;
              }
              case 2: {
                if (wireType !== 2)
                  break;
                message.label = reader.string();
                continue;
              }
              case 3: {
                if (wireType !== 2)
                  break;
                message.licensePlate = reader.string();
                continue;
              }
              case 4: {
                if (wireType !== 0)
                  break;
                message.wheelchairAccessible = reader.int32();
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        VehicleDescriptor.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        VehicleDescriptor.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.id != null && message.hasOwnProperty("id")) {
            if (!$util.isString(message.id))
              return "id: string expected";
          }
          if (message.label != null && message.hasOwnProperty("label")) {
            if (!$util.isString(message.label))
              return "label: string expected";
          }
          if (message.licensePlate != null && message.hasOwnProperty("licensePlate")) {
            if (!$util.isString(message.licensePlate))
              return "licensePlate: string expected";
          }
          if (message.wheelchairAccessible != null && message.hasOwnProperty("wheelchairAccessible"))
            switch (message.wheelchairAccessible) {
              default:
                return "wheelchairAccessible: enum value expected";
              case 0:
              case 1:
              case 2:
              case 3:
                break;
            }
          return null;
        }, "verify");
        VehicleDescriptor.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.VehicleDescriptor)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.VehicleDescriptor();
          if (object.id != null)
            message.id = String(object.id);
          if (object.label != null)
            message.label = String(object.label);
          if (object.licensePlate != null)
            message.licensePlate = String(object.licensePlate);
          switch (object.wheelchairAccessible) {
            default:
              if (typeof object.wheelchairAccessible === "number") {
                message.wheelchairAccessible = object.wheelchairAccessible;
                break;
              }
              break;
            case "NO_VALUE":
            case 0:
              message.wheelchairAccessible = 0;
              break;
            case "UNKNOWN":
            case 1:
              message.wheelchairAccessible = 1;
              break;
            case "WHEELCHAIR_ACCESSIBLE":
            case 2:
              message.wheelchairAccessible = 2;
              break;
            case "WHEELCHAIR_INACCESSIBLE":
            case 3:
              message.wheelchairAccessible = 3;
              break;
          }
          return message;
        }, "fromObject");
        VehicleDescriptor.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.defaults) {
            object.id = "";
            object.label = "";
            object.licensePlate = "";
            object.wheelchairAccessible = options.enums === String ? "NO_VALUE" : 0;
          }
          if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
          if (message.label != null && message.hasOwnProperty("label"))
            object.label = message.label;
          if (message.licensePlate != null && message.hasOwnProperty("licensePlate"))
            object.licensePlate = message.licensePlate;
          if (message.wheelchairAccessible != null && message.hasOwnProperty("wheelchairAccessible"))
            object.wheelchairAccessible = options.enums === String ? $root.transit_realtime.VehicleDescriptor.WheelchairAccessible[message.wheelchairAccessible] === void 0 ? message.wheelchairAccessible : $root.transit_realtime.VehicleDescriptor.WheelchairAccessible[message.wheelchairAccessible] : message.wheelchairAccessible;
          return object;
        }, "toObject");
        VehicleDescriptor.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        VehicleDescriptor.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.VehicleDescriptor";
        }, "getTypeUrl");
        VehicleDescriptor.WheelchairAccessible = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "NO_VALUE"] = 0;
          values[valuesById[1] = "UNKNOWN"] = 1;
          values[valuesById[2] = "WHEELCHAIR_ACCESSIBLE"] = 2;
          values[valuesById[3] = "WHEELCHAIR_INACCESSIBLE"] = 3;
          return values;
        })();
        return VehicleDescriptor;
      })();
      transit_realtime.EntitySelector = (function() {
        function EntitySelector(properties) {
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(EntitySelector, "EntitySelector");
        EntitySelector.prototype.agencyId = "";
        EntitySelector.prototype.routeId = "";
        EntitySelector.prototype.routeType = 0;
        EntitySelector.prototype.trip = null;
        EntitySelector.prototype.stopId = "";
        EntitySelector.prototype.directionId = 0;
        EntitySelector.create = /* @__PURE__ */ __name(function create(properties) {
          return new EntitySelector(properties);
        }, "create");
        EntitySelector.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.agencyId != null && Object.hasOwnProperty.call(message, "agencyId"))
            writer.uint32(
              /* id 1, wireType 2 =*/
              10
            ).string(message.agencyId);
          if (message.routeId != null && Object.hasOwnProperty.call(message, "routeId"))
            writer.uint32(
              /* id 2, wireType 2 =*/
              18
            ).string(message.routeId);
          if (message.routeType != null && Object.hasOwnProperty.call(message, "routeType"))
            writer.uint32(
              /* id 3, wireType 0 =*/
              24
            ).int32(message.routeType);
          if (message.trip != null && Object.hasOwnProperty.call(message, "trip"))
            $root.transit_realtime.TripDescriptor.encode(message.trip, writer.uint32(
              /* id 4, wireType 2 =*/
              34
            ).fork()).ldelim();
          if (message.stopId != null && Object.hasOwnProperty.call(message, "stopId"))
            writer.uint32(
              /* id 5, wireType 2 =*/
              42
            ).string(message.stopId);
          if (message.directionId != null && Object.hasOwnProperty.call(message, "directionId"))
            writer.uint32(
              /* id 6, wireType 0 =*/
              48
            ).uint32(message.directionId);
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        EntitySelector.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        EntitySelector.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.EntitySelector();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                message.agencyId = reader.string();
                continue;
              }
              case 2: {
                if (wireType !== 2)
                  break;
                message.routeId = reader.string();
                continue;
              }
              case 3: {
                if (wireType !== 0)
                  break;
                message.routeType = reader.int32();
                continue;
              }
              case 4: {
                if (wireType !== 2)
                  break;
                message.trip = $root.transit_realtime.TripDescriptor.decode(reader, reader.uint32(), void 0, _depth + 1, message.trip);
                continue;
              }
              case 5: {
                if (wireType !== 2)
                  break;
                message.stopId = reader.string();
                continue;
              }
              case 6: {
                if (wireType !== 0)
                  break;
                message.directionId = reader.uint32();
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        EntitySelector.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        EntitySelector.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.agencyId != null && message.hasOwnProperty("agencyId")) {
            if (!$util.isString(message.agencyId))
              return "agencyId: string expected";
          }
          if (message.routeId != null && message.hasOwnProperty("routeId")) {
            if (!$util.isString(message.routeId))
              return "routeId: string expected";
          }
          if (message.routeType != null && message.hasOwnProperty("routeType")) {
            if (!$util.isInteger(message.routeType))
              return "routeType: integer expected";
          }
          if (message.trip != null && message.hasOwnProperty("trip")) {
            var error = $root.transit_realtime.TripDescriptor.verify(message.trip, _depth + 1);
            if (error)
              return "trip." + error;
          }
          if (message.stopId != null && message.hasOwnProperty("stopId")) {
            if (!$util.isString(message.stopId))
              return "stopId: string expected";
          }
          if (message.directionId != null && message.hasOwnProperty("directionId")) {
            if (!$util.isInteger(message.directionId))
              return "directionId: integer expected";
          }
          return null;
        }, "verify");
        EntitySelector.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.EntitySelector)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.EntitySelector();
          if (object.agencyId != null)
            message.agencyId = String(object.agencyId);
          if (object.routeId != null)
            message.routeId = String(object.routeId);
          if (object.routeType != null)
            message.routeType = object.routeType | 0;
          if (object.trip != null) {
            if (typeof object.trip !== "object")
              throw TypeError(".transit_realtime.EntitySelector.trip: object expected");
            message.trip = $root.transit_realtime.TripDescriptor.fromObject(object.trip, _depth + 1);
          }
          if (object.stopId != null)
            message.stopId = String(object.stopId);
          if (object.directionId != null)
            message.directionId = object.directionId >>> 0;
          return message;
        }, "fromObject");
        EntitySelector.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.defaults) {
            object.agencyId = "";
            object.routeId = "";
            object.routeType = 0;
            object.trip = null;
            object.stopId = "";
            object.directionId = 0;
          }
          if (message.agencyId != null && message.hasOwnProperty("agencyId"))
            object.agencyId = message.agencyId;
          if (message.routeId != null && message.hasOwnProperty("routeId"))
            object.routeId = message.routeId;
          if (message.routeType != null && message.hasOwnProperty("routeType"))
            object.routeType = message.routeType;
          if (message.trip != null && message.hasOwnProperty("trip"))
            object.trip = $root.transit_realtime.TripDescriptor.toObject(message.trip, options);
          if (message.stopId != null && message.hasOwnProperty("stopId"))
            object.stopId = message.stopId;
          if (message.directionId != null && message.hasOwnProperty("directionId"))
            object.directionId = message.directionId;
          return object;
        }, "toObject");
        EntitySelector.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        EntitySelector.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.EntitySelector";
        }, "getTypeUrl");
        return EntitySelector;
      })();
      transit_realtime.TranslatedString = (function() {
        function TranslatedString(properties) {
          this.translation = [];
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(TranslatedString, "TranslatedString");
        TranslatedString.prototype.translation = $util.emptyArray;
        TranslatedString.create = /* @__PURE__ */ __name(function create(properties) {
          return new TranslatedString(properties);
        }, "create");
        TranslatedString.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.translation != null && message.translation.length)
            for (var i = 0; i < message.translation.length; ++i)
              $root.transit_realtime.TranslatedString.Translation.encode(message.translation[i], writer.uint32(
                /* id 1, wireType 2 =*/
                10
              ).fork()).ldelim();
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        TranslatedString.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        TranslatedString.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TranslatedString();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                if (!(message.translation && message.translation.length))
                  message.translation = [];
                message.translation.push($root.transit_realtime.TranslatedString.Translation.decode(reader, reader.uint32(), void 0, _depth + 1));
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        TranslatedString.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        TranslatedString.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.translation != null && message.hasOwnProperty("translation")) {
            if (!Array.isArray(message.translation))
              return "translation: array expected";
            for (var i = 0; i < message.translation.length; ++i) {
              var error = $root.transit_realtime.TranslatedString.Translation.verify(message.translation[i], _depth + 1);
              if (error)
                return "translation." + error;
            }
          }
          return null;
        }, "verify");
        TranslatedString.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.TranslatedString)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.TranslatedString();
          if (object.translation) {
            if (!Array.isArray(object.translation))
              throw TypeError(".transit_realtime.TranslatedString.translation: array expected");
            message.translation = Array(object.translation.length);
            for (var i = 0; i < object.translation.length; ++i) {
              if (typeof object.translation[i] !== "object")
                throw TypeError(".transit_realtime.TranslatedString.translation: object expected");
              message.translation[i] = $root.transit_realtime.TranslatedString.Translation.fromObject(object.translation[i], _depth + 1);
            }
          }
          return message;
        }, "fromObject");
        TranslatedString.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.arrays || options.defaults)
            object.translation = [];
          if (message.translation && message.translation.length) {
            object.translation = Array(message.translation.length);
            for (var j = 0; j < message.translation.length; ++j)
              object.translation[j] = $root.transit_realtime.TranslatedString.Translation.toObject(message.translation[j], options);
          }
          return object;
        }, "toObject");
        TranslatedString.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        TranslatedString.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.TranslatedString";
        }, "getTypeUrl");
        TranslatedString.Translation = (function() {
          function Translation(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                  this[keys[i]] = properties[keys[i]];
            }
          }
          __name(Translation, "Translation");
          Translation.prototype.text = "";
          Translation.prototype.language = "";
          Translation.create = /* @__PURE__ */ __name(function create(properties) {
            return new Translation(properties);
          }, "create");
          Translation.encode = /* @__PURE__ */ __name(function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            writer.uint32(
              /* id 1, wireType 2 =*/
              10
            ).string(message.text);
            if (message.language != null && Object.hasOwnProperty.call(message, "language"))
              writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).string(message.language);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
              for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
            return writer;
          }, "encode");
          Translation.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          }, "encodeDelimited");
          Translation.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $Reader.recursionLimit)
              throw Error("max depth exceeded");
            var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TranslatedString.Translation();
            while (reader.pos < end) {
              var start = reader.pos;
              var tag = reader.tag();
              if (tag === _end) {
                _end = void 0;
                break;
              }
              var wireType = tag & 7;
              switch (tag >>>= 3) {
                case 1: {
                  if (wireType !== 2)
                    break;
                  message.text = reader.string();
                  continue;
                }
                case 2: {
                  if (wireType !== 2)
                    break;
                  message.language = reader.string();
                  continue;
                }
              }
              reader.skipType(wireType, _depth, tag);
              $util.makeProp(message, "$unknowns", false);
              (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
            if (_end !== void 0)
              throw Error("missing end group");
            if (!message.hasOwnProperty("text"))
              throw $util.ProtocolError("missing required 'text'", { instance: message });
            return message;
          }, "decode");
          Translation.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          }, "decodeDelimited");
          Translation.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              return "max depth exceeded";
            if (!$util.isString(message.text))
              return "text: string expected";
            if (message.language != null && message.hasOwnProperty("language")) {
              if (!$util.isString(message.language))
                return "language: string expected";
            }
            return null;
          }, "verify");
          Translation.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
            if (object instanceof $root.transit_realtime.TranslatedString.Translation)
              return object;
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              throw Error("max depth exceeded");
            var message = new $root.transit_realtime.TranslatedString.Translation();
            if (object.text != null)
              message.text = String(object.text);
            if (object.language != null)
              message.language = String(object.language);
            return message;
          }, "fromObject");
          Translation.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults) {
              object.text = "";
              object.language = "";
            }
            if (message.text != null && message.hasOwnProperty("text"))
              object.text = message.text;
            if (message.language != null && message.hasOwnProperty("language"))
              object.language = message.language;
            return object;
          }, "toObject");
          Translation.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          }, "toJSON");
          Translation.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
            if (prefix === void 0)
              prefix = "type.googleapis.com";
            return prefix + "/transit_realtime.TranslatedString.Translation";
          }, "getTypeUrl");
          return Translation;
        })();
        return TranslatedString;
      })();
      transit_realtime.TranslatedImage = (function() {
        function TranslatedImage(properties) {
          this.localizedImage = [];
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(TranslatedImage, "TranslatedImage");
        TranslatedImage.prototype.localizedImage = $util.emptyArray;
        TranslatedImage.create = /* @__PURE__ */ __name(function create(properties) {
          return new TranslatedImage(properties);
        }, "create");
        TranslatedImage.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.localizedImage != null && message.localizedImage.length)
            for (var i = 0; i < message.localizedImage.length; ++i)
              $root.transit_realtime.TranslatedImage.LocalizedImage.encode(message.localizedImage[i], writer.uint32(
                /* id 1, wireType 2 =*/
                10
              ).fork()).ldelim();
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        TranslatedImage.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        TranslatedImage.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TranslatedImage();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                if (!(message.localizedImage && message.localizedImage.length))
                  message.localizedImage = [];
                message.localizedImage.push($root.transit_realtime.TranslatedImage.LocalizedImage.decode(reader, reader.uint32(), void 0, _depth + 1));
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        TranslatedImage.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        TranslatedImage.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.localizedImage != null && message.hasOwnProperty("localizedImage")) {
            if (!Array.isArray(message.localizedImage))
              return "localizedImage: array expected";
            for (var i = 0; i < message.localizedImage.length; ++i) {
              var error = $root.transit_realtime.TranslatedImage.LocalizedImage.verify(message.localizedImage[i], _depth + 1);
              if (error)
                return "localizedImage." + error;
            }
          }
          return null;
        }, "verify");
        TranslatedImage.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.TranslatedImage)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.TranslatedImage();
          if (object.localizedImage) {
            if (!Array.isArray(object.localizedImage))
              throw TypeError(".transit_realtime.TranslatedImage.localizedImage: array expected");
            message.localizedImage = Array(object.localizedImage.length);
            for (var i = 0; i < object.localizedImage.length; ++i) {
              if (typeof object.localizedImage[i] !== "object")
                throw TypeError(".transit_realtime.TranslatedImage.localizedImage: object expected");
              message.localizedImage[i] = $root.transit_realtime.TranslatedImage.LocalizedImage.fromObject(object.localizedImage[i], _depth + 1);
            }
          }
          return message;
        }, "fromObject");
        TranslatedImage.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.arrays || options.defaults)
            object.localizedImage = [];
          if (message.localizedImage && message.localizedImage.length) {
            object.localizedImage = Array(message.localizedImage.length);
            for (var j = 0; j < message.localizedImage.length; ++j)
              object.localizedImage[j] = $root.transit_realtime.TranslatedImage.LocalizedImage.toObject(message.localizedImage[j], options);
          }
          return object;
        }, "toObject");
        TranslatedImage.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        TranslatedImage.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.TranslatedImage";
        }, "getTypeUrl");
        TranslatedImage.LocalizedImage = (function() {
          function LocalizedImage(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                  this[keys[i]] = properties[keys[i]];
            }
          }
          __name(LocalizedImage, "LocalizedImage");
          LocalizedImage.prototype.url = "";
          LocalizedImage.prototype.mediaType = "";
          LocalizedImage.prototype.language = "";
          LocalizedImage.create = /* @__PURE__ */ __name(function create(properties) {
            return new LocalizedImage(properties);
          }, "create");
          LocalizedImage.encode = /* @__PURE__ */ __name(function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            writer.uint32(
              /* id 1, wireType 2 =*/
              10
            ).string(message.url);
            writer.uint32(
              /* id 2, wireType 2 =*/
              18
            ).string(message.mediaType);
            if (message.language != null && Object.hasOwnProperty.call(message, "language"))
              writer.uint32(
                /* id 3, wireType 2 =*/
                26
              ).string(message.language);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
              for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
            return writer;
          }, "encode");
          LocalizedImage.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          }, "encodeDelimited");
          LocalizedImage.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $Reader.recursionLimit)
              throw Error("max depth exceeded");
            var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TranslatedImage.LocalizedImage();
            while (reader.pos < end) {
              var start = reader.pos;
              var tag = reader.tag();
              if (tag === _end) {
                _end = void 0;
                break;
              }
              var wireType = tag & 7;
              switch (tag >>>= 3) {
                case 1: {
                  if (wireType !== 2)
                    break;
                  message.url = reader.string();
                  continue;
                }
                case 2: {
                  if (wireType !== 2)
                    break;
                  message.mediaType = reader.string();
                  continue;
                }
                case 3: {
                  if (wireType !== 2)
                    break;
                  message.language = reader.string();
                  continue;
                }
              }
              reader.skipType(wireType, _depth, tag);
              $util.makeProp(message, "$unknowns", false);
              (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
            if (_end !== void 0)
              throw Error("missing end group");
            if (!message.hasOwnProperty("url"))
              throw $util.ProtocolError("missing required 'url'", { instance: message });
            if (!message.hasOwnProperty("mediaType"))
              throw $util.ProtocolError("missing required 'mediaType'", { instance: message });
            return message;
          }, "decode");
          LocalizedImage.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          }, "decodeDelimited");
          LocalizedImage.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              return "max depth exceeded";
            if (!$util.isString(message.url))
              return "url: string expected";
            if (!$util.isString(message.mediaType))
              return "mediaType: string expected";
            if (message.language != null && message.hasOwnProperty("language")) {
              if (!$util.isString(message.language))
                return "language: string expected";
            }
            return null;
          }, "verify");
          LocalizedImage.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
            if (object instanceof $root.transit_realtime.TranslatedImage.LocalizedImage)
              return object;
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              throw Error("max depth exceeded");
            var message = new $root.transit_realtime.TranslatedImage.LocalizedImage();
            if (object.url != null)
              message.url = String(object.url);
            if (object.mediaType != null)
              message.mediaType = String(object.mediaType);
            if (object.language != null)
              message.language = String(object.language);
            return message;
          }, "fromObject");
          LocalizedImage.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults) {
              object.url = "";
              object.mediaType = "";
              object.language = "";
            }
            if (message.url != null && message.hasOwnProperty("url"))
              object.url = message.url;
            if (message.mediaType != null && message.hasOwnProperty("mediaType"))
              object.mediaType = message.mediaType;
            if (message.language != null && message.hasOwnProperty("language"))
              object.language = message.language;
            return object;
          }, "toObject");
          LocalizedImage.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          }, "toJSON");
          LocalizedImage.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
            if (prefix === void 0)
              prefix = "type.googleapis.com";
            return prefix + "/transit_realtime.TranslatedImage.LocalizedImage";
          }, "getTypeUrl");
          return LocalizedImage;
        })();
        return TranslatedImage;
      })();
      transit_realtime.Shape = (function() {
        function Shape(properties) {
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(Shape, "Shape");
        Shape.prototype.shapeId = "";
        Shape.prototype.encodedPolyline = "";
        Shape.create = /* @__PURE__ */ __name(function create(properties) {
          return new Shape(properties);
        }, "create");
        Shape.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.shapeId != null && Object.hasOwnProperty.call(message, "shapeId"))
            writer.uint32(
              /* id 1, wireType 2 =*/
              10
            ).string(message.shapeId);
          if (message.encodedPolyline != null && Object.hasOwnProperty.call(message, "encodedPolyline"))
            writer.uint32(
              /* id 2, wireType 2 =*/
              18
            ).string(message.encodedPolyline);
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        Shape.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        Shape.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.Shape();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                message.shapeId = reader.string();
                continue;
              }
              case 2: {
                if (wireType !== 2)
                  break;
                message.encodedPolyline = reader.string();
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        Shape.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        Shape.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.shapeId != null && message.hasOwnProperty("shapeId")) {
            if (!$util.isString(message.shapeId))
              return "shapeId: string expected";
          }
          if (message.encodedPolyline != null && message.hasOwnProperty("encodedPolyline")) {
            if (!$util.isString(message.encodedPolyline))
              return "encodedPolyline: string expected";
          }
          return null;
        }, "verify");
        Shape.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.Shape)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.Shape();
          if (object.shapeId != null)
            message.shapeId = String(object.shapeId);
          if (object.encodedPolyline != null)
            message.encodedPolyline = String(object.encodedPolyline);
          return message;
        }, "fromObject");
        Shape.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.defaults) {
            object.shapeId = "";
            object.encodedPolyline = "";
          }
          if (message.shapeId != null && message.hasOwnProperty("shapeId"))
            object.shapeId = message.shapeId;
          if (message.encodedPolyline != null && message.hasOwnProperty("encodedPolyline"))
            object.encodedPolyline = message.encodedPolyline;
          return object;
        }, "toObject");
        Shape.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        Shape.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.Shape";
        }, "getTypeUrl");
        return Shape;
      })();
      transit_realtime.Stop = (function() {
        function Stop(properties) {
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(Stop, "Stop");
        Stop.prototype.stopId = "";
        Stop.prototype.stopCode = null;
        Stop.prototype.stopName = null;
        Stop.prototype.ttsStopName = null;
        Stop.prototype.stopDesc = null;
        Stop.prototype.stopLat = 0;
        Stop.prototype.stopLon = 0;
        Stop.prototype.zoneId = "";
        Stop.prototype.stopUrl = null;
        Stop.prototype.parentStation = "";
        Stop.prototype.stopTimezone = "";
        Stop.prototype.wheelchairBoarding = 0;
        Stop.prototype.levelId = "";
        Stop.prototype.platformCode = null;
        Stop.create = /* @__PURE__ */ __name(function create(properties) {
          return new Stop(properties);
        }, "create");
        Stop.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.stopId != null && Object.hasOwnProperty.call(message, "stopId"))
            writer.uint32(
              /* id 1, wireType 2 =*/
              10
            ).string(message.stopId);
          if (message.stopCode != null && Object.hasOwnProperty.call(message, "stopCode"))
            $root.transit_realtime.TranslatedString.encode(message.stopCode, writer.uint32(
              /* id 2, wireType 2 =*/
              18
            ).fork()).ldelim();
          if (message.stopName != null && Object.hasOwnProperty.call(message, "stopName"))
            $root.transit_realtime.TranslatedString.encode(message.stopName, writer.uint32(
              /* id 3, wireType 2 =*/
              26
            ).fork()).ldelim();
          if (message.ttsStopName != null && Object.hasOwnProperty.call(message, "ttsStopName"))
            $root.transit_realtime.TranslatedString.encode(message.ttsStopName, writer.uint32(
              /* id 4, wireType 2 =*/
              34
            ).fork()).ldelim();
          if (message.stopDesc != null && Object.hasOwnProperty.call(message, "stopDesc"))
            $root.transit_realtime.TranslatedString.encode(message.stopDesc, writer.uint32(
              /* id 5, wireType 2 =*/
              42
            ).fork()).ldelim();
          if (message.stopLat != null && Object.hasOwnProperty.call(message, "stopLat"))
            writer.uint32(
              /* id 6, wireType 5 =*/
              53
            ).float(message.stopLat);
          if (message.stopLon != null && Object.hasOwnProperty.call(message, "stopLon"))
            writer.uint32(
              /* id 7, wireType 5 =*/
              61
            ).float(message.stopLon);
          if (message.zoneId != null && Object.hasOwnProperty.call(message, "zoneId"))
            writer.uint32(
              /* id 8, wireType 2 =*/
              66
            ).string(message.zoneId);
          if (message.stopUrl != null && Object.hasOwnProperty.call(message, "stopUrl"))
            $root.transit_realtime.TranslatedString.encode(message.stopUrl, writer.uint32(
              /* id 9, wireType 2 =*/
              74
            ).fork()).ldelim();
          if (message.parentStation != null && Object.hasOwnProperty.call(message, "parentStation"))
            writer.uint32(
              /* id 11, wireType 2 =*/
              90
            ).string(message.parentStation);
          if (message.stopTimezone != null && Object.hasOwnProperty.call(message, "stopTimezone"))
            writer.uint32(
              /* id 12, wireType 2 =*/
              98
            ).string(message.stopTimezone);
          if (message.wheelchairBoarding != null && Object.hasOwnProperty.call(message, "wheelchairBoarding"))
            writer.uint32(
              /* id 13, wireType 0 =*/
              104
            ).int32(message.wheelchairBoarding);
          if (message.levelId != null && Object.hasOwnProperty.call(message, "levelId"))
            writer.uint32(
              /* id 14, wireType 2 =*/
              114
            ).string(message.levelId);
          if (message.platformCode != null && Object.hasOwnProperty.call(message, "platformCode"))
            $root.transit_realtime.TranslatedString.encode(message.platformCode, writer.uint32(
              /* id 15, wireType 2 =*/
              122
            ).fork()).ldelim();
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        Stop.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        Stop.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.Stop();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                message.stopId = reader.string();
                continue;
              }
              case 2: {
                if (wireType !== 2)
                  break;
                message.stopCode = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.stopCode);
                continue;
              }
              case 3: {
                if (wireType !== 2)
                  break;
                message.stopName = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.stopName);
                continue;
              }
              case 4: {
                if (wireType !== 2)
                  break;
                message.ttsStopName = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.ttsStopName);
                continue;
              }
              case 5: {
                if (wireType !== 2)
                  break;
                message.stopDesc = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.stopDesc);
                continue;
              }
              case 6: {
                if (wireType !== 5)
                  break;
                message.stopLat = reader.float();
                continue;
              }
              case 7: {
                if (wireType !== 5)
                  break;
                message.stopLon = reader.float();
                continue;
              }
              case 8: {
                if (wireType !== 2)
                  break;
                message.zoneId = reader.string();
                continue;
              }
              case 9: {
                if (wireType !== 2)
                  break;
                message.stopUrl = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.stopUrl);
                continue;
              }
              case 11: {
                if (wireType !== 2)
                  break;
                message.parentStation = reader.string();
                continue;
              }
              case 12: {
                if (wireType !== 2)
                  break;
                message.stopTimezone = reader.string();
                continue;
              }
              case 13: {
                if (wireType !== 0)
                  break;
                message.wheelchairBoarding = reader.int32();
                continue;
              }
              case 14: {
                if (wireType !== 2)
                  break;
                message.levelId = reader.string();
                continue;
              }
              case 15: {
                if (wireType !== 2)
                  break;
                message.platformCode = $root.transit_realtime.TranslatedString.decode(reader, reader.uint32(), void 0, _depth + 1, message.platformCode);
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        Stop.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        Stop.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.stopId != null && message.hasOwnProperty("stopId")) {
            if (!$util.isString(message.stopId))
              return "stopId: string expected";
          }
          if (message.stopCode != null && message.hasOwnProperty("stopCode")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.stopCode, _depth + 1);
            if (error)
              return "stopCode." + error;
          }
          if (message.stopName != null && message.hasOwnProperty("stopName")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.stopName, _depth + 1);
            if (error)
              return "stopName." + error;
          }
          if (message.ttsStopName != null && message.hasOwnProperty("ttsStopName")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.ttsStopName, _depth + 1);
            if (error)
              return "ttsStopName." + error;
          }
          if (message.stopDesc != null && message.hasOwnProperty("stopDesc")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.stopDesc, _depth + 1);
            if (error)
              return "stopDesc." + error;
          }
          if (message.stopLat != null && message.hasOwnProperty("stopLat")) {
            if (typeof message.stopLat !== "number")
              return "stopLat: number expected";
          }
          if (message.stopLon != null && message.hasOwnProperty("stopLon")) {
            if (typeof message.stopLon !== "number")
              return "stopLon: number expected";
          }
          if (message.zoneId != null && message.hasOwnProperty("zoneId")) {
            if (!$util.isString(message.zoneId))
              return "zoneId: string expected";
          }
          if (message.stopUrl != null && message.hasOwnProperty("stopUrl")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.stopUrl, _depth + 1);
            if (error)
              return "stopUrl." + error;
          }
          if (message.parentStation != null && message.hasOwnProperty("parentStation")) {
            if (!$util.isString(message.parentStation))
              return "parentStation: string expected";
          }
          if (message.stopTimezone != null && message.hasOwnProperty("stopTimezone")) {
            if (!$util.isString(message.stopTimezone))
              return "stopTimezone: string expected";
          }
          if (message.wheelchairBoarding != null && message.hasOwnProperty("wheelchairBoarding"))
            switch (message.wheelchairBoarding) {
              default:
                return "wheelchairBoarding: enum value expected";
              case 0:
              case 1:
              case 2:
                break;
            }
          if (message.levelId != null && message.hasOwnProperty("levelId")) {
            if (!$util.isString(message.levelId))
              return "levelId: string expected";
          }
          if (message.platformCode != null && message.hasOwnProperty("platformCode")) {
            var error = $root.transit_realtime.TranslatedString.verify(message.platformCode, _depth + 1);
            if (error)
              return "platformCode." + error;
          }
          return null;
        }, "verify");
        Stop.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.Stop)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.Stop();
          if (object.stopId != null)
            message.stopId = String(object.stopId);
          if (object.stopCode != null) {
            if (typeof object.stopCode !== "object")
              throw TypeError(".transit_realtime.Stop.stopCode: object expected");
            message.stopCode = $root.transit_realtime.TranslatedString.fromObject(object.stopCode, _depth + 1);
          }
          if (object.stopName != null) {
            if (typeof object.stopName !== "object")
              throw TypeError(".transit_realtime.Stop.stopName: object expected");
            message.stopName = $root.transit_realtime.TranslatedString.fromObject(object.stopName, _depth + 1);
          }
          if (object.ttsStopName != null) {
            if (typeof object.ttsStopName !== "object")
              throw TypeError(".transit_realtime.Stop.ttsStopName: object expected");
            message.ttsStopName = $root.transit_realtime.TranslatedString.fromObject(object.ttsStopName, _depth + 1);
          }
          if (object.stopDesc != null) {
            if (typeof object.stopDesc !== "object")
              throw TypeError(".transit_realtime.Stop.stopDesc: object expected");
            message.stopDesc = $root.transit_realtime.TranslatedString.fromObject(object.stopDesc, _depth + 1);
          }
          if (object.stopLat != null)
            message.stopLat = Number(object.stopLat);
          if (object.stopLon != null)
            message.stopLon = Number(object.stopLon);
          if (object.zoneId != null)
            message.zoneId = String(object.zoneId);
          if (object.stopUrl != null) {
            if (typeof object.stopUrl !== "object")
              throw TypeError(".transit_realtime.Stop.stopUrl: object expected");
            message.stopUrl = $root.transit_realtime.TranslatedString.fromObject(object.stopUrl, _depth + 1);
          }
          if (object.parentStation != null)
            message.parentStation = String(object.parentStation);
          if (object.stopTimezone != null)
            message.stopTimezone = String(object.stopTimezone);
          switch (object.wheelchairBoarding) {
            default:
              if (typeof object.wheelchairBoarding === "number") {
                message.wheelchairBoarding = object.wheelchairBoarding;
                break;
              }
              break;
            case "UNKNOWN":
            case 0:
              message.wheelchairBoarding = 0;
              break;
            case "AVAILABLE":
            case 1:
              message.wheelchairBoarding = 1;
              break;
            case "NOT_AVAILABLE":
            case 2:
              message.wheelchairBoarding = 2;
              break;
          }
          if (object.levelId != null)
            message.levelId = String(object.levelId);
          if (object.platformCode != null) {
            if (typeof object.platformCode !== "object")
              throw TypeError(".transit_realtime.Stop.platformCode: object expected");
            message.platformCode = $root.transit_realtime.TranslatedString.fromObject(object.platformCode, _depth + 1);
          }
          return message;
        }, "fromObject");
        Stop.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.defaults) {
            object.stopId = "";
            object.stopCode = null;
            object.stopName = null;
            object.ttsStopName = null;
            object.stopDesc = null;
            object.stopLat = 0;
            object.stopLon = 0;
            object.zoneId = "";
            object.stopUrl = null;
            object.parentStation = "";
            object.stopTimezone = "";
            object.wheelchairBoarding = options.enums === String ? "UNKNOWN" : 0;
            object.levelId = "";
            object.platformCode = null;
          }
          if (message.stopId != null && message.hasOwnProperty("stopId"))
            object.stopId = message.stopId;
          if (message.stopCode != null && message.hasOwnProperty("stopCode"))
            object.stopCode = $root.transit_realtime.TranslatedString.toObject(message.stopCode, options);
          if (message.stopName != null && message.hasOwnProperty("stopName"))
            object.stopName = $root.transit_realtime.TranslatedString.toObject(message.stopName, options);
          if (message.ttsStopName != null && message.hasOwnProperty("ttsStopName"))
            object.ttsStopName = $root.transit_realtime.TranslatedString.toObject(message.ttsStopName, options);
          if (message.stopDesc != null && message.hasOwnProperty("stopDesc"))
            object.stopDesc = $root.transit_realtime.TranslatedString.toObject(message.stopDesc, options);
          if (message.stopLat != null && message.hasOwnProperty("stopLat"))
            object.stopLat = options.json && !isFinite(message.stopLat) ? String(message.stopLat) : message.stopLat;
          if (message.stopLon != null && message.hasOwnProperty("stopLon"))
            object.stopLon = options.json && !isFinite(message.stopLon) ? String(message.stopLon) : message.stopLon;
          if (message.zoneId != null && message.hasOwnProperty("zoneId"))
            object.zoneId = message.zoneId;
          if (message.stopUrl != null && message.hasOwnProperty("stopUrl"))
            object.stopUrl = $root.transit_realtime.TranslatedString.toObject(message.stopUrl, options);
          if (message.parentStation != null && message.hasOwnProperty("parentStation"))
            object.parentStation = message.parentStation;
          if (message.stopTimezone != null && message.hasOwnProperty("stopTimezone"))
            object.stopTimezone = message.stopTimezone;
          if (message.wheelchairBoarding != null && message.hasOwnProperty("wheelchairBoarding"))
            object.wheelchairBoarding = options.enums === String ? $root.transit_realtime.Stop.WheelchairBoarding[message.wheelchairBoarding] === void 0 ? message.wheelchairBoarding : $root.transit_realtime.Stop.WheelchairBoarding[message.wheelchairBoarding] : message.wheelchairBoarding;
          if (message.levelId != null && message.hasOwnProperty("levelId"))
            object.levelId = message.levelId;
          if (message.platformCode != null && message.hasOwnProperty("platformCode"))
            object.platformCode = $root.transit_realtime.TranslatedString.toObject(message.platformCode, options);
          return object;
        }, "toObject");
        Stop.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        Stop.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.Stop";
        }, "getTypeUrl");
        Stop.WheelchairBoarding = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "UNKNOWN"] = 0;
          values[valuesById[1] = "AVAILABLE"] = 1;
          values[valuesById[2] = "NOT_AVAILABLE"] = 2;
          return values;
        })();
        return Stop;
      })();
      transit_realtime.TripModifications = (function() {
        function TripModifications(properties) {
          this.selectedTrips = [];
          this.startTimes = [];
          this.serviceDates = [];
          this.modifications = [];
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(TripModifications, "TripModifications");
        TripModifications.prototype.selectedTrips = $util.emptyArray;
        TripModifications.prototype.startTimes = $util.emptyArray;
        TripModifications.prototype.serviceDates = $util.emptyArray;
        TripModifications.prototype.modifications = $util.emptyArray;
        TripModifications.create = /* @__PURE__ */ __name(function create(properties) {
          return new TripModifications(properties);
        }, "create");
        TripModifications.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.selectedTrips != null && message.selectedTrips.length)
            for (var i = 0; i < message.selectedTrips.length; ++i)
              $root.transit_realtime.TripModifications.SelectedTrips.encode(message.selectedTrips[i], writer.uint32(
                /* id 1, wireType 2 =*/
                10
              ).fork()).ldelim();
          if (message.startTimes != null && message.startTimes.length)
            for (var i = 0; i < message.startTimes.length; ++i)
              writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).string(message.startTimes[i]);
          if (message.serviceDates != null && message.serviceDates.length)
            for (var i = 0; i < message.serviceDates.length; ++i)
              writer.uint32(
                /* id 3, wireType 2 =*/
                26
              ).string(message.serviceDates[i]);
          if (message.modifications != null && message.modifications.length)
            for (var i = 0; i < message.modifications.length; ++i)
              $root.transit_realtime.TripModifications.Modification.encode(message.modifications[i], writer.uint32(
                /* id 4, wireType 2 =*/
                34
              ).fork()).ldelim();
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        TripModifications.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        TripModifications.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TripModifications();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 2)
                  break;
                if (!(message.selectedTrips && message.selectedTrips.length))
                  message.selectedTrips = [];
                message.selectedTrips.push($root.transit_realtime.TripModifications.SelectedTrips.decode(reader, reader.uint32(), void 0, _depth + 1));
                continue;
              }
              case 2: {
                if (wireType !== 2)
                  break;
                if (!(message.startTimes && message.startTimes.length))
                  message.startTimes = [];
                message.startTimes.push(reader.string());
                continue;
              }
              case 3: {
                if (wireType !== 2)
                  break;
                if (!(message.serviceDates && message.serviceDates.length))
                  message.serviceDates = [];
                message.serviceDates.push(reader.string());
                continue;
              }
              case 4: {
                if (wireType !== 2)
                  break;
                if (!(message.modifications && message.modifications.length))
                  message.modifications = [];
                message.modifications.push($root.transit_realtime.TripModifications.Modification.decode(reader, reader.uint32(), void 0, _depth + 1));
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        TripModifications.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        TripModifications.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.selectedTrips != null && message.hasOwnProperty("selectedTrips")) {
            if (!Array.isArray(message.selectedTrips))
              return "selectedTrips: array expected";
            for (var i = 0; i < message.selectedTrips.length; ++i) {
              var error = $root.transit_realtime.TripModifications.SelectedTrips.verify(message.selectedTrips[i], _depth + 1);
              if (error)
                return "selectedTrips." + error;
            }
          }
          if (message.startTimes != null && message.hasOwnProperty("startTimes")) {
            if (!Array.isArray(message.startTimes))
              return "startTimes: array expected";
            for (var i = 0; i < message.startTimes.length; ++i)
              if (!$util.isString(message.startTimes[i]))
                return "startTimes: string[] expected";
          }
          if (message.serviceDates != null && message.hasOwnProperty("serviceDates")) {
            if (!Array.isArray(message.serviceDates))
              return "serviceDates: array expected";
            for (var i = 0; i < message.serviceDates.length; ++i)
              if (!$util.isString(message.serviceDates[i]))
                return "serviceDates: string[] expected";
          }
          if (message.modifications != null && message.hasOwnProperty("modifications")) {
            if (!Array.isArray(message.modifications))
              return "modifications: array expected";
            for (var i = 0; i < message.modifications.length; ++i) {
              var error = $root.transit_realtime.TripModifications.Modification.verify(message.modifications[i], _depth + 1);
              if (error)
                return "modifications." + error;
            }
          }
          return null;
        }, "verify");
        TripModifications.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.TripModifications)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.TripModifications();
          if (object.selectedTrips) {
            if (!Array.isArray(object.selectedTrips))
              throw TypeError(".transit_realtime.TripModifications.selectedTrips: array expected");
            message.selectedTrips = Array(object.selectedTrips.length);
            for (var i = 0; i < object.selectedTrips.length; ++i) {
              if (typeof object.selectedTrips[i] !== "object")
                throw TypeError(".transit_realtime.TripModifications.selectedTrips: object expected");
              message.selectedTrips[i] = $root.transit_realtime.TripModifications.SelectedTrips.fromObject(object.selectedTrips[i], _depth + 1);
            }
          }
          if (object.startTimes) {
            if (!Array.isArray(object.startTimes))
              throw TypeError(".transit_realtime.TripModifications.startTimes: array expected");
            message.startTimes = Array(object.startTimes.length);
            for (var i = 0; i < object.startTimes.length; ++i)
              message.startTimes[i] = String(object.startTimes[i]);
          }
          if (object.serviceDates) {
            if (!Array.isArray(object.serviceDates))
              throw TypeError(".transit_realtime.TripModifications.serviceDates: array expected");
            message.serviceDates = Array(object.serviceDates.length);
            for (var i = 0; i < object.serviceDates.length; ++i)
              message.serviceDates[i] = String(object.serviceDates[i]);
          }
          if (object.modifications) {
            if (!Array.isArray(object.modifications))
              throw TypeError(".transit_realtime.TripModifications.modifications: array expected");
            message.modifications = Array(object.modifications.length);
            for (var i = 0; i < object.modifications.length; ++i) {
              if (typeof object.modifications[i] !== "object")
                throw TypeError(".transit_realtime.TripModifications.modifications: object expected");
              message.modifications[i] = $root.transit_realtime.TripModifications.Modification.fromObject(object.modifications[i], _depth + 1);
            }
          }
          return message;
        }, "fromObject");
        TripModifications.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.arrays || options.defaults) {
            object.selectedTrips = [];
            object.startTimes = [];
            object.serviceDates = [];
            object.modifications = [];
          }
          if (message.selectedTrips && message.selectedTrips.length) {
            object.selectedTrips = Array(message.selectedTrips.length);
            for (var j = 0; j < message.selectedTrips.length; ++j)
              object.selectedTrips[j] = $root.transit_realtime.TripModifications.SelectedTrips.toObject(message.selectedTrips[j], options);
          }
          if (message.startTimes && message.startTimes.length) {
            object.startTimes = Array(message.startTimes.length);
            for (var j = 0; j < message.startTimes.length; ++j)
              object.startTimes[j] = message.startTimes[j];
          }
          if (message.serviceDates && message.serviceDates.length) {
            object.serviceDates = Array(message.serviceDates.length);
            for (var j = 0; j < message.serviceDates.length; ++j)
              object.serviceDates[j] = message.serviceDates[j];
          }
          if (message.modifications && message.modifications.length) {
            object.modifications = Array(message.modifications.length);
            for (var j = 0; j < message.modifications.length; ++j)
              object.modifications[j] = $root.transit_realtime.TripModifications.Modification.toObject(message.modifications[j], options);
          }
          return object;
        }, "toObject");
        TripModifications.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        TripModifications.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.TripModifications";
        }, "getTypeUrl");
        TripModifications.Modification = (function() {
          function Modification(properties) {
            this.replacementStops = [];
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                  this[keys[i]] = properties[keys[i]];
            }
          }
          __name(Modification, "Modification");
          Modification.prototype.startStopSelector = null;
          Modification.prototype.endStopSelector = null;
          Modification.prototype.propagatedModificationDelay = 0;
          Modification.prototype.replacementStops = $util.emptyArray;
          Modification.prototype.serviceAlertId = "";
          Modification.prototype.lastModifiedTime = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
          Modification.create = /* @__PURE__ */ __name(function create(properties) {
            return new Modification(properties);
          }, "create");
          Modification.encode = /* @__PURE__ */ __name(function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.startStopSelector != null && Object.hasOwnProperty.call(message, "startStopSelector"))
              $root.transit_realtime.StopSelector.encode(message.startStopSelector, writer.uint32(
                /* id 1, wireType 2 =*/
                10
              ).fork()).ldelim();
            if (message.endStopSelector != null && Object.hasOwnProperty.call(message, "endStopSelector"))
              $root.transit_realtime.StopSelector.encode(message.endStopSelector, writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).fork()).ldelim();
            if (message.propagatedModificationDelay != null && Object.hasOwnProperty.call(message, "propagatedModificationDelay"))
              writer.uint32(
                /* id 3, wireType 0 =*/
                24
              ).int32(message.propagatedModificationDelay);
            if (message.replacementStops != null && message.replacementStops.length)
              for (var i = 0; i < message.replacementStops.length; ++i)
                $root.transit_realtime.ReplacementStop.encode(message.replacementStops[i], writer.uint32(
                  /* id 4, wireType 2 =*/
                  34
                ).fork()).ldelim();
            if (message.serviceAlertId != null && Object.hasOwnProperty.call(message, "serviceAlertId"))
              writer.uint32(
                /* id 5, wireType 2 =*/
                42
              ).string(message.serviceAlertId);
            if (message.lastModifiedTime != null && Object.hasOwnProperty.call(message, "lastModifiedTime"))
              writer.uint32(
                /* id 6, wireType 0 =*/
                48
              ).uint64(message.lastModifiedTime);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
              for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
            return writer;
          }, "encode");
          Modification.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          }, "encodeDelimited");
          Modification.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $Reader.recursionLimit)
              throw Error("max depth exceeded");
            var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TripModifications.Modification();
            while (reader.pos < end) {
              var start = reader.pos;
              var tag = reader.tag();
              if (tag === _end) {
                _end = void 0;
                break;
              }
              var wireType = tag & 7;
              switch (tag >>>= 3) {
                case 1: {
                  if (wireType !== 2)
                    break;
                  message.startStopSelector = $root.transit_realtime.StopSelector.decode(reader, reader.uint32(), void 0, _depth + 1, message.startStopSelector);
                  continue;
                }
                case 2: {
                  if (wireType !== 2)
                    break;
                  message.endStopSelector = $root.transit_realtime.StopSelector.decode(reader, reader.uint32(), void 0, _depth + 1, message.endStopSelector);
                  continue;
                }
                case 3: {
                  if (wireType !== 0)
                    break;
                  message.propagatedModificationDelay = reader.int32();
                  continue;
                }
                case 4: {
                  if (wireType !== 2)
                    break;
                  if (!(message.replacementStops && message.replacementStops.length))
                    message.replacementStops = [];
                  message.replacementStops.push($root.transit_realtime.ReplacementStop.decode(reader, reader.uint32(), void 0, _depth + 1));
                  continue;
                }
                case 5: {
                  if (wireType !== 2)
                    break;
                  message.serviceAlertId = reader.string();
                  continue;
                }
                case 6: {
                  if (wireType !== 0)
                    break;
                  message.lastModifiedTime = reader.uint64();
                  continue;
                }
              }
              reader.skipType(wireType, _depth, tag);
              $util.makeProp(message, "$unknowns", false);
              (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
            if (_end !== void 0)
              throw Error("missing end group");
            return message;
          }, "decode");
          Modification.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          }, "decodeDelimited");
          Modification.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              return "max depth exceeded";
            if (message.startStopSelector != null && message.hasOwnProperty("startStopSelector")) {
              var error = $root.transit_realtime.StopSelector.verify(message.startStopSelector, _depth + 1);
              if (error)
                return "startStopSelector." + error;
            }
            if (message.endStopSelector != null && message.hasOwnProperty("endStopSelector")) {
              var error = $root.transit_realtime.StopSelector.verify(message.endStopSelector, _depth + 1);
              if (error)
                return "endStopSelector." + error;
            }
            if (message.propagatedModificationDelay != null && message.hasOwnProperty("propagatedModificationDelay")) {
              if (!$util.isInteger(message.propagatedModificationDelay))
                return "propagatedModificationDelay: integer expected";
            }
            if (message.replacementStops != null && message.hasOwnProperty("replacementStops")) {
              if (!Array.isArray(message.replacementStops))
                return "replacementStops: array expected";
              for (var i = 0; i < message.replacementStops.length; ++i) {
                var error = $root.transit_realtime.ReplacementStop.verify(message.replacementStops[i], _depth + 1);
                if (error)
                  return "replacementStops." + error;
              }
            }
            if (message.serviceAlertId != null && message.hasOwnProperty("serviceAlertId")) {
              if (!$util.isString(message.serviceAlertId))
                return "serviceAlertId: string expected";
            }
            if (message.lastModifiedTime != null && message.hasOwnProperty("lastModifiedTime")) {
              if (!$util.isInteger(message.lastModifiedTime) && !(message.lastModifiedTime && $util.isInteger(message.lastModifiedTime.low) && $util.isInteger(message.lastModifiedTime.high)))
                return "lastModifiedTime: integer|Long expected";
            }
            return null;
          }, "verify");
          Modification.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
            if (object instanceof $root.transit_realtime.TripModifications.Modification)
              return object;
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              throw Error("max depth exceeded");
            var message = new $root.transit_realtime.TripModifications.Modification();
            if (object.startStopSelector != null) {
              if (typeof object.startStopSelector !== "object")
                throw TypeError(".transit_realtime.TripModifications.Modification.startStopSelector: object expected");
              message.startStopSelector = $root.transit_realtime.StopSelector.fromObject(object.startStopSelector, _depth + 1);
            }
            if (object.endStopSelector != null) {
              if (typeof object.endStopSelector !== "object")
                throw TypeError(".transit_realtime.TripModifications.Modification.endStopSelector: object expected");
              message.endStopSelector = $root.transit_realtime.StopSelector.fromObject(object.endStopSelector, _depth + 1);
            }
            if (object.propagatedModificationDelay != null)
              message.propagatedModificationDelay = object.propagatedModificationDelay | 0;
            if (object.replacementStops) {
              if (!Array.isArray(object.replacementStops))
                throw TypeError(".transit_realtime.TripModifications.Modification.replacementStops: array expected");
              message.replacementStops = Array(object.replacementStops.length);
              for (var i = 0; i < object.replacementStops.length; ++i) {
                if (typeof object.replacementStops[i] !== "object")
                  throw TypeError(".transit_realtime.TripModifications.Modification.replacementStops: object expected");
                message.replacementStops[i] = $root.transit_realtime.ReplacementStop.fromObject(object.replacementStops[i], _depth + 1);
              }
            }
            if (object.serviceAlertId != null)
              message.serviceAlertId = String(object.serviceAlertId);
            if (object.lastModifiedTime != null) {
              if ($util.Long)
                (message.lastModifiedTime = $util.Long.fromValue(object.lastModifiedTime)).unsigned = true;
              else if (typeof object.lastModifiedTime === "string")
                message.lastModifiedTime = parseInt(object.lastModifiedTime, 10);
              else if (typeof object.lastModifiedTime === "number")
                message.lastModifiedTime = object.lastModifiedTime;
              else if (typeof object.lastModifiedTime === "object")
                message.lastModifiedTime = new $util.LongBits(object.lastModifiedTime.low >>> 0, object.lastModifiedTime.high >>> 0).toNumber(true);
            }
            return message;
          }, "fromObject");
          Modification.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.arrays || options.defaults)
              object.replacementStops = [];
            if (options.defaults) {
              object.startStopSelector = null;
              object.endStopSelector = null;
              object.propagatedModificationDelay = 0;
              object.serviceAlertId = "";
              if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.lastModifiedTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
              } else
                object.lastModifiedTime = options.longs === String ? "0" : 0;
            }
            if (message.startStopSelector != null && message.hasOwnProperty("startStopSelector"))
              object.startStopSelector = $root.transit_realtime.StopSelector.toObject(message.startStopSelector, options);
            if (message.endStopSelector != null && message.hasOwnProperty("endStopSelector"))
              object.endStopSelector = $root.transit_realtime.StopSelector.toObject(message.endStopSelector, options);
            if (message.propagatedModificationDelay != null && message.hasOwnProperty("propagatedModificationDelay"))
              object.propagatedModificationDelay = message.propagatedModificationDelay;
            if (message.replacementStops && message.replacementStops.length) {
              object.replacementStops = Array(message.replacementStops.length);
              for (var j = 0; j < message.replacementStops.length; ++j)
                object.replacementStops[j] = $root.transit_realtime.ReplacementStop.toObject(message.replacementStops[j], options);
            }
            if (message.serviceAlertId != null && message.hasOwnProperty("serviceAlertId"))
              object.serviceAlertId = message.serviceAlertId;
            if (message.lastModifiedTime != null && message.hasOwnProperty("lastModifiedTime"))
              if (typeof message.lastModifiedTime === "number")
                object.lastModifiedTime = options.longs === String ? String(message.lastModifiedTime) : message.lastModifiedTime;
              else
                object.lastModifiedTime = options.longs === String ? $util.Long.prototype.toString.call(message.lastModifiedTime) : options.longs === Number ? new $util.LongBits(message.lastModifiedTime.low >>> 0, message.lastModifiedTime.high >>> 0).toNumber(true) : message.lastModifiedTime;
            return object;
          }, "toObject");
          Modification.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          }, "toJSON");
          Modification.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
            if (prefix === void 0)
              prefix = "type.googleapis.com";
            return prefix + "/transit_realtime.TripModifications.Modification";
          }, "getTypeUrl");
          return Modification;
        })();
        TripModifications.SelectedTrips = (function() {
          function SelectedTrips(properties) {
            this.tripIds = [];
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                  this[keys[i]] = properties[keys[i]];
            }
          }
          __name(SelectedTrips, "SelectedTrips");
          SelectedTrips.prototype.tripIds = $util.emptyArray;
          SelectedTrips.prototype.shapeId = "";
          SelectedTrips.create = /* @__PURE__ */ __name(function create(properties) {
            return new SelectedTrips(properties);
          }, "create");
          SelectedTrips.encode = /* @__PURE__ */ __name(function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.tripIds != null && message.tripIds.length)
              for (var i = 0; i < message.tripIds.length; ++i)
                writer.uint32(
                  /* id 1, wireType 2 =*/
                  10
                ).string(message.tripIds[i]);
            if (message.shapeId != null && Object.hasOwnProperty.call(message, "shapeId"))
              writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).string(message.shapeId);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
              for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
            return writer;
          }, "encode");
          SelectedTrips.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          }, "encodeDelimited");
          SelectedTrips.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $Reader.recursionLimit)
              throw Error("max depth exceeded");
            var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.TripModifications.SelectedTrips();
            while (reader.pos < end) {
              var start = reader.pos;
              var tag = reader.tag();
              if (tag === _end) {
                _end = void 0;
                break;
              }
              var wireType = tag & 7;
              switch (tag >>>= 3) {
                case 1: {
                  if (wireType !== 2)
                    break;
                  if (!(message.tripIds && message.tripIds.length))
                    message.tripIds = [];
                  message.tripIds.push(reader.string());
                  continue;
                }
                case 2: {
                  if (wireType !== 2)
                    break;
                  message.shapeId = reader.string();
                  continue;
                }
              }
              reader.skipType(wireType, _depth, tag);
              $util.makeProp(message, "$unknowns", false);
              (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
            if (_end !== void 0)
              throw Error("missing end group");
            return message;
          }, "decode");
          SelectedTrips.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          }, "decodeDelimited");
          SelectedTrips.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              return "max depth exceeded";
            if (message.tripIds != null && message.hasOwnProperty("tripIds")) {
              if (!Array.isArray(message.tripIds))
                return "tripIds: array expected";
              for (var i = 0; i < message.tripIds.length; ++i)
                if (!$util.isString(message.tripIds[i]))
                  return "tripIds: string[] expected";
            }
            if (message.shapeId != null && message.hasOwnProperty("shapeId")) {
              if (!$util.isString(message.shapeId))
                return "shapeId: string expected";
            }
            return null;
          }, "verify");
          SelectedTrips.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
            if (object instanceof $root.transit_realtime.TripModifications.SelectedTrips)
              return object;
            if (_depth === void 0)
              _depth = 0;
            if (_depth > $util.recursionLimit)
              throw Error("max depth exceeded");
            var message = new $root.transit_realtime.TripModifications.SelectedTrips();
            if (object.tripIds) {
              if (!Array.isArray(object.tripIds))
                throw TypeError(".transit_realtime.TripModifications.SelectedTrips.tripIds: array expected");
              message.tripIds = Array(object.tripIds.length);
              for (var i = 0; i < object.tripIds.length; ++i)
                message.tripIds[i] = String(object.tripIds[i]);
            }
            if (object.shapeId != null)
              message.shapeId = String(object.shapeId);
            return message;
          }, "fromObject");
          SelectedTrips.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.arrays || options.defaults)
              object.tripIds = [];
            if (options.defaults)
              object.shapeId = "";
            if (message.tripIds && message.tripIds.length) {
              object.tripIds = Array(message.tripIds.length);
              for (var j = 0; j < message.tripIds.length; ++j)
                object.tripIds[j] = message.tripIds[j];
            }
            if (message.shapeId != null && message.hasOwnProperty("shapeId"))
              object.shapeId = message.shapeId;
            return object;
          }, "toObject");
          SelectedTrips.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          }, "toJSON");
          SelectedTrips.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
            if (prefix === void 0)
              prefix = "type.googleapis.com";
            return prefix + "/transit_realtime.TripModifications.SelectedTrips";
          }, "getTypeUrl");
          return SelectedTrips;
        })();
        return TripModifications;
      })();
      transit_realtime.StopSelector = (function() {
        function StopSelector(properties) {
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(StopSelector, "StopSelector");
        StopSelector.prototype.stopSequence = 0;
        StopSelector.prototype.stopId = "";
        StopSelector.create = /* @__PURE__ */ __name(function create(properties) {
          return new StopSelector(properties);
        }, "create");
        StopSelector.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.stopSequence != null && Object.hasOwnProperty.call(message, "stopSequence"))
            writer.uint32(
              /* id 1, wireType 0 =*/
              8
            ).uint32(message.stopSequence);
          if (message.stopId != null && Object.hasOwnProperty.call(message, "stopId"))
            writer.uint32(
              /* id 2, wireType 2 =*/
              18
            ).string(message.stopId);
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        StopSelector.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        StopSelector.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.StopSelector();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 0)
                  break;
                message.stopSequence = reader.uint32();
                continue;
              }
              case 2: {
                if (wireType !== 2)
                  break;
                message.stopId = reader.string();
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        StopSelector.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        StopSelector.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.stopSequence != null && message.hasOwnProperty("stopSequence")) {
            if (!$util.isInteger(message.stopSequence))
              return "stopSequence: integer expected";
          }
          if (message.stopId != null && message.hasOwnProperty("stopId")) {
            if (!$util.isString(message.stopId))
              return "stopId: string expected";
          }
          return null;
        }, "verify");
        StopSelector.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.StopSelector)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.StopSelector();
          if (object.stopSequence != null)
            message.stopSequence = object.stopSequence >>> 0;
          if (object.stopId != null)
            message.stopId = String(object.stopId);
          return message;
        }, "fromObject");
        StopSelector.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.defaults) {
            object.stopSequence = 0;
            object.stopId = "";
          }
          if (message.stopSequence != null && message.hasOwnProperty("stopSequence"))
            object.stopSequence = message.stopSequence;
          if (message.stopId != null && message.hasOwnProperty("stopId"))
            object.stopId = message.stopId;
          return object;
        }, "toObject");
        StopSelector.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        StopSelector.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.StopSelector";
        }, "getTypeUrl");
        return StopSelector;
      })();
      transit_realtime.ReplacementStop = (function() {
        function ReplacementStop(properties) {
          if (properties) {
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null && keys[i] !== "__proto__")
                this[keys[i]] = properties[keys[i]];
          }
        }
        __name(ReplacementStop, "ReplacementStop");
        ReplacementStop.prototype.travelTimeToStop = 0;
        ReplacementStop.prototype.stopId = "";
        ReplacementStop.create = /* @__PURE__ */ __name(function create(properties) {
          return new ReplacementStop(properties);
        }, "create");
        ReplacementStop.encode = /* @__PURE__ */ __name(function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.travelTimeToStop != null && Object.hasOwnProperty.call(message, "travelTimeToStop"))
            writer.uint32(
              /* id 1, wireType 0 =*/
              8
            ).int32(message.travelTimeToStop);
          if (message.stopId != null && Object.hasOwnProperty.call(message, "stopId"))
            writer.uint32(
              /* id 2, wireType 2 =*/
              18
            ).string(message.stopId);
          if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
              writer.raw(message.$unknowns[i]);
          return writer;
        }, "encode");
        ReplacementStop.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        }, "encodeDelimited");
        ReplacementStop.decode = /* @__PURE__ */ __name(function decode(reader, length, _end, _depth, _target) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
          var end = length === void 0 ? reader.len : reader.pos + length, message = _target || new $root.transit_realtime.ReplacementStop();
          while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
              _end = void 0;
              break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
              case 1: {
                if (wireType !== 0)
                  break;
                message.travelTimeToStop = reader.int32();
                continue;
              }
              case 2: {
                if (wireType !== 2)
                  break;
                message.stopId = reader.string();
                continue;
              }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
          }
          if (_end !== void 0)
            throw Error("missing end group");
          return message;
        }, "decode");
        ReplacementStop.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        }, "decodeDelimited");
        ReplacementStop.verify = /* @__PURE__ */ __name(function verify(message, _depth) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            return "max depth exceeded";
          if (message.travelTimeToStop != null && message.hasOwnProperty("travelTimeToStop")) {
            if (!$util.isInteger(message.travelTimeToStop))
              return "travelTimeToStop: integer expected";
          }
          if (message.stopId != null && message.hasOwnProperty("stopId")) {
            if (!$util.isString(message.stopId))
              return "stopId: string expected";
          }
          return null;
        }, "verify");
        ReplacementStop.fromObject = /* @__PURE__ */ __name(function fromObject(object, _depth) {
          if (object instanceof $root.transit_realtime.ReplacementStop)
            return object;
          if (_depth === void 0)
            _depth = 0;
          if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
          var message = new $root.transit_realtime.ReplacementStop();
          if (object.travelTimeToStop != null)
            message.travelTimeToStop = object.travelTimeToStop | 0;
          if (object.stopId != null)
            message.stopId = String(object.stopId);
          return message;
        }, "fromObject");
        ReplacementStop.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
          if (!options)
            options = {};
          var object = {};
          if (options.defaults) {
            object.travelTimeToStop = 0;
            object.stopId = "";
          }
          if (message.travelTimeToStop != null && message.hasOwnProperty("travelTimeToStop"))
            object.travelTimeToStop = message.travelTimeToStop;
          if (message.stopId != null && message.hasOwnProperty("stopId"))
            object.stopId = message.stopId;
          return object;
        }, "toObject");
        ReplacementStop.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        }, "toJSON");
        ReplacementStop.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(prefix) {
          if (prefix === void 0)
            prefix = "type.googleapis.com";
          return prefix + "/transit_realtime.ReplacementStop";
        }, "getTypeUrl");
        return ReplacementStop;
      })();
      return transit_realtime;
    })();
    module.exports = $root;
  }
});

// src/index.js
var import_gtfs_realtime_bindings = __toESM(require_gtfs_realtime());
var stopNameMap = {
  "100001-01": "\u5357\u5927\u901A\u308A\u3010\u671D\u971E\u8B66\u5BDF\u7F72\u3011",
  "100001-02": "\u5357\u5927\u901A\u308A\u3010\u671D\u971E\u8B66\u5BDF\u7F72\u3011",
  "100002-01": "\u4E0A\u306E\u539F",
  "100002-02": "\u4E0A\u306E\u539F",
  "100003-01-03": "\u5E78\u753A\u4E09\u4E01\u76EE\u4EA4\u5DEE\u70B9\uFF08\u671D\u971E\u5E02\uFF09",
  "100003-02-04": "\u5E78\u753A\u4E09\u4E01\u76EE\u4EA4\u5DEE\u70B9\uFF08\u671D\u971E\u5E02\uFF09",
  "100004-01": "\u7DD1\u30F6\u4E18",
  "100004-02": "\u7DD1\u30F6\u4E18",
  "100005-01": "\u9752\u8449\u53F0\u516C\u5712",
  "100005-02": "\u9752\u8449\u53F0\u516C\u5712",
  "100010-01": "\u65ED\u901A\u308A",
  "100010-02": "\u65ED\u901A\u308A",
  "100013-01": "\u671D\u971E\u5E02\u5F79\u6240",
  "100013-02": "\u671D\u971E\u5E02\u5F79\u6240",
  "100014-00": "\u671D\u971E\u99C5\u5357\u53E3",
  "100014-01-02": "\u671D\u971E\u99C5\u5357\u53E3",
  "100014-15": "\u671D\u971E\u99C5\u5357\u53E3",
  "100016-01-04": "\u95A2\u8D8A\u5B66\u5712\u901A\u308A",
  "100016-02": "\u95A2\u8D8A\u5B66\u5712\u901A\u308A",
  "100016-03": "\u95A2\u8D8A\u5B66\u5712\u901A\u308A",
  "100017-01": "\u5742\u4E0B\uFF08\u7DF4\u99AC\u533A\uFF09",
  "100017-02": "\u5742\u4E0B\uFF08\u7DF4\u99AC\u533A\uFF09",
  "100017-03": "\u5742\u4E0B\uFF08\u7DF4\u99AC\u533A\uFF09",
  "100017-04": "\u5742\u4E0B\uFF08\u7DF4\u99AC\u533A\uFF09",
  "100018-01": "\u5927\u6CC9\u7B2C\u4E09\u5C0F\u5B66\u6821",
  "100018-02": "\u5927\u6CC9\u7B2C\u4E09\u5C0F\u5B66\u6821",
  "100018-03": "\u5927\u6CC9\u7B2C\u4E09\u5C0F\u5B66\u6821",
  "100018-04": "\u5927\u6CC9\u7B2C\u4E09\u5C0F\u5B66\u6821",
  "100019-01": "\u897F\u5927\u6CC9\u4E09\u90F5\u4FBF\u5C40",
  "100019-02": "\u897F\u5927\u6CC9\u4E09\u90F5\u4FBF\u5C40",
  "100020-01": "\u4E45\u4FDD\u65B0\u7530",
  "100020-02": "\u4E45\u4FDD\u65B0\u7530",
  "100021-01": "\u7247\u5C71\u4E8C\u4E01\u76EE",
  "100021-02": "\u7247\u5C71\u4E8C\u4E01\u76EE",
  "100022-01": "\u4E2D\u6CA2",
  "100022-02": "\u4E2D\u6CA2",
  "100023-01": "\u7B2C\u56DB\u5C0F\u5B66\u6821\u5165\u53E3",
  "100023-02": "\u7B2C\u56DB\u5C0F\u5B66\u6821\u5165\u53E3",
  "100024-01": "\u3042\u3051\u307C\u306E\u4F4F\u5B85\u524D",
  "100024-02": "\u3042\u3051\u307C\u306E\u4F4F\u5B85\u524D",
  "100026-01": "\u3072\u3070\u308A\u30F6\u4E18\u99C5\u5317\u53E3",
  "100026-02": "\u3072\u3070\u308A\u30F6\u4E18\u99C5\u5317\u53E3",
  "100026-15": "\u3072\u3070\u308A\u30F6\u4E18\u99C5\u5317\u53E3",
  "100027-01": "\u6817\u539F\u516C\u5712\u5165\u53E3",
  "100027-02": "\u6817\u539F\u516C\u5712\u5165\u53E3",
  "100028-01": "\u5225\u308C\u9053",
  "100028-02": "\u5225\u308C\u9053",
  "100029-01": "\u6817\u539F",
  "100029-02": "\u6817\u539F",
  "100030-01": "\u706B\u306E\u898B\u4E0B",
  "100030-02": "\u706B\u306E\u898B\u4E0B",
  "100031-01": "\u8C9D\u6CBC",
  "100031-02": "\u8C9D\u6CBC",
  "100032-01": "\u9053\u5834",
  "100032-02": "\u9053\u5834",
  "100033-01": "\u7247\u5C71\u5C0F\u5B66\u6821",
  "100033-02": "\u7247\u5C71\u5C0F\u5B66\u6821",
  "100033-04": "\u7247\u5C71\u5C0F\u5B66\u6821",
  "100033-06-10": "\u7247\u5C71\u5C0F\u5B66\u6821",
  "100033-08": "\u7247\u5C71\u5C0F\u5B66\u6821",
  "100034-01": "\u6C60\u7530\u4E8C\u4E01\u76EE",
  "100034-02": "\u6C60\u7530\u4E8C\u4E01\u76EE",
  "100036-01": "\u65B0\u5EA7\u9AD8\u6821",
  "100036-02": "\u65B0\u5EA7\u9AD8\u6821",
  "100037-01": "\u84EE\u5149\u5BFA\u524D",
  "100037-02": "\u84EE\u5149\u5BFA\u524D",
  "100038-01": "\u539F\u30F6\u8C37\u6238",
  "100038-02": "\u539F\u30F6\u8C37\u6238",
  "100039-01": "\u7551\u4E2D\u4E8C\u4E01\u76EE",
  "100039-02": "\u7551\u4E2D\u4E8C\u4E01\u76EE",
  "100040-01": "\u6771\u798F\u5BFA\u524D",
  "100040-02": "\u6771\u798F\u5BFA\u524D",
  "100041-01": "\u4E0B\u7247\u5C71",
  "100041-02": "\u4E0B\u7247\u5C71",
  "100042-01": "\u698E\u6728\u30AC\u30FC\u30C9",
  "100042-02": "\u698E\u6728\u30AC\u30FC\u30C9",
  "100043-01": "\u698E\u6728",
  "100043-02": "\u698E\u6728",
  "100046-01-08": "\u5800\u306E\u5185\u6A4B",
  "100046-02-03-05": "\u5800\u306E\u5185\u6A4B",
  "100047-01-03": "\u798F\u7949\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "100047-02": "\u798F\u7949\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "100047-04-10": "\u798F\u7949\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "100047-08": "\u798F\u7949\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "100048-01-08": "\u65B0\u5EA7\u5E02\u5150\u7AE5\u30BB\u30F3\u30BF\u30FC",
  "100048-02": "\u65B0\u5EA7\u5E02\u5150\u7AE5\u30BB\u30F3\u30BF\u30FC",
  "100048-04": "\u65B0\u5EA7\u5E02\u5150\u7AE5\u30BB\u30F3\u30BF\u30FC",
  "100048-05": "\u65B0\u5EA7\u5E02\u5150\u7AE5\u30BB\u30F3\u30BF\u30FC",
  "100049-01": "\u672C\u591A\u4E00\u4E01\u76EE",
  "100049-02-04-05": "\u672C\u591A\u4E00\u4E01\u76EE",
  "100049-03": "\u672C\u591A\u4E00\u4E01\u76EE",
  "100049-08": "\u672C\u591A\u4E00\u4E01\u76EE",
  "100052-01": "\u65B0\u5DDD\u753A\u4E00\u4E01\u76EE",
  "100052-02": "\u65B0\u5DDD\u753A\u4E00\u4E01\u76EE",
  "100053-01": "\u5927\u9580\u753A\u4E00\u4E01\u76EE",
  "100053-02": "\u5927\u9580\u753A\u4E00\u4E01\u76EE",
  "100054-01": "\u795E\u5C71\u5927\u6A4B",
  "100054-02": "\u795E\u5C71\u5927\u6A4B",
  "100055-01": "\u795E\u5B9D\u5C0F\u5B66\u6821",
  "100055-02": "\u795E\u5B9D\u5C0F\u5B66\u6821",
  "100056-01": "\u5B9D\u6CC9\u5BFA\u524D",
  "100056-02": "\u5B9D\u6CC9\u5BFA\u524D",
  "100057-01": "\u56E3\u5730\u5165\u53E3\uFF08\u6771\u4E45\u7559\u7C73\u5E02\uFF09",
  "100057-02": "\u56E3\u5730\u5165\u53E3\uFF08\u6771\u4E45\u7559\u7C73\u5E02\uFF09",
  "100058-01": "\u897F\u53CB\u6771\u4E45\u7559\u7C73\u5E97\u524D",
  "100058-02": "\u897F\u53CB\u6771\u4E45\u7559\u7C73\u5E97\u524D",
  "100059-01": "\u6771\u4E45\u7559\u7C73\u56E3\u5730",
  "100059-02-15": "\u6771\u4E45\u7559\u7C73\u56E3\u5730",
  "100061-03": "\u897F\u5800",
  "100061-04": "\u897F\u5800",
  "100062-01": "\u897F\u5800\u5C0F\u5B66\u6821",
  "100062-02": "\u897F\u5800\u5C0F\u5B66\u6821",
  "100063-01": "\u897F\u5800\u5357",
  "100063-02": "\u897F\u5800\u5357",
  "100064-01": "\u5C0F\u5C71\u5165\u53E3",
  "100064-15": "\u5C0F\u5C71\u5165\u53E3",
  "100066-01": "\u53F2\u8DE1\u516C\u5712",
  "100066-02": "\u53F2\u8DE1\u516C\u5712",
  "100067-01": "\u897F\u5C4B\u6577",
  "100067-02": "\u897F\u5C4B\u6577",
  "100068-00": "\u65B0\u5EA7\u55B6\u696D\u6240",
  "100068-01": "\u65B0\u5EA7\u55B6\u696D\u6240",
  "100068-02": "\u65B0\u5EA7\u55B6\u696D\u6240",
  "100068-03": "\u65B0\u5EA7\u55B6\u696D\u6240",
  "100068-15": "\u65B0\u5EA7\u55B6\u696D\u6240",
  "100069-01": "\u65B0\u5EA7\u7DCF\u5408\u4F53\u80B2\u9928\u5165\u53E3",
  "100069-02": "\u65B0\u5EA7\u7DCF\u5408\u4F53\u80B2\u9928\u5165\u53E3",
  "100069-03": "\u65B0\u5EA7\u7DCF\u5408\u4F53\u80B2\u9928\u5165\u53E3",
  "100069-04": "\u65B0\u5EA7\u7DCF\u5408\u4F53\u80B2\u9928\u5165\u53E3",
  "100070-01": "\u53F0\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100070-02": "\u53F0\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100070-03": "\u53F0\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100071-01": "\u65B0\u5EA7\u4E2D\u5B66\u6821",
  "100071-02": "\u65B0\u5EA7\u4E2D\u5B66\u6821",
  "100072-01": "\u5E73\u6797\u5BFA",
  "100072-02": "\u5E73\u6797\u5BFA",
  "100073-01": "\u9663\u5C4B\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100073-02": "\u9663\u5C4B\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100074-01": "\u65B0\u5EA7\u5E02\u5F79\u6240",
  "100074-02": "\u65B0\u5EA7\u5E02\u5F79\u6240",
  "100075-01": "\u671B\u8299\u53F0\u4F4F\u5B85",
  "100075-02": "\u671B\u8299\u53F0\u4F4F\u5B85",
  "100076-01": "\u65B0\u5EA7\u8B66\u5BDF\u7F72\u524D",
  "100076-02": "\u65B0\u5EA7\u8B66\u5BDF\u7F72\u524D",
  "100077-01": "\u91CE\u706B\u6B62\u5927\u9580",
  "100077-02": "\u91CE\u706B\u6B62\u5927\u9580",
  "100077-04": "\u91CE\u706B\u6B62\u5927\u9580",
  "100078-01": "\u91CE\u706B\u6B62\u5742\u4E0A",
  "100078-02": "\u91CE\u706B\u6B62\u5742\u4E0A",
  "100079-01": "\u4E2D\u5800",
  "100079-02": "\u4E2D\u5800",
  "100080-01": "\u91CE\u706B\u6B62\u4E2D",
  "100080-02": "\u91CE\u706B\u6B62\u4E2D",
  "100081-01": "\u4E0B\u306E\u539F\u5165\u53E3",
  "100081-02": "\u4E0B\u306E\u539F\u5165\u53E3",
  "100082-01": "\u5CF6\u306E\u4E0A",
  "100082-02": "\u5CF6\u306E\u4E0A",
  "100083-01": "\u6C34\u9053\u9053\u8DEF\u5165\u53E3",
  "100083-02": "\u6C34\u9053\u9053\u8DEF\u5165\u53E3",
  "100084-01": "\u671D\u971E\u770C\u7A0E\u4E8B\u52D9\u6240",
  "100084-02": "\u671D\u971E\u770C\u7A0E\u4E8B\u52D9\u6240",
  "100085-01": "\u671D\u971E\u7B2C\u4E94\u5C0F\u5B66\u6821",
  "100085-02": "\u671D\u971E\u7B2C\u4E94\u5C0F\u5B66\u6821",
  "100086-01": "\u897F\u5F01\u8CA1\u4E00\u4E01\u76EE",
  "100086-02": "\u897F\u5F01\u8CA1\u4E00\u4E01\u76EE",
  "100087-00": "\u671D\u971E\u53F0\u99C5",
  "100087-01": "\u671D\u971E\u53F0\u99C5",
  "100087-02": "\u671D\u971E\u53F0\u99C5",
  "100087-15": "\u671D\u971E\u53F0\u99C5",
  "100091-00": "\u6E05\u702C\u99C5\u5317\u53E3",
  "100091-01": "\u6E05\u702C\u99C5\u5317\u53E3",
  "100091-02-04": "\u6E05\u702C\u99C5\u5317\u53E3",
  "100091-03": "\u6E05\u702C\u99C5\u5317\u53E3",
  "100091-15": "\u6E05\u702C\u99C5\u5317\u53E3",
  "100096-01": "\u4E0A\u6E05\u6238\u4E00\u4E01\u76EE",
  "100096-02": "\u4E0A\u6E05\u6238\u4E00\u4E01\u76EE",
  "100097-01": "\u6E05\u702C\u4F4F\u5B85\u5165\u53E3",
  "100097-02": "\u6E05\u702C\u4F4F\u5B85\u5165\u53E3",
  "100098-01": "\u6C17\u8C61\u885B\u661F\u30BB\u30F3\u30BF\u30FC",
  "100098-02": "\u6C17\u8C61\u885B\u661F\u30BB\u30F3\u30BF\u30FC",
  "100099-01": "\u4E2D\u6E05\u6238\u90F5\u4FBF\u5C40",
  "100099-02": "\u4E2D\u6E05\u6238\u90F5\u4FBF\u5C40",
  "100100-01": "\u30B0\u30EA\u30FC\u30F3\u30BF\u30A6\u30F3\u6E05\u6238",
  "100100-02": "\u30B0\u30EA\u30FC\u30F3\u30BF\u30A6\u30F3\u6E05\u6238",
  "100101-01": "\u4E2D\u6E05\u6238\u6771",
  "100101-02": "\u4E2D\u6E05\u6238\u6771",
  "100102-01": "\u4E0B\u6E05\u6238",
  "100102-02": "\u4E0B\u6E05\u6238",
  "100103-01": "\u4E0B\u5BBF\u5165\u53E3",
  "100103-02": "\u4E0B\u5BBF\u5165\u53E3",
  "100104-01": "\u83C5\u6CA2",
  "100104-02": "\u83C5\u6CA2",
  "100111-01": "\u5143\u753A\u4E00\u4E01\u76EE",
  "100111-02": "\u5143\u753A\u4E00\u4E01\u76EE",
  "100112-01": "\u90F7\u571F\u535A\u7269\u9928\u5165\u53E3",
  "100112-02": "\u90F7\u571F\u535A\u7269\u9928\u5165\u53E3",
  "100113-01": "\u3051\u3084\u304D\u901A\u308A",
  "100113-02": "\u3051\u3084\u304D\u901A\u308A",
  "100114-01": "\u5BAE\u306E\u53F0\u4F4F\u5B85",
  "100114-02": "\u5BAE\u306E\u53F0\u4F4F\u5B85",
  "100115-01": "\u6E05\u702C\u5E02\u5F79\u6240",
  "100115-02": "\u6E05\u702C\u5E02\u5F79\u6240",
  "100115-03": "\u6E05\u702C\u5E02\u5F79\u6240",
  "100115-04": "\u6E05\u702C\u5E02\u5F79\u6240",
  "100116-01": "\u90FD\u55B6\u4E2D\u6E05\u6238\u4F4F\u5B85\u6771",
  "100116-02": "\u90FD\u55B6\u4E2D\u6E05\u6238\u4F4F\u5B85\u6771",
  "100117-01": "\u4E0B\u6E05\u6238\u4E8C\u4E01\u76EE",
  "100117-02": "\u4E0B\u6E05\u6238\u4E8C\u4E01\u76EE",
  "100118-01-15": "\u5927\u6797\u7D44\u6280\u8853\u7814\u7A76\u6240",
  "100118-02": "\u5927\u6797\u7D44\u6280\u8853\u7814\u7A76\u6240",
  "100119-01": "\u65ED\u304C\u4E18\u901A\u308A",
  "100119-02": "\u65ED\u304C\u4E18\u901A\u308A",
  "100121-01": "\u6E05\u702C\u90F5\u4FBF\u5C40",
  "100121-02": "\u6E05\u702C\u90F5\u4FBF\u5C40",
  "100122-01": "\u7B2C\u56DB\u90FD\u55B6\u4F4F\u5B85",
  "100122-02": "\u7B2C\u56DB\u90FD\u55B6\u4F4F\u5B85",
  "100123-01": "\u4E2D\u91CC\uFF08\u6E05\u702C\u5E02\uFF09",
  "100123-02": "\u4E2D\u91CC\uFF08\u6E05\u702C\u5E02\uFF09",
  "100125-01": "\u6E05\u702C\u3075\u3058\u307F\u5E7C\u7A1A\u5712",
  "100125-02": "\u6E05\u702C\u3075\u3058\u307F\u5E7C\u7A1A\u5712",
  "100126-01": "\u67FF\u306E\u4E0B",
  "100126-02": "\u67FF\u306E\u4E0B",
  "100127-01": "\u4E0B\u7530",
  "100127-02": "\u4E0B\u7530",
  "100127-03": "\u4E0B\u7530",
  "100128-01": "\u4E0B\u6238",
  "100128-02": "\u4E0B\u6238",
  "100131-01": "\u4E0A\u6E05\u6238",
  "100131-02": "\u4E0A\u6E05\u6238",
  "100132-01": "\u6C34\u5929\u5BAE\u524D\uFF08\u6E05\u702C\u5E02\uFF09",
  "100132-02": "\u6C34\u5929\u5BAE\u524D\uFF08\u6E05\u702C\u5E02\uFF09",
  "100133-01": "\u4E2D\u6E05\u6238",
  "100133-02": "\u4E2D\u6E05\u6238",
  "100136-01": "\u56E3\u5730\u4FDD\u80B2\u5712\u524D",
  "100136-02": "\u56E3\u5730\u4FDD\u80B2\u5712\u524D",
  "100137-01": "\u53F0\u7530\u56E3\u5730\u4E2D\u592E",
  "100137-02": "\u53F0\u7530\u56E3\u5730\u4E2D\u592E",
  "100138-01-02": "\u53F0\u7530\u56E3\u5730",
  "100138-15": "\u53F0\u7530\u56E3\u5730",
  "100139-01-15": "\u53F0\u7530",
  "100139-02": "\u53F0\u7530",
  "100140-01": "\u56E3\u5730\u4EA4\u756A\u524D",
  "100140-02": "\u56E3\u5730\u4EA4\u756A\u524D",
  "100141-01": "\u65ED\u304C\u4E18\u4E8C\u4E01\u76EE",
  "100141-02": "\u65ED\u304C\u4E18\u4E8C\u4E01\u76EE",
  "100142-01": "\u56E3\u5730\u30BB\u30F3\u30BF\u30FC\uFF08\u6E05\u702C\u5E02\uFF09",
  "100142-02": "\u56E3\u5730\u30BB\u30F3\u30BF\u30FC\uFF08\u6E05\u702C\u5E02\uFF09",
  "100143-01": "\u65ED\u304C\u4E18\u4E94\u4E01\u76EE",
  "100143-02": "\u65ED\u304C\u4E18\u4E94\u4E01\u76EE",
  "100144-01-15": "\u65ED\u304C\u4E18\u56E3\u5730",
  "100146-01": "\u4E2D\u90F7\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100146-02": "\u4E2D\u90F7\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100147-01": "\u83C5\u6CA2\u4E2D\u592E",
  "100147-02": "\u83C5\u6CA2\u4E2D\u592E",
  "100147-03-04": "\u83C5\u6CA2\u4E2D\u592E",
  "100148-01": "\u969C\u5BB3\u8005\u5C31\u52B4\u79FB\u884C\u30B9\u30EF\u30F3\u5DE5\u820E",
  "100148-02": "\u969C\u5BB3\u8005\u5C31\u52B4\u79FB\u884C\u30B9\u30EF\u30F3\u5DE5\u820E",
  "100149-01": "\u5341\u6587\u5B57\u5973\u5B50\u5927\u5165\u53E3",
  "100149-02": "\u5341\u6587\u5B57\u5973\u5B50\u5927\u5165\u53E3",
  "100150-01": "\u91CE\u706B\u6B62\u5C0F\u5B66\u6821",
  "100150-02": "\u91CE\u706B\u6B62\u5C0F\u5B66\u6821",
  "100151-01": "\u3075\u308B\u3055\u3068\u5C0F\u9053",
  "100151-02": "\u3075\u308B\u3055\u3068\u5C0F\u9053",
  "100152-02": "\u91CE\u706B\u6B62\u89D2",
  "100152-03": "\u91CE\u706B\u6B62\u89D2",
  "100152-04": "\u91CE\u706B\u6B62\u89D2",
  "100152-05": "\u91CE\u706B\u6B62\u89D2",
  "100153-01": "\u91CE\u706B\u6B62\u4E0A",
  "100153-02": "\u91CE\u706B\u6B62\u4E0A",
  "100154-01": "\u5317\u91CE\u5165\u53E3",
  "100154-02": "\u5317\u91CE\u5165\u53E3",
  "100155-01": "\u7ACB\u6559\u524D",
  "100155-02": "\u7ACB\u6559\u524D",
  "100156-01": "\u65B0\u5EA7\u5FD7\u6728\u4E2D\u592E\u7DCF\u5408\u75C5\u9662",
  "100156-02-03": "\u65B0\u5EA7\u5FD7\u6728\u4E2D\u592E\u7DCF\u5408\u75C5\u9662",
  "100157-01": "\u3059\u304D\u3063\u3077\u305F\u3046\u3093",
  "100157-02-03": "\u3059\u304D\u3063\u3077\u305F\u3046\u3093",
  "100158-01-04": "\u5FD7\u6728\u99C5\u5357\u53E3",
  "100158-02": "\u5FD7\u6728\u99C5\u5357\u53E3",
  "100158-03": "\u5FD7\u6728\u99C5\u5357\u53E3",
  "100158-15": "\u5FD7\u6728\u99C5\u5357\u53E3",
  "100161-01": "\u91CE\u706B\u6B62\u4E03\u4E01\u76EE",
  "100161-02": "\u91CE\u706B\u6B62\u4E03\u4E01\u76EE",
  "100162-01": "\u7B2C\u4E8C\u4E2D\u5B66\u6821",
  "100162-02": "\u7B2C\u4E8C\u4E2D\u5B66\u6821",
  "100163-01": "\u6771\u4E00\u4E01\u76EE",
  "100163-02": "\u6771\u4E00\u4E01\u76EE",
  "100164-01": "\u6771\u4E09\u4E01\u76EE",
  "100164-02": "\u6771\u4E09\u4E01\u76EE",
  "100165-01": "\u6771\u5317\u4E8C\u4E01\u76EE",
  "100165-02": "\u6771\u5317\u4E8C\u4E01\u76EE",
  "100166-01": "\u6771\u5317\u901A\u308A",
  "100166-02": "\u6771\u5317\u901A\u308A",
  "100169-01": "\u51F8\u7248\u5370\u5237",
  "100169-02": "\u51F8\u7248\u5370\u5237",
  "100169-15": "\u51F8\u7248\u5370\u5237",
  "100170-01": "\u65B0\u5EA7\u99C5\u5317\u5165\u53E3",
  "100170-02": "\u65B0\u5EA7\u99C5\u5317\u5165\u53E3",
  "100171-01-03": "\u6771\u5BEE\u524D",
  "100171-02": "\u6771\u5BEE\u524D",
  "100172-01-03": "\u5317\u91CE\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100172-02": "\u5317\u91CE\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100173-01-03": "\u5BCC\u58EB\u898B\u30F6\u4E18\u56E3\u5730",
  "100173-02": "\u5BCC\u58EB\u898B\u30F6\u4E18\u56E3\u5730",
  "100174-01-04": "\u65B0\u5EA7\u56E3\u5730\u5165\u53E3",
  "100174-02": "\u65B0\u5EA7\u56E3\u5730\u5165\u53E3",
  "100174-03": "\u65B0\u5EA7\u56E3\u5730\u5165\u53E3",
  "100175-01": "\u56E3\u5730\u5357\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100175-02": "\u56E3\u5730\u5357\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100176-01": "\u65B0\u5EA7\u56E3\u5730",
  "100176-15": "\u65B0\u5EA7\u56E3\u5730",
  "100177-02": "\u65B0\u5EA7\u67F3\u702C\u9AD8\u6821\u5165\u53E3",
  "100177-03": "\u65B0\u5EA7\u67F3\u702C\u9AD8\u6821\u5165\u53E3",
  "100178-02": "\u5927\u548C\u7530",
  "100178-03": "\u5927\u548C\u7530",
  "100178-04": "\u5927\u548C\u7530",
  "100178-05": "\u5927\u548C\u7530",
  "100181-01": "\u82F1\u6A4B",
  "100181-02-03": "\u82F1\u6A4B",
  "100182-01-04": "\u4E2D\u91CE",
  "100182-02-03": "\u4E2D\u91CE",
  "100183-01-03-15": "\u8DE1\u898B\u5973\u5B50\u5927",
  "100183-02": "\u8DE1\u898B\u5973\u5B50\u5927",
  "100184-00": "\u65B0\u5EA7\u99C5\u5357\u53E3",
  "100184-01": "\u65B0\u5EA7\u99C5\u5357\u53E3",
  "100184-02": "\u65B0\u5EA7\u99C5\u5357\u53E3",
  "100184-03": "\u65B0\u5EA7\u99C5\u5357\u53E3",
  "100184-15": "\u65B0\u5EA7\u99C5\u5357\u53E3",
  "100185-01": "\u819D\u6298\u6A2A\u753A",
  "100185-02": "\u819D\u6298\u6A2A\u753A",
  "100189-01": "\u91CE\u706B\u6B62\u4E2D\u592E",
  "100189-02": "\u91CE\u706B\u6B62\u4E2D\u592E",
  "100190-01": "\u3042\u305F\u3054\u6A4B\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100190-02": "\u3042\u305F\u3054\u6A4B\uFF08\u65B0\u5EA7\u5E02\uFF09",
  "100324-03": "\u56F3\u66F8\u9928\u5165\u53E3",
  "100324-04": "\u56F3\u66F8\u9928\u5165\u53E3",
  "100325-03": "\u7B2C\u56DB\u4E2D\u5B66\u6821\u5165\u53E3",
  "100325-04": "\u7B2C\u56DB\u4E2D\u5B66\u6821\u5165\u53E3",
  "100326-01-04": "\u6804\u753A\u4E94\u4E01\u76EE",
  "100326-02-03": "\u6804\u753A\u4E94\u4E01\u76EE",
  "100384-00-15": "\u6771\u4E45\u7559\u7C73\u99C5\u6771\u53E3",
  "100384-01": "\u6771\u4E45\u7559\u7C73\u99C5\u6771\u53E3",
  "105039-02": "\u30B3\u30DF\u30E5\u30CB\u30C6\u30A3\u30D7\u30E9\u30B6\u3072\u307E\u308F\u308A\u5165\u53E3",
  "105148-01": "\u6817\u539F\u4E94\u4E01\u76EE",
  "105148-02": "\u6817\u539F\u4E94\u4E01\u76EE",
  "105178-01-15": "\u671D\u971E\u99C5\u6771\u53E3",
  "105179-01": "\u65B0\u96FB\u5143\u5DE5\u696D",
  "105179-15": "\u65B0\u96FB\u5143\u5DE5\u696D",
  "105180-01": "\u65B0\u96FB\u5143\u5DE5\u696D\u524D",
  "110001-01": "\u4E0A\u5BAE",
  "110001-02": "\u4E0A\u5BAE",
  "110002-01": "\u30CF\u30F3\u30BB\u30F3\u75C5\u8CC7\u6599\u9928",
  "110002-02": "\u30CF\u30F3\u30BB\u30F3\u75C5\u8CC7\u6599\u9928",
  "110003-01": "\u5168\u751F\u5712\u5357",
  "110003-02": "\u5168\u751F\u5712\u5357",
  "110004-01": "\u5168\u751F\u5712\u89D2",
  "110004-02": "\u5168\u751F\u5712\u89D2",
  "110005-01": "\u5168\u751F\u5712\u524D",
  "110005-02": "\u5168\u751F\u5712\u524D",
  "110005-03": "\u5168\u751F\u5712\u524D",
  "110006-01": "\u9752\u8449\u753A\u4E00\u4E01\u76EE",
  "110006-02": "\u9752\u8449\u753A\u4E00\u4E01\u76EE",
  "110007-01": "\u9752\u8449\u753A\u4E8C\u4E01\u76EE",
  "110007-02": "\u9752\u8449\u753A\u4E8C\u4E01\u76EE",
  "110008-01": "\u6069\u591A\u753A\u4E94\u4E01\u76EE",
  "110008-02": "\u6069\u591A\u753A\u4E94\u4E01\u76EE",
  "110009-01": "\u5411\u53F0",
  "110009-02": "\u5411\u53F0",
  "110010-01": "\u6069\u591A\u8FBB",
  "110010-02": "\u6069\u591A\u8FBB",
  "110011-01": "\u6069\u591A",
  "110011-02": "\u6069\u591A",
  "110012-01": "\u6804\u753A\u4E00\u4E01\u76EE",
  "110012-02": "\u6804\u753A\u4E00\u4E01\u76EE",
  "110016-01": "\u661F\u30F6\u4E18\u4F4F\u5B85\u5165\u53E3",
  "110016-02": "\u661F\u30F6\u4E18\u4F4F\u5B85\u5165\u53E3",
  "110017-01": "\u7A7A\u5800\u6A4B",
  "110017-02": "\u7A7A\u5800\u6A4B",
  "110018-01": "\u91CE\u884C",
  "110018-02": "\u91CE\u884C",
  "110019-01": "\u79CB\u6D25\u6587\u5316\u30BB\u30F3\u30BF\u30FC",
  "110019-02": "\u79CB\u6D25\u6587\u5316\u30BB\u30F3\u30BF\u30FC",
  "110020-01": "\u79CB\u6D25\u6771\u5C0F\u5B66\u6821",
  "110020-02": "\u79CB\u6D25\u6771\u5C0F\u5B66\u6821",
  "110021-01": "\u65B0\u79CB\u6D25\u99C5",
  "110021-15": "\u65B0\u79CB\u6D25\u99C5",
  "110025-01": "\u79CB\u6D25\u753A\u4E09\u4E01\u76EE",
  "110025-02": "\u79CB\u6D25\u753A\u4E09\u4E01\u76EE",
  "110026-01": "\u6CA2\u306E\u53F0",
  "110026-02": "\u6CA2\u306E\u53F0",
  "110036-01": "\u30B0\u30E9\u30F3\u30C9\u5165\u53E3\uFF08\u6771\u6751\u5C71\u5E02\uFF09",
  "110036-02": "\u30B0\u30E9\u30F3\u30C9\u5165\u53E3\uFF08\u6771\u6751\u5C71\u5E02\uFF09",
  "110037-01": "\u67F3\u702C\u6A4B",
  "110037-02": "\u67F3\u702C\u6A4B",
  "110038-01": "\u65E5\u6708\u795E\u793E",
  "110038-02": "\u65E5\u6708\u795E\u793E",
  "110039-01": "\u5317\u79CB\u6D25",
  "110039-02": "\u5317\u79CB\u6D25",
  "110041-01": "\u5317\u79CB\u6D25\u5C0F\u5B66\u6821\u5165\u53E3",
  "110041-02": "\u5317\u79CB\u6D25\u5C0F\u5B66\u6821\u5165\u53E3",
  "110042-01-03-04": "\u6240\u6CA2\u99C5\u6771\u53E3\u901A\u308A",
  "110042-02": "\u6240\u6CA2\u99C5\u6771\u53E3\u901A\u308A",
  "110046-00-15": "\u6240\u6CA2\u99C5\u6771\u53E3",
  "110046-01-02": "\u6240\u6CA2\u99C5\u6771\u53E3",
  "110046-03-04": "\u6240\u6CA2\u99C5\u6771\u53E3",
  "110047-01-03": "\u8328\u539F\u524D",
  "110047-02": "\u8328\u539F\u524D",
  "110048-01": "\u5E02\u55B6\u4F4F\u5B85\u524D\uFF08\u6240\u6CA2\u5E02\uFF09",
  "110048-02": "\u5E02\u55B6\u4F4F\u5B85\u524D\uFF08\u6240\u6CA2\u5E02\uFF09",
  "110049-01": "\u897F\u6B66\u79CB\u6D25\u56E3\u5730",
  "110049-02": "\u897F\u6B66\u79CB\u6D25\u56E3\u5730",
  "110050-01": "\u677E\u4E95",
  "110050-02": "\u677E\u4E95",
  "110051-01": "\u4E0A\u5B89\u677E",
  "110051-02": "\u4E0A\u5B89\u677E",
  "110052-01": "\u6771\u4E2D\u5B66\u6821\u5165\u53E3",
  "110052-02": "\u6771\u4E2D\u5B66\u6821\u5165\u53E3",
  "110053-01": "\u5B89\u677E",
  "110053-02": "\u5B89\u677E",
  "110054-01": "\u611B\u5B95\u5C71",
  "110054-02": "\u611B\u5B95\u5C71",
  "110055-01": "\u67F3\u702C\u5DDD",
  "110055-02": "\u67F3\u702C\u5DDD",
  "110056-01": "\u897F\u6B66\u30B0\u30EA\u30FC\u30F3\u30D2\u30EB\uFF08\u6240\u6CA2\u5E02\uFF09",
  "110056-02": "\u897F\u6B66\u30B0\u30EA\u30FC\u30F3\u30D2\u30EB\uFF08\u6240\u6CA2\u5E02\uFF09",
  "110057-01": "\u4E2D\u91CC\u56E3\u5730",
  "110057-02": "\u4E2D\u91CC\u56E3\u5730",
  "110058-01": "\u4E0B\u5B89\u677E",
  "110058-02": "\u4E0B\u5B89\u677E",
  "110059-01": "\u548C\u7530\u5B89\u677E",
  "110059-02": "\u548C\u7530\u5B89\u677E",
  "110060-01": "\u5B89\u677E\u4E2D\u5B66\u6821\u5165\u53E3",
  "110060-02": "\u5B89\u677E\u4E2D\u5B66\u6821\u5165\u53E3",
  "110062-01": "\u6771\u6240\u6CA2\u99C5\u5165\u53E3",
  "110062-02": "\u6771\u6240\u6CA2\u99C5\u5165\u53E3",
  "110063-01": "\u540D\u53E4\u5C4B",
  "110063-02": "\u540D\u53E4\u5C4B",
  "110064-01": "\u672C\u90F7",
  "110064-02": "\u672C\u90F7",
  "110065-01": "\u57CE",
  "110065-02": "\u57CE",
  "110066-01": "\u5742\u306E\u4E0B\u4E0A",
  "110066-02": "\u5742\u306E\u4E0B\u4E0A",
  "110067-01": "\u91D1\u6BD4\u7F85",
  "110067-02": "\u91D1\u6BD4\u7F85",
  "110068-01": "\u5742\u306E\u4E0B\uFF08\u6240\u6CA2\u5E02\uFF09",
  "110068-02": "\u5742\u306E\u4E0B\uFF08\u6240\u6CA2\u5E02\uFF09",
  "110069-01": "\u897F\u5074",
  "110069-02": "\u897F\u5074",
  "110071-01-02": "\u6771\u6240\u6CA2\u99C5",
  "110071-03": "\u6771\u6240\u6CA2\u99C5",
  "110071-15": "\u6771\u6240\u6CA2\u99C5",
  "110072-01": "\u6771\u6240\u6CA2\u4E00\u4E01\u76EE",
  "110072-02": "\u6771\u6240\u6CA2\u4E00\u4E01\u76EE",
  "110073-01": "\u6771\u6240\u6CA2\u4E09\u4E01\u76EE",
  "110073-02": "\u6771\u6240\u6CA2\u4E09\u4E01\u76EE",
  "110074-01": "\u67F3\u702C\u6D88\u9632\u5206\u7F72",
  "110074-02": "\u67F3\u702C\u6D88\u9632\u5206\u7F72",
  "110075-01": "\u67F3\u702C\u5C0F\u5B66\u6821\u524D",
  "110075-02": "\u67F3\u702C\u5C0F\u5B66\u6821\u524D",
  "110076-01": "\u3084\u306A\u305B\u8358\u5165\u53E3",
  "110076-04": "\u3084\u306A\u305B\u8358\u5165\u53E3",
  "110077-01": "\u7AAA\u91CE",
  "110077-02": "\u7AAA\u91CE",
  "110078-01": "\u516B\u5E61\u795E\u793E\u524D",
  "110078-02": "\u516B\u5E61\u795E\u793E\u524D",
  "110079-01": "\u5357\u6C38\u4E95",
  "110079-02": "\u5357\u6C38\u4E95",
  "110081-01": "\u30B5\u30AF\u30E9\u30BF\u30A6\u30F3\u6771",
  "110081-02": "\u30B5\u30AF\u30E9\u30BF\u30A6\u30F3\u6771",
  "110082-01": "\u65B0\u65E5\u6BD4\u7530\u6A4B",
  "110082-02": "\u65B0\u65E5\u6BD4\u7530\u6A4B",
  "110083-01": "\u6240\u6CA2\u8ECA\u691C\u5834\u524D",
  "110083-02": "\u6240\u6CA2\u8ECA\u691C\u5834\u524D",
  "110084-01": "\u725B\u6CBC",
  "110084-02": "\u725B\u6CBC",
  "110085-01": "\u4E0B\u65B0\u4E95\u65B0\u9053",
  "110085-02": "\u4E0B\u65B0\u4E95\u65B0\u9053",
  "110086-01": "\u6240\u6CA2\u9678\u6A4B\u5317",
  "110086-02": "\u6240\u6CA2\u9678\u6A4B\u5317",
  "110087-01": "\u5E02\u6C11\u533B\u7642\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "110087-02": "\u5E02\u6C11\u533B\u7642\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "110088-01": "\u65B0\u6771\u6A4B",
  "110088-02": "\u65B0\u6771\u6A4B",
  "110091-00": "\u6240\u6CA2\u99C5\u897F\u53E3",
  "110091-01": "\u6240\u6CA2\u99C5\u897F\u53E3",
  "110091-02": "\u6240\u6CA2\u99C5\u897F\u53E3",
  "110091-15": "\u6240\u6CA2\u99C5\u897F\u53E3",
  "110092-01": "\u6771\u4F4F\u5409",
  "110092-02": "\u6771\u4F4F\u5409",
  "110093-01": "\u543E\u59BB",
  "110093-02": "\u543E\u59BB",
  "110094-01": "\u4E45\u7C73\u5883",
  "110094-02": "\u4E45\u7C73\u5883",
  "110096-01": "\u52E2\u63C3\u6A4B",
  "110096-02": "\u52E2\u63C3\u6A4B",
  "110097-01": "\u5C06\u8ECD\u585A",
  "110097-02": "\u5C06\u8ECD\u585A",
  "110098-01": "\u60B2\u7530\u51E6\u8DE1",
  "110098-02": "\u60B2\u7530\u51E6\u8DE1",
  "110099-01": "\u6C34\u5929\u5BAE\u4E0B",
  "110099-02": "\u6C34\u5929\u5BAE\u4E0B",
  "110101-01": "\u677E\u304C\u4E18\u4E2D\u592E",
  "110101-02": "\u677E\u304C\u4E18\u4E2D\u592E",
  "110102-01": "\u5CF0\u306E\u4E0B",
  "110102-02": "\u5CF0\u306E\u4E0B",
  "110103-01": "\u5357\u5927\u8C37\u516C\u5712",
  "110103-02": "\u5357\u5927\u8C37\u516C\u5712",
  "110104-01": "\u677E\u304C\u4E18\u897F",
  "110104-02": "\u677E\u304C\u4E18\u897F",
  "110105-02": "\u897F\u6B66\u5712\u99C5",
  "110105-15": "\u897F\u6B66\u5712\u99C5",
  "110111-01": "\u65E5\u5409\u753A",
  "110111-02": "\u65E5\u5409\u753A",
  "110112-01": "\u6771\u753A\uFF08\u6240\u6CA2\u5E02\uFF09",
  "110112-02": "\u6771\u753A\uFF08\u6240\u6CA2\u5E02\uFF09",
  "110113-01": "\u5317\u5FA1\u5E78\u753A",
  "110113-02": "\u5317\u5FA1\u5E78\u753A",
  "110114-01": "\u516C\u5712\u901A\u308A",
  "110114-02": "\u516C\u5712\u901A\u308A",
  "110118-01": "\u3053\u3076\u3057\u56E3\u5730\u5165\u53E3",
  "110118-02": "\u3053\u3076\u3057\u56E3\u5730\u5165\u53E3",
  "110121-01": "\u822A\u7A7A\u516C\u5712\u99C5",
  "110121-02": "\u822A\u7A7A\u516C\u5712\u99C5",
  "110121-03": "\u822A\u7A7A\u516C\u5712\u99C5",
  "110121-15": "\u822A\u7A7A\u516C\u5712\u99C5",
  "110124-01": "\u6240\u6CA2\u5E02\u5F79\u6240",
  "110124-02": "\u6240\u6CA2\u5E02\u5F79\u6240",
  "110125-01": "\u30D1\u30FC\u30AF\u30BF\u30A6\u30F3\u6240\u6CA2\u8B66\u5BDF\u7F72\u524D",
  "110125-02": "\u30D1\u30FC\u30AF\u30BF\u30A6\u30F3\u6240\u6CA2\u8B66\u5BDF\u7F72\u524D",
  "110126-01": "\u6587\u5316\u30BB\u30F3\u30BF\u30FC\u30DF\u30E5\u30FC\u30BA",
  "110126-02": "\u6587\u5316\u30BB\u30F3\u30BF\u30FC\u30DF\u30E5\u30FC\u30BA",
  "110127-01": "\u79E9\u7236\u5B66\u5712\u5165\u53E3",
  "110127-02": "\u79E9\u7236\u5B66\u5712\u5165\u53E3",
  "110127-03": "\u79E9\u7236\u5B66\u5712\u5165\u53E3",
  "110127-04": "\u79E9\u7236\u5B66\u5712\u5165\u53E3",
  "110128-01": "\u79E9\u7236\u5B66\u5712",
  "110128-02": "\u79E9\u7236\u5B66\u5712",
  "110129-01": "\u82E5\u677E\u753A",
  "110129-02": "\u82E5\u677E\u753A",
  "110130-01": "\u6240\u6CA2\u8056\u5730\u970A\u5712",
  "110130-02": "\u6240\u6CA2\u8056\u5730\u970A\u5712",
  "110132-01": "\u4E2D\u5BCC\u5357",
  "110132-02": "\u4E2D\u5BCC\u5357",
  "110133-01": "\u30A8\u30B9\u30C6\u30B7\u30C6\u30A3\u4E2D\u592E",
  "110133-02": "\u30A8\u30B9\u30C6\u30B7\u30C6\u30A3\u4E2D\u592E",
  "110134-01-03": "\u30A8\u30B9\u30C6\u30B7\u30C6\u30A3\u6240\u6CA2",
  "110134-15": "\u30A8\u30B9\u30C6\u30B7\u30C6\u30A3\u6240\u6CA2",
  "110136-01": "\u5317\u539F\u753A\u4E2D\u592E",
  "110136-02": "\u5317\u539F\u753A\u4E2D\u592E",
  "110137-00": "\u4E26\u6728\u901A\u308A\u56E3\u5730\u5165\u53E3",
  "110137-01-15": "\u4E26\u6728\u901A\u308A\u56E3\u5730\u5165\u53E3",
  "110137-02": "\u4E26\u6728\u901A\u308A\u56E3\u5730\u5165\u53E3",
  "110138-01": "\u4E26\u6728\u901A\u308A\u56E3\u5730",
  "110138-15": "\u4E26\u6728\u901A\u308A\u56E3\u5730",
  "110139-01": "\u5317\u539F",
  "110139-02": "\u5317\u539F",
  "110140-01": "\u5E02\u6C11\u6B66\u9053\u9928",
  "110140-02": "\u5E02\u6C11\u6B66\u9053\u9928",
  "110151-01": "\u65B0\u6240\u6CA2\u99C5\u6771\u53E3",
  "110151-02": "\u65B0\u6240\u6CA2\u99C5\u6771\u53E3",
  "110151-15": "\u65B0\u6240\u6CA2\u99C5\u6771\u53E3",
  "110152-01-03": "\u677E\u8449\u753A",
  "110152-02": "\u677E\u8449\u753A",
  "110153-01-03": "\u6240\u6CA2\u5E02\u6C11\u4F53\u80B2\u9928",
  "110153-02": "\u6240\u6CA2\u5E02\u6C11\u4F53\u80B2\u9928",
  "110154-01-03": "\u7F8E\u539F\u753A\u4E09\u4E01\u76EE",
  "110154-02": "\u7F8E\u539F\u753A\u4E09\u4E01\u76EE",
  "110155-01-03": "\u82B1\u5712",
  "110155-02": "\u82B1\u5712",
  "110156-01": "\u4F38\u6804\u5C0F\u5B66\u6821\u524D",
  "110156-02": "\u4F38\u6804\u5C0F\u5B66\u6821\u524D",
  "110157-01": "\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u897F",
  "110157-02": "\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u897F",
  "110158-01": "\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u4E2D\u592E",
  "110158-02": "\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u4E2D\u592E",
  "110159-01": "\u6240\u6CA2\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "110159-02": "\u6240\u6CA2\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "110159-15": "\u6240\u6CA2\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "110161-01": "\u677E\u4E0B",
  "110161-02": "\u677E\u4E0B",
  "110162-01": "\u4E2D\u5BCC",
  "110162-02": "\u4E2D\u5BCC",
  "110163-01": "\u4E2D\u5BCC\u6771",
  "110163-02": "\u4E2D\u5BCC\u6771",
  "110164-01": "\u4E2D\u5BCC\u89D2",
  "110164-02": "\u4E2D\u5BCC\u89D2",
  "110165-01": "\u4E2D\u897F",
  "110165-02": "\u4E2D\u897F",
  "110166-01": "\u4E0A\u5BCC",
  "110166-02": "\u4E0A\u5BCC",
  "110167-01": "\u5B66\u6821\u524D\uFF08\u5165\u9593\u90E1\uFF09",
  "110167-02": "\u5B66\u6821\u524D\uFF08\u5165\u9593\u90E1\uFF09",
  "110168-01": "\u5730\u8535\u524D",
  "110168-02": "\u5730\u8535\u524D",
  "110169-01": "\u6C38\u4E45\u4FDD",
  "110169-02": "\u6C38\u4E45\u4FDD",
  "110170-01": "\u516B\u8ED2\u5BB6",
  "110170-02": "\u516B\u8ED2\u5BB6",
  "110171-01": "\u5927\u4E95\u897F\u4E2D\u5B66\u6821\u5165\u53E3",
  "110171-02": "\u5927\u4E95\u897F\u4E2D\u5B66\u6821\u5165\u53E3",
  "110186-01": "\u5C0F\u624B\u6307\u99C5\u5357\u53E3",
  "110186-03": "\u5C0F\u624B\u6307\u99C5\u5357\u53E3",
  "110186-15": "\u5C0F\u624B\u6307\u99C5\u5357\u53E3",
  "110187-01": "\u5C0F\u624B\u6307\u753A\u56DB\u4E01\u76EE",
  "110187-02": "\u5C0F\u624B\u6307\u753A\u56DB\u4E01\u76EE",
  "110188-01": "\u5E02\u6C11\u30D7\u30FC\u30EB\u5165\u53E3",
  "110188-02": "\u5E02\u6C11\u30D7\u30FC\u30EB\u5165\u53E3",
  "110189-01": "\u5C0F\u624B\u6307\u5143\u753A",
  "110189-02": "\u5C0F\u624B\u6307\u5143\u753A",
  "110190-01": "\u3053\u3066\u3055\u3057\u8358",
  "110190-02": "\u3053\u3066\u3055\u3057\u8358",
  "110191-01": "\u3053\u3066\u3055\u3057\u8358\u5165\u53E3",
  "110191-02": "\u3053\u3066\u3055\u3057\u8358\u5165\u53E3",
  "110192-01": "\u5BAE\u5F8C",
  "110192-02": "\u5BAE\u5F8C",
  "110193-01": "\u8A93\u8A5E\u6A4B",
  "110193-02": "\u8A93\u8A5E\u6A4B",
  "110194-01": "\u6240\u6CA2\u30ED\u30A4\u30E4\u30EB\u75C5\u9662\u524D",
  "110194-02": "\u6240\u6CA2\u30ED\u30A4\u30E4\u30EB\u75C5\u9662\u524D",
  "110195-01": "\u30ED\u30A4\u30E4\u30EB\u3053\u3053\u308D\u306E\u91CC\u75C5\u9662",
  "110195-02": "\u30ED\u30A4\u30E4\u30EB\u3053\u3053\u308D\u306E\u91CC\u75C5\u9662",
  "110196-01": "\u5317\u91CE\u7DCF\u5408\u904B\u52D5\u5834\u524D",
  "110196-02": "\u5317\u91CE\u7DCF\u5408\u904B\u52D5\u5834\u524D",
  "110197-01": "\u72ED\u5C71\u6E56\u53E3",
  "110197-02": "\u72ED\u5C71\u6E56\u53E3",
  "110198-01": "\u5927\u65E5\u5802",
  "110198-02": "\u5927\u65E5\u5802",
  "110199-01": "\u82B8\u8853\u7DCF\u5408\u9AD8\u6821",
  "110199-02": "\u82B8\u8853\u7DCF\u5408\u9AD8\u6821",
  "110201-01": "\u65E9\u7A32\u7530\u5927\u5B66",
  "110201-15": "\u65E9\u7A32\u7530\u5927\u5B66",
  "110202-01": "\u5317\u91CE\u5929\u795E\u524D",
  "110202-02": "\u5317\u91CE\u5929\u795E\u524D",
  "110202-03": "\u5317\u91CE\u5929\u795E\u524D",
  "110202-04": "\u5317\u91CE\u5929\u795E\u524D",
  "110203-01-15": "\u5185\u624B",
  "110203-02": "\u5185\u624B",
  "110205-01": "\u5F69\u306E\u30AF\u30EA\u30CB\u30C3\u30AF\u524D",
  "110205-02": "\u5F69\u306E\u30AF\u30EA\u30CB\u30C3\u30AF\u524D",
  "110206-01": "\u9AD8\u5CF0",
  "110206-02": "\u9AD8\u5CF0",
  "110207-01": "\u693F\u5CF0\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5165\u53E3",
  "110207-02": "\u693F\u5CF0\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5165\u53E3",
  "110208-01": "\u693F\u5CF0\u5C0F\u5B66\u6821\u5165\u53E3",
  "110208-02": "\u693F\u5CF0\u5C0F\u5B66\u6821\u5165\u53E3",
  "110209-01": "\u56F3\u66F8\u9928\u524D",
  "110209-02": "\u56F3\u66F8\u9928\u524D",
  "110210-01": "\u693F\u5CF0\u4E2D\u592E",
  "110210-02": "\u693F\u5CF0\u4E2D\u592E",
  "110211-01": "\u4E2D\u592E\u516C\u5712",
  "110211-02": "\u4E2D\u592E\u516C\u5712",
  "110212-01": "\u693F\u5CF0\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "110212-15": "\u693F\u5CF0\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "110219-00-01-02-15": "\u4E0A\u798F\u5CA1\u99C5\u897F\u53E3",
  "110220-01": "\u9DB4\u30F6\u5CA1\u4E00\u4E01\u76EE",
  "110220-02": "\u9DB4\u30F6\u5CA1\u4E00\u4E01\u76EE",
  "110231-01": "\u5927\u6CA2",
  "110231-02": "\u5927\u6CA2",
  "110232-01": "\u5927\u6CA2\u6A4B",
  "110232-02": "\u5927\u6CA2\u6A4B",
  "110233-01": "\u5927\u516D\u5929\u5317",
  "110233-02": "\u5927\u516D\u5929\u5317",
  "110234-01": "\u5927\u516D\u5929",
  "110234-02": "\u5927\u516D\u5929",
  "110235-01": "\u5317\u91CE\uFF08\u6240\u6CA2\u5E02\uFF09",
  "110235-02": "\u5317\u91CE\uFF08\u6240\u6CA2\u5E02\uFF09",
  "110237-01": "\u5C0F\u624B\u6307\u5C0F\u5B66\u6821\u524D",
  "110237-02": "\u5C0F\u624B\u6307\u5C0F\u5B66\u6821\u524D",
  "110238-01": "\u5C0F\u624B\u6307\u4E2D\u5B66\u6821\u524D",
  "110238-02": "\u5C0F\u624B\u6307\u4E2D\u5B66\u6821\u524D",
  "110246-01": "\u7AF6\u8F2A\u5834\u5165\u53E3",
  "110246-02": "\u7AF6\u8F2A\u5834\u5165\u53E3",
  "110462-01": "\u897F\u6B66\u30D0\u30B9\u6240\u6CA2\u55B6\u696D\u6240\uFF08\u8ECA\u5EAB\u5185\uFF09",
  "110462-15": "\u897F\u6B66\u30D0\u30B9\u6240\u6CA2\u55B6\u696D\u6240\uFF08\u8ECA\u5EAB\u5185\uFF09",
  "110464-01": "\u79CB\u6D25\u753A\u4E8C\u4E01\u76EE",
  "110464-02": "\u79CB\u6D25\u753A\u4E8C\u4E01\u76EE",
  "115191-01": "\u4E45\u7C73\u5DDD\u99C5\u5317\u53E3",
  "115191-15": "\u4E45\u7C73\u5DDD\u99C5\u5317\u53E3",
  "120001-00-15": "\u5927\u5BAE\u99C5\u897F\u53E3",
  "120001-01": "\u5927\u5BAE\u99C5\u897F\u53E3",
  "120001-02": "\u5927\u5BAE\u99C5\u897F\u53E3",
  "120001-03-06": "\u5927\u5BAE\u99C5\u897F\u53E3",
  "120001-04": "\u5927\u5BAE\u99C5\u897F\u53E3",
  "120001-05": "\u5927\u5BAE\u99C5\u897F\u53E3",
  "120002-15": "\u30BD\u30CB\u30C3\u30AF\u30B7\u30C6\u30A3\u524D",
  "120003-01": "\u6240\u6CA2\u65B0\u9053",
  "120003-02": "\u6240\u6CA2\u65B0\u9053",
  "120004-01": "\u7A32\u8377\u524D\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120004-02": "\u7A32\u8377\u524D\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120005-01": "\u7A32\u8377\u5742\u4E0A",
  "120005-02": "\u7A32\u8377\u5742\u4E0A",
  "120006-01": "\u5927\u5E73\u516C\u5712\u5165\u53E3",
  "120006-02": "\u5927\u5E73\u516C\u5712\u5165\u53E3",
  "120007-01": "\u4E09\u6A4B\u4E00\u4E01\u76EE",
  "120007-02": "\u4E09\u6A4B\u4E00\u4E01\u76EE",
  "120008-01": "\u897F\u6B66\u8ECA\u5EAB\u524D\uFF08\u5927\u5BAE\u55B6\u696D\u6240\uFF09",
  "120008-02": "\u897F\u6B66\u8ECA\u5EAB\u524D\uFF08\u5927\u5BAE\u55B6\u696D\u6240\uFF09",
  "120011-01": "\u4E09\u6A4B\u7DCF\u5408\u516C\u5712\u5357\u53E3",
  "120011-02": "\u4E09\u6A4B\u7DCF\u5408\u516C\u5712\u5357\u53E3",
  "120011-03": "\u4E09\u6A4B\u7DCF\u5408\u516C\u5712\u5357\u53E3",
  "120011-04": "\u4E09\u6A4B\u7DCF\u5408\u516C\u5712\u5357\u53E3",
  "120012-01": "\u9752\u8449\u5712",
  "120012-02": "\u9752\u8449\u5712",
  "120013-01": "\u4F50\u77E5\u5DDD\u4F4F\u5B85",
  "120013-02": "\u4F50\u77E5\u5DDD\u4F4F\u5B85",
  "120014-00-01": "\u4F50\u77E5\u5DDD\u539F",
  "120016-01": "\u4E09\u6A4B\u4E94\u4E01\u76EE",
  "120016-02": "\u4E09\u6A4B\u4E94\u4E01\u76EE",
  "120017-01": "\u4E09\u6A4B\u516D\u4E01\u76EE",
  "120017-02": "\u4E09\u6A4B\u516D\u4E01\u76EE",
  "120018-01": "\u6771\u4E94\u5473\u8C9D\u6238",
  "120018-02": "\u6771\u4E94\u5473\u8C9D\u6238",
  "120019-01": "\u4E94\u5473\u8C9D\u6238",
  "120019-02": "\u4E94\u5473\u8C9D\u6238",
  "120020-01": "\u65B0\u5C4B\u6577\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120020-02": "\u65B0\u5C4B\u6577\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120021-01": "\u8D64\u7FBD\u6839",
  "120021-02": "\u8D64\u7FBD\u6839",
  "120022-00-01": "\u897F\u904A\u99AC",
  "120022-02": "\u897F\u904A\u99AC",
  "120022-03": "\u897F\u904A\u99AC",
  "120022-04": "\u897F\u904A\u99AC",
  "120026-01-03-06": "\u65B0\u56FD\u9053",
  "120026-02": "\u65B0\u56FD\u9053",
  "120027-01-03-06": "\u5207\u5F15\u5DDD",
  "120027-02": "\u5207\u5F15\u5DDD",
  "120028-01-03": "\u685C\u6728\u56DB\u4E01\u76EE",
  "120028-02": "\u685C\u6728\u56DB\u4E01\u76EE",
  "120029-01-03": "\u4E0A\u5C0F\u753A",
  "120029-02": "\u4E0A\u5C0F\u753A",
  "120030-01-03": "\u897F\u4E0A\u5C0F\u753A",
  "120030-02": "\u897F\u4E0A\u5C0F\u753A",
  "120032-01-03": "\u4E2D\u4E26\u6728",
  "120032-02": "\u4E2D\u4E26\u6728",
  "120033-01-05": "\u4E09\u6A4B\u4E8C\u4E01\u76EE",
  "120033-02": "\u4E09\u6A4B\u4E8C\u4E01\u76EE",
  "120034-01": "\u5927\u5BAE\u56FD\u969B\u4E2D\u7B49\u6559\u80B2\u5B66\u6821",
  "120034-02": "\u5927\u5BAE\u56FD\u969B\u4E2D\u7B49\u6559\u80B2\u5B66\u6821",
  "120034-03": "\u5927\u5BAE\u56FD\u969B\u4E2D\u7B49\u6559\u80B2\u5B66\u6821",
  "120035-00": "\u6C34\u5224\u571F",
  "120035-01-03": "\u6C34\u5224\u571F",
  "120035-02-15": "\u6C34\u5224\u571F",
  "120036-01": "\u4F50\u77E5\u5DDD\u6771",
  "120036-02": "\u4F50\u77E5\u5DDD\u6771",
  "120037-01": "\u4F50\u77E5\u5DDD",
  "120037-02": "\u4F50\u77E5\u5DDD",
  "120038-01": "\u5E02\u55B6\u4F4F\u5B85\u524D\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120038-02": "\u5E02\u55B6\u4F4F\u5B85\u524D\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120039-01": "\u91D1\u5C71\u795E\u793E",
  "120039-02": "\u91D1\u5C71\u795E\u793E",
  "120040-01": "\u99AC\u5BAE\u30B3\u30DF\u30E5\u30CB\u30C6\u30A3\u30BB\u30F3\u30BF\u30FC",
  "120040-02": "\u99AC\u5BAE\u30B3\u30DF\u30E5\u30CB\u30C6\u30A3\u30BB\u30F3\u30BF\u30FC",
  "120041-01": "\u571F\u5C4B\u4E0B",
  "120041-02": "\u571F\u5C4B\u4E0B",
  "120042-01": "\u571F\u5C4B",
  "120042-02": "\u571F\u5C4B",
  "120043-00": "\u6307\u6247\u99C5",
  "120043-01": "\u6307\u6247\u99C5",
  "120051-01": "\u89B3\u97F3\u5BFA",
  "120051-02": "\u89B3\u97F3\u5BFA",
  "120052-01": "\u5927\u5BAE\u5149\u9675\u9AD8\u6821",
  "120052-02": "\u5927\u5BAE\u5149\u9675\u9AD8\u6821",
  "120053-01": "\u690D\u7530\u8C37",
  "120053-02": "\u690D\u7530\u8C37",
  "120054-01": "\u4E09\u6761\u753A",
  "120054-02": "\u4E09\u6761\u753A",
  "120055-01": "\u4E2D\u91CE\u6797",
  "120055-02": "\u4E2D\u91CE\u6797",
  "120056-01": "\u4E2D\u90F7\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120056-02": "\u4E2D\u90F7\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120057-01": "\u4E8C\u30C4\u5BAE\u65B0\u9053",
  "120057-02": "\u4E8C\u30C4\u5BAE\u65B0\u9053",
  "120058-01": "\u4E8C\u30C4\u5BAE",
  "120058-02": "\u4E8C\u30C4\u5BAE",
  "120058-15": "\u4E8C\u30C4\u5BAE",
  "120059-01": "\u904B\u52D5\u5834\u524D",
  "120059-02": "\u904B\u52D5\u5834\u524D",
  "120060-01": "\u6CBB\u6C34\u6A4B\u5824\u9632",
  "120060-02": "\u6CBB\u6C34\u6A4B\u5824\u9632",
  "120061-01": "\u98EF\u7530\u65B0\u7530",
  "120061-02": "\u98EF\u7530\u65B0\u7530",
  "120063-01-15": "\u99AC\u5BAE\u56E3\u5730",
  "120066-01": "\u8239\u6E21\u6A4B",
  "120066-02": "\u8239\u6E21\u6A4B",
  "120067-01": "\u6771\u5927\u4E45\u4FDD",
  "120067-02": "\u6771\u5927\u4E45\u4FDD",
  "120068-01": "\u4E0B\u798F\u5CA1",
  "120068-02": "\u4E0B\u798F\u5CA1",
  "120069-01": "\u798F\u5CA1\u6A4B",
  "120069-02": "\u798F\u5CA1\u6A4B",
  "120070-01": "\u4E0A\u798F\u5CA1\u7DCF\u5408\u75C5\u9662\u524D",
  "120070-02": "\u4E0A\u798F\u5CA1\u7DCF\u5408\u75C5\u9662\u524D",
  "120071-01": "\u8D64\u6CBC",
  "120071-02": "\u8D64\u6CBC",
  "120072-01": "\u4E2D\u798F\u5CA1",
  "120072-02": "\u4E2D\u798F\u5CA1",
  "120073-01": "\u798F\u5CA1\u5C0F\u5B66\u6821",
  "120073-02": "\u798F\u5CA1\u5C0F\u5B66\u6821",
  "120074-01": "\u5929\u795E\u6559\u4F1A\u524D",
  "120074-02": "\u5929\u795E\u6559\u4F1A\u524D",
  "120075-01": "\u65B0\u7530",
  "120075-02": "\u65B0\u7530",
  "120076-01": "\u685C\u901A\u308A",
  "120076-02": "\u685C\u901A\u308A",
  "120077-01": "\u4E0A\u798F\u5CA1",
  "120077-02": "\u4E0A\u798F\u5CA1",
  "120081-01": "\u5357\u4E0A\u5C0F\u753A",
  "120081-02": "\u5357\u4E0A\u5C0F\u753A",
  "120082-01": "\u4E0A\u5C0F\u4EA4\u756A",
  "120082-02": "\u4E0A\u5C0F\u4EA4\u756A",
  "120083-01": "\u304B\u307F\u3053\u516C\u5712",
  "120083-02": "\u304B\u307F\u3053\u516C\u5712",
  "120084-01": "\u4E09\u6A4B\u4E09\u4E01\u76EE\u5317",
  "120084-02": "\u4E09\u6A4B\u4E09\u4E01\u76EE\u5317",
  "120085-01": "\u4E26\u6728\u5357\u753A",
  "120085-02": "\u4E26\u6728\u5357\u753A",
  "120086-01": "\u304B\u307F\u3053\u516C\u5712\u5357",
  "120086-02": "\u304B\u307F\u3053\u516C\u5712\u5357",
  "120087-01": "\u4F4F\u5B85\u524D\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120087-02": "\u4F4F\u5B85\u524D\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120088-01": "\u6C37\u5DDD\u795E\u793E\u524D",
  "120088-02": "\u6C37\u5DDD\u795E\u793E\u524D",
  "120091-01": "\u6771\u4E0A\u5C0F\u753A",
  "120091-02": "\u6771\u4E0A\u5C0F\u753A",
  "120092-01": "\u4E0A\u5C0F\u5C0F\u5B66\u6821",
  "120092-02": "\u4E0A\u5C0F\u5C0F\u5B66\u6821",
  "120093-01": "\u4E0A\u843D\u5408\u516B\u4E01\u76EE",
  "120093-02": "\u4E0A\u843D\u5408\u516B\u4E01\u76EE",
  "120094-01": "\u4E0A\u843D\u5408\u4E03\u4E01\u76EE",
  "120094-02": "\u4E0A\u843D\u5408\u4E03\u4E01\u76EE",
  "120095-01": "\u4E0A\u843D\u5408\u4E5D\u4E01\u76EE",
  "120095-02": "\u4E0A\u843D\u5408\u4E5D\u4E01\u76EE",
  "120096-01": "\u5409\u6577\u4E00\u4E01\u76EE",
  "120096-02": "\u5409\u6577\u4E00\u4E01\u76EE",
  "120097-01": "\u4EF2\u753A\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120097-02": "\u4EF2\u753A\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120098-00": "\u5927\u5BAE\u99C5\u6771\u53E3",
  "120098-01": "\u5927\u5BAE\u99C5\u6771\u53E3",
  "120101-01-03": "\u4E09\u6A4B\u56DB\u4E01\u76EE",
  "120101-02": "\u4E09\u6A4B\u56DB\u4E01\u76EE",
  "120102-01": "\u4E09\u6A4B\u4E09\u4E01\u76EE",
  "120102-02": "\u4E09\u6A4B\u4E09\u4E01\u76EE",
  "120103-01": "\u5186\u963F\u5F25\u4E94\u4E01\u76EE",
  "120103-02": "\u5186\u963F\u5F25\u4E94\u4E01\u76EE",
  "120104-01": "\u65E5\u679D\u795E\u793E",
  "120104-02": "\u65E5\u679D\u795E\u793E",
  "120105-01-05": "\u30A4\u30AA\u30F3\u30E2\u30FC\u30EB\u4E0E\u91CE",
  "120105-02": "\u30A4\u30AA\u30F3\u30E2\u30FC\u30EB\u4E0E\u91CE",
  "120106-01-05": "\u5186\u963F\u5F25",
  "120106-02": "\u5186\u963F\u5F25",
  "120108-01": "\u6D45\u9593\u795E\u793E",
  "120108-02": "\u6D45\u9593\u795E\u793E",
  "120109-01": "\u4E09\u30C4\u53C8",
  "120109-02": "\u4E09\u30C4\u53C8",
  "120110-01": "\u516B\u738B\u5B50",
  "120110-02": "\u516B\u738B\u5B50",
  "120111-01": "\u516B\u738B\u5B50\u5E9A\u7533\u5802",
  "120111-02": "\u516B\u738B\u5B50\u5E9A\u7533\u5802",
  "120112-01": "\u767D\u936C",
  "120112-02": "\u767D\u936C",
  "120113-01": "\u5CF6\u6839\u6A4B",
  "120113-02": "\u5CF6\u6839\u6A4B",
  "120114-01": "\u52A0\u8302\u5DDD\u56E3\u5730\u5165\u53E3",
  "120114-02": "\u52A0\u8302\u5DDD\u56E3\u5730\u5165\u53E3",
  "120114-03": "\u52A0\u8302\u5DDD\u56E3\u5730\u5165\u53E3",
  "120115-00-01-02": "\u52A0\u8302\u5DDD\u56E3\u5730",
  "120115-03": "\u52A0\u8302\u5DDD\u56E3\u5730",
  "120115-15": "\u52A0\u8302\u5DDD\u56E3\u5730",
  "120116-01": "\u6771\u5149\u9662\u524D",
  "120116-02": "\u6771\u5149\u9662\u524D",
  "120117-01": "\u4E09\u6761\u753A\u6771",
  "120117-02": "\u4E09\u6761\u753A\u6771",
  "120118-01": "\u5927\u5BAE\u5357\u9AD8\u6821",
  "120118-03": "\u5927\u5BAE\u5357\u9AD8\u6821",
  "120118-15": "\u5927\u5BAE\u5357\u9AD8\u6821",
  "120119-01": "\u3055\u3044\u305F\u307E\u5E02\u6C11\u533B\u7642\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "120119-02": "\u3055\u3044\u305F\u307E\u5E02\u6C11\u533B\u7642\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "120120-01": "\u3055\u3044\u305F\u307E\u5E02\u6C11\u533B\u7642\u30BB\u30F3\u30BF\u30FC",
  "120121-01": "\u767D\u936C\u53E3",
  "120121-02": "\u767D\u936C\u53E3",
  "120122-01": "\u5728\u5BB6",
  "120122-02": "\u5728\u5BB6",
  "120123-01": "\u5BBF",
  "120123-02": "\u5BBF",
  "120124-01": "\u5927\u4E45\u4FDD\u5C0F\u5B66\u6821",
  "120124-02": "\u5927\u4E45\u4FDD\u5C0F\u5B66\u6821",
  "120125-01": "\u5927\u4E45\u4FDD\u652F\u6240",
  "120125-02": "\u5927\u4E45\u4FDD\u652F\u6240",
  "120126-00": "\u6D66\u548C\u5317\u9AD8\u6821",
  "120126-01": "\u6D66\u548C\u5317\u9AD8\u6821",
  "120130-01": "\u3055\u3044\u305F\u307E\u65B0\u90FD\u5FC3\u99C5\u897F\u53E3",
  "120130-15": "\u3055\u3044\u305F\u307E\u65B0\u90FD\u5FC3\u99C5\u897F\u53E3",
  "120131-02": "\u5317\u4E0E\u91CE\u99C5\u5165\u53E3",
  "120132-01": "\u5317\u4E0E\u91CE\u99C5",
  "120132-02": "\u5317\u4E0E\u91CE\u99C5",
  "120133-01": "\u516B\u5E61\u901A\u308A",
  "120133-02": "\u516B\u5E61\u901A\u308A",
  "120134-02": "\u5C0F\u6751\u7530",
  "120134-05": "\u5C0F\u6751\u7530",
  "120135-01": "\u4E0E\u91CE\u9727\u6577\u5DDD",
  "120135-02": "\u4E0E\u91CE\u9727\u6577\u5DDD",
  "120150-01": "\u5F69\u306E\u56FD\u3055\u3044\u305F\u307E\u82B8\u8853\u5287\u5834\u5165\u53E3",
  "120150-02": "\u5F69\u306E\u56FD\u3055\u3044\u305F\u307E\u82B8\u8853\u5287\u5834\u5165\u53E3",
  "120151-01": "\u6D66\u548C\u897F\u8B66\u5BDF\u7F72\u5165\u53E3",
  "120151-02": "\u6D66\u548C\u897F\u8B66\u5BDF\u7F72\u5165\u53E3",
  "120152-01": "\u9234\u8C37\u5927\u304B\u3084\u524D",
  "120152-02": "\u9234\u8C37\u5927\u304B\u3084\u524D",
  "120153-01": "\u9234\u8C37",
  "120153-02": "\u9234\u8C37",
  "120154-01": "\u91CC\u898B\u6A4B",
  "120154-02": "\u91CC\u898B\u6A4B",
  "120155-01": "\u91CC\u898B\u901A\u308A",
  "120155-02": "\u91CC\u898B\u901A\u308A",
  "120156-01": "\u4E8C\u5EA6\u6817\u5C71",
  "120156-02": "\u4E8C\u5EA6\u6817\u5C71",
  "120157-01": "\u5317\u6D66\u548C\u56DB\u4E01\u76EE",
  "120157-02": "\u5317\u6D66\u548C\u56DB\u4E01\u76EE",
  "120158-00": "\u5317\u6D66\u548C\u99C5",
  "120158-01": "\u5317\u6D66\u548C\u99C5",
  "120158-03": "\u5317\u6D66\u548C\u99C5",
  "120161-01": "\u9663\u5C4B\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120161-02": "\u9663\u5C4B\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120162-01": "\u8ACF\u8A2A\u5742",
  "120162-02": "\u8ACF\u8A2A\u5742",
  "120163-01": "\u5927\u4E45\u4FDD\u56E3\u5730\u6771",
  "120163-02": "\u5927\u4E45\u4FDD\u56E3\u5730\u6771",
  "120164-01": "\u5927\u4E45\u4FDD\u56E3\u5730",
  "120164-02": "\u5927\u4E45\u4FDD\u56E3\u5730",
  "120166-01": "\u7247\u753A",
  "120166-02": "\u7247\u753A",
  "120167-01": "\u9818\u5BB6",
  "120167-02": "\u9818\u5BB6",
  "120168-00": "\u5927\u4E45\u4FDD\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120168-01": "\u5927\u4E45\u4FDD\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120168-02": "\u5927\u4E45\u4FDD\uFF08\u3055\u3044\u305F\u307E\u5E02\uFF09",
  "120171-01": "\u5E38\u76E4\u5341\u4E01\u76EE",
  "120171-02": "\u5E38\u76E4\u5341\u4E01\u76EE",
  "120172-01": "\u5927\u6238\u5C0F\u5B66\u6821",
  "120172-02": "\u5927\u6238\u5C0F\u5B66\u6821",
  "120173-01": "\u9234\u8C37\u5C0F\u5B66\u6821",
  "120173-02": "\u9234\u8C37\u5C0F\u5B66\u6821",
  "120174-01": "\u5357\u4E0E\u91CE\u99C5\u5317\u5165\u53E3",
  "120174-02": "\u5357\u4E0E\u91CE\u99C5\u5317\u5165\u53E3",
  "120175-01": "\u9234\u8C37\u672D\u306E\u8FBB",
  "120175-02": "\u9234\u8C37\u672D\u306E\u8FBB",
  "120176-01": "\u5C71\u4E45\u4FDD",
  "120176-02": "\u5C71\u4E45\u4FDD",
  "120177-01": "\u6804\u548C\u5317\u753A",
  "120177-02": "\u6804\u548C\u5317\u753A",
  "120179-00": "\u57FC\u7389\u5927\u5B66",
  "120179-01": "\u57FC\u7389\u5927\u5B66",
  "120180-00": "\u5357\u4E0E\u91CE\u99C5\u897F\u53E3",
  "120180-01": "\u5357\u4E0E\u91CE\u99C5\u897F\u53E3",
  "120181-01": "\u9AD8\u6728",
  "120181-02": "\u9AD8\u6728",
  "120182-01": "\u672C\u90F7\u88CF",
  "120182-02": "\u672C\u90F7\u88CF",
  "120184-01": "\u5927\u6CC9\u9662\u901A\u308A",
  "120184-02": "\u5927\u6CC9\u9662\u901A\u308A",
  "120185-01": "\u6148\u5BF6\u9662",
  "120185-02": "\u6148\u5BF6\u9662",
  "120186-01": "\u5074\u30F6\u8C37\u6238",
  "120186-02": "\u5074\u30F6\u8C37\u6238",
  "120187-01": "\u4E09\u6A4B\u56DB\u4E01\u76EE\u5357",
  "120187-02": "\u4E09\u6A4B\u56DB\u4E01\u76EE\u5357",
  "120188-01": "\u85E4\u6A4B\u3010\u96FB\u5EFA\u4F4F\u5B85\u5165\u53E3\u3011",
  "120188-02": "\u85E4\u6A4B\u3010\u96FB\u5EFA\u4F4F\u5B85\u5165\u53E3\u3011",
  "120189-01": "\u516D\u90E8\u5802",
  "120189-02": "\u516D\u90E8\u5802",
  "120190-01-03": "\u4E09\u6A4B\u4E8C\u4E01\u76EE\u5357",
  "120190-02": "\u4E09\u6A4B\u4E8C\u4E01\u76EE\u5357",
  "120194-01": "\u8D64\u7FBD\u6839\u897F",
  "120194-02": "\u8D64\u7FBD\u6839\u897F",
  "120200-01": "\u6148\u773C\u5BFA",
  "120200-02": "\u6148\u773C\u5BFA",
  "120205-01": "\u897F\u904A\u99AC\u6D88\u9632\u51FA\u5F35\u6240",
  "120205-02": "\u897F\u904A\u99AC\u6D88\u9632\u51FA\u5F35\u6240",
  "120227-01": "\u3073\u3093\u6CBC\u81EA\u7136\u516C\u5712\u5165\u53E3",
  "120227-02": "\u3073\u3093\u6CBC\u81EA\u7136\u516C\u5712\u5165\u53E3",
  "120228-01": "\u5357\u7551\u754C",
  "120228-02": "\u5357\u7551\u754C",
  "120229-01": "\u9053\u5834",
  "120229-02": "\u9053\u5834",
  "120230-01": "\u5BCC\u58EB\u898B\u9AD8\u6821\u5165\u53E3",
  "120230-02": "\u5BCC\u58EB\u898B\u9AD8\u6821\u5165\u53E3",
  "120231-01": "\u4E0B\u7530",
  "120231-02": "\u4E0B\u7530",
  "120232-01-15": "\u3089\u3089\u307D\u30FC\u3068\u5BCC\u58EB\u898B",
  "125015-01": "\u8DB3\u7ACB\u795E\u793E",
  "125015-02": "\u8DB3\u7ACB\u795E\u793E",
  "125016-01": "\u98EF\u7530\u5BBF",
  "125016-02": "\u98EF\u7530\u5BBF",
  "125027-01": "\u85E4\u6CA2\u5357\u5C0F\u5B66\u6821",
  "125027-02": "\u85E4\u6CA2\u5357\u5C0F\u5B66\u6821",
  "125028-01": "\u3052\u3093\u304D\u6A4B",
  "125028-02": "\u3052\u3093\u304D\u6A4B",
  "125029-01": "\u5065\u5EB7\u798F\u7949\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "125029-02": "\u5065\u5EB7\u798F\u7949\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "125030-01": "\u5B89\u5DDD\u96FB\u6A5F\u524D",
  "125030-02": "\u5B89\u5DDD\u96FB\u6A5F\u524D",
  "125149-01-03": "\u4E26\u6728\u516C\u5712",
  "125149-02": "\u4E26\u6728\u516C\u5712",
  "130001-01": "\u672C\u5DDD\u8D8A\u99C5",
  "130001-02": "\u672C\u5DDD\u8D8A\u99C5",
  "130001-15": "\u672C\u5DDD\u8D8A\u99C5",
  "130006-01-05": "\u8107\u7530\u753A",
  "130006-02": "\u8107\u7530\u753A",
  "130007-01": "\u5DDD\u8D8A\u99C5\u6771\u53E3",
  "130008-01": "\u83C5\u539F\u753A",
  "130008-02": "\u83C5\u539F\u753A",
  "130009-01": "\u4ED9\u6CE2\u753A\u4E8C\u4E01\u76EE",
  "130009-02": "\u4ED9\u6CE2\u753A\u4E8C\u4E01\u76EE",
  "130010-01": "\u559C\u591A\u9662\u5165\u53E3",
  "130010-02": "\u559C\u591A\u9662\u5165\u53E3",
  "130011-01": "\u5C0F\u4ED9\u6CE2\u753A\u56DB\u4E01\u76EE",
  "130011-02": "\u5C0F\u4ED9\u6CE2\u753A\u56DB\u4E01\u76EE",
  "130017-01": "\u4ED9\u6CE2\u4E0B",
  "130017-02": "\u4ED9\u6CE2\u4E0B",
  "130018-01": "\u5DDD\u8D8A\u8B66\u5BDF\u7F72\u5165\u53E3",
  "130018-02": "\u5DDD\u8D8A\u8B66\u5BDF\u7F72\u5165\u53E3",
  "130019-01": "\u5DDD\u8D8A\u5E02\u6C11\u8056\u82D1\u3084\u3059\u3089\u304E\u306E\u3055\u3068",
  "130019-02": "\u5DDD\u8D8A\u5E02\u6C11\u8056\u82D1\u3084\u3059\u3089\u304E\u306E\u3055\u3068",
  "130021-01": "\u4F0A\u4F50\u6CBC\u5192\u967A\u306E\u68EE",
  "130021-02": "\u4F0A\u4F50\u6CBC\u5192\u967A\u306E\u68EE",
  "130022-01": "\u611B\u548C\u75C5\u9662\u5165\u53E3",
  "130022-02": "\u611B\u548C\u75C5\u9662\u5165\u53E3",
  "130023-01": "\u53E4\u8C37\u4E0A",
  "130023-02": "\u53E4\u8C37\u4E0A",
  "130024-01": "\u5DDD\u8D8A\u8056\u5730\u970A\u5712\u5165\u53E3",
  "130024-02": "\u5DDD\u8D8A\u8056\u5730\u970A\u5712\u5165\u53E3",
  "130025-01": "\u53E4\u8C37\u5C0F\u5B66\u6821",
  "130025-02": "\u53E4\u8C37\u5C0F\u5B66\u6821",
  "130026-00-15": "\u5DDD\u8D8A\u30B0\u30EA\u30FC\u30F3\u30D1\u30FC\u30AF",
  "130026-01": "\u5DDD\u8D8A\u30B0\u30EA\u30FC\u30F3\u30D1\u30FC\u30AF",
  "130026-02": "\u5DDD\u8D8A\u30B0\u30EA\u30FC\u30F3\u30D1\u30FC\u30AF",
  "130036-01-15": "\u5357\u53E4\u8C37\u99C5",
  "130037-01": "\u5DDD\u8D8A\u7A0E\u52D9\u7F72\u5165\u53E3",
  "130037-02": "\u5DDD\u8D8A\u7A0E\u52D9\u7F72\u5165\u53E3",
  "130038-01": "\u6728\u91CE\u76EE\u516D\u89D2",
  "130038-02": "\u6728\u91CE\u76EE\u516D\u89D2",
  "130039-01": "\u6771\u90A6\u97F3\u697D\u5927\u5B66\u524D",
  "130039-02": "\u6771\u90A6\u97F3\u697D\u5927\u5B66\u524D",
  "130040-01": "\u4ECA\u6CC9\u56E3\u5730\u5165\u53E3",
  "130040-02": "\u4ECA\u6CC9\u56E3\u5730\u5165\u53E3",
  "130041-01": "\u3055\u304F\u3089\u5824\u56E3\u5730",
  "130041-02": "\u3055\u304F\u3089\u5824\u56E3\u5730",
  "130042-01": "\u5B66\u6821\u5165\u53E3",
  "130042-02": "\u5B66\u6821\u5165\u53E3",
  "130043-01": "\u57CE\u5317\u57FC\u7389\u4E2D\u5B66\u30FB\u9AD8\u7B49\u5B66\u6821",
  "130043-02": "\u57CE\u5317\u57FC\u7389\u4E2D\u5B66\u30FB\u9AD8\u7B49\u5B66\u6821",
  "130044-01": "\u5927\u65E5\u672C\u5370\u5237\u524D",
  "130044-02": "\u5927\u65E5\u672C\u5370\u5237\u524D",
  "130045-01": "\u3075\u3058\u307F\u91CE\u5E02\u5F79\u6240",
  "130045-02": "\u3075\u3058\u307F\u91CE\u5E02\u5F79\u6240",
  "130046-01": "\u4E0A\u91CE\u53F0\u56E3\u5730",
  "130046-02": "\u4E0A\u91CE\u53F0\u56E3\u5730",
  "130048-01": "\u5BCC\u58EB\u898B\u901A\u308A",
  "130048-02": "\u5BCC\u58EB\u898B\u901A\u308A",
  "130049-01": "\u4E80\u4E45\u4FDD",
  "130049-02": "\u4E80\u4E45\u4FDD",
  "130050-01": "\u9DB4\u30F6\u5CA1\u4E8C\u4E01\u76EE",
  "130050-02": "\u9DB4\u30F6\u5CA1\u4E8C\u4E01\u76EE",
  "130051-01": "\u96FB\u6C17\u8208\u696D\u524D",
  "130051-02": "\u96FB\u6C17\u8208\u696D\u524D",
  "130052-01": "\u5927\u4E95\u4E2D\u592E\u56DB\u4E01\u76EE",
  "130052-02": "\u5927\u4E95\u4E2D\u592E\u56DB\u4E01\u76EE",
  "130053-01": "\u7DD1\u30F6\u4E18\u4E00\u4E01\u76EE",
  "130053-02": "\u7DD1\u30F6\u4E18\u4E00\u4E01\u76EE",
  "130054-01": "\u4E09\u89D2",
  "130054-02": "\u4E09\u89D2",
  "130055-01": "\u307F\u3069\u308A\u30F6\u4E18\u4F4F\u5B85",
  "130055-02": "\u307F\u3069\u308A\u30F6\u4E18\u4F4F\u5B85",
  "130056-01": "\u5927\u91CE\u539F\uFF08\u3075\u3058\u307F\u91CE\u5E02\uFF09",
  "130056-02": "\u5927\u91CE\u539F\uFF08\u3075\u3058\u307F\u91CE\u5E02\uFF09",
  "130057-01": "\u516B\u4E01\uFF08\u3075\u3058\u307F\u91CE\u5E02\uFF09",
  "130057-02": "\u516B\u4E01\uFF08\u3075\u3058\u307F\u91CE\u5E02\uFF09",
  "130058-01": "\u901A\u4FE1\u6240\u524D",
  "130058-02": "\u901A\u4FE1\u6240\u524D",
  "130059-01": "\u5DDD\u3075\u3058",
  "130059-02": "\u5DDD\u3075\u3058",
  "130060-01": "\u5BCC\u5BB6\u75C5\u9662",
  "130060-02": "\u5BCC\u5BB6\u75C5\u9662",
  "130061-01": "\u9152\u4E95\u91CD\u5DE5\u524D",
  "130061-02": "\u9152\u4E95\u91CD\u5DE5\u524D",
  "130062-01": "\u5E73\u548C\u6D44\u82D1",
  "130062-02": "\u5E73\u548C\u6D44\u82D1",
  "130065-01": "\u5DDD\u8D8A\u99C5\u897F\u53E3",
  "130065-02-04": "\u5DDD\u8D8A\u99C5\u897F\u53E3",
  "130065-03": "\u5DDD\u8D8A\u99C5\u897F\u53E3",
  "130065-05": "\u5DDD\u8D8A\u99C5\u897F\u53E3",
  "130065-15": "\u5DDD\u8D8A\u99C5\u897F\u53E3",
  "130066-01-05": "\u8107\u7530\u30AC\u30FC\u30C9",
  "130066-02": "\u8107\u7530\u30AC\u30FC\u30C9",
  "130067-01": "\u65B0\u5BBF\u753A\u4E00\u4E01\u76EE",
  "130067-02": "\u65B0\u5BBF\u753A\u4E00\u4E01\u76EE",
  "130068-01": "\u57CE\u5357\u4E2D\u5B66\u5165\u53E3",
  "130068-02": "\u57CE\u5357\u4E2D\u5B66\u5165\u53E3",
  "130069-01": "\u5E02\u7ACB\u5DDD\u8D8A\u9AD8\u6821\u5165\u53E3",
  "130069-02": "\u5E02\u7ACB\u5DDD\u8D8A\u9AD8\u6821\u5165\u53E3",
  "130070-01": "\u5DDD\u8D8A\u540C\u4EC1\u4F1A\u75C5\u9662\u5165\u53E3",
  "130070-02": "\u5DDD\u8D8A\u540C\u4EC1\u4F1A\u75C5\u9662\u5165\u53E3",
  "130071-01": "\u516B\u96F2\u795E\u793E",
  "130071-02": "\u516B\u96F2\u795E\u793E",
  "130072-01": "\u4ECA\u798F",
  "130072-02": "\u4ECA\u798F",
  "130073-01": "\u304B\u3059\u307F\u753A",
  "130073-02": "\u304B\u3059\u307F\u753A",
  "130074-01": "\u4ECA\u798F\u5C71\u7530",
  "130074-02": "\u4ECA\u798F\u5C71\u7530",
  "130075-01": "\u770C\u55B6\u4ECA\u798F\u56E3\u5730",
  "130075-02": "\u770C\u55B6\u4ECA\u798F\u56E3\u5730",
  "130076-01": "\u798F\u539F\u516C\u6C11\u9928\u524D",
  "130076-02": "\u798F\u539F\u516C\u6C11\u9928\u524D",
  "130077-01": "\u4E2D\u798F",
  "130077-02": "\u4E2D\u798F",
  "130078-01": "\u677E\u539F",
  "130078-02": "\u677E\u539F",
  "130079-01": "\u4E0B\u8D64\u5742",
  "130079-02": "\u4E0B\u8D64\u5742",
  "130080-01": "\u30C8\u30FC\u30E8\u30FC\u30B1\u30E0\u524D",
  "130080-02": "\u30C8\u30FC\u30E8\u30FC\u30B1\u30E0\u524D",
  "130081-01-15": "\u4E0A\u8D64\u5742",
  "130081-02": "\u4E0A\u8D64\u5742",
  "130081-03": "\u4E0A\u8D64\u5742",
  "130082-01": "\u304F\u306C\u304E\u5C71",
  "130082-02": "\u304F\u306C\u304E\u5C71",
  "130083-01": "\u30B7\u30C1\u30BA\u30F3\u524D",
  "130083-02": "\u30B7\u30C1\u30BA\u30F3\u524D",
  "130084-01": "\u897F\u6B66\u30D0\u30B9\u6240\u6CA2\u55B6\u696D\u6240",
  "130084-02": "\u897F\u6B66\u30D0\u30B9\u6240\u6CA2\u55B6\u696D\u6240",
  "130084-15": "\u897F\u6B66\u30D0\u30B9\u6240\u6CA2\u55B6\u696D\u6240",
  "130086-01": "\u897F\u6B66\u30D5\u30E9\u30EF\u30FC\u30D2\u30EB",
  "130086-15": "\u897F\u6B66\u30D5\u30E9\u30EF\u30FC\u30D2\u30EB",
  "130087-01": "\u30B7\u30E7\u30C3\u30D4\u30F3\u30B0\u30BB\u30F3\u30BF\u30FC\u524D",
  "130087-02": "\u30B7\u30E7\u30C3\u30D4\u30F3\u30B0\u30BB\u30F3\u30BF\u30FC\u524D",
  "130088-01": "\u96EA\u898B\u30F6\u539F",
  "130088-02": "\u96EA\u898B\u30F6\u539F",
  "130089-01": "\u79CB\u8349\u5B66\u5712\u9AD8\u6821",
  "130090-01": "\u5341\u56DB\u8ED2",
  "130090-02": "\u5341\u56DB\u8ED2",
  "130091-01": "\u5BCC\u5CA1",
  "130091-02": "\u5BCC\u5CA1",
  "130092-01": "\u4E0B\u5BCC",
  "130092-02": "\u4E0B\u5BCC",
  "130093-01": "\u6240\u6CA2\u65B0\u7530",
  "130093-02": "\u6240\u6CA2\u65B0\u7530",
  "130094-01": "\u82B1\u5712\u56DB\u4E01\u76EE",
  "130094-02": "\u82B1\u5712\u56DB\u4E01\u76EE",
  "130101-01-04": "\u30A6\u30A7\u30B9\u30BF\u5DDD\u8D8A\u524D",
  "130101-02-03": "\u30A6\u30A7\u30B9\u30BF\u5DDD\u8D8A\u524D",
  "130102-01": "\u65B0\u5BBF\u753A",
  "130102-02": "\u65B0\u5BBF\u753A",
  "130103-01": "\u5E02\u7ACB\u5DDD\u8D8A\u9AD8\u6821\u524D",
  "130103-02": "\u5E02\u7ACB\u5DDD\u8D8A\u9AD8\u6821\u524D",
  "130104-01": "\u65ED\u753A\uFF08\u5DDD\u8D8A\u5E02\uFF09",
  "130104-02": "\u65ED\u753A\uFF08\u5DDD\u8D8A\u5E02\uFF09",
  "130105-01": "\u6B66\u8535\u91CE\u5C0F\u5B66\u6821\u5165\u53E3",
  "130105-02": "\u6B66\u8535\u91CE\u5C0F\u5B66\u6821\u5165\u53E3",
  "130106-01": "\u4E2D\u53F0\u6A4B",
  "130106-02": "\u4E2D\u53F0\u6A4B",
  "130107-01": "\u4ECA\u798F\u6B66\u8535\u91CE",
  "130107-02": "\u4ECA\u798F\u6B66\u8535\u91CE",
  "130108-01": "\u3064\u3064\u3058\u30F6\u4E18\u4F4F\u5B85\u5165\u53E3",
  "130108-02": "\u3064\u3064\u3058\u30F6\u4E18\u4F4F\u5B85\u5165\u53E3",
  "130109-01": "\u4ECA\u798F\u4E2D\u53F0",
  "130109-02": "\u4ECA\u798F\u4E2D\u53F0",
  "130109-15": "\u4ECA\u798F\u4E2D\u53F0",
  "130111-01": "\u5411\u30CE\u539F",
  "130111-02": "\u5411\u30CE\u539F",
  "130112-01": "\u6708\u5C71",
  "130112-02": "\u6708\u5C71",
  "130113-01": "\u67F3\u7AAA",
  "130113-02": "\u67F3\u7AAA",
  "130114-01": "\u5DE5\u696D\u56E3\u5730\u6771",
  "130114-02": "\u5DE5\u696D\u56E3\u5730\u6771",
  "130126-01": "\u5357\u53F0\u4E00\u4E01\u76EE",
  "130126-02": "\u5357\u53F0\u4E00\u4E01\u76EE",
  "130127-01": "\u5DDD\u8D8A\u55B6\u696D\u6240",
  "130127-02": "\u5DDD\u8D8A\u55B6\u696D\u6240",
  "130127-15": "\u5DDD\u8D8A\u55B6\u696D\u6240",
  "130128-01": "\u672C\u7530\u91D1\u5C5E\u6280\u8853\u524D",
  "130128-02": "\u672C\u7530\u91D1\u5C5E\u6280\u8853\u524D",
  "130131-00-15": "\u65B0\u72ED\u5C71\u99C5\u5357\u53E3",
  "130131-01": "\u65B0\u72ED\u5C71\u99C5\u5357\u53E3",
  "130132-01": "\u4E00\u4E01\u76EE\u4EA4\u5DEE\u70B9",
  "130132-02": "\u4E00\u4E01\u76EE\u4EA4\u5DEE\u70B9",
  "130133-01": "\u65B0\u72ED\u5C71\u4E00\u4E01\u76EE",
  "130133-02": "\u65B0\u72ED\u5C71\u4E00\u4E01\u76EE",
  "130134-01": "\u65B0\u5C4B\u6577\uFF08\u72ED\u5C71\u5E02\uFF09",
  "130134-02": "\u65B0\u5C4B\u6577\uFF08\u72ED\u5C71\u5E02\uFF09",
  "130135-01": "\u9752\u67F3",
  "130135-02": "\u9752\u67F3",
  "130136-01": "\u30CF\u30A4\u30C4\u6771",
  "130136-02": "\u30CF\u30A4\u30C4\u6771",
  "130137-01": "\u65B0\u72ED\u5C71\u30CF\u30A4\u30C4",
  "130137-15": "\u65B0\u72ED\u5C71\u30CF\u30A4\u30C4",
  "130140-01": "\u8349\u5208\u8857\u9053",
  "130140-02": "\u8349\u5208\u8857\u9053",
  "130141-01": "\u5800\u517C\u8FB2\u5354\u524D",
  "130141-02": "\u5800\u517C\u8FB2\u5354\u524D",
  "130142-01": "\u5800\u517C",
  "130142-02": "\u5800\u517C",
  "130143-01": "\u8D6B\u4E0B",
  "130143-02": "\u8D6B\u4E0B",
  "130144-01": "\u4E0B\u65B0\u7530",
  "130144-02": "\u4E0B\u65B0\u7530",
  "130145-01": "\u4E0B\u6C34\u91CE",
  "130145-02": "\u4E0B\u6C34\u91CE",
  "130146-01": "\u6C34\u62BC\u4F4F\u5B85",
  "130146-02": "\u6C34\u62BC\u4F4F\u5B85",
  "130147-01": "\u5357\u5165\u66FD",
  "130147-02": "\u5357\u5165\u66FD",
  "130149-01": "\u5165\u66FD\u99C5\u6771\u53E3",
  "130149-15": "\u5165\u66FD\u99C5\u6771\u53E3",
  "130152-01": "\u52A0\u4F50\u5FD7",
  "130152-02": "\u52A0\u4F50\u5FD7",
  "130153-01": "\u72ED\u5C71\u53F0\u5317",
  "130153-02": "\u72ED\u5C71\u53F0\u5317",
  "130156-01": "\u72ED\u5C71\u53F0\u56E3\u5730",
  "130156-02": "\u72ED\u5C71\u53F0\u56E3\u5730",
  "130156-03": "\u72ED\u5C71\u53F0\u56E3\u5730",
  "130156-15": "\u72ED\u5C71\u53F0\u56E3\u5730",
  "130157-01": "\u72ED\u5C71\u53F0\u4E00\u4E01\u76EE",
  "130157-02": "\u72ED\u5C71\u53F0\u4E00\u4E01\u76EE",
  "130158-01": "\u72ED\u5C71\u53F0\u4E8C\u4E01\u76EE",
  "130158-02": "\u72ED\u5C71\u53F0\u4E8C\u4E01\u76EE",
  "130159-01": "\u72ED\u5C71\u53F0\u30B7\u30E7\u30C3\u30D4\u30F3\u30B0\u30BB\u30F3\u30BF\u30FC\u524D",
  "130159-02": "\u72ED\u5C71\u53F0\u30B7\u30E7\u30C3\u30D4\u30F3\u30B0\u30BB\u30F3\u30BF\u30FC\u524D",
  "130160-01": "\u897F\u6B66\u72ED\u5C71\u53F0\u30CF\u30A4\u30C4",
  "130160-02": "\u897F\u6B66\u72ED\u5C71\u53F0\u30CF\u30A4\u30C4",
  "130161-01": "\u4E95\u6238\u7AAA",
  "130161-02": "\u4E95\u6238\u7AAA",
  "130164-01": "\u30B0\u30E9\u30F3\u30C9\u5165\u53E3\uFF08\u72ED\u5C71\u5E02\uFF09",
  "130164-02": "\u30B0\u30E9\u30F3\u30C9\u5165\u53E3\uFF08\u72ED\u5C71\u5E02\uFF09",
  "130165-01": "\u72ED\u5C71\u53F0\u516C\u6C11\u9928\u5165\u53E3",
  "130165-02": "\u72ED\u5C71\u53F0\u516C\u6C11\u9928\u5165\u53E3",
  "130166-01": "\u72ED\u5C71\u53F0\u4E09\u4E01\u76EE",
  "130166-02": "\u72ED\u5C71\u53F0\u4E09\u4E01\u76EE",
  "130167-01": "\u72ED\u5C71\u53F0\u56DB\u4E01\u76EE",
  "130167-02": "\u72ED\u5C71\u53F0\u56DB\u4E01\u76EE",
  "130168-01": "\u72ED\u5C71\u53F0\u5357",
  "130168-02": "\u72ED\u5C71\u53F0\u5357",
  "130169-01": "\u5FA1\u72E9\u5834",
  "130169-02": "\u5FA1\u72E9\u5834",
  "130170-01": "\u5BCC\u58EB\u898B\u516C\u6C11\u9928\u5165\u53E3",
  "130170-02": "\u5BCC\u58EB\u898B\u516C\u6C11\u9928\u5165\u53E3",
  "130171-01": "\u5BCC\u58EB\u898B\u4E8C\u4E01\u76EE",
  "130171-02": "\u5BCC\u58EB\u898B\u4E8C\u4E01\u76EE",
  "130172-01": "\u5BCC\u58EB\u898B",
  "130172-02": "\u5BCC\u58EB\u898B",
  "130173-01": "\u72ED\u5C71\u539A\u751F\u75C5\u9662\u5165\u53E3",
  "130173-02": "\u72ED\u5C71\u539A\u751F\u75C5\u9662\u5165\u53E3",
  "130174-01": "\u5165\u9593\u5DDD\u75C5\u9662\u524D",
  "130174-02": "\u5165\u9593\u5DDD\u75C5\u9662\u524D",
  "130175-01": "\u72ED\u5C71\u90F5\u4FBF\u5C40",
  "130175-02": "\u72ED\u5C71\u90F5\u4FBF\u5C40",
  "130176-01": "\u72ED\u5C71\u5E02\u99C5\u6771\u53E3",
  "130176-02": "\u72ED\u5C71\u5E02\u99C5\u6771\u53E3",
  "130176-15": "\u72ED\u5C71\u5E02\u99C5\u6771\u53E3",
  "130177-01": "\u5BCC\u58EB\u898B\u5C0F\u5B66\u6821",
  "130177-02": "\u5BCC\u58EB\u898B\u5C0F\u5B66\u6821",
  "130181-00": "\u72ED\u5C71\u5E02\u99C5\u897F\u53E3",
  "130181-01": "\u72ED\u5C71\u5E02\u99C5\u897F\u53E3",
  "130181-02-05": "\u72ED\u5C71\u5E02\u99C5\u897F\u53E3",
  "130181-03": "\u72ED\u5C71\u5E02\u99C5\u897F\u53E3",
  "130181-04": "\u72ED\u5C71\u5E02\u99C5\u897F\u53E3",
  "130181-15": "\u72ED\u5C71\u5E02\u99C5\u897F\u53E3",
  "130182-01": "\u5E02\u5F79\u6240\u5165\u53E3",
  "130182-02": "\u5E02\u5F79\u6240\u5165\u53E3",
  "130183-01": "\u6148\u773C\u5BFA\u524D",
  "130183-02": "\u6148\u773C\u5BFA\u524D",
  "130184-01": "\u4F4F\u5B85\u5165\u53E3",
  "130184-02": "\u4F4F\u5B85\u5165\u53E3",
  "130185-01": "\u7A32\u8377\u5C71\u516C\u5712\u5165\u53E3",
  "130185-02": "\u7A32\u8377\u5C71\u516C\u5712\u5165\u53E3",
  "130186-01": "\u7A32\u8377\u5C71\u516C\u5712\u99C5",
  "130186-15": "\u7A32\u8377\u5C71\u516C\u5712\u99C5",
  "130192-01-03": "\u4E03\u5915\u901A\u308A\u5546\u5E97\u8857",
  "130192-02": "\u4E03\u5915\u901A\u308A\u5546\u5E97\u8857",
  "130193-01-03": "\u4E03\u5915\u6A4B",
  "130193-02": "\u4E03\u5915\u6A4B",
  "130194-01-07": "\u65B0\u5BCC\u58EB\u898B\u6A4B",
  "130194-02": "\u65B0\u5BCC\u58EB\u898B\u6A4B",
  "130194-03": "\u65B0\u5BCC\u58EB\u898B\u6A4B",
  "130194-04": "\u65B0\u5BCC\u58EB\u898B\u6A4B",
  "130196-01-03": "\u6CB3\u539F\u5BBF",
  "130196-02": "\u6CB3\u539F\u5BBF",
  "130197-01-03": "\u5E83\u702C\u6A4B\u5317",
  "130197-02": "\u5E83\u702C\u6A4B\u5317",
  "130198-01": "\u5E83\u702C\u6D88\u9632\u7F72\u524D",
  "130198-02": "\u5E83\u702C\u6D88\u9632\u7F72\u524D",
  "130199-01": "\u3064\u3064\u3058\u91CE\u56E3\u5730\u4E2D\u592E",
  "130199-02": "\u3064\u3064\u3058\u91CE\u56E3\u5730\u4E2D\u592E",
  "130200-01": "\u3064\u3064\u3058\u91CE\u56E3\u5730\u6771",
  "130200-02": "\u3064\u3064\u3058\u91CE\u56E3\u5730\u6771",
  "130201-01": "\u72ED\u5C71\u7DD1\u967D\u9AD8\u6821",
  "130201-02": "\u72ED\u5C71\u7DD1\u967D\u9AD8\u6821",
  "130202-01": "\u4E0A\u5E83\u702C\u90F5\u4FBF\u5C40\u524D",
  "130202-02": "\u4E0A\u5E83\u702C\u90F5\u4FBF\u5C40\u524D",
  "130203-01": "\u5965\u5DDE\u9053",
  "130203-02": "\u5965\u5DDE\u9053",
  "130204-01": "\u65E5\u751F\u56E3\u5730",
  "130204-02": "\u65E5\u751F\u56E3\u5730",
  "130204-03": "\u65E5\u751F\u56E3\u5730",
  "130204-15": "\u65E5\u751F\u56E3\u5730",
  "130205-01": "\u72ED\u5C71\u5DE5\u696D\u56E3\u5730",
  "130205-02": "\u72ED\u5C71\u5DE5\u696D\u56E3\u5730",
  "130206-01-15": "\u6B66\u8535\u91CE\u5B66\u9662\u5927\u5B66",
  "130207-01": "\u9AD8\u5BCC",
  "130207-02": "\u9AD8\u5BCC",
  "130208-01": "\u667A\u5149\u5C71\u516C\u5712",
  "130208-15": "\u667A\u5149\u5C71\u516C\u5712",
  "130212-05": "\u571F\u6A4B",
  "130212-06": "\u571F\u6A4B",
  "130213-05": "\u897F\u6B66\u67CF\u539F\u5165\u53E3",
  "130213-06": "\u897F\u6B66\u67CF\u539F\u5165\u53E3",
  "130216-01": "\u67CF\u539F\u897F",
  "130216-02": "\u67CF\u539F\u897F",
  "130217-01": "\u67CF\u539F\u5357",
  "130217-02": "\u67CF\u539F\u5357",
  "130218-01": "\u67CF\u539F\u4E2D\u5B66\u6821\u5165\u53E3",
  "130219-01": "\u4E2D\u592E\u516C\u5712\u524D",
  "130219-02": "\u4E2D\u592E\u516C\u5712\u524D",
  "130220-01": "\u67CF\u539F\u30B7\u30E7\u30C3\u30D4\u30F3\u30B0\u30BB\u30F3\u30BF\u30FC",
  "130220-02": "\u67CF\u539F\u30B7\u30E7\u30C3\u30D4\u30F3\u30B0\u30BB\u30F3\u30BF\u30FC",
  "130221-01": "\u67CF\u539F\u6771",
  "130221-02": "\u67CF\u539F\u6771",
  "130222-00": "\u897F\u6B66\u67CF\u539F\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "130222-01-15": "\u897F\u6B66\u67CF\u539F\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "130222-02": "\u897F\u6B66\u67CF\u539F\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "130223-01": "\u7B2C\u4E00\u516C\u6C11\u9928",
  "130223-02": "\u7B2C\u4E00\u516C\u6C11\u9928",
  "130224-01": "\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5317\uFF08\u72ED\u5C71\u5E02\uFF09",
  "130224-02": "\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5317\uFF08\u72ED\u5C71\u5E02\uFF09",
  "130225-01": "\u67CF\u539F\u5317",
  "130225-02": "\u67CF\u539F\u5317",
  "130227-01": "\u672C\u5BBF",
  "130227-02": "\u672C\u5BBF",
  "130228-01": "\u4E0B\u5BBF",
  "130228-02": "\u4E0B\u5BBF",
  "130229-01": "\u5742\u4E0A",
  "130229-02": "\u5742\u4E0A",
  "130230-01": "\u4E0A\u5BBF",
  "130230-02": "\u4E0A\u5BBF",
  "130231-01": "\u6771\u4E0A\u5BBF",
  "130231-02": "\u6771\u4E0A\u5BBF",
  "130232-01": "\u67CF\u82D1",
  "130232-02": "\u67CF\u82D1",
  "130233-01": "\u67CF\u539F\u516C\u6C11\u9928",
  "130238-01-04": "\u6CB3\u5CB8\u8857\u9053",
  "130238-02": "\u6CB3\u5CB8\u8857\u9053",
  "130239-01": "\u91CE\u7530\u753A",
  "130239-02": "\u91CE\u7530\u753A",
  "130241-01": "\u6CD5\u52D9\u5C40",
  "130241-02": "\u6CD5\u52D9\u5C40",
  "130242-01": "\u5C1A\u7F8E\u5B66\u5712\u5927\u5B66",
  "130242-02-15": "\u5C1A\u7F8E\u5B66\u5712\u5927\u5B66",
  "130243-01": "\u8C4A\u7530\u672C",
  "130243-02": "\u8C4A\u7530\u672C",
  "130244-01": "\u6C34\u4E0A\u516C\u5712\u5165\u53E3",
  "130244-02": "\u6C34\u4E0A\u516C\u5712\u5165\u53E3",
  "130245-01": "\u5C0F\u30F6\u8C37\u516C\u6C11\u9928\u5165\u53E3",
  "130245-02": "\u5C0F\u30F6\u8C37\u516C\u6C11\u9928\u5165\u53E3",
  "130250-01": "\u521D\u96C1\u6A4B",
  "130250-02": "\u521D\u96C1\u6A4B",
  "130251-01": "\u7684\u5834\u6771",
  "130251-02": "\u7684\u5834\u6771",
  "130252-01": "\u7684\u5834",
  "130252-02": "\u7684\u5834",
  "130253-01": "\u7684\u5834\u4E00\u4E01\u76EE",
  "130253-02": "\u7684\u5834\u4E00\u4E01\u76EE",
  "130254-01": "\u971E\u30F6\u95A2\u5C0F\u5B66\u6821",
  "130254-02": "\u971E\u30F6\u95A2\u5C0F\u5B66\u6821",
  "130255-01": "\u971E\u30F6\u95A2\u4E2D\u5B66\u6821",
  "130255-02": "\u971E\u30F6\u95A2\u4E2D\u5B66\u6821",
  "130256-01": "\u5C71\u4F1D",
  "130256-02": "\u5C71\u4F1D",
  "130257-01": "\u304B\u3059\u307F\u91CE\u5165\u53E3",
  "130257-02": "\u304B\u3059\u307F\u91CE\u5165\u53E3",
  "130258-05": "\u6C34\u4E45\u4FDD",
  "130258-06": "\u6C34\u4E45\u4FDD",
  "130259-05": "\u304B\u3059\u307F\u91CE\u5317",
  "130259-06": "\u304B\u3059\u307F\u91CE\u5317",
  "130260-05": "\u304B\u3059\u307F\u91CE\u4E2D\u592E",
  "130260-06": "\u304B\u3059\u307F\u91CE\u4E2D\u592E",
  "130261-00": "\u304B\u3059\u307F\u91CE",
  "130261-01": "\u304B\u3059\u307F\u91CE",
  "130261-02-15": "\u304B\u3059\u307F\u91CE",
  "130269-01": "\u65ED\u753A\u4E8C\u4E01\u76EE\uFF08\u5DDD\u8D8A\u5E02\uFF09",
  "130269-02": "\u65ED\u753A\u4E8C\u4E01\u76EE\uFF08\u5DDD\u8D8A\u5E02\uFF09",
  "130304-00": "\u65B0\u72ED\u5C71\u99C5\u5317\u53E3",
  "130304-02": "\u65B0\u72ED\u5C71\u99C5\u5317\u53E3",
  "130382-01": "\u81F3\u8056\u75C5\u9662",
  "130382-02": "\u81F3\u8056\u75C5\u9662",
  "130496-01-04": "\u524D\u539F",
  "130496-02-03": "\u524D\u539F",
  "130497-01-04": "\u65ED\u753A\u4E00\u4E01\u76EE\uFF08\u5DDD\u8D8A\u5E02\uFF09",
  "130497-02-03": "\u65ED\u753A\u4E00\u4E01\u76EE\uFF08\u5DDD\u8D8A\u5E02\uFF09",
  "130543-01": "\u30CF\u30DE\u30C0\u30C6\u30AF\u30CE\u30B9\u524D",
  "130543-02": "\u30CF\u30DE\u30C0\u30C6\u30AF\u30CE\u30B9\u524D",
  "130580-01": "\u5357\u53CC\u8449\u5E7C\u7A1A\u5712",
  "130580-02": "\u5357\u53CC\u8449\u5E7C\u7A1A\u5712",
  "130581-01": "\u6B66\u8535\u91CE\u5C0F\u5B66\u6821",
  "130581-02": "\u6B66\u8535\u91CE\u5C0F\u5B66\u6821",
  "130582-01": "\u56DB\u90FD\u91CE\u53F0\u5357",
  "130582-02": "\u56DB\u90FD\u91CE\u53F0\u5357",
  "130583-01": "\u6771\u5C71\u516C\u5712",
  "130583-02": "\u6771\u5C71\u516C\u5712",
  "130584-01": "\u5357\u5927\u585A\u6771",
  "130584-02": "\u5357\u5927\u585A\u6771",
  "130585-01": "\u5927\u7530\u8857\u9053",
  "130585-02": "\u5927\u7530\u8857\u9053",
  "130586-01": "\u5927\u6771\u5357\u516C\u6C11\u9928",
  "130586-02": "\u5927\u6771\u5357\u516C\u6C11\u9928",
  "130587-00-01": "\u5357\u5927\u585A\u99C5\u5357\u53E3",
  "130588-01": "\u5357\u53F0",
  "130588-02": "\u5357\u53F0",
  "130589-01": "\u5DDD\u8D8A\u72ED\u5C71\u5DE5\u696D\u56E3\u5730",
  "130589-02": "\u5DDD\u8D8A\u72ED\u5C71\u5DE5\u696D\u56E3\u5730",
  "130590-01": "\u4E2D\u592E\u901A\u308A\uFF08\u72ED\u5C71\u5E02\uFF09",
  "130590-02": "\u4E2D\u592E\u901A\u308A\uFF08\u72ED\u5C71\u5E02\uFF09",
  "135017-01": "\u4E0A\u798F\u5CA1\u99C5\u5165\u53E3",
  "135017-02": "\u4E0A\u798F\u5CA1\u99C5\u5165\u53E3",
  "135145-01": "\u72ED\u5C71\u4E2D\u592E",
  "135145-02": "\u72ED\u5C71\u4E2D\u592E",
  "140001-00": "\u72ED\u5C71\u55B6\u696D\u6240",
  "140001-01": "\u72ED\u5C71\u55B6\u696D\u6240",
  "140001-02-15": "\u72ED\u5C71\u55B6\u696D\u6240",
  "140002-01": "\u72ED\u5C71\u5DE5\u696D\u56E3\u5730\u5317",
  "140002-02": "\u72ED\u5C71\u5DE5\u696D\u56E3\u5730\u5317",
  "140003-00": "\u30B5\u30A4\u30DC\u30AF",
  "140003-01": "\u30B5\u30A4\u30DC\u30AF",
  "140004-01": "\u3059\u304B\u3044\u30ED\u30FC\u30C9",
  "140004-02": "\u3059\u304B\u3044\u30ED\u30FC\u30C9",
  "140005-01": "\u897F\u6B66\u6587\u7406\u5C0F\u5B66\u6821",
  "140005-02": "\u897F\u6B66\u6587\u7406\u5C0F\u5B66\u6821",
  "140006-01": "\u524D\u7530",
  "140006-02": "\u524D\u7530",
  "140007-01": "\u3044\u308B\u307E\u304C\u308F\u5927\u6A4B",
  "140007-02": "\u3044\u308B\u307E\u304C\u308F\u5927\u6A4B",
  "140008-01": "\u971E\u30F6\u95A2\u5357\u75C5\u9662\u5165\u53E3",
  "140008-02": "\u971E\u30F6\u95A2\u5357\u75C5\u9662\u5165\u53E3",
  "140010-01-03-05": "\u4E2D\u592E\u56F3\u66F8\u9928\u5165\u53E3\uFF08\u72ED\u5C71\u5E02\uFF09",
  "140010-02": "\u4E2D\u592E\u56F3\u66F8\u9928\u5165\u53E3\uFF08\u72ED\u5C71\u5E02\uFF09",
  "140011-01-03": "\u793E\u4F1A\u798F\u7949\u4F1A\u9928",
  "140011-02": "\u793E\u4F1A\u798F\u7949\u4F1A\u9928",
  "140012-05": "\u5E02\u6C11\u4F1A\u9928\uFF08\u72ED\u5C71\u5E02\uFF09",
  "140012-06": "\u5E02\u6C11\u4F1A\u9928\uFF08\u72ED\u5C71\u5E02\uFF09",
  "140013-05": "\u4E03\u533A\u81EA\u6CBB\u4F1A\u9928",
  "140013-06": "\u4E03\u533A\u81EA\u6CBB\u4F1A\u9928",
  "145025-01": "\u85E4\u6CA2\u4E2D\u592E\u901A\u308A\u6771",
  "145025-02": "\u85E4\u6CA2\u4E2D\u592E\u901A\u308A\u6771",
  "145026-01": "\u85E4\u6CA2\u4FDD\u80B2\u6240\u5165\u53E3",
  "145026-02": "\u85E4\u6CA2\u4FDD\u80B2\u6240\u5165\u53E3",
  "145041-01": "\u57FC\u7389\u77F3\u5FC3\u4F1A\u75C5\u9662",
  "160004-01": "\u897F\u57FC\u7389\u4E2D\u592E\u75C5\u9662",
  "160016-01": "\uFF2A\uFF21\u4E09\u30F6\u5CF6\u652F\u5E97",
  "160016-02": "\uFF2A\uFF21\u4E09\u30F6\u5CF6\u652F\u5E97",
  "160017-01": "\u5800\u4E4B\u5185",
  "160017-02": "\u5800\u4E4B\u5185",
  "160018-01": "\u53F0\uFF08\u6240\u6CA2\u5E02\uFF09",
  "160018-02": "\u53F0\uFF08\u6240\u6CA2\u5E02\uFF09",
  "160019-01": "\u7CC0\u8C37",
  "160019-02": "\u7CC0\u8C37",
  "160020-01": "\u837B\u539F",
  "160020-02": "\u837B\u539F",
  "160021-01": "\u5BAE\u5BFA",
  "160021-02": "\u5BAE\u5BFA",
  "160022-01": "\uFF2A\uFF21\u5BAE\u5BFA\u652F\u5E97\u524D",
  "160022-02": "\uFF2A\uFF21\u5BAE\u5BFA\u652F\u5E97\u524D",
  "160036-01": "\u5165\u9593\u5E02\u99C5",
  "160036-02": "\u5165\u9593\u5E02\u99C5",
  "160036-03": "\u5165\u9593\u5E02\u99C5",
  "160036-04": "\u5165\u9593\u5E02\u99C5",
  "160036-15": "\u5165\u9593\u5E02\u99C5",
  "160041-01": "\u8C4A\u5CA1\u9AD8\u6821\u524D",
  "160041-02": "\u8C4A\u5CA1\u9AD8\u6821\u524D",
  "160042-01": "\u5165\u9593\u5E02\u5F79\u6240",
  "160042-02": "\u5165\u9593\u5E02\u5F79\u6240",
  "160043-01": "\u5165\u9593\u5E02\u5E02\u6C11\u4F1A\u9928",
  "160043-02": "\u5165\u9593\u5E02\u5E02\u6C11\u4F1A\u9928",
  "160044-01": "\u6247\u753A\u5C4B\u4E00\u4E01\u76EE",
  "160044-02": "\u6247\u753A\u5C4B\u4E00\u4E01\u76EE",
  "160045-01": "\u5E02\u55B6\u4F4F\u5B85\u524D\uFF08\u5165\u9593\u5E02\uFF09",
  "160045-02": "\u5E02\u55B6\u4F4F\u5B85\u524D\uFF08\u5165\u9593\u5E02\uFF09",
  "160046-01": "\u5165\u9593\u6247\u753A\u5C4B\u56E3\u5730",
  "160046-02": "\u5165\u9593\u6247\u753A\u5C4B\u56E3\u5730",
  "160046-15": "\u5165\u9593\u6247\u753A\u5C4B\u56E3\u5730",
  "160047-01": "\u770C\u55B6\u4F4F\u5B85\u5165\u53E3",
  "160047-02": "\u770C\u55B6\u4F4F\u5B85\u5165\u53E3",
  "160048-01-06": "\u897F\u6B66\u30B0\u30EA\u30FC\u30F3\u30D2\u30EB\uFF08\u5165\u9593\u5E02\uFF09",
  "160048-02-05": "\u897F\u6B66\u30B0\u30EA\u30FC\u30F3\u30D2\u30EB\uFF08\u5165\u9593\u5E02\uFF09",
  "160049-01": "\u9AD8\u898B\u539F",
  "160049-02": "\u9AD8\u898B\u539F",
  "160050-01": "\u85E4\u6CA2\u4E2D\u5B66\u6821",
  "160050-02": "\u85E4\u6CA2\u4E2D\u5B66\u6821",
  "160051-02": "\u6771\u53F0",
  "160052-01": "\u5B89\u5DDD\u65B0\u9053\u53E3",
  "160052-02": "\u5B89\u5DDD\u65B0\u9053\u53E3",
  "160053-01": "\u4E0B\u85E4\u6CA2",
  "160053-02": "\u4E0B\u85E4\u6CA2",
  "160054-01": "\u85E4\u6CA2\u5341\u5B57\u8DEF",
  "160054-02": "\u85E4\u6CA2\u5341\u5B57\u8DEF",
  "160055-01": "\u85E4\u6CA2\u99C5\u5165\u53E3",
  "160055-02": "\u85E4\u6CA2\u99C5\u5165\u53E3",
  "160056-01": "\u6B66\u8535\u85E4\u6CA2\u99C5",
  "160056-02": "\u6B66\u8535\u85E4\u6CA2\u99C5",
  "160056-15": "\u6B66\u8535\u85E4\u6CA2\u99C5",
  "160069-01-03": "\u8C4A\u5CA1\u753A",
  "160069-02": "\u8C4A\u5CA1\u753A",
  "160070-01": "\u8C4A\u5CA1\u4E00\u4E01\u76EE",
  "160070-02": "\u8C4A\u5CA1\u4E00\u4E01\u76EE",
  "160071-01": "\u971E\u6A4B",
  "160071-02": "\u971E\u6A4B",
  "160072-01": "\u5165\u9593\u9ED2\u9808\u56E3\u5730",
  "160072-02": "\u5165\u9593\u9ED2\u9808\u56E3\u5730",
  "160073-01": "\u9D5C\u30CE\u6728",
  "160073-02": "\u9D5C\u30CE\u6728",
  "160074-01": "\u3055\u3084\u307E\u5730\u57DF\u30B1\u30A2\u30AF\u30EA\u30CB\u30C3\u30AF",
  "160074-02": "\u3055\u3084\u307E\u5730\u57DF\u30B1\u30A2\u30AF\u30EA\u30CB\u30C3\u30AF",
  "160075-01": "\u516C\u6C11\u9928\u524D",
  "160075-02": "\u516C\u6C11\u9928\u524D",
  "160076-01": "\u4E0B\u8ACF\u8A2A",
  "160076-02": "\u4E0B\u8ACF\u8A2A",
  "160077-01": "\u672C\u753A\u4E8C\u4E01\u76EE\uFF08\u72ED\u5C71\u5E02\uFF09",
  "160077-02": "\u672C\u753A\u4E8C\u4E01\u76EE\uFF08\u72ED\u5C71\u5E02\uFF09",
  "160080-01": "\u4E0A\u5E83\u702C",
  "160080-02": "\u4E0A\u5E83\u702C",
  "160081-01": "\u4E0B\u5E83\u702C",
  "160081-02": "\u4E0B\u5E83\u702C",
  "160082-01": "\u6839\u5CB8\u4E2D\u592E",
  "160082-02": "\u6839\u5CB8\u4E2D\u592E",
  "160083-01": "\u6839\u5CB8\u65B0\u9053",
  "160083-02": "\u6839\u5CB8\u65B0\u9053",
  "160084-15": "\u30B0\u30EA\u30FC\u30F3\u30CF\u30A4\u30C4\u897F",
  "160085-01-15": "\u72ED\u5C71\u30B0\u30EA\u30FC\u30F3\u30CF\u30A4\u30C4",
  "160091-01": "\u6247\u753A\u5C4B\u4E2D\u592E",
  "160091-02": "\u6247\u753A\u5C4B\u4E2D\u592E",
  "160092-01": "\u5948\u8CC0\u753A",
  "160092-02": "\u5948\u8CC0\u753A",
  "160093-01": "\u6247\u753A\u5C4B\u4E8C\u4E01\u76EE",
  "160093-02": "\u6247\u753A\u5C4B\u4E8C\u4E01\u76EE",
  "160094-01": "\u6247\u753A\u5C4B",
  "160094-02": "\u6247\u753A\u5C4B",
  "160096-01": "\u6B66\u8535\u56E3\u5730\u5165\u53E3",
  "160096-02": "\u6B66\u8535\u56E3\u5730\u5165\u53E3",
  "160097-01": "\u6771\u91D1\u5B50",
  "160097-02": "\u6771\u91D1\u5B50",
  "160098-01": "\u4EBA\u4E8B\u9662\u7814\u4FEE\u6240",
  "160098-02": "\u4EBA\u4E8B\u9662\u7814\u4FEE\u6240",
  "160099-01": "\u8239\u4E45\u4FDD\u5DE5\u5834\u524D",
  "160099-02": "\u8239\u4E45\u4FDD\u5DE5\u5834\u524D",
  "160100-00-01": "\u4E09\u4E95\u30A2\u30A6\u30C8\u30EC\u30C3\u30C8\u30D1\u30FC\u30AF\u524D",
  "160100-02": "\u4E09\u4E95\u30A2\u30A6\u30C8\u30EC\u30C3\u30C8\u30D1\u30FC\u30AF\u524D",
  "160101-01": "\u5927\u68EE",
  "160101-02": "\u5927\u68EE",
  "160102-01": "\u897F\u6B66\u4F4F\u5B85\u524D",
  "160102-02": "\u897F\u6B66\u4F4F\u5B85\u524D",
  "160103-01": "\u5317\u4E2D\u91CE",
  "160103-02": "\u5317\u4E2D\u91CE",
  "160104-01": "\u4E8C\u672C\u6728",
  "160104-02": "\u4E8C\u672C\u6728",
  "160105-00-01-15": "\u5165\u9593\u5E02\u535A\u7269\u9928",
  "160106-01": "\uFF2A\uFF21\u4E8C\u672C\u6728\u652F\u5E97",
  "160106-02": "\uFF2A\uFF21\u4E8C\u672C\u6728\u652F\u5E97",
  "160109-01": "\u4E2D\u6751\u5C4B\u3000\u6B66\u8535\u5DE5\u5834",
  "160109-15": "\u4E2D\u6751\u5C4B\u3000\u6B66\u8535\u5DE5\u5834",
  "160111-01": "\u5143\u72ED\u5C71",
  "160111-02": "\u5143\u72ED\u5C71",
  "160112-01-15": "\u4E8C\u672C\u6728\u5730\u8535\u524D",
  "160113-01": "\u8FB2\u5354\u524D\uFF08\u745E\u7A42\u753A\uFF09",
  "160113-02": "\u8FB2\u5354\u524D\uFF08\u745E\u7A42\u753A\uFF09",
  "160114-01": "\u677E\u5C71\u753A\u5165\u53E3",
  "160114-02": "\u677E\u5C71\u753A\u5165\u53E3",
  "160115-01": "\u745E\u7A42\u30D0\u30A4\u30D1\u30B9\u5357",
  "160115-02": "\u745E\u7A42\u30D0\u30A4\u30D1\u30B9\u5357",
  "160116-01": "\u99D2\u5F62\u5BCC\u58EB\u5C71",
  "160116-02": "\u99D2\u5F62\u5BCC\u58EB\u5C71",
  "160117-01": "\u75C5\u9662\u524D\uFF08\u745E\u7A42\u753A\uFF09",
  "160117-02": "\u75C5\u9662\u524D\uFF08\u745E\u7A42\u753A\uFF09",
  "160118-01": "\u5927\u6A4B\u5834",
  "160118-02": "\u5927\u6A4B\u5834",
  "160119-01": "\u7BB1\u6839\u30B1\u5D0E",
  "160119-02": "\u7BB1\u6839\u30B1\u5D0E",
  "160120-01": "\u7BB1\u6839\u30B1\u5D0E\u99C5",
  "160120-15": "\u7BB1\u6839\u30B1\u5D0E\u99C5",
  "160122-01-15": "\u5BAE\u5BFA\u897F",
  "160122-02": "\u5BAE\u5BFA\u897F",
  "160123-01": "\u745E\u7A42\u4E8C\u672C\u6728",
  "160123-02": "\u745E\u7A42\u4E8C\u672C\u6728",
  "160124-01": "\u6817\u539F\u65B0\u7530",
  "160124-02": "\u6817\u539F\u65B0\u7530",
  "160126-01": "\u5742\u4E0B\uFF08\u5165\u9593\u5E02\uFF09",
  "160126-02": "\u5742\u4E0B\uFF08\u5165\u9593\u5E02\uFF09",
  "160127-01": "\u5C0F\u8C37\u7530",
  "160127-02": "\u5C0F\u8C37\u7530",
  "160128-01": "\u6842\u6A4B",
  "160128-02": "\u6842\u6A4B",
  "160129-01": "\u65B0\u4E45\u6771",
  "160129-02": "\u65B0\u4E45\u6771",
  "160130-01": "\u65B0\u4E45\u897F",
  "160130-02": "\u65B0\u4E45\u897F",
  "160131-01": "\u6839\u5CB8",
  "160131-02": "\u6839\u5CB8",
  "160132-01": "\u4E2D\u795E",
  "160132-02": "\u4E2D\u795E",
  "160132-15": "\u4E2D\u795E",
  "160133-01": "\u8C37\u30F6\u8CAB\u5BFA",
  "160133-02": "\u8C37\u30F6\u8CAB\u5BFA",
  "160134-01": "\u4E0A\u8C37\u30F6\u8CAB",
  "160134-02": "\u4E0A\u8C37\u30F6\u8CAB",
  "160135-01": "\u897F\u4E09\u30C4\u6728",
  "160135-02": "\u897F\u4E09\u30C4\u6728",
  "160136-01": "\u5BFA\u7AF9",
  "160136-02": "\u5BFA\u7AF9",
  "160137-01": "\u91D1\u5B50\u99C5\u5165\u53E3",
  "160137-02": "\u91D1\u5B50\u99C5\u5165\u53E3",
  "160137-15": "\u91D1\u5B50\u99C5\u5165\u53E3",
  "160138-01-15": "\u91D1\u5B50\u99C5",
  "160141-01-15": "\u5357\u5CEF",
  "160141-02": "\u5357\u5CEF",
  "160142-01": "\u5357\u5CEF\u516C\u4F1A\u5802",
  "160142-02": "\u5357\u5CEF\u516C\u4F1A\u5802",
  "160143-01": "\u6842\u5DDD\u795E\u793E\u524D",
  "160143-02": "\u6842\u5DDD\u795E\u793E\u524D",
  "160144-01": "\u91D1\u5B50\u6A4B",
  "160144-02": "\u91D1\u5B50\u6A4B",
  "160146-01": "\u539F\u4ECA\u4E95",
  "160146-02-15": "\u539F\u4ECA\u4E95",
  "160147-01": "\u4ECA\u4E95\u5E02\u6C11\u30BB\u30F3\u30BF\u30FC\u524D",
  "160147-02": "\u4ECA\u4E95\u5E02\u6C11\u30BB\u30F3\u30BF\u30FC\u524D",
  "160148-01": "\u5C0F\u5CF0\u5C4B\u524D",
  "160148-02": "\u5C0F\u5CF0\u5C4B\u524D",
  "160149-01-15": "\u4E03\u65E5\u5E02\u5834",
  "160149-02": "\u4E03\u65E5\u5E02\u5834",
  "160150-01": "\u85E4\u6A4B\uFF08\u9752\u6885\u5E02\uFF09",
  "160150-02": "\u85E4\u6A4B\uFF08\u9752\u6885\u5E02\uFF09",
  "160151-01": "\u4ECA\u5BFA\u698E",
  "160151-02": "\u4ECA\u5BFA\u698E",
  "160152-01": "\u7B2C\u4E09\u5C0F\u5B66\u6821\u524D\uFF08\u9752\u6885\u5E02\uFF09",
  "160152-02": "\u7B2C\u4E09\u5C0F\u5B66\u6821\u524D\uFF08\u9752\u6885\u5E02\uFF09",
  "160153-01": "\uFF2A\uFF21\u897F\u6771\u4EAC",
  "160153-02": "\uFF2A\uFF21\u897F\u6771\u4EAC",
  "160154-01": "\u91CE\u4E0A",
  "160154-02": "\u91CE\u4E0A",
  "160155-01": "\u971E\u53F0\u7B2C\u4E8C\u4F4F\u5B85",
  "160155-02": "\u971E\u53F0\u7B2C\u4E8C\u4F4F\u5B85",
  "160156-01": "\u6CB3\u8FBA\u99C5\u5165\u53E3",
  "160156-02": "\u6CB3\u8FBA\u99C5\u5165\u53E3",
  "160157-01": "\u6CB3\u8FBA\u99C5\u5317\u53E3",
  "160157-15": "\u6CB3\u8FBA\u99C5\u5317\u53E3",
  "160161-01": "\u4ECF\u5B50\u99C5",
  "160161-15": "\u4ECF\u5B50\u99C5",
  "160162-03": "\u4ECF\u5B50\u99C5\u5165\u53E3",
  "160162-04": "\u4ECF\u5B50\u99C5\u5165\u53E3",
  "160163-01": "\u4E2D\u6A4B\u5357",
  "160163-02": "\u4E2D\u6A4B\u5357",
  "160164-01": "\u4E2D\u6A4B",
  "160164-02": "\u4E2D\u6A4B",
  "160165-01": "\u4E0B\u90F7",
  "160165-02": "\u4E0B\u90F7",
  "160166-01": "\u6A0B\u30CE\u4E0A",
  "160166-02": "\u6A0B\u30CE\u4E0A",
  "160167-01": "\u897F\u6B66\u3076\u3057\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5165\u53E3",
  "160167-02": "\u897F\u6B66\u3076\u3057\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5165\u53E3",
  "160168-01": "\u3076\u3057\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5357",
  "160168-02": "\u3076\u3057\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5357",
  "160169-01": "\u65B0\u5149\u4E2D\u592E\u516C\u5712",
  "160169-02": "\u65B0\u5149\u4E2D\u592E\u516C\u5712",
  "160170-01": "\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5317\uFF08\u98EF\u80FD\u5E02\uFF09",
  "160170-02": "\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5317\uFF08\u98EF\u80FD\u5E02\uFF09",
  "160171-01": "\u897F\u6B66\u3076\u3057\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "160171-15": "\u897F\u6B66\u3076\u3057\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "160176-01": "\u98EF\u80FD\u99C5\u5357\u53E3",
  "160176-02": "\u98EF\u80FD\u99C5\u5357\u53E3",
  "160176-15": "\u98EF\u80FD\u99C5\u5357\u53E3",
  "160177-01": "\u98EF\u80FD\u99C5\u5165\u53E3",
  "160177-02": "\u98EF\u80FD\u99C5\u5165\u53E3",
  "160178-01": "\u6BD8\u6C99\u9580\u5929\u524D",
  "160178-02": "\u6BD8\u6C99\u9580\u5929\u524D",
  "160179-01": "\u3072\u304B\u308A\u6A4B",
  "160179-02": "\u3072\u304B\u308A\u6A4B",
  "160180-01": "\u7F8E\u6749\u53F0\u5C0F\u5B66\u6821",
  "160180-02": "\u7F8E\u6749\u53F0\u5C0F\u5B66\u6821",
  "160181-01": "\u7F8E\u6749\u53F0\u516C\u5712",
  "160181-02": "\u7F8E\u6749\u53F0\u516C\u5712",
  "160183-01": "\u7F8E\u6749\u53F0\u4E2D\u5B66\u6821",
  "160183-02": "\u7F8E\u6749\u53F0\u4E2D\u5B66\u6821",
  "160184-01": "\u7F8E\u6749\u53F0\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "160184-02-15": "\u7F8E\u6749\u53F0\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3",
  "160186-01": "\u5357\u753A\u6771",
  "160186-02": "\u5357\u753A\u6771",
  "160187-01": "\u4E00\u672C\u677E",
  "160187-02": "\u4E00\u672C\u677E",
  "160188-01": "\u5DDD\u5BFA\u5357",
  "160188-02": "\u5DDD\u5BFA\u5357",
  "160189-01": "\u52A0\u6CBB\u6A4B",
  "160189-02": "\u52A0\u6CBB\u6A4B",
  "160190-01": "\u52A0\u6CBB\u4E2D\u5B66\u6821",
  "160190-02": "\u52A0\u6CBB\u4E2D\u5B66\u6821",
  "160191-01": "\u963F\u9808",
  "160191-02": "\u963F\u9808",
  "160192-01": "\u843D\u5408\uFF08\u98EF\u80FD\u5E02\uFF09",
  "160192-02": "\u843D\u5408\uFF08\u98EF\u80FD\u5E02\uFF09",
  "160196-01": "\u524D\u30F6\u8CAB\u5165\u53E3",
  "160196-02": "\u524D\u30F6\u8CAB\u5165\u53E3",
  "160197-01": "\u5CA9\u6E15",
  "160197-02": "\u5CA9\u6E15",
  "160199-01": "\u5C3E\u6839\u4E0B",
  "160199-02": "\u5C3E\u6839\u4E0B",
  "160200-01": "\u5CA9\u6E15\u56E3\u5730",
  "160200-02": "\u5CA9\u6E15\u56E3\u5730",
  "160202-01": "\u5CA9\u4E95\u5802",
  "160202-02-15": "\u5CA9\u4E95\u5802",
  "160203-01": "\u4E2D\u592E\u6A4B",
  "160203-02": "\u4E2D\u592E\u6A4B",
  "160204-01": "\u5E38\u798F\u5BFA\u5165\u53E3",
  "160204-02": "\u5E38\u798F\u5BFA\u5165\u53E3",
  "160205-01": "\u5CA9\u8535\u6E29\u6CC9",
  "160205-02": "\u5CA9\u8535\u6E29\u6CC9",
  "160206-01": "\u6771\u4EAC\u70AD\u9271\u524D",
  "160206-02": "\u6771\u4EAC\u70AD\u9271\u524D",
  "160207-01": "\u5C0F\u66FD\u6728\u8A3A\u7642\u6240",
  "160207-02": "\u5C0F\u66FD\u6728\u8A3A\u7642\u6240",
  "160208-01": "\uFF2A\uFF21\u5C0F\u66FD\u6728\u652F\u5E97",
  "160208-02": "\uFF2A\uFF21\u5C0F\u66FD\u6728\u652F\u5E97",
  "160209-01": "\u4E2D\u4E95\u6A4B\uFF08\u9752\u6885\u5E02\uFF09",
  "160209-02": "\u4E2D\u4E95\u6A4B\uFF08\u9752\u6885\u5E02\uFF09",
  "160210-01": "\u9752\u6885\u7B2C\u516D\u4E2D\u5B66\u6821",
  "160210-02": "\u9752\u6885\u7B2C\u516D\u4E2D\u5B66\u6821",
  "160211-01": "\u9752\u6885\u7B2C\u4E03\u5C0F\u5B66\u6821",
  "160211-02": "\u9752\u6885\u7B2C\u4E03\u5C0F\u5B66\u6821",
  "160212-01": "\u8352\u7530",
  "160212-02": "\u8352\u7530",
  "160213-01": "\u5C0F\u6795",
  "160213-02": "\u5C0F\u6795",
  "160214-01": "\u9ED2\u6CA2\u795E\u793E",
  "160214-02": "\u9ED2\u6CA2\u795E\u793E",
  "160215-01": "\u67F3\u5DDD",
  "160215-02": "\u67F3\u5DDD",
  "160216-01": "\u8056\u660E\u798F\u7949\u5354\u4F1A\u524D",
  "160216-02": "\u8056\u660E\u798F\u7949\u5354\u4F1A\u524D",
  "160217-01": "\u591A\u6469\u56E3\u5730\u524D",
  "160217-02": "\u591A\u6469\u56E3\u5730\u524D",
  "160218-01": "\u8ACF\u8A2A\u795E\u793E\u524D",
  "160218-02": "\u8ACF\u8A2A\u795E\u793E\u524D",
  "160219-01": "\u6839\u30F6\u5E03",
  "160219-02": "\u6839\u30F6\u5E03",
  "160220-01": "\u7B2C\u56DB\u5C0F\u5B66\u6821\u524D",
  "160220-02": "\u7B2C\u56DB\u5C0F\u5B66\u6821\u524D",
  "160221-01": "\u6771\u9752\u6885",
  "160221-02": "\u6771\u9752\u6885",
  "160222-01-15": "\u6771\u9752\u6885\u99C5",
  "160231-01": "\u98EF\u80FD\u99C5\u5317\u53E3",
  "160231-03": "\u98EF\u80FD\u99C5\u5317\u53E3",
  "160231-15": "\u98EF\u80FD\u99C5\u5317\u53E3",
  "160232-01": "\u8ECA\u5EAB\u524D\uFF08\u98EF\u80FD\u5E02\uFF09",
  "160232-02": "\u8ECA\u5EAB\u524D\uFF08\u98EF\u80FD\u5E02\uFF09",
  "160233-01": "\u7B20\u7E2B",
  "160233-02": "\u7B20\u7E2B",
  "160234-01": "\u6771\u98EF\u80FD\u99C5\u6771\u53E3",
  "160234-03-15": "\u6771\u98EF\u80FD\u99C5\u6771\u53E3",
  "160235-01": "\u6804\u753A\uFF08\u98EF\u80FD\u5E02\uFF09",
  "160235-02": "\u6804\u753A\uFF08\u98EF\u80FD\u5E02\uFF09",
  "160236-01": "\u7DD1\u753A",
  "160236-02": "\u7DD1\u753A",
  "160281-01": "\u7F8E\u6749\u53F0\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5357",
  "160281-02": "\u7F8E\u6749\u53F0\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5357",
  "160282-01": "\u5927\u6CB3\u539F\u5DE5\u696D\u56E3\u5730\u5165\u53E3",
  "160282-02": "\u5927\u6CB3\u539F\u5DE5\u696D\u56E3\u5730\u5165\u53E3",
  "160283-01": "\u831C\u53F0",
  "160283-02": "\u831C\u53F0",
  "160284-01": "\u30E6\u30FC\u30A8\u30A4\u30AD\u30E3\u30B9\u30BF\u30FC\u524D\u3010\u5927\u6CB3\u539F\u5DE5\u696D\u56E3\u5730\u6771\u3011",
  "160284-02-15": "\u30E6\u30FC\u30A8\u30A4\u30AD\u30E3\u30B9\u30BF\u30FC\u524D\u3010\u5927\u6CB3\u539F\u5DE5\u696D\u56E3\u5730\u6771\u3011",
  "160396-00-02": "\u4E09\u4E95\u30A2\u30A6\u30C8\u30EC\u30C3\u30C8\u30D1\u30FC\u30AF",
  "160396-01-15": "\u4E09\u4E95\u30A2\u30A6\u30C8\u30EC\u30C3\u30C8\u30D1\u30FC\u30AF",
  "160442-01": "\u5BAE\u30CE\u53F0",
  "160442-02": "\u5BAE\u30CE\u53F0",
  "160443-01": "\u3044\u3061\u3087\u3046\u901A\u308A\uFF08\u5165\u9593\u5E02\uFF09",
  "160443-02": "\u3044\u3061\u3087\u3046\u901A\u308A\uFF08\u5165\u9593\u5E02\uFF09",
  "160444-01": "\u6B66\u8535\u5DE5\u696D\u56E3\u5730",
  "160444-02": "\u6B66\u8535\u5DE5\u696D\u56E3\u5730",
  "160445-01": "\u72ED\u5C71\u30F6\u539F",
  "160445-02": "\u72ED\u5C71\u30F6\u539F",
  "160446-01": "\u6B66\u8535\u4E2D\u5B66\u6821",
  "160446-02": "\u6B66\u8535\u4E2D\u5B66\u6821",
  "160448-01": "\u5DE5\u696D\u56E3\u5730\u5165\u53E3",
  "160448-02": "\u5DE5\u696D\u56E3\u5730\u5165\u53E3",
  "160449-01": "\u6771\u91CE\u9AD8\u7B49\u5B66\u6821\u5165\u53E3",
  "160449-02": "\u6771\u91CE\u9AD8\u7B49\u5B66\u6821\u5165\u53E3",
  "160450-01": "\u5357\u77E2\u837B",
  "160450-02": "\u5357\u77E2\u837B",
  "165022-01": "\u5354\u548C\u96FB\u6A5F\u5316\u5B66\u524D",
  "165022-02": "\u5354\u548C\u96FB\u6A5F\u5316\u5B66\u524D",
  "165023-01": "\u30B0\u30E9\u30A6\u30F3\u30C9\u524D",
  "165023-02": "\u30B0\u30E9\u30A6\u30F3\u30C9\u524D",
  "165024-01": "\u30AF\u30E9\u30A6\u30F3\u30D1\u30C3\u30B1\u30FC\u30B8\u524D",
  "165024-15": "\u30AF\u30E9\u30A6\u30F3\u30D1\u30C3\u30B1\u30FC\u30B8\u524D",
  "165146-01-02-03-15": "\u30E1\u30C3\u30C4\u30A1",
  "190001-00-01": "\u9577\u6CA2",
  "190002-01": "\u5927\u77F3\u6D25",
  "190002-02": "\u5927\u77F3\u6D25",
  "190003-01": "\u5BCC\u7530",
  "190003-02": "\u5BCC\u7530",
  "190004-01": "\u516B\u8C37",
  "190004-02": "\u516B\u8C37",
  "190005-01": "\u5F37\u77E2",
  "190005-02": "\u5F37\u77E2",
  "190006-01": "\u6C60\u539F",
  "190006-02": "\u6C60\u539F",
  "190007-01": "\u8981\u30C8\u30F3\u30CD\u30EB",
  "190007-02": "\u8981\u30C8\u30F3\u30CD\u30EB",
  "190008-01": "\u99AC\u4E0A",
  "190008-02": "\u99AC\u4E0A",
  "190009-01": "\u9577\u4E45\u4FDD\u5165\u53E3",
  "190009-02": "\u9577\u4E45\u4FDD\u5165\u53E3",
  "190010-01": "\u65E5\u5C3E",
  "190010-02": "\u65E5\u5C3E",
  "190011-01": "\u5973\u5F62\u5165\u53E3",
  "190011-02": "\u5973\u5F62\u5165\u53E3",
  "190012-01": "\u4E0A\u5409\u7530",
  "190012-02": "\u4E0A\u5409\u7530",
  "190013-01": "\u585A\u8D8A\u56E3\u5730",
  "190013-02": "\u585A\u8D8A\u56E3\u5730",
  "190014-00-01": "\u5409\u7530\u5143\u6C17\u6751",
  "190015-01": "\u5C0F\u5DDD\u6238\u6A4B",
  "190015-02": "\u5C0F\u5DDD\u6238\u6A4B",
  "190016-01": "\u5973\u90E8\u7530",
  "190016-02": "\u5973\u90E8\u7530",
  "190017-01": "\u4E07\u798F\u5BFA",
  "190017-02": "\u4E07\u798F\u5BFA",
  "190018-01": "\u5BAE\u6238",
  "190018-02": "\u5BAE\u6238",
  "190019-01": "\u4E0A\u5409\u7530\u99D0\u5728\u6240",
  "190019-02": "\u4E0A\u5409\u7530\u99D0\u5728\u6240",
  "190020-01": "\u5DE3\u639B",
  "190020-02": "\u5DE3\u639B",
  "190021-01": "\u307F\u3069\u308A\u306E\u6751\u5409\u7530\u53E3",
  "190021-02": "\u307F\u3069\u308A\u306E\u6751\u5409\u7530\u53E3",
  "190022-01": "\u5DE3\u639B\u5CE0\u5165\u53E3",
  "190022-02": "\u5DE3\u639B\u5CE0\u5165\u53E3",
  "190023-01": "\u5C0F\u9E7F\u91CE",
  "190023-02": "\u5C0F\u9E7F\u91CE",
  "190024-01": "\u539F\u753A",
  "190024-02": "\u539F\u753A",
  "190025-01": "\u5C0F\u9E7F\u91CE\u753A",
  "190025-02": "\u5C0F\u9E7F\u91CE\u753A",
  "190026-01": "\u753A\u7ACB\u75C5\u9662\u524D",
  "190026-02": "\u753A\u7ACB\u75C5\u9662\u524D",
  "190027-00-02": "\u5C0F\u9E7F\u91CE\u5F79\u5834",
  "190027-01": "\u5C0F\u9E7F\u91CE\u5F79\u5834",
  "190028-00-02": "\u5C0F\u9E7F\u91CE\u8ECA\u5EAB",
  "190028-01": "\u5C0F\u9E7F\u91CE\u8ECA\u5EAB",
  "190029-01": "\u65B0\u4E95",
  "190029-02": "\u65B0\u4E95",
  "190030-01": "\u9ED2\u6D77\u571F\u5165\u53E3",
  "190030-02": "\u9ED2\u6D77\u571F\u5165\u53E3",
  "190031-01": "\u4E09\u7530\u5DDD\u8FB2\u5354",
  "190031-02": "\u4E09\u7530\u5DDD\u8FB2\u5354",
  "190032-00-01": "\u6817\u5C3E",
  "190032-02": "\u6817\u5C3E",
  "190033-01": "\u5C0F\u9E7F\u91CE\u8B66\u5BDF\u524D",
  "190033-02": "\u5C0F\u9E7F\u91CE\u8B66\u5BDF\u524D",
  "190034-01": "\u4E09\u5CF6",
  "190034-02": "\u4E09\u5CF6",
  "190035-01": "\u5BFA\u4E0A",
  "190035-02": "\u5BFA\u4E0A",
  "190036-01": "\u4FE1\u6FC3\u77F3",
  "190036-02": "\u4FE1\u6FC3\u77F3",
  "190037-01": "\u6CC9\u7530",
  "190037-02-03": "\u6CC9\u7530",
  "190038-01": "\u677E\u4E95\u7530",
  "190038-02": "\u677E\u4E95\u7530",
  "190039-01": "\u7530\u6751",
  "190039-02": "\u7530\u6751",
  "190040-01": "\u5186\u798F\u5BFA\u524D",
  "190040-02": "\u5186\u798F\u5BFA\u524D",
  "190041-01": "\u574A\u5E73",
  "190041-02": "\u574A\u5E73",
  "190042-01": "\u5E9C\u5742\u5165\u53E3",
  "190042-02": "\u5E9C\u5742\u5165\u53E3",
  "190043-01": "\u516B\u5742\u795E\u793E\u524D",
  "190043-02": "\u516B\u5742\u795E\u793E\u524D",
  "190044-01": "\u5830\u306E\u4E0A",
  "190044-02": "\u5830\u306E\u4E0A",
  "190045-01": "\u4E2D\u8494\u7530",
  "190045-02": "\u4E2D\u8494\u7530",
  "190046-01": "\u8D64\u5742\u5CE0",
  "190046-02": "\u8D64\u5742\u5CE0",
  "190047-01": "\u5C3E\u7530\u8494\u5B66\u6821",
  "190047-02": "\u5C3E\u7530\u8494\u5B66\u6821",
  "190048-01": "\u79E9\u7236\u6A4B",
  "190048-02": "\u79E9\u7236\u6A4B",
  "190049-01": "\u963F\u4FDD",
  "190049-02": "\u963F\u4FDD",
  "190050-01": "\u8996\u76EE\u5742\u4E0B",
  "190050-02": "\u8996\u76EE\u5742\u4E0B",
  "190051-01": "\u76F8\u751F\u753A",
  "190051-02": "\u76F8\u751F\u753A",
  "190052-01": "\u672D\u6240\u5341\u4E03\u756A\u5165\u53E3",
  "190052-02": "\u672D\u6240\u5341\u4E03\u756A\u5165\u53E3",
  "190053-01": "\u865A\u7A7A\u8535\u5165\u53E3",
  "190053-02": "\u865A\u7A7A\u8535\u5165\u53E3",
  "190054-01": "\u5BAE\u5074\u753A",
  "190054-02": "\u5BAE\u5074\u753A",
  "190055-01-02-03": "\u79E9\u7236\u99C5",
  "190056-01": "\u79E9\u7236\u3075\u308B\u3055\u3068\u9928\u524D",
  "190056-02": "\u79E9\u7236\u3075\u308B\u3055\u3068\u9928\u524D",
  "190057-01": "\u672C\u753A",
  "190057-02": "\u672C\u753A",
  "190058-01": "\u4E2D\u753A\uFF08\u79E9\u7236\uFF09",
  "190058-02": "\u4E2D\u753A\uFF08\u79E9\u7236\uFF09",
  "190059-01": "\u4E0A\u753A\u4E00\u4E01\u76EE",
  "190059-02": "\u4E0A\u753A\u4E00\u4E01\u76EE",
  "190059-03": "\u4E0A\u753A\u4E00\u4E01\u76EE",
  "190059-04": "\u4E0A\u753A\u4E00\u4E01\u76EE",
  "190060-01": "\u672D\u6240\u5341\u4E09\u756A",
  "190060-02": "\u672D\u6240\u5341\u4E09\u756A",
  "190061-01": "\u79E9\u7236\u516C\u5712\u524D",
  "190061-02": "\u79E9\u7236\u516C\u5712\u524D",
  "190063-00-15": "\u897F\u6B66\u79E9\u7236\u99C5",
  "190063-01": "\u897F\u6B66\u79E9\u7236\u99C5",
  "190063-02": "\u897F\u6B66\u79E9\u7236\u99C5",
  "190063-03": "\u897F\u6B66\u79E9\u7236\u99C5",
  "190063-04": "\u897F\u6B66\u79E9\u7236\u99C5",
  "190063-06": "\u897F\u6B66\u79E9\u7236\u99C5",
  "190065-01": "\u77F3\u9593\u6238",
  "190065-02": "\u77F3\u9593\u6238",
  "190066-01": "\u4E07\u5E74\u6A4B",
  "190066-02": "\u4E07\u5E74\u6A4B",
  "190067-01": "\u7530\u4E2D\u6A4B",
  "190067-02": "\u7530\u4E2D\u6A4B",
  "190068-01": "\u4E95\u4E0A\u4E0A",
  "190068-02": "\u4E95\u4E0A\u4E0A",
  "190079-00-01-07-08-09-15": "\u9F8D\u52E2\u4F1A\u9928",
  "190079-02": "\u9F8D\u52E2\u4F1A\u9928",
  "190080-01": "\u767D\u7802\u516C\u5712",
  "190080-02": "\u767D\u7802\u516C\u5712",
  "190081-01": "\u99AC\u982D\u5C0A\u524D",
  "190081-02": "\u99AC\u982D\u5C0A\u524D",
  "190082-01": "\u5948\u826F\u5DDD\u6A4B",
  "190082-02": "\u5948\u826F\u5DDD\u6A4B",
  "190094-01": "\u5927\u7530\u5165\u53E3",
  "190094-02": "\u5927\u7530\u5165\u53E3",
  "190095-01": "\u5C0F\u67F1",
  "190095-02": "\u5C0F\u67F1",
  "190096-01": "\u8ACF\u8A2A\u6A4B",
  "190096-02": "\u8ACF\u8A2A\u6A4B",
  "190097-01": "\u4E0B\u5BFA\u5C3E",
  "190097-02": "\u4E0B\u5BFA\u5C3E",
  "190098-01": "\u62DB\u6728",
  "190098-02": "\u62DB\u6728",
  "190099-01": "\u98EF\u585A",
  "190099-02": "\u98EF\u585A",
  "190100-01": "\u8429\u5E73",
  "190100-02": "\u8429\u5E73",
  "190102-01": "\u4E2D\u592A\u7530",
  "190102-02": "\u4E2D\u592A\u7530",
  "190103-01": "\u5D8B\u4E0A",
  "190103-02": "\u5D8B\u4E0A",
  "190104-01": "\u5927\u7530\u4E2D\u5B66\u6821\u5165\u53E3",
  "190104-02": "\u5927\u7530\u4E2D\u5B66\u6821\u5165\u53E3",
  "190105-01": "\u4E45\u4FDD\u7530",
  "190105-02": "\u4E45\u4FDD\u7530",
  "190106-01": "\u65E9\u9053\u5834",
  "190106-02": "\u65E9\u9053\u5834",
  "190107-01": "\u5800\u5207",
  "190107-02": "\u5800\u5207",
  "190108-01": "\u67F3\u4E95",
  "190108-02": "\u67F3\u4E95",
  "190109-00-01-02-08": "\u7686\u91CE\u99C5",
  "190110-01": "\u4E0A\u91CE\u53F0",
  "190110-02": "\u4E0A\u91CE\u53F0",
  "190111-01": "\u79E9\u7236\u307E\u3064\u308A\u4F1A\u9928",
  "190111-02": "\u79E9\u7236\u307E\u3064\u308A\u4F1A\u9928",
  "190112-01": "\u4E0A\u91CE\u753A",
  "190112-02": "\u4E0A\u91CE\u753A",
  "190113-01": "\u4E2D\u9053",
  "190113-02": "\u4E2D\u9053",
  "190114-01": "\u79E9\u7236\u5E02\u5F79\u6240\u524D",
  "190114-02": "\u79E9\u7236\u5E02\u5F79\u6240\u524D",
  "190124-00-02": "\u5C0F\u53CC\u91CC",
  "190124-01": "\u5C0F\u53CC\u91CC",
  "190125-01": "\u9D89\u5E73",
  "190125-02": "\u9D89\u5E73",
  "190126-01": "\u6AAA\u5E73",
  "190126-02": "\u6AAA\u5E73",
  "190127-01": "\u6962\u5E73",
  "190127-02": "\u6962\u5E73",
  "190128-01": "\u5BAE\u5E73",
  "190128-02": "\u5BAE\u5E73",
  "190129-01": "\u5927\u6EDD\u7DCF\u5408\u652F\u6240",
  "190130-01": "\u5927\u6EDD\u90F5\u4FBF\u5C40",
  "190130-02": "\u5927\u6EDD\u90F5\u4FBF\u5C40",
  "190131-01": "\u843D\u5408",
  "190131-02": "\u843D\u5408",
  "190132-01": "\u5927\u6EDD\u6E29\u6CC9\u904A\u6E6F\u9928",
  "190132-02": "\u5927\u6EDD\u6E29\u6CC9\u904A\u6E6F\u9928",
  "190133-01": "\u795E\u5CA1\u4F4F\u5B85",
  "190133-02": "\u795E\u5CA1\u4F4F\u5B85",
  "190134-01": "\u5CA1\u672C",
  "190134-02": "\u5CA1\u672C",
  "190135-01": "\u5927\u8F2A",
  "190135-02": "\u5927\u8F2A",
  "190136-01": "\u4E0B\u5927\u8F2A",
  "190136-02": "\u4E0B\u5927\u8F2A",
  "190137-01": "\u5927\u9054\u539F",
  "190137-02": "\u5927\u9054\u539F",
  "190138-01": "\u5927\u6D1E\u767A\u96FB\u6240\u5165\u53E3",
  "190138-02": "\u5927\u6D1E\u767A\u96FB\u6240\u5165\u53E3",
  "190139-01": "\u5927\u967D\u5BFA\u5165\u53E3",
  "190139-02": "\u5927\u967D\u5BFA\u5165\u53E3",
  "190140-01": "\u5149\u5CA9",
  "190140-02": "\u5149\u5CA9",
  "190141-01": "\u5F37\u77F3",
  "190141-02": "\u5F37\u77F3",
  "190142-01": "\u8352\u5DDD\u5C40\u524D",
  "190142-02": "\u8352\u5DDD\u5C40\u524D",
  "190143-01": "\u767D\u5DDD\u6A4B",
  "190143-02": "\u767D\u5DDD\u6A4B",
  "190144-00-01": "\u4E09\u5CF0\u53E3\u99C5",
  "190148-00-01": "\u79E9\u7236\u6E56",
  "190148-02": "\u79E9\u7236\u6E56",
  "190149-01": "\u4E2D\u6751\u753A\u56DB\u4E01\u76EE",
  "190149-02": "\u4E2D\u6751\u753A\u56DB\u4E01\u76EE",
  "190150-01": "\u79E9\u7236\u516C\u5712\u6A4B",
  "190150-02": "\u79E9\u7236\u516C\u5712\u6A4B",
  "190151-01": "\u97F3\u697D\u5BFA",
  "190151-02": "\u97F3\u697D\u5BFA",
  "190152-01": "\u65C5\u7ACB\u3061\u306E\u4E18",
  "190152-02": "\u65C5\u7ACB\u3061\u306E\u4E18",
  "190153-01": "\u5C55\u671B\u53F0\u5165\u53E3",
  "190153-02": "\u5C55\u671B\u53F0\u5165\u53E3",
  "190154-01": "\u97F3\u697D\u5802\u30FB\u91CE\u5916\u30B9\u30C6\u30FC\u30B8",
  "190154-02": "\u97F3\u697D\u5802\u30FB\u91CE\u5916\u30B9\u30C6\u30FC\u30B8",
  "190155-01": "\u30DF\u30E5\u30FC\u30BA\u30D1\u30FC\u30AF\u4E2D\u592E",
  "190155-02": "\u30DF\u30E5\u30FC\u30BA\u30D1\u30FC\u30AF\u4E2D\u592E",
  "190156-01-02": "\u30DF\u30E5\u30FC\u30BA\u30D1\u30FC\u30AF\u30B9\u30DD\u30FC\u30C4\u306E\u68EE",
  "190157-01": "\u30DF\u30E5\u30FC\u30BA\u30D1\u30FC\u30AF\u5357\u53E3",
  "190157-02": "\u30DF\u30E5\u30FC\u30BA\u30D1\u30FC\u30AF\u5357\u53E3",
  "190158-01": "\u5DF4\u5DDD",
  "190158-02": "\u5DF4\u5DDD",
  "190160-01": "\u5742\u6C37",
  "190160-02": "\u5742\u6C37",
  "190161-01": "\u59FF",
  "190161-02": "\u59FF",
  "190162-01": "\u6A2A\u702C\u99C5\u5165\u53E3",
  "190162-02": "\u6A2A\u702C\u99C5\u5165\u53E3",
  "190163-01": "\u6A2A\u702C\u516C\u6C11\u9928\u524D",
  "190163-02": "\u6A2A\u702C\u516C\u6C11\u9928\u524D",
  "190164-01": "\u6A2A\u702C\u6A4B",
  "190164-02": "\u6A2A\u702C\u6A4B",
  "190165-00-02": "\u6839\u53E4\u5C4B",
  "190165-01": "\u6839\u53E4\u5C4B",
  "190166-01": "\u6EDD\u30CE\u6795",
  "190166-02": "\u6EDD\u30CE\u6795",
  "190167-01": "\u5DDD\u5730",
  "190167-02": "\u5DDD\u5730",
  "190168-01": "\u82A6\u30F6\u4E45\u4FDD\u99C5",
  "190168-02": "\u82A6\u30F6\u4E45\u4FDD\u99C5",
  "190169-01": "\u8D64\u8C37",
  "190169-02": "\u8D64\u8C37",
  "190170-01": "\u4E2D\u4E95\u6A4B\uFF08\u79E9\u7236\uFF09",
  "190170-02": "\u4E2D\u4E95\u6A4B\uFF08\u79E9\u7236\uFF09",
  "190171-01": "\u51E6\u82B1",
  "190171-02": "\u51E6\u82B1",
  "190172-00-01": "\u9577\u6E15",
  "190172-02": "\u9577\u6E15",
  "190173-01": "\u4E8C\u5B50\u5C71\u5165\u53E3",
  "190173-02": "\u4E8C\u5B50\u5C71\u5165\u53E3",
  "190174-00-01": "\u677E\u679D",
  "190175-01": "\u88C1\u5224\u6240\u524D",
  "190175-02": "\u88C1\u5224\u6240\u524D",
  "190176-01": "\u4E0A\u753A",
  "190176-02": "\u4E0A\u753A",
  "190177-01": "\u7B2C\u4E8C\u4E2D\u5B66",
  "190177-02": "\u7B2C\u4E8C\u4E2D\u5B66",
  "190178-01": "\u62BC\u5800",
  "190178-02": "\u62BC\u5800",
  "190179-01": "\u7530\u306E\u6CA2\u5165\u53E3",
  "190179-02": "\u7530\u306E\u6CA2\u5165\u53E3",
  "190180-01": "\u7530\u306E\u6CA2\u539F",
  "190180-02": "\u7530\u306E\u6CA2\u539F",
  "190181-01": "\u4E0B\u5F71\u68EE",
  "190181-02": "\u4E0B\u5F71\u68EE",
  "190182-01": "\u5F71\u68EE\u5C0F\u5B66\u6821",
  "190182-02": "\u5F71\u68EE\u5C0F\u5B66\u6821",
  "190183-01": "\u6804\u753A\uFF08\u79E9\u7236\uFF09",
  "190183-02": "\u6804\u753A\uFF08\u79E9\u7236\uFF09",
  "190184-01": "\u5F71\u68EE",
  "190184-02": "\u5F71\u68EE",
  "190185-01": "\u6D66\u5C71\u53E3",
  "190185-02": "\u6D66\u5C71\u53E3",
  "190186-01": "\u6D66\u5C71\u5E38\u76E4\u6A4B",
  "190186-02": "\u6D66\u5C71\u5E38\u76E4\u6A4B",
  "190187-01": "\u6DF1\u6CA2",
  "190187-02": "\u6DF1\u6CA2",
  "190188-01": "\u8A9E\u6B4C\u6A4B",
  "190188-02": "\u8A9E\u6B4C\u6A4B",
  "190189-01": "\u6A2A\u702C\u753A\u5DDD\u6771\u4E0A",
  "190189-02": "\u6A2A\u702C\u753A\u5DDD\u6771\u4E0A",
  "190190-01": "\u6A2A\u702C\u753A\u5DDD\u6771\u4E0B",
  "190190-02": "\u6A2A\u702C\u753A\u5DDD\u6771\u4E0B",
  "190191-01": "\u91D1\u660C\u5BFA",
  "190191-02": "\u91D1\u660C\u5BFA",
  "190192-01": "\u5C71\u7530",
  "190192-02": "\u5C71\u7530",
  "190193-01": "\u5149\u660E\u5BFA\u5165\u53E3",
  "190193-02": "\u5149\u660E\u5BFA\u5165\u53E3",
  "190194-01": "\u5B66\u6821\u524D\uFF08\u79E9\u7236\uFF09",
  "190194-02": "\u5B66\u6821\u524D\uFF08\u79E9\u7236\uFF09",
  "190195-01": "\u6728\u6238\u539F",
  "190195-02": "\u6728\u6238\u539F",
  "190196-01": "\u6803\u8C37",
  "190196-02": "\u6803\u8C37",
  "190196-03": "\u6803\u8C37",
  "190197-01": "\u5999\u5186\u5BFA\u5165\u53E3",
  "190197-02": "\u5999\u5186\u5BFA\u5165\u53E3",
  "190198-01": "\u4E0A\u90F7",
  "190198-02": "\u4E0A\u90F7",
  "190199-01": "\u5B9A\u5CF0\u6A4B",
  "190199-02": "\u5B9A\u5CF0\u6A4B",
  "190200-00-01": "\u5B9A\u5CF0",
  "190200-02": "\u5B9A\u5CF0",
  "190201-01": "\u7686\u91CE\u4E2D\u5B66\u5165\u53E3",
  "190201-02": "\u7686\u91CE\u4E2D\u5B66\u5165\u53E3",
  "190202-01": "\u89AA\u9F3B\u99C5",
  "190202-02": "\u89AA\u9F3B\u99C5",
  "190203-01": "\u89AA\u9F3B\u6A4B",
  "190203-02": "\u89AA\u9F3B\u6A4B",
  "190204-01": "\u89B3\u5149\u8FB2\u5712\u6751",
  "190204-02": "\u89B3\u5149\u8FB2\u5712\u6751",
  "190205-01": "\u6226\u5834",
  "190205-02": "\u6226\u5834",
  "190206-01": "\u5F37\u77F3\u6A4B",
  "190206-02": "\u5F37\u77F3\u6A4B",
  "190207-01": "\u91DC\u4F0F\u5CE0\u53E3",
  "190207-02": "\u91DC\u4F0F\u5CE0\u53E3",
  "190208-01": "\u4E09\u5BAE\u53F8\u6A4B",
  "190208-02": "\u4E09\u5BAE\u53F8\u6A4B",
  "190209-01": "\u4E2D\u4E09\u6CA2",
  "190209-02": "\u4E2D\u4E09\u6CA2",
  "190210-01": "\u4E09\u6CA2\u90F5\u4FBF\u5C40",
  "190210-02": "\u4E09\u6CA2\u90F5\u4FBF\u5C40",
  "190211-01": "\u4E09\u591C\u524D",
  "190211-02": "\u4E09\u591C\u524D",
  "190212-01": "\u9AD8\u539F\u7267\u5834\u5165\u53E3",
  "190212-02": "\u9AD8\u539F\u7267\u5834\u5165\u53E3",
  "190213-01": "\u4E0A\u4E09\u6CA2",
  "190213-02": "\u4E0A\u4E09\u6CA2",
  "190214-01": "\u66FD\u6839\u5742\u5CE0",
  "190214-02": "\u66FD\u6839\u5742\u5CE0",
  "190215-01": "\u672D\u6240\u4E00\u756A",
  "190215-02": "\u672D\u6240\u4E00\u756A",
  "190216-00-01-15": "\u4E09\u5CEF\u795E\u793E",
  "190217-01": "\u98EF\u7530\u516B\u5E61",
  "190217-02": "\u98EF\u7530\u516B\u5E61",
  "190218-01": "\u98EF\u7530\u6A4B",
  "190218-02": "\u98EF\u7530\u6A4B",
  "190219-01": "\u5FB3\u8535\u9662\u524D",
  "190219-02": "\u5FB3\u8535\u9662\u524D",
  "190220-01": "\u7530\u30CE\u982D",
  "190220-02": "\u7530\u30CE\u982D",
  "190221-01": "\u65E5\u5F71\u5E73\u6A4B",
  "190221-02": "\u65E5\u5F71\u5E73\u6A4B",
  "190222-01": "\u4E45\u6708",
  "190222-02": "\u4E45\u6708",
  "190223-01": "\u534A\u5E73",
  "190223-02": "\u534A\u5E73",
  "190224-01": "\u9593\u660E\u5E73",
  "190224-02": "\u9593\u660E\u5E73",
  "190225-01": "\u9ED2\u7AF9",
  "190225-02": "\u9ED2\u7AF9",
  "190226-01": "\u4E09\u30F6\u539F",
  "190226-02": "\u4E09\u30F6\u539F",
  "190227-01": "\u6CD5\u5E2B\u843D\u4EBA\u6A4B",
  "190227-02": "\u6CD5\u5E2B\u843D\u4EBA\u6A4B",
  "190228-01": "\u77F3\u4E0A",
  "190228-02": "\u77F3\u4E0A",
  "190229-01": "\u80CC\u6238\u539F\u6A4B",
  "190229-02": "\u80CC\u6238\u539F\u6A4B",
  "190230-01": "\u7D0D\u5BAE",
  "190230-02": "\u7D0D\u5BAE",
  "190231-01": "\u65E5\u5411",
  "190231-02": "\u65E5\u5411",
  "190232-01": "\u539F",
  "190232-02": "\u539F",
  "190233-01": "\u5C0F\u91D1\u5E73",
  "190233-02": "\u5C0F\u91D1\u5E73",
  "190234-01": "\u6A4B\u8A70",
  "190234-02": "\u6A4B\u8A70",
  "190235-00-01": "\u5742\u672C",
  "190236-01": "\u6EDD\u539F\u56E3\u5730\u524D",
  "190236-02": "\u6EDD\u539F\u56E3\u5730\u524D",
  "190238-01": "\u9053\u751F\u753A",
  "190238-02": "\u9053\u751F\u753A",
  "190239-01": "\u672D\u6240\uFF12\uFF13\u756A\u767B\u308A\u53E3",
  "190239-02": "\u672D\u6240\uFF12\uFF13\u756A\u767B\u308A\u53E3",
  "190240-01": "\u672D\u6240\uFF12\uFF12\u756A\u5165\u53E3",
  "190240-02": "\u672D\u6240\uFF12\uFF12\u756A\u5165\u53E3",
  "190241-01": "\uFF2A\uFF21\u76F4\u58F2\u6240",
  "190241-02": "\uFF2A\uFF21\u76F4\u58F2\u6240",
  "190242-01": "\u672D\u6240\uFF12\uFF11\u756A",
  "190242-02": "\u672D\u6240\uFF12\uFF11\u756A",
  "190243-01": "\u5C3E\u7530\u8494\u4E2D\u5B66\u6821",
  "190243-02": "\u5C3E\u7530\u8494\u4E2D\u5B66\u6821",
  "190244-01": "\u5C3E\u7530\u8494\u99D0\u5728\u6240",
  "190244-02": "\u5C3E\u7530\u8494\u99D0\u5728\u6240",
  "190245-01": "\u7DD1\u304C\u4E18\u5E7C\u7A1A\u5712\u5165\u53E3",
  "190245-02": "\u7DD1\u304C\u4E18\u5E7C\u7A1A\u5712\u5165\u53E3",
  "190246-01": "\u4FDD\u5065\u30BB\u30F3\u30BF\u30FC",
  "190246-02": "\u4FDD\u5065\u30BB\u30F3\u30BF\u30FC",
  "190247-01": "\u897F\u5C0F\u5B66\u6821\u524D",
  "190247-02": "\u897F\u5C0F\u5B66\u6821\u524D",
  "190248-01": "\u5E02\u7ACB\u75C5\u9662",
  "190249-01": "\u5DF4\u753A",
  "190249-02": "\u5DF4\u753A",
  "190250-01": "\u9152\u3065\u304F\u308A\u306E\u68EE",
  "190250-02": "\u9152\u3065\u304F\u308A\u306E\u68EE",
  "190251-01": "\u4E45\u90A3",
  "190251-02": "\u4E45\u90A3",
  "190252-01": "\u6298\u533A\u516C\u4F1A\u5802",
  "190252-02": "\u6298\u533A\u516C\u4F1A\u5802",
  "190253-01": "\u5F71\u68EE\u4E2D\u5B66\u6821",
  "190253-02": "\u5F71\u68EE\u4E2D\u5B66\u6821",
  "190254-01": "\u65ED\u753A\uFF08\u79E9\u7236\u5E02\uFF09",
  "190254-02": "\u65ED\u753A\uFF08\u79E9\u7236\u5E02\uFF09",
  "190255-01": "\u91D1\u4ED9\u5BFA\u5165\u53E3",
  "190255-02": "\u91D1\u4ED9\u5BFA\u5165\u53E3",
  "190256-01": "\u6EDD\u306E\u4E0A\u516C\u4F1A\u5802",
  "190256-02": "\u6EDD\u306E\u4E0A\u516C\u4F1A\u5802",
  "190257-01": "\u7B2C\u4E00\u4E2D\u5B66\u6821",
  "190257-02": "\u7B2C\u4E00\u4E2D\u5B66\u6821",
  "190258-01": "\u5927\u91CE\u539F\u99C5\u524D",
  "190258-02": "\u5927\u91CE\u539F\u99C5\u524D",
  "190259-01": "\u611B\u5B95\u795E\u793E",
  "190259-02": "\u611B\u5B95\u795E\u793E",
  "190260-01": "\u5927\u91CE\u539F\uFF08\u79E9\u7236\u5E02\uFF09",
  "190260-02": "\u5927\u91CE\u539F\uFF08\u79E9\u7236\u5E02\uFF09",
  "190261-01": "\u4E0B\u5BBF",
  "190261-02": "\u4E0B\u5BBF",
  "190262-01": "\u6587\u5316\u4F53\u80B2\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "190263-01": "\u539F\u8C37\u516C\u6C11\u9928",
  "190264-01": "\u4E0B\u5C0F\u5DDD",
  "190265-01": "\u9ED2\u8C37\u516D\u5730\u8535",
  "190266-01": "\u548C\u9285\u9ED2\u8C37\u99C5",
  "190267-01": "\u91D1\u5C71",
  "190268-01": "\u745E\u5CA9\u5BFA\u5165\u53E3",
  "190269-02": "\u79E9\u7236\u795E\u793E\u524D",
  "190270-01": "\u82B1\u306E\u6728\u5C0F\u5165\u53E3",
  "190270-02": "\u82B1\u306E\u6728\u5C0F\u5165\u53E3",
  "190271-01": "\u79E9\u7236\u7B2C\u4E00\u75C5\u9662",
  "190271-02": "\u79E9\u7236\u7B2C\u4E00\u75C5\u9662",
  "190272-01": "\u4F50\u4E45\u826F\u6A4B",
  "190272-02": "\u4F50\u4E45\u826F\u6A4B",
  "190273-01-02": "\u30AD\u30C3\u30BA\u30D1\u30FC\u30AF",
  "190274-01": "\u672D\u6240\u4E8C\u5341\u56DB\u756A",
  "190274-02": "\u672D\u6240\u4E8C\u5341\u56DB\u756A",
  "190275-01": "\u672D\u6240\u5341\u756A",
  "190275-02": "\u672D\u6240\u5341\u756A",
  "190276-01": "\u672D\u6240\u4E8C\u5341\u756A\u5165\u53E3",
  "190276-02": "\u672D\u6240\u4E8C\u5341\u756A\u5165\u53E3",
  "190277-01": "\u5E02\u7ACB\u75C5\u9662\u5165\u53E3",
  "190277-02": "\u5E02\u7ACB\u75C5\u9662\u5165\u53E3",
  "190278-01": "\u4E2D\u5BFA\u5C3E",
  "190278-02": "\u4E2D\u5BFA\u5C3E",
  "190279-01": "\u5409\u7530\u90F5\u4FBF\u5C40",
  "190279-02": "\u5409\u7530\u90F5\u4FBF\u5C40",
  "190280-00-01": "\u5409\u7530\u7DCF\u5408\u652F\u6240",
  "190280-02": "\u5409\u7530\u7DCF\u5408\u652F\u6240",
  "190281-01": "\u5927\u8AF8",
  "190281-02": "\u5927\u8AF8",
  "190282-00": "\u5B9A\u5CF0\u5CE0\u5165\u53E3",
  "190283-01": "\u672D\u6240\u4E8C\u5341\u4E5D\u756A\u5165\u53E3",
  "190283-02": "\u672D\u6240\u4E8C\u5341\u4E5D\u756A\u5165\u53E3",
  "190284-01": "\u82B1\u898B\u306E\u91CC",
  "190285-00-01-02": "\u5DDD\u53C8",
  "190286-01": "\u4E0B\u539F",
  "190286-02": "\u4E0B\u539F",
  "190287-01": "\u79E9\u7236\u75C5\u9662",
  "190288-01": "\u5C3E\u30CE\u5185\u6E13\u8C37\u5165\u53E3",
  "190288-02": "\u5C3E\u30CE\u5185\u6E13\u8C37\u5165\u53E3",
  "190289-01": "\u30A6\u30CB\u30AF\u30B9\u524D",
  "195063-01": "\u4E09\u5341\u69CC",
  "195063-02": "\u4E09\u5341\u69CC",
  "195197-01": "\u690B\u795E\u793E",
  "195197-02": "\u690B\u795E\u793E",
  "20001-01": "\u897F\u6B66\u767E\u8CA8\u5E97\u524D",
  "20001-02-15": "\u897F\u6B66\u767E\u8CA8\u5E97\u524D",
  "20002-01": "\u5357\u6C60\u888B\u4E09\u4E01\u76EE",
  "20002-02": "\u5357\u6C60\u888B\u4E09\u4E01\u76EE",
  "20003-01": "\u5357\u6C60\u888B\u4E00\u4E01\u76EE",
  "20003-02": "\u5357\u6C60\u888B\u4E00\u4E01\u76EE",
  "20004-01": "\u5343\u767B\u4E16\u6A4B",
  "20004-02": "\u5343\u767B\u4E16\u6A4B",
  "20005-01": "\u76EE\u767D\u8B66\u5BDF\u524D",
  "20005-02": "\u76EE\u767D\u8B66\u5BDF\u524D",
  "20006-01": "\u76EE\u767D\u99C5",
  "20006-02": "\u76EE\u767D\u99C5",
  "20007-01": "\u4E0B\u843D\u5408\u4E09\u4E01\u76EE",
  "20007-02": "\u4E0B\u843D\u5408\u4E09\u4E01\u76EE",
  "20008-01": "\u4E0B\u843D\u5408\u56DB\u4E01\u76EE",
  "20008-02": "\u4E0B\u843D\u5408\u56DB\u4E01\u76EE",
  "20009-01": "\u8056\u6BCD\u75C5\u9662\u5165\u53E3",
  "20009-02": "\u8056\u6BCD\u75C5\u9662\u5165\u53E3",
  "20010-01-15": "\u76EE\u767D\u4E94\u4E01\u76EE",
  "20010-02": "\u76EE\u767D\u4E94\u4E01\u76EE",
  "20011-01": "\u4E2D\u843D\u5408\u4E09\u4E01\u76EE",
  "20012-01": "\u4E2D\u843D\u5408\u4E8C\u4E01\u76EE",
  "20012-02": "\u4E2D\u843D\u5408\u4E8C\u4E01\u76EE",
  "20013-01": "\u4E2D\u843D\u5408",
  "20013-02": "\u4E2D\u843D\u5408",
  "20014-01": "\u4E2D\u4E95\u99C5",
  "20014-02": "\u4E2D\u4E95\u99C5",
  "20015-01": "\u4E0A\u843D\u5408\u4E8C\u4E01\u76EE",
  "20015-02": "\u4E0A\u843D\u5408\u4E8C\u4E01\u76EE",
  "20016-01": "\u843D\u5408\uFF08\u65B0\u5BBF\u533A\uFF09",
  "20016-02": "\u843D\u5408\uFF08\u65B0\u5BBF\u533A\uFF09",
  "20017-01": "\u6771\u4E2D\u91CE",
  "20017-02": "\u6771\u4E2D\u91CE",
  "20018-01": "\u4E26\u6728\u901A\u308A",
  "20018-02": "\u4E26\u6728\u901A\u308A",
  "20019-01": "\u5BAE\u4E0B\u4EA4\u5DEE\u70B9",
  "20019-02": "\u5BAE\u4E0B\u4EA4\u5DEE\u70B9",
  "20020-01": "\u4E2D\u91CE\u5742\u4E0A",
  "20020-02": "\u4E2D\u91CE\u5742\u4E0A",
  "20021-01": "\u6210\u5B50\u5742\u4E0B",
  "20021-02": "\u6210\u5B50\u5742\u4E0B",
  "20022-01": "\u6771\u4EAC\u533B\u5927\u75C5\u9662\u524D",
  "20022-02": "\u6771\u4EAC\u533B\u5927\u75C5\u9662\u524D",
  "20023-01": "\u65B0\u5BBF\u99C5\u897F\u53E3",
  "20023-15": "\u65B0\u5BBF\u99C5\u897F\u53E3",
  "20041-01": "\u6771\u96FB\u652F\u793E\u524D",
  "20041-02": "\u6771\u96FB\u652F\u793E\u524D",
  "20042-01": "\u4E2D\u6751\u5317\u4E8C\u4E01\u76EE",
  "20042-02": "\u4E2D\u6751\u5317\u4E8C\u4E01\u76EE",
  "20043-01": "\u4E2D\u6751\u6A4B\u99C5",
  "20043-02": "\u4E2D\u6751\u6A4B\u99C5",
  "20044-01": "\u4E2D\u6751\u5317\u56DB\u4E01\u76EE",
  "20044-02": "\u4E2D\u6751\u5317\u56DB\u4E01\u76EE",
  "20045-01": "\u5BCC\u58EB\u898B\u53F0\u99C5",
  "20045-02": "\u5BCC\u58EB\u898B\u53F0\u99C5",
  "20046-01": "\u5BCC\u58EB\u898B\u53F0\u4E00\u4E01\u76EE",
  "20046-02": "\u5BCC\u58EB\u898B\u53F0\u4E00\u4E01\u76EE",
  "20047-01": "\u5357\u7530\u4E2D",
  "20047-02": "\u5357\u7530\u4E2D",
  "20048-00": "\u5357\u7530\u4E2D\u8ECA\u5EAB",
  "20048-01": "\u5357\u7530\u4E2D\u8ECA\u5EAB",
  "20048-02": "\u5357\u7530\u4E2D\u8ECA\u5EAB",
  "20048-15": "\u5357\u7530\u4E2D\u8ECA\u5EAB",
  "20049-01": "\u516B\u6210\u6A4B",
  "20049-02": "\u516B\u6210\u6A4B",
  "20049-03": "\u516B\u6210\u6A4B",
  "20049-04": "\u516B\u6210\u6A4B",
  "20050-01": "\u5357\u7530\u4E2D\u56DB\u4E01\u76EE",
  "20050-02": "\u5357\u7530\u4E2D\u56DB\u4E01\u76EE",
  "20051-01": "\u5357\u7530\u4E2D\u4E94\u4E01\u76EE",
  "20051-02": "\u5357\u7530\u4E2D\u4E94\u4E01\u76EE",
  "20052-01": "\u9577\u5149\u5BFA\u6A4B",
  "20052-02": "\u9577\u5149\u5BFA\u6A4B",
  "20053-00": "\u7DF4\u99AC\u9AD8\u91CE\u53F0\u99C5",
  "20053-01": "\u7DF4\u99AC\u9AD8\u91CE\u53F0\u99C5",
  "20053-02": "\u7DF4\u99AC\u9AD8\u91CE\u53F0\u99C5",
  "20053-15": "\u7DF4\u99AC\u9AD8\u91CE\u53F0\u99C5",
  "20054-01": "\u9AD8\u91CE\u53F0\u4E00\u4E01\u76EE",
  "20054-02": "\u9AD8\u91CE\u53F0\u4E00\u4E01\u76EE",
  "20055-00": "\u7DF4\u99AC\u99C5\u524D",
  "20056-00": "\u7DF4\u99AC\u99C5\u5317\u53E3",
  "20056-01": "\u7DF4\u99AC\u99C5\u5317\u53E3",
  "20056-02": "\u7DF4\u99AC\u99C5\u5317\u53E3",
  "20057-01": "\u7DF4\u99AC\u99C5\u524D\u901A\u308A",
  "20059-01": "\u7DF4\u99AC\u533A\u5F79\u6240\u5165\u53E3",
  "20059-02": "\u7DF4\u99AC\u533A\u5F79\u6240\u5165\u53E3",
  "20060-01": "\u5411\u5C71\u753A",
  "20060-02": "\u5411\u5C71\u753A",
  "20061-01": "\u4E2D\u6751\u6A4B\u99C5\u5165\u53E3",
  "20061-02": "\u4E2D\u6751\u6A4B\u99C5\u5165\u53E3",
  "20062-01": "\u7DF4\u99AC\u4E2D\u5B66\u6821",
  "20062-02": "\u7DF4\u99AC\u4E2D\u5B66\u6821",
  "20063-01": "\u9AD8\u677E\u4E8C\u4E01\u76EE",
  "20063-02": "\u9AD8\u677E\u4E8C\u4E01\u76EE",
  "20064-01": "\u9AD8\u677E\u4E09\u4E01\u76EE",
  "20064-02": "\u9AD8\u677E\u4E09\u4E01\u76EE",
  "20065-01": "\u771F\u5B97\u4F1A\u9928\u524D",
  "20066-01": "\u7DF4\u99AC\u9752\u679C\u5E02\u5834\u524D",
  "20067-01": "\u7DF4\u99AC\u7DCF\u5408\u4F53\u80B2\u9928",
  "20067-02": "\u7DF4\u99AC\u7DCF\u5408\u4F53\u80B2\u9928",
  "20068-01": "\u8C37\u539F\u4E8C\u4E01\u76EE",
  "20068-02": "\u8C37\u539F\u4E8C\u4E01\u76EE",
  "20068-03": "\u8C37\u539F\u4E8C\u4E01\u76EE",
  "20068-04": "\u8C37\u539F\u4E8C\u4E01\u76EE",
  "20069-01": "\u8C37\u539F\u4E09\u4E01\u76EE",
  "20069-03-05": "\u8C37\u539F\u4E09\u4E01\u76EE",
  "20069-04": "\u8C37\u539F\u4E09\u4E01\u76EE",
  "20069-15": "\u8C37\u539F\u4E09\u4E01\u76EE",
  "20070-01": "\u7DF4\u99AC\u4E00\u4E01\u76EE",
  "20070-02": "\u7DF4\u99AC\u4E00\u4E01\u76EE",
  "20071-01": "\u8C4A\u5CF6\u5712",
  "20071-02": "\u8C4A\u5CF6\u5712",
  "20072-01": "\u6625\u65E5\u753A\u4E00\u4E01\u76EE",
  "20072-02": "\u6625\u65E5\u753A\u4E00\u4E01\u76EE",
  "20073-01": "\u8FB2\u5354\u524D\uFF08\u7DF4\u99AC\u533A\uFF09",
  "20073-02": "\u8FB2\u5354\u524D\uFF08\u7DF4\u99AC\u533A\uFF09",
  "20074-01": "\u7DF4\u99AC\u6625\u65E5\u753A\u99C5",
  "20074-02": "\u7DF4\u99AC\u6625\u65E5\u753A\u99C5",
  "20075-01": "\u6625\u65E5\u753A\u9752\u5C11\u5E74\u9928\u524D",
  "20075-02": "\u6625\u65E5\u753A\u9752\u5C11\u5E74\u9928\u524D",
  "20076-01": "\u7DF4\u99AC\u9AD8\u6821",
  "20076-02": "\u7DF4\u99AC\u9AD8\u6821",
  "20077-01": "\u7530\u67C4\u4E09\u4E01\u76EE",
  "20077-02": "\u7530\u67C4\u4E09\u4E01\u76EE",
  "20078-01": "\u7530\u67C4\u9AD8\u6821",
  "20078-02": "\u7530\u67C4\u9AD8\u6821",
  "20079-01": "\u7530\u67C4\u56DB\u4E01\u76EE",
  "20079-02": "\u7530\u67C4\u56DB\u4E01\u76EE",
  "20080-01": "\u7530\u67C4\u4E8C\u4E01\u76EE",
  "20080-02": "\u7530\u67C4\u4E8C\u4E01\u76EE",
  "20081-01": "\u4E0B\u8D64\u585A\u99C5",
  "20081-02": "\u4E0B\u8D64\u585A\u99C5",
  "20082-01": "\u65B0\u753A",
  "20082-02": "\u65B0\u753A",
  "20083-01": "\u5E33\u5143",
  "20083-02": "\u5E33\u5143",
  "20085-02": "\u5149\u304C\u4E18\u4E8C\u4E01\u76EE",
  "20086-01": "\u5149\u304C\u4E18\u4E09\u4E01\u76EE",
  "20086-02": "\u5149\u304C\u4E18\u4E09\u4E01\u76EE",
  "20087-01": "\u9AD8\u677E\u56DB\u4E01\u76EE",
  "20087-02": "\u9AD8\u677E\u56DB\u4E01\u76EE",
  "20088-01-04": "\u5149\u304C\u4E18\u99C5",
  "20088-02": "\u5149\u304C\u4E18\u99C5",
  "20088-03": "\u5149\u304C\u4E18\u99C5",
  "20088-15": "\u5149\u304C\u4E18\u99C5",
  "20089-01": "\u5149\u304C\u4E18\uFF29\uFF2D\uFF21",
  "20089-02": "\u5149\u304C\u4E18\uFF29\uFF2D\uFF21",
  "20089-03": "\u5149\u304C\u4E18\uFF29\uFF2D\uFF21",
  "20090-01": "\u5149\u304C\u4E18\u4E03\u4E01\u76EE",
  "20090-02": "\u5149\u304C\u4E18\u4E03\u4E01\u76EE",
  "20091-01": "\u5149\u304C\u4E18\u5357\u901A\u308A",
  "20091-02": "\u5149\u304C\u4E18\u5357\u901A\u308A",
  "20092-01": "\u5149\u304C\u4E18\u7B2C\u4E8C\u4E2D\u5B66\u6821",
  "20092-02": "\u5149\u304C\u4E18\u7B2C\u4E8C\u4E2D\u5B66\u6821",
  "20093-01": "\u5149\u304C\u4E18\u56E3\u5730",
  "20093-02": "\u5149\u304C\u4E18\u56E3\u5730",
  "20094-01": "\u5149\u304C\u4E18\u516D\u4E01\u76EE",
  "20094-02": "\u5149\u304C\u4E18\u516D\u4E01\u76EE",
  "20095-01-03": "\u65ED\u753A\u5357\u5730\u533A\u533A\u6C11\u9928",
  "20095-02": "\u65ED\u753A\u5357\u5730\u533A\u533A\u6C11\u9928",
  "20097-03": "\u5149\u304C\u4E18\u516C\u5712\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "20097-04": "\u5149\u304C\u4E18\u516C\u5712\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "20098-01": "\u5149\u4E18\u9AD8\u6821",
  "20098-02": "\u5149\u4E18\u9AD8\u6821",
  "20099-01": "\u65ED\u753A\u4E8C\u4E01\u76EE\uFF08\u7DF4\u99AC\u533A\uFF09",
  "20099-02": "\u65ED\u753A\u4E8C\u4E01\u76EE\uFF08\u7DF4\u99AC\u533A\uFF09",
  "20100-01": "\u5149\u304C\u4E18\u516C\u5712\u5317",
  "20100-02": "\u5149\u304C\u4E18\u516C\u5712\u5317",
  "20101-01": "\u65ED\u753A\u90FD\u55B6\u4F4F\u5B85\u524D",
  "20101-02": "\u65ED\u753A\u90FD\u55B6\u4F4F\u5B85\u524D",
  "20102-01": "\u6210\u5897\u753A",
  "20102-02": "\u6210\u5897\u753A",
  "20102-03": "\u6210\u5897\u753A",
  "20102-15": "\u6210\u5897\u753A",
  "20103-02": "\u5730\u4E0B\u9244\u6210\u5897\u99C5",
  "20103-03": "\u5730\u4E0B\u9244\u6210\u5897\u99C5",
  "20104-00": "\u6210\u5897\u99C5\u5357\u53E3",
  "20104-01": "\u6210\u5897\u99C5\u5357\u53E3",
  "20104-02": "\u6210\u5897\u99C5\u5357\u53E3",
  "20104-03": "\u6210\u5897\u99C5\u5357\u53E3",
  "20104-10-15": "\u6210\u5897\u99C5\u5357\u53E3",
  "20105-01-03": "\u65ED\u753A\uFF08\u7DF4\u99AC\u533A\uFF09",
  "20106-01-03": "\u6210\u5897\u4E00\u4E01\u76EE",
  "20107-01-03": "\u65ED\u753A\u4E09\u4E01\u76EE",
  "20107-02-08": "\u65ED\u753A\u4E09\u4E01\u76EE",
  "20108-01": "\u6210\u5897\u4E8C\u4E01\u76EE",
  "20108-02-03": "\u6210\u5897\u4E8C\u4E01\u76EE",
  "20109-01": "\u6625\u65E5\u91CE",
  "20109-02": "\u6625\u65E5\u91CE",
  "20111-03": "\u5149\u304C\u4E18\u5357\u5165\u53E3",
  "20111-04": "\u5149\u304C\u4E18\u5357\u5165\u53E3",
  "20112-01": "\u9AD8\u677E\u4E94\u4E01\u76EE",
  "20112-02": "\u9AD8\u677E\u4E94\u4E01\u76EE",
  "20113-01": "\u9AD8\u677E\u5927\u9580\u901A\u308A",
  "20113-02": "\u9AD8\u677E\u5927\u9580\u901A\u308A",
  "20114-01": "\u65ED\u753A\u4E00\u4E01\u76EE\uFF08\u7DF4\u99AC\u533A\uFF09",
  "20114-02": "\u65ED\u753A\u4E00\u4E01\u76EE\uFF08\u7DF4\u99AC\u533A\uFF09",
  "20115-01-03": "\u571F\u652F\u7530\u4EA4\u756A",
  "20115-02-08": "\u571F\u652F\u7530\u4EA4\u756A",
  "20116-01-03": "\u767D\u5B50\u5411\u5C71",
  "20116-02-08": "\u767D\u5B50\u5411\u5C71",
  "20118-01-03": "\u725B\u623F",
  "20118-02-08": "\u725B\u623F",
  "20119-01": "\u4E95\u837B\u99C5\u5165\u53E3",
  "20119-02": "\u4E95\u837B\u99C5\u5165\u53E3",
  "20120-01": "\u4E95\u8349\u68EE\u516C\u5712",
  "20120-02": "\u4E95\u8349\u68EE\u516C\u5712",
  "20121-01": "\u4E95\u837B\u99C5",
  "20121-02": "\u4E95\u837B\u99C5",
  "20122-01": "\u4E0B\u4E95\u8349\u4E94\u4E01\u76EE",
  "20122-02": "\u4E0B\u4E95\u8349\u4E94\u4E01\u76EE",
  "20123-01": "\u6E05\u6C34\u4E09\u4E01\u76EE",
  "20123-02": "\u6E05\u6C34\u4E09\u4E01\u76EE",
  "20124-01": "\u6E05\u6C34\u4E8C\u4E01\u76EE",
  "20124-02": "\u6E05\u6C34\u4E8C\u4E01\u76EE",
  "20125-01": "\u6E05\u6C34\u4E00\u4E01\u76EE",
  "20125-02": "\u6E05\u6C34\u4E00\u4E01\u76EE",
  "20126-01": "\u56DB\u9762\u9053",
  "20126-02": "\u56DB\u9762\u9053",
  "20126-03": "\u56DB\u9762\u9053",
  "20126-04": "\u56DB\u9762\u9053",
  "20127-00": "\u837B\u7AAA\u99C5",
  "20127-01": "\u837B\u7AAA\u99C5",
  "20127-02": "\u837B\u7AAA\u99C5",
  "20127-03": "\u837B\u7AAA\u99C5",
  "20127-04": "\u837B\u7AAA\u99C5",
  "20127-15": "\u837B\u7AAA\u99C5",
  "20128-01-05": "\u4FDD\u8C37\u5C0F\u5B66\u6821",
  "20128-02-04": "\u4FDD\u8C37\u5C0F\u5B66\u6821",
  "20128-03": "\u4FDD\u8C37\u5C0F\u5B66\u6821",
  "20133-01": "\u571F\u652F\u7530\u306E\u68EE\u516C\u5712\u5165\u53E3",
  "20134-01": "\u9AD8\u677E\u516D\u4E01\u76EE",
  "20144-01": "\u3042\u304B\u306D\u96F2\u516C\u5712",
  "20145-01": "\u5149\u304C\u4E18\u516C\u5712",
  "20147-01": "\u5149\u4E18\u9AD8\u6821\u89D2",
  "20151-01": "\u571F\u652F\u7530\u5730\u8535",
  "20152-01": "\u9AD8\u677E\u5E7C\u7A1A\u5712\u897F",
  "20161-01": "\u65ED\u753A\u5357",
  "20162-00": "\u65B0\u6C5F\u53E4\u7530\u99C5",
  "20162-01": "\u65B0\u6C5F\u53E4\u7530\u99C5",
  "20163-01": "\u8C4A\u7389\u5317\u4E8C\u4E01\u76EE",
  "20163-02": "\u8C4A\u7389\u5317\u4E8C\u4E01\u76EE",
  "20164-01": "\u685C\u53F0\u99C5\u901A\u308A",
  "20164-02": "\u685C\u53F0\u99C5\u901A\u308A",
  "20167-01": "\u8C37\u539F\u5C0F\u5B66\u6821",
  "20167-02": "\u8C37\u539F\u5C0F\u5B66\u6821",
  "20168-01": "\u4E2D\u539F",
  "20168-02": "\u4E2D\u539F",
  "20169-01": "\u4E09\u539F\u53F0\u4E00\u4E01\u76EE\uFF3B\u7DF4\uFF14\uFF18\uFF3D",
  "20169-02": "\u4E09\u539F\u53F0\u4E00\u4E01\u76EE\uFF3B\u7DF4\uFF14\uFF18\uFF3D",
  "20170-01": "\u6771\u4E2D\u91CE\u99C5\u897F\u53E3",
  "30001-01": "\u963F\u4F50\u30F6\u8C37\u99C5",
  "30001-15": "\u963F\u4F50\u30F6\u8C37\u99C5",
  "30002-01": "\u963F\u4F50\u30F6\u8C37\u5357\u4E00\u4E01\u76EE",
  "30002-02": "\u963F\u4F50\u30F6\u8C37\u5357\u4E00\u4E01\u76EE",
  "30003-01": "\u6749\u4E26\u533A\u5F79\u6240\u524D",
  "30003-02": "\u6749\u4E26\u533A\u5F79\u6240\u524D",
  "30004-01": "\u6749\u4E26\u90FD\u7A0E\u4E8B\u52D9\u6240\u524D",
  "30004-02": "\u6749\u4E26\u90FD\u7A0E\u4E8B\u52D9\u6240\u524D",
  "30005-01": "\u963F\u4F50\u30F6\u8C37\u5357\u4E09\u4E01\u76EE",
  "30005-02": "\u963F\u4F50\u30F6\u8C37\u5357\u4E09\u4E01\u76EE",
  "30006-01": "\u5929\u6CBC",
  "30006-02": "\u5929\u6CBC",
  "30007-01": "\u837B\u7AAA\u516C\u56E3\u30A2\u30D1\u30FC\u30C8\u524D",
  "30011-01": "\u4E0A\u837B\u4E8C\u4E01\u76EE",
  "30011-02": "\u4E0A\u837B\u4E8C\u4E01\u76EE",
  "30012-01": "\u516B\u4E01\uFF08\u6749\u4E26\u533A\uFF09",
  "30012-02": "\u516B\u4E01\uFF08\u6749\u4E26\u533A\uFF09",
  "30012-03": "\u516B\u4E01\uFF08\u6749\u4E26\u533A\uFF09",
  "30012-04": "\u516B\u4E01\uFF08\u6749\u4E26\u533A\uFF09",
  "30013-01": "\u837B\u7AAA\u8B66\u5BDF\u524D",
  "30013-02": "\u837B\u7AAA\u8B66\u5BDF\u524D",
  "30014-01": "\u4EF2\u901A\u308A",
  "30014-02": "\u4EF2\u901A\u308A",
  "30015-01": "\u6CD5\u52D9\u5C40\u6749\u4E26\u51FA\u5F35\u6240",
  "30015-02": "\u6CD5\u52D9\u5C40\u6749\u4E26\u51FA\u5F35\u6240",
  "30016-01": "\u7DCF\u5408\u837B\u7AAA\u75C5\u9662\u524D",
  "30016-02": "\u7DCF\u5408\u837B\u7AAA\u75C5\u9662\u524D",
  "30016-03": "\u7DCF\u5408\u837B\u7AAA\u75C5\u9662\u524D",
  "30017-01": "\u4E2D\u592E\u5927\u5B66\u6749\u4E26\u9AD8\u6821",
  "30018-01": "\u8FB2\u82B8\u9AD8\u6821",
  "30018-02": "\u8FB2\u82B8\u9AD8\u6821",
  "30019-01": "\u4E95\u8349\u4E2D\u5B66\u6821",
  "30019-02": "\u4E95\u8349\u4E2D\u5B66\u6821",
  "30020-01": "\u4E0A\u4E95\u8349\u99C5",
  "30020-02-15": "\u4E0A\u4E95\u8349\u99C5",
  "30021-01": "\u4E0A\u4E95\u8349\u99C5\u5165\u53E3",
  "30021-02": "\u4E0A\u4E95\u8349\u99C5\u5165\u53E3",
  "30022-01": "\u4E95\u8349\u9AD8\u6821",
  "30022-02": "\u4E95\u8349\u9AD8\u6821",
  "30023-01": "\u4E95\u8349\u901A\u308A",
  "30023-02": "\u4E95\u8349\u901A\u308A",
  "30023-03": "\u4E95\u8349\u901A\u308A",
  "30023-04": "\u4E95\u8349\u901A\u308A",
  "30024-01-04": "\uFF2A\uFF21\u6771\u4EAC\u3042\u304A\u3070",
  "30024-02": "\uFF2A\uFF21\u6771\u4EAC\u3042\u304A\u3070",
  "30024-05": "\uFF2A\uFF21\u6771\u4EAC\u3042\u304A\u3070",
  "30026-01": "\u559C\u697D\u6CBC",
  "30026-02": "\u559C\u697D\u6CBC",
  "30027-01": "\u4E0B\u77F3\u795E\u4E95\u4E00\u4E01\u76EE",
  "30027-02": "\u4E0B\u77F3\u795E\u4E95\u4E00\u4E01\u76EE",
  "30028-01": "\u4E0B\u77F3\u795E\u4E95\u5742\u4E0B",
  "30028-02": "\u4E0B\u77F3\u795E\u4E95\u5742\u4E0B",
  "30029-01": "\u7985\u5B9A\u9662\u524D",
  "30029-02": "\u7985\u5B9A\u9662\u524D",
  "30029-03": "\u7985\u5B9A\u9662\u524D",
  "30029-04": "\u7985\u5B9A\u9662\u524D",
  "30030-01": "\u77F3\u795E\u4E95\u516C\u5712",
  "30030-02": "\u77F3\u795E\u4E95\u516C\u5712",
  "30030-03": "\u77F3\u795E\u4E95\u516C\u5712",
  "30030-04": "\u77F3\u795E\u4E95\u516C\u5712",
  "30031-02": "\u77F3\u795E\u4E95\u516C\u5712\u99C5\u5357\u53E3",
  "30031-03": "\u77F3\u795E\u4E95\u516C\u5712\u99C5\u5357\u53E3",
  "30031-15": "\u77F3\u795E\u4E95\u516C\u5712\u99C5\u5357\u53E3",
  "30037-01-03": "\u6771\u6620\u64AE\u5F71\u6240\u524D",
  "30037-04": "\u6771\u6620\u64AE\u5F71\u6240\u524D",
  "30038-01-03": "\u4E09\u539F\u53F0\u4E2D\u5B66\u6821",
  "30038-04": "\u4E09\u539F\u53F0\u4E2D\u5B66\u6821",
  "30039-01": "\u5999\u5EF6\u5BFA\u524D",
  "30039-02": "\u5999\u5EF6\u5BFA\u524D",
  "30041-00-01": "\u6BD4\u4E18\u5C3C\u6A4B",
  "30041-02": "\u6BD4\u4E18\u5C3C\u6A4B",
  "30042-01": "\u4E09\u539F\u53F0\u4E8C\u4E01\u76EE",
  "30043-01": "\u4E09\u8ED2\u5BFA",
  "30043-02": "\u4E09\u8ED2\u5BFA",
  "30043-03": "\u4E09\u8ED2\u5BFA",
  "30044-01": "\u8C37\u539F\u4E2D\u5B66\u6821",
  "30044-02": "\u8C37\u539F\u4E2D\u5B66\u6821",
  "30045-01": "\u8C37\u539F\u4E94\u4E01\u76EE",
  "30045-02": "\u8C37\u539F\u4E94\u4E01\u76EE",
  "30046-01": "\u4E09\u539F\u53F0\u4E00\u4E01\u76EE",
  "30046-02": "\u4E09\u539F\u53F0\u4E00\u4E01\u76EE",
  "30047-01": "\u548C\u7530\uFF08\u7DF4\u99AC\u533A\uFF09",
  "30047-02": "\u548C\u7530\uFF08\u7DF4\u99AC\u533A\uFF09",
  "30048-01": "\u5149\u548C\u5C0F\u5B66\u6821",
  "30048-02": "\u5149\u548C\u5C0F\u5B66\u6821",
  "30049-00": "\u77F3\u795E\u4E95\u516C\u5712\u99C5\u5317\u53E3",
  "30049-01": "\u77F3\u795E\u4E95\u516C\u5712\u99C5\u5317\u53E3",
  "30049-02": "\u77F3\u795E\u4E95\u516C\u5712\u99C5\u5317\u53E3",
  "30049-15": "\u77F3\u795E\u4E95\u516C\u5712\u99C5\u5317\u53E3",
  "30051-02": "\u4E09\u539F\u53F0\u5317",
  "30052-01": "\u6A4B\u6238\u5C0F\u5B66\u6821",
  "30052-02": "\u6A4B\u6238\u5C0F\u5B66\u6821",
  "30053-01": "\u5927\u6CC9\u753A\u4E8C\u4E01\u76EE",
  "30053-02": "\u5927\u6CC9\u753A\u4E8C\u4E01\u76EE",
  "30054-01": "\u571F\u652F\u7530\u4E09\u4E01\u76EE",
  "30054-02": "\u571F\u652F\u7530\u4E09\u4E01\u76EE",
  "30055-01": "\u571F\u652F\u7530\u4E8C\u4E01\u76EE",
  "30055-02-05": "\u571F\u652F\u7530\u4E8C\u4E01\u76EE",
  "30056-01": "\u571F\u652F\u7530\u5730\u57DF\u96C6\u4F1A\u6240\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30056-02": "\u571F\u652F\u7530\u5730\u57DF\u96C6\u4F1A\u6240\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30057-01": "\u571F\u652F\u7530\u516B\u5E61\u524D",
  "30057-02-05": "\u571F\u652F\u7530\u516B\u5E61\u524D",
  "30060-01": "\u571F\u652F\u7530\u4E00\u4E01\u76EE",
  "30060-02-04-05": "\u571F\u652F\u7530\u4E00\u4E01\u76EE",
  "30060-03": "\u571F\u652F\u7530\u4E00\u4E01\u76EE",
  "30061-01": "\u77F3\u795E\u4E95\u56E3\u5730\u5165\u53E3",
  "30061-02": "\u77F3\u795E\u4E95\u56E3\u5730\u5165\u53E3",
  "30062-01": "\u77F3\u795E\u4E95\u90F5\u4FBF\u5C40",
  "30062-02-04": "\u77F3\u795E\u4E95\u90F5\u4FBF\u5C40",
  "30063-01": "\u77F3\u795E\u4E95\u4E2D\u5B66\u6821",
  "30063-02-04": "\u77F3\u795E\u4E95\u4E2D\u5B66\u6821",
  "30064-01": "\u77F3\u795E\u4E95\u753A\u516D\u4E01\u76EE",
  "30064-02": "\u77F3\u795E\u4E95\u753A\u516D\u4E01\u76EE",
  "30065-01": "\u4E09\u5B9D\u5BFA\u6C60",
  "30065-02": "\u4E09\u5B9D\u5BFA\u6C60",
  "30066-01": "\u77F3\u795E\u4E95\u8B66\u5BDF\u7F72",
  "30066-02": "\u77F3\u795E\u4E95\u8B66\u5BDF\u7F72",
  "30067-02": "\u77F3\u795E\u4E95\u5E81\u820E\u524D",
  "30067-03": "\u77F3\u795E\u4E95\u5E81\u820E\u524D",
  "30071-01": "\u897F\u837B\u7AAA\u99C5",
  "30071-15": "\u897F\u837B\u7AAA\u99C5",
  "30072-01": "\u4E00\u756A\u8857",
  "30073-01": "\u897F\u837B\u5317\u56DB\u4E01\u76EE",
  "30074-01": "\u897F\u837B\u5317\u4E09\u4E01\u76EE",
  "30075-01": "\u897F\u837B\u5317\u4E94\u4E01\u76EE",
  "30076-01": "\u5584\u798F\u5BFA\u4E00\u4E01\u76EE",
  "30077-01": "\u5584\u798F\u5BFA\u90F5\u4FBF\u5C40\u524D",
  "30078-01": "\u837B\u7AAA\u4E2D\u5B66\u524D",
  "30079-01": "\u5730\u8535\u5742\u4E0A",
  "30079-02": "\u5730\u8535\u5742\u4E0A",
  "30080-01": "\u4E95\u837B\u5C0F\u5B66\u6821\u5165\u53E3",
  "30080-02": "\u4E95\u837B\u5C0F\u5B66\u6821\u5165\u53E3",
  "30081-01": "\u516B\u5E61\u6A4B",
  "30081-02": "\u516B\u5E61\u6A4B",
  "30082-01": "\u6843\u4E95\u7B2C\u56DB\u5C0F\u5B66\u6821",
  "30082-02": "\u6843\u4E95\u7B2C\u56DB\u5C0F\u5B66\u6821",
  "30083-01": "\u5584\u798F\u5BFA",
  "30083-02": "\u5584\u798F\u5BFA",
  "30086-00": "\u5409\u7965\u5BFA\u99C5",
  "30086-01": "\u5409\u7965\u5BFA\u99C5",
  "30086-02": "\u5409\u7965\u5BFA\u99C5",
  "30086-03": "\u5409\u7965\u5BFA\u99C5",
  "30086-04-05": "\u5409\u7965\u5BFA\u99C5",
  "30086-15": "\u5409\u7965\u5BFA\u99C5",
  "30087-01": "\u30B5\u30F3\u30ED\u30FC\u30C9\u5165\u53E3",
  "30087-02": "\u30B5\u30F3\u30ED\u30FC\u30C9\u5165\u53E3",
  "30088-01": "\u6771\u6025\u767E\u8CA8\u5E97\u524D",
  "30088-02": "\u6771\u6025\u767E\u8CA8\u5E97\u524D",
  "30089-01": "\u6771\u4EAC\u5973\u5B50\u5927\u5165\u53E3",
  "30089-02-03-04": "\u6771\u4EAC\u5973\u5B50\u5927\u5165\u53E3",
  "30090-01": "\u6B66\u8535\u91CE\u7B2C\u56DB\u5C0F\u5B66\u6821",
  "30090-02-03-04": "\u6B66\u8535\u91CE\u7B2C\u56DB\u5C0F\u5B66\u6821",
  "30091-01": "\u7ACB\u91CE\u753A",
  "30091-02-03-04": "\u7ACB\u91CE\u753A",
  "30092-01": "\u6B66\u8535\u91CE\u5BEE\u524D",
  "30092-02-03-04": "\u6B66\u8535\u91CE\u5BEE\u524D",
  "30093-01": "\u95A2\u753A\u5357\u4E8C\u4E01\u76EE",
  "30093-02-03-04": "\u95A2\u753A\u5357\u4E8C\u4E01\u76EE",
  "30094-01": "\u6771\u4EAC\u4E09\u80B2\u5C0F\u5B66\u6821\u5165\u53E3",
  "30094-02-03-04": "\u6771\u4EAC\u4E09\u80B2\u5C0F\u5B66\u6821\u5165\u53E3",
  "30095-01": "\u5409\u7965\u5BFA\u901A\u308A\u5165\u53E3",
  "30095-02-03-04": "\u5409\u7965\u5BFA\u901A\u308A\u5165\u53E3",
  "30096-01-15": "\u6C34\u9053\u7AEF",
  "30096-02": "\u6C34\u9053\u7AEF",
  "30097-01": "\u9752\u6885\u8857\u9053\u55B6\u696D\u6240",
  "30097-02": "\u9752\u6885\u8857\u9053\u55B6\u696D\u6240",
  "30097-03": "\u9752\u6885\u8857\u9053\u55B6\u696D\u6240",
  "30098-01": "\u7ACB\u91CE\u6A4B",
  "30098-02-15": "\u7ACB\u91CE\u6A4B",
  "30099-01": "\u4E0A\u77F3\u795E\u4E95\u99C5",
  "30099-02-03-04-15": "\u4E0A\u77F3\u795E\u4E95\u99C5",
  "30101-01-03-07": "\u4E0A\u77F3\u795E\u4E95\u4E2D\u5B66\u6821\u5165\u53E3",
  "30101-02-04-05": "\u4E0A\u77F3\u795E\u4E95\u4E2D\u5B66\u6821\u5165\u53E3",
  "30103-01-07": "\u3042\u305F\u3054\u6A4B\uFF08\u7DF4\u99AC\u533A\uFF09",
  "30103-02-04": "\u3042\u305F\u3054\u6A4B\uFF08\u7DF4\u99AC\u533A\uFF09",
  "30104-01-07": "\u4E0A\u77F3\u795E\u4E95\u5317\u5C0F\u5B66\u6821",
  "30104-02-04": "\u4E0A\u77F3\u795E\u4E95\u5317\u5C0F\u5B66\u6821",
  "30106-01": "\u95A2\u753A\u5317\u4E00\u4E01\u76EE",
  "30106-02-03": "\u95A2\u753A\u5317\u4E00\u4E01\u76EE",
  "30107-01": "\u6B66\u8535\u95A2\u99C5\u5165\u53E3",
  "30107-02-03": "\u6B66\u8535\u95A2\u99C5\u5165\u53E3",
  "30108-01": "\u95A2\u753A\u5317\u56DB\u4E01\u76EE",
  "30108-02-03": "\u95A2\u753A\u5317\u56DB\u4E01\u76EE",
  "30109-01": "\u95A2\u753A\u5317\u5C0F\u5B66\u6821",
  "30109-02": "\u95A2\u753A\u5317\u5C0F\u5B66\u6821",
  "30110-01-03": "\u5C0F\u95A2",
  "30110-02": "\u5C0F\u95A2",
  "30111-01-03": "\u897F\u6751",
  "30111-02": "\u897F\u6751",
  "30114-01-05-07": "\u7B2C\u4E94\u4E0A\u77F3\u795E\u4E95\u4F4F\u5B85",
  "30114-02-04-08": "\u7B2C\u4E94\u4E0A\u77F3\u795E\u4E95\u4F4F\u5B85",
  "30115-01-05-07": "\u5B66\u82B8\u5927\u9644\u5C5E\u524D",
  "30115-02-04-08": "\u5B66\u82B8\u5927\u9644\u5C5E\u524D",
  "30116-01-07": "\u5927\u6CC9\u5B66\u5712\u99C5\u5357\u53E3",
  "30116-02-04": "\u5927\u6CC9\u5B66\u5712\u99C5\u5357\u53E3",
  "30116-05-08": "\u5927\u6CC9\u5B66\u5712\u99C5\u5357\u53E3",
  "30116-15": "\u5927\u6CC9\u5B66\u5712\u99C5\u5357\u53E3",
  "30117-00-10": "\u5927\u6CC9\u5B66\u5712\u99C5\u5317\u53E3",
  "30117-01": "\u5927\u6CC9\u5B66\u5712\u99C5\u5317\u53E3",
  "30117-02": "\u5927\u6CC9\u5B66\u5712\u99C5\u5317\u53E3",
  "30117-03-06": "\u5927\u6CC9\u5B66\u5712\u99C5\u5317\u53E3",
  "30117-04-05": "\u5927\u6CC9\u5B66\u5712\u99C5\u5317\u53E3",
  "30117-15": "\u5927\u6CC9\u5B66\u5712\u99C5\u5317\u53E3",
  "30118-01-04-06": "\u6574\u5099\u5DE5\u5834\u524D",
  "30118-07": "\u6574\u5099\u5DE5\u5834\u524D",
  "30119-01-03-05-09": "\u5B66\u5712\u6A4B",
  "30119-02-04-06": "\u5B66\u5712\u6A4B",
  "30121-01-03-05-09": "\u5317\u5712",
  "30121-02-04-06": "\u5317\u5712",
  "30122-01-03-05-09": "\u4F4F\u5B85\u524D\uFF08\u7DF4\u99AC\u533A\uFF09",
  "30122-02-04-06": "\u4F4F\u5B85\u524D\uFF08\u7DF4\u99AC\u533A\uFF09",
  "30123-01-03-05": "\u5927\u6CC9\u90F5\u4FBF\u5C40",
  "30123-02-04-06": "\u5927\u6CC9\u90F5\u4FBF\u5C40",
  "30125-01-03-05": "\u5927\u6CC9\u98A8\u81F4\u5730\u533A",
  "30125-02-04-06": "\u5927\u6CC9\u98A8\u81F4\u5730\u533A",
  "30128-01-03-15": "\u90FD\u6C11\u8FB2\u5712\u30BB\u30B3\u30CB\u30C3\u30AF",
  "30128-02-04": "\u90FD\u6C11\u8FB2\u5712\u30BB\u30B3\u30CB\u30C3\u30AF",
  "30129-01": "\u6804\u516C\u6C11\u9928\u524D\u3010\u798F\u7949\u306E\u91CC\u3011",
  "30129-02": "\u6804\u516C\u6C11\u9928\u524D\u3010\u798F\u7949\u306E\u91CC\u3011",
  "30130-00-15": "\u65B0\u5EA7\u6804",
  "30130-01-02": "\u65B0\u5EA7\u6804",
  "30135-01": "\u5927\u6CC9\u5317\u4E2D\u5B66\u6821\u5165\u53E3",
  "30135-02": "\u5927\u6CC9\u5317\u4E2D\u5B66\u6821\u5165\u53E3",
  "30141-01": "\u5927\u6CC9\u753A\u56DB\u4E01\u76EE",
  "30141-02": "\u5927\u6CC9\u753A\u56DB\u4E01\u76EE",
  "30142-01": "\u5927\u6CC9\u7B2C\u4E00\u5C0F\u5B66\u6821",
  "30142-02": "\u5927\u6CC9\u7B2C\u4E00\u5C0F\u5B66\u6821",
  "30143-01": "\u3082\u307F\u3058\u5C71",
  "30143-02": "\u3082\u307F\u3058\u5C71",
  "30145-01": "\u5317\u5927\u6CC9",
  "30145-02": "\u5317\u5927\u6CC9",
  "30146-01": "\u5357\u4E00\u4E01\u76EE",
  "30146-02": "\u5357\u4E00\u4E01\u76EE",
  "30151-01": "\u897F\u9577\u4E45\u4FDD",
  "30151-02": "\u897F\u9577\u4E45\u4FDD",
  "30151-05": "\u897F\u9577\u4E45\u4FDD",
  "30151-06": "\u897F\u9577\u4E45\u4FDD",
  "30152-01": "\u9577\u4E45\u4FDD",
  "30152-02": "\u9577\u4E45\u4FDD",
  "30152-03-05": "\u9577\u4E45\u4FDD",
  "30152-06": "\u9577\u4E45\u4FDD",
  "30152-15": "\u9577\u4E45\u4FDD",
  "30152-16": "\u9577\u4E45\u4FDD",
  "30152-17": "\u9577\u4E45\u4FDD",
  "30153-01": "\u65B0\u5EA7\u7DCF\u5408\u6280\u8853\u9AD8\u6821",
  "30153-02": "\u65B0\u5EA7\u7DCF\u5408\u6280\u8853\u9AD8\u6821",
  "30154-01": "\u5927\u6CC9\u685C\u5B66\u5712",
  "30155-01": "\u5927\u6CC9\u7279\u5225\u652F\u63F4\u5B66\u6821",
  "30156-01": "\u5927\u6CC9\u4E2D\u592E\u516C\u5712",
  "30156-02": "\u5927\u6CC9\u4E2D\u592E\u516C\u5712",
  "30157-01": "\u53F8\u6CD5\u7814\u4FEE\u6240",
  "30157-02": "\u53F8\u6CD5\u7814\u4FEE\u6240",
  "30157-03": "\u53F8\u6CD5\u7814\u4FEE\u6240",
  "30157-04": "\u53F8\u6CD5\u7814\u4FEE\u6240",
  "30158-01": "\u548C\u5149\u5E02\u5357",
  "30158-02": "\u548C\u5149\u5E02\u5357",
  "30161-01": "\u8D8A\u5F8C\u5C71",
  "30161-02": "\u8D8A\u5F8C\u5C71",
  "30162-01": "\u5357\u5927\u548C",
  "30162-02": "\u5357\u5927\u548C",
  "30163-01": "\u56E3\u5730\u897F\u53E3",
  "30163-02": "\u56E3\u5730\u897F\u53E3",
  "30164-01": "\u8ACF\u8A2A\u539F\u4F4F\u5B85",
  "30164-02": "\u8ACF\u8A2A\u539F\u4F4F\u5B85",
  "30165-01": "\u57FC\u7389\u75C5\u9662\u5165\u53E3",
  "30165-02": "\u57FC\u7389\u75C5\u9662\u5165\u53E3",
  "30166-01": "\u65B0\u9053\u5742\u4E0A",
  "30166-02": "\u65B0\u9053\u5742\u4E0A",
  "30172-01": "\u6A39\u6797\u516C\u5712",
  "30172-02": "\u6A39\u6797\u516C\u5712",
  "30173-01": "\u7A0E\u52D9\u5927\u5B66\u6821\u548C\u5149\u6821\u820E",
  "30173-02": "\u7A0E\u52D9\u5927\u5B66\u6821\u548C\u5149\u6821\u820E",
  "30174-01": "\u897F\u5927\u548C\u56E3\u5730\u5357",
  "30174-02": "\u897F\u5927\u548C\u56E3\u5730\u5357",
  "30175-01": "\u5E83\u6CA2",
  "30175-02": "\u5E83\u6CA2",
  "30176-01": "\u4E38\u5C71\u53F0",
  "30176-02": "\u4E38\u5C71\u53F0",
  "30177-00": "\u548C\u5149\u5E02\u99C5\u5357\u53E3",
  "30177-01": "\u548C\u5149\u5E02\u99C5\u5357\u53E3",
  "30181-01": "\u95A2\u753A\u5357\u4E09\u4E01\u76EE",
  "30181-02": "\u95A2\u753A\u5357\u4E09\u4E01\u76EE",
  "30182-01": "\u95A2\u753A\u90F5\u4FBF\u5C40\u524D",
  "30182-02": "\u95A2\u753A\u90F5\u4FBF\u5C40\u524D",
  "30182-03": "\u95A2\u753A\u90F5\u4FBF\u5C40\u524D",
  "30182-04": "\u95A2\u753A\u90F5\u4FBF\u5C40\u524D",
  "30183-01": "\u6148\u96F2\u5802\u524D",
  "30183-02": "\u6148\u96F2\u5802\u524D",
  "30184-01": "\u5317\u88CF",
  "30184-02": "\u5317\u88CF",
  "30185-01": "\u4E09\u30C4\u585A",
  "30185-02": "\u4E09\u30C4\u585A",
  "30186-01": "\u6771\u4F0F\u898B\u5742\u4E0A",
  "30186-02": "\u6771\u4F0F\u898B\u5742\u4E0A",
  "30191-01": "\u4E09\u9DF9\u99C5",
  "30191-15": "\u4E09\u9DF9\u99C5",
  "30192-01": "\u8B66\u5BDF\u524D",
  "30192-02": "\u8B66\u5BDF\u524D",
  "30193-01": "\u897F\u4E45\u4FDD\u4E8C\u4E01\u76EE",
  "30193-02": "\u897F\u4E45\u4FDD\u4E8C\u4E01\u76EE",
  "30194-01": "\u4FDD\u5065\u6240\u524D",
  "30194-02": "\u4FDD\u5065\u6240\u524D",
  "30195-01": "\u5E02\u6C11\u6587\u5316\u4F1A\u9928\u5165\u53E3",
  "30195-02": "\u5E02\u6C11\u6587\u5316\u4F1A\u9928\u5165\u53E3",
  "30196-01": "\u6B66\u8535\u91CE\u55B6\u696D\u6240\u524D",
  "30196-02": "\u6B66\u8535\u91CE\u55B6\u696D\u6240\u524D",
  "30197-01": "\u7A32\u8377\u795E\u793E\u524D",
  "30197-02": "\u7A32\u8377\u795E\u793E\u524D",
  "30198-01": "\u7B2C\u4E94\u5C0F\u5B66\u6821\u524D",
  "30198-02": "\u7B2C\u4E94\u5C0F\u5B66\u6821\u524D",
  "30199-01": "\u95A2\u524D\u4E09\u4E01\u76EE",
  "30199-02": "\u95A2\u524D\u4E09\u4E01\u76EE",
  "30200-01": "\u6B66\u8535\u91CE\u4E2D\u592E\u516C\u5712",
  "30200-02": "\u6B66\u8535\u91CE\u4E2D\u592E\u516C\u5712",
  "30201-01": "\u6B66\u8535\u91CE\u5317\u9AD8\u6821\u524D",
  "30201-02": "\u6B66\u8535\u91CE\u5317\u9AD8\u6821\u524D",
  "30202-01": "\u6771\u4F0F\u898B\u7A32\u8377\u795E\u793E",
  "30202-03": "\u6771\u4F0F\u898B\u7A32\u8377\u795E\u793E",
  "30202-04": "\u6771\u4F0F\u898B\u7A32\u8377\u795E\u793E",
  "30202-05": "\u6771\u4F0F\u898B\u7A32\u8377\u795E\u793E",
  "30202-06": "\u6771\u4F0F\u898B\u7A32\u8377\u795E\u793E",
  "30202-07": "\u6771\u4F0F\u898B\u7A32\u8377\u795E\u793E",
  "30202-08": "\u6771\u4F0F\u898B\u7A32\u8377\u795E\u793E",
  "30203-01": "\u6771\u4F0F\u898B\u56E3\u5730\u6771",
  "30203-02": "\u6771\u4F0F\u898B\u56E3\u5730\u6771",
  "30204-01-15": "\u6771\u4F0F\u898B\u99C5\u5317\u53E3",
  "30206-01": "\u95A2\u4E2D\u5B66\u6821",
  "30206-02": "\u95A2\u4E2D\u5B66\u6821",
  "30206-03": "\u95A2\u4E2D\u5B66\u6821",
  "30206-04": "\u95A2\u4E2D\u5B66\u6821",
  "30207-01": "\u77F3\u795E\u4E95\u9AD8\u6821\u524D",
  "30207-02": "\u77F3\u795E\u4E95\u9AD8\u6821\u524D",
  "30208-02": "\u5BCC\u58EB\u753A\u4E09\u4E01\u76EE",
  "30208-03": "\u5BCC\u58EB\u753A\u4E09\u4E01\u76EE",
  "30209-01": "\u5BCC\u58EB\u753A",
  "30209-02": "\u5BCC\u58EB\u753A",
  "30211-01": "\u95A2\u753A\u5317\u4E94\u4E01\u76EE",
  "30211-02": "\u95A2\u753A\u5317\u4E94\u4E01\u76EE",
  "30212-01": "\u9AD8\u585A",
  "30212-02": "\u9AD8\u585A",
  "30213-01": "\u5BCC\u58EB\u753A\u6771",
  "30213-02": "\u5BCC\u58EB\u753A\u6771",
  "30216-01": "\u6771\u4F0F\u898B\u56E3\u5730",
  "30216-02": "\u6771\u4F0F\u898B\u56E3\u5730",
  "30217-01": "\u5343\u99C4\u5C71\u4F4F\u5B85",
  "30217-02": "\u5343\u99C4\u5C71\u4F4F\u5B85",
  "30218-01": "\u67F3\u6CA2\u99C5\u901A\u308A",
  "30218-02": "\u67F3\u6CA2\u99C5\u901A\u308A",
  "30219-01": "\u6876\u4E45\u4FDD",
  "30219-02": "\u6876\u4E45\u4FDD",
  "30220-01-03": "\u5E73\u548C\u901A\u308A",
  "30220-02": "\u5E73\u548C\u901A\u308A",
  "30223-01": "\u8352\u4E95\u7AF9",
  "30223-02": "\u8352\u4E95\u7AF9",
  "30223-03": "\u8352\u4E95\u7AF9",
  "30224-01-03": "\u897F\u6771\u4EAC\u5E02\u5F79\u6240\u30FB\u4FDD\u8C37\u5E81\u820E",
  "30224-02": "\u897F\u6771\u4EAC\u5E02\u5F79\u6240\u30FB\u4FDD\u8C37\u5E81\u820E",
  "30226-01-03": "\u6587\u7406\u53F0\u516C\u5712",
  "30226-02": "\u6587\u7406\u53F0\u516C\u5712",
  "30227-01": "\u6771\u753A\u4E09\u4E01\u76EE",
  "30227-02": "\u6771\u753A\u4E09\u4E01\u76EE",
  "30227-03": "\u6771\u753A\u4E09\u4E01\u76EE",
  "30228-00": "\u4FDD\u8C37\u99C5\u5357\u53E3",
  "30228-01": "\u4FDD\u8C37\u99C5\u5357\u53E3",
  "30228-02": "\u4FDD\u8C37\u99C5\u5357\u53E3",
  "30228-03": "\u4FDD\u8C37\u99C5\u5357\u53E3",
  "30228-15": "\u4FDD\u8C37\u99C5\u5357\u53E3",
  "30229-01": "\u9CE5\u4E45\u4FDD",
  "30229-02": "\u9CE5\u4E45\u4FDD",
  "30231-01": "\u5E73\u677E\uFF08\u897F\u6771\u4EAC\u5E02\uFF09",
  "30231-02": "\u5E73\u677E\uFF08\u897F\u6771\u4EAC\u5E02\uFF09",
  "30232-01": "\u897F\u6D66",
  "30232-02": "\u897F\u6D66",
  "30235-01": "\u4F0F\u898B\u901A\u308A",
  "30235-02": "\u4F0F\u898B\u901A\u308A",
  "30236-01": "\u6A2A\u6CB3\u5165\u53E3",
  "30236-02": "\u6A2A\u6CB3\u5165\u53E3",
  "30238-01": "\u7A32\u8377\u524D\uFF08\u7DF4\u99AC\u533A\uFF09",
  "30238-02": "\u7A32\u8377\u524D\uFF08\u7DF4\u99AC\u533A\uFF09",
  "30239-01": "\u77F3\u795E\u4E95\u5E7C\u7A1A\u5712\u5165\u53E3",
  "30239-02": "\u77F3\u795E\u4E95\u5E7C\u7A1A\u5712\u5165\u53E3",
  "30240-01": "\u4E0B\u5C4B\u6577",
  "30240-02": "\u4E0B\u5C4B\u6577",
  "30241-01": "\u6771\u5927\u6CC9\u4E8C\u4E01\u76EE",
  "30241-02": "\u6771\u5927\u6CC9\u4E8C\u4E01\u76EE",
  "30247-01": "\u6771\u753A\u516D\u4E01\u76EE",
  "30247-02": "\u6771\u753A\u516D\u4E01\u76EE",
  "30248-01": "\u4E0A\u4E95\u8349\u4FDD\u5065\u30BB\u30F3\u30BF\u30FC",
  "30249-01": "\u4E0A\u4E95\u8349\u30B9\u30DD\u30FC\u30C4\u30BB\u30F3\u30BF\u30FC",
  "30307-01": "\u5B66\u5712\u901A\u308A\u88DC\u52A9\uFF12\uFF13\uFF10\u53F7\u7DDA\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30307-02": "\u5B66\u5712\u901A\u308A\u88DC\u52A9\uFF12\uFF13\uFF10\u53F7\u7DDA\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30310-01": "\u5927\u6CC9\u753A\u4E00\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30310-02": "\u5927\u6CC9\u753A\u4E00\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30313-01": "\u5149\u4E18\u9AD8\u6821\u89D2\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30313-02": "\u5149\u4E18\u9AD8\u6821\u89D2\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30320-01": "\u4E2D\u753A\u4E00\u4E01\u76EE",
  "30320-02": "\u4E2D\u753A\u4E00\u4E01\u76EE",
  "30321-01": "\u4E2D\u753A\u516D\u4E01\u76EE",
  "30321-02": "\u4E2D\u753A\u516D\u4E01\u76EE",
  "30322-01": "\u4FDD\u8C37\u4E2D\u5B66\u6821",
  "30322-02": "\u4FDD\u8C37\u4E2D\u5B66\u6821",
  "30323-01": "\u5BCC\u58EB\u753A\u516D\u4E01\u76EE",
  "30323-02": "\u5BCC\u58EB\u753A\u516D\u4E01\u76EE",
  "30358-00-01": "\u767D\u5B50\u6298\u8FD4\u5834",
  "30359-02": "\u548C\u5149\u5E02\u99C5\u5165\u53E3",
  "30361-01": "\u5927\u6CC9\u753A\u4E09\u4E01\u76EE",
  "30361-02": "\u5927\u6CC9\u753A\u4E09\u4E01\u76EE",
  "30361-03": "\u5927\u6CC9\u753A\u4E09\u4E01\u76EE",
  "30361-04": "\u5927\u6CC9\u753A\u4E09\u4E01\u76EE",
  "30363-01": "\u95A2\u753A\u5317\u4E09\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30363-02": "\u95A2\u753A\u5317\u4E09\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30364-01": "\u77F3\u795E\u4E95\u9AD8\u6821\u6771\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30364-02": "\u77F3\u795E\u4E95\u9AD8\u6821\u6771\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30365-01": "\u77F3\u795E\u4E95\u53F0\u4E03\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30365-02": "\u77F3\u795E\u4E95\u53F0\u4E03\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30366-01": "\u4E0A\u77F3\u795E\u4E95\u30A2\u30D1\u30FC\u30C8\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30366-02": "\u4E0A\u77F3\u795E\u4E95\u30A2\u30D1\u30FC\u30C8\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30367-01": "\u77F3\u795E\u4E95\u53F0\u56DB\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30367-02": "\u77F3\u795E\u4E95\u53F0\u56DB\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30368-01": "\u77F3\u795E\u4E95\u6E05\u6383\u4E8B\u52D9\u6240\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30368-02": "\u77F3\u795E\u4E95\u6E05\u6383\u4E8B\u52D9\u6240\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30369-01": "\u65E9\u7A32\u7530\u9AD8\u7B49\u5B66\u9662\u5357\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30369-02": "\u65E9\u7A32\u7530\u9AD8\u7B49\u5B66\u9662\u5357\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30370-01": "\u4E0A\u77F3\u795E\u4E95\u4E8C\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30370-02": "\u4E0A\u77F3\u795E\u4E95\u4E8C\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30371-01": "\u77F3\u795E\u4E95\u6D88\u9632\u7F72\u524D\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30371-02": "\u77F3\u795E\u4E95\u6D88\u9632\u7F72\u524D\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30372-02": "\u77F3\u795E\u4E95\u5C0F\u5B66\u6821\u6771\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30373-01": "\u548C\u7530\u5800\u516C\u5712\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30373-02": "\u548C\u7530\u5800\u516C\u5712\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30374-01": "\u5357\u7530\u4E2D\u30A2\u30D1\u30FC\u30C8\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30374-02": "\u5357\u7530\u4E2D\u30A2\u30D1\u30FC\u30C8\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30375-01": "\u9577\u5149\u5BFA\u6A4B\u516C\u5712\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30375-02": "\u9577\u5149\u5BFA\u6A4B\u516C\u5712\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30376-00": "\u9806\u5929\u5802\u7DF4\u99AC\u75C5\u9662\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30376-01": "\u9806\u5929\u5802\u7DF4\u99AC\u75C5\u9662\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30377-01": "\u95A2\u533A\u6C11\u30BB\u30F3\u30BF\u30FC\u524D\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30378-00-01": "\u6B66\u8535\u95A2\u99C5\u5357\u53E3\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30400-01": "\u6771\u5927\u6CC9\u56DB\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30400-02": "\u6771\u5927\u6CC9\u56DB\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30401-01": "\u5999\u798F\u5BFA\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30401-02": "\u5999\u798F\u5BFA\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30402-01": "\u5C0F\u6CC9\u6A4B\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30402-02": "\u5C0F\u6CC9\u6A4B\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30403-01": "\u4E38\u5C71\u6771\u6A4B\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30403-02": "\u4E38\u5C71\u6771\u6A4B\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30404-01": "\u5927\u6CC9\u7B2C\u56DB\u5C0F\u5B66\u6821\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30404-02": "\u5927\u6CC9\u7B2C\u56DB\u5C0F\u5B66\u6821\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30405-01": "\u4E38\u5C71\u897F\u6A4B\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30405-02": "\u4E38\u5C71\u897F\u6A4B\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30406-01": "\u897F\u5927\u6CC9\u5730\u533A\u533A\u6C11\u9928\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30406-02": "\u897F\u5927\u6CC9\u5730\u533A\u533A\u6C11\u9928\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30407-01": "\u897F\u5927\u6CC9\u4E09\u90F5\u4FBF\u5C40\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30407-02": "\u897F\u5927\u6CC9\u4E09\u90F5\u4FBF\u5C40\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30408-01": "\u5927\u6CC9\u5B66\u5712\u753A\u798F\u7949\u5712\u5165\u53E3\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30409-01": "\u5927\u6CC9\u5B66\u5712\u753A\u4F53\u80B2\u9928\u897F\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30410-01": "\u5927\u6CC9\u5B66\u5712\u753A\u4E94\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30411-01": "\u95A2\u8D8A\u897F\u5927\u6CC9\u6A4B\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30412-01": "\u95A2\u8D8A\u5BCC\u58EB\u898B\u6A4B\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30413-01": "\u897F\u5927\u6CC9\u5E02\u6C11\u8FB2\u5712\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30414-01": "\u5225\u8358\u6A4B\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30414-02": "\u5225\u8358\u6A4B\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30415-01": "\u65ED\u753A\u5357\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30415-02": "\u65ED\u753A\u5357\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30416-01": "\u571F\u652F\u7530\u516B\u5E61\u524D\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30416-02": "\u571F\u652F\u7530\u516B\u5E61\u524D\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30417-01": "\u65ED\u753A\u5357\u5730\u533A\u533A\u6C11\u9928\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30417-02": "\u65ED\u753A\u5357\u5730\u533A\u533A\u6C11\u9928\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30418-01": "\u4FDD\u8C37\u99C5\u5165\u53E3\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30419-01": "\u4E2D\u524D\u65B0\u7530\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30419-02": "\u4E2D\u524D\u65B0\u7530\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30420-01": "\u5927\u6CC9\u7B2C\u4E8C\u5C0F\u5B66\u6821\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30420-02": "\u5927\u6CC9\u7B2C\u4E8C\u5C0F\u5B66\u6821\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30421-01": "\u5927\u6CC9\u7B2C\u4E8C\u5C0F\u5357\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30421-02": "\u5927\u6CC9\u7B2C\u4E8C\u5C0F\u5357\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30422-01": "\u5357\u5927\u6CC9\u4E00\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30422-02": "\u5357\u5927\u6CC9\u4E00\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30423-01": "\u7DF4\u99AC\u5357\u5927\u6CC9\u4E00\u90F5\u4FBF\u5C40\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30423-02": "\u7DF4\u99AC\u5357\u5927\u6CC9\u4E00\u90F5\u4FBF\u5C40\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30427-00": "\u4FDD\u8C37\u99C5\u5165\u53E3\u30FB\u964D\u8ECA\u5C02\u7528\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30428-01": "\u77F3\u795E\u4E95\u53F0\u516B\u4E01\u76EE\u4EA4\u5DEE\u70B9\u897F\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30428-02": "\u77F3\u795E\u4E95\u53F0\u516B\u4E01\u76EE\u4EA4\u5DEE\u70B9\u897F\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30429-01": "\u5357\u5927\u6CC9\u4E00\u4E01\u76EE\u5357\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30429-02": "\u5357\u5927\u6CC9\u4E00\u4E01\u76EE\u5357\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30430-01": "\u5357\u5927\u6CC9\u4E8C\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30430-02": "\u5357\u5927\u6CC9\u4E8C\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30431-01": "\u77F3\u795E\u4E95\u9AD8\u6821\u5317\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "30431-02": "\u77F3\u795E\u4E95\u9AD8\u6821\u5317\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35001-01-07": "\u65E9\u7A32\u7530\u9AD8\u7B49\u5B66\u9662",
  "35001-02-04": "\u65E9\u7A32\u7530\u9AD8\u7B49\u5B66\u9662",
  "35002-01-09": "\u5BCC\u58EB\u8857\u9053",
  "35002-02-06-08": "\u5BCC\u58EB\u8857\u9053",
  "35002-03": "\u5BCC\u58EB\u8857\u9053",
  "35002-04-07": "\u5BCC\u58EB\u8857\u9053",
  "35003-01-07": "\u5E9A\u7533\u585A\uFF08\u7DF4\u99AC\u533A\uFF09",
  "35003-02-04": "\u5E9A\u7533\u585A\uFF08\u7DF4\u99AC\u533A\uFF09",
  "35004-00": "\u897F\u6B66\u8ECA\u5EAB\u524D\uFF08\u4E0A\u77F3\u795E\u4E95\u55B6\u696D\u6240\uFF09",
  "35004-01-02": "\u897F\u6B66\u8ECA\u5EAB\u524D\uFF08\u4E0A\u77F3\u795E\u4E95\u55B6\u696D\u6240\uFF09",
  "35004-04-05-06": "\u897F\u6B66\u8ECA\u5EAB\u524D\uFF08\u4E0A\u77F3\u795E\u4E95\u55B6\u696D\u6240\uFF09",
  "35004-15": "\u897F\u6B66\u8ECA\u5EAB\u524D\uFF08\u4E0A\u77F3\u795E\u4E95\u55B6\u696D\u6240\uFF09",
  "35004-16": "\u897F\u6B66\u8ECA\u5EAB\u524D\uFF08\u4E0A\u77F3\u795E\u4E95\u55B6\u696D\u6240\uFF09",
  "35005-01-05": "\u90FD\u6C11\u8FB2\u5712",
  "35005-02-04-06": "\u90FD\u6C11\u8FB2\u5712",
  "35005-03-07": "\u90FD\u6C11\u8FB2\u5712",
  "35005-08": "\u90FD\u6C11\u8FB2\u5712",
  "35006-01-05": "\u5929\u6CBC\u30DE\u30FC\u30B1\u30C3\u30C8\u524D",
  "35006-02-04": "\u5929\u6CBC\u30DE\u30FC\u30B1\u30C3\u30C8\u524D",
  "35059-01": "\u3042\u304B\u306D\u96F2\u516C\u5712\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35059-02": "\u3042\u304B\u306D\u96F2\u516C\u5712\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35147-01": "\u5B66\u5712\u753A\u516B\u4E01\u76EE\u6771\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35147-02": "\u5B66\u5712\u753A\u516B\u4E01\u76EE\u6771\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35157-01": "\u5149\u304C\u4E18\u4E94\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35157-02": "\u5149\u304C\u4E18\u4E94\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35181-01": "\u6E05\u6C34\u5C71\u306E\u68EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35181-02": "\u6E05\u6C34\u5C71\u306E\u68EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35183-01": "\u30DB\u30C6\u30EB\u30AB\u30C7\u30F3\u30C4\u30A1\u6771\u4EAC",
  "35183-02": "\u30DB\u30C6\u30EB\u30AB\u30C7\u30F3\u30C4\u30A1\u6771\u4EAC",
  "35184-01-15": "\u4FDD\u8C37\u99C5\u5317\u53E3\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35185-01": "\u4E0B\u4FDD\u8C37\u4E09\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35186-01": "\u897F\u5927\u6CC9\u4E94\u90F5\u4FBF\u5C40\u5357\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35186-02": "\u897F\u5927\u6CC9\u4E94\u90F5\u4FBF\u5C40\u5357\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35187-01": "\u897F\u5927\u6CC9\u4E94\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35187-02": "\u897F\u5927\u6CC9\u4E94\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35188-01": "\u897F\u5927\u6CC9\u516D\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35189-01": "\u56DB\u9762\u5854\u7A32\u8377\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35189-02": "\u56DB\u9762\u5854\u7A32\u8377\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35190-01-15": "\u7DF4\u99AC\u5149\u304C\u4E18\u75C5\u9662\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35202-01": "\u95A2\u753A\u5357\u4E09\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "35202-02": "\u95A2\u753A\u5357\u4E09\u4E01\u76EE\uFF08\u307F\u3069\u308A\u30D0\u30B9\uFF09",
  "40001-01": "\u6B66\u8535\u5883\u99C5",
  "40001-02": "\u6B66\u8535\u5883\u99C5",
  "40001-15": "\u6B66\u8535\u5883\u99C5",
  "40002-01": "\u5E02\u6C11\u4F1A\u9928\u524D\uFF08\u6B66\u8535\u91CE\u5E02\uFF09",
  "40003-01": "\u6B66\u8535\u5883\u81EA\u52D5\u8ECA\u6559\u7FD2\u6240\u5165\u53E3",
  "40004-01": "\u685C\u6A4B",
  "40004-02-04": "\u685C\u6A4B",
  "40005-01": "\u95A2\u524D\u4E00\u4E01\u76EE",
  "40005-02-04": "\u95A2\u524D\u4E00\u4E01\u76EE",
  "40006-01": "\u95A2\u524D\u56DB\u4E01\u76EE",
  "40006-02-04": "\u95A2\u524D\u56DB\u4E01\u76EE",
  "40007-02-04": "\u5CA9\u5009\u9AD8\u6821\u30B0\u30E9\u30A6\u30F3\u30C9\u524D",
  "40007-03": "\u5CA9\u5009\u9AD8\u6821\u30B0\u30E9\u30A6\u30F3\u30C9\u524D",
  "40008-02": "\u6B66\u8535\u5883\u81EA\u52D5\u8ECA\u6559\u7FD2\u6240\u524D",
  "40008-04": "\u6B66\u8535\u5883\u81EA\u52D5\u8ECA\u6559\u7FD2\u6240\u524D",
  "40009-02-04": "\u7B2C\u4E8C\u5C0F\u5B66\u6821",
  "40016-01": "\u67F3\u6CA2",
  "40016-02": "\u67F3\u6CA2",
  "40019-01": "\u7530\u7121\u753A\u4E09\u4E01\u76EE",
  "40019-02": "\u7530\u7121\u753A\u4E09\u4E01\u76EE",
  "40019-03": "\u7530\u7121\u753A\u4E09\u4E01\u76EE",
  "40021-01": "\u81F3\u8AA0\u5B66\u820E\u6771\u4EAC\u524D",
  "40021-02-04": "\u81F3\u8AA0\u5B66\u820E\u6771\u4EAC\u524D",
  "40022-01": "\u5411\u53F0\u753A\u4E00\u4E01\u76EE",
  "40022-02-04": "\u5411\u53F0\u753A\u4E00\u4E01\u76EE",
  "40023-01": "\u5BCC\u58EB\u898B\u6A4B",
  "40023-02-04": "\u5BCC\u58EB\u898B\u6A4B",
  "40024-00": "\u7530\u7121\u99C5",
  "40024-01": "\u7530\u7121\u99C5",
  "40024-02": "\u7530\u7121\u99C5",
  "40024-03": "\u7530\u7121\u99C5",
  "40024-04": "\u7530\u7121\u99C5",
  "40024-05": "\u7530\u7121\u99C5",
  "40024-15": "\u7530\u7121\u99C5",
  "40025-01": "\u5357\u753A\u4E09\u4E01\u76EE",
  "40031-01": "\u897F\u6771\u4EAC\u90F5\u4FBF\u5C40",
  "40031-02": "\u897F\u6771\u4EAC\u90F5\u4FBF\u5C40",
  "40032-01": "\u4E2D\u592E\u901A\u308A\uFF08\u897F\u6771\u4EAC\u5E02\uFF09",
  "40033-01": "\u5317\u539F\u4F4F\u5B85",
  "40033-02": "\u5317\u539F\u4F4F\u5B85",
  "40034-01": "\u5317\u539F\u4E8C\u4E01\u76EE",
  "40034-02": "\u5317\u539F\u4E8C\u4E01\u76EE",
  "40035-01": "\u5C0F\u8C37\u6238",
  "40035-02": "\u5C0F\u8C37\u6238",
  "40036-01": "\u8C37\u6238\u4F4F\u5B85",
  "40036-02": "\u8C37\u6238\u4F4F\u5B85",
  "40037-01": "\u8C37\u6238\u5C0F\u5B66\u6821",
  "40037-02": "\u8C37\u6238\u5C0F\u5B66\u6821",
  "40038-01": "\u4F4F\u53CB\u91CD\u6A5F\u68B0\u5DE5\u696D\u524D",
  "40038-02": "\u4F4F\u53CB\u91CD\u6A5F\u68B0\u5DE5\u696D\u524D",
  "40038-03": "\u4F4F\u53CB\u91CD\u6A5F\u68B0\u5DE5\u696D\u524D",
  "40039-01": "\u8C37\u6238",
  "40039-02": "\u8C37\u6238",
  "40041-01": "\u4E0A\u5BBF\u4F4F\u5B85",
  "40041-02": "\u4E0A\u5BBF\u4F4F\u5B85",
  "40042-01": "\u516D\u89D2\u5730\u8535\u5C0A\u524D",
  "40042-02": "\u516D\u89D2\u5730\u8535\u5C0A\u524D",
  "40043-01": "\u7DD1\u753A\u4E8C\u4E01\u76EE",
  "40043-02": "\u7DD1\u753A\u4E8C\u4E01\u76EE",
  "40044-01": "\u3072\u3070\u308A\u304C\u4E18\u56E3\u5730\u897F\u53E3",
  "40044-02": "\u3072\u3070\u308A\u304C\u4E18\u56E3\u5730\u897F\u53E3",
  "40045-01": "\u7DD1\u753A\u4E09\u4E01\u76EE",
  "40045-02": "\u7DD1\u753A\u4E09\u4E01\u76EE",
  "40046-01": "\u90FD\u55B6\u4F4F\u5B85\u524D",
  "40046-02": "\u90FD\u55B6\u4F4F\u5B85\u524D",
  "40051-01": "\u897F\u539F\u30B0\u30EA\u30FC\u30F3\u30CF\u30A4\u30C4",
  "40051-02": "\u897F\u539F\u30B0\u30EA\u30FC\u30F3\u30CF\u30A4\u30C4",
  "40052-00-15": "\u897F\u6B66\u30D0\u30B9\u897F\u539F\u8ECA\u5EAB",
  "40052-01": "\u897F\u6B66\u30D0\u30B9\u897F\u539F\u8ECA\u5EAB",
  "40052-02": "\u897F\u6B66\u30D0\u30B9\u897F\u539F\u8ECA\u5EAB",
  "40053-01": "\u7B2C\u4E09\u4F4F\u5B85\u524D",
  "40053-02": "\u7B2C\u4E09\u4F4F\u5B85\u524D",
  "40054-01": "\u3051\u3084\u304D\u91CE\u4F4F\u5B85\u524D",
  "40054-02": "\u3051\u3084\u304D\u91CE\u4F4F\u5B85\u524D",
  "40055-01": "\u30A4\u30AA\u30F3\u30E2\u30FC\u30EB\u6771\u4E45\u7559\u7C73\u5357",
  "40055-02": "\u30A4\u30AA\u30F3\u30E2\u30FC\u30EB\u6771\u4E45\u7559\u7C73\u5357",
  "40056-00": "\u5357\u6CA2\u4E94\u4E01\u76EE",
  "40056-01": "\u5357\u6CA2\u4E94\u4E01\u76EE",
  "40056-02-15": "\u5357\u6CA2\u4E94\u4E01\u76EE",
  "40057-01": "\u30A4\u30AA\u30F3\u30E2\u30FC\u30EB\u6771\u4E45\u7559\u7C73",
  "40057-02": "\u30A4\u30AA\u30F3\u30E2\u30FC\u30EB\u6771\u4E45\u7559\u7C73",
  "40057-07-15": "\u30A4\u30AA\u30F3\u30E2\u30FC\u30EB\u6771\u4E45\u7559\u7C73",
  "40058-01-07": "\u5357\u6CA2\u56DB\u4E01\u76EE",
  "40058-02": "\u5357\u6CA2\u56DB\u4E01\u76EE",
  "40059-01-07": "\u6771\u4EAC\u9053",
  "40059-02": "\u6771\u4EAC\u9053",
  "40060-01": "\u5357\u6CA2",
  "40060-02": "\u5357\u6CA2",
  "40061-01": "\u3072\u3070\u308A\u304C\u4E18\u56E3\u5730\u5317\u53E3",
  "40061-02": "\u3072\u3070\u308A\u304C\u4E18\u56E3\u5730\u5317\u53E3",
  "40062-01": "\u4EA4\u756A\u524D",
  "40062-02": "\u4EA4\u756A\u524D",
  "40063-01": "\u3072\u3070\u308A\u304C\u4E18\u56E3\u5730",
  "40063-02": "\u3072\u3070\u308A\u304C\u4E18\u56E3\u5730",
  "40066-01": "\u4E2D\u539F\u5C0F\u5B66\u6821",
  "40066-02": "\u4E2D\u539F\u5C0F\u5B66\u6821",
  "40066-03": "\u4E2D\u539F\u5C0F\u5B66\u6821",
  "40066-04": "\u4E2D\u539F\u5C0F\u5B66\u6821",
  "40067-01": "\u3072\u3070\u308A\u304C\u4E18\u4E8C\u4E01\u76EE",
  "40067-02": "\u3072\u3070\u308A\u304C\u4E18\u4E8C\u4E01\u76EE",
  "40068-01": "\u3072\u3070\u308A\u304C\u4E18\u4E00\u4E01\u76EE",
  "40069-01-03": "\u3072\u3070\u308A\u30F6\u4E18\u99C5\u5165\u53E3",
  "40069-02": "\u3072\u3070\u308A\u30F6\u4E18\u99C5\u5165\u53E3",
  "40071-01": "\u3072\u3070\u308A\u30F6\u4E18\u99C5",
  "40071-02-04": "\u3072\u3070\u308A\u30F6\u4E18\u99C5",
  "40071-03": "\u3072\u3070\u308A\u30F6\u4E18\u99C5",
  "40071-15": "\u3072\u3070\u308A\u30F6\u4E18\u99C5",
  "40077-01": "\u7530\u7121\u99C5\u5165\u53E3",
  "40077-02": "\u7530\u7121\u99C5\u5165\u53E3",
  "40078-01": "\u7530\u7121\u8B66\u5BDF\u7F72\u524D",
  "40078-02": "\u7530\u7121\u8B66\u5BDF\u7F72\u524D",
  "40079-01": "\u4E0A\u5BBF",
  "40079-02": "\u4E0A\u5BBF",
  "40081-01": "\u6A4B\u5834",
  "40081-02": "\u6A4B\u5834",
  "40082-01": "\u829D\u4E45\u4FDD\u56DB\u4E01\u76EE",
  "40082-02": "\u829D\u4E45\u4FDD\u56DB\u4E01\u76EE",
  "40083-01": "\u5317\u829D\u4E45\u4FDD",
  "40083-02": "\u5317\u829D\u4E45\u4FDD",
  "40084-01": "\u79D1\u5B66\u9928\u5357\u5165\u53E3",
  "40084-02": "\u79D1\u5B66\u9928\u5357\u5165\u53E3",
  "40085-01": "\u829D\u4E45\u4FDD",
  "40085-02": "\u829D\u4E45\u4FDD",
  "45007-01": "\u30AC\u30FC\u30C9\u4E0B",
  "45007-02": "\u30AC\u30FC\u30C9\u4E0B",
  "45008-01": "\u7530\u7121\u753A\u4E8C\u4E01\u76EE",
  "45008-02": "\u7530\u7121\u753A\u4E8C\u4E01\u76EE",
  "45008-03": "\u7530\u7121\u753A\u4E8C\u4E01\u76EE",
  "45008-04": "\u7530\u7121\u753A\u4E8C\u4E01\u76EE",
  "45040-01": "\u8C37\u6238\u30A4\u30C1\u30E7\u30A6\u516C\u5712",
  "45040-02": "\u8C37\u6238\u30A4\u30C1\u30E7\u30A6\u516C\u5712",
  "60001-00-15": "\u6B66\u8535\u5C0F\u91D1\u4E95\u99C5",
  "60001-01": "\u6B66\u8535\u5C0F\u91D1\u4E95\u99C5",
  "60001-02": "\u6B66\u8535\u5C0F\u91D1\u4E95\u99C5",
  "60001-03": "\u6B66\u8535\u5C0F\u91D1\u4E95\u99C5",
  "60006-01": "\u672C\u753A\u4E8C\u4E01\u76EE\uFF08\u5C0F\u91D1\u4E95\u5E02\uFF09",
  "60006-02-04-06": "\u672C\u753A\u4E8C\u4E01\u76EE\uFF08\u5C0F\u91D1\u4E95\u5E02\uFF09",
  "60007-01": "\u672C\u753A\u56DB\u4E01\u76EE",
  "60007-02-04-06": "\u672C\u753A\u56DB\u4E01\u76EE",
  "60008-01": "\u685C\u753A\u75C5\u9662",
  "60008-02-04-06": "\u685C\u753A\u75C5\u9662",
  "60009-01": "\u5C0F\u91D1\u4E95\u6A4B",
  "60009-02-04-06": "\u5C0F\u91D1\u4E95\u6A4B",
  "60010-01": "\u5C0F\u91D1\u4E95\u516C\u5712\u897F\u53E3",
  "60010-02": "\u5C0F\u91D1\u4E95\u516C\u5712\u897F\u53E3",
  "60010-04": "\u5C0F\u91D1\u4E95\u516C\u5712\u897F\u53E3",
  "60012-01": "\u65E5\u751F\u4F4F\u5B85",
  "60012-02": "\u65E5\u751F\u4F4F\u5B85",
  "60012-04": "\u65E5\u751F\u4F4F\u5B85",
  "60013-01": "\u5C0F\u91D1\u4E95\u516C\u5712\u5317",
  "60013-02": "\u5C0F\u91D1\u4E95\u516C\u5712\u5317",
  "60013-04": "\u5C0F\u91D1\u4E95\u516C\u5712\u5317",
  "60014-01": "\u5609\u60A6\u5927\u5B66\u5165\u53E3",
  "60014-02-04": "\u5609\u60A6\u5927\u5B66\u5165\u53E3",
  "60014-03": "\u5609\u60A6\u5927\u5B66\u5165\u53E3",
  "60014-06": "\u5609\u60A6\u5927\u5B66\u5165\u53E3",
  "60015-01": "\u5357\u82B1\u5C0F\u91D1\u4E95",
  "60015-02-04-06": "\u5357\u82B1\u5C0F\u91D1\u4E95",
  "60016-01": "\u5357\u753A\u4E00\u4E01\u76EE",
  "60017-01": "\u82B1\u5C0F\u91D1\u4E95\u99C5",
  "60017-02": "\u82B1\u5C0F\u91D1\u4E95\u99C5",
  "60017-15": "\u82B1\u5C0F\u91D1\u4E95\u99C5",
  "60018-01-03": "\u5C0F\u5E73\u5408\u540C\u5E81\u820E",
  "60018-02": "\u5C0F\u5E73\u5408\u540C\u5E81\u820E",
  "60020-00-15": "\u82B1\u5C0F\u91D1\u4E95\u99C5\u5357\u53E3",
  "60020-01": "\u82B1\u5C0F\u91D1\u4E95\u99C5\u5357\u53E3",
  "60021-03": "\u82B1\u5C0F\u91D1\u4E95\u99C5\u5165\u53E3",
  "60021-04-06": "\u82B1\u5C0F\u91D1\u4E95\u99C5\u5165\u53E3",
  "60021-05": "\u82B1\u5C0F\u91D1\u4E95\u99C5\u5165\u53E3",
  "60022-01-05": "\u9752\u6885\u8857\u9053",
  "60022-02-06": "\u9752\u6885\u8857\u9053",
  "60022-03": "\u9752\u6885\u8857\u9053",
  "60022-04": "\u9752\u6885\u8857\u9053",
  "60023-01": "\u82B1\u5C0F\u91D1\u4E95\u4E94\u4E01\u76EE",
  "60023-02-05": "\u82B1\u5C0F\u91D1\u4E95\u4E94\u4E01\u76EE",
  "60023-03": "\u82B1\u5C0F\u91D1\u4E95\u4E94\u4E01\u76EE",
  "60024-01": "\u65B0\u9752\u6885\u8857\u9053",
  "60024-02-05": "\u65B0\u9752\u6885\u8857\u9053",
  "60025-01": "\u30B0\u30ED\u30FC\u30D6\u30E9\u30A4\u30C9\u672C\u793E\u5165\u53E3",
  "60025-02": "\u30B0\u30ED\u30FC\u30D6\u30E9\u30A4\u30C9\u672C\u793E\u5165\u53E3",
  "60025-05": "\u30B0\u30ED\u30FC\u30D6\u30E9\u30A4\u30C9\u672C\u793E\u5165\u53E3",
  "60026-01": "\u5FA1\u6210\u6A4B",
  "60026-02": "\u5FA1\u6210\u6A4B",
  "60027-01": "\u795E\u660E\u793E",
  "60027-02": "\u795E\u660E\u793E",
  "60033-01": "\u5C0F\u897F\uFF08\u5C0F\u5E73\u5E02\uFF09",
  "60033-02": "\u5C0F\u897F\uFF08\u5C0F\u5E73\u5E02\uFF09",
  "60034-01": "\u662D\u548C\u75C5\u9662\u5317\u5165\u53E3",
  "60034-02": "\u662D\u548C\u75C5\u9662\u5317\u5165\u53E3",
  "60035-01": "\u5927\u6CBC\u753A\u4E8C\u4E01\u76EE",
  "60035-02": "\u5927\u6CBC\u753A\u4E8C\u4E01\u76EE",
  "60036-01": "\u9326\u57CE\u9AD8\u6821\u524D",
  "60036-02": "\u9326\u57CE\u9AD8\u6821\u524D",
  "60037-01": "\u30AC\u30B9\u30DF\u30E5\u30FC\u30B8\u30A2\u30E0\u5165\u53E3",
  "60037-02": "\u30AC\u30B9\u30DF\u30E5\u30FC\u30B8\u30A2\u30E0\u5165\u53E3",
  "60038-01": "\u6EDD\u5C71\u56E3\u5730\u4E2D\u592E",
  "60038-02": "\u6EDD\u5C71\u56E3\u5730\u4E2D\u592E",
  "60041-01-06": "\u6EDD\u5C71\u56E3\u5730\u5165\u53E3",
  "60041-02-03-05": "\u6EDD\u5C71\u56E3\u5730\u5165\u53E3",
  "60042-01-06": "\u6EDD\u5C71\u4E09\u4E01\u76EE",
  "60042-02": "\u6EDD\u5C71\u4E09\u4E01\u76EE",
  "60042-03-05": "\u6EDD\u5C71\u4E09\u4E01\u76EE",
  "60043-01-06": "\u56E3\u5730\u30BB\u30F3\u30BF\u30FC\uFF08\u6771\u4E45\u7559\u7C73\u5E02\uFF09",
  "60043-02": "\u56E3\u5730\u30BB\u30F3\u30BF\u30FC\uFF08\u6771\u4E45\u7559\u7C73\u5E02\uFF09",
  "60043-03-05": "\u56E3\u5730\u30BB\u30F3\u30BF\u30FC\uFF08\u6771\u4E45\u7559\u7C73\u5E02\uFF09",
  "60044-01": "\u6EDD\u5C71\u4E94\u4E01\u76EE",
  "60044-02": "\u6EDD\u5C71\u4E94\u4E01\u76EE",
  "60044-03": "\u6EDD\u5C71\u4E94\u4E01\u76EE",
  "60044-05": "\u6EDD\u5C71\u4E94\u4E01\u76EE",
  "60044-06": "\u6EDD\u5C71\u4E94\u4E01\u76EE",
  "60044-10": "\u6EDD\u5C71\u4E94\u4E01\u76EE",
  "60045-01-06-15": "\u6EDD\u5C71\u56E3\u5730",
  "60045-02": "\u6EDD\u5C71\u56E3\u5730",
  "60045-03": "\u6EDD\u5C71\u56E3\u5730",
  "60045-05": "\u6EDD\u5C71\u56E3\u5730",
  "60045-10": "\u6EDD\u5C71\u56E3\u5730",
  "60046-01": "\u6EDD\u5C71\u55B6\u696D\u6240",
  "60046-02-03-05": "\u6EDD\u5C71\u55B6\u696D\u6240",
  "60046-15": "\u6EDD\u5C71\u55B6\u696D\u6240",
  "60047-01": "\u767D\u5C71\u516C\u5712",
  "60047-02": "\u767D\u5C71\u516C\u5712",
  "60048-01": "\u4E0B\u91CC\u4E09\u4E01\u76EE",
  "60048-02": "\u4E0B\u91CC\u4E09\u4E01\u76EE",
  "60049-01": "\u897F\u56E3\u5730\u5165\u53E3",
  "60049-02-05": "\u897F\u56E3\u5730\u5165\u53E3",
  "60049-03-04": "\u897F\u56E3\u5730\u5165\u53E3",
  "60050-01": "\u4E45\u7559\u7C73\u897F\u56E3\u5730",
  "60050-02": "\u4E45\u7559\u7C73\u897F\u56E3\u5730",
  "60050-03": "\u4E45\u7559\u7C73\u897F\u56E3\u5730",
  "60050-05": "\u4E45\u7559\u7C73\u897F\u56E3\u5730",
  "60050-15": "\u4E45\u7559\u7C73\u897F\u56E3\u5730",
  "60056-01": "\u6EDD\u5C71\u56E3\u5730\u897F",
  "60056-02": "\u6EDD\u5C71\u56E3\u5730\u897F",
  "60057-01": "\u67F3\u7AAA\u4E00\u4E01\u76EE",
  "60057-02": "\u67F3\u7AAA\u4E00\u4E01\u76EE",
  "60061-01": "\u67F3\u6CC9\u5712\u30B0\u30E9\u30F3\u30C9\u5165\u53E3",
  "60061-02": "\u67F3\u6CC9\u5712\u30B0\u30E9\u30F3\u30C9\u5165\u53E3",
  "60062-01": "\u4E0B\u91CC\u516D\u4E01\u76EE",
  "60062-02": "\u4E0B\u91CC\u516D\u4E01\u76EE",
  "60063-01": "\u4E0B\u91CC\u56E3\u5730",
  "60063-02": "\u4E0B\u91CC\u56E3\u5730",
  "60063-15": "\u4E0B\u91CC\u56E3\u5730",
  "60064-01": "\u4E09\u89D2\u5C71",
  "60064-02": "\u4E09\u89D2\u5C71",
  "60066-01": "\u62BC\u51FA\u3057\u6A4B",
  "60066-02": "\u62BC\u51FA\u3057\u6A4B",
  "60067-01": "\u7AF9\u4E18\u5357\u56E3\u5730",
  "60067-02": "\u7AF9\u4E18\u5357\u56E3\u5730",
  "60068-01": "\u7AF9\u4E18\u56E3\u5730",
  "60068-02": "\u7AF9\u4E18\u56E3\u5730",
  "60069-01": "\u793E\u4F1A\u4E8B\u696D\u5927\u5B66\u524D",
  "60069-02": "\u793E\u4F1A\u4E8B\u696D\u5927\u5B66\u524D",
  "60071-01": "\u6C37\u5DDD\u795E\u793E",
  "60071-02": "\u6C37\u5DDD\u795E\u793E",
  "60072-01": "\u90FD\u5927\u6A4B",
  "60072-02": "\u90FD\u5927\u6A4B",
  "60073-01": "\u4E45\u7559\u7C73\u897F\u9AD8\u5165\u53E3",
  "60073-02": "\u4E45\u7559\u7C73\u897F\u9AD8\u5165\u53E3",
  "60074-01": "\u516B\u5E61\u753A\u4E00\u4E01\u76EE",
  "60074-02": "\u516B\u5E61\u753A\u4E00\u4E01\u76EE",
  "60075-01": "\u3055\u3044\u308F\u3044\u798F\u7949\u30BB\u30F3\u30BF\u30FC",
  "60075-02-07": "\u3055\u3044\u308F\u3044\u798F\u7949\u30BB\u30F3\u30BF\u30FC",
  "60076-01": "\u5E78\u753A\u4E09\u4E01\u76EE\uFF08\u6771\u4E45\u7559\u7C73\u5E02\uFF09",
  "60076-02-07": "\u5E78\u753A\u4E09\u4E01\u76EE\uFF08\u6771\u4E45\u7559\u7C73\u5E02\uFF09",
  "60077-01": "\u4E2D\u592E\u56F3\u66F8\u9928\uFF08\u6771\u4E45\u7559\u7C73\uFF09",
  "60077-02-07": "\u4E2D\u592E\u56F3\u66F8\u9928\uFF08\u6771\u4E45\u7559\u7C73\uFF09",
  "60078-01": "\u4E2D\u592E\u753A\u4E00\u4E01\u76EE",
  "60078-02": "\u4E2D\u592E\u753A\u4E00\u4E01\u76EE",
  "60078-07": "\u4E2D\u592E\u753A\u4E00\u4E01\u76EE",
  "60079-01-07": "\u6771\u4E45\u7559\u7C73\u5E02\u5F79\u6240",
  "60079-02-08": "\u6771\u4E45\u7559\u7C73\u5E02\u5F79\u6240",
  "60081-01": "\u30BB\u30F3\u30BF\u30FC\u5317",
  "60081-02": "\u30BB\u30F3\u30BF\u30FC\u5317",
  "60082-01": "\u6771\u4E45\u7559\u7C73\u7B2C\u4E03\u5C0F\u5B66\u6821",
  "60082-02": "\u6771\u4E45\u7559\u7C73\u7B2C\u4E03\u5C0F\u5B66\u6821",
  "60083-01": "\u6EDD\u5C71\u4E03\u4E01\u76EE",
  "60083-02": "\u6EDD\u5C71\u4E03\u4E01\u76EE",
  "60084-01": "\u6771\u4E45\u7559\u7C73\u897F\u4E2D\u5B66\u6821\u5317",
  "60084-02": "\u6771\u4E45\u7559\u7C73\u897F\u4E2D\u5B66\u6821\u5317",
  "60085-01": "\u516B\u5E61\u753A\u4E09\u4E01\u76EE",
  "60085-02": "\u516B\u5E61\u753A\u4E09\u4E01\u76EE",
  "60087-01-07": "\u5357\u753A\u56DB\u4E01\u76EE",
  "60087-02": "\u5357\u753A\u56DB\u4E01\u76EE",
  "60091-01": "\u524D\u6CA2\u4F4F\u5B85",
  "60091-02": "\u524D\u6CA2\u4F4F\u5B85",
  "60092-01": "\u524D\u6CA2\u56DB\u4E01\u76EE",
  "60092-02": "\u524D\u6CA2\u56DB\u4E01\u76EE",
  "60093-01": "\u524D\u6CA2\u5341\u5B57\u8DEF",
  "60093-02": "\u524D\u6CA2\u5341\u5B57\u8DEF",
  "60093-03": "\u524D\u6CA2\u5341\u5B57\u8DEF",
  "60093-07": "\u524D\u6CA2\u5341\u5B57\u8DEF",
  "60094-01": "\u524D\u6CA2\u5BBF",
  "60094-02-07": "\u524D\u6CA2\u5BBF",
  "60096-01": "\u4E2D\u592E\u56F3\u66F8\u9928\u5165\u53E3\uFF08\u6771\u4E45\u7559\u7C73\uFF09",
  "60096-02": "\u4E2D\u592E\u56F3\u66F8\u9928\u5165\u53E3\uFF08\u6771\u4E45\u7559\u7C73\uFF09",
  "60097-01": "\u6771\u4E45\u7559\u7C73\u7B2C\u4E09\u5C0F\u5B66\u6821",
  "60097-02": "\u6771\u4E45\u7559\u7C73\u7B2C\u4E09\u5C0F\u5B66\u6821",
  "60098-01": "\u6771\u4E45\u7559\u7C73\u90F5\u4FBF\u5C40",
  "60098-02": "\u6771\u4E45\u7559\u7C73\u90F5\u4FBF\u5C40",
  "60099-01": "\u672C\u753A\u4E09\u4E01\u76EE",
  "60099-02-07": "\u672C\u753A\u4E09\u4E01\u76EE",
  "60101-01": "\u6771\u4E45\u7559\u7C73\u99C5\u897F\u53E3",
  "60101-02": "\u6771\u4E45\u7559\u7C73\u99C5\u897F\u53E3",
  "60101-07": "\u6771\u4E45\u7559\u7C73\u99C5\u897F\u53E3",
  "60101-15": "\u6771\u4E45\u7559\u7C73\u99C5\u897F\u53E3",
  "60106-01": "\u6771\u90A6\u904B\u8F38\u524D",
  "60106-02-07": "\u6771\u90A6\u904B\u8F38\u524D",
  "60107-01": "\u6771\u4E45\u7559\u7C73\u7DCF\u5408\u9AD8\u6821",
  "60107-02": "\u6771\u4E45\u7559\u7C73\u7DCF\u5408\u9AD8\u6821",
  "60108-01": "\u5C0F\u5C71\u5150\u7AE5\u5B66\u5712",
  "60108-02": "\u5C0F\u5C71\u5150\u7AE5\u5B66\u5712",
  "60109-01": "\u30B7\u30EB\u30D0\u30FC\u4EBA\u6750\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "60109-02": "\u30B7\u30EB\u30D0\u30FC\u4EBA\u6750\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "60110-01": "\u4FDD\u80B2\u5712\u5165\u53E3",
  "60110-02": "\u4FDD\u80B2\u5712\u5165\u53E3",
  "60111-01": "\u677E\u5C71\u4E8C\u4E01\u76EE",
  "60111-02": "\u677E\u5C71\u4E8C\u4E01\u76EE",
  "60111-03": "\u677E\u5C71\u4E8C\u4E01\u76EE",
  "60111-07": "\u677E\u5C71\u4E8C\u4E01\u76EE",
  "60112-01": "\u6E05\u702C\u99C5\u5357\u53E3",
  "60112-02-05": "\u6E05\u702C\u99C5\u5357\u53E3",
  "60112-15": "\u6E05\u702C\u99C5\u5357\u53E3",
  "60116-01": "\u677E\u5C71",
  "60116-02-03": "\u677E\u5C71",
  "60117-01": "\u8907\u5341\u5B57\u75C5\u9662",
  "60117-02-03": "\u8907\u5341\u5B57\u75C5\u9662",
  "60118-01": "\u6885\u5712",
  "60118-02-03": "\u6885\u5712",
  "60121-01": "\u6771\u4EAC\u75C5\u9662\u5317",
  "60121-02": "\u6771\u4EAC\u75C5\u9662\u5317",
  "60121-03": "\u6771\u4EAC\u75C5\u9662\u5317",
  "60144-00": "\u5929\u795E\u5C71",
  "60144-03": "\u5929\u795E\u5C71",
  "60144-04": "\u5929\u795E\u5C71",
  "60177-01": "\u6771\u4EAC\u75C5\u9662\u7384\u95A2\u524D",
  "60177-02": "\u6771\u4EAC\u75C5\u9662\u7384\u95A2\u524D",
  "60200-01": "\u524D\u6CA2\u4E8C\u4E01\u76EE",
  "60200-02": "\u524D\u6CA2\u4E8C\u4E01\u76EE",
  "60201-01": "\u524D\u6CA2\u4E00\u4E01\u76EE",
  "60201-02": "\u524D\u6CA2\u4E00\u4E01\u76EE",
  "60202-07": "\u591A\u805E\u5BFA\u5165\u53E3",
  "60203-07": "\u7B20\u677E\u5742",
  "65009-01": "\u5F25\u751F\u53F0",
  "65009-02": "\u5F25\u751F\u53F0",
  "65010-01": "\u82B1\u5C0F\u91D1\u4E95\u56DB\u4E01\u76EE",
  "65010-02": "\u82B1\u5C0F\u91D1\u4E95\u56DB\u4E01\u76EE",
  "65031-02-15": "\u3072\u3070\u308A\u304C\u4E18\u56E3\u5730\u4E2D\u592E",
  "70002-01": "\u5FA1\u5E78\u753A\u897F",
  "70002-02": "\u5FA1\u5E78\u753A\u897F",
  "70003-00": "\u56FD\u969B\u96FB\u6C17\u524D",
  "70003-01": "\u56FD\u969B\u96FB\u6C17\u524D",
  "70003-02": "\u56FD\u969B\u96FB\u6C17\u524D",
  "70004-01": "\u56DE\u7530\u672C\u901A\u308A",
  "70004-02": "\u56DE\u7530\u672C\u901A\u308A",
  "70005-01": "\u56DE\u7530\u753A",
  "70005-02": "\u56DE\u7530\u753A",
  "70011-01": "\u82B1\u5C0F\u91D1\u4E95\u897F\u56E3\u5730",
  "70011-02": "\u82B1\u5C0F\u91D1\u4E95\u897F\u56E3\u5730",
  "70012-01": "\u82E5\u8449\u4F4F\u5B85",
  "70012-02": "\u82E5\u8449\u4F4F\u5B85",
  "70013-01": "\u5C0F\u5E73\u4E09\u4E2D\u5165\u53E3",
  "70013-02": "\u5C0F\u5E73\u4E09\u4E2D\u5165\u53E3",
  "70016-01": "\u5B98\u820E\u524D",
  "70016-02": "\u5B98\u820E\u524D",
  "70017-01": "\u9234\u6728\u753A\u4E00\u4E01\u76EE",
  "70017-02": "\u9234\u6728\u753A\u4E00\u4E01\u76EE",
  "70018-01": "\u6771\u9580",
  "70018-02": "\u6771\u9580",
  "70019-01": "\u56E3\u5730\u6771",
  "70019-02": "\u56E3\u5730\u6771",
  "70021-01": "\u4E94\u9593\u901A\u308A",
  "70021-02": "\u4E94\u9593\u901A\u308A",
  "70021-03": "\u4E94\u9593\u901A\u308A",
  "70021-04": "\u4E94\u9593\u901A\u308A",
  "70022-01": "\u5B66\u5712\u6771\u753A",
  "70022-02": "\u5B66\u5712\u6771\u753A",
  "70023-01": "\u5C0F\u5E73\u7B2C\u4E8C\u5C0F\u5B66\u6821\u524D",
  "70023-02": "\u5C0F\u5E73\u7B2C\u4E8C\u5C0F\u5B66\u6821\u524D",
  "70031-01": "\u82B1\u5C0F\u91D1\u4E95\u516D\u4E01\u76EE",
  "70031-02": "\u82B1\u5C0F\u91D1\u4E95\u516D\u4E01\u76EE",
  "70032-01": "\u662D\u548C\u75C5\u9662",
  "70032-02": "\u662D\u548C\u75C5\u9662",
  "70033-01": "\u5929\u795E\u753A\u4E8C\u4E01\u76EE",
  "70033-02": "\u5929\u795E\u753A\u4E8C\u4E01\u76EE",
  "70034-01": "\u5929\u795E\u753A\u4E00\u4E01\u76EE",
  "70034-02": "\u5929\u795E\u753A\u4E00\u4E01\u76EE",
  "70035-01": "\u718A\u91CE\u5BAE\u524D",
  "70035-02": "\u718A\u91CE\u5BAE\u524D",
  "70036-01-04": "\u5C0F\u5E73\u99C5\u5165\u53E3",
  "70036-02": "\u5C0F\u5E73\u99C5\u5165\u53E3",
  "70036-03": "\u5C0F\u5E73\u99C5\u5165\u53E3",
  "70037-01": "\u4EF2\u753A\uFF08\u5C0F\u5E73\u5E02\uFF09",
  "70037-02-03": "\u4EF2\u753A\uFF08\u5C0F\u5E73\u5E02\uFF09",
  "70038-00-15": "\u5C0F\u5E73\u99C5\u5357\u53E3",
  "70038-01": "\u5C0F\u5E73\u99C5\u5357\u53E3",
  "70038-02-03": "\u5C0F\u5E73\u99C5\u5357\u53E3",
  "70041-01": "\u306A\u304B\u307E\u3061\u30C6\u30E9\u30B9",
  "70041-02": "\u306A\u304B\u307E\u3061\u30C6\u30E9\u30B9",
  "70042-01": "\u5C0F\u5E73\u6D88\u9632\u7F72",
  "70042-02": "\u5C0F\u5E73\u6D88\u9632\u7F72",
  "70043-01": "\u9752\u6885\u8857\u9053\u99C5",
  "70043-02": "\u9752\u6885\u8857\u9053\u99C5",
  "70043-03": "\u9752\u6885\u8857\u9053\u99C5",
  "70043-04": "\u9752\u6885\u8857\u9053\u99C5",
  "70044-01": "\u5C0F\u5E73\u5E02\u5F79\u6240",
  "70044-02": "\u5C0F\u5E73\u5E02\u5F79\u6240",
  "70046-01": "\u8B66\u5BDF\u5B66\u6821\u88CF",
  "70046-02": "\u8B66\u5BDF\u5B66\u6821\u88CF",
  "70047-01": "\u6771\u753A\uFF08\u5C0F\u5E73\u5E02\uFF09",
  "70047-02": "\u6771\u753A\uFF08\u5C0F\u5E73\u5E02\uFF09",
  "70051-01": "\u5B66\u5712\u897F\u753A",
  "70052-02": "\u5C0F\u5E73\u4E2D\u592E\u516C\u6C11\u9928",
  "70052-03": "\u5C0F\u5E73\u4E2D\u592E\u516C\u6C11\u9928",
  "70053-01": "\u5C0F\u5E73\u5546\u5DE5\u4F1A\u9928",
  "70053-02": "\u5C0F\u5E73\u5546\u5DE5\u4F1A\u9928",
  "70054-01-04": "\u5C71\u738B\u4F4F\u5B85",
  "70054-02": "\u5C71\u738B\u4F4F\u5B85",
  "70054-03": "\u5C71\u738B\u4F4F\u5B85",
  "70054-06": "\u5C71\u738B\u4F4F\u5B85",
  "70055-01": "\u6D25\u7530\u753A\u4E09\u4E01\u76EE",
  "70055-02": "\u6D25\u7530\u753A\u4E09\u4E01\u76EE",
  "70056-01": "\u677E\u30F6\u4E18\u4F4F\u5B85\u5165\u53E3",
  "70056-02": "\u677E\u30F6\u4E18\u4F4F\u5B85\u5165\u53E3",
  "70057-01": "\u4E00\u6A4B\u5927\u5B66\u88CF",
  "70057-02": "\u4E00\u6A4B\u5927\u5B66\u88CF",
  "70058-01": "\u5B66\u5712\u897F\u753A\u5730\u57DF\u30BB\u30F3\u30BF\u30FC\u524D",
  "70058-02": "\u5B66\u5712\u897F\u753A\u5730\u57DF\u30BB\u30F3\u30BF\u30FC\u524D",
  "70059-01": "\u897F\u753A",
  "70059-02": "\u897F\u753A",
  "70060-01": "\u4E00\u6A4B\u5B66\u5712\u99C5",
  "70060-02": "\u4E00\u6A4B\u5B66\u5712\u99C5",
  "70060-03-15": "\u4E00\u6A4B\u5B66\u5712\u99C5",
  "70060-04": "\u4E00\u6A4B\u5B66\u5712\u99C5",
  "70061-02": "\u4E00\u6A4B\u5927\u5B66\u524D",
  "70062-01": "\u4E00\u6A4B\u75C5\u9662",
  "70062-02": "\u4E00\u6A4B\u75C5\u9662",
  "70063-01": "\u685C\u5824",
  "70063-02": "\u685C\u5824",
  "70064-01-02-15": "\u30EB\u30CD\u30B5\u30B9\u6B66\u8535",
  "70065-01": "\u4F4F\u5B85\u524D\uFF08\u56FD\u5206\u5BFA\u5E02\uFF09",
  "70065-02": "\u4F4F\u5B85\u524D\uFF08\u56FD\u5206\u5BFA\u5E02\uFF09",
  "70066-01": "\u7B2C\u4E09\u5C0F\u5B66\u6821\uFF08\u56FD\u5206\u5BFA\u5E02\uFF09",
  "70066-02": "\u7B2C\u4E09\u5C0F\u5B66\u6821\uFF08\u56FD\u5206\u5BFA\u5E02\uFF09",
  "70066-03": "\u7B2C\u4E09\u5C0F\u5B66\u6821\uFF08\u56FD\u5206\u5BFA\u5E02\uFF09",
  "70066-04": "\u7B2C\u4E09\u5C0F\u5B66\u6821\uFF08\u56FD\u5206\u5BFA\u5E02\uFF09",
  "70071-01-15": "\u56FD\u5206\u5BFA\u99C5\u5317\u5165\u53E3",
  "70072-01": "\u3051\u3084\u304D\u516C\u5712\u524D",
  "70072-02": "\u3051\u3084\u304D\u516C\u5712\u524D",
  "70073-01": "\u5411\u30F6\u4E18",
  "70073-02": "\u5411\u30F6\u4E18",
  "70074-01": "\u5317\u306E\u539F\u4F4F\u5B85",
  "70074-02": "\u5317\u306E\u539F\u4F4F\u5B85",
  "70075-01": "\u6771\u604B\u30F6\u7AAA",
  "70075-02": "\u6771\u604B\u30F6\u7AAA",
  "70076-01": "\u6771\u6238\u5009\u4E00\u4E01\u76EE",
  "70076-02": "\u6771\u6238\u5009\u4E00\u4E01\u76EE",
  "70077-01": "\u4E8C\u30C4\u585A",
  "70077-02": "\u4E8C\u30C4\u585A",
  "70078-01": "\u65ED\u30F6\u4E18\u4F4F\u5B85",
  "70078-02": "\u65ED\u30F6\u4E18\u4F4F\u5B85",
  "70079-01": "\u6D25\u7530\u587E\u5927\u5B66",
  "70079-02": "\u6D25\u7530\u587E\u5927\u5B66",
  "70080-01": "\u9DF9\u306E\u8857\u9053\u5916",
  "70080-02": "\u9DF9\u306E\u8857\u9053\u5916",
  "70080-03": "\u9DF9\u306E\u8857\u9053\u5916",
  "70080-04": "\u9DF9\u306E\u8857\u9053\u5916",
  "70081-01": "\u9DF9\u306E\u53F0\u99C5\u5165\u53E3",
  "70081-02": "\u9DF9\u306E\u53F0\u99C5\u5165\u53E3",
  "70082-01": "\u6C34\u8ECA\u901A\u308A",
  "70082-02": "\u6C34\u8ECA\u901A\u308A",
  "70083-01": "\u5275\u4FA1\u5B66\u5712\u524D",
  "70083-02": "\u5275\u4FA1\u5B66\u5712\u524D",
  "70084-01": "\u767D\u6885\u5B66\u5712\u524D",
  "70084-02": "\u767D\u6885\u5B66\u5712\u524D",
  "70085-01": "\u671D\u9BAE\u5927\u5B66\u6821",
  "70085-02": "\u671D\u9BAE\u5927\u5B66\u6821",
  "70086-01": "\u6B66\u8535\u91CE\u7F8E\u8853\u5927\u5B66\u6B63\u9580",
  "70086-02": "\u6B66\u8535\u91CE\u7F8E\u8853\u5927\u5B66\u6B63\u9580",
  "70090-01-15": "\u65B0\u5C0F\u5E73\u99C5",
  "70090-02": "\u65B0\u5C0F\u5E73\u99C5",
  "70091-01": "\u5C0F\u5DDD\u753A\u4E8C\u4E01\u76EE",
  "70091-02": "\u5C0F\u5DDD\u753A\u4E8C\u4E01\u76EE",
  "70092-01": "\u5C0F\u5E73\u4E00\u5C0F\u524D",
  "70092-02": "\u5C0F\u5E73\u4E00\u5C0F\u524D",
  "70093-01": "\u5C0F\u5DDD\u753A\u4E00\u4E01\u76EE",
  "70093-02": "\u5C0F\u5DDD\u753A\u4E00\u4E01\u76EE",
  "70094-01": "\u4E2D\u5BBF",
  "70094-02": "\u4E2D\u5BBF",
  "70095-01": "\u5C0F\u5DDD\u5BFA\u524D",
  "70095-02": "\u5C0F\u5DDD\u5BFA\u524D",
  "70096-01": "\u5C0F\u5DDD\u4E09\u53C9\u8DEF",
  "70096-02": "\u5C0F\u5DDD\u4E09\u53C9\u8DEF",
  "70097-01-03": "\u516C\u4F1A\u5802\u524D",
  "70097-02": "\u516C\u4F1A\u5802\u524D",
  "70098-00": "\u5C0F\u5E73\u55B6\u696D\u6240",
  "70098-01-03": "\u5C0F\u5E73\u55B6\u696D\u6240",
  "70098-02": "\u5C0F\u5E73\u55B6\u696D\u6240",
  "70098-15": "\u5C0F\u5E73\u55B6\u696D\u6240",
  "70099-01-03": "\u6771\u5C0F\u5DDD\u6A4B",
  "70099-02": "\u6771\u5C0F\u5DDD\u6A4B",
  "70100-01": "\u4E0A\u6C34\u672C\u753A\u4E94\u4E01\u76EE",
  "70100-02": "\u4E0A\u6C34\u672C\u753A\u4E94\u4E01\u76EE",
  "70101-01": "\u4E45\u7C73\u5DDD\u99C5",
  "70101-02": "\u4E45\u7C73\u5DDD\u99C5",
  "70101-15": "\u4E45\u7C73\u5DDD\u99C5",
  "70103-01": "\u4E45\u7C73\u5DDD\u901A\u308A",
  "70103-02": "\u4E45\u7C73\u5DDD\u901A\u308A",
  "70104-01": "\u4E45\u7C73\u5DDD\u56E3\u5730\u5165\u53E3",
  "70104-02": "\u4E45\u7C73\u5DDD\u56E3\u5730\u5165\u53E3",
  "70106-01": "\u516B\u5742\u99C5\u524D",
  "70106-02": "\u516B\u5742\u99C5\u524D",
  "70107-01": "\u5BCC\u58EB\u898B\u6587\u5316\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "70107-02": "\u5BCC\u58EB\u898B\u6587\u5316\u30BB\u30F3\u30BF\u30FC\u5165\u53E3",
  "70108-01": "\u5FB3\u5CF6\u8A3A\u7642\u6240\u524D",
  "70108-02": "\u5FB3\u5CF6\u8A3A\u7642\u6240\u524D",
  "70109-01": "\u5408\u540C\u5BBF\u820E\u524D",
  "70109-02": "\u5408\u540C\u5BBF\u820E\u524D",
  "70110-01": "\u660E\u6CD5\u5B66\u9662\u524D",
  "70110-02": "\u660E\u6CD5\u5B66\u9662\u524D",
  "70111-01": "\u4E07\u5BFF\u5712",
  "70111-02": "\u4E07\u5BFF\u5712",
  "70112-01": "\u6E05\u539F\u4E2D\u592E\u516C\u5712",
  "70112-02": "\u6E05\u539F\u4E2D\u592E\u516C\u5712",
  "70113-01-15": "\u6771\u4EAC\u8857\u9053\u56E3\u5730",
  "70113-02": "\u6771\u4EAC\u8857\u9053\u56E3\u5730",
  "70114-01": "\u56E3\u5730\u5317",
  "70114-02": "\u56E3\u5730\u5317",
  "70115-01": "\u56E3\u5730\u5357\uFF08\u6771\u5927\u548C\u5E02\uFF09",
  "70115-02": "\u56E3\u5730\u5357\uFF08\u6771\u5927\u548C\u5E02\uFF09",
  "70116-01": "\u5927\u548C\u7B2C\u4E09\u5C0F\u5B66\u6821",
  "70116-02": "\u5927\u548C\u7B2C\u4E09\u5C0F\u5B66\u6821",
  "70117-01": "\u65B0\u5800",
  "70117-02": "\u65B0\u5800",
  "70118-01": "\u5411\u539F\u56DB\u4E01\u76EE",
  "70119-01": "\u6885\u306E\u539F\u4F4F\u5B85",
  "70119-02": "\u6885\u306E\u539F\u4F4F\u5B85",
  "70120-01": "\u5411\u539F\u516D\u4E01\u76EE",
  "70120-02": "\u5411\u539F\u516D\u4E01\u76EE",
  "70131-01": "\u7ACB\u5DDD\u99C5\u5317\u53E3",
  "70131-03": "\u7ACB\u5DDD\u99C5\u5317\u53E3",
  "70131-05-09": "\u7ACB\u5DDD\u99C5\u5317\u53E3",
  "70131-06": "\u7ACB\u5DDD\u99C5\u5317\u53E3",
  "70131-07": "\u7ACB\u5DDD\u99C5\u5317\u53E3",
  "70131-08": "\u7ACB\u5DDD\u99C5\u5317\u53E3",
  "70131-15": "\u7ACB\u5DDD\u99C5\u5317\u53E3",
  "70141-00-15": "\u7ACB\u5DDD\u99C5\u5357\u53E3",
  "70141-01": "\u7ACB\u5DDD\u99C5\u5357\u53E3",
  "70141-02": "\u7ACB\u5DDD\u99C5\u5357\u53E3",
  "70146-01": "\u90FD\u7ACB\u885B\u751F\u7814\u7A76\u6240",
  "70146-02": "\u90FD\u7ACB\u885B\u751F\u7814\u7A76\u6240",
  "70147-01": "\u67F4\u5D0E\u753A\u4E09\u4E01\u76EE",
  "70147-02": "\u67F4\u5D0E\u753A\u4E09\u4E01\u76EE",
  "70148-01": "\u67F4\u5D0E\u753A\u516D\u4E01\u76EE",
  "70148-02": "\u67F4\u5D0E\u753A\u516D\u4E01\u76EE",
  "70149-01": "\u7434\u5E2F\u6A4B",
  "70149-02": "\u7434\u5E2F\u6A4B",
  "70150-01": "\u798F\u7949\u4F1A\u9928\u524D",
  "70150-02": "\u798F\u7949\u4F1A\u9928\u524D",
  "70151-01": "\u5BCC\u58EB\u898B\u753A\u4E03\u4E01\u76EE",
  "70151-02": "\u5BCC\u58EB\u898B\u753A\u4E03\u4E01\u76EE",
  "70152-01": "\u5BCC\u58EB\u898B\u753A\u56E3\u5730",
  "70152-02": "\u5BCC\u58EB\u898B\u753A\u56E3\u5730",
  "70153-01": "\u56E3\u5730\u897F\uFF08\u662D\u5CF6\u5E02\uFF09",
  "70153-02": "\u56E3\u5730\u897F\uFF08\u662D\u5CF6\u5E02\uFF09",
  "70154-01": "\u662D\u5CF6\u56E3\u5730",
  "70154-02": "\u662D\u5CF6\u56E3\u5730",
  "70155-01": "\u65B0\u9053\u798F\u5CF6",
  "70155-15": "\u65B0\u9053\u798F\u5CF6",
  "70157-01": "\u4FDD\u80B2\u6240\u524D",
  "70157-02": "\u4FDD\u80B2\u6240\u524D",
  "70158-01": "\u67F4\u5D0E\u753A\u4E00\u4E01\u76EE",
  "70158-02": "\u67F4\u5D0E\u753A\u4E00\u4E01\u76EE",
  "70159-01": "\u5BCC\u58EB\u898B\u753A\u4E94\u4E01\u76EE",
  "70159-02": "\u5BCC\u58EB\u898B\u753A\u4E94\u4E01\u76EE",
  "70160-01": "\u6EDD\u306E\u4E0A\u4F1A\u9928\u5165\u53E3",
  "70160-02": "\u6EDD\u306E\u4E0A\u4F1A\u9928\u5165\u53E3",
  "70161-01": "\u5BCC\u58EB\u898B\u753A\u56DB\u4E01\u76EE",
  "70161-02": "\u5BCC\u58EB\u898B\u753A\u56DB\u4E01\u76EE",
  "70162-01": "\u5BCC\u58EB\u898B\u753A\u4E09\u4E01\u76EE\uFF08\u7ACB\u5DDD\u5E02\uFF09",
  "70162-02": "\u5BCC\u58EB\u898B\u753A\u4E09\u4E01\u76EE\uFF08\u7ACB\u5DDD\u5E02\uFF09",
  "70163-01": "\u8FB2\u696D\u8A66\u9A13\u5834\u524D",
  "70163-02": "\u8FB2\u696D\u8A66\u9A13\u5834\u524D",
  "70164-01": "\u5E38\u697D\u9662\u5165\u53E3",
  "70164-02": "\u5E38\u697D\u9662\u5165\u53E3",
  "70166-01": "\u897F\u90F7\u5730",
  "70166-02": "\u897F\u90F7\u5730",
  "70167-01": "\u6771\u753A\u56DB\u4E01\u76EE",
  "70167-02": "\u6771\u753A\u56DB\u4E01\u76EE",
  "70168-01": "\u897F\u7ACB\u5DDD",
  "70168-02": "\u897F\u7ACB\u5DDD",
  "70169-01": "\u5BCC\u58EB\u898B\u753A\u4E00\u4E01\u76EE",
  "70169-02": "\u5BCC\u58EB\u898B\u753A\u4E00\u4E01\u76EE",
  "70170-01": "\u5BCC\u58EB\u898B\u753A",
  "70170-02": "\u5BCC\u58EB\u898B\u753A",
  "70171-01": "\u5BCC\u58EB\u898B\u753A\u4E8C\u4E01\u76EE",
  "70171-02": "\u5BCC\u58EB\u898B\u753A\u4E8C\u4E01\u76EE",
  "70172-01": "\u66D9\u753A\u4E00\u4E01\u76EE",
  "70172-02": "\u66D9\u753A\u4E00\u4E01\u76EE",
  "70173-02": "\u30D7\u30E9\u30B6\u30B7\u30C6\u30A3\u7ACB\u5DDD",
  "70174-01": "\u7ACB\u5DDD\u9280\u5EA7",
  "70176-01-03-04-05": "\u9AD8\u677E\u753A\u4E09\u4E01\u76EE",
  "70176-02": "\u9AD8\u677E\u753A\u4E09\u4E01\u76EE",
  "70177-01-03-04-05": "\u9AD8\u677E\u753A\u4E8C\u4E01\u76EE",
  "70177-02": "\u9AD8\u677E\u753A\u4E8C\u4E01\u76EE",
  "70178-00-15": "\u897F\u6B66\u30D0\u30B9\u7ACB\u5DDD\u55B6\u696D\u6240",
  "70178-01-03-04-05-06": "\u897F\u6B66\u30D0\u30B9\u7ACB\u5DDD\u55B6\u696D\u6240",
  "70178-02": "\u897F\u6B66\u30D0\u30B9\u7ACB\u5DDD\u55B6\u696D\u6240",
  "70179-01-03-04-05": "\u6804\u753A\u4E09\u4E01\u76EE",
  "70179-02": "\u6804\u753A\u4E09\u4E01\u76EE",
  "70180-01-05-06-07": "\u6804\u753A\u4E8C\u4E01\u76EE",
  "70180-02": "\u6804\u753A\u4E8C\u4E01\u76EE",
  "70181-01": "\u662D\u548C\u7B2C\u4E00\u5B66\u5712\u897F\u9580",
  "70181-02-15": "\u662D\u548C\u7B2C\u4E00\u5B66\u5712\u897F\u9580",
  "70182-01": "\u516C\u793E\u4F4F\u5B85",
  "70182-02": "\u516C\u793E\u4F4F\u5B85",
  "70183-01": "\u4E2D\u7802\u4FDD\u80B2\u6240\u524D",
  "70183-02": "\u4E2D\u7802\u4FDD\u80B2\u6240\u524D",
  "70184-01": "\u7ACB\u5DDD\u516B\u5C0F",
  "70184-02": "\u7ACB\u5DDD\u516B\u5C0F",
  "70191-01-03-05": "\u662D\u548C\u7B2C\u4E00\u5B66\u5712",
  "70191-02": "\u662D\u548C\u7B2C\u4E00\u5B66\u5712",
  "70192-01-03-05": "\u6771\u6804\u4F1A",
  "70192-02": "\u6771\u6804\u4F1A",
  "70193-01-03-05": "\u698E\u6238\u5F01\u5929",
  "70193-02": "\u698E\u6238\u5F01\u5929",
  "70194-01-03-05": "\u5E78\u753A\u4E09\u4E01\u76EE\uFF08\u7ACB\u5DDD\u5E02\uFF09",
  "70194-02": "\u5E78\u753A\u4E09\u4E01\u76EE\uFF08\u7ACB\u5DDD\u5E02\uFF09",
  "70195-01": "\u7802\u5DDD\u4E5D\u756A",
  "70195-02": "\u7802\u5DDD\u4E5D\u756A",
  "70195-03": "\u7802\u5DDD\u4E5D\u756A",
  "70195-04": "\u7802\u5DDD\u4E5D\u756A",
  "70195-05-06": "\u7802\u5DDD\u4E5D\u756A",
  "70196-01": "\u5E78\u753A\u56DB\u4E01\u76EE",
  "70196-02": "\u5E78\u753A\u56DB\u4E01\u76EE",
  "70197-01": "\u5E78\u753A\u56E3\u5730",
  "70197-15": "\u5E78\u753A\u56E3\u5730",
  "70198-01": "\u7802\u5DDD\u516B\u756A",
  "70198-02": "\u7802\u5DDD\u516B\u756A",
  "70199-01": "\u53E4\u6C11\u5BB6\u5712\u6771",
  "70199-02": "\u53E4\u6C11\u5BB6\u5712\u6771",
  "70201-01-05": "\u30B9\u30DE\u30A4\u30EB\u30BF\u30A6\u30F3\u524D",
  "70201-02": "\u30B9\u30DE\u30A4\u30EB\u30BF\u30A6\u30F3\u524D",
  "70201-03": "\u30B9\u30DE\u30A4\u30EB\u30BF\u30A6\u30F3\u524D",
  "70202-01-03-05": "\u5C0F\u5DDD\u6A4B",
  "70202-02": "\u5C0F\u5DDD\u6A4B",
  "70203-01-03-04": "\u4E2D\u5CF6\u753A",
  "70203-02": "\u4E2D\u5CF6\u753A",
  "70204-01-03-04-15": "\u90FD\u7ACB\u85AC\u7528\u690D\u7269\u5712\u524D",
  "70204-02": "\u90FD\u7ACB\u85AC\u7528\u690D\u7269\u5712\u524D",
  "70206-00": "\u6771\u5927\u548C\u5E02\u99C5",
  "70206-01": "\u6771\u5927\u548C\u5E02\u99C5",
  "70206-02": "\u6771\u5927\u548C\u5E02\u99C5",
  "70206-03": "\u6771\u5927\u548C\u5E02\u99C5",
  "70206-04": "\u6771\u5927\u548C\u5E02\u99C5",
  "70206-05": "\u6771\u5927\u548C\u5E02\u99C5",
  "70206-06": "\u6771\u5927\u548C\u5E02\u99C5",
  "70206-15": "\u6771\u5927\u548C\u5E02\u99C5",
  "70207-01": "\u5C0F\u5DDD\u4E00\u756A",
  "70207-02": "\u5C0F\u5DDD\u4E00\u756A",
  "70208-01": "\u5C0F\u5DDD\u753A\u4E00\u4E01\u76EE\u30A2\u30D1\u30FC\u30C8\u524D",
  "70208-02": "\u5C0F\u5DDD\u753A\u4E00\u4E01\u76EE\u30A2\u30D1\u30FC\u30C8\u524D",
  "70211-01-02": "\u5357\u8857\u901A\u308A",
  "70211-03": "\u5357\u8857\u901A\u308A",
  "70212-01": "\u5357\u8857\u5165\u53E3",
  "70212-02": "\u5357\u8857\u5165\u53E3",
  "70212-03": "\u5357\u8857\u5165\u53E3",
  "70213-01": "\u30AC\u30B9\u96FB\u901A\u308A",
  "70213-02": "\u30AC\u30B9\u96FB\u901A\u308A",
  "70214-01": "\u65B0\u8857\u9053",
  "70214-02": "\u65B0\u8857\u9053",
  "70216-01": "\u5927\u548C\u7B2C\u4E8C\u5C0F\u5B66\u6821",
  "70216-02": "\u5927\u548C\u7B2C\u4E8C\u5C0F\u5B66\u6821",
  "70217-01": "\u672B\u5E83\u516C\u5712\u5165\u53E3",
  "70217-02": "\u672B\u5E83\u516C\u5712\u5165\u53E3",
  "70218-01-02": "\u5357\u8857",
  "70218-15": "\u5357\u8857",
  "70231-01": "\u6771\u5927\u548C\u30B0\u30EA\u30FC\u30F3\u30BF\u30A6\u30F3",
  "70231-02": "\u6771\u5927\u548C\u30B0\u30EA\u30FC\u30F3\u30BF\u30A6\u30F3",
  "70232-01": "\u3044\u3061\u3087\u3046\u901A\u308A\uFF08\u6771\u5927\u548C\u5E02\uFF09",
  "70232-02": "\u3044\u3061\u3087\u3046\u901A\u308A\uFF08\u6771\u5927\u548C\u5E02\uFF09",
  "70233-01": "\u6771\u5927\u548C\u9AD8\u6821",
  "70233-02": "\u6771\u5927\u548C\u9AD8\u6821",
  "70236-01": "\u5948\u826F\u6A4B\u516D\u4E01\u76EE",
  "70236-02": "\u5948\u826F\u6A4B\u516D\u4E01\u76EE",
  "70237-02": "\u829D\u4E2D\u56E3\u5730",
  "70237-15": "\u829D\u4E2D\u56E3\u5730",
  "70242-01": "\u4E2D\u592E\u4E8C\u4E01\u76EE",
  "70242-02": "\u4E2D\u592E\u4E8C\u4E01\u76EE",
  "70243-01": "\u6771\u5927\u548C\u5E02\u5F79\u6240\u5165\u53E3",
  "70243-02-03": "\u6771\u5927\u548C\u5E02\u5F79\u6240\u5165\u53E3",
  "70244-03": "\u5E9A\u7533\u585A\uFF08\u6771\u5927\u548C\u5E02\uFF09",
  "70244-04": "\u5E9A\u7533\u585A\uFF08\u6771\u5927\u548C\u5E02\uFF09",
  "70246-01-03": "\u6771\u5927\u548C\u4E00\u5C0F\u5357",
  "70246-02": "\u6771\u5927\u548C\u4E00\u5C0F\u5357",
  "70247-01-03": "\u5948\u826F\u6A4B",
  "70247-02": "\u5948\u826F\u6A4B",
  "70247-16": "\u5948\u826F\u6A4B",
  "70251-01": "\u5869\u91DC\u795E\u793E\u524D",
  "70251-02": "\u5869\u91DC\u795E\u793E\u524D",
  "70252-01": "\u9AD8\u6728\u4E8C\u4E01\u76EE",
  "70252-02": "\u9AD8\u6728\u4E8C\u4E01\u76EE",
  "70253-01": "\u72ED\u5C71\u4E09\u4E01\u76EE",
  "70253-02": "\u72ED\u5C71\u4E09\u4E01\u76EE",
  "70254-01": "\u8CAF\u6C34\u6C60\u5165\u53E3",
  "70254-02": "\u8CAF\u6C34\u6C60\u5165\u53E3",
  "70255-01": "\u6B66\u8535\u5927\u548C",
  "70255-02": "\u6B66\u8535\u5927\u548C",
  "70256-01": "\u5EFB\u7530\u753A\u4E09\u4E01\u76EE",
  "70256-02": "\u5EFB\u7530\u753A\u4E09\u4E01\u76EE",
  "70257-01": "\u91D1\u5C71\u795E\u793E\u524D",
  "70257-02": "\u91D1\u5C71\u795E\u793E\u524D",
  "70258-01": "\u5EFB\u7530",
  "70258-02": "\u5EFB\u7530",
  "70259-01": "\u6B63\u798F\u5BFA",
  "70259-02": "\u6B63\u798F\u5BFA",
  "70260-01": "\u6771\u6751\u5C71\u99C5\u897F\u53E3",
  "70260-15": "\u6771\u6751\u5C71\u99C5\u897F\u53E3",
  "70266-01-04": "\u516B\u5E61\u795E\u793E",
  "70266-03": "\u516B\u5E61\u795E\u793E",
  "70267-01-03": "\u8535\u6577",
  "70267-02": "\u8535\u6577",
  "70268-01-03": "\u828B\u7AAA",
  "70268-02": "\u828B\u7AAA",
  "70271-01": "\u8CAF\u6C34\u6C60\u4E0B",
  "70271-02": "\u8CAF\u6C34\u6C60\u4E0B",
  "70272-01": "\u5927\u6A4B",
  "70272-02": "\u5927\u6A4B",
  "70273-01": "\u4E2D\u85E4",
  "70273-02": "\u4E2D\u85E4",
  "70274-01": "\u4E09\u30C4\u6A4B",
  "70274-02": "\u4E09\u30C4\u6A4B",
  "70275-01": "\u795E\u660E\u4E8C\u4E01\u76EE",
  "70275-02": "\u795E\u660E\u4E8C\u4E01\u76EE",
  "70276-01": "\u539F\u5C71",
  "70276-02": "\u539F\u5C71",
  "70277-01": "\u6B66\u8535\u6751\u5C71\u5E02\u5F79\u6240\u524D",
  "70277-02": "\u6B66\u8535\u6751\u5C71\u5E02\u5F79\u6240\u524D",
  "70378-01": "\u4E2D\u4E45\u4FDD\u5730\u57DF\u904B\u52D5\u5834\u524D",
  "70378-02": "\u4E2D\u4E45\u4FDD\u5730\u57DF\u904B\u52D5\u5834\u524D",
  "70379-01": "\u4E09\u30C4\u85E4\u4F4F\u5B85\u6771",
  "70379-02": "\u4E09\u30C4\u85E4\u4F4F\u5B85\u6771",
  "70380-00-01": "\u30A4\u30AA\u30F3\u30E2\u30FC\u30EB\u3080\u3055\u3057\u6751\u5C71",
  "70777-01": "\u85AC\u5E2B\u5802\u524D",
  "70777-02": "\u85AC\u5E2B\u5802\u524D",
  "70778-01": "\u6771\u5927\u548C\u75C5\u9662",
  "70778-02": "\u6771\u5927\u548C\u75C5\u9662",
  "70779-02": "\u5C0F\u5E73\u8B66\u5BDF\u7F72",
  "75011-01": "\u8CAB\u4E95\u6A4B",
  "75011-02": "\u8CAB\u4E95\u6A4B",
  "75012-01": "\u5C0F\u5E73\u56E3\u5730\u4E2D\u592E",
  "75012-02": "\u5C0F\u5E73\u56E3\u5730\u4E2D\u592E",
  "75013-01": "\u9234\u306E\u6728\u53F0",
  "75013-02": "\u9234\u306E\u6728\u53F0",
  "75014-01": "\u5171\u6E08\u4F4F\u5B85\u524D",
  "75014-02": "\u5171\u6E08\u4F4F\u5B85\u524D",
  "75060-01-15": "\u6B66\u8535\u91CE\u7F8E\u8853\u5927\u5B66",
  "75061-01": "\u5C0F\u5E73\u7B2C\u5341\u4E8C\u5C0F\u5B66\u6821",
  "75177-01": "\u56FD\u5206\u5BFA\u99C5\u5317\u53E3",
  "75177-15": "\u56FD\u5206\u5BFA\u99C5\u5317\u53E3",
  "800001-00-01-03-05-15": "\u8EFD\u4E95\u6CA2\u99C5",
  "800001-04": "\u8EFD\u4E95\u6CA2\u99C5",
  "800002-01-06": "\u65E7\u8EFD\u4E95\u6CA2",
  "800002-02-03-05": "\u65E7\u8EFD\u4E95\u6CA2",
  "800003-00-01-02-04-15": "\u4E2D\u8EFD\u4E95\u6CA2\u99C5",
  "800004-01": "\u661F\u91CE\u6E29\u6CC9\u30C8\u30F3\u30DC\u306E\u6E6F",
  "800004-02-15": "\u661F\u91CE\u6E29\u6CC9\u30C8\u30F3\u30DC\u306E\u6E6F",
  "800005-01": "\u8EFD\u4E95\u6CA2\u5343\u30F6\u6EDD\u6E29\u6CC9",
  "800005-02": "\u8EFD\u4E95\u6CA2\u5343\u30F6\u6EDD\u6E29\u6CC9",
  "800006-00-02": "\u897F\u6B66\u8EFD\u4E95\u6CA2\u55B6\u696D\u6240",
  "800006-01": "\u897F\u6B66\u8EFD\u4E95\u6CA2\u55B6\u696D\u6240",
  "800007-01": "\u8429\u30F6\u4E18\u5165\u53E3",
  "800007-02": "\u8429\u30F6\u4E18\u5165\u53E3",
  "800008-01": "\u5CF0\u306E\u8336\u5C4B",
  "800008-02": "\u5CF0\u306E\u8336\u5C4B",
  "800009-00-01-02": "\u9B3C\u62BC\u51FA\u3057\u5712",
  "800010-01-06": "\u65B0\u9053",
  "800010-02-03-05": "\u65B0\u9053",
  "800011-01-06": "\u4E2D\u90E8\u96FB\u529B\u524D",
  "800011-02-03-05": "\u4E2D\u90E8\u96FB\u529B\u524D",
  "800012-01-06": "\u516D\u672C\u8FBB\u30FB\u96F2\u5834\u6C60",
  "800012-02-03-15": "\u516D\u672C\u8FBB\u30FB\u96F2\u5834\u6C60",
  "800013-01": "\u91CE\u6CA2\u539F",
  "800013-02-03": "\u91CE\u6CA2\u539F",
  "800014-00-02-03": "\u6771\u90E8\u5C0F\u5B66\u6821",
  "800014-01": "\u6771\u90E8\u5C0F\u5B66\u6821",
  "800015-01": "\u6CC9\u306E\u91CC",
  "800015-02-03": "\u6CC9\u306E\u91CC",
  "800016-01": "\u96E2\u5C71",
  "800016-02-03": "\u96E2\u5C71",
  "800017-01": "\u56F3\u66F8\u9928\u524D\uFF08\u8EFD\u4E95\u6CA2\u753A\uFF09",
  "800017-02-03": "\u56F3\u66F8\u9928\u524D\uFF08\u8EFD\u4E95\u6CA2\u753A\uFF09",
  "800018-01": "\u4E2D\u5B66\u6821\u524D",
  "800018-02-03": "\u4E2D\u5B66\u6821\u524D",
  "800019-01": "\u753A\u5F79\u5834\u75C5\u9662\u524D",
  "800019-02": "\u753A\u5F79\u5834\u75C5\u9662\u524D",
  "800020-01": "\u6587\u5316\u4F1A\u9928\u524D",
  "800020-02": "\u6587\u5316\u4F1A\u9928\u524D",
  "800021-01": "\u6E6F\u5DDD",
  "800021-02": "\u6E6F\u5DDD",
  "800022-01": "\u5343\u30F6\u6EDD\u6E29\u6CC9\u5165\u53E3",
  "800022-02": "\u5343\u30F6\u6EDD\u6E29\u6CC9\u5165\u53E3",
  "800023-01": "\u5343\u30F6\u6EDD\u5165\u53E3",
  "800023-02": "\u5343\u30F6\u6EDD\u5165\u53E3",
  "800024-01": "\u5C71\u306E\u624B\u5165\u53E3",
  "800024-02": "\u5C71\u306E\u624B\u5165\u53E3",
  "800025-01": "\u7DD1\u30F6\u4E18\uFF08\u8EFD\u4E95\u6CA2\u753A\uFF09",
  "800025-02": "\u7DD1\u30F6\u4E18\uFF08\u8EFD\u4E95\u6CA2\u753A\uFF09",
  "800026-01": "\u6771\u533A",
  "800026-02": "\u6771\u533A",
  "800027-01": "\u4E07\u5C71\u671B",
  "800027-02": "\u4E07\u5C71\u671B",
  "800028-01": "\u3064\u3064\u3058\u30F6\u539F",
  "800028-02": "\u3064\u3064\u3058\u30F6\u539F",
  "800029-01": "\u6D45\u9593\u5C71\u30AD\u30E3\u30F3\u30D7\u5834",
  "800029-02": "\u6D45\u9593\u5C71\u30AD\u30E3\u30F3\u30D7\u5834",
  "800031-00-01": "\u3059\u305A\u3089\u3093\u5742",
  "800031-02": "\u3059\u305A\u3089\u3093\u5742",
  "800032-01": "\u30D7\u30EA\u30F3\u30B9\u30E9\u30F3\u30C9",
  "800032-02": "\u30D7\u30EA\u30F3\u30B9\u30E9\u30F3\u30C9",
  "800033-01": "\u938C\u539F\u6E56\u5165\u53E3",
  "800033-02": "\u938C\u539F\u6E56\u5165\u53E3",
  "800034-01": "\u9752\u8449\u6E56\u5165\u53E3",
  "800034-02": "\u9752\u8449\u6E56\u5165\u53E3",
  "800035-01": "\u4E0A\u91CE\u539F\uFF08\u5B2C\u604B\u6751\uFF09",
  "800035-02": "\u4E0A\u91CE\u539F\uFF08\u5B2C\u604B\u6751\uFF09",
  "800036-01": "\u938C\u539F\u89B3\u97F3\u5802\u524D",
  "800036-02": "\u938C\u539F\u89B3\u97F3\u5802\u524D",
  "800037-01": "\u938C\u539F\u5165\u53E3",
  "800037-02": "\u938C\u539F\u5165\u53E3",
  "800038-01": "\u4E09\u539F",
  "800038-02": "\u4E09\u539F",
  "800039-00-02": "\u4E07\u5EA7\u30FB\u9E7F\u6CA2\u53E3\u99C5",
  "800039-01": "\u4E07\u5EA7\u30FB\u9E7F\u6CA2\u53E3\u99C5",
  "800040-01": "\u5869\u58FA\u4E0A",
  "800041-01": "\u65B0\u8EFD\u4E95\u6CA2",
  "800041-02-03": "\u65B0\u8EFD\u4E95\u6CA2",
  "800042-01": "\u6771\u90E8\u5C0F\u5B66\u6821\u5165\u53E3",
  "800042-02-03": "\u6771\u90E8\u5C0F\u5B66\u6821\u5165\u53E3",
  "800043-01": "\u9AD8\u6821\u524D",
  "800043-02-03": "\u9AD8\u6821\u524D",
  "800044-01": "\u4E0A\u5DDE\u4E09\u539F",
  "800044-02": "\u4E0A\u5DDE\u4E09\u539F",
  "800045-01": "\u6771\u4E09\u539F",
  "800045-02": "\u6771\u4E09\u539F",
  "800046-01": "\u5CA9\u4E95\u5802\uFF08\u5B2C\u604B\u6751\uFF09",
  "800046-02": "\u5CA9\u4E95\u5802\uFF08\u5B2C\u604B\u6751\uFF09",
  "800047-01": "\u4E0A\u306E\u5C71",
  "800047-02-04": "\u4E0A\u306E\u5C71",
  "800048-01": "\u5B2C\u604B\u9AD8\u539F",
  "800048-02-04": "\u5B2C\u604B\u9AD8\u539F",
  "800049-01": "\u5B2C\u604B\u30D7\u30EA\u30F3\u30B9\u30DB\u30C6\u30EB\u524D",
  "800049-02-04": "\u5B2C\u604B\u30D7\u30EA\u30F3\u30B9\u30DB\u30C6\u30EB\u524D",
  "800050-01": "\u5B2C\u604B\u7267\u5834\u3000\u611B\u59BB\u306E\u9418",
  "800050-02-04": "\u5B2C\u604B\u7267\u5834\u3000\u611B\u59BB\u306E\u9418",
  "800051-01": "\u5F01\u5929\u6A4B",
  "800051-02-04": "\u5F01\u5929\u6A4B",
  "800052-01": "\u4E07\u5EA7\u30D0\u30B9\u30BF\u30FC\u30DF\u30CA\u30EB",
  "800052-02-15": "\u4E07\u5EA7\u30D0\u30B9\u30BF\u30FC\u30DF\u30CA\u30EB",
  "800063-00-01": "\u8349\u6D25\u6E29\u6CC9",
  "800065-01": "\u6E6F\u7AAA",
  "800065-02": "\u6E6F\u7AAA",
  "800066-01": "\u4E0B\u77F3\u6D25",
  "800066-02": "\u4E0B\u77F3\u6D25",
  "800067-01": "\u77F3\u6D25",
  "800067-02": "\u77F3\u6D25",
  "800068-01": "\u4ED9\u4E4B\u5165",
  "800068-02": "\u4ED9\u4E4B\u5165",
  "800069-01": "\u4ED9\u4E4B\u5165\u56DB\u30C3\u89D2",
  "800069-02": "\u4ED9\u4E4B\u5165\u56DB\u30C3\u89D2",
  "800070-01": "\u7FBD\u6839\u5C3E\u5225\u8358\u5730\u5165\u53E3",
  "800070-02": "\u7FBD\u6839\u5C3E\u5225\u8358\u5730\u5165\u53E3",
  "800071-01": "\u82D7\u5703\u524D",
  "800071-02": "\u82D7\u5703\u524D",
  "800072-01": "\u8349\u6D25\u524D\u53E3",
  "800072-02": "\u8349\u6D25\u524D\u53E3",
  "800073-01": "\u4E2D\u539F\uFF08\u8349\u6D25\u753A\uFF09",
  "800073-02": "\u4E2D\u539F\uFF08\u8349\u6D25\u753A\uFF09",
  "800074-01": "\u8C37\u6240",
  "800074-02": "\u8C37\u6240",
  "800075-01": "\u904B\u52D5\u8336\u5C4B",
  "800075-02": "\u904B\u52D5\u8336\u5C4B",
  "800076-01": "\u767A\u5730\u5165\u53E3",
  "800076-02": "\u767A\u5730\u5165\u53E3",
  "800076-03": "\u767A\u5730\u5165\u53E3",
  "800076-04": "\u767A\u5730\u5165\u53E3",
  "800077-01": "\u5BCC\u30F6\u4E18\u5165\u53E3",
  "800077-02": "\u5BCC\u30F6\u4E18\u5165\u53E3",
  "800078-01": "\u5BCC\u30F6\u4E18",
  "800078-02": "\u5BCC\u30F6\u4E18",
  "800079-01": "\u4E0A\u30CE\u539F\uFF08\u8EFD\u4E95\u6CA2\u753A\uFF09",
  "800079-02": "\u4E0A\u30CE\u539F\uFF08\u8EFD\u4E95\u6CA2\u753A\uFF09",
  "800080-01": "\u5343\u30F6\u6EDD\u5225\u8358\u7BA1\u7406\u4E8B\u52D9\u6240\u524D",
  "800080-02": "\u5343\u30F6\u6EDD\u5225\u8358\u7BA1\u7406\u4E8B\u52D9\u6240\u524D",
  "800094-01": "\u9ED2\u6A4B",
  "800094-02": "\u9ED2\u6A4B",
  "800095-01": "\u7ACB\u6559\u5973\u5B66\u9662\u524D",
  "800095-02": "\u7ACB\u6559\u5973\u5B66\u9662\u524D",
  "800096-01": "\u6854\u6897\u30F6\u4E18",
  "800096-02": "\u6854\u6897\u30F6\u4E18",
  "800097-01": "\u82B9\u30F6\u6CA2",
  "800097-02": "\u82B9\u30F6\u6CA2",
  "800098-01": "\u5FCD\u30F6\u4E18",
  "800098-02": "\u5FCD\u30F6\u4E18",
  "800099-01": "\u5343\u5149\u7A32\u8377\u795E\u793E",
  "800099-02": "\u5343\u5149\u7A32\u8377\u795E\u793E",
  "800102-03": "\u5165\u5C71\u5CE0\u5165\u53E3",
  "800102-04": "\u5165\u5C71\u5CE0\u5165\u53E3",
  "800103-03": "\u6210\u6CA2",
  "800103-04": "\u6210\u6CA2",
  "800104-03": "\u67F3\u6A4B\uFF08\u8EFD\u4E95\u6CA2\u753A\uFF09",
  "800104-04": "\u67F3\u6A4B\uFF08\u8EFD\u4E95\u6CA2\u753A\uFF09",
  "800105-03": "\u5357\u8EFD\u4E95\u6CA2",
  "800105-04": "\u5357\u8EFD\u4E95\u6CA2",
  "800106-03": "\u8EFD\u4E95\u6CA2\uFF17\uFF12\u30B4\u30EB\u30D5",
  "800106-04": "\u8EFD\u4E95\u6CA2\uFF17\uFF12\u30B4\u30EB\u30D5",
  "800107-03": "\u99AC\u8D8A",
  "800107-04": "\u99AC\u8D8A",
  "800108-03": "\u62BC\u7ACB\u5C71\u4E0B",
  "800108-04": "\u62BC\u7ACB\u5C71\u4E0B",
  "800109-03": "\u6CBB\u5B89\u306E\u3044\u3057\u305A\u3048\u524D",
  "800109-04": "\u6CBB\u5B89\u306E\u3044\u3057\u305A\u3048\u524D",
  "800110-03": "\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5165\u53E3",
  "800110-04": "\u30CB\u30E5\u30FC\u30BF\u30A6\u30F3\u5165\u53E3",
  "800111-03": "\u99AC\u53D6",
  "800111-04": "\u99AC\u53D6",
  "800112-03": "\u4E0A\u767A\u5730",
  "800112-04": "\u4E0A\u767A\u5730",
  "800113-03": "\u767A\u5730\u6A4B",
  "800113-04": "\u767A\u5730\u6A4B",
  "800114-03": "\u4E0B\u767A\u5730",
  "800114-04": "\u4E0B\u767A\u5730",
  "800115-03": "\u4E0B\u767A\u5730\u5165\u53E3",
  "800115-04": "\u4E0B\u767A\u5730\u5165\u53E3",
  "800116-03": "\u5357\u4FDD\u80B2\u5712\u524D",
  "800116-04": "\u5357\u4FDD\u80B2\u5712\u524D",
  "800117-03": "\u5C0F\u5009\u306E\u91CC",
  "800117-04": "\u5C0F\u5009\u306E\u91CC",
  "800118-00-02-03": "\u98A8\u8D8A\u516C\u5712",
  "800119-03": "\u98A8\u8D8A\u56E3\u5730",
  "800119-04": "\u98A8\u8D8A\u56E3\u5730",
  "800120-03": "\u6749\u74DC\u5165\u53E3",
  "800120-04": "\u6749\u74DC\u5165\u53E3",
  "800121-03": "\u91DC\u306E\u6A4B",
  "800121-04": "\u91DC\u306E\u6A4B",
  "800122-03": "\u9CE5\u4E95\u539F\u897F",
  "800122-04": "\u9CE5\u4E95\u539F\u897F",
  "800123-03": "\u4E2D\u90E8\u5C0F\u5B66\u6821",
  "800123-04": "\u4E2D\u90E8\u5C0F\u5B66\u6821",
  "800124-03": "\u8EFD\u4E95\u6CA2\u75C5\u9662",
  "800126-03": "\u9CE5\u4E95\u539F\u56E3\u5730\u524D",
  "800126-04": "\u9CE5\u4E95\u539F\u56E3\u5730\u524D",
  "800127-03": "\uFF2A\uFF21\u8EFD\u4E95\u6CA2\u652F\u6240\u524D",
  "800127-04": "\uFF2A\uFF21\u8EFD\u4E95\u6CA2\u652F\u6240\u524D",
  "800130-03": "\u5869\u6CA2",
  "800130-04": "\u5869\u6CA2",
  "800131-03": "\u5869\u6CA2\u6E56",
  "800131-04": "\u5869\u6CA2\u6E56",
  "800132-01": "\u9AD8\u6821\u6771",
  "800133-01": "\u4E0B\u677E\u539F\u5165\u53E3",
  "800133-02": "\u4E0B\u677E\u539F\u5165\u53E3",
  "800134-01": "\u8EFD\u4E95\u6CA2\u7D75\u672C\u306E\u68EE\u7F8E\u8853\u9928\u30A8\u30EB\u30C4\u304A\u3082\u3061\u3083\u535A\u7269\u9928",
  "800134-02": "\u8EFD\u4E95\u6CA2\u7D75\u672C\u306E\u68EE\u7F8E\u8853\u9928\u30A8\u30EB\u30C4\u304A\u3082\u3061\u3083\u535A\u7269\u9928",
  "800147-01": "\u8EFD\u4E95\u6CA2\u767A\u5730\u5E02\u5EAD",
  "805033-03": "\u5357\u8EFD\u4E95\u6CA2\u4EA4\u5DEE\u70B9",
  "805033-04": "\u5357\u8EFD\u4E95\u6CA2\u4EA4\u5DEE\u70B9",
  "805064-01": "\u6771\u6025\u30CF\u30FC\u30F4\u30A7\u30B9\u30C8\u30AF\u30E9\u30D6\u8EFD\u4E95\u6CA2\uFF06\uFF36\uFF29\uFF21\uFF2C\uFF21",
  "805198-01": "\u307B\u3063\u3061\u4EA4\u6D41\u9928",
  "805203-01": "\u9ED2\u6801\u5FB9\u5B50\u30DF\u30E5\u30FC\u30B8\u30A2\u30E0"
};
var index_default = {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
    const url = new URL(request.url);
    if (url.pathname !== "/shinto11") {
      return new Response(JSON.stringify({ error: "Not Found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // --- キャッシュ処理の追加 ---
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    let response = await cache.match(cacheKey);

    // キャッシュが存在する場合はデコード処理を行わずに即返却 (CPU時間 ほぼ0ms)
    if (response) {
      return response;
    }

    try {
      const vehicleRes = await fetch(
        `https://api.odpt.org/api/v4/gtfs/realtime/SeibuBus_vehicle?acl:consumerKey=vbexkf3r92gxedqv81bnlr4ogta82oqu3ps60f35c5fww7aixzwilr6b2889c3qz`
      );
      const tripRes = await fetch(
        `https://api.odpt.org/api/v4/gtfs/realtime/SeibuBus_trip_update?acl:consumerKey=vbexkf3r92gxedqv81bnlr4ogta82oqu3ps60f35c5fww7aixzwilr6b2889c3qz`
      );
      if (!vehicleRes.ok || !tripRes.ok) {
        throw new Error("\u897F\u6B66\u30D0\u30B9API\u304B\u3089\u306E\u30C7\u30FC\u30BF\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F");
      }
      const vehicleBuffer = await vehicleRes.arrayBuffer();
      const vehicleFeed = import_gtfs_realtime_bindings.default.transit_realtime.FeedMessage.decode(
        new Uint8Array(vehicleBuffer)
      );
      const tripBuffer = await tripRes.arrayBuffer();
      const tripFeed = import_gtfs_realtime_bindings.default.transit_realtime.FeedMessage.decode(
        new Uint8Array(tripBuffer)
      );
      const resultData = {
        vehicles: vehicleFeed.entity,
        trips: tripFeed.entity,
        stopNameMap
      };

      // 15秒間キャッシュするヘッダーを設定
      response = new Response(JSON.stringify(resultData), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=15"
        }
      });

      // バックグラウンドでキャッシュに保存
      ctx.waitUntil(cache.put(cacheKey, response.clone()));

      return response;

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
};

export {
  index_default as default
};
/*! Bundled license information:

long/umd/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=index.js.map
