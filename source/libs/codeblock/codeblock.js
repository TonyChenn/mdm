$(function () {
    $('figure').wrap('<div class="highlight-wrap"></div>');

    // 代码语言
    $('.highlight-wrap').append('<i class="mdui-icon code_menu_item code_language">123</i>')
    

    $('figure').each(function(i, node){
      var result = $(node).attr('class').replace("highlight ","").trim()
      if(result == "plaintext") result = ""
      $(node).parent().find('.code_language').text(result)
    })

    
    // 代码复制
    //$('.highlight-wrap').append('<i class="mdui-icon material-icons code_menu_item code_copy" title="复制代码" aria-hidden="true">&#xe14d;</i>');
    //折叠代码
    $('.highlight-wrap').append('<i class="mdui-icon material-icons code_menu_item code_expand" title="折叠代码" aria-hidden="true">keyboard_arrow_down</i>');
    $('.code_expand').on('click', function () {
        if($(this).parent().hasClass('code-closed')) {
          $(this).parent().find('figure').show();
          $(this).parent().removeClass('code-closed');
        } else {
          $(this).parent().find('figure').hide();
          $(this).parent().addClass('code-closed');
        }
      });
});