var tool = require('./tool.js'),
print = tool.print;

/**
 * 二叉查找树 节点Node
 */
function Node(data, left, right){
    this.data = data;
    this.left = left;
    this.right = right;
    this.count = 1;

    this.show = function(){
        return this.data;
    };
}

function BST(){
    this.root = null;//根节点

    this.count = 0;//节点个数

    /**
     * 1) 判断是否有根节点，如果没有设置为当前节点
     * 2）判断待插入节点 与 当前节点的大小，如果待插入节点数据小于当前节点，则设置当前节点的左节点为新的当前节点；反之，执行第4）步
     * 3）如果当前节点的左节点为空，就将待插入的节点插入到这个位置，退出循环；反之，继续下一次循环
     * 4）则设置当前节点的右节点为新的当前节点
     * 5）如果当前节点的右节点为空，就将待插入的节点插入到这个位置，退出循环；反之，继续循环
     */
    this.insert = function(data){
        this.count++;
        var newNode = new Node(data);
        if(!this.root){
            this.root = newNode;
        }else{
            var currNode = this.root;
            var parent;//当前节点的父节点
            while(true){
                parent = currNode;
                if(data < currNode.data){//待查入节点小于当前节点
                    currNode = currNode.left;
                    if(!currNode){
                        parent.left = newNode;
                        break;
                    }
                }else if(data > currNode.data){
                    currNode = currNode.right;
                    if(!currNode){
                        parent.right = newNode;
                        break;
                    }
                }else{
                    currNode.count++;
                    break;
                }
            }
        }
        return this;
    }

    this.nodeCount = function(){
        return countChild(this.root) + (this.root ? 1 : 0);
    }
    //左节点的个数
    this.nodeLeftCount = function(){
        return countChild(this.root.left);
    }

    var countChild = function(node){
        var count = 0;
        if(node){
            var queue = [];
            queue.push(node);
            while(queue.length){
                count++;
                var temp = queue.shift();
                if(temp.left){
                    queue.push(temp.left);
                }
                if(temp.right){
                    queue.push(temp.right);
                }
            }
            count--;
        }
        return count;
    }


    this.heightArr = function(){
        function PrintFromTopToBottom(root)
        {
            var maxH = 10;
            // write code here
            var queue = [];//队列
            queue.push({node: root, height: 0});
            var result = new Array();//存放打印结果
            
            if(root == null){
                return result;
            }
            var blank = "";
            while(queue.length){//只要没遍历完，就一直会每次运行完下面代码队列都不为空
            //注意这里写法，不能直接写为queue，必须是它的长度不为0
                var temp = queue.shift();//最先的那个数出队列
                var node = temp.node;
                if(!result[temp.height]){
                    result[temp.height] = [];
                }
                result[temp.height].push(node);//将出队列的这个数的数值push到结果中

                if(node.left){
                    queue.push({node: node.left, height: (temp.height + 1)});
                }
                if(node.right){
                    queue.push({node: node.right, height: (temp.height + 1)});
                }
            }
            return result;
        }
        return PrintFromTopToBottom(this.root);
    };

    this.display = function(){
        var result = this.heightArr();
        var ino = this.inOrder();

        var node, 
            blank = '',
            str = '';
        for(var i = 0, height = result.length; i < height; i++){//循环高度
            for(var j = 0, her = result[i].length; j < her; j++){//循环层
                node = result[i][j];
                var leftCount = ino.indexOf(node.data);
                if(j > 0){
                    leftCount -= ino.indexOf(result[i][j-1].data);
                }
                blank = '';
                for(var l = 0; l < leftCount; l++){
                    blank += '---';
                }
                str += blank + node.data;
            }
            str += '\n';
        }
        return str;
    }
    //中序遍历
    this.inOrder = function(){
        var result = [];
        function order(node){
            if(node){
                order(node.left);
                result.push(node.data);
                order(node.right);
            }
        }
        order(this.root);
        return result;
    };
    //前序遍历
    this.preOrder = function(){
        var result = [];
        function order(node){
            if(node){
                result.push(node.data);
                order(node.left);
                order(node.right);
            }
        }
        order(this.root);
        return result;
    }
    //后序遍历
    this.postOrder = function(){
        var result = [];
        function order(node){
            if(node){
                order(node.left);
                order(node.right);
                result.push(node.data);
            }
        }
        order(this.root);
        return result;
    };

    //水平遍历
    this.horizonOrder = function(){
        var node = this.root;
        var queue = [];//队列
        queue.push(node);
        var result = new Array();//存放打印结果

        while(queue.length){//只要没遍历完，就一直会每次运行完下面代码队列都不为空
        //注意这里写法，不能直接写为queue，必须是它的长度不为0
            node = queue.shift();//最先的那个数出队列
            result.push(node.data);//将出队列的这个数的数值push到结果中
            if(node.left){
                queue.push(node.left);
            }
            if(node.right){
                queue.push(node.right);
            }
        }
        return result;
    };

    this.getMin = function(node){
        node = node || this.root;
        if(node){
            while(node.left){
                node = node.left;
            }
            return node.data;
        }
        return null;
    };

    this.getMax = function(node){
        node = node || this.root;
        if(node){
            while(node.right){
                node = node.right;
            }
            return node.data;
        }
        return null;
    };

    this.find = function(data){
        var node = this.root;
        while(node){
            if(node.data > data){
                node = node.left;
            }else if(node.data < data){
                node = node.right;
            }else{
                return node;                
            }
        }
        return false;
    };

    //删除元素，从左子树上找最大的元素替换要删除的元素
    this.delete = function(data){
        var node = this.root;
        var preNode, //父节点
            maxNode,//左子树最大的元素
            preMaxNode;//左子树最大元素的父节点

        function getLeftMaxNode(delNode){
            while(delNode.right){
                preMaxNode = delNode;
                delNode = delNode.right;
            }
            maxNode = delNode;
        }
        var pos = '';
        while(node){
            if(node.data > data){
                preNode = node;
                node = node.left;
                pos = 'left';
            }else if(node.data < data){
                preNode = node;
                node = node.right;
                pos = 'right';
            }else{
                //有左节点
                if(node.left){
                    getLeftMaxNode(node.left);
                    node.data = maxNode.data;
                    if(preMaxNode){
                        preMaxNode.right = null;
                    }else{
                        node.left = null;
                    }
                }else if(node.right){//只有右节点
                    if(preNode){
                        preNode.right = node.right;
                    }
                }else{
                    //为左节点
                    if(pos == 'left'){
                        preNode.left = null;
                    }else{
                        preNode.right=null;
                    }
                }
                break;
            }
        }
        return false;
    }
}

var bst = new BST();
bst.insert(56)
    .insert(22)
    .insert(10)
    .insert(30)
    .insert(81)
    .insert(77)
    .insert(92)
    .insert(33)
    .insert(33);
print("前序",bst.preOrder());
print("中序",bst.inOrder());
print("后序",bst.postOrder());
print("水平",bst.horizonOrder());

print(bst.nodeCount());

print(bst.display());

print('max=', bst.getMax());
print('mim=', bst.getMin());
print('found 33：', bst.find(33));
print('found 34：', bst.find(34));

// bst.delete(22);
// print(bst.display());


// bst.delete(56);
// print(bst.display());

bst.delete(30);
print(bst.display());

// bst.delete(81);
// print(bst.display());