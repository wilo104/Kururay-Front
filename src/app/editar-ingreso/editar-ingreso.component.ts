import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { IngresosService } from '../ingresos.service';

@Component({
    selector: 'app-editar-ingreso',
    imports: [CommonModule, ReactiveFormsModule, FormsModule], // Agrega FormsModule aquí
    templateUrl: './editar-ingreso.component.html',
    styleUrls: ['./editar-ingreso.component.css'],
    providers: [IngresosService]
})
export class EditarIngresoComponent implements OnInit {
  editarIngresoForm: FormGroup;
  ingresoId: number;
  tipoIngreso: string = '';
  benefactores: any[] = [];
  filteredBenefactores: any[] = [];
  selectedBenefactor: any = null;
  searchQuery: string = '';
  isModalOpen = false;
  constructor(
    private fb: FormBuilder,
    private ingresosService: IngresosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ingresoId = +this.route.snapshot.paramMap.get('id')!;
  
    this.editarIngresoForm = this.fb.group({
      tipo_ingreso: [{ value: '', disabled: true }, Validators.required],
      concepto: ['', [Validators.required, Validators.maxLength(255)]],
      fecha_ingreso: ['', Validators.required],
      codigo_certificado: ['', [Validators.required, Validators.maxLength(50)]],
      monto: [null], // Validación dinámica
      tipo_moneda: [''], // Validación dinámica
      tipo_ingreso_monetario: [''], // Validación dinámica
      razon_social: [''], // Validación dinámica
      ruc: ['', [Validators.pattern('^[0-9]{11}$')]], // Validación dinámica
      lugar_recojo: [''], // Validación dinámica
      ubicacion_actual: [''], // Validación dinámica
      tipo_ingreso_donacion: [''], // Validación dinámica
      benefactor_id: ['', Validators.required],
    });
  }
  

