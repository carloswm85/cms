import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../contact-services/contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent {
  /* @Input() contact: Contact; */
  contact: Contact;
  id: string;
  /* contact: Contact = {
    id: '1',
    name: 'R. Kent Jackson',
    email: 'jacksonk@byui.edu',
    phone: '208-496-3771',
    description: 'This is a description.',
    imageUrl: '../../assets/images/jacksonk.jpg',
    group: null,
  }; */

  constructor(
    private contactServie: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.contact = this.contactServie.getContact(this.id);
    });
  }
}
