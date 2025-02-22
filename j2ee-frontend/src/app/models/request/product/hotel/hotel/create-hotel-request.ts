export class CreateHotelRequest{
    name?: string;
    contactInfo?: string;
    pricePerNight?: number;
    location?: string;
    isActive?: boolean;
    rating?: number;
    image?: File;
}