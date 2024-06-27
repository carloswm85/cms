import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message-services/message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  currentSender: string = 'Carlos Mercado';
  senderID: string = '99';
  //
  @ViewChild('subjectText', { static: false }) subjectRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgRef: ElementRef;
  //
  // @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const newSubject = this.subjectRef.nativeElement.value;
    const newMsg = this.msgRef.nativeElement.value;
    const newMessage = new Message('', newSubject, newMsg, this.senderID);
    // this.addMessageEvent.emit(newMessage);
    console.log(newMessage);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgRef.nativeElement.value = '';
  }
}
