const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d'); 


let width=ctx.canvas.width;
let height=ctx.canvas.height;
 
let box_width=width*0.8*0.25; //每一个小格的宽
let margin_width=width*0.2*0.20;//小格之间的边距

let digital = init(4,4);//数据初始化
//画每一个小格
function drawRect(x,y,color){
	ctx.beginPath();
	ctx.fillStyle=color;
	ctx.moveTo(x,y);
	ctx.arcTo(x+box_width,y,x+box_width,y+1,margin_width*0.7);
	ctx.arcTo(x+box_width,y+box_width,x+box_width-1,y+box_width,margin_width*0.7);
	ctx.arcTo(x,y+box_width,x,y+box_width-1,margin_width*0.7);
	ctx.arcTo(x,y,x+1,y,margin_width*0.7);
	ctx.fill();	
}
//画整体的布局
function drawBack(){
	ctx.beginPath();
	ctx.fillStyle="#f0d799";
	ctx.fillRect(0,0,width,height);
	for ( var i= 0; i <4; i++) {
		for ( var j = 0; j < 4; j++) {
			var c="";
			if(digital[i][j]==0){c="#D7C184 ";}
			if(digital[i][j]==2){c="#f5bb82 ";}
			if(digital[i][j]==4){c="#DBB280 ";}
			if(digital[i][j]==8){c="#E1C57A ";}
			if(digital[i][j]==16){c="#E8B173 ";}
			if(digital[i][j]==32){c="#F2A769 ";}
			if(digital[i][j]==64){c="#e08931 ";}
			if(digital[i][j]==128){c="#f27f0c ";}
			if(digital[i][j]==256){c="#f76063 ";}
			if(digital[i][j]==512){c="#e84648 ";}
			if(digital[i][j]==1024){c="#b03133 ";}
			if(digital[i][j]==2048){c="#fc080c ";}
			x=margin_width+j*(box_width+margin_width);
			y=margin_width+i*(box_width+margin_width);
			drawRect(x,y,c);
		}
    }
    drawDigital();
}
//画上数字
function drawDigital(){
	for ( var i = 0; i < 4; i++) {
		for ( var j = 0; j < 4; j++) {
			if (digital[i][j]>0) {
				ctx.beginPath();
				ctx.textAlign="center";
				ctx.textBaseline="middle";
				ctx.fillStyle="#fff";
                ctx.font="40px Arial";
                //这里一定要注意，x轴是和下标j对应的
				x=margin_width+j*(box_width+margin_width)+box_width/2;
				y=margin_width+i*(box_width+margin_width)+box_width/2;
				ctx.fillText(digital[i][j],x,y);
			}
		}
	}
}
drawBack();
document.onkeydown = function(event){
    let e = event || window.event || arguments.callee.caller.arguments[0];
    let gameover = false;
    if(e && e.keyCode == 37){
        //左
        gameover = updateArr(digital,"3");
        drawBack();
    }else if(e && e.keyCode == 38){
        gameover = updateArr(digital,"0");
        drawBack();
    }else if(e && e.keyCode == 39){
        gameover = updateArr(digital,"1");
        drawBack();
    }else if(e && e.keyCode == 40){
        gameover = updateArr(digital,"2");
        drawBack();
    }else{
        gameover = true;
    }
    if(!gameover){
        alert("Game over");
        digital = init(4,4);
        drawBack();
    }
}
