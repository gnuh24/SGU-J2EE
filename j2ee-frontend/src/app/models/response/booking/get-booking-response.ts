export class GetBookingResponse{
    id?: number;
    dateBook?: Date;
    totalPrice?: number;
    idUser?: number;
    paymentMethod?: number;
    invoice?: number;
    type?: string;

    constructor(
        id?: number,
        dateBook?: Date,
        totalPrice?: number,
        idUser?: number,
        paymentMethod?: number,
        invoice?: number
        
    ) {
        this.id = id;
        this.dateBook = dateBook;
        this.totalPrice = totalPrice;
        this.idUser = idUser;
        this.paymentMethod = paymentMethod;
        this.invoice = invoice;
    }
}