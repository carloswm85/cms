import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { MOCKCONTACTS } from '../contact-data/MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactsChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEventUsingSubject = new Subject<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((item) => item.id == id) || null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    console.log(contact);
    const pos = this.contacts.indexOf(contact);

    // If the index is negative, the document was not found and the method is aborted.
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);

    /* Unused section */
    // We then emit the documentChangedEvent to signal that a change
    // has been made to the document list and pass it a copy of the document
    // list stored in the DocumentService class.
    this.contactsChangedEvent.emit(this.contacts.slice()); // EMIT TO THE EVER SUBSCRIPTOR
  }
}
