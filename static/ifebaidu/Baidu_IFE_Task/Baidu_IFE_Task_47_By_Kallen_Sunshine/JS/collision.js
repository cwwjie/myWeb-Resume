/**
 * 判断主角是否在防御者的防御范围内
 */
function Autoattack () {
	if (!Defender.Attack) {
		//console.log("go")
		if (Math.sqrt(Math.pow(Defender.x-HreoX,2)+Math.pow(Defender.y-HreoY,2))<125) {
			//动画
			alert("进入守护者攻击范围")
			Defender.Attack=true;
			Defender.Animation = setTimeout("Defender.Attacking()",1000);
		}
	}
}



/**
 * 加载获胜的选项
 */
function Victorious () {
	//console.log("111")
	if (Math.sqrt(Math.pow(target.x-HreoX,2)+Math.pow(target.y-HreoY,2))<20) {
		alert("恭喜你成功解救目标");
		target.x=999999;
		target.y=999999;
	}
}




/**
 * 加载所有碰撞的
 */
function collision () {
	Autoattack();
	Victorious();
}