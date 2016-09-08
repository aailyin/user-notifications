describe('user-notifications-->', function () {

  beforeEach(module('userNotifications'));

  var userNotificationsService;

  beforeEach(inject(function (_userNotificationsService_) {
    userNotificationsService = _userNotificationsService_;
  }));

  describe('all functions should be defined-->', function () {
    it('addNotification should be defined', function () {
      expect(userNotificationsService.addNotification).toBeDefined();
    });

    it('addNotifications should be defined', function () {
      expect(userNotificationsService.addNotifications).toBeDefined();
    });

    it('displayMessage should be defined', function () {
      expect(userNotificationsService.displayMessage).toBeDefined();
    });

    it('displayMessages should be defined', function () {
      expect(userNotificationsService.displayMessages).toBeDefined();
    });

    it('closeNotificationById should be defined', function () {
      expect(userNotificationsService.closeNotificationById).toBeDefined();
    });

    it('closeNotificationByType should be defined', function () {
      expect(userNotificationsService.closeNotificationByType).toBeDefined();
    });

    it('closeAllNotifications should be defined', function () {
      expect(userNotificationsService.closeAllNotifications).toBeDefined();
    });

    it('getNotifications should be defined', function () {
      expect(userNotificationsService.getNotifications).toBeDefined();
    });
  });

  describe('methods of adding of notifications should work-->', function () {

    beforeEach(function () {
      userNotificationsService.closeAllNotifications();
    });

    it('addNotification should add one valid notification with many messages', function () {
      var notification = { message: ['test1', 'test2', 'test3'], type: 'success', isStatic: false};
      userNotificationsService.addNotification(notification);
      expect(userNotificationsService.getNotifications().length).toEqual(3);
    });

    it('addNotification shouldn\'t add incorrect values in messages', function () {
      userNotificationsService.addNotification(undefined);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotification(null);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotification();
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotification([]);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotification(NaN);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotification(Infinity);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotification('test');
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotification(1);
      expect(userNotificationsService.getNotifications().length).toEqual(0);
    });

    it('addNotifications should add one valid notification with many messages', function () {
      var notifications = [ { message: ['test1', 'test2'], type: 'info'},
                           { message: 'JustString', type: 'error'}];
      userNotificationsService.addNotifications(notifications);
      expect(userNotificationsService.getNotifications().length).toEqual(3);
    });

    it('addNotifications shouldn\'t add incorrect values in messages', function () {
      userNotificationsService.addNotifications(undefined);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotifications(null);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotifications();
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotifications({});
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotifications(NaN);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotifications(Infinity);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotifications('test');
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.addNotifications(1);
      expect(userNotificationsService.getNotifications().length).toEqual(0);
    });

    it('displayMessage should add one valid notification with one message', function () {
      var notification = 'test';
      userNotificationsService.displayMessage(notification);
      expect(userNotificationsService.getNotifications().length).toEqual(1);
    });

    it('displayMessage shouldn\'t add incorrect values in messages', function () {
      userNotificationsService.displayMessage(undefined);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessage(null);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessage();
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessage({});
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessage(NaN);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessage(Infinity);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessage([]);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessage(1);
      expect(userNotificationsService.getNotifications().length).toEqual(0);
    });

    it('displayMessages should add 3 valid notification with simple messages', function () {
      var notifications = ['test1', 'test2', 'test3'];
      userNotificationsService.displayMessages(notifications);
      expect(userNotificationsService.getNotifications().length).toEqual(3);
    });

    it('displayMessages shouldn\'t add incorrect values in messages', function () {
      userNotificationsService.displayMessages(undefined);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessages(null);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessages();
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessages({});
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessages(NaN);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessages(Infinity);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessages([1, undefined, NaN]);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessages([{}, null, NaN]);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessages([1, Infinity, []]);
      expect(userNotificationsService.getNotifications().length).toEqual(0);

      userNotificationsService.displayMessages(1);
      expect(userNotificationsService.getNotifications().length).toEqual(0);
    });

    it('closeNotificationById should close added notification by id', function () {
      var notification = 'test1';
      var addedNotificationId = userNotificationsService.displayMessage(notification);
      expect(userNotificationsService.getNotifications().length).toEqual(1);
      userNotificationsService.closeNotificationById(addedNotificationId);
      expect(userNotificationsService.getNotifications().length).toEqual(0);
    });

    it('closeNotificationByType should close added notifications by type', function () {
      var notifications = [{message: 'test1', type: 'info'},
                          {message: 'test2', type: 'info'},
                          {message: 'test3', type: 'error'}];
      userNotificationsService.addNotifications(notifications);
      expect(userNotificationsService.getNotifications().length).toEqual(3);
      userNotificationsService.closeNotificationByType('info');
      expect(userNotificationsService.getNotifications().length).toEqual(1);
      userNotificationsService.closeNotificationByType('error');
      expect(userNotificationsService.getNotifications().length).toEqual(0);
    });

    it('closeAllNotifications should close all added notifications', function () {
      var notifications = [{message: 'test1', type: 'info'},
                          {message: 'test2', type: 'info'},
                          {message: 'test3', type: 'error'}];
      userNotificationsService.closeAllNotifications(notifications);
      expect(userNotificationsService.getNotifications().length).toEqual(0);
    });

    it('setTimeoutTime should set timeout', function () {
      userNotificationsService.setTimeoutTime(5000);
      expect(userNotificationsService.getTimeoutTime()).toEqual(5000);
    });

    it('setTimeoutTime shouldn\'t set timeout incorrect value', function () {
      userNotificationsService.setTimeoutTime(6000);

      var time = userNotificationsService.getTimeoutTime();

      userNotificationsService.setTimeoutTime(null);
      expect(userNotificationsService.getTimeoutTime()).toEqual(time);

      userNotificationsService.setTimeoutTime(undefined);
      expect(userNotificationsService.getTimeoutTime()).toEqual(time);

      userNotificationsService.setTimeoutTime();
      expect(userNotificationsService.getTimeoutTime()).toEqual(time);

      userNotificationsService.setTimeoutTime(NaN);
      expect(userNotificationsService.getTimeoutTime()).toEqual(time);

      userNotificationsService.setTimeoutTime(Infinity);
      expect(userNotificationsService.getTimeoutTime()).toEqual(time);

      userNotificationsService.setTimeoutTime([]);
      expect(userNotificationsService.getTimeoutTime()).toEqual(time);

      userNotificationsService.setTimeoutTime({});
      expect(userNotificationsService.getTimeoutTime()).toEqual(time);

      userNotificationsService.setTimeoutTime('5000');
      expect(userNotificationsService.getTimeoutTime()).toEqual(time);
    });
  });

});