import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notificaciones.service';
import { AuthService } from '../auth.service';
import { UsuarioService } from '../usuario-service.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-actualizar-clave',
    providers: [AuthService, UsuarioService, NotificationService],
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './actualizar-clave.component.html',
    styleUrls: ['./actualizar-clave.component.css']
})
export class ActualizarClaveComponent implements OnInit {
  updatePasswordForm: FormGroup;
  userId: string | null = ''; // ID del usuario autenticado
  routeId: string | null = ''; // ID tomado de la ruta
  claveDni: boolean = false; // Indicador si clave es igual al DNI

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
  ) {
    // Inicializa el formulario
    this.updatePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$')
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.userId = localStorage.getItem('id');
    this.routeId = this.route.snapshot.params['id'];
    this.claveDni = localStorage.getItem('clave_dni') === 'true';

    if (!token) {
      // Redirige al login si no hay token
      Swal.fire('Error', 'No estás autenticado.', 'error');
      this.router.navigate(['/login']);
      return;
    }

    if (this.userId !== this.routeId) {
      // Bloquea el acceso si el ID de la ruta no coincide con el ID autenticado
      Swal.fire('Error', 'No tienes permiso para acceder a esta página.', 'error');
      this.router.navigate(['/dashboard']);
      return;
    }

    // Permite acceso aunque claveDni sea `false` (para casos manuales desde el menú)
  }

  // Validador de coincidencia de contraseñas
  passwordMatchValidator(g: FormGroup): { [key: string]: any } | null {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
  }

  // Lógica para actualizar la contraseña
  onChangePassword(): void {
    if (this.updatePasswordForm.valid) {
      const currentPassword = this.updatePasswordForm.get('currentPassword')?.value;
      const newPassword = this.updatePasswordForm.get('newPassword')?.value;

      this.usuarioService.actualizarContrasena(currentPassword, newPassword).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Contraseña actualizada correctamente.', 'success');
          
          // Limpia el flag `clave_dni` en localStorage
          localStorage.removeItem('clave_dni');

          // Redirige al dashboard
          this.router.navigate(['/dashboard']); 
        },
        error: (error) => {
          console.error('Error al actualizar la contraseña:', error);

          // Manejo de errores
          if (error.status === 401) {
            Swal.fire('Error', 'La contraseña actual es incorrecta.', 'error');
          } else if (error.status === 500) {
            Swal.fire('Error', 'Error en el servidor. Inténtalo más tarde.', 'error');
          } else {
            Swal.fire('Error', 'No fue posible actualizar la contraseña.', 'error');
          }
        },
      });
    }
  }

  // Lógica para el botón "Cancelar"
  cancel(): void {
    if (this.claveDni) {
      // Si clave_dni es true, mostrar un mensaje y no permitir salir
      Swal.fire('Atención', 'Debes actualizar tu contraseña antes de continuar.', 'warning');
    } else {
      // Si clave_dni es false, redirigir al dashboard
      this.router.navigate(['/dashboard']);
    }
  }
}
