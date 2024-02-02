import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../auth.guard';

import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  standalone: true,
  providers: [AuthService, HttpClient,AuthGuard],
  imports: [RouterOutlet,CommonModule,HttpClientModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {


  tipo_usuario: string | null = "";
  token: string | null = "";
 
      constructor(private AuthServise:AuthService , private router: Router,){
        this.tipo_usuario = this.AuthServise.gettipo_usuario();
        this.token = this.AuthServise.gettoken();
      console.log(this.AuthServise.gettipo_usuario())
      console.log(this.token);
      }
      logout() {
        this.AuthServise.logout();
        this.router.navigateByUrl('/login');
        
       }
}
