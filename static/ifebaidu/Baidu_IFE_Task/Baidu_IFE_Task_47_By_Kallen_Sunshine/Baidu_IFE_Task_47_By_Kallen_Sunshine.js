/**
 * 这个用来测试使用
**/
// var Canvas = document.getElementById("Canvas");
// var Context = Canvas.getContext("2d");
// var BgImage = new Image();
// var RdBg = "k";//随机产生背景
// BgImage.src = "image/500×600Tes"+RdBg+".jpg";
// BgImage.onload = function () {Context.drawImage(BgImage,0,0)}
var matrix=[];//
for (var y = 0; y < 65; y++) {			//前3最后3个必须全为1
	var RDwall2d=[];
	for (var x = 0; x < 45; x++) {		//前3最后3个必须全为1
		var WallRD=Math.random()*10;
		// if (WallRD>1&&y>2&&y<62&&x>2&&x<42) {	//这个逻辑搞不清，容易混乱
		// 	RDwall2d[x]=0;
		// }else {
		// 	RDwall2d[x]=1;
		// }
		if (WallRD<0.02||y<3||y>61||x<3||x>41) {		//按照概率来说WallRD<0.01([5*7]/[65*45])是一个防御塔
			RDwall2d[x]=1;
		}else {
			RDwall2d[x]=0;
		}
	}
	matrix[y]=RDwall2d;
}
// console.log(matrix);
//matrix[0][2]=0;							//预留给任务的
//matrix[5][2]=0;
var Temmatrix=[];						//这个的目的是用来确认塔所在的位置 3
Temmatrix = matrix;
for (var i = 3; i < 62; i++) {
	for (var j = 3; j < 42; j++) {
		if (Temmatrix[i][j] == 1) {
			Temmatrix[i].splice(j-3,7,2,2,2,2,2,2,2);//3表示塔的位置，2表示衍生
			Temmatrix[i-1].splice(j-3,7,2,2,2,2,2,2,2);
			Temmatrix[i-2].splice(j-3,7,2,2,2,3,2,2,2);
			// matrix[i].splice(j-3,7,1,1,1,1,1,1,1);	//不知为啥这个就是不能
			// matrix[i-1].splice(j-3,7,1,1,1,1,1,1,1);
			// matrix[i-2].splice(j-3,7,1,1,1,1,1,1,1);
			// console.log(Temmatrix[i][j]+"+"+Temmatrix[i-1][j]+"+"+Temmatrix[i-2][j]);//测试多少个塔
			//	↓这个方法出问题！
			// for (var k = -3; k < 4; k++) {		//一次占据7个
			// 	Temmatrix[i].splice(j+k,1,2);	//Temmatrix[i][j+k] == 2;		//塔的衍生 不可走 目的是避开上方的if判断
			// 	Temmatrix[i-1].splice(j+k,1,2);	//Temmatrix[i+1][j+k] == 2;
			// 	Temmatrix[i-2].splice(j+k,1,2);	//Temmatrix[i+2][j+k] == 2;
			// 	Temmatrix[i].splice(j,1,3);		//Temmatrix[i][j] == 3;		//这个是塔的位置,设置不成功
			// 	matrix[i].splice(j+k,1,1);		//matrix[i][j+k] == 1;
			// 	matrix[i-1].splice(j+k,1,1);	//matrix[i+1][j+k] == 1;
			// 	matrix[i-2].splice(j+k,1,1);	//matrix[i+2][j+k] == 1;
			// }
			
		}
	}
}

for (var i = 3; i < 62; i++) {
	for (var j = 3; j < 42; j++) {
		if (Temmatrix[i][j] == 2 ||Temmatrix[i][j] == 3) {
			//console.log("塔的次数")
			matrix[i].splice(j,1,1);
		}
	}
}
// console.log(matrix);
// console.log(Temmatrix);
var grid = new PF.Grid(45,65,matrix);

var gridBackup = grid.clone();
var path = finder.findPath(1,2,MouseX,MouseY,gridBackup);

Math.sqrt(Math.pow(Defender.x-HreoX,2))+Math.sqrt(Math.pow(Defender.y-HreoY,2))
		MouseX
		MouseY
if (Math.sqrt(Math.pow(Defender.x-HreoX,2))<15&&Math.sqrt(Math.pow(Defender.y-HreoY,2))<20) {
	
}