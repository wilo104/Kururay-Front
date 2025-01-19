import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notificaciones.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../auth.guard';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService, AuthGuard, NotificationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, ModalComponent],
})
export class LoginComponent {
  @Output() confirm = new EventEmitter<void>();
  tipo_usuario: string | undefined;
  Id: any;
  clave_dni: boolean | undefined;
  isLoading = false;

  // Formulario reactivo con validaciones
  loginForm = this.fb.group({
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // Patrón para DNI
    password: ['', [Validators.required, Validators.minLength(8)]], // Contraseña mínima 8 caracteres
  });

  loggedInUserType: string = '';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  // Método para manejar el inicio de sesión
  onLogin() {
    if (this.loginForm.invalid) {
      this.notificationService.showError('Formulario Inválido', 'Por favor, completa todos los campos correctamente.');
      return;
    }

    this.isLoading = true;
    const loginObj = {
      dni: this.loginForm.value.dni!,
      password: this.loginForm.value.password!,
    };

    this.authService.login(loginObj).subscribe({
      next: (resp) => {
        this.isLoading = false;

        // Guardar token, tipo de usuario e ID en el localStorage
        this.authService.settipo_usuario(resp.tipo_usuario);
        this.authService.settoken(resp.token);
        this.authService.setid_usuario(resp.id);

        this.tipo_usuario = resp.tipo_usuario;

        // Redirigir según el estado de "clave_dni"
        if (resp['clave_dni']) {
          this.router.navigateByUrl(`/usuarios/${resp.id}/actualizar-clave`);
        } else {
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: (err) => {
        this.isLoading = false;

        // Mostrar mensaje de error al usuario
        const errorMsg = err.error.message || 'Ocurrió un error al iniciar sesión.';
        this.notificationService.showError('Error de Login', errorMsg);

        // Resetear el formulario para que el usuario pueda intentar de nuevo
        this.loginForm.reset();
      },
    });
  }
}
