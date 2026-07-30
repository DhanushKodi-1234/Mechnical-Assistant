import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-admindash',
  standalone: false,
  templateUrl: './admindash.component.html',
  styleUrl: './admindash.component.scss'
})
export class AdmindashComponent implements OnInit {
  columnsArray = [
    { key: 'shopname', label: 'Shop Name', sortable: true },
    { key: 'cname', label: 'Person', sortable: true },
    { key: 'email', label: 'Mail Id', sortable: true },
    { key: 'mob', label: 'Phone', sortable: true },
    { key: 'shopadd', label: 'Location', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  dataArray: any[] = [];
  loading: boolean = false;
  // private apiUrl = 'http://localhost:3000/api/users/mechanics';
  private apiUrl = 'https://appsail-50044427482.development.catalystappsail.in/api/users/mechanics';

  actions = [
    {
      type: 'simple',
      text: 'Accept',
      color: 'primary',
      hidden: (row: any) => row.status === 'Approved',
      callback: (row: any) => this.view(row)
    },
    {
      type: 'simple',
      text: 'Reject',
      color: 'warn',
      hidden: (row: any) => row.status === 'Rejected',
      callback: (row: any) => this.reject(row)
    }
  ];
  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.fetchTableData({});
  }
  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout(); 
      this.router.navigateByUrl('/auth/admin'); 
    }
  }

  fetchTableData(row: any) {
    this.loading = true;
    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        this.dataArray = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  view(row: any) {
    const displayName = row.cname || row.shopname || 'this shop';
    const c = confirm(`Are you sure you want to approve ${displayName}?`);
    if (c) {
      this.updateStatus(row, 'Approved');
    }
  }

  reject(row: any) {
    const displayName = row.cname || row.shopname || 'this shop';
    const c = confirm(`Reject ${displayName}?`);
    if (c) {
      this.updateStatus(row, 'Rejected');
    }
  }

  updateStatus(row: any, newStatus: string) {
    this.loading = true;
    const id = row._id || row.id; 
    const personName = row.cntatName || row.cname || 'Mechanic';

    this.http.put<any>(`${this.apiUrl}/${id}`, { status: newStatus }).subscribe({
      next: (res) => {
        row.status = newStatus;
        alert(`${personName} status updated to ${newStatus} successfully.`);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update status in the backend. Please check your backend connection.');
        this.loading = false;
      }
    });
  }
}