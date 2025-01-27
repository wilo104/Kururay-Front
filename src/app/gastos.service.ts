import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl = 'http://localhost:3000'; // Cambia según tu API
  private voluntariadoUrl = 'http://localhost:3000/voluntariados';

  constructor(private http: HttpClient) {}

  listarGastos(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Asegúrate de que el token sea válido
    });

    return this.http.get<any[]>(`${this.apiUrl}/gastos`, { headers });
  }

  registrarGasto(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.post(`${this.apiUrl}/gastos`, data, { headers });
  }
  
  listarVoluntariados(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(this.voluntariadoUrl, { headers });
  }

  editarGasto(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.apiUrl}/gastos/${id}`, data, { headers });
  }
  
  obtenerGasto(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/gastos/${id}`, { headers });
  }
  obtenerGastoPorId(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.apiUrl}/gastos/${id}`, { headers });
  }
  
  actualizarGasto(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<any>(`${this.apiUrl}/gastos/${id}`, data, { headers });
  }
  

}
