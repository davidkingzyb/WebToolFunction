//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   __    __                   ________                          ________                                                          //  
//  |  |  |  |                 |__    __|                   __   |   _____|                           _      __                     //  
//  |  |/\|  |  _____  ___        |  |     _____    _____  |  |  |  |____   __  __  ______   ______  | \_   |__|  _____   ______    //  
//  |        | /  _  \|   |___    |  |    /     \  /     \ |  |  |   ____| |  | | ||      \ |   ___| |   _| |  | /     \ |      \   //  
//  |   /\   |/  ____/|  ___  |   |  |   |   o   ||   o   ||  |_ |  |      |  |_| ||   _   ||  |____ |  |___|  ||   o   ||   _   |  //  
//  |__/  \__|\______/|_______|   |__|    \_____/  \_____/ |____||__|      |______||__| |__||_______|\_____/|__| \_____/ |__| |__|  //  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  2016/01/28 by DKZ https://davidkingzyb.github.io
var wtf = (function() {
    function wtf() {}
    //ajax

    wtf.get = function(url, callback, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var resp = xhr.responseText;
                callback(resp);
            } else {
                if (xhr.status != 0 && xhr.status != 200) {
                    var e = xhr.responseText;
                    console.log('wtf get fail ' + xhr.status);
                    onerror && onerror(e);
                }
            }
        };
        xhr.timeout = 20000;
        xhr.ontimeout = function(e) {
            var e = xhr.responseText;
            console.log('wtf get timeout')
            onerror && onerror(e);
        }
        xhr.open('GET', url, true);
        xhr.send();
    };

    wtf.post = function(url, data, callback, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var resp = xhr.responseText;
                callback(resp);
            } else {
                if (xhr.status != 0 && xhr.status != 200) {
                    var e = xhr.responseText;
                    console.log('wtf post fail ' + xhr.status);
                    onerror && onerror(e);
                }
            }
        };
        xhr.timeout = 20000;
        xhr.ontimeout = function(e) {
            var e = xhr.responseText;
            console.log('wtf post timeout')
            onerror && onerror(e);
        }
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    };

    wtf.reqstr = function(o) {
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
    wtf.$urlquery = function(name,url) {
        var url=url||window.location.search;
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };
    wtf.$localStorage = function(name, value) {
        if (value) {
            localStorage.setItem(name, value);
            return localStorage.getItem(name);
        } else {
            if (localStorage.getItem(name)) {
                return localStorage.getItem(name);
            } else {
                return null;
            }
        }
    };
    wtf.$sessionStorage = function(name, value) {
        if (value) {
            sessionStorage.setItem(name, value);
            return sessionStorage.getItem(name);
        } else {
            if (sessionStorage.getItem(name)) {
                return sessionStorage.getItem(name);
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
                return false; }
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
                return false; }
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
        clear:function(){
            var keys=wtf.cookies.keys();
            for(var i in keys){
                wtf.cookies.removeItem(keys[i]);
            }
            return true;
        }
    };
    wtf.$cookie = function(name,value,time) {
        if(value){
            wtf.cookies.setItem(name,value,time);
            return wtf.cookies.getItem(name);
        }else{
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
    }
    return wtf;
})();