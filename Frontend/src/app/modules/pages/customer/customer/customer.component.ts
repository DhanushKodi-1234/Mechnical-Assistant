import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  columnsArray = [
    { key: 'shopname', label: 'Shop Name', sortable: true },
    { key: 'cname', label: 'Person', sortable: true },
    { key: 'email', label: 'Mail Id', sortable: true },
    { key: 'mob', label: 'Phone', sortable: true },
    { key: 'shopadd', label: 'Location', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  dataArray: any[] = [];
  actions = [
    {
      type: 'simple',
      text: 'Book',
      color: 'primary',
      callback: (row: any) => this.view(row)
    },
  ];

  loading: boolean = false;
  showForm: boolean = false;
  selectedMechanic: any = null;
  calculatedDistance: number = 0;
  calculatedAmount: number = 0;
  isTooFar: boolean = false;
  selectedFile: File | null = null;

  RegisterForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router) { }
logout(): void {
  localStorage.removeItem('user_token');
  this.router.navigate(['/auth/login']);
}
imagePreview: string | null = null;
  ngOnInit() {
    this.fetchTableData({});
    this.RegisterForm = new FormGroup({
      vehName: new FormControl('', Validators.required),
      vehCategory: new FormControl('', Validators.required),
      problemType: new FormControl('', Validators.required)
    });
  }
// const url = 'https://appsail-50044427482.development.catalystappsail.in/api/users/login';
  fetchTableData(row: any) {
    this.loading = true;
    this.http.get<any>('https://mech-backend-vw4n.onrender.com/api/users/mechanics/sucess').subscribe({
      next: (res) => {
        this.dataArray = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
  // view(row: any) {
  //   this.selectedMechanic = row;
  //   this.calculatedDistance = Math.floor(Math.random() * 15) + 1;
  //   if (this.calculatedDistance > 10) {
  //     this.isTooFar = true;
  //     alert(`Danger: This shop is ${this.calculatedDistance}km away! In critical conditions, please call highway patrol emergency services immediately.`);
  //     return;
  //   } else {
  //     this.isTooFar = false;
  //     const baseFee = this.calculatedDistance > 10 ? 250 : 100;
  //     const ratePerKm = 15;
  //     this.calculatedAmount = baseFee + (this.calculatedDistance * ratePerKm);
  //     this.showForm = true;
  //   }
  // }

  // onFileSelect(event: any) {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];
  //   }
  // }

view(row: any) {

  console.log("===== BOOK CLICKED =====");
  console.log("Mechanic Data:", row);

  this.selectedMechanic = row;

  navigator.geolocation.getCurrentPosition(
    (position) => {

      const customerLat = position.coords.latitude;
      const customerLng = position.coords.longitude;

      console.log("Customer Latitude:", customerLat);
      console.log("Customer Longitude:", customerLng);

      const mechanicLat = Number(row.latitude);
      const mechanicLng = Number(row.longitude);

      console.log("Mechanic Latitude:", mechanicLat);
      console.log("Mechanic Longitude:", mechanicLng);

      this.calculatedDistance = Math.round(  this.getDistance(
        customerLat,
        customerLng,
        mechanicLat,
        mechanicLng
      ));

     if (this.calculatedDistance > 10) {

  const proceed = confirm(
    `This mechanic is ${this.calculatedDistance} KM away.\n\nDo you want to continue?`
  );

  if (!proceed) {
    return;
  }
}

      console.log("Distance:", this.calculatedDistance);

      const baseCharge = 5;
      const perKmCharge = Number(row.perKmCharge);

      this.calculatedAmount = baseCharge + (this.calculatedDistance * perKmCharge);

      console.log("Amount:", this.calculatedAmount);

      this.showForm = true;

    },
    (error) => {
      console.log("Location Error:", error);
    }
  );
}
  onFileSelect(event: any): void {
  const file = event.target.files[0];
  this.selectedFile=event.target.files[0];
  if (file) {
    this.RegisterForm.patchValue({ vehImage: file });
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {

  const R = 6371;

  const dLat = this.toRad(lat2 - lat1);
  const dLon = this.toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) *
    Math.cos(this.toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

toRad(value: number): number {
  return value * Math.PI / 180;
}
  onSubmit() {
    if (this.RegisterForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }
    
    const formData = new FormData();
    formData.append('vehName', this.RegisterForm.value.vehName);
    formData.append('vehCategory', this.RegisterForm.value.vehCategory);
    formData.append('problemType', this.RegisterForm.value.problemType);
    formData.append('mechanicId', this.selectedMechanic._id);
    formData.append('distance', this.calculatedDistance.toString());
    formData.append('amount', this.calculatedAmount.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.loading = true;
    this.http.post('https://mech-backend-vw4n.onrender.com/api/users/requests/raise', formData).subscribe({
      next: (res) => {
        alert(`Booking successfully requested! Cost calculated: ₹${this.calculatedAmount}`);
        this.resetFormState(); // <-- Cleaned up into a reusable helper method
      },
      error: (err) => {
        console.error(err);
        alert('Failed to send breakdown request.');
        this.loading = false;
      }
    });
  }

  cancelBooking() {
    this.resetFormState();
  }


  private resetFormState() {
    this.showForm = false;
    this.selectedMechanic = null;
    this.selectedFile = null;
    this.loading = false;
    this.RegisterForm.reset();
    const fileInput = document.getElementById('vehImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
paynow() {
  this.http.post<any>(
    'https://mech-backend-vw4n.onrender.com/api/payment/payment',
    {
      amount: this.calculatedAmount
    }
  ).subscribe({
    next: (od) => {

      const options = {
        key: 'rzp_test_TFmWENas0N8olQ', 
        amount: od.amount,
        currency: od.currency,
        order_id: od.id,

        name: 'Mechanic Assistant',
        description: 'Vehicle Breakdown',

        handler: (response: any) => {
          console.log(response);
          alert('Payment Successful');
        },

        theme: {
          color: '#cbe3ee'
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    },

    error: (err) => {
      console.error(err);
      alert('Unable to create payment order.');
    }
  });
}
}