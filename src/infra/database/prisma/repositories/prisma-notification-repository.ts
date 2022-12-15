import { Notification } from '@app/entities/notifications';
import { NotificationsRepository } from '@app/repositories/notification-repository';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this._prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) return null;

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notification = await this._prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notification.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this._prisma.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this._prisma.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this._prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
