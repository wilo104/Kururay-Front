import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule,FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
      loginObj : Login;
      constructor(private http:HttpClient){
        this.loginObj=new Login();
      }
      onLogin() {
        this.http.post('http://localhost:3000/login', this.loginObj).subscribe(
          {
            next:resp=>{
              alert("Login Success")
            },
            error:err=>{
              console.log(err.error.msg);
            }
          }
        );
      }

}
export class Login{

    dni:string;
    password:string;
   constructor(){
    this.dni='';
    this.password='';
   }

}