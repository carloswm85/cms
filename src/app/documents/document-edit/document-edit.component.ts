import { Component, OnInit, ViewChild } from '@angular/core';
import { Document } from '../../models/document.model';
import { NgForm } from '@angular/forms';

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

  ngOnInit(): void {
    return;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }


  onCancel() {}
}
