$(function(){
    var header_img_width=$(".header-box").height();
    $(window).scroll(function(){
        if($(window).scrollTop()>header_img_width-50){
            $(".goTop").fadeIn(100);
            $("#bar").removeClass("mdui-shadow-0")
            $("#bar").addClass("mdui-color-indigo")
            $('#sidebar').addClass("fixPosition")
        }else{
            $(".goTop").fadeOut(100);
            $("#bar").addClass("mdui-shadow-0");
            $("#bar").removeClass("mdui-color-indigo")
            $('#sidebar').removeClass("fixPosition")
        }
    });
    //返回顶部点击事件
    $("#btn_mdm_goTop").click(function(){
        $('body,html').animate({scrollTop:0},100);
        return false;
    });

    //表格样式
    $('table').addClass("mdui-table mdui-table-hoverable")

    //表格超界
    $('.mdui-table').wrap("<div class='mdui-table-fluid'></div>");

    //设置主题
    var da = getCookie('IsDayTime');
    if(da==null || da=='' || da=='true'){
        setTheme('true');
    }
    else if(da=='false'){
        setTheme('false');
    }
})

//主题切换
function themeChange(){
    var _data=getCookie('IsDayTime');
    if(_data=='false'){
        setCookie('IsDayTime','true');
        setTheme('true');
    }
    else
    {
        showOverlay(500);
        setCookie('IsDayTime','false');
        setTheme('false');
    }
}
function setCookie(key,value){
    var date = new Date();
    date.setTime(date.getTime() + 365*24*3600*1000);
    document.cookie = key + '=' + value + '; expires=' + date.toGMTString() + '; path=/';
};

function getCookie(name){
    var _name=name+'=';
    var list=document.cookie.split(';');
    for (var i = 0; i < list.length; i++) {
        var item=list[i].trim();
        if(item.indexOf(_name)==0)
            return item.substring(_name.length,item.length);
    }
    return '';
}

//true  day
//false night
function setTheme(DayTime){
    if(DayTime=='true'){
        $('body').removeClass('mdm_theme_dark');
        $('#themeIcon').text("brightness_7");
    }
    else{
        $('body').addClass('mdm_theme_dark');
        $('#themeIcon').text("brightness_4");
    }
}

function showOverlay(time){
    mdui.JQ.showOverlay();
    setTimeout(function () {
      mdui.JQ.hideOverlay();
    }, time);
}

function LazyLoad(){
    scrollTop=window.scrollY;
}