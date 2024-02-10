import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private modalService: ModalService) { }

  showSuccess(id: string, message: string) {
    this.modalService.changeMessage(message);
    this.modalService.show(id); // Ahora pasamos el id
  }

  showError(id: string, message: string) {
    this.modalService.changeMessage(message);
    this.modalService.show(id); // Ahora pasamos el id
  }
}