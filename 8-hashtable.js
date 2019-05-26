var tool = require('./tool.js'),
print = tool.print;

/**
* 散列是一种常用的数据存储技术，散列后的数据可以快速地插入或取用。散列使用的数据
    结构叫做散列表，也叫hash表

 * HashTable类
 * 
 */
function HashTable(){
    //要求数组长度为质数
    this.table = new Array(137);

    //简单Hash函数
    this.simpleHash = function(data){
        var total = 0;
        for(var i = 0; i < data.length; i++){
            total += data.charCodeAt(i) + i;
        }
        return total % this.table.length;
    };

    //霍纳算法 hash函数，更好的处理碰撞，数据也更均匀
    this.betterHash = function(data){
        const H = 37;
        var total = 0;
        for(var i = 0; i < data.length; i++){
            total += H * total + data[i].charCodeAt() + i;
        }
        return total % this.table.length;
    }

    this.showDistro = function(){
        for(var i = 0, len = this.table.length; i < len; i++){
            if(this.table[i] != undefined){
                print(i + " => " + this.table[i]);
            }
        }
    };

    this.put = function(key, data){
        // var hashKey = this.simpleHash(key);
        var hashKey = this.betterHash(key);
        this.table[hashKey] = data;
    };

    this.get = function(key){
        return this.table[this.betterHash(key)];
    };
}

var names = ["David", "Jennifer", "Donnie", "Raymond",
"Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
var hashtable = new HashTable();
for(var i = 0, len = names.length; i < len; i++){
    hashtable.put(names[i]);
}
//9个值，显示的只有8个
hashtable.showDistro();


/**
 * 产生范围内的随机数
 */
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function genStuData(arr){
    for(var i = 0; i < arr.length; ++i){
        var num = '';
        for(var j = 1; j <= 9; j++){
            num += Math.floor(Math.random() * 10);
        }
        num += getRandomInt(50, 100);
        arr[i] = num;
    }
}

var numStudents = 10;
var arrSize = 97;
var idLen = 9;
var students = new Array(numStudents);
genStuData(students);

var hTable = new HashTable();
for(var i = 0; i < numStudents; i++){
    print(students[i].substring(0, 9) + " " + students[i].substring(9));
    hTable.put(students[i]);
}
hTable.showDistro();

/**
 * 开链法处理碰撞的hashtable
 */
function LinkHashTable(){
    this.table = new Array(137);


    //简单Hash函数
    this.simpleHash = function(data){
        var total = 0;
        for(var i = 0; i < data.length; i++){
            total += data.charCodeAt(i) + i;
        }
        return total % this.table.length;
    };

    this.betterHash = function(data){
        var num = 0;
        const H = 37
        for(var i = 0, len = data.length; i < len; i++){
            num += H * num + data[i].charCodeAt();
        }
        return num % this.table.length;
    };

    this.put = function(key, data){
        var hashKey = this.simpleHash(key);
        var index = 0;

        //第一次添加
        if(this.table[hashKey] == undefined){
            this.table[hashKey] = new Array();
            this.table[hashKey][index++] = key;
            this.table[hashKey][index] = data;

        }else{//产生了碰撞
            ++index;
            while(this.table[hashKey][index] != undefined){
                ++index;
            }
            this.table[hashKey][index++] = key;
            this.table[hashKey][index] = data;
        }
    };

    this.get = function(key){
        var hashKey = this.simpleHash(key);
        if(this.table[hashKey] != undefined){
            var index = 0;
            while(this.table[hashKey][index] && this.table[hashKey][index] != key){
                index += 2;
            }
            if(this.table[hashKey][index]){
                return this.table[hashKey][index+1];
            }
        }
        return null;
    }

    this.showDistro = function(){
        for(var i = 0, ilen = this.table.length; i < ilen; i++){
            if(this.table[i] != undefined){
                for(var j = 0, jlen = this.table[i].length; j < jlen; j+=2){
                    print(i + "-"+ this.table[i][j] +" => " + this.table[i][j+1]);
                }
            }
        }
    };
}


var names = ["David", "Jennifer", "Donnie", "Raymond",
"Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
var hashtable = new LinkHashTable();
for(var i = 0, len = names.length; i < len; i++){
    hashtable.put(names[i], names[i]);
}

//9个值，显示的只有8个
hashtable.showDistro();

print(hashtable.get("Donnie"));


/**
 * 线性探测法处理碰撞的hashtable

 当存储数据使用的数组特别大时，选择线性探测法要比开链法好。这里有一个公式，常常
可以帮助我们选择使用哪种碰撞解决办法：如果数组的大小是待存储数据个数的1.5 倍，
那么使用开链法；如果数组的大小是待存储数据的两倍及两倍以上时，那么使用线性探
测法。
 */
function LinearHashTable(){
    this.table = new Array(137);
    this.values = [];

    //简单Hash函数
    this.simpleHash = function(data){
        var total = 0;
        for(var i = 0; i < data.length; i++){
            total += data.charCodeAt(i) + i;
        }
        return total % this.table.length;
    };

    this.betterHash = function(data){
        var num = 0;
        const H = 37
        for(var i = 0, len = data.length; i < len; i++){
            num += H * num + data[i].charCodeAt();
        }
        return num % this.table.length;
    };

    this.put = function(key, data){
        var hashKey = this.simpleHash(key);
        //第一次添加
        if(this.table[hashKey] == undefined){
            this.table[hashKey] = key;
            this.values[hashKey] = data;

        }else{//产生了碰撞
            hashKey++;
            while(this.table[hashKey] != undefined){
                ++hashKey;
            }
            this.table[hashKey] = key;
            this.values[hashKey] = data;
        }
    };

    this.get = function(key){
        var hashKey = this.simpleHash(key);
        if(this.table[hashKey] != undefined){
            while(this.table[hashKey] && this.table[hashKey] != key){
                hashKey++;
            }
            if(this.table[hashKey] == key){
                return this.values[hashKey];
            }
        }
        return null;
    }

    this.showDistro = function(){
        for(var i = 0, ilen = this.table.length; i < ilen; i++){
            if(this.table[i] != undefined){
                print(i + "-"+ this.table[i] +" => " + this.values[i]);
            }
        }
    };
}


var names = ["David", "Jennifer", "Donnie", "Raymond",
"Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
var hashtable = new LinearHashTable();
for(var i = 0, len = names.length; i < len; i++){
    hashtable.put(names[i], names[i]);
}

//9个值，显示的只有8个
hashtable.showDistro();

print(hashtable.get("Donnie"));
