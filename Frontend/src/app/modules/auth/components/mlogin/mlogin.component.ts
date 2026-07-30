import { Component, OnInit , NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-mlogin',
  standalone: false,
  templateUrl: './mlogin.component.html',
  styleUrl: './mlogin.component.css'
})
export class MloginComponent {
 loginform!: FormGroup
  ngOnInit() {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  Uploading: boolean = false;
  showPassword = false;
   togglePassword() {
    this.showPassword = !this.showPassword;
  }
  constructor(private http: HttpClient, private fb: FormBuilder, private ngZone:NgZone,private router: Router) { }
  onsubmit() {
    if (this.loginform.invalid){
      window.alert('Please fill out all required fields.');
    return;
    }
    // this.auth.login(this.loginform.value).subscribe({
    //   next:(res)=>{
    //     if(res.status && res.data){
    //       window.alert('Login Success!');
    //       localStorage.setItem('email', res.data.email);
    //       localStorage.setItem('name', res.data.name);
    //       this.ngZone.run(() => this.router.navigateByUrl('app/dash'));
    //     }
    //   },
    //   error: (err:any) => {
    //     console.error('Login validation failed:', err);
    //    console.log(`Invalid email or password`)
    //   }
    // });
    //  url="http://localhost:3000/api"
    //   register(user:any){
    //     return this.http.post(`${this.url}/signup`,user);
    //   }
    //   login(user:any):Observable<any>{
    //     return this.http.post(`${this.url}/login`,user);
    //   }


        //without auth service
    //  const url= 'http://localhost:3000/api/users/mechanic/login'
     const url = 'https://appsail-50044427482.development.catalystappsail.in/api/users/mechanic/login';
    this.http.post(url, this.loginform.value).subscribe({
  next: (res: any) => {
    if (res.status && res.data) {
      localStorage.setItem('user_token', res.data.token || 'true'); 
      localStorage.setItem('role', 'mechanic');
       localStorage.setItem('mechanicId', res.data._id);
      window.alert('Login Success!');
      this.ngZone.run(() => this.router.navigateByUrl('/app/mech'));
    }
  },
  error: err => {
    console.log('Login validation failed', err);
  }
});
  }

}


