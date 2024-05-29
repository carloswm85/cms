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
    const singleContact = this.contacts[id];
    if (singleContact == null) return null;
    return this.contacts[id];
    // OR
    /**
     * getContact(id: string): Contact {
     * FOR each contact in the contacts list
     * IF contact.id equals the id THEN
     * RETURN contact
     * ENDIF
     * ENDFOR
     * RETURN null
     * }
     */
  }
}
