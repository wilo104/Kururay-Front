import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [ReactiveFormsModule, CommonModule],
    providers: [AuthService]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Por favor, completa todos los campos correctamente.', 'error');
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
  
        // Guardar la información del usuario
        this.authService.settoken(resp.token);
        this.authService.setid_usuario(resp.id);
        this.authService.settipo_usuario(resp.tipo_usuario);
        this.authService.setNombreUsuario(resp.nombre_completo);
  
        // Manejar clave_dni
        if (resp.clave_dni) {
          localStorage.setItem('clave_dni', 'true'); // Guardar bandera
          Swal.fire('Atención', 'Debes actualizar tu contraseña.', 'warning').then(() => {
            this.router.navigateByUrl(`/usuarios/${resp.id}/actualizar-clave`);
          });
        } else {
          localStorage.removeItem('clave_dni'); // Limpiar si no es necesario
          Swal.fire('Éxito', 'Inicio de sesión exitoso.', 'success').then(() => {
            this.router.navigateByUrl('/dashboard');
          });
        }
        
      },
      error: (err) => {
        this.isLoading = false;
        const errorMsg = err.error.message || 'Usuario o contraseña incorrectos.';
        Swal.fire('Error', errorMsg, 'error');
        this.loginForm.reset();
      },
    });
  }
  
}
