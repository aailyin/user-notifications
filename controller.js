(function (){
  angular
    .module('angularNotifications', [])
    .controller('NotificaitonsController', ['$scope', function ($scope){
      var vm = this;

      vm.text = 'Hello!';
    }])
    .directive('userNotifications', ['$window', function ($window){
      return {
        template: '<div class="user-notifications">lol' +
                      '<ul><li ng-repeat="item in notifications">{{item}}</li></ul>' +
                  '</div>',
        restrict: 'AE',
        scope: {
          notifications: '='
        }
      }
    }]);
})();