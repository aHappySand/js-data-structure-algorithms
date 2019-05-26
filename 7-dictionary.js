var tool = require('./tool.js'),
print = tool.print;

/**
 * Dictionary 类
 */
function Dictionary(){
    this.dataStore = new Array();

    this.add = function(key, value){
        this.dataStore[key] = value;
        return this;
    };

    this.find = function(key){
        return this.dataStore[key];
    };

    this.remove = function(key){
        delete this.dataStore[key];
        return this;
    };

    this.toString = function(){
        return this.dataStore;
    };

    this.show = function(){
        for(var k in this.dataStore){
            print(k + '=> ' + this.dataStore[k]);
        }
        return this;
    };

    this.length = function(){
        return Object.keys(this.dataStore).length;
    };

    this.clear = function(){
        delete this.dataStore;
        this.dataStore = new Array();
        return this;
    };

    var clone = function (){
        var arr = new Array();
        for(var k in this.dataStore){
            arr[k] = this.dataStore[k];
        }
        return arr;
    };

    this.sort = function(){
        var tep = this.dataStore;
        this.dataStore = new Array();
        var keys = Object.keys(tep).sort();
        for(var key in keys){
            this.dataStore[keys[key]] = tep[keys[key]];
        }
        return this;
    }
}

var dic = new Dictionary();
dic.add('c', '7');
print(dic.find('3'));

dic.add('a', '2')
    .add('b', '5');
print(dic.length());

dic.show();

dic.sort();

dic.show();


dic.clear().add('k', 'y');
dic.show();

var arr = new Array();
arr[4] = 'key'; //这个地方实例化了arr的大小
print(arr.length);