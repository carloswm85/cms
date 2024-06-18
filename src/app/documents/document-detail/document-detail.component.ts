import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../../models/document.model';
import { DocumentService } from '../document-services/document.service';
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
    this.nativeWindow = this.windowRefService.getNativeWindow();
    // const id = this.route.snapshot.params['id']; // do not use this approach
    this.route.params.subscribe((params: Params) => {
      this.document = this.documentService.getDocument(params['id'] as string);
    });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    console.log(this.document);
    this.documentService.deleteDocument(this.document);
    //  route back to the '/documents' URL
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
