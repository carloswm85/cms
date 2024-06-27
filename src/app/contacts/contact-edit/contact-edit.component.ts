import { Component, ViewChild } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent {
  @ViewChild('f') contactForm!: NgForm;
  groupContacts: Contact[];
  contact: Contact;

  onCancel() {}

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
