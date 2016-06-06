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
    var csstemplate = `
<style>
#terminal pre{
    margin:0;
}
#terminal{
    color:white;
    font-family: 'Lucida Console', Monaco, monospace;
    position:fixed;
    width:500px;
    height:200px;
    left:50%;
    bottom:50%;
    margin-bottom: -275px;
    margin-left: -250px;
    background-color: rgba(10,10,10,0.3);
    z-index:999;
}
#terminal>pre{
position:absolute;
bottom:10px;
margin-left: 10px;
margin-right:10px;
    
}
#terminal_show{
    overflow-y:scroll;
    overflow-x:hidden;
    height: 174px;
    width: 490px;
}
#terminal pre a{
    color:white;
}
#terminal pre a:hover{
    color:#222;
}
#terminal_input{
    margin:0px;
    padding:0px;
    background-color: rgba(10,10,10,0.01);
    border:0px;
    color:white;
    font-family: 'Lucida Console', Monaco, monospace;
    outline:none;
}
#terminalbg{
    position: relative;
    height: 26px;
    width: 100%;
    top: 174px;
    background-color: rgba(0,0,0,0.5);
}

.terminal_alert{
font-size:20px;
color:white;
background:black;
border-radius:5px;
padding:10px;opacity:0.8;
position:relative;
float:left;
right:50%;
}

#terminal_alertcon{
    position:fixed;
    float:left;
    clear:left;
    top:45%;
    left:50%

}

.terminal_confirm{
font-size:20px;
color:white;
background:black;
border-radius:5px;
padding:10px;opacity:0.8;
position:relative;
float:left;
right:50%;
}

#terminal_confirmcon{
    position:fixed;
    float:left;
    clear:left;
    top:45%;
    left:50%

}

#terminal_confirmcon a{
    color:white;
}

#terminal_confirmcon a:hover{
    color:#555;
}

.terminal_prompt{
font-size:20px;
color:white;
background:black;
border-radius:5px;
padding:10px;opacity:0.8;
position:relative;
float:left;
right:50%;
}

#terminal_promptcon{
    position:fixed;
    float:left;
    clear:left;
    top:45%;
    left:50%

}

#terminal_promptcon a{
    color:white;
}

#terminal_promptcon a:hover{
    color:#555;
}
#terminal_promptinput{
    margin:0px;
    padding:0px;
    background-color: rgba(10,10,10,0.01);
    border:0px;
    color:white;
    font-family: 'Lucida Console', Monaco, monospace;
    outline:none;
    font-size:20px;
}
</style>
    `
    var cssmobiletemplate = `
<style>
#terminal pre{
    margin:0;
}
#terminal{
    color:white;
    font-family: 'Lucida Console', Monaco, monospace;
    position:fixed;
    width:100%;
    height:500px;
    left:0px;
    bottom:0px;
    background-color: rgba(10,10,10,0.3);
    z-index:999;
    font-size:30px;
}
#terminal>pre{
position:absolute;
bottom:10px;
margin-left: 10px;
margin-right:10px;
    
}
#terminal_show{
    overflow-y:scroll;
    overflow-x:hidden;
    height: 447px;
    width: 100%;
}
#terminal pre a{
    color:white;
}
#terminal pre a:hover{
    color:#222;
}
#terminal_input{
    margin:0px;
    padding:0px;
    background-color: rgba(10,10,10,0.01);
    border:0px;
    color:white;
    font-family: 'Lucida Console', Monaco, monospace;
    outline:none;
    font-size:30px;

}
#terminalbg{
    position: relative;
    height: 50px;
    width: 100%;
    top: 450px;
    background-color: rgba(0,0,0,0.5);
}
.terminal_alert{
font-size:40px;
color:white;
background:black;
border-radius:5px;
padding:10px;opacity:0.8;
position:relative;
float:left;
right:50%;
}

#terminal_alertcon{
    position:fixed;
    float:left;
    clear:left;
    top:45%;
    left:50%

}
.terminal_confirm{
font-size:40px;
color:white;
background:black;
border-radius:5px;
padding:10px;opacity:0.8;
position:relative;
float:left;
right:50%;
}

#terminal_confirmcon{
    position:fixed;
    float:left;
    clear:left;
    top:45%;
    left:50%

}

#terminal_confirmcon a{
    color:white;
}

#terminal_confirmcon a:hover{
    color:#555;
}

.terminal_prompt{
font-size:40px;
color:white;
background:black;
border-radius:5px;
padding:10px;opacity:0.8;
position:relative;
float:left;
right:50%;
}

#terminal_promptcon{
    position:fixed;
    float:left;
    clear:left;
    top:45%;
    left:50%

}

#terminal_promptcon a{
    color:white;
}

#terminal_promptcon a:hover{
    color:#555;
}
#terminal_promptinput{
    font-size:40px;
    margin:0px;
    padding:0px;
    background-color: rgba(10,10,10,0.01);
    border:0px;
    color:white;
    font-family: 'Lucida Console', Monaco, monospace;
    outline:none;
}
</style>
    `
    var template = '<div id="terminal" style="display:none;"><div id="terminalbg"></div><pre><pre id="terminal_show"><a href="https://github.com/davidkingzyb/WebToolFunction">WebToolFunction</a> by DKZ\n</pre>-<input type="text" id="terminal_input" size="50"></pre></div>'

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

    terminal.init = function() {
        window.onkeydown = function(e) {
            if (e.keyCode === 120 || e.which === 120) {
                terminal.show();
            }
            if(terminal._confirmcallback){
                if(e.keyCode===89||e.which===89){
                    terminal.doConfirm(true);
                }
                if(e.keyCode===78||e.keyCode===88||e.which===78||e.which===88){
                    terminal.doConfirm(false);
                }
            }
            if(terminal._promptcallback){
                var terminal_promptinput=document.getElementById('terminal_promptinput');
                terminal_promptinput.onkeydown=function(e){
                    if(e.keyCode===13||e.which===13){
                        terminal.doprompt(true);
                    }
                }
            }
        }
        var terminalcon = document.createElement('div');
        terminalcon.id = 'terminalcon';
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
                terminal_show.innerHTML += '\n-' + tty + '\n';
                try {
                    terminal.log(terminal.eval(tty));
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
    }
    terminal.eval = function(tty) {
        var output = eval.call(window, tty);
        return output;
    }
    terminal._alerttimer=null;
    terminal.alert = function(text, hidetime) {
        var hidetime = hidetime || 3000;
        if (terminal._alerttimer) {
            clearTimeout(terminal._alerttimer);
        }
        var terminal_alertconhtml = '<pre class="terminal_alert">' + text + '</pre>';
        if (document.getElementById('terminal_alertcon')) {
            document.getElementById('terminal_alertcon').innerHTML = terminal_alertconhtml;
        } else {
            var terminal_alertcon = document.createElement('div');
            terminal_alertcon.id = 'terminal_alertcon';
            terminal_alertcon.innerHTML = terminal_alertconhtml;
            document.body.appendChild(terminal_alertcon);
        }
        terminal._alerttimer = setTimeout(function() {
            document.getElementById('terminal_alertcon').innerHTML = '';
        }, hidetime);
    }

    function _xprint(char,times){
        var r=''
        for(var i=0;i<times;i++){
            r+=char;
        }
        return r;
    }
    terminal.confirm = function(text, callback) {
        var maxlen=0;
        text=text.split('\n');
        text.forEach(function(el,i,arr){
            if(el.length>maxlen){
                maxlen=el.length;
            }
        })
        var html=' _'+_xprint('_',maxlen)+'<a href="javascript:terminal.doConfirm(false)">x</a>_ \n';
        text.forEach(function(el,i,arr){
            html+='  '+el+'\n';
        })
        html+='  '+_xprint(' ',maxlen-5)+'(<a href="javascript:terminal.doConfirm(true)">y</a>/<a href="javascript:terminal.doConfirm(false)">n</a>)\n'
        var terminal_confirmconhtml = '<pre class="terminal_confirm">' + html + '</pre>';
        if (document.getElementById('terminal_confirmcon')) {
            document.getElementById('terminal_confirmcon').innerHTML = terminal_confirmconhtml;
        } else {
            var terminal_confirmcon = document.createElement('div');
            terminal_confirmcon.id = 'terminal_confirmcon';
            terminal_confirmcon.innerHTML = terminal_confirmconhtml;
            document.body.appendChild(terminal_confirmcon);
        }
        terminal._confirmcallback=callback;
    }

    terminal._confirmcallback=null;
    terminal.doConfirm=function(e){
        document.getElementById('terminal_confirmcon').innerHTML='';
        terminal._confirmcallback(e);
        terminal._confirmcallback=null;
    }
    terminal.prompt = function(text, callback) {
        var maxlen=0;
        text=text.split('\n');
        text.forEach(function(el,i,arr){
            if(el.length>maxlen){
                maxlen=el.length;
            }
        })
        var html=' _'+_xprint('_',maxlen)+'<a href="javascript:terminal.doprompt(false)">x</a>_ \n';
        text.forEach(function(el,i,arr){
            html+='  '+el+'\n';
        })
        html+='  -<input id="terminal_promptinput" size="'+(maxlen-2)+'" placeholder="'+_xprint('_',maxlen-2)+'">\n'
        html+='  '+_xprint(' ',maxlen-5)+'(<a href="javascript:terminal.doprompt(true)">y</a>/<a href="javascript:terminal.doprompt(false)">n</a>)\n'
        var terminal_promptconhtml = '<pre class="terminal_prompt">' + html + '</pre>';
        if (document.getElementById('terminal_promptcon')) {
            document.getElementById('terminal_promptcon').innerHTML = terminal_promptconhtml;
        } else {
            var terminal_promptcon = document.createElement('div');
            terminal_promptcon.id = 'terminal_promptcon';
            terminal_promptcon.innerHTML = terminal_promptconhtml;
            document.body.appendChild(terminal_promptcon);
        }
        document.getElementById('terminal_promptinput').focus();
        terminal._promptcallback=callback;
    }

    terminal._promptcallback=null;
    terminal.doprompt=function(e){
        var terminal_promptinput=document.getElementById('terminal_promptinput');
        var val=terminal_promptinput.value;
        if(e){
            document.getElementById('terminal_promptcon').innerHTML='';
            terminal._promptcallback(val);
            terminal._promptcallback=null;
        }else{
            document.getElementById('terminal_promptcon').innerHTML='';
            terminal._promptcallback(null);
            terminal._promptcallback=null;
        }
        
    }
    terminal.show = function() {
        var terminal = document.getElementById('terminal');
        if (terminal.style.display == 'none') {
            terminal.style.display = 'block';
            document.getElementById('terminal_input').focus();
        } else {
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
    }
    return terminal;
})()