import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { NotificationService } from '../notificaciones.service';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-usuario',
  standalone:true,
  providers:[NotificationService],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  imports :[ReactiveFormsModule,ModalComponent,CommonModule]
})
export class RegistroUsuarioComponent implements OnInit {
  registroForm: FormGroup;
  showModal: boolean = false; // Controla si el modal está visible o no
  modalMessage: string = '';  // Mensaje que se mostrará en el modal


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) { this.registroForm = this.fb.group({
    dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    nombre: ['', [Validators.required]],
     correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    tipo_usuario: ['', [Validators.required]]
  });}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registroForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      tipo_usuario: ['', [Validators.required]]
     });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;

      formData.password = formData.dni;

      this.http.post('http://localhost:3000/usuarios/registro', formData).subscribe(
        (response: any) => {
          // Mostrar mensaje de éxito y redirigir
          console.log('Registro exitoso:', response);
          this.router.navigate(['/usuarios']);
        },
        (error) => {
          // Mostrar mensaje de error
          this.notificationService.showError("RegistroModal",error.error.message);
          this.showModal=true;
          console.error('Error en el registro:', error);
        }
      );
    } else {
      // Marcar los campos del formulario como tocados para mostrar errores
      
      this.showModal = true;
      this.modalMessage = 'No es posible realizar el registro';
      this.notificationService.showError("RegistroModal",this.modalMessage);
      Object.values(this.registroForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/usuarios']);
  }
}
