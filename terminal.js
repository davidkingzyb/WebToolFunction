
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
var terminal_alerttimer;
var terminal=(function(){
    var csstemplate=`
<style>
#terminal pre{
    margin:0;
}
#terminal{
    color:white;
    font-family: 'Lucida Console', Monaco, monospace;
    position:absolute;
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
</style>
    `
    var template='<div id="terminal" style="display:none;"><div id="terminalbg"></div><pre><pre id="terminal_show">WebToolFunction by DKZ\n</pre>-<input type="text" id="terminal_input" size="50"></pre></div>'
    function terminal(){

    }

    var class2type = {} ;
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e,i){
        class2type[ "[object " + e + "]" ] = e.toLowerCase();
    }) ;
    function _typeof(obj){
        if ( obj == null ){
            return String( obj );
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ class2type.toString.call(obj) ] || "object" :
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

    terminal.init=function(){
        window.onkeydown=function(e){
            if(e.keyCode===120||e.which===120){
                terminal.show();
            }
        }
        var terminalcon=document.createElement('div');
        terminalcon.id='terminalcon';
        terminalcon.innerHTML=csstemplate+template;
        document.body.appendChild(terminalcon);
        var terminal_TTYARR=JSON.parse(wtf_localStorage('terminal_TTYARR'));
        var TTYARR=terminal_TTYARR?terminal_TTYARR.ttyarr:[];
        var terminal_input=document.getElementById('terminal_input');
        terminal_input.onkeydown=function(e){
            if(e.keyCode===13||e.which===13){
                var tty=terminal_input.value;
                TTYARR.push(tty);
                terminal_TTYARR={'ttyarr':TTYARR};
                wtf_localStorage('terminal_TTYARR',JSON.stringify(terminal_TTYARR));
                terminal_input.value='';
                var terminal_show=document.getElementById('terminal_show');
                terminal_show.innerHTML+='\n-'+tty+'\n';
                try{
                    terminal.log(terminal.eval(tty));
                }catch(e){
                    terminal.log(e);
                }
                
                terminal_show.scrollTop=terminal_show.scrollHeight;
            }
            if(e.keyCode===38||e.which===38){
                if(TTYARR.length>=1){
                    TTYARR.unshift(terminal_input.value);
                    var tty=TTYARR.pop();
                    terminal_input.value=tty;
                }
            }
            if(e.keyCode===40||e.which===40){
                if(TTYARR.length>=1){
                    TTYARR.push(terminal_input.value);
                    var tty=TTYARR.shift();
                    terminal_input.value=tty;
                }
            }
        }
    }
    terminal.eval=function(tty){
        var output=eval.call(window,tty);
        return output;
    }
    terminal.alert=function(text, hidetime) {
        var hidetime = hidetime || 3000;
        if (terminal_alerttimer) {
            clearTimeout(terminal_alerttimer);
        }
        var showalerthtml = '<div style="position:fixed;left:50%;top:45%;font-size:20px;color:white;background:black;border-radius:5px;padding:10px;opacity:0.8;">' + text + '</div>';
        if (document.getElementById('showalert')) {
            document.getElementById('showalert').innerHTML = showalerthtml;
        } else {
            var showalert = document.createElement('div');
            showalert.id = 'showalert';
            showalert.innerHTML = showalerthtml;
            document.body.appendChild(showalert);
        }
        terminal_alerttimer = setTimeout(function() {
            document.getElementById('showalert').innerHTML = '';
        }, hidetime);
    }
    terminal.show=function(){
        var terminal=document.getElementById('terminal');
        if(terminal.style.display=='none'){
            terminal.style.display='block';
            document.getElementById('terminal_input').focus();
        }else{
            terminal.style.display='none';
        }
    }
    
    terminal.log=function(){
        var output='';
        for(var i=0;i<arguments.length;i++){
            if(_typeof(arguments[i])==='object'){
                output+=JSON.stringify(arguments[i],0,4)+'\n';
            }
            else{
                output+=arguments[i]+' ';
            }
        }
        //console.log('terminal: '+output);
        var show=document.getElementById('terminal_show');
        show.innerHTML+=output+'\n';
    }
    return terminal;
})()