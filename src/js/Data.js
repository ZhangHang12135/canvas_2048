/**
 * Data layer
 * 数据层
 */
const ARRAY_ROW = 4,
      ARRAY_COLUMN = 4;

//初始化，产生一个ARRAY_ROW x ARRAY_COLUMN 大小的数组 
function init(row,col){
    let arr = [];//js无法直接定义未知长度多维数组，
    for (let i = 0; i < row; i++) {
        arr[i] = [] // 但是可以每一个值定义为一个数组，产生同样的效果
        for (let j = 0; j < col; j++) {
            arr[i][j] = 0;
        }
    }
    //插入最开始的两个值
    insertArr(arr);
    insertArr(arr);
    
    return arr;
}

//这里不需要哈，以前玩过的某一个版本是产生2 或者 4
//随机产生数字2 或者 数字4
// function generateNum(){
//     return ((Math.random()*2 + 2) > 3 )? 4 : 2;
// }
//插入值到数组中为0的地方
function insertArr(arr){
    try {
        //可能传入的数组不是一个二维数组
        let row = arr[0].length,
            col = arr.length;
        //检测是否还有空格
        //1. 将二维变成一维
        let copyArr = arr.reduce((acc,val)=>acc.concat(val));
        //2. 没有0
        if(copyArr.indexOf(0) == -1){
            return false;
        }
        let insertRow = Math.floor(Math.random()*row);//随机插入的行
        let insertCol = Math.floor(Math.random()*col);//随机插入的列
        //这里，如果是最后一个为0的格子，4x4的格子，平均需要50ms左右会插入其中
        //这里其实可以进行性能优化
        //不应该是不为0的地方继续回调函数，而是应该在为0的地方进行随机选取，暂时先这么写
        if(arr[insertRow][insertCol] == 0){
            arr[insertRow][insertCol] = 2;
            return true;//插入成功
        }else{
            return insertArr(arr);
        }
    } catch (error) {   
        console.log("ERROR -- " + error);
        return false;
    }
}

//检测一维数组是否还可移动,注意这里不检测是否可合并
//false表示任可移动了
//检测0是否全部后置
function checkArr(arr){
    let flag = false;
    let indexOne = arr.indexOf(0);//第一个0的位置
    let lastArr = arr.slice(indexOne);
    //这几种情况不可移动
    //[!0,!0,!0,0]
    //[!0,!0,0,0]
    //[!0,0,0,0]
    //[0,0,0,0]
    if(lastArr.every((x)=>(x==0))){
            flag = true;
    }
    //这种情况不可移动[!0,!0,!0,!0]
    if(indexOne == -1){
        flag = true;
    }
    return flag;
}
//Only移动
function moveArr(arr){
    //每一次移动，只是移动了一个0到最后，所以需要进行回调检测
    for (let i = 0; i < arr.length-1; i++) {
        if(arr[i] == 0){
            //将0移动到数组末尾
            let temp = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = temp;
        }
    }
    //符合标准
    if(checkArr(arr)){
        return arr;
    }else{
        return moveArr(arr);
    }
}
//合并，这里仅遍历一遍数组，这样就不会产生这样的情况 [4,2,2,0] => [8,0,0,0]
function changeArr(arr){
    //首先变成0后置的数组
    arr = moveArr(arr);
    //合并
    for (let i = 0; i < arr.length -1; i++) {
        if(arr[i] == arr[i+1] && arr[i] !== 0){
            arr[i] = arr[i] * 2;
            arr[i+1] = 0;
            i++;
        }
    }
    //再进行后置，但是已经不需要合并了
    arr = moveArr(arr);
    return arr; 
}

