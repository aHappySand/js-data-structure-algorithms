var tool = require('./tool.js'),
print = tool.print;


// 当不需要在一个很长的序列中查找元素，
// 或者对其进行排序时，列表显得尤为有用。
// 反之，如果数据结构非常复杂，列表的作用就没有那么大了。

/**
listSize（属性） 列表的元素个数
pos（ 属性） 列表的当前位置
length（ 属性） 返回列表中元素的个数
clear（ 方法） 清空列表中的所有元素
toString（ 方法） 返回列表的字符串形式
getElement（ 方法） 返回当前位置的元素
insert（ 方法） 在现有元素后插入新元素
append（ 方法） 在列表的末尾添加新元素
remove（ 方法） 从列表中删除元素
front（ 方法） 将列表的当前位置设移动到第一个元素
end（ 方法） 将列表的当前位置移动到最后一个元素
prev（方法） 将当前位置后移一位
next（ 方法） 将当前位置前移一位
currPos（ 方法） 返回列表的当前位置
moveTo（方法） 将当前位置移动到指定位置
 */

function List(){
    this.listSize = 0;
    this.pos = 0;
    this.nextNum = 0;
    this.dataStore = [];//初始化一个空数组类保存列表元素

    this.clear = clear;
    this.find = find;
    this.toString = toString;
    this.insert = insert;
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.length = length;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
    this.contains = contains;
    this.nextNumber = nextNumber;
}
/**
 * 添加元素
 */
function append(element){
    this.dataStore[this.listSize++] = element;
}

function find(element){
    return this.dataStore.indexOf(element);
    for(var i = 0; i < this.listSize; i++){
        if(this.dataStore[i] == element){
            return i;
        }
    }
    return -1;
}

function remove(element){
    var findAt = this.find(element);
    if(findAt==-1){
        return false;
    }else{
        this.dataStore.splice(findAt, 1);
        this.listSize--;
        return true;
    }
}

function clear(){
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = 0;
    this.pos = 0;
}
function toString(){
    return this.dataStore;
}
function insert(element, after){
    var insertPos = this.find(after);
    if(insertPos>-1){
        this.dataStore.splice(insertPos + 1, 0, element);
        this.listSize++;
        return true;
    }
    return false;
}
function front(){
    this.pos = 0;
    this.nextNum = this.pos;
    return this.dataStore[this.pos];
}
function end(){
    this.pos = this.listSize-1;
    this.nextNum = this.pos;

    return this.dataStore[this.pos];
}
function prev(){
    if(this.pos != 0){
        this.pos--;
    }
    this.nextNum--;
    return this.dataStore[this.pos];
}
function next(){
    if(this.pos != this.listSize -1){
        this.pos++;
    }
    this.nextNum++;
    return this.dataStore[this.pos];
}
function length(){
    return this.listSize;
}
function currPos(){
    return this.pos;
}
function nextNumber(){
    return this.nextNum;
}
function moveTo(position){
    if(position > -1 && position < this.listSize){
        this.pos = position;
        return true;
    }
    return false;
}
function getElement(){
    return this.dataStore[this.pos];
}
function contains(element){
    return this.find(element) != -1;
}



var list = new List();
print(list.getElement());//undefined
list.append(1);

var p = {x: 1, y: 2};
list.append(p);
print(list.find(p));//1

list.append(3);
list.append('realy');

print(list.next());//{ x: 1, y: 2 }

list.next();
list.next();

print(list.getElement());//realy
print(list.currPos());//3

for(list.front(); list.nextNumber() < list.length(); list.next()){
    print(list.getElement());
    if(list.currPos() == list.length()){
        // break;
    }
}

var fs = require("fs");

// 异步读取
fs.readFile('films.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   // console.log("异步读取: " + data.toString());
});

// 同步读取
var data = fs.readFileSync('films.txt').toString().split('\r\n');
data = data.map(function(film){
    return film.trim();
});
// print(data);
var movieList = new List();
for(var i = 0, len = data.length; i<len; i++){
    movieList.append(data[i]);
}
print(movieList.toString());