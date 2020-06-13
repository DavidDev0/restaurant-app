import { PaymentService } from 'src/app/services/payment.service';
import { PaymentComponent } from './../../payment/payment.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Booking } from 'src/app/shared/models/booking-models';
import { Restaurant } from 'src/app/shared/models/restaurant-model';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  @Input() restaurant: Restaurant // Explicar como pasar datos al hijo

  public bookingForm
  public booking: Booking
  public bookingCode: string
  
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private service: AppService,
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.bookingForm = this.fb.group({
      date: [new Date(),Validators.required],
      time: ['', Validators.required],
      customers: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required]
    });
    this.booking = new Booking()
  }
  setBooking(){
    this.booking.restaurantId = this.restaurant.id
    this.booking.turnId = this.bookingForm.get('time').value
    this.booking.date = this.bookingForm.get('date').value
    this.booking.person = this.bookingForm.get('customers').value
    this.booking.email = this.bookingForm.get('email').value
    this.booking.name = this.bookingForm.get('name').value
  }
  // Reserva
 sendBooking() {
    this.setBooking()
    this.service.createReservation(this.booking).subscribe((result: any)=> {
      console.log(result.data)
      const title = "CÓDIGO DE RESERVA: " + result.data
      const info = "Necesitarás el código para poder acceder al restaurante o cancelar la reserva. Por favor guardalo en un lugar seguro"
      this.openDialog( title,info)
      this.router.navigate(['/payment']);
    })
  }
  payBooking() {
    this.setBooking()
    this.service.createReservation(this.booking).subscribe((result: any)=> {
    this.paymentService.setBooked( {code: result.data, booking: this.booking})
    this.router.navigate(['/payment']);
  })
  }

  openDialog(title: string, info: string): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '350px',
      data: {title: title, info: info}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
