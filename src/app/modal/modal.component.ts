import { Component, OnInit, OnDestroy } from '@angular/core';
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

  ngOnInit() {
    this.subscription = this.modalService.currentMessage.subscribe(message => this.message = message);
    this.modalService.isVisible.subscribe(isVisible => this.show = isVisible);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closeModal() {
    this.modalService.hide();
  }
}
