import { EventEmitter, Injectable } from '@angular/core';
import { Document } from '../../models/document.model';
import { MOCKDOCUMENTS } from '../document-data/MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string) {
    const document = this.documents.find(doc => doc.id == id);
    console.log(document);if (document == null) return null;
    return document;
  }
}
