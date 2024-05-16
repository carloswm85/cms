import { Component } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('idValue0', 'subjectValue0', 'messageValue0', 'Carlos0'),
    new Message('idValue1', 'subjectValue1', 'messageValue1', 'Carlos1'),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
