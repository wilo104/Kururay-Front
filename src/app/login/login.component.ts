import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule,FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
      loginObj : Login;
      
   
      constructor(private http:HttpClient, private router:Router ,private authService: AuthService ){
        this.loginObj=new Login();
      }
      onLogin() {
        interface LoginResponse {
            token: string;
            tipo_usuario: string;
        }
    
        this.http.post<LoginResponse>('http://localhost:3000/login', this.loginObj).subscribe(
            {
                next: (resp: LoginResponse) => {
                    console.log(resp);
                    alert("Login Success");
    
                    // Acceder al token y al rol
                    const token = resp.token;
                    const tipo_usuario = resp.tipo_usuario;
                    console.log(resp)
                    this.authService.setRole(tipo_usuario);
                    // Guardar el token, manejar el rol, etc.
                    // Ejemplo: redirigir según el rol
                    // if (role === 'administrador') {
                        // this.router.navigateByUrl("/admin-dashboard");

                        this.router.navigateByUrl("/dashboard");
                    // } else {
                    //     this.router.navigateByUrl("/dashboard");
                    // }
                },
                error: err => {
                    alert(err.error.message);
                }
            }
        );
    }

}
export class Login{

    dni:string;
    password:string;
   constructor(){
    this.dni='';
    this.password='';
   }

}