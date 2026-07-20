import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  amount = 0;

  paymentMethod = '';

  ngOnInit() {

    const data = history.state;

    this.amount = data.amount;

    this.paymentMethod = data.paymentMethod;

  }
}
