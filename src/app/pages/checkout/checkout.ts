import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButton } from '@angular/material/button';
import { Summarize } from "../../shared/summarize/summarize";

@Component({
  selector: 'app-checkout',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButton,
    Summarize
],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required],
    phoneCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    countryCtrl: ['', Validators.required],
    cityCtrl: ['', Validators.required],
    postalCtrl: ['', Validators.required],
    streetCtrl: ['', Validators.required],
    houseNumberCtrl: ['', Validators.required],
    floorDoorCtrl: [''],
  });
}
