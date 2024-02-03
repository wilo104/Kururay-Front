import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private modalService: ModalService) { }

  showSuccess(message: string) {
    console.log(message);
    this.modalService.changeMessage(message);
    this.modalService.show();
  }

  showError(message: string) {
    console.log(message);
    this.modalService.changeMessage(message);
    this.modalService.show();
  }
}