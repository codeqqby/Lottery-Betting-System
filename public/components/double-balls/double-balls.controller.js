(function() {
  angular.module('LotteryApp').controller('DoubleBallsController', DoubleBallsController);

  function DoubleBallsController(appUtils) {
    var RED_BALL_NUM = 33;
    var BLUE_BALL_NUM = 16;
    var NEED_RED_NUM = 6;
    var ballCtrl = this;
    var RED_BALL = 0;
    var BLUE_BALL = 1;
    var PER_PRICE = 2;

    ballCtrl.generateBet = generateBet;
    ballCtrl.addNum = addNum;
    ballCtrl.modSelect = -1;
    ballCtrl.subNum = subNum;
    ballCtrl.modBet = modBet;
    ballCtrl.selectBall = selectBall;
    ballCtrl.colorBallStat = [0, 0];
    ballCtrl.money = 0;
    ballCtrl.betList = [];
    ballCtrl.betCount = 0;
    ballCtrl.betWeight = 1;
    ballCtrl.betTimes = 1;
    ballCtrl.tabs = [
      { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
      { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
    ];

    ballCtrl.model = {
      name: 'Tabs'
    };

    ballCtrl.redBalls = initBalls(RED_BALL_NUM);
    ballCtrl.blueBalls = initBalls(BLUE_BALL_NUM); 
    ballCtrl.redAwardBalls = _.range(1,7);
    ballCtrl.blueBall = 2;

    function addNum(field) {
      ballCtrl[field] ++;
    }

    function subNum(field) {
      ballCtrl[field] --;
    }

    function selectBall(ball, color) {
      if (ball.selected) {
        ball.selected  = false;
        ballCtrl.colorBallStat[color]--;
      }
      else {
        ball.selected  = true;
        ballCtrl.colorBallStat[color]++;
      }
      ballCtrl.betCount  = appUtils.computeCxy(ballCtrl.colorBallStat[RED_BALL], NEED_RED_NUM) * ballCtrl.colorBallStat[BLUE_BALL];
      ballCtrl.money =  ballCtrl.betCount * PER_PRICE;
    }

    function initBalls(num){
      var balls = [];
      _(num).times(function(idx) {
        var n = idx + 1;
        balls.push({
          index: n < 10 ? '0' + n : n + '',
          selected: false
        });
      });

      return balls;
    }

    function clearBalls() {
      _.each(ballCtrl.redBalls, function(ball) {
        ball.selected = false;
      });
      _.each(ballCtrl.blueBalls, function(ball) {
        ball.selected = false;
      });
    }

    function generateBet() {
      var redBall = [];
      var blueBall = [];
      _.each(ballCtrl.redBalls, function(ball) {
        if (ball.selected) {
          redBall.push(ball.index);
        }
      });

      _.each(ballCtrl.blueBalls, function(ball) {
        if (ball.selected) {
          blueBall.push(ball.index);
        }
      });
      if (ballCtrl.modSelect === -1) {
        ballCtrl.betList.push({
          type: ballCtrl.betCount == 1 ? '单式' : '复式',
          red: redBall.join(' '),
          blue: blueBall.join(' '),
          sum: ballCtrl.money
        });
      }
      else{
        ballCtrl.betList[ballCtrl.modSelect] = {
          type: ballCtrl.betCount == 1 ? '单式' : '复式',
          red: redBall.join(' '),
          blue: blueBall.join(' '),
          sum: ballCtrl.money
        };
      }

      ballCtrl.money = 0;
      ballCtrl.betCount = 0;
      ballCtrl.colorBallStat = [0, 0];
      ballCtrl.modSelect = -1;
      clearBalls();
    }

    function modBet(index) {
      ballCtrl.modSelect = index;
      clearBalls();
      var ballMap = ballCtrl.betList[index];
      var redBalls = ballMap.red.split(' ');
      var blueBalls = ballMap.blue.split(' ');
      ballCtrl.colorBallStat[RED_BALL] = redBalls.length;
      ballCtrl.colorBallStat[BLUE_BALL] = blueBalls.length;
      ballCtrl.betCount  = appUtils.computeCxy(ballCtrl.colorBallStat[RED_BALL], NEED_RED_NUM) * ballCtrl.colorBallStat[BLUE_BALL];
      ballCtrl.money =  ballCtrl.betCount * PER_PRICE;
      _.each(redBalls, function(ball) {
        ballCtrl.redBalls[parseInt(ball) - 1].selected = true;
      });
      _.each(blueBalls, function(ball) {
        ballCtrl.blueBalls[parseInt(ball) - 1].selected = true;
      });
    }
  }
})();
