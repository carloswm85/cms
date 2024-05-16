import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contacts/contact.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Input() contact: Contact;
  @Output() selectedContact = new EventEmitter<void>();

  onSelected() {
    this.selectedContact.emit();
  }
}
