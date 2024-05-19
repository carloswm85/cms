import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  ngOnInit(): void {
    return;
  }

  // This method is responsible for emitting or firing the selectedFeatureEvent.
  onSelected(selectedEvent: string) {
    console.log(selectedEvent);
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
