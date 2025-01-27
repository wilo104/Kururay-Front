// registrar-ingreso.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { IngresosService } from '../ingresos.service';

@Component({
  selector: 'app-registrar-ingreso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registrar-ingreso.component.html',
  styleUrls: ['./registrar-ingreso.component.css'],
  providers: [IngresosService],
})
export class RegistrarIngresoComponent {
  ingresoForm: FormGroup;
  tipoIngreso: string = '';
  benefactores: any[] = [];
  filteredBenefactores: any[] = [];
  selectedBenefactor: any = null;
  searchQuery: string = '';

  constructor(
    private fb: FormBuilder,
    private ingresosService: IngresosService,
    private router: Router
  ) {
    const today = new Date().toISOString().split('T')[0]; // Fecha actual en formato 'YYYY-MM-DD'

    this.ingresoForm = this.fb.group({
      tipo_ingreso: ['', [Validators.required]],
      concepto: ['', [Validators.required, Validators.maxLength(255)]],
      monto: [null],
      tipo_moneda: [''],
      tipo_ingreso_monetario: [''],
      tipo_ingreso_donacion: [''],
      fecha_ingreso: ['', [Validators.required]],
      codigo_certificado: ['', [Validators.required, Validators.maxLength(50)]],
      fecha_registro: [today, [Validators.required]], // Valor inicial para `fecha_registro`
      benefactor_id: ['', [Validators.required]],
      razon_social: [''],
      ruc: ['', [Validators.pattern('^[0-9]{11}$')]],
      lugar_recojo: [''],
      ubicacion_actual: [''],
    });
    
  }

  onTipoIngresoChange() {
    this.tipoIngreso = this.ingresoForm.value.tipo_ingreso;
  
    if (this.tipoIngreso === 'monetario') {
      this.ingresoForm.get('tipo_ingreso_donacion')?.clearValidators();
      this.ingresoForm.get('razon_social')?.clearValidators();
      this.ingresoForm.get('ruc')?.clearValidators();
      this.ingresoForm.get('lugar_recojo')?.clearValidators();
      this.ingresoForm.get('ubicacion_actual')?.clearValidators();
      this.ingresoForm.get('monto')?.setValidators([Validators.required]);
      this.ingresoForm.get('tipo_moneda')?.setValidators([Validators.required]);
      this.ingresoForm.get('tipo_ingreso_monetario')?.setValidators([Validators.required]);
    } else if (this.tipoIngreso === 'donaciones') {
      this.ingresoForm.get('monto')?.clearValidators();
      this.ingresoForm.get('tipo_moneda')?.clearValidators();
      this.ingresoForm.get('tipo_ingreso_monetario')?.clearValidators();
      this.ingresoForm.get('tipo_ingreso_donacion')?.setValidators([Validators.required]);
      this.ingresoForm.get('razon_social')?.setValidators([Validators.required]);
      this.ingresoForm.get('ruc')?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]{11}$'),
      ]);
      this.ingresoForm.get('lugar_recojo')?.setValidators([Validators.required]);
      this.ingresoForm.get('ubicacion_actual')?.setValidators([Validators.required]);
    }
  
    this.ingresoForm.updateValueAndValidity(); // Actualiza las validaciones del formulario
  }
  
  
  openBenefactorModal(): void {
    this.cargarBenefactores();
    const modal = document.getElementById('benefactorModal') as HTMLElement;
    modal.style.display = 'block';
  }

  closeBenefactorModal(): void {
    const modal = document.getElementById('benefactorModal') as HTMLElement;
    modal.style.display = 'none';
  }

  cargarBenefactores(): void {
    this.ingresosService.obtenerBenefactores().subscribe({
      next: (data) => {
        this.benefactores = data;
        this.filteredBenefactores = data;
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los benefactores.', 'error');
      },
    });
  }

  filterBenefactores(): void {
    this.filteredBenefactores = this.benefactores.filter((benefactor) =>
      benefactor.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  seleccionarBenefactor(benefactor: any): void {
    this.selectedBenefactor = benefactor;
    this.ingresoForm.patchValue({
      benefactor_id: benefactor.id,
    });
    this.closeBenefactorModal();
  }

  onSubmit(): void {
    console.log('Estado del formulario:', this.ingresoForm.status);
    console.log('Valores del formulario:', this.ingresoForm.value);
  
    if (this.ingresoForm.invalid) {
      Swal.fire('Error', 'Por favor, completa todos los campos obligatorios.', 'error');
      return;
    }
  
    this.ingresosService.registrarIngreso(this.ingresoForm.value).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Ingreso registrado exitosamente.', 'success');
        this.router.navigate(['/contabilidad-financiera/ingresos']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        Swal.fire('Error', 'No fue posible registrar el ingreso.', 'error');
      },
    });
  }
  
  
  cancelar(): void {
    this.router.navigate(['/contabilidad-financiera/ingresos']);
  }
}
