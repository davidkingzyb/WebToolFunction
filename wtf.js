//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   __    __                   ________                          ________                                                          //  
//  |  |  |  |                 |__    __|                   __   |   _____|                           _      __                     //  
//  |  |/\|  |  _____  ___        |  |     _____    _____  |  |  |  |____   __  __  ______   ______  | \_   |__|  _____   ______    //  
//  |        | /  _  \|   |___    |  |    /     \  /     \ |  |  |   ____| |  | | ||      \ |   ___| |   _| |  | /     \ |      \   //  
//  |   /\   |/  ____/|  ___  |   |  |   |   o   ||   o   ||  |_ |  |      |  |_| ||   _   ||  |____ |  |___|  ||   o   ||   _   |  //  
//  |__/  \__|\______/|_______|   |__|    \_____/  \_____/ |____||__|      |______||__| |__||_______|\_____/|__| \_____/ |__| |__|  //  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  2016/01/28 by DKZ https://davidkingzyb.github.io
var wtf = (function () {
    function wtf() {
    }
    //ajax
    wtf.get = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var resp = xhr.responseText;
                callback(resp);
            }else if(xhr.status==0||xhr.status==200){
                //console.log('ok')
            }
            else {
                console.log('fail ' + xhr.status);
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    };
    wtf.post = function (url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var resp = xhr.responseText;
                callback(resp);
            }else if(xhr.status==0||xhr.status==200){
                //console.log('ok')
            }
            else {
                console.log('fail ' + xhr.status);
            }
        };
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    };
    wtf.ajax=function(url,data,callback){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var resp = xhr.responseText;
                callback(resp);
            }else if(xhr.status==0||xhr.status==200){
                //console.log('ok')
            }
            else {
                console.log('fail ' + xhr.status);
            }
        };
        xhr.open('POST', url, true);
        xhr.send(JSON.stringify(data));
    };

    //html 
    wtf.wrapTag=function(tag,value,attr){
        return '<'+tag+' '+attr+'>'+value+'</'+tag+'>';
    };
    wtf.htmlEscape = function (html) {
        return html.replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    
    //load
    wtf.loadScript=function(src,callback){
        var scriptNode = document.createElement("script");
        scriptNode.type = "text/javascript";
        try {
            if(src) {
                scriptNode.src = src;
                scriptNode.onloadDone = false;
                scriptNode.onload = function () {
                    scriptNode.onloadDone = true;
                    if(callback){
                        callback();
                    }
                 };
                 scriptNode.onreadystatechange = function () {
                    if((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                        scriptNode.onloadDone = true;
                    }
                 };
                 document.getElementsByTagName('head')[0].appendChild(scriptNode);
            }
        } catch(e) {
            console.log('appendScript error: ',e);
        }
    };
    wtf.loadStyle=function(url){
        try {
            document.createStyleSheet(url)
        } catch(e) {
            var cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = url;
            document.getElementsByTagName('head')[0].appendChild(cssLink);
        }
    };
    
    //selector
    wtf.$$=function(selector){
        return document.querySelectorAll(selector);
    };
    wtf.$=function(selector){
        return document.querySelector(selector);
    };
    wtf.$id=function(id){
        return document.getElementById(id);
    };
    wtf.$cls=function(cls){
        return document.getElementsByClassName(cls);
    };
    wtf.$tag=function(tag){
        return document.getElementsByTagName(tag);
    }
    return wtf;
})();
