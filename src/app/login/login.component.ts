import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notificaciones.service';
import { ReactiveFormsModule } from '@angular/forms'; // Importa esto
import { ModalComponent } from '../modal/modal.component'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService, NotificationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ ReactiveFormsModule,ModalComponent], // Asegúrate de que ReactiveFormsModule esté aquí

})
export class LoginComponent {
  @Output() confirm = new EventEmitter<void>();
  isLoading = false;

  loginForm = this.fb.group({
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

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

        // Guardar información del usuario
        this.authService.settipo_usuario(resp.tipo_usuario);
        this.authService.settoken(resp.token);
        this.authService.setid_usuario(resp.id);
        this.authService.setNombreUsuario(resp.nombre_completo); // Ahora reconoce "nombre"

        // Redirigir según el estado
        if (resp['clave_dni']) {
          this.router.navigateByUrl(`/usuarios/${resp.id}/actualizar-clave`);
        } else {
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: (err) => {
        this.isLoading = false;
        const errorMsg = err.error.message || 'Ocurrió un error al iniciar sesión.';
        this.notificationService.showError('Error de Login', errorMsg);
        this.loginForm.reset();
      },
    });
  }
}
