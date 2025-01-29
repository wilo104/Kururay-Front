import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';





interface LoginResponse {
  [x: string]: any;
  id: any;
  token: string;
  tipo_usuario: string;
  nombre_completo: string; 
  clave_dni?: boolean; // Indicador opcional para clave igual a DNI
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginUrl = `${environment.apiUrl}login`;
 // private readonly loginUrl = 'https://kururayback-app-a1f8360c6979.herokuapp.com/login';
  private tipo_usuario: string = '';
  private token: string = '';
  private id: any;
  private userId = new BehaviorSubject<number | null>(null);

  private nombre_completo: string = '';

  
  constructor(private http: HttpClient, ) {}

  login(loginObj: { dni: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, loginObj);
    
  }

  setClaveDni(claveDni: boolean): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clave_dni', JSON.stringify(claveDni));
    }
  }

  getClaveDni(): boolean {
    if (typeof window !== 'undefined') {
      const claveDni = localStorage.getItem('clave_dni');
      return claveDni ? JSON.parse(claveDni) : false;
    }
    return false;
  }
  setUserId(id: number) {
    this.userId.next(id);
  }
  
  getUserId(): Observable<number | null> {
    return this.userId.asObservable();
  }

  settipo_usuario(tipo_usuario: string) {
    this.tipo_usuario = tipo_usuario;
    if (typeof window !== 'undefined') {
      localStorage.setItem('usertipo_usuario', tipo_usuario);
    }
  }

  getid_usuario(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('id');
    }
    return null;
  }

  setid_usuario(id: any) {
    this.id = id;
    if (typeof window !== 'undefined') {
      localStorage.setItem('id', id);
    }
  }

  gettipo_usuario(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('usertipo_usuario');
    }
    return null;
  }

  hastipo_usuario(expectedtipo_usuario: string): boolean {
    return this.tipo_usuario === expectedtipo_usuario;
  }

  settoken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  gettoken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  hastoken(token: string): boolean {
    return this.token === token;
  }

  isLoggedIn(): boolean {
    return !!this.gettoken();
  }

  isUserAdmin(): boolean {
    const userType = this.gettipo_usuario();
    return userType === 'ADMINISTRADOR';
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('usertipo_usuario');
    }
  }

  setNombreUsuario(nombre: string): void {
    this.nombre_completo = nombre;
    if (typeof window !== 'undefined') {
      localStorage.setItem('nombreUsuario', nombre);
    }
  }
  
  getNombreUsuario(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nombreUsuario'); // Recupera el nombre completo
    }
    return null;
  }


}