//向上滑动
function upArr(arr){
    try {
        //拆分
        let isChange = false;//是否改变数组,false为未改变
        for (let i = 0; i < ARRAY_COLUMN; i++) {
                let tempArr = [];
                tempArr[0] = arr[0][i];
                tempArr[1] = arr[1][i];
                tempArr[2] = arr[2][i];
                tempArr[3] = arr[3][i];

                let oldTempArr = tempArr.slice();//拷贝一份移动合并之前的数组
                
                tempArr = changeArr(tempArr);
                
                if(oldTempArr.toString() !== tempArr.toString()){
                    isChange = true;
                }
                arr[0][i] = tempArr[0];
                arr[1][i] = tempArr[1];
                arr[2][i] = tempArr[2];
                arr[3][i] = tempArr[3];
        }
        return isChange;
    } catch (error) {
        console.log("ERROR -- " + error);
        return false;
    }
}
//向下滑动
function downArr(arr){
    try {
        //拆分
        let isChange = false;
        for (let i = 0; i < ARRAY_COLUMN; i++) {
                let tempArr = [];
                tempArr[0] = arr[3][i];
                tempArr[1] = arr[2][i];
                tempArr[2] = arr[1][i];
                tempArr[3] = arr[0][i]

                let oldTempArr = tempArr.slice();//拷贝一份移动合并之前的数组
                tempArr = changeArr(tempArr);
                if(oldTempArr.toString() !== tempArr.toString()){
                    isChange = true;
                }

                arr[3][i] = tempArr[0];
                arr[2][i] = tempArr[1];
                arr[1][i] = tempArr[2];
                arr[0][i] = tempArr[3];
        }
        return isChange;
    } catch (error) {
        console.log("ERROR -- " + error);
        return false;
    }
}
//向左滑动
function leftArr(arr){
    try {
        //拆分
        let isChange = false;
        for (let i = 0; i < ARRAY_COLUMN; i++) {
                let tempArr = [];
                tempArr[0] = arr[i][0];
                tempArr[1] = arr[i][1];
                tempArr[2] = arr[i][2];
                tempArr[3] = arr[i][3];
                let oldTempArr = tempArr.slice();//拷贝一份移动合并之前的数组
                tempArr = changeArr(tempArr);

                if(oldTempArr.toString() !== tempArr.toString()){
                    isChange = true;
                }
                arr[i][0] = tempArr[0];
                arr[i][1] = tempArr[1];
                arr[i][2] = tempArr[2];
                arr[i][3] = tempArr[3];
        }
        return isChange;
    } catch (error) {
        console.log("ERROR -- " + error);
        return false;
    }
}
//向右滑动
function rightArr(arr){
    try {
        //拆分
        let isChange = false;
        for (let i = 0; i < ARRAY_COLUMN; i++) {
                let tempArr = [];
                tempArr[0] = arr[i][3];
                tempArr[1] = arr[i][2];
                tempArr[2] = arr[i][1];
                tempArr[3] = arr[i][0];
                let oldTempArr = tempArr.slice();//拷贝一份移动合并之前的数组
                tempArr = changeArr(tempArr);

                if(oldTempArr.toString() !== tempArr.toString()){
                    isChange = true;
                }
                arr[i][3] = tempArr[0];
                arr[i][2] = tempArr[1];
                arr[i][1] = tempArr[2];
                arr[i][0] = tempArr[3];
        }
        return isChange;
    } catch (error) {
        console.log("ERROR -- " + error);
        return false;
    }
}
//数组更新
//传入数组，和操作事件
//option = 0 | 1 | 2 | 3，分别对应up(上),right（右）,down（下）,left（左）
function updateArr(arr,option){
    //是否游戏结束，false表示没有
    let copyArr = [];
    for (let i = 0; i < arr.length; i++) {
        copyArr[i] = arr[i].slice();
    }
    //假设执行插入
    let isGameover = insertArr(copyArr);
    switch (option){
        case "0" :
            if(upArr(arr))//如果移动成功，就生成新的数字
            isGameover =  insertArr(arr);//再生成新的数字
            break;
        case "1" :
            if(rightArr(arr))
            isGameover =  insertArr(arr);
            break;
        case "2" :
            if(downArr(arr))
            isGameover =  insertArr(arr);
            break;
        case "3" :
            if(leftArr(arr))
            isGameover =  insertArr(arr);
            break;
    }
    if(!isGameover){
        console.log("游戏结束");
        return false;
    }
    console.log(isGameover);
    return arr;
}


