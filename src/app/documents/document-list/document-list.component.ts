import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../../models/document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document('id0', 'name0', 'description0', 'url0', null),
    new Document('id1', 'name1', 'description1', 'url1', null),
    new Document('id2', 'name2', 'description2', 'url2', null),
    new Document('id3', 'name3', 'description3', 'url3', null),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
