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

  const url = 'https://mech-backend-vw4n.onrender.com/api/users/admin/login';

  this.http.post(url, this.loginform.value).subscribe({
    next: (res: any) => {
      this.Uploading = false;

      if (res.success) {
        localStorage.setItem('user_token', 'true');
        localStorage.setItem('role', 'admin');

        window.alert('Login Success!');
        this.ngZone.run(() => {
          this.router.navigate(['/app/admin']);
        });
      } else {
        window.alert(res.message || 'Login failed');
      }
    },
    error: (err) => {
      this.Uploading = false;
      console.error(err);
      window.alert(err.error?.message || 'Login failed. Please check your credentials.');
    }
  });
}
