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
#  2016/02/20 by DKZ https://davidkingzyb.github.io

# created by DKZ 2015/6
from http.server import HTTPServer,CGIHTTPRequestHandler
import socket
localIP = socket.gethostbyname(socket.gethostname()) 
print ("local ip:%s "%localIP)
port =7654
httpd=HTTPServer(('',port),CGIHTTPRequestHandler)
print ('run server at '+str(httpd.server_port))
httpd.serve_forever()