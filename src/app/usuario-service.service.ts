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
    const url = `${this.apiUrl}/${id}/estado`; // Construye la URL correctamente
    return this.http.put(url, { nuevoEstado: estado }); // Utiliza PUT en lugar de PATCH si el backend lo espera así
  }
  actualizarUsuario(id: number, usuario: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, usuario);
  }
  // Otros métodos relacionados con los usuarios...
}