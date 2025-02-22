export class UpdateInvoiceRequest{
    id?: number;
    invoiceDate?: Date;
    totalAmount?: number;
    paymentStatus?: boolean;
    idBooking?: number;
}