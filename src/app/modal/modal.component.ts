// import { Component, OnInit, OnDestroy, Input } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { ModalService } from '../modal.service';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-modal',
//   templateUrl: './modal.component.html',
//   styleUrls: ['./modal.component.css'],
//   standalone: true,
//   imports: [CommonModule]
// })
// export class ModalComponent implements OnInit, OnDestroy {
//   @Input() id: string = '';
//   message: string | undefined;
//   show = false;
//   private subscription: Subscription = new Subscription();
//   private timer: any = null; // Declara la propiedad timer aquí
// type: any;

//   constructor(private modalService: ModalService) {}

//   ngOnInit() {
//     this.subscription.add(this.modalService.currentMessage.subscribe(message => {
//       this.message = message;
//     }));

//     this.subscription.add(this.modalService.isVisible.subscribe(data => {
//       if (data.id === this.id) {
//         this.show = data.visible;
//         if (this.show) {
//           this.setAutoCloseModal(); // Configura el cierre automático del modal
//         }
//       }
//     }));
//   }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//     if (this.timer !== null) {
//       clearTimeout(this.timer); // Limpia el temporizador si el componente se destruye
//       this.timer = null;
//     }
//   }

//   closeModal(): void {
//     this.modalService.hide(this.id);
//     if (this.timer !== null) {
//       clearTimeout(this.timer); // Limpia el temporizador al cerrar el modal
//       this.timer = null;
//     }
//   }

//   setAutoCloseModal() {
//     if (this.timer !== null) {
//       clearTimeout(this.timer); // Limpia un temporizador existente antes de configurar uno nuevo
//     }
//     this.timer = setTimeout(() => {
//       this.closeModal();
//     }, 3000); // Cierra el modal automáticamente después de 3 segundos
//   }
// }
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../modal.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    imports: [CommonModule]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string = '';
  message: string | undefined;
  show = false;
  type: 'success' | 'error' | undefined;  // Añade esta línea para el tipo de modal
  private subscription: Subscription = new Subscription();
  private timer: any = null;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    // Corrección para usar modalDataObservable
    this.subscription.add(
      this.modalService.modalDataObservable.subscribe(data => {
        if (data && data.id === this.id) {
          this.message = data.message; // Asumiendo que el mensaje viene con los datos
          this.type = data.type;
          this.show = data.visible;
          if (this.show) {
            this.setAutoCloseModal();
          }
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.clearTimer();
  }

  closeModal(): void {
    this.modalService.hide(this.id);  // Usando hide como está definido en tu servicio
    this.clearTimer();
  }

  setAutoCloseModal() {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.closeModal();
    }, 3000); // Ajusta este tiempo según tus necesidades
  }

  private clearTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
