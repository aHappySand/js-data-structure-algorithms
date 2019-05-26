var tool = require('./tool.js'),
print = tool.print;

/**
 * 队列是一种列表，不同的是队列只能在队尾插入元素，在队首删除元素。
 * FIFO
 * enqueue；入队
 * dequeue: 出队
 * front: 队首
 * back: 队尾
 * toString: 容器
 * empty: 是否为空
 * clear: 清空队列
 */
var Queue = function(){
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
    this.length = length;

    this.dequeue2 = dequeue2;
};

function enqueue(element){
    this.dataStore.push(element);
}
function dequeue(){//删除队首
    return this.dataStore.shift();
}


function front(){
    return this.dataStore[0];
}

function length(){
    return this.dataStore.length;
}
function back(){
    return this.dataStore[this.length() -1];
}
function toString(){
    return this.dataStore.join('\n');
}
function empty(){
    return this.length() == 0;
}
function clear(){
    this.dataStore = [];
}

var q = new Queue();
for(var i = 1; i < 8; i++){
    q.enqueue(i);
}
q.dequeue();
print(q.toString());

/**
 * 舞者
 */
function Dancer(name, sex){
    this.name = name;
    this.sex = sex;
}

function getDancers(males, females){
    var fs = require("fs");
    // 同步读取
    var data = fs.readFileSync('dancer.txt').toString().split('\r\n');
    data.forEach(function(da){
        var dancer = da.split(' ');
        var sex = dancer[0],//性别
            name = dancer.slice(1).join(' ').trim();
        if(dancer[0] == 'F'){
            females.enqueue(new Dancer(name, sex));
        }else{
            males.enqueue(new Dancer(name, sex));
        }
    });
}

function dance(males, females){
    while(!males.empty() && !females.empty()){
        var m = males.dequeue(),
            f = females.dequeue();
        print(m.name, ' and ', f.name);

    }
}


var maleDancer = new Queue();
var femaleDancer = new Queue();
getDancers(maleDancer, femaleDancer);
dance(maleDancer, femaleDancer);

if(!maleDancer.empty()){
    print(maleDancer.front().name+' waiting...');
}

if(!femaleDancer.empty()){
    print(femaleDancer.front().name+' waiting...');
}


//--------------优先队列--------------------------
/**
 * name 姓名
 * code 优先级
 */
function Patient(name, code){
    this.name = name;
    this.code = code;
}

function dequeue2(){
    var index = 0,
        priority = this.dataStore[0].code;
    for(var i = 1, len = this.dataStore.length(); i < len; i++){
        if(tihs.dataStore[i].code > priority){
            priority = this.dataStore[i].code;
            index = i;
        }
    }
    return this.dataStore.splice(index, 1);
}

function createDeque(){
    /**
     * 双向列表
     */
    function Deque(){
        this.dataStore = [];

        this.push = push;//从尾添加
        this.pop = pop;//从尾删除
        this.unshift = unshift;//从头添加
        this.shift = shift;//从头删除
        this.toString = toString;
        this.length = length;
    }

    function push(element){
        this.dataStore.push(element);
        return this;
    }

    function pop(){
        return this.dataStore.pop();
    }
    function unshift(element){
        // this.dataStore.splice(0, 0, element);
        this.dataStore.unshift(element);
        return this;
    }
    function shift(){
        return this.dataStore.shift();
    }

    function toString(){
        return this.dataStore;
    }
    function length(){
        return this.dataStore.length;
    }
    return new Deque;
}
var d = createDeque();
print(d.push('11').unshift('22').toString());

var dstr = createDeque();
var str = "abscddcsbs a";
for(var i = 0, len = str.length; i < len; i++){
    dstr.push(str[i]);
}

for(var start = dstr.shift(), end = dstr.pop(); dstr.length() > 0 || start || end; start = dstr.shift(), end = dstr.pop()){
    print(start, '-', end)
    if(start != end){
        print('不是回文');
        break;
    }
}

