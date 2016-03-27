#!/usr/bin/python
# -*- coding: UTF-8 -*-
####################################################################################################################################
#   __    __                   ________                          ________                                                          #  
#  |  |  |  |                 |__    __|                   __   |   _____|                           _      __                     #  
#  |  |/\|  |  _____  ___        |  |     _____    _____  |  |  |  |____   __  __  ______   ______  | \_   |__|  _____   ______    #  
#  |        | /  _  \|   |___    |  |    /     \  /     \ |  |  |   ____| |  | | ||      \ |   ___| |   _| |  | /     \ |      \   #  
#  |   /\   |/  ____/|  ___  |   |  |   |   o   ||   o   ||  |_ |  |      |  |_| ||   _   ||  |____ |  |___|  ||   o   ||   _   |  #  
#  |__/  \__|\______/|_______|   |__|    \_____/  \_____/ |____||__|      |______||__| |__||_______|\_____/|__| \_____/ |__| |__|  #  
####################################################################################################################################
#  2016/02/20 by DKZ https://davidkingzyb.github.io

from HTMLParser import HTMLParser
import urllib2
import urllib
import re

def removeTags(html):
    txt=re.sub('<.+?>','',html)
    return txt

def removeEntityref(html):
    txt=re.sub('&.+?;','',html)
    return txt
    

def subString(string,start,end):
    s=string.find(start)+len(start)
    e=string.find(end,s)
    return string[s:e]

def spider(url,cookie='',ua='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36'):
    req=urllib2.Request(url)
    req.add_header('Cookie',cookie)
    req.add_header('User-Agent',ua)
    resp=urllib2.urlopen(req)
    html=resp.read()
    return html

def post(url,data):
    resp=urllib2.urlopen(url=url,data=urllib.urlencode(data))
    r=resp.read()
    return r

class getAttr(HTMLParser):
    arr=[]
    targetAttr=''


    selectTagName=''
    selectAttrName=''
    selectAttrValue=''

    def getResult(self):
        return self.arr

    def setTargetAttr(self,targetattr):
        self.targetAttr=targetattr


    def setTagSelector(self,tagname):
        self.selectTagName=tagname

    def setAttrSelector(self,attrname,attrvalue):
        self.selectAttrName=attrname
        self.selectAttrValue=attrvalue

    def handle_starttag(self, tag, attrs):
        if self.selectTagName!='' and self.selectAttrName!='':
            isAttr=False
            for x in attrs:
                if x[0]==self.selectAttrName and x[1]==self.selectAttrValue:
                    isAttr=True
            if tag==self.selectTagName and isAttr:
                for x in attrs:
                    if x[0]==self.targetAttr:
                        self.arr.append(x[1])
        else:
            if self.selectAttrName!='':
                for x in attrs:
                    if x[0]==self.selectAttrName and x[1]==self.selectAttrValue:
                        for x in attrs:
                            if x[0]==self.targetAttr:
                                self.arr.append(x[1])
            else:
                if tag==self.selectTagName:
                    for x in attrs:
                        if x[0]==self.targetAttr:
                            self.arr.append(x[1])

    def handle_startendtag(self, tag, attrs):
        if self.selectTagName!='' and self.selectAttrName!='':
            isAttr=False
            for x in attrs:
                if x[0]==self.selectAttrName and x[1]==self.selectAttrValue:
                    isAttr=True
            if tag==self.selectTagName and isAttr:
                for x in attrs:
                    if x[0]==self.targetAttr:
                        self.arr.append(x[1])
        else:
            if self.selectAttrName!='':
                for x in attrs:
                    if x[0]==self.selectAttrName and x[1]==self.selectAttrValue:
                        for x in attrs:
                            if x[0]==self.targetAttr:
                                self.arr.append(x[1])
            else:
                if tag==self.selectTagName:
                    for x in attrs:
                        if x[0]==self.targetAttr:
                            self.arr.append(x[1])

def testgetAttr():
    html='<a id="dkz" href="hello"></a>'
    parser=getAttr()
    parser.setTargetAttr('href')
    parser.setTagSelector('a')
    parser.selectAttrSelector('id','dkz')
    parser.feed(html)
    arr=parser.getResult()
    print(arr)

def testspider():
    print(spider('http://davidkingzyb.github.io'))

def testsubString():
    string='<aaa>xxxxx<bbb>'
    print(subString(string,'<aaa>','<bbb>'))

def textremoveTags():
    string='<a>xxx<aa>xxxx<aa><aa>xxx</aa>'
    print(removeTags(string))

def testremoveEntityref():
    string='xxx&nbsp;xxx&nbsp;xxx'
    print(removeEntityref(string))

def testpost():
    r=post('http://127.0.0.1:5000/io',{'tty':'help'})
    print(r)

if __name__ == '__main__':
    # testgetAttr()
    # testspider()
    # testsubString()
    # textremoveTags()
    # testremoveEntityref()
    testpost()


