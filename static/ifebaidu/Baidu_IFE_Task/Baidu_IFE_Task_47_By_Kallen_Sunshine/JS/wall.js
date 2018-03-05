/**
 * 墙的位置
 */
var wallObj = function () {
	Towers = new Image();
	this.countwall= 0;	//我是没有在外面定义和初始化的，这里却能够直接拿来用。注意这点。
	this.x=new Array();
	this.y=new Array();
};



/**
 * 是否使用初始化(目的是控制是否加载进去的/相当于一个类)这个是放置在初始化里面的
 */
wallObj.prototype.init = function(){
	Towers.src="image/Towers.png";
	for (var y = 0; y < 65; y++) {			//不可走的算法	
		var RDwall2d=[];
		for (var x = 0; x < 45; x++) {
			var WallRD=Math.random()*10;
			if (WallRD<0.02||y<3||y>61||x<3||x>41) {		//按照概率来说WallRD<0.01([5*7]/[65*45])是一个防御塔
				RDwall2d[x]=1;
			}else {
				RDwall2d[x]=0;
			}
		}
		matrix[y]=RDwall2d;
	}
	Temmatrix = matrix;
	for (var i = 3; i < 62; i++) {				//塔所占的位置
		for (var j = 3; j < 42; j++) {
			if (Temmatrix[i][j] == 1) {
				this.x[this.countwall]=j*10-47;	//第"countwall"个塔的，X位置。
				this.y[this.countwall]=i*10-165;	//第"countwall"个塔的，Y位置。
				this.countwall++;
				//console.log("地图上有多少个塔？")
				Temmatrix[i].splice(j-3,7,2,2,2,2,2,2,2);//3表示塔的位置，2表示衍生
				Temmatrix[i+1].splice(j-3,7,2,2,2,2,2,2,2);
				Temmatrix[i+2].splice(j-3,7,2,2,2,3,2,2,2);
			}
		}
	}
	for (var i = 3; i < 62; i++) {				//
		for (var j = 3; j < 42; j++) {
			if (Temmatrix[i][j] == 2 ||Temmatrix[i][j] == 3) {
				matrix[i].splice(j,1,1);
			}
		}
	}
	// matrix[0][2]=0;							//预留给人物所在的位置
	// matrix[5][2]=0;
	grid = new PF.Grid(45,65,matrix);
};



/**
 * 其他的功能(看用途了/相当于一个类)
 */
wallObj.prototype.draw = function() {
	//console.log(this.countwall);				//多少个塔
	for (var i = 0; i < this.countwall; i++) {
		Context.drawImage(Towers,this.x[i],this.y[i]);
	}
};