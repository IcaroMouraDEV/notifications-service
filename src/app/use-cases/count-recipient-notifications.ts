import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';

export interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private _notificationRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this._notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
