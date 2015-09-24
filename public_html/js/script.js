$(document).ready(function () {
    Game(1000 , 5);


});

function Game(timeOut , numberStepsToFail) {
    var o = this;

    var gameBlockSize;
    var floatBlockSize;
    var positionInto_Y = 0;
    var positionInto_X = 0;
    var $gamePlace = $("#gameField");
    var $floatBlock = null;
    var colors = ["red", "black"];
   
    var $threadColor;
    var $threadMove;
    var score = 0;
    var $scoreField = $("#score");
    



    {
        initGameSpice();
        initFloatBlock();
    }


    var log = function (a) {
        window.console.log(a);
    };


    $(window).resize(function (e) {
        initGameSpice();
        initFloatBlock();
        positionInto_Y = positionInto_X = 0;
    });

    //нажатие на кнопку 
    var isRun = false;
    $("#startTheGame").click(function () {
        if (isRun) {
            $("#startTheGame").text("Старт");
            clearInterval($threadColor);
            clearInterval($threadMove);
            isRun = false;
        } else {
            $("#startTheGame").text("Стоп");
            o.start();
            isRun = true;
        }
    });


    function initGameSpice() {
        var widthGameBlock = Math.floor(window.innerWidth / 100 * 85);
        var heightGameblock = Math.floor(window.innerHeight / 100 * 85);
        gameBlockSize = widthGameBlock > heightGameblock ? heightGameblock : widthGameBlock;
        $gamePlace.css({width: gameBlockSize, height: gameBlockSize});

    }

    function initFloatBlock() {
        floatBlockSize = gameBlockSize / 3;
        if ($floatBlock === null) {
            $gamePlace.append("<div id='floatingUnit'></div>");
            $floatBlock = $("#floatingUnit");
        }

        $floatBlock.css({
            width: floatBlockSize,
            height: floatBlockSize,
            top: positionInto_Y,
            left: positionInto_X
        });

        randomColor($floatBlock);
    }

    function randomColor($ob) {

        $ob.removeClass("red");
        $ob.removeClass("black");
        var color = Math.random() > 0.49 ? colors[0] : colors[1];
        $ob.addClass(color);
    }



    var allSteps = 0 ;
    this.start = function () {

        // двигаем объект 
        $threadMove = setInterval(function () {
            move(getDirection());
            $scoreField.text(score);
          if(allSteps != 0 && (allSteps % numberStepsToFail) == 0){
                score--;
          }
          allSteps++;
          
        }, timeOut);

        //рандомно меняем цвет 
        var colorTime = 500;
        $threadColor = setTimeout(function () {
            randomColor($floatBlock);
            colorTime = getRandomInt(200, 1500);
        }, colorTime);

    };
    

    //направления 
    var LEFT = 0;
    var RIGHT = 1;
    var UP = 2;
    var DOWN = 3;

    //возможное движение блока 
    var isRighTop = [DOWN, LEFT];
    var isLeftTop = [DOWN, RIGHT];
    var isRighBottom = [UP, LEFT];
    var isLeftBottom = [UP, RIGHT];
    var isTop = [DOWN, LEFT, RIGHT];
    var isDown = [UP, LEFT, RIGHT];
    var isLeft = [DOWN, UP, RIGHT];
    var isRight = [DOWN, LEFT, UP];
    var isCenter = [DOWN, LEFT, UP, RIGHT];
    var direct;
    
    function getDirection() {


        //log("x = "+positionInto_X + " y = " +positionInto_Y);


        //если блок находится  верх-право 
        if (positionInto_X >= (gameBlockSize - floatBlockSize - 1)
                && positionInto_Y <= 1) {

            direct = getRandomElement(isRighTop);

        } else if (positionInto_Y >= (gameBlockSize - floatBlockSize - 1)
                && positionInto_X <= 1) {

            direct = getRandomElement(isLeftBottom);

        } else if (positionInto_Y <= 1
                && positionInto_X <= 1) {

            direct = getRandomElement(isLeftTop);

        } else if (positionInto_Y >= (gameBlockSize - floatBlockSize - 1)
                && positionInto_X >= (gameBlockSize - floatBlockSize - 1)) {

            direct = getRandomElement(isRighBottom);

        } else {
            if (positionInto_Y === 0) {

                direct = getRandomElement(isTop);

            } else if (positionInto_X === 0) {

                direct = getRandomElement(isLeft);

            } else if (positionInto_Y >= (gameBlockSize - floatBlockSize - 3)) {

                direct = getRandomElement(isDown);

            } else if (positionInto_X >= (gameBlockSize - floatBlockSize - 3)) {

                direct = getRandomElement(isRight);

            } else {
                direct = getRandomElement(isCenter);
            }
        }




        return direct;
    }

    function move(direction) {
        switch (direction) {
            case UP:
                positionInto_Y -= floatBlockSize;
                initFloatBlock();
                break;
            case DOWN:
                positionInto_Y += floatBlockSize;
                initFloatBlock();
                break;
            case LEFT:
                positionInto_X -= floatBlockSize;
                initFloatBlock();
                break;
            case RIGHT:
                positionInto_X += floatBlockSize;
                initFloatBlock();
                break;
        }
    }
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getRandomElement(arr) {
        return arr[getRandomInt(0, arr.length - 1)];
    }
    
    
    $("#gameField").on("click", "#floatingUnit" ,function (){
      if( $floatBlock.attr("class") == "red"){
           score++;
           allSteps=0;
           $floatBlock.remove();
           $floatBlock = null;
      }else{
          score--;
      } 
            
        
        
    });

}

