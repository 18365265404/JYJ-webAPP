// ios手机
var timer = null;
$('input').on('focus', function() {
    clearInterval(timer);
    var index = 0;
    timer = setInterval(function() {
        if(index>5) {
            $('body').scrollTop(1000000);
            clearInterval(timer);
        }
        index++;
    }, 50)
})

// android手机
var winHeight = $(window).height(); // 获取当前页面高度  
$(window).resize(function() {  
  var resizeHeight = $(this).height();  
  if (winHeight - resizeHeight > 50) {  
      // 软键盘弹出  
      $('body').css('height', winHeight + 'px');  
  } else {  
      //软键盘收起
      $('body').css('height', '100%');  
  }  
});  