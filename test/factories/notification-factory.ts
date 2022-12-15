import { Content } from '@app/entities/content';
import { Notification, NotificationData } from '@app/entities/notifications';

type Override = Partial<NotificationData>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'recipient-1',
    content: new Content('This is a notification'),
    category: 'social',
    ...override,
  });
}
