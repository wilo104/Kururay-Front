import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private messageSource = new BehaviorSubject<string>('');
  // Cambiamos isVisibleSource para manejar un objeto con id y visibilidad
  private isVisibleSource = new BehaviorSubject<{id: string, visible: boolean}>({id: '', visible: false});

  currentMessage = this.messageSource.asObservable();
  isVisible = this.isVisibleSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  // Ahora show y hide necesitan un id para identificar el modal específico
  show(id: string) {
    this.isVisibleSource.next({id: id, visible: true});
  }

  hide(id: string) {
    this.isVisibleSource.next({id: id, visible: false});
  }
}
