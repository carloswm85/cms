import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Document } from '../../models/document.model';
import { DocumentService } from '../document-services/document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit, OnDestroy {
  // documents: Document[] = [
  //   new Document('id0', 'name0', 'description0', 'url0', null),
  //   new Document('id1', 'name1', 'description1', 'url1', null),
  //   new Document('id2', 'name2', 'description2', 'url2', null),
  //   new Document('id3', 'name3', 'description3', 'url3', null),
  // ];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [];
  subscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription =
      this.documentService.documentListChangedEventUsingSubject.subscribe(
        (documentsList: Document[]) => {
          this.documents = documentsList;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // OLD
  /* onSelectedDocument(document: Document) {
    // this.selectedDocumentEvent.emit(document);
    this.documentService.documentSelectedEvent.emit(document);
  } */
}
