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
2016/05/31 by DKZ https://davidkingzyb.github.io
github: https://github.com/davidkingzyb/WebToolFunction
*/
var terminal = (function() {
    terminal.ismodalbg = false;
    terminal.debug = false;
    terminal.catcherr=false;
    terminal.isbig=false;

    var csstemplatebig = "<style>#terminal_modalbg{position:fixed;z-index:990;width:100%;height:100%;background-color:rgba(10,10,10,0.1);top:0px;left:0px;}#terminal pre{margin:0;}#terminal{text-align:left;color:white;font-family: 'Lucida Console', Monaco, monospace;position:fixed;width:800px;height:600px;left:50%;bottom:50%;margin-bottom: -300px;margin-left: -400px;background-color: rgba(10,10,10,0.4);z-index:999;}#terminal>pre{position:absolute;bottom:10px;margin-left: 10px;margin-right:10px;}#terminal_show{overflow-y:scroll;overflow-x:hidden;height: 574px;width: 790px;}#terminal pre a{color:white;}#terminal pre a:hover{color:#222;}#terminal_input{margin:0px;padding:0px;background-color: rgba(10,10,10,0.01);border:0px;color:white;font-family: 'Lucida Console', Monaco, monospace;outline:none;}#terminalbg{position: relative;height: 26px;width: 100%;top: 574px;background-color: rgba(0,0,0,0.5);}.terminal_alert{font-size:20px;color:white;background:black;border-radius:5px;padding:10px;opacity:0.8;position:relative;float:left;right:50%;}#terminal_alertcon{position:fixed;float:left;clear:left;top:45%;left:50%;z-index:1000;}.terminal_confirm{font-size:20px;color:white;background:black;border-radius:5px;padding:10px;opacity:0.8;position:relative;float:left;right:50%;}#terminal_confirmcon{position:fixed;float:left;clear:left;top:45%;left:50%;z-index:1000;}#terminal_confirmcon a{color:white;}#terminal_confirmcon a:hover{color:#555;}.terminal_prompt{font-size:20px;color:white;background:black;border-radius:5px;padding:10px;opacity:0.8;position:relative;float:left;right:50%;}#terminal_promptcon{position:fixed;float:left;clear:left;top:45%;left:50%;z-index:1000;}#terminal_promptcon a{color:white;}#terminal_promptcon a:hover{color:#555;}#terminal_promptinput{margin:0px;padding:0px;background-color: rgba(10,10,10,0.01);border:0px;color:white;font-family: 'Lucida Console', Monaco, monospace;outline:none;font-size:20px;}</style>"
    var csstemplatesmall = "<style>#terminal_modalbg{position:fixed;z-index:990;width:100%;height:100%;background-color:rgba(10,10,10,0.1);top:0px;left:0px;}#terminal pre{margin:0;}#terminal{text-align:left;color:white;font-family: 'Lucida Console', Monaco, monospace;position:fixed;width:500px;height:200px;left:50%;bottom:50%;margin-bottom: -275px;margin-left: -250px;background-color: rgba(10,10,10,0.4);z-index:999;}#terminal>pre{position:absolute;bottom:10px;margin-left: 10px;margin-right:10px;}#terminal_show{overflow-y:scroll;overflow-x:hidden;height: 174px;width: 490px;}#terminal pre a{color:white;}#terminal pre a:hover{color:#222;}#terminal_input{margin:0px;padding:0px;background-color: rgba(10,10,10,0.01);border:0px;color:white;font-family: 'Lucida Console', Monaco, monospace;outline:none;}#terminalbg{position: relative;height: 26px;width: 100%;top: 174px;background-color: rgba(0,0,0,0.5);}.terminal_alert{font-size:20px;color:white;background:black;border-radius:5px;padding:10px;opacity:0.8;position:relative;float:left;right:50%;}#terminal_alertcon{position:fixed;float:left;clear:left;top:45%;left:50%;z-index:1000;}.terminal_confirm{font-size:20px;color:white;background:black;border-radius:5px;padding:10px;opacity:0.8;position:relative;float:left;right:50%;}#terminal_confirmcon{position:fixed;float:left;clear:left;top:45%;left:50%;z-index:1000;}#terminal_confirmcon a{color:white;}#terminal_confirmcon a:hover{color:#555;}.terminal_prompt{font-size:20px;color:white;background:black;border-radius:5px;padding:10px;opacity:0.8;position:relative;float:left;right:50%;}#terminal_promptcon{position:fixed;float:left;clear:left;top:45%;left:50%;z-index:1000;}#terminal_promptcon a{color:white;}#terminal_promptcon a:hover{color:#555;}#terminal_promptinput{margin:0px;padding:0px;background-color: rgba(10,10,10,0.01);border:0px;color:white;font-family: 'Lucida Console', Monaco, monospace;outline:none;font-size:20px;}</style>"
    var cssmobiletemplate = "<style>#terminal_modalbg{position:fixed;z-index:990;width:100%;height:100%;background-color:rgba(10,10,10,0.1);top:0px;left:0px;}#terminal pre{margin:0;}#terminal{text-align:left;color:white;font-family: 'Lucida Console', Monaco, monospace;position:fixed;width:100%;height:500px;left:0px;bottom:0px;background-color: rgba(10,10,10,0.3);z-index:999;font-size:30px;}#terminal>pre{position:absolute;bottom:10px;margin-left: 10px;margin-right:10px;}#terminal_show{overflow-y:scroll;overflow-x:hidden;height: 447px;width: 100%;}#terminal pre a{color:white;}#terminal pre a:hover{color:#222;}#terminal_input{margin:0px;padding:0px;background-color: rgba(10,10,10,0.01);border:0px;color:white;font-family: 'Lucida Console', Monaco, monospace;outline:none;font-size:30px;}#terminalbg{position: relative;height: 50px;width: 100%;top: 450px;background-color: rgba(0,0,0,0.5);}.terminal_alert{font-size:40px;color:white;background:black;border-radius:5px;padding:10px;opacity:0.8;position:relative;float:left;right:50%;}#terminal_alertcon{position:fixed;float:left;clear:left;top:45%;left:50%;z-index:1000;}.terminal_confirm{font-size:40px;color:white;background:black;border-radius:5px;padding:10px;opacity:0.8;position:relative;float:left;right:50%;}#terminal_confirmcon{position:fixed;float:left;clear:left;top:45%;left:50%;z-index:1000;}#terminal_confirmcon a{color:white;}#terminal_confirmcon a:hover{color:#555;}.terminal_prompt{font-size:40px;color:white;background:black;border-radius:5px;padding:10px;opacity:0.8;position:relative;float:left;right:50%;}#terminal_promptcon{position:fixed;float:left;clear:left;top:45%;left:50%;z-index:1000;}#terminal_promptcon a{color:white;}#terminal_promptcon a:hover{color:#555;}#terminal_promptinput{font-size:40px;margin:0px;padding:0px;background-color: rgba(10,10,10,0.01);border:0px;color:white;font-family: 'Lucida Console', Monaco, monospace;outline:none;}</style>"

    var nowdate = new Date().toDateString();
    var template = '<div id="terminal" style="display:none;"><div id="terminalbg"></div><pre><pre id="terminal_show"><a href="https://github.com/davidkingzyb/WebToolFunction">WebToolFunction</a> by DKZ ' + nowdate + '\n</pre>-<input type="text" id="terminal_input" size="50"></pre></div>'

    function terminal() {

    }

    var class2type = {};
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e, i) {
        class2type["[object " + e + "]"] = e.toLowerCase();
    });

    function _typeof(obj) {
        if (obj == null) {
            return String(obj);
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[class2type.toString.call(obj)] || "object" :
            typeof obj;
    }

    function _doError(errMsg, scriptURI, lineNumber, columnNumber, errorObj) {
        // setTimeout(function() {
            var rst = {
                "msg": errMsg,
                "uri": scriptURI,
                "line": lineNumber,
                "col": columnNumber,
                "err": errorObj
            };
            terminal.log('****** window catch error ******');
            for(var x in rst){
                terminal.log(x,':',rst[x]);
            }
            if(terminal.debug){
                window.open("http://stackoverflow.com/search?q="+rst.msg);
                return false;
            }else{
                return true;
            }
            
        // });
    };

    function wtf_localStorage(name, value) {
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

    terminal.init = function(config) {
        if(this.catcherr){
            window.onerror=_doError;
        }

        window.onkeydown = function(e) {
            if (e.keyCode === 120 || e.which === 120) {
                terminal.show();
            }
            if (terminal._confirmcallback) {
                if (e.keyCode === 89 || e.which === 89) {
                    terminal.doConfirm(true);
                }
                if (e.keyCode === 78 || e.keyCode === 88 || e.which === 78 || e.which === 88) {
                    terminal.doConfirm(false);
                }
            }
            if (terminal._promptcallback) {
                var terminal_promptinput = document.getElementById('terminal_promptinput');
                terminal_promptinput.onkeydown = function(e) {
                    if (e.keyCode === 13 || e.which === 13) {
                        terminal.doprompt(true);
                    }
                }
            }
        }
        var terminalcon = document.createElement('div');
        terminalcon.id = 'terminalcon';
        var csstemplate=csstemplatesmall;
        if(terminal.isbig){
            csstemplate=csstemplatebig;
        }

        terminalcon.innerHTML = navigator.userAgent.toLowerCase().indexOf('mobile') < 0 ? csstemplate + template : cssmobiletemplate + template;
        document.body.appendChild(terminalcon);
        var terminal_TTYARR = JSON.parse(wtf_localStorage('terminal_TTYARR'));
        var TTYARR = terminal_TTYARR ? terminal_TTYARR.ttyarr : [];
        var terminal_input = document.getElementById('terminal_input');
        terminal_input.onkeydown = function(e) {
            if (e.keyCode === 13 || e.which === 13) {
                var tty = terminal_input.value;
                TTYARR.push(tty);
                terminal_TTYARR = { 'ttyarr': TTYARR };
                wtf_localStorage('terminal_TTYARR', JSON.stringify(terminal_TTYARR));
                terminal_input.value = '';
                var terminal_show = document.getElementById('terminal_show');
                var ttycmd=tty[tty.length-1]==='/'?tty.slice(0,-1):tty;
                terminal_show.innerHTML += '-' + ttycmd + '\n';
                try {
                    var evalreturn=terminal.eval(tty);
                    if(evalreturn!==''){
                        terminal.log(evalreturn);
                    }  
                } catch (e) {
                    terminal.log(e);
                }

                terminal_show.scrollTop = terminal_show.scrollHeight;
            }
            if (e.keyCode === 38 || e.which === 38) {
                if (TTYARR.length >= 1) {
                    TTYARR.unshift(terminal_input.value);
                    var tty = TTYARR.pop();
                    terminal_input.value = tty;
                }
            }
            if (e.keyCode === 40 || e.which === 40) {
                if (TTYARR.length >= 1) {
                    TTYARR.push(terminal_input.value);
                    var tty = TTYARR.shift();
                    terminal_input.value = tty;
                }
            }
        }

        var terminal_modalbg = document.createElement('div');
        terminal_modalbg.innerHTML = '<div id="terminal_modalbg" style="display:none"></div>';
        document.body.appendChild(terminal_modalbg);

        window.onunload = function() {
            //save log
            var log = wtf_localStorage('terminal_log') + document.getElementById('terminal_show').innerHTML;
            wtf_localStorage('terminal_log', log);
        }
    }
    var ttycache=[];
    terminal.eval = function(tty) {
        if(tty[tty.length-1]==='/'){
            ttycache.push(tty.slice(0,-1));
            return '';
        }else{
            ttyconcat='';
            for(var i=0;i<ttycache.length;i++){
                ttyconcat+=ttycache[i];
            }
            ttyconcat+=tty;
            ttycache=[];
            var output = eval.call(window, ttyconcat);
            return output;
        }
        
    }
    terminal._alerttimer = null;
    terminal.alert = function(text, hidetime) {
        var hidetime = hidetime || 3000;
        if (terminal._alerttimer) {
            clearTimeout(terminal._alerttimer);
        }
        var terminal_alertconhtml = '<pre class="terminal_alert">' + text + '</pre>';
        this.log('*** alert ***\n' + text)
        if (document.getElementById('terminal_alertcon')) {
            document.getElementById('terminal_alertcon').innerHTML = terminal_alertconhtml;
        } else {
            var terminal_alertcon = document.createElement('div');
            terminal_alertcon.id = 'terminal_alertcon';
            terminal_alertcon.innerHTML = terminal_alertconhtml;
            document.body.appendChild(terminal_alertcon);
        }
        var modalbg = document.getElementById('terminal_modalbg');
        if (this.ismodalbg && modalbg.style.display == 'none') {
            this.showmodalbg();
        }
        terminal._alerttimer = setTimeout(function() {
            var modalbg = document.getElementById('terminal_modalbg');
            if (terminal.ismodalbg && modalbg.style.display == 'block') {
                terminal.showmodalbg();
            }
            document.getElementById('terminal_alertcon').innerHTML = '';
        }, hidetime);
    }

    function _xprint(char, times) {
        var r = ''
        for (var i = 0; i < times; i++) {
            r += char;
        }
        return r;
    }
    terminal.confirm = function(text, callback) {
        var maxlen = 0;
        text = text.split('\n');
        text.forEach(function(el, i, arr) {
            if (el.length > maxlen) {
                maxlen = el.length;
            }
        })
        var html = ' _' + _xprint('_', maxlen) + '<a href="javascript:terminal.doConfirm(false)">x</a>_ \n';
        text.forEach(function(el, i, arr) {
            html += '  ' + el + '\n';
        })
        html += '  ' + _xprint(' ', maxlen - 5) + '(<a href="javascript:terminal.doConfirm(true)">y</a>/<a href="javascript:terminal.doConfirm(false)">n</a>)\n'
        var terminal_confirmconhtml = '<pre class="terminal_confirm">' + html + '</pre>';
        if (document.getElementById('terminal_confirmcon')) {
            document.getElementById('terminal_confirmcon').innerHTML = terminal_confirmconhtml;
        } else {
            var terminal_confirmcon = document.createElement('div');
            terminal_confirmcon.id = 'terminal_confirmcon';
            terminal_confirmcon.innerHTML = terminal_confirmconhtml;
            document.body.appendChild(terminal_confirmcon);
        }
        var modalbg = document.getElementById('terminal_modalbg');
        if (this.ismodalbg && modalbg.style.display == 'none') {
            this.showmodalbg();
        }
        terminal._confirmcallback = callback;
    }

    terminal._confirmcallback = null;
    terminal.doConfirm = function(e) {
        var modalbg = document.getElementById('terminal_modalbg');
        if (this.ismodalbg && modalbg.style.display == 'block') {
            this.showmodalbg();
        }
        document.getElementById('terminal_confirmcon').innerHTML = '';
        terminal._confirmcallback(e);
        terminal._confirmcallback = null;
    }
    terminal.prompt = function(text, callback) {
        var maxlen = 0;
        text = text.split('\n');
        text.forEach(function(el, i, arr) {
            if (el.length > maxlen) {
                maxlen = el.length;
            }
        })
        var html = ' _' + _xprint('_', maxlen) + '<a href="javascript:terminal.doprompt(false)">x</a>_ \n';
        text.forEach(function(el, i, arr) {
            html += '  ' + el + '\n';
        })
        html += '  -<input id="terminal_promptinput" size="' + (maxlen - 2) + '" placeholder="' + _xprint('_', maxlen - 2) + '">\n'
        html += '  ' + _xprint(' ', maxlen - 5) + '(<a href="javascript:terminal.doprompt(true)">y</a>/<a href="javascript:terminal.doprompt(false)">n</a>)\n'
        var terminal_promptconhtml = '<pre class="terminal_prompt">' + html + '</pre>';
        if (document.getElementById('terminal_promptcon')) {
            document.getElementById('terminal_promptcon').innerHTML = terminal_promptconhtml;
        } else {
            var terminal_promptcon = document.createElement('div');
            terminal_promptcon.id = 'terminal_promptcon';
            terminal_promptcon.innerHTML = terminal_promptconhtml;
            document.body.appendChild(terminal_promptcon);
        }
        var modalbg = document.getElementById('terminal_modalbg');
        if (this.ismodalbg && modalbg.style.display == 'none') {
            this.showmodalbg();
        }
        document.getElementById('terminal_promptinput').focus();
        terminal._promptcallback = callback;
    }

    terminal._promptcallback = null;
    terminal.doprompt = function(e) {
        var terminal_promptinput = document.getElementById('terminal_promptinput');
        var val = terminal_promptinput.value;
        var modalbg = document.getElementById('terminal_modalbg');
        if (this.ismodalbg && modalbg.style.display == 'block') {
            this.showmodalbg();
        }
        if (e) {
            document.getElementById('terminal_promptcon').innerHTML = '';
            terminal._promptcallback(val);
            terminal._promptcallback = null;
        } else {
            document.getElementById('terminal_promptcon').innerHTML = '';
            terminal._promptcallback(null);
            terminal._promptcallback = null;
        }

    }

    terminal.showmodalbg = function() {
        var modalbg = document.getElementById('terminal_modalbg');
        if (modalbg.style.display == 'none') {
            modalbg.style.display = 'block';
        } else {
            modalbg.style.display = 'none';
        }
    }
    terminal.show = function() {
        var terminal = document.getElementById('terminal');
        var modalbg = document.getElementById('terminal_modalbg');
        if (terminal.style.display == 'none') {
            if (this.ismodalbg && modalbg.style.display == 'none') {
                this.showmodalbg();
            }
            terminal.style.display = 'block';
            document.getElementById('terminal_input').focus();
        } else {
            if (this.ismodalbg && modalbg.style.display == 'block') {
                this.showmodalbg();
            }
            terminal.style.display = 'none';
        }
    }

    terminal.log = function() {
        var output = '';
        for (var i = 0; i < arguments.length; i++) {
            if (_typeof(arguments[i]) === 'object') {
                output += JSON.stringify(arguments[i], 0, 4) + '\n';
            } else {
                output += arguments[i] + ' ';
            }
        }
        //console.log('terminal: '+output);
        var show = document.getElementById('terminal_show');
        show.innerHTML += output + '\n';
        if (this.debug) {
            console.log(output);
        }
    }

    terminal.print=function(msg){
        var show = document.getElementById('terminal_show');
        show.innerHTML += msg;
        if (this.debug) {
            console.log(output);
        }
    }

    terminal.consoleLocalLog=function(){
        console.log(wtf_localStorage('terminal_log'));
    }

    terminal._wtfWrapTag=function(tag,value,attr){
        return '<' + tag + ' ' + attr + '>' + value + '</' + tag + '>';
    }


    return terminal;
})()
var term = terminal;