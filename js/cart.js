/**
 * ITCAST WEB
 * Created by zhousg on 2016/9/17.
 */
window.onload = function(){
    /*删除弹框*/
    deleteWin();
}
/*删除弹框*/
function deleteWin(){
    /*
    * 1.点击删除按钮
    * 1.1 弹出层显示
    * 1.2 弹出框要动画的显示出来
    * 1.3 当前点击的删除按钮的盖子要动画翻转
    *
    * 2 点击取消按钮
    * 2.1 弹出层隐藏
    * 2.2 盖子改回去
    * */

    var jdWin = document.querySelector('.jd_win');
    var jdWinBox = jdWin.querySelector('.jd_win_box');

    var deleteBtns = document.querySelectorAll('.option_delete');

    var up = null;

    for(var i = 0 ; i < deleteBtns.length ; i++){
        deleteBtns[i].onclick = function(){
            /*1.点击删除按钮*/
            jdWin.style.display = 'block';
            jdWinBox.className = 'jd_win_box myBounceInDown';

            up = this.querySelector('.delete_up');

            up.style.webkitTransition = 'all 1s';
            up.style.transition = 'all 1s';

            up.style.webkitTransformOrigin = 'left bottom';
            up.style.transformOrigin = 'left bottom';

            up.style.webkitTransform = 'rotate(-30deg) translateY(2px)';
            up.style.transform = 'rotate(-30deg) translateY(2px)';

        }
    }

    jdWinBox.querySelector('.cancel').onclick = function(){
        jdWin.style.display = 'none';

        /*?怎么样取到当前点击的盒子*/
        if(up){
            up.style.webkitTransform = 'none';
            up.style.transform = 'none';
        }
    }

    /*media query +  rem  基于百分比布局*/
}