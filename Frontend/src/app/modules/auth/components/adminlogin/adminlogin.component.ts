import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  standalone: false,
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent implements OnInit {
  loginform!: FormGroup;
  Uploading: boolean = false;
  showPassword = false;
  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private ngZone: NgZone, 
    private router: Router
  ) { }
  ngOnInit() {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  // onsubmit() {
  //   if (this.loginform.invalid) {
  //     window.alert('Please fill out all required fields.');
  //     return;
  //   }

  //   this.Uploading = true;
  //   const url = 'http://localhost:3000/api/users/admin/login';
  //   this.http.post(url, this.loginform.value).subscribe({
  //     next: (res: any) => {
  //       this.Uploading = false;
  //       if (res.status && res.data) { 
  //         localStorage.setItem('user_token', res.data.token || 'true');
  //         localStorage.setItem('role', 'admin');
  //         window.alert('Login Success!');
  //         this.ngZone.run(() => this.router.navigateByUrl('/app/admin'));
  //       }
  //     },
  //     error: err => {
  //       this.Uploading = false;
  //       console.log('Login validation failed', err);
  //       window.alert(err.error?.message || 'Login failed. Please check your credentials.');
  //     }
  //   });
  // }
//     onsubmit() {
//     if (this.loginform.invalid){
//       window.alert('Please fill out all required fields.');
//     return;
//     }
//     this.Uploading = true;
//      const url = 'http://localhost:3000/api/users/admin/login';
//      this.http.post(url, this.loginform.value).subscribe({
//     next: (res: any) => {
//         this.Uploading = false;
//         if (res.success) { 
//           window.alert('Login Success!');
// this.ngZone.run(() => this.router.navigate(['/app/admin']));
//         }
//       },
//       error: err => {
//         this.Uploading = false; 
//         console.log('Login validation failed', err);
//         window.alert(err.error?.message || 'Login failed. Please check your credentials.');
//       }
//     });
//   }
onsubmit() {
    if (this.loginform.invalid) {
      window.alert('Please fill out all required fields.');
      return;
    }

    this.Uploading = true;
    // const url = 'http://localhost:3000/api/users/admin/login';
    
    const url = 'https://appsail-50044427482.development.catalystappsail.in/api/users/admin/login';
    this.http.post(url, this.loginform.value).subscribe({
      next: (res: any) => {
        this.Uploading = false;
        
        // I assume your backend returns 'res.success' based on your active code.
        if (res.success) { 
          
          // 1. MUST SAVE THE TOKEN AND ROLE HERE BEFORE NAVIGATING
          // Adjust 'res.token' to match whatever your backend actually sends back
          localStorage.setItem('user_token', res.token || 'true'); 
          localStorage.setItem('role', 'admin');
          
          window.alert('Login Success!');
          this.ngZone.run(() => this.router.navigate(['/app/admin']));
        }
      },
      error: err => {
        this.Uploading = false; 
        console.log('Login validation failed', err);
        window.alert(err.error?.message || 'Login failed. Please check your credentials.');
      }
    });
  }
}