
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
2016/06/06 by DKZ https://davidkingzyb.github.io
https://github.com/davidkingzyb/WebToolFunction
*/

function help(){
    terminal.log(`
- chromeSetCookies(cookiestr,url)
- google(q)
- baidu(q)
- github(q)
- sof(q)        :stackoverflow
- zhihu(q)
- mdn(q)
- u3d(q)
- wiki(q)
- translate(q)
- translateZh(q)
        `)
}

terminal.init();
// console.log('WebToolFunction by DKZ')

function chromeSetCookies(cookiestr,url){
    console.log('chrome set cookies cookie str',cookiestr);
    chrome.runtime.sendMessage({'cmd':'cookiesSet','url':url,'cookie_str':cookiestr});
}

//search

function google(q){
    var qq=q.replace(/ /g,'+');
    terminal.log('google search q='+qq);
    window.open('https://www.google.com/search?q='+qq+'&ie=utf-8&oe=utf-8');
}

function baidu(q){
    var wd=encodeURI(q);
    terminal.log('baidu search wd='+wd);
    window.open('https://www.baidu.com/s?wd='+wd);
}

function github(q){
    terminal.log('github search q='+q);
    window.open('https://github.com/search?utf8=%E2%9C%93&q='+q);
}

function sof(q){
    terminal.log('stackoverflow search q='+q);
    window.open('http://stackoverflow.com/search?q='+q);
}

function zhihu(q){
    var qq=q.replace(/ /g,'+');
    terminal.log('zhihu search q='+qq);
    window.open('https://www.zhihu.com/search?type=content&q='+qq);
}

function mdn(q){
    window.open('https://developer.mozilla.org/zh-CN/search?q='+q+'&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=webdev');
}

function u3d(q){
    window.open('https://docs.unity3d.com/ScriptReference/30_search.html?q='+q);
}

function wiki(q){
    window.open('https://zh.wikipedia.org/w/index.php?search='+q);
}

function translate(q){
    window.open('https://translate.google.cn/#en/zh-CN/'+q);
}

function translateZh(q){
    window.open('https://translate.google.cn/#zh-CN/en/'+q);
}
