import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../modal.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit, OnDestroy {
  message: string | undefined;
  show = false;
  subscription: Subscription = new Subscription;
 
  constructor(private modalService: ModalService) {}
  @Output() confirm = new EventEmitter();
  onModalConfirm() {
    // Lógica para cerrar el modal y luego realizar acciones adicionales
    this.closeModal();
    this.confirm.emit(); // Si estás usando EventEmitter para comunicarte con el componente padre
  }
  ngOnInit() {
    // this.subscription = this.modalService.currentMessage.subscribe(message => this.message = message);
    // this.modalService.isVisible.subscribe(isVisible => this.show = isVisible);
    this.subscription = this.modalService.currentMessage.subscribe(message => {
      this.message = message;
      console.log("Mensaje actualizado:", message);
    });
    this.modalService.isVisible.subscribe(isVisible => {
      this.show = isVisible;
      console.log("Visibilidad actualizada:", isVisible);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closeModal() {
    this.modalService.hide();
  }
}
