import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  collapsed = true;
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  // This method is responsible for emitting or firing the selectedFeatureEvent.
  onSelected(selectedEvent: string) {
    console.log(selectedEvent);
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
