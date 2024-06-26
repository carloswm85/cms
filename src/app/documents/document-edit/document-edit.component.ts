import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Document } from '../../models/document.model';
import { DocumentService } from '../document-services/document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  //
  @ViewChild('f', { static: false }) documentForm: NgForm;
  //
  originalDocument: Document;
  document: Document; // edited version of the document
  editMode: boolean = false;
  //
  documentId: number;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.documentId = +params['id'];

      if (this.documentId == undefined || this.documentId == null) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(params['id']);

      if (this.originalDocument == undefined || this.originalDocument == null) {
        return;
      }
      this.editMode = true;
      // How to clone an object
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const name: string = form.value['name'];
    const description: string = form.value['description'];
    const url: string = form.value['url'];

    const newDocument = new Document('', name, description, url, null);
    console.log(newDocument);
    if (this.editMode == true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
