(function (){
  angular
    .module('angularNotifications', [])
    .service('userNotificationsService', function (){
      return {
        addNotifications: addNotifications
      }

      /**
      * 
      */
      function addNotifications(){

      }
    })
    .controller('NotificaitonsController', ['$scope', function ($scope){
      var vm = this;

      vm.notificationsTestObjectsWithOneType = [{ message: ['test1', 'test2', 'test3'], type: 'information'}];
      vm.notificationsTestObjectsWithManyTypes = [ { message: ['test1', 'test2'], type: 'information'},
                                                   { message: 'JustString', type: 'error'}];
      vm.notificationsTestJustArray = ['test1', 'test2', 'test3'];

    }])
    .directive('userNotifications', ['$window', function ($window){
      /* Every displayed notification will be hidden after 4000 ms or the value from attributes*/
      var TIME_CLOSE = 4000;

      return {
        template: '<div class="user-notifications">lol' +
                      '<ul><li ng-repeat="item in notifications">{{item}}</li></ul>' +
                  '</div>',
        restrict: 'AE',
        scope: {
          notifications: '='
        },
        link: function (scope, el, attr){
          //scope.timeClose = parseInt(attr.timeClose, 10) || TIME_CLOSE;


        }
      }
    }]);
})();