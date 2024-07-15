export class Message {
  public id: string; // the id of the message
  public subject: string; // the subject of the message
  public msgText: string; // the text of the message
  public senderId: string; // the sender of the message

  constructor(id: string, subject: string, msgText: string, senderId: string) {
    this.id = id;
    this.subject = subject;
    this.msgText = msgText;
    this.senderId = senderId;
  }
}
