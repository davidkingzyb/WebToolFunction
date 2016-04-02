# WebToolFunction

**WTF is it ?**

2016/1/22 by DKZ



##List


- [**init.less**](#initless) reset css
- [**wtf.js**](#wtfjs) some useful web tool functions
- [**spiderman.py**](#spidermanpy) html sprider
- [**runServer.py**](#runserverpy) a simple server
- [**wtf**](#wtf) a python lib with some useful tool function
- [**bd.js**](#bdjs) a simple MVVM framework use Object.observe


##API

###init.less

reset css

	$lessc init.less > static/style.css

###wtf.js

some useful web tool functions

	
#####wtf.get(url,callback)

ajax GET function

```js
wtf.get('http://www.test.com/get?q=xx',function(data){
	console.log(data);
})
```
	
#####wtf.post(url,data,callback)

ajax Post function

```js
wtf.post('http://www.test.com','q=xx&qq=xxx',function(data){
	console.log(data);
})
```

#####wtf.ajax(url,data,callback)

ajax function

```js
wtf.ajax('http://www.test.com',{q:'xx'},function(data){
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

#####wtf.loadScript(src,callback)

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

###bd.js

a simple MVVM framework use Object.observe

quick example

```
<div id="mid">
    <div>a:{{o.a}}/b:{{o.b||'no'}}</div>
    <div>c:{{o.c||'no'}}</div>
    <div>output:{{o.output}}</div>
    <ul>
        {{bd.repeat(o.arr,'<li>#el#</li>')}}
    </ul>
</div>
<input type="text" id="in">

<script type="text/javascript">
	var model=bd.define('mid',{
	    a:'av',
	    b:'bv',
	    output:'',
	    arr:[1,2,3,4,5],
	})
	
	model.b='bvv';
	model.a='avv';
	
	wtf.$('#in').onkeydown=function(e){
	    if(e.keyCode===13){
	        model.output=wtf.$('#in').value;
	    }
	}
</script>
```

#####bd.define(id,obj,vm)

#####bd.repeat(o,vm)

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
	
###wtf

```py
from wtf import file,template
f=file.read('wtf.html')
file.write('wtf.html',f)

html=template.render({'key','value'},f)
```