import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit 
{
  signupForm!: FormGroup
  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private _router:Router) 
  { }

  ngOnInit(): void 
  {
    this.signupForm = this.formbuilder.group({
      name:['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
      email:['',[Validators.required,Validators.email]],
      mobile:['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(5)]]
    })
  }

  get signupFormControl() {
    return this.signupForm.controls;
  }


  signUp()
  {
    if(this.signupForm.valid)
    {
    this._http.post<any>('http://localhost:3000/signup',this.signupForm.value).subscribe(res=>{
      console.log(res)
      alert('Signup Successfully');
      this.signupForm.reset();
      this._router.navigate(['/login']);
    }), (err: any)=>{
      console.log(err);
      alert('Signup Error');
    }
  }
  else{
    alert('Please enter all the mandatory details');
  }
  }
}
