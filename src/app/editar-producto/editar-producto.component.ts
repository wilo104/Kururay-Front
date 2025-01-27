import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { IngresosService } from '../ingresos.service';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
  providers: [IngresosService],
})
export class EditarProductoComponent implements OnInit {
  productoForm: FormGroup;
  productoId: number = 0;
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
    this.productoId = +this.route.snapshot.paramMap.get('productoId')!;
  
    if (!this.ingresoId || !this.productoId) {
      Swal.fire('Error', 'No se pudo cargar los datos del producto.', 'error');
      this.router.navigate(['/contabilidad-financiera/ingresos']);
      return;
    }
  
    this.obtenerProducto()
    this.configurarValidacionesCondicionales();
  }
  
  obtenerProducto(): void {
    this.ingresosService.obtenerProducto(this.ingresoId, this.productoId).subscribe({
      next: (data) => {
        if (data.fecha_vencimiento) {
          data.fecha_vencimiento = this.formatDate(data.fecha_vencimiento);
        }
        this.productoForm.patchValue(data);
      },
      error: (err) => {
        console.error('Error al obtener el producto:', err);
        Swal.fire('Error', 'No se pudo cargar los datos del producto.', 'error');
      },
    });
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  guardarProducto(): void {
    if (this.productoForm.invalid) {
      Swal.fire('Error', 'Formulario inválido. Revisa los campos.', 'error');
      return;
    }

    const payload = this.productoForm.value;

    this.ingresosService.editarProducto(this.ingresoId, this.productoId, payload).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Producto actualizado exitosamente.', 'success');
        this.router.navigate([`/contabilidad-financiera/ingresos/${this.ingresoId}/productos`]);
      },
      error: (err) => {
        console.error('Error al actualizar producto:', err);
        Swal.fire('Error', 'No se pudo actualizar el producto.', 'error');
      },
    });
  }

  cancelar(): void {
    this.router.navigate([`/contabilidad-financiera/ingresos/${this.ingresoId}/productos`]);
  }
}
