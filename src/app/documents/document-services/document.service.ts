import { EventEmitter, Injectable } from '@angular/core';
import { Document } from '../../models/document.model';
import { MOCKDOCUMENTS } from '../document-data/MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string) {
    const document = this.documents.find((doc) => doc.id == id);
    console.log(document);
    if (document == null) return null;
    return document;
  }

  // The method is aborted if no document was passed.
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);

    // If the index is negative, the document was not found and the method is aborted.
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    // We then emit the documentChangedEvent to signal that a change
    // has been made to the document list and pass it a copy of the document
    // list stored in the DocumentService class.
    this.documentChangedEvent.emit(this.documents.slice()); // EMIT TO THE EVER SUBSCRIPTOR
  }
}
