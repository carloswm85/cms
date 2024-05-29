import { Component, OnInit } from '@angular/core';
import { Document } from '../../models/document.model';
import { DocumentService } from '../document-services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  // documents: Document[] = [
  //   new Document('id0', 'name0', 'description0', 'url0', null),
  //   new Document('id1', 'name1', 'description1', 'url1', null),
  //   new Document('id2', 'name2', 'description2', 'url2', null),
  //   new Document('id3', 'name3', 'description3', 'url3', null),
  // ];
  documents: Document[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    // this.selectedDocumentEvent.emit(document);
    this.documentService.documentSelectedEvent.emit(document);
  }
}
