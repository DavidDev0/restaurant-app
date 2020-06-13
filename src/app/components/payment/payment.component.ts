import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BookingFormComponent } from 'src/app/components/booking/booking-form/booking-form.component';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private paymentService: PaymentService,
  ) { }
  public info: any
  ngOnInit(): void {
    this.info = this.paymentService.getBooked() 
  }
  init(booked: any){
    this.info= booked
  }
  test(){
    console.log(this.info)
    console.log('service', this.paymentService.getBooked())
  }

}
