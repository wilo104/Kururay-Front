import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notificaciones.service';
import { UsuarioService } from '../usuario-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-actualizar-usuario',
    providers: [UsuarioService, NotificationService],
    imports: [ReactiveFormsModule, ModalComponent, CommonModule],
    templateUrl: './actualizar-usuario.component.html',
    styleUrls: ['./actualizar-usuario.component.css']
})

export class ActualizarUsuarioComponent implements OnInit{
  editUserForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private notificationService: NotificationService,
    protected router: Router,
    private fb: FormBuilder
  ) {
    this.editUserForm = this.fb.group({
      dni: [{value: '', disabled: true}, [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      tipo_usuario: ['', [Validators.required]],
      
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const userId = +params['id'];
      this.usuarioService.obtenerUsuarioPorId(userId).subscribe(usuario => {
        this.editUserForm.patchValue(usuario);
        this.editUserForm.get('dni')?.disable(); // Asumiendo que 'dni' es un campo del formulario
      });
    });
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      const userId = this.activatedRoute.snapshot.params['id'];
      this.usuarioService.actualizarUsuario(userId, this.editUserForm.value).subscribe(
        () => {
         // this.notificationService.showSuccess('Actualizado correctamente');
             Swal.fire('Éxito', 'Usuario Actualizado');
           
          this.router.navigate(['/usuarios']);
        },
        error => {
        Swal.fire('ActualizarUsuarioModal','No es posible realizar la actualización');
        }
      );
    } else {
      Object.values(this.editUserForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

}
