import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notificaciones.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../auth.guard';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [AuthService, HttpClient, AuthGuard,NotificationService,ModalComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
    isLoading = false;
    loginForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // Patrón para un DNI peruano
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  
    constructor(
      private authService: AuthService,
      private notificationService: NotificationService,
      private router: Router,
      private fb: FormBuilder
    ) {}
  
    onLogin() {
      if (this.loginForm.invalid) {
        console.log("Aqui esta entrando y no hace nada mas")
        return;
        
      }
  
      this.isLoading = true;
      const loginObj = {
        dni: this.loginForm.value.dni!,
        password: this.loginForm.value.password!
      };
  
      this.authService.login(loginObj).subscribe({
        next: resp => {
          this.isLoading = false;
          this.notificationService.showSuccess("Login Successful");
          this.authService.settipo_usuario(resp.tipo_usuario);
          this.authService.settoken(resp.token);
          console.log(resp.token);
         this.navigateBasedOnRole(resp.tipo_usuario);
        },
        error: err => {
          this.isLoading = false;
          this.notificationService.showError(err.error.message);
        }
      });
    }
  
    private navigateBasedOnRole(tipo_usuario: string) {
      if (tipo_usuario === 'ADMINISTRADOR') {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    }
  }
