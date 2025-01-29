import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Esto es necesario si usas directivas comunes como `ngIf` o `ngFor`
import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet si usas rutas dentro del componente

@Component({
  selector: 'app-root',
  standalone: true,  // Indica que el componente es standalone
  imports: [CommonModule, RouterOutlet], // Importa los módulos necesarios
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kururay-front';
}
