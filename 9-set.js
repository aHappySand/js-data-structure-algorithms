var tool = require('./tool.js'),
print = tool.print;
/**
 * 集合是由一组无序但彼此之间又有一定相关性的成员构成的，每个成员在集合中只出现一次。
 对集合的基本操作有下面几种。
• 并集
    将两个集合中的成员进行合并，得到一个新集合。
• 交集
    两个集合中共同存在的成员组成一个新的集合。
• 补集
    属于一个集合而不属于另一个集合的成员组成的集合。
 */
function Set(){
    this.dataStore = [];//存储数据

    this.contain = function(data){
        return this.dataStore.indexOf(data) != -1;
    }
    //添加
    this.add = function(data){
        if(this.contain(data)){
            
        }else{
            this.dataStore.push(data);
        }
        return this;
    };

    this.get = function(key){
        return this.dataStore[key];
    }

    this.addArr = function(arr){
        for(var i = 0, len = arr.length; i < len; i++){
            this.add(arr[i]);
        }
        return this;
    }
    // 移除
    this.remove = function(data){
        var pos = this.dataStore.indexOf(data);
        if(pos > -1){
            this.dataStore.splice(pos, 1);
            return true;
        }else{
            return false;
        }
    };
    // 大小
    this.size = function(){
        return this.dataStore.length;
    };
    // 并集
    this.union = function(set2){
        var tempSet = new Set();
        for(var i = 0, len = this.size(); i < len; i++){
            tempSet.add(this.dataStore[i]);
        }
        for(var j = 0, len = set2.size(); j < len; j++){
            tempSet.add(set2.get(j));
        }
        return tempSet;
    };
    // 差集
    this.differnce = function(set2){
        var tempSet = new Set();
        for(var i = 0, len = this.size(); i < len; i++){
            if(!set2.contain(this.dataStore[i])){
                tempSet.add(this.dataStore[i]);
            }
        }

        for(var i = 0, len = set2.size(); i < len; i++){
            if(!this.contain(set2.get(i))){
                tempSet.add(set2.get(i));
            }
        }
        return tempSet;
    };
    // 交集
    this.intersect = function(set2){
        var tempSet = new Set();
        var minSet,//集合较小的 
            maxSet;//集合较大的
        if(this.size() > set2.size()){
            minSet = set2;
            maxSet = this;
        }else{
            minSet = this;
            maxSet = set2;
        }
        for(var i = 0, len = minSet.size(); i < len; i++){
            if(maxSet.contain(minSet.get(i))){
                tempSet.add(minSet.get(i));
            }
        }
        return tempSet;
    };

    //是否为子集
    this.intersect = function(set2){
        var minSet,//集合较小的 
            maxSet;//集合较大的
        if(this.size() > set2.size()){
            minSet = set2;
            maxSet = this;
        }else{
            minSet = this;
            maxSet = set2;
        }
        for(var i = 0, len = minSet.size(); i < len; i++){
            if(!maxSet.contain(minSet.get(i))){
                return false;
            }
        }
        return true;
    };
    this.toString = function(){
        return this.dataStore;
    };
}

var set1 = new Set();
set1.addArr([2, 4, 6, 2, 6, 8, 0, 5]);
print(set1.toString()); //[ 2, 4, 6, 8, 0, 5 ]


var set2 = new Set();
set2.addArr([2, 4, 7, 2, 6, 9, 0, 5]);
print(set2.toString()); //[ 2, 4, 7, 6, 9, 0, 5 ]

print(set1.union(set2).toString());//[ 2, 4, 6, 8, 0, 5, 7, 9 ]

print(set1.differnce(set2).toString());//[ 8, 7, 9 ]

print(set1.intersect(set2).toString());//[ 2, 4, 6, 0, 5 ]