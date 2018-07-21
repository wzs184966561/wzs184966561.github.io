

var oCanvas = document.getElementById("wuziqi");
var context = oCanvas.getContext("2d");
var me=true;
var chessBoard=[];
var wins=[];


var playerWin = [];
var computerWin = [];

var over=false;
    for(var i=0;i<19;i++){
        chessBoard[i]=[];
        for(var j=0;j<19;j++){
            chessBoard[i][j]=0;
        }
    }
   for(var i=0;i<19;i++){
       wins[i]=[];
       for(var j=0;j<19;j++){
           wins[i][j]=[];
       }
   }


var count=0;
   for(var i=0;i<19;i++){
       for(var j=0;j<15;j++){
           for(var k=0;k<5;k++){
               wins[i][j+k][count]=true;
           }
           count++;
       }    
   }
   for(var i=0;i<19;i++){
    for(var j=0;j<15;j++){
        for(var k=0;k<5;k++){
            wins[j+k][i][count]=true;
        }
        count++;
    }    
}
for(var i=0;i<15;i++){
    for(var j=0;j<15;j++){
        for(var k=0;k<5;k++){
            wins[i+k][j+k][count]=true;
        }
        count++;
    }    
}
   for(var i=0;i<15;i++){
    for(var j=18;j>3;j--){
        for(var k=0;k<5;k++){
            wins[i+k][j-k][count]=true;
        }
        count++;
    }    
}


console.log(count);

    for(var i=0;i<count;i++){
        playerWin[i]=0;
        computerWin[i]=0;
    }


    context.strokeStyle="#bfbfbf";
    var logo=new Image();
    logo.src="./img/logo.png";
    logo.onload=function(){
        context.drawImage(logo,100,100,400,400);
        qipan();

       

    }
var qipan=function (){
    for(var i=0; i<19;i++){
        context.moveTo(15+i*30,15);
        context.lineTo(15+i*30,555);
        context.stroke();
        context.moveTo(15,15+i*30);
        context.lineTo(555,15+i*30);
        context.stroke();
    } 
}

var oneStep = function(i,j,me){
    context.beginPath();
    context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
    context.closePath();
    var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
    if(me){
        gradient.addColorStop(0,"#0A0A0A");
        // gradient.addColorStop(0,"#abf5c8");
        gradient.addColorStop(1,"#636766");
        // gradient.addColorStop(1,"#07f361");
    }else{
        gradient.addColorStop(0,"#d1d1d1");
        gradient.addColorStop(1,"#f9f9f9");
    }
 
    context.fillStyle=gradient;
    context.fill();
} 

wuziqi.onclick=function(e){
    if(over){return;}
    if(!me){return;}
    var x=e.offsetX;
    var y=e.offsetY;
    var i=Math.floor(x/30);
    var j=Math.floor(y/30);
    if(chessBoard[i][j]==0){
        oneStep(i,j,me);
        chessBoard[i][j]=1; 
        }
     
        for(var k=0;k<count;k++){
            if(wins[i][j][k]){
                playerWin[k]++;
                computerWin[k]=6;
                if(playerWin[k]==5){
                    over=true;
                    setTimeout(function(){
                        window.alert("玩的好呀。");
                    },200);
                 
                    
                }
            }
        }
        if(!over){
            me=!me;
            computerAI();

        }

    }
   



var computerAI = function(){
    var playerScore=[];
    var computerScore=[];
    var max=0;
    var u=0,v=0;
    for(var i = 0;i<19;i++){
        playerScore[i]=[];
        computerScore[i]=[];
        for(var j=0;j<19;j++){
            playerScore[i][j]=0;
            computerScore[i][j]=0;
        }
    }
    for(var i=0;i<19;i++){
        for(var j=0;j<19;j++){
            if(chessBoard[i][j]==0){
                for(var k=0;k<count;k++){
                    if(wins[i][j][k]){
                        if(playerWin[k]==1){
                            playerScore[i][j]+=200;
                        }else if(playerWin[k]==2){
                            playerScore[i][j]+=400;
                        }else if(playerWin[k]==3){
                            playerScore[i][j]+=2000;
                        }else if(playerWin[k]==4){
                            playerScore[i][j]+=10000;
                        }
                        if(computerWin[k]==1){
                            computerScore[i][j]+=220;
                        }else if(computerWin[k]==2){
                            computerScore[i][j]+=440;
                        }else if(computerWin[k]==3){
                            computerScore[i][j]+=2500;
                        }else if(computerWin[k]==4){
                            computerScore[i][j]+=20000;
                        }
                    }
                }
                if(playerScore[i][j]>max){
                    max=playerScore[i][j];
                    u=i;
                    v=j;
                }else if(playerScore[i][j]==max){
                    if(computerScore[i][j]>computerScore[u][v]){
                        u=i;
                        v=j;
                    }
                }
                if(computerScore[i][j]>max){
                    max=computerScore[i][j];
                    u=i;
                    v=j;
                }else if(computerScore[i][j]==max){
                    if(playerScore[i][j]>playerScore[u][v]){
                        u=i;
                        v=j;
                    }
                }
            }
        }
    }
    oneStep(u,v,false);
    chessBoard[u][v]=2;
      for(var k=0;k<count;k++){
                if(wins[u][v][k]){
                    playerWin[k]=6;
                    computerWin[k]++;
                    if(computerWin[k]==5){
                        over=true;
                        setTimeout(function(){
                            window.alert("电脑都下不过如何和我同台竞技？");
                        },200);
                        
                        
                    }
                    
                }
            
            }
            if(!over){
                me=!me;
            }    
}