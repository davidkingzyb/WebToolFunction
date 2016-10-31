# WebToolFunction

**WTF is it ?**

2016/1/22 by DKZ



Web tool functions for front-end developer

[Chrome Extension](https://github.com/davidkingzyb/WebToolFunction/blob/chrome/chromeREADME.md)

[Chrome App](https://github.com/davidkingzyb/WebToolFunction/tree/app)

##Try

[http://davidkingzyb.github.io/WebToolFunction](http://davidkingzyb.github.io/WebToolFunction)

##List


- [**init.less**](#initless) reset css
- [**tui.less**](#tuiless) Types User Interface
- [**wtf.js**](#wtfjs) some useful web tool functions
- [**terminal.js**](#terminaljs) console in your website



##API

###init.less

reset css

	$lessc init.less > static/style.css

###tui.less

    $lessc tui.less > static/tui.css

    //in terminal.js
    terminal.istui=true;
    terminal.init();
    terminal.tuifmt(template,map)

###wtf.js

some useful web tool functions

####wtf.reqstr(obj)

```js
var qstr=wtf.reqstr({'q':'v','qq':'vv'}) //'q=v&qq=vv'
```
	
####wtf.get(url,callback(d)[,onerror(xhr))

ajax GET function

```js
wtf.get('http://www.test.com/get?q=xx',function(data){
	console.log(data);
})
```
	
####wtf.post(url,data,callback(d)[,onerror(xhr)[,content_type)

ajax Post function

```js
wtf.post('http://www.test.com','q=xx&qq=xxx',function(data){
	console.log(data);
})
```

####wtf.$(selector)

selector

```js
wtf.$('#id')
wtf.$$('.cls')
wtf.$id('id')
wtf.$cls('cls')
wtf.$tag('tag')
```

####wtf.urlquery(name[,url)

```js
var q=wtf.urlquery(q,'?q=1&qq=2');
```

####wtf.localStorage(name[,value)

####wtf.sessionStorage(name[,value)

####wtf.$cookie(name[,value[,time)

####wtf.cookies

- getItem(name)
- setItem(name, value[, end[, path[, domain[, secure)
- removeItem(name[, path[,domain)
- hasItem(name)
- keys()
- clear()

####wtf.loadScript(src[,callback)

load script file

```js
wtf.loadScript('../static/lib/wtf.js',function(){
	console.log('wtf load ok');
})
```

####wtf.loadStyle(url)

####wtf.htmlEscape(html)

####wtf.wrapTag(tag,value,attr)

wrap html tag

####wtf.typeOf(obj)

####wtf.imgToBase64(img,type)

###terminal.js

console in your website

a command user interface for debug web application

####terminal.isbig

big terminal 800x600

- default=false

####terminal.debug

use console too

- default=false

####terminal.catcherr

catch gobal error (window.onerror)

- not jump to execute

- default=false

####terminal.init()

use terminal

####terminal.ismodalbg

always use modal dialoge

- default=false

####terminal.showmodalbg()

use modal dialoge

####terminal.show()

or press `F9`

####terminal.log(msg1[,msg2...)

####terminal.consoleLocalLog()

console log all terminal log in localstorage

####terminal.alert(msg,timeout)

####terminal.confirm(msg,callback)

####terminal.prompt(msg,callback)

####terminal.istui

- default=false

####terminal.tuifmt(template,map)

##Liscense

**MIT**
	
