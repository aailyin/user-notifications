(function (){
  angular
    .module('angularNotifications', [])
    .service('userNotificationsService', ['$timeout', function ($timeout){
      var _notifications = [],
          INFO_TYPE = 'info',
          WARN_TYPE = 'warning',
          ERR_TYPE = 'error';

      return {
        addNotifications: addNotifications,
        addNotificationWithoutType: addNotificationWithoutType,
        displayMessage: displayMessage,
        displayMessages: displayMessages,
        closeNotificationById: closeNotificationById,
        closeNotificationByType: closeNotificationByType,
        closeAllNotifications: closeAllNotifications,
      };
      //////////////////////////////////////////////////////////////
      /**
      * Display notification.
      * @param {Object} notification - The notification object.
      * @return {Number|undefined} id - Id of displayed notification.
      */
      function addNotification(notification){
        if(!notification || !angular.isObject(notifications)){ return ; }

        if(notification.isReplace && notification.type){
            closeNotificationByType(notification.type);
        }

        if(angular.isString(notification.message)){
          return pushNotification(notification.message, notification);
        } else if(angular.isArray(notification.message)) {
          var ids = [];
          angular.forEach(notification.message, function (message){
            ids.push(pushNotification(message, notification));
          });
        }
        return id;
      }

      /**
      * Display array of notifications.
      * @param {Array} notifications - The array of notifications.
      * @return {Array|undefined} ids - The ids of displayed notifications.
      */
      function addNotifications(notifications){
        if(!notifications || !angular.isArray(notifications)) { return; }

        var ids = [];

        angular.forEach(notifications, function (notification){
          if(notification && angular.isObject(notifications)){
            ids.push(addNotification(notification));
          }
        });
      }

      /**
      * Push notification to array of all opened notifications.
      * @param {String} message - Message for user.
      * @param {String} [notification] - Notification object.
      * @return {Number} id - Id of the opened notification.
      */
      function pushNotification(message, notification){
        var id = Date.now(),
            notObj = notification || {},
            promise = notObj.isStatic ? null : createTimeout(id),
            type = notObj.type || INFO_TYPE;

        _notifications.push({
          id: id,
          message: message,
          type: type,
          promise: promise
        });
        return id;
      }

      /**
      * Create a timeout that is used to close notification by id when time passes.
      * @param {Number} id - Notification id.
      * @return {Object} promise - Promise object of timeout.
      */
      function createTimeout(id){
        return $setTimeout(function() {
          closeNotificationById(id);
        }, TIMEOUT_TIME);
      }

      /**
      * Display a simple message.
      * @param {String|undefined} message - Message to display.
      */
      function displayMessage(message){
        if(!angular.isString(message)) { return; }

        return pushNotification(message);
      }

      /**
      * Display messages.
      * @param {Array} messages - Array of messages to display.
      * @return {Array|undefined} ids - Ids of displayed messages.
      */
      function displayMessages(messages){
        if(!angular.isArray(messages)) { return; }

        var ids = [];
        messages.forEach(function (message){
          if(angular.isString(message)){
            ids.push(pushNotification(message));
          }
        });
        return ids;
      }

      /**
      * Close notification by id.
      * @param {Number} id - Notification id.
      */
      function closeNotificationById(id){
        if(!id || !angular.isNumber(id) || !isFinite(id)) { return; }

        angular.forEach(_notifications, function (item, index){
          if(item.id === id){
            $timeout.close(item.promise);
            _notifications.splice(index, 1);
            return;
          }
        });
      }

      /**
      * Close notification by type.
      * @param {String} type - Notification type.
      */
      function closeNotificationByType(type){
        if(!type || !angular.isString(type)) { return; }

        angular.forEach(_notifications, function (item, index){
          if(item.type === type){
            $timeout.close(item.promise);
            _notifications.splice(index, 1);
          }
        });
      }

      /**
      * Close all notifications.
      */
      function closeAllNotifications(){
        angular.forEach(_notifications, function (item, index){
          $timeout.close(item.promise);
        });
        _notifications = [];
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
