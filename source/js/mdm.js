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


    function fix_footer_pos(){
        $("footer").removeClass("fixed-bottom");
        var contentHeight = document.body.scrollHeight,//网页正文全文高度
            winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
        if(!(contentHeight > winHeight)){
            //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
            $("footer").addClass("fixed-bottom");
        } else {
            $("footer").removeClass("fixed-bottom");
        }
    }
    fix_footer_pos();
    $(window).resize(fix_footer_pos);
});

