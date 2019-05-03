### 2048 game
视图层 + 数据层
Html + Css + JavaScript
### 设计思路
视图层采用canvas画布渲染页面以及动画
数据层 直接操作4x4数组。两者可以完全分离

- 视图层
- 数据层
    1. 采用4x4数组来储存数据。
    2. 初始化，每一个为0.并且随机产生两个位置的2;
    3. 移动和合并
        - 不论向哪个方向移动，都将二维数组进行拆分，4 个一维数组，横向拆分（左右移动）或者竖向拆分（上下移动）
        - 任务分解，只需操作每一个一维数组，
        - 最后无法移动的数组一定是这几种样式，!0表示非0，对应Data.js中的函数checkArr(arr)
            [!0,!0,!0,!0],
            [!0,!0,!0,!0],
            [!0,!0,0,0],
            [!0,0,0,0],
            [0,0,0,0]
        - 所以先将数组变成上述的任一种形式，然后再进行合并
        - 合并，只需要遍历一遍数组，这样就可以避免产生这样的bug [4,2,2,0] => [8,0,0,0]
        - 移动失败，操作的是全局对象，可以没有返回值，那么就将返回值设计为移动成功或者失败
    4. 判断游戏结束，只需要检测插入失败即可
#### 已知bug
    - 当没有空白时，移动无法产生合并就会判断错误
    - 按下其他按钮会刷新 √
#### 设计猜想
    - 每一次移动，都会预测下一次的移动方向，如果四个方向都没有发生变化，就是游戏结束
    - 页面优化，配色调整
#### 已完成功能
    - PC端
    - 基本操作
#### 未完成功能
    - 计分
    - 移动端
