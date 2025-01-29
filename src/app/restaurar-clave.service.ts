import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurarClaveService {
  private apiUrl = 'https://kururayback-app-a1f8360c6979.herokuapp.com'; // Cambia según tu configuración

  constructor(private http: HttpClient) {}

  restaurarContrasena(tabla: string, id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Usa el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.apiUrl}/restaurar-contrasena`, { tabla, id }, { headers });
  }
}
