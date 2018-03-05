/**
 * 目标需要储存的数据
 */
var targetObj = function () {
	this.x;
	this.y;
	this.target = new Image();
};



/**
 * 目标的初始化(目的是控制是否加载进去的/相当于一个类)
 */
targetObj.prototype.init = function(){
	this.x=200;
	this.y=500;
	this.target.src = "image/target_1.png";
	
};



/**
 * 目标的渲染(这个是放在循环里面的/相当于一个类)
 */
targetObj.prototype.draw = function() {
	Context.drawImage(this.target,this.x-40,this.y-60)
};