import { Component, OnInit } from '@angular/core';
import { Document } from '../../models/document.model';
import { DocumentService } from '../document-services/document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../services/wind-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent implements OnInit {
  /* @Input() document: Document; */
  document: Document;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windowRefService: WindRefService
  ) {}

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id']; // do not use this approach
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.document = this.documentService.getDocument(this.id);
      this.nativeWindow = this.windowRefService.getNativeWindow();
    });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    //  route back to the '/documents' URL
    this.router.navigate(['documents'], { relativeTo: this.route });
  }
}
