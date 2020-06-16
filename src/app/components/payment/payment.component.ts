import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BookingFormComponent } from 'src/app/components/booking/booking-form/booking-form.component';
import { PaymentService } from 'src/app/services/payment.service';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
 
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
 
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
 
  elementsOptions: ElementsOptions = {
    locale: 'es'
  };
  stripeTest: FormGroup;

  constructor(
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) { }
  
  public info: any
  ngOnInit(): void {
    this.info = this.paymentService.getBooked() 
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
  init(booked: any){
    this.info= booked
  }
  test(){
    console.log(this.info)
    console.log('service', this.paymentService.getBooked())
  }
  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

}
