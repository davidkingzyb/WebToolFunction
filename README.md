# WebToolFunction

**WTF is it ?**

2016/1/22 by DKZ



##List


- [**init.less**](#initless) reset css
- [**webtoolfunction.ts**](#webtoolfunctionts) some useful web tool functions


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
