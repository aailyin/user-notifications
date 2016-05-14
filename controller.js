(function (){
  angular
    .module('angularNotifications', [])
    .service('userNotificationsService', ['$timeout', function ($timeout){
      var _notifications = [],
          _notifications_timeout = [],
          INFO_TYPE = 'info',
          WARN_TYPE = 'warning',
          ERR_TYPE = 'error';

      return {
        addNotifications: addNotifications,
        addNotificationWithoutType: addNotificationWithoutType,
        closeNotificationById: closeNotificationById,
        closeNotificationByType: closeNotificationByType,
        closeAllNotifications: closeAllNotifications,
      };

      /**
      * Add one notification......
      */
      function addNotification(notification){
        if(angular.isUndefined(notification) || notification == null || !angular.isObject(notifications)){
          return null;
        }

        
      }

      /**
      * 
      */
      function addNotifications(notifications){
        var ids = [], closedTypes = [];

        if(angular.isUndefined(notifications) || notifications == null || !angular.isArray(notifications)){
          return ids;
        }

        if(angular.isArray(notifications)){
          notifications.forEach(function (notification){

            if(notification.isReplace && notification.type){
              if(closedTypes.indexOf(notification.type) === -1){
                closeNotificationByType(notification.type);
                closedTypes.push(notification.type);
              }
            }

            if(angular.isArray(notification.message)){
              notification.message.forEach(function (message){
                ids.push(pushNotification(message, notification));
              });
            } else {
              ids.push(pushNotification(notification.message, notification));
            }
          });
        }

        return ids;
      }

      function pushNotification(message, notification){
        var id = Date.now(),
            promise = notification.isStatic ? null : createTimeout(id),
            type = notification.type || INFO_TYPE;

        _notifications.push({
          id: id,
          message: message,
          type: type
        });
        _notifications_timeout.push({
          id: id,
          type: type,
          promise: promise
        });
        return id;
      }

      function createTimeout(id){
        return $setTimeout(function() {
          closeNotificationById(id);
        }, TIMEOUT_TIME);
      }


      function addNotificationWithoutType(notification){

      }

      function closeNotificationById(id){

      }

      function closeNotificationByType(type){

      }

      function closeAllNotifications(){

      }
    }])
    .controller('NotificaitonsController', ['$scope', function ($scope){
      var vm = this;

      vm.notificationsTestObjectsWithOneType = { message: ['test1', 'test2', 'test3'], type: 'information'};
      vm.notificationsTestObjectsWithManyTypes = [ { message: ['test1', 'test2'], type: 'information'},
                                                   { message: 'JustString', type: 'error'}];
      vm.notificationsTestJustArray = ['test1', 'test2', 'test3'];

    }])
    .directive('userNotifications', ['$window', function ($window){
      /* Every displayed notification will be hidden after 4000 ms or the value from attributes*/
      var TIMEOUT_TIME = 4000;

      return {
        template: '<div class="user-notifications">' +
                      '<ul><li ng-repeat="item in notifications">{{item}}</li></ul>' +
                  '</div>',
        restrict: 'AE',
        scope: {
          notifications: '='
        },
        link: function (scope, el, attr){
          //scope.timeClose = parseInt(attr.timeoutTime, 10) || TIMEOUT_TIME;


        }
      };
    }]);
})();