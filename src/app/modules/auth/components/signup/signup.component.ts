import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
RegisterForm!: FormGroup;

ngOnInit(){
  this.RegisterForm= this.fb.group({
    name:['',Validators.required],
    password:['',Validators.required],
    email:['',Validators.required],
    mob:['',Validators.required],
    biketype:['',Validators.required]

  })
}
 constructor(private http:HttpClient, private fb: FormBuilder,private router:Router){}
 onSubmit(){
  if (this.RegisterForm.invalid) {
      window.alert('Please fill out all required fields.');
      return;
    }
 const url= 'http://localhost:3000/api/users/signupadmin'
     this.http.post(url, this.RegisterForm.value).subscribe({
      next:(data)=>{
        console.log('sUCESS',data);
        this.router.navigate(['/auth/login']);
      },
     error: (res)=>{
      window.alert("Error");
    }
    })
    console.log('Sending data:', this.RegisterForm.value);
  console.log('Button clicked')
 
  // this.http.post(url, this.RegisterForm.value).subscribe({
  //   next:(res)=>{
  //     window.alert('Sucess to strong in to db')
  //          this.router.navigate(['/auth/login']); 

  //   },
  //   error: (res)=>{
  //     window.alert("Error");
  //   }
  // })
 }
}
