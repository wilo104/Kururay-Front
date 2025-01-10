import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { NotificationService } from '../notificaciones.service';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { VariablesService } from '../variables.service';
@Component({
  selector: 'app-variable-registro',
  standalone: true,
  providers:[NotificationService , VariablesService],
  imports: [ReactiveFormsModule,ModalComponent,CommonModule],
  templateUrl: './variable-registro.component.html',
  styleUrls: ['./variable-registro.component.css']
})
export class VariableRegistroComponent implements OnInit {
  registroForm: FormGroup;
  showModal: boolean = false; // Controla si el modal está visible o no
  modalMessage: string = '';  // Mensaje que se mostrará en el modal
  constructor(
    private fb: FormBuilder,
    private variablesService: VariablesService,
    private notificationService: NotificationService,
    private router: Router
  ) { this.registroForm = this.fb.group({
    nombre: ['', [Validators.required]],
    valor1: ['', [Validators.required]]

  });}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
    valor1: ['', [Validators.required]],
    valor2: [''],
    valor3: ['']
     });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;

      formData.password = formData.dni;

      this.variablesService.registrarVariable(formData).subscribe(
        (response: any) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/variables-sistema']);
        },
        (error) => {
          this.notificationService.showError("RegistroModal", error.error.message);
          this.showModal = true;
          console.error('Error en el registro:', error);
        }
      );
    } else {

      this.showModal = true;
      this.modalMessage = 'No es posible realizar el registro';
      this.notificationService.showError("RegistroModal",this.modalMessage);
      Object.values(this.registroForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/variables-sistema']);
  }
}
