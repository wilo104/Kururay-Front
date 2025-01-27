import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000'; // URL base de tu backend

  constructor(private http: HttpClient) {}

  obtenerEstadisticas(): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté guardado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/dashboard/estadisticas`, { headers });
  }
}
