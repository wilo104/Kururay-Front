import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notificaciones.service';
import { AuthService } from '../auth.service';
import { UsuarioService } from '../usuario-service.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-actualizar-clave',
  standalone: true,
  providers: [AuthService, UsuarioService, NotificationService], 
  imports: [CommonModule, ReactiveFormsModule,ModalComponent], 
  templateUrl: './actualizar-clave.component.html',
  styleUrls: ['./actualizar-clave.component.css']
})
export class ActualizarClaveComponent implements OnInit {
  updatePasswordForm: FormGroup; // Se elimina el tipo undefined
  userId: string | null = '';
modalMessage: any;
showModal: any;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    // Se inicializa el FormGroup aquí para garantizar que siempre esté definido.
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
    this.userId = this.authService.getid_usuario(); // Obtener el ID del usuario
  }

  passwordMatchValidator(g: FormGroup): { [key: string]: any } | null {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
  }

  onChangePassword(): void {
    if (this.updatePasswordForm?.valid && this.userId) {
      const currentPassword = this.updatePasswordForm.get('currentPassword')?.value;
      const newPassword = this.updatePasswordForm.get('newPassword')?.value;
  
      this.usuarioService.actualizarContrasena(parseInt(this.userId), currentPassword, newPassword)
        .subscribe({
          next: (response) => {
          this.notificationService.showSuccess('ActualizarClaveModal','Contraseña actualizada correctamente');
           // this.modalMessage="Contraseña actualizada correctamente";
            //this.showModal=true;
          
            this.router.navigate(['/dashboard']); // Asegúrate de que esta sea la ruta correcta
          },
          error: (error) => {
            this.notificationService.showError('ActualizarClaveModal',"No es posible realizar la actualización");
            //this.modalMessage=("No es posible realizar la actualización");
            //this.showModal=true;
          }
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard']); // Asegúrate de que esta sea la ruta correcta para el dashboard
  }
}
