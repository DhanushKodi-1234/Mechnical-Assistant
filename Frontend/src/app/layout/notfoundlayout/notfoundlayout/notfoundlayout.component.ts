import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-notfoundlayout',
  standalone: false,
  templateUrl: './notfoundlayout.component.html',
  styleUrl: './notfoundlayout.component.scss'
})
export class NotfoundlayoutComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
