import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  currentSender: string = 'Carlos';
  //
  @ViewChild('subjectText', { static: false }) subjectRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgRef: ElementRef;
  //
  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage() {
    const newSubject = this.subjectRef.nativeElement.value;
    const newMsg = this.msgRef.nativeElement.value;
    const newMessage = new Message(
      'idValue',
      newSubject,
      newMsg,
      this.currentSender
    );
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgRef.nativeElement.value = '';
  }
}
