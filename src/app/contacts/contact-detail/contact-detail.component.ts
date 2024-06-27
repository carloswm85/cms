import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
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
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.contact = this.contactService.getContact(this.id);
    });
  }

  onDelete() {
    if (this.contact) {
      this.contactService.deleteContact(this.contact);
      void this.router.navigate(['/contacts']);
    }
  }
}
