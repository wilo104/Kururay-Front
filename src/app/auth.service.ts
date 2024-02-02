import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
  interface LoginResponse {
  token: string;
  tipo_usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'http://localhost:3000/login';
  private tipo_usuario: string = '';
  private token:string='';
  constructor(private http: HttpClient) {}

  login(loginObj: { dni: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, loginObj);
  }

  settipo_usuario(tipo_usuario: string) {
    this.tipo_usuario = tipo_usuario;
    localStorage.setItem('usertipo_usuario', tipo_usuario); // Almacenar el rol en localStorage para persistencia

    // Logic to handle the tipo_usuario
  }
  gettipo_usuario(): string | null {
    return localStorage.getItem('usertipo_usuario');
  }
  hastipo_usuario(expectedtipo_usuario: string): boolean {
    return this.tipo_usuario === expectedtipo_usuario;
  }

  settoken(token:string){
    this.token=token;
    localStorage.setItem('token',token);
  }
  
  gettoken():string | null {
    return localStorage.getItem('token');
  }
  hastoken(token:string):boolean{
    return this.token===token;
  }
  isLoggedIn(): boolean {
    return !!this.gettoken(); // !! convierte un valor a boolean, true si hay un token, false si no.
  }
  isUserAdmin(): boolean {
    const userType = this.gettipo_usuario();
    return userType === 'ADMINISTRADOR'; 
  }
   
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usertipo_usuario');
  }
}