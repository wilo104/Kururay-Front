import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { IngresosService } from '../ingresos.service';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css'],
  providers: [IngresosService],
})
export class RegistrarProductoComponent implements OnInit {
  productoForm: FormGroup;
  ingresoId: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ingresosService: IngresosService
  ) {
    this.productoForm = this.fb.group({
      nombre_producto: ['', [Validators.required, Validators.maxLength(100)]],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      tipo_unidad: ['', Validators.required],
      tipo_producto: ['', Validators.required],
      fecha_vencimiento: [''],
      registro_sanitario: [''],
      motivo: ['', [Validators.maxLength(255)]],
      costo_unidad: [null, [Validators.required, Validators.min(0)]],
      costo_total: [null, [Validators.required, Validators.min(0)]],
      numero_lote: ['', [Validators.maxLength(25)]],
      estado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ingresoId = +this.route.snapshot.paramMap.get('id')!;
    this.configurarValidacionesCondicionales();
  }

  configurarValidacionesCondicionales(): void {
    this.productoForm.get('tipo_producto')?.valueChanges.subscribe((tipoProducto) => {
      if (tipoProducto === 'alimentación') {
        this.productoForm.get('fecha_vencimiento')?.setValidators([Validators.required]);
        this.productoForm.get('registro_sanitario')?.setValidators([Validators.required]);
      } else {
        this.productoForm.get('fecha_vencimiento')?.clearValidators();
        this.productoForm.get('registro_sanitario')?.clearValidators();
      }
      this.productoForm.get('fecha_vencimiento')?.updateValueAndValidity();
      this.productoForm.get('registro_sanitario')?.updateValueAndValidity();
    });
  }

  guardarProducto(): void {
    if (this.productoForm.invalid) {
      console.log('Formulario inválido:', this.productoForm.value);
      Swal.fire('Error', 'Formulario inválido. Revisa los campos.', 'error');
      return;
    }

    const payload = this.productoForm.value;

    this.ingresosService.registrarProducto(this.ingresoId, payload).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Producto registrado exitosamente.', 'success');
        this.router.navigate([`/contabilidad-financiera/ingresos/${this.ingresoId}/productos`]);
      },
      error: (err) => {
        console.error('Error al registrar producto:', err);
        Swal.fire('Error', 'No se pudo registrar el producto.', 'error');
      },
    });
  }

  cancelar(): void {
    this.router.navigate([`/contabilidad-financiera/ingresos/${this.ingresoId}/productos`]);
  }
}
