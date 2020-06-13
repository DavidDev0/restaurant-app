import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
private booked: any
  constructor() { }

  setBooked(booked: any){
    this.booked = booked
  }
  getBooked(){
    return this.booked
  }


}
