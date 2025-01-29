import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import Swal from 'sweetalert2';
import { GastosService } from '../gastos.service';

@Component({
    selector: 'app-registrar-gasto',
    imports: [ReactiveFormsModule, CommonModule, FormsModule], // Incluye FormsModule aquí
    templateUrl: './registrar-gasto.component.html',
    styleUrls: ['./registrar-gasto.component.css'],
    providers: [GastosService]
})
export class RegistrarGastoComponent implements OnInit {
  gastoForm: FormGroup;
  voluntariados: any[] = [];
  selectedVoluntariado: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gastosService: GastosService
  ) {
    this.gastoForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      importe: [null, [Validators.required, Validators.min(0.01)]],
      voluntariado_asignado: ['', Validators.required],
      fecha_gasto: [null, Validators.required],
      nro_comprobante: ['', [Validators.maxLength(25)]],
      tipo_comprobante: ['', Validators.required],
      tipo_gasto: ['', Validators.required],
      ruc_dni: ['', [Validators.required, Validators.pattern(/^\d{8,11}$/)]],
      razon_social_nombre: ['', [Validators.required, Validators.maxLength(255)]],
      observacion: ['', [Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    this.cargarVoluntariados();
  }

  cargarVoluntariados(): void {
    this.gastosService.listarVoluntariados().subscribe({
      next: (data) => {
        this.voluntariados = data;
      },
      error: (err) => {
        console.error('Error al cargar voluntariados:', err);
        Swal.fire('Error', 'No se pudo cargar la lista de voluntariados.', 'error');
      },
    });
  }

  guardarGasto(): void {
    if (this.gastoForm.invalid) {
      Swal.fire('Error', 'Formulario inválido. Revisa los campos.', 'error');
      return;
    }

    const payload = this.gastoForm.value;

    this.gastosService.registrarGasto(payload).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Gasto registrado exitosamente.', 'success');
        this.router.navigate(['/contabilidad-financiera/gastos']);
      },
      error: (err) => {
        console.error('Error al registrar el gasto:', err);
        Swal.fire('Error', 'No es posible realizar el registro.', 'error');
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/contabilidad-financiera/gastos']);
  }

  openAsignacionModal(): void {
    document.getElementById('asignarModal')!.style.display = 'block';
  }

  closeAsignarModal(): void {
    this.selectedVoluntariado = null;
    document.getElementById('asignarModal')!.style.display = 'none';
  }

  asignarVoluntariado(): void {
    if (!this.selectedVoluntariado) {
      Swal.fire('Error', 'Debes seleccionar un voluntariado.', 'error');
      return;
    }

    console.log('Voluntariado asignado:', this.selectedVoluntariado);
    this.closeAsignarModal();
  }
}
