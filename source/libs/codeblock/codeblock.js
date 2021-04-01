$(function () {
    $('figure').wrap('<div class="highlight-wrap"></div>');

    // 代码复制
    $('.highlight-wrap').append('<i class="mdui-icon material-icons code_menu_item code_copy" title="复制代码" aria-hidden="true">&#xe14d;</i>');
    //折叠代码
    $('.highlight-wrap').append('<i class="mdui-icon material-icons code_menu_item code_expand" title="折叠代码" aria-hidden="true">keyboard_arrow_down</i>');
    $('.code_expand').on('click', function () {
        if($(this).parent().hasClass('code-closed')) {
          $(this).siblings('pre').find('code').show();
          $(this).parent().removeClass('code-closed');
        } else {
          $(this).siblings('pre').find('code').hide();
          $(this).parent().addClass('code-closed');
        }
      });
});