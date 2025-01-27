import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresosService } from '../ingresos.service';

@Component({
  selector: 'app-modal-benefactor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-benefactor.component.html',
  styleUrls: ['./modal-benefactor.component.css'],
  providers:[IngresosService]
})
export class ModalBenefactorComponent {
  benefactores: any[] = [];
  @Output() benefactorSelected = new EventEmitter<any>();

  constructor(private ingresosService: IngresosService) {}

  ngOnInit() {
    this.cargarBenefactores();
  }

  cargarBenefactores() {
    this.ingresosService.obtenerBenefactores().subscribe({
      next: (data) => {
        this.benefactores = data;
      },
      error: () => {
        console.error('Error al cargar benefactores');
      },
    });
  }

  seleccionarBenefactor(benefactor: any) {
    this.benefactorSelected.emit(benefactor);
  }
}
