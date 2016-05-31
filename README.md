# WebToolFunction

**WTF is it ?**

2016/1/22 by DKZ



##List


- [**init.less**](#initless) reset css
- [**wtf.js**](#wtfjs) some useful web tool functions
- [**terminal.js**](#terminaljs) console in your website
- [**spiderman.py**](#spidermanpy) html sprider
- [**runServer.py**](#runserverpy) a simple server

~~- [**wtf**](#wtf) a python lib with some useful tool function~~

~~- [**bd.js**](#bdjs) a simple MVVM framework use Object.observe~~


##API

###init.less

reset css

	$lessc init.less > static/style.css

###wtf.js

some useful web tool functions

#####wtf.reqstr(obj)

```js
var qstr=wtf.reqstr({'q':'v','qq':'vv'}) //'q=v&qq=vv'
```
	
#####wtf.get(url,callback[,onerror)

ajax GET function

```js
wtf.get('http://www.test.com/get?q=xx',function(data){
	console.log(data);
})
```
	
#####wtf.post(url,data,callback[,onerror)

ajax Post function

```js
wtf.post('http://www.test.com','q=xx&qq=xxx',function(data){
	console.log(data);
})
```

#####wtf.$(selector)

selector

```js
wtf.$('#id')
wtf.$$('.cls')
wtf.$id('id')
wtf.$cls('cls')
wtf.$tag('tag')
```

#####wtf.$urlquery(name[,url)

#####wtf.$localStorage(name[,value)

#####wtf.$sessionStorage(name[,value)

#####wtf.$cookie(name[,value[,time)

#####wtf.cookies

- getItem(name)
- setItem(name, value[, end[, path[, domain[, secure)
- removeItem(name[, path[,domain)
- hasItem(name)
- keys()
- clear()

#####wtf.loadScript(src[,callback)

load script file

```js
wtf.loadScript('../static/lib/wtf.js',function(){
	console.log('wtf load ok');
})
```

#####wtf.loadStyle(url)

#####wtf.htmlEscape(html)

#####wtf.wrapTag(tag,value,attr)

wrap html tag

```js
wtf.wrapTag('a','go','href="http://test.com"');
```

###terminal.js

console in your website

a command user interface for debug web application

#####terminal.init()

#####terminal.show()

#####terminal.log()

#####terminal.alert()

###spiderman.py

html spider use python2.x

```py
import spiderman
#get html tag attr arr
html='<a id="dkz" href="hello"></a>'
parser=spiderman.getAttr()
parser.setTargetAttr('href')
parser.setTagSelector('a')
parser.selectAttrSelector('id','dkz')
parser.feed(html)
arr=parser.getResult()
print(arr)

#spider
print(spiderman.spider('http://davidkingzyb.github.io'))

#post

print(spiderman.post('http://dkzhome.sinaapp.com/io',{'tty':'help'}))

#get data
string='<aaa>xxxxx<bbb>'
print(spiderman.subString(string,'<aaa>','<bbb>'))

#remove tag in data
string='<a>xxx<aa>xxxx<aa><aa>xxx</aa>'
print(spiderman.removeTags(string))

#remove entityref in data
string='xxx&nbsp;xxx&nbsp;xxx'
print(spiderman.removeEntityref(string))

#subString(string,start,end)
string='<start>sub<end>'
print(spiderman.subString(string,'<start>','<end>'))

#subAllString(string,start,end)
string='<start>sub1<end><start>sub2<end>'
print(spiderman.subAllString(string,'<start>','<end>')[1])
```
    
###runServer.py

a simple http server

	$python3 runServer 8080

##Liscense

**MIT**
	
