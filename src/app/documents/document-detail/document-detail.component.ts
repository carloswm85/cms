import { Component, OnInit } from '@angular/core';
import { Document } from '../../models/document.model';
import { DocumentService } from '../document-services/document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent implements OnInit {
  /* @Input() document: Document; */
  document: Document;
  id: string;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id']; // do not use this approach
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.document = this.documentService.getDocument(this.id);
    });
  }


}
