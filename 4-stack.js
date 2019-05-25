var tool = require('./tool.js'),
print = tool.print;

/**
 * 种后入先出（LIFO，last-in-first-out）的数据结构
 * push 从顶部压入栈
 * pop 从顶部弹出栈，并从栈中删除
 * peek 从顶部弹出栈，不从栈中删除

 * dataStore 保存栈内元素
 * top 栈顶位置
 */
 function Stack(){
    this.dataStore = [];
    this.top = 0;

    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.toString = toString;
    this.length = length;
    this.clear = clear;
 }

 function push(element){
    this.dataStore[this.top++] = element;
 }
 function pop(){
    return this.dataStore.splice(--this.top);
 }
 function peek(){
    return this.dataStore[this.top-1];
 }

 function toString(){
    return this.dataStore;
 }

 function length(){
    return this.top;
 }

 function clear(){
    delete this.dataStore;
    this.dataStore = [];
    this.top = 0;
 }

 var stack = new Stack();
 stack.push(111);
 stack.push('可以');
 print(stack.pop());
 print(stack.toString());


 /**
  * 将数字n 转换为以 b为基数的数字
  * 适合 2~9 的基数

  1) 最高位 n % b, 压入栈
  2）n=n/b 取整;
  3) 重复1)2)，直到n=0,且没有余数
  4）持续将栈内元素弹出，直到栈为空，然后依次将这些元素排列
  */
function mulBase(num, base){
    var st = new Stack();
    do{
        st.push(num % base);
        num = Math.floor(num / base);
    }while(num > 0)
    return st.toString().reverse().join("");
}

print(mulBase(32, 2));
print(mulBase(125, 8));


// 回文是指这样一种现象：一个单词、短语或数字，从前往后写和从后往前写都是一样的