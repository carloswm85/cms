import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../models/message.model';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../contacts/contact-services/contact.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContact(
      this.message.sender
    );
    this.messageSender = contact.name;
  }
}
