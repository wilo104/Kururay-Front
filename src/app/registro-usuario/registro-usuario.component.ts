import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../notificaciones.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../usuario-service.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-registro-usuario',
    providers: [NotificationService, UsuarioService],
    templateUrl: './registro-usuario.component.html',
    styleUrls: ['./registro-usuario.component.css'],
    imports: [ReactiveFormsModule, CommonModule]
})
export class RegistroUsuarioComponent implements OnInit {
  registroForm: FormGroup;
  showModal: boolean = false;
  modalMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(/^\d{9}$/)]], // Opcional
      tipo_usuario: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      console.log('Datos enviados:', formData); // DEBUG: Verifica qué datos se están enviando.

      this.usuarioService.registrarUsuario(formData).subscribe(
        (response: any) => {
          Swal.fire('Éxito', 'Usurario Registrado Correctamente.', 'success');
          this.router.navigate(['/voluntariados']);
          console.log('Registro exitoso:', response);
          this.router.navigate(['/usuarios']);
        },
        (error) => {
          console.error('Error al realizar la solicitud:', error);
              Swal.fire('Error', error.error?.message || 'No se pudo registrar Usuario.', 'error');
        }
      );
    } else {
      this.showModal = true;
      this.modalMessage = 'Formulario incompleto o inválido';
      this.notificationService.showError('RegistroModal', this.modalMessage);
      Object.values(this.registroForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/usuarios']);
  }
}
