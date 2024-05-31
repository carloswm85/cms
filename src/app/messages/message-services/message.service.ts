import { EventEmitter, Injectable } from '@angular/core';
import { Message } from '../../models/message.model';
import { MOCKMESSAGES } from '../message-data/MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  messagesChangedEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string) {
    const message = this.messages[id];
    if (message == null) return null;
    return message;
  }

  addMessage(newMessage: Message) {
    this.messages.unshift(newMessage);
    this.messagesChangedEvent.emit(this.messages);
  }
}
