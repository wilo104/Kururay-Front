import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // ✅ Importa RouterOutlet
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ Asegúrate de importar esto

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, RouterOutlet ],  // ✅ Agrega RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kururay-front';
}
