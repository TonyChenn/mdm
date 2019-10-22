var $$=mdui.JQ;

$(function(){
    var header_img_width=$(".header-box").height();
    $(window).scroll(function(){
        if($(window).scrollTop()>header_img_width-50){
            $(".goTop").fadeIn(100);
            $("#bar").removeClass("mdui-shadow-0")
            $("#bar").addClass("mdui-color-indigo")
        }else{
            $(".goTop").fadeOut(100);
            $("#bar").addClass("mdui-shadow-0");
            $("#bar").removeClass("mdui-color-indigo")
        }
    });
    //返回顶部点击事件
    $(".goTop").click(function(){
        $('body,html').animate({scrollTop:0},100);
        return false;
    });

    //表格样式
    $('table').addClass("mdui-table mdui-table-hoverable")

    //表格超界
    $('.mdui-table').wrap("<div class='mdui-table-fluid'></div>");
})

