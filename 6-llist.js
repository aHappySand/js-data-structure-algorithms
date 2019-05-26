var tool = require('./tool.js'),
print = tool.print;

/**
 * Node类
 * element 保存节点数据
 * next 指向下一个节点
 */
function Node(element){
    this.element = element;
    this.next = null;
}
/**
 * LinkedList类
 * 
 */

function LList(){
    this.head = new Node('head');

    this.last = last;//尾节点
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
    this.findPrevious = findPrevious;//找到前一个节点
}

function last(){
    var lastNode = this.head;
    while(lastNode.next){
        lastNode = lastNode.next;
    }
    return lastNode;
}

function findPrevious(item){
    var currNode = this.head;
    while(currNode.next && currNode.next.element != item){
        currNode = currNode.next;
    }
    //找到了
    if(currNode.next){
        return currNode;
    }
    return false;
}

function find(element){
    var preNode = this.findPrevious(element);
    return preNode && preNode.next;
}

function insert(newElement, item){
    //创建新节点
    var newNode = new Node(newElement);
    if(item){
        //找到element为item的节点
        var itemNode = this.find(item);
        if(itemNode){
            //item的下一个节点
            var itemNext = itemNode.next;
            itemNode.next = newNode;
            newNode.next = itemNext;
            return this;
        }
    }else{//如果没有指定，那么在最后插入
        this.last().next = newNode;
        return this;
    }
    return false;
}


function remove(item){
    var preNode = this.findPrevious(item);
    if(preNode.next){
        preNode.next = preNode.next.next;
        return true;
    }
    return false;
}

function display(){
    var currNode = this.head.next;
    while(currNode){
        print(currNode.element);
        currNode = currNode.next;
    }
    return this;
}

var cities = new LList();
cities.insert('Conway')
    .insert('Russellvile')
    .insert('Alma')
    .insert('Conwaynext', 'Conway');
cities.display();
print(cities.find('Alma'));
cities.remove('Russellvile');
cities.display();


//----------双向链表--------------------
/**
 * DNode类
 * element 保存节点数据
 * next 指向下一个节点
 * prev 指向前一个节点
 */
function DNode(element){
    this.element = element;
    this.next = null;
    this.prev = null;
}

function DLink(){
    this.head = new DNode('head');

    this.last = last;//尾节点
    this.find = find;
    
    this.insert = function(newElement, item){
        //创建新节点
        var newNode = new DNode(newElement);
        if(item){
            //找到element为item的节点
            var itemNode = this.find(item);
            if(itemNode){
                //item的下一个节点
                var itemNext = itemNode.next;
                
                itemNode.next = newNode;
                newNode.prev = itemNode;
                newNode.next = itemNext;
                if(itemNext){
                    itemNext.prev = newNode;
                }
                return this;
            }
        }else{//如果没有指定，那么在最后插入
            var lastNode = this.last();
            lastNode.next = newNode;
            newNode.prev = lastNode;
            return this;
        }
        return false;
    };
    this.remove = function(item){
        var preNode = this.findPrevious(item);
        var curNode = preNode.next;
        if(curNode){
            var next = curNode.next;
            preNode.next = next;
            if(next){
                next.prev = preNode;
            }
            return true;
        }
        return false;
    };
    this.display = display;
    this.findPrevious = findPrevious;//找到前一个节点
}

var dlink = new DLink();
dlink.insert('1')
    .insert('2')
    .insert('3')
    .insert('4', '2');
dlink.display();
print(dlink.find('2'));
dlink.remove('3');
dlink.display();

//------------------循环列表-----------------------------
var LoopLink = function(){
    this.head = new Node('head');
    this.head.next = this.head;

    this.findPrevious = function(item){
        var currNode = this.head, 
            next = currNode.next;
        while(next && next.element != item && next.element != 'head'){
            currNode = currNode.next;
            next = currNode.next;
        }
        //找到了
        if(currNode.next.element == item && item != 'head'){
            return currNode;
        }
        return false;
    }
    this.find = find;

    this.last = function(){
        var lastNode = this.head;
        while(lastNode.next.element != 'head'){
            lastNode = lastNode.next;
        }
        return lastNode;
    }

    this.insert = function(newElement, item){
        //创建新节点
        var newNode = new Node(newElement);
        if(item){
            //找到element为item的节点
            var itemNode = this.find(item);
            if(itemNode){
                //item的下一个节点
                var itemNext = itemNode.next;
                itemNode.next = newNode;
                newNode.next = itemNext;
                return this;
            }
        }else{//如果没有指定，那么在最后插入
            this.last().next = newNode;
            newNode.next = this.head;
            return this;
        }
        return false;
    }
    this.display = function(){
        var curNode = this.head.next;
        while(curNode.element != 'head'){
            print(curNode.element);
            curNode = curNode.next;
        }
    }
    this.remove = remove;
};

var ll = new LoopLink();
ll.insert('1')
    .insert('2')
    .insert('3')
    .insert('4', '2');
ll.display();
print(ll.last());

//将n 个人围成一圈，并且第m 个人会被杀掉，计算
// 一圈人中哪两个人最后会存活
function kill(n, m){
    var ll = new LoopLink();
    for(var i = 1; i <= n; i++){
        ll.insert(i);
    }
    var index = 1;
    var curr = ll.find(1);//第一个人
    var nextTemp = curr.next;//下一个人
    while(true){
        curr = curr.next.element == 'head' ? curr.next.next : curr.next;
        index++;
        if(index == m){//数到了m就删除
            index = 1;
            n--;
            nextTemp = curr.next.element == 'head' ? curr.next.next : curr.next;
            ll.remove(curr.element);
            curr = nextTemp;
        }
        if(n == 2){
            break;
        }
    }
    ll.display();
}
kill(41, 3);