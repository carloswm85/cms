import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent {
  @Output() contactWasSelected = new EventEmitter<Contact>();
  contacts: Contact[] = [
    {
      id: '1',
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      description: 'This is R. Kent Jackson description',
      imageUrl: '../../assets/images/jacksonk.jpg',
      group: null,
    },
    {
      id: '2',
      name: 'Rex Barzee',
      email: 'barzeer@byui.edu',
      phone: '208-496-3768',
      description: 'This is Rex Barzee description',
      imageUrl: '../../assets/images/barzeer.jpg',
      group: null,
    },
  ];

  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }
}
