import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactsChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  private maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
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
    /* const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone); */
    this.storeContacts();
  }

  addContact(newContact: Contact) {
    if (newContact == null || newContact == undefined) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    /* const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone); */
    this.storeContacts();
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
    /* const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone); */
    this.storeContacts();
  }

  getMaxId(): number {
    if (!this.contacts || this.contacts.length === 0) {
      return -1; // Or any appropriate value indicating no contacts are present
    }

    let maxId = -Infinity;

    this.contacts.forEach((contact) => {
      const currentId = Number(contact.id);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  /* ================================= HTTP ================================= */

  /**
   *
   * @param fromMemory
   * @returns
   */
  getContacts(fromMemory: boolean = true): Contact[] {
    if (fromMemory) {
      return this.contacts.slice() || null;
    }

    this.http
      .get<Contact[]>(
        'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/contacts.json'
      )
      // Call the Observable class’s subscribe() method
      .subscribe(
        // success method
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => +a.id - +b.id); // Sort the list of contacts by id
          const clonedList = this.contacts.slice();
          // Emit the next contact list change event
          this.contactListChangedEvent.next(clonedList);
        },
        // error method
        (error: unknown) => {
          console.log(error);
        }
      );
  }

  /**
   * This method will be called when a Contact object is added, updated, or
   * deleted in the contact list.
   */
  storeContacts() {
    const contacts = this.getContacts();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // The put() method returns an Observable object because HTTP requests are
    // asynchronous.

    // 01 - Subscription on component approach (this may require a loading
    // spinner to be included)
    /* return this.http.put(
      'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/contacts.json', // add `.json`
      recipes
    ); */

    // 02 - Subscribe in the service
    this.http
      .put(
        'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/contacts.json',
        contacts,
        { headers: headers }
      )
      .subscribe((response) => {
        console.log('>>> PUT');
        console.log(response);
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => +a.id - +b.id); // Sort the list of contacts by id
        const clonedList = this.contacts.slice();
        this.contactListChangedEvent.next(clonedList); // Emit the next contact list change event
      });
  }
}
