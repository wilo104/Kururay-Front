import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresosService {
  private apiUrl = 'http://localhost:3000/ingresos';
  private voluntariadoUrl = 'http://localhost:3000/voluntariados';

  constructor(private http: HttpClient) {}

  listarIngresos(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  registrarIngreso(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}`, data, { headers });
  }
  editarIngreso(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers });
  }
  
  

  obtenerIngreso(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }
  obtenerBenefactores(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });
  
    return this.http.get<any[]>('http://localhost:3000/benefactores', { headers });
  }
  
  
  


  listarVoluntariados(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(this.voluntariadoUrl, { headers });
  }

  asignarVoluntariado(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}/asignar-voluntariado`, data, { headers });
  }
  
  obtenerProductosPorIngreso(ingresoId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.get<any[]>(`${this.apiUrl}/${ingresoId}/productos`, { headers });
  }

  registrarProducto(ingresoId: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.post(`${this.apiUrl}/${ingresoId}/productos`, data, { headers });
  }
 
  editarProducto(ingresoId: number, productoId: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.put(`${this.apiUrl}/${ingresoId}/productos/${productoId}`, data, { headers });
  }
  
  obtenerProducto(ingresoId: number, productoId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    const url = `${this.apiUrl}/${ingresoId}/productos/${productoId}`;
    return this.http.get<any>(url, { headers });
  }
  
  


}
