/**
 * 需要储存 的数据
**/
var Canvas;//= document.getElementById("Canvas");//这个是获取canvas的API，但是我们不在这里获取
var Context;//= Canvas.getContext("2d");
var BgImage = new Image();//背景图片
// var lastTime; //=Date.now()	测试的，暂时用不上
// var deltaTime;
var MouseX; 	 //鼠标点击的位置
var	MouseY;
var Hreo;		//= new HeroObj();加载英雄
var HreoX;		//init加载进去可以使用Hreo.x代表一样的
var HreoY;
// var Defender;//经过验证，定义不定义都能渲染出来，所以完全可以不定义的。
var AlerZone;
var target;
var wall;
var matrix=[];		//PathFinding.js不可走的算法的	数组
var Temmatrix=[];	//专门用来渲染塔
var grid;			//这是不可走的算法
var path=[];			//这个是走的路
var HeroStep;//= new number(); 英雄要走的步数
var Towers;
// var offsetWidth;//这个是用来跨移动端的
// var offsetHeight;	//可以用Canvas.offsetWidth




/**
 * 初始化(这个目的是控制，因为有了这个，就有了可以控制不加载的选项)
**/
function init() {
	Canvas = document.getElementById("Canvas");	//其实在外面加载也行的- -3，在这加载可以节省内存
	Context = Canvas.getContext("2d");			//getContext() 方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属性。
	var RdBg = "1";								//这个是随机产生背景的,暂时这样。也可以在外面弄个类的方法来的其实。我是这里最初的目的测试
	BgImage.src = "image/Map"+RdBg+".jpg";
	Canvas.addEventListener("click",OnMouseClick, false);	//初始化绑定鼠标的点击事件
	Hreo = new HeroObj();					//初始化引用英雄进来，目的是以后能够使用这个类虽然麻烦了点(想到在那边改其实就很方便了)
	Hreo.init();
	Defender = new DefenderObj();			//初始化引用防御者，（只是引用进来）
	Defender.init();						//这个才是真正初始化了数据。
	target = new targetObj();			//初始化引用目标
	target.init();	
	wall = new wallObj;					//初始化墙
	wall.init();
}



/**
 * 动画的循环
**/
function gameloop() {
	window.requestAnimFrame(gameloop);	//循环执行这个函数在commonFunctions.js里面有，不是原型的模式，不需要引用进来
	// var now = Date.now();				//获取两帧时间差
	// deltaTime = now - lastTime;
	// lastTime = now;
	drawBackground();		//绘制背景
	wall.draw();			//绘制防御者
	Hreo.draw();			//绘制英雄
	Defender.draw();		//绘制防御者
	target.draw();
	collision();
}



/**
 * 鼠标的事件
**/
function OnMouseClick (e) {
	if(e.offSetX || e.layerX) {
		// 获取鼠标坐标
		MouseX = e.offSetX === undefined ? e.layerX : e.offSetX;//这个应该是跨浏览器的
		MouseY = e.offSetY === undefined ? e.layerY : e.offSetY;
	}
	// MouseX = Math.floor(MouseX/10)*10		//取整
	// MouseY = Math.floor(MouseY/10)*10
	// console.log(e.target.offsetWidth)				//点击元素的宽度
	// console.log("X="+MouseX+",Y="+MouseY)			//点击的位置
	// console.log(Math.floor(45*MouseX/e.target.offsetWidth))		//数组上的X位置
	// console.log(Math.floor(65*MouseY/e.target.offsetHeight))
	if (Math.sqrt(Math.pow(Defender.x-MouseX,2))<15&&Math.sqrt(Math.pow(Defender.y-MouseY,2))<20) {
		//console.log("攻击")	//英雄攻击的动画
		alert("守护者被远程攻击");
	}else {
		var TemMouseX = Math.floor(45*MouseX/e.target.offsetWidth);
		var TemMouseY = Math.floor(65*MouseY/e.target.offsetHeight);
		var TemHreoX = Math.floor(45*HreoX/e.target.offsetWidth);
		var TemHreoY = Math.floor(65*HreoY/e.target.offsetHeight);
		// offsetWidth = e.target.offsetWidth;
		// offsetHeight = e.target.offsetHeight;
		var gridBackup = grid.clone();
		var finder = new PF.AStarFinder();
		//console.log(Canvas);
		var tempath = finder.findPath(TemHreoX,TemHreoY,TemMouseX,TemMouseY,gridBackup);
		//path=tempath;//这样只是加上去
		path.splice(0,path.length);
		path=tempath;
		if (path.length!==0) {
			// HreoX=MouseX;
			// HreoY=MouseY;
			//Hreo.move();//搞了好久不行，涉及到原型模式，还有this，导致特别复杂，基础不够扎实。换下面一个
			HeroStep=0;
			TimeOutStep();
			//console.log(path);
		}
	}
}



/**
 * 英雄要走的步数
**/
function TimeOutStep() {
	if (HeroStep<path.length-1) {
		setTimeout(function () {
			HreoX=path[HeroStep][0]*10;
			HreoY=path[HeroStep][1]*10;
			TimeOutStep()
		},50);
		HeroStep++;
	}
}





/**
 * 页面加载完成开始游戏(这个是可以修改成为欢迎的界面的)
**/
document.body.onload = game;
function game() {
	init();//初始化
	// lastTime = Date.now();//暂时没用.
	// deltaTime = 0;
	gameloop();//循环
}