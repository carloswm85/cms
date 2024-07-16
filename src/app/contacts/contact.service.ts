import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // ================================================================ PROPERTIES
  contactSelectedEvent = new EventEmitter<Contact>();
  contactsChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];

  private isLocalhost: boolean = true;
  private contactsUrl: string = this.isLocalhost
    ? 'http://localhost:3000/contacts/'
    : 'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/contacts.json';

  // =============================================================== CONSTRUCTOR
  constructor(private http: HttpClient) {}

  // =================================================================== GET ONE
  getContact(id: string): Contact {
    const contact = this.contacts.find((contact) => contact.id == id);
    console.log('>> APP:CONTACT:SERVICE:GETCONTACT: ', contact);
    if (contact == null) return null;
    return contact;
  }

  // =================================================================== GET ALL
  getContacts() {
    this.http
      .get<{ message: string; contacts: Contact[] }>(this.contactsUrl)
      // Call the Observable class’s subscribe() method
      .subscribe({
        next: (response) => {
          console.log(
            '>> APP:CONTACT:SERVICE:GETCONTACTS: ',
            response.contacts
          );
          this.contacts = response.contacts;
          this.sortAndSend();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  // ====================================================================== POST
  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    // make sure id of the new Contact is empty
    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; contact: Contact }>(
        this.contactsUrl,
        newContact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new contact to contacts
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  // ======================================================================= PUT
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(this.contactsUrl + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        console.log(
          '>> APP:SERVICE:CONTACT:UPDATE:PUT:SUBSCRIBE:response ',
          response
        );
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }

  // ==================================================================== DELETE
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete(this.contactsUrl + contact.id)
      .subscribe((response: Response) => {
        console.log(
          '>> APP:SERVICE:CONTACT:DELETE:SUBSCRIBE:response ',
          response
        );
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
  }

  // =========================================================== PRIVATE METHODS
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

  sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    const contactsCloned = this.contacts.slice().reverse();
    console.log('>> APP:SERVICE:CONTACTS:contacts:', contactsCloned);
    this.contactsChangedEvent.next(contactsCloned);
  }
}
