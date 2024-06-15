import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { MOCKCONTACTS } from '../contact-data/MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find(item => item.id == id) || null;
  }
}
