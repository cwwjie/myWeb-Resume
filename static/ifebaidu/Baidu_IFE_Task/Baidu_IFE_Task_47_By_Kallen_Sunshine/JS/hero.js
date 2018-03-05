/**
 * 英雄需要储存的数据
 */
var HeroObj = function () {
	this.Hero = new Image();
	// this.counter;	//自己是不怎么会调用
	// this.timer;
};



/**
 * 英雄的初始化(目的是控制是否加载进去的/相当于一个类)
 */
HeroObj.prototype.init = function(){
	
	HreoX=100;
	HreoY=100;
	this.Hero.src = "image/Hero_1.png";
};



/**
 * 英雄的动画(这个是放在循环里面的/相当于一个类)
 */
HeroObj.prototype.draw = function() {			//跨越移动端的BUG弄出来了
	Context.save();
	var temX = HreoX*450/Canvas.offsetWidth;
	var temY = HreoY*650/Canvas.offsetHeight;
	Context.drawImage(this.Hero,temX-18*Canvas.offsetWidth/450,temY-60*Canvas.offsetHeight/650);
	//Context.drawImage(this.Hero,HreoX-18,HreoY-60)//这个缩小的时候会出问题，也就是移动端会出问题
	Context.restore();
};



/**
 * 英雄的移动(这个是点击里面的/相当于一个类)			无法成功调用自己	循环起来
 */
HeroObj.prototype.move = function() {
	//console.log(path);
	console.log("1111");
	setTimeout(function () {
		HeroObj.move();
	},100);
	HeroStep=0;
	function TimeOutStep() {
		//console.log(HeroStep);
		console.log(path[HeroStep][0]);
		if (HeroStep<path.length) {
			HreoX=path[HeroStep][0]*10;
			HreoY=path[HeroStep][1]*10;
		}
	}
	//TimeOutStep();
	// for (var i = 0; i < path.length; i++) {		这个是经常犯的一个错误啊。
	// 	this.counter = this.counter + 1;
	// 	this.timer = setTimeout(/*function () {
	// 		HreoX=path[i][0]*10;
	// 		HreoY=path[i][1]*10;
	// 	}*/"TimeOutStep()",this.counter*100);			//this.counter*100为走一步所花费的时间
	// 	// console.log(path[i][0]);
	// }
	// function TimeOutStep() {
	// 	HreoX=path[this.counter][0]*10;
	// 	HreoY=path[this.counter][1]*10;
	// }
	// this.timer = setTimeout(function () {
	// 	console.log("计时器成功")
	// },1000);
}