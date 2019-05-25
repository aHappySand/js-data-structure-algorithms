var tool = require('./tool.js'),
print = tool.print;

var num = [1, 5,2, 6, 8,4, 2];
print(num.length);
print(Array.isArray(num));
/*浅复制*/
// 当把一个数组赋给另外一个数组时，只是为被赋值的数组增加了一个新的引用
// 当你通过原引用修改了数组的值，另外一个引用也会感知到这个变化
var newNum = num;
print(newNum[0]);//1
num[0] = 9;
print(newNum[0]);//9


function copy(arr1, arr2){
    for(var i = 0, len = arr1.length; i < len; i++){
        arr2[i] = arr1[i];
    }
}

var arr2 = [];
copy(num, arr2);
num[0] = 10;
print(arr2[0]);//9


print(num.indexOf(2));//2 第一个匹配元素的位置
print(num.lastIndexOf(2));//6 最后一个匹配元素的位置


var cisDept = ["Mike", "Clayton"];
var dmpDept = ["Jone",'Mike'];
print(cisDept.concat(dmpDept));//[ 'Mike', 'Clayton', 'Jone', 'Mike' ]
print(dmpDept.concat(cisDept));//[ 'Jone', 'Mike', 'Mike', 'Clayton' ]

var arr3 = [2, 4, 6, 1,7,4,10,8];
/**
 *截取数组，改变原数组
 * splice(索引，长度) 
 */
var spl = arr3.splice(3, 3);
print(spl); //[ 1, 7, 4 ]
print(arr3);//[ 2, 4, 6, 10, 8 ]

/**
 * 插入元素
 * splice(索引，0, 元素[,元素..]) 
 */
var nspl = spl.splice(1, 0, '可以');
print(nspl);//[]
print(spl); //[ 1, '可以', 7, 4 ]

var nspl = spl.splice(0, 0, '头');
print(spl);//[ '头', 1, '可以', 7, 4 ]

/**
 * 替换元素，返回替换处的元素
 * splice(索引，1, 元素) 
 */
var nspl = spl.splice(2, 1, '不可以');
print(nspl);//[ '可以' ]
print(spl); //[ '头', 1, '不可以', 7, 4 ]
// 更多用法见：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice


//----------------------------------------

var nums = [1, 2, 3, 4, 5];
nums.reverse();
print(nums);//[ 5, 4, 3, 2, 1 ]

var names = ["David", "Mike", "Cynthia", "Bryan"];
names.sort();
print(names);// [ 'Bryan', 'Cynthia', 'David', 'Mike' ]

var nums = [3, 2, 1, 100, 4, 200];
nums.sort();
print(nums);//[ 1, 100, 2, 200, 3, 4 ]
// sort() 方法是按照字典顺序对元素进行排序的，因此它假定元素都是字符串类型

nums.sort(function(a, b){
    return a - b;
});
print(nums);//[ 1, 2, 3, 4, 100, 200 ]


//-------------迭代器----------------
function square(num){
    print(num, num * num);
}
var nums = [1, 2, 3, 4, 5, 6];
print(nums.forEach(square));//undefined


//迭代器方法是every()，该方法接受一个返回值为布尔类型的函数，对数组中的每
// 个元素使用该函数。如果对于所有的元素，该函数均返回true，则该方法返回true

var nums = [2, 4, 6, 8];
var even = nums.every(function(n){
    return n % 2 == 0;
});
print(even);//true


nums.push(7);
var even2 = nums.every(function(n){
    return n % 2 == 0;
});
print(even2);//false


//reduce() 方法接受一个函数，返回一个值。该方法会从一个累加值开始，不断对累加值和
// 数组中的后续元素调用该函数，直到数组中的最后一个元素，最后返回得到的累加值
var num = [1, 2, 3, 4, 5, 6];
var sum = num.reduce(function(runningTotal, currentValue){
    return runningTotal + currentValue;
});
print(sum);//21


var words = ["for", "your", "information"];
var first = words.map(function(w){
    return w[0].toUpperCase();
});
print(first);//[ 'F', 'Y', 'I' ]


var nums  = [];
for(var i = 0; i < 10; i++){
    nums.push(i + 1);
}
var even = nums.filter(function(n){ return n % 2 == 0; });
print(even);// [ 2, 4, 6, 8, 10 ]
var odd = nums.filter(function(n){ return n % 2 != 0; });
print(odd);//[ 1, 3, 5, 7, 9 ]

Array.matrix = function(row, col, initial){
    var arr = [];
    for(var i = 0; i < row; i++){
        var cols = [];
        for(var j = 0; j < col; j++){
            cols[j] = initial;
        }
        arr[i] = cols;
    }
    return arr;
}

var nums2 = Array.matrix(5, 5, 0);
print(nums2);
/*
[ [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0 ] ]
*/

