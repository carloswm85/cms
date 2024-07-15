import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  contact: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    console.log('>> APP:MESSAGEITEM:ONINIT:message: ', this.message);
    this.contact = this.contactService.getContact(this.message.senderId);
  }
}
