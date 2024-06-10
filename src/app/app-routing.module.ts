import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';

const appRoutes: Routes = [
  // an empty path '' is part of every other path
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  {
    path: 'documents',
    component: DocumentsComponent,
    // Child paths are SEQUENTIAL
    // children: [
    //   // This one component, RecipeStartComponent, shoudl be used inside RecipesComponent
    //   { path: '', component: RecipeStartComponent },
    //   // CREATE - fully new item at RecipeEditComponent
    //   { path: 'new', component: RecipeEditComponent },
    //   // READ
    //   { path: ':id', component: RecipeDetailComponent },
    //   // UPDATE - edit mode at RecipeEditComponent
    //   { path: ':id/edit', component: RecipeEditComponent },
    // ],
  },
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
