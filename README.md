# WebToolFunction

**WTF is it ?**

2016/1/22 by DKZ



##List


- [**init.less**](#initless) reset css
- [**webtoolfunction.ts**](#webtoolfunctionts) some useful web tool functions
- [**spiderman.py**](#spidermanpy) html sprider
- [**runServer.py**](#runserverpy) a simple server


##API

###init.less

reset css

	$lessc init.less > static/style.css

###webtoolfunction.ts

some useful web tool functions

use webtoolfunction.js:

	$tsc webtoolfunction.ts
	
####wtf.get(url,callback)

ajax GET function

	wtf.get('http://www.test.com/get?q=xx',function(data){
		console.log(data);
	})
	
####wtf.post(url,data,callback)

ajax Post function

	wtf.post('http://www.test.com','q=xx&qq=xxx',function(data){
		console.log(data);
	})

###spiderman.py

html spider use python2.x

	#get html tag attr arr
    html='<a id="dkz" href="hello"></a>'
    parser=getAttr()
    parser.setTargetAttr('href')
    parser.setTagSelector('a')
    parser.selectAttrSelector('id','dkz')
    parser.feed(html)
    arr=parser.getResult()
    print(arr)
	
	#spider
    print(spider('http://davidkingzyb.github.io'))

	#get data
    string='<aaa>xxxxx<bbb>'
    print(subString(string,'<aaa>','<bbb>'))

	#remove tag in data
    string='<a>xxx<aa>xxxx<aa><aa>xxx</aa>'
    print(removeTags(string))

	#remove entityref in data
    string='xxx&nbsp;xxx&nbsp;xxx'
    print(removeEntityref(string))
    
###runServer.py

a simple http server

	$python3 runServer 8080