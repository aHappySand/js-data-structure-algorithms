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
    return this.dataStore.splice(--this.top)[0];
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

print('A'.charCodeAt());//65
print('Z'.charCodeAt());//90

print('a'.charCodeAt());//97
print('z'.charCodeAt());//122

print(String.fromCharCode('a'.charCodeAt()));
print('0'.charCodeAt());//48
print('9'.charCodeAt());//57

// 回文是指这样一种现象：一个单词、短语或数字，从前往后写和从后往前写都是一样的
function isPalindrome(word, _boolAllword){
  var s = new Stack();
  var nw = '';
  /*
  for(var i = 0, len = word.length; i < len; i++){
    if(_boolAllword){//只包含数字，单词
      var asi = word[i].charCodeAt();
      if(asi < 91 && asi > 64 || asi < 123 && asi > 96 || asi < 58 && asi > 47){
        nw += word[i];
        s.push(word[i]);
      }
    }else{
      s.push(word[i]);
    }
  }
  */
  if(_boolAllword){//只包含数字，单词
    for(var i = 0, len = word.length; i < len; i++){
      var asi = word[i].charCodeAt();
      if(asi < 91 && asi > 64 || asi < 123 && asi > 96 || asi < 58 && asi > 47){
        nw += word[i];
        s.push(word[i]);
      }
    }
  }else{
    for(var i = 0, len = word.length; i < len; i++){
      s.push(word[i]);
    }
  }

  if(!_boolAllword){
    nw = word;
  }
  var rword = '';
  while(s.length()>0){
    rword += s.pop();
  }
  return rword == nw;
}

print(isPalindrome('abc,dc ba'));//false
print(isPalindrome('abc,dc ba', true));//true


//----------------递归----------------------------

function factorial(n){
  if(n==1){
    return 1;
  }else{
    return n * factorial(n-1);
  }
}

function fact(n){
  var s = new Stack();
  while(n > 0){
    s.push(n--);
  }
  var c = 1;
  while(s.length() > 0){
    c *= s.pop();
  }
  return c;
}


//练习
/**
如何将中缀表达式转化成后缀表达式呢？
利用两个栈S1，S2：其中S1存放操作符，S2存放操作数
从左往右遍历中缀表达式，如果遇到数字，则放入S2中，
如果遇到操作符，则放入S1中，在放操作符的时候有一定的规则，
    如果栈为空或栈顶元素为（或(，则直接压栈;
    如果栈顶元素为普通操作符，则比较优先级，
        如果待压栈的操作符比栈顶操作符优先级高，则直接压栈，
        否则将S1中的栈顶元素出栈，并压入S2中，再接着比较S1栈顶元素的优先级。
    如果遇到)，则依次弹出S1栈顶的运算符，并压入S2，直到遇到左括号(为止，此时将这一对括号丢弃。
如果是(，也直接压栈;    
最后将S1中剩余的运算符依次弹出并压入S2，逆序输出S2（从栈底到栈顶）便得到了后缀表达式。
（注意：等号的优先级最低，因为要到最后才进行赋值操作）
*/

//将表达式字符串分割到栈中，后缀表达式
function bds(cont){
  var czf = {'+':1, '-':1, '*':2, '/':2, '×':2 };//操作符权重
  var S1 = new Stack(),//存放操作符
    S2 = new Stack();//存放操作数

  var fh = ['+', '-', '*', '/', '×','(', ')', '{', '}'];//运算符
  var  num = '',//存连续数字
    s1Top;//S1栈顶的元素

  for(var i = 0, len = cont.length; i < len; i++){
    if(fh.indexOf(cont[i])>=0){//运算符
      if(num){
        S2.push(+num);
      }
      /*
      if(cont[i]=='×'){
        cont[i]='*';
        print(cont[i]);//打印出来竟然还是×
      }
      */
      //获取操作符栈顶元素
      if(cont[i] === ')'){//如果遇到)，则依次弹出S1栈顶的运算符，并压入S2，直到遇到左括号(为止
        s1Top = S1.pop();
        if(s1Top == '('){
          throw new Error('表达式有问题');
        }
        while(s1Top && s1Top != '('){
          if(s1Top=='×'){
            S2.push('*');
          }else{
            S2.push(s1Top);
          }
          s1Top = S1.pop();
        }
        if(s1Top != '('){
          throw new Error('表达式有问题');
        }
      }else{
        var s1Top = S1.peek();
        if(cont[i] == '(' || s1Top == '(' || s1Top==undefined){
          S1.push(cont[i]);
        }else if(czf[cont[i]] > czf[s1Top]){//待压栈的操作符比栈顶操作符优先级高，则直接压栈
          if(cont[i]=='×'){
            S1.push('*');
          }else{
            S1.push(cont[i]);
          }
        }else{
          //将S1中的栈顶元素出栈，并压入S2中，然后将当前符号压入S1
          S2.push(S1.pop());
          S1.push(cont[i]);
        }
      }
      num = '';
    }else if(cont[i]!=' '){//数字或.
      num += cont[i];
    }
  }
  if(num){
    S2.push(+num);
  }
  // 将S1中剩余的运算符依次弹出并压入S2
  while(s1Top = S1.pop()){
    if(s1Top == '('){
      throw new Error('表达式有问题');
    }
    S2.push(s1Top);
  }
  return S2;
}

//计算表达式的结果
function countBds(absStack){
  var nStack = new Stack();//反转absStack
  while(absStack.length() > 0){
    nStack.push(absStack.pop());
  }

  var cStack = new Stack(),//运算存储的Stack
  cur,//当前元素
  first, second,//cStack倒数2个数
  ysf = ['+', '-', '*', '/'];//运算符

  while(nStack.length() > 0){
    cur = nStack.pop();
    if(ysf.indexOf(cur)>-1){//当前元素为操作符，取出最后2个数作运算
      first = cStack.pop();
      second = cStack.pop();
      if(cur == '+'){
        cStack.push(second + first);
      }else if(cur == '-'){
        cStack.push(second - first);
      }else if(cur == '*'){
        cStack.push(second * first);
      }else if(cur == '/'){
        if(first!=0){
          cStack.push(second / first);
        }else{
          throw new Error('被除数不能为0');
        }
      }
    }else{
      cStack.push(cur);
    }
  }
  return cStack.pop();
}
var _bds = bds('(1.2+((2+3)×4)-5)/ 2');
print(_bds.toString());//[ '1.2', '2', '3', '+', '4', '*', '+', '5', '-' ]
print(countBds(_bds));//-16.2

print(bds('2.3 + 23 / 12 + (3.14159×0.24)').toString());
//[ '2.3', '+', '23', '/', '12', '+', '(', '3.14159', '*', '0.24' ]