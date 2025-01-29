import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'https://kururayback-app-a1f8360c6979.herokuapp.com'; // URL base de tu backend

  constructor(private http: HttpClient) {}

  obtenerEstadisticas(): Observable<any> {
    let token = null;

    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token'); // Asegúrate de que el token esté guardado
    }

    if (!token) {
      throw new Error('Token no disponible'); // Lanza un error si no hay token disponible
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/dashboard/estadisticas`, { headers });
  }
}
