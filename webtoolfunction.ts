//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   __    __                   ________                          ________                                                          //  
//  |  |  |  |                 |__    __|                   __   |   _____|                           _      __                     //  
//  |  |/\|  |  _____  ___        |  |     _____    _____  |  |  |  |____   __  __  ______   ______  | \_   |__|  _____   ______    //  
//  |        | /  _  \|   |___    |  |    /     \  /     \ |  |  |   ____| |  | | ||      \ |   ___| |   _| |  | /     \ |      \   //  
//  |   /\   |/  ____/|  ___  |   |  |   |   o   ||   o   ||  |_ |  |      |  |_| ||   _   ||  |____ |  |___|  ||   o   ||   _   |  //  
//  |__/  \__|\______/|_______|   |__|    \_____/  \_____/ |____||__|      |______||__| |__||_______|\_____/|__| \_____/ |__| |__|  //  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  2016/01/28 by DKZ https://davidkingzyb.github.io

class wtf{
    static get(url,callback){
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){    
                var resp=xhr.responseText;
                callback(resp);               
            }else{
                console.log('fail'+xhr.status);
            }
        };
        xhr.open('GET',url,true);
        xhr.send();
    }
    static post(url,data,callback){
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){    
                var resp=xhr.responseText;
                callback(resp);               
            }else{
                console.log('fail'+xhr.status);
            }
        };
        xhr.open('POST',url,true);
        xhr.send(data);
    }
}