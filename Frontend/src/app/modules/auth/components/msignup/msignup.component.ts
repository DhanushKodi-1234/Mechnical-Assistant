import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-msignup',
  standalone: false,
  templateUrl: './msignup.component.html',
  styleUrl: './msignup.component.css'
})
export class MsignupComponent {

  RegisterForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

ngOnInit(): void {
  this.RegisterForm = this.fb.group({
    shopname: ['', Validators.required],
    email: ['', Validators.required],
    mob: ['', Validators.required],
    password: ['', Validators.required],
    shopadd: ['', Validators.required],
    cname: ['', Validators.required],

    latitude: [''],
    longitude: [''],
    perKmCharge: ['', Validators.required]
  });

  this.getCurrentLocation();
}
getCurrentLocation() {

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        this.RegisterForm.patchValue({

          latitude: position.coords.latitude,
          longitude: position.coords.longitude

        });

        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);

      },

      (error) => {

        console.log(error);
        alert("Please allow location access.");

      }

    );

  }

}
  onSubmit() {

    if (this.RegisterForm.invalid) {
      alert('Please fill all fields');
      return;
    }

    console.log('Sending Data:', this.RegisterForm.value);

    this.http.post(
      'http://localhost:3000/api/users/mechanic/signup',
      'https://mech-backend-vw4n.onrender.com/api/users/mechanic/signup',
      this.RegisterForm.value
    ).subscribe({
      next: (res) => {
        console.log(res);
        alert('Registration Successful');

        this.RegisterForm.reset();

        this.router.navigate(['/auth/mclogin']);
      },
      error: (err) => {
        console.log(err);
        alert('Registration Failed');
      }
    });
  }
}

