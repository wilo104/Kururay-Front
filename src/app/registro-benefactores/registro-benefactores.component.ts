import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { BenefactoresService } from '../benefactores.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-benefactores',
  standalone: true,
  templateUrl: './registro-benefactores.component.html',
  styleUrls: ['./registro-benefactores.component.css'],
  providers: [BenefactoresService],
  imports: [FormsModule,CommonModule, FormsModule],
})
export class RegistroBenefactoresComponent {
  benefactor: any = {
    nombre: '',
    tipo: '',
    nombre_contacto: '',
    celular_contacto: '',
    direccion: '',
    razon_social: '',
    ruc: '',
    dni: ''
  };

  esEmpresa: boolean = false;
  esPersonaNatural: boolean = false;

  constructor(private benefactoresService: BenefactoresService, private router: Router) {}

  onTipoChange(): void {
    this.esEmpresa = this.benefactor.tipo === 'empresa';
    this.esPersonaNatural = this.benefactor.tipo === 'persona natural';

    // Limpiar campos no relevantes
    if (this.esEmpresa) {
      this.benefactor.dni = '';
    } else if (this.esPersonaNatural) {
      this.benefactor.razon_social = '';
      this.benefactor.ruc = '';
    }
  }

  guardarBenefactor(): void {
    this.benefactoresService.registrarBenefactor(this.benefactor).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Benefactor registrado correctamente', 'success');
        this.router.navigate(['/benefactores']);
      },
      error: (error) => {
        console.error('Error al registrar benefactor:', error);
        Swal.fire('Error', 'No se pudo registrar el benefactor', 'error');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/benefactores']);
  }

  formValido(): boolean {
    if (this.esEmpresa) {
      return !!(this.benefactor.nombre && this.benefactor.tipo && this.benefactor.nombre_contacto && this.benefactor.celular_contacto && this.benefactor.direccion && this.benefactor.razon_social && this.benefactor.ruc);
    } else if (this.esPersonaNatural) {
      return !!(this.benefactor.nombre && this.benefactor.tipo && this.benefactor.nombre_contacto && this.benefactor.celular_contacto && this.benefactor.direccion && this.benefactor.dni);
    }
    return false;
  }
}
