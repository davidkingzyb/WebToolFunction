# WebToolFunction

**WTF is it ?**

2016/1/22 by DKZ



##List


- [**init.less**](#initless) reset css
- [**wtf.ts**](#wtfts) some useful web tool functions
- [**spiderman.py**](#spidermanpy) html sprider
- [**runServer.py**](#runserverpy) a simple server
- [**wtf**](#wtf) a python lib with some useful tool function


##API

###init.less

reset css

	$lessc init.less > static/style.css

###wtf.ts

some useful web tool functions

use webtoolfunction.js:

	$tsc webtoolfunction.ts
	
####wtf.get(url,callback)

ajax GET function

```js
wtf.get('http://www.test.com/get?q=xx',function(data){
	console.log(data);
})
```
	
####wtf.post(url,data,callback)

ajax Post function

```js
wtf.post('http://www.test.com','q=xx&qq=xxx',function(data){
	console.log(data);
})
```

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

#get data
string='<aaa>xxxxx<bbb>'
print(spiderman.subString(string,'<aaa>','<bbb>'))

#remove tag in data
string='<a>xxx<aa>xxxx<aa><aa>xxx</aa>'
print(spiderman.removeTags(string))

#remove entityref in data
string='xxx&nbsp;xxx&nbsp;xxx'
print(spiderman.removeEntityref(string))
```
    
###runServer.py

a simple http server

	$python3 runServer 8080
	
###wtf

```py
from wtf import file,template
f=file.read('wtf.html')
file.write('wtf.html',f)

html=template.render({'key','value'},f)
```