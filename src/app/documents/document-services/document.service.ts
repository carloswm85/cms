import { Injectable } from '@angular/core';
import { Document } from '../../models/document.model';
import { MOCKDOCUMENTS } from '../document-data/MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string) {
    const document = this.documents[id];
    if (document == null) return null;
    return document;
  }
}
