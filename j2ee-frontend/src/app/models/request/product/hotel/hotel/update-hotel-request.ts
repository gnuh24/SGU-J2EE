export class UpdateHotelRequest{
    id?: number;
    name?: string;
    contactInfo?: string;
    pricePerNight?: number;
    location?: string;
    isActive?: boolean;
    rating?: number;
    image?: File;
}