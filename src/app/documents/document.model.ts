export class Document {
  public id: string; //the document id
  public name: string; //the name of the document
  public description: string; // a brief description of the document
  public url: string; //the URL of where the file is located
  public children?: Document[]; // a list of document objects that are related to the current document

  constructor(
    id: string,
    name: string,
    description: string,
    url: string,
    children: Document[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.children = children;
  }
}
