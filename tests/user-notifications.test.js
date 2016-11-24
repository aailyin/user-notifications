describe('user-notifications-->', function () {

  beforeEach(module('userNotifications'));

  var userNotificationsService;

  beforeEach(inject(function (_userNotificationsService_) {
    userNotificationsService = _userNotificationsService_;
  }));

  describe('all functions should be defined-->', function () {
    it('add should be defined', function () {
      expect(userNotificationsService.add).toBeDefined();
    });

    it('push should be defined', function () {
      expect(userNotificationsService.push).toBeDefined();
    });

    it('displayMessage should be defined', function () {
      expect(userNotificationsService.displayMessage).toBeDefined();
    });

    it('displayMessages should be defined', function () {
      expect(userNotificationsService.displayMessages).toBeDefined();
    });

    it('closeById should be defined', function () {
      expect(userNotificationsService.closeById).toBeDefined();
    });

    it('closeByType should be defined', function () {
      expect(userNotificationsService.closeByType).toBeDefined();
    });

    it('closeAll should be defined', function () {
      expect(userNotificationsService.closeAll).toBeDefined();
    });

    it('getAll should be defined', function () {
      expect(userNotificationsService.getAll).toBeDefined();
    });
  });

  describe('methods of adding of notifications should work-->', function () {

    beforeEach(function () {
      userNotificationsService.closeAll();
    });

    it('add should add one valid notification with many messages', function () {
      var notification = { message: ['test1', 'test2', 'test3'], type: 'success', isStatic: false};
      userNotificationsService.add(notification);
      expect(userNotificationsService.getAll().length).toEqual(3);
    });

    it('add shouldn\'t add incorrect values in messages', function () {
      userNotificationsService.add(undefined);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.add(null);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.add();
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.add([]);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.add(NaN);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.add(Infinity);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.add('test');
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.add(1);
      expect(userNotificationsService.getAll().length).toEqual(0);
    });

    it('push should add one valid notification with many messages', function () {
      var notifications = [ { message: ['test1', 'test2'], type: 'info'},
                           { message: 'JustString', type: 'error'}];
      userNotificationsService.push(notifications);
      expect(userNotificationsService.getAll().length).toEqual(3);
    });

    it('push shouldn\'t add incorrect values in messages', function () {
      userNotificationsService.push(undefined);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.push(null);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.push();
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.push({});
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.push(NaN);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.push(Infinity);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.push('test');
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.push(1);
      expect(userNotificationsService.getAll().length).toEqual(0);
    });

    it('displayMessage should add one valid notification with one message', function () {
      var notification = 'test';
      userNotificationsService.displayMessage(notification);
      expect(userNotificationsService.getAll().length).toEqual(1);
    });

    it('displayMessage shouldn\'t add incorrect values in messages', function () {
      userNotificationsService.displayMessage(undefined);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessage(null);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessage();
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessage({});
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessage(NaN);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessage(Infinity);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessage([]);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessage(1);
      expect(userNotificationsService.getAll().length).toEqual(0);
    });

    it('displayMessages should add 3 valid notification with simple messages', function () {
      var notifications = ['test1', 'test2', 'test3'];
      userNotificationsService.displayMessages(notifications);
      expect(userNotificationsService.getAll().length).toEqual(3);
    });

    it('displayMessages shouldn\'t add incorrect values in messages', function () {
      userNotificationsService.displayMessages(undefined);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessages(null);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessages();
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessages({});
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessages(NaN);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessages(Infinity);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessages([1, undefined, NaN]);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessages([{}, null, NaN]);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessages([1, Infinity, []]);
      expect(userNotificationsService.getAll().length).toEqual(0);

      userNotificationsService.displayMessages(1);
      expect(userNotificationsService.getAll().length).toEqual(0);
    });

    it('closeById should close added notification by id', function () {
      var notification = 'test1';
      var addedNotificationId = userNotificationsService.displayMessage(notification);
      expect(userNotificationsService.getAll().length).toEqual(1);
      userNotificationsService.closeById(addedNotificationId);
      expect(userNotificationsService.getAll().length).toEqual(0);
    });

    it('closeByType should close added notifications by type', function () {
      var notifications = [{message: 'test1', type: 'info'},
                          {message: 'test2', type: 'info'},
                          {message: 'test3', type: 'error'}];
      userNotificationsService.push(notifications);
      expect(userNotificationsService.getAll().length).toEqual(3);
      userNotificationsService.closeByType('info');
      expect(userNotificationsService.getAll().length).toEqual(1);
      userNotificationsService.closeByType('error');
      expect(userNotificationsService.getAll().length).toEqual(0);
    });

    it('closeAll should close all added notifications', function () {
      var notifications = [{message: 'test1', type: 'info'},
                          {message: 'test2', type: 'info'},
                          {message: 'test3', type: 'error'}];
      userNotificationsService.closeAll(notifications);
      expect(userNotificationsService.getAll().length).toEqual(0);
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



  //TODO: check why it doesnt work
  /*describe('notification should be closed after some time--->', function () {
    var timerCallback, notification, time;

    beforeEach(function () {
      notification = {
        message: 'Test',
        callback: function () {}
      };
      timerCallback = spyOn(notification, 'callback');
      jasmine.clock().install();
    });

    afterEach(function (){
      jasmine.clock().uninstall();
    });

    it('notification is closed after default time', function (){
      time = userNotificationsService.getTimeoutTime() + 1;
      console.log(time)
      userNotificationsService.add(notification);

      expect(timerCallback).not.toHaveBeenCalled();

      jasmine.clock().tick(time);

      expect(timerCallback).toHaveBeenCalled();
    });
  });*/
});
