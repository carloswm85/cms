import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  /**
   * @description When the ContactsFilterPipe is used in the cms application,
   * the value parameter will contain the array of contacts in the contact list.
   * The args parameter will contain the term or search value entered by the end
   * user.
   *
   * @param value The value parameter contains the data input to the pipe that
   * is to be transferred into a diﬀerent format.
   * @param args The args parameter contains an array of one or more values that
   * are needed to transform the data.
   * @returns The transformed data. It will return an array of only those
   * Contact objects whose name contains the term (search value) entered by the
   * end user.
   */
  /* transform(contacts: unknown, ...args: unknown[]): unknown { */
  transform(contacts: Contact[], term: string): Contact[] {
    //  Create a new array to contain the filtered list of contacts
    const filteredContacts: Contact[] = [];

    contacts.forEach((contact) => {
      if (contact.name.toLowerCase().includes(term)) {
        filteredContacts.push(contact);
      }
    });

    // This forEach could be replace with a JS filter()
    /*
      if (term && term.length > 0) {
        filteredContacts = contacts.filter((contact: Contact) =>
          contact.name.toLowerCase().includes(term.toLowerCase())
        );
      }
    */

    if (filteredContacts.length < 1) {
      return contacts;
    }

    return filteredContacts;
  }
}
