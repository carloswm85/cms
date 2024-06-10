import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';

const appRoutes: Routes = [
  // an empty path '' is part of every other path
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  {
    path: 'documents',
    component: DocumentsComponent,
    // Child paths are SEQUENTIAL
    // Child routes allow us to dynamically load and display sub-components.
    children: [
      // CREATE - fully new item at RecipeEditComponent
      { path: 'new', component: DocumentEditComponent },
      // READ
      { path: ':id', component: DocumentDetailComponent },
      // UPDATE - edit mode at RecipeEditComponent
      { path: ':id/edit', component: DocumentEditComponent },
    ],
  },
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
