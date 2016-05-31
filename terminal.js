
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
    overflow:auto;
    z-index:999;
}
#terminal>pre{
position:absolute;
bottom:10px;
margin-left: 10px;
margin-right:10px;
    
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
</style>
    `
    var template='<div id="terminal" style="display:none;"><pre><pre id="terminal_show"></pre>-<input type="text" id="terminal_input" size="50"></pre></div>'
    function terminal(){

    }
    terminal.init=function(){
        var terminalcon=document.createElement('div');
        terminalcon.id='terminalcon';
        terminalcon.innerHTML=csstemplate+template;
        document.body.appendChild(terminalcon);
        var TTYARR=[];
        var terminal_input=document.getElementById('terminal_input');
        var that=this;
        terminal_input.onkeydown=function(e){
            if(e.keyCode===13||e.which===13){
                var tty=terminal_input.value;
                TTYARR.push(tty);
                terminal_input.value='';
                document.getElementById('terminal_show').innerHTML+='\n-'+tty+'\n';
                that.log(terminal.eval(tty));

                
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
        if (wtfalerttimer) {
            clearTimeout(wtfalerttimer);
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
        wtfalerttimer = setTimeout(function() {
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
            output+=arguments[i]+' ';
        }
        console.log('terminal: '+output);
        var show=document.getElementById('terminal_show');
        show.innerHTML+=output+'\n';
    }
    return terminal;
})()