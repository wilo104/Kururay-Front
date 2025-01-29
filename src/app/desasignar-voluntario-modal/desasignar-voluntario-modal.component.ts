import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VoluntariadosService } from '../voluntariados.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-desasignar-voluntario-modal', // Asegúrate de que esto está presente
    imports: [CommonModule],
    templateUrl: './desasignar-voluntario-modal.component.html',
    styleUrls: ['./desasignar-voluntario-modal.component.css'],
    providers: [VoluntariadosService]
})
export class DesasignarVoluntarioModalComponent {
  @Input() idVoluntariado!: number; // ID del voluntariado
  @Output() cerrarModal = new EventEmitter<void>();

  voluntariosAsignados: any[] = [];
  cargando = false;

  constructor(private voluntariadosService: VoluntariadosService) {}

  ngOnInit(): void {
    this.obtenerVoluntariosAsignados();
  }

  obtenerVoluntariosAsignados(): void {
    this.cargando = true;
    this.voluntariadosService.getVoluntariosAsignados(this.idVoluntariado).subscribe(
      (data) => {
        this.voluntariosAsignados = data;
        this.cargando = false;
      },
      (error) => {
        console.error('Error al obtener voluntarios asignados:', error[0].message);
        Swal.fire('Error', 'Error al obtener voluntarios asignados', 'error');
        this.cargando = false;
      }
    );
  }

  desasignarVoluntario(voluntarioId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará al voluntario del voluntariado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desasignar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f44336',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Desasignando voluntario con ID:', voluntarioId); // Verifica el valor
        this.voluntariadosService.desasignarVoluntario(this.idVoluntariado, voluntarioId).subscribe(
          () => {
            this.voluntariosAsignados = this.voluntariosAsignados.filter((v) => v.id !== voluntarioId);
            Swal.fire('Éxito', 'Voluntario desasignado con éxito.', 'success');
          },
          (error) => {
            console.error('Error al desasignar voluntario:', error);
            Swal.fire('Error', 'Ocurrió un problema al desasignar el voluntario.', 'error');
          }
        );
      }
    });
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }
}
