import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notificationts-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should to be able to send a notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      recipientId: 'example-recipient-id',
      content: 'This is a notification',
      category: 'social',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
