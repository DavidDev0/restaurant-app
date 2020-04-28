import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.scss']
})
export class CancelBookingComponent implements OnInit {
  codeReservation: string = 'HOLA SOY UNA PRUEBA';
  constructor() { }

  ngOnInit(): void {
  }
  sendCancel() {
    console.log(this.codeReservation)
  }

}
