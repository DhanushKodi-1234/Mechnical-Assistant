import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mech',
  standalone: false,
  templateUrl: './mech.component.html',
  styleUrl: './mech.component.scss'
})
export class MechComponent implements OnInit {
  columnsArray = [
    { key: 'vehName', label: 'Vehicle Model', sortable: true },
    { key: 'vehCategory', label: 'Category', sortable: true },
    { key: 'problemType', label: 'Problem', sortable: true },
    { key: 'distance', label: 'Distance (KM)', sortable: true },
    { key: 'amount', label: 'Estimated Fare (₹)', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  dataArray: any[] = [];
  loading: boolean = false;
  showForm: boolean = false;
  selectedRequest: any = null;

  actions = [
    {
      type: 'simple',
      text: 'View Request',
      color: 'primary',
      hidden: (row: any) => row.status === 'Approved' || row.status === 'Rejected',
      callback: (row: any) => this.view(row)
    },
  ];
  private apiUrl = 'https://appsail-50044427482.development.catalystappsail.in/api/users/requests';
  constructor(private http: HttpClient,   private sanitizer: DomSanitizer, private router:Router, private auth:AuthService) {}
  ngOnInit() {
    this.fetchTableData({});
  }
  // fetchTableData(row: any) {
  //   this.loading = true;
  //   this.http.get<any>('http://localhost:3000/api/users/requests').subscribe({
  //     next: (res) => {
  //       this.dataArray = res.data;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.loading = false;
  //     }
  //   });
  // }
    logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.auth.logout(); 
      this.router.navigateByUrl('/auth/mclogin'); 
    }
  }
  fetchTableData(row: any) {
  this.loading = true;
  this.http.get<any>('http://localhost:3000/api/users/requests').subscribe({
    next: (res) => {
      this.dataArray = res.data.map((request: any) => {
        if (request.image) {
          const cleanPath = request.image.replace(/\\/g, '/');
          request.imageUrl = `http://localhost:3000/${cleanPath}`;
        } else {
          request.imageUrl = null;
        }
        return request;
      });
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
    }
  });
}
  view(row: any) {
    this.selectedRequest = row;
    this.showForm = true;
  }

  closeRequestView() {
    this.showForm = false;
    this.selectedRequest = null;
  }

  updateStatus(newStatus: string) {
    if (!this.selectedRequest) return;

    this.loading = true;
    const id = this.selectedRequest._id || this.selectedRequest.id;
    const modelName = this.selectedRequest.vehName || 'Vehicle';
    this.http.put<any>(`${this.apiUrl}/${id}`, { status: newStatus }).subscribe({
      next: (res) => {
        alert(`Request for ${modelName} has been ${newStatus} successfully.`);
        this.loading = false;
        this.showForm = false;
        this.selectedRequest = null;
        this.fetchTableData({}); 
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update request status. Please try again.');
        this.loading = false;
      }
    });
  }
}