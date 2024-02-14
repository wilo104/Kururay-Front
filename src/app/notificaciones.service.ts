import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private modalService: ModalService) { }

  showSuccess(id: string, message: string) {
    // Directamente se llama a show con 'success' y el mensaje
    this.modalService.show(id, 'success', message);
  }

  showError(id: string, message: string) {
    // Directamente se llama a show con 'error' y el mensaje
    this.modalService.show(id, 'error', message);
  }
}
