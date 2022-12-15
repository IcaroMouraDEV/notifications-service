import { Notification } from '@app/entities/notifications';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';

export interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private _notificationRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications =
      await this._notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
