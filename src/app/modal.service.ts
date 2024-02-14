import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // Se mantiene para el manejo separado de mensajes si es necesario
  private messageSource = new BehaviorSubject<string>('');
  // Ampliado para incluir 'message'
  private modalData = new BehaviorSubject<{id: string, visible: boolean, type: 'success' | 'error', message: string}>({
    id: '',
    visible: false,
    type: 'error',
    message: ''
  });

  currentMessage = this.messageSource.asObservable();
  modalDataObservable = this.modalData.asObservable();

  constructor() { }

  // Este método ahora es opcional, dependiendo de si quieres manejar mensajes separadamente
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  // Actualiza show para incluir el mensaje
  show(id: string, type: 'success' | 'error', message: string) {
    this.modalData.next({id: id, visible: true, type: type, message: message});
  }

  hide(id: string) {
    // Al ocultar el modal, simplemente se actualiza la visibilidad sin cambiar el mensaje o el tipo
    // Puedes optar por resetear el mensaje aquí si lo consideras necesario
    this.modalData.next({id: id, visible: false, type: this.modalData.value.type, message: this.modalData.value.message});
  }
}
