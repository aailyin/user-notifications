(function (){
  angular
    .module('angularNotifications', [])
    .constant('TYPES', {
      INFO_TYPE: 'info',
      SUCCESS_TYPE: 'success',
      WARN_TYPE: 'warning',
      ERR_TYPE: 'error'
    })
    .service('userNotificationsService', ['$timeout', 'TYPES', function ($timeout, TYPES){
      var TIMEOUT_TIME = 4000,
          _id = 0,
          _notifications = [];

      var service = {
        addNotification: addNotification,
        addNotifications: addNotifications,
        displayMessage: displayMessage,
        displayMessages: displayMessages,
        closeNotificationById: closeNotificationById,
        closeNotificationByType: closeNotificationByType,
        closeAllNotifications: closeAllNotifications,
        getNotifications: getNotifications
      };

      return service;
      //////////////////////////////////////////////////////////////
      /**
      * Display a notification.
      * @param {Object} notification - The notification object.
      * @return {Number|undefined} id - Id of displayed notification.
      */
      function addNotification(notification){
        if(!notification || !angular.isObject(notification)){ return ; }

        if(notification.isReplace && notification.type){
            closeNotificationByType(notification.type);
        }

        if(angular.isString(notification.message)){
          return _pushNotification(notification.message, notification);
        } else if(angular.isArray(notification.message)) {
          var ids = [];
          angular.forEach(notification.message, function (message){
            ids.push(_pushNotification(message, notification));
          });
          return ids;
        }
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
      function _pushNotification(message, notification){
        var id = _id++,
            notObj = notification || {},
            promise = notObj.isStatic ? null : createTimeout(id),
            type = getType(notObj.type);

       _notifications.push({
          id: id,
          message: message,
          type: type,
          promise: promise
        });
        return id;
      }

      /**
      * Check passed type and return the correct.
      * @param {String} type - Type of notification.
      * @return {String}
      */
      function getType(type){
        if (type && TYPES[type]) {
          return TYPES[type];
        }
        return TYPES.INFO_TYPE;
      }

      /**
      * Create a timeout that is used to close notification by id when time passes.
      * @param {Number} id - Notification id.
      * @return {Object} promise - Promise object of timeout.
      */
      function createTimeout(id){
        return $timeout(function() {
          closeNotificationById(id);
        }, TIMEOUT_TIME);
      }

      /**
      * Display a simple message.
      * @param {String|undefined} message - Message to display.
      */
      function displayMessage(message){
        if(!angular.isString(message)) { return; }

        return _pushNotification(message);
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
            ids.push(_pushNotification(message));
          }
        });
        return ids;
      }

      /**
      * Close notification by id.
      * @param {Number} id - Notification id.
      */
      function closeNotificationById(id){
        if(!angular.isNumber(id) || !isFinite(id)) { return; }

        angular.forEach(_notifications, function (item, index){
          if(item.id === id){
            $timeout.cancel(item.promise);
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
            $timeout.cancel(item.promise);
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

      /**
      * Get notifications array.
      * @return {Array} 
      */
      function getNotifications() {
        return _notifications;
      }
    }])
    /*
      TODO: Test controller that will be replaced to tests
    */
    .controller('NotificaitonsController', ['$scope', '$timeout', 'userNotificationsService', function ($scope, $timeout, userNotificationsService){
      var vm = this;

      vm.notificationsTestObjectsWithOneType = { message: ['tefsdfsdfsdfafdgsdfgsdfgsdfgsdfgsfdgsdfgsdfgsdfgsdfgsfdgsdfgsdfgsdfgsfgsdfgsdfgsfgsdfgdfgsdfgsdfgst1', 'test2', 'test3'], type: 'success', isStatic: false};
      vm.notificationsTestObjectsWithManyTypes = [ { message: ['test1', 'test2'], type: 'info'},
                                                   { message: 'JustString', type: 'error'}];
      vm.notificationsTestJustArray = ['test1', 'test2', 'test3'];

      //userNotificationsService.addNotification(vm.notificationsTestObjectsWithOneType);
      userNotificationsService.addNotifications(vm.notificationsTestObjectsWithManyTypes);
      $timeout(function () {userNotificationsService.displayMessage('LOOffsfgsdfgsdfgsfdgsfdgOOOOOl');}, 2000 );
      $timeout(function () {userNotificationsService.displayMessages(['test1', 'test2', 'test3']); }, 5000);

    }])
    .directive('userNotifications', ['$window', 'userNotificationsService', function ($window, userNotificationsService){
      return {
        template: '<div class="user-notifications">' +
                      '<ul><li ng-repeat="item in notifications" class="{{item.type}}"><span class="message">{{item.message}}</span><span class="close" ng-click="close(item.id)"></span></li></ul>' +
                  '</div>',
        restrict: 'AE',
        link: function (scope, el, attr){
          scope.$watch(function () {
            return userNotificationsService.getNotifications();
          }, function () {
            scope.notifications = userNotificationsService.getNotifications();
          });
          scope.close = function (id) {
            userNotificationsService.closeNotificationById(id);
          };
        }
      };
    }]);
})();
