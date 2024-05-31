import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message.model';
import { MessageService } from '../message-services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit {
  // messages: Message[] = [
  //   new Message('idValue0', 'subjectValue0', 'messageValue0', 'Carlos0'),
  //   new Message('idValue1', 'subjectValue1', 'messageValue1', 'Carlos1'),
  // ];
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messagesChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  // onAddMessage(message: Message) {
  //   this.messages.unshift(message);
  // }
}
