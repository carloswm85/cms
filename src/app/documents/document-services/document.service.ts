import { EventEmitter, Injectable } from '@angular/core';
import { Document } from '../document.model';
import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  isLocalhost: boolean = true;
  documentsUrl: string = this.isLocalhost
    ? 'http://localhost:3000/documents/'
    : 'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/documents.json';

  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {}

  // =================================================================== GET ONE
  getDocument(id: string) {
    const document = this.documents.find((doc) => doc.id == id);
    console.log('>> APP:DOCUMENT:SERVICE:GETDOCUMENT: ', document);
    if (document == null) return null;
    return document;
  }

  // =================================================================== GET ALL
  getDocuments() {
    this.http
      .get<{ message: string; documents: Document[] }>(this.documentsUrl)
      // Call the Observable class’s subscribe() method
      .subscribe({
        next: (response) => {
          console.log(
            '>> APP:DOCUMENT:SERVICE:GETDOCUMENT_S: ',
            response.documents
          );
          this.documents = response.documents;
          this.sortAndSend();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  // ====================================================================== POST
  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    // make sure id of the new Document is empty
    newDocument.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; document: Document }>(
        this.documentsUrl,
        newDocument,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
  }

  // ======================================================================= PUT
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(this.documentsUrl + originalDocument.id, newDocument, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        console.log(
          '>> APP:SERVICE:DOCUMENT:UPDATE:PUT:SUBSCRIBE:response ',
          response
        );
        this.documents[pos] = newDocument;
        this.sortAndSend();
      });
  }

  // ==================================================================== DELETE
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete(this.documentsUrl + document.id)
      .subscribe((response: Response) => {
        console.log(
          '>> APP:SERVICE:DOCUMENT:DELETE:SUBSCRIBE:response ',
          response
        );
        this.documents.splice(pos, 1);
        this.sortAndSend();
      });
  }

  // =========================================================== PRIVATE METHODS
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

  /**
   * This method will be called when a Document object is added, updated, or
   * deleted in the document list.
   */
  sortAndSend() {
    this.documents.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
