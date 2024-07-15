import { Injectable } from '@angular/core';
import { Message } from '../message.model';
import { MOCKMESSAGES } from '../message-data/MOCKMESSAGES';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  /* messagesChangedEvent = new EventEmitter<Message[]>(); */
  messagesChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  //
  isLocalhost: boolean = true;
  messagesUrl: string = this.isLocalhost
    ? 'http://localhost:3000/messages/'
    : 'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  // =================================================================== GET ONE
  getMessage(id: string) {
    const message = this.messages.find((mess) => mess.id == id);
    console.log('>> APP:MESSAGE:SERVICE:GETMESSAGE: ', message);
    if (message == null) return null;
    return message;
  }

  // =================================================================== GET ALL
  getMessages() {
    this.http
      .get<{ message: string; messages: Message[] }>(this.messagesUrl)
      .subscribe({
        next: (response) => {
          console.log(
            '>> APP:MESSAGES:SERVICE:GETMESSAGES: ',
            response.messages
          );
          this.messages = response.messages;
          this.sortAndSend();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  // ====================================================================== POST
  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }
    console.log('>> APP:SERVICE:MESSAGE:POST:newMessage', newMessage);

    // make sure id of the new Message is empty
    newMessage.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; messageItem: Message }>(
        this.messagesUrl,
        newMessage,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        console.log(
          '>> APP:SERVICE:MESSAGE:POST:newMessage',
          responseData.messageItem
        );
        this.messages.push(responseData.messageItem);
        this.sortAndSend();
      });
  }

  // ======================================================================= PUT
  /* NOT REQUIRED */

  // ==================================================================== DELETE
  /* NOT REQUIRED */

  // =========================================================== PRIVATE METHODS
  getMaxId(): number {
    if (!this.messages || this.messages.length === 0) {
      return -1; // Or any appropriate value indicating no messages are present
    }

    let maxId = -Infinity;

    this.messages.forEach((mess) => {
      const currentId = Number(mess.id);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  /**
   * This method will be called when a Document object is added, updated, or
   * deleted in the document list.
   */
  sortAndSend() {
    this.messages.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    const messagesCloned = this.messages.slice();
    console.log('>> APP:SERVICE:MESSAGES:messages:', messagesCloned);
    this.messagesChangedEvent.next(messagesCloned);
  }
}
