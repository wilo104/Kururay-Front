import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { NotificationService } from '../notificaciones.service';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../usuario-service.service';
import { VariablesService } from '../variables.service';

@Component({
  selector: 'app-registro-usuario',
  standalone:true,
  providers:[NotificationService , UsuarioService,VariablesService],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  imports :[ReactiveFormsModule,ModalComponent,CommonModule]
})

export class RegistroUsuarioComponent implements OnInit {
  ngAfterViewInit() {
    const fileInput = document.getElementById('cvInput') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0]; // Usa el operador de encadenamiento opcional (?)
        if (file) {
          console.log('Ruta real del archivo:', file);
        } else {
          console.error('No se seleccionó ningún archivo.');
        }
      });
    } else {
      console.error('No se encontró el elemento con ID "cvInput".');
    }
  }
  registroForm: FormGroup;
  showModal: boolean = false; // Controla si el modal está visible o no
  modalMessage: string = '';  // Mensaje que se mostrará en el modal
  VariablesService: any;
  areas: string[] = [];
  situaciones: string[] = [];
  carreras: string[] = []; // Se corrigió la variable carreras
  roles: string[] = []; 
  categorias: string[] = []; 
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService, // Se corrigió la variable usuarioService
    private notificationService: NotificationService,
    private router: Router,
    private variablesService: VariablesService
  ) { 
    this.registroForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      tipo_usuario: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      area: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      fecha_ingreso: [''],
      situacion: ['', [Validators.required]],
      carrera: ['', [Validators.required]], // Se agregó el campo carrera
      categoria: ['', [Validators.required]],
      facebook: [''],
   
 
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.cargarValores('AREA');
    this.cargarValores('SITUACION');
    this.cargarValores('CARRERA'); // Se cargan también los valores para la carrera
    this.cargarValores('ROL');
    this.cargarValores('CATEGORIA');
  }

  initializeForm(): void {
    const now = new Date();
    const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
    const localDateISOString = localDate.toISOString().substring(0, 10);

    this.registroForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      tipo_usuario: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      area: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      fecha_ingreso: [localDateISOString], 
      situacion: ['', [Validators.required]],
      carrera: [''], // Quitamos la validación obligatoria
      categoria: ['', [Validators.required]],
      instagram: [''],
      linkedin: [''],
      facebook: [''], // Quitamos la validación obligatoria
      cv: [''],
    });
    
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      const cvFileInput = document.getElementById('cv') as HTMLInputElement;
      
      // Verificar si cvFileInput no es null antes de intentar acceder a la propiedad files
      if (cvFileInput && cvFileInput.files && cvFileInput.files.length > 0) {
        const cvFile = cvFileInput.files[0];
  
        this.usuarioService.registrarUsuario(formData, cvFile).subscribe(
          (response: any) => {
            console.log('Registro exitoso:', response);
            this.router.navigate(['/usuarios']);
          },
          (error) => {
            this.notificationService.showError("RegistroModal", error.error.message);
            this.showModal = true;
            console.error('Error en el registro:', error);
          }
        );
      } else {
        // Si el campo CV está vacío, llamar a registrarUsuario sin el archivo CV
        this.usuarioService.registrarUsuario(formData).subscribe(
          (response: any) => {
            console.log('Registro exitoso:', response);
            this.router.navigate(['/usuarios']);
          },
          (error) => {
            this.notificationService.showError("RegistroModal", error.error.message);
            this.showModal = true;
            console.error('Error en el registro:', error);
          }
        );
      }
    } else {
      this.showModal = true;
      this.modalMessage = 'No es posible realizar el registro';
      this.notificationService.showError("RegistroModal", this.modalMessage);
      Object.values(this.registroForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
  
  

  cargarValores(nombreVariable: string): void {
    this.variablesService.obtenerValoresPorNombre(nombreVariable).subscribe({
      next: (valores) => {
        if (nombreVariable === 'AREA') {
          this.areas = valores;
        }
        if (nombreVariable === 'SITUACION') {
          this.situaciones = valores;
        }
        if (nombreVariable === 'CARRERA') {
          this.carreras = valores;
        }
        if (nombreVariable === 'ROL') {
          this.roles = valores;
        }
        if (nombreVariable === 'CATEGORIA') {
          this.categorias = valores;
        }
        
      },
      error: (error) => console.error(`Error al cargar ${nombreVariable}:`, error)
    });
  }

  onCancel(): void {
    this.router.navigate(['/usuarios']);
  }
}
