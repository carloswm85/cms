export class Contact {
  public id: string; // id of the contact.
  public name: string; // name of the contact.
  public email: string; // email address of the contact.
  public phone: string; // phone number of the contact.
  public imageUrl: string; // URL of the photo image of the contact.
  public group: Contact[]; // attribute is only applicable to group contacts. It is an array of other contacts that belong to the group.

  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    imageUrl: string,
    group: Contact[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.group = group;
  }
}
