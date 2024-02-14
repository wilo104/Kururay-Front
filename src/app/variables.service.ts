import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  private apiUrl = 'http://localhost:3000/variables-sistema'; // URL del api
  constructor(private http: HttpClient) { }

  obtenerVariables(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }



}
