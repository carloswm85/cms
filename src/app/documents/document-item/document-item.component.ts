import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Document } from "../../models/document.model";

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css',
})
export class DocumentItemComponent {
  @Input() document: Document;
  @Output() selectedDocument = new EventEmitter<void>();

  onSelect() {
    this.selectedDocument.emit();
  }

  onKeyup() {
    return;
  }
}
