import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerloc',
  standalone: false,
  templateUrl: './customerloc.component.html',
  styleUrl: './customerloc.component.scss'
})
export class CustomerlocComponent implements OnInit {
  RegisterForm!: FormGroup;
  selectedFile: File | null = null; 

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      shopadd: ['', Validators.required],
      vehName: ['', Validators.required],       
      vehCategory: ['', Validators.required],  
      problemType: ['', Validators.required]    
    });
  }
  onFileSelect(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  onSubmit(): void {
    if (this.RegisterForm.invalid) {
      alert('Please fill all fields correctly');
      return;
    }
    this.router.navigate(['http://localhost:4200/app/customer/cus']);

    
  }
}