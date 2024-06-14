import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../contact-services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  /* @Output() selectedContactEvent = new EventEmitter<Contact>(); */
  /* contacts: Contact[] = [
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
  ]; */
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  // OLD IMPLEMENTATION
  /* onContactSelected(contact: Contact) {
    // this.selectedContactEvent.emit(contact);
    console.log(contact);
    this.contactService.contactSelectedEvent.emit(contact);
  } */
}
