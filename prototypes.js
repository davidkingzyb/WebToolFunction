/*
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
*/

function range(len) {
    var r = [];
    for (var i = 0; i < len; i++) {
        r.push(i);
    }
    return r;
}

//===============Array==================

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.random = function() {
    return this.sort(function() {
        return Math.random() >= 0.5
    })
}

Array.prototype.clone = function() {
    var r = [];
    for (var i = 0; i < this.length; i++) {
        var t = this[i].type();
        if (t === 'array' || t === 'object' || t === 'function') {
            r[i] = this[i].clone();
        } else {
            r[i] = this[i];
        }
    }
    return r;
}

Array.prototype.copy = function() {
    return this.slice(0);
}

Array.prototype.binarySearch = function(key, low, high) {
    var l = low || 0;
    var h = high || this.length;
    if (l > h)
        return -1;
    var mid = parseInt((h + l) / 2);
    if (this[mid] > key)
        return this.binarySearch(key, l, mid - 1);
    if (this[mid] < key)
        return this.binarySearch(key, mid + 1, h);
    return mid;
};

Array.prototype.quickSort = function() {
    var len = this.length;
    if (len <= 1)
        return this.slice(0);
    var left = [];
    var right = [];
    var mid = [this[0]];
    for (var i = 1; i < len; i++)
        if (this[i] < mid[0])
            left.push(this[i]);
        else
            right.push(this[i]);
    return left.quickSort().concat(mid.concat(right.quickSort()));
};

Array.prototype.heapSort = function() {
    var arr = this.slice(0);

    function swap(i, j) {
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

    function maxHeapify(start, end) {
        var dad = start;
        var son = dad * 2 + 1;
        if (son >= end)
            return;
        if (son + 1 < end && arr[son] < arr[son + 1])
            son++;
        if (arr[dad] <= arr[son]) {
            swap(dad, son);
            maxHeapify(son, end);
        }
    }

    var len = arr.length;
    for (var i = Math.floor(len / 2) - 1; i >= 0; i--)
        maxHeapify(i, len);
    for (var i = len - 1; i > 0; i--) {
        swap(0, i);
        maxHeapify(0, i);
    }

    return arr;
};

Array.prototype.mergeSort = function() {
    var merge = function(left, right) {
        var final = [];
        while (left.length && right.length)
            final.push(left[0] <= right[0] ? left.shift() : right.shift());
        return final.concat(left.concat(right));
    };
    var len = this.length;
    if (len < 2) return this;
    var mid = len / 2;
    return merge(this.slice(0, parseInt(mid)).mergeSort(), this.slice(parseInt(mid)).mergeSort());
};

Array.prototype.unique=function(){
    var r=[],o={};
    for(var i=0;i<this.length;i++){
        if(!o[this[i]]){
            r.push(this[i]);
            o[this[i]]=1;
        }
    }
    return r;
}

Array.prototype.reduceDimension=function(){
    var r=[];
    return Array.prototype.concat.apply(r,this);
}

//=============Object=====================

Object.prototype.copy = function() {
    var that=this;
    for(var i=0;i<that.length;i++){
        if(that[i].type()==='array'){
            that=that.slice(0,i).concat(that[i],that.slice(i+1));
            i--;
        }
    }
}

Object.prototype.clone = function() {
    var r = {};
    for (var i in this) {
        var t = this[i].type();
        if (t === 'array' || t === 'object' || t==='function') {
            r[i] = this[i].clone();
        } else {
            r[i] = this[i];
        }
    }
    return r;
}

Object.prototype.type = function() {
    var typedict = {};
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e, i) {
        typedict["[object " + e + "]"] = e.toLowerCase();
    });
    if (this == null) {
        return String(this);
    }
    return typeof this === "object" || typeof this === "function" ?
        typedict[typedict.toString.call(this)] || "object" :
        typeof this;
}

Object.prototype.concat=function(o){
    for(var k in o){
        this[k]=o[k];
    }
    return this;
}

//=============Function=================

Function.prototype.clone=function(){
    var that=this;
    var r=function(){
        return that.apply(this,arguments);
    };
    for(var i in this){
        r[i]=this[i];
    }
    return r;
}
