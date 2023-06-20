import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit 
{
  loginForm!: FormGroup;
  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private _router:Router ) { }

  ngOnInit(): void 
  {
    this.loginForm = this.formbuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  logIn() 
  {
    console.log(this.loginForm.value);

    if(this.loginForm.valid)
    {
      this._http.get<any>('http://localhost:3000/signup').subscribe(res=>{
        const user = res.find((a:any)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });

        if(user)
        {
          alert(this.loginForm.value.email + ' logged in successfully');
          this._router.navigate(['/restaurent']);
          this.loginForm.reset();   
        }
        else{
          alert('User Not Found');
          this._router.navigate(['/login']);
        }
        },(err:any)=>{
        console.log(err);
        alert('Signup Error');
      });
    }
    else{
      alert('Please enter email and password');
    }
  }
}
