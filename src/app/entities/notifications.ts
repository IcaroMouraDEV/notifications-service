import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';
import { Content } from './content';

export interface NotificationData {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private _props: NotificationData;

  constructor(
    props: Replace<NotificationData, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set recipientId(recipientId: string) {
    this._props.recipientId = recipientId;
  }

  public get recipientId() {
    return this._props.recipientId;
  }

  public set content(content: Content) {
    this._props.content = content;
  }

  public get content() {
    return this._props.content;
  }

  public set category(category: string) {
    this._props.category = category;
  }

  public get category() {
    return this._props.category;
  }

  public read() {
    this._props.readAt = new Date();
  }

  public unread() {
    this._props.readAt = null;
  }

  public get readAt() {
    return this._props.readAt;
  }

  public cancel() {
    this._props.canceledAt = new Date();
  }

  public get canceledAt() {
    return this._props.canceledAt;
  }

  public get createdAt() {
    return this._props.createdAt;
  }
}
