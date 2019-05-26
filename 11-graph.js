var tool = require('./tool.js'),
print = tool.print;
/**
 * 图类
 */

//顶点
function Vertex(label){
    this.label = label;
    this.isVisited = false;//是否被访问过
}

//图
function Graph(v){
    this.vertices = v;//节点数
    this.edges = 0;//边数
    this.adj = [];//保存节点的关系
    this.marks = [];//保存标记过的

    this.edgeTo = [];//保存从一个顶点到下一个顶点的所有边

    for(var i = 0; i < v; i++){
        this.adj[i] = [];
        this.marks[i] = false;
    }

    this.initMarks = function(){
        this.marks = [];//保存标记过的
        for(var i = 0; i < this.vertices; i++){
            this.marks[i] = false;
        }
    };
    //添加边
    this.addEdge = function(v, w){
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.edges++;
    };

    this.showGraph = function(){
        var str = "";
        for(var i = 0; i < this.vertices; i++){
            str += i + "-> ";
            for(var j = 0; j < this.vertices; j++){
                if(this.adj[i][j] != undefined){
                    str += this.adj[i][j] + " ";
                }
            }
            str += "\n";
        }
        print(str);
    }
    /**
     * 深度优先搜索
     */
    this.dfs = function(vv){
        this.initMarks();
        var that = this;
        function _dfs(v){
            that.marks[v] = true;
            if(that.adj[v] != undefined){
                print("visited vertex: " + v);
            }
            for(var w = 0, len = that.adj[v].length; w < len; w++){
                if(!that.marks[that.adj[v][w]]){
                    _dfs(that.adj[v][w]);
                }
            }
        }
        _dfs(vv);
    }

    /**
     * 广度优先搜索
     */
    this.gfs = function(vv){
        var that = this;
        this.initMarks();

        /*
        第一种方法
        function _gfs(v){
            if(!that.marks[v]){
                that.marks[v] = true;
                console.log('visit : ' + v);
            }
            var temp = [];
            for(var w = 0, len = that.adj[v].length; w < len; w++){
                if(!that.marks[that.adj[v][w]]){
                    that.marks[that.adj[v][w]] = true;
                    temp.push(that.adj[v][w]);
                    console.log('visit : ' + that.adj[v][w]);
                }
            }
            for(var w = 0, len = temp.length; w < len; w++){
                var n = that.adj[temp[w]];
                for(var i = 0, il = n.length; i < il; i++){
                    if(!that.marks[n[i]]){
                        _gfs(n[i]);
                    }
                }
            }
        }
        _gfs(vv);
        */
        /*
        //第二种方法*/
        var queue = [];
        that.marks[vv] = true;
        queue.push(vv);
        console.log('visit:' + vv);
        while(queue.length){
            var v = queue.shift();//取出第一个元素
            for(var i = 0, len = that.adj[v].length; i < len; i++){
                if(!that.marks[that.adj[v][i]]){
                    that.marks[that.adj[v][i]] = true;
                    console.log('visit:' + that.adj[v][i]);
                    queue.push(that.adj[v][i]);
                }
            }
        }
        
    }

    /**
     * 广度优先搜索
     */
    this.gfsSearch = function(s){
        var queue = [];
        this.marks[s] = true;
        queue.push(s);
        console.log('visit2:' + s);
        while(queue.length){
            var v = queue.pop();
            for(var j = 0, len = this.adj[v].length; j < len; j++){
                var n = this.adj[v][j];
                if(!this.marks[n]){
                    this.edgeTo[n] = v;
                    this.marks[n] = true;
                    console.log('visit2:' + n);
                    queue.push(n);
                }
            }
        }
    }
    //用于展示图中连接到不同顶点的路径
    this.pathTo = function(s, v){
        if(!this.marks[v]){
            return undefined;
        }
        var path = [];
        for(var i = v; i != s; i = this.edgeTo[i]){
            path.push(i);
        }
        path.push(s);
        return path;
    }


    this.toString = function(){

    }

}

var graph = new Graph(5);
graph.addEdge(0, 3);
graph.addEdge(0, 4);
graph.addEdge(2, 4);
graph.addEdge(2, 3);
graph.addEdge(1, 4);

graph.showGraph();

// graph.dfs(0);
// graph.gfs(0);

graph.gfsSearch(2);

print(graph.edgeTo);

var path = graph.pathTo(2, 4);
print(path);


var g2 = new Graph(7);
g2.addEdge(0, 1);
g2.addEdge(0, 2);
g2.addEdge(0, 5);
g2.addEdge(0, 6);

g2.addEdge(3, 5);
g2.addEdge(3, 4);

g2.addEdge(4, 6);

g2.showGraph();

g2.gfsSearch(0);
for(var j in g2.edgeTo){
    console.log(j + ' => ' + g2.edgeTo[j]);
}
var path = g2.pathTo(0, 4);
print(path);


function TopoGraph(v){
    this.vertices = v;//节点数
    this.edges = 0;//边数
    this.adj = [];//保存节点的关系
    this.marks = [];//保存标记过的

    for(var i = 0; i < this.vertices; i++){
        this.adj[i] = new Array();
        this.marks[i] = false;
    }

    this.addEdge = function(v, w){
        this.adj[v].push(w);
        this.edges++;
    }


    this.topSort = function(){
        var stack = [];
        var visited = [];
        for(var i  = 0; i < this.vertices; i++){
            visited[i] = false;
        }

        for(var i = 0; i < this.adj.length; i++){
            if(this.adj[i].length){
                if(!visited[i]){
                    stack.push(i);
                    visited[i] = true;
                }
                for(var j = this.adj[i].length -1; j >=0; j--){
                    if(!visited[this.adj[i][j]]){
                        stack.push(this.adj[i][j]);
                        visited[this.adj[i][j]] = true;
                    }
                }    
            }
        }
        return stack;
    };
}

var topg = new TopoGraph(6);
topg.addEdge(0, 1);
topg.addEdge(1, 2);
topg.addEdge(1, 3);
topg.addEdge(2, 4);
topg.addEdge(2, 5);

print(topg.topSort());
