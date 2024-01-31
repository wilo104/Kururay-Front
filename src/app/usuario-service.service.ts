import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios'; // URL de tu API

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  cambiarEstadoUsuario(id: number, estado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { estado });
  }

  // Otros métodos relacionados con los usuarios...
}