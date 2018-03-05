
var root = $(".root"),

tree = new Tree(root);

//点下按钮执行的是这个
tree[btn.id]();

animation(tree.stack);

function Tree(node) {
    this.stack = [];
    this.root = node;
}

Tree.prototype.traverseDF = function(callback) {        // callback 是回调函数的一个指针
    var stack = [];
    (function recurse(currentNode) {                //传入的是root 这一整个DIV
        stack.push(currentNode);
        for (var i = 0; i < currentNode.children.length; i++) { //这个方法是不错的/(ㄒoㄒ)/~~然而我根本不知道变通、回调蛮恶心
            recurse(currentNode.children[i]);
        }
        callback ? callback(currentNode) : null;
    })(this.root);
    this.stack = stack;
};

/*                  测试一下
第一次；stack = [] ; stack push = 整个root 的 DIV  然后先进入↓  后面还有…………就停止回调了
                                                stack push = 第一个DIV   然后进入↓  stack push = 第二个DIV 然后进入↓

 */




//                                              这个是清除啥的
function clearColor(tree) {
    tree.traverseDF();
    tree.stack.forEach(function(ele) {
        ele.style.backgroundColor = "#fff";
    });
}


function animation(nodes, keyword) {
    lock = true;
    var keyword = keyword || null;
    (function show() {
        var next = nodes.shift();
        if (next) {
            next.style.backgroundColor = "#ccc";
            setTimeout(function() {
                if (!(next.firstChild.nodeValue.trim() == keyword)) {
                    next.style.backgroundColor = "#fff";
                }
                show();
            }, interval);
        } else {
            lock = false;
        }
    })();
};


//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

































