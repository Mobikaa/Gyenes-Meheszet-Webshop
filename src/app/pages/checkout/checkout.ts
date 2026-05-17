import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { MatButton } from '@angular/material/button';
import { Summarize } from "../../shared/summarize/summarize";
import { Cart } from '../../services/cart/cart';
import { CartSummaryItem } from '../../shared/models/cartSummaryItem';
import { OrderService } from '../../services/order/order-service';
import { NotificationService } from '../../services/notification/notification-service';
import { ProfileService } from '../../services/profile/profile-service';

@Component({
  selector: 'app-checkout',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButton,
    Summarize
],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private orderService = inject(OrderService);
  private notificationService = inject(NotificationService);
  private cartService = inject(Cart);
  private profileService = inject(ProfileService);

  personalFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required],
    phoneCtrl: ['', Validators.required],
  });

  shippingFormGroup = this._formBuilder.group({
    countryCtrl: ['', Validators.required],
    cityCtrl: ['', Validators.required],
    postalCtrl: ['', Validators.required],
    streetCtrl: ['', Validators.required],
    houseNumberCtrl: ['', Validators.required],
    floorDoorCtrl: [''],
    differentBilling: [false],
  });

  billingFormGroup = this._formBuilder.group({
    billingNameCtrl: ['', Validators.required],
    billingPhoneCtrl: ['', Validators.required],
    billingCountryCtrl: ['', Validators.required],
    billingCityCtrl: ['', Validators.required],
    billingPostalCtrl: ['', Validators.required],
    billingStreetCtrl: ['', Validators.required],
    billingHouseNumberCtrl: ['', Validators.required],
    billingFloorDoorCtrl: [''],
  });

  shippingMethodCtrl = this._formBuilder.group({
    shippingMethod: ['standard', Validators.required]
  });

  paymentMethodCtrl = this._formBuilder.group({
    paymentMethod: ['utanvetel', Validators.required]
  });

  checkoutFeeItems: CartSummaryItem[] = [
    { id: -1, name: 'Utánvétel', quantity: 1, total: 500 },
    { id: -2, name: 'Házhoz szállítás (MPL)', quantity: 1, total: 1200 }
  ];
  showCheckoutFees = true;

  ngOnInit(): void {
    this.loadUserProfileData();
  }

  private loadUserProfileData(): void {
    const token = sessionStorage.getItem('token');
    const userId = Number(sessionStorage.getItem('userId'));

    if (!token || !userId) {
      return;
    }

    this.profileService.getUserProfile(userId, token).subscribe({
      next: (user) => {
        if (user.address) {
          this.prefillFormWithAddress(user.address);
        }

        if (user.email) {
          this.personalFormGroup.patchValue({ emailCtrl: user.email });
        }
      },
      error: (err) => {
        console.error('Failed to load user profile for checkout', err);
      }
    });
  }

  private prefillFormWithAddress(address: any): void {
    if (address.full_name) {
      this.personalFormGroup.patchValue({
        nameCtrl: address.full_name
      });
    }

    if (address.phone_number) {
      this.personalFormGroup.patchValue({
        phoneCtrl: address.phone_number
      });
    }

    if (address.country) {
      this.shippingFormGroup.patchValue({
        countryCtrl: address.country
      });
    }

    if (address.city) {
      this.shippingFormGroup.patchValue({
        cityCtrl: address.city
      });
    }

    if (address.postal_code) {
      this.shippingFormGroup.patchValue({
        postalCtrl: address.postal_code
      });
    }

    if (address.street) {
      this.shippingFormGroup.patchValue({
        streetCtrl: address.street
      });
    }

    if (address.house_number) {
      this.shippingFormGroup.patchValue({
        houseNumberCtrl: address.house_number
      });
    }

    if (address.floor_door) {
      this.shippingFormGroup.patchValue({
        floorDoorCtrl: address.floor_door
      });
    }
  }

  finalizeOrder(): void {
    const items = this.cartService.getItems();

    if (!items || items.length === 0) {
      this.notificationService.error('A kosár üres, nem lehet rendelést létrehozni.');
      return;
    }

    const differentBilling = this.shippingFormGroup.get('differentBilling')?.value;
    const shipping = {
      full_name: this.personalFormGroup.get('nameCtrl')?.value,
      phone_number: this.personalFormGroup.get('phoneCtrl')?.value,
      country: this.shippingFormGroup.get('countryCtrl')?.value,
      postal_code: this.shippingFormGroup.get('postalCtrl')?.value,
      city: this.shippingFormGroup.get('cityCtrl')?.value,
      street: this.shippingFormGroup.get('streetCtrl')?.value,
      house_number: this.shippingFormGroup.get('houseNumberCtrl')?.value,
      floor_door: this.shippingFormGroup.get('floorDoorCtrl')?.value || null,
    };

    const billing = {
      same_as_shipping: !differentBilling,
      full_name: differentBilling ? this.billingFormGroup.get('billingNameCtrl')?.value : null,
      phone_number: differentBilling ? this.billingFormGroup.get('billingPhoneCtrl')?.value : null,
      country: differentBilling ? this.billingFormGroup.get('billingCountryCtrl')?.value : null,
      postal_code: differentBilling ? this.billingFormGroup.get('billingPostalCtrl')?.value : null,
      city: differentBilling ? this.billingFormGroup.get('billingCityCtrl')?.value : null,
      street: differentBilling ? this.billingFormGroup.get('billingStreetCtrl')?.value : null,
      house_number: differentBilling ? this.billingFormGroup.get('billingHouseNumberCtrl')?.value : null,
      floor_door: differentBilling ? this.billingFormGroup.get('billingFloorDoorCtrl')?.value || null : null,
    };

    const orderPayload = {
      email: this.personalFormGroup.get('emailCtrl')?.value,
      shipping,
      billing,
      paymentMethod: this.paymentMethodCtrl.get('paymentMethod')?.value,
      shippingMethod: this.shippingMethodCtrl.get('shippingMethod')?.value,
      items: items.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        unit_price_at_order: item.price
      }))
    };

    this.orderService.placeOrder(orderPayload).subscribe({
      next: () => {
        this.notificationService.success('Rendelés sikeresen mentve.');
        this.cartService.clearCart();
        this.cartService.clearProductCache();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Order save failed', err);
        this.notificationService.error('Nem sikerült menteni a rendelést.');
      }
    });
  }
}
