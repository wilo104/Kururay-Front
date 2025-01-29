import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BenefactoresService } from '../benefactores.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-editar-benefactor',
    templateUrl: './editar-benefactor.component.html',
    styleUrls: ['./editar-benefactor.component.css'],
    imports: [CommonModule, FormsModule],
    providers: [BenefactoresService]
})
export class EditarBenefactorComponent implements OnInit {
  benefactor: any = {
    nombre: '',
    tipo: '',
    nombre_contacto: '',
    celular_contacto: '',
    direccion: '',
    razon_social: '',
    ruc: '',
    dni: '',
  };

  esEmpresa: boolean = false;
  esPersonaNatural: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private benefactoresService: BenefactoresService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarBenefactor(id);
    }
  }

  cargarBenefactor(id: string): void {
    this.benefactoresService.obtenerBenefactorPorId(+id).subscribe({
      next: (data) => {
        this.benefactor = data;
        this.onTipoChange(); // Asegurarse de que los controles estén actualizados
      },
      error: (error) => {
        console.error('Error al cargar benefactor:', error);
        Swal.fire('Error', 'No se pudo cargar el benefactor', 'error');
        this.router.navigate(['/benefactores']);
      },
    });
  }

  onTipoChange(): void {
    this.esEmpresa = this.benefactor.tipo === 'empresa';
    this.esPersonaNatural = this.benefactor.tipo === 'persona natural';
  
    if (this.esEmpresa) {
      this.benefactor.dni = null;
    } else if (this.esPersonaNatural) {
      this.benefactor.razon_social = null;
      this.benefactor.ruc = null;
    }
  }
  

  actualizarBenefactor(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.benefactoresService.actualizarBenefactor(+id, this.benefactor).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Benefactor actualizado correctamente', 'success');
          this.router.navigate(['/benefactores']);
        },
        error: (error) => {
          console.error('Error al actualizar benefactor:', error);
          const mensaje =
            error.error?.message ||
            'No se pudo actualizar el benefactor, revise los campos.';
          Swal.fire('Error', mensaje, 'error');
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/benefactores']);
  }

  formValido(): boolean {
    if (this.esEmpresa) {
      return !!(
        this.benefactor.nombre &&
        this.benefactor.tipo &&
        this.benefactor.nombre_contacto &&
        this.benefactor.celular_contacto &&
        this.benefactor.direccion &&
        this.benefactor.razon_social &&
        this.benefactor.ruc
      );
    } else if (this.esPersonaNatural) {
      return !!(
        this.benefactor.nombre &&
        this.benefactor.tipo &&
        this.benefactor.nombre_contacto &&
        this.benefactor.celular_contacto &&
        this.benefactor.direccion &&
        this.benefactor.dni
      );
    }
    return false;
  }
}
