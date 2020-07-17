import { Booked, PaymentConfirm, PaymentIntent } from './../../shared/models/payment-model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  
  public booked: Booked
  public bookedConfirm: string
  public successMessage: string = 'Espera...'
  ngOnInit(): void {
    this.booked = this.paymentService.getBooked() 
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
  init(booked: any){
    this.booked= booked
  }

  
  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          const paymentIntent: PaymentIntent = {
            description: this.booked.name + ': ' + this.booked.locator,
            price: this.booked.price
          }
          this.executeBuy(paymentIntent)
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
  executeBuy(payment: PaymentIntent) {
    this.paymentService.buy(payment).subscribe((result: any) => this.bookedConfirm = result.id)
  }

  confirm() {
    const paymentConfirm: PaymentConfirm = {
      email: this.booked.email,
      locator: this.booked.locator,
      name: this.booked.name,
      paymentId: this.bookedConfirm
    }
    this.paymentService.confirm(paymentConfirm).subscribe((data: string) => {
      this.successMessage = 'Pago confirmado. Mire su bandeja de entrada.'
    })
  }
  cancel() {
    this.paymentService.cancel(this.bookedConfirm).subscribe((data: any)=> {
      this.successMessage = 'Pago cancelado con éxito. Mire su bandeja de entrada'
    })
  }


}
