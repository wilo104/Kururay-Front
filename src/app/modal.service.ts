import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private messageSource = new BehaviorSubject<string>('');
  private isVisibleSource = new BehaviorSubject<boolean>(false);

  currentMessage = this.messageSource.asObservable();
  isVisible = this.isVisibleSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  show() {
    this.isVisibleSource.next(true);
  }

  hide() {
    this.isVisibleSource.next(false);
  }
}