$(function(){
    var ts =  (new Date(2019, 7, 9, 17, 30, 25))-(new Date())  ;//计算剩余的毫秒数      
    var dd = parseInt(ts / (24*60*60*1000)-30 , 10);
    
    
    $("#zl-time").text(dd);
  });

//   $(".teji").animate({opacity:'1'},"slow");