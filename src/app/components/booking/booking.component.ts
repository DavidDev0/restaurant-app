import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  public bookingForm

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.bookingForm = this.fb.group({
      date: [new Date(),Validators.required],
      time: ['', Validators.required],
      customers: ['', Validators.required]
    });
  }
  sendBooking() {
    console.log('Sending booking', this.bookingForm.get('date').value);
  }

}
