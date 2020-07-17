import { Booking } from 'src/app/shared/models/booking-models';
export interface PaymentIntent {
    description: string
    price: number
}
export class Booked extends Booking{
    locator: string
}
export interface PaymentConfirm {
    email: string
    locator: string
    name: string
    paymentId: string
}