// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // La URL del servidor Express

  constructor(private http: HttpClient) {}

  login(dni: string, password: string): Observable<any> {
    const body = { dni, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}