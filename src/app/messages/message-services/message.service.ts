import { Injectable } from '@angular/core';
import { Message } from '../message.model';
import { MOCKMESSAGES } from '../message-data/MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  /* messagesChangedEvent = new EventEmitter<Message[]>(); */
  messagesChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  getMessage(id: string) {
    const message = this.messages[id];
    if (message == null) return null;
    return message;
  }

  addMessage(newMessage: Message) {
    this.messages.unshift(newMessage);
    const clonedList = this.messages.slice();
    this.messagesChangedEvent.next(clonedList);
    this.storeMessages();
  }

  /* ================================= HTTP ================================= */

  /**
   *
   * @param fromMemory
   * @returns
   */
  getMessages(fromMemory: boolean = true): Message[] {
    if (fromMemory) {
      return this.messages.slice() || null;
    }

    this.http
      .get<Message[]>(
        'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/messages.json'
      )
      // Call the Observable class’s subscribe() method
      .subscribe(
        // success method
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a, b) => +a.id - +b.id); // Sort the list of messages by id
          const clonedList = this.messages.slice();
          // Emit the next message list change event
          this.messagesChangedEvent.next(clonedList);
        },
        // error method
        (error: unknown) => {
          console.log(error);
        }
      );
  }

  /**
   * This method will be called when a Message object is added, updated, or
   * deleted in the message list.
   */
  storeMessages() {
    const messages = this.getMessages();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // The put() method returns an Observable object because HTTP requests are
    // asynchronous.

    // 01 - Subscription on component approach (this may require a loading
    // spinner to be included)
    /* return this.http.put(
      'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/messages.json', // add `.json`
      recipes
    ); */

    // 02 - Subscribe in the service
    this.http
      .put(
        'https://ng-complete-guide-2024-udemy-default-rtdb.firebaseio.com/messages.json',
        messages,
        { headers: headers }
      )
      .subscribe((response) => {
        console.log('>>> PUT');
        console.log(response);
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => +a.id - +b.id); // Sort the list of messages by id
        const clonedList = this.messages.slice();
        this.messagesChangedEvent.next(clonedList); // Emit the next message list change event
      });
  }

  /* ================================ PRIVATE =============================== */

  /**
   *
   * @returns
   */
  getMaxId(): number {
    if (!this.messages || this.messages.length === 0) {
      return -1; // Or any appropriate value indicating no messages are present
    }

    let maxId = -Infinity;

    this.messages.forEach((message) => {
      const currentId = Number(message.id);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }
}
