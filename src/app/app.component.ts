import { Component ,HostListener} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,HttpClientModule],
  providers: [AuthService],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private authService: AuthService) {}
  title = 'kururay-front';
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event): void {
    // Llama al método de cierre de sesión al cerrar la página o el navegador
    this.authService.logout();
  }

}
