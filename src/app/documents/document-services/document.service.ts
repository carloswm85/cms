import { EventEmitter, Injectable } from '@angular/core';
import { Document } from '../document.model';
import { MOCKDOCUMENTS } from '../document-data/MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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
    /* const documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone); */
    this.storeDocuments();
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

    /* const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone); */
    this.storeDocuments();
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
    /* const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone); */
    this.storeDocuments();
  }

  /* ================================= HTTP ================================= */

  /**
   * Call the HTTP service’s get() method to make an HTTP Get request to get the
   * array of documents from your Firebase database server. It returns an
   * Observable object because all HTTP requests are asynchronous (i.e. the
   * response will not be returned immediately). This Observable object waits
   * and listens for a response to be returned from the server.
   */
  getDocuments(fromMemory: boolean = true) {
    if (fromMemory) {
      return this.documents.slice() || null;
    }

    this.http
      .get<Document[]>(
        'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/documents.json'
      )
      // Call the Observable class’s subscribe() method
      .subscribe(
        // success method
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => +a.id - +b.id); // Sort the list of documents by id
          const clonedList = this.documents.slice();
          // Emit the next document list change event
          this.documentListChangedEvent.next(clonedList);
        },
        // error method
        (error: unknown) => {
          console.log(error);
        }
      );
  }

  /**
   * This method will be called when a Document object is added, updated, or
   * deleted in the document list.
   */
  storeDocuments() {
    const documents = this.getDocuments();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // The put() method returns an Observable object because HTTP requests are
    // asynchronous.

    // 01 - Subscription on component approach (this may require a loading
    // spinner to be included)
    /* return this.http.put(
      'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/documents.json', // add `.json`
      recipes
    ); */

    // 02 - Subscribe in the service
    this.http
      .put(
        'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/documents.json',
        documents,
        { headers: headers }
      )
      .subscribe((response) => {
        console.log('>>> PUT');
        console.log(response);
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => +a.id - +b.id); // Sort the list of documents by id
        const clonedList = this.documents.slice();
        this.documentListChangedEvent.next(clonedList); // Emit the next document list change event
      });
  }
}
