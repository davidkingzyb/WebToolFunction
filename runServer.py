
"""

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
2016/05/23 by DKZ https://davidkingzyb.github.io
github: https://github.com/davidkingzyb/WebToolFunction
"""

# created by DKZ 2015/6
import sys

from http.server import HTTPServer,CGIHTTPRequestHandler
import socket
localIP = socket.gethostbyname(socket.gethostname()) 
print ("local ip:%s "%localIP)
if len(sys.argv)==2:
    port=int(sys.argv[1])
else:
    port =7654
httpd=HTTPServer(('',port),CGIHTTPRequestHandler)
print ('run server at '+str(httpd.server_port))
httpd.serve_forever()