import { Component, OnInit , NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
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

  onsubmit() {
    if (this.loginform.invalid){
      window.alert('Please fill out all required fields.');
      return;
    }

    this.Uploading = true;
    // const url = 'http://localhost:3000/api/users/login';
    const url = 'https://appsail-50044427482.development.catalystappsail.in/api/users/login';
    
    this.http.post(url, this.loginform.value).subscribe({
      next: (res: any) => {
        this.Uploading = false;
        if (res.status && res.data) {
          localStorage.setItem('user_token', res.data.token || 'true');
          localStorage.setItem('role', 'customer');
          window.alert('Login Success!');
          this.ngZone.run(() => this.router.navigateByUrl('/app/customer'));
        }
      },
      error: err => {
        this.Uploading = false;
        console.log('Login validation failed', err);
        window.alert(err.error?.message || 'Invalid email or password.');
      }
    });
  }
}