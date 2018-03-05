/**
 * 需要储存的数据放置在这里
 */
var DefenderObj = function () {
	this.x;
	this.y;
	this.Defender = new Image();
	this.AlerZone = new Image();
	this.Attack=false;
	this.Animation;
};



/**
 * 是否使用初始化(目的是控制是否加载进去的/相当于一个类)这个是放置在初始化里面的
 */
DefenderObj.prototype.init = function(){
	this.x=300;
	this.y=400;
	this.Defender.src = "image/Defender_1.png";
	this.AlerZone.src = "image/AlerZone.png";
};



/**
 * 其他的功能(看用途了/相当于一个类)
 */
DefenderObj.prototype.draw = function() {
	Context.drawImage(this.Defender,this.x-63,this.y-50);
	Context.drawImage(this.AlerZone,this.x-131,this.y-127);
};



/**
 * 防御的动画
 */
DefenderObj.prototype.Attacking = function () {
	this.Attack=false;
}