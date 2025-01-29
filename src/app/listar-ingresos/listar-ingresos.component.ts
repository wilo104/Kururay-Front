import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importación necesaria
import Swal from 'sweetalert2';
import { IngresosService } from '../ingresos.service';

@Component({
    selector: 'app-listar-ingresos',
    imports: [CommonModule, FormsModule], // Agregar FormsModule aquí
    templateUrl: './listar-ingresos.component.html',
    styleUrls: ['./listar-ingresos.component.css'],
    providers: [IngresosService]
})
export class ListarIngresosComponent implements OnInit {
  ingresos: any[] = [];
  voluntariados: any[] = [];
  selectedVoluntariado: number | null = null;
  selectedIngresoId: number | null = null;
  porcentaje: number | null = 100;

  constructor(
    private ingresosService: IngresosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarIngresos();
    this.cargarVoluntariados();
  }

  cargarIngresos() {
    this.ingresosService.listarIngresos().subscribe({
      next: (data) => {
        this.ingresos = data;
      },
      error: (err) => {
        console.error('Error al cargar los ingresos:', err);
      },
    });
  }

 

  cargarVoluntariados() {
    this.ingresosService.listarVoluntariados().subscribe({
      next: (data) => {
        this.voluntariados = data;
      },
      error: (err) => {
        console.error('Error al cargar los voluntariados:', err);
      },
    });
  }

  registrarIngreso() {
    this.router.navigate(['/contabilidad-financiera/ingresos/registrar']);
  }

  editarIngreso(id: number) {
    this.router.navigate([`/contabilidad-financiera/ingresos/${id}/editar`], { replaceUrl: true });
  }
  
  

  verProductos(ingresoId: number): void {
    this.router.navigate([`/contabilidad-financiera/ingresos/${ingresoId}/productos`])
  }

  openAsignacionModal(ingresoId: number): void {
    this.selectedIngresoId = ingresoId;
    document.getElementById('asignarModal')!.style.display = 'block';
  }

  closeAsignarModal(): void {
    this.selectedIngresoId = null;
    this.selectedVoluntariado = null;
    this.porcentaje = 100;
    document.getElementById('asignarModal')!.style.display = 'none';
  }

  asignarVoluntariado(): void {
    if (!this.selectedVoluntariado) {
      Swal.fire('Error', 'Debes seleccionar un voluntariado.', 'error');
      return;
    }
  
    const asignacion = {
      ingreso_id: this.selectedIngresoId,
      voluntariado_id: this.selectedVoluntariado,
      porcentaje: this.porcentaje,
    };
  
    this.ingresosService.asignarVoluntariado(asignacion).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Voluntariado asignado correctamente', 'success');
        this.closeAsignarModal();
        this.cargarIngresos(); // Actualizar la lista
      },
      error: (error) => {
        const errorMessage = error.error.message || 'No se pudo asignar el voluntariado';
        Swal.fire('Error', errorMessage, 'error');
      },
    });
  }
  
  


}
