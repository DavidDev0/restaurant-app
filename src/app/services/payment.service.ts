import { Booked, PaymentConfirm } from './../shared/models/payment-model';
import { Injectable } from '@angular/core';
import { PaymentIntent } from 'src/app/shared/models/payment-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private API = 'https://booking-restaurant.herokuapp.com/bookinng-resturant/payments/'
private booked: Booked
  constructor(
    private http: HttpClient

  ) { }

  setBooked(booked: Booked){
    this.booked = booked
  }
  getBooked(){
    return this.booked
  }
  buy(payment: PaymentIntent) {
    return this.http.post(this.API + 'paymentIntent', payment)
  }
  confirm(paymentConfirm: PaymentConfirm){
    return this.http.post(this.API + 'confirm/' + paymentConfirm.paymentId, paymentConfirm);
  }
  cancel(id: string) {
    return this.http.post(this.API + 'cancel/' + id, {});
  }

}
