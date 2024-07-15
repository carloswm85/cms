import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message-services/message.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  @ViewChild('subjectText', { static: false }) subjectRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgRef: ElementRef;

  senderID: string = '99';
  currentSender: string = 'Carlos Mercado';

  
  contact: Contact = {
    id: '99',
    name: 'Carlos Mercado',
    email: 'cm@byui.edu',
    phone: '222',
    description: 'This is some description',
    imageUrl: '../../assets/images/carlos.png',
    group: null
  };

  constructor(private messageService: MessageService, ) {}

  onSendMessage() {
    const newSubject = this.subjectRef.nativeElement.value;
    const newMsg = this.msgRef.nativeElement.value;
    const newMessage = new Message('', newSubject, newMsg, this.contact.id);
    console.log('>> APP:MESSAGE:EDITCOMPONENT:onSendMessage:newMessage',newMessage);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgRef.nativeElement.value = '';
  }
}
