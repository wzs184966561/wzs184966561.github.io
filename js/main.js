$(function(){
    var text_p=$(".tx-p");
    var tx_p=text_p[0];
    var textinput="我的电竞日记将会上传到这个博客，记中情节，大部分属实，如有雷同......算李刘辟。"
    var count=0;
    function txinput(){
        if(count<=textinput.length){
            tx_p.innerHTML=textinput.substring(0,count);
            count++;
        }else{
            clearInterval(inptxt);
        }
    }
    setTimeout(function(){
      $(".loading").hide();
      $(".teji").animate({opacity:'1'},"slow");
      var inptxt=setInterval(txinput,100);
    },1000)

  });

//   $(".teji").animate({opacity:'1'},"slow");