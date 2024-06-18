import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../models/document.model';
import { DocumentService } from './document-services/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
  providers: [DocumentService]
})
export class DocumentsComponent implements OnInit {
  @Input() selectedDocument: Document;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
        console.log("Document Selected: " + document.name);
      }
    );
  }
}
