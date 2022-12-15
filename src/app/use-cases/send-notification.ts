import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notifications';
import { NotificationsRepository } from '../repositories/notification-repository';

export interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private _notificationRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, category, content } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this._notificationRepository.create(notification);

    return { notification };
  }
}
