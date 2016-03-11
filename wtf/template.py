#!/usr/bin/python3
# -*- coding: UTF-8 -*-
####################################################################################################################################
#   __    __                   ________                          ________                                                          #  
#  |  |  |  |                 |__    __|                   __   |   _____|                           _      __                     #  
#  |  |/\|  |  _____  ___        |  |     _____    _____  |  |  |  |____   __  __  ______   ______  | \_   |__|  _____   ______    #  
#  |        | /  _  \|   |___    |  |    /     \  /     \ |  |  |   ____| |  | | ||      \ |   ___| |   _| |  | /     \ |      \   #  
#  |   /\   |/  ____/|  ___  |   |  |   |   o   ||   o   ||  |_ |  |      |  |_| ||   _   ||  |____ |  |___|  ||   o   ||   _   |  #  
#  |__/  \__|\______/|_______|   |__|    \_____/  \_____/ |____||__|      |______||__| |__||_______|\_____/|__| \_____/ |__| |__|  #  
####################################################################################################################################
#  2016/03/11 by DKZ https://davidkingzyb.github.io

def render(o,html):
    for x in o.keys():
        html=html.replace('{{'+x+'}}',o[x])
    return html

def test():
    htmlstr='<html><body><div>{{a}}</div><div>{{bb}}</div></body></html>'
    o={'a':'A','bb':'B'}
    print(render(o,htmlstr))

if __name__ == '__main__':
    test()

