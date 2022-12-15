export class Content {
  private readonly _content: string;

  get value(): string {
    return this._content;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) throw new Error('content length error.');

    this._content = content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
