import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // También puedes incluir FormsModule si es necesario
import Swal from 'sweetalert2';
import { GastosService } from '../gastos.service';

@Component({
    selector: 'app-editar-gasto',
    imports: [ReactiveFormsModule, CommonModule, FormsModule], // Asegúrate de incluir ReactiveFormsModule
    templateUrl: './editar-gasto.component.html',
    styleUrls: ['./editar-gasto.component.css'],
    providers: [GastosService]
})
export class EditarGastoComponent implements OnInit {
  gastoForm!: FormGroup;
  voluntariados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gastosService: GastosService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarVoluntariados();
    this.cargarGasto();
  }

  inicializarFormulario(): void {
    this.gastoForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      importe: [null, [Validators.required, Validators.min(0.01)]],
      voluntariado_id: ['', Validators.required],
      fecha_gasto: [null, Validators.required],
      nro_comprobante: ['', [Validators.maxLength(25)]],
      tipo_comprobante: ['', Validators.required],
      tipo_gasto: ['', Validators.required],
      ruc_dni: ['', [Validators.required, Validators.pattern(/^\d{8,11}$/)]],
      razon_social_nombre: ['', [Validators.required, Validators.maxLength(255)]],
      observacion: ['', [Validators.maxLength(255)]],
    });
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
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Día con dos dígitos
    return `${year}-${month}-${day}`;
  }
  
  cargarGasto(): void {
    const gastoId = this.route.snapshot.paramMap.get('id'); // Suponiendo que el ID del gasto está en la URL
    if (gastoId) {
      this.gastosService.obtenerGastoPorId(+gastoId).subscribe({
        next: (data) => {
          if (data.fecha_gasto) {
            data.fecha_gasto = this.formatDate(data.fecha_gasto);
          }
          this.gastoForm.patchValue(data);
        },
        error: (err) => {
          console.error('Error al cargar el gasto:', err);
          Swal.fire('Error', 'No se pudo cargar el gasto.', 'error');
        },
      });
    }
  }

  guardarGasto(): void {
    if (this.gastoForm.invalid) {
      Swal.fire('Error', 'Formulario inválido. Revisa los campos.', 'error');
      return;
    }

    const payload = this.gastoForm.value;
    const gastoId = this.route.snapshot.paramMap.get('id');

    this.gastosService.actualizarGasto(+gastoId!, payload).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Gasto actualizado exitosamente.', 'success');
        this.router.navigate(['/contabilidad-financiera/gastos']);
      },
      error: (err) => {
        console.error('Error al actualizar el gasto:', err);
        Swal.fire('Error', 'No es posible realizar la actualización.', 'error');
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/contabilidad-financiera/gastos']);
  }
}
