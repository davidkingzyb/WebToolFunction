//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   __    __                   ________                          ________                                                          //  
//  |  |  |  |                 |__    __|                   __   |   _____|                           _      __                     //  
//  |  |/\|  |  _____  ___        |  |     _____    _____  |  |  |  |____   __  __  ______   ______  | \_   |__|  _____   ______    //  
//  |        | /  _  \|   |___    |  |    /     \  /     \ |  |  |   ____| |  | | ||      \ |   ___| |   _| |  | /     \ |      \   //  
//  |   /\   |/  ____/|  ___  |   |  |   |   o   ||   o   ||  |_ |  |      |  |_| ||   _   ||  |____ |  |___|  ||   o   ||   _   |  //  
//  |__/  \__|\______/|_______|   |__|    \_____/  \_____/ |____||__|      |______||__| |__||_______|\_____/|__| \_____/ |__| |__|  //  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  2016/03/31 by DKZ https://davidkingzyb.github.io
var bd = (function () {
    function bd() {
        this.author = 'DKZ';
    }
    bd.define = function (id, obj,vm) {
        Object.observe(obj,function(changes){
            changes.forEach(function(change){
                //console.log(change);
                bd.scan(id,change.object);
            })
        })
        obj['bd$id']=id;
        obj['bd$vm']=vm||document.getElementById(id).innerHTML;
        return obj;
    };
    bd.scan=function(id,o){
        function render(expr){
            var result=eval(expr.slice(2,expr.length-2));
            html=html.replace(expr,result);
        }
        var html=o.bd$vm;
        var arr=html.match(/{{.*?}}/g);
        for(var i in arr){
            render(arr[i]);
        }
        //console.log(html)
        document.getElementById(id).innerHTML=html;
    };
    bd.repeat=function(o,vm){
        var html='';
        for(var i in o){
            html+=vm.replace(/#el#/g,o[i]);
        }
        console.log(html)
        return html;
    }
    return bd;
})();
