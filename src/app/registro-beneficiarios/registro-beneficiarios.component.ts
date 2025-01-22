import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BeneficiariosService } from '../beneficiarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-beneficiarios',
  standalone: true,
  templateUrl: './registro-beneficiarios.component.html',
  styleUrls: ['./registro-beneficiarios.component.css'],
  imports: [FormsModule, CommonModule],
  providers: [BeneficiariosService],
})
export class RegistroBeneficiariosComponent {
  beneficiario: any = {
    tipo: '',
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    genero: '',
    edad: null,
    representante: '',
    ruc: '',
    comentarios: '',
  };

  esPersona: boolean = false;
  esComunidad: boolean = false;
  esOrganizacion: boolean = false;

  constructor(
    private beneficiariosService: BeneficiariosService,
    private router: Router
  ) {}

  onTipoChange(): void {
    this.esPersona = this.beneficiario.tipo === 'Persona';
    this.esComunidad = this.beneficiario.tipo === 'Comunidad';
    this.esOrganizacion = this.beneficiario.tipo === 'Organización';

    // Limpiar campos innecesarios según el tipo seleccionado
    if (this.esPersona) {
      this.beneficiario.representante = '';
      this.beneficiario.ruc = '';
    } else if (this.esComunidad) {
      this.beneficiario.genero = '';
      this.beneficiario.edad = null;
      this.beneficiario.ruc = '';
    } else if (this.esOrganizacion) {
      this.beneficiario.genero = '';
      this.beneficiario.edad = null;
      this.beneficiario.representante = '';
    }
  }

  guardarBeneficiario(): void {
    console.log(this.beneficiario);
    this.beneficiariosService.registrarBeneficiario(this.beneficiario).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Beneficiario registrado correctamente', 'success');
        this.router.navigate(['/beneficiarios']);
      },
      error: (error) => {
        console.error('Error al registrar beneficiario:', error);
        Swal.fire('Error', 'No se pudo registrar el beneficiario', 'error');
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/beneficiarios']);
  }
}
