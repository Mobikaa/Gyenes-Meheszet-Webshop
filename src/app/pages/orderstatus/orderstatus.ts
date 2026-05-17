import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order/order-service';
import { NotificationService } from '../../services/notification/notification-service';

@Component({
  selector: 'app-orderstatus',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButton,
    CommonModule
  ],
  templateUrl: './orderstatus.html',
  styleUrl: './orderstatus.scss',
})
export class Orderstatus {
  private _formBuilder = inject(FormBuilder);
  private orderService = inject(OrderService);
  private notificationService = inject(NotificationService);

  orderForm = this._formBuilder.group({
    orderId: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
  });

  orderStatus: any = null;
  loading = false;

  searchOrder(): void {
    if (!this.orderForm.valid) {
      this.notificationService.error('Kérjük, adjon meg egy érvényes rendelés ID-t.');
      return;
    }

    const orderId = this.orderForm.get('orderId')?.value;
    this.loading = true;

    this.orderService.getOrderStatus(Number(orderId)).subscribe({
      next: (data) => {
        this.orderStatus = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Order lookup failed', err);
        this.notificationService.error('A rendelés nem található.');
        this.orderStatus = null;
        this.loading = false;
      }
    });
  }
}
