import { Component, OnInit } from '@angular/core';
import { Document } from '../../models/document.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document; // edited version of the document
  editMode: boolean = false;

  ngOnInit(): void {
    return;
  }
  onCancel() {}
}
