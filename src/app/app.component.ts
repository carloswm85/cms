import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CMS - Spring 2024 WDD430';

  // OLD ROUTING IMPLEMENTATION
  /*
  selectedFeature: string = 'message-list';

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
  */
}