  ngOnInit(): void {
    this.cargarIngreso();
    this.cargarBenefactores();
    this.tipoIngreso = this.editarIngresoForm.get('tipo_ingreso')?.value || '';

  }
  cargarIngreso(): void {
    this.ingresosService.obtenerIngreso(this.ingresoId).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
  
        if (data.fecha_ingreso) {
          data.fecha_ingreso = this.formatDate(data.fecha_ingreso);
        }
  
        this.editarIngresoForm.patchValue({
          tipo_ingreso: data.tipo_ingreso || '', // Asegura que el tipo_ingreso esté presente
          concepto: data.concepto || '',
          fecha_ingreso: data.fecha_ingreso || '',
          codigo_certificado: data.codigo_certificado || '',
          monto: data.monto || null,
          tipo_moneda: data.tipo_moneda || '',
          tipo_ingreso_monetario: data.tipo_ingreso_monetario || '',
          razon_social: data.razon_social || '',
          ruc: data.ruc || '',
          lugar_recojo: data.lugar_recojo || '',
          ubicacion_actual: data.ubicacion_actual || '',
          tipo_ingreso_donacion: data.tipo_ingreso_donacion || '',
          benefactor_id: data.benefactor_id || null,
        });
        this.selectedBenefactor = {
          id: data.benefactor_id,
          nombre: data.benefactor_nombre,
        };
        this.tipoIngreso = data.tipo_ingreso; // Actualiza el valor de tipoIngreso
        this.onTipoIngresoChange(); // Aplica las reglas específicas según el tipo de ingreso
      },
      error: (err) => {
        console.error('Error al cargar el ingreso:', err);
        Swal.fire('Error', 'No se pudo cargar la información del ingreso.', 'error');
      },
    });
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onTipoIngresoChange(): void {
    this.tipoIngreso = this.editarIngresoForm.get('tipo_ingreso')?.value;
  
    if (this.tipoIngreso === 'MONETARIO') {
      // Limpia validaciones de DONACIONES
      this.editarIngresoForm.get('razon_social')?.clearValidators();
      this.editarIngresoForm.get('ruc')?.clearValidators();
      this.editarIngresoForm.get('lugar_recojo')?.clearValidators();
      this.editarIngresoForm.get('ubicacion_actual')?.clearValidators();
      this.editarIngresoForm.get('tipo_ingreso_donacion')?.clearValidators();
  
      // Aplica validaciones específicas para MONETARIO
      this.editarIngresoForm.get('monto')?.setValidators([Validators.required]);
      this.editarIngresoForm.get('tipo_moneda')?.setValidators([Validators.required]);
      this.editarIngresoForm.get('tipo_ingreso_monetario')?.setValidators([Validators.required]);
    } else if (this.tipoIngreso === 'DONACIONES') {
      // Limpia validaciones de MONETARIO
      this.editarIngresoForm.get('monto')?.clearValidators();
      this.editarIngresoForm.get('tipo_moneda')?.clearValidators();
      this.editarIngresoForm.get('tipo_ingreso_monetario')?.clearValidators();
  
      // Aplica validaciones específicas para DONACIONES
      this.editarIngresoForm.get('razon_social')?.setValidators([Validators.required]);
      this.editarIngresoForm.get('ruc')?.setValidators([Validators.required, Validators.pattern('^[0-9]{11}$')]);
      this.editarIngresoForm.get('lugar_recojo')?.setValidators([Validators.required]);
      this.editarIngresoForm.get('ubicacion_actual')?.setValidators([Validators.required]);
      this.editarIngresoForm.get('tipo_ingreso_donacion')?.setValidators([Validators.required]);
    }
  
    this.editarIngresoForm.updateValueAndValidity();
  }
  
  cargarBenefactores(): void {
    this.ingresosService.obtenerBenefactores().subscribe({
      next: (data) => {
        this.benefactores = data;
        this.filteredBenefactores = data;
      },
      error: (err) => {
        console.error('Error al cargar benefactores:', err);
      },
    });
  }

  filterBenefactores(): void {
    if (!this.searchQuery.trim()) {
      this.filteredBenefactores = this.benefactores;
    } else {
      this.filteredBenefactores = this.benefactores.filter((benefactor) =>
        benefactor.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  openBenefactorModal(): void {
    const modal = document.getElementById('benefactorModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeBenefactorModal(): void {
    const modal = document.getElementById('benefactorModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  seleccionarBenefactor(benefactor: any): void {
    this.selectedBenefactor = benefactor;
    this.editarIngresoForm.patchValue({
      benefactor_id: benefactor.id,
    });
    this.closeBenefactorModal();
  }

  onSubmit(): void {
    if (this.editarIngresoForm.invalid) {
      Swal.fire('Error', 'Formulario inválido. Revisa los campos.', 'error');
      return;
    }
  
    const payload: any = {
      tipo_ingreso: this.tipoIngreso,
      concepto: this.editarIngresoForm.value.concepto,
      fecha_ingreso: this.editarIngresoForm.value.fecha_ingreso,
      codigo_certificado: this.editarIngresoForm.value.codigo_certificado,
      benefactor_id: this.editarIngresoForm.value.benefactor_id,
    };
  
    if (this.tipoIngreso === 'MONETARIO') {
      payload.monto = parseFloat(this.editarIngresoForm.value.monto);
      payload.tipo_moneda = this.editarIngresoForm.value.tipo_moneda;
      payload.tipo_ingreso_monetario = this.editarIngresoForm.value.tipo_ingreso_monetario;
    } else if (this.tipoIngreso === 'DONACIONES') {
      payload.tipo_ingreso_donacion = this.editarIngresoForm.value.tipo_ingreso_donacion;
      payload.razon_social = this.editarIngresoForm.value.razon_social;
      payload.ruc = this.editarIngresoForm.value.ruc;
      payload.lugar_recojo = this.editarIngresoForm.value.lugar_recojo;
      payload.ubicacion_actual = this.editarIngresoForm.value.ubicacion_actual;
    }

    if (this.editarIngresoForm.invalid) {
      Swal.fire('Error', 'Formulario inválido. Revisa los campos.', 'error');
      return;
    }
  
    this.editarIngresoForm.value;
  
    console.log('Payload enviado:', payload);
  
    this.ingresosService.editarIngreso(this.ingresoId, payload).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Ingreso actualizado exitosamente.', 'success');
        this.router.navigate(['/contabilidad-financiera/ingresos']);
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el ingreso.', 'error');
        console.error(err);
      },
    });
  
   
  }
  
  
  
  cancelar(): void {
    this.router.navigate(['/contabilidad-financiera/ingresos']);
  }
}
