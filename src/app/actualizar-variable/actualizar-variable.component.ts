import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notificaciones.service';
import { VariablesService } from '../variables.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-actualizar-variable',
    providers: [VariablesService, NotificationService],
    imports: [ReactiveFormsModule, ModalComponent, CommonModule],
    templateUrl: './actualizar-variable.component.html',
    styleUrls: ['./actualizar-variable.component.css']
})

export class ActualizarVariableComponent implements OnInit{
  editVariableForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private VariableService: VariablesService,
    private notificationService: NotificationService,
    protected router: Router,
    private fb: FormBuilder
  ) { this.editVariableForm = this.fb.group({
    nombre: ['', [Validators.required]],
    valor1: ['', [Validators.required]],
    descripcion: [''],
    valor2: [''],
    valor3: ['']
  });}


  initializeForm(): void {
    this.editVariableForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
     valor1: ['', [Validators.required]],
     valor2: [''],
     valor3: ['']
     });
  }
  ngOnInit(): void {
    this.initializeForm();
    this.activatedRoute.params.subscribe(params => {
      const VariableId = +params['id'];
      this.VariableService.obtenerVariablePorId(VariableId).subscribe(variable => {
        this.editVariableForm.patchValue(variable);
      });
    });
  }

  onSubmit(): void {
    if (this.editVariableForm.valid) {
      const variableId = this.activatedRoute.snapshot.params['id'];
      this.VariableService.actualizarVariable(variableId, this.editVariableForm.value).subscribe(
        () => {
         // this.notificationService.showSuccess('Actualizado correctamente');
          this.router.navigate(['/variables-sistema']);
        },
        error => {
          this.notificationService.showError('ActualizarVariableModal','No es posible realizar la actualización');
        }
      );
    } else {
      Object.values(this.editVariableForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

}
