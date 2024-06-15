import { Component, Input } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../contact-services/contact.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css',
})
export class ContactItemComponent {
  @Input() contact: Contact;
  // @Output() selectedContact = new EventEmitter<void>();

  constructor(private contactService: ContactService) {}

  onSelected() {
    // this.selectedContact.emit();
    console.log(this.contact);
    this.contactService.contactSelectedEvent.emit(this.contact);
  }
}
