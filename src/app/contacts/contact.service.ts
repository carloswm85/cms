import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactsChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  private maxContactId: number;

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
    const pos: number = this.contacts.indexOf(contact);

    // If the index is negative, the contact was not found and the method is aborted.
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);

    /* Unused section */
    // We then emit the contactChangedEvent to signal that a change
    // has been made to the contact list and pass it a copy of the contact
    // list stored in the ContactService class.
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone); // EMIT TO THE EVER SUBSCRIPTOR
  }

  addContact(newContact: Contact) {
    if (newContact == null || newContact == undefined) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (
      originalContact == null ||
      originalContact == undefined ||
      newContact == null ||
      newContact == undefined
    ) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }
}
