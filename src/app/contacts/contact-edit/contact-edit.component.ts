import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  contactId: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Implement the ngOnInit() lifecycle method. This method needs to subscribe
    // to the current route and get the value of the id parameter (if it exists)
    // from the URL. If the id has a value, the form is being used to edit an
    // existing item. Get the item and make a clone of it.
    this.route.params.subscribe((params: Params) => {
      this.contactId = params['id'];

      if (this.contactId == undefined || this.contactId == null) {
        this.editMode = false;
        this.contact = new Contact(
          '',
          '',
          '',
          '',
          '',
          'https://picsum.photos/300',
          null
        );
        return;
      }
      this.originalContact = this.contactService.getContact(params['id']);

      if (this.originalContact == undefined || this.originalContact == null) {
        return;
      }
      this.editMode = true;
      // How to clone an object
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      // Determine if `contact` has a group
      if (this.contact.group != null && this.contact.group.length < 1) {
        this.groupContacts = JSON.parse(
          JSON.stringify(this.originalContact.group)
        );
      }
    });
  }

  onSubmit(form: NgForm) {
    const newContact = new Contact(
      form.value['id'],
      form.value['name'],
      form.value['email'],
      form.value['phone'],
      form.value['description'],
      form.value['imageUrl'],
      form.value['group']
    );

    console.log('>> APP:CONTACTEDIT:onSubmit:newContact: ', newContact);
    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
