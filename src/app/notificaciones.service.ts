import { Injectable } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private modalComponent: ModalComponent) { }
  showSuccess(message: string) {
    console.log(message);
    this.modalComponent.message = message;
    this.modalComponent.ngOnInit();
    //this.modalComponent.open(); // Llama a la función open del componente ModalComponent
  }

  showError(message: string) {
    console.log(message);
    this.modalComponent.message = message;
    this.modalComponent.ngOnInit();
    // this.modalComponent.isSuccess = false;
    // this.modalComponent.open(); // Llama a la función open del componente ModalComponent
  }
}