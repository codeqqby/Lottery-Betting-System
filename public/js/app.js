(function() {
  angular.module('LotteryApp', ['ngRoute', 'ngResource', 'ui.bootstrap']).config(function($routeProvider) {
    $routeProvider.when('/main', {
      templateUrl: '/components/main/main',
      controller: 'MainController',
      controllerAs: 'home'
    }).when('/double-balls', {
      templateUrl: '/components/double-balls/double-balls',
      controller: 'DoubleBallsController',
      controllerAs: 'dbPage'
    }).when('/authenticate', {
      templateUrl: '/components/authenticate/authenticate',
      controller: 'AuthenticateController',
      controllerAs: 'auth'
    }).when('/quick-three', {
      templateUrl: '/components/quick-three/quick-three',
      controller: 'QuickThreeController',
      controllerAs: 'quickThree'
    }).when('/big-fun', {
      templateUrl: '/components/big-fun/big-fun',
      controller: 'BigFunController',
      controllerAs: 'bigFun'
    }).when('/bet-list', {
      templateUrl: '/components/bet-list/bet-list',
      controller: 'BetListController',
      controllerAs: 'BetList'
    }).when('/order-five', {
      templateUrl: '/components/order-five/order-five',
      controller: 'OrderFiveController',
      controllerAs: 'OrderFive'
    }).otherwise({
      redirectTo: '/main'
    });
  });
})();
