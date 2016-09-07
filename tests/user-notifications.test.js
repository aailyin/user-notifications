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
      userNotificationsService.addNotification(notifications);
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

  });

});