/*

==============================================================================================================================
 __    __                   ________                          ________                                                        
|  |  |  |                 |__    __|                   __   |   _____|                           _      __                   
|  |/\|  |  _____  ___        |  |     _____    _____  |  |  |  |____   __  __  ______   ______  | \_   |__|  _____   ______  
|        | /  _  \|   |___    |  |    /     \  /     \ |  |  |   ____| |  | | ||      \ |   ___| |   _| |  | /     \ |      \ 
|   /\   |/  ____/|  ___  |   |  |   |   o   ||   o   ||  |_ |  |      |  |_| ||   _   ||  |____ |  |___|  ||   o   ||   _   |
|__/  \__|\______/|_______|   |__|    \_____/  \_____/ |____||__|      |______||__| |__||_______|\_____/|__| \_____/ |__| |__|
==============================================================================================================================
2016/08/18 by DKZ https://davidkingzyb.github.io

*/

var wtf_document_cookie = '';

var wtf_cookies = {
    getItem: function(sKey) {
        return decodeURIComponent(wtf_document_cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
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
        wtf_document_cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function(sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) {
            return false;
        }
        wtf_document_cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function(sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(wtf_document_cookie);
    },
    keys: function() {
        var aKeys = wtf_document_cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
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
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.cmd === 'localStorageGet') {
        sendResponse({ 'value': localStorage.getItem(request.key) })
    }
    if (request.cmd === 'localStorageSet') {
        console.log('set localStorage',request.key,request.value);
        localStorage.setItem(request.key, request.value);
    }
    if (request.cmd === 'cookiesSet') {
        wtf_document_cookie=request.cookie_str;
        var keys=wtf_cookies.keys();
        for(var j=0;j<keys.length;j++){
            // console.log('set cookie',keys[j], wtf_cookies.getItem(keys[j]));
            chrome.cookies.set({
                'url':request.url,
                'name':keys[j],
                'value':encodeURI(wtf_cookies.getItem(keys[j])),
                'expirationDate': parseInt((new Date().valueOf() + 24 * 60 * 60 * 1000) / 1000),
            },function(cookie){
                console.log('set cookie',cookie);
            })
        }
    }
})