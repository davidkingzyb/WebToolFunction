/*

license:MIT

Copyright (c) 2016 DKZ

Permission is hereby granted, free of charge, to any person obtaining 
a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software 
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included 
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

==============================================================================================================================
 __    __                   ________                          ________                                                        
|  |  |  |                 |__    __|                   __   |   _____|                           _      __                   
|  |/\|  |  _____  ___        |  |     _____    _____  |  |  |  |____   __  __  ______   ______  | \_   |__|  _____   ______  
|        | /  _  \|   |___    |  |    /     \  /     \ |  |  |   ____| |  | | ||      \ |   ___| |   _| |  | /     \ |      \ 
|   /\   |/  ____/|  ___  |   |  |   |   o   ||   o   ||  |_ |  |      |  |_| ||   _   ||  |____ |  |___|  ||   o   ||   _   |
|__/  \__|\______/|_______|   |__|    \_____/  \_____/ |____||__|      |______||__| |__||_______|\_____/|__| \_____/ |__| |__|
==============================================================================================================================
2016/05/23 by DKZ https://davidkingzyb.github.io
github: https://github.com/davidkingzyb/WebToolFunction
*/
var wtf = (function() {
    function wtf() {}
    //ajax

    wtf.get = function(url, callback, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                var resp = xhr.responseText;
                try {
                    resp = JSON.parse(resp);
                } catch (e) {}
                callback(resp);
            } else {
                if (onerror) {
                    onerror(xhr);
                    onerror = null;
                }
            }
        }
        xhr.timeout = 200000;
        xhr.ontimeout = function() {
            if (onerror) {
                onerror(xhr);
                onerror = null;
            }
        }
        xhr.onerror = function() {
            if (onerror) {
                onerror(xhr);
                onerror = null;
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    };

    wtf.post = function(url, data, callback, onerror, content_type) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                var resp = xhr.responseText;
                try {
                    resp = JSON.parse(resp);
                } catch (e) {}
                callback(resp);
            } else {
                if (onerror) {
                    onerror(xhr);
                    onerror = null;
                }
            }
        }
        xhr.timeout = 200000;
        xhr.ontimeout = function() {
            if (onerror) {
                onerror(xhr);
                onerror = null;
            }
        }
        xhr.onerror = function() {
            if (onerror) {
                onerror(xhr);
                onerror = null;
            }
        }
        xhr.open('POST', url, true);
        if (content_type === 'json') {
            xhr.setRequestHeader("Content-type", "application/json");
        } else if (content_type === 'formdata') {
            // dont set header
            // xhr.setRequestHeader("Content-type", "multipart/form-data");
        } else {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        xhr.send(data);
    };

    wtf.reqStr = function(o) {
        var reqstr = '';
        for (var i in o) {
            reqstr += i + '=' + o[i] + '&'
        }
        reqstr = reqstr.slice(0, -1);
        return reqstr;
    };

    //html 
    wtf.wrapTag = function(tag, value, attr) {
        return '<' + tag + ' ' + attr + '>' + value + '</' + tag + '>';
    };
    wtf.htmlEscape = function(html) {
        return html.replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    wtf.urlQuery = function(name, url) {
        var url = url || window.location.search;
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    wtf.parseUrl = function(url) {
        var parser = document.createElement("a"),
            q = {},
            queries, key, value

        parser.href = url;
        queries = parser.search.replace(/^\?/, "").split("&");
        for (var i = 0; i < queries.length; i++) {
            var query = queries[i];
            key = query.split("=")[0]
            value = query.split("=")[1]
            q[key] = value
        }

        return {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            q: q,
            hash: parser.hash
        }
    }

    wtf.localStorage = function(name, value) {
        if (wtf.typeOf(value) === 'null') {
            localStorage.removeItem(name);
            return null;
        } else if (value) {
            var vobj = { 'd': value };
            localStorage.setItem(name, JSON.stringify(vobj));
            return value;
        } else {
            var vstr = localStorage.getItem(name);
            if (vstr) {
                var r = JSON.parse(vstr);
                return r.d;
            } else {
                return null;
            }
        }
    };
    wtf.sessionStorage = function(name, value) {
        if (wtf.typeOf(value) === 'null') {
            localStorage.removeItem(name);
            return null;
        } else if (value) {
            var vobj = { 'd': value };
            localStorage.setItem(name, JSON.stringify(vobj));
            return value;
        } else {
            var vstr = localStorage.getItem(name);
            if (vstr) {
                var r = JSON.parse(vstr);
                return r.d;
            } else {
                return null;
            }
        }
    };

    wtf.cookies = {
        getItem: function(sKey) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                return false;
            }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function(sKey, sPath, sDomain) {
            if (!sKey || !this.hasItem(sKey)) {
                return false;
            }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function(sKey) {
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function() {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
            return aKeys;
        },
        clear: function() {
            var keys = wtf.cookies.keys();
            for (var i in keys) {
                wtf.cookies.removeItem(keys[i]);
            }
            return true;
        }
    };
    wtf.$cookie = function(name, value, time) {
        if (value) {
            wtf.cookies.setItem(name, value, time);
            return wtf.cookies.getItem(name);
        } else {
            return wtf.cookies.getItem(name);
        }
    };
    //load
    wtf.loadScript = function(src, callback) {
        var scriptNode = document.createElement("script");
        scriptNode.type = "text/javascript";
        try {
            if (src) {
                scriptNode.src = src;
                scriptNode.onloadDone = false;
                scriptNode.onload = function() {
                    scriptNode.onloadDone = true;
                    if (callback) {
                        callback();
                    }
                };
                scriptNode.onreadystatechange = function() {
                    if ((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                        scriptNode.onloadDone = true;
                    }
                };
                document.getElementsByTagName('head')[0].appendChild(scriptNode);
            }
        } catch (e) {
            console.log('appendScript error: ', e);
        }
    };
    wtf.loadStyle = function(url) {
        try {
            document.createStyleSheet(url)
        } catch (e) {
            var cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = url;
            document.getElementsByTagName('head')[0].appendChild(cssLink);
        }
    };

    wtf.imgToBase64 = function(img, type) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var t = type || 'image/jpeg';
        var base64 = canvas.toDataURL(t);
        canvas = null;
        return base64;
    }

    //selector
    wtf.$$ = function(selector) {
        return document.querySelectorAll(selector);
    };
    wtf.$ = function(selector) {
        return document.querySelector(selector);
    };
    wtf.$id = function(id) {
        return document.getElementById(id);
    };
    wtf.$cls = function(cls) {
        return document.getElementsByClassName(cls);
    };
    wtf.$tag = function(tag) {
        return document.getElementsByTagName(tag);
    };

    //js
    var _wtfclasstype = {};
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e, i) {
        _wtfclasstype["[object " + e + "]"] = e.toLowerCase();
    });
    wtf.typeOf = function(obj) {
        if (obj == null) {
            return String(obj);
        }
        return typeof obj === "object" || typeof obj === "function" ?
            _wtfclasstype[_wtfclasstype.toString.call(obj)] || "object" :
            typeof obj;
    }

    wtf.ua = navigator.userAgent.toLowerCase();

    return wtf;
})();
