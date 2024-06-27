import { EventEmitter, Injectable } from '@angular/core';
import { Document } from '../document.model';
import { MOCKDOCUMENTS } from '../document-data/MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.documents.slice() || null;
  }

  getDocument(id: string) {
    const document = this.documents.find((doc) => doc.id == id);
    console.log(document);
    if (document == null) return null;
    return document;
  }

  // The method is aborted if no document was passed.
  deleteDocument(document: Document) {
    if (document == null || document == undefined) {
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
    const documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }

  ///
  getMaxId(): number {
    if (!this.documents || this.documents.length === 0) {
      return -1; // Or any appropriate value indicating no documents are present
    }

    let maxId = -Infinity;

    this.documents.forEach((doc) => {
      const currentId = Number(doc.id);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument == null || newDocument == undefined) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (
      originalDocument == null ||
      originalDocument == undefined ||
      newDocument == null ||
      newDocument == undefined
    ) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
  //
}
