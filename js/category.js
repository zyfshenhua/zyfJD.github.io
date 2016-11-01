/**
 * ITCAST WEB
 * Created by zhousg on 2016/9/16.
 */
window.onload = function(){
    /*左侧栏js效果*/
    leftSwipe();
    /*右侧栏*/
    rightSwipe();
}
/*左侧栏js效果*/
function leftSwipe(){
    /*
    * 1.让左侧栏滑动起来   touch事件组合
    * 2.滑动完成之后  如果超出了定位区间  需要吸附回去
    * 3.在滑动过程中  如果超出了滑动区间  需要禁止滑动
    * 4.点击分类的时候  改变当前样式   （pc上一般是用click 移动端最好是用tap 剖析tap原理）
    * 5.点击分类的时候  让它在定位区间内容滑动  当前的分类顶置  保持不动
    * */

    /*编码*/

    /*获取dom元素*/

    /*父元素*/
    var parentBox = document.querySelector('.jd_category_left');
    /*子元素*/
    var childBox = parentBox.querySelector('ul');
    /*所有的分类*/
    var lis = childBox.querySelectorAll('li');


    /*父元素的高度*/
    var parentHeight = parentBox.offsetHeight;
    /*子元素的高度*/
    var childHeight = childBox.offsetHeight;
    /*===计算定位区间*/
    var maxPosition = 0;
    var minPosition = parentHeight - childHeight;
    /*缓冲的距离*/
    var distance = 100;
    /*===滑动区间*/
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;

    /*公用的方法*/
    /*加过渡*/
    var addTransition = function(){
        /*加上过渡属性*/
        childBox.style.transition = 'all 0.2s';/*注意：过渡的时间一定不要大于或定于定时器的时间*/
        childBox.style.webkitTransition = 'all 0.2s';/*做兼容*/
    };

    /*清过渡*/
    var clearTransition = function(){
        /*清除过渡*/
        childBox.style.transition = 'none';
        childBox.style.webkitTransition = 'none';
    };

    /*定位*/
    var setTranslateY = function(translateY){
        childBox.style.transform = 'translateY('+translateY+'px)';
        childBox.style.webkitTransform = 'translateY('+translateY+'px)';
    };

    /*贯穿整个程序  重要*/
    /*记录当前盒子的定位的一个参数*/
    var currentY = 0;

    /*1.让左侧栏滑动起来 */
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;

    /*绑定事件*/
    childBox.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY-startY;
        console.log(distanceY);
        /*怎么样让分类盒子滑动起来？记录当前定位*/
        clearTransition();
        /*将要去定位的位置  滑动*/
        /*3.在滑动过程中  如果超出了滑动区间  需要禁止滑动*/
        /*滑动区间内  ?应该拿谁做比较?*/
        if((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe){
            setTranslateY(currentY + distanceY);
        }

    });
    window.addEventListener('touchend',function(e){
        /*2.滑动完成之后  如果超出了定位区间  需要吸附回去*/
        /*?应该拿谁做比较?*/
        /*滑动结束的时候  现在想要去做定位的位置超过了最大定位*/
        if((currentY + distanceY) > maxPosition){
            currentY = maxPosition;
            addTransition();
            setTranslateY(currentY);
        }
        /*滑动结束的时候  现在想要去做定位的位置超过了最小定位*/
        else if((currentY + distanceY) < minPosition){
            currentY = minPosition;
            addTransition();
            setTranslateY(currentY);
        }
        /*正常情况*/
        else{
            /*这次记录的当前定位  是下一次滑动基准的定位*/
            currentY = currentY + distanceY;
        }

        /*重置参数*/
        startY = 0;
        moveY = 0;
        distanceY = 0;
    });

    /*4.点击分类的时候 */
    itcast.tap(childBox, function (e) {
        /*当前点击的li*/
        var currLi = e.target.parentNode;

        for(var i = 0; i < lis.length ; i++){
            lis[i].className = " ";
            lis[i].index = i;
        }

        currLi.className = 'now';


        /*5.点击分类的时候  让它在定位区间内容滑动  当前的分类顶置  保持不动*/

        /*计算 将要去做定位的位子  当前索引 li 高度*/
        var translateY = - currLi.index * 50;

        /*计算最终的定位  当前currentY*/
        /*在定位区间范围内*/
        if(translateY > minPosition){
            currentY = translateY;
            addTransition();
            setTranslateY(currentY);
        }
        /*不在定位区间内*/
        else{
            currentY = minPosition;
            addTransition();
            setTranslateY(currentY);
        }

    })

}

function rightSwipe(){
    /*
    * iscroll https://github.com/cubiq/iscroll  滑动插件
    * */
    itcast.iScroll({
        swipeDom:document.querySelector('.jd_category_right'),
        swipeType:'y',
        swipeDistance:50
    });
}
