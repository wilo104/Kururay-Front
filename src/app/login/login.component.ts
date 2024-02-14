import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notificaciones.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../auth.guard';
import { ModalComponent } from "../modal/modal.component";

@Component({
    selector: 'app-login',
    standalone: true,
    providers: [AuthService, AuthGuard, NotificationService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, ModalComponent]
})
export class LoginComponent {
  @Output() confirm = new EventEmitter<void>();
     tipo_usuario:string | undefined;
     Id: any;
    isLoading = false;
    loginForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // Patrón para un DNI peruano
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  loggedInUserType: string="";
  
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
         // this.notificationService.showSuccess("LoginModal","Login Successful");
          this.authService.settipo_usuario(resp.tipo_usuario);
          this.authService.settoken(resp.token);
          this.authService.setid_usuario(resp.id)
          this.tipo_usuario=resp.tipo_usuario;
         this.navigateBasedOnRole(resp.tipo_usuario);
         this.loggedInUserType=resp.tipo_usuario;
         console.log(resp.id);
        },
        error: err => {
          this.isLoading = false;
          this.notificationService.showError('LoginModal',err.error.message);
          this.loginForm.reset();
        }
      });
    }
    onModalConfirm() {
      // Aquí la lógica que deseas realizar después de confirmar el modal
      console.log(this.loggedInUserType);
      this.navigateBasedOnRole(this.loggedInUserType);
    }

  
    private navigateBasedOnRole(tipo_usuario: string) {
      if (tipo_usuario === 'ADMINISTRADOR') {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    }
  }
